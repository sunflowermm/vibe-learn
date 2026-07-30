/**
 * 历史：词典派生（已退出生产路径）。
 * 新题请写入 ../bank/{domain}.js 或 ../sets/*.js。
 * 迁移参考：../_migrate/raw-derive.js
 */
import { listGlossary } from '../../glossary.js';
import { getNodeById } from '../../nodes.js';
import { normalizeQuestion, shuffleCopy } from '../schema.js';
import { inferDomain } from './infer-domain.js';

/**
 * @param {string} brief
 * @param {number} max
 */
function clipBrief(brief, max = 96) {
  const s = String(brief || '')
    .replace(/\s+/g, ' ')
    .trim();
  if (s.length <= max) return s;
  const slice = s.slice(0, max - 1);
  const cut = Math.max(slice.lastIndexOf('，'), slice.lastIndexOf('；'), slice.lastIndexOf('。'), slice.lastIndexOf(','), slice.lastIndexOf(' '));
  return `${(cut > 40 ? slice.slice(0, cut) : slice).trim()}…`;
}

/**
 * @returns {import('../schema.js').QuizQuestion[]}
 */
export function deriveGlossaryQuestions() {
  const all = listGlossary();
  if (all.length < 4) return [];

  /** @type {import('../schema.js').QuizQuestion[]} */
  const out = [];

  for (let i = 0; i < all.length; i += 1) {
    const e = all[i];
    const related = (e.also || []).filter((id) => getNodeById(id));
    const domain = inferDomain(related[0] || e.id, e.term);
    const pool = all.filter((x) => x.id !== e.id);
    const distractorBriefs = shuffleCopy(pool)
      .slice(0, 8)
      .map((x) => clipBrief(x.brief));

    const defQ = normalizeQuestion(
      {
        q: `下列哪一项最贴合「${e.term}」的定义？`,
        choices: [
          { t: clipBrief(e.brief, 120), ok: true, why: `词典：${e.id}` },
          ...distractorBriefs.slice(0, 3).map((t) => ({
            t,
            ok: false,
            why: '其他术语释义。',
          })),
        ],
      },
      {
        id: `g:${e.id}:def`,
        kind: 'concept',
        domain,
        tags: ['词典', e.id],
        relatedNodes: related.slice(0, 4),
        source: 'glossary',
        setId: `pool-glossary-${domain}`,
        fillers: distractorBriefs,
      }
    );
    if (defQ) out.push(defQ);

    if (related.length) {
      const correctNode = getNodeById(related[0]);
      const otherNodes = shuffleCopy(
        all
          .flatMap((x) => x.also || [])
          .filter((id) => id !== related[0] && getNodeById(id))
      );
      const wrongLabels = [];
      const seen = new Set([correctNode.label]);
      for (const id of otherNodes) {
        const n = getNodeById(id);
        if (!n || seen.has(n.label)) continue;
        seen.add(n.label);
        wrongLabels.push(n.label);
        if (wrongLabels.length >= 3) break;
      }
      while (wrongLabels.length < 3) {
        wrongLabels.push(`无关课节点 ${wrongLabels.length + 1}`);
      }

      const relQ = normalizeQuestion(
        {
          q: `「${e.term}」在本站最相关的课程更接近？`,
          choices: [
            { t: correctNode.label, ok: true, why: `also → ${related[0]}` },
            ...wrongLabels.slice(0, 3).map((t) => ({
              t,
              ok: false,
              why: '非该词条主相关课。',
            })),
          ],
        },
        {
          id: `g:${e.id}:node`,
          kind: 'concept',
          domain,
          tags: ['词典', e.id],
          relatedNodes: related.slice(0, 4),
          source: 'glossary',
          setId: `pool-glossary-${domain}`,
        }
      );
      if (relQ) out.push(relQ);
    } else {
      const termQ = normalizeQuestion(
        {
          q: `识别术语：下列哪一项是「${clipBrief(e.brief, 48)}」所指？`,
          choices: [
            { t: e.term, ok: true, why: `词典：${e.id}` },
            ...shuffleCopy(pool)
              .slice(0, 3)
              .map((x) => ({
                t: x.term,
                ok: false,
                why: '其他词条。',
              })),
          ],
        },
        {
          id: `g:${e.id}:term`,
          kind: 'concept',
          domain,
          tags: ['词典', e.id],
          relatedNodes: [],
          source: 'glossary',
          setId: `pool-glossary-${domain}`,
        }
      );
      if (termQ) out.push(termQ);
    }
  }

  return out;
}
