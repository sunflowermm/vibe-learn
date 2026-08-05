export default `# 第一章 · 环境与终端

> 机器会算之后，人如何**发号施令**、软件如何**进驻磁盘**、项目如何**第一次跑起来**。  
> 本框按「终端 → Linux → 工具链 → 源码托管 → 跑通」分层；每张卡片上方都有 **本课专有名词**。  
> 部分课文含交互：**term** 只读回放、**shell** 可输入沙箱、**env / compare / check / decide** 分栏与决策；亦可在节点上设 \`lab\`（如 \`linux-shell\`）挂面板底部沙箱。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分清窗口 / Shell / OS | 能说出当前用的是 Git Bash 还是 PowerShell |
| 命令找得着 | \`node -v\` / \`pnpm -v\` / \`git -v\` 都有版本号 |
| 站对目录 | \`pwd\` 指向含 \`package.json\` 的仓库根 |
| 依赖可复现 | 根目录 \`pnpm install\` 结束无红字 |
| 会分层排障 | 失败时先说「卡在哪一层」，再动手改代码 |
| 最短路径跑通 | \`node app.js\` 能起主服或按日志定位缺项（常是 Redis） |

## 和序章的衔接
\`\`\`steps
{"title":"环境章路径","steps":[{"title":"终端与壳","body":"分清仿真器与方言。"},{"title":"PATH 与安装","body":"命令从哪来。"},{"title":"包管理与 Git","body":"依赖与工作区。"},{"title":"首次跑通","body":"接到部署环境。"}]}
\`\`\`


序章讲清了：**OS** 管理资源，程序是 **进程**，经 **系统调用** 才能碰硬件。  
本章回答：你——一个人类——如何站在 OS 外面发令，并把跑 XRK-AGT 所需的工具装齐。

## 装工具时别糊层

本章先把命令与工具装齐。记清三句即可，细节留给第二章语言版图：

- **语言**写什么（如 JavaScript）≠ **运行时**跑什么（如 Node）  
- **pnpm** 装的是项目依赖，不是 brew/apt 那种系统包  
- 别在「装了 Node」时说成「装了 Vue」——框架是后面的事  

## 本框地图

\`\`\`mermaid
flowchart LR
  T[不同终端环境] --> D["Linux 发行版"]
  T --> C["Linux 基础指令"]
  T --> N[Node.js]
  N --> P["安装器与 PATH"]
  P --> M[pnpm]
  M --> G["Git 工作区"]
  G --> F[代码托管]
  G --> R[首次跑通]
  F --> R
  T -.-> FS[番外·本机目录]
  C -.-> FS
  P -.-> Ops[番外·容器]
  C -.-> Ops
\`\`\`

## 分块与关键词（串起来记）

| 块 | 节点 | 关键词（点开卡片看解释） |
|----|------|--------------------------|
| **交互面** | 不同终端环境 | 终端仿真器、多种 Shell、PATH 起进程、Git Bash/CMD/PowerShell、WSL vs 原生 |
| **Linux 系** | 发行版 · 基础指令 | 发行版、apt/dnf、**brew 对照**、sudo、**curl/wget**、进程 |
| **运行时交付** | Node · PATH · pnpm | **环境变量**、运行时、V8、PATH、**系统包 vs 语言包**、package.json |
| **源码面** | Git 工作区 · 代码托管 | clone、远程、GitHub、Gitee、PR |
| **收束** | 首次跑通 | 把上面全部串成一条可执行路径 |
| **番外地图** | 本机目录 · 点文件 | **先角色后路径**；Users↔\`/home\`；\`.env\`；隐藏机制对照 |

## 零基础建议顺序


\`\`\`decide
{"title":"我从环境章哪张卡进？","start":"start","steps":[{"id":"start","q":"你现在最卡？","options":[{"label":"分不清 Git Bash / PowerShell / WSL","next":"term"},{"label":"node/pnpm 不是命令","next":"path"},{"label":"clone GitHub 失败","next":"git"},{"label":"想尽快 node app 跑起来","next":"run"}]},{"id":"term","result":"先「不同终端环境」，再 Linux 指令。","detail":"窗口≠壳≠OS。"},{"id":"path","result":"安装器与 PATH → Node → pnpm。","detail":"新开终端再 which。"},{"id":"git","result":"Git 工作区 / 代码托管；代理见 Clash。","detail":"浏览器通≠git 通。"},{"id":"run","result":"工具链绿后进「首次跑通」。","detail":"常卡 Redis。"}]}
\`\`\`

\`\`\`check
{"title":"第一章收束自检","items":[{"id":"shell","text":"说得出当前用的是哪种 Shell"},{"id":"tool","text":"node -v / pnpm -v / git --version 都有输出"},{"id":"root","text":"pwd 在含根 package.json 的目录"},{"id":"boot","text":"首次跑通有成功信号或能指到卡层"}]}
\`\`\`


1. **不同终端环境** — 窗口 / 多种 Shell / 命令如何能用 / Git Bash vs CMD / WSL  
2. **Linux 发行版 / 基础指令** — 含 curl；服务器与 WSL 绕不开  
3. （建议）番外 **本机目录** — **先角色后路径**（Users ↔ \`/home\`）；再读 PATH 更不懵  
4. **Node → PATH → pnpm** — 对齐本仓工具链（三者职责不同；brew ≠ pnpm）  
5. **Git 工作区 → 代码托管 → Git 进阶** — clone 之后学会分支/PR/冲突  
6. **工作台 · 编辑器 / 分层排障** — 打开仓库根；坏了先分层  
7. **首次跑通** — 出问题按「哪一层」倒推  
8. → **第一章半 · 编程基础**（必学）— 会写 JS 再看语言版图  
9. （可选）番外 **主机面板**（宝塔/1Panel）· **容器** · 第三章 **Nginx**  

## 出框之后

- **第一章半** — JS 动手 + JSON/YAML/env 过关  
- **第二章** — 为什么需要 Node（语言 vs 运行时；有 **Node.js** 专课）  
- **第四章 · 最小贡献路径 / 部署环境** — Git / Node / Redis / 浏览器引擎齐套清单  
- **番外 · AI 编程工具** — 卡在 clone / PATH / 首次跑通时，用 **Vibe Coding 心智** 里的提问模板  
- **番外 · 本机目录** — 家目录 / bin / 点文件  
- **番外 · 容器** — Docker / Compose  
- **第三章 · Nginx** — 反代产品（与容器分层）  
- **番外 · ESP32** — MCU / 物联网边缘（与本仓主服分层）  
- **第三章** — 可与本章并行：主机如何对话

## 导图2 · 终端 / 环境变量 / Git / 构建 × 发令与工具链

> 导图2 的终端、环境变量、Git、构建等是日常口语；  
> **本框钉死的是本机验收命令与分层排障**。本仓：**Node≥26、仅 pnpm、Redis 齐套**（部署清单见第四章）。

| 导图2 | Vibe 口语 | 本框专业落点 |
|-------|-----------|--------------|
| **终端命令行** | 敲命令的地方 | 分清仿真器 vs Shell 方言；\`node -v\` / \`pnpm -v\` 必须有版本 |
| **环境变量** | PATH、代理、密钥 | PATH 决定命令找得着；密钥不进 Git；代理见 Clash 番外 |
| **Git** | 版本与协作底盘 | 工作区 → 远程 → PR；clone 只是起点 |
| **npm / 构建** | 装依赖 / 出产物 | 本仓**仅 pnpm**；系统包（brew/apt）≠ 语言包管理器 |
| **JavaScript** | 主服语言 | 本章装的是 **Node 运行时**；语言动手在 01.5 |


面板 **跨导图** 可查词条全文；**验收以本框「学会之后」表为准**。
`;
