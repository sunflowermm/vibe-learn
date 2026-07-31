import { defineQuizSet } from '../schema.js';

/**
 * 场景题：产品怎么落位 + 前端怎么挂。
 * 框架不绑死 Vue/React；约束的是目录、sign、兼容层与响应解包。
 */
export default defineQuizSet({
  id: 'concept-xrk-scenarios',
  title: '场景 · 在 XRK-AGT 上做产品',
  kind: 'concept',
  domain: 'xrk',
  tags: ['场景', '分层', 'API', 'www', '工具'],
  relatedNodes: ['xrk-biz-map', 'xrk-http-www'],
  caption: '配模型、封 API、写工具、挂前端——按扩展点落位。',
  questions: [
    {
      id: 'concept-xrk-scenarios:ai-api-billing',
      q: '想定：配好模型能力，包装成第三方 HTTP API 给别人用，并自己做用量/计费。主路径？',
      choices: [
        {
          t: '工厂/ai-workflow 配模型 → core/*/http 暴露并鉴权 → 计费配额写在你的 Core，勿改 src/ 硬塞计费内核',
          ok: true,
          why: '模型走工厂；对外走 http/+Auth；计量是产品逻辑。',
        },
        {
          t: '在 src/factory 写死计费与各客户密钥',
          ok: false,
          why: '工厂只管客户端；业务不进 Runtime。',
        },
        {
          t: '只改 www，让浏览器直连厂商 API 并前端扣费',
          ok: false,
          why: '密钥与计费必须服务端门面。',
        },
        {
          t: '必须先改 AgentRuntime 源码才能对外提供 API',
          ok: false,
          why: 'Loader 扫 core/*/http 即可。',
        },
      ],
      relatedNodes: ['xrk-factory-llm', 'xrk-http-auth'],
    },
    {
      id: 'concept-xrk-scenarios:where-config-ai',
      q: '「对话用哪家模型 / Key / 代理」配置主要落哪？',
      choices: [
        {
          t: 'ai-workflow 与 *_llm 等（密钥走环境/密文）；产品开关再进自己的 default/ + commonconfig',
          ok: true,
          why: '工厂模板属运行时；产品字段归 Core 三同步。',
        },
        {
          t: '全部硬编码进 plugin 顶部并提交仓库',
          ok: false,
          why: '密钥泄漏且无法面板管理。',
        },
        {
          t: '只能配在子服 Python，主服禁止',
          ok: false,
          why: '本仓 LLM 在主服工厂。',
        },
        {
          t: '真实生产 Key 写进 default_config 模板',
          ok: false,
          why: '模板只留字段结构。',
        },
      ],
      relatedNodes: ['xrk-factory-llm', 'xrk-config', 'xrk-lab-config'],
    },
    {
      id: 'concept-xrk-scenarios:write-tool',
      q: '给模型「可调用的工具」，更贴设计的做法？',
      choices: [
        {
          t: '工作流 registerMCPTool / 挂 MCP；重活可 callSubserver；编排仍在 workflow/plugin',
          ok: true,
          why: '工具面与工厂客户端正交；禁止假 ReAct。',
        },
        {
          t: '在 prompt 里用自然语言假装已调过工具',
          ok: false,
          why: '须真 tool_calls / MCP。',
        },
        {
          t: '把工具打进 src/factory/llm',
          ok: false,
          why: '工厂不管工具目录。',
        },
        {
          t: '工具只能写在 www，由浏览器执行后贴回对话',
          ok: false,
          why: '工具环在主服工作流。',
        },
      ],
      relatedNodes: ['xrk-mcp-ops', 'xrk-stream'],
    },
    {
      id: 'concept-xrk-scenarios:dir-map',
      q: '新建产品 Core：「需求 → 目录」哪组对？',
      choices: [
        {
          t: '指令→plugin/；对外 API→http/；页面→www/<应用>/；AI 编排→workflow/；配置→commonconfig/ + default/',
          ok: true,
          why: '业务层全景标准落位。',
        },
        {
          t: '全部塞进 src/infrastructure',
          ok: false,
          why: '产品在 core/。',
        },
        {
          t: 'API 写 www，页面写 http',
          ok: false,
          why: '职责反了。',
        },
        {
          t: '通道适配写 plugin，业务指令写 tasker',
          ok: false,
          why: 'tasker=适配，plugin=业务。',
        },
      ],
      relatedNodes: ['xrk-biz-map', 'xrk-core-layout', 'xrk-config'],
    },
    {
      id: 'concept-xrk-scenarios:prompt-workspace',
      q: '给办事/对话 Agent 稳定交底，更贴近本仓？',
      choices: [
        {
          t: 'AGENTS.md / skills（及办事工作区）版本化注入；密钥不进 prompt 文件',
          ok: true,
          why: '根 AGENTS 与办事工作区读者不同；人设不锁进 Runtime。',
        },
        {
          t: '生产库密码写进 AGENTS.md',
          ok: false,
          why: '机密走环境。',
        },
        {
          t: '删光说明，只靠预训练猜约定',
          ok: false,
          why: '要项目记忆。',
        },
        {
          t: '改 src/agent-runtime.js 硬编码永久 system',
          ok: false,
          why: '交底在工作区/配置。',
        },
      ],
      relatedNodes: ['xrk-agent-workspace', 'adev-project-memory', 'xrk-chat-pipeline'],
    },
    {
      id: 'concept-xrk-scenarios:python-tool',
      q: '工具依赖 Python 生态时怎么接？',
      choices: [
        {
          t: '子服 apis 实现；主服 callSubserver；配置编辑中枢仍在主服 CommonConfig',
          ok: true,
          why: '独立进程 + 主服编排。',
        },
        {
          t: '把主服改成 Python，丢掉 Node Runtime',
          ok: false,
          why: '主服契约是 Node。',
        },
        {
          t: '子服命令必须从主服 stdin 转发',
          ok: false,
          why: '运维在子服终端。',
        },
        {
          t: '只能在浏览器 WASM 重写，禁止子服',
          ok: false,
          why: '不是本仓主路径。',
        },
      ],
      relatedNodes: ['xrk-subserver', 'xrk-lab-subserver', 'xrk-language-stack'],
    },
    {
      id: 'concept-xrk-scenarios:www-supported',
      q: 'Core www「支持哪些前端形态」——框架实际约束的是？',
      choices: [
        {
          t: '不绑死 Vue/React：零配置静态、sign 纯静态、build 挂 dist、或 enabled 反代开发服——产出能被挂载即可',
          ok: true,
          why: '见 www-mount：静态 / 产物 / 反代三模式；技术栈自选。',
        },
        {
          t: '只允许官方指定的某一个前端框架，其它一律拒挂',
          ok: false,
          why: '挂载看目录与 sign，不审框架品牌。',
        },
        {
          t: '前端必须写进 src/factory 才能被访问',
          ok: false,
          why: '页面在 core/*/www/<应用>/。',
        },
        {
          t: '禁止静态 HTML，必须上微服务前端集群',
          ok: false,
          why: '零配置静态正是一等公民。',
        },
      ],
      relatedNodes: ['xrk-http-www', 'xrk-biz-map'],
    },
    {
      id: 'concept-xrk-scenarios:www-where',
      q: '产品控制台/落地页应放哪？应用名要注意什么？',
      choices: [
        {
          t: 'core/<core>/www/<应用名>/；勿用 api、core、media、uploads、File、shared 等保留根名',
          ok: true,
          why: '挂载为 /<应用名>；保留段会被跳过或冲突。',
        },
        {
          t: '仓库根目录建 shared/ 最短最好',
          ok: false,
          why: 'shared 保留；产品用自有名。',
        },
        {
          t: '页面必须和 http 路由写在同一 .js',
          ok: false,
          why: 'www 与 http 分目录。',
        },
        {
          t: '只能外链 CDN，禁止进仓',
          ok: false,
          why: '仓内挂载是正路。',
        },
      ],
      relatedNodes: ['xrk-http-www', 'xrk-core-layout'],
    },
    {
      id: 'concept-xrk-scenarios:www-sign',
      q: '有 sign.json 时，纯静态 / 只编产物 / 反代开发，差别直觉？',
      choices: [
        {
          t: '纯静态挂目录本体；enabled:false 常只 build 挂 dist；enabled:true 启进程+反代',
          ok: true,
          why: 'docs/www-mount.md 三模式；Vite base 须与 mount 一致。',
        },
        {
          t: '有 sign 就必须每天手动改 src/infrastructure',
          ok: false,
          why: 'sign 只描述该应用挂载，不改 Runtime。',
        },
        {
          t: '三种模式都必须启动前端 dev 进程',
          ok: false,
          why: '静态/产物模式不启进程。',
        },
        {
          t: 'sign 与主服 server 配置永远互斥、不能合并',
          ok: false,
          why: 'sign 已写优先，未写回落 server。',
        },
      ],
      relatedNodes: ['xrk-http-www', 'xrk-deploy-env'],
    },
    {
      id: 'concept-xrk-scenarios:www-compat',
      q: '产品 Core 前端写超时/ID/解包时，正确习惯？',
      choices: [
        {
          t: '对齐 web-compat 语义；产品页只内联，禁止依赖 /shared 或跨应用 /xrk/...',
          ok: true,
          why: 'xrk-www-compat：/xrk 用模块，其它 Core 内联同语义。',
        },
        {
          t: '直接 import 控制台 /xrk 的兼容模块当公共依赖',
          ok: false,
          why: '跨应用依赖禁止。',
        },
        {
          t: '浏览器里裸用 crypto.randomUUID / AbortSignal.timeout，不必降级',
          ok: false,
          why: '校园 WebView 等环境常缺，须兼容封装。',
        },
        {
          t: '前端可以随便改 src/utils 当自己的工具库',
          ok: false,
          why: '新能力先改权威实现再同步内联；业务不改 Runtime 乱堆。',
        },
      ],
      relatedNodes: ['xrk-http-www', 'xrk-lab-http'],
    },
    {
      id: 'concept-xrk-scenarios:unwrap',
      q: '前端调本仓 HttpResponse.success(普通对象) 时？',
      choices: [
        {
          t: '字段常拍平到顶层；用 unwrapSuccess 或读顶层，勿默认死读 json.data',
          ok: true,
          why: '与教程「永远 data」冲突时以本仓契约为准。',
        },
        {
          t: '永远只有 json.data，业务字段一定在里面',
          ok: false,
          why: '普通对象拍平；数组/标量才进 data。',
        },
        {
          t: 'success 响应可以没有 message',
          ok: false,
          why: '始终有 success 与 message。',
        },
        {
          t: '混用裸 res.json 与 HttpResponse，前端各自猜',
          ok: false,
          why: '形状必须统一。',
        },
      ],
      relatedNodes: ['xrk-http-www', 'xrk-lab-http'],
    },
    {
      id: 'concept-xrk-scenarios:agent-www',
      q: '用 Agent 加一个产品前端页时，验收更接近？',
      choices: [
        {
          t: '落在 www/<应用>/；无保留名冲突；调 API 解包正确；兼容层内联；本机打开路径可访问',
          ok: true,
          why: '目录 + 契约 + 可复查，与最小路径一致。',
        },
        {
          t: '页面可以占用 shared 根名，挂载更短',
          ok: false,
          why: '保留段。',
        },
        {
          t: '密钥写进前端打包 JS 方便演示',
          ok: false,
          why: '浏览器可见即泄漏。',
        },
        {
          t: '只改 README 宣称已上线控制台',
          ok: false,
          why: '要有可打开的挂载结果。',
        },
      ],
      relatedNodes: ['xrk-http-www', 'adev-vibe-coding', 'xrk-min-path'],
    },
  ],
});
