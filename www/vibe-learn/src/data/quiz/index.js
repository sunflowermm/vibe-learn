/**
 * 题库公共 API
 *
 * 扩题步骤：
 * 1. `sets/` 新建 `defineQuizSet({...})` 默认导出
 * 2. 下方 REGISTRY 登记一行
 * 3. 若新领域：在 `categories.js` 的 QUIZ_DOMAINS 加一项
 */

import { domainMeta, kindMeta, QUIZ_DOMAINS, QUIZ_KINDS } from './categories.js';
import { toQuizModel } from './schema.js';

import conceptComputerOs from './sets/concept-computer-os.js';
import conceptTerminalTooling from './sets/concept-terminal-tooling.js';
import interviewEnvTerminal from './sets/interview-env-terminal.js';
import conceptCodeBasics from './sets/concept-code-basics.js';
import conceptJs from './sets/concept-js.js';
import conceptDataFormats from './sets/concept-data-formats.js';
import conceptLangLandscape from './sets/concept-lang-landscape.js';
import conceptLangFrameworks from './sets/concept-lang-frameworks.js';
import conceptNetLayers from './sets/concept-net-layers.js';
import conceptNetPath from './sets/concept-net-path.js';
import conceptHttpHands from './sets/concept-http-hands.js';
import conceptNetAddressing from './sets/concept-net-addressing.js';
import conceptXrkCore from './sets/concept-xrk-core.js';
import conceptXrkAgentPipe from './sets/concept-xrk-agent-pipe.js';
import conceptXrk from './sets/concept-xrk.js';
import conceptAdev from './sets/concept-adev.js';
import conceptAiLlm from './sets/concept-ai-llm.js';
import conceptAiRag from './sets/concept-ai-rag.js';
import conceptAiAgentStack from './sets/concept-ai-agent-stack.js';
import conceptCraftQuality from './sets/concept-craft-quality.js';
import conceptGit from './sets/concept-git.js';
import conceptDsaStructures from './sets/concept-dsa-structures.js';
import conceptDbOps from './sets/concept-db-ops.js';
import conceptContainer from './sets/concept-container.js';
import conceptPanel from './sets/concept-panel.js';
import conceptClash from './sets/concept-clash.js';
import conceptEsp from './sets/concept-esp.js';
import conceptWorkbench from './sets/concept-workbench.js';
import conceptCodeTsRegex from './sets/concept-code-ts-regex.js';
import conceptShell from './sets/concept-shell.js';
import conceptXrkLabs from './sets/concept-xrk-labs.js';
import conceptGapNodes from './sets/concept-gap-nodes.js';
import conceptAiOpsBridge from './sets/concept-ai-ops-bridge.js';
import conceptGitCli from './sets/concept-git-cli.js';
import conceptLinuxCli from './sets/concept-linux-cli.js';
import conceptDockerCli from './sets/concept-docker-cli.js';
import conceptEnvCli from './sets/concept-env-cli.js';
import conceptSqlCli from './sets/concept-sql-cli.js';
import conceptNginxOps from './sets/concept-nginx-ops.js';
import conceptTroubleshootCli from './sets/concept-troubleshoot-cli.js';
import conceptZeroBasics from './sets/concept-zero-basics.js';
import conceptZeroWebGit from './sets/concept-zero-web-git.js';
import conceptXrkZero from './sets/concept-xrk-zero.js';
import conceptXrkExtensions from './sets/concept-xrk-extensions.js';
import conceptXrkBridge from './sets/concept-xrk-bridge.js';
import conceptXrkFirstRun from './sets/concept-xrk-first-run.js';
import conceptXrkPatterns from './sets/concept-xrk-patterns.js';
import conceptEngReliability from './sets/concept-eng-reliability.js';
import conceptEngApiContracts from './sets/concept-eng-api-contracts.js';
import conceptEngConcurrency from './sets/concept-eng-concurrency.js';
import conceptEngSecurityModel from './sets/concept-eng-security-model.js';
import conceptEngDataConsistency from './sets/concept-eng-data-consistency.js';
import conceptEngTestingStrategy from './sets/concept-eng-testing-strategy.js';

import interviewDsa from './sets/interview-dsa.js';
import interviewNet from './sets/interview-net.js';
import interviewOsDb from './sets/interview-os-db.js';
import interviewAi from './sets/interview-ai.js';
import interviewAiExpand from './sets/interview-ai-expand.js';
import interviewXrk from './sets/interview-xrk.js';
import interviewCraft from './sets/interview-craft.js';
import interviewLang from './sets/interview-lang.js';
import interviewOps from './sets/interview-ops.js';
// adapted-imports
import interview_adapted_naresh_rag from './sets/interview-adapted-naresh-rag.js';
import interview_adapted_naresh_llm from './sets/interview-adapted-naresh-llm.js';
import interview_adapted_naresh_agent from './sets/interview-adapted-naresh-agent.js';
import interview_adapted_naresh_transformer from './sets/interview-adapted-naresh-transformer.js';
import interview_adapted_guo_rag from './sets/interview-adapted-guo-rag.js';
import interview_adapted_guo_agent from './sets/interview-adapted-guo-agent.js';
import interview_adapted_guo_prompt from './sets/interview-adapted-guo-prompt.js';
import interview_adapted_guo_mcp from './sets/interview-adapted-guo-mcp.js';
import interview_adapted_guo_multi_agent from './sets/interview-adapted-guo-multi-agent.js';
import interview_adapted_guo_prod from './sets/interview-adapted-guo-prod.js';
import interview_adapted_guo_rag_adv from './sets/interview-adapted-guo-rag-adv.js';
import interview_adapted_guo_obs from './sets/interview-adapted-guo-obs.js';
import interview_adapted_guo_sys from './sets/interview-adapted-guo-sys.js';
import interview_adapted_landed_retrieval from './sets/interview-adapted-landed-retrieval.js';
import interview_adapted_landed_embeddings from './sets/interview-adapted-landed-embeddings.js';
import interview_adapted_landed_chunking from './sets/interview-adapted-landed-chunking.js';
import interview_adapted_landed_reranking from './sets/interview-adapted-landed-reranking.js';
import interview_adapted_landed_evaluation from './sets/interview-adapted-landed-evaluation.js';
import interview_adapted_landed_production from './sets/interview-adapted-landed-production.js';
import interview_adapted_landed_security from './sets/interview-adapted-landed-security.js';

/** @type {import('./schema.js').QuizSet[]} */
const REGISTRY = [
  // 序章 / 环境 / 零基础
  conceptZeroBasics,
  conceptZeroWebGit,
  conceptComputerOs,
  conceptTerminalTooling,
  interviewEnvTerminal,
  conceptWorkbench,
  // 编程与数据
  conceptCodeBasics,
  conceptJs,
  conceptDataFormats,
  conceptCodeTsRegex,
  conceptShell,
  conceptLangLandscape,
  conceptLangFrameworks,
  interviewLang,

  // 网络
  conceptNetLayers,
  conceptNetPath,
  conceptNetAddressing,
  conceptHttpHands,
  conceptNginxOps,
  conceptEngApiContracts,
  interviewNet,
  // XRK / Vibe
  conceptXrkZero,
  conceptXrkFirstRun,
  conceptXrkCore,
  conceptXrkAgentPipe,
  conceptXrkExtensions,
  conceptXrkPatterns,
  conceptXrkBridge,
  conceptXrk,
  conceptXrkLabs,
  conceptAdev,
  interviewXrk,
  // AI
  conceptAiLlm,
  conceptAiRag,
  conceptAiAgentStack,
  interviewAi,
  interviewAiExpand,
  // 工程 / DSA / 数据运维
  conceptCraftQuality,
  conceptEngReliability,
  conceptEngSecurityModel,
  conceptEngTestingStrategy,
  conceptEngConcurrency,
  conceptGit,
  conceptGitCli,
  conceptEnvCli,
  conceptTroubleshootCli,
  interviewCraft,
  conceptDsaStructures,
  interviewDsa,
  conceptGapNodes,
  conceptAiOpsBridge,
  conceptDbOps,
  conceptSqlCli,
  conceptEngDataConsistency,
  interviewOsDb,
  conceptContainer,
  conceptDockerCli,
  conceptLinuxCli,
  conceptPanel,
  conceptClash,
  conceptEsp,
  interviewOps,
  // adapted-registry
  interview_adapted_naresh_rag,
  interview_adapted_naresh_llm,
  interview_adapted_naresh_agent,
  interview_adapted_naresh_transformer,
  interview_adapted_guo_rag,
  interview_adapted_guo_agent,
  interview_adapted_guo_prompt,
  interview_adapted_guo_mcp,
  interview_adapted_guo_multi_agent,
  interview_adapted_guo_prod,
  interview_adapted_guo_rag_adv,
  interview_adapted_guo_obs,
  interview_adapted_guo_sys,
  interview_adapted_landed_retrieval,
  interview_adapted_landed_embeddings,
  interview_adapted_landed_chunking,
  interview_adapted_landed_reranking,
  interview_adapted_landed_evaluation,
  interview_adapted_landed_production,
  interview_adapted_landed_security,
];

const byId = new Map(REGISTRY.map((s) => [s.id, s]));

export {
  QUIZ_KINDS,
  QUIZ_DOMAINS,
  kindMeta,
  domainMeta,
  toQuizModel,
};

export { defineQuizSet } from './schema.js';

/** @returns {import('./schema.js').QuizSet[]} */
export function listQuizSets() {
  return REGISTRY.slice();
}

/** @returns {number} */
export function quizSetCount() {
  return REGISTRY.length;
}

/** @returns {number} */
export function quizQuestionCount() {
  return REGISTRY.reduce((n, s) => n + (s.questions?.length || 0), 0);
}

/**
 * @param {string} id
 * @returns {import('./schema.js').QuizSet | null}
 */
export function getQuizSet(id) {
  return byId.get(id) || null;
}

/**
 * @param {string} query
 * @param {{
 *   kind?: import('./categories.js').QuizKindId | 'all',
 *   domain?: import('./categories.js').QuizDomainId | 'all',
 * }} [opts]
 * @returns {import('./schema.js').QuizSet[]}
 */
export function searchQuizSets(query, opts = {}) {
  const kind = opts.kind || 'all';
  const domain = opts.domain || 'all';
  const q = String(query ?? '')
    .trim()
    .toLowerCase();
  const tokens = q ? q.split(/\s+/).filter(Boolean) : [];

  return REGISTRY.filter((s) => {
    if (kind !== 'all' && s.kind !== kind) return false;
    if (domain !== 'all' && s.domain !== domain) return false;
    if (!tokens.length) return true;
    const hay = [
      s.id,
      s.title,
      s.caption,
      s.domain,
      s.kind,
      ...(s.tags || []),
      ...(s.relatedNodes || []),
      ...s.questions.map((qq) => qq.q),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return tokens.every((t) => hay.includes(t));
  });
}

/** @param {import('./schema.js').QuizSet['kind']} kind */
export function kindShortLabel(kind) {
  return kindMeta(kind).short;
}
