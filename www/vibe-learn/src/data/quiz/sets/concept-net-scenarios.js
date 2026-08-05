import { defineQuizSet } from '../schema.js';

/** 场景 · 网络排障与联调（大厂口径，选项等长） */
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
        { t: '查出站路由/NAT/ACL', ok: true, why: '已到网关，问题在出站路径。' },
        { t: '先重写业务接口', ok: false, why: 'ICMP 都不通先别改业务。' },
        { t: '一定是证书过期', ok: false, why: 'ping 不走 TLS。' },
        { t: '改成 UDP 就会通', ok: false, why: '与路由 ACL 无关。' },
      ],
      relatedNodes: ['routing-nat', 'network-basics'],
    },
    {
      id: 'concept-net-scenarios:port',
      q: '服务监听 127.0.0.1:3000，同事访问失败。原因？',
      choices: [
        { t: '只绑回环，外网到不了', ok: true, why: '需 0.0.0.0 或反代。' },
        { t: '端口号非法必失败', ok: false, why: '3000 合法。' },
        { t: '一定是 DNS 坏了', ok: false, why: 'IP 直连也会失败。' },
        { t: 'HTTP 方法写错了', ok: false, why: '先连通再谈方法。' },
      ],
      relatedNodes: ['tcp-udp', 'routing-nat'],
    },
    {
      id: 'concept-net-scenarios:301-302',
      q: 'SEO 要「永久换域名」，更贴切？',
      choices: [
        { t: '301 永久重定向', ok: true, why: '搜索引擎转移权重口径。' },
        { t: '302 临时重定向', ok: false, why: '临时不表达永久迁移。' },
        { t: '204 无内容', ok: false, why: '不是跳转。' },
        { t: '401 未认证', ok: false, why: '不是跳转。' },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'concept-net-scenarios:get-cache',
      q: '只读列表接口被 CDN 缓存，方法通常应？',
      choices: [
        { t: 'GET（可缓存语义）', ok: true, why: 'GET 偏安全幂等可读。' },
        { t: 'POST 当查询', ok: false, why: 'POST 默认不当缓存查询。' },
        { t: 'CONNECT 隧道', ok: false, why: '不是列表查询。' },
        { t: 'TRACE 回显', ok: false, why: '非业务列表。' },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'concept-net-scenarios:ws',
      q: '要服务端持续推行情，相对短轮询更贴？',
      choices: [
        { t: 'WebSocket/长连接推送', ok: true, why: '双向持续通道。' },
        { t: '只加长 DNS TTL', ok: false, why: '不解决推送。' },
        { t: '改成 ICMP 推送', ok: false, why: '不是业务通道。' },
        { t: '只用 301 跳转', ok: false, why: '不是推送。' },
      ],
      relatedNodes: ['http-web', 'tcp-udp'],
    },
    {
      id: 'concept-net-scenarios:health',
      q: '负载均衡把实例摘掉，常见依据？',
      choices: [
        { t: '健康检查连续失败', ok: true, why: '探活失败则摘流。' },
        { t: '证书即将过期一天', ok: false, why: '不等于即时摘流依据。' },
        { t: 'DNS TTL 较大', ok: false, why: '无关。' },
        { t: '用了 HTTP/2', ok: false, why: '无关。' },
      ],
      relatedNodes: ['reverse-proxy', 'net-edge-practice'],
    },
    {
      id: 'concept-net-scenarios:cdn',
      q: '静态资源命中 CDN 后源站几乎无请求，说明？',
      choices: [
        { t: '边缘缓存命中', ok: true, why: '未回源或少回源。' },
        { t: '源站进程已崩溃', ok: false, why: '也可能只是未回源。' },
        { t: '一定是 CORS 全开', ok: false, why: '无关。' },
        { t: '一定是改成了 UDP', ok: false, why: '无关。' },
      ],
      relatedNodes: ['http-web', 'net-edge-practice'],
    },
    {
      id: 'concept-net-scenarios:timeout',
      q: '客户端 connect 超时，服务 access 无日志。更像？',
      choices: [
        { t: '包未到进程（ACL/路由）', ok: true, why: '到不了 listen 就无 access。' },
        { t: '业务逻辑必很慢', ok: false, why: '慢会有接入日志。' },
        { t: '一定是 JSON 形状错', ok: false, why: '还没进到应用。' },
        { t: '一定是 CORS', ok: false, why: 'CORS 在浏览器读响应。' },
      ],
      relatedNodes: ['routing-nat', 'tcp-udp', 'reverse-proxy'],
    },
    {
      id: 'concept-net-scenarios:samesite',
      q: '跨站 POST 带 Cookie 被拒，常查？',
      choices: [
        { t: '查跨站 Cookie 策略', ok: true, why: 'SameSite/CSRF 限制跨站带 Cookie。' },
        { t: '只改子网掩码配置', ok: false, why: '无关。' },
        { t: '把传输改成探测包', ok: false, why: '无关。' },
        { t: '把监听端口改成 22', ok: false, why: '无关。' },
      ],
      relatedNodes: ['http-web', 'api-frontend'],
    },
    {
      id: 'concept-net-scenarios:hsts',
      q: '站点强制浏览器只走 HTTPS，相关机制？',
      choices: [
        { t: 'HSTS 响应头', ok: true, why: '记住只许 HTTPS。' },
        { t: '把 DNS 删掉', ok: false, why: '不能代替 HSTS。' },
        { t: '只开 CORS *', ok: false, why: '无关。' },
        { t: '监听改成 UDP', ok: false, why: '无关。' },
      ],
      relatedNodes: ['dns-https', 'http-web'],
    },
    {
      id: 'concept-net-scenarios:range',
      q: '大文件断点续传，HTTP 常靠？',
      choices: [
        { t: 'Range / 206 分片', ok: true, why: '按字节范围取。' },
        { t: '只用 301 跳转', ok: false, why: '不是分片。' },
        { t: '改成 ICMP 传文件', ok: false, why: '不是文件通道。' },
        { t: 'DNS TTL=1', ok: false, why: '无关。' },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'concept-net-scenarios:flatten',
      q: 'API 字段拍平顶层，前端读 data.xxx？',
      choices: [
        { t: '契约不一致，常 undefined', ok: true, why: '先对齐形状。' },
        { t: '一定是 TCP 半包', ok: false, why: '先对契约。' },
        { t: '开 CORS 会进 data', ok: false, why: 'CORS 不改形状。' },
        { t: '200 就可乱猜字段', ok: false, why: '200≠字段约定。' },
      ],
      relatedNodes: ['http-hands-on', 'api-frontend'],
    },
  ],
});
