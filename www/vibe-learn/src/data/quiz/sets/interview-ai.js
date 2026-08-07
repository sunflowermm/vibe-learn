import { defineQuizSet } from '../schema.js';

/**
 * 大厂 · LLM 应用直觉（场景决策）
 * mcq-expert：一题一事、似真干扰
 */
export default defineQuizSet({
  id: 'interview-ai-rag',
  title: '大厂 · LLM / RAG 应用直觉',
  kind: 'interview',
  domain: 'ai',
  tags: ['AI', 'RAG', 'Embedding', '一面'],
  relatedNodes: ['ai-rag', 'ai-embedding', 'ai-rag-eval'],
  caption: '窗口 · 嵌入一致性 · 检索优先 · 评测定位。',
  questions: [
    {
      id: 'interview-ai-rag:window',
      q: '把很长的规则贴进提示后，前面的约束好像「丢了」。常见原因？',
      choices: [
        {
          t: '超出上下文窗口被截断，靠前的内容进不了模型有效上下文',
          ok: true,
          why: 'token 预算有硬上限；注意力也不是无限记忆。',
        },
        {
          t: '工程上可以把上下文窗口当成无限，只要机器内存够',
          ok: false,
          why: '模型与接口都有上下文上限。',
        },
        {
          t: '有了注意力机制，规则就永远不会因长度丢失',
          ok: false,
          why: '注意力≠无限记忆，长上下文仍会被截断或稀释。',
        },
        {
          t: '把温度设为 0 就可以避免任何截断',
          ok: false,
          why: '温度影响采样随机性，不改变上下文长度。',
        },
      ],
      relatedNodes: ['ai-token-context', 'ai-what'],
    },
    {
      id: 'interview-ai-rag:embed',
      q: '向量库「建库」和「查询」时，必须先强调什么？',
      choices: [
        {
          t: '建库与查询使用同一套嵌入模型（同一向量空间）',
          ok: true,
          why: '不同模型空间不可直接比相似度。',
        },
        {
          t: '只要向量维度相同，就可以随意换厂商模型',
          ok: false,
          why: '维度相同不代表同一嵌入空间。',
        },
        {
          t: '每次查询随机换一个嵌入模型，提高多样性',
          ok: false,
          why: '相似度会失去意义。',
        },
        {
          t: '用文件 MD5 当「语义向量」做近邻检索',
          ok: false,
          why: '摘要哈希≠语义嵌入。',
        },
      ],
      relatedNodes: ['ai-embedding', 'ai-vector-store'],
    },
    {
      id: 'interview-ai-rag:rag',
      q: '公司内部文档问答，比「整库塞进提示」更稳妥的是？',
      choices: [
        {
          t: '文档分块建索引，查询时检索相关片段再注入生成',
          ok: true,
          why: '经典 RAG：控窗口、可更新语料。',
        },
        {
          t: '把整个知识库一次全部塞进系统提示',
          ok: false,
          why: '极易爆窗，也无法规模化。',
        },
        {
          t: '一上来全参微调基座，之后永远不做检索',
          ok: false,
          why: '贵、慢，且知识热更新困难。',
        },
        {
          t: '禁止向量检索，只靠人工每次手贴相关段落',
          ok: false,
          why: '无法规模化，也难保证覆盖。',
        },
      ],
      relatedNodes: ['ai-rag', 'ai-chunking'],
    },
    {
      id: 'interview-ai-rag:chunk',
      q: 'RAG 分块大小失衡时，更准确的代价描述是？',
      choices: [
        {
          t: '过大易带噪音；过小易切断语境，召回与生成都受影响',
          ok: true,
          why: '块大小是关键旋钮，要结合重叠与评测调。',
        },
        {
          t: '块大小对召回与答案质量完全没有影响',
          ok: false,
          why: '会显著影响检索与上下文质量。',
        },
        {
          t: '块越大一定越好，因为总是带上更多上下文',
          ok: false,
          why: '易引入无关噪音，挤占有效 token。',
        },
        {
          t: '块越小一定越好，因为更「精确」',
          ok: false,
          why: '过小会切断语义，生成缺语境。',
        },
      ],
      relatedNodes: ['ai-chunking', 'ai-rag'],
    },
    {
      id: 'interview-ai-rag:bad',
      q: 'RAG 系统答非所问，优先先查哪一层？',
      choices: [
        {
          t: '检索层：是否召回到正确文档 / 片段',
          ok: true,
          why: '差答先查「依据对不对」，再谈生成。',
        },
        {
          t: '先全参微调基座模型，当作唯一手段',
          ok: false,
          why: '多数时候根因在检索与分块，不在立刻微调。',
        },
        {
          t: '先把温度调到接近最大值，让模型更「敢说」',
          ok: false,
          why: '更随机，通常更糟。',
        },
        {
          t: '先关掉所有评测与回归集，减少干扰',
          ok: false,
          why: '失去定位信号。',
        },
      ],
      relatedNodes: ['ai-rag-eval', 'ai-rag'],
    },
    {
      id: 'interview-ai-rag:hybrid',
      q: '稀疏检索 + 向量召回都很杂，下一步更合理？',
      choices: [
        {
          t: '融合候选后做重排，再只把 Top-N 注入生成',
          ok: true,
          why: '混合召回 + 重排是可控提质路径。',
        },
        {
          t: '禁止 BM25 与向量同时使用，只能二选一',
          ok: false,
          why: '二者常互补，不是互斥。',
        },
        {
          t: '换了嵌入模型后，旧索引可以永不重建',
          ok: false,
          why: '换模必须重建向量索引。',
        },
        {
          t: '有了 RAG 就禁止答案出现任何引用',
          ok: false,
          why: '引用片段利于人工核对。',
        },
      ],
      relatedNodes: ['ai-hybrid-search', 'ai-rerank'],
    },
    {
      id: 'interview-ai-rag:ft',
      q: '知识经常变更的内部文档问答，更优先哪条路线？',
      choices: [
        {
          t: 'RAG / 检索增强优先，语料可热更新',
          ok: true,
          why: '变更频繁时检索比反复微调更划算。',
        },
        {
          t: '一上来全参微调，把文档「背进」权重',
          ok: false,
          why: '成本高、更新慢。',
        },
        {
          t: '禁止任何检索，只靠模型参数里的记忆',
          ok: false,
          why: '缺依据，易幻觉，难跟新文档。',
        },
        {
          t: '只调温度参数，不碰知识注入与检索',
          ok: false,
          why: '温度不注入事实。',
        },
      ],
      relatedNodes: ['ai-finetune', 'ai-rag'],
    },
    {
      id: 'interview-ai-rag:hallu',
      q: '模型编造了不存在的内部接口。工程上更该？',
      choices: [
        {
          t: '用检索或工具约束依据，再在依据上生成；并做评测',
          ok: true,
          why: '靠可核对依据降幻觉。',
        },
        {
          t: '把温度调到最高，让模型更有「创造力」',
          ok: false,
          why: '更发散，幻觉常更严重。',
        },
        {
          t: '禁止一切评测，避免暴露问题',
          ok: false,
          why: '无法量化与回归。',
        },
        {
          t: '认为只要上下文窗口够大，幻觉就会自动消失',
          ok: false,
          why: '窗口大也不等于有正确依据。',
        },
      ],
      relatedNodes: ['ai-what', 'ai-rag'],
    },
    {
      id: 'interview-ai-rag:attn',
      q: '面试里怎么一句话说清「注意力机制」在做什么？',
      choices: [
        {
          t: '按相关性对上下文加权聚合信息；不保证输出事实正确',
          ok: true,
          why: '机制描述 + 边界，避免神化。',
        },
        {
          t: '按注意力加权后即可保证输出事实永远正确、不会幻觉',
          ok: false,
          why: '注意力不提供事实性保证。',
        },
        {
          t: '证明只有注意力这一条路线才能做任何 NLP 任务',
          ok: false,
          why: '还有其他模型路线与系统组件。',
        },
        {
          t: '注意力层会自动识别并删除提示里的密钥与隐私字段',
          ok: false,
          why: '无此安全能力；密钥仍靠工程隔离。',
        },
      ],
      relatedNodes: ['ai-attention', 'ai-transformer'],
    },
    {
      id: 'interview-ai-rag:cite',
      q: '对内知识问答要做到可核对，生成侧更宜？',
      choices: [
        {
          t: '要求回答引用检索到的片段或文档标识',
          ok: true,
          why: '可追溯、便于人工验真、降低瞎编。',
        },
        {
          t: '禁止出现任何引用，答案越「流畅」越好',
          ok: false,
          why: '更难核对真伪。',
        },
        {
          t: '只靠提高温度让表达更丰富',
          ok: false,
          why: '不增加依据。',
        },
        {
          t: '关掉检索，只靠模型背诵内部文档',
          ok: false,
          why: '易幻觉，也难跟新。',
        },
      ],
      relatedNodes: ['ai-rag', 'ai-rag-eval'],
    },
  ],
});
