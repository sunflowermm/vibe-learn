export default `# 项目记忆文件

> Agent **不会**自动知道你仓库的禁区与习惯——除非写进它会加载的文件。  
> 行业正在汇聚到便携约定：**\`AGENTS.md\`**（多工具可读）+ 各产品私有目录（\`.cursor/rules\`、\`CLAUDE.md\`…）。  
> 前置：**Vibe Coding 心智**；选型：**形态与黄页**。  
> **学会之后**：能列出本仓该写进 \`AGENTS.md\` / Rules 的禁区要点，并避免两套文件事实打架。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 为何写文件 | 会话会忘；Git 可审；换工具可复用 |
| 分工 | Rules 短约束；Skills 长流程；AGENTS.md 便携说明书 |
| 本仓 | 禁区、pnpm、Node 版本、配置三同步优先写进交底 |
| 反模式 | 密钥进仓；CLAUDE.md 与 AGENTS.md 事实相反 |

\`\`\`check
{"title":"项目记忆通关","items":[{"id":"why","text":"能说明会话会忘、文件可审可复用","hint":"为何"},{"id":"split","text":"分清 Rules 短约束 vs Skills 长流程","hint":"分工"},{"id":"xrk","text":"能指出本仓 AGENTS / rules 落点","hint":"本仓"},{"id":"anti","text":"拒绝密钥进仓与两套文件事实打架","hint":"反模式"}]}
\`\`\`

\`\`\`algo
{"kind":"memfiles","title":"交底分层：AGENTS · Rules · Skills · 产品私有","autoplay":true,"speed":800}
\`\`\`

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

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 根 \`AGENTS.md\` | 放码、禁区、pnpm、Node≥26 |
| \`.cursor/rules\` | 短约束；\`alwaysApply\` / globs |
| skills | 长流程按需；勿整本塞进 Always Rule |
| 产品 \`AGENTS.md\` | 若有，与根交底事实对齐 |

## 下一步

回 **Vibe Coding 心智** 主脊，或 **最小贡献路径**。
`;
