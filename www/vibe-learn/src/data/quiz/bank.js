/**
 * 题库聚合：精选题组 + 静态分片 + 课文 ```quiz 收获（derive）。
 */

import { QUIZ_DOMAINS, QUIZ_KINDS, domainMeta, kindMeta } from './categories.js';
import { listQuizSets, getQuizSet, searchQuizSets, kindShortLabel } from './index.js';
import { shuffleCopy, RELATED_NODES_MAX } from './schema.js';
import { STATIC_QUESTIONS } from './bank/index.js';
import { NODE_TERMS } from '../terms-by-node.js';
import { deriveLessonQuestions } from './derive/lesson.js';

/** 与 schema.RELATED_NODES_MAX 对齐 */
const RELATED_NODE_CAP = RELATED_NODES_MAX;

/** @type {import('./schema.js').QuizQuestion[] | null} */
let cached = null;

function flattenCurated() {
  /** @type {import('./schema.js').QuizQuestion[]} */
  const out = [];
  for (const set of listQuizSets()) {
    for (const q of set.questions || []) {
      const related = (q.relatedNodes?.length
        ? q.relatedNodes
        : set.relatedNodes || []
      ).slice(0, RELATED_NODE_CAP);
      out.push({
        ...q,
        kind: q.kind || set.kind,
        domain: q.domain || set.domain,
        setId: q.setId || set.id,
        source: q.source || 'curated',
        relatedNodes: related,
        tags: q.tags?.length ? q.tags : set.tags || [],
      });
    }
  }
  return out;
}

/** 题干归一化：用于合并近义重复（改编包互拷等） */
function questionStemKey(q) {
  return String(q || '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[？?。．.，、：:！!；;（）()【】\[\]「」""''`]/g, '')
    .slice(0, 56);
}

/** 来源优先级：精选 > 静态课核 > 改编 > 其它 */
function sourceRank(source) {
  if (source === 'curated') return 0;
  if (source === 'static' || source === 'lesson') return 1;
  if (source === 'adapted') return 2;
  if (source === 'glossary') return 3;
  return 4;
}

function buildBank() {
  const byId = new Map();
  const byStem = new Map();
  // 精选优先；同干冲突时 lesson/static 可顶掉 adapted，但顶不掉 curated
  const streams = [
    ...flattenCurated(),
    ...STATIC_QUESTIONS,
    ...deriveLessonQuestions(),
  ];
  for (const q of streams) {
    if (!q?.id || !Array.isArray(q.choices) || q.choices.length !== 4) continue;
    if (!q.choices.some((c) => c.ok)) continue;

    const stem = questionStemKey(q.q);
    const prevId = stem ? byStem.get(stem) : null;
    if (prevId && byId.has(prevId)) {
      const prev = byId.get(prevId);
      if (sourceRank(q.source) >= sourceRank(prev.source)) continue;
      byId.delete(prevId);
    }

    if (byId.has(q.id)) continue;
    byId.set(q.id, q);
    if (stem) byStem.set(stem, q.id);
  }
  return [...byId.values()];
}

function ensureBank() {
  if (!cached) cached = buildBank();
  return cached;
}

/** @returns {import('./schema.js').QuizQuestion[]} */
export function listQuestions() {
  return ensureBank().slice();
}

/** @returns {number} */
export function quizQuestionCount() {
  return ensureBank().length;
}

/** @returns {number} */
export function quizSetCount() {
  return listQuizSets().length;
}

/**
 * @param {string} id
 * @returns {import('./schema.js').QuizQuestion | null}
 */
export function getQuestion(id) {
  return ensureBank().find((q) => q.id === id) || null;
}

/**
 * @param {string} query
 * @param {{
 *   kind?: import('./categories.js').QuizKindId | 'all',
 *   domain?: import('./categories.js').QuizDomainId | 'all',
 *   limit?: number,
 * }} [opts]
 */
export function searchQuestions(query, opts = {}) {
  const kind = opts.kind || 'all';
  const domain = opts.domain || 'all';
  const limit = opts.limit ?? 200;
  const q = String(query ?? '')
    .trim()
    .toLowerCase();
  const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

  const hit = ensureBank().filter((item) => {
    if (kind !== 'all' && item.kind !== kind) return false;
    if (domain !== 'all' && item.domain !== domain) return false;
    if (!tokens.length) return true;
    const hay = [
      item.id,
      item.q,
      item.domain,
      item.kind,
      item.setId,
      ...(item.tags || []),
      ...(item.relatedNodes || []),
      ...item.choices.map((c) => c.t),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return tokens.every((t) => hay.includes(t));
  });
  return hit.slice(0, limit);
}

/**
 * @param {{
 *   domain?: import('./categories.js').QuizDomainId | 'all',
 *   kind?: import('./categories.js').QuizKindId | 'all',
 *   n?: number,
 *   excludeIds?: string[],
 *   nodeId?: string,
 *   tag?: string,
 *   excludeTag?: string,
 * }} [opts]
 */
export function pickRandom(opts = {}) {
  const n = Math.max(1, Math.min(100, opts.n ?? 20));
  const exclude = new Set(opts.excludeIds || []);
  let pool = ensureBank().filter((q) => !exclude.has(q.id));
  if (opts.domain && opts.domain !== 'all') {
    pool = pool.filter((q) => q.domain === opts.domain);
  }
  if (opts.kind && opts.kind !== 'all') {
    pool = pool.filter((q) => q.kind === opts.kind);
  }
  if (opts.nodeId) {
    pool = pool.filter((q) => (q.relatedNodes || []).includes(opts.nodeId));
  }
  if (opts.tag) {
    pool = pool.filter((q) => (q.tags || []).includes(opts.tag));
  }
  if (opts.excludeTag) {
    pool = pool.filter((q) => !(q.tags || []).includes(opts.excludeTag));
  }
  return shuffleCopy(pool).slice(0, n);
}

/** 名词释义题（词典落盘 g:…）；勿把带「名词」标签的普通精选题算进来 */
export function isGlossaryQuestion(q) {
  return String(q?.id || '').startsWith('g:');
}

/** @returns {number} */
export function quizTopicQuestionCount() {
  return ensureBank().filter((q) => !isGlossaryQuestion(q)).length;
}

/**
 * 名词释义池（词典落盘题）
 */
export function glossaryPoolMeta() {
  const qs = ensureBank().filter((q) => isGlossaryQuestion(q));
  return {
    id: 'pool-glossary',
    title: '名词释义',
    kind: 'concept',
    domain: 'lang',
    tags: ['名词', '词典'],
    relatedNodes: [],
    caption: `词典概念 ${qs.length} 题 · 选错会点明正确名词`,
    questionCount: qs.length,
    questions: qs,
  };
}

/**
 * 本节点相关题：relatedNodes 直连优先；再并入本课专有名词对应的词典题。
 * @param {string} nodeId
 * @returns {import('./schema.js').QuizQuestion[]}
 */
export function questionsForNode(nodeId) {
  if (!nodeId) return [];
  const rank = (q) => {
    if (q.source === 'curated') return 0;
    if (q.id?.startsWith('l:')) return 1;
    if (q.source === 'static' && !isGlossaryQuestion(q)) return 2;
    if (isGlossaryQuestion(q)) return 4;
    return 3;
  };
  const bank = ensureBank();
  const primary = bank.filter((q) => (q.relatedNodes || []).includes(nodeId));
  const seen = new Set(primary.map((q) => q.id));
  const termSet = new Set(NODE_TERMS[nodeId] || []);
  const secondary = [];
  if (termSet.size) {
    for (const q of bank) {
      if (seen.has(q.id) || !isGlossaryQuestion(q)) continue;
      if (!(q.tags || []).some((t) => termSet.has(t))) continue;
      secondary.push(q);
      seen.add(q.id);
    }
  }
  return [...primary, ...secondary].sort(
    (a, b) => rank(a) - rank(b) || String(a.id).localeCompare(String(b.id))
  );
}

/**
 * @param {string} setId
 * @returns {import('./schema.js').QuizQuestion[]}
 */
export function questionsForSet(setId) {
  const set = getQuizSet(setId);
  if (set?.questions?.length) {
    return set.questions.map((q) => ({
      ...q,
      setId: set.id,
      kind: q.kind || set.kind,
      domain: q.domain || set.domain,
    }));
  }
  return ensureBank().filter((q) => q.setId === setId);
}

/**
 * @param {string[]} ids
 * @returns {import('./schema.js').QuizQuestion[]}
 */
export function questionsByIds(ids) {
  const map = new Map(ensureBank().map((q) => [q.id, q]));
  return (ids || []).map((id) => map.get(id)).filter(Boolean);
}

/**
 * @param {import('./categories.js').QuizDomainId} domain
 */
export function domainPoolMeta(domain) {
  const qs = ensureBank().filter(
    (q) => q.domain === domain && !isGlossaryQuestion(q)
  );
  const label = domainMeta(domain).label;
  return {
    id: `pool-${domain}`,
    title: `${label} · 综合池`,
    kind: 'concept',
    domain,
    tags: ['静态池'],
    relatedNodes: [],
    caption: `本章共 ${qs.length} 题（不含名词）`,
    questionCount: qs.length,
    questions: qs,
  };
}

/** 全库随机入口（不含名词释义题） */
export function randomPoolMeta() {
  const n = quizTopicQuestionCount();
  return {
    id: 'pool-random',
    title: '全库随机',
    kind: 'concept',
    domain: 'lang',
    tags: ['随机'],
    relatedNodes: [],
    caption: `专题题 ${n} 道里随机抽（不含名词）`,
    questionCount: n,
  };
}

export {
  QUIZ_KINDS,
  QUIZ_DOMAINS,
  domainMeta,
  kindMeta,
  listQuizSets,
  getQuizSet,
  searchQuizSets,
  kindShortLabel,
};
