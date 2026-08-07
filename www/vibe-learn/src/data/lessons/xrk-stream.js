export default `# 工作流 · AiWorkflow

> 对话型 AI 能力落在 **\`core/*/workflow/\`**：  
> 收消息 → 组上下文 → 经 **LLMFactory** 调模型 →（可选）**MCP 工具**循环 → 返回结果。  
> 真源：\`docs/ai-workflow.md\` · \`docs/agent-context.md\`；基类：\`docs/base-classes.md\`。  
> **上下文三层 / mergeWorkflows** 见 **对话管线** 课；工作区注入见 **办事助手** · \`docs/agents.md\`。  
> **学会之后**：能说明 AiWorkflow 角色，并指向 Factory / MCP / 管线落点。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 位置 | core/*/workflow |
| 组合 | Factory + MCP + 上下文 |
| 流式 / 循环 | 知 delta 输出与 tool 多轮，门禁仍在 |
| 细拆 | 对话管线 / 办事助手 |

\`\`\`algo
{"kind":"msgpipe","title":"工作流入口后 · 消息怎么排","autoplay":true,"speed":880}
\`\`\`

## 本课你要带走什么
\`\`\`steps
{"title":"一次对话怎么走","steps":[{"title":"入口","body":"插件指令或 HTTP chat 路由进入 AiWorkflow.process。"},{"title":"组上下文","body":"messages + buildSystemPrompt；可注入 agentWorkspace。"},{"title":"调模型","body":"经 LLMFactory 取客户端，发 completions / chat。"},{"title":"工具循环","body":"tool_calls → MCP / 工作流工具 → 回灌 → 再调模型。"},{"title":"输出","body":"完整回复或流式 delta 回通道 / HTTP。"}]}
\`\`\`

\`\`\`quiz
{"title":"工作流自测","questions":[{"q":"业务 AiWorkflow 代码应放在哪一目录？","choices":[{"t":"core/*/workflow/*.js","ok":true,"why":"AiWorkflowLoader 扫描此目录。"},{"t":"src/factory/","ok":false,"why":"工厂只提供模型客户端。"},{"t":"agents/workspace/","ok":false,"why":"那是办事助手种子，不是工作流类。"},{"t":"www/<应用>/ 根目录随便丢 .js","ok":false,"why":"www 是前端；编排在 workflow/。"}]}]}
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

对齐 \`docs/ai-workflow.md\` · \`docs/agent-context.md\`：

1. **\`process({ mergeWorkflows })\`**：合并副流工具（常含 \`tools\`）  
2. **斜杠**：\`/recipe\` · \`/recipes\` 可展开或短路  
3. **\`assembleChatLlmMessages\`**：system → 易变 → 历史 → 当前（细节见 **对话管线**）  
4. **\`prepareOutboundMessages\`**：toolPair → compaction → contextWindow 裁剪  
5. **\`callAI\`**：经 LLMFactory；\`tool_calls\` → \`handleToolCall\` → 回灌；轮尽可 finalize  
6. **出站**：reply / 正文；写回笔录  

配置：\`ai-workflow.yaml\`（\`llm\` / \`context.*\` / \`security\` / \`policies\` / \`recipes\` / \`agentWorkspace\` / \`mcp\`）；助手 merge 列表在 \`ai_config\`。

---

## 4. 概念对照（第五章）

| 概念 | 本仓落点 |
|------|----------|
| Token / 窗口 | \`context.*\` · \`max*Chars\` · Provider \`contextWindow\` |
| 注意力 | 模型内部；我们管「谁进窗」 |
| 自适应 · ICL | Workspace + Rules + Skills 目录 + recipes |
| Tool Calling / MCP | 工厂 + \`registerMCPTool\` + finalize；门禁见提示安全 |
| merge 多工具 | \`mergeWorkflows\`、工具名前缀（含 apply_edit / repo_map…） |

---

## 5. 实践清单

1. 读 \`docs/agent-context.md\` 全文结构。  
2. 打开 **对话管线** 课，对照三层消息。  
3. 找 \`core/*/workflow/*.js\` 的 \`registerMCPTool\`。  
4. 再读 **办事助手**（注入五段）。

## 文档链接

- \`docs/agent-context.md\` · \`docs/ai-workflow.md\` · \`docs/agents.md\`  
- \`docs/base-classes.md\` · \`docs/mcp-guide.md\`

## 下一步

**对话管线** → **办事助手** → 第五章概念柱（Token · 注意力 · 自适应）。  
工具门禁细节 → **MCP 运维**；模型客户端 → **Factory**。
`;
