/** 办事助手 · agents/ 种子 · ai-workspace 注入 */
export default `# 办事助手 · Agent 工作区

> 群聊 / 控制台里的**对话 Agent**靠工作区文件注入 system——不是靠改 \`src/agent-runtime.js\`。  
> 真源：\`docs/agents.md\` · 种子 \`agents/\` · 运行时 \`data/ai-workspace/{id}/\` · 注入 \`agent-workspace.js\`。

## 设计巧思：两张工牌

| 工牌 | 给谁戴 | 文件 |
|------|--------|------|
| **施工队交底** | Cursor 写 Core / 框架 | 仓库根 \`AGENTS.md\` · \`.cursor/skills\` |
| **前台办事手册** | 群聊/stdin 办事模型 | \`data/ai-workspace/{id}/AGENTS.md\` 等 |

戴错工牌：要么 Agent 改坏 Runtime，要么开发助手满嘴「帮你订外卖」却不懂放码。

\`\`\`steps
{"title":"注入五段（进 system）","steps":[{"title":"assistant","body":"AGENTS / SOUL / USER / memory…"},{"title":"contextFiles","body":"额外上下文文件"},{"title":"rules","body":"agents/rules 全文护栏"},{"title":"Skills","body":"目录卡；细则 tools.read"},{"title":"Agents","body":"subagents 清单（提示路由）"}]}
\`\`\`

顺序固定，见 \`docs/agent-context.md\` —— 与第五章「规则 / 技能 / AGENTS」概念同构，本课给**路径**。

---

## 1. 跨章串联

| 课 | 关系 |
|----|------|
| **对话管线** | 五段进 system；易变时间仍在独立 user |
| **工作流** | \`agentWorkspace\` 开关与预算在 \`ai-workflow.yaml\` |
| **MCP** | Skills 细则常靠 \`tools.read\`；工具环执行副作用 |
| **第五章 ai-skills / ai-rules / ai-agents-md** | 概念；本课是本仓落点 |
| **番外 · Vibe Coding** | 开发机提问模板 ≠ 办事助手人设 |
| **配置归属** | \`agentWorkspace\` 属框架 ai-workflow，不是产品业务 yaml |

\`\`\`flip
{"title":"舞台翻卡","cards":[{"front":"改办事语气","back":"改工作区 AGENTS/SOUL，不是根 AGENTS"},{"front":"改放码约定","back":"根 AGENTS / xrk-* skill"},{"front":"技能太胖","back":"目录注入 + 按需 read，勿全文常驻"},{"front":"subagents.yaml","back":"提示路由清单；勿默认当成已启隔离进程池"}]}
\`\`\`

---

## 2. 种子 → 运行时（揉碎）

| 路径 | 角色 |
|------|------|
| \`agents/workspace/\` | 首次复制的模板 |
| \`agents/rules/\` | 护栏全文 |
| \`agents/skills/standard/\` | 技能种子 |
| \`agents/subagents.yaml\` | 角色说明清单 |
| \`data/ai-workspace/{id}/\` | **真正生效**；已有文件保留工作区版 |

配置门控：\`ai-workflow.yaml\` → \`agentWorkspace\`（\`include*\`、字符预算、\`maxSkillsInPrompt\` 等）。

\`\`\`mermaid
flowchart LR
  seed[agents/ 种子] --> ws["data/ai-workspace/id"]
  cfg[agentWorkspace] --> inj[agent-workspace.js]
  ws --> inj
  inj --> sys[system 前缀]
  sys --> LLM[AiWorkflow]
\`\`\`

\`\`\`quiz
{"title":"办事助手","questions":[{"q":"日常定制助手语气应改？","choices":[{"t":"仓库根 AGENTS.md","ok":false,"why":"那是写框架用的交底。"},{"t":"data/ai-workspace/{id}/ 里的 AGENTS.md 等","ok":true,"why":"运行时以工作区为准。"},{"t":"src/agent-runtime.js","ok":false,"why":"Runtime 不写业务人设。"},{"t":"package.json name 字段","ok":false,"why":"无关。"}]},{"q":"Skills 默认优先进窗的是？","choices":[{"t":"每个 SKILL.md 全文","ok":false,"why":"会撑爆窗口。"},{"t":"名称与路径等目录信息，全文按需再读","ok":true,"why":"渐进披露；对齐第五章技能课。"},{"t":"只有 .cursor/skills/xrk-*","ok":false,"why":"那是开发舞台。"},{"t":"随机一半技能","ok":false,"why":"按配置预算与匹配。"}]}]}
\`\`\`

---

## 3. 工作区文件一览

| 文件 / 目录 | 用途 |
|-------------|------|
| \`AGENTS.md\` | 办事规则（先结论、红线、改稿） |
| \`SOUL.md\` / \`USER.md\` | 人格与称呼 |
| \`TOOLS.md\` / \`ENV.md\` | 本机路径与习惯 |
| \`memory/\` | 流水 + 长期偏好 |
| \`skills/\` | 技能副本 |
| \`subagents.yaml\` | 可选覆盖种子角色 |

改已有文稿优先 \`search_replace\`（\`docs/agents.md\` 约定）。

---

## 4. 实践清单

1. 对照本机是否已有 \`data/ai-workspace/\`。  
2. 并排打开：根 \`AGENTS.md\` vs 工作区 \`AGENTS.md\`（各读标题段）。  
3. 在 \`ai-workflow.yaml\` 定位 \`agentWorkspace\`。  
4. 回 **对话管线**：指出五段落在 system 哪一段叙事。  
5. 进第五章前：能 30 秒分清两张工牌。

## 文档

\`docs/agents.md\` · \`docs/agent-context.md\` · \`agents/README.md\` · 第五章 **AGENTS.md / 技能 / 规则**。

## 下一步

**对话管线**（怎么拼窗）· **MCP**（怎么动手）· **实践·最小插件**（通道侧另一条贡献路径）。
`;
