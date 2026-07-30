import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'interview-ai-rag',
  title: '大厂 / 产品 · LLM 应用直觉',
  kind: 'interview',
  domain: 'ai',
  tags: ['AI', 'RAG', 'Embedding'],
  relatedNodes: ['ai-embedding', 'ai-rag', 'ai-agents-md'],
  questions: [
    {
      q: '做 Embedding 向量库时，建库（入库）与查询（检索）必须满足什么条件？',
      choices: [
        { t: '使用同一套嵌入模型，保证向量处在同一语义空间里可对齐比较', ok: true, why: 'Embedding 课：换模型即使维度相同，向量空间也可能不对齐，相似度失真。' },
        { t: '只要向量维度数字相同（如都是 1536），就可以随意换不同厂商模型', ok: false, why: '维度相同不等于语义空间一致；建库与查询必须用同一 embedding 模型。' },
        { t: '每次查询随机换一个嵌入模型，可以平均误差、提高召回', ok: false, why: '随机换模型会让相似度失去意义，检索质量更差而非更好。' },
        { t: 'Embedding 建库不需要模型，直接把原文 MD5 哈希当向量即可', ok: false, why: 'MD5 是摘要不是语义向量；Embedding 需要神经网络编码语义相似性。' },
      ],
    },
    {
      q: '经典检索增强生成（RAG）是否必须先搭好多步智能体（Agent）循环？',
      choices: [
        { t: '不必；经典 RAG 是检索→增强上下文→生成，可以没有 Agent 循环', ok: true, why: 'RAG 课：RAG 是知识增强流水线；Agent 是多步工具循环，层次不同可独立存在。' },
        { t: '必须先部署 MCP 服务器，否则 RAG 检索阶段无法运行', ok: false, why: 'MCP 是工具插接协议；RAG 检索用向量库/API，不依赖 MCP。' },
        { t: '必须先精通所有 DSA leetcode 题，否则不能做 RAG', ok: false, why: 'RAG 是工程流水线概念，与刷题无直接前置关系。' },
        { t: 'RAG 等于 Agent 控制循环，两者是完全同一个东西', ok: false, why: 'RAG 侧重检索增强；Agent 侧重多步决策与工具，可组合但非同义。' },
      ],
    },
    {
      q: '本课程「路径 A（会用 Agent 写代码）」与「路径 B（LLM 应用/RAG）」应如何理解？',
      choices: [
        { t: '勿混成一门课；路径 B 走 LLM 应用章节，目标与 A 不同', ok: true, why: '课程分叉：A 重工程协作写码；B 重 RAG/Embedding 等产品能力，可交叉但主线分开。' },
        { t: '两条路径完全等同，学 B 就不用审 diff 也不用跑验收', ok: false, why: '即学 LLM 应用，涉及代码改动时仍要工程卫生；B 不是「只聊天不写码」。' },
        { t: '路径 A 只学 RAG，路径 B 只学 Git，两者知识点零重叠', ok: false, why: '有交叉（如 AGENTS.md、工程边界），但主线目标不同。' },
        { t: '路径 B 要求先放弃所有编程基础，只背模型名称即可', ok: false, why: 'LLM 应用仍需要基本工程概念（API、配置、安全），不是纯背名词。' },
      ],
    },
    {
      q: 'RAG 系统检索结果质量差、答非所问时，应优先排查哪些环节？',
      choices: [
        { t: '文档切块策略、嵌入模型是否一致、召回数量与重排序（rerank）', ok: true, why: 'RAG 实务：chunk 太大/太小、模型不对齐、topK 过小或缺 rerank 都常见。' },
        { t: '只把前端展示字号调大，用户看清字就会感觉答案变准', ok: false, why: 'UI 字号不影响检索召回；应查向量检索与 chunk 质量。' },
        { t: '删掉向量库全部文档，文档越少检索越精准', ok: false, why: '删光文档等于无知识可检索，只会更无法回答。' },
        { t: '检索差一定是大语言模型（LLM）参数太少，必须先 finetune 万亿参数', ok: false, why: 'Many RAG 问题在检索层；应先查 chunk/embedding/recall，再考虑换生成模型。' },
      ],
    },
    {
      q: '若把含私密内容的文档塞进对外公开演示的 RAG，最大风险是什么？',
      choices: [
        { t: '默认可被检索就等于可能暴露；需权限隔离、来源校验与访问控制', ok: true, why: '安全边界：演示环境访客提问可能召回私密 chunk；Embedding 不会自动加密。' },
        { t: 'Embedding 向量会自动加密隐私，公开演示 RAG 无需任何权限设计', ok: false, why: 'Embedding 是语义编码，不是加密；有权限的检索仍能返回敏感片段。' },
        { t: '向量库天然不可逆向，因此把机密文档入库也绝对零泄漏风险', ok: false, why: '向量可近似还原语义；检索命中即可能把机密内容拼进 prompt 展示。' },
        { t: '只要用大上下文窗口的 LLM，私密文档就不会被检索到', ok: false, why: '窗口大小与是否检索到私密文档无关；权限隔离才是正道。' },
      ],
    },
  ],
});
