export default `# 会话补全接口

> **本课位置**：改参与接口段。先修：对话产品化。  
> **文献锚点**：[OpenAI Chat Completions](https://developers.openai.com/api/reference/chat-completions/overview)——\`messages\` + \`role\`；业界 **OpenAI 兼容**端点同形。较新模型亦见 \`developer\` 角色（高优先级开发者说明）。  
> **下一课**：检索增强生成（经典流水线**不依赖**智能体）；再往后才是工具调用。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 接口 | 能说明 messages 列表与 system/user/assistant/tool |
| 边界 | 协议形状 ≠ 某一个厂商永久垄断 |
| 本仓 | Factory/工作流按消息列表组装 |
| 跟 Agent | 联调时贴角色分层与工具消息，勿只贴最终一句 |

\`\`\`algo
{"kind":"msgroles","title":"Chat Completions · 角色栈","autoplay":true,"speed":780}
\`\`\`

\`\`\`check
{"title":"会话接口通关","items":[{"id":"shape","text":"能写出 POST …/chat/completions + messages[]","hint":"事实标准"},{"id":"roles","text":"能解释 system/user/assistant/tool 各干什么","hint":"角色"},{"id":"compat","text":"知道兼容端点=形状像，发电机可不同","hint":"本仓 Factory"}]}
\`\`\`

## 定义

**会话补全（Chat Completions）** = 以 **消息列表（messages）** 表达多轮对话的 HTTP 调用形状。  
业界最常见入口形如 \`POST /v1/chat/completions\`。  
它是**事实标准**（生态锁定），不是某份国际正式标准文本。

| 字段直觉 | 含义 |
|----------|------|
| \`messages\` | 多轮上下文：每条有角色与内容 |
| \`system\` / \`developer\` | 开发者说明 / 人设（优先级通常高于 user） |
| \`user\` | 终端用户输入 |
| \`assistant\` | 模型已生成的回复（含可选 tool_calls） |
| \`tool\` | 工具执行结果回灌（配合 \`tool_call_id\`） |
| \`tools\` | 可选：工具菜单（下一课起展开） |
| 流式输出 | 内容按增量推送（体验像打字） |

**OpenAI 兼容**：插座长得像这套形状；背后发电机可以是不同厂商或本地推理引擎。

\`\`\`match
{"title":"会话接口","pairs":[{"id":"chat","left":"会话补全","right":"消息数组进，补全出"},{"id":"tools","left":"工具字段","right":"结构化工具调用"},{"id":"compat","left":"兼容端点","right":"许多云与本地提供相似形状"},{"id":"sys","left":"system/developer","right":"应用侧硬约束与人设"}]}
\`\`\`

---

## 为什么需要统一形状

| 痛点 | 说明 |
|------|------|
| 各家私有 SDK 难换 | 换厂商=重写调用层 |
| 多轮与工具难表达 | 纯字符串补全不够 |
| 观测与计费 | 统一消息结构便于日志与 token 统计 |

---

## 和本仓三层消息的关系

OpenAI 角色是**传输形状**；本仓还有**工程组装契约**（稳定系统层 / 易变层 / 用户与工具）：

| OpenAI 角色 | 本仓直觉 |
|-------------|----------|
| system / developer | 人设、协议、工作区说明（宜稳，利于 KV Cache） |
| user | 本轮用户；易变信息（如当前时间）可单独成条 |
| assistant | 历史助手回复；可含 tool_calls |
| tool | 工具结果；过旧可投影压缩（toolPair） |

真源：\`docs/agent-context.md\` · 第四章 **对话管线**。

\`\`\`quiz
{"title":"会话补全","questions":[{"q":"Chat Completions 的核心输入形状是？","choices":[{"t":"一张图片 URL 列表","ok":false,"why":"多模态另论；核心仍是消息。"},{"t":"带 role 的 messages 数组","ok":true,"why":"会话补全的事实标准。"},{"t":"只传一个巨大 system 字符串、无角色","ok":false,"why":"丢失多轮与工具语义。"}]}]}
\`\`\`

---

## 本仓怎么做

| 行为 | 落点 |
|------|------|
| 创建客户端 | 第四章 **Factory** · \`*_llm\` / \`ai-workflow\` |
| 组装 messages | \`assembleChatLlmMessages\` |
| 兼容多 Provider | 统一消息形状，换 model / baseURL |
| 联调排错 | 贴完整 messages（含 tool），勿只贴最后一句 |

## 下一课

知识外挂——**检索增强生成（RAG）**。
`;
