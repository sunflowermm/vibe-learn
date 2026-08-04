/**
 * VibeHub 词条 → 四选一练习题（sync / 离线 rebuild 共用）
 */
export const VIBEHUB_SITE = 'https://vibe-hub.org';

/** @param {{ title?: string, secondaryTitle?: string|null, id?: string }} lesson */
export function termLabel(lesson) {
  const cn = String(lesson.title || '').trim();
  const en = String(lesson.secondaryTitle || '').trim();
  if (cn && en) return `${cn}（${en}）`;
  return cn || en || String(lesson.id || '');
}

/**
 * 原站无 lessonPractice 时，从 usage.use / usage.avoid 合成四选一。
 * @param {object} lesson
 * @returns {{ title: string, options: object[] } | null}
 */
export function practiceFromUsage(lesson) {
  const use = (lesson.usage?.use || [])
    .map((s) => String(s || '').trim())
    .filter(Boolean);
  const avoid = (lesson.usage?.avoid || [])
    .map((s) => String(s || '').trim())
    .filter(Boolean);
  if (!use.length || avoid.length < 3) return null;
  const label = termLabel(lesson);
  return {
    title: `下列哪一项更符合「${label}」的适用场景？`,
    options: [
      {
        id: 'use',
        label: use[0],
        correct: true,
        feedback: `正确。这是「${label}」常见适用情形。`,
      },
      ...avoid.slice(0, 3).map((labelText, i) => ({
        id: `avoid-${i}`,
        label: labelText,
        correct: false,
        feedback: `这是「${label}」宜避免的做法，不是适用场景。`,
      })),
    ],
  };
}

/**
 * @param {object} lesson
 * @param {(macro?: string, category?: string) => string} [mapDomain]
 * @returns {object | null}
 */
export function practiceToQuestion(lesson, mapDomain = () => 'vibe') {
  const practice = lesson.lessonPractice || practiceFromUsage(lesson);
  if (!practice?.title || !Array.isArray(practice.options)) return null;
  const opts = practice.options
    .map((o) => ({
      label: String(o.label || '').trim(),
      feedback: String(o.feedback || '').trim(),
      correct: Boolean(o.correct),
      id: String(o.id || '').trim(),
    }))
    .filter((o) => o.label);
  if (opts.length < 2) return null;
  const correct = opts.filter((o) => o.correct);
  if (correct.length !== 1) return null;

  const choices = opts.map((o) => ({
    t: o.label,
    ok: o.correct,
    why: o.feedback || (o.correct ? '正确。' : '不正确。'),
  }));

  if (choices.length === 3) {
    const distractorSources = [
      ...(lesson.distinctions || []).map((d) => d.label).filter(Boolean),
      ...(lesson.relatedLessons || []).map((r) => r.title).filter(Boolean),
    ];
    const used = new Set(choices.map((c) => c.t));
    let fourth = distractorSources.find((t) => t && !used.has(t));
    if (!fourth) {
      fourth = `把「${termLabel(lesson)}」与无关功能混为一谈，不做边界判断`;
    }
    if (!used.has(fourth)) {
      choices.push({
        t: fourth,
        ok: false,
        why: `这是相邻或无关概念，不是本题对「${termLabel(lesson)}」场景的正确安排。`,
      });
    }
  }

  if (choices.length !== 4) return null;
  if (choices.filter((c) => c.ok).length !== 1) return null;

  const domain = mapDomain(lesson.macroCategory, lesson.category);
  const fromUsage = !lesson.lessonPractice;
  return {
    id: `vh-practice:${lesson.id}`,
    q: practice.title,
    choices,
    kind: 'concept',
    domain,
    tags: [
      'VibeHub',
      lesson.macroCategory,
      lesson.category,
      lesson.id,
      fromUsage ? 'usage-derived' : 'lessonPractice',
    ].filter(Boolean),
    relatedNodes: [`vh-${lesson.id}`],
    origin: 'adapted',
    attribution: `VibeHub · ${termLabel(lesson)}`,
    attributionUrl: lesson.url || `${VIBEHUB_SITE}/${lesson.id}`,
  };
}

/** @param {string} s */
export function escJson(s) {
  return JSON.stringify(s);
}

/**
 * @param {object[]} questions
 * @param {string} [site]
 */
export function renderPracticeSetJs(questions, site = VIBEHUB_SITE) {
  const esc = escJson;
  const lines = [
    "import { defineQuizSet } from '../schema.js';",
    '',
    '/**',
    ' * 由 scripts/sync-vibehub.mjs / rebuild-vibehub-practice.mjs 生成 — 勿手改。',
    ' * 来源：https://vibe-hub.org/ 词条 lessonPractice + usage（署名见各题 attribution）',
    ' */',
    'export default defineQuizSet({',
    `  id: ${esc('vibehub-practice')},`,
    `  title: ${esc('开源改编 · VibeHub 术语判断')},`,
    `  kind: ${esc('concept')},`,
    `  domain: ${esc('vibe')},`,
    `  tags: ${esc(['VibeHub', '术语', 'adapted', '系统非原创'])},`,
    '  relatedNodes: [],',
    `  caption: ${esc('系统非原创 · vibe-hub.org 词条判断（lessonPractice + usage 合成）；domain=vibe')},`,
    `  origin: ${esc('adapted')},`,
    `  attribution: ${esc('VibeHub（vibe-hub.org）')},`,
    `  attributionUrl: ${esc(site)},`,
    '  questions: [',
  ];

  for (const q of questions) {
    lines.push('    {');
    lines.push(`      id: ${esc(q.id)},`);
    lines.push(`      q: ${esc(q.q)},`);
    lines.push('      choices: [');
    for (const c of q.choices) {
      lines.push(
        `        { t: ${esc(c.t)}, ok: ${c.ok ? 'true' : 'false'}, why: ${esc(c.why)} },`
      );
    }
    lines.push('      ],');
    lines.push(`      kind: ${esc(q.kind)},`);
    lines.push(`      domain: ${esc(q.domain)},`);
    if (q.tags?.length) lines.push(`      tags: ${esc(q.tags)},`);
    if (q.relatedNodes?.length) {
      lines.push(`      relatedNodes: ${esc(q.relatedNodes)},`);
    }
    lines.push(`      origin: ${esc('adapted')},`);
    lines.push(`      attribution: ${esc(q.attribution)},`);
    lines.push(`      attributionUrl: ${esc(q.attributionUrl)},`);
    lines.push('    },');
  }

  lines.push('  ],');
  lines.push('});');
  lines.push('');
  return lines.join('\n');
}
