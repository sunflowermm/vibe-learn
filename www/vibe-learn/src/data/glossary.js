/**
 * 术语表（按学习出现顺序维护）
 * brief：专业定义优先（缩写展开）→ 边界/本仓落点；少用比喻
 * also：相关节点 id，供面板跳转
 * vh_*：VibeHub（vibe-hub.org）快照，见 vibehub/glossary-entries.js；不覆盖本仓键
 */

import { VIBEHUB_GLOSSARY_ENTRIES } from './vibehub/glossary-entries.js';
import { mergeVibehubGlossary } from './vibehub/merge-glossary.js';

/** @typedef {{
 *   term: string,
 *   brief: string,
 *   also?: string[],
 *   href?: string,
 *   source?: string,
 *   aliases?: string[],
 *   domain?: string,
 *   vibehubId?: string,
 * }} GlossaryEntry */

/** @type {Record<string, GlossaryEntry>} */
export const GLOSSARY = {
  /* —— 序章 · 机器 —— */
  hardware: {
    term: '硬件（Hardware）',
    brief: '计算机系统中可物理接触与计量的部件，包括 Central Processing Unit（中央处理器）、Random Access Memory（内存）、存储设备、网络接口与显示设备等；软件指令最终须由硬件执行。',
    also: ['hw-sw-link', 'chip-units'],
  },
  software: {
    term: '软件（Software）',
    brief: '以程序与数据形式存在的指令与状态集合，描述计算逻辑；须由 Operating System（操作系统）调度并在硬件上执行。',
    also: ['hw-sw-link', 'computer-system'],
  },
  os: {
    term: '操作系统（OS, Operating System）',
    brief: 'Operating System（操作系统）：管理处理器、内存、I/O 设备与进程等资源的系统软件，向应用程序提供抽象、隔离与调度；Windows、macOS、Linux 均为 OS 实例。',
    also: ['os-essence', 'terminal-worlds'],
  },
  kernel: {
    term: '内核（Kernel）',
    brief: 'Kernel（内核）：Operating System（操作系统）中拥有最高特权、可直接访问硬件与驱动接口的核心组件；用户态程序不得直接操作硬件寄存器。',
    also: ['os-essence'],
  },
  userland: {
    term: '用户态（User space）',
    brief: 'User space（用户态）：非特权应用代码运行的地址空间与权限域；访问文件、网络或硬件须通过 System call（系统调用）请求内核代劳。',
    also: ['os-essence'],
  },
  syscall: {
    term: '系统调用（System call）',
    brief: 'System call（系统调用）：用户态程序进入内核态执行特权操作的受控入口，如 open、fork、read、write、socket 等；是 User space 与 Kernel 的边界。',
    also: ['os-essence', 'linux-cli'],
  },
  process: {
    term: '进程（Process）',
    brief: 'Process（进程）：操作系统为运行中的程序实例分配的资源容器，含独立虚拟地址空间、文件描述符表与至少一条执行线程；同一程序多次启动通常对应多个进程。',
    also: ['os-essence', 'linux-cli'],
  },
  thread: {
    term: '线程（Thread）',
    brief: 'Thread（线程）：进程内的调度与执行单元，共享进程地址空间与资源；多线程可在同一进程内并发执行多条控制流。',
    also: ['os-essence'],
  },
  virtual_memory: {
    term: '虚拟内存（Virtual memory）',
    brief: 'Virtual memory（虚拟内存）：Operating System（操作系统）为每个进程提供独立线性地址空间的机制，通过页表映射到物理内存或磁盘交换区，实现隔离与超额分配。',
    also: ['os-essence'],
  },
  file_system: {
    term: '文件系统（File system）',
    brief: 'File system（文件系统）：在块设备上组织字节为文件与目录的命名空间、元数据结构与访问语义；常见实现包括 NTFS、ext4、APFS。',
    also: ['os-essence', 'linux-cli', 'fs-layout'],
  },
  socket: {
    term: '套接字（Socket）',
    brief: 'Socket（套接字）：操作系统提供的网络 I/O 端点抽象，应用程序通过 bind、connect、send、recv 等接口在 IP 与端口上收发数据。',
    also: ['os-essence', 'tcp-udp'],
  },
  cpu: {
    term: 'CPU（Central Processing Unit）',
    brief: 'Central Processing Unit（中央处理器，CPU）：执行通用算术、逻辑与控制指令的处理器核心，负责大多数程序指令的串行或乱序执行。',
    also: ['chip-units'],
  },
  gpu: {
    term: 'GPU（Graphics Processing Unit）',
    brief: 'Graphics Processing Unit（图形处理器，GPU）：面向大规模并行算术的协处理器，擅长矩阵运算与图形渲染，亦用于部分机器学习负载。',
    also: ['chip-units'],
  },
  ram: {
    term: '内存 / RAM',
    brief: 'Random Access Memory（随机存取内存，RAM）：CPU 可直接寻址的易失性主存，用于存放运行中的程序与热数据；断电后内容通常丢失。',
    also: ['chip-units', 'os-essence'],
  },
  driver: {
    term: '驱动（Driver）',
    brief: 'Device driver（设备驱动）：内核或特权层中对接特定硬件的控制程序，将操作系统通用 I/O 接口翻译为该硬件可执行的寄存器与命令序列。',
    also: ['hw-sw-link'],
  },

  /* —— 第一章 · 环境 —— */
  terminal: {
    term: '终端（仿真器）',
    brief: 'Terminal emulator（终端仿真器）：在图形界面中模拟字符终端的窗口程序（如 Windows Terminal、Terminal.app）；负责显示与键盘输入，命令解析由内部 Shell 完成。',
    also: ['terminal-worlds', 'shell', 'cli'],
  },
  shell: {
    term: 'Shell',
    brief: 'Shell：命令行解释器与用户交互层，解析输入、展开变量、启动外部程序；常见实现包括 bash、zsh、PowerShell、cmd，语法与对象模型各异。',
    also: ['terminal-worlds', 'cli', 'lang-shell', 'lang-powershell', 'git_bash'],
  },
  git_bash: {
    term: 'Git Bash',
    brief: 'Git Bash：Git for Windows 附带的 bash 运行环境；「Git Bash Here」可在当前目录打开 bash 会话。Claude Code 在 Windows 上推荐它以启用 Bash tool。',
    also: ['terminal-worlds', 'git', 'shell', 'xrk-deploy-env'],
  },
  powershell_shell: {
    term: 'PowerShell',
    brief: 'PowerShell：Windows 常见 Shell，基于 .NET 对象管道而非纯文本流；提示符常为 PS>，可运行 node、pnpm，但语法与 bash 不兼容。',
    also: ['terminal-worlds', 'lang-powershell', 'shell'],
  },
  cmd_shell: {
    term: 'CMD',
    brief: 'CMD（cmd.exe）：Windows 传统命令解释器，功能与脚本能力较 bash、PowerShell 受限；可调用 PATH 中的可执行文件，生态扩展有限。',
    also: ['terminal-worlds', 'shell'],
  },
  cli: {
    term: '命令行（CLI, Command Line Interface）',
    brief: 'Command Line Interface（命令行界面，CLI）：以文本命令而非图形控件与操作系统或程序交互的界面范式。',
    also: ['terminal-worlds', 'linux-cli'],
  },
  ssh: {
    term: 'SSH（Secure Shell）',
    brief: 'Secure Shell（安全外壳协议，SSH）：基于加密的远程登录与会话协议，在不可信网络上安全执行 shell 命令与文件传输。',
    also: ['terminal-worlds'],
  },
  wsl: {
    term: 'WSL（Windows Subsystem for Linux）',
    brief: 'Windows Subsystem for Linux（WSL）：在 Windows 上运行 Linux 用户态与（WSL2）Linux 内核的兼容层；与原生 Linux 及 Windows 本机 PATH 相互独立，勿混装工具链。',
    also: ['terminal-worlds', 'linux-distros', 'os'],
  },
  distro: {
    term: '发行版（Distro）',
    brief: 'Linux distribution（Linux 发行版，Distro）：在 Linux 内核之上打包软件仓库、包管理器、安装器与默认工具集的发行形态；Ubuntu、Fedora、Arch 均为发行版。',
    also: ['linux-distros'],
  },
  package_mgr_os: {
    term: '系统包管理器',
    brief: 'Operating system package manager（系统包管理器）：向操作系统全局软件栈安装、升级与卸载软件的工具，如 apt、dnf、pacman、Homebrew、winget；与 Node 项目的 pnpm/npm 职责不同。',
    also: ['linux-distros', 'installers-path', 'package-managers'],
  },
  homebrew: {
    term: 'Homebrew（brew）',
    brief: 'Homebrew（brew）：macOS 与 Linux 上广泛使用的第三方系统包管理器；brew install 安装的是系统级 CLI/库，不是项目 node_modules。',
    also: ['installers-path', 'linux-distros', 'package-managers'],
  },
  curl_cli: {
    term: 'curl',
    brief: 'curl：命令行网络客户端（Client URL），支持 HTTP/HTTPS、FTP 等协议，用于请求 API、下载文件与调试；不是浏览器也不是编程语言。',
    also: ['linux-cli', 'http-web', 'xrk-http-auth'],
  },
  wget_cli: {
    term: 'wget',
    brief: 'wget：命令行文件下载与镜像工具，侧重将远程资源递归或批量保存到本地磁盘；与 curl 在 HTTP 下载场景有功能重叠。',
    also: ['linux-cli'],
  },
  container: {
    term: '容器（Container）',
    brief: 'Container（容器）：共享宿主机内核、以命名空间与 cgroup 隔离的进程运行单元，打包应用及其依赖；镜像是只读的层叠文件系统模板。',
    also: ['ops-container', 'ops-docker'],
  },
  docker: {
    term: 'Docker',
    brief: 'Docker：主流容器引擎与工具链，负责镜像构建、容器生命周期与网络存储；本仓 Redis 等本地依赖见 docs/docker.md。',
    also: ['ops-docker', 'ops-compose', 'xrk-deploy-env'],
  },
  compose: {
    term: 'Docker Compose',
    brief: 'Docker Compose：用声明式 YAML 定义并编排多容器应用（服务、网络、卷）的工具；面向单机/开发栈，不等于 Kubernetes 集群编排。',
    also: ['ops-compose', 'ops-docker', 'xrk-deploy-env'],
  },
  container_image: {
    term: '容器镜像（Image）',
    brief: 'Container image（容器镜像）：只读的层叠文件系统与启动元数据模板；容器是镜像运行后的实例。常由 Dockerfile 构建并推送到 Registry。',
    also: ['ops-container', 'ops-docker', 'container'],
  },
  kubernetes: {
    term: 'Kubernetes（K8s）',
    brief: 'Kubernetes（常简称 K8s）：用于集群环境调度、扩缩与服务发现的容器编排系统；相对 Compose 面向多机生产，学习曲线更高。',
    also: ['ops-others', 'ops-compose', 'container'],
  },
  nginx: {
    term: 'Nginx',
    brief: 'Nginx：高性能 Web 服务器与 Reverse proxy（反向代理），可托管静态资源、终止 TLS 并将请求转发至上游；概念课见反向代理，产品课在第三章。',
    also: ['net-nginx', 'reverse-proxy'],
  },
  mcu: {
    term: 'MCU（微控制器）',
    brief: 'Microcontroller Unit（微控制器，MCU）：集成 CPU、存储与外设于单芯片的嵌入式控制器，资源受限、常运行固件；ESP32 为带 Wi-Fi 的 MCU/SoC 系列。',
    also: ['esp-mcu', 'esp-esp32', 'chip-units'],
  },
  esp32: {
    term: 'ESP32',
    brief: 'ESP32：乐鑫（Espressif）Wi-Fi/Bluetooth SoC 产品系列，面向物联网与创客场景；运行固件而非 Node.js 主服进程。',
    also: ['esp-esp32', 'esp-toolchain', 'esp-link'],
  },
  sudo: {
    term: 'sudo',
    brief: 'sudo：Unix-like 系统中以 superuser（超级用户）或其他用户身份临时提升权限执行单条命令的机制；Permission denied 应先排查权限而非滥用 sudo。',
    also: ['linux-cli', 'os-essence'],
  },
  path_env: {
    term: 'PATH（环境变量）',
    brief: 'PATH（环境变量）：操作系统维护的可执行文件搜索目录列表，Shell 按序查找外部命令；修改后须新开终端窗口才生效于已有会话。',
    also: ['installers-path', 'runtime-nodejs', 'terminal-worlds', 'xrk-deploy-env', 'fs-layout'],
  },
  env_var: {
    term: '环境变量（Environment Variable）',
    brief: 'Environment Variable（环境变量）：进程启动时可见的「名字→字符串」配置，常由子进程继承；PATH、HOME、HTTP_PROXY 等均属此类，与具体应用程序私有配置文件格式不同。',
    also: ['installers-path', 'fs-dotfiles', 'clash-port', 'xrk-deploy-env'],
  },
  home_dir: {
    term: '家目录（Home）',
    brief: 'Home directory（家目录）：当前登录用户的主文件夹，Shell 中常以 ~ 或 HOME（Windows 上为 USERPROFILE）引用；个人配置与多数用户级工具数据优先存放于此。Windows Users、Linux /home、macOS /Users 是同一角色的不同路径写法。',
    also: ['fs-layout', 'fs-dotfiles', 'terminal-worlds', 'linux-cli', 'os-essence'],
  },
  dir_role: {
    term: '目录角色（跨系统）',
    brief: '目录角色：跨 Operating System 对照目录时先识别职责（家目录、程序安装、用户配置/缓存、系统配置、临时区、bin），再记忆具体路径；路径字符串不同不等于概念不同。',
    also: ['fs-layout', 'fs-dotfiles', 'os-essence', 'installers-path'],
  },
  path_sep: {
    term: '路径分隔符',
    brief: 'Path separator（路径分隔符）：目录层级在路径字符串中的分隔字符；Windows 传统为反斜杠 \\，Unix/macOS 与多数跨平台工具文档为斜杠 /。Git Bash 等环境常把 C:\\Users 写作 /c/Users，指同一位置。',
    also: ['fs-layout', 'terminal-worlds', 'linux-cli'],
  },
  userprofile: {
    term: 'USERPROFILE',
    brief: 'USERPROFILE：Windows 环境变量，指向当前用户配置目录（通常为 C:\\Users\\<用户名>），与 Unix 系 HOME 同角色。',
    also: ['fs-layout', 'installers-path', 'terminal-worlds'],
  },
  appdata: {
    term: 'AppData',
    brief: 'AppData：Windows 用户目录下的应用数据区，含 Roaming（可漫游配置）、Local（本机缓存与大体量数据）、LocalLow；资源管理器默认常隐藏。',
    also: ['fs-layout', 'fs-dotfiles'],
  },
  fhs: {
    term: 'FHS（文件系统层次标准）',
    brief: 'Filesystem Hierarchy Standard（文件系统层次标准，FHS）：约定 Linux 根目录下 /bin、/etc、/home、/var 等目录职责的规范；发行版大体遵循，细节可有差异。',
    also: ['fs-layout', 'linux-distros', 'linux-cli'],
  },
  bin_dir: {
    term: 'bin 目录',
    brief: 'bin（binaries）：存放可执行命令的目录，如 /bin、/usr/bin、/usr/local/bin 或 Windows 安装树下的 …\\bin；PATH 通常包含若干 bin 路径。',
    also: ['fs-layout', 'installers-path', 'path_env'],
  },
  dotfile: {
    term: '点文件（Dotfile）',
    brief: 'Dotfile（点文件）：Unix 风格下文件名以「.」开头的文件或目录，ls 默认不列出；常用于用户级配置（如 .bashrc、.env、.git），其内容格式因文件而异。',
    also: ['fs-dotfiles', 'fs-layout', 'linux-cli', 'git-workspace'],
  },
  hidden_file: {
    term: '隐藏文件',
    brief: 'Hidden file（隐藏文件）：对默认文件列表不可见的文件。Unix 系多以点前缀约定；Windows 另有 Hidden 等文件属性与资源管理器选项，二者机制不同。',
    also: ['fs-dotfiles', 'fs-layout', 'appdata'],
  },
  runtime: {
    term: '运行时（Runtime）',
    brief: 'Runtime（运行时）：执行特定语言或字节码程序的引擎与环境，提供内存管理、I/O 与标准库；JavaScript 服务端常见为 Node.js。',
    also: ['runtime-nodejs', 'lang-compiled-runtime'],
  },
  nodejs: {
    term: 'Node.js',
    brief: 'Node.js：基于 V8 的 JavaScript Runtime（运行时），在浏览器外提供文件系统、网络与进程 API；本仓主服运行环境。',
    also: ['runtime-nodejs', 'lang-nodejs', 'lang-to-runtime', 'xrk-deploy-env'],
  },
  v8: {
    term: 'V8',
    brief: 'V8：Google 开源的 JavaScript 引擎，用于 Chrome、Chromium 系 Edge、Node.js 与 Playwright Chromium；Firefox（SpiderMonkey）、Safari（JavaScriptCore）使用不同引擎。',
    also: ['runtime-nodejs', 'lang-nodejs', 'xrk-deploy-env', 'chromium'],
  },
  chromium: {
    term: 'Chromium',
    brief: 'Chromium：开源浏览器项目，含 Blink 排版引擎与 V8 等组件；Chrome、新版 Edge、Playwright 自带浏览器基于其构建，不等于全部浏览器。',
    also: ['xrk-deploy-env', 'v8', 'blink_engine'],
  },
  blink_engine: {
    term: 'Blink',
    brief: 'Blink：Chromium 的 HTML/CSS 排版与渲染引擎，负责 DOM 布局与绘制；JavaScript 执行由 V8 负责，二者为不同子系统。',
    also: ['xrk-deploy-env', 'chromium', 'v8'],
  },
  playwright_chromium: {
    term: 'Playwright Chromium',
    brief: 'Playwright Chromium：Playwright 下载的独立 Chromium 构建，供自动化测试与截图；与系统安装的 Chrome/Edge 二进制相互独立。',
    also: ['xrk-deploy-env', 'chromium'],
  },
  chrome_browser: {
    term: 'Chrome',
    brief: 'Chrome：Google 基于 Chromium 的浏览器产品；适合人工调试与 DevTools，自动化渲染仍须 Playwright 等专用浏览器。',
    also: ['xrk-deploy-env', 'chromium'],
  },
  edge_browser: {
    term: 'Edge',
    brief: 'Edge：Microsoft 基于 Chromium 的浏览器，Windows 常预装；日常浏览可用，不等于 Playwright 自动化所用的 Chromium 构建。',
    also: ['xrk-deploy-env', 'chromium'],
  },
  engines_field: {
    term: 'engines（package.json）',
    brief: 'engines（package.json 字段）：声明项目兼容的 Node.js 版本范围；低于要求可能导致语法或原生依赖无法运行。',
    also: ['runtime-nodejs', 'package-managers', 'lang-nodejs'],
  },
  msi: {
    term: 'MSI',
    brief: 'MSI（Microsoft Installer）：Windows 安装包格式，通过系统安装向导部署程序并常自动注册 PATH 与卸载信息。',
    also: ['installers-path'],
  },
  package_json: {
    term: 'package.json',
    brief: 'package.json：Node.js 项目元数据清单，记录名称、版本、依赖、脚本命令与 engines 等字段。',
    also: ['package-managers', 'git-workspace'],
  },
  lockfile: {
    term: '锁文件（lockfile）',
    brief: 'Lockfile（锁文件）：记录依赖解析后精确版本与校验和的清单（如 pnpm-lock.yaml），保证不同环境安装出一致的依赖树。',
    also: ['package-managers'],
  },
  node_modules: {
    term: 'node_modules',
    brief: 'node_modules：包管理器将依赖解压落地的目录；通常由工具生成，不手工编辑，也不提交至 Git。',
    also: ['package-managers'],
  },
  pnpm: {
    term: 'pnpm',
    brief: 'npm（Node Package Manager）：Node.js 官方默认包管理器，随 Node 安装附带；本仓请用 pnpm，避免与 npm 混装同一项目。',
    also: ['package-managers', 'runtime-nodejs'],
  },
  npm: {
    term: 'npm',
    brief: 'Node 官方默认包管理器；安装 Node 时通常附带。本仓装依赖请用 pnpm，勿与 npm 混用。',
    also: ['package-managers', 'runtime-nodejs', 'installers-path'],
  },
  npx: {
    term: 'npx',
    brief: 'npx：Node.js 附带的包执行器，可临时下载并运行 npm 包中的 CLI，无需全局安装。',
    also: ['package-managers', 'runtime-nodejs', 'npm'],
  },
  uv_pkg: {
    term: 'uv',
    brief: 'uv：Python 生态的高速包与项目管理工具，常作为 pip 工作流的替代；不随 Python 官方安装强制附带。',
    also: ['package-managers', 'xrk-language-stack', 'xrk-subserver'],
  },
  pip: {
    term: 'pip',
    brief: 'pip：Python 官方包安装器，用于从 PyPI 等索引安装发行包；本仓 Python 子服亦常见 uv 作为更快的替代工作流。',
    also: ['package-managers', 'lang-landscape', 'xrk-subserver'],
  },
  dhcp: {
    term: 'DHCP',
    brief: 'Dynamic Host Configuration Protocol（动态主机配置协议，DHCP）：客户端接入网络后自动获取 IP 地址、子网掩码、默认网关与 DNS 服务器等参数。',
    also: ['ip-addressing', 'routing-nat'],
  },
  firewall: {
    term: '防火墙',
    brief: 'Firewall（防火墙）：按规则对网络数据包进行允许或丢弃的安全策略执行点，可作用于入站与出站；常与 NAT、端口转发协同配置。',
    also: ['routing-nat', 'tcp-udp'],
  },
  cdn: {
    term: 'CDN',
    brief: 'Content Delivery Network（内容分发网络，CDN）：在靠近用户的边缘节点缓存静态与可缓存响应，降低回源延迟；与源站 Reverse proxy（反向代理）职责分工不同。',
    also: ['reverse-proxy', 'http-web', 'dns-https', 'net-edge-practice'],
  },
  ip_pool: {
    term: 'IP 池（地址池）',
    brief: 'IP address pool（IP 地址池）：可供分配或轮转的公网或出口 IP 集合，用于动态 NAT、弹性 IP、负载均衡出口与白名单业务。',
    also: ['routing-nat', 'net-edge-practice'],
  },
  cloudflare: {
    term: 'Cloudflare',
    brief: 'Cloudflare：边缘网络平台，提供托管 DNS、全球 Reverse proxy（反向代理）、CDN、Web Application Firewall（WAF）与 TLS 终止；访客先至边缘再回源。',
    also: ['net-edge-practice', 'reverse-proxy', 'dns-https'],
  },
  anycast: {
    term: 'Anycast',
    brief: 'Anycast（任播）：同一 IP 前缀在多个 PoP 同时宣告 BGP 路由，流量进入拓扑上较近的接入点；用于解释全球统一入口 IP 的接入行为。',
    also: ['net-edge-practice', 'reverse-proxy'],
  },
  waf: {
    term: 'WAF',
    brief: 'Web Application Firewall（Web 应用防火墙，WAF）：在 HTTP/HTTPS 入口按签名与规则拦截恶意请求、扫描与滥用；常与 CDN 或 Reverse proxy 同层部署。',
    also: ['net-edge-practice', 'reverse-proxy', 'firewall'],
  },
  path_filtering: {
    term: '路径过滤（中间盒）',
    brief: 'Path filtering（路径过滤，中间盒）：网络路径上的策略设备对特定目的地或协议进行干扰，表现为解析异常、连接失败或质量下降；排障应分层检查 DNS、TCP、TLS。',
    also: ['net-edge-practice', 'dns-https', 'routing-nat'],
  },
  region_hosting: {
    term: '地域 / 机房选址',
    brief: 'Region / data center placement（地域与机房选址）：源站或边缘节点所在地理区域影响 Round-Trip Time（往返时延）、跨境链路质量与合规要求。',
    also: ['net-edge-practice', 'network-basics'],
  },
  rtt: {
    term: 'RTT（往返时延）',
    brief: 'Round-Trip Time（往返时延，RTT）：数据包从源到目的并收到应答的总耗时；跨机房调用与串行 API 的体感延迟常与此相关。',
    also: ['network-basics', 'tcp-udp', 'http-web'],
  },
  throughput: {
    term: '吞吐量',
    brief: 'Throughput（吞吐量）：单位时间内实际成功传输的有效数据量，受带宽、丢包、拥塞与协议开销制约，通常低于链路带宽上限。',
    also: ['network-basics'],
  },
  mtu: {
    term: 'MTU',
    brief: 'Maximum Transmission Unit（最大传输单元，MTU）：链路层单帧可承载的最大 IP 载荷字节数；过大可能导致 IP 分片或丢包。',
    also: ['network-basics', 'protocol-stack'],
  },
  five_tuple: {
    term: '五元组',
    brief: 'Five-tuple（五元组）：源 IP、目的 IP、源端口、目的端口与传输层协议的组合，用于连接跟踪、NAT 映射与 Firewall 规则匹配。',
    also: ['protocol-stack', 'tcp-udp', 'routing-nat'],
  },
  time_wait: {
    term: 'TIME_WAIT',
    brief: 'TIME_WAIT：Transmission Control Protocol（传输控制协议，TCP）主动关闭方在发送最后 ACK 后的等待状态，用于吸收迟到的重复段；短连接过多会占用临时端口。',
    also: ['tcp-udp', 'http-web'],
  },
  syn_flood: {
    term: 'SYN 洪水',
    brief: 'SYN flood（SYN 洪水）：攻击者发送大量 TCP SYN 包占用服务端半连接队列资源的拒绝服务形态；缓解手段包括 SYN Cookie 与速率限制。',
    also: ['tcp-udp', 'firewall'],
  },
  sticky_session: {
    term: '会话保持（粘滞）',
    brief: 'Session affinity（会话保持/粘滞）：Load balancer（负载均衡器）将同一客户端会话固定路由至同一后端实例；本地 Session 未共享时的权宜之计，更优方案是外置会话存储。',
    also: ['reverse-proxy', 'http-web'],
  },
  snat_dnat: {
    term: 'SNAT / DNAT',
    brief: 'Network Address Translation（网络地址转换，NAT）：改写 IP 报文源或目的地址以让多内网主机共享少量公网地址出网或发布内网服务。',
    also: ['routing-nat', 'nat'],
  },
  sni: {
    term: 'SNI',
    brief: 'Server Name Indication（服务器名称指示，SNI）：TLS 握手中客户端声明目标主机名的扩展，使同一 IP 上可托管多证书并按域名分流。',
    also: ['dns-https', 'reverse-proxy'],
  },
  idempotent: {
    term: '幂等',
    brief: 'Idempotency（幂等性）：同一操作重复执行多次与执行一次产生相同系统状态；支付回调与 HTTP 重试设计中的关键性质。',
    also: ['http-web', 'api-frontend'],
  },
  http2_http3: {
    term: 'HTTP/2 · HTTP/3',
    brief: 'HTTP/2 · HTTP/3：HTTP/2 在单连接上多路复用请求以减轻队头阻塞；HTTP/3 基于 QUIC over User Datagram Protocol（用户数据报协议，UDP），弱网下连接迁移更稳。',
    also: ['http-web', 'tcp-udp'],
  },
  jwt: {
    term: 'JWT',
    brief: 'JSON Web Token（JWT）：自包含的签名令牌格式，常用于无状态鉴权；相对服务端 Session 易水平扩展，主动撤销须额外黑名单或短过期策略。',
    also: ['http-web', 'api-frontend'],
  },
  cdn_hit_ratio: {
    term: 'CDN 命中率',
    brief: 'CDN cache hit ratio（CDN 命中率）：边缘节点直接响应而无需回源请求的比例；过低意味着源站压力与延迟上升。',
    also: ['net-edge-practice', 'reverse-proxy', 'cdn'],
  },
  storage_hierarchy: {
    term: '存储层次',
    brief: 'Memory hierarchy（存储层次）：自寄存器、Cache（缓存）、RAM 至磁盘的容量—速度梯度；越靠近 CPU 越快越小，解释算力高但读盘慢的现象。',
    also: ['chip-units', 'hw-sw-link', 'os-essence'],
  },
  registry: {
    term: '注册表 / Registry',
    brief: 'Package registry（包注册表）：存放并分发公开软件包的索引服务，如 npmjs.com、npmmirror；pnpm install 默认从此拉取 tarball。',
    also: ['package-managers'],
  },
  corepack: {
    term: 'Corepack',
    brief: 'Corepack：Node.js 内置的包管理器版本管理器，可按 package.json 声明启用指定 pnpm 或 yarn 版本。',
    also: ['package-managers'],
  },
  git: {
    term: 'Git',
    brief: 'Git：分布式 Version Control System（版本控制系统），记录文件变更历史，支持分支、合并与离线提交。',
    also: ['git-workspace', 'git-forges'],
  },
  repo: {
    term: '仓库（Repository）',
    brief: 'Repository（仓库）：由 Git 管理的项目目录及其完整提交历史；可存在于本地或托管于 GitHub、Gitee 等远程平台。',
    also: ['git-workspace', 'git-forges'],
  },
  clone: {
    term: '克隆（git clone）',
    brief: 'git clone：将远程 Repository（仓库）完整或浅层复制到本地磁盘，包含 .git 元数据与工作区文件。国内直连 GitHub 常超时；可先设 HTTP(S)_PROXY，或临时用 ghproxy 前缀 URL。',
    also: ['git-workspace', 'git-forges', 'xrk-deploy-env', 'gh_proxy', 'http_proxy_env'],
  },
  commit: {
    term: '提交（Commit）',
    brief: 'Commit（提交）：将 Staging area（暂存区）中选定变更写入本地版本库历史并附带作者、时间与说明信息的不可变快照操作。',
    also: ['git-workspace'],
  },
  staging: {
    term: '暂存区（Staging area）',
    brief: 'Staging area（暂存区）：Git 中位于工作区与本地仓库之间的索引层；git add 决定哪些变更纳入下一次 commit。',
    also: ['git-workspace'],
  },
  remote: {
    term: '远程（Remote）',
    brief: 'Remote（远程）：指向托管平台或其他机器上 Repository（仓库）副本的命名 URL，默认名 origin。',
    also: ['git-workspace', 'git-forges'],
  },
  github: {
    term: 'GitHub',
    brief: 'GitHub：全球最大的 Git 托管与协作平台，提供 Issue、Pull Request、Actions CI 与代码审查工作流。',
    also: ['git-forges'],
  },
  gitee: {
    term: 'Gitee（码云）',
    brief: 'Gitee（码云）：国内常用的 Git 托管平台，功能与 GitHub 相近；许多开源项目在此维护镜像。',
    also: ['git-forges'],
  },
  pr: {
    term: 'Pull Request / Merge Request',
    brief: 'Pull Request / Merge Request：请求将源分支变更合并入目标分支的协作审查流程，开源与团队开发的标准入口。',
    also: ['git-forges'],
  },
  issue: {
    term: 'Issue',
    brief: 'Issue：托管平台上的工单与讨论线程，用于报告缺陷、提出需求或跟踪任务，不必然伴随代码变更。',
    also: ['git-forges'],
  },
  fork: {
    term: 'Fork',
    brief: 'Fork：在托管平台复制他人 Repository（仓库）至自己账号，在副本上修改后可通过 Pull Request 贡献回原项目。',
    also: ['git-forges'],
  },
  gh_proxy: {
    term: 'ghproxy / gh-proxy',
    brief: 'ghproxy.com（及同类如 gh-proxy.com）：第三方 GitHub 资源前缀/中转：把 https://github.com/... 写成 https://ghproxy.com/https://github.com/... 再给 git clone 等工具访问。非官方、可用性会变；优先本机 HTTP(S)_PROXY。',
    also: ['git-forges', 'git-workspace', 'xrk-deploy-env', 'clash-port', 'clone', 'http_proxy_env'],
  },

  /* —— 第二章 · 语言 —— */
  source_code: {
    term: '源码（Source code）',
    brief: 'Source code（源码）：人类可读的高级语言或汇编程序文本，须经编译或 Runtime（运行时）解释/即时编译方可执行。',
    also: ['lang-compiled-runtime'],
  },
  compiler: {
    term: '编译器（Compiler）',
    brief: 'Compiler（编译器）：将源码静态翻译为目标机器码、字节码或中间表示的工具，翻译多发生在程序运行之前。',
    also: ['lang-compiled-runtime'],
  },
  interpreter: {
    term: '解释器（Interpreter）',
    brief: 'Interpreter（解释器）：逐条读取并执行源码或中间码的运行时组件；许多脚本语言在实现上常结合字节码与 JIT。',
    also: ['lang-compiled-runtime'],
  },
  bytecode: {
    term: '字节码（Bytecode）',
    brief: 'Bytecode（字节码）：介于源码与机器码之间的中间指令格式，由 Virtual Machine（虚拟机，如 JVM）解释或 JIT 执行。',
    also: ['lang-compiled-runtime'],
  },
  vm_lang: {
    term: '虚拟机（语言 VM）',
    brief: 'Language Virtual Machine（语言虚拟机）：执行字节码的软件运行时（如 JVM、CLR），此处不是指虚拟化整台物理机的 Hypervisor。',
    also: ['lang-compiled-runtime'],
  },
  javascript: {
    term: 'JavaScript（JS）',
    brief: 'JavaScript（JS）：ECMAScript 标准的动态脚本语言，最初为 Web 浏览器设计，在 Node.js 上亦可构建服务端与工具；本仓主服语言。',
    also: ['lang-javascript', 'lang-what-is-language', 'lang-landscape', 'lang-to-runtime', 'runtime-nodejs'],
  },
  programming_language: {
    term: '编程语言',
    brief: 'Programming language（编程语言）：人与计算系统之间的形式化语法与语义约定，通常含标准库；须配合编译器或 Runtime 方可执行。',
    also: ['lang-what-is-language', 'lang-compiled-runtime'],
  },
  library_code: {
    term: '库（Library）',
    brief: 'Library（库）：可复用代码模块集合，由应用程序主动调用；程序保留主控流程（与 Framework 相对）。',
    also: ['lang-library-framework'],
  },
  framework: {
    term: '框架（Framework）',
    brief: 'Framework（框架）：提供应用骨架、生命周期与扩展点的软件基座，在约定钩子处回调业务代码（Inversion of Control，控制反转）；Spring、Django 属此类。',
    also: ['lang-library-framework', 'lang-tech-stack'],
  },
  tech_stack: {
    term: '技术栈（Tech Stack）',
    brief: 'Technology stack（技术栈）：实现产品所采用的前后端语言、Runtime、Framework、数据存储、中间件与部署组件的组合。',
    also: ['lang-tech-stack', 'lang-tech-selection', 'xrk-language-stack'],
  },
  tech_selection: {
    term: '技术选型',
    brief: 'Technology selection（技术选型）：在团队能力、生态、性能、成本与可逆性约束下为问题选择足够好的技术组合，而非单纯追新。',
    also: ['lang-tech-selection', 'lang-tech-stack'],
  },
  ioc: {
    term: '控制反转（IoC）',
    brief: 'Inversion of Control（控制反转，IoC）：Framework 在生命周期节点调用应用代码，而非应用处处主动调用 Framework；Dependency Injection（依赖注入，DI）是常见实现手段。',
    also: ['lang-library-framework', 'lang-java'],
  },
  adr: {
    term: 'ADR',
    brief: 'Architecture Decision Record（架构决策记录，ADR）：记录架构选型、理由、备选方案与后果的结构化文档，便于团队追溯决策上下文。',
    also: ['lang-tech-selection'],
  },
  typescript: {
    term: 'TypeScript（TS）',
    brief: 'TypeScript（TS）：JavaScript 的超集，添加静态类型与编译期检查；编译产物仍为 JavaScript 再交由 Runtime 执行。',
    also: ['lang-typescript', 'lang-javascript', 'lang-landscape'],
  },
  python_lang: {
    term: 'Python',
    brief: 'Python：强调可读性的动态脚本语言，数据分析与 AI 生态丰富；本仓默认子服为 pyserver。',
    also: ['lang-python', 'xrk-language-stack', 'python_runtime'],
  },
  go_lang: {
    term: 'Go（Golang）',
    brief: 'Go（Golang）：静态编译、原生 goroutine 并发、单二进制部署的系统语言；本仓 goserver 子服使用。',
    also: ['lang-go', 'xrk-language-stack'],
  },
  rust_lang: {
    term: 'Rust',
    brief: 'Rust：无 Garbage Collection（垃圾回收，GC）、以所有权系统保证内存安全的系统语言；本仓 rustserver 子服使用。',
    also: ['lang-rust', 'lang-c', 'xrk-language-stack'],
  },
  java_lang: {
    term: 'Java',
    brief: 'Java：编译为 Bytecode（字节码）由 JVM 执行的托管语言；企业中间件与 Spring 生态深厚；本仓 jserver 子服使用。',
    also: ['lang-java', 'xrk-language-stack', 'vm_lang'],
  },
  csharp_lang: {
    term: 'C# / .NET',
    brief: 'C# / .NET：运行于 Common Language Runtime（公共语言运行时，CLR）的托管语言；Windows 企业与 ASP.NET Core 场景强；本仓 netserver 子服使用。',
    also: ['lang-csharp', 'xrk-language-stack', 'vm_lang'],
  },
  php_lang: {
    term: 'PHP',
    brief: 'PHP：面向 Web 的脚本语言，请求—响应模型成熟、单文件启动成本低；本仓 phpserver 子服使用。',
    also: ['lang-php', 'xrk-language-stack'],
  },
  c_lang: {
    term: 'C 语言',
    brief: 'C 语言：接近硬件的系统级语言，手动内存管理与指针语义；本仓无独立 C 子服，用于理解底层与 Foreign Function Interface（外部函数接口，FFI）。',
    also: ['lang-c', 'lang-rust', 'lang-compiled-runtime'],
  },
  event_loop: {
    term: '事件循环',
    brief: 'Event loop（事件循环）：JavaScript Runtime 在单线程上调度 I/O 完成回调与非阻塞任务的机制，避免阻塞等待 I/O。',
    also: ['lang-javascript', 'runtime-nodejs'],
  },
  gil: {
    term: 'GIL',
    brief: 'Global Interpreter Lock（全局解释器锁，GIL）：CPython 中保护解释器内部结构的互斥锁，限制同一进程内多线程并行执行 CPU 密集 Python 字节码；I/O 密集仍可用多线程。',
    also: ['lang-python'],
  },
  ownership: {
    term: '所有权（Ownership）',
    brief: 'Ownership（所有权）：Rust 类型系统的核心规则——每个值在任一时刻有唯一所有者，借用与生命周期由编译器静态检查，以消除一类内存错误。',
    also: ['lang-rust'],
  },
  jvm: {
    term: 'JVM',
    brief: 'Java Virtual Machine（Java 虚拟机，JVM）：执行 Java Bytecode（字节码）的运行时，含 Just-In-Time compilation（即时编译，JIT）与 GC；实现「一次编译、多处运行」。',
    also: ['lang-java', 'vm_lang', 'bytecode'],
  },
  clr: {
    term: 'CLR',
    brief: 'Common Language Runtime（公共语言运行时，CLR）：.NET 平台执行 Common Intermediate Language（公共中间语言，CIL/IL）的运行时，含 JIT 与 GC；C# 等语言的托管宿主。',
    also: ['lang-csharp', 'vm_lang'],
  },

  /* —— 第三章 · 网络 —— */
  network: {
    term: '计算机网络',
    brief: 'Computer network（计算机网络）：通过链路、交换机、路由器等互连多台计算设备以共享资源与交换数据的系统。',
    also: ['network-basics'],
  },
  lan: {
    term: '局域网（LAN）',
    brief: 'Local Area Network（局域网，LAN）：覆盖有限地理范围（家庭、办公室、校园）的高速私有网络。',
    also: ['network-basics'],
  },
  wan: {
    term: '广域网（WAN）',
    brief: 'Wide Area Network（广域网，WAN）：跨城市、跨区域的远距离网络连接，如企业专线或运营商骨干网。',
    also: ['network-basics'],
  },
  internet: {
    term: '互联网（Internet）',
    brief: 'Internet（互联网）：基于 TCP/IP 协议族将全球自治系统互联而成的「网络的网络」，承载 Web 与多数在线服务。',
    also: ['network-basics'],
  },
  bandwidth: {
    term: '带宽（Bandwidth）',
    brief: 'Bandwidth（带宽）：通信信道在单位时间内可传输的数据量上限，通常以 bit/s 或 byte/s 表示；不等于实际 Throughput（吞吐量）。',
    also: ['network-basics'],
  },
  latency: {
    term: '延迟（Latency）',
    brief: 'Latency（延迟）：从发出到被感知响应所经历的时间（常以 ms 计）；与 Bandwidth（带宽）独立。网络侧常关联 RTT、排队与序列化；体感慢不一定是带宽不够。',
    also: ['network-basics', 'rtt', 'http-web'],
  },
  topology: {
    term: '拓扑（Topology）',
    brief: 'Network topology（网络拓扑）：设备与链路的物理或逻辑连接结构，如星型、总线、网状。',
    also: ['network-basics'],
  },
  protocol: {
    term: '协议（Protocol）',
    brief: 'Protocol（协议）：通信实体之间约定的报文格式、时序、状态转移与错误处理规则集合。',
    also: ['protocol-stack'],
  },
  osi: {
    term: 'OSI 七层模型',
    brief: 'OSI seven-layer model（OSI 七层模型）：Open Systems Interconnection（开放系统互连）参考模型，将网络功能分为七层以便教学与分层理解。',
    also: ['protocol-stack'],
  },
  tcp_ip: {
    term: 'TCP/IP 模型',
    brief: 'TCP/IP model（TCP/IP 模型）：互联网实际部署更接近的分层模型（常见四层表述），Application、Transport、Internet、Link 各层职责分明。',
    also: ['protocol-stack'],
  },
  ip: {
    term: 'IP 地址',
    brief: 'IP address（IP 地址）：Internet Protocol（网际协议）层标识主机或网卡接口的逻辑地址（如 192.168.1.3 或 2001:db8::1）。找「哪台机器」靠 IP；找「哪个进程服务」还要 Port（端口）。勿与 Domain name（域名）、URL 混淆。',
    also: ['ip-addressing', 'tcp-udp', 'dns-https'],
  },
  subnet: {
    term: '子网 / 掩码',
    brief: 'Subnet / netmask（子网与掩码）：将 IP 地址空间划分为连续前缀的规则，用于判断通信是否在同一网段或须经 Gateway（网关）。点分掩码（如 255.255.255.0）与 CIDR（/24）描述同一前缀长度，工程上更常写 CIDR。',
    also: ['ip-addressing', 'routing-nat'],
  },
  port: {
    term: '端口（Port）',
    brief: 'Port（端口）：传输层上区分同一主机不同服务的 16 位编号（0–65535），与 IP 地址组成 Socket 地址。',
    also: ['tcp-udp', 'clash-port'],
  },
  tcp: {
    term: 'TCP',
    brief: 'Transmission Control Protocol（传输控制协议，TCP）：面向连接、可靠、有序的字节流传输协议，含三次握手、确认重传与流量控制；HTTP 多运行其上。',
    also: ['tcp-udp', 'http-web'],
  },
  udp: {
    term: 'UDP',
    brief: 'User Datagram Protocol（用户数据报协议，UDP）：无连接、不保证可靠与有序的轻量传输协议，常用于实时媒体、DNS 与 QUIC 底层。',
    also: ['tcp-udp'],
  },
  gateway: {
    term: '网关（Gateway）',
    brief: 'Gateway（网关）：连接不同网络并转发跨网段 IP 数据包的边界路由器，家庭网络中通常由路由器担任默认网关。',
    also: ['routing-nat'],
  },
  router: {
    term: '路由器（Router）',
    brief: 'Router（路由器）：依据路由表与最长前缀匹配决定 IP 包下一跳的三层转发设备。',
    also: ['routing-nat', 'network-basics'],
  },
  nat: {
    term: 'NAT（网络地址转换）',
    brief: '让家里多台设备共用一个公网 IP 出网的技术；路由器常做 NAT。',
    also: ['routing-nat'],
  },
  dns: {
    term: 'DNS',
    brief: 'Domain Name System（域名系统，DNS）：将人类可读的 Domain name（域名）解析为 IP 地址及其他记录的分布式命名系统。',
    also: ['dns-https'],
  },
  domain: {
    term: '域名（Domain name）',
    brief: 'Domain name（域名）：DNS 命名空间中的层次化名字（如 example.com）。人类好记；机器通信仍须经 DNS 解析成 IP。域名 ≠ IP ≠ URL：URL 还可含协议、端口与路径。',
    also: ['dns-https', 'ip-addressing', 'http-web'],
  },
  https: {
    term: 'HTTPS',
    brief: 'HTTPS：HTTP over TLS（传输层安全），在 HTTP 之上提供加密、完整性校验与服务器身份认证；浏览器地址栏小锁表示 TLS 已启用。',
    also: ['dns-https', 'http-web'],
  },
  tls: {
    term: 'TLS / SSL',
    brief: 'Transport Layer Security（传输层安全，TLS）：为 TCP 连接提供加密与认证的协议族；Secure Sockets Layer（SSL）为其前身，现统称 TLS。',
    also: ['dns-https'],
  },
  http: {
    term: 'HTTP',
    brief: 'Hypertext Transfer Protocol（超文本传输协议，HTTP）：Web 与多数 REST API 使用的应用层请求—响应协议，定义方法、头字段与状态码语义。',
    also: ['http-web', 'api-frontend'],
  },
  api: {
    term: 'API',
    brief: 'Application Programming Interface（应用程序编程接口，API）：软件组件之间约定的操作、数据格式、错误码与调用契约。',
    also: ['api-frontend'],
  },
  frontend: {
    term: '前端（Frontend）',
    brief: 'Frontend（前端）：面向终端用户的交互与呈现层，通常运行在浏览器或原生客户端中。',
    also: ['api-frontend'],
  },
  backend: {
    term: '后端（Backend）',
    brief: 'Backend（后端）：运行在服务器上的业务逻辑、数据访问与 API 层，用户界面通常不直接暴露其实现；本仓 AgentRuntime 与 Core 属后端。',
    also: ['api-frontend', 'xrk-overview'],
  },
  rest: {
    term: 'REST',
    brief: 'Representational State Transfer（表述性状态转移，REST）：一种 Web API 设计风格，以 URL 标识资源、HTTP 方法表达动作、无状态交互。',
    also: ['api-frontend', 'http-web'],
  },
  reverse_proxy: {
    term: '反向代理',
    brief: 'Reverse proxy（反向代理）：部署在服务端侧、代表后端接受客户端请求的代理；客户端仅见代理地址，代理再转发至真实上游服务。',
    also: ['reverse-proxy', 'net-edge-practice'],
  },
  forward_proxy: {
    term: '正向代理',
    brief: 'Forward proxy（正向代理）：部署在客户端侧、代客户端访问外部目标的代理（公司网关、本地 Clash 等）；与 Reverse proxy（反向代理，入口替后端接客）方向相反。',
    also: ['reverse-proxy', 'net-edge-practice', 'data-env'],
  },

  /* —— 第四章 · XRK —— */
  agent_runtime: {
    term: 'AgentRuntime',
    brief: 'AgentRuntime：XRK-AGT 运行时核心，负责进程启动、扩展点扫描与插件/HTTP/Workflow 等模块挂载。',
    also: ['xrk-runtime', 'xrk-overview'],
  },
  core_pkg: {
    term: 'Core（业务包）',
    brief: 'Core（业务包）：位于 core/<名>-Core/ 的业务能力包，含 plugin、http、www、commonconfig 等；业务代码不写进 src/ 内核。',
    also: ['xrk-core-layout'],
  },
  plugin: {
    term: '插件（Plugin）',
    brief: 'Plugin（插件）：继承 PluginBase 并注册至 AgentRuntime 的可加载能力模块，常响应消息或事件。',
    also: ['xrk-plugin-arch', 'xrk-core-layout'],
  },
  www_static: {
    term: 'www（静态前端）',
    brief: 'www（静态前端）：Core 内静态 Web 资源目录，由框架 mountCoreWwwStatic 挂至如 /vibe-learn/ 的路径。',
    also: ['xrk-http-www'],
  },
  commonconfig: {
    term: 'CommonConfig',
    brief: 'CommonConfig：带 JSON Schema 的统一配置机制，模板、校验与消费代码须三者对齐。',
    also: ['xrk-config'],
  },
  http_response: {
    term: 'HttpResponse',
    brief: 'HttpResponse：本仓库 HTTP 响应封装（#utils/http-utils.js），统一 success/error 形状，前端按约定解包顶层字段。',
    also: ['xrk-http-www'],
  },
  loader: {
    term: 'Loader（加载器）',
    brief: 'Loader（加载器）：框架扫描 core/*/ 约定子目录（plugin、http、www 等）并注册至 AgentRuntime 的加载机制。',
    also: ['xrk-runtime', 'xrk-core-layout', 'xrk-plugin-arch'],
  },
  plugin_arch: {
    term: '插件式架构',
    brief: 'Plugin architecture（插件式架构）：以约定目录、基类与 Loader 扩展能力，业务与内核解耦、无需修改 src/ Runtime。',
    also: ['xrk-plugin-arch', 'xrk-core-layout'],
  },
  subserver: {
    term: '子服务端',
    brief: 'Subserver（子服务端）：主服旁的多语言独立进程族（Python/Go/PHP/Java/.NET/Rust），经 callSubserver 以 HTTP JSON 调用；配置由主服编辑、子服只读。',
    also: ['xrk-subserver', 'xrk-language-stack'],
  },
  subserver_runtimes: {
    term: '子服 runtime 目录',
    brief: 'Subserver runtime 目录：内置 pyserver(:8000)、goserver、phpserver、jserver、netserver、rustserver 六套，登记于 src/utils/subserver-runtimes.js；子服侧不设 Node runtime。',
    also: ['xrk-language-stack', 'xrk-subserver', 'lang-landscape'],
  },
  python_runtime: {
    term: 'pyserver（默认子服）',
    brief: 'pyserver（默认子服）：Python 子服默认监听 8000，AI/媒体/文档生态成熟，为默认 subserver.default；可与 Go/PHP 等 runtime 并存。',
    also: ['xrk-language-stack', 'xrk-subserver', 'lang-landscape'],
  },
  call_subserver: {
    term: 'callSubserver',
    brief: 'callSubserver：AgentRuntime 调用子服的 HTTP JSON 接口；可指定 runtime，未指定则使用 subserver.default 配置。',
    also: ['xrk-subserver', 'xrk-runtime', 'xrk-language-stack'],
  },

  /* —— 第四章 · 工作流 / Agent —— */
  ai_workflow: {
    term: 'AiWorkflow',
    brief: 'AiWorkflow：XRK 对话工作流基类，组装上下文（含 agentWorkspace 注入）、调用 Large Language Model（大语言模型，LLM）并通过 Tool Calling 执行 MCP 工具。',
    also: ['xrk-stream', 'xrk-agent-workspace', 'ai-mcp'],
  },
  stream_wf: {
    term: '工作流名白名单',
    brief: '对话请求中选定的工作流名称列表，用于限制本轮可调用的工具集合（配置与请求字段常写作 streams）。',
    also: ['xrk-stream'],
  },
  agent_workspace: {
    term: 'Agent 工作区（ai-workspace）',
    brief: '办事助手的运行时目录 data/ai-workspace/{id}/：含 AGENTS.md、SOUL、USER、TOOLS、ENV、memory、skills；首次从 agents/ 种子复制。',
    also: ['xrk-agent-workspace', 'xrk-stream', 'agents_md'],
  },
  agent_workspace_cfg: {
    term: 'agentWorkspace',
    brief: 'ai-workflow.yaml 中的工作区注入配置段：开关、字符预算、include* 门控；由 src/utils/agent-workspace.js 注入 system prompt。',
    also: ['xrk-agent-workspace', 'xrk-stream', 'ai_workflow'],
  },
  office_agent: {
    term: '办事助手',
    brief: '群聊 / 控制台对话 Agent：办公、检索、工作区文件与通道工具；技能在 agents/skills/standard/，说明见 docs/agents.md。',
    also: ['xrk-agent-workspace', 'ai-agents-md'],
  },
  ai: {
    term: '人工智能（AI）',
    brief: 'Artificial Intelligence（人工智能，AI）：研究使机器表现出感知、推理、学习等智能行为的学科与技术总称；1956 年达特茅斯会议正式命名。',
    also: ['ai-what'],
  },
  ml: {
    term: '机器学习（ML）',
    brief: 'Machine Learning（机器学习，ML）：从数据中自动学习模式与决策函数，而非完全手写规则；Deep Learning（深度学习）为其重要分支。',
    also: ['ai-what'],
  },
  llm: {
    term: '大语言模型（LLM）',
    brief: 'Large Language Model（大语言模型，LLM）：在海量文本上训练的神经网络，能理解与生成自然语言（如 GPT、Claude 系列）。',
    also: ['ai-what', 'ai-openai-protocol', 'xrk-stream', 'ai-transformer'],
  },
  embedding_model: {
    term: '嵌入模型（Embedding）',
    brief: 'Embedding model（嵌入模型）：将文本映射为稠密向量以度量语义相似度；Retrieval-Augmented Generation（检索增强生成，RAG）索引常用。',
    also: ['ai-model-types', 'ai-rag'],
  },
  multimodal: {
    term: '多模态模型',
    brief: 'Multimodal model（多模态模型）：同时处理文本、图像、音频等多种输入/输出模态的模型架构。',
    also: ['ai-model-types'],
  },
  transformer: {
    term: 'Transformer',
    brief: 'Transformer：2017 年提出的基于 Self-Attention（自注意力）的序列建模架构；当代多数 LLM 的主干结构。',
    also: ['ai-transformer', 'ai-arch-beyond'],
  },
  attention: {
    term: '自注意力（Self-Attention）',
    brief: 'Self-Attention（自注意力）：序列中各位置按可学习权重聚合全局信息的机制；Query/Key/Value 加权混合。见课「注意力」。',
    also: ['ai-attention', 'ai-transformer'],
  },
  multi_head_attention: {
    term: '多头注意力（MHA）',
    brief: 'Multi-Head Attention（多头注意力）：多组 QKV 并行再拼接，使不同头可捕获不同关系模式。',
    also: ['ai-attention', 'ai-transformer'],
  },
  token_context: {
    term: 'Token / 上下文窗口',
    brief: 'Token：模型读写的最小文本片；Context Window（上下文窗口）：单次请求可同时处理的 token 上限。注入与截断策略的根因。',
    also: ['ai-token-context', 'xrk-chat-pipeline', 'long_context'],
  },
  adaptation: {
    term: '自适应（Adaptation）',
    brief: 'Adaptation（自适应）：在不换骨干或少改骨干的前提下适配任务——含 ICL（提示）、微调改参、RAG/工具外挂、Agent 运行时策略。',
    also: ['ai-adaptation', 'ai-finetune', 'xrk-chat-pipeline'],
  },
  icl: {
    term: '上下文内学习（ICL）',
    brief: 'In-Context Learning（上下文内学习）：不更新权重，仅靠提示中的说明与示例临时适配任务格式。',
    also: ['ai-adaptation', 'ai-token-context'],
  },
  chat_pipeline: {
    term: '对话管线 / 上下文组成',
    brief: '本仓 assembleChatLlmMessages 三层（system / 历史 / 易变）+ mergeWorkflows + Workspace 注入；真源 docs/agent-context.md。',
    also: ['xrk-chat-pipeline', 'xrk-stream', 'agent_workspace_cfg'],
  },
  cnn: {
    term: 'CNN（卷积神经网络）',
    brief: 'Convolutional Neural Network（卷积神经网络，CNN）：利用局部卷积核提取空间特征的深度学习架构，经典用于计算机视觉。',
    also: ['ai-arch-beyond'],
  },
  rnn: {
    term: 'RNN / LSTM',
    brief: 'Recurrent Neural Network / Long Short-Term Memory（循环神经网络 / 长短期记忆，RNN/LSTM）：按时间步处理序列的早期架构；长依赖建模与并行训练是主要瓶颈。',
    also: ['ai-arch-beyond'],
  },
  moe: {
    term: 'MoE（混合专家）',
    brief: 'Mixture of Experts（混合专家，MoE）：模型含多个专家子网络，前向时仅激活部分专家，以较大参数量换取可控算力。',
    also: ['ai-arch-beyond'],
  },
  finetune: {
    term: '微调（Fine-tuning）',
    brief: 'Fine-tuning（微调）：在预训练基座模型上继续用领域或任务数据训练，以适配对话、垂直领域或工具行为。',
    also: ['ai-finetune'],
  },
  sft: {
    term: 'SFT（监督微调）',
    brief: 'Supervised Fine-Tuning（监督微调，SFT）：用输入—输出示范数据教会模型任务格式与行为，常为微调第一步。',
    also: ['ai-finetune'],
  },
  lora: {
    term: 'LoRA',
    brief: 'Low-Rank Adaptation（低秩适配，LoRA）：参数高效微调方法，仅训练低秩增量矩阵以降低显存与训练成本。',
    also: ['ai-finetune'],
  },
  rlhf: {
    term: 'RLHF / 对齐',
    brief: 'Reinforcement Learning from Human Feedback（基于人类反馈的强化学习，RLHF）/ alignment（对齐）：按人类偏好优化模型输出，含 DPO 等变体，以减少有害或不实回答。',
    also: ['ai-finetune'],
  },
  rag: {
    term: 'RAG',
    brief: 'Retrieval-Augmented Generation（检索增强生成，RAG）：先检索相关文档片段再生成回答，使模型基于外部证据作答。',
    also: ['ai-rag', 'ai-rag-shift'],
  },
  agentic_rag: {
    term: 'Agentic RAG',
    brief: 'Agentic RAG：由 Agent 多轮决策检索策略与是否再检索，将检索作为可调用 Tool 而非固定流水线步骤。',
    also: ['ai-agentic-rag', 'ai-rag'],
  },
  long_context: {
    term: '长上下文',
    brief: 'Long context（长上下文）：模型单次可处理的输入 token 上限显著增大；小规模稳定知识有时可直接写入提示而无需向量库。',
    also: ['ai-rag-shift'],
  },
  dartmouth: {
    term: '达特茅斯会议（1956）',
    brief: 'Dartmouth Conference 1956（达特茅斯会议）：McCarthy 等提出 Artificial Intelligence 术语并召开暑期研讨，被视为 AI 学科正式起点。',
    also: ['ai-what'],
  },
  agent_concept: {
    term: 'Agent（智能体）',
    brief: 'Agent（智能体）：具备目标、可调用 Tool 并根据环境反馈持续规划的 AI 程序形态，超越单轮问答。',
    also: ['ai-what', 'ai-tool-calling', 'ai-agent-birth', 'ai-subagent'],
  },
  agent_loop: {
    term: '智能体循环（Agent Loop）',
    brief: 'Agent loop（智能体循环）：模型选行动 → 运行时执行 → 观察回写 → 再决定；含 ReAct、Plan-and-Execute、Reflection 等模式。本仓对应工厂多轮 tool_calls 与 maxToolRounds。',
    also: ['ai-agent-birth', 'tool_calling'],
  },
  react_pattern: {
    term: 'ReAct（推理与行动交替）',
    brief: 'ReAct（Yao 等）：Reason + Act 交替——想一步、做一步、看一步；现代实现多用 tool calling，而非解析文本假函数。',
    also: ['ai-agent-birth', 'tool_calling'],
  },
  plan_and_execute: {
    term: 'Plan-and-Execute',
    brief: 'Plan-and-Execute / Plan-and-Solve：先产出多步计划再逐步执行（可再规划）；适合结构清晰的长任务，相对纯 ReAct 更省探索步。',
    also: ['ai-agent-birth', 'agent_graph'],
  },
  reflection_pattern: {
    term: 'Reflection / Reflexion',
    brief: 'Reflection（含 Reflexion 等）：执行后显式自评或反思再改下一步；用于降错、纠偏，代价是额外轮次与令牌。',
    also: ['ai-agent-birth'],
  },
  agent_graph: {
    term: '智能体图编排（Agent Graph）',
    brief: 'Agent graph（智能体图编排）：用节点与边描述步骤/角色依赖与条件转移；常含有向无环图（DAG）。是控制流图，不是知识图谱。本仓主路径是固定消息三层 + 工具环，非通用 LangGraph 编辑器。',
    also: ['ai-agent-graph', 'dag', 'ai-agent-birth'],
  },
  dag: {
    term: '有向无环图（DAG）',
    brief: 'Directed Acyclic Graph（有向无环图，DAG）：边有方向且无环；编排里表达步骤依赖与可并行关系。',
    also: ['ai-agent-graph', 'agent_graph'],
  },
  pi_agent: {
    term: 'Pi（智能体脚手架）',
    brief: 'Pi / pi-agent-core（pi.dev）：最小编码智能体脚手架；旁支案例非主干先修。默认不内置 MCP/子代理。对照本仓：同为工具环，本仓以 MCP + mergeWorkflows 为一等公民。',
    also: ['ai-pi-agent', 'agent_loop', 'agent_harness'],
  },
  agent_harness: {
    term: '智能体脚手架（Agent Harness）',
    brief: 'Agent harness（智能体脚手架）：承载模型调用、工具执行、会话状态与扩展点的运行底座；产品功能可内置也可外挂。',
    also: ['ai-pi-agent', 'ai-agent-birth'],
  },
  openai_compat: {
    term: 'OpenAI 兼容协议',
    brief: 'OpenAI-compatible API（OpenAI 兼容协议）：以 /v1/chat/completions 与 messages 数组为代表的事实标准 API 形状；更换 base_url 常可切换模型提供商。',
    also: ['ai-openai-protocol', 'xrk-stream'],
  },
  chat_completions: {
    term: 'Chat Completions',
    brief: 'Chat Completions：OpenAI 风格的多轮对话端点，输入 messages 数组，输出 assistant 消息或 tool_calls；生态兼容面最广。',
    also: ['ai-openai-protocol'],
  },
  messages_api: {
    term: 'Messages API 等原生方言',
    brief: 'Messages API 等原生方言：各厂商自有推理接口（如 Anthropic Messages、OpenAI Responses），能力更完整但兼容面较 OpenAI 形状窄。',
    also: ['ai-openai-protocol'],
  },
  a2a: {
    term: 'A2A / ACP',
    brief: 'Agent-to-Agent protocol（Agent 间协作协议，A2A/ACP）：Agent 之间发现、委派与协作的任务协议层；与 MCP（接 Tool）职责不同。',
    also: ['ai-openai-protocol', 'ai-mcp'],
  },
  function_calling: {
    term: 'Function Calling',
    brief: 'Function Calling（函数调用）：2023 年起 LLM 输出结构化函数名与 JSON 参数、由应用执行后再回灌结果的能力形态。',
    also: ['ai-tool-calling'],
  },
  tool_calling: {
    term: 'Tool Calling',
    brief: 'Tool Calling（工具调用）：Function Calling 的泛化术语，使用 tools / tool_calls 字段；模型生成调用意图，宿主应用负责执行与回传结果。本仓另有工具轮用尽后的 finalize（无工具再请求一轮写正文）。',
    also: ['ai-tool-calling', 'ai-mcp', 'xrk-stream', 'xrk-factory-llm'],
  },
  tool_pair: {
    term: 'toolPair（工具对投影）',
    brief: 'toolPair：出站准备时把过旧 role=tool 结果投影压缩以省上下文窗口；不改磁盘上的持久聊天笔录。配置 ai-workflow.context.toolPair；实现 tool-pair-compact.js。',
    also: ['ai-token-context', 'xrk-chat-pipeline'],
  },
  context_compaction: {
    term: '上下文 compaction',
    brief: 'Context compaction（上下文压缩）：超预算时用辅/主模型摘要历史块，可选 backup 与 session sidecar；配置 ai-workflow.context.compaction 与 llm.aux。出站链在 toolPair 之后、contextWindow 裁剪之前。',
    also: ['ai-token-context', 'xrk-chat-pipeline', 'xrk-factory-llm'],
  },
  runtime_policies: {
    term: 'policies[]（运行时策略）',
    brief: 'policies[]：ai-workflow 运行时策略表，动作含 provider.use / tool.call / mcp.connect；ask 模式工具仍注入列表，真正执行时经 MCPServer.handleToolCall 审批或拒绝。',
    also: ['ai-prompt-security', 'xrk-mcp-ops', 'xrk-chat-pipeline'],
  },
  tool_scan: {
    term: 'security.toolScan',
    brief: 'security.toolScan：工具参数威胁模式扫描（如危险 command），默认开启；与 security.approval（#批准，默认关）一并在 handleToolCall 门禁执行。',
    also: ['ai-prompt-security', 'xrk-mcp-ops'],
  },
  agent_recipe: {
    term: 'Recipe / 斜杠配方',
    brief: 'Recipe：agents/recipes/*.yaml 种子；斜杠 /recipes 列表、/recipe <id> 注入 instructions+prompt。须已触发办事助手；可选 recipes.scheduleEnabled cron。',
    also: ['xrk-agent-workspace', 'xrk-chat-pipeline'],
  },
  repo_map: {
    term: 'tools.repo_map',
    brief: 'tools.repo_map：轻量仓库代码地图（可带 query），陌生工作区改码前优先于盲目 list_files；同批还有 apply_edit / verify / update_todos。见技能 agent-tools。',
    also: ['ai-mcp', 'xrk-mcp-ops', 'xrk-agent-workspace'],
  },
  json_schema: {
    term: 'JSON Schema',
    brief: 'JSON Schema：用 JSON 描述 JSON 文档结构与约束的规范；Tool 参数定义常用以约束模型填参。',
    also: ['ai-tool-calling'],
  },
  mcp: {
    term: 'MCP（Model Context Protocol）',
    brief: 'Model Context Protocol（模型上下文协议，MCP）：Anthropic 2024 开源标准，定义 AI 宿主如何发现、授权并调用外部 Tool 与 Resource 服务器。',
    also: ['ai-mcp', 'xrk-stream'],
  },
  json_rpc: {
    term: 'JSON-RPC',
    brief: 'JSON-RPC：基于 JSON 的 Remote Procedure Call（远程过程调用）协议；MCP 常用其在客户端与 Server 间传递 method 与 params。',
    also: ['ai-mcp'],
  },
  lsp: {
    term: 'LSP（语言服务器协议）',
    brief: 'Language Server Protocol（语言服务器协议，LSP）：编辑器与语言服务之间的标准通信协议；MCP 的「一种协议、多种客户端」思路受其启发。',
    also: ['ai-mcp'],
  },
  agent_skills: {
    term: 'Agent Skills',
    brief: '按需加载的流程与规范包（入口通常是 SKILL.md，可含脚本与参考），仅在相关任务时展开以节省上下文窗口。',
    also: ['ai-skills', 'adev-project-memory', 'chapter-adev'],
    aliases: ['Skill', 'Skills', '技能'],
  },
  agent_rules: {
    term: 'Rules（规则）',
    brief: 'Rules（规则）：注入 Agent 的常驻或按路径匹配的硬约束（编码风格、禁区、安全红线）；宜短精，不宜替代完整手册。',
    also: ['ai-rules'],
  },
  subagent: {
    term: '子代理（Subagent）',
    brief: 'Subagent（子代理）：主 Agent 委派的、上下文相对隔离的专项工作者，用于审查、探索或并行调查。',
    also: ['ai-subagent'],
  },
  agents_md: {
    term: 'AGENTS.md',
    brief: '面向 Coding Agent / 协作者的仓内交底说明书：约定放码位置、禁区、常用命令与验收；应版本化且不写密钥。本仓分根目录（开发）、docs 办事说明、工作区注入与产品 Core（若有）。',
    also: [
      'ai-agents-md',
      'adev-project-memory',
      'adev-vibe-coding',
      'chapter-adev',
      'xrk-agent-workspace',
    ],
  },

  /* —— 番外 · Clash —— */
  proxy_engine: {
    term: '代理引擎',
    brief: 'Proxy engine（代理引擎）：运行在本机、按规则将流量直连或转发至远端节点的选路程序；Clash 属于此类。',
    also: ['clash'],
  },
  proxy_node: {
    term: '节点（代理节点）',
    brief: 'Proxy node（代理节点）：远端中继服务器，客户端流量经其再访问目标站点。',
    also: ['clash', 'clash-setup'],
  },
  subscription: {
    term: '订阅（Subscription）',
    brief: 'Subscription（订阅）：可定期拉取的节点列表与规则配置 URL，客户端定时更新可用节点与策略。',
    also: ['clash-setup'],
  },
  listen: {
    term: '监听（Listen）',
    brief: 'Listen（监听）：进程在指定 IP 与 Port（端口）上绑定并等待入站连接；代理引擎须先 listen 其他程序才能将其设为上游。',
    also: ['clash-port', 'tcp-udp'],
  },
  http_proxy_env: {
    term: 'HTTP(S)_PROXY 环境变量',
    brief: 'HTTP_PROXY / HTTPS_PROXY：跨工具约定的环境变量，值为代理服务 URL（如 http://127.0.0.1:7890）；支持该约定的进程在发 HTTP/HTTPS 请求前先连接该代理。不等于操作系统「系统代理」开关，也不等于代理引擎本身。',
    also: ['clash-port', 'forward_proxy', 'installers-path', 'xrk-deploy-env', 'env_var'],
  },
  all_proxy: {
    term: 'ALL_PROXY',
    brief: 'ALL_PROXY：部分工具读取的兜底代理环境变量，用于非纯 HTTP 场景或统一指定代理 URL；常与 HTTP_PROXY / HTTPS_PROXY 设为同一本机入口，不能指望单靠它覆盖一切客户端。',
    also: ['clash-port', 'http_proxy_env'],
  },
  no_proxy: {
    term: 'NO_PROXY',
    brief: 'NO_PROXY：列出不经代理、应直连的主机名、域名或地址（如 localhost、127.0.0.1、内网段）；与强制代理配套，漏配时本机服务请求也可能被错误送入代理。',
    also: ['clash-port', 'http_proxy_env', 'routing-nat', 'xrk-deploy-env'],
  },
  system_proxy: {
    term: '系统代理',
    brief: 'System proxy（系统代理）：操作系统登记的默认 HTTP/HTTPS 代理地址，浏览器等 GUI 常自动读取；终端、Git、多数 CLI 与 Coding Agent 往往不读取，需单独配置 HTTP_PROXY 等环境变量或各自代理项。',
    also: ['clash-port', 'clash-setup', 'forward_proxy', 'http_proxy_env'],
  },
  tun_mode: {
    term: 'TUN 模式',
    brief: 'TUN mode（TUN 模式）：创建虚拟网卡将 IP 层流量导入代理引擎的全局捕获模式，权限要求较高，适合不读系统代理的应用。',
    also: ['clash-port', 'clash-setup', 'proxy_engine'],
  },
  mixed_port: {
    term: 'mixed-port',
    brief: 'mixed-port：Clash 等客户端上同时接受 HTTP 与 SOCKS 请求的合一监听端口，具体以客户端界面为准。',
    also: ['clash-port', 'listen'],
  },
  socks5: {
    term: 'SOCKS5',
    brief: 'SOCKS5：第五版 SOCKS 代理协议，可在 TCP 层转发任意目标地址与端口；常与 HTTP 代理并列配置。',
    also: ['clash-port', 'forward_proxy', 'tcp-udp'],
  },
  policy_group: {
    term: '策略组',
    brief: 'Policy group（策略组）：规则匹配后进入的候选节点集合，可自动测速或手动选择下一跳。',
    also: ['clash', 'clash-setup', 'proxy_node'],
  },
  cidr: {
    term: 'CIDR / 前缀长度',
    brief: 'Classless Inter-Domain Routing（无类域间路由，CIDR）：用「地址/前缀长度」表示网段（如 192.168.1.0/24 表示前 24 位为网络号）。路由表、安全组、VPN 与 VPC 均常用此记法。',
    also: ['ip-addressing', 'subnet', 'routing-nat'],
  },
  dmz: {
    term: 'DMZ',
    brief: 'Demilitarized Zone（非军事区，DMZ）：位于内外网之间的缓冲网段，对外服务部署于 DMZ，核心数据保留在内网。',
    also: ['network-basics', 'routing-nat'],
  },
  context_switch: {
    term: '上下文切换',
    brief: 'Context switch（上下文切换）：CPU 保存当前任务寄存器与栈并恢复另一任务状态的开销；线程过多可能导致有效吞吐下降。',
    also: ['os-essence', 'chip-units'],
  },
  page_fault: {
    term: '缺页（Page fault）',
    brief: 'Page fault（缺页异常）：访问的虚拟页不在物理内存时由内核触发，需从磁盘装入页框；频繁缺页会显著拖慢性能。',
    also: ['os-essence', 'chip-units', 'storage_hierarchy'],
  },
  epoll: {
    term: 'epoll（I/O 多路复用）',
    brief: 'epoll（I/O multiplexing，I/O 多路复用）：Linux 上高效监控多个文件 descriptor 读写事件的机制，高并发网络服务常用；与 Node.js Event loop 同属非阻塞 I/O 家族。',
    also: ['hw-sw-link', 'os-essence', 'tcp-udp'],
  },
  quic: {
    term: 'QUIC / HTTP/3',
    brief: 'QUIC / HTTP/3：在 UDP 上实现可靠传输、加密与多路复用的现代协议栈；HTTP/3 将 HTTP 语义映射于 QUIC 之上。',
    also: ['tcp-udp', 'http-web', 'http2_http3'],
  },
  security_group_proto: {
    term: '安全组协议',
    brief: 'Security group protocol（安全组协议）：云 Firewall 规则须同时指定 Transport 协议（TCP/UDP）与 Port；协议与端口不匹配等于未放行（如 Minecraft 基岩版需 UDP）。',
    also: ['tcp-udp', 'routing-nat', 'firewall'],
  },
  locality: {
    term: '局部性原理',
    brief: 'Principle of locality（局部性原理）：程序倾向于再次访问最近使用或邻近地址的数据；是 Cache（缓存）与预取有效的理论基础。',
    also: ['chip-units', 'storage_hierarchy'],
  },
  mac: {
    term: 'MAC 地址',
    brief: 'MAC address（媒体访问控制地址）：网卡链路层硬件地址，用于同一 LAN 内帧转发；与 IP 地址分属不同协议层。',
    also: ['ip-addressing', 'protocol-stack'],
  },
  arp: {
    term: 'ARP',
    brief: 'Address Resolution Protocol（地址解析协议，ARP）：在局域网内将 IP 地址解析为 MAC 地址，供以太网帧正确投递。',
    also: ['ip-addressing'],
  },
  loopback: {
    term: '回环地址 127.0.0.1',
    brief: 'Loopback address 127.0.0.1（回环地址）：指向本机协议栈的特殊 IP，流量不经过物理网卡；本地服务调试常用 localhost / 127.0.0.1。',
    also: ['ip-addressing', 'xrk-first-run'],
  },
  private_ip: {
    term: '私有 IP',
    brief: 'Private IP address（私有 IP 地址）：RFC 1918 等保留的内网地址段（如 10.0.0.0/8、172.16.0.0/12、192.168.0.0/16），公网不可直达；出网通常经 NAT。',
    also: ['ip-addressing', 'routing-nat', 'nat'],
  },
  public_ip: {
    term: '公网 IP',
    brief: 'Public IP address（公网 IP）：可在互联网上全局路由的地址，由运营商或云厂商分配；与私有 IP 相对。家庭宽带常只有一个公网 IP，内网设备靠 NAT 共享。',
    also: ['ip-addressing', 'routing-nat', 'nat'],
  },
  ipv4: {
    term: 'IPv4',
    brief: 'Internet Protocol version 4（网际协议第 4 版）：32 位地址，常见点分十进制写法（a.b.c.d）；地址耗尽推动了 NAT 与 IPv6。',
    also: ['ip-addressing'],
  },
  ipv6: {
    term: 'IPv6',
    brief: 'Internet Protocol version 6（网际协议第 6 版）：128 位地址空间，缓解 IPv4 耗尽；写法如 2001:db8::1。部署进度因地区与运营商而异。',
    also: ['ip-addressing'],
  },
  hostname: {
    term: '主机名（Hostname）',
    brief: 'Hostname（主机名）：单机在本地或内网中的名字（如 laptop、api-1），不一定能在公网 DNS 解析；与 FQDN、Domain name 层次不同。',
    also: ['dns-https', 'ip-addressing'],
  },
  fqdn: {
    term: 'FQDN（完整域名）',
    brief: 'Fully Qualified Domain Name（完全限定域名）：带完整后缀的域名，如 www.example.com.；相对仅主机名，FQDN 可在 DNS 树中唯一定位。',
    also: ['dns-https', 'domain'],
  },
  url: {
    term: 'URL',
    brief: 'Uniform Resource Locator（统一资源定位符）：定位资源的字符串，典型含 scheme（https）、主机（域名或 IP）、端口、路径与查询串。例：https://api.example.com:443/v1/items?id=1',
    also: ['http-web', 'dns-https'],
  },
  uri: {
    term: 'URI',
    brief: 'Uniform Resource Identifier（统一资源标识符）：标识资源的更广概念；URL 是可定位的 URI 子集。日常口语常混用，工程文档宜分清「标识」与「定位」。',
    also: ['http-web'],
  },
  localhost: {
    term: 'localhost',
    brief: 'localhost：约定解析到本机回环地址（通常 127.0.0.1 / ::1）的主机名；本地开发访问本机服务时使用，流量不经物理网卡出网。',
    also: ['ip-addressing', 'xrk-first-run'],
  },
  dns_a: {
    term: 'DNS A / AAAA 记录',
    brief: 'DNS resource record A / AAAA：A 将域名映射到 IPv4；AAAA 映射到 IPv6。浏览器访问网站前通常先查这类记录得到 IP。',
    also: ['dns-https'],
  },
  dns_cname: {
    term: 'DNS CNAME',
    brief: 'CNAME（规范名字记录）：将一个域名别名为另一域名；常用于 www 指向主域或接入 CDN。最终仍须有可解析的 A/AAAA 终点。',
    also: ['dns-https', 'net-edge-practice'],
  },
  dns_resolver: {
    term: 'DNS 解析器',
    brief: 'DNS resolver（解析器）：代表客户端发起递归查询的组件（系统 stub、运营商、或 1.1.1.1/8.8.8.8 等）。排障「打不开网站」常先分清是解析失败还是 TCP/TLS 失败。',
    also: ['dns-https', 'workbench-troubleshoot'],
  },
  hosts_file: {
    term: 'hosts 文件',
    brief: 'hosts file：操作系统本地的「域名→IP」静态表，优先于或部分覆盖 DNS 查询；开发与应急切流常用，误改会导致「只有你电脑异常」。',
    also: ['dns-https', 'ip-addressing'],
  },
  packet: {
    term: '数据包 / 报文',
    brief: 'Packet（数据包）：网络中传输的协议数据单元；IP 层常称 packet，TCP 段、以太网帧是不同层的封装。排障时「丢包」指该层 PDU 未达。',
    also: ['network-basics', 'protocol-stack'],
  },
  tcp_handshake: {
    term: 'TCP 三次握手',
    brief: 'TCP three-way handshake（三次握手）：SYN → SYN-ACK → ACK，用于双方确认序号并建立连接状态，之后才能可靠传字节流。',
    also: ['tcp-udp'],
  },
  icmp_ping: {
    term: 'ICMP / ping',
    brief: 'Internet Control Message Protocol（网际控制报文协议）与 ping：用 Echo 探测主机可达性与 RTT；ping 通不代表 HTTPS 业务一定正常（端口/TLS/应用仍可能失败）。',
    also: ['network-basics', 'tcp-udp', 'workbench-troubleshoot'],
  },
  cors: {
    term: 'CORS',
    brief: 'Cross-Origin Resource Sharing（跨源资源共享）：浏览器同源策略下，服务端通过响应头声明是否允许其他 Origin 读写响应；curl 常无此限制，故「接口 curl 通、前端报错」多查 CORS。',
    also: ['http-web', 'api-frontend'],
  },
  origin: {
    term: 'Origin（源）',
    brief: 'Origin（源）：scheme + 主机 + 端口 的三元组（如 https://a.com:443）。同源策略以此判断是否跨站；路径不同仍可同源。',
    also: ['http-web', 'api-frontend'],
  },
  cookie: {
    term: 'Cookie',
    brief: 'HTTP Cookie：服务器可通过 Set-Cookie 让浏览器在后续请求自动携带的小段状态；常用于会话。须配合 Secure、HttpOnly、SameSite 等属性降低泄漏与 CSRF 风险。',
    also: ['http-web', 'craft-security'],
  },
  websocket: {
    term: 'WebSocket',
    brief: 'WebSocket：在 TCP 上升级出的全双工长连接，适合服务端主动推送；与普通 HTTP 请求—响应模型不同，仍常经反代与鉴权。',
    also: ['http-web', 'xrk-stream'],
  },
  sse: {
    term: 'SSE（Server-Sent Events）',
    brief: 'Server-Sent Events：服务器经 HTTP 单向推送文本事件流的机制；聊天补全流式输出常见选型之一，实现比 WebSocket 更轻。',
    also: ['http-web', 'xrk-stream'],
  },
  host_header: {
    term: 'Host 头 / 虚拟主机',
    brief: 'Host header：HTTP 请求声明目标主机名，使同一 IP 上可托管多站点；TLS 侧对应 SNI。反代按 Host 分流是常规做法。',
    also: ['http-web', 'reverse-proxy'],
  },
  certificate: {
    term: 'TLS 证书',
    brief: 'TLS certificate（证书）：由 Certificate Authority（证书颁发机构，CA）签名的公钥与域名绑定文件，用于向客户端证明服务器身份；过期或域名不匹配会导致浏览器报不安全。',
    also: ['dns-https', 'host-tls'],
  },
  well_known_port: {
    term: '知名端口',
    brief: 'Well-known ports：0–1023 段中约定服务端口，如 80/HTTP、443/HTTPS、22/SSH、53/DNS；实际部署仍以监听配置为准，且可用非标准端口。',
    also: ['tcp-udp', 'http-web'],
  },
  ephemeral_port: {
    term: '临时端口',
    brief: 'Ephemeral / dynamic port（临时端口）：客户端发起连接时由操作系统分配的短生命周期源端口；TIME_WAIT 过多或端口耗尽会导致偶发连不上。',
    also: ['tcp-udp'],
  },
  query_string: {
    term: '查询串（Query string）',
    brief: 'Query string：URL 中 `?` 后的键值参数（如 ?page=2&q=x），常用于 GET 过滤；敏感数据勿放查询串（易进日志与 Referer）。',
    also: ['http-web'],
  },
  http_header: {
    term: 'HTTP 头（Header）',
    brief: 'HTTP header（首部）：请求或响应中的元数据字段（Content-Type、Authorization、Cookie 等），与 Body 正文分离；联调时 `-i`/`-v` 必看。',
    also: ['http-web', 'http-hands-on'],
  },
  http_body: {
    term: 'HTTP 正文（Body）',
    brief: 'HTTP message body：请求或响应携带的载荷，如 JSON、表单或文件；是否存在取决于方法与状态码约定。',
    also: ['http-web'],
  },
  status_code: {
    term: 'HTTP 状态码',
    brief: 'HTTP status code（HTTP 状态码）：响应中的三位数字状态（2xx 成功、4xx 客户端错误、5xx 服务端错误，如 404、502）。',
    also: ['http-web', 'reverse-proxy'],
  },
  http_redirect: {
    term: 'HTTP 重定向',
    brief: 'HTTP redirect：用 3xx（常见 301/302/307/308）与 Location 头把客户端导向另一 URL；永久与临时、是否改方法要按状态码语义选用，勿乱用。',
    also: ['http-web', 'reverse-proxy'],
  },
  http_method: {
    term: 'HTTP 方法',
    brief: 'HTTP method（请求方法）：GET/POST/PUT/PATCH/DELETE 等表达意图；GET 宜安全幂等，写操作常用 POST/PUT，并注意幂等与缓存副作用。',
    also: ['http-web', 'api-frontend'],
  },
  content_type: {
    term: 'Content-Type',
    brief: 'Content-Type：声明 Body 媒体类型（如 application/json、multipart/form-data）；服务端解析与浏览器处理依赖它，错配常导致 415 或静默解析失败。',
    also: ['http-web', 'data-json'],
  },
  authorization_hdr: {
    term: 'Authorization 头',
    brief: 'Authorization header：携带凭证的请求头，常见 `Bearer <token>`；勿把长寿命密钥塞进 URL 或前端明文仓库。',
    also: ['http-web', 'craft-security', 'api-frontend'],
  },
  keep_alive: {
    term: 'HTTP Keep-Alive',
    brief: 'HTTP persistent connection / Keep-Alive：同一 TCP（或 TLS）连接上复用多次请求，降低握手与 RTT 开销；反向代理与客户端默认多已开启。',
    also: ['http-web', 'tcp-udp'],
  },
  dns_ttl: {
    term: 'DNS TTL',
    brief: 'DNS Time To Live（存活时间）：解析结果可被缓存的秒数；改 A/AAAA 后全球生效受 TTL 与各级缓存影响，排障要分清「记录已改」与「缓存未过期」。',
    also: ['dns-https'],
  },
  csrf: {
    term: 'CSRF',
    brief: 'Cross-Site Request Forgery（跨站请求伪造）：诱导已登录用户的浏览器向目标站发出带 Cookie 的非预期请求；SameSite Cookie、CSRF Token、避免副作用 GET 是常见防法。',
    also: ['http-web', 'craft-security'],
  },
  xss: {
    term: 'XSS',
    brief: 'Cross-Site Scripting（跨站脚本）：把不可信输入当 HTML/JS 执行，窃 Cookie 或篡改页面；输出编码、CSP、HttpOnly Cookie 是基础防线。',
    also: ['http-web', 'craft-security', 'api-frontend'],
  },
  cache_control: {
    term: 'Cache-Control',
    brief: 'Cache-Control：控制中间缓存与浏览器是否/如何缓存响应（max-age、no-store、private 等）；静态资源与 API 策略应分开设计。',
    also: ['http-web', 'reverse-proxy'],
  },
  etag: {
    term: 'ETag',
    brief: 'Entity Tag（实体标签）：资源版本指纹；配合 If-None-Match 可实现条件请求与 304，减少重复传输。',
    also: ['http-web'],
  },
  load_balance: {
    term: '负载均衡',
    brief: 'Load balancing（负载均衡）：将入站请求分发到多台后端实例以提升容量与可用性，常由 Reverse proxy（反向代理）或专用 LB 实现。',
    also: ['reverse-proxy'],
  },

  /* —— 第二章 · 语言 / 框架分轨 —— */
  html_css: {
    term: 'HTML / CSS',
    brief: 'HTML / CSS：HyperText Markup Language（超文本标记语言）描述文档结构，Cascading Style Sheets（层叠样式表）描述呈现样式；二者为 Web 标记与样式语言，不是 Vue/React 类 Framework。',
    also: ['lang-html-css', 'fw-vue', 'fw-react'],
  },
  shell_lang: {
    term: 'Shell（Bash / Zsh）',
    brief: 'Shell scripting（Shell 脚本语言，Bash/Zsh）：命令行环境下的脚本语言，支持变量、管道、条件与循环；是语言轨，不是前端 Framework。',
    also: ['lang-shell', 'terminal-worlds', 'linux-cli'],
  },
  powershell_lang: {
    term: 'PowerShell',
    brief: 'PowerShell scripting：基于 .NET 对象的 Windows 脚本语言，管道传递结构化对象；与 Bash 同属语言轨，语义模型不同。',
    also: ['lang-powershell', 'terminal-worlds'],
  },
  vue_fw: {
    term: 'Vue',
    brief: 'Vue：建立在 JavaScript 上的渐进式 Frontend Framework（前端框架）；宿主语言仍为 JS/TS，Vue 本身不是编程语言。',
    also: ['fw-vue', 'lang-library-framework', 'lang-javascript'],
  },
  react_fw: {
    term: 'React',
    brief: 'React：建立在 JavaScript 上的 UI 库（生态常作 Framework 使用）；宿主为 JS/TS，勿称「React 语言」。',
    also: ['fw-react', 'lang-library-framework', 'lang-javascript'],
  },
  angular_fw: {
    term: 'Angular',
    brief: 'Angular：TypeScript 优先的全家桶 Frontend Framework，内置路由、表单与 Dependency Injection（依赖注入）；不是独立编程语言。',
    also: ['fw-angular', 'lang-typescript', 'lang-library-framework'],
  },
  nextjs_fw: {
    term: 'Next.js',
    brief: 'Next.js：基于 React 的服务端渲染（SSR）与全栈元框架；语言仍为 JS/TS，UI 层为 React。',
    also: ['fw-nextjs', 'fw-react', 'lang-javascript'],
  },
  spring_fw: {
    term: 'Spring / Spring Boot',
    brief: 'Spring / Spring Boot：Java 应用 Framework，提供 Inversion of Control（控制反转）、Aspect-Oriented Programming（面向切面编程，AOP）与自动配置；不是「Spring 语言」。',
    also: ['fw-spring', 'lang-java', 'lang-library-framework'],
  },
  express_nest_fw: {
    term: 'Express / NestJS',
    brief: 'Express / NestJS：Node.js Web Framework；Express 偏轻量中间件栈，NestJS 偏模块化 DI 与装饰器；宿主为 JS/TS。',
    also: ['fw-express-nest', 'lang-javascript', 'runtime-nodejs'],
  },
  django_fastapi_fw: {
    term: 'Django / FastAPI',
    brief: 'Django / FastAPI：Python Web Framework；Django 偏全栈 ORM 与模板，FastAPI 偏类型化 API；不是 Python 语言本身。',
    also: ['fw-django-fastapi', 'lang-python'],
  },
  gin_fw: {
    term: 'Gin',
    brief: 'Gin：Go 语言常见 HTTP Web Framework，基于标准 net/http 扩展；宿主语言为 Go。',
    also: ['fw-gin', 'lang-go'],
  },
  aspnet_fw: {
    term: 'ASP.NET Core',
    brief: 'ASP.NET Core：.NET 平台 Web Framework，基于中间件管道与 DI；语言为 C#，不是「.NET 语言」。',
    also: ['fw-aspnet', 'lang-csharp'],
  },
  laravel_fw: {
    term: 'Laravel',
    brief: 'Laravel：PHP 常见 Web Framework，含 Eloquent ORM 与 Blade 模板；宿主语言为 PHP。',
    also: ['fw-laravel', 'lang-php'],
  },
  tasker: {
    term: 'Tasker（通道）',
    brief: 'Tasker（通道）：消息通道适配器，将 OneBot、stdin、QQBot 等协议接入 AgentRuntime；通道层 ≠ 业务 Plugin。',
    also: ['xrk-tasker-channels', 'xrk-biz-map', 'agent_runtime'],
  },
  msg_segment: {
    term: 'msgSegment',
    brief: 'msgSegment：消息段构造器（图文等结构化片段）；业务代码使用裸名 msgSegment.image(url)，勿自行 import 全局单例。',
    also: ['xrk-tasker-channels', 'xrk-runtime'],
  },
  llm_factory: {
    term: 'LLM Factory',
    brief: 'LLM Factory：src/factory/llm 中按 CommonConfig 创建多协议 LLM 客户端的工厂；ASR/TTS 有同族工厂。',
    also: ['xrk-factory-llm', 'xrk-stream', 'llm'],
  },
  redis_cache: {
    term: 'Redis',
    brief: 'Redis：内存数据结构存储服务器，常用作 Cache（缓存）与中间件；独立进程，本仓 AgentRuntime 运行依赖；不是语言也不是 Framework。',
    also: ['xrk-database', 'xrk-first-run', 'xrk-deploy-env', 'db-redis', 'db-middleware'],
  },
  middleware_infra: {
    term: '中间件（基础设施）',
    brief: 'Middleware（基础设施中间件）：独立于业务进程、经网络提供共用能力的服务，如 Database、Cache、Message Queue、API Gateway；勿与 Express 请求管道 middleware 混称。',
    also: ['lang-library-framework', 'db-middleware', 'db-redis'],
  },
  dbms: {
    term: 'DBMS',
    brief: 'Database Management System（数据库管理系统，DBMS）：管理数据存储、查询语言、事务、并发与持久化的软件；MySQL、PostgreSQL、MongoDB、Redis、SQLite 均为 DBMS 产品。',
    also: ['db-essence', 'db-as-service', 'db-landscape'],
  },
  sqlite_db: {
    term: 'SQLite',
    brief: 'SQLite：嵌入式 Relational DBMS（关系型数据库管理系统），通常链入应用进程、数据落在单文件，默认不监听网络端口；本仓 Runtime 使用 node:sqlite。',
    also: ['db-sqlite', 'xrk-database'],
  },
  mongodb_db: {
    term: 'MongoDB',
    brief: 'MongoDB：Document-oriented DBMS（文档型数据库管理系统），独立服务进程，默认端口常为 27017；本仓经 mongodb-Core 可选接入。',
    also: ['db-mongodb', 'xrk-database'],
  },
  postgresql_db: {
    term: 'PostgreSQL',
    brief: 'PostgreSQL：开源 Relational DBMS（关系型数据库管理系统），以 SQL 与事务为核心，并支持 JSON、扩展等；本仓经 postgres-Core 可选接入，非 Runtime fail-fast 依赖。',
    also: ['db-postgresql', 'xrk-database', 'dbms'],
  },
  mysql_db: {
    term: 'MySQL',
    brief: 'MySQL：开源 Relational DBMS（关系型数据库管理系统），Web 存量与工具链生态庞大；与 PostgreSQL 同属 RDBMS。本仓非 Runtime 必需。',
    also: ['db-mysql', 'db-postgresql', 'dbms'],
  },
  acid: {
    term: 'ACID',
    brief: 'ACID：Atomicity / Consistency / Isolation / Durability（原子性、一致性、隔离性、持久性），描述事务在并发与故障下应满足的四条性质；关系库与账务类业务常考。',
    also: ['db-postgresql', 'db-mysql', 'db-essence'],
  },
  bson: {
    term: 'BSON',
    brief: 'BSON（Binary JSON）：MongoDB 使用的二进制文档序列化格式，在 JSON 模型上扩展 Date、ObjectId 等类型；与 HTTP API 中的 JSON 文本不是同一层。',
    also: ['db-mongodb', 'mongodb_db'],
  },
  x_api_key: {
    term: 'X-API-Key',
    brief: 'X-API-Key：本仓主服 HTTP 业务鉴权常用请求头；密钥配置于服务端 CommonConfig，禁止写入 www 前端静态资源。',
    also: ['xrk-http-auth', 'http', 'api'],
  },
  events_loader: {
    term: 'Events 监听',
    brief: 'Events 监听：core/*/events 目录下的生命周期事件钩子，与 Tasker 通道不同；部分变更须重启进程方可生效（不支持热更）。',
    also: ['xrk-events', 'xrk-plugin-arch', 'loader'],
  },
  /* —— HTTP 状态码（一码一名词） —— */
  http_200: {
    term: "HTTP 200 OK",
    brief: "HTTP 200 OK：请求已成功，响应体通常携带所请求的资源表示；是最常见的成功状态码。大厂联调时先确认业务是否真成功，勿只看「有响应」。",
    also: ['http-web', 'http-hands-on'],
  },
  http_201: {
    term: "HTTP 201 Created",
    brief: "HTTP 201 Created：请求已成功且服务器已创建新资源；响应常带 Location 指向新资源。POST/PUT 创建场景的大厂约定，勿与 200 混用掩盖「已创建」。",
    also: ['http-web', 'http-hands-on'],
  },
  http_204: {
    term: "HTTP 204 No Content",
    brief: "HTTP 204 No Content：成功处理但响应无正文；常见于 DELETE 成功或无需回写体的更新。客户端不应期望解析 JSON body。",
    also: ['http-web', 'http-hands-on'],
  },
  http_301: {
    term: "HTTP 301 Moved Permanently",
    brief: "HTTP 301 Moved Permanently：资源永久迁移；客户端与搜索引擎应改记新 URL。缓存与 SEO 敏感，勿拿 301 做临时活动跳转。",
    also: ['http-web', 'http-hands-on'],
  },
  http_302: {
    term: "HTTP 302 Found",
    brief: "HTTP 302 Found：临时重定向（历史语义混杂）；许多客户端会把 POST 改成 GET。需要保留方法时优先考虑 307/308。",
    also: ['http-web', 'http-hands-on'],
  },
  http_304: {
    term: "HTTP 304 Not Modified",
    brief: "HTTP 304 Not Modified：协商缓存命中，正文不传；依赖 If-None-Match / If-Modified-Since 与 ETag/Last-Modified。用于省带宽，不是错误。",
    also: ['http-web', 'http-hands-on'],
  },
  http_307: {
    term: "HTTP 307 Temporary Redirect",
    brief: "HTTP 307 Temporary Redirect：临时重定向且禁止擅自改请求方法与正文；比 302 语义更清晰，适合 API 临时换入口。",
    also: ['http-web', 'http-hands-on'],
  },
  http_308: {
    term: "HTTP 308 Permanent Redirect",
    brief: "HTTP 308 Permanent Redirect：永久重定向且保留原方法与正文；比 301 更适合「POST 也要跟到新 URL」的 API 场景。",
    also: ['http-web', 'http-hands-on'],
  },
  http_400: {
    term: "HTTP 400 Bad Request",
    brief: "HTTP 400 Bad Request：请求语法或语义无法被服务器理解（缺字段、JSON 非法、参数校验失败等）。大厂应返回可机器解析的错误体，勿只用 500 糊弄客户端错误。",
    also: ['http-web', 'http-hands-on'],
  },
  http_401: {
    term: "HTTP 401 Unauthorized",
    brief: "HTTP 401 Unauthorized：未提供或凭证无效；应触发重新认证。名称历史误导，实质是 authentication 失败，与 403 授权失败区分。",
    also: ['http-web', 'http-hands-on'],
  },
  http_403: {
    term: "HTTP 403 Forbidden",
    brief: "HTTP 403 Forbidden：服务器理解请求且通常已识别身份，但拒绝执行（权限/策略）。客户端换 Token 未必有用，需改角色或资源 ACL。",
    also: ['http-web', 'http-hands-on'],
  },
  http_404: {
    term: "HTTP 404 Not Found",
    brief: "HTTP 404 Not Found：目标资源不存在或对调用方不可见。联调先查路径、挂载与路由；有时故意对无权限也回 404 以防枚举。",
    also: ['http-web', 'http-hands-on'],
  },
  http_405: {
    term: "HTTP 405 Method Not Allowed",
    brief: "HTTP 405 Method Not Allowed：URI 存在但不支持该 HTTP 方法；响应宜带 Allow 列出可用方法。例如对只读资源发 DELETE。",
    also: ['http-web', 'http-hands-on'],
  },
  http_408: {
    term: "HTTP 408 Request Timeout",
    brief: "HTTP 408 Request Timeout：服务器等待请求完整到达超时。与 504（网关等上游）不同，偏客户端发送过慢或连接空闲。",
    also: ['http-web', 'http-hands-on'],
  },
  http_409: {
    term: "HTTP 409 Conflict",
    brief: "HTTP 409 Conflict：与当前资源状态冲突，如乐观锁版本不符、唯一键冲突。大厂 API 常用其表达「可重试的状态冲突」而非笼统 400。",
    also: ['http-web', 'http-hands-on'],
  },
  http_413: {
    term: "HTTP 413 Content Too Large",
    brief: "HTTP 413 Content Too Large（Payload Too Large）：请求体超过服务器或网关限制。上传接口需在反代与应用层同时设限并返回清晰错误。",
    also: ['http-web', 'http-hands-on'],
  },
  http_415: {
    term: "HTTP 415 Unsupported Media Type",
    brief: "HTTP 415 Unsupported Media Type：Content-Type 不被支持，如接口只要 application/json 却收到 form。检查头与序列化，而非乱改状态码为 500。",
    also: ['http-web', 'http-hands-on'],
  },
  http_429: {
    term: "HTTP 429 Too Many Requests",
    brief: "HTTP 429 Too Many Requests：触发限流；响应常带 Retry-After。调用方应退避重试，服务方需防刷与配额。大厂开放 API 高频考点。",
    also: ['http-web', 'http-hands-on'],
  },
  http_500: {
    term: "HTTP 500 Internal Server Error",
    brief: "HTTP 500 Internal Server Error：服务器未捕获的故障。生产应记日志与关联 ID，勿把堆栈直接回给公网；能区分的客户端错误不要一律 500。",
    also: ['http-web', 'http-hands-on'],
  },
  http_502: {
    term: "HTTP 502 Bad Gateway",
    brief: "HTTP 502 Bad Gateway：作为网关/反代收到上游无效响应。排障看上游进程、端口、协议是否通，而不是先改前端文案。",
    also: ['http-web', 'http-hands-on'],
  },
  http_503: {
    term: "HTTP 503 Service Unavailable",
    brief: "HTTP 503 Service Unavailable：服务暂时不可用（过载、维护、熔断）。可带 Retry-After；与 502（上游应答坏）区分：503 更像「现在别来」。",
    also: ['http-web', 'http-hands-on'],
  },
  http_504: {
    term: "HTTP 504 Gateway Timeout",
    brief: "HTTP 504 Gateway Timeout：网关等上游超时。查上游耗时、超时配置与依赖慢查询；与 408（等客户端请求）不同。",
    also: ['http-web', 'http-hands-on'],
  },

  /* —— Linux 基础命令（一令一名词） —— */
  cli_pwd: {
    term: "pwd",
    brief: "pwd（print working directory）：打印当前工作目录绝对路径。排障与脚本定位的第一步。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_ls: {
    term: "ls",
    brief: "ls：列出目录项；常用 ls -la 看隐藏文件与权限。大厂排障先看目录里到底有什么。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_cd: {
    term: "cd",
    brief: "cd：切换当前工作目录；cd .. 上级，cd ~ 或 cd 回家目录。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_tree: {
    term: "tree",
    brief: "tree：以树形打印目录结构，便于快速看项目布局；未安装时可用 find 近似。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_cat: {
    term: "cat",
    brief: "cat：串联并打印文件内容到标准输出；小文件快速查看。大文件用 less。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_less: {
    term: "less",
    brief: "less：可分页、可搜索的文件阅读器；大日志优于 cat。按 q 退出，/ 搜索。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_mkdir: {
    term: "mkdir",
    brief: "mkdir：创建目录；mkdir -p a/b/c 可创建中间路径。与 touch（建空文件）不同。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_rm: {
    term: "rm",
    brief: "rm：删除文件；rm -r 递归删目录。生产慎用 rm -rf；误删难恢复。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_cp: {
    term: "cp",
    brief: "cp：复制文件；cp -r 递归复制目录树。备份与发布前的常见操作。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_mv: {
    term: "mv",
    brief: "mv：移动或重命名文件/目录。同文件系统上常为改名，跨设备则复制+删除。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_grep: {
    term: "grep",
    brief: "grep：按正则/字符串检索文本；grep -n 行号，-r 递归。日志排障核心工具；也可用 ripgrep。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_find: {
    term: "find",
    brief: "find：按名称、时间、权限等元数据遍历目录树；find . -name \"*.log\"。与 grep 搜内容互补。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_ps: {
    term: "ps",
    brief: "ps：快照进程表；ps aux | grep name 常用于找进程。与 top/htop 实时视图互补。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_top: {
    term: "top",
    brief: "top：交互式实时查看 CPU/内存占用进程。负载飙升时第一眼工具之一。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_htop: {
    term: "htop",
    brief: "htop：增强版交互式进程监视（常需安装）；比 top 更易读、可点选。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_kill: {
    term: "kill",
    brief: "kill：向进程发信号；默认 SIGTERM，-9 为 SIGKILL（最后手段）。先确认 PID。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_chmod: {
    term: "chmod",
    brief: "chmod：改文件权限位；+x 加执行权限，或数字如 755。安全基线：密钥文件勿 777。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_chown: {
    term: "chown",
    brief: "chown：改文件所有者与属组；部署后修正 www 用户权限常见。勿对根目录随意递归改属主。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_sudo: {
    term: "sudo",
    brief: "sudo：以另一用户（常为 root）权限执行命令；有审计。扩大权限即扩大误伤面，勿习惯性 sudo rm -rf。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_curl: {
    term: "curl",
    brief: "curl：命令行传数据，常用于调 HTTP API；curl -L 跟随重定向，-o 写文件。大厂联调与 CI 标配。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_wget: {
    term: "wget",
    brief: "wget：非交互下载工具，擅长递归镜像与断点续传；与 curl 互补。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_ping: {
    term: "ping",
    brief: "ping：用 ICMP 探测主机可达性与往返时延。通 ≠ 业务端口通；还需 ss/curl 查端口与 HTTP。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_tail: {
    term: "tail",
    brief: "tail：看文件末尾；tail -f 跟踪追加日志。服务排障看最新错误的首选。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_head: {
    term: "head",
    brief: "head：看文件开头若干行；与 tail 相对。快速瞄配置文件头部。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_ss: {
    term: "ss",
    brief: "ss：查看套接字/端口监听；ss -lntp 看谁占用端口。现代替代部分 netstat 场景。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_df: {
    term: "df",
    brief: "df：查看文件系统磁盘空间；df -h 人类可读。磁盘满是服务异常经典原因。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_du: {
    term: "du",
    brief: "du：统计目录占用；du -sh dir 看某目录总大小。与 df（卷容量）互补，用于找大目录。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_tar: {
    term: "tar",
    brief: "tar：打包/解包；tar -czf a.tgz dir/ 与 tar -xzf a.tgz 是发布备份经典组合。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_echo: {
    term: "echo",
    brief: "echo：向标准输出打印参数；脚本里拼路径、打调试信息常用。注意引号与通配。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  cli_which: {
    term: "which / command -v",
    brief: "which 或 command -v：定位命令在 PATH 中的路径。排查「装了但找不到」与多版本冲突。",
    also: ['linux-cli', 'terminal-worlds'],
  },
  /* —— 基础全表名词（seed-basics-tables） —— */
  http_m_get: {
    term: "HTTP GET",
    brief: "HTTP GET：获取资源表示，按约定无副作用、可缓存；查询参数放 URL。大厂禁止用 GET 做删除/扣款。",
    also: ["http-web","http-hands-on"],
  },
  http_m_post: {
    term: "HTTP POST",
    brief: "HTTP POST：向目标资源提交处理（常创建子资源或触发动作），通常非幂等。表单提交与「创建」常用 POST。",
    also: ["http-web","http-hands-on"],
  },
  http_m_put: {
    term: "HTTP PUT",
    brief: "HTTP PUT：用请求体整体替换目标资源；幂等——同一 URL 多次 PUT 结果应一致。与 POST「由服务器分配 id」不同。",
    also: ["http-web"],
  },
  http_m_patch: {
    term: "HTTP PATCH",
    brief: "HTTP PATCH：对资源做部分更新（补丁），不必传完整文档。与 PUT 全量替换区分。",
    also: ["http-web"],
  },
  http_m_delete: {
    term: "HTTP DELETE",
    brief: "HTTP DELETE：删除目标资源；规范上幂等。成功常 200/202/204。",
    also: ["http-web"],
  },
  http_m_head: {
    term: "HTTP HEAD",
    brief: "HTTP HEAD：与 GET 相同的处理，但不返回正文，只取响应头。探测资源是否存在、查 Content-Length 常用。",
    also: ["http-web","http-hands-on"],
  },
  http_m_options: {
    term: "HTTP OPTIONS",
    brief: "HTTP OPTIONS：询问目标资源支持的通信选项；浏览器 CORS 预检常用。响应可含 Allow。",
    also: ["http-web"],
  },
  git_cmd_clone: {
    term: "git clone",
    brief: "git clone：把远程仓库复制到本地工作目录并配置 origin。新人第一命令。",
    also: ["git-workspace","git-forges"],
  },
  git_cmd_clone_depth: {
    term: "git clone --depth=1",
    brief: "git clone --depth=1：浅克隆，只取最近提交，加快 CI/大仓拉取；历史不完整。",
    also: ["git-workspace","craft-ci"],
  },
  git_cmd_remote_v: {
    term: "git remote -v",
    brief: "git remote -v：列出远程名与 fetch/push URL。确认 origin 指哪。",
    also: ["git-workspace","git-forges"],
  },
  git_cmd_status: {
    term: "git status",
    brief: "git status：查看工作区/暂存区状态与当前分支。每日最高频。",
    also: ["git-workspace"],
  },
  git_cmd_diff: {
    term: "git diff",
    brief: "git diff：看未暂存改动；git diff --staged 看已暂存。审 diff 再 commit。",
    also: ["git-workspace","adev-vibe-coding"],
  },
  git_cmd_add: {
    term: "git add",
    brief: "git add：把改动放入暂存区，准备进入下一次 commit。",
    also: ["git-workspace"],
  },
  git_cmd_commit: {
    term: "git commit",
    brief: "git commit：把暂存区做成历史快照；-m 写说明 why。小步可复查。",
    also: ["git-advanced"],
  },
  git_cmd_switch_c: {
    term: "git switch -c",
    brief: "git switch -c <branch>：创建并切换到新分支。现代推荐，替代部分 checkout -b。",
    also: ["git-advanced"],
  },
  git_cmd_branch: {
    term: "git branch",
    brief: "git branch：列出本地分支；-d 删除已合并分支。",
    also: ["git-advanced"],
  },
  git_cmd_push: {
    term: "git push",
    brief: "git push：把本地提交推到远程；首次常用 -u 设上游。",
    also: ["git-forges","git-advanced"],
  },
  git_cmd_pull: {
    term: "git pull",
    brief: "git pull：取远程更新并合并/变基进当前分支。协作前先拉。",
    also: ["git-advanced","git-forges"],
  },
  git_cmd_fetch: {
    term: "git fetch",
    brief: "git fetch：只下载远程对象与引用，不自动合并。先看再合更安全。",
    also: ["git-advanced"],
  },
  git_cmd_log: {
    term: "git log",
    brief: "git log：查看提交历史；--oneline 紧凑。回溯 why 的入口。",
    also: ["git-workspace"],
  },
  git_cmd_stash: {
    term: "git stash",
    brief: "git stash：临时搁置未提交改动，切分支救急；pop/apply 取回。",
    also: ["git-advanced"],
  },
  git_cmd_restore: {
    term: "git restore",
    brief: "git restore：丢弃工作区改动或取消暂存（--staged）。替代部分 checkout/reset 用途。",
    also: ["git-advanced"],
  },
  git_cmd_gitignore: {
    term: ".gitignore",
    brief: ".gitignore：声明不纳入版本控制的路径（密钥、依赖目录、构建产物）。应进仓共享。",
    also: ["git-workspace","craft-security"],
  },
  docker_cmd_pull: {
    term: "docker pull",
    brief: "docker pull：从仓库拉取镜像到本机。",
    also: ["ops-docker"],
  },
  docker_cmd_run: {
    term: "docker run",
    brief: "docker run：基于镜像创建并启动容器；-p 映射端口，-d 后台，--rm 退出删除。",
    also: ["ops-docker"],
  },
  docker_cmd_ps: {
    term: "docker ps",
    brief: "docker ps：列出运行中容器；-a 含已停止。",
    also: ["ops-docker"],
  },
  docker_cmd_logs: {
    term: "docker logs",
    brief: "docker logs：看容器标准输出/错误；-f 跟踪。排障第一眼。",
    also: ["ops-docker","workbench-troubleshoot"],
  },
  docker_cmd_stop: {
    term: "docker stop",
    brief: "docker stop：优雅停止容器（发信号）；粗暴可用 kill。",
    also: ["ops-docker"],
  },
  docker_cmd_rm: {
    term: "docker rm",
    brief: "docker rm：删除已停止的容器实例（不是删镜像）。",
    also: ["ops-docker"],
  },
  docker_cmd_images: {
    term: "docker images",
    brief: "docker images：列出本机镜像。",
    also: ["ops-docker"],
  },
  docker_cmd_build: {
    term: "docker build",
    brief: "docker build -t name:tag ：按 Dockerfile 构建镜像并打标签。",
    also: ["ops-docker"],
  },
  docker_cmd_exec: {
    term: "docker exec",
    brief: "docker exec -it：在运行中容器内执行命令（进 shell 排障）。",
    also: ["ops-docker"],
  },
  docker_cmd_compose_up: {
    term: "docker compose up",
    brief: "docker compose up -d：按 compose 文件后台拉起多服务。本地依赖栈常用。",
    also: ["ops-compose","ops-docker"],
  },
  docker_cmd_compose_down: {
    term: "docker compose down",
    brief: "docker compose down：停止并移除 compose 创建的容器/网络（卷需额外选项）。",
    also: ["ops-compose"],
  },
  docker_cmd_df_from: {
    term: "Dockerfile FROM",
    brief: "Dockerfile FROM：指定基础镜像，构建第一指令。",
    also: ["ops-docker"],
  },
  sql_kw_select: {
    term: "SQL SELECT",
    brief: "SELECT：查询投影列；FROM 指定表。只读查询入口。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_insert: {
    term: "SQL INSERT",
    brief: "INSERT INTO … VALUES …：插入新行。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_update: {
    term: "SQL UPDATE",
    brief: "UPDATE … SET … WHERE …：更新已有行；缺 WHERE 会更新全表——事故。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_delete: {
    term: "SQL DELETE",
    brief: "DELETE FROM … WHERE …：删除行；缺 WHERE 删光表。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_where: {
    term: "SQL WHERE",
    brief: "WHERE：过滤行条件；在 GROUP BY 聚合前生效。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_join: {
    term: "SQL JOIN",
    brief: "JOIN … ON …：按键关联多表；先 INNER 再学 LEFT。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_order_by: {
    term: "SQL ORDER BY",
    brief: "ORDER BY：结果排序；ASC/DESC。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_limit: {
    term: "SQL LIMIT",
    brief: "LIMIT：限制返回行数；分页常配合 OFFSET（方言各异）。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_create_table: {
    term: "SQL CREATE TABLE",
    brief: "CREATE TABLE：定义表结构与约束。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_pk: {
    term: "PRIMARY KEY",
    brief: "PRIMARY KEY：主键约束，唯一标识行，常非空。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_begin: {
    term: "SQL BEGIN / START TRANSACTION",
    brief: "BEGIN（或 START TRANSACTION）：开启事务，后续语句可一并提交或回滚。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_commit: {
    term: "SQL COMMIT",
    brief: "COMMIT：提交事务，使变更持久。",
    also: ["db-sql-hands-on"],
  },
  sql_kw_rollback: {
    term: "SQL ROLLBACK",
    brief: "ROLLBACK：回滚事务，撤销未提交变更。",
    also: ["db-sql-hands-on"],
  },
  shell_op_pipe: {
    term: "Shell 管道 |",
    brief: "管道 |：把前一命令 stdout 接到下一命令 stdin。组合小工具。",
    also: ["lang-shell","linux-cli"],
  },
  shell_op_redir_out: {
    term: "Shell 重定向 >",
    brief: ">：覆盖写入文件；>> 追加。",
    also: ["lang-shell"],
  },
  shell_op_redir_append: {
    term: "Shell 追加 >>",
    brief: ">>：追加写入文件，保留原内容。",
    also: ["lang-shell"],
  },
  shell_op_redir_err: {
    term: "Shell 2>&1",
    brief: "2>&1：把 stderr 并入 stdout，常与 >file 一起保存全部输出。",
    also: ["lang-shell","linux-cli"],
  },
  shell_op_set_e: {
    term: "set -e",
    brief: "set -e：命令失败（非零退出）则脚本退出。CI 脚本常用。",
    also: ["lang-shell","craft-ci"],
  },
  shell_op_set_u: {
    term: "set -u",
    brief: "set -u：使用未定义变量则报错退出，防空变量酿灾。",
    also: ["lang-shell"],
  },
  shell_op_pipefail: {
    term: "set -o pipefail",
    brief: "set -o pipefail：管道中任一命令失败则整管失败，避免只看最后一个退出码。",
    also: ["lang-shell","craft-ci"],
  },
  shell_op_status: {
    term: "Shell $?",
    brief: "$?：上一命令退出码；0 通常成功。脚本分支判断。",
    also: ["lang-shell"],
  },
  shell_op_shebang: {
    term: "Shebang #!/usr/bin/env bash",
    brief: "Shebang：脚本首行指定解释器；env bash 便于 PATH 解析。",
    also: ["lang-shell"],
  },
  pnpm_cmd_corepack: {
    term: "corepack enable",
    brief: "corepack enable：启用 Node 自带的包管理器管理，便于按 packageManager 字段用 pnpm。",
    also: ["package-managers","runtime-nodejs"],
  },
  pnpm_cmd_install: {
    term: "pnpm install",
    brief: "pnpm install：按 lockfile 安装依赖。本仓默认包管理命令。",
    also: ["package-managers","xrk-first-run"],
  },
  pnpm_cmd_run: {
    term: "pnpm run",
    brief: "pnpm run <script>：执行 package.json scripts。",
    also: ["package-managers"],
  },
  pnpm_cmd_frozen: {
    term: "pnpm install --frozen-lockfile",
    brief: "pnpm install --frozen-lockfile：CI 禁止更新 lockfile，锁不一致则失败。",
    also: ["package-managers","craft-ci"],
  },
  pnpm_cmd_lock: {
    term: "pnpm-lock.yaml",
    brief: "pnpm-lock.yaml：依赖精确版本锁；应提交进仓保证可复现。",
    also: ["package-managers"],
  },
  pnpm_cmd_npx: {
    term: "npx",
    brief: "npx：执行 npm 包中的二进制（临时或本地）。与 pnpm exec/dlx 同类需求。",
    also: ["package-managers","runtime-nodejs"],
  },
  port_80: {
    term: "端口 80",
    brief: "TCP 80：默认 HTTP 明文服务端口。",
    also: ["network-basics","http-web"],
  },
  port_443: {
    term: "端口 443",
    brief: "TCP 443：默认 HTTPS（HTTP over TLS）端口。",
    also: ["network-basics","dns-https"],
  },
  port_22: {
    term: "端口 22",
    brief: "TCP 22：默认 SSH 远程登录。",
    also: ["network-basics"],
  },
  port_53: {
    term: "端口 53",
    brief: "UDP/TCP 53：DNS 域名解析。",
    also: ["network-basics","dns-https"],
  },
  port_3306: {
    term: "端口 3306",
    brief: "TCP 3306：MySQL 默认端口。",
    also: ["network-basics","db-mysql"],
  },
  port_5432: {
    term: "端口 5432",
    brief: "TCP 5432：PostgreSQL 默认端口。",
    also: ["network-basics","db-postgresql"],
  },
  port_6379: {
    term: "端口 6379",
    brief: "TCP 6379：Redis 默认端口。",
    also: ["network-basics","xrk-database"],
  },
  port_27017: {
    term: "端口 27017",
    brief: "TCP 27017：MongoDB 默认端口。",
    also: ["network-basics","db-mongodb"],
  },
  /* —— 基础全表名词 batch2（seed-basics-tables2） —— */
  cookie_cookie: {
    term: "Cookie",
    brief: "Cookie：服务器经 Set-Cookie 让浏览器保存的小段名值对；后续同范围请求自动带上。约 4KB 级，内容对客户端可见（除非 HttpOnly）。",
    also: ["http-web"],
  },
  cookie_session: {
    term: "Session（服务端会话）",
    brief: "Session：会话状态存在服务器；浏览器通常只持有 SessionID（常经 Cookie）。强踢下线、即时失效往往比纯 JWT 更顺手。",
    also: ["http-web","craft-security"],
  },
  cookie_httponly: {
    term: "HttpOnly（Cookie 标志）",
    brief: "HttpOnly：标记后文档脚本（如 document.cookie）读不到该 Cookie，降低 XSS 偷会话标识的风险；不防 CSRF。",
    also: ["http-web","craft-security"],
  },
  cookie_secure: {
    term: "Secure（Cookie 标志）",
    brief: "Secure：仅在 HTTPS（安全连接）请求中发送该 Cookie，降低明文信道被窃听风险。",
    also: ["http-web","host-tls"],
  },
  cookie_samesite: {
    term: "SameSite（Cookie 标志）",
    brief: "SameSite：控制跨站请求是否带 Cookie（Lax/Strict/None）；是缓解 CSRF 的关键手段之一，不能替代 XSS 防护。",
    also: ["http-web","craft-security"],
  },
  cookie_domain_path: {
    term: "Cookie Domain / Path",
    brief: "Domain / Path：限定 Cookie 作用的主机与路径范围；范围过大易扩大泄漏与 CSRF 面，应按最小必要设置。",
    also: ["http-web"],
  },
  cors_same_origin: {
    term: "同源（Same-Origin）",
    brief: "同源：协议、主机、端口三者皆同。任一不同即跨源；浏览器据此限制前端脚本读跨源响应。",
    also: ["http-web"],
  },
  cors_origin: {
    term: "Origin 请求头",
    brief: "Origin：浏览器在跨源请求中标明页面来源（协议+主机+端口）。服务器用它决定是否放行 CORS。",
    also: ["http-web"],
  },
  cors_preflight: {
    term: "CORS 预检（Preflight）",
    brief: "预检：对「非简单」跨源请求，浏览器先发 OPTIONS 询问服务器是否允许方法/头，通过后再发真实请求。",
    also: ["http-web","http-hands-on"],
  },
  cors_acao: {
    term: "Access-Control-Allow-Origin",
    brief: "Access-Control-Allow-Origin：响应头，声明哪些 Origin 可读该响应。生产慎用 * 搭配凭证；常与反代同源转发对照。",
    also: ["http-web","reverse-proxy"],
  },
  cache_cache_control: {
    term: "Cache-Control",
    brief: "Cache-Control：控制缓存的主头（max-age、no-cache、no-store、private/public 等）。强缓存未过期时常直接用本地副本。",
    also: ["http-web"],
  },
  cache_expires: {
    term: "Expires",
    brief: "Expires：绝对过期时间的老标准；优先级通常低于 Cache-Control。理解遗留系统时仍会遇到。",
    also: ["http-web"],
  },
  cache_etag: {
    term: "ETag",
    brief: "ETag：资源内容指纹；客户端用 If-None-Match 协商，未变常回 304。比纯时间戳更精确。",
    also: ["http-web"],
  },
  cache_last_modified: {
    term: "Last-Modified",
    brief: "Last-Modified：资源上次修改时间；客户端用 If-Modified-Since 协商。精度与时钟问题下常不如 ETag。",
    also: ["http-web"],
  },
  cache_strong_vs_revalidate: {
    term: "强缓存 vs 协商缓存",
    brief: "强缓存：未过期可不打服务器直接用；协商缓存：带验证头问服务器，304 用本地或 200 拿新内容。",
    also: ["http-web","net-edge-practice"],
  },
  env_kw_env_var: {
    term: "环境变量",
    brief: "环境变量：进程可见的「名=值」配置；子进程常继承。密钥、代理、路径等多放这里，勿写进将提交的源码。",
    also: ["data-env"],
  },
  env_kw_path: {
    term: "PATH",
    brief: "PATH：特殊环境变量，列出 shell 搜索可执行文件的目录列表；「command not found」常先查 PATH。",
    also: ["data-env","installers-path"],
  },
  env_kw_export: {
    term: "export（shell）",
    brief: "export：把变量标进当前 shell 环境，供后续子进程继承；关终端会话通常即失效（除非写入配置文件）。",
    also: ["data-env","linux-cli"],
  },
  env_kw_dotenv: {
    term: ".env 文件",
    brief: ".env：本地键值文本，工具可读入变成环境变量；通常含真实密钥，必须 gitignore，勿提交。",
    also: ["data-env","craft-security"],
  },
  env_kw_dotenv_example: {
    term: ".env.example",
    brief: ".env.example：只列键名与假值/说明，可以进仓库，作为同事与 CI 的填写模板。",
    also: ["data-env","craft-security"],
  },
  env_kw_http_proxy: {
    term: "HTTP_PROXY / HTTPS_PROXY",
    brief: "HTTP_PROXY / HTTPS_PROXY：告诉许多工具出网走哪个代理（如本机 7890）。国内拉 GitHub/npm 常见设置。",
    also: ["data-env","clash"],
  },
  env_kw_no_proxy: {
    term: "NO_PROXY",
    brief: "NO_PROXY：列出不走代理的主机（常含 127.0.0.1,localhost,::1），避免本机回环也被代理绕一圈。",
    also: ["data-env","clash"],
  },
  env_kw_process_env: {
    term: "process.env（Node）",
    brief: "process.env：Node 进程读取环境变量的对象；值为字符串或 undefined。启动前注入，不是运行时随意改 OS 全局的唯一方式。",
    also: ["data-env","runtime-nodejs"],
  },
  nginx_dir_server: {
    term: "Nginx server 块",
    brief: "server：一组虚拟主机配置（监听、域名、location 等）。一台 Nginx 可有多个 server。",
    also: ["net-nginx"],
  },
  nginx_dir_location: {
    term: "Nginx location",
    brief: "location：按 URI 路径匹配规则；可挂静态 root、反代 proxy_pass、重写等。路径拼接细节影响上游看到的 URI。",
    also: ["net-nginx","http-web"],
  },
  nginx_dir_proxy_pass: {
    term: "proxy_pass",
    brief: "proxy_pass：把匹配到的请求转到上游（如 http://127.0.0.1:3000）。反代核心；尾斜杠会影响路径拼接。",
    also: ["net-nginx","reverse-proxy"],
  },
  nginx_dir_listen: {
    term: "listen",
    brief: "listen：指定 server 监听的地址/端口（如 80、443 ssl）。公网入口常见只暴露 443。",
    also: ["net-nginx","network-basics"],
  },
  nginx_dir_upstream: {
    term: "upstream",
    brief: "upstream：定义一组后端服务器，供 proxy_pass 引用，可做简单负载。不是容器专有词。",
    also: ["net-nginx","reverse-proxy"],
  },
  nginx_dir_nginx_t: {
    term: "nginx -t",
    brief: "nginx -t：测试配置语法/基本正确性。改 conf 后应先 -t 再 reload，避免写挂全站。",
    also: ["net-nginx"],
  },
  nginx_dir_reload: {
    term: "Nginx reload",
    brief: "reload：热加载配置（如 nginx -s reload / systemctl reload nginx），多数改动无需掐断全部连接硬重启。",
    also: ["net-nginx"],
  },
  nginx_dir_root_static: {
    term: "root / 静态资源",
    brief: "root（及 alias）：把 URI 映射到磁盘目录，直接返回静态文件，不经应用逻辑。与 proxy_pass 反代业务 API 对照。",
    also: ["net-nginx","http-web"],
  },
  compose_kw_services: {
    term: "Compose services",
    brief: "services：声明有哪些容器角色（如 redis、app）。Compose 管「一套」，docker run 管「一个」。",
    also: ["ops-compose"],
  },
  compose_kw_image: {
    term: "Compose image",
    brief: "image：使用已有镜像名（可含标签）启动服务，不必本地 build。",
    also: ["ops-compose","ops-docker"],
  },
  compose_kw_build: {
    term: "Compose build",
    brief: "build：按 Dockerfile（或上下文）本地构建镜像再运行；与直接 image 拉现成对照。",
    also: ["ops-compose","ops-docker"],
  },
  compose_kw_ports: {
    term: "Compose ports",
    brief: "ports：宿主机端口:容器端口映射，如 6379:6379，让本机进程连 localhost 进容器。",
    also: ["ops-compose","network-basics"],
  },
  compose_kw_volumes: {
    term: "Compose volumes",
    brief: "volumes：把容器内目录持久化到命名卷或宿主机路径，避免删容器丢数据。卷 ≠ 镜像只读层。",
    also: ["ops-compose"],
  },
  compose_kw_depends_on: {
    term: "depends_on",
    brief: "depends_on：启动顺序提示（先起 A 再起 B）；不等于健康检查「已可接受连接」。",
    also: ["ops-compose"],
  },
  dsa_lin_array: {
    term: "数组 / 动态数组",
    brief: "数组：下标连续，随机访问 O(1)；中部插入删除常 O(n)。JS Array 日常当动态数组用。",
    also: ["dsa-linear"],
  },
  dsa_lin_linked_list: {
    term: "链表",
    brief: "链表：节点用指针/引用串联；已知节点时局部插入删除便宜，随机访问要 O(n)。常考反转、环、合并。",
    also: ["dsa-linear"],
  },
  dsa_lin_stack: {
    term: "栈（Stack）",
    brief: "栈：LIFO 后进先出；一端进出。典型：括号匹配、撤销、DFS/递归模拟。",
    also: ["dsa-linear"],
  },
  dsa_lin_queue: {
    term: "队列（Queue）",
    brief: "队列：FIFO 先进先出；典型 BFS、任务排队。JS 可用数组 push + shift 模拟（大数据量注意 shift 成本）。",
    also: ["dsa-linear"],
  },
  dsa_lin_deque: {
    term: "双端队列（Deque）",
    brief: "双端队列：两头都能进出；滑动窗口最值等题常用单调双端队列。",
    also: ["dsa-linear","dsa-hot"],
  },
  dsa_lin_dummy: {
    term: "哑节点（Dummy）",
    brief: "哑节点：链表题里放在真头前的哨兵，简化头插/头删边界，少写空指针特判。",
    also: ["dsa-linear"],
  },
  sec_kw_sqli: {
    term: "SQL 注入",
    brief: "SQL 注入：不可信输入改变了 SQL 结构。防御：参数化/预编译/ORM 绑定，禁止字符串拼接查询。",
    also: ["craft-security","db-sql-hands-on"],
  },
  sec_kw_xss: {
    term: "XSS（跨站脚本）",
    brief: "XSS：不可信输入当脚本在别人浏览器执行。防御：按上下文输出编码；勿把未消毒 HTML 当可信；Cookie 可加 HttpOnly。",
    also: ["craft-security","http-web"],
  },
  sec_kw_cmdi: {
    term: "命令注入",
    brief: "命令注入：用户输入进了 shell/exec。防御：避免 shell；参数白名单；用数组形式传参而非字符串拼接命令行。",
    also: ["craft-security"],
  },
  sec_kw_secret_leak: {
    term: "密钥泄漏应急",
    brief: "密钥进 Git/日志：先在服务商处轮换/吊销，再清配置与历史。只删提交不能替代轮换——机器人可能已扫到。",
    also: ["craft-security","data-env"],
  },
  sec_kw_authz: {
    term: "服务端鉴权",
    brief: "鉴权：每个敏感接口服务端再判身份与权限；只藏前端按钮或关鉴权「图省事」上生产是事故。",
    also: ["craft-security","http-web"],
  },
  /* —— 基础全表名词 batch3（seed-basics-tables3） —— */
  dsa_o_o1: {
    term: "O(1)",
    brief: "O(1)：与输入规模无关的常量时间（如数组下标、哈希平均查找）。大 O 描述增长趋势，不是墙上秒数。",
    also: ["dsa-complexity"],
  },
  dsa_o_olog: {
    term: "O(log n)",
    brief: "O(log n)：每次排除一部分（常砍一半），如二分查找。规模翻倍，步数只加一常数量级。",
    also: ["dsa-complexity","dsa-sort"],
  },
  dsa_o_on: {
    term: "O(n)",
    brief: "O(n)：与输入规模成线性，扫一遍数组是典型。",
    also: ["dsa-complexity"],
  },
  dsa_o_onlog: {
    term: "O(n log n)",
    brief: "O(n log n)：分治排序级，如快排平均、堆排、归并。许多「先排序再处理」的下界直觉落在这。",
    also: ["dsa-complexity","dsa-sort"],
  },
  dsa_o_on2: {
    term: "O(n²)",
    brief: "O(n²)：双重循环同长 n 全扫常见。简单两数之和暴力即此类。",
    also: ["dsa-complexity"],
  },
  dsa_o_oexp: {
    term: "O(2ⁿ) / 指数",
    brief: "O(2ⁿ) / O(n!)：未剪枝回溯、朴素递归斐波那契等，规模稍大即不可用；常靠记忆化/DP 压下来。",
    also: ["dsa-complexity","dsa-dp"],
  },
  dsa_o_space: {
    term: "空间复杂度",
    brief: "空间复杂度：额外开了多大表/递归栈。O(1) 额外空间≠不能改输入（看题意）；递归深度 n 常至少 O(n) 栈。",
    also: ["dsa-complexity"],
  },
  dsa_o_avg_worst: {
    term: "平均 vs 最坏",
    brief: "平均 vs 最坏：快排/哈希要分清。面试开口应说明讨论的是哪一种，勿混成一个数。",
    also: ["dsa-complexity","dsa-hash","dsa-sort"],
  },
  dsa_hash_table: {
    term: "哈希表（散列表）",
    brief: "哈希表：键经哈希函数落到桶，平均查找/插入近 O(1)。两数之和、计数、去重的常用底座。",
    also: ["dsa-hash"],
  },
  dsa_hash_collision: {
    term: "哈希冲突",
    brief: "冲突：不同键落到同一桶。用链址或开放寻址处理；冲突多则退化，最坏可至 O(n)。",
    also: ["dsa-hash"],
  },
  dsa_hash_load: {
    term: "负载因子",
    brief: "负载因子：已用槽位与容量之比。过高冲突增、需扩容；影响常数与退化风险。",
    also: ["dsa-hash"],
  },
  dsa_hash_map: {
    term: "Map（JS）",
    brief: "Map：键可为任意类型，插序可迭代；比普通对象更适合当通用字典。",
    also: ["dsa-hash","lang-javascript"],
  },
  dsa_hash_set: {
    term: "Set（JS）",
    brief: "Set：只要键不要值的集合，天然去重。判存在、滑窗字符集合常用。",
    also: ["dsa-hash","lang-javascript"],
  },
  dsa_hash_object: {
    term: "Object 当字典",
    brief: "Object：键主要是 string/symbol；注意原型链干扰（可用 Object.create(null)）。简单字符串键场景仍常见。",
    also: ["dsa-hash","lang-javascript"],
  },
  dsa_tree_preorder: {
    term: "前序遍历",
    brief: "前序：根 → 左 → 右。常用于复制结构、前缀表达。",
    also: ["dsa-tree"],
  },
  dsa_tree_inorder: {
    term: "中序遍历",
    brief: "中序：左 → 根 → 右。BST 中序得到有序序列——开口高频点。",
    also: ["dsa-tree"],
  },
  dsa_tree_postorder: {
    term: "后序遍历",
    brief: "后序：左 → 右 → 根。删树、后缀表达、先处理孩子再处理根。",
    also: ["dsa-tree"],
  },
  dsa_tree_level: {
    term: "层序遍历",
    brief: "层序：逐层访问，队列 BFS。锯齿层序、每层最右节点等题模板。",
    also: ["dsa-tree"],
  },
  dsa_tree_bst: {
    term: "二叉搜索树（BST）",
    brief: "BST：左子树键 < 根 < 右子树。查找/插入平均 O(log n)，退化成链则 O(n)。",
    also: ["dsa-tree"],
  },
  dsa_tree_heap: {
    term: "堆（优先队列）",
    brief: "堆：满足堆序的完全二叉树，常数组实现。父优于子；插入上浮、删顶下沉 O(log n)。",
    also: ["dsa-tree"],
  },
  dsa_tree_topk: {
    term: "TopK 与堆",
    brief: "TopK：维持大小为 K 的堆扫 n 个元素 → O(n log K)。第 K 大常用小顶堆。",
    also: ["dsa-tree","dsa-hot"],
  },
  dsa_sort_quick: {
    term: "快速排序",
    brief: "快排：平均 O(n log n)，最坏 O(n²)；不稳定；常数好。随机枢轴改善最坏。",
    also: ["dsa-sort"],
  },
  dsa_sort_merge: {
    term: "归并排序",
    brief: "归并：始终 O(n log n)，稳定，需额外 O(n) 空间；外排友好。",
    also: ["dsa-sort"],
  },
  dsa_sort_heap_sort: {
    term: "堆排序",
    brief: "堆排：O(n log n)，原地，不稳定；常数常不如快排。优先队列思想同源。",
    also: ["dsa-sort","dsa-tree"],
  },
  dsa_sort_stable: {
    term: "排序稳定性",
    brief: "稳定：相等元素相对次序不变。多关键字排序时重要；归并典型稳定，快排/堆排通常不。",
    also: ["dsa-sort"],
  },
  dsa_sort_binary: {
    term: "二分查找",
    brief: "二分：序列对答案单调（有序是特例），O(log n)。统一区间开闭、防中点溢出、分清找左/右边界。",
    also: ["dsa-sort"],
  },
  dsa_graph_adj_list: {
    term: "邻接表",
    brief: "邻接表：每个顶点存邻居列表。稀疏图最常用，空间约 O(V+E)。",
    also: ["dsa-graph"],
  },
  dsa_graph_adj_mat: {
    term: "邻接矩阵",
    brief: "邻接矩阵：n×n 判边 O(1)，稠密图或需快速判边时用；空间 O(n²)。",
    also: ["dsa-graph"],
  },
  dsa_graph_bfs: {
    term: "BFS（广度优先）",
    brief: "BFS：队列逐层扩展。无权图最短层数、层序、岛屿「沉岛」等常用。",
    also: ["dsa-graph"],
  },
  dsa_graph_dfs: {
    term: "DFS（深度优先）",
    brief: "DFS：栈或递归走深。连通分量、路径存在、拓扑前奏、网格沉岛均可。",
    also: ["dsa-graph"],
  },
  dsa_graph_topo: {
    term: "拓扑排序",
    brief: "拓扑排序：有向无环图（DAG）上的线性序。课程表、任务依赖；有环则无法完成。入度表+队列是经典。",
    also: ["dsa-graph","dsa-hot"],
  },
  dsa_recur_callstack: {
    term: "递归与调用栈",
    brief: "递归：函数调用自身解决更小子问题；每次调用压栈帧，返回弹栈。深度过大可栈溢出；可用显式栈改迭代。",
    also: ["dsa-recurse","dsa_o_space"],
  },
  dsa_recur_base: {
    term: "递归基（Base case）",
    brief: "递归基：不再继续递归的终止条件。缺基或条件写错会导致无限递归；分治也要先钉死最小规模。",
    also: ["dsa-recurse"],
  },
  dsa_tp_two_pointers: {
    term: "双指针",
    brief: "双指针：同向或对撞扫线性结构，常把 O(n²) 降到 O(n)。对撞适合有序两端逼近；同向适合滑窗/快慢。",
    also: ["dsa-two-pointers","dsa-linear"],
  },
  dsa_tp_window: {
    term: "滑动窗口",
    brief: "滑动窗口：维护区间 [L,R] 上的不变量，右扩左缩。子串/子数组最值、去重长度等模板。",
    also: ["dsa-two-pointers","dsa_hash_set"],
  },
  dsa_uf_dsu: {
    term: "并查集（DSU）",
    brief: "并查集：维护不相交集合的合并与查询。路径压缩+按秩合并近均摊 O(α(n))；连通分量、最小生成树前置。",
    also: ["dsa-union-find","dsa-graph"],
  },
  dsa_str_match: {
    term: "字符串匹配",
    brief: "字符串匹配：在文本中找模式。暴力 O(nm)；KMP/Z 等预处理模式降均摊；题面常先哈希或双指针。",
    also: ["dsa-string"],
  },
  dsa_bit_ops: {
    term: "位运算",
    brief: "位运算：& | ^ ~ << >> 在整数位级操作。判奇偶、去最低置位、状态压缩常用；注意符号扩展与语言差异。",
    also: ["dsa-bitwise"],
  },
  dsa_ml_knn: {
    term: "近邻 / 距离直觉",
    brief: "近邻：用距离（欧氏、余弦等）找最像的样本。嵌入检索、推荐粗排同源；维度灾难时需降维或近似。",
    also: ["dsa-ml","ml","embedding_model"],
  },
  dsa_ml_gradient: {
    term: "梯度下降直觉",
    brief: "梯度下降：沿损失对参数的负梯度迭代更新。学习率过大震荡、过小过慢；深度学习训练的核心优化故事。",
    also: ["dsa-ml","ml"],
  },
  http_hdr_host: {
    term: "Host",
    brief: "Host：请求目标主机（及端口）。虚拟主机/反代按 Host 选站点；HTTP/1.1 必带。",
    also: ["http-web","net-nginx"],
  },
  http_hdr_content_type: {
    term: "Content-Type",
    brief: "Content-Type：正文的媒体类型（如 application/json）。收发双方据此序列化/解析 Body。",
    also: ["http-web","http-hands-on"],
  },
  http_hdr_authorization: {
    term: "Authorization",
    brief: "Authorization：携带凭证，常见 Bearer <token>。密钥放服务端环境变量，勿写进前端打包。",
    also: ["http-web","craft-security","data-env"],
  },
  http_hdr_accept: {
    term: "Accept",
    brief: "Accept：客户端可接受的响应媒体类型。内容协商时服务器据此选型。",
    also: ["http-web"],
  },
  http_hdr_user_agent: {
    term: "User-Agent",
    brief: "User-Agent：客户端标识字符串。统计与兼容用；勿当唯一安全依据（可伪造）。",
    also: ["http-web"],
  },
  http_hdr_cookie_req: {
    term: "Cookie（请求头）",
    brief: "Cookie 请求头：浏览器自动带上此前存下的 Cookie。与 Set-Cookie 响应头成对；会话 ID 常走这条。",
    also: ["http-web"],
  },
  http_hdr_set_cookie: {
    term: "Set-Cookie",
    brief: "Set-Cookie：服务器让浏览器存储 Cookie 的响应头，可带 HttpOnly/Secure/SameSite 等属性。",
    also: ["http-web","craft-security"],
  },
  http_hdr_origin_hdr: {
    term: "Origin（头）",
    brief: "Origin：跨源请求中标明页面来源。CORS 与 CSRF 讨论里常与 Cookie 策略对照。",
    also: ["http-web"],
  },
};

/** VibeHub：与本仓重叠则并入本仓键，不重复建 vh_* */
export const VIBEHUB_GLOSSARY_MERGE = mergeVibehubGlossary(
  GLOSSARY,
  VIBEHUB_GLOSSARY_ENTRIES
);

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

/**
 * @returns {Array<GlossaryEntry & { id: string }>}
 */
export function listGlossary() {
  return Object.entries(GLOSSARY).map(([id, entry]) => ({ id, ...entry }));
}

/**
 * @param {string} query
 * @param {{ limit?: number }} [opts]
 * @returns {Array<GlossaryEntry & { id: string, score: number }>}
 */
export function searchGlossary(query, opts = {}) {
  const q = String(query ?? '')
    .trim()
    .toLowerCase();
  const limit = opts.limit ?? 80;
  const all = listGlossary();
  if (!q) return all.slice(0, limit).map((e) => ({ ...e, score: 0 }));

  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = [];
  for (const e of all) {
    const aliasHay = Array.isArray(e.aliases)
      ? e.aliases.join(' ').toLowerCase()
      : '';
    const hay = `${e.id} ${e.term} ${e.brief} ${aliasHay}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (e.term.toLowerCase().includes(t)) score += 8;
      if (e.id.toLowerCase().includes(t)) score += 6;
      if (aliasHay.includes(t)) score += 7;
      if (hay.includes(t)) score += 2;
      else {
        score = -1;
        break;
      }
    }
    if (score >= 0) scored.push({ ...e, score });
  }
  scored.sort((a, b) => b.score - a.score || a.term.localeCompare(b.term, 'zh'));
  return scored.slice(0, limit);
}

/** @returns {number} */
export function glossaryCount() {
  return Object.keys(GLOSSARY).length;
}
