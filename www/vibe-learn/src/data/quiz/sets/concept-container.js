import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-container',
  title: '概念 · 容器与 Compose',
  kind: 'concept',
  domain: 'ops',
  tags: ['Docker', 'Compose', '容器'],
  relatedNodes: [
    'ops-container',
    'ops-docker',
    'ops-compose',
    'ops-others',
    'panel-run-node',
    'host-systemd',
  ],
  questions: [
    {
      q: '容器（Container）相对传统虚拟机（VM），直觉上最大的差别是什么？',
      choices: [
        {
          t: '容器共享宿主内核，进程级隔离，通常更轻、启动更快',
          ok: true,
          why: 'VM 要带完整客户机 OS；容器只打包应用与依赖，开销更小。',
        },
        {
          t: '每个容器都必须内置一套完整独立的客户机操作系统内核',
          ok: false,
          why: '容器复用宿主 Linux/Windows 内核，不是再跑一个完整 OS。',
        },
        {
          t: '容器就等于一整台物理服务器，资源无法限制',
          ok: false,
          why: '容器仍可设 CPU/内存限额；只是隔离粒度比 VM 轻。',
        },
        {
          t: '容器镜像 digest 变了也不影响部署可复现性',
          ok: false,
          why: 'digest 标识镜像内容；变了说明镜像不同，复现性会受影响。',
        },
      ],
    },
    {
      q: 'Docker 语境下，镜像（Image）与容器（Container）的关系更接近什么？',
      choices: [
        {
          t: '镜像是只读模板；容器是该模板运行起来的实例',
          ok: true,
          why: '一个镜像可启多个容器，类似类与对象的关系。',
        },
        {
          t: '二者完全同一概念，不能分开理解',
          ok: false,
          why: '镜像是静态包，容器是运行态；停止容器后镜像仍在。',
        },
        {
          t: '容器运行时不能有任何可写文件系统层',
          ok: false,
          why: '容器有可读写的容器层；只是默认不写回镜像。',
        },
        {
          t: '镜像是运行时实例，容器是打包好的只读文件',
          ok: false,
          why: '说反了；镜像是只读模板，容器才是运行实例。',
        },
      ],
    },
    {
      q: 'Docker Compose 适合解决哪类日常开发/部署问题？',
      choices: [
        {
          t: '用一份 YAML 声明并启动多容器应用（如 Web + Redis + DB）',
          ok: true,
          why: 'Compose 编排本地或小规模多服务，比手写多条 docker run 省心。',
        },
        {
          t: '替代 Git 做版本管理与代码合并',
          ok: false,
          why: 'Compose 管容器生命周期，不追踪源代码历史。',
        },
        {
          t: '编译 CPU 微码或刷新主板 BIOS',
          ok: false,
          why: '与硬件固件无关；Compose 是容器编排工具。',
        },
        {
          t: '自动把容器管理端口暴露到公网且无需任何鉴权',
          ok: false,
          why: '暴露端口要显式配置；公网无鉴权管理口是严重安全风险。',
        },
      ],
    },
    {
      q: '容器里重要数据要持久化，常见且稳妥的做法是什么？',
      choices: [
        {
          t: '使用数据卷（Volume）或绑定挂载，不要只依赖容器可写层',
          ok: true,
          why: '删容器时默认可写层会丢；卷由 Docker 管理，更适合存数据库文件。',
        },
        {
          t: '只写在容器内临时可写层就足够永久保存',
          ok: false,
          why: '重建容器后可写层数据会丢，不适合数据库与上传文件。',
        },
        {
          t: '持久化意味着禁止做任何备份',
          ok: false,
          why: '持久化与备份互补；卷解决了容器重建丢数据，仍要备份策略。',
        },
        {
          t: '把数据写进镜像层里再 commit 成新镜像即可',
          ok: false,
          why: '数据库运行时数据不应 bake 进镜像；应外挂卷便于升级与备份。',
        },
      ],
    },
    {
      q: 'Docker 的「端口映射」（如 -p 8080:80）是在做什么？',
      choices: [
        {
          t: '把容器内某端口暴露到宿主某端口，供本机或外网访问',
          ok: true,
          why: '容器网络与宿主隔离；映射后才能在宿主 IP 上访问服务。',
        },
        {
          t: '修改传输控制协议（TCP）的协议定义与报文格式',
          ok: false,
          why: '端口映射是 NAT/转发配置，不改变 TCP 协议本身。',
        },
        {
          t: '自动向 Let\'s Encrypt 申请 HTTPS 证书',
          ok: false,
          why: '证书申请要 ACME 客户端与域名配置，不是 docker -p 自带功能。',
        },
        {
          t: '映射后就不需要做健康检查，进程挂了也会自动恢复',
          ok: false,
          why: '端口映射只解决可达性；健康检查与重启策略要单独配置。',
        },
      ],
    },
    {
      q: 'HEALTHCHECK 指令在镜像/编排里主要提供什么？',
      choices: [
        { t: '让引擎知道容器进程「活着」是否真能服务，便于重启/摘流', ok: true, why: '进程在≠健康；探针很重要。' },
        { t: '自动备份数据库到 Git', ok: false, why: '否。' },
        { t: '替代全部应用日志', ok: false, why: '否。' },
        { t: 'HEALTHCHECK 等于开放所有端口', ok: false, why: '否。' },
      ],
      relatedNodes: ['ops-docker', 'ops-compose'],
      tags: ['进阶'],
    },
    {
      q: '.dockerignore 的作用类似？',
      choices: [
        { t: '减小 build 上下文：排除 node_modules、.git 等，加快构建并避免误拷密钥', ok: true, why: '与 .gitignore 同思路。' },
        { t: '运行时屏蔽所有网络', ok: false, why: '否。' },
        { t: '必须忽略 Dockerfile 本身', ok: false, why: '否。' },
        { t: '替代 compose 网络', ok: false, why: '否。' },
      ],
      relatedNodes: ['ops-docker'],
      tags: ['进阶'],
    },
    {
      q: '容器与虚拟机选型时更贴切的说法？',
      choices: [
        { t: '要强隔离/不同内核场景偏 VM；要轻量一致的应用分发偏容器', ok: true, why: '可组合：VM 里再跑容器也常见。' },
        { t: '容器永远比 VM 更安全且无需补丁', ok: false, why: '共享内核有独特风险面。' },
        { t: 'VM 启动一定更快', ok: false, why: '通常相反。' },
        { t: '二者不能同时用于生产', ok: false, why: '可以组合。' },
      ],
      relatedNodes: ['ops-container', 'ops-docker'],
      tags: ['基础', '进阶'],
    },
  ],
});
