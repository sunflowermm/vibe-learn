import { defineQuizSet } from '../schema.js';

/** 容器概念脊：隔离、镜像、Compose、卷、端口（命令全表见 docker-cmd；场景见 container-scenarios） */
export default defineQuizSet({
  id: 'concept-container',
  title: '概念 · 容器与 Compose',
  kind: 'concept',
  domain: 'ops',
  tags: ['Docker', 'Compose', '容器'],
  relatedNodes: ['ops-container', 'ops-docker', 'ops-compose'],
  caption: '共享内核 vs VM → 镜像/容器 → Compose/卷/端口 → 健康检查与构建卫生。',
  questions: [
    {
      id: 'concept-container:vs-vm',
      q: '容器相对传统虚拟机，直觉上最大的差别？',
      choices: [
        {
          t: '容器共享宿主内核，进程级隔离，通常更轻、启动更快',
          ok: true,
          why: 'VM 带完整客户机 OS；容器只打包应用与依赖。',
        },
        {
          t: '每个容器都必须内置一套完整独立的客户机操作系统内核',
          ok: false,
          why: '容器复用宿主内核，不是再跑一个完整 OS。',
        },
        {
          t: '容器就等于一整台物理服务器，资源无法限制',
          ok: false,
          why: '仍可设 CPU/内存限额；只是隔离粒度比 VM 轻。',
        },
        {
          t: '容器镜像 digest 变了也不影响部署可复现性',
          ok: false,
          why: 'digest 标识内容；变了说明镜像不同。',
        },
      ],
      relatedNodes: ['ops-container'],
    },
    {
      id: 'concept-container:image-vs-container',
      q: 'Docker 语境下，镜像与容器的关系更接近？',
      choices: [
        {
          t: '镜像是只读模板；容器是该模板运行起来的实例',
          ok: true,
          why: '一个镜像可启多个容器，类似类与对象。',
        },
        {
          t: '二者完全同一概念，不能分开理解',
          ok: false,
          why: '镜像是静态包，容器是运行态。',
        },
        {
          t: '容器运行时不能有任何可写文件系统层',
          ok: false,
          why: '有可读写容器层；默认不写回镜像。',
        },
        {
          t: '镜像是运行时实例，容器是打包好的只读文件',
          ok: false,
          why: '说反了：镜像模板，容器实例。',
        },
      ],
      relatedNodes: ['ops-docker', 'ops-container'],
    },
    {
      id: 'concept-container:compose-role',
      q: 'Docker Compose 适合解决哪类日常问题？',
      choices: [
        {
          t: "用一份 YAML 声明并启动多容器应用（如 Web + Redis + DB）",
          ok: true,
          why: '编排本地或小规模多服务，比手写多条 docker run 省心。',
        },
        {
          t: '替代 Git 做版本管理与代码合并，仓库历史可全部交给 Compose',
          ok: false,
          why: 'Compose 管容器生命周期，不追踪源码历史。',
        },
        {
          t: '编译 CPU 微码或刷新主板 BIOS，属于固件运维工具',
          ok: false,
          why: '与硬件固件无关。',
        },
        {
          t: '自动把管理端口暴露到公网且无需鉴权，方便远程运维',
          ok: false,
          why: '暴露端口要显式配置；公网无鉴权管理口是事故。',
        },
      ],
      relatedNodes: ['ops-compose'],
    },
    {
      id: 'concept-container:volume',
      q: '容器里重要数据要持久化，常见稳妥做法？',
      choices: [
        {
          t: '使用数据卷（Volume）或绑定挂载，不要只依赖容器可写层',
          ok: true,
          why: '删容器默认可写层会丢；库文件应外挂。',
        },
        {
          t: '只写在容器内临时可写层就足够永久保存',
          ok: false,
          why: '重建容器后可写层数据会丢。',
        },
        {
          t: '持久化意味着禁止做任何备份',
          ok: false,
          why: '卷解决重建丢数据，备份仍要做。',
        },
        {
          t: '把运行时数据 commit 进新镜像当持久化',
          ok: false,
          why: '反模式；升级与备份都更难。',
        },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
    },
    {
      id: 'concept-container:publish',
      q: '端口映射（如 -p 8080:80）在做什么？',
      choices: [
        {
          t: '把容器内某端口暴露到宿主某端口，供本机或外网访问',
          ok: true,
          why: '容器网络与宿主隔离；映射后才在宿主 IP 上可达。',
        },
        {
          t: '修改 TCP 协议定义与报文格式',
          ok: false,
          why: '只是 NAT/转发配置，不改协议本身。',
        },
        {
          t: '自动向 Let\'s Encrypt 申请 HTTPS 证书',
          ok: false,
          why: '证书要 ACME/域名配置，不是 -p 自带。',
        },
        {
          t: '映射后就不需要健康检查，进程挂了也会自动恢复',
          ok: false,
          why: '映射只管可达；健康与重启策略另配。',
        },
      ],
      relatedNodes: ['ops-docker'],
    },
    {
      id: 'concept-container:healthcheck',
      q: 'HEALTHCHECK 在镜像/编排里主要提供什么？',
      choices: [
        {
          t: '让引擎知道进程「活着」是否真能服务，便于重启或摘流',
          ok: true,
          why: '进程在 ≠ 健康；探针很重要。',
        },
        {
          t: '自动备份数据库到 Git 仓库并开 PR',
          ok: false,
          why: '健康检查不做备份，也不该把库推进 Git。',
        },
        {
          t: '替代全部应用日志，有探针就不必再收集日志',
          ok: false,
          why: '探针与日志互补，不能互相替代。',
        },
        {
          t: 'HEALTHCHECK 等于开放容器内全部端口到公网',
          ok: false,
          why: '与端口暴露无关。',
        },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
      tags: ['进阶'],
    },
    {
      id: 'concept-container:dockerignore',
      q: '.dockerignore 的作用类似？',
      choices: [
        {
          t: '减小 build 上下文，避免把无关大文件送进 daemon',
          ok: true,
          why: '与 .gitignore 同思路：控制送进 daemon 的文件。',
        },
        {
          t: '运行时屏蔽所有网络，容器启动后无法出网',
          ok: false,
          why: '只影响构建上下文，不管运行网络。',
        },
        {
          t: '必须忽略 Dockerfile 本身，否则构建会失败',
          ok: false,
          why: 'Dockerfile 要被 daemon 读取，不能靠 ignore 掉。',
        },
        {
          t: '替代 compose 网络配置，声明 ignore 就自动组网',
          ok: false,
          why: '网络由 compose/network 配置，不是 ignore。',
        },
      ],
      relatedNodes: ['ops-docker'],
      tags: ['进阶'],
    },
    {
      id: 'concept-container:pick-vm',
      q: '容器与虚拟机选型时更贴切的说法？',
      choices: [
        {
          t: '要强隔离或不同内核的场景更偏虚拟机；也可组合使用',
          ok: true,
          why: '可组合：VM 里再跑容器也常见。',
        },
        {
          t: '容器永远比 VM 更安全，而且永远不需要打补丁',
          ok: false,
          why: '共享内核有独特风险面，仍要补丁与加固。',
        },
        {
          t: '虚拟机启动一定比容器更快，所以生产应全用 VM',
          ok: false,
          why: '通常容器启动更快。',
        },
        {
          t: '容器与虚拟机不能同时用于生产环境',
          ok: false,
          why: '生产常见组合部署。',
        },
      ],
      relatedNodes: ['ops-container', 'ops-others'],
      tags: ['基础', '进阶'],
    },
  ],
});
