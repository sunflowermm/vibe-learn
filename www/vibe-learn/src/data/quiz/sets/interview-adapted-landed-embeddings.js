import { defineQuizSet } from '../schema.js';

/**
 * 系统非原创 · AI 全栈向 · 中文改编
 * 来源：landedjobs/rag-engineer-interview-questions · embeddings
 * https://github.com/landedjobs/rag-engineer-interview-questions
 */
export default defineQuizSet({
  id: "interview-adapted-landed-embeddings",
  title: "开源改编 · Embedding 实务",
  kind: "interview",
  domain: "ai",
  tags: ["RAG","嵌入","AI全栈","系统非原创","adapted","中文"],
  relatedNodes: ["ai-chunking","ai-hybrid-search","ai-rag-eval"],
  caption: "系统非原创 · AI 全栈向 · 中文 · landedjobs/rag-engineer-interview-questions · embeddings",
  origin: 'adapted',
  attribution: "landedjobs/rag-engineer-interview-questions · embeddings",
  attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
  questions: [
    {
      id: "adapted:landed-embeddings:q1",
      q: "同事提议：答案质量差就升级到最大可用嵌入模型。资深工程师应如何回应？",
      choices: [
        { t: "先用 recall@k / precision@k 定位失败环节，再调分块/混合检索，最后才考虑换模型", ok: true, why: "检索是 IR 问题 — 用指标诊断；最便宜 wins 往往是分块 + 混合，不是更大 encoder。" },
        { t: "同意 — 更大嵌入是检索质量的主驱动", ok: false, why: "模型大小很少是主杠杆；领域匹配、分块与混合检索对 recall 影响更大。" },
        { t: "改换更大的生成模型", ok: false, why: "正确片段没召回到，任何生成器都救不了 — 这是检索问题。" },
        { t: "把 top-k 从 5 提到 50，让生成有更多上下文", ok: false, why: "若 gold chunk 不在候选里，加 k 只会塞进更多噪声，不解决召回根因。" },
      ],
      relatedNodes: ["ai-chunking","ai-hybrid-search","ai-rag-eval"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · embeddings",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-embeddings:q2",
      q: "recall@20 卡在 0.86，调分块也没动；HNSW 用默认参数。最先值得尝试的是？",
      choices: [
        { t: "提高 efSearch（和/或 M）— ANN 是近似的，索引配置可能就是 recall 天花板", ok: true, why: "低 efSearch 会静默丢掉真 top-k；先验证是索引而非 encoder 卡 recall — 且几乎零成本。" },
        { t: "立刻换更大嵌入模型", ok: false, why: "换模型意味着全量重嵌，很少是最便宜杠杆；先排除近似搜索天花板。" },
        { t: "把 k 降到 5 以提升 precision", ok: false, why: "缩小 k 只会降低 recall — 是删候选而非找回漏掉的 gold chunk。" },
        { t: "加 cross-encoder 重排即可", ok: false, why: "重排只能重排已在短名单里的项；recall@20 低说明 gold 可能根本没进池。" },
      ],
      relatedNodes: ["ai-chunking","ai-rerank","ai-vector-store"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · embeddings",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-embeddings:q3",
      q: "服务 5000 万 chunk，向量索引装不进 RAM 预算。哪种做法能在不重嵌的情况下缩小 footprint？",
      choices: [
        { t: "截断 Matryoshka 维度和/或切 IVFPQ 乘积量化，用重排器补回质量", ok: true, why: "两者都能就地把存储向量变小，以可测 recall 代价换空间，重排可恢复 top-k 质量 — 无需重嵌。" },
        { t: "用更小模型全量重嵌", ok: false, why: "这正是要避免的重嵌 — 且会让所有存量向量失效。" },
        { t: "增大 chunk 尺寸以减少向量条数", ok: false, why: "大 chunk 稀释嵌入、伤 precision；是质量回退，不是干净的内存修复。" },
        { t: "把索引放 SSD，接受查询慢 10 倍", ok: false, why: "ANN 热路径通常仍需内存图结构；只换磁盘不解决 RAM 瓶颈且伤 SLA。" },
      ],
      relatedNodes: ["ai-chunking","ai-rerank","ai-vector-store"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · embeddings",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-embeddings:q4",
      q: "必须服务约 8 亿向量且 RAM 紧张时，更合适的索引形态是？",
      choices: [
        { t: "IVFPQ（量化压缩）— 以部分 recall 换数量级内存下降，再对短名单重排补质量", ok: true, why: "十亿级 HNSW 常要 TB 级 RAM；IVFPQ 可降到约几十分之一，再用 rerank 捞回 top-k。" },
        { t: "坚持全量 HNSW，接受可能 TB 级内存账单", ok: false, why: "8 亿×高维 HNSW 往往装不进预算；「最高 recall」在买不起时无意义。" },
        { t: "无所谓 — 所有 ANN 索引内存差不多", ok: false, why: "十亿规模下不同索引可差约 20×；选型是采购级决策。" },
        { t: "按租户拆多个小 HNSW，总量内存就会自动够用", ok: false, why: "向量总量不变，RAM 近似线性相加；需要的是压缩型索引，不是单纯拆分。" },
      ],
      relatedNodes: ["ai-rerank","ai-vector-store"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · embeddings",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-embeddings:q5",
      q: "升级嵌入模型后，把新向量直接写进现有线上索引，与旧向量并存。会发生什么？",
      choices: [
        { t: "recall 会静默剪切 — 新旧向量不可比；应双索引全量重嵌后原子切换", ok: true, why: "混代向量破坏跨项比较；安全路径是并行索引重嵌、验证、再原子 cutover。" },
        { t: "recall 立刻提升，因为新模型更好", ok: false, why: "新旧向量在不同空间；跨代比较无意义，质量反而退化。" },
        { t: "没事 — 不同模型的嵌入可直接比", ok: false, why: "不可比 — 新模型向量空间与旧模型余弦不可比（representation shearing）。" },
        { t: "只对查询侧用新模型重嵌即可，文档侧可保留旧向量", ok: false, why: "query-doc 也必须在同一空间；只更新一侧同样破坏可比性。" },
      ],
      relatedNodes: ["craft-security"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · embeddings",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-embeddings:q6",
      q: "4 人初创做 B2B RAG，每客户约 200 万向量，且有严格数据 residency。向量库自建还是采购？",
      choices: [
        { t: "买托管向量库，但选支持租户隔离 / 区域内（VPC）部署的，以满足 residency", ok: true, why: "低于 ~1000 万向量托管更省更快；residency 靠隔离/区域特性满足，不必全栈自托管。" },
        { t: "Day-1 自托管 Vespa 求最大控制", ok: false, why: "4 人团队扛不住自托管运维；绑定约束是 residency，不是控制欲。" },
        { t: "用一个共享索引 + 元数据过滤，residency 以后再管", ok: false, why: "residency 是法律约束不是 backlog；共享索引还有串租风险。" },
        { t: "不用向量库，每次全库 BM25 扫描", ok: false, why: "200 万向量规模下全扫描延迟与成本不可接受；且难做语义召回。" },
      ],
      relatedNodes: ["ai-hybrid-search","ai-vector-store","ai-rag"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · embeddings",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
  ],
});
