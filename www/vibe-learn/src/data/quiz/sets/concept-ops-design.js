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
      q: '本机 API + Redis 联调，哪组步骤更完整？',
      choices: [
        {
          t: 'Compose 起服务→挂卷/健康检查→应用连服务名或映射口',
          ok: true,
          why: '编排 + 就绪 + 连接串一致。',
        },
        {
          t: '只 docker run 一次→跳过网络配置→密钥 bake 进镜像',
          ok: false,
          why: '缺编排与密钥安全。',
        },
        {
          t: '删掉 lockfile→混用三种包管理器→提交真实 .env',
          ok: false,
          why: '锁与密钥全错。',
        },
        {
          t: 'SSH 前台跑进程→私钥放 www→宣称永不需要备份',
          ok: false,
          why: '生产反模式组合。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-docker'],
    },
    {
      id: 'concept-ops-design:bare-metal',
      q: '无面板的 Linux 上线 Node，哪组更稳？',
      choices: [
        {
          t: '装运行时→systemd unit→反代 TLS→备份并演练恢复',
          ok: true,
          why: '进程、入口、恢复三条齐。',
        },
        {
          t: '仅靠 crontab 杀起→跳过 TLS→把备份推到公开仓',
          ok: false,
          why: '守护与安全都差。',
        },
        {
          t: '在 MCU 上跑完整 Runtime→关掉日志→镜像一律 latest',
          ok: false,
          why: '职责错位且不可复现。',
        },
        {
          t: '清空业务数据盘当「初始化」→不写 unit→明文密钥进 Git',
          ok: false,
          why: '破坏性且泄密，不可接受。',
        },
      ],
      relatedNodes: ['host-systemd', 'host-tls', 'host-backup'],
    },
    {
      id: 'concept-ops-design:proxy-cli',
      q: '终端 Agent 要稳定走代理，哪组正确？',
      choices: [
        {
          t: '设代理环境变量→NO_PROXY 排除本机→用请求验证生效',
          ok: true,
          why: '进程代理 + 环回例外 + 验证。',
        },
        {
          t: '只开系统代理→认定所有 CLI 必跟随→把密钥提交进仓',
          ok: false,
          why: 'CLI 常不跟系统代理，且泄密。',
        },
        {
          t: '关防火墙→重装 Node→把业务端口改成 UDP 443',
          ok: false,
          why: '未对症，还引入无关改动。',
        },
        {
          t: '代理地址写死进业务仓→强制代理覆盖 localhost→不做验证',
          ok: false,
          why: '危险且易搞坏环回。',
        },
      ],
      relatedNodes: ['clash', 'clash-setup'],
    },
    {
      id: 'concept-ops-design:incident',
      q: '线上出现超时，同时磁盘告警。哪组排查顺序更合理？',
      choices: [
        {
          t: '看入口与依赖健康→查磁盘/inode 与日志→再决定是否改业务',
          ok: true,
          why: '先分层定位，避免未诊断就大改。',
        },
        {
          t: '立刻全量重写业务→关闭日志减少噪音→直接推生产',
          ok: false,
          why: '未定位就大改，还丢掉线索。',
        },
        {
          t: '只清用户浏览器缓存，并假定服务端无需检查',
          ok: false,
          why: '磁盘与超时多在服务端/依赖层。',
        },
        {
          t: '删掉现有备份腾空间→提交私钥「方便救急」→升 latest',
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
          t: '钉 digest→非 root USER→密钥运行时注入（不进镜像层）',
          ok: true,
          why: '可复现 + 最小权限 + 密钥外置。',
        },
        {
          t: '用 latest→以 root 跑→密钥 bake 进镜像层',
          ok: false,
          why: '三项全踩雷。',
        },
        {
          t: '随机 tag→私钥世界可读→不做健康检查',
          ok: false,
          why: '不可接受。',
        },
        {
          t: '把含 .env 的 node_modules 当作镜像唯一层直接发布',
          ok: false,
          why: '体积与密钥双问题。',
        },
      ],
      relatedNodes: ['ops-docker', 'craft-security'],
    },
    {
      id: 'concept-ops-design:panel',
      q: '用面板部署站点，哪组理解与步骤正确？',
      choices: [
        {
          t: '配反代与证书→启动业务进程→核对端口与日志',
          ok: true,
          why: '面板管入口，业务仍是进程。',
        },
        {
          t: '装面板即换 OS→无需业务进程→自动免 HTTPS',
          ok: false,
          why: '三重误解。',
        },
        {
          t: '私钥放前端静态目录→SSH 前台跑→永不做备份',
          ok: false,
          why: '反模式组合。',
        },
        {
          t: '用一块 ESP32 替代反代、证书与业务进程',
          ok: false,
          why: '职责与能力都错位。',
        },
      ],
      relatedNodes: ['panel-essence', 'panel-run-node', 'host-tls'],
    },
  ],
});
