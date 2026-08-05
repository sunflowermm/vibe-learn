import { defineQuizSet } from '../schema.js';

/** Bloom 1 · 记忆：运维术语识别（轻量，不占课核主位） */
export default defineQuizSet({
  id: 'concept-ops-remember',
  title: '术语 · 运维与环境',
  kind: 'concept',
  domain: 'ops',
  tags: ['运维', '记忆', '术语'],
  relatedNodes: ['ops-docker', 'host-systemd', 'installers-path', 'ops-compose'],
  caption: '先认得词：PATH、镜像、unit、反代——再进场景。',
  questions: [
    {
      id: 'concept-ops-remember:path',
      q: '终端要找到 `node`、`pnpm` 这类可执行文件，主要查哪个环境变量？',
      choices: [
        {
          t: 'PATH（按其中目录列表依次搜索命令名）',
          ok: true,
          why: '安装后「找不到命令」多半是 PATH 未生效。',
        },
        {
          t: 'HOME（用户家目录路径）',
          ok: false,
          why: 'HOME 指家目录，不负责搜索可执行文件。',
        },
        {
          t: 'PWD（当前工作目录）',
          ok: false,
          why: 'PWD 是 cwd；除非命令在当前目录且写了 ./，否则不靠它找全局命令。',
        },
        {
          t: 'USER（当前登录用户名）',
          ok: false,
          why: 'USER 标识身份，不提供命令搜索路径。',
        },
      ],
      relatedNodes: ['installers-path', 'terminal-worlds'],
    },
    {
      id: 'concept-ops-remember:image',
      q: 'Docker 语境里「镜像（image）」对应什么？',
      choices: [
        {
          t: '只读模板；同一镜像可启动多个容器实例',
          ok: true,
          why: '镜像≠正在跑的进程；跑起来的是容器。',
        },
        {
          t: '已经在跑、且全局只能存在一个的进程本身',
          ok: false,
          why: '那是容器实例；镜像可起多个容器。',
        },
        {
          t: '宿主机整块磁盘的完整备份快照',
          ok: false,
          why: '镜像是分层文件系统模板，不是整机备份。',
        },
        {
          t: 'Git 分支名的另一种叫法',
          ok: false,
          why: '版本控制分支与容器镜像是不同概念。',
        },
      ],
      relatedNodes: ['ops-docker', 'ops-container'],
    },
    {
      id: 'concept-ops-remember:unit',
      q: 'systemd 里描述「如何启停一个服务」的配置，常称作？',
      choices: [
        {
          t: 'unit（常见如 *.service）',
          ok: true,
          why: '声明 ExecStart、重启策略、依赖等。',
        },
        {
          t: 'Dockerfile（用来构建镜像）',
          ok: false,
          why: 'Dockerfile 属于镜像构建，不是宿主机守护配置。',
        },
        {
          t: 'package.json（Node 包与脚本清单）',
          ok: false,
          why: '那是 Node 项目清单，不是 systemd 单元。',
        },
        {
          t: 'robots.txt（爬虫抓取约定）',
          ok: false,
          why: '面向搜索引擎爬虫，与进程守护无关。',
        },
      ],
      relatedNodes: ['host-systemd'],
    },
    {
      id: 'concept-ops-remember:compose',
      q: 'docker compose 主要用什么描述多服务栈？',
      choices: [
        {
          t: '声明式 YAML 编排文件（服务 / 网络 / 卷）',
          ok: true,
          why: '一次定义多容器如何协作。',
        },
        {
          t: '仅靠一条孤立的 docker run，没有编排文件',
          ok: false,
          why: '单容器命令；多服务联调才需要 Compose。',
        },
        {
          t: '必须用 Excel 表格填写服务清单才能启动',
          ok: false,
          why: '非 Docker 标准；编排文件是 YAML。',
        },
        {
          t: '只能写 systemd unit，不能用 Compose YAML',
          ok: false,
          why: 'systemd 管宿主机守护；Compose 管容器编排。',
        },
      ],
      relatedNodes: ['ops-compose'],
    },
    {
      id: 'concept-ops-remember:proxy',
      q: '挡在应用前面、统一做 TLS 终结与路由的常见组件叫？',
      choices: [
        {
          t: '反向代理（如 Nginx / Caddy）',
          ok: true,
          why: '对外入口；后端仍是业务进程。',
        },
        {
          t: '仅浏览器扩展插件（装在客户端）',
          ok: false,
          why: '服务端入口不是浏览器插件。',
        },
        {
          t: '包管理器的 lockfile（锁定依赖版本）',
          ok: false,
          why: '锁文件管依赖复现，不做 TLS/路由。',
        },
        {
          t: '单片机烧录器（给 MCU 写固件）',
          ok: false,
          why: '硬件工具，与 Web 入口无关。',
        },
      ],
      relatedNodes: ['net-nginx', 'host-tls'],
    },
    {
      id: 'concept-ops-remember:env',
      q: '本地放密钥/环境变量、通常应被 gitignore 的配置文件常见名？',
      choices: [
        {
          t: '.env（示例用 .env.example，真密钥勿进仓）',
          ok: true,
          why: '运行时读环境；内容不应进 Git 历史。',
        },
        {
          t: 'README.md（项目说明文档，可以进仓但勿塞密钥）',
          ok: false,
          why: '说明文档可以进仓，但不该塞真实密钥。',
        },
        {
          t: 'LICENSE（开源许可法律文本，与运行时密钥无关）',
          ok: false,
          why: '法律文本，不是密钥配置。',
        },
        {
          t: 'favicon.ico（站点图标静态资源，不存放环境变量）',
          ok: false,
          why: '静态资源图标，与环境变量无关。',
        },
      ],
      relatedNodes: ['fs-dotfiles'],
    },
  ],
});
