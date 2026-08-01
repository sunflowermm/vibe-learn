import { defineQuizSet } from '../schema.js';

/**
 * 开口：Agent / MCP / 上下文工程 / 工具安全。命题：mcq-expert。
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
          t: '检索 → 增强上下文 → 大语言模型生成',
          ok: true,
          why: '先找相关片段，再塞进 prompt，最后基于增强上下文回答。',
        },
        {
          t: '必须先从零训练万亿参数底座',
          ok: false,
          why: '通常复用现有 LLM。',
        },
        {
          t: '只能用手写 if-else，不能调用大语言模型',
          ok: false,
          why: 'G 步就是 LLM 生成。',
        },
        {
          t: '微调→部署→删库',
          ok: false,
          why: '核心是检索增强。',
        },
      ],
      relatedNodes: ['ai-rag'],
    },
    {
      id: 'interview-ai-stack:q2',
      q: 'Agent 相对「单次 Chat 一问一答」，开口时应强调什么差异？',
      choices: [
        {
          t: '可多步调用工具、维护状态并循环，直到任务完成或停止',
          ok: true,
          why: '控制循环 + 工具环。',
        },
        {
          t: '一定比单次 Chat 更省 token',
          ok: false,
          why: '多步常消耗更多 token。',
        },
        {
          t: '禁止结合 RAG，两者互斥',
          ok: false,
          why: 'Agent 常把 RAG 当工具。',
        },
        {
          t: 'Agent 等于 MCP 报文格式本身',
          ok: false,
          why: 'Agent 是运行模式；MCP 是工具协议。',
        },
      ],
      relatedNodes: ['ai-agent-birth', 'ai-tool-calling'],
    },
    {
      id: 'interview-ai-stack:q3',
      q: '什么场景下值得引入 MCP？',
      choices: [
        {
          t: '需要标准化插接多种外部工具/资源，且多客户端要复用同一套服务',
          ok: true,
          why: '统一 discover/call，避免各写私有协议。',
        },
        {
          t: 'Hello World 打印也必须走 MCP',
          ok: false,
          why: '简单任务直接调 API 即可。',
        },
        {
          t: 'MCP 用来替代 TLS 加密',
          ok: false,
          why: '传输加密仍靠 TLS。',
        },
        {
          t: '只有向量库才能做 MCP 服务器',
          ok: false,
          why: '可暴露文件、DB、API 等。',
        },
      ],
      relatedNodes: ['ai-mcp', 'ai-tool-calling'],
    },
    {
      id: 'interview-ai-stack:q4',
      q: '「上下文工程」相对「只在 prompt 里堆长文字」，应怎么说？',
      choices: [
        {
          t: '系统化管理检索片段、记忆、工具结果如何进入有限上下文窗口',
          ok: true,
          why: '窗口有限，要设计召回、摘要、优先级。',
        },
        {
          t: '窗口越大就越不需要工程，全部原文塞进去即可',
          ok: false,
          why: '大窗口仍有限且贵。',
        },
        {
          t: '删掉全部 system 提示只留 user',
          ok: false,
          why: 'System 定边界。',
        },
        {
          t: '上下文工程等于 finetune',
          ok: false,
          why: '发生在推理期组装；微调是训练期。',
        },
      ],
      relatedNodes: ['ai-rag-shift', 'ai-token-context'],
    },
    {
      id: 'interview-ai-stack:q5',
      q: 'Agent 调用外部工具返回不可信结果时，应强调哪些安全做法？',
      choices: [
        {
          t: '校验输出、沙箱执行、最小权限、关键路径人工确认',
          ok: true,
          why: '不能盲执行工具结果。',
        },
        {
          t: '模型选的 tool call 全部无检查直接执行',
          ok: false,
          why: 'LLM 可能幻觉错误参数。',
        },
        {
          t: '关闭所有日志以免被审计',
          ok: false,
          why: '应结构化日志 + 脱敏。',
        },
        {
          t: '不可信结果原样拼进 prompt 并自动触发 shell',
          ok: false,
          why: '可注入且危险。',
        },
      ],
      relatedNodes: ['ai-tool-calling', 'ai-prompt-security', 'craft-security'],
    },
    {
      id: 'interview-ai-stack:q6',
      q: '模型说「该查库存」但系统没有任何查库动作，缺的是什么？',
      choices: [
        {
          t: '工具调用闭环：提议 → 执行器执行 → 结果回灌',
          ok: true,
          why: '只写「请查库」不会自动连库。',
        },
        {
          t: '再把「请查库」在提示里重复十遍',
          ok: false,
          why: '缺少执行器仍不会连库。',
        },
        {
          t: '有 Chat Completions 就不需要工具协议',
          ok: false,
          why: '多步行动依赖工具与编排。',
        },
        {
          t: '把用户原文直接当系统规则',
          ok: false,
          why: '既不安全也未形成工具闭环。',
        },
      ],
      relatedNodes: ['ai-tool-calling', 'ai-openai-protocol'],
    },
    {
      id: 'interview-ai-stack:q7',
      q: 'Rules 与 Skills 开口时怎么分工？',
      choices: [
        {
          t: 'Rules 短硬护栏；Skills 按需加载的操作细则',
          ok: true,
          why: '护栏与手册分离，避免一锅粥。',
        },
        {
          t: '规则越长越好，技能可省略',
          ok: false,
          why: '长规则易淹没关键约束。',
        },
        {
          t: '两者禁止共存',
          ok: false,
          why: '实践中常同时存在。',
        },
        {
          t: '一律先全参微调替代规则与技能',
          ok: false,
          why: '成本高，多数场景非第一步。',
        },
      ],
      relatedNodes: ['ai-rules', 'ai-skills'],
    },
    {
      id: 'interview-ai-stack:q8',
      q: '限制 Agent「想太久、调太多次」开口讲什么？',
      choices: [
        {
          t: '工具轮次预算（如 maxToolRounds）+ 超时',
          ok: true,
          why: 'ReAct 要封顶步数与墙钟，防死循环。',
        },
        {
          t: '删掉 package.json',
          ok: false,
          why: '不构成步数预算。',
        },
        {
          t: '禁止注册任何工具',
          ok: false,
          why: '需要的是可控上限，不是零工具。',
        },
        {
          t: '把密钥写进 README',
          ok: false,
          why: '泄露密钥，也不构成预算。',
        },
      ],
      relatedNodes: ['ai-agent-planning', 'ai-tool-calling'],
    },
  ],
});
