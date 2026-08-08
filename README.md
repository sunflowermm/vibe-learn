# vibe-learn

> 基于 [XRK-AGT](https://github.com/sunflowermm/XRK-AGT) 的 `www` 学习站：知识节点图谱（Vue Flow）+ 题库。

**先看站：** [https://sunflowermm.github.io/vibe-learn/](https://sunflowermm.github.io/vibe-learn/)

## 连接

| 用途 | 链接 |
|------|------|
| 在线访问 | [GitHub Pages](https://sunflowermm.github.io/vibe-learn/) |
| 本仓库 | [github.com/sunflowermm/vibe-learn](https://github.com/sunflowermm/vibe-learn) |
| 挂到主服后 | `http://<主机>:<端口>/vibe-learn/`（应用目录 `www/vibe-learn/`） |

旧站路径 `…/vibe-learn-Core/` 已失效，请改用上表。

## 安装

需要 [Node.js](https://nodejs.org/)（建议 ≥ 22）与 [pnpm](https://pnpm.io/)。

### 只跑前端（最快）

```bash
git clone https://github.com/sunflowermm/vibe-learn.git
cd vibe-learn/www/vibe-learn
pnpm install
pnpm dev
```

也可在仓库页点 **Code → Download ZIP**，解压后进入 `www/vibe-learn` 再执行上面的 `pnpm` 命令。

### 挂到 XRK-AGT 主仓

在已有 [XRK-AGT](https://github.com/sunflowermm/XRK-AGT) 工作区根目录：

```bash
git clone https://github.com/sunflowermm/vibe-learn.git core/vibe-learn
```

主服启动后访问 `/vibe-learn/`（由 `www/vibe-learn/sign.json` 挂载；静态优先 `dist`）。

### 发布公开站（维护者）

```bash
cd www/vibe-learn
pnpm deploy:pages
```

推送到本仓 `gh-pages`。已配置 SSH 的维护者可按需把上面的 `https://` clone 换成 SSH；**文档默认只给 HTTPS**，避免未配密钥的用户直接复制失败。

## 知识体系（怎么读）

**入口分叉**

| 路径 | 目标 | 入口 |
|------|------|------|
| **A · Vibe** | 会用 Coding Agent 写代码、跑 XRK | 番外 **Vibe Coding 心智** → **知识导图2** |
| **B · LLM 应用** | RAG / MCP / 办事助手 / 智能体 | **第五章**（面板跨导图 ↔ 知识导图2） |
| **C · 选读** | 语言观光、DSA、ESP32、面板深挖 | 对应番外；不挡主脊 |

**主脊 A（驾照）**

`Vibe 心智 → 排障 → 首次跑通 → 01.5 过关 → 最小贡献路径 → 实践课`（表达词表见 **知识导图2**）

AI 工具框只保留：**心智 · 形态黄页 · 项目记忆**（产品专课已收进黄页）。

**全局工具（顶栏）**

| 入口 | 作用 | 数据 |
|------|------|------|
| **左上角导图切换** | **知识导图** / **知识导图2** / 题库 | `src/data/maps.js` |
| **词典** | 搜索术语；点选释义钉在列表上方 | `src/data/glossary.js`（含 `vh_*`；与本仓去重） |
| **书架** | 书签 / 笔记 / 足迹（本机） | IndexedDB |

**知识导图2（Vibe Coding 词表）**

| 项 | 说明 |
|----|------|
| 来源 | [VibeHub](https://vibe-hub.org/)（署名 oil） |
| 入口 | `?map=knowledge2` |
| 串联 | 第五章 / Vibe 心智面板「跨导图」→ 对应词条；导图2 可回知识导图 |
| 导图 | 七大区 × **245 词条卡** |
| 题组 | `quiz/sets/vibehub-practice.js`（`domain: vibe`，原站判断 **223/245**） |
| 同步 | `pnpm vibehub:sync` |

**题库模块（静态落盘）**

| 路径 | 作用 |
|------|------|
| `quiz/categories.js` | kind（大厂/概念）× domain（领域） |
| `quiz/schema.js` | `defineQuizSet` / 四选一；**禁止**静默填充干扰项 |
| `quiz/sets/*.js` | 精选题组；新建后在 `quiz/index.js` 的 `REGISTRY` 登记 |
| `quiz/bank/{domain}.js` | **静态全库分片**（人工可审）；生产只读此处 |
| `quiz/bank/glossary.js` | **名词释义题**（名词→释义 / 释义→名词）；`pnpm run quiz:glossary` |
| `quiz/bank.js` | 聚合 API：`pickRandom` / `questionsForNode` / `glossaryPoolMeta` |
| `quiz/graph.js` | 题库导图（随机枢纽 + 名词池 + 领域框） |
| `quiz/derive/` · `_migrate/` | **不进生产**；仅迁移脚本历史参考 |

约定：每题 **4 选项、恰一正确**；`relatedNodes` 每题点名知识节点；URL `?map=quiz&qset=…&qnode=…`。课面板「刷本课相关题」跳题库。刷题台：**随机 / 刷名词 / 错题本**。

**扩题**：改 `sets/*.js` 并登记 REGISTRY；改编包真源在 `bank/adapted-*.js`，`pnpm quiz:sync-sets` 生成题组（勿再写入 `STATIC_QUESTIONS`）。校验：`pnpm run quiz:audit`。名词题：`pnpm quiz:glossary`。VibeHub 词条更新：`pnpm vibehub:sync` 后再跑名词题与审计。

**错题本**：答错写入 IndexedDB；可再练 / 标掌握 / 清空；导出含 `quizAttempts` / `quizWrong`。选错展示教学 `why` 与正确答案（名词题会点明「这段对应哪个名词」）。

## 章节

| 章 | 名称 | 内容块（摘要） |
|----|------|----------------|
| 00 | 序章 · 认识计算机 | 系统本质 · 软硬件 · CPU/GPU… |
| 01 | 环境与终端 | 终端 · Linux · Node/pnpm/Git · 工作台/排障 · 首次跑通 |
| 01.5 | 编程基础 | JS 动手 · 正则/TS · JSON/YAML/MD/env · 过关 |
| 02 | 计算机语言 | 语言/框架观光（主修在 01.5） |
| 03 | 计算机网络 | HTTP → 动手 → 反代 → Nginx |
| 04 | XRK-AGT | 最小路径 · 部署 · Runtime/Core · 实践 |
| 05 | 人工智能 | **路径 B**：Embedding → RAG → 工具/MCP/智能体；本仓对照含出站压缩 · policies · recipes（见第四章管线/办事助手） |
| （独立） | **知识导图2** | 左上角切换；Vibe Coding 词表；与第五章跨导图串联 |
| 番外 | 代理 / 数据库 / 容器 / 本机目录 / ESP32 | 按需 |
| 番外 | 工程素养 | 调试 · 安全 · 测试 · 观测 · CI |
| 番外 | DSA / 面板 / 主机 | 选读；上线可与部署课对照 |
| 番外 | **AI 编程工具** | **Vibe 心智 · 形态黄页 · 项目记忆**（3 卡） |

数据入口：`www/vibe-learn/src/data/nodes.js`。  
Cursor 精工约定：本仓 [`.cursor/rules/vibe-learn-craft.mdc`](.cursor/rules/vibe-learn-craft.mdc)（独立 git；挂主仓时主仓仅 globs 路由）。  
XRK Agent 真源（在 [XRK-AGT](https://github.com/sunflowermm/XRK-AGT) 仓，勿用相对 `../../docs`——GitHub 上会断链）：

- [docs/agent-context.md](https://github.com/sunflowermm/XRK-AGT/blob/main/docs/agent-context.md)
- [docs/agents.md](https://github.com/sunflowermm/XRK-AGT/blob/main/docs/agents.md)
- [docs/ai-workflow.md](https://github.com/sunflowermm/XRK-AGT/blob/main/docs/ai-workflow.md)
- 根 [AGENTS.md](https://github.com/sunflowermm/XRK-AGT/blob/main/AGENTS.md)
