/** 项目记忆文件（跨工具交底） */
export default `# 项目记忆文件

> Agent **不会**自动知道你仓库的禁区与习惯——除非写进它会加载的文件。  
> 行业正在汇聚到便携约定：**\`AGENTS.md\`**（多工具可读）+ 各产品私有目录（\`.cursor/rules\`、\`CLAUDE.md\`…）。  
> 前置：**Vibe Coding 心智**；选型：**形态与黄页**。

## 1. 为什么要「文件交底」

| 只靠聊天 | 写进仓库 |
|----------|----------|
| 会话一换就忘 | Git 可审、可复用 |
| 每人说法不同 | 团队同一事实 |
| 换 Cursor → Claude 要重讲 | \`AGENTS.md\` 常可共用 |

\`\`\`flip
{"title":"记忆翻卡","cards":[{"front":"Rules","back":"短、稳、常在；编码约束与禁区"},{"front":"Skills","back":"长流程、按需加载；别整本贴进 Rules"},{"front":"AGENTS.md","back":"纯 Markdown 便携说明书；多工具约定"}]}
\`\`\`

---

## 2. 常见文件对照（写什么 · 谁读）

| 文件/目录 | 常见读者 | 写什么 | 备注 |
|-----------|----------|--------|------|
| **\`AGENTS.md\`** | Cursor、Codex、部分其它 Agent | 放码位置、禁改区、常用命令、验收习惯 | 可放根目录；子目录可嵌套，**更近的优先**（Cursor / Codex 均支持分层） |
| **\`AGENTS.override.md\`** | 主要 Codex | 覆盖同级 \`AGENTS.md\` | 见 [Codex AGENTS 指南](https://developers.openai.com/codex/guides/agents-md) |
| **\`.cursor/rules/*.mdc\`** | Cursor | 带 frontmatter 的规则（\`alwaysApply\` / \`globs\` / description） | 纯 \`.md\` 丢在 rules 里可能**不被**当 Project Rules |
| **\`.cursor/skills/**/SKILL.md\`** | Cursor | 可复用工作流；Agent 按描述选用或 \`/skill\` | 与 Rules 分工：短约束 vs 长步骤 |
| **\`CLAUDE.md\`** 或 **\`.claude/CLAUDE.md\`** | Claude Code | 架构、命令、风格；\`/init\` 可草稿 | 保持精简；大段可拆 \`.claude/rules/\` |
| **\`.env.example\`** | 人 + Agent | 有哪些键；**无真实密钥** | \`.env\` 进 gitignore |

官方入口（外链会变，概念相对稳）：

- Cursor Rules / AGENTS：[cursor.com/docs/rules](https://cursor.com/docs/rules)  
- Cursor Agent 实践：[cursor.com/blog/agent-best-practices](https://cursor.com/blog/agent-best-practices)  
- Claude Memory：[code.claude.com/docs/en/memory.md](https://code.claude.com/docs/en/memory.md)  
- Codex AGENTS.md：[developers.openai.com/codex/guides/agents-md](https://developers.openai.com/codex/guides/agents-md)

---

## 3. Rules vs Skills（Cursor 心智，可推广）

| | **Rules** | **Skills** |
|--|-----------|------------|
| **长度** | 短到中等 | 可较长、分步骤 |
| **何时进上下文** | 总是 / 匹配路径 / Agent 判定 | 任务相关才加载 |
| **适合** | 「禁止改 src/」「只用 pnpm」 | 「发版检查清单」「三同步改配置」 |

反模式：把整本技能手册塞进 Always Rule → **浪费上下文**，模型更容易忽略。

---

## 4. 本仓落点（XRK-AGT）

| 路径 | 角色 |
|------|------|
| 根 **\`AGENTS.md\`** | 框架/Core 开发交底（放码表、禁区） |
| **\`.cursor/rules\`**、**skills/** | Cursor 规则与技能 |
| **\`docs/agents.md\`** | 办事助手说明（人读） |
| **\`agents/\` → \`data/ai-workspace/\`** | 办事助手注入工作区（路径 B） |
| **\`core/<产品>/AGENTS.md\`**（若有） | 产品 Agent 边界 |

写交底时优先：**禁区、包管理、Node 版本、配置三同步、娱乐插件不进白名单**——比空喊「写好代码」有用。

\`\`\`quiz
{"title":"项目记忆","questions":[{"q":"换 Claude Code 主力时，最该避免？","choices":[{"t":"另写一份与根 AGENTS.md 事实相反的 CLAUDE.md","ok":true,"why":"两套打架；应对齐事实。"},{"t":"用 /init 生成草稿再人工改","ok":false,"why":"这是推荐起步。"},{"t":"把密钥写进 AGENTS.md 方便 Agent","ok":false,"why":"密钥永不进仓。"}]}]}
\`\`\`

---

## 5. 接到第五章

Rules · Skills · Subagents · \`AGENTS.md\` **机制**在第五章展开；本课只钉运营事实：

> **先写文件，再换工具；一套真相，多套表面。**

## 下一步

回 **Vibe Coding 心智** 主脊，或 **最小贡献路径**。

## 结合知识导图2

| 本课运营事实 | 导图2 | 第五章展开 |
|--------------|-------|------------|
| \`AGENTS.md\` / Rules / Skills | **Skill** · **系统提示词** · **上下文工程** | 机制课在第五章 |
| 一套真相多套表面 | 同上 | 勿两套交底打架 |
| 先写文件再换工具 | Vibe Coding / Agent | 工具换了，仓内约定仍在 |

`;
