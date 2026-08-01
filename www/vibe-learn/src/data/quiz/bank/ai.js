/**
 * 静态题库 · ai
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:ai:attention-role:core",
    q: "Transformer 里「注意力」主要在做什么？",
    choices: [
      { t: "按相关性对表示做加权聚合", ok: true, why: "注意力是相关加权，不是事实正确性保证，也不是唯一架构。" },
      { t: "保证输出事实永远正确", ok: false, why: "仍会幻觉，需检索/工具等。" },
      { t: "证明只有 Transformer 能做语言任务", ok: false, why: "还有其他架构路线。" },
      { t: "自动把私有密钥从提示里删除", ok: false, why: "无此安全能力。" },
    ],
    kind: "concept",
    domain: "ai",
    tags: ["场景","课核"],
    relatedNodes: ["ai-attention","ai-transformer","ai-arch-beyond"],
    source: 'static',
  },
  {
    id: "s:ai:context-window:core",
    q: "把很长的规则贴进提示后，模型「忘掉」前面约束。最常见的工程解释是？",
    choices: [
      { t: "上下文窗口/token 预算有限，超出被截断或挤掉", ok: true, why: "窗口不是无限的；靠粘贴 20 遍无法突破预算。" },
      { t: "模型窗口在工程上可视为无限", ok: false, why: "实际有硬预算。" },
      { t: "注意力机制保证永远不丢规则", ok: false, why: "注意力不提供无限记忆。" },
      { t: "只要温度调到 0 就不会截断", ok: false, why: "温度不改变上下文长度。" },
    ],
    kind: "concept",
    domain: "ai",
    tags: ["场景","课核"],
    relatedNodes: ["ai-token-context","ai-what","ai-llm-era"],
    source: 'static',
  },
  {
    id: "s:ai:hybrid-rerank:core",
    q: "文档问答里，稀疏检索与向量检索结果很杂。下一步更合理的是？",
    choices: [
      { t: "融合召回后做重排，压到可评估的 Top-N，并用指标评测", ok: true, why: "混合召回 + 重排 + 评测，比纯体感换模型更可控。" },
      { t: "BM25 与向量禁止一起用", ok: false, why: "二者常互补。" },
      { t: "换嵌入模型后索引可永不重建", ok: false, why: "嵌入空间变了通常要重建。" },
      { t: "有 RAG 就禁止引用片段", ok: false, why: "引用有助于降幻觉与核对。" },
    ],
    kind: "concept",
    domain: "ai",
    tags: ["场景","课核"],
    relatedNodes: ["ai-hybrid-search","ai-rerank","ai-rag-eval","ai-rag"],
    source: 'static',
  },
  {
    id: "s:ai:prompt-isolate:core",
    q: "不可信用户正文进入上下文，还可能触发工具副作用。工程上应优先做什么？",
    choices: [
      { t: "隔离不可信内容与系统规则，并对工具施加 ACL/预算", ok: true, why: "提示注入与工具滥用要靠边界与权限，而不是无限循环。" },
      { t: "让代理循环步数不设上限", ok: false, why: "易空转与成本爆炸。" },
      { t: "用户正文可以直接覆盖系统规则", ok: false, why: "典型注入面。" },
      { t: "关掉所有日志以免泄密就够了", ok: false, why: "不替代 ACL 与隔离。" },
    ],
    kind: "concept",
    domain: "ai",
    tags: ["场景","课核"],
    relatedNodes: ["ai-prompt-security","ai-agent-planning","ai-agent-memory"],
    source: 'static',
  },
  {
    id: "s:ai:rag-first:core",
    q: "要做「基于公司文档问答」，比把整库塞进系统提示更稳妥的第一步是？",
    choices: [
      { t: "合适分块并建立可检索索引（再召回注入）", ok: true, why: "经典 RAG：切分→嵌入/索引→检索，避免爆窗与噪音。" },
      { t: "整库粘进系统提示一次塞完", ok: false, why: "易爆窗且贵。" },
      { t: "先做全参微调，永远不要检索", ok: false, why: "多数场景检索更便宜可迭代。" },
      { t: "禁止使用向量库，只靠人工复制粘贴", ok: false, why: "无法规模化。" },
    ],
    kind: "concept",
    domain: "ai",
    tags: ["场景","课核"],
    relatedNodes: ["ai-rag","ai-chunking","ai-embedding","ai-vector-store"],
    source: 'static',
  },
  {
    id: "s:ai:rules-vs-skills:core",
    q: "助手越权改生产环境时，规则（rules）与技能（skills）更合理的分工是？",
    choices: [
      { t: "规则给短硬护栏；技能描述「怎么做」的流程与细则", ok: true, why: "护栏与操作手册分离，避免一锅粥淹没注意力。" },
      { t: "规则越长越好，技能可省略", ok: false, why: "长规则易淹没关键约束。" },
      { t: "规则与技能应混成同一无结构文件且无分工", ok: false, why: "缺分工难维护。" },
      { t: "一律先全参微调替代规则与技能", ok: false, why: "成本高，多数场景非第一步。" },
    ],
    kind: "concept",
    domain: "ai",
    tags: ["场景","课核"],
    relatedNodes: ["ai-rules","ai-skills","ai-agents-md","ai-subagent","adev-project-memory"],
    source: 'static',
  },
  {
    id: "s:ai:tool-loop:core",
    q: "模型回复「该查库存」，但系统里没有任何查库动作发生。缺的是什么？",
    choices: [
      { t: "工具调用闭环：提议 → 执行器执行 → 结果回灌模型", ok: true, why: "只写「请查库」不会自动连库；要有工具协议与执行器。" },
      { t: "再把「请查库」在提示里重复十遍即可", ok: false, why: "缺少执行器仍不会连库。" },
      { t: "有 Chat Completions 就不需要工具协议", ok: false, why: "多步行动依赖工具与编排。" },
      { t: "把用户原文直接当系统规则即可查库", ok: false, why: "既不安全也未形成工具闭环。" },
    ],
    kind: "concept",
    domain: "ai",
    tags: ["场景","课核"],
    relatedNodes: ["ai-tool-calling","ai-agent-birth","ai-openai-protocol","ai-mcp"],
    source: 'static',
  }
];
