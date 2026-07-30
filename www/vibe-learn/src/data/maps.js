/**
 * 学习站可切换的思维导图清单（左上角切换；后续可继续登记）
 */

/** @typedef {{
 *   id: string,
 *   label: string,
 *   short: string,
 *   blurb: string,
 * }} LearningMapMeta */

/** @type {LearningMapMeta[]} */
export const LEARNING_MAPS = [
  {
    id: 'knowledge',
    label: '知识图谱',
    short: '课程',
    blurb: '章节内容与学习路径',
  },
  {
    id: 'quiz',
    label: '题库',
    short: '刷题',
    blurb: '精选 + 派生题 · 整组 / 随机',
  },
];

const byId = new Map(LEARNING_MAPS.map((m) => [m.id, m]));

/** @param {string} id */
export function getLearningMap(id) {
  return byId.get(id) || LEARNING_MAPS[0];
}

/** @param {string | null | undefined} raw */
export function normalizeMapId(raw) {
  if (raw === 'quiz' || raw === 'mode-quiz') return 'quiz';
  return 'knowledge';
}
