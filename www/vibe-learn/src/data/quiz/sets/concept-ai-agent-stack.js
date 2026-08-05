import { defineQuizSet } from '../schema.js';

/** 行动+驯服：工具环、MCP、控制循环、Rules/Skills、子代理、记忆与协议分层。命题：mcq-expert。 */
export default defineQuizSet({
  id: 'concept-ai-agent-stack',
  title: '概念 · 工具调用、MCP 与智能体栈',
  kind: 'concept',
  domain: 'ai',
  tags: ['工具调用', 'MCP', 'Agent', 'Skills'],
  relatedNodes: [
    'ai-tool-calling',
    'ai-mcp',
    'ai-agent-birth',
    'ai-rules',
    'ai-skills',
    'ai-subagent',
  ],
  caption: '模型提议、运行时执行；规则护栏与技能手册；子代理隔离上下文。',
  questions: [
    {
      id: 'concept-ai-agent-stack:q1',
      q: '启用工具调用后，模型侧通常输出什么、由谁真正执行？',
      choices: [
        {
          t: '结构化调用请求；Agent Runtime 或宿主程序按策略鉴权并执行',
          ok: true,
          why: '模型只「提议」；执行权、沙箱与审计在运行时。',
        },
        {
          t: '可执行二进制补丁；模型直接改操作系统内核与驱动，无需宿主鉴权',
          ok: false,
          why: '模型无直接系统权限，必须经过宿主。',
        },
        {
          t: '只能输出 JSON 工具调用，此后禁止任何自然语言回复给用户',
          ok: false,
          why: '工具调用与自然语言可交替出现。',
        },
        {
          t: '每次工具调用都会永久改写基座模型权重，相当于在线微调',
          ok: false,
          why: '工具调用是推理期行为，不改训练参数。',
        },
      ],
      relatedNodes: ['ai-tool-calling'],
      tags: ['工具调用'],
    },
    {
      id: 'concept-ai-agent-stack:q2',
      q: '运行时收到模型的 tool_calls 后，较标准的下一步是？',
      choices: [
        {
          t: '校验参数→执行工具→把结果作为 tool 消息回灌，再让模型继续推理',
          ok: true,
          why: '闭环是「提议→执行→观察→再决策」，不是执行完就结束会话。',
        },
        {
          t: '静默丢弃调用，只把 assistant 文本展示给用户',
          ok: false,
          why: '不回灌结果，多步任务无法继续。',
        },
        {
          t: '把 tool_calls 原样写进 Git 提交信息代替执行',
          ok: false,
          why: '版本库不执行工具，也不替代运行时。',
        },
        {
          t: '必须先微调模型，否则无法处理任何 tool_calls',
          ok: false,
          why: '工具调用是推理期协议能力，不依赖先微调。',
        },
      ],
      relatedNodes: ['ai-tool-calling', 'ai-agent-birth'],
      tags: ['工具调用'],
    },
    {
      id: 'concept-ai-agent-stack:q3',
      q: '模型上下文协议（MCP）相对「各客户端手写私有工具接口」，主要价值是？',
      choices: [
        {
          t: '较统一的工具/资源发现与调用约定，降低重复对接成本',
          ok: true,
          why: '标准插接面；多客户端可复用同一 MCP 服务器。',
        },
        {
          t: '取代全部 HTTP API，以后禁止写 REST 路由',
          ok: false,
          why: 'MCP 与 HTTP 可并存；对外 API 仍常用 REST。',
        },
        {
          t: '专门把文本编码成向量，等价于 Embedding 模型',
          ok: false,
          why: 'Embedding 做向量化；MCP 是工具/资源协议。',
        },
        {
          t: '与 RAG 检索增强生成指同一套固定流水线',
          ok: false,
          why: 'RAG 是检索→增强→生成；MCP 是工具插接协议。',
        },
      ],
      relatedNodes: ['ai-mcp'],
      tags: ['MCP'],
    },
    {
      id: 'concept-ai-agent-stack:q4',
      q: '助手要「查库存→下单→再确认」才能完成时，Agent 控制循环相对单次 Chat 多了什么？',
      choices: [
        {
          t: '观察环境→决策下一步→执行工具或生成→再观察，直到完成或触达停止条件',
          ok: true,
          why: '多步循环区别于 Completions 的一问一答。',
        },
        {
          t: '只能做静态文本补全，禁止调用工具或多轮观察—决策迭代',
          ok: false,
          why: 'Agent 价值正在于多步工具与状态循环。',
        },
        {
          t: '控制循环只发生在训练期，推理期不会再出现观察—执行环',
          ok: false,
          why: '控制循环是运行/推理期行为。',
        },
        {
          t: '与 RAG 检索互斥：启用 Agent 控制循环后就不能再做任何检索',
          ok: false,
          why: 'Agent 常结合 RAG；二者可组合。',
        },
      ],
      relatedNodes: ['ai-agent-birth'],
      tags: ['控制循环'],
    },
    {
      id: 'concept-ai-agent-stack:q5',
      q: '本仓把检索做成智能体工具（Agentic RAG）时，更贴近哪条落地？',
      choices: [
        {
          t: 'registerMCPTool / 知识类工作流 + 工厂 tool_calls 多轮回灌；小语料常直接 tools.read',
          ok: true,
          why: '模型提议、运行时执行；读工作区是廉价「再检索」。',
        },
        {
          t: '禁止工具调用，只把向量库连接串与访问密钥写进 system 提示，让模型自己拼连接字符串去查库回答',
          ok: false,
          why: '密钥进提示既不安全，也不是工具环。',
        },
        {
          t: '必须先关闭 maxToolRounds 工具轮预算，只允许单轮 tool_calls，禁止任何多轮再检索与结果回灌',
          ok: false,
          why: '多轮再检索正需要工具轮次预算。',
        },
        {
          t: '固定「检索→拼 prompt→生成」三件套流水线，模型不得再决定是否读文件、改写查询或发起再检索',
          ok: false,
          why: '那是经典 RAG 管道；Agentic 让模型决定何时再读。',
        },
      ],
      relatedNodes: ['ai-agentic-rag', 'ai-tool-calling', 'ai-mcp'],
      tags: ['Agentic RAG'],
    },
    {
      id: 'concept-ai-agent-stack:q6',
      q: '「图编排（agent graph）」式工作流，更适合解决哪类问题？',
      choices: [
        {
          t: '多步分支、需维护状态的任务，如审批链或复杂分解',
          ok: true,
          why: '状态机/有向图表达「下一步走哪条边」，比线性 prompt 可控。',
        },
        {
          t: '单次打印固定字符串，不需要分支或状态',
          ok: false,
          why: '简单单次输出用普通 Chat 即可。',
        },
        {
          t: '替代 TCP 重传与拥塞控制',
          ok: false,
          why: 'agent graph 是应用层任务编排，不是传输层协议。',
        },
        {
          t: '与 MCP 协议完全同一标准，只是换名',
          ok: false,
          why: 'Graph 是工作流编排；MCP 是工具插接协议。',
        },
      ],
      relatedNodes: ['ai-agent-graph', 'ai-agent-planning'],
      tags: ['图编排'],
    },
    {
      id: 'concept-ai-agent-stack:q7',
      q: '在 Cursor 等 IDE 里，Rules 通常承担什么角色？',
      choices: [
        {
          t: '硬约束与全局约定，长期注入 Agent 上下文',
          ok: true,
          why: 'Rules 像「必须遵守」的项目护栏。',
        },
        {
          t: '按需打开的操作手册，只在遇到某任务时再读',
          ok: false,
          why: '那是 Skills 的常见形态，不是 Rules。',
        },
        {
          t: '与 Skills 禁止共存，只能二选一',
          ok: false,
          why: '实践中常同时存在：Rules 定边界，Skills 补领域细节。',
        },
        {
          t: '只描述前端样式表，与 Agent 行为无关',
          ok: false,
          why: 'Rules 注入 Agent 上下文，约束编码与项目约定。',
        },
      ],
      relatedNodes: ['ai-rules'],
      tags: ['Rules'],
    },
    {
      id: 'concept-ai-agent-stack:q8',
      q: 'Skills 相对 Rules，在本仓/Cursor 语境里更常见的用法是？',
      choices: [
        {
          t: '按需加载的领域操作手册（如 SKILL.md），遇任务再展开细则',
          ok: true,
          why: 'Skills 像「遇到某任务再读」的专项指南。',
        },
        {
          t: '必须编译成二进制插件，不能用 Markdown',
          ok: false,
          why: 'Skills 常见形态是 SKILL.md 等文本文档。',
        },
        {
          t: '取代 AGENTS.md，禁止在项目里写 AGENTS.md',
          ok: false,
          why: 'AGENTS.md 讲项目交底；Skills 讲专项能力，可并存。',
        },
        {
          t: '只存放 npm 依赖版本锁定信息',
          ok: false,
          why: '依赖锁定靠 lockfile；Skills 是 Agent 操作规范。',
        },
      ],
      relatedNodes: ['ai-skills', 'ai-rules'],
      tags: ['Skills'],
    },
    {
      id: 'concept-ai-agent-stack:q9',
      q: '什么场景更该用子代理（Subagent），而不是把一切塞进主对话？',
      choices: [
        {
          t: '子任务可隔离（探路、审查、测试），需要干净上下文或并行，再把结论交回主代理',
          ok: true,
          why: '子代理解决上下文污染与角色冲突，不是炫技。',
        },
        {
          t: '任何一句话都必须开子代理',
          ok: false,
          why: '过短任务委派成本更高。',
        },
        {
          t: '子代理能保证输出零幻觉',
          ok: false,
          why: '隔离上下文不等于消除幻觉。',
        },
        {
          t: '与工具调用同义，调用一次 grep 就等于启动 subagent',
          ok: false,
          why: '工具调用是单步能力；subagent 是有独立上下文的委派执行体。',
        },
      ],
      relatedNodes: ['ai-subagent', 'ai-agent-birth'],
      tags: ['子代理'],
    },
    {
      id: 'concept-ai-agent-stack:q10',
      q: '仓库根目录 AGENTS.md 主要写给谁、解决什么问题？',
      choices: [
        {
          t: '给 coding Agent 的项目交底：工作区边界、放码位置与操作规范',
          ok: true,
          why: '让 Agent 读懂「这仓库怎么干活」，不是营销文案。',
        },
        {
          t: '存放生产数据库密码与云厂商 Key，方便 Agent 自动连库调试',
          ok: false,
          why: '密钥禁止进仓；AGENTS.md 只写规则与边界。',
        },
        {
          t: '替代 pnpm-lock.yaml，用自然语言描述依赖版本即可锁定安装树',
          ok: false,
          why: '依赖锁定靠 lockfile；AGENTS.md 是行为说明。',
        },
        {
          t: '仅供离线训练语料归档，IDE 推理时不会读取或注入到上下文',
          ok: false,
          why: 'Cursor 等会在推理时注入 AGENTS.md 到上下文。',
        },
      ],
      relatedNodes: ['ai-agents-md', 'adev-project-memory'],
      tags: ['AGENTS.md'],
    },
    {
      id: 'concept-ai-agent-stack:q11',
      q: '本仓「智能体记忆」里，单次会话连贯主要靠什么？',
      choices: [
        {
          t: '消息组装与历史预算（三层消息 / agentWorkspace），不是当场改权重',
          ok: true,
          why: '工作记忆在窗内；长期事实另走工作流或 tools.read。',
        },
        {
          t: '每次对话强制全量微调基座模型，用改权重代替消息历史',
          ok: false,
          why: '日常办事不靠当场改权重。',
        },
        {
          t: '把全部工具 schema JSON 永久写进 package.json 当作会话记忆',
          ok: false,
          why: 'package.json 管依赖与脚本，不是会话记忆。',
        },
        {
          t: '只调高 temperature 就能跨会话记住用户事实，无需消息预算或存储',
          ok: false,
          why: '采样温度不持久化事实；跨会话要靠显式存储或检索。',
        },
      ],
      relatedNodes: ['ai-agent-memory', 'ai-token-context', 'xrk-agent-workspace'],
      tags: ['记忆'],
    },
    {
      id: 'concept-ai-agent-stack:q12',
      q: '本仓用 maxToolRounds 等工具轮预算，主要防范什么？',
      choices: [
        {
          t: 'ReAct 式循环步数与墙钟失控，陷入反复调工具或死循环',
          ok: true,
          why: '要封顶步数与超时，不能无限「再想一步」。',
        },
        {
          t: '删除 package.json 后 npm 无法安装',
          ok: false,
          why: '删包清单不会限制工具轮次。',
        },
        {
          t: '禁止注册任何 MCP 工具',
          ok: false,
          why: '白名单与预算不等于零工具；需要的是可控上限。',
        },
        {
          t: '把 API Key 写进 README 导致泄露',
          ok: false,
          why: '密钥管理是安全议题，不是步数预算机制。',
        },
      ],
      relatedNodes: ['ai-agent-planning', 'ai-agent-birth', 'ai-tool-calling'],
      tags: ['maxToolRounds'],
    },
    {
      id: 'concept-ai-agent-stack:q13',
      q: '本仓协议分层里，默认对话入口与工具面分别更贴近哪一层？',
      choices: [
        {
          t: 'L1：Chat Completions 兼容形状；L2：MCP / registerMCPTool 工具面',
          ok: true,
          why: '兼容层迁移面广；工具走 registerMCPTool / remote-mcp。',
        },
        {
          t: 'L1 必须先实现完整 A2A 多代理协作协议与路由，否则根本不能调用任何对话模型',
          ok: false,
          why: 'L3 协作不是对话入口前提。',
        },
        {
          t: 'L2 等于取消工具调用，只允许纯文本补全，与 MCP / registerMCPTool 注册无关',
          ok: false,
          why: 'L2 正是工具面，不是禁用工具。',
        },
        {
          t: 'L1 与 L2 都指 DNS 解析与证书校验流程，与 Chat Completions / MCP 会话无关',
          ok: false,
          why: '提示词与工具走会话 API，不是 DNS 记录。',
        },
      ],
      relatedNodes: ['ai-protocol-forks', 'ai-openai-protocol', 'ai-mcp'],
      tags: ['协议分层'],
    },
    {
      id: 'concept-ai-agent-stack:q14',
      q: '本仓 registerMCPTool 相对「模型自己猜怎么调 HTTP」，主要补上什么？',
      choices: [
        {
          t: '运行时注册的工具 schema、鉴权与执行入口，供工厂 tool_calls 统一调度',
          ok: true,
          why: '把「能调什么、怎么调、谁执行」收口到 Runtime，而不是让模型裸打 URL。',
        },
        {
          t: '自动把每次对话全文写入向量库做永久记忆，替代消息预算机制',
          ok: false,
          why: '注册工具不等于持久化记忆；记忆另有消息预算与工作流。',
        },
        {
          t: '替代 Rules，注册工具后禁止在项目里再写任何 .cursor/rules',
          ok: false,
          why: 'Rules 约束行为；registerMCPTool 暴露可调用能力，职责不同。',
        },
        {
          t: '只允许本地 stdio MCP 传输，禁止 remote-mcp 经网络挂载任何工具',
          ok: false,
          why: '本仓同时支持本地与 remote-mcp；注册层不限定传输形态。',
        },
      ],
      relatedNodes: ['ai-mcp', 'ai-tool-calling', 'xrk-mcp-ops'],
      tags: ['registerMCPTool'],
    },
  ],
});
