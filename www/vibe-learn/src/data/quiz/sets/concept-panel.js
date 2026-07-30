import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-panel-host',
  title: '概念 · 面板、证书与备份',
  kind: 'concept',
  domain: 'ops',
  tags: ['运维', '面板', 'TLS'],
  relatedNodes: [
    'panel-essence',
    'panel-baota',
    'panel-1panel',
    'panel-compare',
    'panel-run-node',
    'host-tls',
    'host-backup',
    'host-systemd',
  ],
  questions: [
    {
      q: '使用宝塔、1Panel 等主机运维面板，主要降低的是什么？',
      choices: [
        {
          t: '日常操作门槛，但不替代理解端口、权限与备份',
          ok: true,
          why: '面板是图形壳；出故障仍要懂底层命令与日志。',
        },
        {
          t: '可以永远不懂端口是什么，面板会替你思考',
          ok: false,
          why: '防火墙、反代、证书验证都依赖端口；不懂无法排障。',
        },
        {
          t: '面板本身就等于 Linux 或 Windows 操作系统内核',
          ok: false,
          why: '面板是跑在 OS 上的管理程序，不是操作系统本体。',
        },
        {
          t: '有了面板就不需要 systemd 或任何进程守护',
          ok: false,
          why: '面板常底层仍用 systemd/supervisor 保活服务。',
        },
      ],
    },
    {
      q: '申请 Let\'s Encrypt 免费 HTTPS 证书时，最常见的失败原因是什么？',
      choices: [
        {
          t: '域名 DNS 未指到本机，或 80 端口未对公网放行',
          ok: true,
          why: 'HTTP-01 验证要让 CA 能访问你机器；DNS 与防火墙都要通。',
        },
        {
          t: 'Let\'s Encrypt 必须付费购买，免费渠道不存在',
          ok: false,
          why: 'Let\'s Encrypt 是公益 CA，证书免费，但要满足验证条件。',
        },
        {
          t: 'Node.js 应用必须自己直接监听 443 端口才能申请',
          ok: false,
          why: '常见做法是由 Nginx/Caddy 等反代终止 TLS，应用听本机端口即可。',
        },
        {
          t: '只要买了域名，不解析 DNS 也会自动签发证书',
          ok: false,
          why: 'CA 要验证你对域名的控制权；DNS 不指向就无法完成验证。',
        },
      ],
    },
    {
      q: '备份策略只备份 Docker 容器层、不管数据卷，这样够吗？',
      choices: [
        {
          t: '不够：数据库与上传文件常在卷里，漏卷等于丢数据',
          ok: true,
          why: '容器可重建，卷里才是持久数据；备份必须覆盖卷或库导出。',
        },
        {
          t: '完全足够，容器层里一定有全部业务数据',
          ok: false,
          why: '最佳实践把数据放卷；容器层随重建而清空。',
        },
        {
          t: '数据卷会自动打包进镜像，无需单独备份',
          ok: false,
          why: '卷与镜像是分开的；commit 镜像不会自动包含卷内容。',
        },
        {
          t: '不备份反而更安全，因为黑客找不到备份文件',
          ok: false,
          why: '无备份无法在误删、勒索或磁盘故障时恢复，风险更大。',
        },
      ],
    },
    {
      q: '在没有图形面板的 Linux 服务器上，systemd 的主要价值是什么？',
      choices: [
        {
          t: '声明服务如何启动、崩溃后是否拉起、是否开机自启',
          ok: true,
          why: 'systemd unit 是现代 Linux 上管理守护进程的标准方式。',
        },
        {
          t: '替代域名系统（DNS）做全球域名解析',
          ok: false,
          why: 'DNS 是网络基础设施；systemd 管本机服务生命周期。',
        },
        {
          t: '自动替你编写业务插件与 HTTP 接口代码',
          ok: false,
          why: 'systemd 只管进程，不生成应用逻辑。',
        },
        {
          t: '只要写了 unit 文件，应用就不需要看日志排障',
          ok: false,
          why: '自启只解决进程在不在；bug 仍要靠 journalctl 与应用日志查。',
        },
      ],
    },
    {
      q: '在面板上部署 Node.js 项目，上线前仍要确认哪些关键项？',
      choices: [
        {
          t: '工作目录、Node 版本、监听端口与反向代理是否正确指向',
          ok: true,
          why: '面板一键启动也常因路径或版本不一致而 502；这几项必查。',
        },
        {
          t: '只要点了「启动」按钮，永远不需要看运行日志',
          ok: false,
          why: '启动失败、端口冲突、依赖缺失都要靠日志定位。',
        },
        {
          t: '禁止使用 pm2/systemd 等任何进程管理方式',
          ok: false,
          why: '生产环境仍需守护进程；面板往往底层就用它们保活。',
        },
        {
          t: 'Node 版本随便用，与 package.json engines 无关',
          ok: false,
          why: '版本不匹配会导致原生模块或语法报错，CI 与本机也会不一致。',
        },
      ],
    },
    {
      q: '在宝塔与 1Panel 之间做选型时，更应优先比较什么？',
      choices: [
        {
          t: '维护成本、Docker 亲和度、团队熟悉度与社区文档',
          ok: true,
          why: '面板是长期工具；顺手的比「功能列表最长」更重要。',
        },
        {
          t: '仅比较登录页 Logo 动画是否炫酷',
          ok: false,
          why: '动画与稳定性、备份、证书续期能力无直接关系。',
        },
        {
          t: '哪个安装包更接近操作系统内核源码',
          ok: false,
          why: '二者都是用户态管理面板，都不「更靠近内核」。',
        },
        {
          t: '选面板后可以把管理口暴露公网且不设密码',
          ok: false,
          why: '管理口必须限 IP 或强鉴权；公网裸奔极易被扫爆。',
        },
      ],
    },
  ],
});
