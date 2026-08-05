export default `# Docker

> **Docker**：目前最普及的 **容器引擎 + 工具链**（建镜像、跑容器、拉仓库）。  
> 说「我们用 Docker」通常指：用 Dockerfile 描述环境，用 \`docker run\` / Compose 起服务。  
> 本课讲 **产品是什么**；本仓逐步命令见 \`docs/docker.md\` 与 **部署环境**。  
> **学会之后**：能解释 pull/run/ps/logs，并说清「容器 Redis + 宿主机 Node」常见组合。

## 学会之后（验收）


\`\`\`check
{"title":"Docker 直觉通关","items":[{"id":"img","text":"分得清镜像 / 容器 / 仓库"},{"id":"ps","text":"会看 docker ps 里的 STATUS / PORTS"},{"id":"xrk","text":"知道本仓可用容器起 Redis，主服仍可宿主机 Node"}]}
\`\`\`


| 能力 | 成功信号 |
|------|----------|
| 角色 | 容器引擎 + 工具链；不是语言、不是反代 |
| 命令 | pull / run / ps / logs / stop 各一句白话 |
| 取舍 | 何时 Docker、何时本机装 Redis |
| 本仓 | 主服可仍在宿主机；中间件可容器化 |

## 本课你要带走什么

1. Docker 在容器生态里的位置  
2. 常见命令直觉（run / pull / ps / logs）  
3. 和「本机直接装 Redis」的取舍

---

## 1. 它是什么

| 点 | 说明 |
|----|------|
| **角色** | 容器运行时 / 引擎（另有 Podman 等替代） |
| **Dockerfile** | 文本配方：基础镜像、拷文件、\`RUN\` 安装、\`CMD\` 启动 |
| **daemon** | 后台服务；CLI \`docker\` 跟它说话 |
| **不是** | 编程语言；也不是 Nginx 那种反代本身 |

\`\`\`mermaid
flowchart LR
  CLI[docker CLI] --> Engine[Docker 引擎]
  Engine --> C1[容器 A]
  Engine --> C2[容器 B]
  Engine --> Reg[镜像仓库]
\`\`\`

---

## 2. 最小命令直觉

| 命令 | 白话 |
|------|------|
| \`docker pull 镜像\` | 从仓库拉镜像 |
| \`docker run …\` | 用镜像起一个容器 |
| \`docker ps\` | 看正在跑的容器 |
| \`docker logs\` | 看容器日志 |
| \`docker stop / rm\` | 停 / 删容器 |

本仓常见场景：用容器跑 **Redis**，宿主机跑 **Node 主服**——两边经 \`localhost:6379\` 连。

> 模拟窗**不起真实容器**；自动演示 \`docker ps\` / \`images\`。

\`\`\`shell
{"preset":"docker-basics"}
\`\`\`

---

## 3. 何时用 Docker，何时本机装

| 更倾向 Docker | 更倾向本机安装 |
|---------------|----------------|
| 想少污染 PATH、多版本并存 | 日常开发只要一个 Node/Git |
| 中间件（Redis/PG）与教程一致 | Windows 上引擎/虚拟化折腾成本高时 |
| CI、队友环境对齐 | 简单脚本、单文件工具 |

Windows：Docker Desktop 常依赖 WSL2 / 虚拟化；装不上时本仓仍可用 Memurai / 社区 Redis 发行（见部署环境）。

## 和 AI 全栈的交界

本地联调 RAG/Agent 时常容器化：**向量库、Postgres、Redis**；宿主机跑 Node。  
对齐环境比「在笔记本上裸装五套中间件」更省事——前提是你会 \`ps\` / \`logs\` / 端口映射。

## 八股 × 业务串联

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **Container engine（容器引擎）** | 构建镜像、运行容器、对接仓库的工具链 | Docker Engine + \`docker\` CLI | 引擎 ≠ Nginx 反代；也 ≠ 语言运行时 |
| **Dockerfile** | 描述如何构建镜像的文本配方 | \`FROM\` / \`RUN\` / \`COPY\` / \`CMD\` | 配方 ≠ 正在跑的容器 |
| **Daemon（守护进程）** | 后台常驻服务；CLI 与之通信 | \`dockerd\`（实现因平台而异） | 别和业务 Node 主服进程混 |
| **Port publish（发布端口）** | 把容器端口映射到宿主机 | \`-p 6379:6379\` 后本机连 Redis | 发布后仍遵守 TCP/UDP 语义 |

## 下一步

**Compose** — 多容器一文件；  
第四章 **部署环境** / \`docs/docker.md\`；  
需要 HTTP 门面 → 第三章 **Nginx**（与容器可组合，但是另一层）。
## 导图2 · 部署 / 构建 × Docker

> 最常见容器引擎；本课概念级。本仓可用 Compose 起 Redis。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **部署上线** | docker 跑起来 | 引擎≠编排全家桶 |
| **构建** | Dockerfile | 构建上下文与层缓存 |
| **后端** | 容器内进程 | 端口映射到宿主机 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
