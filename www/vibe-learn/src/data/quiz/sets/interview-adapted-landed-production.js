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
      q: "延迟、吞吐、单次检索指标都健康，用户却说答案 subtly 过时；大盘全绿。最可能的故障模式是？",
      choices: [
        { t: "静默新鲜度或表示漂移：文档 stale，或供应商静默换 checkpoint", ok: true, why: "单请求指标仍绿时，分布层 recall 可能已 decay；靠固定 probe 的 top-k overlap / 索引版本遥测才能抓。" },
        { t: "容量不足，需要加副本", ok: false, why: "吞吐已健康；加副本治不了 stale 文档或漂移的表示。" },
        { t: "重排器配错导致整库过时", ok: false, why: "重排失误体现为当前文档 precision 差，不是系统性「答案过时」。" },
        { t: "用户感知误差，大盘绿就不必查", ok: false, why: "大盘绿 + 过时抱怨是典型 silent drift 信号，应查索引版本与 overlap。" },
      ],
      relatedNodes: ["ai-rerank","craft-observability"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · production",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-production:q2",
      q: "数学/多步功能慢且贵。方案 A：2000 token 入、限 100 token 出；方案 B：1000 入、1000 出。通常哪个更便宜且更快？",
      choices: [
        { t: "方案 A（短输出）— 输出单价约 4× 输入且主导墙钟时间", ok: true, why: "解码按 token 串行计费计时；长 prompt 还可能命中 prefix cache，短输出往往更省。" },
        { t: "方案 B — prompt 越短一定更省", ok: false, why: "主导成本与延迟的是输出 token，不是「入更短就赢」。" },
        { t: "一样 — 只看入+出总 token 数", ok: false, why: "入/出单价不同（出常约 3–5× 入），split 决定账单。" },
        { t: "方案 A 更慢 — 2000 prefill 必比 1000 慢一倍", ok: false, why: "prefill 可并行/缓存；1000 token 解码常远超多出来的 1000 prefill。" },
      ],
      relatedNodes: ["ai-token-context"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · production",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-production:q3",
      q: "用户反馈「这周明显变差」，你们没发版。最可能原因是？",
      choices: [
        { t: "提供商静默更新了模型，或索引/语料变 stale", ok: true, why: "无发版却整周质量跌，是上游 checkpoint 或索引新鲜度漂移的经典签名；应用版本锁定 + 金标门禁抓。" },
        { t: "大模型固有随机性，无法归因", ok: false, why: "随机性会造成单次波动，不会解释「整周明显变差」的持续回退。" },
        { t: "上下文窗口悄悄缩小了", ok: false, why: "上下文上限不会静默缩小；未公告的模型更新才更常见。" },
        { t: "用户问法变了，与系统无关", ok: false, why: "应先排除模型版本与索引新鲜度；查询分布变化要有链路证据才能下结论。" },
      ],
      relatedNodes: ["ai-rag-eval","ai-token-context"],
      origin: 'adapted',
      attribution: "landedjobs/rag-engineer-interview-questions · production",
      attributionUrl: "https://github.com/landedjobs/rag-engineer-interview-questions",
    },
    {
      id: "adapted:landed-production:q4",
      q: "语义缓存把细微不同的问题答成了同一个错误答案。最该先改哪一环？",
      choices: [
        { t: "提高相似度阈值，并在索引更新时主动失效；严禁跨租户命中", ok: true, why: "阈值太松会串错答；应收紧、更新时失效、严守租户隔离。" },
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
