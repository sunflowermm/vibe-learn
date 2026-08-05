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
          t: "终端仿真器负责解析命令语法与 PATH，Shell 只负责绘制窗口界面，OS 不参与进程创建",
          ok: false,
          why: '仿真器不管 PATH；Shell 解释命令；OS 才起进程。',
        },
        {
          t: "三者都由内核同一模块实现，换 Windows Terminal 会连带替换 bash/zsh 的全部语法规则",
          ok: false,
          why: '换终端窗口不改 Shell 方言与 OS 内核。',
        },
        {
          t: "Shell 与操作系统职责重叠：都直接创建进程、管理文件权限，仿真器只是装饰性窗口",
          ok: false,
          why: '进程与权限是 OS 职责；Shell 在用户态解释命令。',
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
          t: "不同 Shell 只是界面皮肤不同，语法与内建命令在任何系统上完全一致可互换",
          ok: false,
          why: 'bash/export 与 PowerShell 变量语法等差异很大。',
        },
        {
          t: "PowerShell 与 bash 可互相直接运行对方脚本文件，无需任何语法或路径调整",
          ok: false,
          why: '方言不同，脚本通常不能零修改互跑。',
        },
        {
          t: "只有 bash 是合法 Shell 方言，PowerShell 与 cmd 不能用于任何自动化或项目脚本",
          ok: false,
          why: '多方言并存才是常态；bash/PowerShell/cmd 语法与内建不同，但各自都合法。',
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
          t: "Shell 收到命令后直接把整行文字写入 CPU 微码寄存器执行，不必查找磁盘上的可执行文件",
          ok: false,
          why: '外置命令是磁盘上的可执行文件，需 PATH 查找。',
        },
        {
          t: "外置命令需先由浏览器下载对应网页版插件，Shell 再在本地沙箱里加载并运行",
          ok: false,
          why: '本地 Shell 直接 exec 已安装程序，不经浏览器。',
        },
        {
          t: "执行 ls 等外置命令前，系统会先重新编译内核并静态链接对应用户态工具链",
          ok: false,
          why: '日常命令是已安装的用户态程序，无需重编内核。',
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
          t: "先执行 git clean -fdx 清工作区，再重启旧终端，让 Shell 从 node_modules/.bin 自动重建系统 PATH",
          ok: false,
          why: 'PATH 由安装器写入环境变量；clean 与命令查找无关。',
        },
        {
          t: "把 Node 安装路径硬编码进 package.json 的 main 字段，旧终端会话就会据此解析 node 命令",
          ok: false,
          why: 'Shell 查 PATH 目录，不读 package.json main。',
        },
        {
          t: "在旧终端里执行 hash -r 或清除命令缓存后，不必新开会话也能读到安装器刚写入的用户 PATH",
          ok: false,
          why: '多数安装器改的是用户环境变量；旧会话通常仍看不到，优先新开终端或重载配置。',
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
          t: 'HTTP 请求默认走哪台代理服务器（与 PATH 同属环境变量但职责不同）',
          ok: false,
          why: '那是 HTTP_PROXY 一族；与 PATH 同属环境变量但业务不同。',
        },
        {
          t: 'Git 远程仓库的默认分支名（如 main），以及 push 时跟踪哪条远程分支',
          ok: false,
          why: 'Git 配置，不是 PATH。',
        },
        {
          t: '本机解析域名时使用的 DNS 服务器地址列表与查询顺序',
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
          t: "pnpm 与 apt 角色相同：都可以在系统级与项目级随意互换，安装 package.json 与系统软件",
          ok: false,
          why: '系统包装运行时；pnpm 解析项目 lockfile 依赖树。',
        },
        {
          t: "Homebrew 只管前端 npm 包，apt/winget 只管内核模块，pnpm 专门负责拉取 Docker 镜像层",
          ok: false,
          why: 'brew/apt/winget 是系统级；pnpm 管 node_modules。',
        },
        {
          t: "系统包管理器只能装 GUI 应用，pnpm 只能装操作系统驱动，四者层级完全不可混用",
          ok: false,
          why: '系统包常装 CLI 运行时；pnpm 不装内核驱动。',
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
          t: "apk 只是 pnpm 的发行版别名，解析的是同一份 lockfile",
          ok: false,
          why: 'apk 是 Alpine 系统包管理。',
        },
        {
          t: "Alpine 镜像出于安全策略，禁止安装任何额外系统软件",
          ok: false,
          why: '用 apk 装。',
        },
        {
          t: "apt 在所有 Linux 发行版上都通用，而且是唯一合法包管理器",
          ok: false,
          why: 'Debian 系为主；其它家族另有工具。',
        },
      ],
      relatedNodes: ['linux-distros', 'ops-docker'],
    },
    {
      id: 'concept-terminal-tooling:q9',
      q: '在 WSL 里改的项目文件，用 Windows 侧编辑器打开时，更该注意？',
      choices: [
        {
          t: '路径与换行（CRLF/LF）、权限观感可能不同；跨侧混用要统一编辑器与 Git 换行策略',
          ok: true,
          why: 'WSL 文件系统与 Windows 盘互通常见坑是换行与「看起来同路径却不是同一挂载」。',
        },
        {
          t: "跨侧编辑同一仓库时，Git 会自动把 CRLF 与 LF 统一成同一格式，无需 core.autocrlf 等配置",
          ok: false,
          why: '需统一 .gitattributes 与编辑器策略；不会自动一致。',
        },
        {
          t: "WSL 路径与 Windows 盘符路径总是同一物理文件，换编辑器不会改变内容、换行与权限观感",
          ok: false,
          why: '\\wsl$ 与 /mnt/c 等前缀不同；换行与权限展示常变。',
        },
        {
          t: "在 Windows 侧用记事本改 WSL 文件时，保存后换行与权限会自动与 Linux 侧完全一致",
          ok: false,
          why: '记事本常写 CRLF；权限位在跨侧也可能观感不同。',
        },
      ],
      relatedNodes: ['terminal-worlds', 'git-workspace'],
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
          t: "老式 cmd 已从现代 Windows 默认安装中移除，新机器无法再启动 cmd.exe",
          ok: false,
          why: 'cmd 仍在，只是体验与生态示例偏旧。',
        },
        {
          t: "Git Bash 会替代 Node 运行时，装了 Bash 就不必再装 Node",
          ok: false,
          why: 'Bash 是壳；Node 仍要单独安装。',
        },
        {
          t: "只要改用 Git Bash，就不再需要配置或检查 PATH 变量",
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
          t: "Node.js 只是 Chromium 内置浏览器引擎，负责渲染页面，不能独立运行 HTTP 服务端进程",
          ok: false,
          why: 'Node 是 V8 运行时；本仓主服正是 Node HTTP 进程。',
        },
        {
          t: "Node.js 与 pnpm 是同一产品：前者是 CLI 别名，后者才是实际执行 JavaScript 的运行时引擎",
          ok: false,
          why: 'Node 跑 JS；pnpm 管依赖安装，角色不同。',
        },
        {
          t: "Node.js 可以直接替代 Linux 内核调度 CPU，主服因此不必再依赖操作系统进程与权限模型",
          ok: false,
          why: 'Node 跑在 OS 用户态之上，不能替代内核。',
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
          t: "PATH 与 HTTP_PROXY 必须设成同一个字符串，否则命令无法执行",
          ok: false,
          why: '语义不同。',
        },
        {
          t: "只要设置了 PATH，出网请求就会自动走代理，无需 HTTP_PROXY",
          ok: false,
          why: '要显式设代理变量或工具配置。',
        },
        {
          t: "只有 Windows 存在环境变量，Linux 与 macOS 并不使用该机制",
          ok: false,
          why: 'Unix 同样有；写法不同。',
        },
      ],
      relatedNodes: ['installers-path', 'data-env', 'clash'],
    },
    {
      id: 'concept-terminal-tooling:q14',
      q: 'CI 里希望「锁文件与解析结果不一致就立刻失败」，pnpm 侧常见做法？',
      choices: [
        {
          t: '使用冻结锁安装（如 --frozen-lockfile），禁止 CI 默默改出新锁',
          ok: true,
          why: '本地可更新锁并提交；CI 应复现而非改写依赖图。',
        },
        {
          t: "CI 每次先删除 lockfile，再随意解析依赖树以获得「最新」包",
          ok: false,
          why: '正是不可复现的根源。',
        },
        {
          t: "把 lockfile 改名为 .env 即可同时满足密钥管理与依赖锁定",
          ok: false,
          why: '职责不同；密钥不进锁文件。',
        },
        {
          t: "只有 Windows Runner 才需要提交锁文件，Linux CI 可以省略",
          ok: false,
          why: '所有平台 CI 都要可复现。',
        },
      ],
      relatedNodes: ['package-managers', 'craft-ci'],
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
          t: "提示符里的 $ 表示当前用户一定是 root，拥有写系统目录与改内核参数的全部权限",
          ok: false,
          why: '$ 常只是非 root 约定；权限看 whoami/uid。',
        },
        {
          t: "出现 PS> 的 PowerShell 会话因此禁止运行 node、git 等任何跨平台外置命令",
          ok: false,
          why: 'PowerShell 同样通过 PATH 调用 node/git。',
        },
        {
          t: "修改 PS1 或 prompt 函数字符串，就等于直接改写 PATH 环境变量里的目录查找顺序",
          ok: false,
          why: '提示符是显示字符串；PATH 是独立环境变量。',
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
          t: "本机装多个 Node 时，Shell 会自动选择 package.json engines 要求的版本，无需 which 或版本管理器",
          ok: false,
          why: 'PATH 顺序决定命中哪个；需 fnm/nvm 或手动对齐。',
        },
        {
          t: "只要 node -v 能输出版本号，就说明当前 PATH 命中的一定符合项目 engines 字段约束",
          ok: false,
          why: '能跑 ≠ 版本对；要对 which 路径与 engines。',
        },
        {
          t: "删除 fnm/nvm 配置后，系统包管理器装的 Node 会自动改写 PATH 并优先于其它已安装版本",
          ok: false,
          why: '多版本共存时仍看 PATH 顺序，不会自动「永远优先」。',
        },
      ],
      relatedNodes: ['runtime-nodejs', 'installers-path', 'package-managers'],
    },
  ],
});
