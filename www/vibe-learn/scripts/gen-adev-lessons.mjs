/**
 * Generate AI coding tools chapter. Run: node scripts/gen-adev-lessons.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/lessons');

function lesson(comment, md) {
  return `/** ${comment} */\nexport default ${JSON.stringify(md)};\n`;
}

const files = {
  'chapter-adev.js': lesson(
    '番外 · AI 编程工具',
    `# 番外 · AI 编程工具

> 2025–2026：写代码的「副驾驶」从补全，变成 **能读仓库、改文件、跑命令的 Agent**。  
> 本框按 **形态** 分清产品，再落到 Cursor / Claude Code / Codex / OpenCode / Qwen Code / Trae。  
> 概念底座在第五章（智能体循环、MCP、Rules/Skills、\`AGENTS.md\`）；本框讲**选型与上手心智**。

## 阅读顺序

1. **形态地图** — IDE · CLI · 云端 · 开源 Harness  
2. 产品课：Cursor → Claude Code → Codex → OpenCode → Qwen Code → Trae  
3. **对照选型** → **项目记忆文件** → **安全用法**  

## 与前后章

| 章 | 关系 |
|----|------|
| 工作台 · 编辑器 | 先会开仓库根；再选 AI IDE |
| Agent CLI（第五章） | 抽象形态；本框给具体产品 |
| AGENTS.md / Rules / Skills | 各工具都要读项目说明书 |
| 工程素养 | 审 diff、CI、密钥 — 不因 AI 而省略 |
`
  ),

  'adev-shape.js': lesson(
    'AI 编程形态地图',
    `# AI 编程形态地图

> 先分清**长什么样**，再比品牌。形态决定你怎么开它、风险在哪。

## 四类形态

| 形态 | 你在哪交互 | 代表（本框有课） | 直觉 |
|------|------------|------------------|------|
| **AI IDE** | 桌面编辑器（常为 VS Code 分支） | Cursor、Trae | 看文件 + 聊 + Agent 同屏 |
| **Agent CLI** | 终端 TUI / 命令 | Claude Code、Codex CLI、OpenCode、Qwen Code | SSH/无 GUI 也能干；可脚本化 |
| **云端 Agent** | 网页 / 手机派任务 | Cursor Cloud Agents、ChatGPT Codex Web | 沙箱里跑，回来看 PR/演示 |
| **开源 Harness** | 自选模型 + 本地跑 | OpenCode、Qwen Code、Codex（Apache） | 可换模型、可自托管倾向 |

\`\`\`mermaid
flowchart TB
  TASK[自然语言任务] --> LOOP[读仓库 → 改文件 → 跑命令 → 观察]
  LOOP --> IDE[AI IDE]
  LOOP --> CLI[Agent CLI]
  LOOP --> CLOUD[云端沙箱]
  IDE --> MEM[项目记忆: AGENTS/Rules/Skills]
  CLI --> MEM
  CLOUD --> MEM
\`\`\`

\`\`\`flip
{"title":"形态翻卡","cards":[{"front":"补全 ≠ Agent","back":"Tab 建议下一行；Agent 会多步施工"},{"front":"IDE ≠ CLI","back":"一个偏可视化结对，一个偏终端执行引擎"},{"front":"厂商锁","back":"有的绑自家模型；有的多协议/开源"}]}
\`\`\`

## 共同底座（第五章已讲）

智能体循环、工具调用、MCP、规则与技能、项目交底文件——**换皮不换骨**。

## 下一步

从 **Cursor** 开始（本仓日常最常见的 AI IDE），再看 CLI 族。
`
  ),

  'adev-cursor.js': lesson(
    'Cursor',
    `# Cursor

> **Cursor**（Anysphere）：基于 VS Code 的 **AI 原生 IDE**，日常结对写代码的主流选择之一。  
> 官网：[cursor.com](https://cursor.com/) · 文档含 Agent / Plan / Ask / Debug 等模式。

## 它是什么

| 点 | 说明 |
|----|------|
| 血统 | VS Code 分支：扩展、快捷键、工作区习惯可迁移 |
| 核心 | **Agent**：读仓库、改多文件、跑终端、迭代到任务完成或触顶 |
| 模式 | Agent（施工）· Ask（只读问）· Plan（先方案再动手）· Debug（偏运行时证据） |
| 扩展 | MCP、Subagents（\`.cursor/agents/\`）、Rules/Skills、Cloud / 后台 Agent |

\`\`\`steps
{"title":"Cursor 最小上手","steps":[{"title":"打开仓库根","body":"与工作台课同一习惯"},{"title":"选模式","body":"施工用 Agent；先搞懂用 Ask"},{"title":"写清任务","body":"目标、约束、如何验收"},{"title":"审 diff","body":"接受前看改动与命令"}]}
\`\`\`

## 和本仓

本仓库大量 **\`.cursor/rules\`、skills、AGENTS.md** 就是给 Cursor / 同类 Agent 读的项目交底。  
写 Core：别让 Agent 乱改 \`src/\` 底层（见项目规则）。

## 官方入口

- Agent 帮助：[cursor.com/help](https://cursor.com/help/ai-features/agent)  
- 产品在向 **Agent-first** 界面演进（本地/云端 Agent 并列管理）

## 下一步

**Claude Code**（终端执行引擎对照）· **项目记忆文件**。
`
  ),

  'adev-claude-code.js': lesson(
    'Claude Code',
    `# Claude Code

> **Claude Code**（Anthropic）：**终端里的 Agent 编程工具**——读仓库、改文件、跑命令、处理 Git 流程，用自然语言下达任务。  
> 文档：[code.claude.com/docs](https://code.claude.com/docs/en) · GitHub：\`anthropics/claude-code\`

## 形态

| 点 | 说明 |
|----|------|
| 主表面 | 终端 CLI（另有 IDE 扩展、桌面/网页等） |
| 安装（示意） | macOS/Linux：官方 install.sh；Windows：官方 install.ps1 / WinGet（以官网为准） |
| 启动 | 在项目目录执行 \`claude\` |
| 项目记忆 | 常用 **CLAUDE.md**（根目录交底）；亦可配合 MCP、Plan 模式 |
| 账号 | Claude 订阅或 Anthropic Console / 第三方接入（见文档） |

\`\`\`flip
{"title":"Claude Code 翻卡","cards":[{"front":"执行引擎","back":"偏「在壳里自主施工」，不只聊天贴代码"},{"front":"与 Cursor","back":"一个 CLI 主场，一个 IDE 主场；可并存"},{"front":"权限","back":"能跑 bash = 高风险，要确认与规则"}]}
\`\`\`

## 适合

- SSH / 无完整 GUI、运维向、长程多文件改造  
- 已习惯终端与 Git 工作流的人  

## 下一步

**Codex**（OpenAI 终端/云端线）· **对照选型**。
`
  ),

  'adev-codex.js': lesson(
    'OpenAI Codex',
    `# OpenAI Codex

> **Codex** 在 2026 语境下主要指 OpenAI 的 **编码 Agent 产品线**：本地 **Codex CLI**、编辑器插件、以及 ChatGPT 侧的 **Codex 云端任务**。  
> CLI 仓库：[github.com/openai/codex](https://github.com/openai/codex)（Apache-2.0，Rust 实现）

## 怎么理解它

| 表面 | 作用 |
|------|------|
| **Codex CLI** | 本机终端 Agent：读仓库、改文件、在沙箱里跑命令 |
| **编辑器集成** | 在 VS Code / Cursor 等里用 Codex |
| **Codex Web / Cloud** | 浏览器派任务，沙箱里跑，适合异步委派 |

\`\`\`match
{"title":"Codex 配对","pairs":[{"id":"i","left":"安装示意","right":"npm i -g @openai/codex 或 brew cask（以官网为准）"},{"id":"r","left":"启动","right":"仓库目录执行 codex"},{"id":"a","left":"鉴权","right":"ChatGPT 计划登录或 API Key"}]}
\`\`\`

## 特点直觉

- 强调 **沙箱执行**（未授权时限制乱碰整机）  
- 与 **ChatGPT 订阅配额** 绑定深（亦支持 API）  
- 开源 CLI 便于审计；模型与云端能力仍走 OpenAI  

## 和 Cursor 怎么配

常见组合：**Cursor 做日常 IDE 结对**，**Codex 做可委派的异步/沙箱任务**（非强制）。

## 下一步

**OpenCode**（开源、多模型）· **对照选型**。
`
  ),

  'adev-opencode.js': lesson(
    'OpenCode',
    `# OpenCode

> **OpenCode**：开源 AI Coding Agent（MIT），可在 **终端 / 桌面 / IDE 扩展** 使用；强调 **多模型供应商** 与隐私取向。  
> 官网：[opencode.ai](https://opencode.ai/)

## 要点

| 点 | 说明 |
|----|------|
| 定位 | 开源 Harness：不绑死单一厂商模型 |
| 模型 | 经 Models.dev 等接入多家云端 + 本地（如 Ollama） |
| 交互 | TUI；常见 Build（可写）/ Plan（只读）等模式切换 |
| 安装示意 | \`curl -fsSL https://opencode.ai/install \\| bash\` 或 npm（以官网为准） |
| 注意 | 厂商订阅 OAuth 政策会变（例如 Claude 订阅登录限制）；API Key / 其它渠道仍可用 |

\`\`\`flip
{"title":"OpenCode 翻卡","cards":[{"front":"为何选它","back":"要开源、可换模型、少锁死一家"},{"front":"不是什么","back":"不是「某个闭源 IDE 的免费破解版\"},{"front":"仍要","back":"项目记忆 + 审 diff + 密钥边界"}]}
\`\`\`

## 下一步

**Qwen Code**（国内模型/协议友好）· **对照选型**。
`
  ),

  'adev-qwen-code.js': lesson(
    'Qwen Code',
    `# Qwen Code

> **Qwen Code**（通义 / 阿里云开源线）：终端 Agent 编程工具，\`qwen\` 启动；多协议（OpenAI / Anthropic / Gemini / Qwen 等）与本地端点。  
> 用户口中的「Qcode」一般指它。  
> 文档：[qwenlm.github.io/qwen-code-docs](https://qwenlm.github.io/qwen-code-docs/en/users/overview/) · GitHub：\`QwenLM/qwen-code\`

## 要点

| 点 | 说明 |
|----|------|
| 安装示意 | \`npm i -g @qwen-code/qwen-code\`（以文档为准） |
| 启动 | 项目目录 \`qwen\`；无头 \`qwen -p "..."\` 便于脚本/CI |
| 鉴权 | 阿里云 Model Studio（编码计划 / Token / API Key）、第三方或自定义端点；会话内 \`/auth\`、\`/doctor\` |
| 能力面 | 改文件、跑命令、MCP、Plan、Skills、子代理等（与主流 Agent CLI 同族） |
| 语言 | 支持 UI / 输出中文设置（\`/language\`） |

\`\`\`steps
{"title":"Qwen Code 上手","steps":[{"title":"装好 Node 与 CLI","body":"全局包进 PATH"},{"title":"进仓库根","body":"与本仓打开方式一致"},{"title":"qwen + /auth","body":"配好模型通道"},{"title":"小任务试跑","body":"先 Ask/小改，再长大任务"}]}
\`\`\`

## 适合

- 想走 **通义 / 国内云** 或 **多协议自选**  
- 需要 **无头模式** 嵌进脚本  

## 下一步

**Trae**（字节 AI IDE）· **对照选型**。
`
  ),

  'adev-trae.js': lesson(
    'Trae',
    `# Trae

> **Trae**（字节跳动）：**AI 原生 IDE**（VS Code 血统），面向「结对 + 自动施工」；中文用户常见、免费档相对激进。  
> 另有 **SOLO** 等偏「一句话生成/推进整应用」的自主模式（产品形态会演进，以官网为准）。

## 要点

| 点 | 说明 |
|----|------|
| 形态 | 桌面 AI IDE +（可选）更自主的 SOLO/Builder 工作流 |
| 熟悉感 | VS Code 扩展/快捷键可迁移 |
| 卖点直觉 | 多模型切换、Agent/Builder、价格与配额策略亲民 |
| 注意 | 数据与合规（厂商属地）需按团队政策评估；配额/Token 制会变 |

\`\`\`match
{"title":"Trae 配对","pairs":[{"id":"i","left":"IDE 结对","right":"补全 + 对话改多文件"},{"id":"s","left":"SOLO / Builder","right":"更高自治的规划与施工"},{"id":"c","left":"与 Cursor","right":"同属 AI IDE 赛道，生态与账号体系不同"}]}
\`\`\`

## 和本仓

用 Trae 打开仓库根即可；项目规则仍靠 **AGENTS.md / 规则文件**——工具换皮，交底不换。

## 下一步

**对照选型** · **项目记忆文件**。
`
  ),

  'adev-compare.js': lesson(
    '对照选型',
    `# AI 编程工具 · 对照选型

> 没有「唯一正确答案」。按 **表面、模型、开源、配额、合规** 选主工具，其余当配角。

## 速查表

| 需求 | 更常偏向 |
|------|----------|
| 日常看文件 + 结对改代码 | **Cursor** 或 **Trae**（AI IDE） |
| SSH / 纯终端 / 长程施工 | **Claude Code**、**Codex CLI**、**OpenCode**、**Qwen Code** |
| 异步丢任务、云沙箱出 PR | **Codex Cloud** / Cursor Cloud Agents |
| 多模型、开源 Harness | **OpenCode**、**Qwen Code**、**Codex CLI** |
| 通义 / 国内云协议 | **Qwen Code** |
| 要读本仓规则与 skills | 任一 Agent + **项目记忆文件** 配齐 |

\`\`\`quiz
{"title":"选型","questions":[{"q":"只有 SSH、没有桌面 IDE 时，优先哪类？","choices":[{"t":"只能用 Trae 桌面版","ok":false,"why":"桌面 IDE 在纯 SSH 场景不可用。"},{"t":"Agent CLI（Claude Code / Codex / OpenCode / Qwen…）","ok":true,"why":"终端即主场。"},{"t":"只要补全插件","ok":false,"why":"补全不是完整 Agent 施工面。"}]}]}
\`\`\`

## 组合示例（非教条）

- **Cursor**（日常）+ **Claude Code / Codex**（重活/终端）  
- **OpenCode / Qwen**（换模型做实验）+ 同一套 \`AGENTS.md\`  

## 下一步

**项目记忆文件** — 让所有工具读同一份交底。
`
  ),

  'adev-project-memory.js': lesson(
    '项目记忆文件',
    `# 项目记忆文件

> Agent 再聪明，也不知道你仓库的**禁区与约定**——除非写进它会加载的文件。  
> 本仓真源：根 \`AGENTS.md\`、\`.cursor/rules\`、\`skills/\`、\`docs/agents.md\`。

## 常见文件（跨工具）

| 文件/目录 | 常见读者 | 写什么 |
|-----------|----------|--------|
| **AGENTS.md** | 多工具约定的项目说明书 | 放码位置、禁改区、命令 |
| **CLAUDE.md** | Claude Code | 架构与风格交底 |
| **.cursor/rules**、skills | Cursor 等 | 全局/领域规则与技能 |
| **.env.example** | 人 + Agent | 有哪些键，无真实密钥 |

\`\`\`flip
{"title":"记忆翻卡","cards":[{"front":"一套交底","back":"换 Cursor/CLI 都读同一事实"},{"front":"禁区写清楚","back":"如 Core 勿改 src/infrastructure"},{"front":"别靠聊天口头","back":"会话会丢；文件可版本管理"}]}
\`\`\`

## 接到第五章

Rules · Skills · Subagents · \`AGENTS.md\` 专课讲机制；本课钉：**先写文件，再换工具**。

## 下一步

**安全用法** · 或回 **最小贡献路径**。
`
  ),

  'adev-practice.js': lesson(
    'Agent 安全用法',
    `# Agent 安全用法

> Agent 能跑终端 = **高权限助手**。速度不能换掉审查。

## 底线清单

| 项 | 做 |
|----|----|
| 审 diff | 接受前看改了哪些文件 |
| 小步任务 | 一大句拆成可验收小步 |
| 密钥 | 不让 Agent 把 Key 写进仓；\`.env\` 勿提交 |
| 禁区 | 规则写明：勿动 Runtime / 勿加白名单娱乐插件 |
| 命令确认 | 删库、强制推送、改权限 — 人工点头 |
| CI / 测试 | AI 改完仍要跑通相关检查 |

\`\`\`steps
{"title":"推荐节奏","steps":[{"title":"Ask/Plan","body":"先搞懂再改"},{"title":"小范围 Agent","body":"单特性或单文件簇"},{"title":"审 diff + 跑通","body":"node/pnpm/测试"},{"title":"再提交","body":"Git 进阶课的 PR 流"}]}
\`\`\`

## 接到本仓

工程素养（调试/安全/测试/CI）与本课一起用；面板部署也不等于可以盲信 Agent 生成的反代配置。

## 出框

回 **对照选型** 或 **实践 · 最小插件**（让 Agent 帮你写时，你仍要会过关清单）。
`
  ),
};

for (const [name, body] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, name), body, 'utf8');
  console.log('wrote', name);
}
console.log('done', Object.keys(files).length);
