/** AiWorkflow / workflow · 对齐 ai-workflow · 链 factory/mcp/agentWorkspace */
export default `# 工作流 · AiWorkflow

> 对话型 AI 能力落在 **\`core/*/workflow/\`**：  
> 收消息 → 组上下文 → 经 **LLMFactory** 调模型 →（可选）**MCP 工具**循环 → 返回结果。  
> 真源：\`docs/ai-workflow.md\`；基类契约：\`docs/base-classes.md\`。  
> 办事助手工作区注入见 **办事助手** 课 · \`docs/agents.md\`。

## 本课你要带走什么
\`\`\`steps
{"title":"一次对话怎么走","steps":[{"title":"入口","body":"插件指令或 HTTP chat 路由进入 AiWorkflow.process。"},{"title":"组上下文","body":"messages + buildSystemPrompt；可注入 agentWorkspace。"},{"title":"调模型","body":"经 LLMFactory 取客户端，发 completions / chat。"},{"title":"工具循环","body":"tool_calls → MCP / 工作流工具 → 回灌 → 再调模型。"},{"title":"输出","body":"完整回复或流式 delta 回通道 / HTTP。"}]}
\`\`\`

\`\`\`quiz
{"title":"工作流自测","questions":[{"q":"业务工作流代码应放在？","choices":[{"t":"core/*/workflow/*.js","ok":true,"why":"AiWorkflowLoader 扫描此目录。"},{"t":"src/factory/","ok":false,"why":"工厂只提供模型客户端。"},{"t":"agents/workspace/","ok":false,"why":"那是办事助手种子，不是工作流类。"}]}]}
\`\`\`

\`\`\`match
{"title":"工作流三角配对","pairs":[{"id":"wf","left":"AiWorkflow","right":"编排：上下文 · 调模型 · 工具循环"},{"id":"fac","left":"LLMFactory","right":"按配置创建模型客户端"},{"id":"mcp","left":"MCP 工具","right":"给模型可调用的外部能力"},{"id":"ws","left":"agentWorkspace","right":"注入办事助手工作区进 prompt"}]}
\`\`\`

1. \`workflow\` / \`AiWorkflow\` / 请求里的工作流名白名单怎么对应  
2. 一次对话链路：Factory 供客户端、MCP 供工具、工作流做编排  
3. \`registerMCPTool\` 与 \`agentWorkspace\` 注入的位置  
4. 如何接到 **办事助手** 课与第五章概念课

---

## 1. 已学对照

| 已学 | 本课 |
|------|------|
| **AgentRuntime** | 进程已启动，可挂载扩展 |
| **Core 放码** | 业务位于 \`core/*/workflow/\` |
| **HTTP / www** | 聊天入口常经 \`/api/.../chat/completions\` 一类路由 |
| **配置归属** | \`ai-workflow.yaml\` 管理模型、MCP、\`agentWorkspace\` |
| **插件架构** | workflow 为扩展点之一 |
| **Factory** | \`LLMFactory\` 创建客户端 |
| **MCP 运维** | 工具对外挂载与鉴权 |
| **办事助手** | 工作区文件经 \`agentWorkspace\` 注入 prompt |

\`\`\`mermaid
flowchart LR
  P[插件 / HTTP 入口] --> W["AiWorkflow.process"]
  W --> C[组 messages + agentWorkspace]
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
| **工作流名白名单** | 对话请求中限制本轮可用工具集的名称列表 |
| **AiWorkflow** | 基类：组消息、调工厂、挂载 MCP、可选记忆增强 |
| **frameworkToolSurface** | 构造可选；为 true 时工具可进 chat MCP 白名单（见 base-classes） |
| **agentWorkspace** | \`ai-workflow.yaml\` 段：是否注入办事助手工作区、预算与 \`include*\` |

扫描路径：\`core/*/workflow/*.js\`。工具调用走 **LLM tool calling + MCP**。

---

## 3. 一次对话在底层走什么

对齐 \`docs/ai-workflow.md\`：

1. **构建上下文**：\`buildChatContext\` / \`buildSystemPrompt\`（可含工作区注入）  
2. **可选增强**：短期记忆、知识检索（按 embedding / 已加载能力）  
3. **调用 LLM**：经工厂  
4. **工具**：\`tool_calls\` → 执行 MCP/工作流工具 → 回灌  
5. **流式**：推 \`delta.content\`，边生成边可能穿插工具  

配置（运行时 \`data/server_bots/.../ai-workflow.yaml\`，模板 \`config/default_config/ai-workflow.yaml\`）：\`llm.*\`、\`embedding.*\`、\`mcp.*\`、\`agentWorkspace.*\`、\`tools.*\`。

业务扩展：子类 \`patchLLMConfig\`；\`init\` 里 \`registerMCPTool\`。

---

## 4. 和外面 AI 概念的对照

| 外面常听到的 | 在本仓落地 |
|--------------|------------|
| Chat Completions / messages | LLM 客户端组的请求形状 |
| Function / Tool Calling | \`tool_calls\` + 客户端执行 |
| MCP | 工具发现与调用通道（**MCP 运维**课 + 第五章） |
| System prompt / 人设 | \`buildSystemPrompt\`、办事助手工作区文件 |
| Agent 工作区 | \`agents/\` → \`data/ai-workspace/{id}/\`（**办事助手**课） |
| 多工具编排 | \`mergeWorkflows\`、工具名前缀 |

本课能指着图说：**业务在 workflow，模型在 Factory，工具在 MCP，人设与技能在工作区注入。**

---

## 5. 实践清单

1. 打开 \`docs/ai-workflow.md\`，对照本机 \`ai-workflow.yaml\`。  
2. 找一个 \`core/*/workflow/*.js\`，标出 \`registerMCPTool\` / \`buildSystemPrompt\`。  
3. 读 **办事助手** 课，对照 \`agentWorkspace\` 字段。  
4. 启动日志确认工作流加载；需要时看 **MCP 运维**。  
5. 进入第五章前，先能口述本仓链路。

## 文档链接

- \`docs/ai-workflow.md\` · \`docs/agents.md\`  
- \`docs/base-classes.md\` · \`docs/mcp-guide.md\` · \`docs/runtime-surface.md\`  
- Factory 课 · MCP 运维课 · 办事助手课

## 下一步

本框：**办事助手** · **Factory** · **MCP 运维** · **实践课**；  
然后进入 **第五章 · 人工智能**（概念时间线与 AGENTS.md 课）。
`;
