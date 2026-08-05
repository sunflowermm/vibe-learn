import { defineQuizSet } from '../schema.js';

/**
 * 大厂 · Agent / 工具 / 安全开口
 */
export default defineQuizSet({
  id: 'interview-ai-stack',
  title: '大厂 · Agent / 工具 / 安全',
  kind: 'interview',
  domain: 'ai',
  tags: ['AI', 'Agent', 'MCP', '安全', '一面'],
  relatedNodes: ['ai-tool-calling', 'ai-mcp', 'ai-prompt-security'],
  caption: '工具闭环 · 注入隔离 · 权限与编排克制。',
  questions: [
    {
      id: 'interview-ai-stack:tool',
      q: '模型说「该查一下库存」，但系统没有任何查库动作。缺的是？',
      choices: [
        {
          t: '工具调用闭环：执行查库并把结果回灌给模型再答',
          ok: true,
          why: '提议 → 执行 → 回灌；光靠提示不够。',
        },
        {
          t: '在提示里把「去查库」重复十遍即可自动执行',
          ok: false,
          why: '没有执行器，重复提示也无效。',
        },
        {
          t: '只要有 Chat 对话能力，就不再需要工具编排',
          ok: false,
          why: '多步动作与副作用要靠工具与编排。',
        },
        {
          t: '把用户原文直接当作系统规则，让它自己授权查库',
          ok: false,
          why: '扩大提示注入面，也不等于有执行器。',
        },
      ],
      relatedNodes: ['ai-tool-calling', 'ai-agent-birth'],
    },
    {
      id: 'interview-ai-stack:inject',
      q: '不可信用户输入可能诱导模型触发危险工具副作用。优先？',
      choices: [
        {
          t: '隔离系统规则与用户内容，并对工具做最小权限 ACL',
          ok: true,
          why: '边界 + 权限，是提示注入的基本防线。',
        },
        {
          t: '代理步数不设上限，让它自己试到成功为止',
          ok: false,
          why: '空转烧钱，还可能反复尝试危险动作。',
        },
        {
          t: '允许用户消息覆盖系统规则，以「更听话」',
          ok: false,
          why: '典型注入面。',
        },
        {
          t: '只关掉审计日志，就算完成了安全加固',
          ok: false,
          why: '关日志不替代 ACL，还失去追责。',
        },
      ],
      relatedNodes: ['ai-prompt-security', 'ai-agent-planning'],
    },
    {
      id: 'interview-ai-stack:mcp',
      q: '给 Agent 挂 MCP / 工具时，工程底线是？',
      choices: [
        {
          t: '最小权限、默拒越权，并且可审计（谁在何时调了什么）',
          ok: true,
          why: '工具等于远程代码能力的延伸。',
        },
        {
          t: '默认对会话开放全部工具，方便演示',
          ok: false,
          why: '攻击面过大。',
        },
        {
          t: '用户口头说「提权」就可以临时放开生产写权限',
          ok: false,
          why: '注入可伪造提权话术。',
        },
        {
          t: '不记工具调用日志更安全，少留痕迹',
          ok: false,
          why: '失去审计与排障能力。',
        },
      ],
      relatedNodes: ['ai-mcp', 'ai-tool-calling'],
    },
    {
      id: 'interview-ai-stack:rules',
      q: '防止 Agent 越权改生产时，rules 与 skills 怎么分工？',
      choices: [
        {
          t: 'rules 当硬护栏/红线；skills 讲可操作流程与手册',
          ok: true,
          why: '红线与手册分离，避免一锅粥。',
        },
        {
          t: '规则写得越长越好，可以完全不要 skills 手册',
          ok: false,
          why: '关键约束会被淹没，流程也难复用。',
        },
        {
          t: '把规则与技能混成无结构的一大段系统提示',
          ok: false,
          why: '难维护、难审计。',
        },
        {
          t: '一律先全参微调，用模型权重替代规则与技能文件',
          ok: false,
          why: '不是防越权的第一步。',
        },
      ],
      relatedNodes: ['ai-rules', 'ai-skills'],
    },
    {
      id: 'interview-ai-stack:agent',
      q: '单次问答加工具链就能搞定，还要不要上多智能体？',
      choices: [
        {
          t: '通常不必；先把单链工具闭环做稳，再谈多智能体',
          ok: true,
          why: '编排有成本与失败面。',
        },
        {
          t: '智能体数量越多越好，能力会自动线性叠加',
          ok: false,
          why: '协调成本与失败面上升。',
        },
        {
          t: '没有工具执行器，多智能体也能直接改库存',
          ok: false,
          why: '缺执行闭环。',
        },
        {
          t: '必须先全参微调，再讨论要不要 Agent',
          ok: false,
          why: '多数场景先检索与工具即可。',
        },
      ],
      relatedNodes: ['ai-agent-birth', 'ai-agent-planning'],
    },
    {
      id: 'interview-ai-stack:role',
      q: '系统约束与用户输入，在消息角色上应如何处理？',
      choices: [
        {
          t: '系统约束放 system（或等价层），与用户内容严格分开',
          ok: true,
          why: '降低注入与角色混淆。',
        },
        {
          t: '全部塞进同一条 user 消息，靠模型自己分辨',
          ok: false,
          why: '易被用户内容覆盖或混淆。',
        },
        {
          t: '把不可信用户内容写进 system，当作更高优先级',
          ok: false,
          why: '扩大注入面。',
        },
        {
          t: '取消 system，只保留 tool 消息就够了',
          ok: false,
          why: '仍需要稳定的系统级约束。',
        },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-prompt-security'],
    },
    {
      id: 'interview-ai-stack:stream',
      q: '聊天产品要边生成边显示，接口侧常见做法？',
      choices: [
        {
          t: '流式输出（chunk / SSE 等），降低首字延迟',
          ok: true,
          why: '体感关键；与是否 UDP 无关。',
        },
        {
          t: '必须同步一次返回完整答案，禁止分片',
          ok: false,
          why: '首字延迟高，体感更慢。',
        },
        {
          t: '改成 UDP 传输才会出现流式效果',
          ok: false,
          why: '流式是应用协议能力，不是换 UDP。',
        },
        {
          t: '关掉 token 计数就能自动获得流式',
          ok: false,
          why: '计数与流式是不同机制。',
        },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-chat-era'],
    },
    {
      id: 'interview-ai-stack:loop',
      q: 'Agent 空转烧 token / 烧钱，工程上先加什么？',
      choices: [
        {
          t: '步数、时间与费用预算硬上限，并记录中断原因',
          ok: true,
          why: '防无限循环是底线。',
        },
        {
          t: '取消全部超时，让它有足够时间「想明白」',
          ok: false,
          why: '更易空转。',
        },
        {
          t: '默认开放写入生产的工具，方便它「自己修」',
          ok: false,
          why: '风险更大。',
        },
        {
          t: '禁止一切日志，减少开销',
          ok: false,
          why: '更难发现空转与排障。',
        },
      ],
      relatedNodes: ['ai-agent-planning', 'ai-prompt-security'],
    },
    {
      id: 'interview-ai-stack:memory',
      q: '多轮助手要记住用户偏好，更稳妥的做法？',
      choices: [
        {
          t: '结构化记忆写入，并按需检索；可过期、可审计',
          ok: true,
          why: '可控；避免整段历史永不截断。',
        },
        {
          t: '把整段对话历史永不截断地塞进每次请求',
          ok: false,
          why: '易爆窗、贵且噪音大。',
        },
        {
          t: '把 API 密钥也写进长期记忆方便下次调用',
          ok: false,
          why: '泄密；密钥走密钥管理。',
        },
        {
          t: '禁止任何记忆机制，每轮都当陌生人',
          ok: false,
          why: '无法跨轮提供个性化，体验差。',
        },
      ],
      relatedNodes: ['ai-agent-memory', 'ai-token-context'],
    },
    {
      id: 'interview-ai-stack:demo',
      q: '演示环境的 Agent 误改了生产数据，根因常是？',
      choices: [
        {
          t: '工具/凭据指向了生产，环境隔离失败',
          ok: true,
          why: '演示应用生产密钥或生产 MCP 是高频事故。',
        },
        {
          t: '温度设置过低，模型太「听话」',
          ok: false,
          why: '与写库目标环境无关。',
        },
        {
          t: 'RAG 分块略大了一点',
          ok: false,
          why: '非误改生产的主因。',
        },
        {
          t: '接口用了流式输出',
          ok: false,
          why: '流式与是否打到生产库无关。',
        },
      ],
      relatedNodes: ['ai-mcp', 'ai-prompt-security', 'ai-tool-calling'],
    },
  ],
});
