export default `# AGENTS.md · 项目说明书

> **本课位置**：驯服段收束；多 Agent 工具并存后的**共识文件**。  
> **先修**：规则 / 技能；可选 Agent CLI。  
> **定义**：**AGENTS.md** = 写在仓库或工作区里、给 Agent 读的 **说明书**（栈、命令、边界、怎么协作）。  
> **真源**：根 \`AGENTS.md\` · \`docs/agents.md\` · \`docs/agent-context.md\`。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 职责 | AGENTS.md=给 Agent 的项目说明书 |
| 两张工牌 | 根说明（Coding）vs 产品工作区（办事）；事实对齐、读者不同 |
| 边界 | 不是微调；密钥不进仓；不是 Rules/Skills 的替代品 |
| 本仓 | 办事助手工作区注入；见 docs/agents.md |

\`\`\`algo
{"kind":"tameinj","title":"交底文件族里的 AGENTS","autoplay":true,"speed":800}
\`\`\`

\`\`\`check
{"title":"AGENTS.md 通关","items":[{"id":"role","text":"能说明 AGENTS=施工交底，README=给人看的大门","hint":"职责"},{"id":"two","text":"能分清根 AGENTS（开发）与工作区 AGENTS（办事模型）","hint":"工牌"},{"id":"split","text":"能对照 AGENTS 总览 / Rules 硬约束 / Skills 流程","hint":"分工"}]}
\`\`\`

## 为什么诞生

| 痛点 | 说明 |
|------|------|
| **每个工具私有格式** | 只认某家规则文件时，换工具就要重写 |
| **README 面向人类** | 安装故事很长，Agent 更需要命令、目录契约 |
| **嵌套 monorepo** | 根目录与子包需要不同说明 |
| **人设与工程易混** | SOUL 偏产品口吻；工程约束需要稳定入口 |

社区与多家工具逐渐认：**仓库（或工作区）里放 AGENTS.md**。

---

## 它有什么作用

| 作用 | 人话 |
|------|------|
| **开机即知栈** | Node 版本、只用 pnpm、入口命令 |
| **划边界** | 哪里能改、配置模板归谁 |
| **跨工具** | Cursor / Codex / Copilot 等都能当第一页读 |
| **和 Rules/Skills 分工** | AGENTS 总览；Rules 硬约束；Skills 流程细节 |

---

## 本仓怎么做

四层文件（现行；读者不同，勿混成一份）：

| 文件 | 读者 | 内容 |
|------|------|------|
| 仓库根 \`AGENTS.md\` | Cursor / Core 开发 | 放码、配置归属、\`xrk-*\` skill 路由 |
| \`~/.cursor/AGENTS.md\` | 本机所有项目 | 全局工程师技能、代理等 |
| \`docs/agents.md\` | 用户 / 运维 / 维护者 | 办事助手怎么用、实现索引 |
| \`data/ai-workspace/{id}/AGENTS.md\` | 办事助手模型 | 注入 prompt 的办事规则（种子在 \`agents/workspace/\`） |
| \`core/<core>/AGENTS.md\`（若有） | 产品 Agent | 该产品人格与工具边界 |

工程课回扣：**办事助手** · **工作流** · 根 \`AGENTS.md\`。

---

## 深入浅出

| 文件 | 像什么 |
|------|--------|
| **README** | 给来访者的大门介绍 |
| **AGENTS.md** | 给施工队的交底单 |
| **Rules** | 工地安全条例 |
| **Skills** | 专项施工手册 |
| **MCP** | 外接器械插头 |

读完本课，你应能把第五章链串成一句话：

> 学科 → 大模型 → 对话产品 → 统一 API → 工具调用 → MCP → Rules → Skills → 子代理 → CLI → AGENTS.md。

\`\`\`quiz
{"title":"AGENTS.md","questions":[{"q":"仓库根 AGENTS.md 主要给谁读？","choices":[{"t":"办事助手群聊模型（与工作区 AGENTS 完全同一份）","ok":false,"why":"根文件给 Coding/维护者；办事读工作区副本。"},{"t":"Cursor / Core 开发：放码与 skill 路由","ok":true,"why":"两张工牌，读者不同。"},{"t":"只给搜索引擎爬虫","ok":false,"why":"给人与 Agent 的契约文件。"}]},{"q":"生产密钥应不应该写进 AGENTS.md 交底？","choices":[{"t":"应，方便模型直接调用云 API","ok":false,"why":"密钥不进仓。"},{"t":"不应；放环境变量/密钥库","ok":true,"why":"安全红线。"},{"t":"应加密后写进 Rules 全文","ok":false,"why":"仍可能进提示与日志。"}]}]}
\`\`\`

## 回到本仓实践

\`AiWorkflow\` 在跑「会话 + 工具」；办事助手工作区经 \`agentWorkspace\` 注入；  
你在 Cursor 里改 vibe-learn，读的是根 \`AGENTS.md\` 与 \`.cursor/skills\`。词汇可互译，落点不同。
`;
