/**
 * 术语表（按学习出现顺序维护）
 * brief：专业定义优先（缩写展开）→ 边界/本仓落点；少用比喻
 * also：相关节点 id，供面板跳转
 */

/** @typedef {{ term: string, brief: string, also?: string[] }} GlossaryEntry */

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
    also: ['os-essence', 'linux-cli'],
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
    also: ['installers-path', 'runtime-nodejs', 'terminal-worlds', 'xrk-deploy-env'],
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
    brief: 'IP address（IP 地址）：Internet Protocol（网际协议）层分配给主机的数字标识，用于在网络中定位主机（如 192.168.1.3）。',
    also: ['package-managers', 'lang-landscape'],
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
    brief: 'git clone：将远程 Repository（仓库）完整或浅层复制到本地磁盘，包含 .git 元数据与工作区文件。',
    also: ['git-workspace'],
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
    brief: 'Latency（延迟）：数据从发送到被接收方感知所经历的时间，常用毫秒（ms）度量；与 Bandwidth 独立影响用户体验。',
    also: ['network-basics'],
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
    brief: '给上网设备的数字门牌号（如 192.168.1.3），用来在网络层找到「哪一台主机」。',
    also: ['ip-addressing'],
  },
  subnet: {
    term: '子网 / 掩码',
    brief: 'Subnet / netmask（子网与掩码）：将 IP 地址空间划分为连续前缀的规则，用于判断通信是否在同一广播域或须经 Gateway（网关）。',
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
    brief: 'Domain name（域名）：DNS 命名空间中的层次化字符串标识（如 example.com），机器通信仍须解析为 IP 地址。',
    also: ['dns-https'],
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
    brief: 'Forward proxy（正向代理）：部署在客户端侧、代客户端访问外部目标的代理；Clash 等代理引擎更接近此角色。',
    also: ['reverse-proxy', 'net-edge-practice', 'clash'],
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

  /* —— 第四章 · Stream / AI —— */
  ai_workflow: {
    term: 'AiWorkflow',
    brief: 'AiWorkflow：XRK 对话工作流基类，组装上下文、调用 Large Language Model（大语言模型，LLM）并通过 Tool Calling 执行 MCP 工具。',
    also: ['xrk-stream', 'ai-mcp'],
  },
  stream_wf: {
    term: 'stream / streams',
    brief: 'stream / streams：对话请求中选定的工作流名白名单，用于限制本轮可调用的工具集合。',
    also: ['xrk-stream'],
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
    brief: 'Self-Attention（自注意力）：序列中各位置按可学习权重聚合全局信息的机制，是 Transformer 的核心计算单元。',
    also: ['ai-transformer'],
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
    also: ['ai-what', 'ai-tool-calling', 'ai-subagent'],
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
    brief: 'Tool Calling（工具调用）：Function Calling 的泛化术语，使用 tools / tool_calls 字段；模型生成调用意图，宿主应用负责执行与回传结果。',
    also: ['ai-tool-calling', 'ai-mcp', 'xrk-stream'],
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
    brief: 'Agent Skills：按需加载的流程与规范包（SKILL.md 及可选脚本/参考），仅在相关任务时展开以节省上下文窗口。',
    also: ['ai-skills'],
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
    brief: 'AGENTS.md：面向编程 Agent 的项目说明文档（技术栈、命令、边界）；多种 AI 工具均可读取。',
    also: ['ai-agents-md', 'xrk-overview'],
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
  system_proxy: {
    term: '系统代理',
    brief: 'System proxy（系统代理）：操作系统登记的 HTTP/HTTPS 代理地址，浏览器等常自动读取；终端与 Coding Agent 往往不读取，需单独配置环境变量。',
    also: ['clash-port', 'clash-setup', 'forward_proxy'],
  },
  http_proxy_env: {
    term: 'HTTP(S)_PROXY 环境变量',
    brief: 'HTTP_PROXY / HTTPS_PROXY（环境变量）：告知进程出网经哪个代理地址的跨平台约定；CI、CLI 与 Agent 常用。',
    also: ['clash-port', 'forward_proxy'],
  },
  no_proxy: {
    term: 'NO_PROXY',
    brief: 'NO_PROXY：列出不经代理的主机名、域名或 CIDR（如 localhost、内网段），与强制代理配套使用。',
    also: ['clash-port', 'routing-nat'],
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
    term: 'CIDR',
    brief: 'Classless Inter-Domain Routing（无类域间路由，CIDR）：以「网络地址/前缀长度」表示网段（如 10.0.0.0/24），用于路由表、安全组与 Virtual Private Cloud（VPC）。',
    also: ['ip-addressing', 'routing-nat'],
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
    brief: 'Private IP address（私有 IP 地址）：RFC 1918 等保留的内网地址段（如 192.168.0.0/16），不可在公网路由；出公网须经 NAT。',
    also: ['ip-addressing', 'routing-nat'],
  },
  status_code: {
    term: 'HTTP 状态码',
    brief: 'HTTP status code（HTTP 状态码）：响应中的三位数字状态（2xx 成功、4xx 客户端错误、5xx 服务端错误，如 404、502）。',
    also: ['http-web', 'reverse-proxy'],
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
