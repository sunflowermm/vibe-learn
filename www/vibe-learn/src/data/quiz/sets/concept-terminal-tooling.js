import { defineQuizSet } from '../schema.js';

/**
 * 第一章 · 环境与终端主链精选。
 * 刻意不与 concept-linux-cli（pwd/ls/管道）重复；钉：仿真器≠Shell、PATH、发行版、系统包≠语言包、WSL。
 */
export default defineQuizSet({
  id: 'concept-terminal-tooling',
  title: '概念 · 终端、PATH 与发行版工具链',
  kind: 'concept',
  domain: 'ops',
  tags: ['终端', 'PATH', '发行版', 'WSL', 'pnpm', '基础', '进阶'],
  relatedNodes: [
    'terminal-worlds',
    'linux-distros',
    'installers-path',
    'package-managers',
    'runtime-nodejs',
    'linux-cli',
    'workbench-troubleshoot',
  ],
  caption: '窗口 / Shell / OS → PATH → 系统包 vs 项目包 → 首次跑通前的环境地基。',
  questions: [
    {
      id: 'concept-terminal-tooling:q1',
      q: '终端仿真器、Shell、操作系统三者分工？',
      choices: [
        {
          t: '仿真器只管窗口与输入输出；Shell 解释命令；OS 真正创建进程与管文件/权限',
          ok: true,
          why: '三件套：看见的 / 说的话 / 真正干活的。混为一谈会排错层。',
        },
        {
          t: '三者完全同义，只是厂商叫法不同',
          ok: false,
          why: '职责不同：换 Windows Terminal 不会换掉 bash 语义。',
        },
        {
          t: 'Shell 负责创建硬件中断，仿真器管理磁盘分区',
          ok: false,
          why: '硬件与分区是 OS/驱动层。',
        },
        {
          t: '只有图形桌面才能有 Shell',
          ok: false,
          why: '服务器常无桌面，SSH 进的就是终端+Shell。',
        },
      ],
      relatedNodes: ['terminal-worlds'],
    },
    {
      id: 'concept-terminal-tooling:q2',
      q: 'bash、zsh、PowerShell、cmd 的关系？',
      choices: [
        {
          t: '都是 Shell 方言：语法、内建命令与脚本约定不同，不是「全世界只有一个壳」',
          ok: true,
          why: 'Windows 上 Git Bash / PowerShell / cmd 常并存；别把 export 当 PowerShell 唯一写法。',
        },
        {
          t: '只有 bash 合法，其余都是病毒',
          ok: false,
          why: '多方言并存是常态。',
        },
        {
          t: 'PowerShell 不能运行任何命令，只能改注册表',
          ok: false,
          why: 'PowerShell 是完整的命令与脚本环境。',
        },
        {
          t: '换 Shell 会自动换掉操作系统内核',
          ok: false,
          why: 'Shell 在用户态；内核不变。',
        },
      ],
      relatedNodes: ['terminal-worlds', 'lang-powershell', 'lang-shell'],
    },
    {
      id: 'concept-terminal-tooling:q3',
      q: '敲下一行命令后，系统里实际发生什么？',
      choices: [
        {
          t: 'Shell 在 PATH 目录里找同名可执行文件（或内建），再请 OS 起进程',
          ok: true,
          why: 'command not found = 未安装或 PATH/会话未加载到该目录。',
        },
        {
          t: '命令文字本身直接驱动 CPU 微码，不经过文件系统',
          ok: false,
          why: '外置命令是磁盘上的程序文件。',
        },
        {
          t: '浏览器下载该命令的网页版再执行',
          ok: false,
          why: '本地 Shell 不靠网页下载命令。',
        },
        {
          t: '必须先编译整台电脑的内核才能执行 ls',
          ok: false,
          why: '过激；日常命令是已安装的用户态程序。',
        },
      ],
      relatedNodes: ['terminal-worlds', 'installers-path'],
    },
    {
      id: 'concept-terminal-tooling:q4',
      q: '刚装完 Node，旧终端仍报 node 不是内部命令，优先做什么？',
      choices: [
        {
          t: '新开终端（或重载 shell 配置），确认 PATH 已含 Node 目录；用 where/which 核对',
          ok: true,
          why: '安装器常改用户 PATH；旧会话不会自动刷新。',
        },
        {
          t: '立刻格式化系统盘',
          ok: false,
          why: '过激；先刷新会话与 PATH。',
        },
        {
          t: '删除 .git 目录',
          ok: false,
          why: '与命令解析无关。',
        },
        {
          t: '把 temperature 调到 0',
          ok: false,
          why: '模型参数与 PATH 无关。',
        },
      ],
      relatedNodes: ['installers-path', 'runtime-nodejs', 'workbench-troubleshoot'],
    },
    {
      id: 'concept-terminal-tooling:q5',
      q: 'PATH 环境变量回答的核心问题是？',
      choices: [
        {
          t: '敲命令时，到哪些目录按顺序搜索可执行文件',
          ok: true,
          why: '同名多版本时，排在前面的目录优先——which/where 可见。',
        },
        {
          t: 'HTTP 请求默认走哪台代理',
          ok: false,
          why: '那是 HTTP_PROXY 一族；与 PATH 同属环境变量但业务不同。',
        },
        {
          t: 'Git 远程默认分支名',
          ok: false,
          why: 'Git 配置，不是 PATH。',
        },
        {
          t: 'DNS 服务器地址列表',
          ok: false,
          why: '解析器配置，不是 PATH。',
        },
      ],
      relatedNodes: ['installers-path', 'data-env', 'terminal-worlds'],
    },
    {
      id: 'concept-terminal-tooling:q6',
      q: 'Homebrew / apt / winget 与 pnpm 的层次差别？',
      choices: [
        {
          t: '前者是系统级包管理（往机器装软件）；pnpm 管项目 node_modules 依赖——角色不同',
          ok: true,
          why: 'brew 装 node；pnpm 装本仓依赖。勿用 apt 替代 pnpm install。',
        },
        {
          t: '四者完全等价，可随意互换',
          ok: false,
          why: '系统包 ≠ 语言项目依赖。',
        },
        {
          t: 'pnpm 专门管理系统内核模块',
          ok: false,
          why: 'pnpm 是 JS 包管理器。',
        },
        {
          t: 'apt 只能安装 npm 包',
          ok: false,
          why: 'apt 装的是发行版软件包，偶尔有 node 包名但不是 package.json 依赖树。',
        },
      ],
      relatedNodes: ['package-managers', 'linux-distros', 'installers-path'],
    },
    {
      id: 'concept-terminal-tooling:q7',
      q: 'Ubuntu 与 Fedora 文档里「装软件」命令不同，首先因为？',
      choices: [
        {
          t: '发行版家族不同，默认系统包管理器方言不同（apt vs dnf 等）',
          ok: true,
          why: '同一 Linux 内核，仓库与工具链组合不同。',
        },
        {
          t: 'TCP 端口号数学定义不同',
          ok: false,
          why: '端口是协议标准，与发行版无关。',
        },
        {
          t: 'HTTP 404 语义在 Fedora 上相反',
          ok: false,
          why: 'Web 标准一致。',
        },
        {
          t: 'JavaScript typeof 返回值随发行版变化',
          ok: false,
          why: '由语言规范定义。',
        },
      ],
      relatedNodes: ['linux-distros', 'package-managers'],
    },
    {
      id: 'concept-terminal-tooling:q8',
      q: 'Alpine 容器镜像里常见 apk，相对 Ubuntu 的 apt？',
      choices: [
        {
          t: '同为系统包管理器，方言与包名不同；看文档要对上发行版/基础镜像',
          ok: true,
          why: '照抄 apt 命令到 Alpine 会失败。',
        },
        {
          t: 'apk 等于 pnpm 的别名',
          ok: false,
          why: 'apk 是 Alpine 系统包管理。',
        },
        {
          t: 'Alpine 禁止安装任何软件',
          ok: false,
          why: '用 apk 装。',
        },
        {
          t: 'apt 在所有 Linux 上通用且唯一',
          ok: false,
          why: 'Debian 系为主；其它家族另有工具。',
        },
      ],
      relatedNodes: ['linux-distros', 'ops-docker'],
    },
    {
      id: 'concept-terminal-tooling:q9',
      q: 'WSL 与「原生 Linux 云主机」最关键的边界？',
      choices: [
        {
          t: 'WSL 跑在 Windows 上的 Linux 兼容层/虚拟化环境；原生机是独立内核与硬件边界',
          ok: true,
          why: '文件路径、网络回环、systemd 完整度可能不同；部署文档要对准目标环境。',
        },
        {
          t: '二者字节级完全相同，无任何差异',
          ok: false,
          why: '边界与集成方式不同。',
        },
        {
          t: 'WSL 不能运行任何命令行工具',
          ok: false,
          why: '正是为了在 Windows 上用 Linux 工具链。',
        },
        {
          t: '原生 Linux 禁止使用 SSH',
          ok: false,
          why: '云主机常用 SSH。',
        },
      ],
      relatedNodes: ['terminal-worlds', 'linux-distros'],
    },
    {
      id: 'concept-terminal-tooling:q10',
      q: '为何许多 Windows 教程推荐 Git Bash / Windows Terminal，而不是只靠老 cmd？',
      choices: [
        {
          t: '更接近 Unix 工具习惯（ssh、常见 GNU 风命令），且多标签/UTF-8 体验更好',
          ok: true,
          why: 'Coding Agent / 开源文档示例也常按 Bash 写；cmd 语法差异大。',
        },
        {
          t: 'cmd 已被内核删除，无法启动',
          ok: false,
          why: 'cmd 仍在，只是体验与生态示例偏旧。',
        },
        {
          t: 'Git Bash 会替代 Node 运行时',
          ok: false,
          why: 'Bash 是壳；Node 仍要单独安装。',
        },
        {
          t: '只用 Git Bash 就不需要 PATH',
          ok: false,
          why: '任何 Shell 都靠 PATH 找外置命令。',
        },
      ],
      relatedNodes: ['terminal-worlds', 'git-workspace'],
    },
    {
      id: 'concept-terminal-tooling:q11',
      q: '本仓库（XRK-AGT）项目依赖应如何安装？',
      choices: [
        {
          t: '在仓库内用 pnpm 安装；勿用全局乱装替代 lockfile 约定',
          ok: true,
          why: '包管理仅支持 pnpm；与系统级 brew/apt 分层。',
        },
        {
          t: '必须 npm install -g 所有模块到全局',
          ok: false,
          why: '全局易冲突；项目依赖应本地安装。',
        },
        {
          t: '只能通过应用商店点选安装 Node 模块',
          ok: false,
          why: '标准路径是终端包管理器。',
        },
        {
          t: 'Node 会自动下载 package.json 全部依赖，无需包管理器',
          ok: false,
          why: '必须显式安装。',
        },
      ],
      relatedNodes: ['package-managers', 'runtime-nodejs'],
    },
    {
      id: 'concept-terminal-tooling:q12',
      q: 'Node.js 在本项目主服中的角色？',
      choices: [
        {
          t: '运行 JavaScript/TypeScript 服务端与工具链的运行时（引擎+标准库+事件循环）',
          ok: true,
          why: '语言选型之后仍要装对运行时版本（engines）。',
        },
        {
          t: '只用来打开浏览器，不能跑后端',
          ok: false,
          why: '主服正是 Node 进程。',
        },
        {
          t: '完全取代操作系统内核',
          ok: false,
          why: '跑在 OS 之上。',
        },
        {
          t: '等于 pnpm 本身',
          ok: false,
          why: 'pnpm 是包管理器；Node 是运行时。',
        },
      ],
      relatedNodes: ['runtime-nodejs', 'package-managers'],
    },
    {
      id: 'concept-terminal-tooling:q13',
      q: 'HTTP_PROXY 与 PATH 同属环境变量，业务差别？',
      choices: [
        {
          t: 'PATH 管「命令去哪找」；HTTP(S)_PROXY 管「出网走哪台代理」',
          ok: true,
          why: '装不上工具查 PATH；拉 GitHub/npm 失败常查代理族与 NO_PROXY。',
        },
        {
          t: '两者必须设成同一个字符串',
          ok: false,
          why: '语义不同。',
        },
        {
          t: '设了 PATH 就自动有代理',
          ok: false,
          why: '要显式设代理变量或工具配置。',
        },
        {
          t: '只有 Windows 有环境变量',
          ok: false,
          why: 'Unix 同样有；写法不同。',
        },
      ],
      relatedNodes: ['installers-path', 'data-env', 'clash'],
    },
    {
      id: 'concept-terminal-tooling:q14',
      q: '为何要把 pnpm-lock.yaml / package-lock.json 提交进仓库？',
      choices: [
        {
          t: '锁定依赖树版本，让本机、CI、同事安装结果可复现，减少「我这边能跑」',
          ok: true,
          why: '没有锁文件时解析结果会随时间漂移。',
        },
        {
          t: '锁文件专门存放 API 密钥',
          ok: false,
          why: '密钥走环境变量/Secrets，不进锁文件。',
        },
        {
          t: '有锁文件就可以不写 package.json',
          ok: false,
          why: '清单与锁文件分工不同，都需要。',
        },
        {
          t: '锁文件只在 Windows 上有意义',
          ok: false,
          why: '跨平台复现都依赖它。',
        },
      ],
      relatedNodes: ['package-managers', 'craft-ci', 'workbench-troubleshoot'],
    },
    {
      id: 'concept-terminal-tooling:q15',
      q: '提示符里的 `$` 或 `PS>` 主要说明什么？',
      choices: [
        {
          t: '多半表示当前 Shell 类型/会话化妆；真正权限与路径要看 whoami、pwd、环境',
          ok: true,
          why: '别被提示符吓住或误判；root 常见 `#` 也只是约定。',
        },
        {
          t: '`$` 表示磁盘已满',
          ok: false,
          why: '提示符与磁盘容量无关。',
        },
        {
          t: '出现 `PS>` 就不能再运行 Node',
          ok: false,
          why: 'PowerShell 下同样可跑 node。',
        },
        {
          t: '提示符文字本身就是 PATH',
          ok: false,
          why: 'PATH 是环境变量，不是提示符字符串。',
        },
      ],
      relatedNodes: ['terminal-worlds'],
    },
    {
      id: 'concept-terminal-tooling:q16',
      q: '本机装了多个 Node（fnm/nvm/系统包），如何避免用错版本？',
      choices: [
        {
          t: '用 which/where 看实际路径；对齐 package.json engines 与版本管理器当前版本',
          ok: true,
          why: 'PATH 顺序决定命中哪一个；engines 是项目声明的约束。',
        },
        {
          t: '版本越多越好，Shell 会自动选最新且永远正确',
          ok: false,
          why: '不会自动「正确」；常命中 PATH 最前的那个。',
        },
        {
          t: '删除 package.json 即可消除版本问题',
          ok: false,
          why: '没有清单更难对齐。',
        },
        {
          t: '只有图形安装的 Node 能被项目使用',
          ok: false,
          why: '关键是 PATH 与版本，不是安装器 UI。',
        },
      ],
      relatedNodes: ['runtime-nodejs', 'installers-path', 'package-managers'],
    },
  ],
});
