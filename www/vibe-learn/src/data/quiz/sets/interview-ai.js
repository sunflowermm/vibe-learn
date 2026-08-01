import { defineQuizSet } from '../schema.js';

/**
 * 开口：RAG 产品线。命题：mcq-expert。
 */
export default defineQuizSet({
  id: 'interview-ai-rag',
  title: '大厂 / 产品 · LLM 应用直觉',
  kind: 'interview',
  domain: 'ai',
  tags: ['AI', 'RAG', 'Embedding'],
  relatedNodes: ['ai-embedding', 'ai-rag', 'ai-rag-eval'],
  caption: '开口对齐：同模型、经典边界、差答优先查检索层、演示权限。',
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
          t: '每次查询随机换一个嵌入模型，可以平均误差',
          ok: false,
          why: '随机换模型会让相似度失去意义。',
        },
        {
          t: 'Embedding 建库不需要模型，直接把原文 MD5 当向量即可',
          ok: false,
          why: 'MD5 是摘要不是语义向量。',
        },
      ],
      relatedNodes: ['ai-embedding', 'ai-vector-store'],
    },
    {
      id: 'interview-ai-rag:q2',
      q: '经典 RAG 是否必须先搭好多步 Agent 循环？',
      choices: [
        {
          t: '不必；经典 RAG 是检索→增强→生成，可以没有 Agent 循环',
          ok: true,
          why: 'RAG 是知识增强流水线；Agent 是多步工具循环。',
        },
        {
          t: '必须先部署 MCP，否则检索无法运行',
          ok: false,
          why: 'MCP 是工具插接；RAG 不依赖 MCP。',
        },
        {
          t: '必须先刷完所有 DSA 题才能做 RAG',
          ok: false,
          why: '无此前置。',
        },
        {
          t: 'RAG 等于 Agent 控制循环',
          ok: false,
          why: '可组合但非同义。',
        },
      ],
      relatedNodes: ['ai-rag', 'ai-agentic-rag'],
    },
    {
      id: 'interview-ai-rag:q3',
      q: '本课程「路径 A（Agent 写代码）」与「路径 B（LLM 应用/RAG）」应如何理解？',
      choices: [
        {
          t: '勿混成一门课；路径 B 走 LLM 应用章节，目标与 A 不同',
          ok: true,
          why: 'A 重工程协作写码；B 重 RAG/Embedding 等产品能力。',
        },
        {
          t: '两条路径完全等同，学 B 就不用审 diff',
          ok: false,
          why: '涉及代码改动时仍要工程卫生。',
        },
        {
          t: '路径 A 只学 RAG，路径 B 只学 Git',
          ok: false,
          why: '主线目标不同，但有交叉。',
        },
        {
          t: '路径 B 要求放弃所有编程基础，只背模型名',
          ok: false,
          why: '仍需要 API、配置、安全等工程概念。',
        },
      ],
      relatedNodes: ['ai-rag', 'ai-agent-birth'],
    },
    {
      id: 'interview-ai-rag:q4',
      q: 'RAG 系统答非所问时，应优先排查哪一层？',
      choices: [
        {
          t: '检索层：切块、嵌入是否一致、召回数量与重排',
          ok: true,
          why: 'Many 差答在检索层；先查 chunk / embedding / topK / rerank。',
        },
        {
          t: '只把前端字号调大',
          ok: false,
          why: 'UI 不影响召回。',
        },
        {
          t: '删掉向量库全部文档',
          ok: false,
          why: '删光等于无知识。',
        },
        {
          t: '一定是参数太少，必须先 finetune 万亿模型',
          ok: false,
          why: '应先查检索层。',
        },
      ],
      relatedNodes: ['ai-chunking', 'ai-hybrid-search', 'ai-rerank', 'ai-rag-eval'],
    },
    {
      id: 'interview-ai-rag:q5',
      q: '把含私密内容的文档塞进对外公开演示的 RAG，最大风险是？',
      choices: [
        {
          t: '默认可被检索就等于可能暴露；需权限隔离与访问控制',
          ok: true,
          why: '演示访客提问可能召回私密 chunk。',
        },
        {
          t: 'Embedding 会自动加密隐私，无需权限设计',
          ok: false,
          why: 'Embedding 不是加密。',
        },
        {
          t: '向量不可逆向，入库即零泄漏',
          ok: false,
          why: '检索命中即可把机密拼进 prompt。',
        },
        {
          t: '只要用大窗口模型，私密文档就不会被检索到',
          ok: false,
          why: '窗口大小与是否检索到无关。',
        },
      ],
      relatedNodes: ['ai-prompt-security', 'ai-vector-store', 'craft-security'],
    },
    {
      id: 'interview-ai-rag:q6',
      q: '面试被问「内部 Wiki 该用 RAG 还是微调？」最稳的开场是？',
      choices: [
        {
          t: '默认 RAG：保新鲜、可引用、可做权限；风格/固定技能再考虑微调',
          ok: true,
          why: '私有、常变知识更适合检索。',
        },
        {
          t: '一律先全参微调，检索是过时技术',
          ok: false,
          why: '成本高且难以及时更新。',
        },
        {
          t: '两者互斥，用了 RAG 就不能再微调',
          ok: false,
          why: '可组合。',
        },
        {
          t: 'Wiki 应整库塞进 system 提示一次',
          ok: false,
          why: '易爆窗且难权限过滤。',
        },
      ],
      relatedNodes: ['ai-rag', 'ai-finetune', 'ai-adaptation'],
    },
    {
      id: 'interview-ai-rag:q7',
      q: '用户搜精确错误码「E1042」，哪种检索最可靠？',
      choices: [
        {
          t: '关键词 / BM25（常放在混合检索里）',
          ok: true,
          why: '错误码是字面强信号。',
        },
        {
          t: '只靠语义向量并删掉错误码',
          ok: false,
          why: '删掉最强字面信号。',
        },
        {
          t: '只靠更大参数量模型的预训练记忆',
          ok: false,
          why: '内部错误码往往不在训练数据里。',
        },
        {
          t: '关掉检索，调高 temperature',
          ok: false,
          why: '采样不替代检索。',
        },
      ],
      relatedNodes: ['ai-hybrid-search', 'ai-embedding'],
    },
    {
      id: 'interview-ai-rag:q8',
      q: '开口讲「有据胡说」时，想表达什么？',
      choices: [
        {
          t: '检索已召回材料，但生成仍可能无视证据编造',
          ok: true,
          why: '所以要测忠实度与引用，不只看 Recall。',
        },
        {
          t: '向量库磁盘坏了',
          ok: false,
          why: '是生成忠实度问题。',
        },
        {
          t: 'HTTP 401',
          ok: false,
          why: '鉴权问题，不是「有据胡说」。',
        },
        {
          t: '分块重叠设得太小',
          ok: false,
          why: '重叠影响边界，不是此术语本意。',
        },
      ],
      relatedNodes: ['ai-rag-eval', 'ai-rerank'],
    },
  ],
});
