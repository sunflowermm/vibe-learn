/** Markdown */
export default `# Markdown

> **Markdown** = 用少量符号写文档的轻量标记（\`#\` 标题、\`-\` 列表、\`**加粗**\`）。  
> 本仓 \`AGENTS.md\`、skills、办事助手文稿都在用——**给人读，也给 Agent 读**。

## 先认词

| 写法 | 白话 |
|------|------|
| \`#\` / \`##\` | 一级 / 二级标题 |
| \`- \` | 无序列表 |
| \`**文字**\` | 加粗 |
| \`\\\`代码\\\`\` | 行内代码 |
| **AGENTS.md** | 给 Coding Agent / 开发者的项目说明书 |

\`\`\`markdown
# 一级标题
## 二级

- 列表项
- **加粗** 与 \`行内代码\`
\`\`\`

\`\`\`flip
{"title":"Markdown 翻卡","cards":[{"front":"和 Word 比？","back":"纯文本+符号；Git 友好、Agent 好读"},{"front":"根 AGENTS.md","back":"框架/Core 禁区与放码约定"},{"front":"写太花？","back":"教学与交底：短句、清单、表格够用"}]}
\`\`\`

| 文件 | 读者 |
|------|------|
| 根 \`AGENTS.md\` | 框架/Core 开发 |
| \`core/<core>/AGENTS.md\` | 产品 Agent |
| \`agents/\` → ai-workspace | 办事助手注入 |

## 下一步

**环境变量** — 密钥与机器相关值怎么进进程。
`;
