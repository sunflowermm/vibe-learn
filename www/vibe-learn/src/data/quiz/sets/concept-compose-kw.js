import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-compose-kw',
  title: '基础 · Compose YAML 字段全表',
  kind: 'concept',
  domain: 'ops',
  tags: ['Compose', 'Docker', '基础'],
  relatedNodes: ['ops-compose', 'ops-docker'],
  caption: 'services、image、build、ports、volumes、depends_on——多容器编排单词。',
  questions: [
    {
      id: 'concept-compose-kw:services',
      q: 'compose.yaml 里 services 表示？',
      choices: [
        {
          t: '要编排的各个容器角色定义（如 redis、app）',
          ok: true,
          why: 'Compose 管「一套」，docker run 管「一个」。',
        },
        {
          t: '仅宿主机 systemd 单元列表，与容器无关',
          ok: false,
          why: 'services 描述的是 Compose 容器角色，不是 systemd。',
        },
        {
          t: '仅 Git submodule 清单，用来拉代码依赖',
          ok: false,
          why: '与源码子模块无关。',
        },
        {
          t: '仅 Nginx upstream 名，用来做反向代理',
          ok: false,
          why: '那是 Nginx 配置概念，不是 Compose services。',
        },
      ],
      relatedNodes: ['ops-compose'],
      tags: ['基础', 'services'],
    },
    {
      id: 'concept-compose-kw:image',
      q: 'services.redis.image: redis:7 的意思？',
      choices: [
        {
          t: '该服务用名为 redis:7 的镜像运行',
          ok: true,
          why: '使用已有镜像名（可含标签）启动服务，不必本地 build。',
        },
        {
          t: '在宿主机用 apt/yum 安装名为 redis 的系统包',
          ok: false,
          why: 'image 拉的是容器镜像，不是宿主机包管理。',
        },
        {
          t: '删除该项目下所有命名卷与绑定挂载',
          ok: false,
          why: '删卷是 docker volume / compose down -v，不是 image 字段。',
        },
        {
          t: '只生成 Dockerfile 文本，不会真正拉取或运行镜像',
          ok: false,
          why: 'image 是运行用镜像引用，不是生成 Dockerfile。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-docker'],
      tags: ['基础', 'image'],
    },
    {
      id: 'concept-compose-kw:build',
      q: 'Compose 的 build 字段表示？',
      choices: [
        {
          t: '从本地 Dockerfile（或构建上下文）构建镜像再运行',
          ok: true,
          why: '与直接 image 拉现成镜像对照。',
        },
        {
          t: '只从仓库下载现成镜像，禁止在本地执行任何构建',
          ok: false,
          why: '那是只用 image；build 才是本地构建。',
        },
        {
          t: '编译宿主机操作系统内核并热替换正在运行的内核',
          ok: false,
          why: '与内核编译无关。',
        },
        {
          t: '构建成功后强制 git push 到所有远程仓库',
          ok: false,
          why: '与 Git 推送无关。',
        },
      ],
      relatedNodes: ['ops-compose', 'ops-docker'],
      tags: ['基础', 'build'],
    },
    {
      id: 'concept-compose-kw:ports',
      q: 'ports: ["6379:6379"] 表示？',
      choices: [
        {
          t: '把宿主机 6379 映射到容器 6379',
          ok: true,
          why: '让本机进程连 localhost:6379 进容器。',
        },
        {
          t: '把 HTTP 响应状态码固定写成 6379',
          ok: false,
          why: 'ports 是端口映射，不是状态码。',
        },
        {
          t: '修改镜像 CPU 架构（如 amd64 改 arm64）',
          ok: false,
          why: '架构与 ports 无关。',
        },
        {
          t: '等同 depends_on：保证 redis 就绪后再启动本服务',
          ok: false,
          why: 'ports 不管启动顺序；depends_on 也不保证就绪。',
        },
      ],
      relatedNodes: ['ops-compose', 'network-basics'],
      tags: ['基础', 'ports'],
    },
    {
      id: 'concept-compose-kw:volumes',
      q: 'Compose volumes 的核心收益？',
      choices: [
        {
          t: '数据持久化，删容器不必然丢库文件',
          ok: true,
          why: '命名卷或宿主机路径；卷 ≠ 镜像只读层。',
        },
        {
          t: '挂上卷之后 CPU 主频会自动提升一档',
          ok: false,
          why: '与性能调频无关。',
        },
        {
          t: 'volumes 可以替代 TLS，不必再配证书',
          ok: false,
          why: '持久化与传输加密无关。',
        },
        {
          t: '声明 volumes 后就禁止再写任何 ports 映射',
          ok: false,
          why: '卷与端口可同时配置。',
        },
      ],
      relatedNodes: ['ops-compose'],
      tags: ['基础', 'volumes'],
    },
    {
      id: 'concept-compose-kw:depends_on',
      q: 'depends_on 保证了什么、不保证什么？',
      choices: [
        {
          t: '大致启动顺序；不保证依赖已就绪可连',
          ok: true,
          why: '不等于健康检查「已可接受连接」。',
        },
        {
          t: '保证依赖服务的 TCP 端口一定已可接受连接',
          ok: false,
          why: '只是启动顺序提示，不是就绪探针。',
        },
        {
          t: '依赖启动后自动跑完数据库迁移再继续',
          ok: false,
          why: '迁移要另配 entrypoint/CI 步骤。',
        },
        {
          t: '等同 Kubernetes 全集群调度与自动扩缩容',
          ok: false,
          why: 'Compose 本地/小规模编排，不是 K8s 调度器。',
        },
      ],
      relatedNodes: ['ops-compose'],
      tags: ['基础', 'depends_on'],
    },
  ],
});
