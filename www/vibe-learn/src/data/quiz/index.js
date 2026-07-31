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
import conceptHttpStatus from './sets/concept-http-status.js';
import conceptHttpMethod from './sets/concept-http-method.js';
import conceptHttpHdr from './sets/concept-http-hdr.js';
import conceptCookieFlag from './sets/concept-cookie-flag.js';
import conceptCorsKw from './sets/concept-cors-kw.js';
import conceptCacheHdr from './sets/concept-cache-hdr.js';
import conceptNetAddressing from './sets/concept-net-addressing.js';
import conceptWellKnownPorts from './sets/concept-well-known-ports.js';
import conceptNginxDir from './sets/concept-nginx-dir.js';
import conceptXrkCore from './sets/concept-xrk-core.js';
import conceptXrkAgentPipe from './sets/concept-xrk-agent-pipe.js';
import conceptAdev from './sets/concept-adev.js';
import conceptAiLlm from './sets/concept-ai-llm.js';
import conceptAiRag from './sets/concept-ai-rag.js';
import conceptAiAgentStack from './sets/concept-ai-agent-stack.js';
import conceptCraftQuality from './sets/concept-craft-quality.js';
import conceptGit from './sets/concept-git-security.js';
import conceptDsaStructures from './sets/concept-dsa-structures.js';
import conceptDsaLinearKw from './sets/concept-dsa-linear-kw.js';
import conceptDsaBigO from './sets/concept-dsa-big-o.js';
import conceptDsaHashKw from './sets/concept-dsa-hash-kw.js';
import conceptDsaTreeKw from './sets/concept-dsa-tree-kw.js';
import conceptDsaSortKw from './sets/concept-dsa-sort-kw.js';
import conceptDsaGraphKw from './sets/concept-dsa-graph-kw.js';
import conceptDbOps from './sets/concept-db-ops.js';
import conceptContainer from './sets/concept-container.js';
import conceptContainerScenarios from './sets/concept-container-scenarios.js';
import conceptPanel from './sets/concept-panel.js';
import conceptClash from './sets/concept-clash.js';
import conceptEsp from './sets/concept-esp.js';
import conceptWorkbench from './sets/concept-workbench.js';
import conceptCodeTsRegex from './sets/concept-code-ts-regex.js';
import conceptShell from './sets/concept-shell.js';
import conceptShellOp from './sets/concept-shell-op.js';
import conceptXrkLabs from './sets/concept-xrk-labs.js';
import conceptXrkScenarios from './sets/concept-xrk-scenarios.js';
import conceptGapNodes from './sets/concept-gap-nodes.js';
import conceptAiOpsBridge from './sets/concept-ai-ops-bridge.js';
import conceptGitCli from './sets/concept-git-cli.js';
import conceptGitCmd from './sets/concept-git-cmd.js';
import conceptLinuxCli from './sets/concept-linux-cli.js';
import conceptLinuxCmd from './sets/concept-linux-cmd.js';
import conceptDockerCli from './sets/concept-docker-cli.js';
import conceptDockerCmd from './sets/concept-docker-cmd.js';
import conceptEnvCli from './sets/concept-env-cli.js';
import conceptEnvKw from './sets/concept-env-kw.js';
import conceptSqlCli from './sets/concept-sql-cli.js';
import conceptSqlKw from './sets/concept-sql-kw.js';
import conceptPnpmCmd from './sets/concept-pnpm-cmd.js';
import conceptNginxOps from './sets/concept-nginx-ops.js';
import conceptComposeKw from './sets/concept-compose-kw.js';
import conceptSecKw from './sets/concept-sec-kw.js';
import conceptTroubleshootCli from './sets/concept-troubleshoot-cli.js';
import conceptZeroBasics from './sets/concept-zero-basics.js';
import conceptZeroWebGit from './sets/concept-zero-web-git.js';
import conceptXrkZero from './sets/concept-xrk-zero.js';
import conceptXrkExtensions from './sets/concept-xrk-extensions.js';
import conceptXrkBridge from './sets/concept-xrk-bridge.js';
import conceptXrkFirstRun from './sets/concept-xrk-first-run.js';
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
// adapted-imports（guo 多数包为 Markdown 笔记 dump，未 scrub 前勿入 REGISTRY；仅 obs 可用）
import interview_adapted_naresh_rag from './sets/interview-adapted-naresh-rag.js';
import interview_adapted_naresh_llm from './sets/interview-adapted-naresh-llm.js';
import interview_adapted_naresh_agent from './sets/interview-adapted-naresh-agent.js';
import interview_adapted_naresh_transformer from './sets/interview-adapted-naresh-transformer.js';
import interview_adapted_guo_obs from './sets/interview-adapted-guo-obs.js';
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
  conceptShellOp,
  conceptLangLandscape,
  conceptLangFrameworks,
  interviewLang,

  // 网络
  conceptNetLayers,
  conceptNetPath,
  conceptNetAddressing,
  conceptHttpHands,
  conceptHttpStatus,
  conceptHttpMethod,
  conceptHttpHdr,
  conceptCookieFlag,
  conceptCorsKw,
  conceptCacheHdr,
  conceptWellKnownPorts,
  conceptNginxOps,
  conceptNginxDir,
  conceptEngApiContracts,
  interviewNet,
  // XRK / Vibe
  conceptXrkZero,
  conceptXrkFirstRun,
  conceptXrkCore,
  conceptXrkAgentPipe,
  conceptXrkExtensions,
  conceptXrkBridge,
  conceptXrkLabs,
  conceptXrkScenarios,
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
  conceptGitCmd,
  conceptEnvCli,
  conceptEnvKw,
  conceptPnpmCmd,
  conceptSecKw,
  conceptTroubleshootCli,
  interviewCraft,
  conceptDsaStructures,
  conceptDsaLinearKw,
  conceptDsaBigO,
  conceptDsaHashKw,
  conceptDsaTreeKw,
  conceptDsaSortKw,
  conceptDsaGraphKw,
  interviewDsa,
  conceptGapNodes,
  conceptAiOpsBridge,
  conceptDbOps,
  conceptSqlCli,
  conceptSqlKw,
  conceptEngDataConsistency,
  interviewOsDb,
  conceptContainer,
  conceptContainerScenarios,
  conceptDockerCli,
  conceptDockerCmd,
  conceptComposeKw,
  conceptLinuxCli,
  conceptLinuxCmd,
  conceptPanel,
  conceptClash,
  conceptEsp,
  interviewOps,
  // adapted-registry
  interview_adapted_naresh_rag,
  interview_adapted_naresh_llm,
  interview_adapted_naresh_agent,
  interview_adapted_naresh_transformer,
  interview_adapted_guo_obs,
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
