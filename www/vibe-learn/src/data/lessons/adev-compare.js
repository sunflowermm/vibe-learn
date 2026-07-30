/** 形态与黄页（选型索引，非产品专课） */
export default `# 形态与黄页

> **先分形态，再查品牌。** 本课是索引，不是六门产品必修。  
> 会五拍之后，选一个主表面开工即可；细节以各工具官网为准。

## 四类形态

| 形态 | 你在哪交互 | 代表（查阅用） | 直觉 |
|------|------------|----------------|------|
| **AI IDE** | 桌面编辑器 | Cursor、Trae | 看文件 + 聊 + Agent 同屏 |
| **Agent CLI** | 终端 | Claude Code、Codex CLI、OpenCode、Qwen Code | SSH / 无 GUI / 可脚本 |
| **云端 Agent** | 网页派任务 | Cursor Cloud、Codex Web | 沙箱里跑，回来看 PR |
| **开源 Harness** | 自选模型 | OpenCode、Qwen Code、Codex（开源向） | 可换模型、可自托管倾向 |

\`\`\`flip
{"title":"形态翻卡","cards":[{"front":"补全 ≠ Agent","back":"Tab 下一行；Agent 多步施工"},{"front":"IDE ≠ CLI","back":"结对可视化 vs 终端执行引擎"},{"front":"换品牌","back":"交底文件别换；见项目记忆"}]}
\`\`\`

## 选型速查

| 需求 | 更常偏向 |
|------|----------|
| 日常看文件 + 结对 | **AI IDE**（Cursor / Trae…） |
| 只有 SSH / 长程施工 | **Agent CLI** |
| 异步丢任务出 PR | **云端 Agent** |
| 多模型 / 开源试验 | **OpenCode / Qwen / 开源 Codex** |
| 通义 / 国内云协议 | **Qwen Code** 等 |
| 读本仓 rules / skills | 任一 Agent + **项目记忆文件** |

\`\`\`quiz
{"title":"选型","questions":[{"q":"只有 SSH、没有桌面 IDE 时？","choices":[{"t":"必须装 Trae 桌面","ok":false,"why":"纯 SSH 用 CLI。"},{"t":"Agent CLI","ok":true,"why":"终端即主场。"},{"t":"只要补全插件","ok":false,"why":"补全不是完整施工面。"}]}]}
\`\`\`

## 品牌黄页（一眼即可）

| 名字 | 形态 | 一句话 |
|------|------|--------|
| **Cursor** | AI IDE | VS Code 血统；本仓 rules/skills 常见读者 |
| **Trae** | AI IDE | 字节系；Builder/SOLO 类自主施工 |
| **Claude Code** | CLI | \`claude\`；常配 \`CLAUDE.md\` |
| **OpenAI Codex** | CLI / 云 | 沙箱与云端任务；计划或 API |
| **OpenCode** | 开源 Harness | 多模型；适合试验 |
| **Qwen Code** | CLI | 通义；\`qwen\`；多协议 |
| **其它** | 杂 | Copilot / Windsurf / Aider / Pi… — 观光查官网 |

组合例：IDE 日常 + CLI 重活；换皮不换 \`AGENTS.md\`。

## 下一步

**项目记忆文件** → 回主脊 **排障 / 最小路径**；要懂 LLM 应用概念 → **第五章**（路径 B）。
`;
