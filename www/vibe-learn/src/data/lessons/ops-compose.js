export default `# Compose（多容器编排入门）

> **Docker Compose**：用一份 YAML（首选 \`compose.yaml\`，兼容 \`docker-compose.yml\`）描述 **多个容器** 如何一起启动、连哪几个网络、挂哪些卷。  
> 一句话：\`docker run\` 管「一个」；Compose 管「一套」。  
> 真源：[How Compose works](https://docs.docker.com/compose/intro/compose-application-model/) · [Compose Specification](https://github.com/compose-spec/compose-spec)  
> **学会之后**：能读懂 services / ports / volumes / networks 字段直觉，并明确 Compose ≠ Kubernetes。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 文件 | 说出 services、ports、volumes、networks 各管什么 |
| 边界 | depends_on ≠ 健康就绪；Compose ≠ K8s |
| 数据 | 删容器不丢数据要靠卷 |
| 本仓 | 开发栈一文件起 Redis 等；见 \`docs/docker.md\` |

\`\`\`algo
{"kind":"composestack","title":"compose up：服务 · 网络 · 卷","autoplay":true,"speed":840}
\`\`\`

\`\`\`check
{"title":"Compose 通关","items":[{"id":"file","text":"知道 compose 文件描述多容器（services 等）"},{"id":"up","text":"理解 up / ps / down 在编排什么"},{"id":"vol","text":"知道卷负责持久化，镜像层不管业务数据","hint":"数据"},{"id":"bound","text":"Compose ≠ K8s；depends_on ≠ 健康就绪"}]}
\`\`\`

## 本课分块

| 块 | 目标 |
|----|------|
| **为何需要** | Redis + 应用 + 其它服务一起起 |
| **应用模型** | services · networks · volumes · configs/secrets |
| **和本仓** | docs/docker · pnpm docker:* |

---

## 1. 一张图

\`\`\`mermaid
flowchart TB
  Y[compose.yaml] --> R[redis 服务]
  Y --> A[可选：应用容器]
  R --- Net[同一 Docker 网络]
  A --- Net
  Host[宿主机] -->|端口映射 6379| R
  Vol[(volumes)] --- R
\`\`\`

| 字段直觉 | 含义 |
|----------|------|
| **services** | 有哪些容器角色（可多副本语义，本课先当「一个角色」） |
| **image / build** | 用现成镜像还是本地 Dockerfile 构建 |
| **ports** | \`宿主机端口:容器端口\` |
| **volumes** | 数据持久化，避免删容器丢数据 |
| **networks** | 服务间用**服务名**互通（如 \`redis:6379\`） |
| **depends_on** | 启动顺序提示（≠ 完美的「就绪探测」） |
| **configs / secrets** | 配置与敏感数据注入（平台相关；入门先认有这层） |

文件名：规范偏好 **\`compose.yaml\`**；若同时存在旧名 \`docker-compose.yml\`，实现以规范/工具当前行为为准（Docker Compose 偏好 canonical 名）。

---

## 2. 和 Kubernetes 的边界

| 工具 | 舞台 |
|------|------|
| **Compose** | 本机开发、小团队单机栈、本仓文档栈 |
| **Kubernetes（K8s）** | 集群调度、多机、滚动发布（见 **其它工具**） |

别在面试里把 Compose 说成「就是 K8s」。

### 动手：假编排输出

\`\`\`shell
{"preset":"compose-up"}
\`\`\`

## 八股 × 业务串联

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **Docker Compose** | 用 YAML 声明多容器服务、网络与卷，并一键启停 | \`compose.yaml\` 里 \`redis\` + 可选 \`app\` | 不是 Kubernetes；舞台是单机/开发栈 |
| **Service（服务）** | Compose 里的一个容器角色定义 | \`services.redis\` | 服务 ≠ 宿主机上的 systemd unit |
| **Volume（卷）** | 把容器内目录持久化到宿主机或命名卷 | Redis 数据目录挂卷，删容器不丢数据 | 卷 ≠ 镜像层；镜像层是只读配方 |
| **Network（网络）** | 服务间 IP 路由抽象 | 同网内用服务名解析 | 别和「公网防火墙」混为一谈 |
| **Port mapping（端口映射）** | \`宿主机端口:容器端口\` | \`6379:6379\` 让本机 Node 连 \`localhost:6379\` | 映射后仍是 TCP 端口语义 |
| **depends_on** | 启动顺序提示 | 先起 redis 再起 app | 不等于健康检查「已可接受连接」 |
| **Project（项目）** | 一次部署的命名空间隔离 | \`name\` / 目录名分组资源 | 同一份 YAML 可换项目名部署两套 |

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 一键栈 | \`pnpm docker:up\` · \`docker:status\` · \`docker:down\`（\`docs/docker.md\`） |
| 服务 | \`xrk-agt\` · 多语言子服 · \`redis\` |
| 健康 | 主服等 redis / 子服 healthy 后再起（日志：\`docker compose logs\`） |
| 代理 | 构建/出网见 \`BUILD_HTTP_PROXY\` / \`HTTP_PROXY\`（\`config/docker.env\`） |

## Coding Agent

\`\`\`prompt
目标：根据本仓 docs/docker.md，列出 compose 里与 Redis 相关的验收步骤。
现场：是否已装 Docker Desktop=…；端口 6379/8080 是否占用=…
约束：不要改成 K8s；说明 volumes 为何重要；给出 docker compose ps 与健康检查口径。
验收：我能按步骤 up → status → 浏览器开控制台或 ping Redis。
\`\`\`

## 下一步

**其它容器工具** — Podman / K8s / systemd 分层索引；  
门面 → 第三章 **Nginx**。
`;
