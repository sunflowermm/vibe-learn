export default `# Docker

> **Docker**：目前最普及的 **容器引擎 + 工具链**（建镜像、跑容器、拉仓库）。  
> 说「我们用 Docker」通常指：用 Dockerfile 描述环境，用 \`docker run\` / Compose 起服务。  
> 真源：[What is an image?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/) · [Storage drivers / layers](https://docs.docker.com/engine/storage/drivers/) · [OCI Image Spec](https://github.com/opencontainers/image-spec)  
> 本课讲 **产品是什么**；本仓逐步命令见 \`docs/docker.md\` 与 **部署环境**。  
> **学会之后**：能解释 pull/run/ps/logs，并说清「镜像层只读 + 容器可写层」与「容器 Redis + 宿主机 Node」。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 角色 | 容器引擎 + 工具链；不是语言、不是反代 |
| 层 | 镜像层只读；容器顶部可写层；删容器可写层丢 |
| 命令 | pull / run / ps / logs / stop 各一句白话 |
| 本仓 | 主服可仍在宿主机；中间件可容器化 |

\`\`\`algo
{"kind":"imglayer","title":"镜像层叠 + 容器可写层","autoplay":true,"speed":860}
\`\`\`

\`\`\`check
{"title":"Docker 直觉通关","items":[{"id":"img","text":"分得清镜像 / 容器 / 仓库"},{"id":"layer","text":"知道镜像层只读、容器有可写层；持久化靠卷","hint":"层"},{"id":"ps","text":"会看 docker ps 里的 STATUS / PORTS"},{"id":"xrk","text":"知道本仓可用容器起 Redis，主服仍可宿主机 Node"}]}
\`\`\`

## 本课你要带走什么

1. Docker 在容器生态里的位置  
2. 镜像层叠与可写层（为何多容器可共享同一镜像）  
3. 常见命令直觉（run / pull / ps / logs）  
4. 和「本机直接装 Redis」的取舍  

---

## 1. 它是什么

| 点 | 说明 |
|----|------|
| **角色** | 容器运行时 / 引擎（另有 Podman 等替代） |
| **Dockerfile** | 文本配方：\`FROM\` / \`RUN\` / \`COPY\` / \`CMD\` |
| **daemon** | 后台服务；CLI \`docker\` 跟它说话 |
| **不是** | 编程语言；也不是 Nginx 那种反代本身 |

\`\`\`mermaid
flowchart LR
  CLI[docker CLI] --> Engine[Docker 引擎]
  Engine --> C1[容器 A]
  Engine --> C2[容器 B]
  Engine --> Reg[镜像仓库]
  Img[只读镜像层] --> C1
  Img --> C2
\`\`\`

---

## 2. 镜像层（必懂直觉）

官方要点（简化口述）：

1. **镜像不可变**：改动 = 新建层 / 新镜像，不是就地改旧层。  
2. **由层组成**：每层是一组文件系统变更（增删改）。  
3. **跑容器时**：层叠合（union / overlay）成统一根文件系统，再加一层**可写层**；删容器则丢可写层，镜像仍在。  
4. **多容器共享同一镜像栈**（写时复制）——比「每个 VM 复制整盘」轻得多。

| 层 | 生命周期 |
|----|----------|
| 镜像层 | 只读；\`pull\` / \`build\` 得到 |
| 容器可写层 | 随容器；**不要**当持久库 |
| **Volume** | 要留下的数据挂到卷 / 宿主机目录 |

\`\`\`mermaid
flowchart TB
  RW[容器可写层 · 临时] --> App[应用层 · 只读]
  App --> Pkg[依赖层 · 只读]
  Pkg --> Base[基础层 · 只读]
\`\`\`

---

## 3. 最小命令直觉

| 命令 | 白话 |
|------|------|
| \`docker pull 镜像\` | 从仓库拉镜像（按层下载） |
| \`docker run …\` | 用镜像起一个容器 |
| \`docker ps\` | 看正在跑的容器 |
| \`docker logs\` | 看容器日志 |
| \`docker stop / rm\` | 停 / 删容器 |
| \`docker image history\` | 看层历史（理解层很有用） |

本仓常见场景：用容器跑 **Redis**，宿主机跑 **Node 主服**——两边经 \`localhost:6379\` 连（端口映射）。

> 模拟窗**不起真实容器**；自动演示 \`docker ps\` / \`images\`。

\`\`\`shell
{"preset":"docker-basics"}
\`\`\`

---

## 4. 何时用 Docker，何时本机装

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
| **Layer（镜像层）** | 一组不可变的文件系统变更 | \`pull\` 时一行一行层下载 | 层 ≠ Volume；Volume 管持久数据 |
| **Writable layer（可写层）** | 容器运行时叠在镜像上的薄层 | 容器内写文件落这里 | 删容器即丢；库数据要挂卷 |
| **Daemon（守护进程）** | 后台常驻服务；CLI 与之通信 | \`dockerd\`（实现因平台而异） | 别和业务 Node 主服进程混 |
| **Port publish（发布端口）** | 把容器端口映射到宿主机 | \`-p 6379:6379\` 后本机连 Redis | 发布后仍遵守 TCP/UDP 语义 |

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 命令入口 | \`docs/docker.md\` · \`pnpm docker:build\` / \`docker:up\` / \`docker:status\` |
| 栈 | 主服 \`xrk-agt\` + 子服 + \`redis\`（见 compose） |
| 持久化 | \`./data\` · \`./config\` · \`./core\` 等卷；Redis 地址在容器网映射为服务名 \`redis\` |
| 契约 | 第四章 **部署环境**；热路径 DBMS 仍见数据库番外 |

## Coding Agent

\`\`\`prompt
目标：判断本机用「Docker 起 Redis」还是「本机装 Redis」，并给出验收命令。
现场：OS=…；Docker Desktop 是否可用=…；本仓是否要求 Redis=…
约束：主服保持宿主机 Node + pnpm；说明端口映射；不要默认上 K8s。
验收：两种路径各一句利弊；选定一条最小步骤（含 docker ps 或 redis-cli ping）。
\`\`\`

## 下一步

**Compose** — 多容器一文件；  
需要 HTTP 门面 → 第三章 **Nginx**（与容器可组合，但是另一层）。
`;
