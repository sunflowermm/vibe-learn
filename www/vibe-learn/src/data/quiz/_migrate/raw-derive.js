/**
 * 迁移专用：产出「原始题」对象（不经生产 schema）。
 * 仅 scripts/migrate-quiz-dump.mjs 使用，勿被 bank.js import。
 */
import { listGlossary } from '../../glossary.js';
import { getNodeById, knowledgeNodes } from '../../nodes.js';
import { parseQuizSource } from '../../../utils/lesson-widget-play.js';
import { shuffleCopy } from '../schema.js';
import { inferDomain } from '../derive/infer-domain.js';

function clipBrief(brief, max = 96) {
  const s = String(brief || '')
    .replace(/\s+/g, ' ')
    .trim();
  if (s.length <= max) return s;
  const slice = s.slice(0, max - 1);
  const cut = Math.max(
    slice.lastIndexOf('，'),
    slice.lastIndexOf('；'),
    slice.lastIndexOf('。'),
    slice.lastIndexOf(','),
    slice.lastIndexOf(' ')
  );
  return `${(cut > 40 ? slice.slice(0, cut) : slice).trim()}…`;
}

function clip(s, max = 96) {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

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

/** @returns {object[]} */
export function rawGlossaryQuestions() {
  const all = listGlossary();
  if (all.length < 4) return [];
  const out = [];

  for (const e of all) {
    const related = (e.also || []).filter((id) => getNodeById(id)).slice(0, 3);
    const domain = inferDomain(related[0] || e.id, e.term);
    const pool = all.filter((x) => x.id !== e.id);
    const distractorBriefs = shuffleCopy(pool)
      .slice(0, 8)
      .map((x) => clipBrief(x.brief));

    out.push({
      id: `g:${e.id}:def`,
      q: `下列哪一项最贴合「${e.term}」的定义？`,
      choices: [
        { t: clipBrief(e.brief, 120), ok: true, why: `词典：${e.id}` },
        ...distractorBriefs.slice(0, 3).map((t) => ({
          t,
          ok: false,
          why: '其他术语释义。',
        })),
      ],
      kind: 'concept',
      domain,
      tags: ['词典', e.id],
      relatedNodes: related,
      source: 'glossary',
    });

    if (related.length) {
      const correctNode = getNodeById(related[0]);
      const otherNodes = shuffleCopy(
        all.flatMap((x) => x.also || []).filter((id) => id !== related[0] && getNodeById(id))
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
        wrongLabels.push(`其他课程节点 ${wrongLabels.length + 1}`);
      }
      out.push({
        id: `g:${e.id}:node`,
        q: `「${e.term}」在本站最相关的课程更接近？`,
        choices: [
          { t: correctNode.label, ok: true, why: `also → ${related[0]}` },
          ...wrongLabels.slice(0, 3).map((t) => ({
            t,
            ok: false,
            why: '非该词条主相关课。',
          })),
        ],
        kind: 'concept',
        domain,
        tags: ['词典', e.id],
        relatedNodes: related,
        source: 'glossary',
      });
    } else {
      out.push({
        id: `g:${e.id}:term`,
        q: `识别术语：下列哪一项是「${clipBrief(e.brief, 48)}」所指？`,
        choices: [
          { t: e.term, ok: true, why: `词典：${e.id}` },
          ...shuffleCopy(pool)
            .slice(0, 3)
            .map((x) => ({ t: x.term, ok: false, why: '其他词条。' })),
        ],
        kind: 'concept',
        domain,
        tags: ['词典', e.id],
        relatedNodes: [],
        source: 'glossary',
      });
    }
  }
  return out;
}

const QUIZ_FENCE_RE = /```quiz\s*\n([\s\S]*?)```/gi;

/** @returns {object[]} */
export function rawLessonQuestions() {
  const out = [];
  const seen = new Set();
  for (const node of knowledgeNodes) {
    const md = String(node.markdown || '');
    if (!md.includes('```quiz')) continue;
    const domain = inferDomain(node.id, node.tag);
    let blockIdx = 0;
    QUIZ_FENCE_RE.lastIndex = 0;
    let m;
    while ((m = QUIZ_FENCE_RE.exec(md))) {
      blockIdx += 1;
      const model = parseQuizSource(m[1]);
      (model.questions || []).forEach((raw, qi) => {
        const id = `l:${node.id}:b${blockIdx}:q${qi + 1}`;
        if (seen.has(id)) return;
        seen.add(id);
        out.push({
          id,
          q: raw.q || raw.prompt,
          choices: raw.choices || raw.options || [],
          kind: 'concept',
          domain,
          tags: ['课文自测', node.tag, node.id].filter(Boolean),
          relatedNodes: [node.id],
          source: 'lesson',
        });
      });
    }
  }
  return out;
}

/** @returns {object[]} */
export function rawNodeQuestions() {
  const topics = knowledgeNodes.filter((n) => n.kind !== 'chapter' && n.id);
  if (topics.length < 4) return [];
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

    out.push({
      id: `n:${node.id}:role`,
      q: `关于「${node.label}」，本课要建立的核心认知更接近？`,
      choices: [
        { t: role, ok: true, why: `课节点 role · ${node.id}` },
        ...wrongRoles.slice(0, 3).map((t) => ({ t, ok: false, why: '其他课表述。' })),
      ],
      kind: 'concept',
      domain,
      tags: ['课节点', tag],
      relatedNodes: [node.id],
      source: 'node',
    });

    out.push({
      id: `n:${node.id}:subtitle`,
      q: `「${node.label}」在图谱上的定位副标题是？`,
      choices: [
        { t: subtitle, ok: true, why: node.id },
        ...wrongSubs.slice(0, 3).map((t) => ({ t, ok: false, why: '其他课副标题。' })),
      ],
      kind: 'concept',
      domain,
      tags: ['课节点', tag],
      relatedNodes: [node.id],
      source: 'node',
    });

    if (point) {
      out.push({
        id: `n:${node.id}:point`,
        q: `下列哪一句更贴近「${node.label}」课文要点？`,
        choices: [
          { t: point, ok: true, why: `课文摘录 · ${node.id}` },
          ...wrongPoints.slice(0, 3).map((t) => ({ t, ok: false, why: '其他课摘录。' })),
        ],
        kind: 'concept',
        domain,
        tags: ['课节点', tag],
        relatedNodes: [node.id],
        source: 'node',
      });
    }
  }
  return out;
}
