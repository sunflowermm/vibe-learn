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
  relatedNodes: ['ops-container', 'ops-docker', 'ops-compose', 'host-systemd'],
  caption: '开口：容器边界、Compose、反代、守护与排障——上线保命。',
  questions: [
    {
      id: 'interview-ops-host:vs-vm',
      q: '面试官问「容器和虚拟机差在哪」，比较稳妥的对比是？',
      choices: [
        {
          t: '容器共享宿主机内核、更轻；虚拟机带完整客户机系统，隔离更重但边界更硬',
          ok: true,
          why: '抓住内核共享 vs 完整 OS，方便继续聊安全与密度。',
        },
        {
          t: '容器一定比虚拟机更安全，因为名字听起来小',
          ok: false,
          why: '隔离强度与攻击面不同；不能用「小」代替安全论证。',
        },
        {
          t: '虚拟机不能跑 Linux，只能跑 Windows',
          ok: false,
          why: '虚拟机可跑多种客户机系统。',
        },
        {
          t: '有了容器就不需要操作系统了',
          ok: false,
          why: '容器依赖宿主机内核；镜像里仍有用户态。',
        },
      ],
      relatedNodes: ['ops-container'],
    },
    {
      id: 'interview-ops-host:compose',
      q: '「docker compose 相对单条 docker run」面试时怎么强调价值？',
      choices: [
        {
          t: '用声明式文件描述多容器、网络与卷，一键起停，环境可版本化',
          ok: true,
          why: '可复现环境是协作与上线一致性的关键。',
        },
        {
          t: 'compose 能让镜像体积自动变成 0 字节',
          ok: false,
          why: '编排运行关系，不魔法压缩镜像。',
        },
        {
          t: '有了 compose 就不需要镜像了',
          ok: false,
          why: '仍引用镜像；描述的是如何跑。',
        },
        {
          t: 'compose 只适合本机玩具，生产绝对不能用',
          ok: false,
          why: '小规模生产也有人用；更大集群才更多转向 K8s。',
        },
      ],
      relatedNodes: ['ops-compose'],
    },
    {
      id: 'interview-ops-host:ephemeral',
      q: '被问「容器是易失的」时，数据与状态怎么开口？',
      choices: [
        {
          t: '把容器当可丢弃计算单元；持久状态外挂卷/托管库，配置与密钥走注入而非 bake 进镜像',
          ok: true,
          why: '重建/扩缩才安全；状态与计算分离是核心话术。',
        },
        {
          t: '重要数据只写容器可写层，重建后靠 docker history 恢复',
          ok: false,
          why: '可写层随容器丢；history 不是备份。',
        },
        {
          t: '易失意味着禁止使用任何数据库',
          ok: false,
          why: '库跑在挂卷的容器或托管服务上即可。',
        },
        {
          t: '只要打了 tag 就不会丢运行时写入',
          ok: false,
          why: 'tag 钉的是镜像，不是容器可写层。',
        },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
    },
    {
      id: 'interview-ops-host:proxy',
      q: '「为什么生产常用反向代理挡在 Node/容器前面」，怎么答？',
      choices: [
        {
          t: '统一 TLS、静态与路由；应用只听本机/内网端口，减少公网直暴露',
          ok: true,
          why: '边缘处理证书与流量，应用专注业务。',
        },
        {
          t: '反代能让 JavaScript 自动变成多线程',
          ok: false,
          why: '不改变 Node 线程模型。',
        },
        {
          t: '有了反代就不需要 DNS',
          ok: false,
          why: '客户端仍靠 DNS 找入口。',
        },
        {
          t: '反代的唯一作用是让页面更好看',
          ok: false,
          why: '处理连接与转发，与视觉无关。',
        },
      ],
      relatedNodes: ['net-nginx', 'ops-docker'],
    },
    {
      id: 'interview-ops-host:systemd',
      q: '被问「服务挂了怎么自动拉起来」，systemd 相关怎么说？',
      choices: [
        {
          t: '用 unit 声明 Restart=on-failure 等策略，由 init 守护并记日志',
          ok: true,
          why: '进程由系统托管；容器侧则谈 restart 策略，别混成一句话。',
        },
        {
          t: '在代码里 while(true) 重启自己就够了',
          ok: false,
          why: '被杀、开机自启、依赖顺序仍要系统级管理。',
        },
        {
          t: 'systemd 只能管图形桌面',
          ok: false,
          why: '正是现代 Linux 服务管理核心。',
        },
        {
          t: '只要 Docker 在，宿主机重启后容器一定全自动恢复、无需配置',
          ok: false,
          why: '取决于 restart 策略与编排，不能默认「一定」。',
        },
      ],
      relatedNodes: ['host-systemd', 'ops-docker'],
    },
    {
      id: 'interview-ops-host:timeout',
      q: '线上接口超时，运维向第一步更可能？',
      choices: [
        {
          t: '看入口延迟与上游健康：反代/应用日志、CPU 内存、依赖（含容器）是否抖',
          ok: true,
          why: '先分层定位入口还是依赖，再改业务。',
        },
        {
          t: '立刻重写全部业务并强制推生产',
          ok: false,
          why: '未定位就大改风险极高。',
        },
        {
          t: '先关掉所有日志',
          ok: false,
          why: '排障需要日志与指标。',
        },
        {
          t: '只重启用户浏览器，服务端问题一定消失',
          ok: false,
          why: '服务端超时通常与客户端刷新无关。',
        },
      ],
      relatedNodes: ['workbench-troubleshoot', 'ops-docker'],
    },
    {
      id: 'interview-ops-host:nonroot',
      q: '「为什么不要让业务长期以 root 跑」——怎么答？',
      choices: [
        {
          t: '缩小权限面：被攻破时非特权用户能限制破坏范围（容器里同理 USER）',
          ok: true,
          why: '最小权限是托管与容器实践底线。',
        },
        {
          t: 'root 一定更快，大厂都这么干',
          ok: false,
          why: '性能与是否 root 无必然关系。',
        },
        {
          t: '公网服务必须 root，否则 80/443 无法工作',
          ok: false,
          why: '可用反代听特权端口，后端非 root。',
        },
        {
          t: '只要 HTTPS，用不用 root 都无所谓',
          ok: false,
          why: 'TLS 管传输；进程权限是另一层。',
        },
      ],
      relatedNodes: ['craft-security', 'ops-docker'],
    },
  ],
});