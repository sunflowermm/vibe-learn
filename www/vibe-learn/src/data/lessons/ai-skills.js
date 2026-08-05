export default `# 技能

> **本课位置**：学习路径**驯服**段。  
> **先修**：**规则**（护栏 vs 手册）。  
> **真源**：\`docs/agent-context.md\` §4 · \`docs/agents.md\`。  
> **下一课**：**子代理**——单个对话上下文仍不够时的隔离委派。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 职责 | 技能=按需手册/长流程；目录+按需读取 |
| 对照 | 不是每次全量灌入 |
| 本仓 | agents/skills/；Coding 的 .cursor/skills 不进办事链 |
| 跟 Agent | 大流程写成 skill，勿塞进每轮聊天 |

\`\`\`algo
{"kind":"tameinj","title":"渐进披露：目录卡 → 全文","autoplay":true,"speed":800}
\`\`\`

\`\`\`check
{"title":"技能通关","items":[{"id":"layers","text":"能说出目录卡 → SKILL.md → 附件三层","hint":"渐进"},{"id":"vs","text":"能对照技能按需 vs 规则常驻","hint":"边界"},{"id":"xrk","text":"知道注入的是 available_skills 目录，全文靠 tools.read","hint":"本仓"}]}
\`\`\`

## 定义

**技能（Skills）** = **按需加载**的流程与领域打法，通常以目录 + \`SKILL.md\` 存在。  
解决：「规则太胖、提示难版本管理、跨工具难移植」。

| 层级（渐进披露） | 进上下文的内容 |
|------------------|----------------|
| 第 1 层 | 名称与简短描述（目录卡） |
| 第 2 层 | 命中后再读 \`SKILL.md\` 全文 |
| 第 3 层 | 按需读 references / scripts 等附件 |

\`\`\`match
{"title":"三种东西","pairs":[{"id":"sk","left":"技能","right":"可发现、可版本管理的操作规范"},{"id":"rule","left":"规则","right":"宜短的硬约束"},{"id":"prompt","left":"临时提示","right":"只在本轮对话里的指令"}]}
\`\`\`

---

## 为什么需要技能

| 痛点 | 说明 |
|------|------|
| 巨型常驻规则 | 部署手册写进规则，每次对话都吃窗口 |
| 复制长提示 | 无法评审、无法复用到别的仓库 |
| 必须斜杠才触发又缺「描述驱动选用」 | 需要可被模型按描述自动挑选 |
| 锁死在某一编辑器私有格式 | 需要可移植的目录约定 |

---

## 本仓怎么做

| 行为 | 落点 |
|------|------|
| 种子技能 | \`agents/skills/standard/\`（含 \`agent-core\`、办公类等） |
| 运行时副本 | \`data/ai-workspace/{id}/skills/\`（缺啥补啥，不覆盖已有） |
| 注入形态 | \`<available_skills>\`：**目录**（名称 + 路径），不是全文 |
| 读细则 | 模型调 \`tools.read\` 打开对应 \`SKILL.md\` |
| 预算 | \`agentWorkspace.maxSkillsInPrompt\` 等；超限会压缩或截断 |
| 配置根 | \`customSkillRoots\`（默认标准库 + 工作区技能目录） |

对照：\`docs/agents.md\` · \`docs/agent-context.md\` · 第四章 **办事助手**。  
开发者用的 \`.cursor/skills/xrk-*\` 是**另一舞台**，不进办事助手注入链。

\`\`\`quiz
{"title":"技能","questions":[{"q":"本仓默认注入技能时，优先进窗口的是？","choices":[{"t":"每个技能的全部 SKILL.md 正文","ok":false,"why":"会撑爆窗口。"},{"t":"名称与路径等目录信息，全文按需再读","ok":true,"why":"渐进披露。"},{"t":"只有 Cursor 的 xrk 技能","ok":false,"why":"那是开发舞台。"}]},{"q":"技能相对规则，更适合承载？","choices":[{"t":"三千字部署与排障流程","ok":true,"why":"长流程按需加载。"},{"t":"「禁止提交密钥」一类一句话红线","ok":false,"why":"红线宜放规则常驻。"},{"t":"替代 maxToolRounds","ok":false,"why":"步数预算是运行时配置。"}]}]}
\`\`\`

## 下一课

主对话被搜索/审查噪音填满时——**子代理**。
`;
