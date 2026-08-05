/**
 * 从 vibe-hub.org Agent API 全量同步术语课 → 词典条目 + 判断练习题组。
 *
 * node scripts/sync-vibehub.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  VIBEHUB_SITE,
  termLabel,
  practiceToQuestion,
  renderPracticeSetJs,
  escJson,
} from './lib/vibehub-practice.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'src/data/vibehub');
const setsDir = path.join(root, 'src/data/quiz/sets');

const SITE = VIBEHUB_SITE;
const SKIP_PATHS = new Set([
  '',
  'en',
  'zh',
  /* 勿跳过词条 id「api」：页面路径也是 /api，与站内 Agent REST 前缀不同 */
  'assets',
  'topics',
  'vibehub-skill',
  'practice',
  'anti-ai-flavor',
  'icon.png',
]);
/** sitemap 偶发漏收时强制补拉（历史：api 曾被误列入 SKIP） */
const FORCE_LESSON_IDS = ['api'];
const CONCURRENCY = 8;
const TIMEOUT_MS = 20000;

/** 题库独立「Vibe 术语」领域章 */
function mapDomain() {
  return 'vibe';
}

/** @param {string} id */
function toGlossaryId(id) {
  return `vh_${String(id).replace(/-/g, '_')}`;
}

/** @param {object} lesson */
function buildBrief(lesson) {
  const tagline = String(lesson.tagline || '').trim();
  const desc = String(lesson.description || '').trim();
  const outcome = String(
    lesson.learningOutcome || lesson.learning?.outcome || ''
  ).trim();
  const aliases = Array.isArray(lesson.aliases)
    ? lesson.aliases.map((a) => String(a).trim()).filter(Boolean)
    : [];
  let brief = tagline;
  if (desc && desc !== tagline) {
    brief = brief ? `${brief} ${desc}` : desc;
  }
  if (outcome && !brief.includes(outcome)) {
    brief = brief ? `${brief} 学会之后：${outcome}` : outcome;
  }
  const tips = (lesson.explanation || [])
    .map((e) => String(e.text || e.title || '').trim())
    .filter(Boolean)
    .slice(0, 2);
  if (tips.length && brief.length < 180) {
    brief = `${brief} ${tips.join(' ')}`.trim();
  }
  if (aliases.length) {
    brief = `${brief} 亦称：${aliases.join('、')}。`.replace(/\s+/g, ' ').trim();
  }
  return brief.replace(/\s+/g, ' ').trim();
}

/** @param {string} s */
function esc(s) {
  return escJson(s);
}

async function fetchJson(url, label) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    const payload = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = payload?.error?.message || res.statusText;
      throw new Error(`${label} HTTP ${res.status}: ${msg}`);
    }
    if (!payload || typeof payload !== 'object') {
      throw new Error(`${label} 未返回 JSON`);
    }
    return payload;
  } finally {
    clearTimeout(timer);
  }
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next;
      next += 1;
      out[i] = await fn(items[i], i);
    }
  }
  const n = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: n }, () => worker()));
  return out;
}

function parseSitemapIds(xml) {
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const ids = [];
  const seen = new Set();
  for (const loc of locs) {
    let u;
    try {
      u = new URL(loc);
    } catch {
      continue;
    }
    if (!u.hostname.includes('vibe-hub.org')) continue;
    const pathName = u.pathname.replace(/\/+$/, '');
    const parts = pathName.split('/').filter(Boolean);
    if (parts.length !== 1) continue;
    const id = parts[0];
    if (SKIP_PATHS.has(id)) continue;
    if (seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  return ids.sort((a, b) => a.localeCompare(b));
}

/** @param {unknown} practice */
function slimPractice(practice) {
  if (!practice || typeof practice !== 'object') return null;
  const p = /** @type {{ title?: string, options?: object[] }} */ (practice);
  if (!p.title || !Array.isArray(p.options) || !p.options.length) return null;
  return {
    title: p.title || '',
    options: p.options.map((o) => ({
      id: o?.id || '',
      label: o?.label || '',
      feedback: o?.feedback || '',
      correct: Boolean(o?.correct),
    })),
  };
}

/** @param {object} lesson */
function slimLesson(lesson) {
  const flow = lesson.flowLesson
    ? {
        title: lesson.flowLesson.title || '',
        boundary: lesson.flowLesson.boundary || null,
        steps: Array.isArray(lesson.flowLesson.steps)
          ? lesson.flowLesson.steps.map((s) => ({
              id: s.id || '',
              label: s.label || '',
              owner: s.owner || '',
              detail: s.detail || '',
              focused: Boolean(s.focused),
            }))
          : [],
        practice: slimPractice(lesson.flowLesson.practice),
        agentPrompt: lesson.flowLesson.agentPrompt || null,
      }
    : null;

  const topPractice = slimPractice(lesson.lessonPractice);
  const lessonPractice = topPractice || flow?.practice || null;
  const agentPrompt =
    lesson.agentPrompt || flow?.agentPrompt || null;

  return {
    id: lesson.id,
    title: lesson.title || '',
    secondaryTitle: lesson.secondaryTitle || null,
    macroCategory: lesson.macroCategory || '',
    category: lesson.category || '',
    tagline: lesson.tagline || '',
    description: lesson.description || '',
    learningOutcome: lesson.learningOutcome || lesson.learning?.outcome || null,
    learning: lesson.learning
      ? {
          assumes: lesson.learning.assumes || '',
          outcome: lesson.learning.outcome || '',
        }
      : null,
    aliases: Array.isArray(lesson.aliases) ? lesson.aliases : [],
    url: lesson.url || `${SITE}/${lesson.id}`,
    path: lesson.path || `/${lesson.id}`,
    prerequisites: Array.isArray(lesson.prerequisites) ? lesson.prerequisites : [],
    prerequisiteLessons: Array.isArray(lesson.prerequisiteLessons)
      ? lesson.prerequisiteLessons.map((r) => ({
          id: r.id,
          title: r.title || '',
          url: r.url || '',
        }))
      : [],
    distinctions: Array.isArray(lesson.distinctions)
      ? lesson.distinctions.map((d) => ({
          label: d.label || d.target?.title || '',
          explanation: d.explanation || '',
          targetId: d.target?.id || d.targetId || null,
        }))
      : [],
    explanation: Array.isArray(lesson.explanation)
      ? lesson.explanation.map((e) => ({
          title: e.title || '',
          text: e.text || '',
        }))
      : [],
    boundary: lesson.boundary || null,
    usage: lesson.usage
      ? {
          use: Array.isArray(lesson.usage.use) ? lesson.usage.use : [],
          avoid: Array.isArray(lesson.usage.avoid) ? lesson.usage.avoid : [],
          scenarios: Array.isArray(lesson.usage.scenarios)
            ? lesson.usage.scenarios
            : [],
        }
      : null,
    flowLesson: flow,
    relatedLessons: Array.isArray(lesson.relatedLessons)
      ? lesson.relatedLessons.map((r) => ({
          id: r.id,
          title: r.title || '',
          url: r.url || '',
        }))
      : [],
    nextLessons: Array.isArray(lesson.nextLessons)
      ? lesson.nextLessons.map((r) => ({
          id: r.id,
          title: r.title || '',
          url: r.url || '',
        }))
      : [],
    lessonPractice,
    agentPrompt,
    visualCapabilities: Array.isArray(lesson.visualCapabilities)
      ? lesson.visualCapabilities.map(String)
      : [],
    references: Array.isArray(lesson.references)
      ? lesson.references.map((r) => ({
          title: r.title || '',
          source: r.source || '',
          url: r.url || '',
        }))
      : [],
  };
}

/** @param {object[]} lessons */
function buildGlossaryEntries(lessons) {
  /** @type {Record<string, object>} */
  const entries = {};
  for (const lesson of lessons) {
    const gid = toGlossaryId(lesson.id);
    const brief = buildBrief(lesson);
    if (!brief || brief.length < 8) continue;
    entries[gid] = {
      term: termLabel(lesson),
      brief,
      href: lesson.url || `${SITE}/${lesson.id}`,
      source: 'vibehub',
      aliases: lesson.aliases || [],
      domain: mapDomain(lesson.macroCategory, lesson.category),
      also: [],
    };
  }
  return entries;
}

/** @param {Record<string, object>} entries */
function renderGlossaryEntriesJs(entries) {
  const keys = Object.keys(entries).sort((a, b) => a.localeCompare(b));
  const lines = [
    '/**',
    ' * 由 scripts/sync-vibehub.mjs 生成 — 勿手改。',
    ' * 来源：https://vibe-hub.org/ （VibeHub / oil）',
    ' */',
    '',
    '/** @typedef {{ term: string, brief: string, also?: string[], href?: string, source?: string, aliases?: string[], domain?: string }} VhGlossaryEntry */',
    '',
    '/** @type {Record<string, VhGlossaryEntry>} */',
    'export const VIBEHUB_GLOSSARY_ENTRIES = {',
  ];
  for (const key of keys) {
    const e = entries[key];
    lines.push(`  ${esc(key)}: {`);
    lines.push(`    term: ${esc(e.term)},`);
    lines.push(`    brief: ${esc(e.brief)},`);
    if (e.href) lines.push(`    href: ${esc(e.href)},`);
    lines.push(`    source: ${esc(e.source || 'vibehub')},`);
    if (e.aliases?.length) lines.push(`    aliases: ${esc(e.aliases)},`);
    if (e.domain) lines.push(`    domain: ${esc(e.domain)},`);
    lines.push(`    also: [],`);
    lines.push('  },');
  }
  lines.push('};');
  lines.push('');
  return lines.join('\n');
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  console.log('→ manifest');
  const manifestPayload = await fetchJson(
    `${SITE}/.well-known/vibehub.json`,
    'manifest'
  );
  const manifest = manifestPayload.data || manifestPayload;
  const revision = manifest.revision || manifestPayload.revision || '';
  const apiBase = String(manifest.apiBaseUrl || `${SITE}/api/agent/v1`).replace(
    /\/$/,
    ''
  );

  console.log('→ sitemap');
  const sitemapXml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const ids = parseSitemapIds(sitemapXml);
  for (const id of FORCE_LESSON_IDS) {
    if (!ids.includes(id)) ids.push(id);
  }
  ids.sort((a, b) => a.localeCompare(b));
  console.log(`  ids: ${ids.length}`);
  if (!ids.length) throw new Error('sitemap 未解析到词条 id');

  console.log('→ lessons');
  const fetched = await mapPool(ids, CONCURRENCY, async (id) => {
    try {
      const payload = await fetchJson(
        `${apiBase}/lessons/${encodeURIComponent(id)}`,
        `lesson ${id}`
      );
      const data = payload.data;
      if (!data?.id) throw new Error(`lesson ${id} 缺少 data`);
      return { ok: true, data };
    } catch (err) {
      console.warn(`  skip ${id}: ${err.message}`);
      return { ok: false, id, error: err.message };
    }
  });

  const failed = fetched.filter((x) => !x.ok);
  const rawLessons = fetched.filter((x) => x.ok).map((x) => x.data);
  if (!rawLessons.length) throw new Error('未拉取到任何词条');
  if (failed.length) {
    console.warn(`  failed ${failed.length}/${ids.length}`);
  }

  const lessons = rawLessons.map(slimLesson);
  const entries = buildGlossaryEntries(lessons);
  const practiceQs = lessons
    .map((lesson) => practiceToQuestion(lesson, mapDomain))
    .filter(Boolean)
    .sort((a, b) => a.id.localeCompare(b.id));

  const fetchedAt = new Date().toISOString();
  const meta = {
    source: SITE,
    attribution: 'VibeHub（vibe-hub.org）· oil',
    skill: 'https://github.com/oil-oil/vibe-hub-skill',
    revision,
    fetchedAt,
    lessonCount: lessons.length,
    glossaryCount: Object.keys(entries).length,
    practiceCount: practiceQs.length,
    practiceCoverage: `${practiceQs.length}/${lessons.length}（原站 lessonPractice + 无练习时用 usage.use/avoid 合成）`,
    note: '静态学习快照；释义与练习版权归 VibeHub 原作者。词典与本仓去重；导图保留全量词条卡。刷题 relatedNodes 由 bank 按跨导图桥展开。重新同步：pnpm vibehub:sync',
  };

  fs.writeFileSync(
    path.join(outDir, 'meta.json'),
    `${JSON.stringify(meta, null, 2)}\n`,
    'utf8'
  );
  fs.writeFileSync(
    path.join(outDir, 'lessons.json'),
    `${JSON.stringify(lessons, null, 2)}\n`,
    'utf8'
  );
  fs.writeFileSync(
    path.join(outDir, 'glossary-entries.js'),
    renderGlossaryEntriesJs(entries),
    'utf8'
  );
  fs.writeFileSync(
    path.join(setsDir, 'vibehub-practice.js'),
    renderPracticeSetJs(practiceQs),
    'utf8'
  );

  console.log(
    `✓ revision=${revision} lessons=${lessons.length} glossary=${Object.keys(entries).length} practice=${practiceQs.length}`
  );

  console.log('→ graph-pack（独立术语导图）');
  await import('./gen-vibehub-graph.mjs');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
