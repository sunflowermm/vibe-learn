export default `# Nginx

> **Nginx**（读作 engine-x）：高人气的 **Web 服务器 / 反向代理**。  
> 常干三件事：**挂静态文件**、**把请求转给后面的应用**、**在入口做 TLS（HTTPS）**。  
> **概念总论**是上一张 **反向代理与 CDN**；本课钉 **产品直觉**。  
> 和 **Docker** 可以组合用，但 Docker 在番外 **容器**——先分清「门面」与「打包」。  
> **学会之后**：能画出「443 → Nginx → 127.0.0.1:业务口」，并说出 \`proxy_pass\` / 静态 / TLS 终止各管什么。

## 学会之后（验收）


\`\`\`check
{"title":"Nginx 门面通关","items":[{"id":"role","text":"能说出 Nginx=反代/门面，不是业务 Runtime"},{"id":"tls","text":"知道证书常挂在门面这一层"},{"id":"up","text":"upstream 指向本机/内网 Node 端口"},{"id":"curl","text":"会用 curl -I 看门面是否 200/502"}]}
\`\`\`

\`\`\`reveal
{"title":"502 常见形态","prompt":"门面活着、上游挂了","tone":"warn","face":"HTTP/1.1 502 Bad Gateway\\nServer: nginx/1.24.0\\nContent-Type: text/html\\n\\n<html>\\n<head><title>502 Bad Gateway</title></head>","body":"Nginx 作为反代能响应，但 upstream（如 Node:8080）连不上或超时。先看上游进程/端口/防火墙，再查 nginx error.log。"}
\`\`\`


| 能力 | 成功信号 |
|------|----------|
| 分层 | 门面 ≠ 业务框架 ≠ 容器引擎 ≠ DBMS |
| 三件事 | 静态、反代、TLS 终止各一句 |
| 本仓 | 开发可直连 Node 端口；上线常 Nginx/面板反代 |
| 对照 | Caddy/Traefik/云 LB 同属入口层，配置形态不同 |

## 本课你要带走什么

1. Nginx 属于哪一层（门面，不是业务框架、不是容器引擎）  
2. 和 Node 本仓开发态怎么对照  
3. 和 Caddy / Traefik / 云 LB 的粗对照  

---

## 1. 它是什么

\`\`\`match
{"title":"Nginx 角色配对","pairs":[{"id":"rp","left":"反向代理","right":"对外统一入口，转到后端"},{"id":"static","left":"静态资源","right":"直接吐 HTML/JS/图"},{"id":"tls","left":"TLS 终止","right":"在入口卸证书，后面可明文或再加密"},{"id":"not","left":"不是","right":"编程语言运行时 / 数据库"}]}
\`\`\`

| 点 | 说明 |
|----|------|
| **分类** | Web 服务器 / 反向代理（工程上也常归「网关」） |
| **典型端口** | 80（HTTP）、443（HTTPS） |
| **配置** | \`nginx.conf\`、\`server\` / \`location\` / \`proxy_pass\` |
| **不是** | 编程语言；不是 Docker；不替代 Express 写业务 |

\`\`\`mermaid
flowchart LR
  U[用户] -->|443 HTTPS| N[Nginx]
  N -->|静态| FS[dist / www 文件]
  N -->|proxy_pass| APP[127.0.0.1:业务端口]
\`\`\`

## 2. 和本仓怎么对照

| 场景 | 常见做法 |
|------|----------|
| **本机开发** | 直接 \`node app\` 听业务口；浏览器打 \`localhost:端口\` |
| **VPS / 上线** | 只对公网开 80/443；Nginx（或面板反代）转到本机 Node |
| **www 静态** | Vite 构建 \`dist\` 可由 Nginx \`root\`/\`alias\` 挂，或由本仓 Core 静态挂载 |
| **证书** | 多在 Nginx/面板终止 TLS；见主机运维 **TLS** 课 |

本仓主服仍是 **Node ≥ 26 + pnpm**；Nginx **不替代** AgentRuntime，只做门口。

\`\`\`diff
{"title":"proxy_pass 对错一眼","ask":"哪边会把流量转到本机业务口？","badLabel":"常见错法","goodLabel":"正确写法","bad":"location /api/ {\\n  proxy_pass http://127.0.0.1:80;\\n}","good":"location /api/ {\\n  proxy_pass http://127.0.0.1:8080;\\n}","why":"upstream 必须是业务实际监听口；写成 80 常会环回门面自己或打错服务 → 502。"}
\`\`\`

## 3. 粗对照（选型口语）

| 产品 | 直觉 |
|------|------|
| **Nginx** | 配置成熟、资料多；\`proxy_pass\` 心智经典 |
| **Caddy** | 自动 HTTPS 友好；配置更「声明式」 |
| **Traefik** | 容器/动态路由友好 |
| **云负载均衡** | 托管入口；后面仍是你的源站或集群 |

面板（宝塔/1Panel）里的「反代 / 网站」底层常是 Nginx 或同类——概念回 **反向代理**，操作回面板课。

## 4. 最小排障

| 症状 | 先查 |
|------|------|
| 502 Bad Gateway | 后面 Node 是否在听；\`proxy_pass\` 端口是否对 |
| 证书报错 | DNS 是否指到本机；80/443 是否放行（TLS 课） |
| 静态 404 | \`root\`/\`alias\` 与 \`try_files\` 路径 |
| 能本机访问、外网不行 | 安全组 / 防火墙是否只开了对的协议+端口 |

> 先认状态行（假输出）；再进可输入沙箱自己敲 \`curl -I\`。

\`\`\`term
{"title":"门面探活 · 200 vs 502","prompt":"$ ","env":"运维机（演示）","steps":[{"type":"in","text":"curl -I https://example.com"},{"type":"out","text":"HTTP/2 200\\nserver: nginx/1.24.0\\ncontent-type: text/html"},{"type":"in","text":"curl -I https://example.com/api/health"},{"type":"out","text":"HTTP/1.1 502 Bad Gateway\\nServer: nginx/1.24.0\\nContent-Type: text/html"}]}
\`\`\`

\`\`\`shell
{"preset":"nginx-probe"}
\`\`\`

\`\`\`quiz
{"title":"Nginx","questions":[{"q":"本仓上线后，业务插件代码应写在哪？","choices":[{"t":"写进 nginx.conf 当脚本","ok":false,"why":"Nginx 是门面，不是业务运行时。"},{"t":"仍在 Node 主服 / Core；Nginx 只反代或挂静态","ok":true,"why":"分层：入口 vs 业务。"},{"t":"必须放进 Docker 镜像才算 Nginx","ok":false,"why":"Nginx 与容器可组合可分离。"}]},{"q":"浏览器 502，优先怀疑？","choices":[{"t":"换一个更大的 LLM 模型","ok":false,"why":"与网关上游无关。"},{"t":"上游业务进程没起来或端口配错","ok":true,"why":"502 常见于反代连不上后端。"},{"t":"一定是 DNS 没配","ok":false,"why":"DNS 错更常是连错主机或无法解析。"}]}]}
\`\`\`

## Coding Agent

\`\`\`prompt
目标：为本仓业务端口写一份最小 Nginx server 反代草稿（含 80→443 跳转思路）。
现场：域名=…；业务听 127.0.0.1:端口=…；是否已有面板=…
约束：不要把业务逻辑写进 Nginx；不要建议裸奔业务端口到公网；证书步骤可另附清单。
验收：给出 server/location/proxy_pass 要点；说明如何用 curl -I 验收。
\`\`\`

## 八股 × 业务串联

| 名词（全称） | 白话 | 业务里长什么样 | 别和谁搞混 |
|--------------|------|----------------|------------|
| **Reverse Proxy（反向代理）** | 对外统一入口，转到内部多个上游 | Nginx \`proxy_pass\` 到 Node | 正向代理（Clash）更靠近客户端 |
| **TLS termination（TLS 终止）** | 在入口解密 HTTPS | 443 卸证书，后面可 HTTP 回源 | 不等于「整个链路再无加密需求」的借口 |
| **proxy_pass** | 把匹配到的请求转给上游 URL | \`location /api/ { proxy_pass http://127.0.0.1:PORT; }\` | 不是 DNS；也不是业务路由框架 |
| **try_files** | 按顺序尝试文件，常用于 SPA fallback | 静态站 \`try_files $uri /index.html\` | 与 API 反代 location 要分开 |

## 下一步

**边缘与出口实务** — CDN、回源、出口与地域；  
第四章 **HTTP 与 www** — 本仓挂载与 Auth；  
证书上机 → 番外 **TLS**；面板操作 → **主机面板**。
## 导图2 · CDN / HTTPS / 部署 × Nginx 产品

> 导图2 常把「上线」说成部署+HTTPS+CDN；本课钉 **Nginx 这一件产品**怎么当门面。  
> **分层仍以本课为准**：门面 ≠ 业务 Node ≠ 容器 ≠ DBMS。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **部署上线** | 站点可访问 | 常是 80/443 → Nginx → \`127.0.0.1:业务口\` |
| **HTTPS** | 锁标志 | 典型在 Nginx **TLS 终止**；证书与 \`server\` 块 |
| **CDN** | 边缘副本 | 常在更外侧；本课 Nginx 仍可当源站/反代 |
| **重定向** | 跳转 | \`return\` / \`rewrite\`；HTTP→HTTPS、裸域→www |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
