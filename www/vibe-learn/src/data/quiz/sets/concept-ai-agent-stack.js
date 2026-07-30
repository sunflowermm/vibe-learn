import { defineQuizSet } from '../schema.js';

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
    'ai-subagent',
    'ai-pi-agent',
    'ai-agent-memory',
    'ai-agent-planning',
    'ai-prompt-security',
  ],
  questions: [
    {
      q: '大语言模型的「工具调用（tool calling）」机制，让模型能做什么？',
      choices: [
        { t: '输出结构化调用请求，由 Agent Runtime 或宿主程序真正执行工具', ok: true, why: 'tool-calling：模型只「提议」调用；执行、鉴权、沙箱由运行时负责。' },
        { t: '模型获得权限后可以直接修改用户电脑 BIOS 和磁盘分区', ok: false, why: '模型本身不能操作系统；必须通过宿主程序按策略执行工具。' },
        { t: '开启工具调用后模型只能输出 JSON，不能再生成自然语言回复', ok: false, why: '工具调用与自然语言回复可交替；模型可先调工具再组织最终回答。' },
        { t: '工具调用等于微调模型权重，每次调用都会 permanently 改参数', ok: false, why: '工具调用是推理期行为，不改权重；微调才是改参数。' },
      ],
    },
    {
      q: '模型上下文协议（MCP，Model Context Protocol）相对「手写一堆私有工具接口」的优势是什么？',
      choices: [
        { t: '提供较统一的工具/资源发现与调用约定，降低各客户端重复对接成本', ok: true, why: 'mcp：标准插接面；Cursor、Claude 等可用同一 MCP 服务器，不必每家重写协议。' },
        { t: 'MCP 会消灭一切 HTTP API，以后不能再写 REST 路由', ok: false, why: 'MCP 与 HTTP 可并存；HTTP 仍是 Core 对外 API 的重要形式。' },
        { t: 'MCP 就是一种 Embedding 模型，专门把文本变成向量', ok: false, why: 'Embedding 模型做向量化；MCP 是工具/资源协议，不是模型。' },
        { t: 'MCP 等于 RAG 检索增强生成，两者指的是同一套流水线', ok: false, why: 'RAG 是检索→增强→生成；MCP 是工具插接协议，层次不同。' },
      ],
    },
    {
      q: '智能体（Agent）的「控制循环」核心直觉是什么？',
      choices: [
        { t: '观察环境→决策下一步→执行工具或生成→再观察，直到任务完成或停止', ok: true, why: 'agent-birth：多步循环区别于单次 Chat Completions 一问一答。' },
        { t: 'Agent 只能做一次静态补全，永远不能调用工具或多轮迭代', ok: false, why: 'Agent 的价值正在于多步工具与状态循环，不是单次补全。' },
        { t: '控制循环指只训练模型、永不进行推理时的工具调用', ok: false, why: '控制循环发生在推理/运行期；训练是离线阶段。' },
        { t: 'Agent 循环与 RAG 检索完全互斥，用了 Agent 就不能做检索', ok: false, why: 'Agent 常结合 RAG 检索；二者可组合，不是互斥关系。' },
      ],
    },
    {
      q: '「图编排（agent graph）」式工作流，更适合解决哪类问题？',
      choices: [
        { t: '多步分支、需要维护状态的工作流，如审批链、复杂任务分解', ok: true, why: 'agent-graph：状态机/有向图表达「下一步走哪条边」，比线性 prompt 可控。' },
        { t: '单次 echo「Hello World」打印，不需要任何分支或状态', ok: false, why: '简单单次输出用普通 Chat 即可，不必上图编排。' },
        { t: '替代 TCP/IP 协议栈，负责网络包的路由与重传', ok: false, why: 'agent graph 是应用层任务编排，不是网络传输协议。' },
        { t: '图编排等于 MCP 协议本身，两者是完全同一个标准', ok: false, why: 'Graph 是工作流编排模式；MCP 是工具插接协议，概念不同。' },
      ],
    },
    {
      q: '在 Cursor 等工具里，Rules 相对 Skills 的常见分工是什么？',
      choices: [
        { t: 'Rules 常作硬约束与全局规则；Skills 常作按需加载的操作手册', ok: true, why: 'rules/skills：Rules 像「必须遵守」；Skills 像「遇到某任务再读」的细则。' },
        { t: 'Rules 与 Skills 禁止在同一项目里共存，只能二选一', ok: false, why: '实践中常同时存在：Rules 定边界，Skills 补领域操作细节。' },
        { t: 'Skills 必须是二进制可执行文件，不能是 Markdown 文档', ok: false, why: 'Skills 常见形态是 SKILL.md 等文本手册，不是二进制。' },
        { t: 'Rules 只用于前端 CSS，与 Agent 行为约束完全无关', ok: false, why: 'Rules 注入 Agent 上下文，约束编码与项目约定等行为。' },
      ],
    },
    {
      q: '「子代理（subagent）」在复杂任务里的直觉是什么？',
      choices: [
        { t: '把子任务委派给另一上下文/角色执行，主 Agent 汇总结果', ok: true, why: 'subagent：隔离上下文、并行探索；父 Agent 负责协调与合并。' },
        { t: '子代理必须运行在另一台物理电脑上，同一 IDE 不能启动', ok: false, why: '子代理是逻辑/context 隔离，可在同一宿主内启动多个 agent 会话。' },
        { t: '子代理就是删除生产数据库，与任务委派完全无关', ok: false, why: 'Subagent 是任务分解机制，不是破坏性操作。' },
        { t: '子代理与工具调用同义，调用一次 grep 就等于启动 subagent', ok: false, why: '工具调用是单步能力；subagent 是有独立上下文的委派执行体。' },
      ],
    },
    {
      q: '仓库根目录的 AGENTS.md 主要服务于什么目的？',
      choices: [
        { t: '给 coding Agent 提供项目交底、工作区边界与操作规范', ok: true, why: 'agents-md：让 Agent 读懂「这仓库怎么干活」，不是给人类读者写营销文案。' },
        { t: '存放生产数据库密码和 API Key，方便 Agent 自动连库', ok: false, why: '密钥禁止进仓；AGENTS.md 只写规则与边界，不写机密。' },
        { t: '替代 pnpm-lock.yaml 锁定 npm 依赖版本', ok: false, why: '依赖锁定靠 lockfile；AGENTS.md 是 Agent 行为说明，不是包管理文件。' },
        { t: 'AGENTS.md 只给 LLM 训练用，推理时 IDE 不会读取其内容', ok: false, why: 'Cursor 等会在推理时注入 AGENTS.md 到上下文，正是为了运行时指导。' },
      ],
    },
  ],
});
