import { defineQuizSet } from '../schema.js';

/** 计算段：Token / 注意力 / Transformer / 适配 / Chat 接口（Embedding 细节见 concept-ai-rag） */
export default defineQuizSet({
  id: 'concept-ai-llm',
  title: '概念 · 大模型基础（Token / 注意力 / 适配）',
  kind: 'concept',
  domain: 'ai',
  tags: ['Token', 'Transformer', '微调'],
  relatedNodes: [
    'ai-token-context',
    'ai-attention',
    'ai-transformer',
    'ai-adaptation',
    'ai-finetune',
    'ai-openai-protocol',
  ],
  caption: '窗口与结构 → 改参 vs 改提示 → 会话接口；检索同模型见 RAG 包。',
  questions: [
    {
      id: 'concept-ai-llm:q1',
      q: '在大语言模型（LLM）语境里，Token 更准确指的是什么？',
      choices: [
        {
          t: '模型处理文本的离散单元，常常比自然语言里的「一个词」更短',
          ok: true,
          why: '英文常按子词切分；中文也可能一字或多字成 token，计费与窗口都按 token 算。',
        },
        {
          t: 'HTTP 请求头里携带的 Bearer 身份凭证',
          ok: false,
          why: '那是鉴权令牌；LLM token 是文本编码后的片段单位。',
        },
        {
          t: 'Embedding 向量在向量库里的存储行',
          ok: false,
          why: '向量库存的是连续数值向量；token 是离散文本切分结果。',
        },
        {
          t: '一次 API 调用允许的最大并发连接数',
          ok: false,
          why: '并发配额是限流策略；token 衡量文本长度与模型输入粒度。',
        },
      ],
      relatedNodes: ['ai-token-context'],
    },
    {
      id: 'concept-ai-llm:q2',
      q: '说大模型有「上下文窗口限制」，对新手最准确的理解是什么？',
      choices: [
        {
          t: '一次请求里模型能「看见」的 token 总数有上限，超出需截断或摘要',
          ok: true,
          why: '窗口限制的是注意力能覆盖的长度，不是硬盘容量。',
        },
        {
          t: '窗口指模型权重文件在磁盘上的最大体积',
          ok: false,
          why: '权重体积与单次推理能处理的 token 序列长度是两回事。',
        },
        {
          t: '只要用流式输出（stream），窗口限制就自动消失',
          ok: false,
          why: '流式只改变返回方式；输入仍受同一 token 上限约束。',
        },
        {
          t: '上下文窗口只限制 system 角色消息，user 消息不受限',
          ok: false,
          why: 'system、user、assistant 等角色内容都计入窗口预算。',
        },
      ],
      relatedNodes: ['ai-token-context'],
    },
    {
      id: 'concept-ai-llm:q3',
      q: 'Transformer 里的「自注意力」机制主要解决什么问题？',
      choices: [
        {
          t: '让序列中每个位置动态权衡其他位置的相关性，决定当前步「该看哪里」',
          ok: true,
          why: '相关性权重随输入变化，是 Transformer 处理长依赖的核心。',
        },
        {
          t: '保证模型输出与训练数据逐字一致，从而消除幻觉',
          ok: false,
          why: 'Attention 是计算结构，不自带事实校验能力。',
        },
        {
          t: '把上下文窗口从 4K 自动扩到无限长',
          ok: false,
          why: '窗口上限由架构与推理成本决定；Attention 在窗口内分配权重。',
        },
        {
          t: '在推理前把 prompt 压缩成 ZIP 以节省带宽',
          ok: false,
          why: 'Attention 是神经网络层内的矩阵运算，不是传输层压缩。',
        },
      ],
      relatedNodes: ['ai-attention', 'ai-transformer'],
    },
    {
      id: 'concept-ai-llm:q4',
      q: '现代大语言模型的 Transformer 骨干，通常由什么堆叠而成？',
      choices: [
        {
          t: '多层注意力块（Attention）与前馈网络（FFN）等模块交替堆叠',
          ok: true,
          why: 'Encoder/Decoder 变体都以 attention + FFN 块为核心重复堆叠。',
        },
        {
          t: '手工编写的 if-else 规则树，层数越多回答越准',
          ok: false,
          why: 'LLM 靠可学习权重拟合分布，不是固定规则引擎。',
        },
        {
          t: '仅一层全连接网络，没有序列间的交互计算',
          ok: false,
          why: '缺少 Attention 就无法在序列位置间动态传递信息。',
        },
        {
          t: '与微调（finetune）同一概念，都指继续训练权重',
          ok: false,
          why: 'Transformer 是网络架构；微调是在该架构上更新参数的训练步骤。',
        },
      ],
      relatedNodes: ['ai-transformer'],
    },
    {
      id: 'concept-ai-llm:q5',
      q: '微调（finetune）相对「只改提示词（prompt）」的核心区别是什么？',
      choices: [
        {
          t: '微调会更新模型参数；提示词只在推理时改输入，不改权重',
          ok: true,
          why: '微调需要训练数据与算力；提示词/ICL 是推理期引导。',
        },
        {
          t: '微调与改提示词完全等价，只是部署位置不同',
          ok: false,
          why: '微调持久改变 checkpoint；提示词仅影响当次或会话级推理。',
        },
        {
          t: '提示词可以永久写入权重，效果与全量 finetune 相同',
          ok: false,
          why: 'Prompt 不触发梯度更新；只有训练阶段才改权重。',
        },
        {
          t: '微调不需要任何标注数据，空跑几个 epoch 即可',
          ok: false,
          why: '微调依赖示范或标注样本；无数据无法有意义地更新参数。',
        },
      ],
      relatedNodes: ['ai-finetune', 'ai-adaptation'],
    },
    {
      id: 'concept-ai-llm:q6',
      q: 'OpenAI 风格的 Chat Completions 接口，典型请求体应包含什么？',
      choices: [
        {
          t: '带 role 的 messages 数组（如 system/user/assistant），模型续写 assistant 内容',
          ok: true,
          why: '多轮对话用角色序列表达上下文；与单次 completion 字符串不同。',
        },
        {
          t: '只需传 model 名称，服务端自动读取本地聊天记录文件',
          ok: false,
          why: '对话内容须由客户端在 messages 里显式提供。',
        },
        {
          t: '必须改用 GET 查询参数传整段 prompt，POST body 留空',
          ok: false,
          why: '主流实现用 POST JSON；长 prompt 不适合全放 URL。',
        },
        {
          t: '禁止传 system 角色，否则接口返回 400',
          ok: false,
          why: '常见形态正是 system 定边界 + user 提问 + assistant 历史。',
        },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-chat-era'],
    },
    {
      id: 'concept-ai-llm:q7',
      q: '「上下文学习 / 少样本（ICL）」的核心做法是什么？',
      choices: [
        {
          t: '在 prompt 里放入示例与说明，推理期引导行为，不更新模型权重',
          ok: true,
          why: '靠上下文里的示范对齐输出格式与任务，零训练成本。',
        },
        {
          t: '先对基座做一轮全参数训练，再在 prompt 里写示例',
          ok: false,
          why: 'ICL 的定义就是推理期示范；训练改权重属于微调范畴。',
        },
        {
          t: '删除全部参考文档，让模型只靠预训练记忆回答',
          ok: false,
          why: 'ICL 恰恰依赖 prompt 内的示例与任务说明。',
        },
        {
          t: '把示例存进向量库，每次查询时自动 finetune 一层',
          ok: false,
          why: '向量检索是 RAG 路径；ICL 直接把示例写进 messages。',
        },
      ],
      relatedNodes: ['ai-adaptation', 'ai-finetune'],
    },
    {
      id: 'concept-ai-llm:q8',
      q: '推理时调高 temperature，对生成结果最典型的影响是什么？',
      choices: [
        {
          t: '采样更随机、措辞更多样，但一致性与可复现性下降',
          ok: true,
          why: 'Temperature 缩放 logits；越高越偏探索，越低越偏贪心。',
        },
        {
          t: '等价于扩大上下文窗口，能塞入更多检索片段',
          ok: false,
          why: '窗口由模型与请求配置决定，与 temperature 无关。',
        },
        {
          t: '自动提高回答的事实准确率，减少幻觉',
          ok: false,
          why: '高 temperature 往往增加发散，不保证更真。',
        },
        {
          t: '只影响 API 计费单价，不改变 token 分布',
          ok: false,
          why: '计费按 token 计；temperature 改变各 token 被选中的概率。',
        },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-adaptation'],
    },
    {
      id: 'concept-ai-llm:q9',
      q: 'Chat 接口里 system 角色消息，工程上通常承担什么职责？',
      choices: [
        {
          t: '设定助手边界、语气与任务规则，在多轮 user 消息之前生效',
          ok: true,
          why: 'System 定「怎么答」；user 提具体问题；assistant 是模型输出。',
        },
        {
          t: '存放向量库检索到的文档片段，替代 RAG 管道',
          ok: false,
          why: '检索证据通常进 user 或 tool 结果；system 是策略性指令层。',
        },
        {
          t: '必须每轮重复粘贴，否则模型会忘记上一轮 user 内容',
          ok: false,
          why: '多轮历史由 messages 数组保留；system 一般只在开头设一次。',
        },
        {
          t: '仅用于记录 API Key，与模型行为无关',
          ok: false,
          why: '鉴权在 HTTP 头；system 内容是模型可见的提示的一部分。',
        },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-token-context'],
    },
    {
      id: 'concept-ai-llm:q10',
      q: '「预训练」与「推理（inference）」在 LLM 生命周期里如何区分？',
      choices: [
        {
          t: '预训练用海量语料更新权重学通用能力；推理固定权重，按 prompt 生成输出',
          ok: true,
          why: '训练耗算力写 checkpoint；上线后多数应用只做前向推理。',
        },
        {
          t: '预训练只在用户提问时发生，推理在出厂前完成',
          ok: false,
          why: '时间顺序相反：先预训练基座，再对外提供推理 API。',
        },
        {
          t: '推理阶段会继续反向传播更新全部参数',
          ok: false,
          why: '标准推理不做梯度更新；持续改权重属于训练或微调。',
        },
        {
          t: '预训练与推理必须使用不同的模型架构，不能共用 Transformer',
          ok: false,
          why: '同一套权重先训练后推理；架构一致。',
        },
      ],
      relatedNodes: ['ai-transformer', 'ai-finetune'],
    },
  ],
});
