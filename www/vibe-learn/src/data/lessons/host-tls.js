export default `# TLS 证书实务

> 浏览器地址栏的锁 = **TLS（HTTPS）**。证书证明「你连的大概是这个域名的服务端」，并加密传输。  
> 概念层见第三章 **DNS 与 HTTPS**；本课钉**上机与续期**。  
> **学会之后**：能按 DNS→80/443→ACME→网关终止检查清单排障申请失败。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 三角 | 域名解析、证书校验、网关终止 TLS |
| 排障 | 申请失败先查 DNS 与 80 放行 |
| 续期 | 知 LE 约 90 天；说明谁在自动续 |
| 私钥 | 不进 Git、不进公开聊天 |

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

\`\`\`flip
{"title":"TLS 翻卡","cards":[{"front":"申请失败最多因？","back":"DNS 未指到本机 / 80 未放行"},{"front":"Node 要不要自己听 443？","back":"通常不必；网关终止 TLS 即可"},{"front":"面板一键证书","back":"本质仍是 ACME；失败看校验日志"},{"front":"私钥","back":"留在服务器；勿提交 Git、勿贴进公开聊天"}]}
\`\`\`

\`\`\`pick
{"title":"TLS 三角归类","caption":"各环节该先确认什么。","bins":[{"id":"dns","label":"DNS"},{"id":"port","label":"端口放行"},{"id":"term","label":"网关终止"},{"id":"secret","label":"私钥保管"}],"items":[{"id":"a","text":"A/AAAA 指到这台机","bin":"dns"},{"id":"b","text":"安全组开 80/443","bin":"port"},{"id":"c","text":"Nginx/面板卸证书","bin":"term"},{"id":"d","text":"勿提交 Git / 勿贴公开聊天","bin":"secret"}]}
\`\`\`

> 申请前先看解析与证书形态（假输出；真机用 dig / curl）。

\`\`\`term
{"title":"DNS 与证书一眼（假）","prompt":"$ ","env":"运维机（演示）","steps":[{"type":"in","text":"dig +short example.com A"},{"type":"out","text":"93.184.216.34"},{"type":"in","text":"curl -sSI https://example.com | head -n 8"},{"type":"out","text":"HTTP/2 200\\nserver: nginx\\ndate: Wed, 05 Aug 2026 06:00:00 GMT\\ncontent-type: text/html"}]}
\`\`\`

\`\`\`shell
{"preset":"nginx-probe"}
\`\`\`

## 面板差异（直觉）

| 路径 | 常见做法 |
|------|----------|
| **宝塔** | 网站 → SSL → Let's Encrypt / 其它；可开强制 HTTPS |
| **1Panel** | 网站/应用侧申请与续期；同样依赖 DNS + 80/443 |
| **纯 Nginx** | certbot 或 acme.sh + 续期 hook 重载 Nginx |

## Coding Agent 协作

\`\`\`prompt
目标：域名已解析到服务器；反代已指到 127.0.0.1:主服端口。请给出申请/续期 Let's Encrypt（或面板一键证书）的步骤。
现场：面板或纯 Nginx=…；域名=…；80/443 是否已放行=…
约束：先确认 DNS 生效再申请；不要关掉仅 HTTP 的调试入口除非我确认；私钥勿贴进可提交的仓。
验收：浏览器锁标出现；证书域名匹配；说明续期谁在管（面板/cron）。
\`\`\`

## 下一步

**备份与恢复** · **面板上跑 Node**。
## 导图2 · HTTPS / 部署 / 域名 × 主机 TLS

> 证书申请与续期；与反代配合。概念接第三章 HTTPS。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **HTTPS** | 锁标志 | 证书链与域名匹配 |
| **域名** | 证书身份 | SAN/CN 要盖住访问名 |
| **部署上线** | 入口加密 | 终止常在 Nginx/面板 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
