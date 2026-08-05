export default `# 形态与黄页

> **先分形态，再查品牌。** 本课是**可核对的索引**，不是六门产品必修。  
> 官网会变：以各产品文档为准；本课钉**稳定心智**与**选型问题**。  
> 前置：**Vibe Coding 心智**。交底文件：**项目记忆文件**。
> **学会之后**：能按形态（IDE/CLI/无头）选型，并核对黄页事实而非广告。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| Harness | 能口述 指令 + 工具 + 模型 三件套 |
| 形态 | IDE Agent / CLI / 无头脚本 分得清，选型看场景 |
| 换品牌 | 换壳；交底文件同一事实，勿跟广告 |
| 本仓 | 禁区与 pnpm、Node≥26 写进 AGENTS.md |
| 跟 Agent | 先问形态再比品牌；上生产前看隐私与配额 |

\`\`\`check
{"title":"形态通关","items":[{"id":"har","text":"能口述 Instructions + Tools + Model","hint":"Harness"},{"id":"form","text":"能按场景指出 IDE/CLI/云端/开源之一","hint":"形态"},{"id":"brand","text":"知道换品牌换壳、交底要对齐","hint":"换壳"},{"id":"xrk","text":"禁区与 pnpm 写进 AGENTS 而非广告页","hint":"本仓"}]}
\`\`\`

\`\`\`algo
{"kind":"adevform","title":"四形态：IDE · CLI · 云端 · 开源 Harness","autoplay":true,"speed":820}
\`\`\`

\`\`\`compare
{"title":"形态对照（角色）","caption":"选工具前先对齐「它替你站哪一层」。","items":[{"role":"对话改代码","win":"Cursor Agent / Copilot Edits","linux":"同左（跨平台客户端）","mac":"同左","note":"路径 A；要审 diff"},{"role":"终端里 Agent","win":"CLI 类工具","linux":"CLI 类工具","mac":"CLI 类工具","note":"cwd/权限即现场"},{"role":"云端开发机","win":"浏览器 IDE","linux":"远程 Workspace","mac":"同左","note":"环境在云上"}]}
\`\`\`

\`\`\`decide
{"title":"我该用哪种形态？","start":"start","steps":[{"id":"start","q":"任务？","options":[{"label":"在本仓改 plugin/http","next":"cursor"},{"label":"服务器上排障、看日志","next":"cli"},{"label":"只想对比产品名词","next":"map2"}]},{"id":"cursor","result":"对话改代码 + 本仓 AGENTS/禁区。","detail":"Accept 前看 diff。"},{"id":"cli","result":"终端 Agent / 自己 SSH；权限即边界。","detail":"别把密钥打进历史。"},{"id":"map2","result":"导图2 黄页；验收仍回本机路径。","detail":"词表≠会做。"}]}
\`\`\`

## 1. 先认「Agent Harness」

Coding Agent ≈ 三件套（Cursor 官方表述同构）：

| 件 | 是什么 |
|----|--------|
| **Instructions** | 系统提示 + 你写的 Rules / \`AGENTS.md\` / \`CLAUDE.md\` |
| **Tools** | 读改文件、搜索、终端、（可选）MCP |
| **Model** | 你选的大模型；同一句话对不同模型效果差很大 |

**补全（Tab）≠ Agent**：补全只建议下一小段；Agent 会多步：搜仓库 → 改文件 → 跑命令 → 再观察。

\`\`\`flip
{"title":"形态翻卡","cards":[{"front":"Harness","back":"指令 + 工具 + 模型 的编排层"},{"front":"Plan 再改","back":"Cursor Plan Mode（常 Shift+Tab）先出计划再施工"},{"front":"换品牌","back":"换的是壳；交底文件尽量同一事实"}]}
\`\`\`

---

## 2. 四类形态（怎么选表面）

| 形态 | 你在哪交互 | 典型代表 | 适合 |
|------|------------|----------|------|
| **AI IDE** | 桌面编辑器 | Cursor、Trae | 看 diff、多文件结对、本仓日常 |
| **Agent CLI** | 终端 TUI / 命令 | Claude Code、Codex CLI、OpenCode、Qwen Code | SSH、无 GUI、脚本/\`-p\` 无头 |
| **云端 Agent** | 网页派任务 | Cursor Cloud Agents、ChatGPT Codex | 异步、沙箱出 PR、人在手机边 |
| **开源 Harness** | 自选模型 + 可自托管 | OpenCode（MIT）、Qwen Code（Apache-2.0） | 多模型、本地/合规、嫌厂商锁 |

\`\`\`quiz
{"title":"形态","questions":[{"q":"只有 SSH、没有桌面 IDE 时？","choices":[{"t":"必须装 Trae 桌面","ok":false,"why":"纯 SSH 用 CLI。"},{"t":"Agent CLI（claude / codex / opencode / qwen…）","ok":true,"why":"终端即主场。"},{"t":"只要编辑器补全插件","ok":false,"why":"补全不是完整施工面。"}]}]}
\`\`\`

---

## 3. 选型速查（按约束，不按广告）

| 你的约束 | 更常偏向 |
|----------|----------|
| 要边看文件边聊、审 inline diff | **AI IDE** |
| 服务器上改、CI 里跑一句 | **CLI**（含无头 \`-p\`） |
| 任务丢出去过夜、回来看 PR | **云端 Agent** |
| 要换模型 / 本地 Ollama / 少锁死一家 | **OpenCode** 等开源 Harness |
| 通义 / 国内云 Coding Plan、OpenAI 兼容端点 | **Qwen Code**（\`/auth\` 配 Provider） |
| 本仓已有 \`.cursor/rules\` + \`AGENTS.md\` | **Cursor** 或任何会读 AGENTS 的 CLI |

组合常见且有效：**IDE 日常 + CLI 重活**（例如 Cursor + Claude Code / Codex）；**换皮不换交底**。

---

## 4. 品牌黄页（查阅用 · 事实钉）

> 下列为选型用摘要；安装与计费以官网为准。

### Cursor（AI IDE）

- **是什么**：VS Code 血统的 AI 原生 IDE；Agent 可搜仓、改文件、跑终端。  
- **怎么用好**（[官方 Agent 实践](https://cursor.com/blog/agent-best-practices)）：优先 **Plan Mode** 再施工；新任务常**新开对话**；让 Agent 自己搜，少堆无关 \`@\` 文件。  
- **交底**：\`.cursor/rules/*.mdc\`（Rules）+ \`.cursor/skills/**/SKILL.md\`（Skills，按需加载）；也读根/子目录 **\`AGENTS.md\`**（纯 Markdown 便携交底）。  
- **本仓**：rules / skills / 根 \`AGENTS.md\` 的主读者之一。

### Claude Code（Agent CLI）

- **是什么**：Anthropic 终端 Agent，命令常为 \`claude\`。  
- **交底**：\`CLAUDE.md\` 或 \`.claude/CLAUDE.md\`；可用 \`/init\` 生成草稿；大项目可拆 \`.claude/rules/\`。[官方 Memory](https://code.claude.com/docs/en/memory.md)  
- **适合**：SSH、长会话施工；与 IDE 组合很常见。

### OpenAI Codex（CLI · IDE 扩展 · 云）

- **是什么**：终端 Agent（\`codex\`）+ 可选 IDE 扩展 + ChatGPT 侧云端任务。  
- **交底**：启动前读 **\`AGENTS.md\`**（及 \`AGENTS.override.md\`）；从仓库根走到 cwd 分层合并，默认可有体积上限（文档常见约 32KiB）。[Codex · AGENTS.md](https://developers.openai.com/codex/guides/agents-md)  
- **适合**：已有 ChatGPT/API 配额；要 CLI 或云沙箱出活。

### OpenCode（开源 Harness）

- **是什么**：[opencode.ai](https://opencode.ai/) / [anomalyco/opencode](https://github.com/anomalyco/opencode)，**MIT**；终端为主，也有桌面等表面。  
- **特点**：多 Provider（Models.dev 等）、可接本地模型；内置 **build**（可写）/ **plan**（偏只读）等 Agent 切换。  
- **适合**：要开源、换模型、少厂商锁；自己会配 Provider。

### Qwen Code（通义系 CLI · 开源）

- **是什么**：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)，Apache-2.0；交互 \`qwen\`，无头 \`qwen -p "…"\`。  
- **鉴权**：\`/auth\` 配阿里云 Model Studio（Coding Plan / API Key）或第三方 / 自定义端点；**Qwen OAuth 免费档已停**（以仓库 README 为准，约 2026-04）。  
- **适合**：国内云配额、OpenAI 兼容网关、要脚本化 Agent。

### Trae（字节 AI IDE · SOLO）

- **是什么**：[trae.ai](https://www.trae.ai/) 系 AI IDE（VS Code 血统）；**SOLO** 强调端到端自主施工（计划→写码→跑命令→可部署），也可切回偏结对的 IDE 模式。  
- **注意**：计费/配额与数据合规因地区与版本而异；上生产仓库前先看清隐私与套餐说明。  
- **适合**：想要强自主「一把做完」的 IDE 体验；仍建议五拍 + 审 diff。

### 其它名字（观光）

GitHub Copilot、Windsurf、Aider、各类「Pi」脚手架……**先认形态，再查官网**；不占主脊。

---

## 5. 接到本仓

| 文件 | 谁常读 |
|------|--------|
| 根 \`AGENTS.md\` | Cursor / Codex / 多工具便携交底 |
| \`.cursor/rules\`、\`.cursor/skills\` | Cursor |
| （可选）\`CLAUDE.md\` | 若团队主力 Claude Code，可与 AGENTS **事实对齐**，勿两套打架 |

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 日常 | Cursor（或其它 AI IDE）+ 审 diff |
| SSH | CLI Agent；cwd/权限即边界 |
| 交底 | 根 \`AGENTS.md\` 事实对齐各产品私有文件 |
| 禁区 | 写进交底，不跟品牌广告 |

## 下一步

**项目记忆文件** — 把禁区与命令写进仓。  
回主脊：**排障 → 首次跑通 → 最小路径**。路径 B → **第五章**。
`;
