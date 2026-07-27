/** 其它容器 / 编排工具索引 */
export default `# 其它容器相关工具

> 索引卡：容器生态里还常听到的名字。  
> **Caddy / Traefik / Apache** 是 **Web 网关** 阵营，见第三章 **Nginx** 课对照——不在本框展开。

## 容器引擎与运行时

| 产品 | 直觉 |
|------|------|
| **Podman** | 常作 Docker CLI 兼容替代；daemon 模型等差异查当前文档 |
| **containerd** | 更底层的容器运行时；K8s 等会用到 |
| **Docker Desktop** | Windows/macOS 上带 GUI 的 Docker 发行 |

## 编排与本机进程

| 产品 | 直觉 |
|------|------|
| **Kubernetes（K8s）** | 集群里调度容器、滚动发布、服务发现 |
| **systemd** | Linux 管本机服务（\`systemctl\`）——**不是**容器编排 |

\`\`\`mermaid
flowchart TB
  Dev[本机开发] --> Compose[Compose 或本机进程]
  Prod[多机生产] --> K8s[Kubernetes 等]
\`\`\`

## 和本仓

- 开发：常 **宿主机 Node +（可选）Docker Redis**  
- 文档：\`docs/docker.md\`  
- 勿把「会写 Dockerfile」当成「会运维整个 K8s」

## 下一步

回 **Compose** 巩固本机编排；门面 → 第三章 **Nginx**（另一层）。  
要用容器起 Redis 时，从 **Docker** 桥回第四章 **部署环境** / \`docs/docker.md\`。  
`;
