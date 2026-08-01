/**
 * 静态题库 · craft
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:craft:pr-flow:core",
    q: "多人协作改同一仓库时，更稳妥的合码方式是？",
    choices: [
      { t: "在分支上改动，经 Pull Request / Merge Request 审查后合并", ok: true, why: "分支 + PR 保留审查与历史；日常勿对主分支 force push。" },
      { t: "ZIP 下载改完再邮件传回", ok: false, why: "丢失协作历史与冲突处理。" },
      { t: "直接在 main 上 force push 当日常", ok: false, why: "协作事故高频来源。" },
      { t: "commit 了就等于已部署生产", ok: false, why: "提交≠发布。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["git-workspace","git-forges","git-advanced"],
    source: 'static',
  },
  {
    id: "s:craft:secret-leak:core",
    q: "发现 API 密钥已经 commit 进仓库，应优先怎么做？",
    choices: [
      { t: "轮换密钥，并从仓库历史中移除秘密", ok: true, why: "泄露后先让旧密钥失效，再清理历史；勿继续留着。" },
      { t: "密钥继续留着，反正有 .gitignore 了", ok: false, why: "已进历史仍危险。" },
      { t: "把 Secret 明文写进仓库好让 CI 读取", ok: false, why: "应用 CI 变量/密钥管理。" },
      { t: "CI 红了就跳过检查强行合并", ok: false, why: "掩盖问题。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["craft-security","git-advanced","craft-ci"],
    source: 'static',
  },
  {
    id: "s:craft:test-error-path:core",
    q: "自动化测试若只覆盖「开心路径」，最大风险是什么？",
    choices: [
      { t: "错误路径与边界未验证，线上易踩坑", ok: true, why: "质量闭环要覆盖失败模式；观测也要结构化与脱敏。" },
      { t: "开心路径覆盖率 100% 就等于不会出错", ok: false, why: "缺错误路径。" },
      { t: "上线后无需日志与指标", ok: false, why: "不可观测等于盲飞。" },
      { t: "模块循环依赖无所谓", ok: false, why: "边界清晰才可测可维护。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["craft-testing","craft-observability","code-modules"],
    source: 'static',
  },
  {
    id: "s:craft:troubleshoot-layers:core",
    q: "程序「跑不通」时，比立刻重写业务逻辑更优先的是？",
    choices: [
      { t: "先分层核对环境、依赖与配置，再查业务", ok: true, why: "大量故障在环境层；先保存、再运行、再看报错。" },
      { t: "先把业务全部重写一遍", ok: false, why: "成本高且常未命中根因。" },
      { t: "编辑器未保存也能当已运行成功", ok: false, why: "先保存再跑。" },
      { t: "关掉所有测试最快", ok: false, why: "失去安全网。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["workbench-troubleshoot","workbench-editor","craft-debug"],
    source: 'static',
  }
];
