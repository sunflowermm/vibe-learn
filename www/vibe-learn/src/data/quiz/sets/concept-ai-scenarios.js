import { defineQuizSet } from '../schema.js';

/** 场景 · AI 产品落地；干扰项=该场景一面常见误判 */
export default defineQuizSet({
  id: 'concept-ai-scenarios',
  title: '场景 · LLM / RAG / Agent 落地',
  kind: 'concept',
  domain: 'ai',
  tags: ['AI', '场景', 'RAG', 'Agent'],
  relatedNodes: ['ai-rag', 'ai-tool-calling', 'ai-what'],
  caption: '选型 · 排障 · 安全；先场景决策再背名词。',
  questions: [
    {
      id: 'concept-ai-scenarios:paste',
      q: '把整份制度 PDF 粘进提示做问答。主要风险？',
      choices: [
        { t: '易爆上下文窗口，又贵又噪音大', ok: true, why: '应检索注入相关片段。' },
        { t: '一定比正式 RAG 更准、更稳', ok: false, why: '常相反：噪音与截断伤答案。' },
        { t: '把温度调低就会自动消除幻觉', ok: false, why: '温度不管「有没有依据」。' },
        { t: '粘进提示后就无需任何权限控制', ok: false, why: '制度原文仍有泄密面。' },
      ],
      relatedNodes: ['ai-rag', 'ai-token-context'],
    },
    {
      id: 'concept-ai-scenarios:rebuild',
      q: '换了嵌入模型后，旧向量库能否直接查？',
      choices: [
        { t: '应重建索引后再查询', ok: true, why: '向量空间/维度可能已变。' },
        { t: '只要维度数字相同就可直接混用', ok: false, why: '维度同也不等于同一嵌入空间。' },
        { t: '只要把 temperature 调高就能对齐空间', ok: false, why: '采样温度与嵌入空间无关。' },
        { t: '删掉评测集就能安全沿用旧库', ok: false, why: '评测删不掉空间不一致问题。' },
      ],
      relatedNodes: ['ai-embedding', 'ai-vector-store'],
    },
    {
      id: 'concept-ai-scenarios:keyword',
      q: '用户常搜精确货号，纯向量召回不够。可加？',
      choices: [
        { t: '稀疏检索（如 BM25）做混合召回', ok: true, why: '关键词补精确匹配。' },
        { t: '禁止一切关键词，只许语义向量', ok: false, why: '丢掉货号等精确匹配。' },
        { t: '只靠提高 temperature 提升命中', ok: false, why: '不修检索链路。' },
        { t: '关掉重排就一定能找回货号', ok: false, why: '可能更糟。' },
      ],
      relatedNodes: ['ai-hybrid-search', 'ai-rag'],
    },
    {
      id: 'concept-ai-scenarios:topn',
      q: '召回 50 段全塞进提示，模型回答更糊。宜？',
      choices: [
        { t: '重排后只保留少量高质量 Top', ok: true, why: '控噪音与窗口预算。' },
        { t: '再翻倍召回到 200 段全塞进去', ok: false, why: '噪音与成本更大。' },
        { t: '取消系统规则，让模型自由发挥', ok: false, why: '更失控。' },
        { t: '禁止引用任何检索片段', ok: false, why: '更难核对依据。' },
      ],
      relatedNodes: ['ai-rerank', 'ai-rag'],
    },
    {
      id: 'concept-ai-scenarios:eval',
      q: '上线 RAG 要知道变好变坏，最少要有？',
      choices: [
        { t: '固定题集 + 检索/答案类指标，可回归', ok: true, why: '没有基线就无法比较。' },
        { t: '只凭体感换模型，不留样本', ok: false, why: '不可比、不可复现。' },
        { t: '禁止保存任何评测样本', ok: false, why: '无法做回归评测。' },
        { t: '只看响应延迟，不管正确性', ok: false, why: '延迟不等于质量。' },
      ],
      relatedNodes: ['ai-rag-eval', 'ai-rag'],
    },
    {
      id: 'concept-ai-scenarios:write',
      q: 'Agent 工具要写数据库，上线前必须？',
      choices: [
        { t: '鉴权、审计，以及干跑/沙箱等副作用控制', ok: true, why: '可写工具事故高发。' },
        { t: '默认对生产库可写，方便演示', ok: false, why: '事故高发。' },
        { t: '用户一句话即可自动提权写库', ok: false, why: '提示注入面极大。' },
        { t: '关掉全部审计日志以省成本', ok: false, why: '无法追责与回滚分析。' },
      ],
      relatedNodes: ['ai-tool-calling', 'ai-prompt-security', 'ai-mcp'],
    },
    {
      id: 'concept-ai-scenarios:cache',
      q: '相同系统提示反复打高价 API，工程上？',
      choices: [
        { t: '提示缓存 / 复用稳定前缀，降重复计费', ok: true, why: '前缀复用是常见省钱手段。' },
        { t: '每次随机重写系统规则，避免「缓存命中」', ok: false, why: '更贵更不稳。' },
        { t: '取消一切请求超时即可省钱', ok: false, why: '超时与计费缓存无关。' },
        { t: '改成 UDP 调用模型 API', ok: false, why: '主流仍是 HTTPS；与省钱无关。' },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-token-context'],
    },
    {
      id: 'concept-ai-scenarios:multi',
      q: '客服只要查订单状态，架构上？',
      choices: [
        { t: '单工具链通常足够，别过度多智能体', ok: true, why: '复杂度应匹配任务。' },
        { t: '必须上十个智能体互相转发', ok: false, why: '过重。' },
        { t: '禁止使用任何工具，只靠参数记忆', ok: false, why: '查不到实时订单态。' },
        { t: '先全参微调客服模型再上线查询', ok: false, why: '非必要第一步。' },
      ],
      relatedNodes: ['ai-agent-birth', 'ai-tool-calling'],
    },
    {
      id: 'concept-ai-scenarios:pii',
      q: '日志里把用户身份证原文留给模型排障。问题？',
      choices: [
        { t: '敏感数据泄密与合规风险', ok: true, why: '要脱敏与最小化。' },
        { t: '一定显著提升回答质量', ok: false, why: '不值得用泄密换排障便利。' },
        { t: '等于已经完成了接口鉴权', ok: false, why: '日志留存 ≠ 鉴权。' },
        { t: '可以替代业务 ACL', ok: false, why: '不能用日志原文代替权限模型。' },
      ],
      relatedNodes: ['ai-prompt-security', 'ai-rag'],
    },
    {
      id: 'concept-ai-scenarios:offline',
      q: '知识库昨晚更新，今天仍答旧版。先查？',
      choices: [
        { t: '索引 / 语料是否已刷新到在线路', ok: true, why: 'RAG 数据面同步。' },
        { t: '只把 temperature 调低', ok: false, why: '不更新知识。' },
        { t: '一定是注意力机制坏了', ok: false, why: '先查数据面与索引。' },
        { t: '禁止重建索引，以免「浪费」', ok: false, why: '空间或语料变了往往正需要重建。' },
      ],
      relatedNodes: ['ai-vector-store', 'ai-rag'],
    },
    {
      id: 'concept-ai-scenarios:json',
      q: '要模型输出可解析 JSON 给程序用。宜？',
      choices: [
        { t: '约束输出格式，并在程序侧校验解析', ok: true, why: 'schema / 重试。' },
        { t: '靠提高 temperature 让格式更「随机灵活」', ok: false, why: '更不稳定。' },
        { t: '禁止任何校验，直接 JSON.parse 裸用', ok: false, why: '易炸下游。' },
        { t: '改用 ICMP 传 JSON 给服务端', ok: false, why: '与结构化输出无关。' },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-tool-calling'],
    },
    {
      id: 'concept-ai-scenarios:subagent',
      q: '主助手把「搜文档」交给子代理，主要好处？',
      choices: [
        { t: '隔离上下文与工具面，主对话更干净', ok: true, why: '子任务上下文不污染主会话。' },
        { t: '一定更便宜且无 token 上限', ok: false, why: '子代理也可能更贵。' },
        { t: '可以取消子代理上的一切权限检查', ok: false, why: '子代理仍要 ACL。' },
        { t: '等于不再需要任何检索', ok: false, why: '搜文档子代理仍常要检索。' },
      ],
      relatedNodes: ['ai-subagent', 'ai-agent-planning'],
    },
  ],
});
