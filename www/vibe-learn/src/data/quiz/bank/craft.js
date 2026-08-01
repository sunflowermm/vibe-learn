/**
 * 静态题库 · craft
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:craft:git-collab:core",
    q: "远程变本地；分支/PR；密钥进仓了；CI 红了——正确组合？",
    choices: [
      { t: "clone/工作区分清；分支上改经 PR 合并；密钥轮换并移出历史；CI 红了先修再合，Secret 不进仓", ok: true, why: "协作与安全闸门一条链。" },
      { t: "ZIP 下载替代 Git；主分支 force push 当日常；密钥继续留着；CI 红了跳过合并", ok: false, why: "协作事故套餐。" },
      { t: "commit 等于已部署生产", ok: false, why: "提交≠发布。" },
      { t: "Secret 写进仓库好让 CI 读取", ok: false, why: "用密钥管理/CI 变量。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["git-workspace","git-forges","git-advanced","craft-ci","craft-security"],
    source: 'static',
  },
  {
    id: "s:craft:quality-loop:core",
    q: "跑不通先分层；测试测什么；上线后靠什么看见状态；本仓模块边界？",
    choices: [
      { t: "先环境/依赖/配置再业务；错误路径也要测；日志与指标做观测；主服 ESM 边界要清晰", ok: true, why: "质量闭环：排障→测试→观测→模块。" },
      { t: "先重写业务；只测开心路径；上线后无需日志；任意循环依赖无所谓", ok: false, why: "反质量。" },
      { t: "编辑器未保存也能当已运行", ok: false, why: "先保存再跑。" },
      { t: "观测等于多打 console 到生产密钥", ok: false, why: "结构化日志与脱敏。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["workbench-editor","workbench-troubleshoot","craft-debug","craft-testing","craft-observability","code-modules"],
    source: 'static',
  }
];
