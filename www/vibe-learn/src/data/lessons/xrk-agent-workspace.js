export default `# 办事助手 · Agent 工作区

> 群聊 / 控制台里的**对话 Agent**靠工作区文件注入 system——不是靠改 \`src/agent-runtime.js\`。  
> 真源：\`docs/agents.md\` · 种子 \`agents/\` · 运行时 \`data/ai-workspace/{id}/\` · 注入 \`agent-workspace.js\`。  
> 导图2 的 **AI Agent · 上下文工程 · Skill · Vibe Coding** 描述「怎么跟模型协作」；本课钉**文件进 system 的路径**。  
> **学会之后**：能说明种子与注入关系、两张工牌，并能把 Agent/Skill/上下文工程对上本仓目录。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 种子 | agents/ → 运行时工作区 |
| 注入 | 办事规则进 prompt（上下文工程落地） |
| Skill | 目录卡按需加载；与 Rules/交底分工 |
| 工牌 | 写代码 AGENTS ≠ 办事工作区 AGENTS |
| 文档 | docs/agents.md |


## 设计巧思：两张工牌

\`\`\`decide
{"title":"该改哪张工牌？","start":"start","steps":[{"id":"start","q":"你要改的是？","options":[{"label":"群聊/办事助手语气或流程","next":"desk"},{"label":"写代码放码/禁区/技能路由","next":"dev"},{"label":"模型工具能不能调、门禁","next":"mcp"},{"label":"窗口太长/历史太胖","next":"pipe"}]},{"id":"desk","result":"改办事工作区：data/ai-workspace/{id}/ 或种子 agents/。","detail":"不是仓库根 AGENTS.md。"},{"id":"dev","result":"改根 AGENTS.md / .cursor/skills/xrk-*。","detail":"别把施工禁区写进办事手册。"},{"id":"mcp","result":"看 MCP 运维 + ai-workflow.security。","detail":"Skill≠MCP 工具。"},{"id":"pipe","result":"对话管线：裁剪/压缩/max*Chars。","detail":"上下文工程课。"}]}
\`\`\`


| 工牌 | 给谁戴 | 文件 |
|------|--------|------|
| **施工队交底** | Cursor 写 Core / 框架 | 仓库根 \`AGENTS.md\` · \`.cursor/skills/xrk-*\` |
| **前台办事手册** | 群聊/stdin 办事模型 | \`data/ai-workspace/{id}/AGENTS.md\` · \`agents/skills/standard/**\` |

戴错工牌：要么 Agent 改坏 Runtime，要么开发助手满嘴「帮你订外卖」却不懂放码。

\`\`\`steps
{"title":"注入五段（进 system）","steps":[{"title":"assistant","body":"AGENTS / SOUL / USER / memory…"},{"title":"contextFiles","body":"额外上下文文件"},{"title":"rules","body":"agents/rules ∪ 工作区 rules/（同路径覆盖）"},{"title":"Skills","body":"目录卡；细则 tools.read；装技能见 agent-skillhub"},{"title":"Agents","body":"subagents 清单（提示路由）"}]}
\`\`\`

另：**microagents**（\`agents/microagents\` 等，带 triggers）命中用户话时可整段注入。  
顺序与契约见 \`docs/agent-context.md\` —— 与第五章「规则 / 技能 / AGENTS」概念同构，本课给**路径**。

---

## 1. 跨章串联

| 课 | 关系 |
|----|------|
| **对话管线** | 五段进 system；出站压缩 / 斜杠 / 策略 |
| **工作流** | \`agentWorkspace\` · \`recipes\` · \`security\` · \`context.*\` 在 \`ai-workflow.yaml\` |
| **MCP** | Skills 细则常靠 \`tools.read\`；tools 面含 apply_edit / repo_map… |
| **第五章 ai-skills / ai-rules / ai-agents-md** | 概念；本课是本仓落点 |
| **番外 · Vibe Coding** | 开发机提问模板 ≠ 办事助手人设 |
| **配置归属** | \`agentWorkspace\` 属框架 ai-workflow，不是产品业务 yaml |

\`\`\`flip
{"title":"舞台翻卡","cards":[{"front":"改办事语气","back":"改工作区 AGENTS/SOUL，不是根 AGENTS"},{"front":"改放码约定","back":"根 AGENTS / xrk-* skill"},{"front":"技能太胖","back":"目录注入 + 按需 read，勿全文常驻"},{"front":"subagents.yaml","back":"提示路由清单；勿默认当成已启隔离进程池"},{"front":"/recipe","back":"配方种子 agents/recipes；须已触发助手"}]}
\`\`\`

---

## 2. 种子 → 运行时（揉碎）

| 路径 | 角色 |
|------|------|
| \`agents/workspace/\` | 首次复制的模板 |
| \`agents/rules/\` | 产品共享护栏；seed 进工作区 \`rules/\` |
| \`agents/skills/standard/\` | **产品 Agent** 技能种子（含 agent-skillhub；勿塞 xrk-*） |
| \`agents/recipes/\` | 斜杠配方 yaml |
| \`agents/microagents/\` | triggers 短手册 |
| \`agents/subagents.yaml\` | 角色说明清单 |
| \`data/ai-workspace/{id}/\` | **真正生效**；已有文件保留工作区版 |

配置门控：\`ai-workflow.yaml\` → \`agentWorkspace\`（\`include*\`、字符预算、\`maxSkillsInPrompt\` 等）· \`recipes\` · \`security\` · \`context\`。

\`\`\`mermaid
flowchart LR
  seed[agents/ 种子] --> ws["data/ai-workspace/id"]
  cfg[agentWorkspace] --> inj[agent-workspace.js]
  ws --> inj
  recipe[recipes / slash] --> pipe[chat-pipeline]
  inj --> sys[system 前缀]
  sys --> LLM[AiWorkflow]
  pipe --> LLM
\`\`\`

\`\`\`quiz
{"title":"办事助手","questions":[{"q":"日常定制助手语气应改？","choices":[{"t":"仓库根 AGENTS.md","ok":false,"why":"那是写框架用的交底。"},{"t":"data/ai-workspace/{id}/ 里的 AGENTS.md 等","ok":true,"why":"运行时以工作区为准。"},{"t":"src/agent-runtime.js","ok":false,"why":"Runtime 不写业务人设。"},{"t":"package.json name 字段","ok":false,"why":"无关。"}]},{"q":"Skills 默认优先进窗的是？","choices":[{"t":"每个 SKILL.md 全文","ok":false,"why":"会撑爆窗口。"},{"t":"名称与路径等目录信息，全文按需再读","ok":true,"why":"渐进披露；对齐第五章技能课。"},{"t":"只有 .cursor/skills/xrk-*","ok":false,"why":"那是开发舞台。"},{"t":"随机一半技能","ok":false,"why":"按配置预算与匹配。"}]},{"q":"陌生工作区改代码前优先？","choices":[{"t":"盲目 list_files 整仓","ok":false,"why":"贵且噪声大。"},{"t":"tools.repo_map（可带 query）再 grep/read","ok":true,"why":"轻量代码地图；见 agent-tools。"},{"t":"直接 rm -rf","ok":false,"why":"禁止。"},{"t":"只改根 AGENTS.md","ok":false,"why":"与改仓无关。"}]}]}
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
| \`rules/\` | 本工作区护栏（覆盖同名共享规则） |
| \`subagents.yaml\` | 可选覆盖种子角色 |

改已有文稿：局部 \`search_replace\`；多文件批量 \`apply_edit\`（改后建议 \`verify\`）；多步 \`update_todos\`（\`docs/agents.md\` · 技能 **agent-tools**）。

---

## 4. 斜杠与审批（运营向）

| 能力 | 怎么用 |
|------|--------|
| \`/recipes\` · \`/recipe <id>\` | 须已 @/前缀触发助手；种子在 \`agents/recipes/\` |
| \`#批准\` | 仅当 \`security.approval.enabled=true\`；默认关 |

---

## 5. 实践清单

1. 对照本机是否已有 \`data/ai-workspace/\`。  
2. 并排打开：根 \`AGENTS.md\` vs 工作区 \`AGENTS.md\`（各读标题段）。  
3. 在 \`ai-workflow.yaml\` 定位 \`agentWorkspace\` · \`context\` · \`security\` · \`recipes\`。  
4. 回 **对话管线**：指出五段 + 出站链落在哪。  
5. 进第五章前：能 30 秒分清两张工牌 + 「出站压缩 ≠ 删历史」。

## 文档

\`docs/agents.md\` · \`docs/agent-context.md\` · \`agents/README.md\` · 技能 \`agent-tools\` · 第五章 **AGENTS.md / 技能 / 规则 / 提示安全**。

## 导图2 · Agent / Skill / 上下文工程 × 两张工牌

> 导图2 Agent/Skill/上下文口语；本课钉 **写代码 vs 办事助手两张工牌**。

| 导图2 | Vibe 口语 | 本仓专业落点 |
|-------|-----------|--------------|
| **AI Agent** | 多步用工具完成目标的模型侧角色 | 群聊/stdin **办事助手**读工作区；Cursor **写代码**读根 AGENTS——不是同一个 Agent |
| **上下文工程** | 精心挑选塞进窗口的内容 | 五段注入（AGENTS/SOUL/rules/Skills…）+ 对话管线出站压缩 |
| **Skill** | 长流程、按需加载 | \`agents/skills/**\` 与 Cursor \`.cursor/skills\`；细则 tools.read |
| **Vibe Coding** | 对话驱动试想法 | 改工作区文稿可用五拍；**勿**把施工队禁区写进办事手册或相反 |

\`\`\`flip
{"title":"工牌 × 词表","cards":[{"front":"Skill 写进 Always Rule？","back":"反模式；浪费窗口。Skill 按需，Rules 短约束。"},{"front":"一个 AGENTS.md 打天下？","back":"两张工牌：写代码 vs 办事注入，事实可对齐但读者不同。"},{"front":"上下文工程=越长越好？","back":"否；管线要压缩/裁窗，见对话管线课。"}]}
\`\`\`

## 下一步

**对话管线**（怎么拼窗 / 出站）· **MCP**（怎么动手）· **实践·最小插件**（通道侧另一条贡献路径）。
`;
