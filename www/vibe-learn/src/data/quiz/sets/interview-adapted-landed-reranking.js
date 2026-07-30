import { defineQuizSet } from '../schema.js';

/**
 * 系统非原创 · AI 全栈向 · 中文改编
 * 来源：landedjobs/rag-engineer-interview-questions · reranking
 * https://github.com/landedjobs/rag-engineer-interview-questions
 */
export default defineQuizSet({
  id: "interview-adapted-landed-reranking",
  title: "开源改编 · 重排序",
  kind: "interview",
  domain: "ai",
  tags: ["RAG","重排","AI全栈","系统非原创","adapted","中文"],
  relatedNodes: ["ai-rerank","ai-token-context","craft-observability"],
  caption: "系统非原创 · AI 全栈向 · 中文 · landedjobs/rag-engineer-interview-questions · reranking",
  origin: 'adapted',
  attribution: "landedjobs/rag-engineer-interview-questions · reranking",
  attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
  questions: [
    {
      id: "adapted:landed-reranking:q1",
      q: "为何不能对整个语料库直接跑 cross-encoder 重排、跳过第一阶段检索？",
      choices: [
        { t: "太慢 — cross-encoder 必须逐对联合打分 query–doc，且无法预建索引", ok: true, why: "只能 afford 在小短名单上跑；第一阶段 recall 把百万级 cheaply 缩到 ~50。" },
        { t: "cross-encoder 比 bi-encoder 不准", ok: false, why: "恰恰相反 — 更准，所以才用它做重排。" },
        { t: "cross-encoder 读不了长文本", ok: false, why: "可截到 ~512 token；真正 blocker 是 per-query 成本，不是长度。" },
        { t: "cross-encoder 只能处理英文", ok: false, why: "多语言模型可用；瓶颈是算力与延迟，不是语言。" },
      ],
      relatedNodes: ["ai-rerank","ai-token-context","craft-observability"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · reranking",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-reranking:q2",
      q: "recall@50 已崩 — gold chunk 经常第一阶段就召不回。同事加重排器来修。能行吗？",
      choices: [
        { t: "不行 — 重排只重排短名单，救不了 first-stage 从未取回的 chunk", ok: true, why: "重排修「在池里但排位低」，不修「没检索到」。recall 崩要先查分块/混合/ANN 参数/ColBERT。" },
        { t: "能 — cross-encoder 足够准，什么都能找到", ok: false, why: "cross-encoder 只给 handed 的候选打分；gold 不在短名单就 invisible。" },
        { t: "能，只要把 top_n 提到 50", ok: false, why: "短名单已排除 gold 时，留更多项仍 surfacing 不了 — 问题在上游 recall。" },
        { t: "能，换更大的 cross-encoder 就行", ok: false, why: "模型再大也看不到未进入候选的文档；recall 不是精排模型尺寸问题。" },
      ],
      relatedNodes: ["ai-chunking","ai-rerank","ai-vector-store"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · reranking",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-reranking:q3",
      q: "基于自有干净文档的 grounded 事实问答，recall 已经不错。同事提议加 HyDE「boost 检索」。最佳决策？",
      choices: [
        { t: "此处可跳过 HyDE — 它帮 zero-shot/域不匹配语料，但在 grounded 事实检索上可能帮倒忙", ok: true, why: "HyDE 擅长词汇不匹配；干净语料 + 好 recall 时多一次 LLM 调用与幻觉风险，收益小。" },
        { t: "处处加 HyDE — 永远提升检索", ok: false, why: "HyDE 假想答案可能 hallucinate 细节，把检索带离真 passage。" },
        { t: "用 HyDE 完全替代检索", ok: false, why: "HyDE 是 query 变换喂给检索，不是 retriever。" },
        { t: "HyDE 与 cross-encoder 二选一即可", ok: false, why: "二者职责不同；HyDE 改 query，重排改短名单 — 不是互斥替换关系。" },
      ],
      relatedNodes: ["ai-rerank","ai-rag","craft-observability"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · reranking",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-reranking:q4",
      q: "用户 mostly 问窄事实（「plan X 退款窗口几天？」）。同事想把整套系统切 GraphRAG。最佳决策？",
      choices: [
        { t: "否 — 事实 lookup 保持向量 RAG + 重排；GraphRAG 留给全库 sensemaking 类问题", ok: true, why: "技术要匹配查询分布；lookup 不需要图遍历的复杂度与索引成本。" },
        { t: "是 — GraphRAG 严格优于向量 RAG", ok: false, why: "不然；lookup 上向量 RAG + 重排质量/成本更优，GraphRAG 索引常贵 5–10×。" },
        { t: "给每条查询都加 agentic 多跳检索", ok: false, why: "单跳问题延迟乘 4–7×，多数不需要。" },
        { t: "只用 BM25，GraphRAG 和向量都不需要", ok: false, why: "paraphrase 与语义近义问法 BM25 弱；lookup 仍需稠密 + 重排。" },
      ],
      relatedNodes: ["ai-hybrid-search","ai-rerank","ai-rag"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · reranking",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-reranking:q5",
      q: "面试官说：「设计一个基于内部文档的问答助手。」最先该做什么？",
      choices: [
        { t: "先问清范围 — 形态、规模、新鲜度 SLA、租户/权限、错误代价", ok: true, why: "「RAG」背后可能是三套不同系统；澄清需求才能 deliberate 选索引、入库与隔离。" },
        { t: "立刻画 embed → retrieve → generate 证明懂流水线", ok: false, why: "跳过决定架构的需求，像背模板。" },
        { t: " upfront 推荐最新模型 + 托管向量库", ok: false, why: "工具选择没回答问题需求，显得跳过设计推理。" },
        { t: "先估索引 RAM，其他以后再说", ok: false, why: "容量是重要维度之一，但不能替代形态、权限与 SLA 等前置 scoping。" },
      ],
      relatedNodes: ["ai-vector-store","ai-rag","craft-security"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · reranking",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
  ],
});
