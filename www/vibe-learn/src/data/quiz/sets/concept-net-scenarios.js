import { defineQuizSet } from '../schema.js';

/** 场景 · 网络排障与联调 */
export default defineQuizSet({
  id: 'concept-net-scenarios',
  title: '场景 · 网络排障落地',
  kind: 'concept',
  domain: 'net',
  tags: ['网络', '场景', '排障'],
  relatedNodes: ['network-basics', 'http-web', 'reverse-proxy'],
  caption: '分层定位 → 协议选型 → 网关/浏览器联调。',
  questions: [
    {
      id: 'concept-net-scenarios:ping',
      q: '本机 ping 网关通，ping 外网 IP 不通。优先？',
      choices: [
        {
          t: '查出站路由、NAT 与 ACL / 安全组是否放行',
          ok: true,
          why: '已到网关，问题在出站路径。',
        },
        {
          t: '先重写业务接口与前端页面再观察',
          ok: false,
          why: 'ICMP 都不通先别改业务。',
        },
        {
          t: '一定是 TLS 证书过期导致 ping 失败',
          ok: false,
          why: 'ping 不走 TLS。',
        },
        {
          t: '把应用改成 UDP 监听，跨网就会自动通',
          ok: false,
          why: '与路由 / ACL 无关。',
        },
      ],
      relatedNodes: ['routing-nat', 'network-basics'],
    },
    {
      id: 'concept-net-scenarios:port',
      q: '服务监听 127.0.0.1:3000，同事从另一台机器访问失败。原因？',
      choices: [
        {
          t: '只绑了回环地址，外网/局域网到不了；需 0.0.0.0 或反代',
          ok: true,
          why: '回环仅本机可达。',
        },
        {
          t: '端口号 3000 非法，操作系统会拒绝一切对该端口的连接',
          ok: false,
          why: '3000 合法；问题在绑定地址。',
        },
        {
          t: '一定是 DNS 坏了，与监听地址是 127.0.0.1 无关',
          ok: false,
          why: '即使用 IP 直连也会失败。',
        },
        {
          t: '一定是 HTTP 方法写错了，TCP 连通性其实没有问题',
          ok: false,
          why: '先连通再谈方法。',
        },
      ],
      relatedNodes: ['tcp-udp', 'routing-nat'],
    },
    {
      id: 'concept-net-scenarios:301-302',
      q: 'SEO 要「永久换域名」，更贴切的状态码？',
      choices: [
        {
          t: '301 Moved Permanently（永久重定向）',
          ok: true,
          why: '搜索引擎转移权重的常见口径。',
        },
        {
          t: '302 Found（临时重定向）',
          ok: false,
          why: '临时不表达永久迁移。',
        },
        {
          t: '204 No Content（成功无正文）',
          ok: false,
          why: '不是跳转。',
        },
        {
          t: '401 Unauthorized（未认证）',
          ok: false,
          why: '不是跳转。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'concept-net-scenarios:get-cache',
      q: '只读列表接口希望被 CDN 缓存，方法通常应？',
      choices: [
        {
          t: 'GET（偏安全、幂等、可缓存语义）',
          ok: true,
          why: 'POST 默认不当缓存查询。',
        },
        {
          t: '用 POST 当查询，指望 CDN 同样缓存',
          ok: false,
          why: 'POST 默认不当缓存查询。',
        },
        {
          t: '用 CONNECT 建隧道来拉列表',
          ok: false,
          why: '不是列表查询方法。',
        },
        {
          t: '用 TRACE 回显请求来当业务列表接口',
          ok: false,
          why: '非业务列表；且 TRACE 常禁用。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'concept-net-scenarios:ws',
      q: '要服务端持续推行情，相对短轮询更贴切的是？',
      choices: [
        {
          t: 'WebSocket 或同类长连接推送',
          ok: true,
          why: '双向持续通道，减少轮询空耗。',
        },
        {
          t: '只加长 DNS TTL，解析缓存更久就会推送',
          ok: false,
          why: '不解决推送通道。',
        },
        {
          t: '改成 ICMP 回显报文推送行情',
          ok: false,
          why: '不是业务数据通道。',
        },
        {
          t: '只用 301 重定向循环来「推送」',
          ok: false,
          why: '不是推送机制。',
        },
      ],
      relatedNodes: ['http-web', 'tcp-udp'],
    },
    {
      id: 'concept-net-scenarios:health',
      q: '负载均衡把某实例摘掉，最常见的依据是？',
      choices: [
        {
          t: '健康检查连续失败（探活超时/非预期状态码）',
          ok: true,
          why: '探活失败则摘流，避免把流量打到坏实例。',
        },
        {
          t: '证书还有一天过期，就算探活成功也立刻摘流',
          ok: false,
          why: '临期告警≠即时摘流的常规依据。',
        },
        {
          t: 'DNS TTL 设得比较大',
          ok: false,
          why: '与单实例健康检查无关。',
        },
        {
          t: '该实例启用了 HTTP/2',
          ok: false,
          why: '协议版本不是摘流依据。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'net-edge-practice'],
    },
    {
      id: 'concept-net-scenarios:cdn',
      q: '静态资源命中 CDN 后源站几乎无请求，说明？',
      choices: [
        {
          t: '边缘缓存命中，未回源或极少回源',
          ok: true,
          why: '符合 CDN 预期；源站静默≠一定崩溃。',
        },
        {
          t: '源站进程一定已经崩溃，否则会有大量回源',
          ok: false,
          why: '也可能只是边缘命中，源站仍健康。',
        },
        {
          t: '一定是 CORS 配置成了 *',
          ok: false,
          why: 'CORS 与是否回源无必然关系。',
        },
        {
          t: '一定是整站改成了 UDP 传输',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['http-web', 'net-edge-practice'],
    },
    {
      id: 'concept-net-scenarios:timeout',
      q: '客户端 connect 超时，服务 access 日志完全没有记录。更像？',
      choices: [
        {
          t: '包未到达进程：安全组/路由/未监听，连 accept 都没有',
          ok: true,
          why: '到不了 listen 就无 access 日志。',
        },
        {
          t: '业务逻辑一定很慢，但连接已成功建立',
          ok: false,
          why: '慢通常会有接入日志；本题是连不上。',
        },
        {
          t: '一定是 JSON 字段形状写错导致超时',
          ok: false,
          why: '还没进到应用层。',
        },
        {
          t: '一定是浏览器 CORS 拦截造成的 connect 超时',
          ok: false,
          why: 'CORS 发生在读响应阶段，不是 TCP 连不上。',
        },
      ],
      relatedNodes: ['routing-nat', 'tcp-udp', 'reverse-proxy'],
    },
    {
      id: 'concept-net-scenarios:samesite',
      q: '跨站 POST 时 Cookie 没被带上/被拒，常先查？',
      choices: [
        {
          t: 'SameSite / CSRF 相关策略，以及是否需 Secure 的 None',
          ok: true,
          why: '跨站带 Cookie 受 SameSite 等限制。',
        },
        {
          t: '只改子网掩码配置，浏览器就会自动允许跨站携带 Cookie',
          ok: false,
          why: '与 Cookie 策略无关。',
        },
        {
          t: '把传输改成 ICMP 探测包，Cookie 就会随探测自动带上',
          ok: false,
          why: '无关。',
        },
        {
          t: '把业务监听端口改成 22，跨站 POST 就会自动带上 Cookie',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['http-web', 'api-frontend'],
    },
    {
      id: 'concept-net-scenarios:hsts',
      q: '站点强制浏览器之后只走 HTTPS，相关机制是？',
      choices: [
        {
          t: 'HSTS 响应头（Strict-Transport-Security）',
          ok: true,
          why: '浏览器记住该站只许 HTTPS。',
        },
        {
          t: '把 DNS 记录删掉，用户就只能被迫使用 HTTPS 访问',
          ok: false,
          why: '不能代替 HSTS。',
        },
        {
          t: '只开 CORS *，浏览器就会强制之后只走 HTTPS',
          ok: false,
          why: '无关。',
        },
        {
          t: '把监听改成 UDP 443，就等于开启了站点级 HSTS',
          ok: false,
          why: '无关；HSTS 是 HTTP 响应头策略。',
        },
      ],
      relatedNodes: ['dns-https', 'http-web'],
    },
    {
      id: 'concept-net-scenarios:range',
      q: '大文件断点续传，HTTP 常靠什么？',
      choices: [
        {
          t: 'Range 请求与 206 Partial Content 分片响应',
          ok: true,
          why: '按字节范围取回剩余部分。',
        },
        {
          t: '只用 301 重定向到另一台机器，就算完成断点续传',
          ok: false,
          why: '不是分片续传机制。',
        },
        {
          t: '改成 ICMP 传文件内容，由客户端拼回完整文件',
          ok: false,
          why: '不是文件传输通道。',
        },
        {
          t: '把 DNS TTL 设为 1 秒，浏览器就会自动续传大文件',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'concept-net-scenarios:flatten',
      q: 'API 成功响应把字段拍平到顶层，前端却读 json.data.xxx？',
      choices: [
        {
          t: '契约不一致：常读到 undefined；应对齐解包约定',
          ok: true,
          why: '本仓 HttpResponse 普通对象拍平；前端勿默认只认 data。',
        },
        {
          t: '一定是 TCP 半包导致 JSON 少字段',
          ok: false,
          why: '先对契约形状，不要先怪半包。',
        },
        {
          t: '打开 CORS 后字段会自动进 data 包裹',
          ok: false,
          why: 'CORS 不改响应 JSON 形状。',
        },
        {
          t: '只要状态码是 200，前端就可以乱猜字段路径',
          ok: false,
          why: '200≠字段约定正确。',
        },
      ],
      relatedNodes: ['http-hands-on', 'api-frontend'],
    },
  ],
});
