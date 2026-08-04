/**
 * 由 vibehub/lessons.json 生成「术语」独立导图数据包（7 大区 × 全量词条卡）。
 * node scripts/gen-vibehub-graph.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'src/data/vibehub');
const lessonsPath = path.join(outDir, 'lessons.json');
const metaPath = path.join(outDir, 'meta.json');

const SITE = 'https://vibe-hub.org';

/** @type {{ id: string, title: string, slug: string, blurb: string }[]} */
const MACRO_ORDER = [
  { id: '前端', title: '前端', slug: 'frontend', blurb: '组件、布局、交互与视觉表达' },
  { id: '后端', title: '后端', slug: 'backend', blurb: '网络、接口、数据、上线排错' },
  { id: '产品', title: '产品', slug: 'product', blurb: '需求、规划与验证' },
  { id: '技术栈', title: '技术栈', slug: 'technology', blurb: '语言、框架、工具与测试' },
  { id: 'AI', title: 'AI', slug: 'ai', blurb: '模型应用、Agent 与工具' },
  { id: 'Git', title: 'Git', slug: 'git', blurb: '版本协作与工作流' },
  { id: '设计风格', title: '设计风格', slug: 'design', blurb: '风格与气质关键词' },
];

/** @param {string} s */
function esc(s) {
  return JSON.stringify(s);
}

/** @param {string} s */
function escapeHtmlAttr(s) {
  return String(s || '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function macroFrameId(slug) {
  return `vh-frame-${slug}`;
}

function termNodeId(lessonId) {
  return `vh-${lessonId}`;
}

function termLabel(lesson) {
  const cn = String(lesson.title || '').trim();
  const en = String(lesson.secondaryTitle || '').trim();
  if (cn && en) return `${cn}（${en}）`;
  return cn || en || String(lesson.id || '');
}

function mdEscapeCell(text) {
  return String(text || '')
    .replace(/\|/g, '\\|')
    .replace(/\n+/g, ' ')
    .trim();
}

/**
 * 单条术语正文
 * @param {object} lesson
 * @param {string} revision
 */
function termSection(lesson, revision) {
  const title = termLabel(lesson);
  const aliases = Array.isArray(lesson.aliases) ? lesson.aliases.filter(Boolean) : [];
  const distinctions = Array.isArray(lesson.distinctions) ? lesson.distinctions : [];
  const explanation = Array.isArray(lesson.explanation) ? lesson.explanation : [];
  const usage = lesson.usage || null;
  const flow = lesson.flowLesson || null;
  const practice = lesson.lessonPractice || flow?.practice || null;
  const agentPrompt = lesson.agentPrompt || flow?.agentPrompt || null;
  const refs = Array.isArray(lesson.references) ? lesson.references : [];
  const prereqs = Array.isArray(lesson.prerequisiteLessons)
    ? lesson.prerequisiteLessons
    : [];
  const related = Array.isArray(lesson.relatedLessons) ? lesson.relatedLessons : [];
  const next = Array.isArray(lesson.nextLessons) ? lesson.nextLessons : [];
  const lines = [];
  lines.push(`## ${title}`);
  lines.push('');
  lines.push(
    `> 词典键 \`vh_${String(lesson.id).replace(/-/g, '_')}\` · 快照 ${revision || '—'}`
  );
  lines.push('');
  if (aliases.length) lines.push(`**亦称**：${aliases.join('、')}`);
  lines.push('');
  lines.push(`**一句话**：${String(lesson.tagline || '').trim() || '—'}`);
  lines.push('');
  if (lesson.learningOutcome || lesson.learning?.outcome) {
    lines.push(
      `**学会之后**：${String(lesson.learningOutcome || lesson.learning?.outcome).trim()}`
    );
    lines.push('');
  }
  if (lesson.learning?.assumes) {
    lines.push(`**先具备**：${String(lesson.learning.assumes).trim()}`);
    lines.push('');
  }
  lines.push(String(lesson.description || '').trim() || '');
  lines.push('');

  if (explanation.length) {
    lines.push('**怎么理解**');
    lines.push('');
    for (const e of explanation) {
      const t = String(e.title || '').trim();
      const text = String(e.text || '').trim();
      if (t) lines.push(`- **${t}**：${text}`);
      else if (text) lines.push(`- ${text}`);
    }
    lines.push('');
  }

  if (lesson.boundary || flow?.boundary) {
    lines.push(`**边界说明**：${String(lesson.boundary || flow?.boundary).trim()}`);
    lines.push('');
  }

  if (distinctions.length) {
    lines.push('**与相邻概念**');
    lines.push('');
    for (const d of distinctions) {
      lines.push(
        `- **与「${d.label || d.targetId || '相关'}」**：${String(d.explanation || '').trim()}`
      );
    }
    lines.push('');
  }

  if (usage) {
    const use = (usage.use || []).filter(Boolean);
    const avoid = (usage.avoid || []).filter(Boolean);
    const scenarios = (usage.scenarios || []).filter(Boolean);
    if (use.length || avoid.length || scenarios.length) {
      lines.push('**用法**');
      lines.push('');
      if (use.length) lines.push(`- **适合**：${use.join('；')}`);
      if (avoid.length) lines.push(`- **避免**：${avoid.join('；')}`);
      if (scenarios.length) lines.push(`- **场景**：${scenarios.join('；')}`);
      lines.push('');
    }
  }

  if (flow?.steps?.length) {
    lines.push('```steps');
    lines.push(
      JSON.stringify({
        title: flow.title || '流程',
        caption: flow.boundary || '',
        steps: flow.steps.map((s) => ({
          title: `${s.label || s.id}${s.owner ? ` · ${s.owner}` : ''}${s.focused ? ' ★' : ''}`,
          body: String(s.detail || '').trim(),
        })),
      })
    );
    lines.push('```');
    lines.push('');
  }

  const caps = Array.isArray(lesson.visualCapabilities)
    ? lesson.visualCapabilities
    : [];
  const wantsPreview = caps.some((c) =>
    /preview|interactive|anatomy|variants|concept-visual|scenarios/i.test(c)
  );
  if (wantsPreview && lesson.url) {
    lines.push('**交互演示**（嵌入源站；本站 API 不含动画资源包）');
    lines.push('');
    lines.push('```html');
    lines.push(
      `<figure class="vh-demo"><iframe class="vh-demo__frame" title="${escapeHtmlAttr(title)} 演示" src="${escapeHtmlAttr(lesson.url)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe><figcaption class="vh-demo__cap">源站预览 · ${escapeHtmlAttr(String(lesson.id))} · 能力：${escapeHtmlAttr(caps.join(' · '))}</figcaption></figure>`
    );
    lines.push('```');
    lines.push('');
  } else if (caps.length) {
    lines.push(
      `**源站能力标注**：${caps.join(' · ')}（正文已收录；动效组件仅源站提供）`
    );
    lines.push('');
  }

  if (prereqs.length) {
    lines.push(`**前置**：${prereqs.map((r) => r.title || r.id).join('、')}`);
    lines.push('');
  }
  if (related.length) {
    lines.push(`**相关**：${related.map((r) => r.title || r.id).join('、')}`);
    lines.push('');
  }
  if (next.length) {
    lines.push(`**接着看**：${next.map((r) => r.title || r.id).join('、')}`);
    lines.push('');
  }

  if (practice?.title && Array.isArray(practice.options)) {
    const choices = practice.options
      .filter((o) => o?.label)
      .map((o) => ({
        t: String(o.label).trim(),
        ok: Boolean(o.correct),
        why:
          String(o.feedback || '').trim() || (o.correct ? '正确。' : '不正确。'),
      }));
    if (choices.length >= 2) {
      lines.push('```quiz');
      lines.push(
        JSON.stringify({
          title: `${title} · 判断`,
          questions: [{ q: practice.title, choices }],
        })
      );
      lines.push('```');
      lines.push('');
    }
  }

  if (agentPrompt) {
    lines.push('**可以对 Agent 说**');
    lines.push('');
    lines.push('```text');
    lines.push(String(agentPrompt).trim());
    lines.push('```');
    lines.push('');
  }

  if (refs.length) {
    lines.push('**参考**');
    lines.push('');
    for (const r of refs) {
      const src = r.source ? `（${r.source}）` : '';
      if (r.url) lines.push(`- [${r.title || r.url}](${r.url})${src}`);
      else lines.push(`- ${r.title || '参考'}${src}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function buildTermMarkdown(lesson, revision) {
  const title = termLabel(lesson);
  const lines = [];
  lines.push(`# ${title}`);
  lines.push('');
  lines.push(
    `> **来源**：VibeHub（vibe-hub.org）· oil · revision \`${revision || '—'}\` · **${lesson.macroCategory || ''} / ${lesson.category || ''}**`
  );
  lines.push('');
  lines.push(termSection(lesson, revision));
  lines.push('');
  lines.push(`整理自 [VibeHub](${SITE})；本站可学，署名归原作者。`);
  lines.push('');
  return lines.join('\n');
}

function buildMacroMarkdown(macro, categories, revision) {
  const total = categories.reduce((n, c) => n + c.count, 0);
  const lines = [];
  lines.push(`# ${macro.title}`);
  lines.push('');
  lines.push(
    `> **来源**：VibeHub · revision \`${revision || '—'}\` · ${macro.blurb}`
  );
  lines.push('');
  lines.push(
    `本区 **${total}** 条术语、**${categories.length}** 个分类。框内**每卡一条术语**（Vibe Coding 独立体系）。`
  );
  lines.push('');
  lines.push('| 分类 | 条数 |');
  lines.push('|------|------|');
  for (const c of categories) {
    lines.push(`| ${mdEscapeCell(c.name)} | ${c.count} |`);
  }
  lines.push('');
  return lines.join('\n');
}

function buildHubMarkdown(revision, stats) {
  return `# 知识导图2 · Vibe Coding

> **定位**：第二张知识导图（不进主课程图）。VibeHub 快照 revision \`${revision || '—'}\` · 七大区 · **每条术语一张卡**。

## 怎么逛

1. 左枢纽 → 七个大区框 → **词条卡**。
2. 面板 **跨导图** 可回 **知识导图**（Vibe 心智 / 第五章）。
3. 词典与本仓同义去重；**本图词条全保留**。

| 大区 | 术语 |
|------|------|
${stats.map((s) => `| **${s.title}** | ${s.terms} |`).join('\n')}
| **合计** | **${stats.reduce((a, s) => a + s.terms, 0)}** |

同步：\`pnpm vibehub:sync\`
`;
}

/**
 * @param {object[]} lessons
 * @param {string} revision
 */
function renderGraphPack(lessons, revision) {
  /** @type {Record<string, string>} */
  const bodies = {};
  /** @type {Record<string, string[]>} */
  const nodeTerms = {};
  /** @type {object[]} */
  const termCards = [];
  /** @type {object[]} */
  const macroFrames = [];
  const stats = [];

  for (const macro of MACRO_ORDER) {
    const group = lessons
      .filter((l) => l.macroCategory === macro.id)
      .sort((a, b) => {
        const c = String(a.category).localeCompare(String(b.category), 'zh');
        if (c) return c;
        return String(a.id).localeCompare(String(b.id));
      });
    if (!group.length) continue;

    /** @type {Map<string, number>} */
    const catCount = new Map();
    const childIds = [];
    for (const l of group) {
      const cat = l.category || '未分类';
      catCount.set(cat, (catCount.get(cat) || 0) + 1);
      const tid = termNodeId(l.id);
      childIds.push(tid);
      bodies[tid] = buildTermMarkdown(l, revision);
      const gid = `vh_${String(l.id).replace(/-/g, '_')}`;
      nodeTerms[tid] = [gid];
      termCards.push({
        id: tid,
        lessonId: l.id,
        macroSlug: macro.slug,
        macroTitle: macro.title,
        category: cat,
        label: termLabel(l),
        subtitle: cat,
        tag: `Vibe · ${macro.title}`,
        role: String(l.tagline || '').trim().slice(0, 72),
        glossaryIds: [gid],
        hasPractice: Boolean(l.lessonPractice),
      });
    }

    const catSummaries = [...catCount.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], 'zh'))
      .map(([name, count]) => ({ name, count }));

    const fid = macroFrameId(macro.slug);
    bodies[fid] = buildMacroMarkdown(macro, catSummaries, revision);
    macroFrames.push({
      id: fid,
      slug: macro.slug,
      label: `${macro.title}`,
      subtitle: `${group.length} 条 · ${macro.blurb}`,
      tag: `Zone 0${MACRO_ORDER.indexOf(macro) + 1}`,
      childIds,
      termCount: group.length,
      categoryCount: catSummaries.length,
    });
    stats.push({
      title: macro.title,
      cats: catSummaries.length,
      terms: group.length,
    });
  }

  const hubId = 'vh-hub';
  bodies[hubId] = buildHubMarkdown(revision, stats);

  const lines = [];
  lines.push('/**');
  lines.push(' * 由 scripts/gen-vibehub-graph.mjs 生成 — 勿手改。');
  lines.push(' * 知识导图2：七大区 + 全量词条卡（Vibe Coding）');
  lines.push(' */');
  lines.push('');
  lines.push(`export const VIBEHUB_REVISION = ${esc(revision)};`);
  lines.push(`export const VIBEHUB_SITE = ${esc(SITE)};`);
  lines.push(`export const VIBE_HUB_ID = ${esc(hubId)};`);
  lines.push('');
  lines.push('/** @type {Record<string, string>} */');
  lines.push('export const VIBEHUB_BODIES = {');
  for (const id of Object.keys(bodies).sort()) {
    lines.push(`  ${esc(id)}: ${esc(bodies[id])},`);
  }
  lines.push('};');
  lines.push('');
  lines.push(
    `export const VIBEHUB_NODE_TERMS = ${JSON.stringify(nodeTerms, null, 2)};`
  );
  lines.push('');
  lines.push(
    `export const VIBEHUB_MACRO_FRAMES = ${JSON.stringify(macroFrames, null, 2)};`
  );
  lines.push('');
  lines.push(
    `export const VIBEHUB_TERM_CARDS = ${JSON.stringify(termCards, null, 2)};`
  );
  lines.push('');
  lines.push(`/** @type {string[]} */`);
  lines.push(
    `export const VIBEHUB_ENTRY_IDS = ${JSON.stringify([
      hubId,
      ...macroFrames.map((f) => f.id),
      ...termCards.map((c) => c.id),
    ])};`
  );
  lines.push('');
  lines.push(`/**
 * @param {string} id
 */
export function getVibeEntryById(id) {
  if (!id || !VIBEHUB_BODIES[id]) return null;
  if (id === VIBE_HUB_ID) {
    return {
      id,
      kind: 'topic',
      label: '知识导图2',
      subtitle: '七大区 · 全量词条',
      tag: '入口',
      role: '词表入口；大区框与导图1章框同一套：点标题开概览。',
      markdown: VIBEHUB_BODIES[id],
      glossaryIds: [],
    };
  }
  const frame = VIBEHUB_MACRO_FRAMES.find((f) => f.id === id);
  if (frame) {
    const zoneBySlug = {
      frontend: 'Zone 01',
      backend: 'Zone 02',
      product: 'Zone 03',
      technology: 'Zone 04',
      ai: 'Zone 05',
      git: 'Zone 06',
      design: 'Zone 07',
    };
    return {
      id,
      kind: 'chapter',
      label: frame.label,
      subtitle: frame.subtitle,
      tag: zoneBySlug[frame.slug] || frame.tag,
      role: `${frame.categoryCount} 分类 · ${frame.termCount} 术语`,
      markdown: VIBEHUB_BODIES[id],
      glossaryIds: [],
    };
  }
  const card = VIBEHUB_TERM_CARDS.find((c) => c.id === id);
  if (card) {
    return {
      id,
      kind: 'topic',
      parentId: \`vh-frame-\${card.macroSlug}\`,
      label: card.label,
      subtitle: card.subtitle,
      tag: card.tag,
      role: card.role,
      markdown: VIBEHUB_BODIES[id],
      glossaryIds: card.glossaryIds || [],
    };
  }
  return {
    id,
    kind: 'topic',
    label: id,
    markdown: VIBEHUB_BODIES[id],
    glossaryIds: VIBEHUB_NODE_TERMS[id] || [],
  };
}
`);
  lines.push('');
  return lines.join('\n');
}

function main() {
  if (!fs.existsSync(lessonsPath)) {
    throw new Error('缺少 lessons.json，请先 pnpm vibehub:sync');
  }
  const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));
  const meta = fs.existsSync(metaPath)
    ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
    : {};
  const revision = meta.revision || '';

  fs.writeFileSync(
    path.join(outDir, 'graph-pack.js'),
    renderGraphPack(lessons, revision),
    'utf8'
  );

  console.log(
    `✓ graph-pack: macros=7 termCards=${lessons.length}（知识导图2）`
  );
}

main();
