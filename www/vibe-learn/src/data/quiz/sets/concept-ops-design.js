import { defineQuizSet } from '../schema.js';

/** Bloom 6 · 创造（MCQ 近似）：哪组步骤/设计组合有效 */
export default defineQuizSet({
  id: 'concept-ops-design',
  title: '设计 · 运维步骤组合',
  kind: 'concept',
  domain: 'ops',
  tags: ['运维', '设计', '步骤组合'],
  relatedNodes: [
    'ops-compose',
    'host-systemd',
    'host-tls',
    'ops-docker',
    'clash',
  ],
  caption: '选合法步骤组合：上线、排障、密钥与代理——创造层 MCQ 近似。',
  questions: [
    {
      id: 'concept-ops-design:local-stack',
      q: '本机 API+Redis 联调，哪组步骤更完整？',
      choices: [
        {
          t: 'Compose 起服务→挂卷/健康检查→应用连服务名或映射口',
          ok: true,
          why: '编排+就绪+连接串一致。',
        },
        {
          t: '只 docker run 一次→跳过网络→密钥 bake 进镜像',
          ok: false,
          why: '缺编排与密钥安全。',
        },
        {
          t: '删掉 lock→混用三包管理器→提交 .env',
          ok: false,
          why: '锁与密钥全错。',
        },
        {
          t: 'SSH 前台跑→私钥放 www→永不备份',
          ok: false,
          why: '生产反模式。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-docker'],
    },
    {
      id: 'concept-ops-design:bare-metal',
      q: '无面板 Linux 上线 Node，哪组更稳？',
      choices: [
        {
          t: '装运行时→systemd unit→反代 TLS→备份演练',
          ok: true,
          why: '进程、入口、恢复齐。',
        },
        {
          t: '仅 crontab 杀起→跳过 TLS→备份进公开仓',
          ok: false,
          why: '守护与安全都差。',
        },
        {
          t: 'MCU 上跑 Runtime→关日志→latest 镜像',
          ok: false,
          why: '职责错位。',
        },
        {
          t: '格式化磁盘→不写 unit→明文密钥进 Git',
          ok: false,
          why: '不可接受。',
        },
      ],
      relatedNodes: ['host-systemd', 'host-tls', 'host-backup'],
    },
    {
      id: 'concept-ops-design:proxy-cli',
      q: '终端 Agent 要稳定走代理，哪组正确？',
      choices: [
        {
          t: '设代理环境变量→NO_PROXY 排除本机→验证',
          ok: true,
          why: '进程代理+环回例外。',
        },
        {
          t: '只开系统代理→认定 CLI 必跟随→提交密钥',
          ok: false,
          why: 'CLI 常不跟且泄密。',
        },
        {
          t: '关防火墙→删掉 Node→改成 UDP 443 端口',
          ok: false,
          why: '未对症。',
        },
        {
          t: '代理写死进仓→强制覆盖 localhost→不验',
          ok: false,
          why: '危险且易环回坏。',
        },
      ],
      relatedNodes: ['clash', 'clash-setup'],
    },
    {
      id: 'concept-ops-design:incident',
      q: '线上超时+磁盘告警，哪组排查顺序更合理？',
      choices: [
        {
          t: '看入口/依赖健康→查磁盘与日志→再改业务',
          ok: true,
          why: '先分层定位。',
        },
        {
          t: '立刻全量重写业务→关日志→推生产',
          ok: false,
          why: '未定位大改。',
        },
        {
          t: '只清浏览器缓存→忽略服务端',
          ok: false,
          why: '层不对。',
        },
        {
          t: '删备份→提交私钥→升 latest',
          ok: false,
          why: '雪上加霜。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'linux-cli'],
    },
    {
      id: 'concept-ops-design:image-sec',
      q: '生产镜像与密钥，哪组设计合规？',
      choices: [
        {
          t: '钉 digest→非 root USER→运行时注入密钥',
          ok: true,
          why: '可复现+最小权限+密钥外置。',
        },
        {
          t: 'latest→root 跑→密钥 bake 进层',
          ok: false,
          why: '三项全踩雷。',
        },
        {
          t: '随机 tag→世界可读私钥→无健康检查',
          ok: false,
          why: '不可接受。',
        },
        {
          t: '把 node_modules 当镜像唯一层且含 .env',
          ok: false,
          why: '密钥与体积双问题。',
        },
      ],
      relatedNodes: ['ops-docker', 'craft-security'],
    },
    {
      id: 'concept-ops-design:panel',
      q: '面板部署站点，哪组理解正确？',
      choices: [
        {
          t: '配反代/证书→启业务进程→核端口与日志',
          ok: true,
          why: '面板管入口，业务仍是进程。',
        },
        {
          t: '装面板即 OS→无需进程→免 HTTPS',
          ok: false,
          why: '三重误解。',
        },
        {
          t: '私钥放前端→SSH 前台跑→永不备份',
          ok: false,
          why: '反模式。',
        },
        {
          t: '用 ESP32 替代反代与证书',
          ok: false,
          why: '职责错位。',
        },
      ],
      relatedNodes: ['panel-essence', 'panel-run-node', 'host-tls'],
    },
  ],
});
