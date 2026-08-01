/**
 * 从知识节点派生：场景判断（非「核心认知/副标题识别」口水题）
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
  const stop = Math.max(
    cut.lastIndexOf('。'),
    cut.lastIndexOf('；'),
    cut.lastIndexOf('. ')
  );
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
    const point = clip(firstLessonPoint(node.markdown) || role, 110);
    const tag = String(node.tag || '课程').trim();
    const label = String(node.label || node.id);

    const wrongRoles = others
      .map((x) => clip(x.role || x.subtitle || x.label, 110))
      .filter((t) => t && t !== role)
      .slice(0, 6);
    const wrongPoints = others
      .map((x) => clip(firstLessonPoint(x.markdown) || x.role || x.subtitle, 110))
      .filter((t) => t && t !== point)
      .slice(0, 6);

    const q1 = normalizeQuestion(
      {
        q: `落地「${label}」时，哪项判断更贴近实务？`,
        choices: [
          {
            t: role,
            ok: true,
            why: `对应课节点约束 · ${node.id}`,
          },
          ...wrongRoles.slice(0, 3).map((t) => ({
            t,
            ok: false,
            why: `那是其他课的说法，用在「${label}」会偏题。`,
          })),
        ],
      },
      {
        id: `n:${node.id}:role`,
        kind: 'concept',
        domain,
        tags: ['场景', tag],
        relatedNodes: [node.id],
        source: 'node',
        setId: `pool-node-${domain}`,
        fillers: wrongRoles,
      }
    );
    if (q1) out.push(q1);

    if (point && point !== role) {
      const q2 = normalizeQuestion(
        {
          q: `排障/选型碰到「${label}」。哪句更不容易带偏？`,
          choices: [
            {
              t: point,
              ok: true,
              why: `课文要点 · ${node.id}`,
            },
            ...wrongPoints.slice(0, 3).map((t) => ({
              t,
              ok: false,
              why: `其他课摘录，不是「${label}」现场该抓的。`,
            })),
          ],
        },
        {
          id: `n:${node.id}:point`,
          kind: 'concept',
          domain,
          tags: ['场景', tag],
          relatedNodes: [node.id],
          source: 'node',
          setId: `pool-node-${domain}`,
          fillers: wrongPoints,
        }
      );
      if (q2) out.push(q2);
    }
  }

  return out;
}
