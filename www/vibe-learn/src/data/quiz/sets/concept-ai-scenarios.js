import { defineQuizSet } from '../schema.js';

/** 场景 · AI 产品落地（大厂口径，选项等长） */
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
      q: '把整份制度 PDF 粘进提示做问答。风险？',
      choices: [
        { t: '易爆窗且贵噪音大', ok: true, why: '应检索注入。' },
        { t: '一定比 RAG 更准', ok: false, why: '常相反。' },
        { t: '温度会自动降幻觉', ok: false, why: '温度不管依据。' },
        { t: '无需任何权限控制', ok: false, why: '仍有泄密面。' },
      ],
      relatedNodes: ['ai-rag', 'ai-token-context'],
    },
    {
      id: 'concept-ai-scenarios:rebuild',
      q: '换了嵌入模型后旧向量库直接查？',
      choices: [
        { t: '应重建索引再查询', ok: true, why: '空间变了。' },
        { t: '维度同就可直接用', ok: false, why: '空间未必同。' },
        { t: '只要加温即可对齐', ok: false, why: '无关。' },
        { t: '删掉评测就能用', ok: false, why: '无关。' },
      ],
      relatedNodes: ['ai-embedding', 'ai-vector-store'],
    },
    {
      id: 'concept-ai-scenarios:keyword',
      q: '用户常搜精确货号，纯向量不够。可加？',
      choices: [
        { t: '稀疏检索做混合召回', ok: true, why: 'BM25 等补精确。' },
        { t: '禁止一切关键词', ok: false, why: '丢掉精确匹配。' },
        { t: '只靠提高温度', ok: false, why: '不修检索。' },
        { t: '关掉重排即可', ok: false, why: '可能更糟。' },
      ],
      relatedNodes: ['ai-hybrid-search', 'ai-rag'],
    },
    {
      id: 'concept-ai-scenarios:topn',
      q: '召回 50 段塞进提示，模型更糊。宜？',
      choices: [
        { t: '重排压缩到少量 Top', ok: true, why: '控噪音与窗口。' },
        { t: '再翻倍召回到 200', ok: false, why: '噪音更大。' },
        { t: '取消系统规则', ok: false, why: '更失控。' },
        { t: '禁止引用片段', ok: false, why: '更难核对。' },
      ],
      relatedNodes: ['ai-rerank', 'ai-rag'],
    },
    {
      id: 'concept-ai-scenarios:eval',
      q: '上线 RAG 要知道变好变坏，最少？',
      choices: [
        { t: '固定题集+检索/答案指标', ok: true, why: '可回归。' },
        { t: '只凭体感换模型', ok: false, why: '不可比。' },
        { t: '禁止保存任何样本', ok: false, why: '无法评测。' },
        { t: '只看响应延迟', ok: false, why: '不管正确性。' },
      ],
      relatedNodes: ['ai-rag-eval', 'ai-rag'],
    },
    {
      id: 'concept-ai-scenarios:write',
      q: 'Agent 要写数据库，上线前必须？',
      choices: [
        { t: '鉴权、审计与干跑/沙箱', ok: true, why: '副作用可控。' },
        { t: '默认对生产可写', ok: false, why: '事故高发。' },
        { t: '用户一句话即可提权', ok: false, why: '注入面。' },
        { t: '关掉全部日志', ok: false, why: '无法追责。' },
      ],
      relatedNodes: ['ai-tool-calling', 'ai-prompt-security', 'ai-mcp'],
    },
    {
      id: 'concept-ai-scenarios:cache',
      q: '相同系统提示反复打高价 API，工程上？',
      choices: [
        { t: '提示缓存/复用前缀', ok: true, why: '降重复计费。' },
        { t: '每次随机重写系统规', ok: false, why: '更贵更不稳。' },
        { t: '取消一切超时', ok: false, why: '无关。' },
        { t: '改成 UDP 调用', ok: false, why: '无关。' },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-token-context'],
    },
    {
      id: 'concept-ai-scenarios:multi',
      q: '客服只要查订单状态，架构上？',
      choices: [
        { t: '单工具链通常足够', ok: true, why: '别过度多智能体。' },
        { t: '必须上十个智能体', ok: false, why: '过重。' },
        { t: '禁止使用任何工具', ok: false, why: '查不到实时态。' },
        { t: '先全参微调再上线', ok: false, why: '非必要第一步。' },
      ],
      relatedNodes: ['ai-agent-birth', 'ai-tool-calling'],
    },
    {
      id: 'concept-ai-scenarios:pii',
      q: '日志里把用户身份证原文留给模型排障。问题？',
      choices: [
        { t: '敏感数据泄密风险', ok: true, why: '要脱敏与最小化。' },
        { t: '一定提升回答质量', ok: false, why: '不值得泄密。' },
        { t: '等于完成了鉴权', ok: false, why: '无关。' },
        { t: '可以替代 ACL', ok: false, why: '不能。' },
      ],
      relatedNodes: ['ai-prompt-security', 'ai-rag'],
    },
    {
      id: 'concept-ai-scenarios:offline',
      q: '知识库昨晚更新，今天仍答旧版。先查？',
      choices: [
        { t: '索引/语料是否已刷新', ok: true, why: 'RAG 链路同步。' },
        { t: '只把温度调低', ok: false, why: '不更新知识。' },
        { t: '一定是注意力坏了', ok: false, why: '先查数据面。' },
        { t: '禁止重建索引', ok: false, why: '可能正需要重建。' },
      ],
      relatedNodes: ['ai-vector-store', 'ai-rag'],
    },
    {
      id: 'concept-ai-scenarios:json',
      q: '要模型输出可解析 JSON 给程序用。宜？',
      choices: [
        { t: '约束格式并校验解析', ok: true, why: 'schema/重试。' },
        { t: '靠提高温度更随机', ok: false, why: '更不稳定。' },
        { t: '禁止任何校验', ok: false, why: '易炸下游。' },
        { t: '改用 ICMP 传 JSON', ok: false, why: '无关。' },
      ],
      relatedNodes: ['ai-openai-protocol', 'ai-tool-calling'],
    },
    {
      id: 'concept-ai-scenarios:subagent',
      q: '主助手把「搜文档」交给子代理，好处？',
      choices: [
        { t: '隔离上下文与工具面', ok: true, why: '主对话更干净。' },
        { t: '一定更便宜无上限', ok: false, why: '也可能更贵。' },
        { t: '可取消一切权限', ok: false, why: '子代理仍要 ACL。' },
        { t: '等于不再需要检索', ok: false, why: '仍常要检索。' },
      ],
      relatedNodes: ['ai-subagent', 'ai-agent-planning'],
    },
  ],
});
