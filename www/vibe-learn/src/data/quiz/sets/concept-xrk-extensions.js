import { defineQuizSet } from '../schema.js';

/** XRK 扩展点深挖：Events / Tasker / MCP / Factory / DB / 鉴权 */
export default defineQuizSet({
  id: 'concept-xrk-extensions',
  title: '概念 · XRK 扩展点（Events·Tasker·MCP·工厂）',
  kind: 'concept',
  domain: 'xrk',
  tags: ['扩展点', 'Events', 'Tasker', 'MCP', 'LLM', '进阶'],
  relatedNodes: [
    'xrk-events',
    'xrk-tasker-channels',
    'xrk-factory-llm',
    'xrk-mcp-ops',
    'xrk-http-auth',
    'xrk-agent-workspace',
    'xrk-plugin-arch',
    'ai-mcp',
  ],
  caption: '对照底层：扩展点各干一摊；厨房三角 / 插座 / USB 巧思可记。',
  questions: [
    {
      id: 'concept-xrk-extensions:q1',
      q: 'events/ 扩展点更适合做什么？',
      choices: [
        { t: '监听运行时内部事件做副作用（日志、联动、统计），不替代对外 HTTP', ok: true, why: '解耦：请求函数别堆所有副作用。' },
        { t: '完全取代 core/*/http/ 全部路由', ok: false, why: 'HTTP 仍对外提供 API。' },
        { t: '专门烧录 ESP32', ok: false, why: '无关。' },
        { t: 'Events 等于 Tasker', ok: false, why: 'Tasker 接外部通道；Events 接内部事件。' },
      ],
      relatedNodes: ['xrk-events', 'xrk-runtime'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-extensions:q2',
      q: 'Tasker 通道（OneBot/Stdin 等）解决什么？',
      choices: [
        { t: '把外部消息协议适配进 Agent Runtime——「从哪收消息」', ok: true, why: '协议适配层；业务仍在 plugin/workflow。' },
        { t: 'Tasker 是向量数据库品牌', ok: false, why: '否。' },
        { t: '有 Tasker 就不必鉴权', ok: false, why: '通道仍有信任边界。' },
        { t: 'Tasker 替代 TCP', ok: false, why: '无关。' },
      ],
      relatedNodes: ['xrk-tasker-channels', 'xrk-chat-pipeline'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-xrk-extensions:q3',
      q: 'LLM Factory 与「业务提示词 / 工具环」的边界？',
      choices: [
        { t: '工厂按配置创建模型客户端与调用策略；提示与工具在工作流/Agent', ok: true, why: '基础设施 ≠ 自动写产品。' },
        { t: 'Factory 会自动训练你的私有基座权重', ok: false, why: '那是训练管线。' },
        { t: '有 Factory 就不必 HTTPS', ok: false, why: '出网仍要安全传输。' },
        { t: 'Factory 替代 Git', ok: false, why: '无关。' },
      ],
      relatedNodes: ['xrk-factory-llm', 'ai-openai-protocol'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-extensions:q4',
      q: 'MCP 在本仓语境下更接近？',
      choices: [
        { t: '工具/资源的标准插接协议，可与 HTTP API 并存', ok: true, why: '降低私有工具协议碎片。' },
        { t: '必须消灭所有 REST', ok: false, why: 'HTTP 仍是扩展点。' },
        { t: 'MCP 就是某款 LLM 的名字', ok: false, why: '协议≠模型。' },
        { t: 'MCP 是关系库引擎', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-mcp-ops', 'ai-mcp'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-extensions:q5',
      q: '流式输出（stream）对聊天管线的意义？',
      choices: [
        { t: '边生成边推到通道（QQ/Web），降低首字等待，需处理中断与半包', ok: true, why: '与 HTTP 流式/SSE 知识相通。' },
        { t: '流式表示可以不记日志', ok: false, why: '更要可观测。' },
        { t: '流式等于跳过鉴权', ok: false, why: '否。' },
        { t: '只有下载系统镜像才用流式', ok: false, why: '对话补全常用。' },
      ],
      relatedNodes: ['xrk-stream', 'xrk-chat-pipeline', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-extensions:q6',
      q: 'xrk-database / 数据层在全栈里通常要和什么一起考虑？',
      choices: [
        { t: '连接配置（常经环境变量）、迁移、备份——库服务与 SQLite 选型见 db 模块', ok: true, why: '跨板块：SQL/Docker 起库 + XRK 配置归属。' },
        { t: '数据库密码应写进前端', ok: false, why: '泄漏。' },
        { t: '有了 LLM 就不必持久化', ok: false, why: '状态与审计仍要。' },
        { t: '禁止使用索引', ok: false, why: '否。' },
      ],
      relatedNodes: ['xrk-database', 'db-as-service', 'data-env'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-extensions:q7',
      q: 'HTTP 鉴权（xrk-http-auth）相对「插件内部信任」？',
      choices: [
        { t: '对外 API 要鉴权/校验输入；不能假设调用方都是好人', ok: true, why: '与 craft-security、CORS/Token 知识衔接。' },
        { t: '内网 API 永远不用鉴权', ok: false, why: '内网也会被扫。' },
        { t: '鉴权可以靠 CSS 隐藏按钮', ok: false, why: '前端不可靠。' },
        { t: 'HttpResponse 会自动完成 OAuth', ok: false, why: '形状工具≠完整鉴权方案。' },
      ],
      relatedNodes: ['xrk-http-auth', 'craft-security', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-extensions:q8',
      q: '语言栈直觉：主服与子服？',
      choices: [
        { t: '主服 Node 编排；子服可跑 Python 等 apis，经门面协作', ok: true, why: '多语言能力扩展，不是同进程硬塞。' },
        { t: '禁止 Python', ok: false, why: 'pyserver 是正路。' },
        { t: '子服命令必须从主服 stdin 转发', ok: false, why: '在子服终端输入。' },
        { t: '主服跑在浏览器里', ok: false, why: 'Node 进程。' },
      ],
      relatedNodes: ['xrk-language-stack', 'xrk-subserver', 'xrk-lab-subserver'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-xrk-extensions:q9',
      q: '办事助手工作区（agent workspace）注入的内容应是？',
      choices: [
        { t: '边界、技能与操作规范；敏感凭证走环境/密钥管理', ok: true, why: 'AGENTS.md / skills 可进仓；密钥不行。' },
        { t: '生产库 root 密码明文', ok: false, why: '禁止。' },
        { t: '互相矛盾的两套规则更好', ok: false, why: '要对齐。' },
        { t: '工作区文件禁止版本化', ok: false, why: '应进仓共享。' },
      ],
      relatedNodes: ['xrk-agent-workspace', 'adev-project-memory'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-extensions:q10',
      q: 'commonconfig schema 相对「只改一份运行时 yaml」多提供什么？',
      choices: [
        { t: '字段校验与文档化；和 default 模板、消费代码组成三同步', ok: true, why: '热加载/新环境才稳。' },
        { t: 'schema 只是装饰可删', ok: false, why: '校验依赖它。' },
        { t: 'schema 里应提交真实生产密钥', ok: false, why: '否。' },
        { t: '有 schema 就不必写消费代码', ok: false, why: '仍要 read。' },
      ],
      relatedNodes: ['xrk-config', 'xrk-lab-config'],
      tags: ['进阶'],
    },
    {
      id: 'concept-xrk-extensions:q11',
      q: '厨房三角：Tasker / plugin / events 分别像？',
      choices: [
        {
          t: '进货拆箱 / 炒菜上菜 / 排烟与温度计（横切常开）',
          ok: true,
          why: '通道造 e、业务吃 e、Listener 挂副作用；见两课巧思。',
        },
        {
          t: '三者都只负责画 CSS',
          ok: false,
          why: '服务端扩展点。',
        },
        {
          t: 'events 应承载全部用户指令',
          ok: false,
          why: '指令放 plugin。',
        },
        {
          t: 'Tasker 应直接微调模型权重',
          ok: false,
          why: '通道不管训练。',
        },
      ],
      relatedNodes: ['xrk-tasker-channels', 'xrk-events', 'xrk-plugin-arch'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-xrk-extensions:q12',
      q: 'e.bot 与 AgentRuntime 戴错会怎样？',
      choices: [
        {
          t: '回消息找错对象或去通道实例上调子服/Loader',
          ok: true,
          why: 'e.bot=账号通道；AgentRuntime=全局编排。',
        },
        {
          t: '二者始终可互换，框架自动纠正',
          ok: false,
          why: '不会自动纠正语义错误。',
        },
        {
          t: '只有浏览器能用 e.bot',
          ok: false,
          why: '服务端事件对象。',
        },
        {
          t: 'e.bot 等于 HTTP Response',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['xrk-tasker-channels', 'xrk-runtime', 'xrk-lab-plugin'],
      tags: ['进阶'],
    },
  ],
});
