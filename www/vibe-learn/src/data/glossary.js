/**
 * 零基础术语表（按学习出现顺序维护）
 * brief：一句话人话；also：相关节点 id，供面板跳转
 */

/** @typedef {{ term: string, brief: string, also?: string[] }} GlossaryEntry */

/** @type {Record<string, GlossaryEntry>} */
export const GLOSSARY = {
  /* —— 序章 · 机器 —— */
  hardware: {
    term: '硬件（Hardware）',
    brief: '摸得着的部件：CPU、内存条、硬盘、网卡、屏幕等。软件要靠它们才能真正「动起来」。',
    also: ['hw-sw-link', 'chip-units'],
  },
  software: {
    term: '软件（Software）',
    brief: '程序与数据的合称：告诉硬件「做什么、按什么顺序做」的说明书与工序。',
    also: ['hw-sw-link', 'computer-system'],
  },
  os: {
    term: '操作系统（OS, Operating System）',
    brief: '管理整台电脑资源的「总管」：谁用 CPU、谁读写磁盘、谁上网，都要经它批准。Windows、macOS、Linux 都是 OS。',
    also: ['os-essence', 'terminal-worlds'],
  },
  kernel: {
    term: '内核（Kernel）',
    brief: '操作系统最核心、权限最高的那一层，能直接驱动硬件；普通程序不能随便进内核。',
    also: ['os-essence'],
  },
  userland: {
    term: '用户态（User space）',
    brief: '普通应用运行的「平民区」：浏览器、编辑器、Node 都在这里；要碰硬件必须请内核帮忙。',
    also: ['os-essence'],
  },
  syscall: {
    term: '系统调用（System call）',
    brief: '用户态程序向内核「打申请」的标准入口，例如打开文件、创建进程、收发网络数据。',
    also: ['os-essence', 'linux-cli'],
  },
  process: {
    term: '进程（Process）',
    brief: '正在运行的一个程序实例。同个软件开两次，通常就是两个进程。',
    also: ['os-essence', 'linux-cli'],
  },
  thread: {
    term: '线程（Thread）',
    brief: '进程内部的一条执行线。一个进程可以有多条线程，同时干几件事。',
    also: ['os-essence'],
  },
  virtual_memory: {
    term: '虚拟内存（Virtual memory）',
    brief: 'OS 给每个进程「假装独占一大片地址空间」的技术；实际映射到物理内存或磁盘交换区。',
    also: ['os-essence'],
  },
  file_system: {
    term: '文件系统（File system）',
    brief: '把磁盘上的字节组织成「文件 / 文件夹」的规则与实现，如 NTFS、ext4。',
    also: ['os-essence', 'linux-cli'],
  },
  socket: {
    term: '套接字（Socket）',
    brief: '程序用来收发网络数据的「门把手」。你写的网络代码，底层几乎都握着某个 socket。',
    also: ['os-essence', 'tcp-udp'],
  },
  cpu: {
    term: 'CPU（Central Processing Unit）',
    brief: '中央处理器：通用计算与决策的主力，负责执行绝大多数程序指令。',
    also: ['chip-units'],
  },
  gpu: {
    term: 'GPU（Graphics Processing Unit）',
    brief: '图形 / 并行计算处理器：擅长大量相似运算同时做，常用于画面与部分 AI。',
    also: ['chip-units'],
  },
  ram: {
    term: '内存 / RAM',
    brief: '正在干活时暂存程序与数据的高速仓库；断电内容通常丢失。',
    also: ['chip-units', 'os-essence'],
  },
  driver: {
    term: '驱动（Driver）',
    brief: '教操作系统如何与某块具体硬件「说话」的软件，例如网卡驱动、显卡驱动。',
    also: ['hw-sw-link'],
  },

  /* —— 第一章 · 环境 —— */
  terminal: {
    term: '终端（仿真器）',
    brief: '显示文字、收键盘的窗口程序（Windows Terminal、Git Bash 窗、Terminal.app）。它不解释命令；解释命令的是里面的 Shell。',
    also: ['terminal-worlds', 'shell', 'cli'],
  },
  shell: {
    term: 'Shell',
    brief: '命令解释器，且不止一种：bash、zsh、PowerShell、cmd… 语法不同。Git Bash 提供的是 bash 方言。',
    also: ['terminal-worlds', 'cli', 'lang-shell', 'lang-powershell', 'git_bash'],
  },
  git_bash: {
    term: 'Git Bash',
    brief: 'Git for Windows 自带的 bash 环境。「Git Bash Here」在当前文件夹打开它。Claude Code 在 Win 上推荐它以启用 Bash tool。',
    also: ['terminal-worlds', 'git', 'shell', 'xrk-deploy-env'],
  },
  powershell_shell: {
    term: 'PowerShell',
    brief: 'Windows 常见 Shell：对象管道、与 bash/cmd 语法不同。提示符常为 PS>。可跑 node/pnpm，但不是 bash。',
    also: ['terminal-worlds', 'lang-powershell', 'shell'],
  },
  cmd_shell: {
    term: 'CMD',
    brief: 'Windows 命令提示符（cmd.exe）。方言最老、能力窄；能调 PATH 上的程序，但缺少 bash 生态。',
    also: ['terminal-worlds', 'shell'],
  },
  cli: {
    term: '命令行（CLI, Command Line Interface）',
    brief: '用文字命令而不是鼠标菜单来操作系统的方式。',
    also: ['terminal-worlds', 'linux-cli'],
  },
  ssh: {
    term: 'SSH（Secure Shell）',
    brief: '加密远程登录协议：键盘在你电脑，命令跑在远端服务器上。',
    also: ['terminal-worlds'],
  },
  wsl: {
    term: 'WSL（Windows Subsystem for Linux）',
    brief: 'Windows 里的 Linux 环境（WSL2 带虚拟化 Linux 内核）。与原生 Linux、与 Windows 本机 PATH 都不是同一套；勿混装工具。',
    also: ['terminal-worlds', 'linux-distros', 'os'],
  },
  distro: {
    term: '发行版（Distro）',
    brief: 'Linux 内核 + 软件仓库 + 安装器 + 默认工具的「整机包装」。Ubuntu、Fedora、Arch 都是发行版。',
    also: ['linux-distros'],
  },
  package_mgr_os: {
    term: '系统包管理器',
    brief: '发行版自带的装软件工具：apt（Debian/Ubuntu）、dnf（Fedora）、pacman（Arch）等。',
    also: ['linux-distros', 'installers-path'],
  },
  sudo: {
    term: 'sudo',
    brief: '临时用管理员权限执行一条命令。提示 Permission denied 时，先想是否缺权限，而不是乱 sudo。',
    also: ['linux-cli', 'os-essence'],
  },
  path_env: {
    term: 'PATH（环境变量）',
    brief: '一串目录列表。Shell 找外部命令时按 PATH 顺序搜可执行文件。改完 PATH 必须新开终端；旧窗口仍是旧环境。',
    also: ['installers-path', 'runtime-nodejs', 'terminal-worlds', 'xrk-deploy-env'],
  },
  runtime: {
    term: '运行时（Runtime）',
    brief: '能执行某类程序的引擎环境。对 JS 后端来说，常见就是 Node.js。',
    also: ['runtime-nodejs', 'lang-compiled-runtime'],
  },
  nodejs: {
    term: 'Node.js',
    brief: '让 JavaScript 在浏览器之外运行的运行时（不是一门语言）：可读文件、开端口、跑后端服务。',
    also: ['runtime-nodejs', 'lang-nodejs', 'lang-to-runtime', 'xrk-deploy-env'],
  },
  v8: {
    term: 'V8',
    brief: 'Google 开源的 JS 引擎。Chrome、Chromium 内核的 Edge、Node.js、Playwright Chromium 用它；Firefox（SpiderMonkey）、Safari（JSC）不用。与 Blink 排版是不同层。',
    also: ['runtime-nodejs', 'lang-nodejs', 'xrk-deploy-env', 'chromium'],
  },
  chromium: {
    term: 'Chromium',
    brief: '开源浏览器项目（含 Blink 排版 + V8 等）。Chrome、新版 Edge、Playwright 自带浏览器基于它——不等于「世上所有浏览器」。',
    also: ['xrk-deploy-env', 'v8', 'blink_engine'],
  },
  blink_engine: {
    term: 'Blink',
    brief: 'Chromium 的排版/渲染引擎（HTML/CSS→画面）。执行 JS 的是 V8，不要说成「浏览器引擎只有 V8」。',
    also: ['xrk-deploy-env', 'chromium', 'v8'],
  },
  playwright_chromium: {
    term: 'Playwright Chromium',
    brief: 'Playwright 下载的独立 Chromium 构建，供截图/自动化；不等于系统安装的 Chrome/Edge。',
    also: ['xrk-deploy-env', 'chromium'],
  },
  chrome_browser: {
    term: 'Chrome',
    brief: 'Google 基于 Chromium 的浏览器产品。适合人工打开控制台；渲染链路仍要 Playwright 浏览器。',
    also: ['xrk-deploy-env', 'chromium'],
  },
  edge_browser: {
    term: 'Edge',
    brief: 'Microsoft 基于 Chromium 的浏览器；Windows 常预装。日常浏览可用，不等于自动化用的 Chromium。',
    also: ['xrk-deploy-env', 'chromium'],
  },
  engines_field: {
    term: 'engines（package.json）',
    brief: '项目声明「我需要哪个版本的 Node」。版本不够，语法或依赖可能直接跑不起来。',
    also: ['runtime-nodejs', 'package-managers', 'lang-nodejs'],
  },
  msi: {
    term: 'MSI',
    brief: 'Windows 安装包格式，双击走系统安装向导，常顺带改 PATH。',
    also: ['installers-path'],
  },
  package_json: {
    term: 'package.json',
    brief: 'Node 项目的「清单」：叫什么名字、依赖哪些包、有哪些脚本命令。',
    also: ['package-managers', 'git-workspace'],
  },
  lockfile: {
    term: '锁文件（lockfile）',
    brief: '把依赖的精确版本钉死（如 pnpm-lock.yaml），保证你和同事装出同一棵依赖树。',
    also: ['package-managers'],
  },
  node_modules: {
    term: 'node_modules',
    brief: '依赖安装后的落地目录。一般不手工改、也不提交进 Git。',
    also: ['package-managers'],
  },
  pnpm: {
    term: 'pnpm',
    brief: 'Node 生态的替代包管理器；本仓库只认 pnpm。相对 npm：更省磁盘、依赖树更严。',
    also: ['package-managers', 'runtime-nodejs'],
  },
  npm: {
    term: 'npm',
    brief: 'Node 官方默认包管理器；安装 Node 时通常附带。本仓装依赖请用 pnpm，勿与 npm 混用。',
    also: ['package-managers', 'runtime-nodejs', 'installers-path'],
  },
  npx: {
    term: 'npx',
    brief: '随 Node 附带的命令：按需执行某包中的 CLI，不必先全局安装该包。',
    also: ['package-managers', 'runtime-nodejs', 'npm'],
  },
  uv_pkg: {
    term: 'uv',
    brief: 'Python 生态中的高速包/项目管理工具，常作为 pip 工作流的替代；不随 Python 官方安装强制附带。',
    also: ['package-managers', 'xrk-language-stack', 'xrk-subserver'],
  },
  pip: {
    term: 'pip',
    brief: 'Python 常用默认包安装工具；与 npm 类似，属于「运行时生态的默认包管理入口」。',
    also: ['package-managers', 'lang-landscape'],
  },
  dhcp: {
    term: 'DHCP',
    brief: '动态主机配置协议：接入网络后自动获取 IP、掩码、网关、DNS 等。',
    also: ['ip-addressing', 'routing-nat'],
  },
  firewall: {
    term: '防火墙',
    brief: '按规则允许或拒绝数据包（入站/出站）；与 NAT、端口转发常一起配置。',
    also: ['routing-nat', 'tcp-udp'],
  },
  cdn: {
    term: 'CDN',
    brief: '内容分发网络：把副本缓存在靠近用户的边缘节点；与源站反向代理分工不同。',
    also: ['reverse-proxy', 'http-web', 'dns-https', 'net-edge-practice'],
  },
  ip_pool: {
    term: 'IP 池（地址池）',
    brief: '一组可分配的公网（或出口）地址：动态 NAT、弹性 IP、LB/代理出口、白名单业务常用。',
    also: ['routing-nat', 'net-edge-practice'],
  },
  cloudflare: {
    term: 'Cloudflare',
    brief: '常见边缘平台：托管 DNS、可选全球反代（橙云）、CDN、WAF 与 TLS；访客先到边缘再回源。',
    also: ['net-edge-practice', 'reverse-proxy', 'dns-https'],
  },
  anycast: {
    term: 'Anycast',
    brief: '同一服务地址在多地通告，流量进入较优的 PoP；解释「全球像连同一个 IP」。',
    also: ['net-edge-practice', 'reverse-proxy'],
  },
  waf: {
    term: 'WAF',
    brief: 'Web 应用防火墙：在 HTTP 入口按规则拦截扫描与滥用，常与 CDN/反代同层。',
    also: ['net-edge-practice', 'reverse-proxy', 'firewall'],
  },
  path_filtering: {
    term: '路径过滤（中间盒）',
    brief: '中间策略导致部分目的地解析异常、连不上或质量差；排障时按 DNS / TCP / TLS 分层看症状。',
    also: ['net-edge-practice', 'dns-https', 'routing-nat'],
  },
  region_hosting: {
    term: '地域 / 机房选址',
    brief: '源站或节点所在区域影响延迟、跨境链路质量与合规；如港/日/新常作东亚中转讨论。',
    also: ['net-edge-practice', 'network-basics'],
  },
  rtt: {
    term: 'RTT（往返时延）',
    brief: '发出到收到应答的往返时间；跨机房调用与串行 API 体感卡顿常与此相关。',
    also: ['network-basics', 'tcp-udp', 'http-web'],
  },
  throughput: {
    term: '吞吐量',
    brief: '单位时间实际传过的有效数据量，通常小于带宽上限。',
    also: ['network-basics'],
  },
  mtu: {
    term: 'MTU',
    brief: '链路层单帧/包可承载的最大载荷；过大易分片或丢包。',
    also: ['network-basics', 'protocol-stack'],
  },
  five_tuple: {
    term: '五元组',
    brief: '源 IP、目的 IP、源端口、目的端口、协议；连接跟踪与防火墙常用。',
    also: ['protocol-stack', 'tcp-udp', 'routing-nat'],
  },
  time_wait: {
    term: 'TIME_WAIT',
    brief: 'TCP 主动关闭方在最后 ACK 后短暂停留，吸收迟到包；短连接过多会占临时端口。',
    also: ['tcp-udp', 'http-web'],
  },
  syn_flood: {
    term: 'SYN 洪水',
    brief: '大量半开 TCP 连接占满服务端资源的攻击形态；常靠 SYN Cookie、防火墙缓解。',
    also: ['tcp-udp', 'firewall'],
  },
  sticky_session: {
    term: '会话保持（粘滞）',
    brief: '负载均衡尽量把同一用户打到同一后端；本地 Session 未共享时常见，更好是外置会话。',
    also: ['reverse-proxy', 'http-web'],
  },
  snat_dnat: {
    term: 'SNAT / DNAT',
    brief: '改数据包源地址 / 目的地址：出网共享公网 IP，入站把公网端口转到内网服务。',
    also: ['routing-nat', 'nat'],
  },
  sni: {
    term: 'SNI',
    brief: 'TLS 握手时客户端声明要访问的域名，便于同 IP 多证书、反代按域名分流。',
    also: ['dns-https', 'reverse-proxy'],
  },
  idempotent: {
    term: '幂等',
    brief: '同一请求执行多次，效果与执行一次相同；支付回调、重试设计常考。',
    also: ['http-web', 'api-frontend'],
  },
  http2_http3: {
    term: 'HTTP/2 · HTTP/3',
    brief: 'HTTP/2 多路复用减轻队头阻塞；HTTP/3 基于 QUIC/UDP，弱网更稳。',
    also: ['http-web', 'tcp-udp'],
  },
  jwt: {
    term: 'JWT',
    brief: '常用于无状态鉴权的自包含令牌；相对 Session 易水平扩展，主动踢人需额外机制。',
    also: ['http-web', 'api-frontend'],
  },
  cdn_hit_ratio: {
    term: 'CDN 命中率',
    brief: '请求在边缘直接命中缓存的比例；过低则回源多、源站压力大。',
    also: ['net-edge-practice', 'reverse-proxy', 'cdn'],
  },
  storage_hierarchy: {
    term: '存储层次',
    brief: '寄存器 → 缓存 → 内存 → 磁盘：越靠近 CPU 越快越小；解释「算得快但读盘慢」。',
    also: ['chip-units', 'hw-sw-link', 'os-essence'],
  },
  registry: {
    term: '注册表 / Registry',
    brief: '存放公开 JS 包的服务器（如 npmjs、npmmirror）。pnpm install 默认从这里拉包。',
    also: ['package-managers'],
  },
  corepack: {
    term: 'Corepack',
    brief: 'Node 自带的包管理器版本助手，可按项目声明启用指定 pnpm 版本。',
    also: ['package-managers'],
  },
  git: {
    term: 'Git',
    brief: '分布式版本控制系统：记录谁在何时改了什么，支持分支与合并。',
    also: ['git-workspace', 'git-forges'],
  },
  repo: {
    term: '仓库（Repository）',
    brief: '一套由 Git 管理的项目历史 + 文件。可以在本地，也可以托管在 GitHub/Gitee。',
    also: ['git-workspace', 'git-forges'],
  },
  clone: {
    term: '克隆（git clone）',
    brief: '把远程仓库完整（或浅）复制到你磁盘，得到带 .git 的工作区。',
    also: ['git-workspace'],
  },
  commit: {
    term: '提交（Commit）',
    brief: '一次「拍照」：把选定改动固化进历史，并附说明。',
    also: ['git-workspace'],
  },
  staging: {
    term: '暂存区（Staging area）',
    brief: 'git add 之后、commit 之前的「购物车」：决定下一次提交带走哪些改动。',
    also: ['git-workspace'],
  },
  remote: {
    term: '远程（Remote）',
    brief: '不在你电脑上的仓库副本地址，常见名叫 origin，指向 GitHub/Gitee 等。',
    also: ['git-workspace', 'git-forges'],
  },
  github: {
    term: 'GitHub',
    brief: '全球常用的 Git 托管平台：网页看代码、提 Issue、发 Pull Request、跑 CI。',
    also: ['git-forges'],
  },
  gitee: {
    term: 'Gitee（码云）',
    brief: '国内常用的 Git 托管平台，心智与 GitHub 接近；许多项目会挂镜像。',
    also: ['git-forges'],
  },
  pr: {
    term: 'Pull Request / Merge Request',
    brief: '请求把你的分支合并进目标分支的「合并申请单」，开源协作的标准动作。',
    also: ['git-forges'],
  },
  issue: {
    term: 'Issue',
    brief: '托管平台上的讨论单：报 bug、提需求，不一定立刻改代码。',
    also: ['git-forges'],
  },
  fork: {
    term: 'Fork',
    brief: '在托管平台上复制一份别人的仓库到自己账号下，再改、再提 PR。',
    also: ['git-forges'],
  },

  /* —— 第二章 · 语言 —— */
  source_code: {
    term: '源码（Source code）',
    brief: '人写的程序文本。要变成机器能调度的动作，还须编译或交给运行时。',
    also: ['lang-compiled-runtime'],
  },
  compiler: {
    term: '编译器（Compiler）',
    brief: '把源码翻译成机器码或中间码的工具，翻译多发生在「运行之前」。',
    also: ['lang-compiled-runtime'],
  },
  interpreter: {
    term: '解释器（Interpreter）',
    brief: '边读源码边执行的引擎。许多「脚本语言」给人这种直觉（实现上常更复杂）。',
    also: ['lang-compiled-runtime'],
  },
  bytecode: {
    term: '字节码（Bytecode）',
    brief: '介于源码与机器码之间的中间形式，常由虚拟机执行（如 JVM）。',
    also: ['lang-compiled-runtime'],
  },
  vm_lang: {
    term: '虚拟机（语言 VM）',
    brief: '这里指执行字节码的软件机器（JVM、CLR），不是「虚拟出一整台电脑」的那种。',
    also: ['lang-compiled-runtime'],
  },
  javascript: {
    term: 'JavaScript（JS）',
    brief: '最初为网页而生的语言；在 Node.js 上也可做后端与工具脚本。本仓主服语言。',
    also: ['lang-javascript', 'lang-what-is-language', 'lang-landscape', 'lang-to-runtime', 'runtime-nodejs'],
  },
  programming_language: {
    term: '编程语言',
    brief: '人与机器之间的形式化约定：语法 + 语义（常含标准库）；需运行时/编译器才能执行。',
    also: ['lang-what-is-language', 'lang-compiled-runtime'],
  },
  library_code: {
    term: '库（Library）',
    brief: '可复用代码集合；由你的程序主动调用。控制权在你。',
    also: ['lang-library-framework'],
  },
  framework: {
    term: '框架（Framework）',
    brief: '提供应用骨架与生命周期，在约定时机回调你的代码（控制反转）。Spring、Django 等属此类。',
    also: ['lang-library-framework', 'lang-tech-stack'],
  },
  tech_stack: {
    term: '技术栈（Tech Stack）',
    brief: '做成产品时从前到后的技术组合：语言、运行时、框架、数据、中间件、部署等。',
    also: ['lang-tech-stack', 'lang-tech-selection', 'xrk-language-stack'],
  },
  tech_selection: {
    term: '技术选型',
    brief: '在约束下为问题挑选足够好的技术组合：看团队、生态、需求、成本与可逆性，而非只追新。',
    also: ['lang-tech-selection', 'lang-tech-stack'],
  },
  ioc: {
    term: '控制反转（IoC）',
    brief: '框架调用你的代码，而非你处处调用框架；依赖注入（DI）是常见手段。',
    also: ['lang-library-framework', 'lang-java'],
  },
  adr: {
    term: 'ADR',
    brief: 'Architecture Decision Record：记录「选了什么、为何、不选什么」的架构决策文档。',
    also: ['lang-tech-selection'],
  },
  typescript: {
    term: 'TypeScript（TS）',
    brief: '给 JavaScript 加上类型系统的超集；最终仍变成 JS 再运行。',
    also: ['lang-typescript', 'lang-javascript', 'lang-landscape'],
  },
  python_lang: {
    term: 'Python',
    brief: '可读性高、生态广的脚本语言；数据分析与 AI 周边强。本仓默认子服 pyserver。',
    also: ['lang-python', 'xrk-language-stack', 'python_runtime'],
  },
  go_lang: {
    term: 'Go（Golang）',
    brief: '编译型、原生并发、易部署单二进制；适合高并发与网络工具。本仓 goserver。',
    also: ['lang-go', 'xrk-language-stack'],
  },
  rust_lang: {
    term: 'Rust',
    brief: '无 GC、所有权保证内存安全的系统级语言；适合热点与安全路径。本仓 rustserver。',
    also: ['lang-rust', 'lang-c', 'xrk-language-stack'],
  },
  java_lang: {
    term: 'Java',
    brief: '编译到字节码、由 JVM 执行；企业中间件与 Spring 生态深厚。本仓 jserver。',
    also: ['lang-java', 'xrk-language-stack', 'vm_lang'],
  },
  csharp_lang: {
    term: 'C# / .NET',
    brief: '跑在 CLR 上的托管语言；Windows 企业与 ASP.NET Core 场景强。本仓 netserver。',
    also: ['lang-csharp', 'xrk-language-stack', 'vm_lang'],
  },
  php_lang: {
    term: 'PHP',
    brief: '经典 Web 脚本语言；单文件启动成本低，适合轻量文本与 Web 工具。本仓 phpserver。',
    also: ['lang-php', 'xrk-language-stack'],
  },
  c_lang: {
    term: 'C 语言',
    brief: '近金属的系统基石语言；手动内存与指针。本仓无独立 C 子服，用于理解底层与 FFI。',
    also: ['lang-c', 'lang-rust', 'lang-compiled-runtime'],
  },
  event_loop: {
    term: '事件循环',
    brief: 'JS 单线程处理大量 I/O 的调度核心：等事件、排队回调，避免傻等阻塞。',
    also: ['lang-javascript', 'runtime-nodejs'],
  },
  gil: {
    term: 'GIL',
    brief: 'CPython 全局解释器锁：同一进程内多线程难真正并行算 CPU；I/O 密集仍常用。',
    also: ['lang-python'],
  },
  ownership: {
    term: '所有权（Ownership）',
    brief: 'Rust 中每个值通常有一个主人；借用规则由编译器检查，从根上减少一类内存错误。',
    also: ['lang-rust'],
  },
  jvm: {
    term: 'JVM',
    brief: 'Java 虚拟机：执行字节码，含 JIT 与 GC；「一次编写、到处运行」的载体。',
    also: ['lang-java', 'vm_lang', 'bytecode'],
  },
  clr: {
    term: 'CLR',
    brief: '.NET 公共语言运行时：执行 IL，含 JIT 与 GC；C# 等语言的托管宿主。',
    also: ['lang-csharp', 'vm_lang'],
  },

  /* —— 第三章 · 网络 —— */
  network: {
    term: '计算机网络',
    brief: '多台计算机经线路与设备连起来，共享资源、传递信息的系统。',
    also: ['network-basics'],
  },
  lan: {
    term: '局域网（LAN）',
    brief: 'Local Area Network：家、办公室、校园这类「近、通常较快」的网络。',
    also: ['network-basics'],
  },
  wan: {
    term: '广域网（WAN）',
    brief: 'Wide Area Network：跨城跨省的远距离连接，如企业专线。',
    also: ['network-basics'],
  },
  internet: {
    term: '互联网（Internet）',
    brief: '把无数网络再连起来的「网中之网」，网页与多数在线服务跑在上面。',
    also: ['network-basics'],
  },
  bandwidth: {
    term: '带宽（Bandwidth）',
    brief: '单位时间能传输多少数据的能力，常被说成「管道有多粗」。',
    also: ['network-basics'],
  },
  latency: {
    term: '延迟（Latency）',
    brief: '从发出到收到要等多久，单位常是毫秒（ms）。',
    also: ['network-basics'],
  },
  topology: {
    term: '拓扑（Topology）',
    brief: '设备怎么连成什么形状：星型、总线、网状等。',
    also: ['network-basics'],
  },
  protocol: {
    term: '协议（Protocol）',
    brief: '通信双方事先约定好的「对话规矩」：谁先说、报文长什么样、出错怎么办。',
    also: ['protocol-stack'],
  },
  osi: {
    term: 'OSI 七层模型',
    brief: '教学用的七层网络分层参考模型，帮助理解「每一层只管一类事」。',
    also: ['protocol-stack'],
  },
  tcp_ip: {
    term: 'TCP/IP 模型',
    brief: '互联网实际运行更贴近的分层模型（常见四层说法），HTTP、TCP、IP、网卡各管一层。',
    also: ['protocol-stack'],
  },
  ip: {
    term: 'IP 地址',
    brief: '给上网设备的数字门牌号（如 192.168.1.3），用来在网络层找到「哪一台主机」。',
    also: ['ip-addressing'],
  },
  subnet: {
    term: '子网 / 掩码',
    brief: '把一大段地址切成小片的规则；用来判断「同网段还是要找网关」。',
    also: ['ip-addressing', 'routing-nat'],
  },
  port: {
    term: '端口（Port）',
    brief: '主机上的数字隔间（0–65535），用来区分「同一台机器上的哪个进程」在收数据。',
    also: ['tcp-udp', 'clash-port'],
  },
  tcp: {
    term: 'TCP',
    brief: '面向连接、可靠传输的协议：握手、确认、重传。网页 HTTP 多数跑在 TCP 上。',
    also: ['tcp-udp', 'http-web'],
  },
  udp: {
    term: 'UDP',
    brief: '无连接、轻量的传输协议：快但不保证送达，常见于视频、部分游戏与 DNS。',
    also: ['tcp-udp'],
  },
  gateway: {
    term: '网关（Gateway）',
    brief: '出本网段的「门口」设备，家里通常是路由器。',
    also: ['routing-nat'],
  },
  router: {
    term: '路由器（Router）',
    brief: '根据路由表决定数据包下一跳往哪走的设备。',
    also: ['routing-nat', 'network-basics'],
  },
  nat: {
    term: 'NAT（网络地址转换）',
    brief: '让家里多台设备共用一个公网 IP 出网的技术；路由器常做 NAT。',
    also: ['routing-nat'],
  },
  dns: {
    term: 'DNS',
    brief: 'Domain Name System：把好记的域名（example.com）翻译成 IP 地址。',
    also: ['dns-https'],
  },
  domain: {
    term: '域名（Domain name）',
    brief: '给人看的网站名字；机器真正连接时仍要靠 DNS 变成 IP。',
    also: ['dns-https'],
  },
  https: {
    term: 'HTTPS',
    brief: '在 HTTP 外包一层加密（TLS）：防窃听、防篡改，浏览器地址栏常见小锁。',
    also: ['dns-https', 'http-web'],
  },
  tls: {
    term: 'TLS / SSL',
    brief: '传输层安全协议，HTTPS 的加密与证书校验就建立在它上面（SSL 是旧称）。',
    also: ['dns-https'],
  },
  http: {
    term: 'HTTP',
    brief: '超文本传输协议：浏览器与网站（以及许多 API）交换请求/响应的应用层规矩。',
    also: ['http-web', 'api-frontend'],
  },
  api: {
    term: 'API',
    brief: 'Application Programming Interface：程序与程序约定好的调用方式，像「菜单」。',
    also: ['api-frontend'],
  },
  frontend: {
    term: '前端（Frontend）',
    brief: '用户看得见、点得着的界面一侧，常跑在浏览器或 App 里。',
    also: ['api-frontend'],
  },
  backend: {
    term: '后端（Backend）',
    brief: '跑在服务器上的业务与数据一侧，通常提供 API，界面不一定直接看见。',
    also: ['api-frontend', 'xrk-overview'],
  },
  rest: {
    term: 'REST',
    brief: '一种常用的 Web API 风格：用 URL 表示资源，用 GET/POST 等方法表示动作。',
    also: ['api-frontend', 'http-web'],
  },
  reverse_proxy: {
    term: '反向代理',
    brief: '站在服务器门口的门面：客户端以为在访问它，它再把请求转给后面的真实服务。',
    also: ['reverse-proxy', 'net-edge-practice'],
  },
  forward_proxy: {
    term: '正向代理',
    brief: '更靠近客户端的代理：替「你」出门访问别人，Clash 引擎更接近这一侧。',
    also: ['reverse-proxy', 'net-edge-practice', 'clash'],
  },

  /* —— 第四章 · XRK —— */
  agent_runtime: {
    term: 'AgentRuntime',
    brief: '本仓库的运行时心脏：拉起进程、加载插件/HTTP/工作流等扩展点。',
    also: ['xrk-runtime', 'xrk-overview'],
  },
  core_pkg: {
    term: 'Core（业务包）',
    brief: '放在 core/<名>-Core/ 下的业务能力包：插件、HTTP、www、配置等，不写进 src/ 内核。',
    also: ['xrk-core-layout'],
  },
  plugin: {
    term: '插件（Plugin）',
    brief: '挂到运行时上的可加载能力模块，常响应消息或事件。',
    also: ['xrk-plugin-arch', 'xrk-core-layout'],
  },
  www_static: {
    term: 'www（静态前端）',
    brief: 'Core 里的前端静态资源目录，由框架挂到诸如 /vibe-learn/ 的路径下。',
    also: ['xrk-http-www'],
  },
  commonconfig: {
    term: 'CommonConfig',
    brief: '带 schema 的统一配置机制：模板、校验与消费代码三者要对齐。',
    also: ['xrk-config'],
  },
  http_response: {
    term: 'HttpResponse',
    brief: '本仓库统一的 HTTP 成功/失败响应封装，前端按约定解包字段。',
    also: ['xrk-http-www'],
  },
  loader: {
    term: 'Loader（加载器）',
    brief: '框架扫描 core/*/ 约定目录（plugin、http、www…）并挂到 Runtime 上的机制。',
    also: ['xrk-runtime', 'xrk-core-layout', 'xrk-plugin-arch'],
  },
  plugin_arch: {
    term: '插件式架构',
    brief: '用约定目录 + 基类 + Loader 扩展能力，业务不改内核。',
    also: ['xrk-plugin-arch', 'xrk-core-layout'],
  },
  subserver: {
    term: '子服务端',
    brief: '主服旁的多语言进程族（Python/Go/PHP/Java/.NET/Rust），经 callSubserver 以 HTTP JSON 调用；配置由主服编辑、子服只读。',
    also: ['xrk-subserver', 'xrk-language-stack'],
  },
  subserver_runtimes: {
    term: '子服 runtime 目录',
    brief: '内置六套：pyserver(:8000)、goserver、phpserver、jserver、netserver、rustserver。登记于 src/utils/subserver-runtimes.js；子服侧不设 Node runtime。',
    also: ['xrk-language-stack', 'xrk-subserver', 'lang-landscape'],
  },
  python_runtime: {
    term: 'pyserver（默认子服）',
    brief: 'Python 子服，默认端口 8000；AI/媒体/文档生态成熟，为默认入口。另有 Go/PHP/Java/.NET/Rust 等 runtime 可并存。',
    also: ['xrk-language-stack', 'xrk-subserver', 'lang-landscape'],
  },
  call_subserver: {
    term: 'callSubserver',
    brief: 'AgentRuntime 调用子服的 HTTP JSON 接口；可指定 runtime，未指定则使用 subserver.default。',
    also: ['xrk-subserver', 'xrk-runtime', 'xrk-language-stack'],
  },

  /* —— 第四章 · Stream / AI —— */
  ai_workflow: {
    term: 'AiWorkflow',
    brief: 'XRK 对话工作流基类：组上下文、调 LLM、经 tool calling 跑 MCP 工具。',
    also: ['xrk-stream', 'ai-mcp'],
  },
  stream_wf: {
    term: 'stream / streams',
    brief: '对话请求里选定的工作流名白名单，用来限制本轮可用的工具集合。',
    also: ['xrk-stream'],
  },
  ai: {
    term: '人工智能（AI）',
    brief: '让机器表现出智能行为的学科与技术总称；1956 年达特茅斯会议正式命名。',
    also: ['ai-what'],
  },
  ml: {
    term: '机器学习（ML）',
    brief: '从数据中学习规律，而不是把所有规则手写死。深度学习是其重要分支。',
    also: ['ai-what'],
  },
  llm: {
    term: '大语言模型（LLM）',
    brief: '用海量文本训练、能理解和生成自然语言的神经网络模型（如 GPT、Claude）。',
    also: ['ai-what', 'ai-openai-protocol', 'xrk-stream', 'ai-transformer'],
  },
  embedding_model: {
    term: '嵌入模型（Embedding）',
    brief: '把文本变成向量，方便按「意思相近」检索；RAG 索引常用它。',
    also: ['ai-model-types', 'ai-rag'],
  },
  multimodal: {
    term: '多模态模型',
    brief: '能同时处理文本以外的模态（图像、音频等）的模型。',
    also: ['ai-model-types'],
  },
  transformer: {
    term: 'Transformer',
    brief: '2017 年提出的注意力架构；当代多数 LLM 的主干结构。',
    also: ['ai-transformer', 'ai-arch-beyond'],
  },
  attention: {
    term: '自注意力（Self-Attention）',
    brief: '让序列中任意位置互相加权聚合信息；Transformer 的核心机制。',
    also: ['ai-transformer'],
  },
  cnn: {
    term: 'CNN（卷积神经网络）',
    brief: '擅长抓局部图案，经典用于视觉任务；深度学习重要家族之一。',
    also: ['ai-arch-beyond'],
  },
  rnn: {
    term: 'RNN / LSTM',
    brief: '按时间步处理序列的早期主流架构；长依赖与并行是痛点。',
    also: ['ai-arch-beyond'],
  },
  moe: {
    term: 'MoE（混合专家）',
    brief: '参数总量大，但每次只激活部分专家子网络，兼顾规模与算力。',
    also: ['ai-arch-beyond'],
  },
  finetune: {
    term: '微调（Fine-tuning）',
    brief: '在预训练基座上再用专项数据继续训练，适配对话、领域或工具行为。',
    also: ['ai-finetune'],
  },
  sft: {
    term: 'SFT（监督微调）',
    brief: '用「问→答」示范数据教会模型格式与任务，常见微调第一步。',
    also: ['ai-finetune'],
  },
  lora: {
    term: 'LoRA',
    brief: '参数高效微调：少改参数就能适配任务，省显存与成本。',
    also: ['ai-finetune'],
  },
  rlhf: {
    term: 'RLHF / 对齐',
    brief: '按人类偏好调整模型行为（含 DPO 等变体），减少胡话、提高听劝。',
    also: ['ai-finetune'],
  },
  rag: {
    term: 'RAG',
    brief: '检索增强生成：先检索相关文档片段，再让模型基于证据回答。',
    also: ['ai-rag', 'ai-rag-shift'],
  },
  agentic_rag: {
    term: 'Agentic RAG',
    brief: '由 Agent 多轮决定检索什么、是否再检索；检索成为可调用工具。',
    also: ['ai-agentic-rag', 'ai-rag'],
  },
  long_context: {
    term: '长上下文',
    brief: '模型单次可吞下很长输入；小而稳的知识有时可不经向量库直接塞进提示。',
    also: ['ai-rag-shift'],
  },
  dartmouth: {
    term: '达特茅斯会议（1956）',
    brief: 'AI 学科的「出生证明」：McCarthy 等命名 Artificial Intelligence 并召开暑期研讨。',
    also: ['ai-what'],
  },
  agent_concept: {
    term: 'Agent（智能体）',
    brief: '不止聊天：带目标、能调工具、根据结果继续行动的 AI 程序形态。',
    also: ['ai-what', 'ai-tool-calling', 'ai-subagent'],
  },
  openai_compat: {
    term: 'OpenAI 兼容协议',
    brief: '以 /v1/chat/completions + messages 为代表的事实标准 API 形状；换 base_url 常可换模型。',
    also: ['ai-openai-protocol', 'xrk-stream'],
  },
  chat_completions: {
    term: 'Chat Completions',
    brief: 'OpenAI 的多轮对话端点形态：消息数组进，assistant（或 tool_calls）出；生态最广。',
    also: ['ai-openai-protocol'],
  },
  messages_api: {
    term: 'Messages API 等原生方言',
    brief: '厂商自有推理接口（如 Anthropic Messages、OpenAI Responses）：能力更完整，兼容面较窄。',
    also: ['ai-openai-protocol'],
  },
  a2a: {
    term: 'A2A / ACP',
    brief: 'Agent 之间互相发现与委派任务的协作协议层；与 MCP（接工具）不是同一层。',
    also: ['ai-openai-protocol', 'ai-mcp'],
  },
  function_calling: {
    term: 'Function Calling',
    brief: '2023 年兴起的能力：模型输出结构化函数名与参数，由应用执行后再回灌。',
    also: ['ai-tool-calling'],
  },
  tool_calling: {
    term: 'Tool Calling',
    brief: 'Function calling 的泛化说法：tools / tool_calls；模型点菜，程序下厨。',
    also: ['ai-tool-calling', 'ai-mcp', 'xrk-stream'],
  },
  json_schema: {
    term: 'JSON Schema',
    brief: '用 JSON 描述「参数长什么样」的契约；工具定义常靠它约束模型填参。',
    also: ['ai-tool-calling'],
  },
  mcp: {
    term: 'MCP（Model Context Protocol）',
    brief: 'Anthropic 2024 开源的标准：AI 宿主如何发现并调用外部工具/资源；类似 AI 的 USB-C。',
    also: ['ai-mcp', 'xrk-stream'],
  },
  json_rpc: {
    term: 'JSON-RPC',
    brief: '基于 JSON 的远程过程调用约定；MCP 常用它在客户端与 Server 之间传方法调用。',
    also: ['ai-mcp'],
  },
  lsp: {
    term: 'LSP（语言服务器协议）',
    brief: '编辑器与语言服务之间的标准；MCP 的「一种协议多种客户端」思路受其启发。',
    also: ['ai-mcp'],
  },
  agent_skills: {
    term: 'Agent Skills',
    brief: '按需加载的流程包（SKILL.md + 可选脚本/参考）；相关才展开，省上下文。',
    also: ['ai-skills'],
  },
  agent_rules: {
    term: 'Rules（规则）',
    brief: '给 Agent 的常驻或按文件匹配的硬约束（风格、禁区、安全红线）；宜短不宜塞手册。',
    also: ['ai-rules'],
  },
  subagent: {
    term: '子代理（Subagent）',
    brief: '主代理委派的、上下文相对隔离的专项工人（审查、探索、并行调查）。',
    also: ['ai-subagent'],
  },
  agents_md: {
    term: 'AGENTS.md',
    brief: '写给编程 Agent 的项目说明书（栈、命令、边界）；多种工具都能读。',
    also: ['ai-agents-md', 'xrk-overview'],
  },

  /* —— 番外 · Clash —— */
  proxy_engine: {
    term: '代理引擎',
    brief: '跑在本机的选路程序：按规则决定流量直连还是经节点转发。Clash 属于此类。',
    also: ['clash'],
  },
  proxy_node: {
    term: '节点（代理节点）',
    brief: '远端跳板服务器；流量先到节点再去目标网站。',
    also: ['clash', 'clash-setup'],
  },
  subscription: {
    term: '订阅（Subscription）',
    brief: '一串可更新的节点/规则配置地址，客户端定时拉取以刷新可用节点。',
    also: ['clash-setup'],
  },
  listen: {
    term: '监听（Listen）',
    brief: '进程在某端口上等待别人连进来。代理引擎要先 listen，其它程序才能「走代理」。',
    also: ['clash-port', 'tcp-udp'],
  },
  system_proxy: {
    term: '系统代理',
    brief: '操作系统登记的 HTTP/HTTPS 代理地址；浏览器等多会读，终端/Agent 常常不读。',
    also: ['clash-port', 'clash-setup', 'forward_proxy'],
  },
  http_proxy_env: {
    term: 'HTTP(S)_PROXY 环境变量',
    brief: '告诉进程「出网走哪个代理」的常见约定；CI、CLI、Coding Agent 常用。',
    also: ['clash-port', 'forward_proxy'],
  },
  no_proxy: {
    term: 'NO_PROXY',
    brief: '列出不走代理的主机/域名（如 localhost、内网）；与强制代理配套。',
    also: ['clash-port', 'routing-nat'],
  },
  tun_mode: {
    term: 'TUN 模式',
    brief: '用虚拟网卡尽量截获流量进代理引擎；权限高，适合顽固程序，入门非必开。',
    also: ['clash-port', 'clash-setup', 'proxy_engine'],
  },
  mixed_port: {
    term: 'mixed-port',
    brief: '代理引擎上同时承接 HTTP 与 SOCKS 的合一监听端口（以客户端界面显示为准）。',
    also: ['clash-port', 'listen'],
  },
  socks5: {
    term: 'SOCKS5',
    brief: '常见代理协议，可代理 TCP（及部分 UDP 场景）；常与 HTTP 代理并列配置。',
    also: ['clash-port', 'forward_proxy', 'tcp-udp'],
  },
  policy_group: {
    term: '策略组',
    brief: '代理规则命中后进入的一组节点；可自动测速或手动挑选下一跳。',
    also: ['clash', 'clash-setup', 'proxy_node'],
  },
  cidr: {
    term: 'CIDR',
    brief: '用「地址/前缀长度」表示网段（如 10.0.0.0/24）；路由表、安全组、VPC 通用写法。',
    also: ['ip-addressing', 'routing-nat'],
  },
  dmz: {
    term: 'DMZ',
    brief: '内外网之间的缓冲区网段：对外服务放 DMZ，核心库放内网。',
    also: ['network-basics', 'routing-nat'],
  },
  context_switch: {
    term: '上下文切换',
    brief: 'CPU 从跑一个任务切换到另一个任务的开销；线程过多时吞吐可能下降。',
    also: ['os-essence', 'chip-units'],
  },
  page_fault: {
    term: '缺页（Page fault）',
    brief: '访问的虚拟页不在物理内存时，内核从磁盘装入；频繁缺页会明显变慢。',
    also: ['os-essence', 'chip-units', 'storage_hierarchy'],
  },
  epoll: {
    term: 'epoll（I/O 多路复用）',
    brief: '一次盯多个 fd 是否可读可写的机制（Linux）；高并发网络服务常考，与 Node 事件循环同直觉家族。',
    also: ['hw-sw-link', 'os-essence', 'tcp-udp'],
  },
  quic: {
    term: 'QUIC / HTTP/3',
    brief: '在 UDP 上实现可靠传输与多路复用的现代协议栈；HTTP/3 基于 QUIC。',
    also: ['tcp-udp', 'http-web', 'http2_http3'],
  },
  security_group_proto: {
    term: '安全组协议',
    brief: '云防火墙规则必须指定 TCP/UDP 等协议+端口；只开端口数字、协议写错等于没开（如 MC 基岩要 UDP）。',
    also: ['tcp-udp', 'routing-nat', 'firewall'],
  },
  locality: {
    term: '局部性原理',
    brief: '程序倾向再次访问刚用过的或邻近的数据；解释 Cache/缓存为何有效。',
    also: ['chip-units', 'storage_hierarchy'],
  },
  mac: {
    term: 'MAC 地址',
    brief: '网卡出厂级的硬件地址，主要在同一局域网的链路层转发时使用；和 IP 不是同一层。',
    also: ['ip-addressing', 'protocol-stack'],
  },
  arp: {
    term: 'ARP',
    brief: 'Address Resolution Protocol：在局域网里把 IP 问成 MAC，好让交换机/网卡把帧送到正确接口。',
    also: ['ip-addressing'],
  },
  loopback: {
    term: '回环地址 127.0.0.1',
    brief: '「自己访问自己」的特殊 IP，不走出网卡。本机调试服务常用 localhost / 127.0.0.1。',
    also: ['ip-addressing', 'xrk-first-run'],
  },
  private_ip: {
    term: '私有 IP',
    brief: '仅在内网使用的地址段（如 192.168.x.x）。出公网通常要经路由器做 NAT。',
    also: ['ip-addressing', 'routing-nat'],
  },
  status_code: {
    term: 'HTTP 状态码',
    brief: '响应里的三位数：2xx 成功、4xx 客户端问题、5xx 服务器问题（如 404、502）。',
    also: ['http-web', 'reverse-proxy'],
  },
  load_balance: {
    term: '负载均衡',
    brief: '把请求分到多台后端，避免单机扛不住；常由反向代理完成。',
    also: ['reverse-proxy'],
  },

  /* —— 第二章 · 语言 / 框架分轨 —— */
  html_css: {
    term: 'HTML / CSS',
    brief: 'HTML 是标记语言（结构），CSS 是样式语言（外观）。它们是语言，不是 Vue/React 那种框架。',
    also: ['lang-html-css', 'fw-vue', 'fw-react'],
  },
  shell_lang: {
    term: 'Shell（Bash / Zsh）',
    brief: '命令行脚本语言：变量、管道、条件、循环。是语言，不是前端框架。',
    also: ['lang-shell', 'terminal-worlds', 'linux-cli'],
  },
  powershell_lang: {
    term: 'PowerShell',
    brief: 'Windows 上的对象管道脚本语言。与 Bash 同属语言轨，模型不同。',
    also: ['lang-powershell', 'terminal-worlds'],
  },
  vue_fw: {
    term: 'Vue',
    brief: '建立在 JavaScript 上的渐进式前端框架。不是一门语言；宿主仍是 JS/TS。',
    also: ['fw-vue', 'lang-library-framework', 'lang-javascript'],
  },
  react_fw: {
    term: 'React',
    brief: '建立在 JavaScript 上的 UI 库（生态常当框架用）。不是一门语言；勿说「React 语言」。',
    also: ['fw-react', 'lang-library-framework', 'lang-javascript'],
  },
  angular_fw: {
    term: 'Angular',
    brief: 'TypeScript 向的全家桶前端框架（路由/表单/DI 内置）。不是语言。',
    also: ['fw-angular', 'lang-typescript', 'lang-library-framework'],
  },
  nextjs_fw: {
    term: 'Next.js',
    brief: '基于 React 的 SSR/全栈元框架。语言仍是 JS/TS，UI 层是 React。',
    also: ['fw-nextjs', 'fw-react', 'lang-javascript'],
  },
  spring_fw: {
    term: 'Spring / Spring Boot',
    brief: 'Java 上的应用框架（IoC/AOP/Boot）。不是「Spring 语言」。',
    also: ['fw-spring', 'lang-java', 'lang-library-framework'],
  },
  express_nest_fw: {
    term: 'Express / NestJS',
    brief: 'Node.js 上的 Web 框架：Express 偏中间件，Nest 偏模块化 DI。宿主是 JS/TS。',
    also: ['fw-express-nest', 'lang-javascript', 'runtime-nodejs'],
  },
  django_fastapi_fw: {
    term: 'Django / FastAPI',
    brief: 'Python Web 框架：Django 全栈，FastAPI 偏现代 API。不是 Python 语言本身。',
    also: ['fw-django-fastapi', 'lang-python'],
  },
  gin_fw: {
    term: 'Gin',
    brief: 'Go 上常见的 HTTP Web 框架。宿主是 Go 语言。',
    also: ['fw-gin', 'lang-go'],
  },
  aspnet_fw: {
    term: 'ASP.NET Core',
    brief: '.NET 上的 Web 框架（中间件管道 + DI）。语言是 C#，不是「.NET 语言」。',
    also: ['fw-aspnet', 'lang-csharp'],
  },
  laravel_fw: {
    term: 'Laravel',
    brief: 'PHP 上常见的 Web 框架（Eloquent/Blade）。宿主是 PHP。',
    also: ['fw-laravel', 'lang-php'],
  },
  tasker: {
    term: 'Tasker（通道）',
    brief: '消息通道适配器：把 OneBot/stdin/QQBot 等接入 Runtime。通道 ≠ 业务插件。',
    also: ['xrk-tasker-channels', 'xrk-biz-map', 'agent_runtime'],
  },
  msg_segment: {
    term: 'msgSegment',
    brief: '消息段构造器（图文等）。业务里用裸名 msgSegment.image(url)，勿自行 import 全局。',
    also: ['xrk-tasker-channels', 'xrk-runtime'],
  },
  llm_factory: {
    term: 'LLM Factory',
    brief: 'src/factory/llm：按配置创建多协议 LLM 客户端；ASR/TTS 同族。配在 CommonConfig。',
    also: ['xrk-factory-llm', 'xrk-stream', 'llm'],
  },
  redis_cache: {
    term: 'Redis',
    brief: '内存数据结构服务器 / 缓存中间件。独立进程；本仓 Runtime 必需。不是语言也不是框架。',
    also: ['xrk-database', 'xrk-first-run', 'xrk-deploy-env', 'db-redis', 'db-middleware'],
  },
  middleware_infra: {
    term: '中间件（基础设施）',
    brief: '独立于业务进程、经网络提供共用能力的服务：数据库、缓存、消息队列、网关等。别与 Express 请求管道中间件混名。',
    also: ['lang-library-framework', 'db-middleware', 'db-redis'],
  },
  dbms: {
    term: 'DBMS',
    brief: '数据库管理系统：管存储、查询、并发、持久化的软件。MySQL/PG/Mongo/Redis/SQLite 都是 DBMS 产品。',
    also: ['db-essence', 'db-as-service', 'db-landscape'],
  },
  sqlite_db: {
    term: 'SQLite',
    brief: '嵌入式关系库：通常链进应用进程、落在文件上，不默认监听端口。本仓 Runtime 用 node:sqlite。',
    also: ['db-sqlite', 'xrk-database'],
  },
  mongodb_db: {
    term: 'MongoDB',
    brief: '文档型 DBMS；独立服务。本仓经 mongodb-Core 可选接入。',
    also: ['db-mongodb', 'xrk-database'],
  },
  x_api_key: {
    term: 'X-API-Key',
    brief: '主服 HTTP 业务鉴权常用请求头。密钥在服务端配置，勿写进 www 前端。',
    also: ['xrk-http-auth', 'http', 'api'],
  },
  events_loader: {
    term: 'Events 监听',
    brief: 'core/*/events 生命周期钩子；与 Tasker 不同。部分变更需重启进程（不热更）。',
    also: ['xrk-events', 'xrk-plugin-arch', 'loader'],
  },
};

/**
 * @param {string[]} ids
 * @returns {GlossaryEntry[]}
 */
export function resolveGlossary(ids = []) {
  const out = [];
  const seen = new Set();
  for (const id of ids) {
    if (!id || seen.has(id)) continue;
    const entry = GLOSSARY[id];
    if (!entry) continue;
    seen.add(id);
    out.push({ id, ...entry });
  }
  return out;
}
