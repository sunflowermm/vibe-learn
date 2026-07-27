/** Docker Compose */
export default `# Compose（多容器编排入门）

> **Docker Compose**：用一份 YAML（常名 \`compose.yaml\` / \`docker-compose.yml\`）描述 **多个容器** 如何一起启动、连哪几个网络、挂哪些卷。  
> 一句话：\`docker run\` 管「一个」；Compose 管「一套」。

## 本课分块

| 块 | 目标 |
|----|------|
| **为何需要** | Redis + 应用 + 其它服务一起起 |
| **文件里有什么** | services / ports / volumes |
| **和本仓** | docs/docker 常见路径 |

---

## 1. 一张图

\`\`\`mermaid
flowchart TB
  Y[compose.yaml] --> R[redis 服务]
  Y --> A[可选：应用容器]
  R --- Net[同一 Docker 网络]
  A --- Net
  Host[宿主机] -->|端口映射 6379| R
\`\`\`

| 字段直觉 | 含义 |
|----------|------|
| **services** | 有哪些容器角色 |
| **image / build** | 用现成镜像还是本地 Dockerfile 构建 |
| **ports** | \`宿主机端口:容器端口\` |
| **volumes** | 数据持久化到宿主机目录，避免删容器丢数据 |
| **depends_on** | 启动顺序提示（≠ 完美的「就绪探测」） |

---

## 2. 和 Kubernetes 的边界

| 工具 | 舞台 |
|------|------|
| **Compose** | 本机开发、小团队单机栈 |
| **Kubernetes（K8s）** | 集群调度、多机、滚动发布（见 **其它工具**） |

别在面试里把 Compose 说成「就是 K8s」。

## 八股 × 业务串联

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **Docker Compose** | 用 YAML 声明多容器服务、网络与卷，并一键启停 | \`compose.yaml\` 里 \`redis\` + 可选 \`app\` | 不是 Kubernetes；舞台是单机/开发栈 |
| **Service（服务）** | Compose 里的一个容器角色定义 | \`services.redis\` | 服务 ≠ 宿主机上的 systemd unit |
| **Volume（卷）** | 把容器内目录持久化到宿主机或命名卷 | Redis 数据目录挂卷，删容器不丢数据 | 卷 ≠ 镜像层；镜像层是只读配方 |
| **Port mapping（端口映射）** | \`宿主机端口:容器端口\` | \`6379:6379\` 让本机 Node 连 \`localhost:6379\` | 映射后仍是 TCP 端口语义 |
| **depends_on** | 启动顺序提示 | 先起 redis 再起 app | 不等于健康检查「已可接受连接」 |

## 下一步

**其它容器工具** — Podman / K8s 索引；  
本仓实操 → \`docs/docker.md\`；门面 → 第三章 **Nginx**。  
`;
