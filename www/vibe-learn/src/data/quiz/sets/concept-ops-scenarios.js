import { defineQuizSet } from '../schema.js';

/** Bloom 3 · 应用：运维场景「你怎么做」 */
export default defineQuizSet({
  id: 'concept-ops-scenarios',
  title: '场景 · 运维落地决策',
  kind: 'concept',
  domain: 'ops',
  tags: ['运维', '场景', '应用'],
  relatedNodes: [
    'installers-path',
    'ops-docker',
    'clash',
    'host-systemd',
    'panel-run-node',
  ],
  caption: 'PATH、代理、面板、守护、磁盘——给场景选动作（.env 卫生见 git-security）。',
  questions: [
    {
      id: 'concept-ops-scenarios:node-path',
      q: '安装器显示已装好 Node，当前终端仍报「找不到命令」。优先？',
      choices: [
        {
          t: '检查 PATH 是否含 Node 目录，并新开一个终端再试',
          ok: true,
          why: '旧会话常沿用安装前的环境变量。',
        },
        {
          t: '不查 PATH，连续重装 Node 多次并指望安装器自动修好所有终端',
          ok: false,
          why: '多数是旧会话环境未刷新；应先查 PATH / 新开终端。',
        },
        {
          t: '把 node 可执行文件提交进业务 Git 仓库当依赖',
          ok: false,
          why: '勿把运行时二进制塞进源码仓。',
        },
        {
          t: '改用 UDP 协议重新下载并安装 Node',
          ok: false,
          why: '安装与 PATH 无关；也没有「UDP 装 Node」正路。',
        },
      ],
      relatedNodes: ['installers-path', 'runtime-nodejs'],
    },
    {
      id: 'concept-ops-scenarios:agent-proxy',
      q: '系统代理已开，但终端里的 Agent/CLI 仍直连外网失败。宜？',
      choices: [
        {
          t: '为该进程设置 HTTP(S)_PROXY 等代理环境变量并验证',
          ok: true,
          why: '不少 CLI 不读「系统代理」开关。',
        },
        {
          t: '认定系统代理会自动覆盖本机每一个进程，因此无需再配环境变量',
          ok: false,
          why: '终端工具常忽略系统代理，要显式环境变量。',
        },
        {
          t: '把本机代理端口与账号写进业务仓库，方便同事 clone 后直接复用',
          ok: false,
          why: '易泄密且污染仓库；代理属本机环境。',
        },
        {
          t: '关掉本机防火墙就等于已经配置好了稳定的出站代理通道',
          ok: false,
          why: '防火墙与代理是两件事。',
        },
      ],
      relatedNodes: ['clash', 'clash-port'],
    },
    {
      id: 'concept-ops-scenarios:localhost',
      q: '设置了 HTTP_PROXY 之后，访问 127.0.0.1 / localhost 开始异常。宜？',
      choices: [
        {
          t: '用 NO_PROXY 排除本机环回地址，让本地直连',
          ok: true,
          why: '环回流量被代理劫持是常见坑。',
        },
        {
          t: '强制代理必须覆盖 localhost，否则不算配好',
          ok: false,
          why: '本机 API 通常应直连，不应绕代理。',
        },
        {
          t: '先卸载并重装一遍 Node，再观察是否恢复',
          ok: false,
          why: '未对症；问题在代理范围，不在 Node 安装。',
        },
        {
          t: '把业务监听端口改成 22，问题就会消失',
          ok: false,
          why: '与 SSH 端口无关；应处理 NO_PROXY。',
        },
      ],
      relatedNodes: ['clash', 'installers-path'],
    },
    {
      id: 'concept-ops-scenarios:panel-node',
      q: '在面板上部署 Node 站点时，业务进程应怎么理解？',
      choices: [
        {
          t: '面板管入口/证书；业务仍是本机 Node 进程，要监听与保活',
          ok: true,
          why: '面板≠OS，也不替代运行时。',
        },
        {
          t: '装上面板就等于换成新操作系统，业务进程可省略',
          ok: false,
          why: '业务仍要进程在跑。',
        },
        {
          t: '面板会内置并替代 Node 运行时，不必再安装 Node',
          ok: false,
          why: '运行时仍要装；面板只帮托管。',
        },
        {
          t: '有了面板就自动免去 HTTPS / 证书配置',
          ok: false,
          why: 'TLS 仍要申请与绑定域名。',
        },
      ],
      relatedNodes: ['panel-essence', 'panel-run-node'],
    },
    {
      id: 'concept-ops-scenarios:no-panel',
      q: '没有面板时，在 Linux 上长期守护 Node 服务，常见稳妥做法？',
      choices: [
        {
          t: '写 systemd unit：开机自启、崩溃拉起、日志可查',
          ok: true,
          why: '生产守护的标准路径之一。',
        },
        {
          t: 'crontab 每分钟 kill 再 start，当作保活',
          ok: false,
          why: '粗暴、难观测，还可能打断请求。',
        },
        {
          t: '把 TLS 私钥塞进前端 www 静态目录方便反代读取',
          ok: false,
          why: '私钥绝不能进可下载静态目录。',
        },
        {
          t: '用 SSH 登录后前台挂着 node 进程，当作生产部署',
          ok: false,
          why: '断开会话进程就停，不可接受。',
        },
      ],
      relatedNodes: ['host-systemd'],
    },
    {
      id: 'concept-ops-scenarios:disk',
      q: '服务写文件失败，且 df 显示磁盘已接近或达到 100%。优先？',
      choices: [
        {
          t: '清理日志/无用镜像与缓存，必要时扩容，再确认 inode',
          ok: true,
          why: '先腾出可写空间，再谈业务改动。',
        },
        {
          t: '先重写全部业务代码，期望换一种实现就不会再占磁盘',
          ok: false,
          why: '未解决空间写满这一根因。',
        },
        {
          t: '把磁盘容量当作无限资源，继续忽略告警并照常写入',
          ok: false,
          why: '会继续写爆，服务更不稳定。',
        },
        {
          t: '只关掉防火墙规则，期望磁盘就会自动腾出可用空间',
          ok: false,
          why: '防火墙与磁盘占用无关。',
        },
      ],
      relatedNodes: ['linux-cli', 'ops-docker'],
    },
    {
      id: 'concept-ops-scenarios:tls',
      q: '证书临期，浏览器开始报证书错误。运维侧宜？',
      choices: [
        {
          t: '续期或开启自动续签，并核对域名 / SAN 是否匹配',
          ok: true,
          why: '查 ACME、面板证书与反代配置。',
        },
        {
          t: '把 443 改成 UDP 监听，绕过证书校验',
          ok: false,
          why: '协议改法不对症，也不能「绕过」过期证书。',
        },
        {
          t: '把私钥提交进 Git，方便各环境复制同一证书',
          ok: false,
          why: '私钥进仓是安全事故。',
        },
        {
          t: '只让用户清浏览器缓存，服务端证书可以不动',
          ok: false,
          why: '服务端仍过期；客户端清缓存解决不了。',
        },
      ],
      relatedNodes: ['host-tls', 'panel-essence'],
    },
    {
      id: 'concept-ops-scenarios:compose',
      q: '本机要联调「API + 数据库」多容器，Compose 扮演什么角色？',
      choices: [
        {
          t: '编排本机多服务小栈（网络、卷、依赖），不等于生产 K8s',
          ok: true,
          why: '本地开发利器；生产集群另有编排。',
        },
        {
          t: '写好 Compose 就等于已经上了生产 Kubernetes',
          ok: false,
          why: '定位与控制面都不同。',
        },
        {
          t: 'Compose 只能启动单个容器，多服务必须手写脚本',
          ok: false,
          why: '价值正在于多服务声明式编排。',
        },
        {
          t: '有了 Compose 就可以省略健康检查与就绪探针',
          ok: false,
          why: '依赖未就绪仍会踩坑；该配仍要配。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-docker'],
    },
    {
      id: 'concept-ops-scenarios:distro',
      q: '在陌生 Linux 上安装系统包，动手前应先确认？',
      choices: [
        {
          t: '发行版家族与包管理器（apt / dnf / pacman 等）',
          ok: true,
          why: '命令与仓库路径因家族而异。',
        },
        {
          t: '假定所有发行版的装包命令完全相同，直接照抄任意教程即可',
          ok: false,
          why: 'Debian 系与 RHEL 系等差异很大。',
        },
        {
          t: '先执行破坏性清理整盘数据，再开始安装系统软件包',
          ok: false,
          why: '无必要且危险；先认清发行版即可。',
        },
        {
          t: '看桌面壁纸与主题配色，就能判断该用哪种包管理器',
          ok: false,
          why: '主题可换；应以 /etc/os-release 与文档为准。',
        },
      ],
      relatedNodes: ['linux-distros', 'package-managers'],
    },
  ],
});
