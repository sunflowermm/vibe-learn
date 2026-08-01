/**
 * 静态题库 · ai
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:ai:agent-tools:core",
    q: "模型说「该查库存」但没查；多步任务；不可信用户正文进窗——工程上要什么？",
    choices: [
      { t: "工具调用闭环（提议→执行→回灌）；控制循环+步数预算；不可信内容与工具副作用要隔离/ACL；会话接口与 MCP 等分层", ok: true, why: "Agent 段考点：循环、工具、协议、安全，合并成值班级一题。" },
      { t: "提示写「请查库」就会自动连库；循环可无限；用户正文可直接当系统规则", ok: false, why: "缺执行器/会空转/可注入。" },
      { t: "有 Chat Completions 就不需要工具协议", ok: false, why: "多步行动靠工具与编排。" },
      { t: "Agentic RAG 与经典 RAG 完全互斥", ok: false, why: "前者是循环里调检索。" },
    ],
    kind: "concept",
    domain: "ai",
    tags: ["场景","课核"],
    relatedNodes: ["ai-agent-birth","ai-tool-calling","ai-mcp","ai-agent-planning","ai-agent-memory","ai-agent-graph","ai-agentic-rag","ai-prompt-security","ai-openai-protocol","ai-protocol-forks"],
    source: 'static',
  },
  {
    id: "s:ai:rag-pipeline:core",
    q: "基于公司文档问答：切分、检索、融合、重排、存储、评测——哪条流水线直觉对？",
    choices: [
      { t: "合适分块→稀疏+向量混合召回→重排压 Top-N→向量库存嵌入与元数据→用指标评，而非感觉；经典 RAG 可不先上 Agent", ok: true, why: "检索段一次考完因果链；比八道单点名词更像方案评审。" },
      { t: "整库塞进系统提示；只微调不检索；BM25 与向量禁止一起用", ok: false, why: "爆窗/贵/丢互补。" },
      { t: "换嵌入模型不用重建索引；评测可全凭体感", ok: false, why: "要重建；要指标。" },
      { t: "有 RAG 就禁止工具与引用", ok: false, why: "常组合；引用可降幻觉。" },
    ],
    kind: "concept",
    domain: "ai",
    tags: ["场景","课核"],
    relatedNodes: ["ai-embedding","ai-rag","ai-chunking","ai-hybrid-search","ai-rerank","ai-vector-store","ai-rag-eval","ai-rag-shift"],
    source: 'static',
  },
  {
    id: "s:ai:rules-skills-ops:core",
    q: "助手越权改生产；主对话被噪音占满；项目要持久规则——规则/技能/子代理/AGENTS 怎么分工？微调是第一选择吗？",
    choices: [
      { t: "规则短硬护栏；技能管怎么做；子代理拆专项；AGENTS 分层落盘；多数先提示/检索/工具，微调不是默认第一步", ok: true, why: "产品化协作面合并考，压掉一堆「最该记住原则」口水题。" },
      { t: "规则越长越好；技能与规则可混同一文件无分工；一律先全参微调", ok: false, why: "淹没注意力；缺分工；成本高。" },
      { t: "CLI Agent 场景不存在；项目记忆只靠群聊口头约定", ok: false, why: "自动化/远程需要 CLI；要落盘。" },
      { t: "子代理用来替代所有权限模型", ok: false, why: "权限仍要 ACL/规则。" },
    ],
    kind: "concept",
    domain: "ai",
    tags: ["场景","课核"],
    relatedNodes: ["ai-rules","ai-skills","ai-subagent","ai-agents-md","ai-cli","ai-pi-agent","ai-adaptation","ai-finetune","ai-chat-era","adev-vibe-coding","adev-compare","adev-project-memory"],
    source: 'static',
  },
  {
    id: "s:ai:window-attn:core",
    q: "长提示「忘掉」规则；注意力在干什么；Transformer 是否唯一身子骨？",
    choices: [
      { t: "上下文窗口/token 预算会截断；注意力做相关加权；Transformer 是主流但非唯一架构", ok: true, why: "导读+窗口+骨干合并，避免七道「学完应抓住」。" },
      { t: "窗口无限；注意力保证事实正确；只有 Transformer 能做语言任务", ok: false, why: "三重误判。" },
      { t: "把规则粘贴 20 遍可突破窗口", ok: false, why: "仍占预算。" },
      { t: "模型类型不重要，提示一样用", ok: false, why: "类型影响接口与能力边界。" },
    ],
    kind: "concept",
    domain: "ai",
    tags: ["场景","课核"],
    relatedNodes: ["ai-what","ai-llm-era","ai-model-types","ai-token-context","ai-attention","ai-transformer","ai-arch-beyond"],
    source: 'static',
  }
];
