import { defineQuizSet } from '../schema.js';

/**
 * 大厂开口：TCP/TLS/幂等 + 状态码联调。
 * 命题：mcq-expert（一题一事）。
 */
export default defineQuizSet({
  id: 'interview-net-http',
  title: '大厂 · 网络与 HTTP',
  kind: 'interview',
  domain: 'net',
  tags: ['网络', 'HTTP', 'TCP', 'RFC9110'],
  relatedNodes: ['http-web', 'tcp-udp'],
  caption: 'TCP/TLS/幂等 + 状态码联调开口；一题一挂防串台。',
  questions: [
    {
      id: 'interview-net-http:tcp-udp',
      q: '教材里 TCP 相对 UDP 的标准差别是什么？',
      choices: [
        {
          t: 'TCP 面向连接并提供可靠字节流；UDP 无连接、尽力投递数据报',
          ok: true,
          why: '可靠性靠序号、确认、重传；UDP 不保证顺序与不丢包。',
        },
        {
          t: 'UDP 一定比 TCP 更安全，因为无连接难被攻击',
          ok: false,
          why: '安全取决于 TLS 等上层；无连接不等于加密或鉴权。',
        },
        {
          t: 'TCP 与 UDP 不能使用相同的 16 位端口号概念',
          ok: false,
          why: '二者都有端口；只是分属不同传输层协议号。',
        },
        {
          t: 'UDP 保证按序且不丢包，TCP 反而不保证',
          ok: false,
          why: '说反了。',
        },
      ],
      relatedNodes: ['tcp-udp', 'protocol-stack'],
    },
    {
      id: 'interview-net-http:padlock',
      q: '浏览器地址栏出现「小锁」图标，通常表示什么？',
      choices: [
        {
          t: '页面经 HTTPS/TLS 加密，且证书与域名校验通过',
          ok: true,
          why: '锁代表传输通道安全；不证明站点没有业务漏洞。',
        },
        {
          t: '网站业务代码与服务器一定没有任何安全漏洞',
          ok: false,
          why: 'TLS 只保护传输；SQL 注入、越权等仍可能存在。',
        },
        {
          t: '页面一定使用了 HTTP/3（QUIC）',
          ok: false,
          why: 'HTTP/1.1、HTTP/2 over TLS 同样会显示小锁。',
        },
        {
          t: '仅表示 DNS 已解析成功，数据尚未加密',
          ok: false,
          why: '小锁对应 TLS 会话已建立。',
        },
      ],
      relatedNodes: ['dns-https', 'http-web'],
    },
    {
      id: 'interview-net-http:tls-terminate',
      q: '反向代理对外监听 443 终止 TLS，再转发到本机 Node 端口，常见目的是？',
      choices: [
        {
          t: '在边缘统一证书与 HTTPS，应用只听本机端口，减少公网暴露',
          ok: true,
          why: 'Nginx/Caddy/面板常见分层。',
        },
        {
          t: '强制 Node 必须直接绑定 0.0.0.0:443 才合法',
          ok: false,
          why: '通常由反代听 443；应用 listen 127.0.0.1 即可。',
        },
        {
          t: '有了反代就不再需要 DNS',
          ok: false,
          why: '用户仍要通过 DNS 找到入口 IP。',
        },
        {
          t: '反向代理会自动把 UDP 变成可靠传输',
          ok: false,
          why: '可靠传输仍由 TCP/TLS 负责。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'net-nginx'],
    },
    {
      id: 'interview-net-http:idempotent',
      q: '按 RFC 9110，下列哪组 HTTP 方法在语义上通常视为幂等？',
      choices: [
        {
          t: 'GET、HEAD、PUT、DELETE（以及 OPTIONS、TRACE 等）',
          ok: true,
          why: '幂等指多次执行副作用与一次相同；POST 创建资源通常非幂等。',
        },
        {
          t: '只有 POST 方法是幂等的',
          ok: false,
          why: 'POST 重复提交可能产生多条记录。',
        },
        {
          t: '所有 HTTP 方法都天然非幂等',
          ok: false,
          why: 'GET/PUT/DELETE 等在规范中属于幂等。',
        },
        {
          t: '只有 WebSocket 升级后的帧才算幂等',
          ok: false,
          why: '与 HTTP 方法幂等定义无关。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'interview-net-http:handshake',
      q: 'TCP 三次握手（SYN / SYN-ACK / ACK）主要要达成什么目标？',
      choices: [
        {
          t: '双方确认可达，并同步初始序号（ISN），建立连接状态',
          ok: true,
          why: '握手后才进入可靠传输；序号是确认与重传的基础。',
        },
        {
          t: '在 TCP 握手阶段就完成全部应用层数据的加密',
          ok: false,
          why: '应用层加密多在 TLS 握手。',
        },
        {
          t: '向权威 DNS 服务器申请 A/AAAA 记录',
          ok: false,
          why: 'DNS 不是 TCP 握手职责。',
        },
        {
          t: '协商 HTTP 404、500 等状态码的具体含义',
          ok: false,
          why: '状态码是 HTTP 应用层语义。',
        },
      ],
      relatedNodes: ['tcp-udp'],
    },
    {
      id: 'interview-net-http:keepalive',
      q: 'HTTP/1.1 持久连接（Keep-Alive）的主要收益是？',
      choices: [
        {
          t: '同一 TCP 连接上依次完成多个请求-响应，摊薄握手与慢启动成本',
          ok: true,
          why: '勿与 HTTP/2 多路复用或少见的 pipelining 混为一谈。',
        },
        {
          t: '自动防御 SQL 注入',
          ok: false,
          why: '注入是应用层输入校验问题。',
        },
        {
          t: '取消 HTTP 状态码，所有响应都变成 200',
          ok: false,
          why: 'Keep-Alive 只复用连接。',
        },
        {
          t: '把默认传输层从 TCP 换成 UDP',
          ok: false,
          why: 'HTTP/1.1 仍跑在 TCP 上。',
        },
      ],
      relatedNodes: ['http-web', 'tcp-udp'],
    },
    {
      id: 'interview-net-http:sc-401',
      q: '联调时接口返回 401 Unauthorized，开口应怎么理解？',
      choices: [
        {
          t: '未认证或凭证无效：先去登录/换 Token',
          ok: true,
          why: '处理路径是补身份，不是先改业务权限矩阵。',
        },
        {
          t: '已识别身份但无权限（ACL 拒绝）',
          ok: false,
          why: '那更接近 403。',
        },
        {
          t: '资源不存在',
          ok: false,
          why: '不存在更常 404。',
        },
        {
          t: '网关等上游超时',
          ok: false,
          why: '超时是 504/408 等。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'interview-net-http:sc-403',
      q: '联调时接口返回 403 Forbidden，开口应怎么理解？',
      choices: [
        {
          t: '身份已识别，但当前角色/ACL 不允许该操作',
          ok: true,
          why: '处理路径是改权限，不是再登录一次就能必然好。',
        },
        {
          t: '完全没带凭证，与 401 同义可互换',
          ok: false,
          why: '401/403 客户端处理路径不同。',
        },
        {
          t: '资源一定不存在',
          ok: false,
          why: '不存在更常 404；有时用 404 隐藏存在性是另一策略。',
        },
        {
          t: '上游网关超时',
          ok: false,
          why: '那是 504。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'interview-net-http:sc-502',
      q: '反代后出现 502 Bad Gateway，开口怎么讲？',
      choices: [
        {
          t: '网关从上游拿到无效应答：先查上游进程是否活着、协议是否对',
          ok: true,
          why: '边缘排障：网关日志 + 上游健康。',
        },
        {
          t: '网关等上游超时',
          ok: false,
          why: '超时更常是 504。',
        },
        {
          t: '浏览器缓存命中',
          ok: false,
          why: '缓存协商常见 304。',
        },
        {
          t: '资源不存在（等同 404）',
          ok: false,
          why: '404 是应用找不到资源。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'http-web', 'net-nginx'],
    },
    {
      id: 'interview-net-http:sc-504',
      q: '反代后出现 504 Gateway Timeout，开口怎么讲？',
      choices: [
        {
          t: '网关等上游超时：查上游耗时、超时配置与依赖阻塞',
          ok: true,
          why: '与 502「上游应答无效」区分。',
        },
        {
          t: '上游进程一定完全没启动',
          ok: false,
          why: '也可能活着但极慢；502 更常对应无效/拒绝类。',
        },
        {
          t: '客户端未登录',
          ok: false,
          why: '那是 401。',
        },
        {
          t: '只能改前端文案解决',
          ok: false,
          why: '属基础设施与上游。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'http-web', 'net-nginx'],
    },
    {
      id: 'interview-net-http:sc-429-client',
      q: '开放 API 返回 429 Too Many Requests 时，调用方应优先做什么？',
      choices: [
        {
          t: '按 Retry-After 或指数退避重试，并降低并发',
          ok: true,
          why: '硬刚刷会触发更长封禁。',
        },
        {
          t: '把 429 改写成 200 并在 body 里写失败假装成功',
          ok: false,
          why: '客户端不应伪造状态码语义。',
        },
        {
          t: '视为创建成功（等同 201）',
          ok: false,
          why: '429 是限流，不是创建成功。',
        },
        {
          t: '忽略，因为 429 只会出现在浏览器不会出现在 API',
          ok: false,
          why: 'API 网关限流常用 429。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'interview-net-http:sc-429-server',
      q: '开放 API 侧对 429，服务方应优先落实什么？',
      choices: [
        {
          t: '限流与配额：保护后端，并返回可理解的限流信息',
          ok: true,
          why: '大厂开放平台高频考点。',
        },
        {
          t: '永远返回 200，把失败藏进 body',
          ok: false,
          why: '状态码应诚实表达限流。',
        },
        {
          t: '关闭全部日志以免暴露限流',
          ok: false,
          why: '观测与限流正交。',
        },
        {
          t: '禁用 HTTPS，强制明文以提速',
          ok: false,
          why: '与限流无关且更不安全。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
  ],
});
