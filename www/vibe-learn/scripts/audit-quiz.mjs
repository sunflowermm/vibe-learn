/**
 * 题库质量审计（只读报告）
 * node scripts/audit-quiz.mjs
 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { choiceLooksLikeFiller } from '../src/data/quiz/schema.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const BAD_Q_PATTERNS = [
  /定位副标题是/,
  /最贴合「.+」的定义/,
  /^识别术语：/,
];

async function main() {
  const { getNodeById } = await import(
    pathToFileURL(path.join(root, 'src/data/nodes.js')).href
  );
  const { listQuestions, quizQuestionCount } = await import(
    pathToFileURL(path.join(root, 'src/data/quiz/bank.js')).href
  );

  const all = listQuestions();
  const fails = [];
  const warns = [];

  for (const q of all) {
    const issues = [];
    if (!q.q || q.q.length < 8) issues.push('fail:题干过短');
    if (BAD_Q_PATTERNS.some((re) => re.test(q.q))) issues.push('fail:表意弱/识别题');
    if (!q.choices || q.choices.length !== 4) issues.push('fail:选项数≠4');
    const oks = (q.choices || []).filter((c) => c.ok);
    if (oks.length !== 1) issues.push('fail:正确项数≠1');
    for (const c of q.choices || []) {
      if (choiceLooksLikeFiller(c.t)) issues.push('fail:填充干扰项');
      const blob = `${c.t || ''}\n${c.why || ''}`;
      if (/```/.test(blob) || /\|[-:]+\|/.test(blob) || /[┌┐└┘├┤┬┴┼│─]/.test(blob)) {
        issues.push('fail:选项含Markdown/框线dump');
      }
    }
    // 名词→释义（:def）：正确项若只剩 URL 碎片，说明 definitionBody 剥过头
    if (
      /:def$/.test(String(q.id || '')) &&
      oks[0] &&
      (/^\/\//.test(oks[0].t) ||
        /^(?:https?|ftp|wss?):\/\//i.test(oks[0].t) ||
        (oks[0].t.length < 64 &&
          /^\/\/[\w./:?&=%#@+-]+$/.test(oks[0].t)))
    ) {
      issues.push('fail:释义选项像URL/代码碎片');
    }
    if (
      /:term$/.test(String(q.id || '')) &&
      (/「\/\/[^」]+」/.test(q.q || '') ||
        /「(?:https?|ftp|wss?):\/\//i.test(q.q || '') ||
        /「:1[）)]/.test(q.q || ''))
    ) {
      issues.push('fail:释义题干像URL/IPv6残片');
    }
    // ::1 被剥成「:1)」—— 排除正常的「::1」
    const blobAll = `${q.q || ''}\n${(q.choices || []).map((c) => c.t).join('\n')}`;
    if (/(?:^|[^:])(:1[）)])/.test(blobAll)) {
      issues.push('fail:IPv6回环被剥残（:1)）');
    }
    if (!(q.relatedNodes || []).length) issues.push('warn:无 relatedNodes');
    for (const id of q.relatedNodes || []) {
      if (!getNodeById(id)) issues.push(`fail:无效节点 ${id}`);
    }
    const whyOk = oks[0]?.why;
    if (!whyOk || String(whyOk).length < 4) issues.push('warn:why过短');

    const hard = issues.filter((x) => x.startsWith('fail:'));
    const soft = issues.filter((x) => x.startsWith('warn:'));
    if (hard.length) fails.push({ id: q.id, domain: q.domain, issues: hard });
    else if (soft.length) warns.push({ id: q.id, domain: q.domain, issues: soft });
  }

  console.log(`total ${quizQuestionCount()} · fail ${fails.length} · warn ${warns.length}`);
  const byDom = {};
  for (const f of fails) {
    byDom[f.domain] = (byDom[f.domain] || 0) + 1;
  }
  console.log('fails by domain', byDom);
  console.log('sample fails', fails.slice(0, 12));

  const { listQuizSets } = await import(
    pathToFileURL(path.join(root, 'src/data/quiz/index.js')).href
  );
  const { QUIZ_DOMAINS } = await import(
    pathToFileURL(path.join(root, 'src/data/quiz/categories.js')).href
  );
  const sets = listQuizSets();

  // 串台：set 挂 ≥4 节点且某题 relatedNodes 与 set 完全一致 → 几乎肯定是整包继承
  // XRK 域已修；其它域先 warn，避免刷题台按节点筛时再混课。
  const kitchenSinkXrk = [];
  const kitchenSinkOther = [];
  for (const s of sets) {
    const setArr = s.relatedNodes || [];
    if (setArr.length < 4) continue;
    for (const q of s.questions || []) {
      const qn = q.relatedNodes || [];
      if (
        qn.length === setArr.length &&
        setArr.every((id, i) => id === qn[i])
      ) {
        const line = `${s.id} · ${String(q.q || '').slice(0, 36)}`;
        if (s.domain === 'xrk') kitchenSinkXrk.push(line);
        else kitchenSinkOther.push(line);
      }
    }
  }
  if (kitchenSinkOther.length) {
    console.warn(
      `warn:relatedNodes 整包继承（非 xrk）${kitchenSinkOther.length}`,
      kitchenSinkOther.slice(0, 8)
    );
  }
  if (kitchenSinkXrk.length) {
    console.error(
      `fail:relatedNodes 整包继承串台（xrk）${kitchenSinkXrk.length}`,
      kitchenSinkXrk.slice(0, 15)
    );
    process.exit(1);
  }

  const coverageGaps = [];
  for (const d of QUIZ_DOMAINS.filter((x) => x.id !== 'all')) {
    const ss = sets.filter((s) => s.domain === d.id);
    const concept = ss.filter((s) => s.kind === 'concept').length;
    const interview = ss.filter((s) => s.kind === 'interview').length;
    console.log(
      `domain ${d.id}: concept=${concept} interview=${interview} sets=${ss.length}`
    );
    if (concept < 1 || interview < 1) {
      coverageGaps.push({
        domain: d.id,
        concept,
        interview,
        need: concept < 1 ? 'concept' : 'interview',
      });
    }
  }
  if (coverageGaps.length) {
    console.error('coverage gaps (每领域需≥1 概念 + ≥1 大厂)', coverageGaps);
    process.exit(1);
  }

  // 第五章知识工程链：每课至少若干 curated（防只靠 adapted 挂载）
  const AI_KNOWLEDGE_TRACK = [
    'ai-embedding',
    'ai-rag',
    'ai-chunking',
    'ai-hybrid-search',
    'ai-rerank',
    'ai-vector-store',
    'ai-rag-eval',
    'ai-agentic-rag',
    'ai-rag-shift',
  ];
  // 第三章网络主链（传输→路由→门面→边缘曾最薄）
  const NET_PATH_TRACK = [
    'protocol-stack',
    'tcp-udp',
    'routing-nat',
    'reverse-proxy',
    'net-edge-practice',
    'net-nginx',
    'dns-https',
    'ip-addressing',
  ];
  const MIN_CURATED = 2;

  function auditTrack(name, ids) {
    const thin = [];
    for (const id of ids) {
      const curated = all.filter(
        (q) => q.source === 'curated' && (q.relatedNodes || []).includes(id)
      ).length;
      const lesson = all.filter(
        (q) =>
          (q.source === 'lesson' || String(q.id || '').startsWith('l:')) &&
          (q.relatedNodes || []).includes(id)
      ).length;
      console.log(`${name} ${id}: curated=${curated} lesson=${lesson}`);
      if (curated < MIN_CURATED) thin.push({ id, curated, need: MIN_CURATED });
    }
    return thin;
  }

  const thinAi = auditTrack('ai-track', AI_KNOWLEDGE_TRACK);
  const thinNet = auditTrack('net-track', NET_PATH_TRACK);
  const thinEnv = auditTrack('env-track', [
    'terminal-worlds',
    'linux-distros',
    'linux-cli',
    'installers-path',
    'package-managers',
    'runtime-nodejs',
    'workbench-troubleshoot',
  ]);

  // 基础全表：HTTP 状态码 / Linux 命令 / 其它 basics-tables
  const HTTP_CODES = [
    '200', '201', '204', '301', '302', '304', '307', '308',
    '400', '401', '403', '404', '405', '408', '409', '413', '415', '429',
    '500', '502', '503', '504',
  ];
  const LINUX_CMDS = [
    'pwd', 'ls', 'cd', 'tree', 'cat', 'less', 'mkdir', 'rm', 'cp', 'mv',
    'grep', 'find', 'ps', 'top', 'htop', 'kill', 'chmod', 'chown', 'sudo',
    'curl', 'wget', 'ping', 'tail', 'head', 'ss', 'df', 'du', 'tar', 'echo', 'which',
  ];
  const missingHttp = HTTP_CODES.filter(
    (c) => !all.some((q) => String(q.id || '') === `concept-http-status:${c}`)
  );
  const missingLinux = LINUX_CMDS.filter(
    (c) => !all.some((q) => String(q.id || '') === `concept-linux-cmd:${c}`)
  );
  /** @type {string[]} */
  let missingBasics = [];
  try {
    const idsPath = path.join(root, 'scripts/basics-tables-ids.json');
    const { readFileSync } = await import('node:fs');
    const tables = JSON.parse(readFileSync(idsPath, 'utf8'));
    for (const ids of Object.values(tables)) {
      for (const id of ids) {
        if (!all.some((q) => String(q.id || '') === id)) missingBasics.push(id);
      }
    }
  } catch {
    console.warn('warn:basics-tables-ids.json 缺失，跳过扩展全表审计');
  }
  if (missingHttp.length || missingLinux.length || missingBasics.length) {
    console.error('fail:基础全表缺题', {
      missingHttp,
      missingLinux,
      missingBasics: missingBasics.slice(0, 40),
      missingBasicsN: missingBasics.length,
    });
    process.exit(1);
  }
  console.log(
    `basics-table http=${HTTP_CODES.length} linux=${LINUX_CMDS.length} extra=${
      missingBasics.length === 0 ? 'ok' : missingBasics.length
    }`
  );

  const thin = [...thinAi, ...thinNet, ...thinEnv];
  if (thin.length) {
    console.error(`track curated < ${MIN_CURATED}`, thin);
    process.exit(1);
  }

  const lessonN = all.filter(
    (q) => q.source === 'lesson' || String(q.id || '').startsWith('l:')
  ).length;
  console.log(`lesson-derived questions: ${lessonN}`);

  return { fails, warns, coverageGaps, thin };
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
