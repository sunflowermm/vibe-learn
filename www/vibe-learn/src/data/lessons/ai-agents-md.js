/** AGENTS.md */
export default `# AGENTS.md · 项目说明书

> **时间线：多 Agent 工具并存之后** 出现的共识文件。  
> **AGENTS.md** = 写在仓库或工作区里、给 Agent 读的 **说明书**（栈、命令、边界、怎么协作）。

## 时间线上的位置

上一课：Agent 可以活在 CLI。  
本课：无论 IDE 还是 CLI，都需要一份 **可移植的项目上下文**。  
对本框而言：AI 概念链在此收束，并回扣 XRK **第四章** 的根 \`AGENTS.md\` 与 **办事助手** 工作区。

---

## 为什么诞生

\`\`\`check
{"title":"AGENTS.md 清单","items":[{"text":"写清工作区与边界","hint":"能改哪、路径在哪"},{"text":"写清工具与命令习惯","hint":"包管理器、测试入口"},{"text":"只写现行契约","hint":"路径、读者、任务路由"}]}
\`\`\`

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

## 本仓四层（现行）

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

## 回到本仓实践

\`AiWorkflow\` 在跑「会话 + 工具」；办事助手工作区经 \`agentWorkspace\` 注入；  
你在 Cursor 里改 vibe-learn，读的是根 \`AGENTS.md\` 与 \`.cursor/skills\`。词汇可互译，落点不同。
`;
