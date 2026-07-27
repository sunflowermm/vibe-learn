/** Agent Skills */
export default `# Skills · 技能包

> **时间线：约 2025 末起** 被推成开放标准（Agent Skills / \`SKILL.md\`；Cursor、Claude Code、Codex 等对齐）。  
> Skills = **按需加载的流程与领域打法**，解决「Rules 太胖、提示难版本管理」。

## 时间线上的位置

上一课：Rules 做常驻护栏。  
本课：把多步流程拆成 **可发现、可版本管理、渐进展开** 的技能包。  
下一课：单个对话上下文仍不够时 → **子代理** 分包。

---

## 为什么诞生

\`\`\`match
{"title":"Skills 配对","pairs":[{"id":"sk","left":"Skill","right":"可注入的能力说明与操作规范"},{"id":"rule","left":"Rules","right":"更偏长期约束与仓库约定"},{"id":"prompt","left":"临时提示","right":"单次对话里的指令"}]}
\`\`\`

| 痛点 | 说明 |
|------|------|
| **巨型 always-on 规则** | 把部署手册写进 Rules，每次对话都吃上下文 |
| **复制长提示** | 无法 code review、无法复用到别的仓库 |
| **斜杠命令半吊子** | 要显式触发，又缺少「描述驱动自动选用」 |
| **跨工具不移植** | 只活在某一 IDE 的私有格式里 |

需要：**目录化 + \`SKILL.md\` + 只在相关时加载全文**。

---

## 它有什么作用

| 作用 | 人话 |
|------|------|
| **打包怎么做** | 部署、开 PR、查日志……一步步教 Agent |
| **渐进披露** | 先只进 name/description；命中再读正文；再按需读 references/scripts |
| **可移植** | 同一套 Skills 思路跨多种 Agent 产品 |
| **可调用** | \`/skill-name\` 或由模型按描述自动选用 |

\`\`\`text
.cursor/skills/deploy-staging/
  SKILL.md
  scripts/        # 可选
  references/     # 可选
\`\`\`

---

## 深入浅出

| | Rules | Skills |
|--|-------|--------|
| 比喻 | 公司制度墙上的告示 | 岗位操作手册（用时才翻） |
| 长度 | 宜短 | 可以较长，但分文件 |
| 加载 | 常驻或 glob | 描述匹配 / 斜杠 |

三级加载：目录卡（L1）→ 全文（L2）→ 附件与脚本（L3）。

## 接到下一站

主对话被搜索/审查噪音填满时——下一课 **子代理（Subagent）**。
`;
