/** Markdown */
export default `# Markdown

> **Markdown** = 用少量符号写文档的轻量标记（\`#\` 标题、\`-\` 列表、\`**加粗**\`）。  
> 本仓 \`AGENTS.md\`、skills、\`README\`、办事助手文稿都在用——**给人读，也给 Agent 读**。  
> 常见方言：GitHub Flavored Markdown（GFM：表格、任务列表、围栏代码块）。

## 先认词

| 写法 | 白话 |
|------|------|
| \`#\` / \`##\` / \`###\` | 一 / 二 / 三级标题 |
| \`- \` / \`1.\` | 无序 / 有序列表 |
| \`**文字**\` \`*斜体*\` | 加粗 / 斜体 |
| \`\\\`代码\\\`\` | 行内代码 |
| \`\\\`\\\`\\\`js\` … \`\\\`\\\`\\\`\` | 围栏代码块（可标语言） |
| \`[文案](url)\` | 链接 |
| \`\\| 表头 \\|\` | 表格（GFM） |
| \`>\` | 引用块 |
| **AGENTS.md** | 给 Coding Agent / 开发者的项目说明书 |

\`\`\`markdown
# 一级标题
## 二级

- 列表项
- **加粗** 与 \`行内代码\`

| 列 A | 列 B |
|------|------|
| 1    | 2    |

\`\`\`js
console.log('fence')
\`\`\`
\`\`\`

\`\`\`flip
{"title":"Markdown 翻卡","cards":[{"front":"和 Word 比？","back":"纯文本+符号；Git 友好、diff 清晰、Agent 好读"},{"front":"根 AGENTS.md","back":"框架/Core 禁区与放码约定"},{"front":"写太花？","back":"交底：短句、清单、表格够用"},{"front":"HTML 混写","back":"GFM 常允许少量 HTML；教学交底尽量少用"}]}
\`\`\`

## 本仓哪些文件是 Markdown

| 文件 | 读者 |
|------|------|
| 根 \`AGENTS.md\` | 框架 / Core 开发与多工具 Agent |
| \`.cursor/rules/*.mdc\` | Cursor（Markdown + frontmatter） |
| \`core/<core>/AGENTS.md\` | 产品 Agent |
| \`docs/*.md\` | 人读文档 |
| \`agents/\` → \`data/ai-workspace/\` | 办事助手注入 |

写交底时：**禁区、命令、验收** 用清单和表格，比抒情散文有效。详见 **项目记忆文件**。

\`\`\`quiz
{"title":"Markdown","questions":[{"q":"给 Agent 写仓库说明书，优先？","choices":[{"t":"长篇散文无结构","ok":false,"why":"难检索、易忽略。"},{"t":"短句 + 清单 + 表格钉禁区与命令","ok":true,"why":"可执行交底。"},{"t":"只放一张截图","ok":false,"why":"Agent 与 Git diff 不友好。"}]}]}
\`\`\`

## 建议练习

1. 在任意编辑器新建 \`note.md\`，写标题、列表、一个表格、一个代码块  
2. 推到 GitHub 看渲染  
3. 打开本仓根 \`AGENTS.md\`，找「放码」与「禁止」两段怎么写的  

## 下一步

**环境变量** — 密钥与机器相关值怎么进进程。  
**项目记忆文件** — Markdown 交底落在哪。
`;
