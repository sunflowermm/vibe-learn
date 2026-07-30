/**
 * 从知识节点派生：用课内 role / subtitle / 首段要点作正确答案（非标签游戏）
 */
import { knowledgeNodes } from '../../nodes.js';
import { normalizeQuestion, shuffleCopy } from '../schema.js';
import { inferDomain } from './infer-domain.js';

/**
 * @param {string} md
 * @returns {string}
 */
function firstLessonPoint(md) {
  const text = String(md || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>#\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return '';
  const cut = text.slice(0, 120);
  const stop = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('；'), cut.lastIndexOf('. '));
  return (stop > 24 ? cut.slice(0, stop + 1) : cut).trim();
}

/**
 * @param {string} s
 * @param {number} max
 */
function clip(s, max = 96) {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

/**
 * @returns {import('../schema.js').QuizQuestion[]}
 */
export function deriveNodeQuestions() {
  const topics = knowledgeNodes.filter((n) => n.kind !== 'chapter' && n.id);
  if (topics.length < 4) return [];

  /** @type {import('../schema.js').QuizQuestion[]} */
  const out = [];

  for (const node of topics) {
    const domain = inferDomain(node.id, node.tag);
    const others = shuffleCopy(topics.filter((x) => x.id !== node.id));
    const role = clip(node.role || node.subtitle || node.label, 110);
    const subtitle = clip(node.subtitle || node.label, 72);
    const point = clip(firstLessonPoint(node.markdown) || role, 110);
    const tag = String(node.tag || '课程').trim();

    const wrongRoles = others
      .map((x) => clip(x.role || x.subtitle || x.label, 110))
      .filter((t) => t && t !== role)
      .slice(0, 6);
    const wrongSubs = others
      .map((x) => clip(x.subtitle || x.label, 72))
      .filter((t) => t && t !== subtitle)
      .slice(0, 6);
    const wrongPoints = others
      .map((x) => clip(firstLessonPoint(x.markdown) || x.role || x.subtitle, 110))
      .filter((t) => t && t !== point)
      .slice(0, 6);

    const q1 = normalizeQuestion(
      {
        q: `关于「${node.label}」，本课要建立的核心认知更接近？`,
        choices: [
          { t: role, ok: true, why: `课节点 role · ${node.id}` },
          ...wrongRoles.slice(0, 3).map((t) => ({ t, ok: false, why: '其他课表述。' })),
        ],
      },
      {
        id: `n:${node.id}:role`,
        kind: 'concept',
        domain,
        tags: ['课节点', tag],
        relatedNodes: [node.id],
        source: 'node',
        setId: `pool-node-${domain}`,
        fillers: wrongRoles,
      }
    );
    if (q1) out.push(q1);

    const q2 = normalizeQuestion(
      {
        q: `「${node.label}」在图谱上的定位副标题是？`,
        choices: [
          { t: subtitle, ok: true, why: node.id },
          ...wrongSubs.slice(0, 3).map((t) => ({ t, ok: false, why: '其他课副标题。' })),
        ],
      },
      {
        id: `n:${node.id}:subtitle`,
        kind: 'concept',
        domain,
        tags: ['课节点', tag],
        relatedNodes: [node.id],
        source: 'node',
        setId: `pool-node-${domain}`,
        fillers: wrongSubs,
      }
    );
    if (q2) out.push(q2);

    if (point) {
      const q3 = normalizeQuestion(
        {
          q: `下列哪一句更贴近「${node.label}」课文要点？`,
          choices: [
            { t: point, ok: true, why: `课文摘录 · ${node.id}` },
            ...wrongPoints.slice(0, 3).map((t) => ({ t, ok: false, why: '其他课摘录。' })),
          ],
        },
        {
          id: `n:${node.id}:point`,
          kind: 'concept',
          domain,
          tags: ['课节点', tag],
          relatedNodes: [node.id],
          source: 'node',
          setId: `pool-node-${domain}`,
          fillers: wrongPoints,
        }
      );
      if (q3) out.push(q3);
    }
  }

  return out;
}
