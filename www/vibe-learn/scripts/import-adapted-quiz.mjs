/**
 * AI 全栈工程师向：从开源面试题库改编 MCQ 落盘（系统非原创 + 来源）。
 * 不做「猜 JS 输出」类刷题；对齐 RAG / Agent / LLM / 工具协议 / 工程托管。
 *
 * 代理：HTTP_PROXY=http://127.0.0.1:7890
 * 用法：pnpm run quiz:import
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ProxyAgent, fetch as ufetch } from 'undici';
import { inferRelated } from './lib/infer-related.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const setsDir = path.join(root, 'src/data/quiz/sets');
const bankDir = path.join(root, 'src/data/quiz/bank');
const sourcesPath = path.join(root, 'src/data/quiz/sources.js');

const PROXY =
  process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.ALL_PROXY || '';

const FILLER_WRONG = [
  '把全部私有知识硬塞进基座微调权重，再也不检索',
  '关掉所有日志与评测，只凭感觉上线',
  '用更大参数量替代一切工程设计，成本与权限都不考虑',
  '禁止工具调用与检索，只靠模型背诵公司文档',
];

/** @type {object[]} */
const SOURCES = [
  {
    id: 'naresh-rag',
    label: 'Nareshedagotti/AI-Engineer-Interview-QA · RAG',
    url: 'https://raw.githubusercontent.com/Nareshedagotti/AI-Engineer-Interview-QA/main/RAG_QA.md',
    homepage: 'https://github.com/Nareshedagotti/AI-Engineer-Interview-QA',
    license: '未标明则以仓库为准 · 公开流传改编',
    domain: 'ai',
    kind: 'interview',
    parse: 'naresh-h2',
    limit: 50,
    relatedFallback: ['ai-rag', 'ai-embedding', 'ai-rag-shift'],
    tags: ['RAG', '检索', 'AI全栈'],
    title: '开源改编 · RAG 工程面试',
  },
  {
    id: 'naresh-llm',
    label: 'Nareshedagotti/AI-Engineer-Interview-QA · LLM',
    url: 'https://raw.githubusercontent.com/Nareshedagotti/AI-Engineer-Interview-QA/main/LLM_Interview_Questions.md',
    homepage: 'https://github.com/Nareshedagotti/AI-Engineer-Interview-QA',
    license: '公开流传改编',
    domain: 'ai',
    kind: 'interview',
    parse: 'naresh-qn',
    limit: 40,
    relatedFallback: ['ai-token-context', 'ai-llm-era', 'ai-openai-protocol'],
    tags: ['LLM', 'Token', 'AI全栈'],
    title: '开源改编 · LLM 基础面试',
  },
  {
    id: 'naresh-agent',
    label: 'Nareshedagotti/AI-Engineer-Interview-QA · Agentic',
    url: 'https://raw.githubusercontent.com/Nareshedagotti/AI-Engineer-Interview-QA/main/Agentic_AI_Interview_Questions.md',
    homepage: 'https://github.com/Nareshedagotti/AI-Engineer-Interview-QA',
    license: '公开流传改编',
    domain: 'ai',
    kind: 'interview',
    parse: 'naresh-qn',
    limit: 40,
    relatedFallback: ['ai-agent-birth', 'ai-tool-calling', 'ai-agent-graph'],
    tags: ['Agent', '工具调用', 'AI全栈'],
    title: '开源改编 · Agent 系统面试',
  },
  {
    id: 'naresh-transformer',
    label: 'Nareshedagotti/AI-Engineer-Interview-QA · Transformers',
    url: 'https://raw.githubusercontent.com/Nareshedagotti/AI-Engineer-Interview-QA/main/TRANSFORMERS_QA.md',
    homepage: 'https://github.com/Nareshedagotti/AI-Engineer-Interview-QA',
    license: '公开流传改编',
    domain: 'ai',
    kind: 'concept',
    parse: 'naresh-h2',
    limit: 40,
    relatedFallback: ['ai-transformer', 'ai-attention', 'ai-arch-beyond'],
    tags: ['Transformer', '注意力', 'AI全栈'],
    title: '开源改编 · Transformer 概念',
  },
  {
    id: 'guo-rag',
    label: 'guocong-bincai/ai-interview-guide · RAG',
    url: 'https://raw.githubusercontent.com/guocong-bincai/ai-interview-guide/main/docs/03-rag-system/README.md',
    homepage: 'https://github.com/guocong-bincai/ai-interview-guide',
    license: 'MIT',
    domain: 'ai',
    kind: 'interview',
    parse: 'guocong',
    limit: 30,
    relatedFallback: ['ai-rag', 'ai-agentic-rag', 'ai-embedding'],
    tags: ['RAG', '中文面试', 'AI全栈'],
    title: '开源改编 · RAG 中文面经',
  },
  {
    id: 'guo-agent',
    label: 'guocong-bincai/ai-interview-guide · Agent',
    url: 'https://raw.githubusercontent.com/guocong-bincai/ai-interview-guide/main/docs/05-ai-agent-basics/README.md',
    homepage: 'https://github.com/guocong-bincai/ai-interview-guide',
    license: 'MIT',
    domain: 'ai',
    kind: 'interview',
    parse: 'guocong',
    limit: 40,
    relatedFallback: ['ai-agent-birth', 'ai-mcp', 'ai-tool-calling'],
    tags: ['Agent', 'MCP', 'AI全栈'],
    title: '开源改编 · Agent 中文面经',
  },
  ...[
    ['guo-prompt', '02-prompt-engineering', 'Prompt', ['ai-openai-protocol', 'ai-rules', 'ai-skills'], '开源改编 · Prompt 工程'],
    ['guo-mcp', '14-mcp-skill-systems', 'MCP', ['ai-mcp', 'ai-skills', 'ai-tool-calling'], '开源改编 · MCP 与技能'],
    ['guo-multi-agent', '13-multi-agent-systems', '多Agent', ['ai-agent-graph', 'ai-subagent', 'ai-agent-birth'], '开源改编 · 多 Agent'],
    ['guo-prod', '10-production-deployment', '上线', ['craft-observability', 'craft-security', 'ai-rag'], '开源改编 · AI 上线运维'],
    ['guo-rag-adv', '20-rag-advanced-optimization', 'RAG进阶', ['ai-rag', 'ai-agentic-rag', 'ai-embedding'], '开源改编 · RAG 进阶'],
    ['guo-obs', '23-agent-observability', '观测', ['craft-observability', 'ai-agent-birth', 'xrk-stream'], '开源改编 · Agent 观测'],
    ['guo-sys', '25-system-design-ai', '系统设计', ['ai-rag-shift', 'ai-agent-graph', 'xrk-runtime'], '开源改编 · AI 系统设计'],
  ].map(([id, folder, tag, relatedFallback, title]) => ({
    id,
    label: `guocong-bincai/ai-interview-guide · ${folder}`,
    url: `https://raw.githubusercontent.com/guocong-bincai/ai-interview-guide/main/docs/${folder}/README.md`,
    homepage: 'https://github.com/guocong-bincai/ai-interview-guide',
    license: 'MIT',
    domain: 'ai',
    kind: 'interview',
    parse: 'guocong',
    limit: 40,
    relatedFallback,
    tags: [tag, '中文面试', 'AI全栈'],
    title,
  })),
  ...[
    'retrieval',
    'embeddings',
    'chunking',
    'reranking',
    'evaluation',
    'production',
    'security',
  ].map((slug) => ({
    id: `landed-${slug}`,
    label: `landedjobs/rag-engineer-interview-questions · ${slug}`,
    url: `https://raw.githubusercontent.com/landedjobs/rag-engineer-interview-questions/main/questions/${slug}.md`,
    homepage: 'https://github.com/landedjobs/rag-engineer-interview-questions',
    license: 'MIT',
    domain: 'ai',
    kind: 'interview',
    parse: 'landed-mcq',
    limit: 20,
    relatedFallback: inferFallbackForLanded(slug),
    tags: ['RAG', 'MCQ', 'AI全栈', slug],
    title: `开源改编 · RAG ${slug}`,
  })),
];

function inferFallbackForLanded(slug) {
  if (slug === 'embeddings') return ['ai-embedding', 'ai-rag', 'ai-token-context'];
  if (slug === 'production' || slug === 'security') {
    return ['craft-observability', 'craft-security', 'ai-rag'];
  }
  if (slug === 'evaluation') return ['craft-testing', 'ai-rag', 'ai-rag-shift'];
  return ['ai-rag', 'ai-embedding', 'ai-agentic-rag'];
}

async function fetchText(url) {
  const opts = {
    signal: AbortSignal.timeout(120000),
    headers: { 'User-Agent': 'vibe-learn-quiz-import' },
  };
  if (PROXY) {
    opts.dispatcher = new ProxyAgent(PROXY);
    const res = await ufetch(url, opts);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return await res.text();
  }
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return await res.text();
}

function cleanText(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\*\*/g, '')
    .replace(/^>\s?/gm, '')
    .replace(/\r/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstSentences(s, maxLen = 110) {
  const t = cleanText(s);
  const cut = t.split(/(?<=[。.!？?])\s+/).slice(0, 2).join(' ');
  const out = (cut || t).slice(0, maxLen);
  return out.length < 12 ? t.slice(0, maxLen) : out;
}

/**
 * @param {{ q: string, answer: string, id: string }[]} pairs
 * @param {number} limit
 */
function pairsToMcq(pairs, limit) {
  const pool = pairs
    .map((p) => ({
      ...p,
      tip: firstSentences(p.answer, 120),
    }))
    .filter((p) => p.q.length >= 8 && p.tip.length >= 12);

  /** @type {object[]} */
  const out = [];
  for (let i = 0; i < pool.length && out.length < limit; i += 1) {
    const cur = pool[i];
    const wrongTips = [];
    for (let j = 1; j < pool.length && wrongTips.length < 3; j += 1) {
      const other = pool[(i + j * 7) % pool.length];
      if (other.tip === cur.tip) continue;
      if (wrongTips.includes(other.tip)) continue;
      wrongTips.push(other.tip);
    }
    while (wrongTips.length < 3) {
      const f = FILLER_WRONG[wrongTips.length % FILLER_WRONG.length];
      if (!wrongTips.includes(f) && f !== cur.tip) wrongTips.push(f);
      else wrongTips.push(`${f}（变体${wrongTips.length}）`);
    }

    const choices = [
      { t: cur.tip, ok: true, why: firstSentences(cur.answer, 200) },
      ...wrongTips.slice(0, 3).map((t) => ({
        t,
        ok: false,
        why: '与本题考点不符；对照正确项看检索/Agent/模型工程边界。',
      })),
    ];

    out.push({
      id: cur.id,
      q: cur.q.length > 280 ? `${cur.q.slice(0, 280)}…` : cur.q,
      choices,
      relatedNodes: inferRelated(`${cur.q} ${cur.answer}`),
    });
  }
  return out;
}

const ANSWER_HEAD = '\\*\\*Answer:?\\*\\*';

/** ## N. question + **Answer:** / **Answer** */
function parseNareshH2(md, limit, idPrefix) {
  const parts = md.split(/\n(?=## \d+\.\s)/);
  /** @type {{ q: string, answer: string, id: string }[]} */
  const pairs = [];
  const re = new RegExp(
    `^## (\\d+)\\.\\s*(.+?)\\s*\\n+${ANSWER_HEAD}\\s*([\\s\\S]+?)(?=\\n## \\d+\\.|\\n# |\\s*$)`,
    'i'
  );
  for (const part of parts) {
    const m = part.match(re);
    if (!m) continue;
    pairs.push({
      id: `adapted:${idPrefix}:${m[1]}`,
      q: cleanText(m[2]),
      answer: m[3],
    });
  }
  return pairsToMcq(pairs, limit);
}

/** ### QN. question + **Answer:** / **Answer** */
function parseNareshQn(md, limit, idPrefix) {
  const parts = md.split(/\n(?=### Q\d+)/);
  /** @type {{ q: string, answer: string, id: string }[]} */
  const pairs = [];
  const re = new RegExp(
    `^### (Q\\d+)\\.\\s*(.+?)\\s*\\n+${ANSWER_HEAD}\\s*([\\s\\S]+?)(?=\\n### Q\\d+|\\n## |\\s*$)`,
    'i'
  );
  for (const part of parts) {
    const m = part.match(re);
    if (!m) continue;
    pairs.push({
      id: `adapted:${idPrefix}:${m[1].toLowerCase()}`,
      q: cleanText(m[2]),
      answer: m[3],
    });
  }
  return pairsToMcq(pairs, limit);
}

/** ### QN: question + details summary */
function parseGuocong(md, limit, idPrefix) {
  const parts = md.split(/\n(?=### Q\d+)/);
  /** @type {{ q: string, answer: string, id: string }[]} */
  const pairs = [];
  for (const part of parts) {
    const m = part.match(/^### (Q\d+)[:：]\s*(.+?)\s*\n+([\s\S]+?)(?=\n### Q\d+|\n## |\s*$)/);
    if (!m) continue;
    const body = m[3];
    const detail = body.match(/<details>[\s\S]*?<summary>[\s\S]*?<\/summary>([\s\S]*?)(?:<\/details>|$)/i);
    const answer = detail ? detail[1] : body;
    pairs.push({
      id: `adapted:${idPrefix}:${m[1].toLowerCase()}`,
      q: cleanText(m[2]),
      answer,
    });
  }
  return pairsToMcq(pairs, limit);
}

/** landedjobs ✅ / ▫️ MCQ：`**Q1 · 🟢 stem?**` + `- ✅ text — *why*` */
function parseLandedMcq(md, limit, idPrefix) {
  const parts = md.split(/\n(?=\*\*Q\d+)/);
  /** @type {object[]} */
  const out = [];
  for (const part of parts) {
    const hm = part.match(/^\*\*(Q\d+)\s*·\s*[🟢🟡🔴]?\s*([\s\S]+?)\*\*\s*\n/);
    if (!hm) continue;
    const qid = hm[1];
    const stem = cleanText(hm[2]);
    const optLines = part.match(/^-\s*(?:✅|▫️)\s+.+$/gm) || [];
    if (optLines.length < 2) continue;

    /** @type {{ t: string, ok: boolean, why: string }[]} */
    const choices = [];
    for (const line of optLines) {
      const ok = line.includes('✅');
      const body = line.replace(/^-\s*(?:✅|▫️)\s+/, '').trim();
      const whyM = body.match(/\s+—\s+\*(.+?)\*\s*$/);
      const why = cleanText(whyM?.[1] || (ok ? '正确项。' : '干扰项。')).slice(0, 180);
      const text = whyM ? body.slice(0, whyM.index).trim() : body;
      // 去掉选项内第一段解释性破折号后的长尾巴，保留短题面
      const short = text.includes(' — ')
        ? text.split(' — ').slice(0, 2).join(' — ').slice(0, 160)
        : text.slice(0, 160);
      if (short.length < 4) continue;
      choices.push({ t: short, ok, why });
    }
    if (!choices.some((c) => c.ok)) continue;
    while (choices.length < 4) {
      const f = FILLER_WRONG[choices.length % FILLER_WRONG.length];
      choices.push({
        t: f,
        ok: false,
        why: '与本题架构/工程边界不符。',
      });
    }
    let seenOk = false;
    for (const c of choices) {
      if (c.ok) {
        if (seenOk) c.ok = false;
        else seenOk = true;
      }
    }
    const four = [
      choices.find((c) => c.ok),
      ...choices.filter((c) => !c.ok).slice(0, 3),
    ].filter(Boolean);
    if (four.length !== 4) continue;

    out.push({
      id: `adapted:${idPrefix}:${qid.toLowerCase()}`,
      q: stem.length > 280 ? `${stem.slice(0, 280)}…` : stem,
      choices: four,
      relatedNodes: inferRelated(stem + four.map((c) => c.t).join(' ')),
    });
    if (out.length >= limit) break;
  }
  return out;
}

function esc(s) {
  return JSON.stringify(s);
}

function emitSetFile(setMeta, questions) {
  const lines = [];
  lines.push(`import { defineQuizSet } from '../schema.js';`);
  lines.push('');
  lines.push(`/**`);
  lines.push(` * 系统非原创：面向 AI 全栈工程师的开源面经改编（非写码刷题）。`);
  lines.push(` * 来源：${setMeta.attribution}`);
  lines.push(` * ${setMeta.attributionUrl}`);
  lines.push(` * 许可/说明：${setMeta.license}`);
  lines.push(` */`);
  lines.push(`export default defineQuizSet({`);
  lines.push(`  id: ${esc(setMeta.id)},`);
  lines.push(`  title: ${esc(setMeta.title)},`);
  lines.push(`  kind: ${esc(setMeta.kind)},`);
  lines.push(`  domain: ${esc(setMeta.domain)},`);
  lines.push(`  tags: ${esc(setMeta.tags)},`);
  lines.push(`  relatedNodes: ${esc(setMeta.relatedNodes)},`);
  lines.push(`  caption: ${esc(setMeta.caption)},`);
  lines.push(`  origin: 'adapted',`);
  lines.push(`  attribution: ${esc(setMeta.attribution)},`);
  lines.push(`  attributionUrl: ${esc(setMeta.attributionUrl)},`);
  lines.push(`  questions: [`);
  for (const q of questions) {
    lines.push(`    {`);
    lines.push(`      id: ${esc(q.id)},`);
    lines.push(`      q: ${esc(q.q)},`);
    lines.push(`      choices: [`);
    for (const c of q.choices) {
      lines.push(
        `        { t: ${esc(c.t)}, ok: ${Boolean(c.ok)}, why: ${esc(c.why || '')} },`
      );
    }
    lines.push(`      ],`);
    lines.push(`      relatedNodes: ${esc(q.relatedNodes || [])},`);
    lines.push(`      origin: 'adapted',`);
    lines.push(`      attribution: ${esc(setMeta.attribution)},`);
    lines.push(`      attributionUrl: ${esc(setMeta.attributionUrl)},`);
    lines.push(`    },`);
  }
  lines.push(`  ],`);
  lines.push(`});`);
  lines.push('');
  return lines.join('\n');
}

function emitBankShard(questions, setMeta) {
  const rows = questions.map((q) => ({
    id: q.id,
    q: q.q,
    choices: q.choices,
    kind: setMeta.kind,
    domain: setMeta.domain,
    tags: [...(setMeta.tags || []), '系统非原创', 'adapted', 'AI全栈'],
    relatedNodes: q.relatedNodes || setMeta.relatedNodes,
    source: 'adapted',
    origin: 'adapted',
    attribution: setMeta.attribution,
    attributionUrl: setMeta.attributionUrl,
    setId: setMeta.id,
  }));
  return `/**
 * 改编题库 · ${setMeta.id}
 * 系统非原创 · AI 全栈向 · ${setMeta.attribution}
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = ${JSON.stringify(rows, null, 2)};
`;
}

function wipeOldAdapted() {
  for (const [dir, re] of [
    [setsDir, /^interview-adapted-/],
    [bankDir, /^adapted-/],
  ]) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (re.test(name) && name.endsWith('.js')) {
        fs.unlinkSync(path.join(dir, name));
        console.log('removed', name);
      }
    }
  }
}

function parseSource(src, md) {
  if (src.parse === 'naresh-h2') return parseNareshH2(md, src.limit, src.id);
  if (src.parse === 'naresh-qn') return parseNareshQn(md, src.limit, src.id);
  if (src.parse === 'guocong') return parseGuocong(md, src.limit, src.id);
  if (src.parse === 'landed-mcq') return parseLandedMcq(md, src.limit, src.id);
  return [];
}

function patchRegistry(setIds) {
  const indexPath = path.join(root, 'src/data/quiz/index.js');
  let text = fs.readFileSync(indexPath, 'utf8').replace(/\r\n/g, '\n');
  text = text.replace(/\n\/\/ adapted-imports\n[\s\S]*?(?=\n\/\*\* @type)/, '\n');
  text = text.replace(/\n\s*interview_adapted_[\w]+,/g, '');
  text = text.replace(/\n\s*\/\/ adapted-registry\n[\s\S]*?(?=\n\];)/, '');

  const imports = setIds
    .map((id) => {
      const v = id.replace(/[^a-zA-Z0-9]+/g, '_');
      return `import ${v} from './sets/${id}.js';`;
    })
    .join('\n');
  const regs = setIds.map((id) => `  ${id.replace(/[^a-zA-Z0-9]+/g, '_')},`).join('\n');

  if (!text.includes("import interviewOps from './sets/interview-ops.js';")) {
    throw new Error('patchRegistry: interviewOps import anchor missing');
  }
  text = text.replace(
    "import interviewOps from './sets/interview-ops.js';\n",
    `import interviewOps from './sets/interview-ops.js';\n// adapted-imports\n${imports}\n`
  );
  if (!text.includes('  interviewOps,\n];')) {
    throw new Error('patchRegistry: interviewOps registry anchor missing');
  }
  text = text.replace(
    '  interviewOps,\n];',
    `  interviewOps,\n  // adapted-registry\n${regs}\n];`
  );
  fs.writeFileSync(indexPath, text, 'utf8');
}

function patchBankIndex(bankNames) {
  const p = path.join(bankDir, 'index.js');
  let text = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  text = text.replace(/\n\/\/ adapted-bank-imports\n[\s\S]*?(?=\n\/\*\*)/, '\n');
  text = text.replace(/\n\s*\.\.\.adapted_[\w]+,/g, '');
  text = text.replace(/\n\s*\/\/ adapted-bank-spread\n[\s\S]*?(?=\n\];)/, '');

  const imports = bankNames
    .map((n) => {
      const v = n.replace(/[^a-zA-Z0-9]+/g, '_');
      return `import { QUESTIONS as ${v} } from './${n}.js';`;
    })
    .join('\n');
  const spreads = bankNames
    .map((n) => `  ...${n.replace(/[^a-zA-Z0-9]+/g, '_')},`)
    .join('\n');

  if (!text.includes("import { QUESTIONS as glossary } from './glossary.js';")) {
    throw new Error('patchBankIndex: glossary import anchor missing');
  }
  text = text.replace(
    "import { QUESTIONS as glossary } from './glossary.js';\n",
    `import { QUESTIONS as glossary } from './glossary.js';\n// adapted-bank-imports\n${imports}\n`
  );
  if (!text.includes('  ...glossary,\n];')) {
    // 残留注释时先收口
    text = text.replace(/  \.\.\.glossary,\n(?:  \/\/ adapted-bank-spread\n)?\];/, '  ...glossary,\n];');
  }
  if (!text.includes('  ...glossary,\n];')) {
    throw new Error('patchBankIndex: glossary spread anchor missing');
  }
  text = text.replace(
    '  ...glossary,\n];',
    `  ...glossary,\n  // adapted-bank-spread\n${spreads}\n];`
  );
  fs.writeFileSync(p, text, 'utf8');
}

async function main() {
  fs.mkdirSync(setsDir, { recursive: true });
  fs.mkdirSync(bankDir, { recursive: true });
  wipeOldAdapted();

  /** @type {object[]} */
  const catalog = [];
  /** @type {string[]} */
  const setFiles = [];
  /** @type {string[]} */
  const bankFiles = [];
  let totalQ = 0;

  for (const src of SOURCES) {
    process.stdout.write(`fetch ${src.id} … `);
    try {
      const md = await fetchText(src.url);
      const parsed = parseSource(src, md);
      console.log(`ok ${parsed.length}`);
      if (!parsed.length) {
        catalog.push({ id: src.id, label: src.label, ok: false, count: 0 });
        continue;
      }

      const related = [
        ...new Set(parsed.flatMap((q) => q.relatedNodes || [])),
      ].slice(0, 3);
      const setId = `interview-adapted-${src.id}`.replace(/[^a-z0-9-]+/gi, '-');
      const setMeta = {
        id: setId,
        title: src.title,
        kind: src.kind,
        domain: src.domain,
        tags: src.tags,
        relatedNodes: related.length ? related : src.relatedFallback,
        caption: `系统非原创 · AI 全栈向 · 改编自 ${src.label}`,
        attribution: src.label,
        attributionUrl: src.homepage,
        license: src.license,
      };

      fs.writeFileSync(path.join(setsDir, `${setId}.js`), emitSetFile(setMeta, parsed), 'utf8');
      setFiles.push(setId);

      const bankName = `adapted-${src.id}`.replace(/[^a-z0-9-]+/gi, '-');
      fs.writeFileSync(
        path.join(bankDir, `${bankName}.js`),
        emitBankShard(parsed, setMeta),
        'utf8'
      );
      bankFiles.push(bankName);
      totalQ += parsed.length;
      catalog.push({
        id: src.id,
        label: src.label,
        homepage: src.homepage,
        license: src.license,
        ok: true,
        count: parsed.length,
      });
    } catch (e) {
      console.log('fail', e.message || e);
      catalog.push({
        id: src.id,
        label: src.label,
        ok: false,
        error: String(e?.message || e),
        count: 0,
      });
    }
  }

  fs.writeFileSync(
    sourcesPath,
    `/**
 * 改编题库来源（系统非原创 · AI 全栈工程师向）
 * pnpm run quiz:import
 */
export const QUIZ_ADAPTED_SOURCES = ${JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        focus: 'AI fullstack / RAG / Agent / LLM / MCP — 非写码刷题',
        note: 'UI 标注系统非原创并附来源；干扰项可能来自同库其它题压缩',
        totalQuestions: totalQ,
        sources: catalog,
        sets: setFiles,
        bankShards: bankFiles,
      },
      null,
      2
    )};
`,
    'utf8'
  );

  patchRegistry(setFiles);
  patchBankIndex(bankFiles);
  console.log(`done · sets ${setFiles.length} · questions ${totalQ}`);
  if (!setFiles.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
