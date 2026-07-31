import { defineQuizSet } from '../schema.js';

/**
 * 主动补缺：AI 全栈主链上题量偏薄的课 + HTTP/.env/MCP 工程桥。
 * 参考权威入门表述（如菜鸟教程 HTTP/TCP·IP 分层直觉），落到本产品语境。
 */
export default defineQuizSet({
  id: 'concept-ai-ops-bridge',
  title: '概念 · AI 全栈补缺（对话·类型·子代理·HTTP·.env·MCP）',
  kind: 'concept',
  domain: 'ai',
  tags: ['补缺', 'AI全栈', 'HTTP', '零基础'],
  relatedNodes: [
    'ai-chat-era',
    'ai-model-types',
    'ai-subagent',
    'ai-chunking',
    'ai-hybrid-search',
    'ai-vector-store',
    'ai-rag-eval',
    'xrk-mcp-ops',
  ],
  caption: '导图薄节点与工程桥补题；专有名保留英文。',
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
      tags: ['对话产品', 'ai-chat-era'],
    },
    {
      id: 'concept-ai-ops-bridge:q2',
      q: '选型时把「聊天模型」和「嵌入模型」当成同一个会怎样？',
      choices: [
        {
          t: '检索空间与生成能力错配：嵌入要向量近邻，聊天要生成；接口与计费也常分开',
          ok: true,
          why: '类型课强调按任务切开：生成 vs embedding。',
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
      tags: ['模型类型', 'ai-model-types'],
    },
    {
      id: 'concept-ai-ops-bridge:q3',
      q: '何时更该用子代理（Subagent），而不是把一切塞进主对话？',
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
          t: '子代理能保证永不幻觉',
          ok: false,
          why: '隔离上下文 ≠ 消除幻觉。',
        },
        {
          t: '子代理用来替代操作系统进程调度',
          ok: false,
          why: '这是产品/编排概念，不是 OS 调度器。',
        },
      ],
      relatedNodes: ['ai-subagent', 'ai-agent-birth'],
      tags: ['子代理', 'ai-subagent'],
    },
    {
      id: 'concept-ai-ops-bridge:q4',
      q: '协议分层课里，「会话补全接口」和「MCP」更像哪一层关系？',
      choices: [
        {
          t: '前者是对话消息插头；后者是工具/资源的标准插座——都在应用侧，但解决不同问题',
          ok: true,
          why: '分层：先能会话，再标准地接工具。',
        },
        {
          t: '两者是同一协议的两个别名',
          ok: false,
          why: 'Chat Completions ≠ MCP。',
        },
        {
          t: 'MCP 替代了 TCP',
          ok: false,
          why: 'MCP 在应用层语义；传输仍常走 HTTP/stdio 等。',
        },
        {
          t: '有了 MCP 就不必再鉴权',
          ok: false,
          why: '工具面更需要权限与边界。',
        },
      ],
      relatedNodes: ['ai-protocol-forks', 'ai-mcp', 'ai-openai-protocol'],
      tags: ['协议', 'ai-protocol-forks'],
    },
    {
      id: 'concept-ai-ops-bridge:q5',
      q: '「技能（Skills）」相对「规则（Rules）」的分工？',
      choices: [
        {
          t: '规则短硬常驻护栏；技能是按需手册/流程，用时再读，避免塞爆窗口',
          ok: true,
          why: '驯服面：红线 vs 操作说明。',
        },
        {
          t: '技能必须比规则更短，否则无效',
          ok: false,
          why: '技能可以较长，但应按需加载。',
        },
        {
          t: '二者完全等价，写哪都行',
          ok: false,
          why: '常驻与按需是不同预算策略。',
        },
        {
          t: '有技能就不必工具调用',
          ok: false,
          why: '技能常指导何时/如何调工具。',
        },
      ],
      relatedNodes: ['ai-skills', 'ai-rules'],
      tags: ['技能', 'ai-skills'],
    },
    {
      id: 'concept-ai-ops-bridge:q6',
      q: '上下文工程（相对「只堆 RAG」）强调什么？',
      choices: [
        {
          t: '谁进窗、占多少、何顺序、何时摘要/丢弃——窗内一切都是可设计资源',
          ok: true,
          why: 'RAG 只是外挂证据的一种来源；窗口是总预算。',
        },
        {
          t: '上下文工程 = 必须上最大参数模型',
          ok: false,
          why: '与参数量无必然关系。',
        },
        {
          t: '永远把全部历史原文塞进每一次请求',
          ok: false,
          why: '昂贵且噪声大；要摘要与检索。',
        },
        {
          t: '禁止使用系统提示',
          ok: false,
          why: '系统层正是上下文工程的一部分。',
        },
      ],
      relatedNodes: ['ai-rag-shift', 'ai-token-context', 'ai-rag'],
      tags: ['上下文工程', 'ai-rag-shift'],
    },
    {
      id: 'concept-ai-ops-bridge:q7',
      q: '（对齐菜鸟教程直觉）HTTP 在网络里大致处于哪一层？和调 LLM API 有何关系？',
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
      tags: ['HTTP', 'http-web', '菜鸟对照'],
    },
    {
      id: 'concept-ai-ops-bridge:q8',
      q: '调模型 API 时收到 401 与 429，分别优先怀疑什么？',
      choices: [
        {
          t: '401：密钥/鉴权失败；429：限流或配额——应查凭证与重试/退避，而不是先怪提示词',
          ok: true,
          why: '状态码分层排障（菜鸟/通用 HTTP 常识）：4xx 多在客户端配置与配额。',
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
      tags: ['HTTP状态码', 'http-web'],
    },
    {
      id: 'concept-ai-ops-bridge:q9',
      q: 'HTTPS 相对 HTTP，对调用云端 LLM 为什么几乎是默认？',
      choices: [
        {
          t: 'TLS 加密与身份校验，降低窃听/篡改密钥与对话内容的风险',
          ok: true,
          why: '菜鸟教程亦强调 HTTP 明文不安全；API Key 场景更必须 HTTPS。',
        },
        {
          t: 'HTTPS 能让模型更聪明',
          ok: false,
          why: '只改传输安全，不改模型能力。',
        },
        {
          t: 'HTTPS 禁止使用 JSON',
          ok: false,
          why: '无关。',
        },
        {
          t: '内网调试也永远禁止明文 HTTP',
          ok: false,
          why: '本机/受控环境可有例外，但公网云 API 默认 HTTPS。',
        },
      ],
      relatedNodes: ['dns-https', 'http-web', 'craft-security'],
      tags: ['HTTPS', 'dns-https'],
    },
    {
      id: 'concept-ai-ops-bridge:q10',
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
      tags: ['.env', 'data-env'],
    },
    {
      id: 'concept-ai-ops-bridge:q11',
      q: '本仓「MCP 挂载」课相对第五章「MCP 概念」课，侧重点差在哪？',
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
      tags: ['MCP', 'xrk-mcp-ops'],
    },
    {
      id: 'concept-ai-ops-bridge:q12',
      q: 'HTTP/1.1、HTTP/2、HTTP/3（对照常见教程）对「调 API 延迟」的直觉差异？',
      choices: [
        {
          t: '1.1 持久连接；2 多路复用减队头阻塞；3 基于 QUIC/UDP 进一步降延迟——客户端与网关是否支持决定你能不能吃到红利',
          ok: true,
          why: '版本演进服务性能；业务代码仍是请求-响应语义。',
        },
        {
          t: '版本号越大，状态码含义完全反过来',
          ok: false,
          why: '状态码体系大体延续。',
        },
        {
          t: '只有 HTTP/3 能传 JSON',
          ok: false,
          why: '各版本都能传。',
        },
        {
          t: 'HTTP/2 废除了 Host 头的一切作用',
          ok: false,
          why: '仍有主机与路由概念（表现方式可能变化）。',
        },
      ],
      relatedNodes: ['http-web', 'net-edge-practice'],
      tags: ['HTTP版本', 'http-web'],
    },
    {
      id: 'concept-ai-ops-bridge:q13',
      q: '混合检索课里，BM25 与向量检索更像怎样互补？',
      choices: [
        {
          t: 'BM25 保专名/编号；向量保同义改写；再融合或重排进窗',
          ok: true,
          why: '生产 RAG 很少只押一侧。',
        },
        {
          t: '有了向量就应删除一切关键词索引',
          ok: false,
          why: '专名场景常翻车。',
        },
        {
          t: 'BM25 专门负责生成最终答案',
          ok: false,
          why: 'BM25 是检索，不是生成。',
        },
        {
          t: '二者必须使用不同的用户问题原文才能工作',
          ok: false,
          why: '通常同一查询并行两路。',
        },
      ],
      relatedNodes: ['ai-hybrid-search', 'ai-embedding', 'ai-rerank'],
      tags: ['混合检索', 'ai-hybrid-search'],
    },
    {
      id: 'concept-ai-ops-bridge:q14',
      q: '分块过碎最常见的工程后果？',
      choices: [
        {
          t: '片段缺语境，生成易断章取义；标识符（公司名/季度）也可能检索不到',
          ok: true,
          why: '粒度决定证据可读性。',
        },
        {
          t: '嵌入维度会自动翻倍',
          ok: false,
          why: '维度由模型决定。',
        },
        {
          t: 'TCP 三次握手会失败',
          ok: false,
          why: '与传输握手无关。',
        },
        {
          t: 'HTTPS 证书会过期',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['ai-chunking', 'ai-rag'],
      tags: ['分块', 'ai-chunking'],
    },
    {
      id: 'concept-ai-ops-bridge:q15',
      q: '向量库选型时，「过滤（租户/ACL）」为什么常和 ANN 一样重要？',
      choices: [
        {
          t: '多租户下必须先（或同时）按权限收敛候选，否则近邻再准也可能串租',
          ok: true,
          why: '安全边界在检索层；纯相似度不够。',
        },
        {
          t: '过滤只影响 UI 颜色',
          ok: false,
          why: '过滤是查询语义的一部分。',
        },
        {
          t: '有过滤就不必再评测召回',
          ok: false,
          why: '过滤会改变召回，更要测。',
        },
        {
          t: 'ACL 应只写在生成提示里',
          ok: false,
          why: '提示不可靠；应在检索拦截。',
        },
      ],
      relatedNodes: ['ai-vector-store', 'ai-prompt-security', 'ai-rag'],
      tags: ['向量库', 'ai-vector-store'],
    },
    {
      id: 'concept-ai-ops-bridge:q16',
      q: 'RAG 评测最小闭环少了哪一步就最危险？',
      choices: [
        {
          t: '没有固定问题集/可接受证据就改分块或重排——无法回归，只能凭感觉',
          ok: true,
          why: '黄金集 + 改一处杠杆 + 看指标，才是工程。',
        },
        {
          t: '使用了中文题干',
          ok: false,
          why: '语言不是问题。',
        },
        {
          t: '使用了 HTTPS',
          ok: false,
          why: '传输安全 ≠ 检索质量闭环。',
        },
        {
          t: '相关节点绑到了导图',
          ok: false,
          why: '导图绑定是学习体验，不是评测本身。',
        },
      ],
      relatedNodes: ['ai-rag-eval', 'craft-observability'],
      tags: ['评测', 'ai-rag-eval'],
    },
    {
      id: 'concept-ai-ops-bridge:q17',
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
          why: '与传输层协议无关。',
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
      tags: ['提示安全', 'ai-prompt-security'],
    },
    {
      id: 'concept-ai-ops-bridge:q18',
      q: '智能体记忆分层里，工具刚返回的长 JSON 更宜先放哪？',
      choices: [
        {
          t: '工作记忆（当前轨迹）；必要时再摘要写入长期库，而不是立刻微调进权重',
          ok: true,
          why: '窗口是工作台；抽屉是长期记忆。',
        },
        {
          t: '必须立刻全文写入基座微调',
          ok: false,
          why: '贵且难撤销。',
        },
        {
          t: '丢弃，模型会永久记住',
          ok: false,
          why: '无状态调用不会自动记。',
        },
        {
          t: '只写进 DNS 记录',
          ok: false,
          why: 'DNS 不管对话状态。',
        },
      ],
      relatedNodes: ['ai-agent-memory', 'ai-token-context'],
      tags: ['记忆', 'ai-agent-memory'],
    },
    {
      id: 'concept-ai-ops-bridge:q19',
      q: 'ReAct / 规划循环相对「单次补全」多了什么工程约束？',
      choices: [
        {
          t: '步数预算、工具白名单、超时重试与可观测轨迹——防死循环与越权',
          ok: true,
          why: '控制循环要可停、可审计。',
        },
        {
          t: '必须关闭所有日志',
          ok: false,
          why: '相反，更需要轨迹。',
        },
        {
          t: '禁止使用观察（Observe）',
          ok: false,
          why: 'Observe 是循环关键一拍。',
        },
        {
          t: '只能在没有网络时运行',
          ok: false,
          why: '工具常依赖网络。',
        },
      ],
      relatedNodes: ['ai-agent-planning', 'ai-agent-birth', 'craft-observability'],
      tags: ['规划', 'ai-agent-planning'],
    },
    {
      id: 'concept-ai-ops-bridge:q20',
      q: '工作台「分层排障」对调不通的 LLM 请求，较合理的第一刀？',
      choices: [
        {
          t: '先分清：DNS/TLS/代理 → HTTP 状态 → 密钥与配额 → 请求体/模型名 → 业务提示，不要一上来重装系统',
          ok: true,
          why: '网络课 + 环境变量课的合成：自外向内分层。',
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
      tags: ['排障', 'workbench-troubleshoot'],
    },
  ],
});
