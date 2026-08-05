/**
 * 静态题库 · craft
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:craft:ci-gate:core",
    q: "主分支合并前 CI 红了，宜？",
    choices: [
      { t: "修红再合，勿跳过门禁", ok: true, why: "门禁保护主分支质量。" },
      { t: "红了也强行合并最省事", ok: false, why: "把坏构建带进主线。" },
      { t: "关掉全部检查再推", ok: false, why: "失去防护。" },
      { t: "把失败测试标成通过即可", ok: false, why: "掩盖缺陷。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["craft-ci","craft-testing","git-forges"],
    source: 'static',
  },
  {
    id: "s:craft:obs-log:core",
    q: "线上排障日志，更合理？",
    choices: [
      { t: "结构化日志并脱敏密钥", ok: true, why: "可检索且不泄密。" },
      { t: "明文打印全部密钥方便", ok: false, why: "泄密。" },
      { t: "禁止任何日志最安全", ok: false, why: "无法排障。" },
      { t: "只打「error」一个字", ok: false, why: "缺少上下文。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["craft-observability","craft-debug"],
    source: 'static',
  },
  {
    id: "s:craft:pr-flow:core",
    q: "多人协作合码，更稳妥的方式？",
    choices: [
      { t: "分支改动，经 PR/MR 审查合并", ok: true, why: "保留审查与历史；勿日常 force push 主分支。" },
      { t: "ZIP 改完再邮件传回", ok: false, why: "丢历史与冲突处理。" },
      { t: "日常 main 上 force push", ok: false, why: "协作事故高频。" },
      { t: "commit 了就等于已上线", ok: false, why: "提交≠发布。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["git-workspace","git-forges","git-advanced"],
    source: 'static',
  },
  {
    id: "s:craft:secret-leak:core",
    q: "API 密钥已 commit 进仓，优先？",
    choices: [
      { t: "轮换密钥并清理仓库历史", ok: true, why: "先失效旧钥，再清历史。" },
      { t: "密钥继续留着靠 gitignore", ok: false, why: "已进历史仍危险。" },
      { t: "明文 Secret 写进仓库给 CI", ok: false, why: "应用 CI 变量。" },
      { t: "CI 红了就跳过强行合并", ok: false, why: "掩盖问题。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["craft-security","git-advanced","craft-ci"],
    source: 'static',
  },
  {
    id: "s:craft:small-diff:core",
    q: "大功能上线，协作上更稳？",
    choices: [
      { t: "小步提交可审 PR，配合测试", ok: true, why: "小 diff 易审易回滚。" },
      { t: "单 PR 改三千文件一次合", ok: false, why: "难审难回滚。" },
      { t: "不写说明直接 force 主分支", ok: false, why: "事故源。" },
      { t: "跳过测试只靠感觉", ok: false, why: "回归无网。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["git-workspace","git-advanced","craft-testing"],
    source: 'static',
  },
  {
    id: "s:craft:test-error-path:core",
    q: "测试只覆盖开心路径，最大风险？",
    choices: [
      { t: "错误路径未验，线上易踩坑", ok: true, why: "要覆盖失败模式与观测。" },
      { t: "开心路径 100% 就永不出错", ok: false, why: "缺错误路径。" },
      { t: "上线后无需日志与指标", ok: false, why: "等于盲飞。" },
      { t: "模块循环依赖无所谓", ok: false, why: "边界清晰才可测。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["craft-testing","craft-observability","code-modules"],
    source: 'static',
  },
  {
    id: "s:craft:troubleshoot-layers:core",
    q: "程序跑不通，比立刻重写业务更优先？",
    choices: [
      { t: "先核环境、依赖与配置再查业务", ok: true, why: "大量故障在环境层。" },
      { t: "先把业务全部重写一遍", ok: false, why: "常未命中根因。" },
      { t: "未保存也当已运行成功", ok: false, why: "先保存再跑。" },
      { t: "关掉所有测试最快", ok: false, why: "失去安全网。" },
    ],
    kind: "concept",
    domain: "craft",
    tags: ["场景","课核"],
    relatedNodes: ["workbench-troubleshoot","workbench-editor","craft-debug"],
    source: 'static',
  }
];
