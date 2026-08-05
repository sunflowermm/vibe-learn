export default `# 其它容器相关工具

> 索引卡：容器生态里还常听到的名字——知道**站哪一层**即可，不必本课全会运维。  
> **Caddy / Traefik / Apache** 是 **Web 网关** 阵营，见第三章 **Nginx** 课对照——不在本框展开。  
> **学会之后**：能把 Podman / containerd / Compose / K8s / systemd 各放进正确一层，且不说「Compose 就是 K8s」。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 引擎层 | Docker / Podman / containerd 是跑容器的；不是反代 |
| 编排层 | Compose = 单机多容器；K8s = 集群调度 |
| 本机进程 | systemd 管宿主机守护进程，**不是**容器编排 |
| 本仓 | 开发常「宿主机 Node +（可选）Docker Redis」；勿把会写 Dockerfile 当成会运维 K8s |

## 1. 容器引擎与运行时

| 产品 | 直觉 | 别混 |
|------|------|------|
| **Docker Engine / Desktop** | 最常见：CLI + 引擎；Win/mac 常用 Desktop（含 GUI） | Desktop ≠ 必须把主服也放进容器 |
| **Podman** | 常作 Docker CLI 兼容替代；daemon 模型等差异查当前文档 | 不是「另一个 K8s」 |
| **containerd** | 更底层的容器运行时；K8s 等会用到 | 日常开发很少直接 \`containerd\` 命令 |

\`\`\`flip
{"title":"引擎翻卡","cards":[{"front":"Docker Desktop 起不来？","back":"Win/mac 常查虚拟化 / WSL2；本仓 Redis 可改本机发行版。"},{"front":"Podman 兼容 docker？","back":"很多命令像；细节与权限模型以当前文档为准。"},{"front":"containerd 要学吗？","back":"先会 Docker/Compose；碰 K8s 再深入。"}]}
\`\`\`

## 2. 编排舞台对照

| 舞台 | 典型工具 | 回答什么 |
|------|----------|----------|
| **本机多容器** | Docker Compose / Podman compose | 开发栈一文件起停 |
| **集群调度** | Kubernetes（K8s）及托管版 | 多机、滚动发布、服务发现 |
| **本机服务进程** | systemd / launchd / Windows 服务 | 管宿主机守护进程 |

\`\`\`compare
{"title":"编排舞台对照","caption":"别把名字说成同一层。","items":[{"role":"本机多容器","win":"Docker Compose / Desktop","linux":"Compose / Podman compose","mac":"Docker Compose","note":"开发栈一文件起停"},{"role":"集群调度","win":"托管 K8s（云）","linux":"Kubernetes","mac":"托管 K8s","note":"多机、滚动发布；≠ Compose"},{"role":"本机服务进程","win":"服务 / NSSM 等","linux":"systemd / systemctl","mac":"launchd","note":"管宿主机守护进程，不是容器编排"}]}
\`\`\`

\`\`\`mermaid
flowchart TB
  Dev[本机开发] --> Compose[Compose 或本机进程]
  Prod[多机生产] --> K8s[Kubernetes 等]
  Host[宿主机保活] --> SD[systemd / 面板 / PM2]
\`\`\`

## 3. Kubernetes 一句话（够面试开门）

**Kubernetes** 把容器当成可调度的工作负载：副本、滚动更新、健康探针、Service 暴露。  
本仓学习路径**不要求**你会写 Deployment YAML；知道「Compose 是单机配方，K8s 是集群操作系统级调度」即可。

| 别说 | 说 |
|------|-----|
| 「我们用 Compose 上生产集群」 | 「开发用 Compose；生产若多机再评估 K8s/托管」 |
| 「systemd 就是容器编排」 | 「systemd 保活本机进程；容器另有引擎」 |

## 4. 和本仓

| 场景 | 常见做法 |
|------|----------|
| 本机开发 | 宿主机 **Node ≥ 26 + pnpm**；可选 **Docker Redis** |
| 文档 | \`docs/docker.md\` |
| 生产 | 可能仍是「主机 Node + systemd/面板」或「容器化」——选型见主机/面板番外 |
| 门面 | 反代 / TLS 在 **第三章 Nginx** 与主机 TLS 课 |

> 验收命令先认形状（假窗）：\`docker ps\` / \`redis-cli ping\`。

\`\`\`shell
{"preset":"docker-basics"}
\`\`\`

\`\`\`shell
{"preset":"redis-ping"}
\`\`\`

\`\`\`quiz
{"title":"容器生态分层","questions":[{"q":"要把本机 Redis + 以后可能的第二中间件一文件起停，首选？","choices":[{"t":"先上完整 Kubernetes","ok":false,"why":"单机开发用 Compose 更合适。"},{"t":"Docker Compose（或兼容实现）","ok":true,"why":"单机多容器配方。"},{"t":"只用 systemd 写镜像层","ok":false,"why":"systemd 不管镜像构建与容器网络那一套。"}]},{"q":"containerd 更贴近哪一层？","choices":[{"t":"反向代理","ok":false,"why":"网关在第三章。"},{"t":"底层容器运行时","ok":true,"why":"K8s 等会用到。"},{"t":"关系型 DBMS","ok":false,"why":"那是数据库番外。"}]}]}
\`\`\`

## Coding Agent

\`\`\`prompt
目标：解释我当前环境该用「本机装 Redis」还是「Docker 起 Redis」，并给出验收命令。
现场：OS=…；Docker 是否可用=…；本仓是否要求 Redis=…
约束：主服保持宿主机 Node + pnpm；不要默认上 K8s；给出 docker ps / redis-cli ping 或等价验收。
验收：两种路径各列利弊一句；选定一条最小步骤。
\`\`\`

## 下一步

回 **Compose** 巩固本机编排；门面 → 第三章 **Nginx**。  
要用容器起 Redis：从 **Docker** 桥回第四章 **部署环境** / \`docs/docker.md\`。
## 导图2 · 部署 / 技术栈 × 其它容器工具

> 索引向；用到再深挖。主线 Docker/Compose 足够起步。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **部署上线** | 引擎可替换 | 概念仍是镜像/容器 |
| **技术栈** | 按需 | 不挡最小贡献路径 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
