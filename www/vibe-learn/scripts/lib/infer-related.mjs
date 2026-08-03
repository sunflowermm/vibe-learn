/**
 * 改编题 / 导图节点绑定：优先落到更细的 AI 全栈课，而不是一律 ai-rag。
 * @param {string} text
 * @returns {string[]}
 */
export function inferRelated(text) {
  const t = String(text || '');
  /** @type {string[]} */
  const hits = [];
  const push = (id) => {
    if (!hits.includes(id)) hits.push(id);
  };

  if (/chunk|分块|切分|overlapping|滑动窗/i.test(t)) push('ai-chunking');
  if (/hybrid|混合检索|BM25|关键词.?向量|稀疏.?稠密/i.test(t)) push('ai-hybrid-search');
  if (/rerank|重排|交叉编码|cross-?encoder/i.test(t)) push('ai-rerank');
  if (/vector.?db|向量库|Pinecone|Milvus|FAISS|Chroma|HNSW|ANN/i.test(t)) {
    push('ai-vector-store');
  }
  if (/eval|评测|nDCG|recall@|hit.?rate|黄金集|ground.?truth|回归集/i.test(t)) {
    push('ai-rag-eval');
  }
  if (/memory|记忆|scratchpad|工作记忆|长期记忆|会话记忆/i.test(t)) {
    push('ai-agent-memory');
  }
  if (/planning|规划|ReAct|plan.?and.?execute|反思|reflection|控制循环/i.test(t)) {
    push('ai-agent-planning');
  }
  if (/prompt.?inject|提示注入|越狱|jailbreak|guardrail|护栏|PII|越权/i.test(t)) {
    push('ai-prompt-security');
  }

  if (/RAG|检索增强|retrieve|检索片段/i.test(t)) push('ai-rag');
  if (/Agentic RAG|智能体式检索|多跳检索/i.test(t)) push('ai-agentic-rag');
  if (/Embedding|嵌入向量|向量化/i.test(t)) push('ai-embedding');
  if (/Agent|智能体|工具环|multi-?agent|多代理/i.test(t)) push('ai-agent-birth');
  if (/MCP|模型上下文协议|Model Context Protocol/i.test(t)) push('ai-mcp');
  if (/LangGraph|图编排|有向无环|DAG/i.test(t)) push('ai-agent-graph');
  if (/token|上下文窗口|context window|tokenizer|令牌/i.test(t)) push('ai-token-context');
  if (/Transformer|attention|注意力|self-attention|变换器/i.test(t)) push('ai-transformer');
  if (/微调|finetune|fine-?tun|LoRA|RLHF/i.test(t)) push('ai-finetune');
  if (/Chat Completions|OpenAI|会话补全|messages/i.test(t)) push('ai-openai-protocol');
  if (/对话产品|ChatGPT|产品化对话框/i.test(t)) push('ai-chat-era');
  if (/协议分层|A2A|自有接口/i.test(t)) push('ai-protocol-forks');
  if (/CLI|命令行智能体|终端面/i.test(t)) push('ai-cli');
  if (/上下文工程|context.?eng/i.test(t)) push('ai-rag-shift');
  if (/规则|AGENTS\.md|skills|技能/i.test(t)) {
    if (/AGENTS\.md/i.test(t)) push('ai-agents-md');
    if (/skill/i.test(t)) push('ai-skills');
    if (/规则|rules/i.test(t)) push('ai-rules');
  }
  if (/安全|权限|ACL|密钥|观测|日志|latency|成本|CI/i.test(t)) {
    if (/安全|权限|ACL|密钥|注入/i.test(t)) push('craft-security');
    if (/观测|日志|latency|成本|评测|CI/i.test(t)) push('craft-observability');
  }
  if (/XRK|AgentRuntime|Core 放码|办事助手|MCP 挂载/i.test(t)) {
    if (/MCP 挂载|挂载 MCP/i.test(t)) push('xrk-mcp-ops');
    else push('xrk-runtime');
  }
  if (/Vibe Coding|项目记忆/i.test(t)) push('adev-vibe-coding');
  if (/工具调用|tool call|function call/i.test(t)) push('ai-tool-calling');

  if (!hits.length) push('ai-llm-era');
  // 优先细粒度节点，最多 3 个
  const prefer = [
    'ai-chunking',
    'ai-hybrid-search',
    'ai-rerank',
    'ai-vector-store',
    'ai-rag-eval',
    'ai-agent-memory',
    'ai-agent-planning',
    'ai-prompt-security',
    'ai-embedding',
    'ai-rag',
    'ai-tool-calling',
    'ai-mcp',
    'ai-agent-birth',
    'ai-agent-graph',
    'ai-agentic-rag',
    'ai-rag-shift',
  ];
  hits.sort((a, b) => {
    const ia = prefer.indexOf(a);
    const ib = prefer.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  return hits.slice(0, 3);
}
