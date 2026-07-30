import { defineQuizSet } from '../schema.js';

/**
 * 运维/面板大厂开口：容器、反代、进程守护、排障——对齐常见后端/运维一面。
 * 题源：公开运维实践共识，非爬取商业题库。
 */
export default defineQuizSet({
  id: 'interview-ops-host',
  title: '大厂 · 运维与托管',
  kind: 'interview',
  domain: 'ops',
  tags: ['容器', 'Docker', '反代', 'systemd', '排障'],
  relatedNodes: ['ops-container', 'ops-docker', 'host-systemd'],
  caption: '开口题：容器边界、反代、进程守护、日志排障——上线保命技能。',
  questions: [
    {
      q: '面试官问「容器和虚拟机差在哪」，比较稳妥的对比是？',
      choices: [
        {
          t: '容器共享宿主机内核、更轻；虚拟机带完整客户机系统，隔离更重但边界更硬',
          ok: true,
          why: '抓住内核共享 vs 完整 OS 这一核心差异，方便继续聊安全与密度。',
        },
        {
          t: '容器一定比虚拟机更安全，因为名字听起来小',
          ok: false,
          why: '隔离强度与攻击面不同；不能用「小」代替安全论证。',
        },
        {
          t: '虚拟机不能跑 Linux，只能跑 Windows',
          ok: false,
          why: '虚拟机可跑多种客户机系统，与容器是否 Linux 无关。',
        },
        {
          t: '有了容器就不需要操作系统了',
          ok: false,
          why: '容器依赖宿主机内核；镜像里仍有用户态文件系统。',
        },
      ],
    },
    {
      q: '「为什么生产环境常用反向代理（Nginx/Caddy）挡在 Node 前面」，怎么答？',
      choices: [
        {
          t: '统一 TLS、静态资源与路由；应用只听本机端口，减少公网直暴露',
          ok: true,
          why: '分层清晰：边缘处理证书与流量，应用专注业务。',
        },
        {
          t: '反代能让 JavaScript 自动变成多线程',
          ok: false,
          why: '反代不改变 Node 线程模型。',
        },
        {
          t: '有了反代就不需要域名解析（DNS）',
          ok: false,
          why: '客户端仍靠 DNS 找到入口 IP。',
        },
        {
          t: '反代的唯一作用是让页面颜色更好看',
          ok: false,
          why: '反代处理连接与转发，与视觉无关。',
        },
      ],
    },
    {
      q: '被问「服务挂了怎么自动拉起来」，systemd 相关怎么说？',
      choices: [
        {
          t: '用 unit 声明 Restart=on-failure 等策略，由 init 守护进程重启并记日志',
          ok: true,
          why: '体现进程由系统托管，而不是人工盯屏或死循环脚本硬刚。',
        },
        {
          t: '在代码里写 while(true) 重启自己就够了，不需要系统服务',
          ok: false,
          why: '进程被杀、开机自启、依赖顺序仍需要系统级管理。',
        },
        {
          t: 'systemd 只能管理图形桌面，管不了后台服务',
          ok: false,
          why: 'systemd 正是现代 Linux 服务管理的核心。',
        },
        {
          t: '只要 Docker 在跑，宿主机重启后容器一定自动全部恢复，无需配置',
          ok: false,
          why: '是否重启取决于 restart 策略与编排；不能默认「一定」。',
        },
      ],
    },
    {
      q: '「docker compose 相对单条 docker run」面试时怎么强调价值？',
      choices: [
        {
          t: '用声明式文件描述多容器、网络与卷，一键起停，环境可版本化',
          ok: true,
          why: '可复现环境是工程协作与上线一致性的关键。',
        },
        {
          t: 'compose 能让镜像体积自动变成 0 字节',
          ok: false,
          why: 'compose 编排运行关系，不魔法压缩镜像。',
        },
        {
          t: '有了 compose 就不需要镜像了',
          ok: false,
          why: 'compose 仍引用镜像；它描述的是如何跑。',
        },
        {
          t: 'compose 只适合本机玩具项目，生产绝对不能用',
          ok: false,
          why: '小规模生产也有人用；更大集群才更多转向 K8s 等。一刀切不准确。',
        },
      ],
    },
    {
      q: '线上接口超时，你第一步更可能做什么（运维向）？',
      choices: [
        {
          t: '看入口延迟与上游健康：反代/应用日志、CPU 内存、依赖服务是否抖',
          ok: true,
          why: '先分层定位「入口还是依赖」；比上来改业务逻辑更稳。',
        },
        {
          t: '立刻重写全部业务代码并强制推送生产',
          ok: false,
          why: '未定位就大改风险极高。',
        },
        {
          t: '先关掉所有日志，避免干扰排查',
          ok: false,
          why: '排障需要日志与指标；关掉等于蒙眼。',
        },
        {
          t: '只重启一次用户的浏览器，服务端问题就一定消失',
          ok: false,
          why: '服务端超时通常与客户端刷新无关。',
        },
      ],
    },
    {
      q: '「为什么不要把应用直接以 root 长期跑在公网」——安全向怎么答？',
      choices: [
        {
          t: '缩小权限面：进程被攻破时，非特权用户能限制破坏范围',
          ok: true,
          why: '最小权限是托管与容器实践的底线话术。',
        },
        {
          t: 'root 跑起来更快，大厂都这么干',
          ok: false,
          why: '性能与是否 root 无必然关系；生产忌长期 root。',
        },
        {
          t: '公网服务必须 root，否则端口 80/443 无法工作',
          ok: false,
          why: '可用能力或反代听特权端口，后端仍可用非 root。',
        },
        {
          t: '只要用了 HTTPS，用不用 root 都无所谓',
          ok: false,
          why: 'TLS 保护传输；进程权限是另一层防御。',
        },
      ],
    },
  ],
});
