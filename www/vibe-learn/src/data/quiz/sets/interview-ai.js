import { defineQuizSet } from '../schema.js';

/**
 * 大厂 · LLM 应用直觉（场景决策）
 * mcq-expert：一题一事、选项等长
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
      q: '长规则贴进提示后前面约束丢失。常见因？',
      choices: [
        { t: '上下文窗口被截断', ok: true, why: 'token 预算有限。' },
        { t: '窗口工程可无限', ok: false, why: '有硬上限。' },
        { t: '注意力永不丢规则', ok: false, why: '≠无限记忆。' },
        { t: '温度 0 就不截断', ok: false, why: '温度不改长度。' },
      ],
      relatedNodes: ['ai-token-context', 'ai-what'],
    },
    {
      id: 'interview-ai-rag:embed',
      q: '向量库建库与查询，必须先强调？',
      choices: [
        { t: '同一套嵌入模型', ok: true, why: '同空间才可比较。' },
        { t: '维度相同可换厂', ok: false, why: '空间未必一致。' },
        { t: '每次查询随机换模', ok: false, why: '相似度失意义。' },
        { t: 'MD5 当语义向量', ok: false, why: '摘要≠嵌入。' },
      ],
      relatedNodes: ['ai-embedding', 'ai-vector-store'],
    },
    {
      id: 'interview-ai-rag:rag',
      q: '公司文档问答，比整库塞提示更稳？',
      choices: [
        { t: '分块索引再检索注入', ok: true, why: '经典 RAG。' },
        { t: '整库一次塞进提示', ok: false, why: '易爆窗。' },
        { t: '先全参微调永不检索', ok: false, why: '贵且难热更新。' },
        { t: '禁止向量只靠手贴', ok: false, why: '无法规模化。' },
      ],
      relatedNodes: ['ai-rag', 'ai-chunking'],
    },
    {
      id: 'interview-ai-rag:chunk',
      q: '分块过大或过小，典型代价？',
      choices: [
        { t: '过大噪音，过小丢语境', ok: true, why: '块大小是关键旋钮。' },
        { t: '块大小完全无影响', ok: false, why: '影响召回。' },
        { t: '越大一定越好', ok: false, why: '易引入无关。' },
        { t: '越小一定越好', ok: false, why: '易切断语义。' },
      ],
      relatedNodes: ['ai-chunking', 'ai-rag'],
    },
    {
      id: 'interview-ai-rag:bad',
      q: 'RAG 答非所问，优先先查？',
      choices: [
        { t: '检索是否召回对文档', ok: true, why: '差答先查检索层。' },
        { t: '先全参微调基座', ok: false, why: '常非根因。' },
        { t: '先把温度调到 2', ok: false, why: '更随机。' },
        { t: '先关掉所有评测', ok: false, why: '失去信号。' },
      ],
      relatedNodes: ['ai-rag-eval', 'ai-rag'],
    },
    {
      id: 'interview-ai-rag:hybrid',
      q: '稀疏+向量召回很杂，下一步？',
      choices: [
        { t: '融合后重排 Top-N', ok: true, why: '混合+重排可控。' },
        { t: 'BM25 禁止配向量', ok: false, why: '常互补。' },
        { t: '换模后永不重建', ok: false, why: '要重建索引。' },
        { t: '有 RAG 禁止引用', ok: false, why: '引用利于核对。' },
      ],
      relatedNodes: ['ai-hybrid-search', 'ai-rerank'],
    },
    {
      id: 'interview-ai-rag:ft',
      q: '知识常变的内部文档问答，更优先？',
      choices: [
        { t: 'RAG/检索增强优先', ok: true, why: '语料可热更新。' },
        { t: '一上来全参微调', ok: false, why: '贵且慢。' },
        { t: '禁止任何检索', ok: false, why: '缺依据。' },
        { t: '只调温度不碰知识', ok: false, why: '温度不注事实。' },
      ],
      relatedNodes: ['ai-finetune', 'ai-rag'],
    },
    {
      id: 'interview-ai-rag:hallu',
      q: '模型编造不存在的接口。工程上？',
      choices: [
        { t: '检索/工具约束再生成', ok: true, why: '靠依据降幻觉。' },
        { t: '把温度调到最高', ok: false, why: '更发散。' },
        { t: '禁止一切评测', ok: false, why: '无法量化。' },
        { t: '认为窗口无限就好', ok: false, why: '不解决无依据。' },
      ],
      relatedNodes: ['ai-what', 'ai-rag'],
    },
    {
      id: 'interview-ai-rag:attn',
      q: '注意力机制主要在做什么？',
      choices: [
        { t: '按相关性加权聚合', ok: true, why: '不保证事实正确。' },
        { t: '保证输出永远正确', ok: false, why: '仍会幻觉。' },
        { t: '证明只有它能 NLP', ok: false, why: '还有其他路线。' },
        { t: '自动删除提示密钥', ok: false, why: '无此能力。' },
      ],
      relatedNodes: ['ai-attention', 'ai-transformer'],
    },
    {
      id: 'interview-ai-rag:cite',
      q: '对内知识问答要可核对，生成侧宜？',
      choices: [
        { t: '要求引用检索片段', ok: true, why: '可追溯、降瞎编。' },
        { t: '禁止出现任何引用', ok: false, why: '更难核对。' },
        { t: '只靠提高温度', ok: false, why: '不增加依据。' },
        { t: '关掉检索只靠背', ok: false, why: '易幻觉。' },
      ],
      relatedNodes: ['ai-rag', 'ai-rag-eval'],
    },
  ],
});
