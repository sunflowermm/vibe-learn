/** 番外 · 主机运维 · TLS */
export default `# TLS 证书实务

> 浏览器地址栏的锁 = **TLS（HTTPS）**。证书证明「你连的大概是这个域名的服务端」，并加密传输。  
> 概念层见第三章 **DNS 与 HTTPS**；本课钉**上机与续期**。  
> 真源直觉：Let's Encrypt / ACME（HTTP-01 常见要放行 80）。  
> **学会之后**：能按 DNS→80/443→ACME→网关终止检查清单排障申请失败。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 三角 | 域名解析、证书校验、网关终止 TLS |
| 排障 | 申请失败先查 DNS 与 80 放行 |
| 续期 | 知 LE 约 90 天；说明谁在自动续 |
| 私钥 | 不进 Git、不进公开聊天 |

\`\`\`check
{"title":"TLS 通关","items":[{"id":"tri","text":"能复述 DNS → ACME → 网关终止 → 回源","hint":"路径"},{"id":"fail","text":"申请失败先查解析与 80/443","hint":"排障"},{"id":"renew","text":"知道约 90 天续期并说明谁在管","hint":"续期"},{"id":"key","text":"私钥不进 Git / 不贴公开聊天","hint":"私钥"}]}
\`\`\`

## 标志动画：三角路径

\`\`\`algo
{"kind":"tlstri","title":"DNS → 端口 → ACME → 网关终止 → 回源","autoplay":true,"speed":780}
\`\`\`

## 三角关系

\`\`\`mermaid
flowchart LR
  D[域名 A/AAAA 指到服务器] --> C[ACME 校验 / 上传证书]
  C --> N[Nginx/Caddy/面板终止 TLS]
  N --> APP[回源 HTTP → 127.0.0.1:端口]
\`\`\`

| 词 | 白话 |
|----|------|
| **Let's Encrypt** | 常见免费公共 CA；用 ACME 协议自动签发 |
| **ACME** | 自动证书管理环境；校验你「控制该域名」（HTTP-01 / DNS-01 等） |
| **续期** | 证书有过期时间（LE 常见约 90 天）；面板/certbot 常自动续 |
| **终止 TLS** | 在网关解密；后面到 Node 可走本机明文 HTTP |
| **HSTS** | 浏览器强制以后只用 HTTPS；**证书配稳再开** |

## 申请前检查清单

1. 域名 **解析已生效**（\`dig\` / 面板 DNS 查到正确 IP）  
2. 云安全组与本机防火墙已放行 **80**（HTTP-01 常用）和 **443**  
3. 反代/站点已指向正确 upstream（先 HTTP 通再上证书更易排障）  
4. 不要用「自签证书」糊弄公网用户（浏览器会报警）

\`\`\`steps
{"title":"证书最小路径","steps":[{"title":"DNS 生效","body":"域名指向这台机"},{"title":"80/443 通","body":"安全组 + 防火墙"},{"title":"站点/反代就绪","body":"HTTP 先能打到网关"},{"title":"申请证书","body":"面板一键或 certbot/acme.sh"},{"title":"强制 HTTPS","body":"确认锁标与域名匹配后再开跳转"},{"title":"谁续期","body":"记下面板自动续还是 cron"}]}
\`\`\`

\`\`\`pick
{"title":"TLS 三角归类","caption":"各环节该先确认什么。","bins":[{"id":"dns","label":"DNS"},{"id":"port","label":"端口放行"},{"id":"term","label":"网关终止"},{"id":"secret","label":"私钥保管"}],"items":[{"id":"a","text":"A/AAAA 指到这台机","bin":"dns"},{"id":"b","text":"安全组开 80/443","bin":"port"},{"id":"c","text":"Nginx/面板卸证书","bin":"term"},{"id":"d","text":"勿提交 Git / 勿贴公开聊天","bin":"secret"}]}
\`\`\`

\`\`\`term
{"title":"DNS 与证书一眼（假）","prompt":"$ ","env":"运维机（演示）","steps":[{"type":"in","text":"dig +short example.com A"},{"type":"out","text":"93.184.216.34"},{"type":"in","text":"curl -sSI https://example.com | head -n 8"},{"type":"out","text":"HTTP/2 200\\nserver: nginx\\ndate: Wed, 05 Aug 2026 06:00:00 GMT\\ncontent-type: text/html"}]}
\`\`\`

## 面板差异（直觉）

| 路径 | 常见做法 |
|------|----------|
| **宝塔** | 网站 → SSL → Let's Encrypt / 其它；可开强制 HTTPS |
| **1Panel** | 网站/应用侧申请与续期；同样依赖 DNS + 80/443 |
| **纯 Nginx** | certbot 或 acme.sh + 续期 hook 重载 Nginx |

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 终止 | 网关卸 TLS；Node 听本机口即可 |
| 排障 | 先 dig / 防火墙，再看 ACME 日志 |
| 私钥 | 服务器权限收紧；勿进仓 |
| 对照 | 概念回第三章 DNS/HTTPS |

## Coding Agent 协作

\`\`\`prompt
目标：域名已解析到服务器；反代已指到 127.0.0.1:主服端口。请给出申请/续期 Let's Encrypt（或面板一键证书）的步骤。
现场：面板或纯 Nginx=…；域名=…；80/443 是否已放行=…
约束：先确认 DNS 生效再申请；不要关掉仅 HTTP 的调试入口除非我确认；私钥勿贴进可提交的仓。
验收：浏览器锁标出现；证书域名匹配；说明续期谁在管（面板/cron）。
\`\`\`

## 下一步

**备份与恢复** · **面板上跑 Node**。
`;
