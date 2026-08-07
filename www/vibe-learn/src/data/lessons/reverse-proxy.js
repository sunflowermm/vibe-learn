export default `# 反向代理、限流与 CDN

> **反向代理**部署在服务器一侧：客户端访问统一入口，由代理转发至后端服务。  
> 常与 **负载均衡、TLS 终止、限流、CDN** 一起出现在工程入口层。  
> 文献口径：[Cloudflare Learning · Reverse Proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/)；CDN 可视为「带缓存的全球分布式反代」。  
> **学会之后**：能对照正向/反向代理，画出「访客 → 门面 → 上游」，并说明 CDN 回源与健康检查直觉。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 反向代理 | 靠近服务端的统一入口；客户端通常无感 |
| 正向代理 | 靠近客户端（Clash 线）；常需配置才出网 |
| CDN | 边缘副本就近命中；未命中才回源——不是另一种 HTTP |
| 502 | 门面活着、上游挂了；先 curl 上游再查 \`proxy_pass\` |
| 上线 | 健康检查、限流、只暴露 80/443 |

\`\`\`term
{"title":"反代探活（形态演示）","prompt":"$ ","steps":[{"type":"in","text":"curl -I https://example.com"},{"type":"out","text":"HTTP/2 200\\nserver: nginx\\ncontent-type: text/html"},{"type":"in","text":"curl -sS https://example.com/api/health"},{"type":"out","text":"{\\"success\\":true,\\"message\\":\\"ok\\"}"}]}
\`\`\`

## 本课分块

| 块 | 目标 |
|----|------|
| **正向 vs 反向** | 位置与谁感知代理 |
| **请求怎么流** | 动画：入口 → 上游 → 回客户端 / 502 |
| **门面能力** | LB、TLS、缓存、防护、健康检查 |
| **CDN** | 边缘缓存与源站关系 |
| **限流** | 控制请求速率 |
| **八股 × 业务** | L4/L7、粘滞、蓝绿 |

---

## 1. 正向代理 vs 反向代理

Cloudflare Learning 的一句话：**正向代理站在客户端前面；反向代理站在源站前面。**  
访客以为自己在连「网站」；其实先碰到门面，再由门面去连真正的应用。

\`\`\`match
{"title":"反代与正向代理配对","pairs":[{"id":"fwd","left":"正向代理","right":"靠近客户端；常需配置才能出网（如 Clash）"},{"id":"rev","left":"反向代理","right":"靠近服务器；客户端通常无感（如 Nginx）"},{"id":"lb","left":"负载均衡","right":"把请求分到多台后端"},{"id":"502","left":"502 Bad Gateway","right":"网关后面的上游出问题"}]}
\`\`\`

| | 正向代理 | 反向代理 |
|--|----------|----------|
| 位置 | 靠近客户端 | 靠近服务器 |
| 客户端是否配置 | 常需配置 | 通常无感 |
| 用途 | 访问控制、出海、缓存 | 负载均衡、TLS、缓存、防护 |
| 例子 | 浏览器代理、Clash | Nginx、Caddy、云负载均衡、Cloudflare 橙云 |

\`\`\`decide
{"title":"502 了先怪谁？","start":"s","caption":"先分清后端挂了还是门面配错了。","steps":[{"id":"s","q":"浏览器直连后端端口正常吗？","options":[{"label":"后端也不通","next":"be"},{"label":"后端通，经域名/反代才 502","next":"rp"}]},{"id":"be","result":"先修后端进程、端口监听与防火墙。","detail":"反代只是门面；上游没人听就会 502。"},{"id":"rp","result":"查反代 upstream、健康检查、超时与 TLS。","detail":"502 = 网关后面的上游出问题。"}]}
\`\`\`

---

## 2. 请求怎么流（章专属）

成功路径：浏览器 → 反向代理 → 上游应用 → 再经门面回响应。  
失败路径：上游挂了或超时 → 门面仍能说话，但回 **502 / 504**。

\`\`\`algo
{"kind":"revproxy","title":"反向代理请求流 · 成功","autoplay":true,"speed":900,"data":{"mode":"ok","client":"浏览器","proxy":"反向代理 / Nginx","upstream":"127.0.0.1:8080 Node"}}
\`\`\`

\`\`\`algo
{"kind":"revproxy","title":"反向代理 · 上游挂了（502）","autoplay":false,"speed":900,"data":{"mode":"fail","client":"浏览器","proxy":"反向代理 / Nginx","upstream":"（无人听）"}}
\`\`\`

\`\`\`
客户端 → 反向代理 → 后端 1
                 ↘ 后端 2
\`\`\`

开发时「同源代理到 API」亦属反代思路，用于规避浏览器跨域限制。

\`\`\`fill
{"title":"探活命令补全","caption":"只看响应头，不下载整页。","template":"curl -___ https://example.com","answers":["I"],"hint":"大写 i：只取响应头。","caseSensitive":true}
\`\`\`

---

## 3. 反向代理常见能力

1. **负载均衡**：分发到多台后端（下一课 Nginx \`upstream\`）  
2. **TLS 终止**：入口统一证书；后面可 HTTP 或再加密  
3. **缓存**：减轻源站（CDN 是全球版）  
4. **安全**：隐藏源站 IP；可配合 WAF / IP 限制  
5. **健康检查**：摘除故障实例  

记忆：门面解决「门口如何接待与分发」；应用只管业务。

---

## 4. CDN（内容分发网络）

**CDN**：把静态资源（及部分动态加速）缓存在靠近用户的边缘节点。  
Cloudflare 官方把自家 CDN 描述为：访客先连边缘 PoP，边缘可缓存响应；未命中再与源站通信——**本质仍是反代 + 缓存**。

| 对比 | CDN 边缘 | 源站反向代理（如本机 Nginx） |
|------|----------|------------------------------|
| 主要目标 | 就近命中、减延迟与带宽 | 应用入口、路由与防护 |
| 典型内容 | JS/CSS/图片/视频分片 | API、SSR、动态请求 |
| 未命中时 | 回源到源站（或中层） | 直接打后端 |
| 规模 | 全球多 PoP / Anycast | 常在你的机房门口 |

二者可叠加：**用户 → CDN/全球反代 → 你的 Nginx → Node**。

### Cloudflare 一类产品（预告）

把 **权威 DNS + 可选全球反代（橙云 Proxied）+ CDN + WAF** 做成托管服务。  
橙云：DNS 回答 Cloudflare 地址，源站 IP 不易直暴；灰云：DNS 直接给出源站 IP。  
细节（端口限制、地域、出口池）见下一课 **边缘与出口实务**。

---

## 5. 限流

控制单位时间请求量，保护后端并抑制滥用。

| 算法 | 直觉 |
|------|------|
| 固定窗口 | 每分钟最多 N 次 |
| 滑动窗口 | 最近一段时间合计 ≤ N |
| 令牌桶 | 允许一定突发 |
| 漏桶 | 匀速流出 |

落地：Nginx \`limit_req\`、Redis 计数、网关中间件、边缘 WAF 速率限制等。

\`\`\`quiz
{"title":"反代 / CDN 自测","questions":[{"q":"正向代理与反向代理在位置上的差别是什么？","choices":[{"t":"正向靠近客户端常需配置；反向靠近服务器客户端通常无感","ok":true,"why":"Clash 偏正向；Nginx 门面偏反向。"},{"t":"二者只是厂商文案不同，客户端感知与部署位置完全一样","ok":false,"why":"位置与谁感知不同。"},{"t":"上了反向代理后就不再需要 DNS，域名解析可以省略","ok":false,"why":"仍要解析到入口。"},{"t":"正向代理的主要职责是对外签发站点证书，取代 CA","ok":false,"why":"证书常在反代/边缘终止。"}]},{"q":"L7 相对 L4 负载均衡多了哪些路由能力？","choices":[{"t":"能按 Host/URL/Header 等应用语义路由","ok":true,"why":"L4 只看 IP/端口/协议。"},{"t":"L7 只能用于实验环境，生产流量必须全程 L4","ok":false,"why":"差异在功能不是禁令。"},{"t":"L7 主要按链路层 MAC 地址分流，不看应用头","ok":false,"why":"MAC 是链路层。"},{"t":"L7 负载均衡只能转发 UDP，不能处理 HTTP/TCP","ok":false,"why":"HTTP L7 常见于 TCP/QUIC。"}]},{"q":"CDN 缓存未命中时，请求通常怎么走？","choices":[{"t":"回源到源站取内容","ok":true,"why":"边缘没有副本才打源。"},{"t":"立刻改写客户端本机 DNS，指向另一条线路","ok":false,"why":"与缓存未命中无关。"},{"t":"边缘直接废除 TLS，改用明文 HTTP 回源","ok":false,"why":"边缘仍常终止 TLS。"},{"t":"把未命中当成永久失败，客户端只能刷新本地缓存","ok":false,"why":"标准路径是 miss 后回源再填充边缘。"}]}]}
\`\`\`

---

## 6. 八股 × 业务串联

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **L4 负载均衡（Layer 4 Load Balancing）** | 在传输层按 IP、端口、协议转发连接，不解析 HTTP 内容。 | 云 NLB、LVS 把 TCP 443 分到多台机器；适合 TLS 透传、数据库代理。 | L4 LB ≠ 「四层就比七层快很多」；差异在功能。 |
| **L7 负载均衡（Layer 7 Load Balancing）** | 在应用层理解 HTTP/gRPC 等，能按 Host、URL、Header 路由。 | Nginx 把 \`/api\` 转到 Node、静态页转到 OSS；本仓按路径挂多 Core 是同类门面思路。 | L7 不是只能 HTTP 文本；gRPC、WebSocket 也可 L7。 |
| **轮询 / 加权 / 最少连接（Round Robin / Weighted / Least Connections）** | 依次发、按权重比例发、优先发给当前连接数最少的实例。 | 机器性能不一用 weighted；长连接 WebSocket 常用 least_conn。 | 轮询 ≠ 会话保持。 |
| **会话保持 / 粘滞（Session Affinity / Sticky Session）** | 尽量让同一客户端落到同一后端。 | 本地 Session 未共享时需要；更好方案是 Session 放 Redis。 | 粘滞是策略，扩缩容时可能失衡。 |
| **健康检查（Health Check）** | 定期探测后端是否存活，失败则摘除。 | K8s probe、Nginx \`max_fails\`、云 LB 调 \`/health\`。 | 探针通 ≠ 业务逻辑正确。 |
| **TLS 终止 / 透传（TLS Termination / Passthrough）** | 终止：在反代解密；透传：加密原样转给后端。 | 门面统一证书是终止；端到端合规可用透传或再加密。 | 终止 ≠ 「内网可随便裸奔」。 |
| **蓝绿 / 金丝雀 / 灰度（Blue-Green / Canary / Gray Release）** | 两套切换 / 少量流量试新 / 按规则放量。 | 网关按 Header 或百分比打到 v2。 | 灰度侧重发布风险；A/B 侧重产品指标。 |
| **回源 / 回源鉴权（Origin Fetch / Origin Authentication）** | CDN 未命中时向源站拉内容；鉴权保证只有边缘能拉源。 | 安全组只放行 CDN 回源 IP；回源 Host 要与源站 \`server_name\` 一致。 | 回源 ≠ 浏览器直连源站。 |
| **令牌桶 / 漏桶（Token Bucket / Leaky Bucket）** | 攒令牌突发 vs 匀速漏出。 | API 网关限 QPS；令牌桶允许 burst。 | 限流 ≠ 熔断。 |

业务一条链：用户 → CDN/LB → 反代 → 多实例；\`502\` 查上游与健康检查；登录态乱跳查粘滞或改 Redis Session。

---

## 7. 与本仓

主服将多个 Core 的 \`www/<应用>/\` 挂到同一入口，直觉接近「按路径分流的门面」。  
生产环境常在更外层再加云 LB / CDN / TLS。

## 下一步

**Nginx** — 把反代落到 \`proxy_pass\` / \`upstream\`；  
**边缘与出口实务** — 橙云、IP 池、地域；  
第四章 **HTTP 与 www**；番外 **代理引擎**（正向侧对照）。
`;
