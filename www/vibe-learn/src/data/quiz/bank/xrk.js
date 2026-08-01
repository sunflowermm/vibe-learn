/**
 * 静态题库 · xrk
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:xrk:config-http:core",
    q: "独立产品改配置字段；www 静态与 API 鉴权；首次跑通清单——要点？",
    choices: [
      { t: "default 模板+commonconfig+消费代码三同步；密钥勿进 www；先齐 Git/Node(pnpm)/代理等部署清单再谈业务", ok: true, why: "配错地方比写错代码更难查；安全与工具链先行。" },
      { t: "产品配置去改 config/default_config；密钥写进前端；跳过 Node 直接微调模型", ok: false, why: "归属错/泄密/被序反。" },
      { t: "只改 yaml 不改消费字段也能生效", ok: false, why: "三同步缺一不可。" },
      { t: "www 里硬编码管理员 Token 方便联调", ok: false, why: "前端可被拿走。" },
    ],
    kind: "concept",
    domain: "xrk",
    tags: ["场景","课核"],
    relatedNodes: ["xrk-config","xrk-lab-config","xrk-http-www","xrk-http-auth","xrk-lab-http","xrk-deploy-env","xrk-first-run"],
    source: 'static',
  },
  {
    id: "s:xrk:layout-loader:core",
    q: "新 HTTP/插件放哪？Loader 如何挂上？业务里能否 new AgentRuntime？",
    choices: [
      { t: "放 core/<产品>/{http,plugin}/；目录约定扫描挂载；裸名全局 AgentRuntime，勿另建实例；业务不进 src/infrastructure", ok: true, why: "本仓纪律三连：放码、Loader、单例运行时。" },
      { t: "改 src/agent-runtime.js 塞业务；每次手写 import；每插件 new Runtime", ok: false, why: "耦合/失控/多实例。" },
      { t: "只有 system-Core 会被扫描", ok: false, why: "扫描各 core/*/。" },
      { t: "主服应改成多语言多进程各写一套 Runtime 内核", ok: false, why: "主服 Node；多语言在子服。" },
    ],
    kind: "concept",
    domain: "xrk",
    tags: ["场景","课核"],
    relatedNodes: ["xrk-overview","xrk-biz-map","xrk-core-layout","xrk-plugin-arch","xrk-runtime","xrk-min-path","xrk-language-stack"],
    source: 'static',
  },
  {
    id: "s:xrk:sub-stream-agent:core",
    q: "重活丢子服；对话如何拼消息；Redis/MCP/Tasker/Events 各像什么角色？",
    choices: [
      { t: "子服按语言卸重活、HTTP 契约调用；Factory 取模型、工作流/管线拼消息与工具；Redis 缓存会话等；MCP 挂工具；Tasker 是通道；Events 监听改完常需重启", ok: true, why: "运行时协作面一张图，胜过十道「课核口号」。" },
      { t: "子服配置以子服本地为唯一源；Tasker=业务插件；Events 热改无需重启从来成立", ok: false, why: "主服编配置；通道≠业务；常需重启。" },
      { t: "办事助手规则只写在群聊里不落盘", ok: false, why: "要工作区/AGENTS 落盘。" },
      { t: "不用 Redis 也能假装有分布式会话契约", ok: false, why: "本仓契约依赖缓存组件时要对齐文档。" },
    ],
    kind: "concept",
    domain: "xrk",
    tags: ["场景","课核"],
    relatedNodes: ["xrk-subserver","xrk-lab-subserver","xrk-lab-plugin","xrk-factory-llm","xrk-stream","xrk-chat-pipeline","xrk-agent-workspace","xrk-mcp-ops","xrk-tasker-channels","xrk-events","xrk-database"],
    source: 'static',
  }
];
