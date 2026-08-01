/**
 * 静态题库 · xrk
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:xrk:biz-in-core:core",
    q: "新业务 HTTP API 或插件代码应放在哪里？",
    choices: [
      { t: "core/<产品>/{http,plugin}/ 等约定目录", ok: true, why: "业务进 core；勿塞进 src/infrastructure。" },
      { t: "直接改 src/agent-runtime.js 塞业务", ok: false, why: "与运行时耦合，难维护。" },
      { t: "只允许 system-Core，其它 core 不会被扫描", ok: false, why: "会扫描各 core/*/。" },
      { t: "放到前端 www 里当后端执行", ok: false, why: "www 是静态前端，不是主服业务入口。" },
    ],
    kind: "concept",
    domain: "xrk",
    tags: ["场景","课核"],
    relatedNodes: ["xrk-core-layout","xrk-overview","xrk-biz-map","xrk-plugin-arch"],
    source: 'static',
  },
  {
    id: "s:xrk:config-trisync:core",
    q: "独立产品 Core 要新增一个配置字段，正确做法是？",
    choices: [
      { t: "default 模板、commonconfig schema、消费代码三同步", ok: true, why: "只改 yaml 或只改代码都会出现「配了不生效」。" },
      { t: "把产品字段写进 config/default_config 冒充系统模板", ok: false, why: "独立产品模板在 core/<名>/default/。" },
      { t: "只改 yaml，消费代码可以永远不读新字段", ok: false, why: "三同步缺一不可。" },
      { t: "配置改完即可跳过 Node/代理等部署前提", ok: false, why: "工具链与环境仍要先齐。" },
    ],
    kind: "concept",
    domain: "xrk",
    tags: ["场景","课核"],
    relatedNodes: ["xrk-config","xrk-lab-config","xrk-deploy-env"],
    source: 'static',
  },
  {
    id: "s:xrk:no-secret-www:core",
    q: "管理员 Token 或私钥能否硬编码进 Core www 静态前端？",
    choices: [
      { t: "不能：前端可被拿走，密钥应留在服务端与秘密管理", ok: true, why: "www 是可下载静态资源；鉴权密钥放服务端。" },
      { t: "可以，联调方便最重要", ok: false, why: "泄密风险高于联调便利。" },
      { t: "改个文件名成 .map 就不会被下载", ok: false, why: "静态资源仍可能暴露。" },
      { t: "放进 comments 里浏览器就读不到", ok: false, why: "源码仍可见。" },
    ],
    kind: "concept",
    domain: "xrk",
    tags: ["场景","课核"],
    relatedNodes: ["xrk-http-www","xrk-http-auth","xrk-lab-http"],
    source: 'static',
  },
  {
    id: "s:xrk:runtime-singleton:core",
    q: "业务插件里需要用到运行时时，正确用法是？",
    choices: [
      { t: "使用裸名全局 AgentRuntime，不要 new 新实例", ok: true, why: "运行时单例由框架挂载；多实例会乱。" },
      { t: "每个插件 new AgentRuntime()", ok: false, why: "导致多实例与状态分裂。" },
      { t: "必须手写 import AgentRuntime from 某处再 new", ok: false, why: "业务侧用裸名全局，勿另建。" },
      { t: "把 Runtime 序列化进 Redis 再反序列化使用", ok: false, why: "不是本仓用法。" },
    ],
    kind: "concept",
    domain: "xrk",
    tags: ["场景","课核"],
    relatedNodes: ["xrk-runtime","xrk-plugin-arch","xrk-min-path"],
    source: 'static',
  },
  {
    id: "s:xrk:subserver-heavy:core",
    q: "CPU 很重的 Python 任务应放在哪一侧更符合本仓架构？",
    choices: [
      { t: "子服按语言卸重活，经 HTTP 契约由主服调用", ok: true, why: "主服 Node 编排；重活与多语言在子服。" },
      { t: "塞进主服事件循环里同步死算", ok: false, why: "拖垮主服响应。" },
      { t: "子服 yaml 以子服本地为唯一配置源随意改", ok: false, why: "配置由主服侧编排约定。" },
      { t: "为每个任务再 fork 一套 AgentRuntime 内核", ok: false, why: "不必要且失控。" },
    ],
    kind: "concept",
    domain: "xrk",
    tags: ["场景","课核"],
    relatedNodes: ["xrk-subserver","xrk-lab-subserver","xrk-language-stack"],
    source: 'static',
  },
  {
    id: "s:xrk:tasker-channel:core",
    q: "Tasker 在本仓更准确的定位是？",
    choices: [
      { t: "通道/协议适配（如 OneBot），不是业务插件本身", ok: true, why: "通道与业务插件分层；Events 改完也常需重启才生效。" },
      { t: "Tasker 等于任意业务插件容器", ok: false, why: "业务应在 core/*/plugin。" },
      { t: "MCP 与 Tasker 是同一种东西", ok: false, why: "MCP 偏工具协议，Tasker 偏消息通道。" },
      { t: "办事助手规则只留在群聊口头约定即可", ok: false, why: "应落盘到工作区/AGENTS。" },
    ],
    kind: "concept",
    domain: "xrk",
    tags: ["场景","课核"],
    relatedNodes: ["xrk-tasker-channels","xrk-events","xrk-mcp-ops","xrk-chat-pipeline"],
    source: 'static',
  }
];
