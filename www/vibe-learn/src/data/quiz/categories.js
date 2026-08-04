/**
 * 题库分类：kind（题型）× domain（领域）
 * 扩题：在 sets/ 加文件 → index.js 登记一行即可。
 */

/** @typedef {'interview' | 'concept'} QuizKindId */
/** @typedef {'dsa' | 'net' | 'os-db' | 'lang' | 'craft' | 'xrk' | 'ai' | 'ops' | 'vibe'} QuizDomainId */

/**
 * @typedef {{
 *   id: QuizKindId | 'all',
 *   label: string,
 *   short: string,
 * }} QuizKindMeta
 */

/**
 * @typedef {{
 *   id: QuizDomainId | 'all',
 *   label: string,
 * }} QuizDomainMeta
 */

/** @type {QuizKindMeta[]} */
export const QUIZ_KINDS = [
  { id: 'all', label: '全部', short: '全部' },
  { id: 'interview', label: '大厂真题', short: '大厂' },
  { id: 'concept', label: '概念细节', short: '概念' },
];

/** @type {QuizDomainMeta[]} */
export const QUIZ_DOMAINS = [
  { id: 'all', label: '全部领域' },
  { id: 'dsa', label: '算法结构' },
  { id: 'net', label: '网络' },
  { id: 'os-db', label: '系统与库' },
  { id: 'lang', label: '语言运行时' },
  { id: 'craft', label: '工程卫生' },
  { id: 'xrk', label: 'XRK' },
  { id: 'ai', label: 'AI 应用' },
  { id: 'vibe', label: 'Vibe 术语' },
  { id: 'ops', label: '运维面板' },
];

/** @param {string} kindId */
export function kindMeta(kindId) {
  return QUIZ_KINDS.find((k) => k.id === kindId) || QUIZ_KINDS[0];
}

/** @param {string} domainId */
export function domainMeta(domainId) {
  return QUIZ_DOMAINS.find((d) => d.id === domainId) || QUIZ_DOMAINS[0];
}
