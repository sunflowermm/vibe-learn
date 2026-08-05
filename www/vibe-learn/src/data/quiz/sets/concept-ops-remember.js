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
      q: '终端找可执行文件，主要查哪个环境变量？',
      choices: [
        { t: 'PATH', ok: true, why: '按目录列表搜索命令。' },
        { t: 'HOME', ok: false, why: '家目录，不找命令。' },
        { t: 'PWD', ok: false, why: '当前工作目录。' },
        { t: 'USER', ok: false, why: '用户名。' },
      ],
      relatedNodes: ['installers-path', 'terminal-worlds'],
    },
    {
      id: 'concept-ops-remember:image',
      q: 'Docker 里「镜像」对应什么？',
      choices: [
        { t: '只读模板，可起多个容器', ok: true, why: '镜像≠正在跑的进程。' },
        { t: '已在跑的唯一进程', ok: false, why: '那是容器实例。' },
        { t: '宿主机整盘快照', ok: false, why: '不是整机备份。' },
        { t: 'Git 分支的别名', ok: false, why: '无关。' },
      ],
      relatedNodes: ['ops-docker', 'ops-container'],
    },
    {
      id: 'concept-ops-remember:unit',
      q: 'systemd 里描述服务的配置文件常称？',
      choices: [
        { t: 'unit（如 .service）', ok: true, why: '声明如何启停守护。' },
        { t: 'Dockerfile', ok: false, why: '建镜像用。' },
        { t: 'package.json', ok: false, why: 'Node 包清单。' },
        { t: 'robots.txt', ok: false, why: '爬虫协议。' },
      ],
      relatedNodes: ['host-systemd'],
    },
    {
      id: 'concept-ops-remember:compose',
      q: 'docker compose 主要用什么描述多服务？',
      choices: [
        { t: '声明式 YAML 编排文件', ok: true, why: '服务/网络/卷一体。' },
        { t: '仅一条 docker run', ok: false, why: '单容器命令。' },
        { t: 'Excel 表格必填', ok: false, why: '非标准。' },
        { t: '仅 systemd unit', ok: false, why: '那是宿主机守护。' },
      ],
      relatedNodes: ['ops-compose'],
    },
    {
      id: 'concept-ops-remember:proxy',
      q: '挡在应用前统一 TLS/路由的常见组件？',
      choices: [
        { t: '反向代理', ok: true, why: 'Nginx/Caddy 等。' },
        { t: '仅浏览器插件', ok: false, why: '服务端入口。' },
        { t: '包管理器 lock', ok: false, why: '无关。' },
        { t: 'MCU 烧录器', ok: false, why: '无关。' },
      ],
      relatedNodes: ['net-nginx', 'host-tls'],
    },
    {
      id: 'concept-ops-remember:env',
      q: '本地密钥配置文件常见名？',
      choices: [
        { t: '.env', ok: true, why: '常gitignore，勿进仓。' },
        { t: 'README.md', ok: false, why: '说明文档。' },
        { t: 'LICENSE', ok: false, why: '许可。' },
        { t: 'favicon.ico', ok: false, why: '图标。' },
      ],
      relatedNodes: ['fs-dotfiles'],
    },
  ],
});
