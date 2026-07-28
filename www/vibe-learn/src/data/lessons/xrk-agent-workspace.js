/** 办事助手 · agents/ 种子 · ai-workspace 注入 */
export default `# 办事助手 · Agent 工作区

> 群聊 / 控制台里的**对话 Agent**（办事助手）靠工作区文件与技能注入 system prompt。  
> 真源：\`docs/agents.md\` · 种子：\`agents/\` · 运行时：\`data/ai-workspace/{id}/\` · 注入：\`src/utils/agent-workspace.js\`。

## 本课你要带走什么

\`\`\`match
{"title":"Agent 舞台配对","pairs":[{"id":"dev","left":"根 AGENTS.md","right":"Cursor 写 Core / 框架"},{"id":"ops","left":"docs/agents.md","right":"办事助手怎么用"},{"id":"ws","left":"ai-workspace AGENTS","right":"注入模型的办事规则"},{"id":"wf","left":"AiWorkflow","right":"会话 + 工具编排"}]}
\`\`\`

\`\`\`quiz
{"title":"办事助手快测","questions":[{"q":"日常定制助手语气应改哪里？","choices":[{"t":"仓库根 AGENTS.md","ok":false,"why":"那是 Cursor 写框架代码用的。"},{"t":"data/ai-workspace/{id}/ 里的 AGENTS.md 等","ok":true,"why":"运行时以工作区为准。"},{"t":"src/agent-runtime.js","ok":false,"why":"Runtime 不写业务人设。"}]}]}
\`\`\`

1. 办事助手与 Cursor 开发助手：两个舞台、两套文档  
2. 种子 \`agents/\` → 运行时 \`data/ai-workspace/{id}/\` 的复制关系  
3. 工作区文件表（AGENTS / SOUL / USER / TOOLS / ENV / memory / skills）  
4. \`agentWorkspace\` 配置与 \`subagents.yaml\` 角色清单  
5. 改文件首选 \`search_replace\`；文档入口 \`docs/agents.md\`

---

## 1. 两个舞台

| 舞台 | 读者 | 入口 |
|------|------|------|
| **Cursor / 写 Core** | 开发助手 | 仓库根 \`AGENTS.md\` · \`.cursor/skills/xrk-*\` |
| **群聊 / stdin 办事** | 办事助手模型 | 工作区 \`AGENTS.md\` · \`agents/skills/standard/\` |

本仓产品若另有 \`core/<名>/AGENTS.md\`，面向**该产品 Agent**（人格与工具边界），与根目录开发说明分工不同。

\`\`\`mermaid
flowchart LR
  seed["agents/ 种子"] --> ws["data/ai-workspace/{id}/"]
  cfg["ai-workflow.agentWorkspace"] --> inj["agent-workspace.js 注入"]
  ws --> inj
  inj --> prompt[system prompt]
  prompt --> LLM[AiWorkflow + MCP 工具]
\`\`\`

---

## 2. 种子与运行时

| 路径 | 角色 |
|------|------|
| \`agents/workspace/\` | 首次启用时复制的模板（AGENTS、SOUL、USER、TOOLS、ENV、HEARTBEAT、memory…） |
| \`agents/rules/\` | 办事行为规则，注入 prompt（回复结构、安全、群聊） |
| \`agents/skills/standard/\` | 技能种子：\`agent-core\`、\`office-*\` 等 |
| \`agents/subagents.yaml\` | 主助手 / 专项角色清单（assistant、plan、research、docs、workspace） |
| \`data/ai-workspace/{id}/\` | **真正使用的工作区**；已有同名文件时保留工作区版本 |

配置：\`config/default_config/ai-workflow.yaml\` → \`agentWorkspace\`（开关、预算、\`include*\` 门控）。

---

## 3. 工作区里有什么

| 文件 / 目录 | 用途 |
|-------------|------|
| \`AGENTS.md\` | 办事规则（先选技能、先结论、改稿方式、红线） |
| \`SOUL.md\` / \`USER.md\` / \`IDENTITY.md\` | 人格、称呼、身份 |
| \`TOOLS.md\` / \`ENV.md\` | 本机路径、依赖、邮箱习惯 |
| \`HEARTBEAT.md\` | 心跳任务清单 |
| \`memory/\` | 当天流水 + \`MEMORY.md\` 长期偏好 |
| \`skills/\` | 技能副本（按需 read \`SKILL.md\`） |
| \`subagents.yaml\`（可选） | 覆盖种子角色说明 |

对话里会出现 \`<available_skills>\`；总路由看 **agent-core**，工具地图看 **agent-tools**。

---

## 4. 与 AiWorkflow / MCP 怎么接

| 能力 | 落点 |
|------|------|
| 对话编排 | \`core/*/workflow/*.js\`（\`AiWorkflow\`，见 **工作流** 课） |
| 模型客户端 | \`LLMFactory\`（Factory 课） |
| 读改工作区、搜网、桌面等 | MCP 工具（\`tools.*\` / \`web.*\` …，见 MCP 运维课） |
| Prompt 注入顺序 | assistant → contextFiles → rules → Skills → Agents（见 \`agent-workspace.js\`） |

办事助手工作范围是**当前工作区**与通道工具；框架源码仍由 Cursor + 根 \`AGENTS.md\` 维护。

---

## 5. 改工作区文件

| 情况 | 工具 |
|------|------|
| 改已有文件局部 | \`search_replace\`（\`oldText\` / \`newText\`） |
| 新建文件 | \`write\` |
| 整篇覆盖已有 | \`write\` + \`overwrite=true\` |

实现：\`src/utils/base-tools.js\` · \`core/system-Core/workflow/tools.js\`。

---

## 6. 实践清单

1. 打开 \`docs/agents.md\`，对照本机是否已有 \`data/ai-workspace/\`。  
2. 读种子 \`agents/workspace/AGENTS.md\` 与 \`agents/subagents.yaml\`。  
3. 在 \`ai-workflow.yaml\` 中定位 \`agentWorkspace\` 字段。  
4. 回扣 **工作流** 课：\`buildSystemPrompt\` / 工具循环如何吃到注入内容。  
5. 进第五章前：能分清「根 AGENTS」与「工作区 AGENTS」。

## 文档链接

- \`docs/agents.md\`（本课真源）  
- \`agents/README.md\` · \`docs/ai-workflow.md\`  
- 根 \`AGENTS.md\`（开发助手） · 第五章 **AGENTS.md** 概念课
`;
