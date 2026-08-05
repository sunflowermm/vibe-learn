export default `# 第一章 · 环境与终端

> 机器会算之后：人如何发令、软件如何进驻、项目如何第一次跑起来。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 窗口 / Shell / OS | 说得出当前用的壳 |
| 命令找得着 | \`node\` / \`pnpm\` / \`git\` 都有版本号 |
| 站对目录 | \`pwd\` 在含 \`package.json\` 的仓库根 |
| 依赖可复现 | 根目录 \`pnpm install\` 无红字 |
| 分层排障 | 失败时先说卡在哪一层 |
| 最短路径 | \`node app.js\` 能起或能指到缺项（常是 Redis） |

序章：OS 管资源、程序是进程。本章：你如何发令并把跑本仓的工具装齐。  
记清：语言 ≠ 运行时；pnpm ≠ brew/apt；装了 Node ≠ 装了 Vue。

## 本框地图

\`\`\`mermaid
flowchart LR
  T[终端环境] --> D[Linux 发行版]
  T --> C[Linux 指令]
  T --> N[Node]
  N --> P[PATH]
  P --> M[pnpm]
  M --> G[Git 工作区]
  G --> F[代码托管]
  G --> Adv[Git 进阶]
  F --> R[首次跑通]
  Adv --> R
  T --> Ed[编辑器]
  Ed --> Tr[分层排障]
  Tr --> R
\`\`\`

\`\`\`decide
{"title":"从哪张卡进？","start":"start","steps":[{"id":"start","q":"你现在最卡？","options":[{"label":"分不清 Git Bash / PowerShell / WSL","next":"term"},{"label":"node/pnpm 不是命令","next":"path"},{"label":"clone GitHub 失败","next":"git"},{"label":"想尽快 node app 跑起来","next":"run"}]},{"id":"term","result":"先「不同终端环境」。","detail":"窗口≠壳≠OS。"},{"id":"path","result":"安装器与 PATH → Node → pnpm。","detail":"新开终端再 which。"},{"id":"git","result":"Git 工作区（含 clone 模拟）。","detail":"浏览器通≠git 通。"},{"id":"run","result":"工具链绿后进「首次跑通」。","detail":"常卡 Redis。"}]}
\`\`\`

\`\`\`check
{"title":"第一章收束","items":[{"id":"shell","text":"说得出当前 Shell"},{"id":"tool","text":"node / pnpm / git 都有版本"},{"id":"root","text":"pwd 在仓库根"},{"id":"boot","text":"首次跑通有成功信号或能指到卡层"}]}
\`\`\`

## 建议顺序

1. 终端环境 → Linux 发行版 / 指令  
2. （建议）番外 **本机目录**  
3. Node → PATH → pnpm  
4. Git 工作区 → 托管 → 进阶  
5. 编辑器 · 分层排障 → **首次跑通**  
6. → **第一章半 · 编程基础**

出框：01.5 动手 JS；第二章语言版图；第四章部署 / 鸟瞰。
`;
