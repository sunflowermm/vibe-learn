/**
 * 学习站可切换的思维导图清单（左上角切换）
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
    label: '知识导图',
    short: '导图1',
    blurb: '系统默认 · 左侧整图入口 · 章节路径',
  },
  {
    id: 'knowledge2',
    label: '知识导图2',
    short: '导图2',
    blurb: '词表枢纽 · 七大区名词字典',
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
  if (
    raw === 'knowledge2' ||
    raw === 'vibe' ||
    raw === 'terms' ||
    raw === 'vibehub' ||
    raw === 'map2'
  ) {
    return 'knowledge2';
  }
  return 'knowledge';
}
