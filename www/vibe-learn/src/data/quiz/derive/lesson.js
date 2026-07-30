/**
 * 从课文 ```quiz 围栏收获题目
 */
import { parseQuizSource } from '../../../utils/lesson-widget-play.js';
import { knowledgeNodes } from '../../nodes.js';
import { normalizeQuestion } from '../schema.js';
import { inferDomain } from './infer-domain.js';

const QUIZ_FENCE_RE = /```quiz\s*\n([\s\S]*?)```/gi;

/**
 * @returns {import('../schema.js').QuizQuestion[]}
 */
export function deriveLessonQuestions() {
  /** @type {import('../schema.js').QuizQuestion[]} */
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
        const nq = normalizeQuestion(raw, {
          id,
          kind: 'concept',
          domain,
          tags: ['课文自测', node.tag, node.id].filter(Boolean),
          relatedNodes: [node.id],
          source: 'lesson',
          setId: `pool-lesson-${domain}`,
        });
        if (!nq) return;
        seen.add(id);
        out.push(nq);
      });
    }
  }

  return out;
}
