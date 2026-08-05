import { defineQuizSet } from '../schema.js';

/**
 * AI 工程桥：对话产品化、模型类型、HTTP/.env、MCP 挂载、提示安全、排障。
 * 命题：mcq-expert。
 */
export default defineQuizSet({
  id: 'concept-ai-ops-bridge',
  title: '概念 · AI 工程桥（对话·类型·HTTP·.env·MCP 挂载）',
  kind: 'concept',
  domain: 'ai',
  tags: ['工程桥', 'HTTP', '对话', 'MCP'],
  relatedNodes: [
    'ai-chat-era',
    'ai-model-types',
    'ai-openai-protocol',
    'ai-prompt-security',
    'xrk-mcp-ops',
  ],
  caption: '把模型 API 接到真实环境：产品形态、类型选型、HTTPS/.env、挂载与排障。',
  questions: [
    {
      id: 'concept-ai-ops-bridge:q1',
      q: '「对话产品化」（Chat 形态）相对「裸补全脚本」多了什么？',
      choices: [
        {
          t: '多轮会话心智、系统角色、安全与产品封装',
          ok: true,
          why: 'ChatGPT 时刻本质是产品形态变化，不只是模型更大。',
        },
        {
          t: '换了一套完全不同的物理定律',
          ok: false,
          why: '底层仍是神经网络推理。',
        },
        {
          t: '从此不再需要 HTTP API',
          ok: false,
          why: '云端对话恰恰拉动了可编程会话 API。',
        },
        {
          t: '等于完成了全部 RAG 工程',
          ok: false,
          why: '对话入口 ≠ 检索增强流水线。',
        },
      ],
      relatedNodes: ['ai-chat-era', 'ai-openai-protocol'],
      tags: ['对话产品'],
    },
    {
      id: 'concept-ai-ops-bridge:q2',
      q: '选型时把「聊天模型」和「嵌入模型」当成同一个会怎样？',
      choices: [
        {
          t: '检索空间与生成能力错配',
          ok: true,
          why: '按任务切开：生成 vs embedding。',
        },
        {
          t: '完全无影响，因为名字都叫模型',
          ok: false,
          why: '任务形态不同，混用会建错索引或答非所问。',
        },
        {
          t: '只要维度数字相同就永远可互换',
          ok: false,
          why: '维度相同 ≠ 同一嵌入空间，更不等于聊天模型。',
        },
        {
          t: '嵌入模型专门负责工具调用',
          ok: false,
          why: '工具调用是对话/指令模型 + 运行时的事。',
        },
      ],
      relatedNodes: ['ai-model-types', 'ai-embedding'],
      tags: ['模型类型'],
    },
    {
      id: 'concept-ai-ops-bridge:q3',
      q: 'Chat Completions 里 temperature 的产品侧直觉是？',
      choices: [
        {
          t: '采样随机性旋钮：偏高更发散，偏低更稳；不替代检索证据或权限边界',
          ok: true,
          why: '调采样解决风格/探索；事实性靠证据与约束。',
        },
        {
          t: 'temperature=0 可保证零幻觉且永不需要 RAG',
          ok: false,
          why: '低随机仍可能胡说；私有知识仍要外挂证据。',
        },
        {
          t: 'temperature 等于 HTTP 状态码',
          ok: false,
          why: '采样参数，与状态码无关。',
        },
        {
          t: '只有嵌入模型才有 temperature',
          ok: false,
          why: '常见于生成/聊天接口。',
        },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-chat-era'],
      tags: ['采样'],
    },
    {
      id: 'concept-ai-ops-bridge:q4',
      q: '流式（streaming）返回相对一次性 JSON，对前端/运维的主要差别？',
      choices: [
        {
          t: '按块推送 token，首字更快、要处理半包与取消',
          ok: true,
          why: '要看 SSE/chunk 边界，不能只等最终 body。',
        },
        {
          t: '流式会自动加密 API Key，明文 HTTP 也安全',
          ok: false,
          why: '传输安全靠 TLS。',
        },
        {
          t: '流式禁止使用 system 角色',
          ok: false,
          why: '角色序列与是否流式正交。',
        },
        {
          t: '流式等于微调已完成',
          ok: false,
          why: '只是响应传输形态。',
        },
      ],
      relatedNodes: ['ai-openai-protocol', 'http-web'],
      tags: ['流式'],
    },
    {
      id: 'concept-ai-ops-bridge:q5',
      q: '调云端 LLM API 时，HTTP 在协议栈上的位置直觉是？',
      choices: [
        {
          t: '应用层协议，常跑在 TCP',
          ok: true,
          why: 'IP 寻址 → TCP → HTTPS 交换资源。',
        },
        {
          t: 'HTTP 就是网线的物理规格',
          ok: false,
          why: '物理/链路在更下层。',
        },
        {
          t: 'HTTP 只能传 HTML，不能传 JSON',
          ok: false,
          why: 'API 常用 JSON。',
        },
        {
          t: '有了 HTTP 就不需要 DNS',
          ok: false,
          why: '域名仍常先经 DNS 变成 IP。',
        },
      ],
      relatedNodes: ['http-web', 'dns-https', 'ai-openai-protocol'],
      tags: ['HTTP'],
    },
    {
      id: 'concept-ai-ops-bridge:q6a',
      q: '调模型 API 收到 401 Unauthorized，优先怀疑什么？',
      choices: [
        {
          t: '密钥缺失、过期或鉴权头写错',
          ok: true,
          why: '先查凭证与 Authorization，而不是先改提示词。',
        },
        {
          t: '模型参数量不够',
          ok: false,
          why: '与参数量无关。',
        },
        {
          t: '限流/配额耗尽',
          ok: false,
          why: '那更常是 429。',
        },
        {
          t: 'DNS 解析失败',
          ok: false,
          why: 'DNS 问题通常连不上，不是 401。',
        },
      ],
      relatedNodes: ['http-web', 'ai-openai-protocol', 'data-env'],
      tags: ['HTTP状态码'],
    },
    {
      id: 'concept-ai-ops-bridge:q6b',
      q: '调模型 API 收到 429 Too Many Requests，优先做什么？',
      choices: [
        {
          t: '按配额与 Retry-After 退避重试，降低并发',
          ok: true,
          why: '限流信号；硬刚会更糟。',
        },
        {
          t: '立刻把 temperature 调到 2.0',
          ok: false,
          why: '采样不解决配额。',
        },
        {
          t: '把密钥写进 URL 查询串绕过限流',
          ok: false,
          why: '危险且通常无效。',
        },
        {
          t: '视为创建成功（等同 201）',
          ok: false,
          why: '429 是限流。',
        },
      ],
      relatedNodes: ['http-web', 'ai-openai-protocol', 'craft-observability'],
      tags: ['HTTP状态码'],
    },
    {
      id: 'concept-ai-ops-bridge:q7',
      q: 'HTTPS 相对 HTTP，对调用云端 LLM 为什么几乎是默认？',
      choices: [
        {
          t: 'TLS 加密与身份校验',
          ok: true,
          why: 'API Key 场景更必须 HTTPS。',
        },
        {
          t: 'HTTPS 能让模型更聪明',
          ok: false,
          why: '只改传输安全。',
        },
        {
          t: 'HTTPS 禁止使用 JSON',
          ok: false,
          why: 'TLS 不限制 body 格式。',
        },
        {
          t: '内网调试也永远禁止任何明文 HTTP',
          ok: false,
          why: '本机/受控环境可有例外；公网云 API 默认 HTTPS。',
        },
      ],
      relatedNodes: ['dns-https', 'http-web', 'craft-security'],
      tags: ['HTTPS'],
    },
    {
      id: 'concept-ai-ops-bridge:q8',
      q: '.env 与「可提交的配置模板」应如何分工？',
      choices: [
        {
          t: '.env 放本机密钥与机器差且勿提交',
          ok: true,
          why: '密钥进仓库是事故；模板帮助同事知道要设哪些键。',
        },
        {
          t: '把真实 API Key 写进 Git 方便协作',
          ok: false,
          why: '泄露面极大。',
        },
        {
          t: '所有业务逻辑都必须只靠 .env，禁止 yaml',
          ok: false,
          why: '本仓还有配置归属与三同步。',
        },
        {
          t: '环境变量不能被 Node 读取',
          ok: false,
          why: 'process.env 正是读取入口。',
        },
      ],
      relatedNodes: ['data-env', 'xrk-config', 'craft-security'],
      tags: ['.env'],
    },
    {
      id: 'concept-ai-ops-bridge:q9',
      q: '本仓「MCP 挂载」课相对「MCP 概念」课，侧重点差在哪？',
      choices: [
        {
          t: '概念课讲协议与工具发现',
          ok: true,
          why: '懂协议 ≠ 会在本仓运维出口。',
        },
        {
          t: '挂载课会重写 Transformer 公式',
          ok: false,
          why: '与注意力公式无关。',
        },
        {
          t: '有概念课就不必再管鉴权',
          ok: false,
          why: '运维挂载必须谈边界。',
        },
        {
          t: 'MCP 挂载等于关闭所有 HTTP',
          ok: false,
          why: '远程 MCP 常仍走网络出口。',
        },
      ],
      relatedNodes: ['xrk-mcp-ops', 'ai-mcp'],
      tags: ['MCP'],
    },
    {
      id: 'concept-ai-ops-bridge:q10',
      q: '提示安全里，「间接注入」指什么？',
      choices: [
        {
          t: '恶意指令藏在日后被检索到的文档/网页里',
          ok: true,
          why: '检索正文必须当不可信数据。',
        },
        {
          t: '只会发生在 UDP 传输上',
          ok: false,
          why: '是内容信任边界问题。',
        },
        {
          t: '只要用了向量库就不会注入',
          ok: false,
          why: '向量库正是间接注入常见入口之一。',
        },
        {
          t: '可用更大 temperature 消除',
          ok: false,
          why: '采样温度不是信任边界。',
        },
      ],
      relatedNodes: ['ai-prompt-security', 'ai-rag', 'craft-security'],
      tags: ['提示安全'],
    },
    {
      id: 'concept-ai-ops-bridge:q10b',
      q: '用户在输入框里粘贴「忽略以上规则」类指令，属于哪类风险？',
      choices: [
        {
          t: '直接提示注入：不可信用户正文试图覆盖系统规则',
          ok: true,
          why: '要把用户内容与系统规则隔离，并限制工具副作用。',
        },
        {
          t: '间接注入：只存在于向量库文档',
          ok: false,
          why: '本题是用户框直接输入。',
        },
        {
          t: '纯传输层问题，改 HTTPS 即可',
          ok: false,
          why: '内容信任边界，不是 TLS。',
        },
        {
          t: '说明 temperature 太低',
          ok: false,
          why: '与采样无关。',
        },
      ],
      relatedNodes: ['ai-prompt-security', 'ai-rules'],
      tags: ['提示安全'],
    },
    {
      id: 'concept-ai-ops-bridge:q11',
      q: '调不通的 LLM 请求，较合理的第一刀是？',
      choices: [
        {
          t: '先分清：DNS/TLS/代理 → HTTP 状态 → 再动模型参数',
          ok: true,
          why: '自外向内分层：连不上就别先改 temperature。',
        },
        {
          t: '先把 temperature 调到 2.0，看会不会突然通',
          ok: false,
          why: '连不上时调采样无意义。',
        },
        {
          t: '先删掉全部向量库再重嵌，不管请求是否发出',
          ok: false,
          why: '请求都发不出去时与检索无关。',
        },
        {
          t: '先改 system prompt 文案，跳过网络与鉴权检查',
          ok: false,
          why: '通达性/鉴权未通时改提示无济于事。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'http-web', 'data-env'],
      tags: ['排障'],
    },
    {
      id: 'concept-ai-ops-bridge:q12',
      q: 'Coding Agent / CLI 调外网模型 API 失败，但浏览器能开网页。更靠谱的处理是？',
      choices: [
        {
          t: '为进程显式设 HTTP_PROXY',
          ok: true,
          why: '许多 CLI 不读系统代理。',
        },
        {
          t: '只要开了系统代理，所有进程必然走代理',
          ok: false,
          why: 'CLI/Agent 常要环境变量。',
        },
        {
          t: '把代理端口写进业务仓库当默认密钥',
          ok: false,
          why: '环境相关且易泄密。',
        },
        {
          t: '关掉本机防火墙就等于配好了代理',
          ok: false,
          why: '防火墙≠出站代理策略。',
        },
      ],
      relatedNodes: ['clash', 'data-env', 'ai-cli'],
      tags: ['代理'],
    },
  ],
});
