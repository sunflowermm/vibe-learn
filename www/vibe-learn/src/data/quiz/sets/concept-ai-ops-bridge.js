import { defineQuizSet } from '../schema.js';

/**
 * AI 章工程桥：对话产品化、模型类型、调 API 的 HTTP/.env、MCP 挂载、提示安全、分层排障。
 * 不写 RAG 分块/混合/评测、Rules/Skills、子代理、记忆——那些在 concept-ai-rag / agent-stack。
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
          t: '多轮会话心智、系统角色、安全与产品封装，把模型做成可天天打开的入口',
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
          t: '检索空间与生成能力错配：嵌入要向量近邻，聊天要生成；接口与计费也常分开',
          ok: true,
          why: '按任务切开：生成 vs embedding，混用会建错索引或答非所问。',
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
      q: 'Chat Completions 里常见的 temperature，产品侧直觉？',
      choices: [
        {
          t: '采样随机性旋钮：偏高更发散，偏低更稳；不替代检索证据或权限边界',
          ok: true,
          why: '调采样解决「风格/探索」；事实性靠证据与约束，不是把温度拧到 0 就万能。',
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
          why: '常见于生成/聊天接口；嵌入接口通常不谈采样温度。',
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
          t: '按块推送 token，首字更快、要处理半包与取消；失败也可能已吐出半截',
          ok: true,
          why: '体验与排障：要看 SSE/chunk 边界，不能只等最终 body。',
        },
        {
          t: '流式会自动加密 API Key，明文 HTTP 也安全',
          ok: false,
          why: '传输安全靠 TLS，与是否流式无关。',
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
      q: 'HTTP 在网络里大致处于哪一层？和调 LLM API 有何关系？',
      choices: [
        {
          t: '应用层协议，常跑在 TCP 之上；云端 Chat/Completions、许多 MCP 远程出口都是 HTTP 请求-响应',
          ok: true,
          why: '分层：IP 寻址 → TCP 可靠传输 → HTTP 交换资源；调模型 API 正是 HTTPS 上的应用请求。',
        },
        {
          t: 'HTTP 就是网线的物理规格',
          ok: false,
          why: '物理/链路在更下层。',
        },
        {
          t: 'HTTP 只能传 HTML，不能传 JSON',
          ok: false,
          why: 'HTTP 传任意字节；API 常用 JSON。',
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
      id: 'concept-ai-ops-bridge:q6',
      q: '调模型 API 时收到 401 与 429，分别优先怀疑什么？',
      choices: [
        {
          t: '401：密钥/鉴权失败；429：限流或配额——应查凭证与重试/退避，而不是先怪提示词',
          ok: true,
          why: '4xx 多在客户端配置与配额；提示词再精也修不好坏 Key。',
        },
        {
          t: '两者都说明模型参数量不够',
          ok: false,
          why: '与参数量无关。',
        },
        {
          t: '401 表示服务器硬盘满了',
          ok: false,
          why: '那更像 5xx/存储类故障。',
        },
        {
          t: '429 表示 DNS 解析失败',
          ok: false,
          why: 'DNS 问题通常连不上或名称错误，不是 429。',
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
          t: 'TLS 加密与身份校验，降低窃听/篡改密钥与对话内容的风险',
          ok: true,
          why: '明文 HTTP 不安全；API Key 场景更必须 HTTPS。',
        },
        {
          t: 'HTTPS 能让模型更聪明',
          ok: false,
          why: '只改传输安全，不改模型能力。',
        },
        {
          t: 'HTTPS 禁止使用 JSON',
          ok: false,
          why: 'TLS 只管传输通道，不限制 body 格式。',
        },
        {
          t: '内网调试也永远禁止明文 HTTP',
          ok: false,
          why: '本机/受控环境可有例外，但公网云 API 默认 HTTPS。',
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
          t: '.env 放本机密钥与机器差且勿提交；.env.example / 文档只列键名与假值',
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
          why: '本仓还有配置归属与三同步；.env 偏密钥与环境差。',
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
          t: '概念课讲协议与工具发现；挂载课讲主服如何注册、鉴权、看日志确认已挂上',
          ok: true,
          why: '同一词两层：懂协议 ≠ 会在本仓运维出口。',
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
      q: '提示安全里，「间接注入」与「用户输入框注入」差别？',
      choices: [
        {
          t: '间接注入载荷藏在日后被检索到的文档/网页里；用户可能从未输入恶意字',
          ok: true,
          why: '检索正文必须当不可信数据。',
        },
        {
          t: '间接注入只会发生在 UDP',
          ok: false,
          why: '与传输层协议无关，是内容信任边界问题。',
        },
        {
          t: '只要用了向量库就不会注入',
          ok: false,
          why: '向量库正是间接注入的常见入口之一。',
        },
        {
          t: '间接注入可用更大 temperature 消除',
          ok: false,
          why: '采样温度不是信任边界。',
        },
      ],
      relatedNodes: ['ai-prompt-security', 'ai-rag', 'craft-security'],
      tags: ['提示安全'],
    },
    {
      id: 'concept-ai-ops-bridge:q11',
      q: '工作台「分层排障」对调不通的 LLM 请求，较合理的第一刀？',
      choices: [
        {
          t: '先分清：DNS/TLS/代理 → HTTP 状态 → 密钥与配额 → 请求体/模型名 → 业务提示，不要一上来重装系统',
          ok: true,
          why: '自外向内分层：连不上就别先改 temperature。',
        },
        {
          t: '先重装操作系统',
          ok: false,
          why: '成本最高且常无关。',
        },
        {
          t: '先删掉全部向量库',
          ok: false,
          why: '请求都发不出去时与检索无关。',
        },
        {
          t: '先把 temperature 调到 2.0',
          ok: false,
          why: '连不上时调采样无意义。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'http-web', 'data-env'],
      tags: ['排障'],
    },
  ],
});
