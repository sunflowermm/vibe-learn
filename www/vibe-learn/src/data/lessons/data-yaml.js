/** YAML */
export default `# YAML

> **YAML**（常读作「Yamel」）是一种靠**缩进**表达层次的文字格式。  
> 本仓大量配置写成 \`*.yaml\`：比 JSON 好写注释、少括号，但缩进错了就会「看起来对、其实挂」。

## 先认词

| 写法 | 白话 |
|------|------|
| **缩进** | 用空格把「父子关系」对齐；同级必须对齐 |
| **键值** | \`port: 3000\`（冒号后面通常有一个空格） |
| **列表** | 用 \`- \` 开头的项 |
| **注释** | \`#\` 开头；JSON 做不到 |
| **schema** | 「配置长什么样」的说明书（本仓 commonconfig） |
| **三同步** | 改配置常要动：模板 yaml + schema + 读它的代码 |

\`\`\`yaml
# 注释可以写在这里
server:
  port: 3000
  host: 127.0.0.1
enabled: true
features:
  - redis
  - sqlite
\`\`\`

| 坑 | 说明 |
|----|------|
| **缩进** | 同级对齐；**不要**混用 Tab 和空格 |
| **冒号后空格** | 写成 \`key: value\`，不是 \`key:value\`（部分解析器挑剔） |
| **特殊字符** | 含 \`:\` \`#\` 的字符串常需加引号 |
| **和 JSON 比** | YAML 人改友好；HTTP API 身体仍常用 JSON |
| **多文档** | \`---\` 分隔（少见；知道即可） |

\`\`\`flip
{"title":"YAML 翻卡","cards":[{"front":"为什么本仓爱 YAML？","back":"人改配置多；缩进层次清楚，可写注释"},{"front":"只改 yaml 够吗？","back":"正经产品还要 schema + 消费代码（三同步）"},{"front":"独立产品配置放哪？","back":"core/<名>/default/，不是乱塞运行时默认仓"},{"front":"Tab","back":"别用；统一空格缩进"}]}
\`\`\`

## 接到本仓

| 配置类型 | 路径 |
|----------|------|
| 运行时 / system | \`config/default_config/\` |
| 独立产品 Core | \`core/<名>/default/\` + \`data/<产品>/\` + \`commonconfig/\` |

改字段时 Agent 应先列**三处路径**再动手——见实践 · 配置课与 **项目记忆文件**。

\`\`\`quiz
{"title":"YAML","questions":[{"q":"同级两个键缩进一个空格一个四个空格，会怎样？","choices":[{"t":"YAML 自动对齐","ok":false,"why":"不会；层次会乱或解析失败。"},{"t":"结构错乱或解析报错","ok":true,"why":"缩进就是语法。"},{"t":"只影响美观","ok":false,"why":"YAML 里缩进有语义。"}]},{"q":"独立产品新开关 feature.enabled，最少动几处？","choices":[{"t":"只改一份运行时 yaml","ok":false,"why":"缺 schema/消费会漂。"},{"t":"default 模板 + schema + 读配置的代码","ok":true,"why":"三同步。"},{"t":"只改前端文案","ok":false,"why":"不够。"}]}]}
\`\`\`

## 下一步

**Markdown** — 文档与 Agent 说明书。  
动手：**实践 · 配置三同步**。
`;
