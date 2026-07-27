/** Stream / AiWorkflow · 对齐 ai-workflow · 链 factory/mcp */
export default `# Stream 业务层 · AiWorkflow

> 对话型 AI 能力落在 **工作流（workflow，常称 stream）**：  
> 收消息 → 组上下文 → 经 **LLMFactory** 调模型 →（可选）**MCP 工具**循环 → 返回结果。  
> 真源：\`docs/ai-workflow.md\`；基类契约：\`docs/base-classes.md\`。

## 本课你要带走什么
\`\`\`quiz
{"title":"Stream 自测","questions":[{"q":"Stream 课主要帮你建立什么？","choices":[{"t":"流式输出/推送在本仓的位置与心智","ok":true,"why":"对接实时与长响应。"},{"t":"替换 TCP","ok":false,"why":"仍在应用层。"},{"t":"只与 Redis 有关","ok":false,"why":"不限于此。"}]}]}
\`\`\`


1. workflow / stream / AiWorkflow 三个词怎么对应本仓  
2. 一次对话链路：Factory 供客户端、MCP 供工具、工作流做编排  
3. \`streams\` 白名单与 \`registerMCPTool\` 的意义  
4. 如何接到第五章概念课，以及本框 Factory / MCP 工程课

---

## 1. 概念对应
\`\`\`match
{"title":"流式课配对","pairs":[{"id":"sse","left":"流式响应","right":"边生成边推，降低首字等待"},{"id":"http","left":"HttpResponse.stream","right":"统一流式出口"},{"id":"ui","left":"前端","right":"按 chunk 渲染，注意中止"}]}
\`\`\`


| 已学 | 本课 |
|------|------|
| **AgentRuntime** | 进程已启动，可挂载扩展 |
| **Core 放码** | 业务位于 \`core/*/workflow/\` |
| **HTTP / www** | 聊天入口常经 \`/api/.../chat/completions\` 一类路由 |
| **配置归属** | \`ai-workflow.yaml\` 管理模型与 MCP |
| **插件架构** | workflow 为扩展点之一 |
| **Factory** | \`LLMFactory\` 创建客户端（见 Factory 课） |
| **MCP 运维** | 工具对外挂载与鉴权 |
| **语言栈 / 子服** | 工作流在主服 Node；工具内可 \`callSubserver\` |

\`\`\`mermaid
flowchart LR
  P[插件 / HTTP 入口] --> W["AiWorkflow.process"]
  W --> C[组 messages 上下文]
  C --> L[LLMFactory]
  L --> T["tool_calls 循环"]
  T --> M[MCP 工具]
  M --> Sub["可选 callSubserver"]
  M --> L
  L --> Out[回复 / 流式 delta]
\`\`\`

---

## 2. 术语

| 说法 | 含义 |
|------|------|
| **workflow** | \`core/*/workflow/*.js\` 中继承 \`AiWorkflow\` 的类，由 AiWorkflowLoader 加载 |
| **stream / streams** | 对话请求中的工作流名白名单，限制本轮可用工具集 |
| **AiWorkflow** | 基类：组消息、调工厂、挂载 MCP 工具、可选记忆增强 |
| **frameworkToolSurface** | 构造可选；为 true 时工具可进 chat MCP 白名单（见 base-classes） |

扫描路径固定：\`core/*/workflow/*.js\`。工具调用统一 **LLM tool calling + MCP**，不走「文本里假装函数」。

---

## 3. 一次对话在底层走什么

对齐 \`docs/ai-workflow.md\`：

1. **构建上下文**：\`buildChatContext\` / \`buildSystemPrompt\`  
2. **可选增强**：短期记忆、知识检索（按已加载能力 / embedding 配置）  
3. **调用 LLM**：经工厂；厂商协议用各 builtin 客户端，兼容网关用 \`openai_compat_llm\` 等（以文档与代码为准）  
4. **工具**：模型返回 \`tool_calls\` → 执行 MCP/工作流工具 → 回灌  
5. **流式**：推 \`delta.content\`，边生成边可能穿插工具  

配置要点（运行时 \`data/server_bots/.../ai-workflow.yaml\`，模板 \`config/default_config/ai-workflow.yaml\`）：\`llm.*\`、\`embedding.*\`、\`mcp.*\`、\`agentWorkspace.*\`、\`tools.file.*\`。

业务扩展：子类 \`patchLLMConfig(merged, apiConfig)\`；\`init\` 里 \`registerMCPTool\`。

---

## 4. 和外面 AI 概念的对照

| 外面常听到的 | 在本仓落地 |
|--------------|------------|
| Chat Completions / messages | LLM 客户端组的请求形状 |
| Function / Tool Calling | \`tool_calls\` + 客户端执行 |
| MCP | 工具发现与调用通道（**MCP 运维**课 + 第五章） |
| System prompt / 人设 | \`buildSystemPrompt\`、agentWorkspace 文件 |
| Agent 工作区 | \`ai-workflow.agentWorkspace\` 注入的 \`AGENTS.md\` 等 |
| 子代理 / 多工具 | \`mergeWorkflows\`、工具名前缀 \`stream.tool\` |

本课只要能指着图说：**业务在 workflow，模型客户端在 Factory，工具在 MCP。**

---

## 5. 实践清单

1. 打开 \`docs/ai-workflow.md\`「核心结论」与配置要点，对照本机 \`ai-workflow.yaml\`。  
2. 在配置页确认 Provider（Factory）与 MCP 相关开关。  
3. 找一个 \`core/*/workflow/*.js\`，标出 \`registerMCPTool\` / \`buildSystemPrompt\`。  
4. 启动日志中确认工作流加载；需要时看 **MCP 运维** 的「已挂载」日志。  
5. 进入第五章前，先能口述本仓链路，再学概念名词。

---

## 6. 文档链接

- \`docs/ai-workflow.md\`（本课真源）  
- \`docs/base-classes.md\` · \`docs/mcp-guide.md\` · \`docs/mcp-config-guide.md\`  
- Factory 课 · MCP 运维课 · \`docs/runtime-surface.md\`  
- \`docs/subserver-api.md\`（工具内可选子服；子服 AI 业务接口已下线）

## 下一步

本框：**Factory** · **MCP 运维** · **实践课**；  
然后进入 **第五章 · 人工智能**，从 **AI 学科诞生** 起按时间线阅读（Tool Calling / MCP / Agent 等概念课）。
`;
