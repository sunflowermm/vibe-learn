/** 工作台 · 编辑器 */
export default `# 工作台 · 编辑器

> 终端会发令，还需要一个**改文件的地方**。可用 VS Code、**Cursor**、**Trae** 等；本课定习惯，品牌细节见 **形态与黄页**。

## 本课你要带走

1. 用编辑器打开**仓库根目录**（含 \`package.json\` 的那一层）
2. 内置终端与系统终端是同一类 Shell（注意选 Git Bash / pwsh）
3. **先保存再跑命令**（没保存 = 磁盘上还是旧文件）
4. 会看 **Git diff**、用搜索定位报错字符串

---

## 1. 打开正确的文件夹

打开 \`XRK-AGT\` 仓库根，以便：

- 看到 \`package.json\`、\`core/\`、\`src/\`、\`pnpm-lock.yaml\`
- 终端默认 cwd 在根，\`pnpm i\` / \`node app\` 路径才对
- 多根工作区乱开子目录 → 相对路径、Git、Agent 交底全容易偏

\`\`\`flip
{"title":"工作台翻卡","cards":[{"front":"工作区根","back":"含 package.json 的仓库根"},{"front":"单文件乱开","back":"相对路径、Git、终端 cwd 全容易错"},{"front":"内置终端","back":"与系统终端同类；注意选 Git Bash / pwsh"},{"front":"未保存就跑","back":"进程读的是磁盘旧内容"}]}
\`\`\`

---

## 2. 最小面板习惯

| 用途 | 你在干什么 |
|------|------------|
| 资源管理器 | 逛 \`core/<产品>/\`，别误改 \`src/infrastructure\` |
| 搜索 | 全局找符号 / 报错原文 |
| 终端 | \`node\` / \`pnpm\`；与第一章同一套 PATH |
| 源代码管理 | 提交前看 **diff**；Accept Agent 改动也靠它 |
| AI Agent（Cursor 等） | 先 Plan/小步；Rules 见 **项目记忆文件** |

快捷心智（各产品键位不同，记概念即可）：保存 · 全局搜索 · 切换终端 · 命令面板。

---

## 3. 和第一章 / Vibe 的关系

\`\`\`mermaid
flowchart LR
  ED[编辑器改文件] --> DISK[磁盘]
  SH[Shell 起进程] --> DISK
  AG[Coding Agent] --> ED
  AG --> SH
\`\`\`

- **PATH / Node / pnpm** 仍由第一章保证；编辑器不替代运行时  
- Agent 改文件后：**你**审 diff → 保存 → 本机再跑  
- 卡住：用 **Vibe Coding 心智** 提问四件套  

\`\`\`quiz
{"title":"编辑器","questions":[{"q":"只打开 core/某插件单文件当工作区，最容易？","choices":[{"t":"更快，推荐","ok":false,"why":"丢根目录上下文。"},{"t":"终端 cwd / Git / 搜仓全别扭","ok":true,"why":"应打开仓库根。"},{"t":"与打开根完全等价","ok":false,"why":"不等价。"}]}]}
\`\`\`

## 下一步

**分层排障** — 坏了先问「落在哪一层」。  
可选：**Vibe Coding 心智** · **形态与黄页**。
`;
