import { defineQuizSet } from '../schema.js';

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
    'ai-what',
    'ai-model-types',
    'ai-arch-beyond',
    'ai-adaptation',
    'ai-embedding',
  ],
  questions: [
    {
      q: '在大语言模型（LLM）语境里，Token 更准确指的是什么？',
      choices: [
        { t: '模型处理文本的离散单元，常常比自然语言里的「一个词」更短', ok: true, why: 'token 课：英文常按子词切分；中文也可能一字或多字成 token，计费与窗口都按 token 算。' },
        { t: 'Token 就是操作系统给每个进程分配的 PID 进程编号', ok: false, why: 'PID 是 OS 概念；LLM 里的 token 是文本编码单元，与进程 ID 无关。' },
        { t: 'Token 专指 HTTP 401/403 响应里的身份认证令牌', ok: false, why: 'HTTP Bearer Token 是鉴权凭证；LLM token 是模型输入输出的文本片段单位。' },
        { t: 'Token 等于 Embedding 向量本身，二者完全同义没有区别', ok: false, why: 'Token 是离散文本单元；Embedding 是把 token 映射成连续向量，是不同概念。' },
      ],
    },
    {
      q: '说大模型有「上下文窗口限制」，对新手最准确的理解是什么？',
      choices: [
        { t: '一次请求里模型能「看见」的 token 总数有上限，超出需截断或摘要', ok: true, why: 'token-context：窗口限制的是模型注意力能覆盖的长度，不是硬盘容量。' },
        { t: '只要硬盘够大，上下文窗口就可以无限大，与 token 数无关', ok: false, why: '窗口是模型架构与推理成本决定的 token 上限，不是存储空间。' },
        { t: '上下文窗口只限制上传图片的分辨率，与文本长度完全无关', ok: false, why: '文本对话的上下文窗口主要指 token 序列长度；多模态另有图像 token 预算。' },
        { t: '上下文窗口越大，模型回答就一定越正确，不需要任何工程设计', ok: false, why: '窗口大只表示能塞更多内容；回答质量还取决于检索、提示与工具，不是越大越对。' },
      ],
    },
    {
      q: 'Transformer 里「注意力机制（Attention）」的直觉是什么？',
      choices: [
        { t: '在序列中为每个位置计算与其他位置的相关权重，决定「看哪里」', ok: true, why: 'attention：让模型动态关注上下文里更相关的部分，是 Transformer 核心能力。' },
        { t: '注意力机制保证模型输出永远事实正确，不会产生幻觉', ok: false, why: 'Attention 是计算结构，不保证正确性；幻觉仍可能发生。' },
        { t: '注意力机制只用于 ZIP 压缩文件，与文本生成模型无关', ok: false, why: 'Attention 是神经网络结构，不是压缩算法。' },
        { t: '注意力就是增大上下文窗口，窗口越大注意力层数越少', ok: false, why: '窗口大小与 attention 计算是不同维度；大窗口不意味着少做 attention。' },
      ],
    },
    {
      q: '现代大语言模型的 Transformer 骨干，通常由什么堆叠而成？',
      choices: [
        { t: '多层注意力块（Attention）与前馈网络（FFN）等模块交替堆叠', ok: true, why: 'transformer：Encoder/Decoder 变体都以 attention + FFN 块为核心重复堆叠。' },
        { t: '单一巨型 if-else 规则树，没有可学习的神经网络参数', ok: false, why: 'LLM 是深度神经网络，不是手工规则引擎。' },
        { t: '仅由正则表达式引擎组成，通过模式匹配生成下一个 token', ok: false, why: '生成靠学习到的权重与 attention，不是 regex 规则表。' },
        { t: 'Transformer 等于微调（finetune），两者指的是同一训练步骤', ok: false, why: 'Transformer 是模型架构；微调是在预训练权重上继续训练，概念不同。' },
      ],
    },
    {
      q: '微调（finetune）相对「只改提示词（prompt）」的核心区别是什么？',
      choices: [
        { t: '微调会更新模型参数；提示词只在推理时改输入，不改权重', ok: true, why: 'finetune：需要训练数据与算力；提示词/ICL 是推理期引导，不动权重。' },
        { t: '微调与改提示词完全等价，效果与成本都一样', ok: false, why: '微调改权重、成本高；提示词零训练成本但能力边界受基座限制。' },
        { t: '微调一定不需要任何训练数据，空跑几个 epoch 即可', ok: false, why: '微调需要标注或示范数据；无数据的「微调」不成立。' },
        { t: '提示词可以永久改变模型权重，效果与 finetune 完全相同', ok: false, why: '提示词只影响当次推理输入；权重只在训练阶段（含微调）才更新。' },
      ],
    },
    {
      q: 'OpenAI 风格的「会话补全（Chat Completions）」接口，常见请求形态是什么？',
      choices: [
        { t: '传入 messages 角色序列（system/user/assistant），模型续写 assistant 内容', ok: true, why: 'openai-protocol：多轮对话用 role 序列表达；与单次 completion 字符串不同。' },
        { t: '必须上传整台云服务器的磁盘镜像文件，模型才能开始对话', ok: false, why: 'Chat API 传文本 messages JSON，不需要上传系统镜像。' },
        { t: '只能通过 U 盘拷贝本地文件到机房，不支持 HTTP JSON 调用', ok: false, why: '主流 LLM API 走 HTTPS JSON，不是物理介质拷贝。' },
        { t: 'Chat Completions 禁止传 system 角色，只能传 user 一条消息', ok: false, why: '常见形态包含 system/user/assistant 多角色序列，system 用于设定行为。' },
      ],
    },
    {
      q: '「上下文学习 / 少样本（ICL）」常见做法是什么？与微调相比有何不同？',
      choices: [
        { t: '在 prompt 里给示例与说明引导行为，推理期完成，不改模型权重', ok: true, why: 'adaptation：ICL 零训练成本低；微调才改权重、适合深度定制。' },
        { t: 'ICL 必须先重新训练万亿参数基座模型，否则无法生效', ok: false, why: 'ICL 靠 prompt 内示例引导，不需要重训基座。' },
        { t: '做 ICL 时应删除全部参考文档，模型只靠预训练记忆回答', ok: false, why: 'ICL 恰恰是在上下文里放入示例与说明，不是删文档。' },
        { t: 'ICL 与 finetune 一样会更改模型 checkpoint 文件里的全部权重', ok: false, why: 'ICL 只改推理输入；只有训练/微调才写回权重文件。' },
      ],
    },
  ],
});
