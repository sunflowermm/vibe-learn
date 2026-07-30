/** Vibe Coding 心智（含安全与提问） */
export default `# Vibe Coding 心智

> **路径 A 主入口**：用 Coding Agent 读写仓库、跑命令；你负责目标、约束、验收与责任。  
> **路径 B**（RAG / MCP / 办事助手 / 智能体循环）走 **第五章**，不要和「选 Cursor」混成一门。  
> 选型：**形态与黄页**。交底：**项目记忆文件**。

## 词从哪来

业界口语 **vibe coding**（亦作 vibecoding）：大致指**用自然语言驱动 Agent 改代码**，人把精力放在意图与验收上。名字会过时，**五拍与审 diff 不会**。

Coding Agent 的工程名常叫 **agent harness**：Instructions（规则/交底）+ Tools（文件/终端/MCP）+ Model。见 Cursor [Agent best practices](https://cursor.com/blog/agent-best-practices)。

## 先认词

| 写法 | 白话 |
|------|------|
| **Vibe coding** | 对话驱动多步施工，不是只 Tab 补全 |
| **Plan / Agent** | 先对齐计划再改（Cursor 常 \`Shift+Tab\` 开 Plan Mode） |
| **diff** | 改动对比；**Accept 前必看** |
| **验收** | 可观察的成功信号（命令输出、页面、测试） |
| **上下文** | 窗口有限；新任务常**新开对话**比硬续聊更干净 |

\`\`\`flip
{"title":"Vibe 翻卡","cards":[{"front":"默认用 AI？","back":"可以；不等于零验收上线"},{"front":"还学基础？","back":"否则审不了 diff、排不了层、写不出约束"},{"front":"Plan 失败了？","back":"改计划重跑，往往比在烂实现上追问更快"},{"front":"A 与 B","back":"A=会用 Agent 写代码；B=第五章 LLM 应用"}]}
\`\`\`

---

## 五拍（唯一要背的流程）

\`\`\`steps
{"title":"Vibe 五拍","steps":[{"title":"目标","body":"一句话要完成什么"},{"title":"现场","body":"OS、路径、已做、报错原文"},{"title":"约束","body":"pnpm；勿改 src/；勿交密钥…"},{"title":"验收","body":"哪条命令/哪页算过"},{"title":"审 diff + 跑通","body":"看改了哪些文件；本机再跑"}]}
\`\`\`

推荐节奏（与官方「先 Plan」同向）：**Ask/Plan → 小范围 Agent → 审 diff → 跑通 → 再提交**。

\`\`\`decide
{"title":"该 vibe 还是该自己练？","start":"start","steps":[{"id":"start","q":"你卡住的是？","options":[{"label":"装环境 / clone / 代理","next":"env"},{"label":"语法作业 / 过关","next":"drill"},{"label":"本仓插件 / HTTP / 配置","next":"xrk"},{"label":"只会空喊「帮我弄」","next":"prompt"}]},{"id":"env","result":"Agent 出检查表；你跑命令并回贴输出。","detail":"去：工作台·排障 → 首次跑通。"},{"id":"drill","result":"Agent 当教练：先提示再评审，禁止完整答案。","detail":"去：过关练习。"},{"id":"xrk","result":"先读放码与实践清单，再委派。","detail":"约束写明勿改 Runtime。去：最小贡献路径。"},{"id":"prompt","result":"用下面「提问四件套」重写一句再发。","detail":"无目标/无报错/无验收 = 无效委派。"}]}
\`\`\`

---

## 安全底线

| 项 | 做 |
|----|----|
| 审 diff | 接受前看改了哪些文件；警惕「顺手重构」 |
| 小步 | 一大句拆成可验收小步；一次一个假设 |
| 密钥 | 不写进将提交的文件；\`.env\` 勿提交；聊天里也慎贴生产密钥 |
| 禁区 | 勿改 \`src/infrastructure\`；娱乐插件勿加主仓白名单 |
| 高危命令 | 删库、\`push --force\`、改防火墙 — **你**点头 |
| CI / 跑通 | AI 改完仍要本机或流水线验证 |

\`\`\`quiz
{"title":"反模式","questions":[{"q":"最危险的一句？","choices":[{"t":"先 plan，再小范围改，再审 diff","ok":false,"why":"推荐节奏。"},{"t":"整个项目重构一下，不用看","ok":true,"why":"无边界、不可审。"},{"t":"这是堆栈原文，请指出文件:行号","ok":false,"why":"好提问。"}]}]}
\`\`\`

---

## 提问四件套 + 速查地图

| 块 | 写什么 | 反例 |
|----|--------|------|
| **目标** | 要完成什么 | 「弄一下」 |
| **现场** | OS、目录、已做、**报错原文** | 「打不开了」无日志 |
| **约束** | 工具链与禁区 | 不说 pnpm / 乱改 src/ |
| **验收** | 怎样算成功 | 「看着办」 |

| 场景 | 可这样问（复制后改现场） |
|------|--------------------------|
| 代理 / clone | 「Git Bash 能开网页但 clone 超时。按分层排查；给出本会话 \`HTTP_PROXY=7890\`；勿改业务代码。」 |
| 首次跑通 | 「仓库在…。按 pnpm i → Redis → node app 指导；每步说成功信号；卡住只要日志。」 |
| 过关练习 | 「当教练辅导 stats.js；先提示再评审，勿直接完整答案。」 |
| 读报错 | 「堆栈如下。指出第一帧我的文件:行号与最小修复；勿重构。」 |
| 最小插件 | 「\`core/…/plugin/\` 写 PluginBase，\`/^#lab$/\` → \`lab-ok\`。勿改 src/；constructor 不建 Map。」 |
| 配置三同步 | 「独立产品加 \`feature.enabled\`。先列 default/schema/消费三处路径，我确认再改。」 |
| 面板 / 反代 | 「node 已在 127.0.0.1:PORT。给出只暴露 80/443 的反代+证书步骤；先清单后改生产。」 |

委派部署：**先本机跑通 → 一次一层 → 密钥走环境变量 → 高危你确认**。

---

## 驾照（Agent 替不了）

终端分层排障 · 读堆栈 · Git diff/PR · JSON/YAML/env · 本仓放码边界 · 可观察的验收。

主脊：\`排障 → 首次跑通 → 最小路径 → 实践课\`（带着五拍走）。

---

## 下一步

1. **形态与黄页** — IDE / CLI / 云端与品牌事实钉  
2. **项目记忆文件** — \`AGENTS.md\` / Rules / Skills  
3. 回主脊：**工作台 · 排障** → **首次跑通** → **最小贡献路径**  
`;
