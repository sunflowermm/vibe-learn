import { defineQuizSet } from '../schema.js';

/**
 * 开口：Agent / MCP / 上下文工程 / 工具安全。
 * Embedding 同模型、RAG 不必 Agent → interview-ai-rag；经典三步口头定义放这里串故事。
 */
export default defineQuizSet({
  id: 'interview-ai-stack',
  title: '大厂 / 产品 · RAG 与 Agent 开口',
  kind: 'interview',
  domain: 'ai',
  tags: ['RAG', 'Agent', 'MCP'],
  relatedNodes: ['ai-rag', 'ai-agent-birth', 'ai-mcp', 'ai-tool-calling'],
  caption: '把检索三步、工具环、MCP、上下文预算与安全讲成一条故事线。',
  questions: [
    {
      id: 'interview-ai-stack:q1',
      q: '向产品或面试官介绍「经典 RAG」，三步流水线应怎么说？',
      choices: [
        {
          t: '检索（Retrieval）→ 增强上下文（Augment）→ 大语言模型生成（Generate）',
          ok: true,
          why: '先找相关片段，再塞进 prompt，最后 LLM 基于增强上下文回答。',
        },
        {
          t: '经典 RAG 必须先从零训练新的万亿参数底座模型才能开始',
          ok: false,
          why: '通常复用现有 LLM；价值在检索与上下文工程。',
        },
        {
          t: 'RAG 只能用手写 if-else 规则引擎，不能调用大语言模型',
          ok: false,
          why: 'G 步就是 LLM 生成。',
        },
        {
          t: 'RAG 三步是：微调→部署→删库，与检索无关',
          ok: false,
          why: '核心是检索增强；微调是可选优化。',
        },
      ],
      relatedNodes: ['ai-rag'],
    },
    {
      id: 'interview-ai-stack:q2',
      q: '智能体（Agent）相对「单次 Chat 一问一答」，开口时应强调什么差异？',
      choices: [
        {
          t: 'Agent 可多步调用工具、维护状态并循环，直到任务完成或停止',
          ok: true,
          why: '控制循环 + 工具环；单次 Chat 通常一轮就结束。',
        },
        {
          t: 'Agent 一定比单次 Chat 更省 token，因为不会重复上下文',
          ok: false,
          why: '多步常消耗更多 token，不是必然更省。',
        },
        {
          t: 'Agent 禁止结合 RAG 检索，两者在技术栈上完全互斥',
          ok: false,
          why: 'Agent 常把 RAG 当工具或检索步骤。',
        },
        {
          t: 'Agent 等于 MCP 协议本身，介绍 Agent 就是在介绍 MCP 报文格式',
          ok: false,
          why: 'Agent 是运行模式；MCP 是工具插接协议。',
        },
      ],
      relatedNodes: ['ai-agent-birth', 'ai-tool-calling'],
    },
    {
      id: 'interview-ai-stack:q3',
      q: '什么场景下值得引入模型上下文协议（MCP）？开口时怎么说？',
      choices: [
        {
          t: '需要标准化插接多种外部工具/资源，且多个客户端要复用同一套服务',
          ok: true,
          why: '统一 discover/call，避免各客户端各写一套私有协议。',
        },
        {
          t: 'Hello World 打印也必须走 MCP，否则不能算 LLM 应用',
          ok: false,
          why: '简单任务直接调 API 即可。',
        },
        {
          t: 'MCP 用来替代 TLS/HTTPS 加密传输层，保障网络安全',
          ok: false,
          why: 'MCP 是应用层工具协议；传输加密仍靠 TLS。',
        },
        {
          t: '只有 RAG 向量库才能做 MCP 服务器，其他工具不能',
          ok: false,
          why: '可暴露文件、DB、API 等各类工具。',
        },
      ],
      relatedNodes: ['ai-mcp', 'ai-tool-calling'],
    },
    {
      id: 'interview-ai-stack:q4',
      q: '「上下文工程」相对「只在 prompt 里堆长文字」，开口时应怎么说？',
      choices: [
        {
          t: '系统化管理检索片段、记忆、工具结果如何进入有限上下文窗口',
          ok: true,
          why: '窗口有限，要设计召回、摘要、优先级，不是无脑堆字。',
        },
        {
          t: '上下文窗口越大就越不需要工程设计，全部原文塞进去即可',
          ok: false,
          why: '大窗口仍有限且贵；无脑塞全文会稀释关键信息。',
        },
        {
          t: '上下文工程就是删掉全部 system 提示，只留 user 消息',
          ok: false,
          why: 'System 提示定边界；上下文工程是策略性组装。',
        },
        {
          t: '上下文工程等于 finetune，必须改模型权重才算工程',
          ok: false,
          why: '发生在推理期 prompt 组装；微调是训练期改权重。',
        },
      ],
      relatedNodes: ['ai-rag-shift', 'ai-token-context'],
    },
    {
      id: 'interview-ai-stack:q5',
      q: 'Agent 调用外部工具返回不可信结果时，开口应强调哪些安全做法？',
      choices: [
        {
          t: '校验输出、沙箱执行、最小权限、关键路径保留人工确认',
          ok: true,
          why: '工具可能被注入或返回恶意数据，不能盲执行。',
        },
        {
          t: '模型选的 tool call 应全部无检查直接执行，信任 LLM 判断',
          ok: false,
          why: 'LLM 可能幻觉错误参数；执行层必须校验与限权。',
        },
        {
          t: '为了安全应关闭所有日志，避免工具调用被审计追踪',
          ok: false,
          why: '应结构化日志 + 脱敏，不是关闭审计。',
        },
        {
          t: '不可信工具结果应原样拼进 prompt 且自动触发 shell 执行',
          ok: false,
          why: '不可信内容进 prompt 可能注入；更不应自动执行 shell。',
        },
      ],
      relatedNodes: ['ai-tool-calling', 'ai-prompt-security', 'craft-security'],
    },
  ],
});
