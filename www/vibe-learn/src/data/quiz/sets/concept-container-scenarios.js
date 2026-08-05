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
          t: '有了 Redis 容器后就不必再配 redis.yaml：框架会自动魔法发现连接串、密码、DB 序号与失败策略，密钥通道也可省略',
          ok: false,
          why: '连接串、密码、是否 fail-fast 仍在配置里。',
        },
        {
          t: '必须把整个 XRK 主服也打进与 Redis 同一镜像里一起跑，否则宿主机上的 Node 进程永远连不上容器 Redis',
          ok: false,
          why: '常见是宿主机 Node + 容器 Redis，靠端口映射与配置连接。',
        },
        {
          t: 'Redis 持久数据应只写容器可写层，方便每次重建镜像或容器时一并清空；挂 named volume 反而多余且不安全',
          ok: false,
          why: '要留数据就挂卷；演示可 --rm，生产勿裸可写层当持久化。',
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
          t: 'app 与 redis 两边都必须写死同一个公网 IP；即便在同一 compose 网络里也绝不使用服务名解析',
          ok: false,
          why: '本地编排用服务名更稳；公网 IP 不是 compose 默认路径。',
        },
        {
          t: '只要 compose 里声明了服务名，宿主机终端也永远能 ping 通该名字，不必再做端口映射就能调试',
          ok: false,
          why: '宿主机默认解析不了 compose 服务名；调试常用映射端口。',
        },
        {
          t: '做了端口映射之后，容器内监听端口号也会被改成宿主侧的映射端口，应用配置要跟着改监听口',
          ok: false,
          why: '容器内仍听原端口；映射改的是宿主侧入口。',
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
          t: '数据库文件也必须 bind 到桌面文件夹才安全；named volume 反而更危险、更难备份与跨机迁移',
          ok: false,
          why: '桌面路径易误删、权限乱；库更宜 volume。',
        },
        {
          t: '只要声明了任意挂载，密钥就会被自动加密，不必再管文件权限、密钥通道或密钥轮换流程',
          ok: false,
          why: '挂载本身不加密；机密仍靠权限与密钥管理。',
        },
        {
          t: '一旦用了 named volume，就禁止再做备份或导出，否则会破坏卷一致性并导致数据损坏不可恢复',
          ok: false,
          why: '卷防容器重建丢数据，备份与导出仍要做。',
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
          t: '写进 Dockerfile ENV 最方便协作：同事 pull 镜像后就能直接连生产库，不必另配密钥注入通道',
          ok: false,
          why: '层历史可见，协作应走密钥通道而非 bake。',
        },
        {
          t: '放进镜像根目录 README 或示例配置即可；构建上下文里明文共享密钥对团队协作最省事',
          ok: false,
          why: '更易随镜像泄漏；密钥不应进镜像层。',
        },
        {
          t: '多阶段构建会自动抹掉所有密钥痕迹，因此可以随意 COPY .env 进任意阶段且无需再审计层历史',
          ok: false,
          why: '多阶段减体积，不代替密钥管理；COPY 仍可能进层。',
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
          t: '立刻 docker system prune -a --volumes，清掉一切后再碰运气重启整栈',
          ok: false,
          why: '可能删掉卷数据，且仍未看到失败原因。',
        },
        {
          t: '先改 Git remote 再 push 一次，指望远程变更自动修好本机重启循环',
          ok: false,
          why: '与容器重启循环无关；应先看 logs/退出码。',
        },
        {
          t: '关掉宿主机网卡或禁用 Docker 网络，用断网方式逼服务「恢复正常」',
          ok: false,
          why: '过激且不对症；先取证配置与依赖就绪。',
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
          t: '把 Web 和 DB 打进同一个容器永远串行启动，彻底取消多 service 编排、健康检查、depends_on 与就绪等待',
          ok: false,
          why: '反模式；一容器一进程更清晰，应用 Compose 组网。',
        },
        {
          t: '去掉一切健康检查，只在 Web 入口脚本里写死 sleep 60 碰运气等库就绪，然后再盲目发起数据库连接重试',
          ok: false,
          why: '脆弱且难维护；应等健康条件而非盲等。',
        },
        {
          t: '禁止使用任何卷挂载，并认为去掉卷之后 Web 抢先连库的启动竞态就会自动消失、也无需任何就绪等待',
          ok: false,
          why: '与启动竞态无关；要解决的是就绪等待。',
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
          t: '有容器就不必反代：直接 -p 443:443 把证书挂进每一个业务容器，各自对外终止 TLS 并做路由',
          ok: false,
          why: '证书与路由集中在边缘更省事、更安全。',
        },
        {
          t: 'Nginx 必须装进每一个业务镜像才合法；独立网关容器或宿主 Nginx 一律不算合格生产形态',
          ok: false,
          why: '常是独立网关容器或宿主 Nginx，不必塞进业务镜像。',
        },
        {
          t: '加上反代之后，容器会自动获得与宿主机不同的 Linux 内核，隔离模型与权限边界也会一并升级',
          ok: false,
          why: '反代不改变内核共享模型；只管入口流量。',
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
          t: 'root 一定更快，大厂容器都强制以 root 跑业务以换取性能',
          ok: false,
          why: '性能与是否 root 无必然关系；风险在权限面。',
        },
        {
          t: '只要镜像声明了 HEALTHCHECK，就可以长期以 root 跑而不必降权',
          ok: false,
          why: '健康检查不缩小权限面。',
        },
        {
          t: '非 root 用户无法挂载或使用 volume，所以业务进程只能永久 root',
          ok: false,
          why: '注意权限映射即可，不是禁止非 root 用卷。',
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
          t: '必须把整个宿主机磁盘 COPY 进镜像才算完整；构建上下文越大，依赖安装速度、层缓存命中率与构建可复现性反而都越稳妥可靠',
          ok: false,
          why: '上下文应尽量小；大上下文又慢又肥。',
        },
        {
          t: '关掉多阶段构建，把编译器、测试工具链、调试符号与完整业务源码一齐留在最终镜像，更省事且最终镜像更小',
          ok: false,
          why: '编译器留最终镜像通常更大，不是更小。',
        },
        {
          t: '只要基础镜像打上 :latest 标签，体积就会自动减小，依赖版本也不会再出现漂移、缓存失效、不可复现或不稳定',
          ok: false,
          why: '标签不管体积；:latest 还引入漂移风险。',
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
          t: '会写 docker compose 文件，就等于已经会运维整套 Kubernetes 生产集群、滚动发布与自愈策略',
          ok: false,
          why: '概念可迁移，运维面差一个数量级。',
        },
        {
          t: '上了 Kubernetes 之后就应删除一切 Dockerfile；集群调度起来之后不再需要镜像构建与分层缓存',
          ok: false,
          why: 'K8s 仍跑镜像；Dockerfile 与镜像构建还在。',
        },
        {
          t: 'systemd 就是 Kubernetes 的别名：本机服务管理与多机集群编排、滚动自愈本质上是同一层能力',
          ok: false,
          why: 'systemd 管本机服务进程，不是集群编排层。',
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
          t: '删掉 Dockerfile 里所有 EXPOSE 声明，以为这样就能释放宿主 6379',
          ok: false,
          why: 'EXPOSE 是文档性声明，不释放宿主端口。',
        },
        {
          t: '把本地 Git 分支改个名字再重新构建，指望分支名变化能解除端口占用',
          ok: false,
          why: '与端口占用无关；应查宿主占用进程。',
        },
        {
          t: '把映射写成 -p 6379:6379:6379:6379 这种加长写法即可绕过占用',
          ok: false,
          why: '语法无效，也不解决宿主端口已被占用。',
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
          t: '同一容器一定更安全，因为进程挤在一起时攻击面反而更小',
          ok: false,
          why: '进程更多、权限更缠，攻击面常更大。',
        },
        {
          t: 'Compose 禁止定义多个 service，所以只能把所有进程塞进一个容器',
          ok: false,
          why: 'Compose 正是为多 service 组网设计的。',
        },
        {
          t: '只有单容器形态才能声明 volume，多 service 编排无法挂载任何卷',
          ok: false,
          why: '每个 service 都可挂卷；与是否单容器无关。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-container'],
    },
  ],
});
