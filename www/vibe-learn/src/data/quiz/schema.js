/**
 * 题库规范化：四选一、恰一正确；禁止静默塞通用填充项。
 */

/** @typedef {import('./categories.js').QuizKindId} QuizKindId */
/** @typedef {import('./categories.js').QuizDomainId} QuizDomainId */

/** @typedef {{ t: string, ok: boolean, why?: string, reveal?: string }} QuizChoice */

/**
 * @typedef {{
 *   id: string,
 *   q: string,
 *   choices: QuizChoice[],
 *   kind: QuizKindId,
 *   domain: QuizDomainId,
 *   tags?: string[],
 *   relatedNodes?: string[],
 *   source?: 'curated' | 'static' | 'glossary' | 'lesson' | 'node' | 'adapted',
 *   origin?: 'original' | 'adapted',
 *   attribution?: string,
 *   attributionUrl?: string,
 *   setId?: string,
 * }} QuizQuestion
 */

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   kind: QuizKindId,
 *   domain: QuizDomainId,
 *   tags?: string[],
 *   relatedNodes?: string[],
 *   caption?: string,
 *   origin?: 'original' | 'adapted',
 *   attribution?: string,
 *   attributionUrl?: string,
 *   questions: Array<QuizQuestion | object>,
 * }} QuizSet
 */

/** 审计用：出现在选项中视为质量失败 */
export const BANNED_FILLER_PATTERNS = [
  /^干扰项/,
  /以上说法均不成立/,
  /与题干无关，可直接排除/,
  /仅在极端特例下成立/,
  /表述过绝对，缺少必要边界/,
];

/** 题组 / 单题可挂知识节点上限（与 bank 聚合对齐；过短会让长课链挂不全） */
export const RELATED_NODES_MAX = 8;

/**
 * 规范化选项；不足 4 项或无正确项时返回 null（不自动灌填充项）。
 * @param {QuizChoice[]} choices
 * @returns {QuizChoice[] | null}
 */
export function normalizeChoices(choices) {
  const raw = (Array.isArray(choices) ? choices : [])
    .map((c) => ({
      t: String(c?.t ?? c?.text ?? '').trim(),
      ok: Boolean(c?.ok),
      why: c?.why != null ? String(c.why) : '',
      reveal: c?.reveal != null ? String(c.reveal).trim() : '',
    }))
    .filter((c) => c.t);

  let correct = raw.filter((c) => c.ok);
  let wrong = raw.filter((c) => !c.ok);

  if (correct.length === 0) return null;
  if (correct.length > 1) {
    correct = [correct[0]];
    wrong = [
      ...wrong,
      ...raw
        .filter((c) => c.ok)
        .slice(1)
        .map((c) => ({ ...c, ok: false })),
    ];
  }

  if (wrong.length < 3) return null;

  const out = shuffleCopy([correct[0], ...wrong.slice(0, 3)]);
  if (out.length !== 4 || !out.every((c) => c.t)) return null;
  return out.map((c) => {
    const row = { t: c.t, ok: c.ok, why: c.why || '' };
    if (c.reveal) row.reveal = c.reveal;
    return row;
  });
}

/**
 * @param {string} text
 * @returns {boolean}
 */
export function choiceLooksLikeFiller(text) {
  const t = String(text || '').trim();
  return BANNED_FILLER_PATTERNS.some((re) => re.test(t));
}

/**
 * @param {object} raw
 * @param {{
 *   id?: string,
 *   kind?: QuizKindId,
 *   domain?: QuizDomainId,
 *   tags?: string[],
 *   relatedNodes?: string[],
 *   source?: QuizQuestion['source'],
 *   setId?: string,
 * }} meta
 * @returns {QuizQuestion | null}
 */
export function normalizeQuestion(raw, meta = {}) {
  const q = String(raw?.q ?? raw?.prompt ?? '').trim();
  if (!q) return null;
  const choices = normalizeChoices(raw?.choices || raw?.options || []);
  if (!choices) return null;
  if (choices.some((c) => choiceLooksLikeFiller(c.t))) return null;

  const id =
    meta.id ||
    raw?.id ||
    `${meta.setId || meta.source || 'q'}:${hashId(q)}`;

  const related = uniqueStrings([
    ...(raw?.relatedNodes || raw?.also || []),
    ...(meta.relatedNodes || []),
  ]).slice(0, RELATED_NODES_MAX);

  return {
    id: String(id),
    q,
    choices,
    kind: meta.kind || raw?.kind || 'concept',
    domain: meta.domain || raw?.domain || 'lang',
    tags: uniqueStrings([...(meta.tags || []), ...(raw?.tags || [])]),
    relatedNodes: related,
    source: meta.source || raw?.source || 'curated',
    setId: meta.setId || raw?.setId,
    origin: raw?.origin || meta.origin || 'original',
    attribution: String(raw?.attribution || meta.attribution || '').trim() || undefined,
    attributionUrl:
      String(raw?.attributionUrl || meta.attributionUrl || '').trim() || undefined,
  };
}

/** @param {string[]} arr */
function uniqueStrings(arr) {
  const out = [];
  const seen = new Set();
  for (const x of arr) {
    const s = String(x || '').trim();
    if (!s || seen.has(s)) continue;
    seen.add(s);
    out.push(s);
  }
  return out;
}

/** @param {string} s */
function hashId(s) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

/**
 * @param {QuizSet} set
 * @returns {QuizSet}
 */
export function defineQuizSet(set) {
  if (!set?.id || typeof set.id !== 'string') {
    throw new Error('defineQuizSet: 需要稳定 id');
  }
  if (!set.title) throw new Error(`defineQuizSet(${set.id}): 需要 title`);
  if (set.kind !== 'interview' && set.kind !== 'concept') {
    throw new Error(`defineQuizSet(${set.id}): kind 须为 interview | concept`);
  }
  if (!set.domain) throw new Error(`defineQuizSet(${set.id}): 需要 domain`);
  if (!Array.isArray(set.questions) || !set.questions.length) {
    throw new Error(`defineQuizSet(${set.id}): questions 不能为空`);
  }

  const tags = set.tags || [];
  const relatedNodes = uniqueStrings(set.relatedNodes || []).slice(
    0,
    RELATED_NODES_MAX
  );
  // 多课混编 set：勿把全部节点只挂在 set 级——缺 relatedNodes 的题会整包继承，
  // 刷题台按节点筛选就会串台（调子服刷到最小贡献路径）。一题一挂。
  const questions = set.questions
    .map((raw, i) => {
      const own = uniqueStrings(raw?.relatedNodes || raw?.also || []);
      return normalizeQuestion(raw, {
        id: raw?.id || `${set.id}:q${i + 1}`,
        kind: raw?.kind || set.kind,
        domain: raw?.domain || set.domain,
        tags,
        relatedNodes: own.length
          ? own.slice(0, RELATED_NODES_MAX)
          : relatedNodes,
        source: set.origin === 'adapted' || raw?.origin === 'adapted' ? 'adapted' : 'curated',
        setId: set.id,
        origin: raw?.origin || set.origin || 'original',
        attribution: raw?.attribution || set.attribution,
        attributionUrl: raw?.attributionUrl || set.attributionUrl,
      });
    })
    .filter(Boolean);

  if (!questions.length) {
    throw new Error(`defineQuizSet(${set.id}): 规范化后 questions 为空（检查是否不足四选一或含填充项）`);
  }

  return {
    tags,
    relatedNodes,
    caption: set.caption || '',
    ...set,
    questions,
  };
}

/**
 * @param {QuizSet} set
 */
export function toQuizModel(set) {
  const defaultCaption =
    set.kind === 'interview' ? '大厂真题向 · 重开口' : '概念细节向 · 重边界';
  return {
    title: set.title,
    caption: set.caption || defaultCaption,
    questions: (set.questions || [])
      .map((q) => {
        const choices = normalizeChoices(q.choices);
        if (!choices) return null;
        return { q: q.q, choices };
      })
      .filter(Boolean),
  };
}

/**
 * Fisher–Yates
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export function shuffleCopy(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
