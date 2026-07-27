/** Shell — 场景 + 特性加厚 */
export default `# Shell（Bash / Zsh）（语言）

> **分类：脚本语言 + 命令解释器。不是框架。**  
> 本仓 **无 Shell 子服**；用于 Linux/macOS/CI/Docker 装依赖、启主服、流水线。  
> Windows 本机开发另见 **PowerShell**。

## 本课你要带走什么

1. **什么场景写 Bash、什么场景用 Python/Node/Makefile**  
2. 展开顺序、管道、重定向、稳健选项怎么讲清  
3. 在本仓首次跑通、CI、容器入口里 Shell 的实际落点

---

## 1. 使用场景：何时用、何时不用

### 1.1 适合用 Shell（Bash/Zsh）的场景

| 场景 | 为什么 |
|------|--------|
| **CI/CD 流水线** | GitHub Actions、GitLab CI 默认 bash |
| **Docker \`ENTRYPOINT\` / 启动脚本** | 调 \`node app\`、等端口、传 env |
| **本仓 Linux 装依赖、启主服** | \`pnpm install\`、\`node start.js\` 包装 |
| **胶水：串联已有 CLI** | \`git\` \`curl\` \`jq\` \`docker\` 管道组合 |
| **一次性运维** | 查日志、杀进程、打包 |
| **Git hooks** | pre-commit、简单检查 |

### 1.2 不适合 / 应换语言的场景

| 场景 | 更好选择 | 原因 |
|------|----------|------|
| **复杂业务逻辑、数据结构** | **Python / Node** | Shell 字符串语义易错 |
| **跨平台同一套脚本（含 Windows）** | **PowerShell 7+** 或 Node | Bash 非 Windows 原生 |
| **本仓插件、HTTP API** | **JavaScript** 主服 | 不在 Shell 写业务 |
| **需要单元测试的模块** | Python/Go/JS | Shell 测试框架弱 |
| **浮点与精确计算** | 专用语言 | Shell 算术整数为主 |
| **1000 行以上脚本** | 编译型/脚本语言 | 可维护性崩溃 |

### 1.3 与 PowerShell / Python / Make 怎么选（口述）

| 需求 | 更偏向 |
|------|--------|
| Linux CI、Docker | **Bash** |
| Windows 本机 | **PowerShell** |
| 复杂自动化、可测 | **Python** |
| 编译依赖图 | **Make/cmake/ninja** |
| 本仓业务 | **JavaScript** |

\`\`\`mermaid
flowchart TB
  CI[CI / Docker] --> Sh[Shell 胶水]
  Sh --> CLI[pnpm / node / git / curl]
  Dev[Windows 开发者] --> PS[PowerShell]
  Biz[业务逻辑] --> JS[主服 JavaScript]
\`\`\`

### 动手：bash 沙箱（假数据）

\`\`\`shell
{"preset":"linux-cli"}
\`\`\`

\`\`\`term
{"title":"管道与退出码（回放）","prompt":"$ ","steps":[{"type":"in","text":"echo hello | cat"},{"type":"out","text":"hello"},{"type":"in","text":"false; echo $?"},{"type":"out","text":"1"},{"type":"in","text":"export DEMO=xrk && echo $DEMO"},{"type":"out","text":"xrk"}]}
\`\`\`

---

## 2. 语言特性（必须讲清楚）

### 2.1 词法与展开顺序（易错）

理解 Bash 按**展开顺序**想：

1. 花括号 → 2. 波浪线 → 3. **参数/变量** → 4. 命令替换 → 5. 算术 → 6. 分词 → 7. 通配 → 8. 引用去除

| 点 | 说明 |
|----|------|
| **\`$VAR\` / \`\${VAR}\`** | 参数展开；\`\${VAR:-default}\` \`\${VAR:?msg}\` |
| **双引号 vs 单引号** | 双引号仍展开变量；单引号全字面 |
| **命令替换** | \`$(cmd)\`（可嵌套） |
| **算术** | \`$(( expr ))\` |
| **通配** | \`*\` \`?\` 由壳展开再传给程序 |

### 2.2 变量与作用域

| 点 | 说明 |
|----|------|
| **赋值** | \`NAME=value\`（**等号旁无空格**） |
| **\`export\`** | 进入子进程环境 |
| **\`local\`** | 函数内局部（bash） |
| **特殊参数** | \`$#\` \`$@\` \`$*\` \`$?\` \`$$\` \`$!\` |

### 2.3 控制流

| 点 | 说明 |
|----|------|
| **\`if\` / \`[[ ]]\`** | \`[[\` 更安全；\`=\`/\`-eq\` 分字符串与整数 |
| **\`for\` / \`while\` / \`until\`** | 读文件注意 \`IFS\` |
| **\`case\`** | 模式分支 |
| **函数** | \`name() { …; }\` |

### 2.4 管道与重定向

| 点 | 说明 |
|----|------|
| **管道 \`|\`** | 左 stdout → 右 stdin；**不传 stderr** |
| **\`2>&1\`** | 合并错误流 |
| **\`>\` \`>>\` \`<\`** | 覆盖/追加/输入 |
| **\`set -o pipefail\`** | 管道中任一失败即失败 |
| **进程替换** | \`<(cmd)\`（bash） |
| **Here doc** | \`<<EOF\` 多行输入 |

### 2.5 稳健脚本习惯

\`\`\`bash
set -euo pipefail
IFS=$'\\n\\t'
\`\`\`

| 选项 | 作用 |
|------|------|
| \`-e\` | 命令失败则退出 |
| \`-u\` | 未定义变量报错 |
| \`pipefail\` | 管道失败可感知 |

### 2.6 shebang

\`#!/usr/bin/env bash\` — 用 PATH 里的解释器，可移植性更好。

---

## 3. 工具链
\`\`\`quiz
{"title":"shell 快测","questions":[{"q":"学一门语言时，最先要分清的是？","choices":[{"t":"只背语法关键字","ok":false,"why":"语法重要，但交付模型更影响工程。"},{"t":"语言 vs 运行时 vs 常用框架","ok":true,"why":"三层混谈会面试翻车、选型也翻车。"},{"t":"必须先会操作系统内核","ok":false,"why":"有帮助，但不是本课第一刀。"}]}]}
\`\`\`


| 工具 | 作用 |
|------|------|
| **bash / zsh / dash** | 解释器；注意 POSIX vs bash 扩展 |
| **shellcheck** | 静态分析（强烈推荐） |
| **coreutils** | \`ls\` \`sed\` \`awk\` \`grep\` |
| **jq / yq** | JSON/YAML 处理 |
| **tmux / screen** | 长会话 |

---

## 4. 与本仓

| 项 | 说明 |
|----|------|
| **装依赖** | \`pnpm install\`（根目录） |
| **启主服** | \`node app\` / \`start.js\`；Shell 包装 env |
| **CI** | lint、test、build www 的 \`pnpm build\` |
| **Docker** | 入口脚本等待 DB、再 exec node |
| **子服** | 各子服有自己的启动脚本；在 **子服终端** 运维 |
| **业务** | 不在 \`.sh\` 写插件逻辑 — 进 \`core/\` JS |

---

## 5. 大厂真题

| 题 | 答法要点 |
|----|----------|
| 管道 vs 重定向 | 接进程 vs 文件描述符 |
| 如何保证失败即停 | \`set -euo pipefail\` |
| \`$@\` vs \`$*\` | 参数保真 vs 单字符串 |
| 查端口占用 | \`ss -lntp\` / \`lsof\` |
| 单引号里能写变量吗 | 不能展开 |
| \`$?\` 含义 | 上一命令退出码 |

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh) | ⭐ 十七万级 | 交互式 Shell 配置、插件习惯 | 本机终端环境；**不**写业务逻辑 |
| [junegunn/fzf](https://github.com/junegunn/fzf) | ⭐ 六万级 | 模糊查找、管道组合 | CI / 运维脚本效率工具 |
| [koalaman/shellcheck](https://github.com/koalaman/shellcheck) | ⭐ 三万级 | Shell 静态检查、常见坑 | Docker / 启服脚本质量门禁 |
| [sunflowermm/xrk-projects-scripts](https://github.com/sunflowermm/xrk-projects-scripts) | 本生态 | 一键安装 · \`xm\` 菜单 | **运维正主** → **Shell 运维脚本** |
| Gitee 镜像 | — | 国内拉脚本 | [gitee.com/xrkseek/xrk-projects-scripts](https://gitee.com/xrkseek/xrk-projects-scripts) |

---

## 6. 下一步

**PowerShell** · **Linux 基础指令** · **首次跑通** · **业务层全景** · **终端环境**。  
可选：用 ShellCheck 扫一眼仓库里的 \`.sh\`，对照「业务进 core/」边界；装机脚本见 [xrk-projects-scripts](https://github.com/sunflowermm/xrk-projects-scripts)。
`;
