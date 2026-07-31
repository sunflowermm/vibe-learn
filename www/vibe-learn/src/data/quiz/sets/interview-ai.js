import { defineQuizSet } from '../schema.js';

/**
 * 开口：RAG 产品线——同模型、经典边界、路径分叉、排障、权限。
 * Embedding「建库 A / 查询 B 会怎样」留给 concept-ai-rag；此处考「怎么开口讲」。
 */
export default defineQuizSet({
  id: 'interview-ai-rag',
  title: '大厂 / 产品 · LLM 应用直觉',
  kind: 'interview',
  domain: 'ai',
  tags: ['AI', 'RAG', 'Embedding'],
  relatedNodes: ['ai-embedding', 'ai-rag', 'ai-rag-eval'],
  caption: '开口对齐：同模型、经典三步边界、差答优先查检索层、演示权限。',
  questions: [
    {
      id: 'interview-ai-rag:q1',
      q: '开口讲 Embedding 向量库时，建库与查询必须先强调哪一句？',
      choices: [
        {
          t: '建库与查询用同一套嵌入模型，向量才在同一语义空间里可比较',
          ok: true,
          why: '维度相同也不等于空间一致；换模型通常要整库重嵌。',
        },
        {
          t: '只要向量维度数字相同，就可以随意换不同厂商模型',
          ok: false,
          why: '维度相同不等于语义空间一致。',
        },
        {
          t: '每次查询随机换一个嵌入模型，可以平均误差、提高召回',
          ok: false,
          why: '随机换模型会让相似度失去意义。',
        },
        {
          t: 'Embedding 建库不需要模型，直接把原文 MD5 哈希当向量即可',
          ok: false,
          why: 'MD5 是摘要不是语义向量。',
        },
      ],
      relatedNodes: ['ai-embedding', 'ai-vector-store'],
    },
    {
      id: 'interview-ai-rag:q2',
      q: '经典检索增强生成（RAG）是否必须先搭好多步智能体（Agent）循环？',
      choices: [
        {
          t: '不必；经典 RAG 是检索→增强上下文→生成，可以没有 Agent 循环',
          ok: true,
          why: 'RAG 是知识增强流水线；Agent 是多步工具循环，可独立存在。',
        },
        {
          t: '必须先部署 MCP 服务器，否则 RAG 检索阶段无法运行',
          ok: false,
          why: 'MCP 是工具插接；RAG 检索不依赖 MCP。',
        },
        {
          t: '必须先精通所有 DSA leetcode 题，否则不能做 RAG',
          ok: false,
          why: 'RAG 是工程流水线，与刷题无直接前置。',
        },
        {
          t: 'RAG 等于 Agent 控制循环，两者是完全同一个东西',
          ok: false,
          why: '可组合但非同义。',
        },
      ],
      relatedNodes: ['ai-rag', 'ai-agentic-rag'],
    },
    {
      id: 'interview-ai-rag:q3',
      q: '本课程「路径 A（会用 Agent 写代码）」与「路径 B（LLM 应用/RAG）」应如何理解？',
      choices: [
        {
          t: '勿混成一门课；路径 B 走 LLM 应用章节，目标与 A 不同',
          ok: true,
          why: 'A 重工程协作写码；B 重 RAG/Embedding 等产品能力，可交叉但主线分开。',
        },
        {
          t: '两条路径完全等同，学 B 就不用审 diff 也不用跑验收',
          ok: false,
          why: '涉及代码改动时仍要工程卫生。',
        },
        {
          t: '路径 A 只学 RAG，路径 B 只学 Git，两者知识点零重叠',
          ok: false,
          why: '有交叉，但主线目标不同。',
        },
        {
          t: '路径 B 要求先放弃所有编程基础，只背模型名称即可',
          ok: false,
          why: '仍需要 API、配置、安全等工程概念。',
        },
      ],
      relatedNodes: ['ai-rag', 'ai-agent-birth'],
    },
    {
      id: 'interview-ai-rag:q4',
      q: 'RAG 系统检索结果质量差、答非所问时，应优先排查哪些环节？',
      choices: [
        {
          t: '文档切块策略、嵌入模型是否一致、召回数量与重排序（rerank）',
          ok: true,
          why: 'Many 差答在检索层；先查 chunk / embedding / topK / rerank，再怪生成模型。',
        },
        {
          t: '只把前端展示字号调大，用户看清字就会感觉答案变准',
          ok: false,
          why: 'UI 字号不影响检索召回。',
        },
        {
          t: '删掉向量库全部文档，文档越少检索越精准',
          ok: false,
          why: '删光文档等于无知识可检索。',
        },
        {
          t: '检索差一定是大语言模型参数太少，必须先 finetune 万亿参数',
          ok: false,
          why: '应先查检索层，再考虑换生成模型或微调。',
        },
      ],
      relatedNodes: ['ai-chunking', 'ai-hybrid-search', 'ai-rerank', 'ai-rag-eval'],
    },
    {
      id: 'interview-ai-rag:q5',
      q: '若把含私密内容的文档塞进对外公开演示的 RAG，最大风险是什么？',
      choices: [
        {
          t: '默认可被检索就等于可能暴露；需权限隔离、来源校验与访问控制',
          ok: true,
          why: '演示访客提问可能召回私密 chunk；Embedding 不会自动加密。',
        },
        {
          t: 'Embedding 向量会自动加密隐私，公开演示 RAG 无需任何权限设计',
          ok: false,
          why: 'Embedding 是语义编码，不是加密。',
        },
        {
          t: '向量库天然不可逆向，因此把机密文档入库也绝对零泄漏风险',
          ok: false,
          why: '检索命中即可把机密内容拼进 prompt 展示。',
        },
        {
          t: '只要用大上下文窗口的 LLM，私密文档就不会被检索到',
          ok: false,
          why: '窗口大小与是否检索到私密文档无关。',
        },
      ],
      relatedNodes: ['ai-prompt-security', 'ai-vector-store', 'craft-security'],
    },
  ],
});
