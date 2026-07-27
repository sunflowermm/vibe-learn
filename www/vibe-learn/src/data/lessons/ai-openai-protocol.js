/** Chat Completions 事实标准 */
export default `# Chat Completions 事实标准

> **时间线（约 2023 起）**：对话产品爆红后，开发者需要稳定的调用约定。  
> **\`POST /v1/chat/completions\` + \`messages\` 数组** 成为业界最广的 **事实标准**（不是 IETF RFC，而是生态锁定）。

## 时间线上的位置

上一课：对话产品让「会话」成默认隐喻。  
本课：会话如何变成 **可编程的 HTTP 契约**。  
下一课：模型如何在会话里 **结构化地请求调用工具**。

---

## 为什么诞生

\`\`\`match
{"title":"OpenAI 兼容协议","pairs":[{"id":"chat","left":"Chat Completions","right":"消息数组进，补全出"},{"id":"tools","left":"tools / function call","right":"结构化工具调用"},{"id":"compat","left":"兼容网关","right":"许多本地/云模型提供相似 API 形状"}]}
\`\`\`

| 痛点 | 说明 |
|------|------|
| **旧 Completions 太「散文」** | 单段 prompt 难表达多轮角色（系统/用户/助手） |
| **每个厂商一套方言** | 若各写各的，框架与网关要维护无穷适配器 |
| **生态需要「默认目标」** | LangChain 等框架必须先选一个最流行的形状来对接 |

Chat Completions 用 \`role + content\` 消息列表，天然贴合多轮聊天；  
OpenAI 先发 + 示例/SDK 海量 → 其它云与自托管（vLLM、Ollama、区域 API）纷纷提供 **OpenAI-compatible** 模式。

---

## 它有什么作用

| 作用 | 人话 |
|------|------|
| **统一线缆** | 换模型常只需改 \`base_url\` / \`api_key\` |
| **降低迁移成本** | 业务代码绑「形状」，不绑单一商标 |
| **养活网关** | 入口一种形状，背后翻译到各家原生 API |
| **成为 Agent 底座** | 工具调用、流式输出都长在这套会话模型上 |

\`\`\`mermaid
sequenceDiagram
  participant App as 你的后端
  participant API as 兼容端点
  App->>API: messages + model
  API-->>App: assistant 内容或流式 delta
\`\`\`

---

## 深入浅出

把它想成 **电源插头国标**：插座长得一样，后面发电机可以是不同品牌。  
「OpenAI-compatible」说的是 **插头**，不一定说背后模型是 OpenAI 训的。

| 词 | 含义 |
|----|------|
| messages | 多轮对话上下文 |
| system / user / assistant | 角色 |
| streaming | 一个字一个字推过来（体验像打字） |

本仓 LLM 工厂与聊天入口，多半围绕这套形状工作。

## 接到下一站

只会聊天还不够——下一课 **Function / Tool Calling**：让模型在回复里 **点名要执行哪个函数**。
`;
