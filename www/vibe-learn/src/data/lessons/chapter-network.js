/** 第三章网络章说明 */
export default `# 第三章 · 计算机网络

> 单机具备算与存之后，多机经网络协作。  
> 主线：为何联网 → 协议栈 → IP/TCP → 路由/NAT/防火墙 → DNS/HTTPS → HTTP → **反向代理** → **Nginx（产品）** / CDN → **边缘与出口实务**。  
> 每课末尾有 **八股 × 业务串联**：四列表 **名词全称 · 白话 · 业务场景 · 易混对照**，缩写一律展开，与上线场景对齐。  
> **实务钉**：开服时安全组要写对 **TCP 或 UDP**（如 Minecraft 基岩 \`19132/UDP\`），见 **TCP/UDP** 课。  
> **容器 / Docker** 在番外 **容器**（交付隔离），与本框「门面」分层——可组合，但先分清。

## 与前面章节的咬合
\`\`\`steps
{"title":"网络章路径","steps":[{"title":"网是什么","body":"LAN/WAN/性能词。"},{"title":"地址与路由","body":"IP、NAT。"},{"title":"传输与应用","body":"TCP/UDP、HTTP、DNS/HTTPS。"},{"title":"入口层","body":"反代、Nginx、边缘。"}]}
\`\`\`


| 已学 | 本框落点 |
|------|----------|
| 进程 / 套接字（序章） | 端口区分同一主机上的进程 |
| 网卡作为 I/O（序章） | 帧与包进出主机 |
| 终端能启动服务（第一章） | 本机监听后可被访问 |
| API / 前后端（本框） | 多数 Web API 跑在 HTTP 上 |

\`\`\`mermaid
flowchart LR
  API[API 与前后端] --> HTTP[HTTP]
  NET[网络是什么] --> STACK[协议栈]
  STACK --> IP[IP / DHCP]
  STACK --> TCP[TCP/UDP]
  IP --> ROUTE[路由 / NAT / 防火墙]
  IP --> DNS[DNS / HTTPS]
  TCP --> HTTP
  HTTP --> PROXY[反向代理 / CDN]
  PROXY --> NGX[Nginx 产品]
  PROXY --> EDGE[边缘实务]
  NGX --> EDGE
  ROUTE --> EDGE
  DNS --> EDGE
\`\`\`

## 建议阅读顺序

1. **网络是什么** — LAN/WAN、设备角色；带宽/RTT/DMZ  
2. **协议栈** — OSI / TCP/IP、封装；五元组、L4/L7  
3. **IP（含 DHCP）→ TCP/UDP → 路由/NAT/防火墙** — CIDR、握手挥手、SNAT/DNAT；**MC 开服 TCP/UDP 安全组**  
4. **DNS/HTTPS → HTTP** — TTL/证书链/SNI；幂等、缓存、CORS、鉴权  
5. **API 与前后端** — REST/RPC/WS 与网关  
6. **反向代理与 CDN** — 粘滞、健康检查、限流算法  
7. **Nginx** — 反代概念落到具体产品（Caddy 等对照）  
8. **边缘与出口实务** — 命中率、回源、出口白名单、地域  
9. **番外 Clash** — 本机代理引擎选路；需要打包中间件时 → 番外 **容器**

## 记忆钩

> IP 找主机，DHCP 领地址，端口找进程，DNS 找名字，HTTPS 加密，HTTP 说话，反代管门口，CDN 把副本放到近处；上线再认清 **入口 IP / 源站 / 出口池**，以及安全组是 **协议+端口** 不是只写数字。

---

## 考证与延伸阅读（网络向）

> 检索时间约 2025–2026；链接以你打开时页面为准。与序章「系统向」书单互补。

### 在线 / 开源（跟本图谱互补）

| 资源 | 链接 | 适合 |
|------|------|------|
| **小林coding · 图解网络** | https://xiaolincoding.com/network/ | HTTP/TCP/UDP/IP 面试图解 |
| **小林coding · 总站** | https://xiaolincoding.com/ | 网络+系统一体 |
| **JavaGuide · 计算机基础书单** | https://github.com/Snailclimb/JavaGuide/blob/main/docs/books/cs-basics.md | 书单与入门路径 |
| **RFC 检索** | https://www.rfc-editor.org/ | 扣细节时查标准（不必通读） |

### 纸书（由浅入深）

| 书 | 角色 |
|----|------|
| 《网络是怎样连接的》 | 从输入网址走到页面；零基础故事线 |
| 《图解 HTTP》 | HTTP/缓存/HTTPS 入门；轻量 |
| 《计算机网络：自顶向下方法》 | 高校主干；近年版关注 HTTP/3、QUIC |
| 《TCP/IP 详解 卷1》 | 进阶抠协议；按需选章，勿硬啃全书 |

### 考证对照（概念 ↔ 实操）

| 认证 / 方向 | 与本框关系 | 备注 |
|-------------|------------|------|
| **CompTIA Network+** | OSI、IP、路由、无线、排障名词 | 偏厂商无关概念 |
| **Cisco CCNA（200-301）** | 同左 + Cisco IOS/VLAN/OSPF 实操 | 官方教材 Wendell Odom；含金量偏网工岗 |
| **软考网络工程师** | 国内规范 + 协议原理 | 可与《自顶向下》互补 |
| **云厂商入门实验** | 安全组、弹性 IP、SLB | 把「协议+端口」练成肌肉记忆（含 UDP 开服） |

备考建议：概念用本图谱 + 小林图解；实操用 Packet Tracer / 云控制台安全组各做一遍「只开对协议」的对照实验。
`;
