import { defineQuizSet } from '../schema.js';

/**
 * 系统非原创 · AI 全栈向 · 中文改编
 * 来源：landedjobs/rag-engineer-interview-questions · production
 * https://github.com/landedjobs/rag-engineer-interview-questions
 */
export default defineQuizSet({
  id: "interview-adapted-landed-production",
  title: "开源改编 · RAG 生产化",
  kind: "interview",
  domain: "ai",
  tags: ["RAG","生产","AI全栈","系统非原创","adapted","中文"],
  relatedNodes: ["ai-rerank","craft-observability","ai-token-context"],
  caption: "系统非原创 · AI 全栈向 · 中文 · landedjobs/rag-engineer-interview-questions · production",
  origin: 'adapted',
  attribution: "landedjobs/rag-engineer-interview-questions · production",
  attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
  questions: [
    {
      id: "adapted:landed-production:q1",
      q: "延迟、吞吐、单次检索指标都健康，用户却说答案 subtly 过时；大盘全绿。最可能的故障与如何发现？",
      choices: [
        { t: "静默新鲜度/表示漂移（文档 stale 或 vendor checkpoint 变更）；用固定 probe set 的 top-k overlap 遥测抓", ok: true, why: "recall 可在分布层面 decay 而 per-request 仍绿；只有 freshness/overlap 遥测能暴露。" },
        { t: "容量问题 — 加副本", ok: false, why: "吞吐健康；加副本不治 stale 或 drifted 表示。" },
        { t: "重排器配错了", ok: false, why: "重排问题体现在当前文档 precision，不是系统性 outdated 答案。" },
        { t: "用户感知误差，指标没问题就不用查", ok: false, why: "大盘绿 + 用户抱怨过时是典型 silent drift 信号，应查索引版本与 overlap。" },
      ],
      relatedNodes: ["ai-rerank","craft-observability"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · production",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-production:q2",
      q: "数学/多步功能慢且贵。同事 A：2000 token 入、限 100 token 出；同事 B：1000 入、1000 出。哪个更便宜/更快？为何？",
      choices: [
        { t: "2000 入 / 100 出 — 输出 token 单价约 4× 输入且主导总延迟，短输出胜过长 prompt", ok: true, why: "输出是贵且 sequential 的部分；长 prompt 还可能被 cache。" },
        { t: "B 更便宜 — prompt 越短越省", ok: false, why: "不是 prompt 长度主导；输出 token 更贵（~4×）且占延迟大头。" },
        { t: "一样 — 只看总 token", ok: false, why: "入/出定价不同（出 ~3–5× 入），split 很重要。" },
        { t: "A 更慢 — 2000 token prefill 一定比 1000 慢一倍", ok: false, why: "prefill 可 cache；1000 token 输出的生成时间常远超多 1000 token prefill。" },
      ],
      relatedNodes: ["ai-token-context"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · production",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-production:q3",
      q: "用户反馈「这周明显变差」，你们没发版。最可能原因与防护？",
      choices: [
        { t: "提供商静默更新模型（或索引变 stale）；锁定模型版本 + 评测门禁 + 新鲜度遥测", ok: true, why: "锁定版本 + 金标集评测 + 前 k 重叠监控，能在用户之前抓住静默回退。" },
        { t: "大模型随机性 — 没办法", ok: false, why: "无发版却持续质量跌，是提供商改模型或索引过期的经典签名。" },
        { t: "上下文窗口悄悄缩小了", ok: false, why: "上下文上限不会静默缩小；未公告的模型更新才是常见 culprit。" },
        { t: "用户问法变了，与系统无关", ok: false, why: "应先排除模型版本漂移与索引新鲜度；查询分布变化需链路证据。" },
      ],
      relatedNodes: ["ai-rag-eval","ai-token-context"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · production",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-production:q4",
      q: "语义缓存把细微不同的问题答成了同一个错误答案。怎么修？",
      choices: [
        { t: "提高相似度阈值 + 索引更新时主动失效 — 绝不跨租户缓存", ok: true, why: "阈值太松会返回过期/错误答案；应收紧、更新时失效、严守租户隔离边界。" },
        { t: "完全关掉缓存", ok: false, why: "丢掉真实成本/延迟收益；问题是阈值校准，不是缓存本身。" },
        { t: "只缓存完全相同的字符串", ok: false, why: "命中率近零；语义缓存价值在近重复长尾 — 应调阈值而非放弃语义匹配。" },
        { t: "把缓存有效期从 1 小时延到 24 小时提高命中率", ok: false, why: "更长有效期会放大过期/错答风险，与题意相反。" },
      ],
      relatedNodes: ["craft-observability"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · production",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-production:q5",
      q: "客户说助手「有时答错」，现场不能看机密文档或输出。什么手段诊断最快？",
      choices: [
        { t: "按请求记录链路 — 检索集、相关性分数、提示词版本、模型版本、 grounded 分数", ok: true, why: "链路能揭示「检索正常、提示缺指令」而不暴露机密正文。" },
        { t: "让客户把失败答案和文档贴工单", ok: false, why: "受监管场景常不可能，且不可扩展。" },
        { t: "换更大模型减少错答", ok: false, why: "盲目升级，未定位失败模式。" },
        { t: "让客户录屏复现", ok: false, why: "仍可能含机密；且缺结构化检索/生成分段，难规模化归因。" },
      ],
      relatedNodes: ["ai-llm-era"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · production",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-production:q6",
      q: "希望低忠实度答案永远到不了用户。忠实度指标该怎么用？",
      choices: [
        { t: "接成护栏：低于服务目标就拦截或转人工，不只上大盘", ok: true, why: "请求路径里的评估器才拦坏答案；没人盯的大盘拦不住。" },
        { t: "放日报大盘给团队看", ok: false, why: "事后看趋势，期间每条低忠实度答案都已发出。" },
        { t: "只在上线前离线评测时计算", ok: false, why: "仅离线会漏生产漂移与用户线上碰到的具体坏答。" },
        { t: "忠实度只用于选嵌入模型", ok: false, why: "忠实度是生成/ grounding 质量指标，与嵌入选型不是同一环。" },
      ],
      relatedNodes: ["ai-rag-eval","ai-prompt-security"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · production",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-production:q7",
      q: "面试官：「演示能跑 — 怎么证明可投产？」最佳回答？",
      choices: [
        { t: "在生产派生金标集上过分层评测门禁、注入测试过关、第 99 百分位延迟/成本在预算内", ok: true, why: "可投产是可度量门槛：检索、生成、安全、性能四维都要达标。" },
        { t: "答案流畅、干系人满意", ok: false, why: "那是演示；流畅不等于有据，几条顺手工单盖不住长尾。" },
        { t: "用了最新模型和托管向量库", ok: false, why: "工具选择不能证明正确性、安全与防回退能力。" },
        { t: "有值班和告警就够了", ok: false, why: "运维能力必要，但不等于检索忠实度与评测门禁已达标。" },
      ],
      relatedNodes: ["ai-vector-store","ai-rag-eval","craft-security"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · production",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-production:q8",
      q: "被问：五千万条 1536 维向量上 HNSW，索引要多大内存？你怎么答？",
      choices: [
        { t: "「约五千万 × 1536 × 4 字节 ≈ 300 GB 裸向量，加 HNSW 图约 450–600 GB — 这个规模我会权衡 IVFPQ 加重排」", ok: true, why: "现场条数×维度×4 字节×约 1.8 心算，并连到索引选型，是资深信号。" },
        { t: "「几 GB 就行 — 向量很小」", ok: false, why: "差两个数量级；低估内存会中途被迫重架构。" },
        { t: "「看模型而定」", ok: false, why: "对但回避 — 面试官要算术，维数与条数已知就能算。" },
        { t: "「放磁盘就行，内存不重要」", ok: false, why: "HNSW 热路径依赖内存图；纯磁盘近似搜索延迟通常不可接受。" },
      ],
      relatedNodes: ["ai-rerank","ai-vector-store"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · production",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
  ],
});
