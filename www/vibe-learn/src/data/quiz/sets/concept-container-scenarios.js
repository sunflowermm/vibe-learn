import { defineQuizSet } from '../schema.js';

/**
 * 容器场景：本机开发栈、XRK Redis、排障、安全与选型。
 * 名词/单命令见 concept-container、docker-cmd、compose-kw。
 */
export default defineQuizSet({
  id: 'concept-container-scenarios',
  title: '场景 · 容器与 Compose 实务',
  kind: 'concept',
  domain: 'ops',
  tags: ['Docker', 'Compose', '场景', 'XRK'],
  relatedNodes: ['ops-docker', 'ops-compose', 'ops-container'],
  caption: '起 Redis、连服务名、挂卷、别把密钥 bake 进镜像——能动手验收。',
  questions: [
    {
      id: 'concept-container-scenarios:xrk-redis',
      q: '本仓开发机用 Docker 起 Redis 给 XRK-AGT 用，较稳妥的心态？',
      choices: [
        {
          t: 'Compose/run 起 Redis 并映射端口；主服连 localhost:映射口或配置里的主机，密钥与 yaml 仍走本仓配置体系',
          ok: true,
          why: '容器只交付 Redis 进程；Runtime 仍读 redis.yaml / 环境，不是「装上就不用配」。',
        },
        {
          t: '有了 Redis 容器就不必再配 redis.yaml，框架会魔法发现',
          ok: false,
          why: '连接串、密码、是否 fail-fast 仍在配置里。',
        },
        {
          t: '必须把整个 XRK 主服也打进同一镜像才能连 Redis',
          ok: false,
          why: '常见是宿主机 Node + 容器 Redis。',
        },
        {
          t: 'Redis 数据应只写容器可写层，方便每次重建清空',
          ok: false,
          why: '要留数据就挂卷；演示可 --rm，生产勿裸可写层。',
        },
      ],
      relatedNodes: ['ops-docker', 'xrk-database', 'xrk-deploy-env'],
    },
    {
      id: 'concept-container-scenarios:svc-dns',
      q: 'Compose 里 app 服务连 redis 服务，连接串主机名怎么写？',
      choices: [
        {
          t: '同一 compose 网络内用服务名（如 redis）作主机名；在宿主机调试则常用 127.0.0.1:映射端口',
          ok: true,
          why: '容器 DNS 解析服务名；宿主机默认不在 compose 网络里。',
        },
        {
          t: '两边都必须写死同一个公网 IP',
          ok: false,
          why: '本地编排用服务名更稳。',
        },
        {
          t: '服务名在宿主机上永远能 ping 通',
          ok: false,
          why: '宿主机默认解析不了 compose 服务名。',
        },
        {
          t: '端口映射会改掉容器内监听端口号',
          ok: false,
          why: '容器内仍听原端口；映射改的是宿主侧。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-docker'],
    },
    {
      id: 'concept-container-scenarios:bind-vs-vol',
      q: '开发改代码 vs 数据库文件，挂载怎么选更贴？',
      choices: [
        {
          t: '源码常用 bind mount 热更新；数据库文件偏好 named volume，避免绑宿主路径碎一地',
          ok: true,
          why: '卷管生命周期与权限更省心；bind 适合「我就是要改这份目录」。',
        },
        {
          t: '数据库也必须 bind 到桌面文件夹才安全',
          ok: false,
          why: '桌面路径易误删、权限乱；库更宜 volume。',
        },
        {
          t: '任何挂载都会把密钥自动加密',
          ok: false,
          why: '挂载不加密；机密仍靠权限与密钥管理。',
        },
        {
          t: '有 volume 就禁止再做备份',
          ok: false,
          why: '卷防容器重建丢数据，备份仍要做。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-docker'],
    },
    {
      id: 'concept-container-scenarios:secret-bake',
      q: '构建镜像时，API Key / 数据库密码应？',
      choices: [
        {
          t: '运行时用环境变量或 secrets 注入；勿 COPY .env 进镜像层，也别写死在 Dockerfile ENV',
          ok: true,
          why: '镜像可被 pull/导出；bake 进去等于泄漏。',
        },
        {
          t: '写进 Dockerfile ENV 最方便协作',
          ok: false,
          why: '层历史可见，协作应走密钥通道。',
        },
        {
          t: '放进镜像根目录 README 即可',
          ok: false,
          why: '更易泄漏。',
        },
        {
          t: '多阶段构建会自动抹掉所有密钥，可随意 COPY',
          ok: false,
          why: '多阶段减体积，不代替密钥管理。',
        },
      ],
      relatedNodes: ['ops-docker', 'craft-security', 'data-env'],
    },
    {
      id: 'concept-container-scenarios:restart-loop',
      q: 'Compose 起栈后某服务反复 Restarting，第一刀？',
      choices: [
        {
          t: 'docker compose ps → logs 该服务 → 看退出码/健康检查/依赖是否就绪，再改配置',
          ok: true,
          why: '先取证；别一上来 prune -a --volumes。',
        },
        {
          t: '立刻 docker system prune -a --volumes',
          ok: false,
          why: '可能删掉卷数据，且仍未看到失败原因。',
        },
        {
          t: '改 Git remote 再 push',
          ok: false,
          why: '与容器重启循环无关。',
        },
        {
          t: '关掉宿主机网卡逼它恢复',
          ok: false,
          why: '过激且不对症。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-docker', 'workbench-troubleshoot'],
    },
    {
      id: 'concept-container-scenarios:depends-healthy',
      q: 'Web 容器总比 DB 先起导致连库失败，Compose 侧更贴？',
      choices: [
        {
          t: '给 DB 配健康检查，并对 Web 使用 depends_on + condition: service_healthy（或等价等待）',
          ok: true,
          why: '只 depends_on 启动顺序不够；要等「能服务」。',
        },
        {
          t: '把 Web 和 DB 打进同一个容器永远串行',
          ok: false,
          why: '反模式；一容器一进程更清晰。',
        },
        {
          t: '去掉一切健康检查，靠 sleep 60 碰运气',
          ok: false,
          why: '脆弱且难维护。',
        },
        {
          t: '禁止使用卷，失败就会自动好',
          ok: false,
          why: '与启动竞态无关。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-docker'],
    },
    {
      id: 'concept-container-scenarios:nginx-front',
      q: '生产「Nginx + 容器里的 Node」常见落法？',
      choices: [
        {
          t: 'Nginx（或其它反代）在边缘做 TLS/路由；Node 容器只听内网/本机端口，不直接裸奔公网 80',
          ok: true,
          why: '容器管应用环境；反代管入口——两层，见网络章 Nginx。',
        },
        {
          t: '有容器就不必反代，直接 -p 443:443 挂证书进每个业务容器',
          ok: false,
          why: '证书与路由集中在边缘更省事、更安全。',
        },
        {
          t: 'Nginx 必须装进每一个业务镜像才合法',
          ok: false,
          why: '常是独立网关容器或宿主 Nginx。',
        },
        {
          t: '反代能让容器自动获得不同 Linux 内核',
          ok: false,
          why: '反代不改变内核共享模型。',
        },
      ],
      relatedNodes: ['ops-docker', 'net-nginx', 'ops-container'],
    },
    {
      id: 'concept-container-scenarios:nonroot',
      q: 'Dockerfile 里长期以 root 跑业务进程，主要风险？',
      choices: [
        {
          t: '容器被攻破时权限面更大；宜 USER 非特权用户，并配合只读根文件系统等加固',
          ok: true,
          why: '最小权限；听 80 可交给反代或 capability，不必业务永久 root。',
        },
        {
          t: 'root 一定更快，大厂容器都强制 root',
          ok: false,
          why: '性能与是否 root 无必然关系。',
        },
        {
          t: '只要镜像有 HEALTHCHECK 就可以永远 root',
          ok: false,
          why: '健康检查不缩小权限面。',
        },
        {
          t: '非 root 用户无法使用 volume',
          ok: false,
          why: '注意权限即可，不是禁止。',
        },
      ],
      relatedNodes: ['ops-docker', 'craft-security'],
    },
    {
      id: 'concept-container-scenarios:node-context',
      q: '给 Node 服务写 Dockerfile，构建慢且镜像巨大，优先查？',
      choices: [
        {
          t: '.dockerignore 是否排除 node_modules/.git；是否多阶段只拷产物；层缓存是否先拷 package 再装依赖',
          ok: true,
          why: '上下文太大与层顺序差是高频原因。',
        },
        {
          t: '必须把整个宿主机磁盘 COPY 进镜像才完整',
          ok: false,
          why: '上下文应尽量小。',
        },
        {
          t: '关掉多阶段，把编译器留在最终镜像更省事也更小',
          ok: false,
          why: '编译器留最终镜像通常更大。',
        },
        {
          t: '用 :latest 标签可以自动减小体积',
          ok: false,
          why: '标签不管体积；还引入漂移。',
        },
      ],
      relatedNodes: ['ops-docker', 'runtime-nodejs'],
    },
    {
      id: 'concept-container-scenarios:compose-vs-k8s',
      q: '本机多容器开发栈 vs 多机生产调度，怎么开口选型？',
      choices: [
        {
          t: 'Compose（或同类）适合本机/单机声明式编排；多机滚动、自愈、调度看 Kubernetes 等——别把名字说成同一层',
          ok: true,
          why: '见 ops-others：舞台不同，技能不自动迁移。',
        },
        {
          t: '会写 compose 就等于会运维整个 K8s 集群',
          ok: false,
          why: '概念可迁移，运维面差一个数量级。',
        },
        {
          t: '有了 K8s 就应删除一切 Dockerfile',
          ok: false,
          why: 'K8s 仍跑镜像；Dockerfile 还在。',
        },
        {
          t: 'systemd 就是 Kubernetes 的别名',
          ok: false,
          why: 'systemd 管本机服务进程，不是集群编排。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-others', 'ops-container'],
    },
    {
      id: 'concept-container-scenarios:port-clash',
      q: 'docker run -p 6379:6379 报端口已被占用，优先？',
      choices: [
        {
          t: '查宿主谁占了 6379（本机 Redis/旧容器），改映射如 6380:6379 或停冲突进程',
          ok: true,
          why: '冲突在宿主端口；容器内仍可听 6379。',
        },
        {
          t: '删掉 Dockerfile 里所有 EXPOSE',
          ok: false,
          why: 'EXPOSE 是文档性声明，不释放宿主端口。',
        },
        {
          t: '改 Git 分支名',
          ok: false,
          why: '与端口占用无关。',
        },
        {
          t: '把映射写成 -p 6379:6379:6379:6379 即可',
          ok: false,
          why: '语法无效，也不解决占用。',
        },
      ],
      relatedNodes: ['ops-docker', 'workbench-troubleshoot'],
    },
    {
      id: 'concept-container-scenarios:one-process',
      q: '把 Nginx、Node、Redis 全塞进同一个容器的主要问题？',
      choices: [
        {
          t: '难独立扩缩与排障，信号/健康检查含糊；宜一容器一主进程，用 Compose 组网',
          ok: true,
          why: '「胖容器」像迷你 VM，丢掉容器组合优势。',
        },
        {
          t: '同一容器一定更安全，因为攻击面更小',
          ok: false,
          why: '进程更多、权限更缠，攻击面常更大。',
        },
        {
          t: 'Compose 禁止定义多个 service',
          ok: false,
          why: 'Compose 正是为多 service。',
        },
        {
          t: '单容器才能使用 volume',
          ok: false,
          why: '每个 service 都可挂卷。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-container'],
    },
  ],
});
