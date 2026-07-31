import { defineQuizSet } from '../schema.js';

/**
 * 网络/HTTP：表述对齐常见教材与 RFC 9110 方法语义（幂等）、TCP 三次握手标准说法。
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
      q: '传输控制协议（TCP）相对用户数据报协议（UDP），教材里的标准差别是什么？',
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
          why: '说反了；TCP 提供可靠有序字节流，UDP 不保证。',
        },
      ],
      relatedNodes: ['tcp-udp', 'protocol-stack'],
    },
    {
      q: '浏览器地址栏出现「小锁」图标，通常表示什么？',
      choices: [
        {
          t: '页面经超文本传输安全协议（HTTPS/TLS）加密，且证书与域名校验通过',
          ok: true,
          why: '锁代表传输通道安全；不证明站点没有业务漏洞或钓鱼逻辑。',
        },
        {
          t: '网站业务代码与服务器一定没有任何安全漏洞',
          ok: false,
          why: 'TLS 只保护传输；SQL 注入、越权等应用层问题仍可能存在。',
        },
        {
          t: '页面一定使用了 HTTP/3（QUIC）协议',
          ok: false,
          why: 'HTTP/1.1、HTTP/2 over TLS 同样会显示小锁。',
        },
        {
          t: '仅表示域名系统（DNS）已解析成功，数据尚未加密',
          ok: false,
          why: 'DNS 解析发生在连接前；小锁对应 TLS 会话已建立。',
        },
      ],
      relatedNodes: ['dns-https', 'http-web'],
    },
    {
      q: '反向代理对外监听 443 终止 TLS，再转发到本机 Node 端口，常见目的是什么？',
      choices: [
        {
          t: '在边缘统一处理证书与 HTTPS，应用只监听本机端口，减少公网暴露',
          ok: true,
          why: 'Nginx/Caddy/面板常见分层；Node 不必自己 bind 公网 443。',
        },
        {
          t: '强制 Node 进程必须直接绑定 0.0.0.0:443 才合法',
          ok: false,
          why: '通常由反代听 443；应用 listen 127.0.0.1:3000 即可。',
        },
        {
          t: '有了反代就不再需要域名系统（DNS）做域名解析',
          ok: false,
          why: '用户仍要通过 DNS 找到服务器 IP；反代与 DNS 正交。',
        },
        {
          t: '反向代理会自动把 UDP 变成可靠传输',
          ok: false,
          why: '反代转发不改变 TCP/UDP 语义；可靠传输仍由 TCP/TLS 负责。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'net-nginx'],
    },
    {
      q: '按 RFC 9110，下列哪组 HTTP 方法在语义上通常视为幂等（idempotent）？',
      choices: [
        {
          t: 'GET、HEAD、PUT、DELETE（以及 OPTIONS、TRACE 等）',
          ok: true,
          why: '幂等指多次执行副作用与一次相同；POST 创建资源通常非幂等。',
        },
        {
          t: '只有 POST 方法是幂等的',
          ok: false,
          why: 'POST 常用于创建资源，重复提交可能产生多条记录。',
        },
        {
          t: '所有 HTTP 方法都天然非幂等',
          ok: false,
          why: 'GET 只读、PUT 覆盖同一资源等，在规范中属于幂等方法。',
        },
        {
          t: '只有 WebSocket 升级后的帧才算幂等',
          ok: false,
          why: 'WebSocket 是全双工协议；与 HTTP 方法幂等定义无关。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      q: 'TCP 三次握手（SYN / SYN-ACK / ACK）主要要达成什么目标？',
      choices: [
        {
          t: '双方确认彼此可达，并同步初始序号（ISN），建立连接状态',
          ok: true,
          why: '握手后才进入可靠传输；序号是后续确认与重传的基础。',
        },
        {
          t: '在 TCP 握手阶段就完成全部应用层数据的加密',
          ok: false,
          why: '应用层加密多在 TLS 握手；TCP 握手本身不加密业务数据。',
        },
        {
          t: '向权威 DNS 服务器申请 A/AAAA 记录',
          ok: false,
          why: 'DNS 解析在用户查域名时发生，不是 TCP 握手职责。',
        },
        {
          t: '协商 HTTP 404、500 等状态码的具体含义',
          ok: false,
          why: '状态码是 HTTP 应用层语义；TCP 只建立可靠字节通道。',
        },
      ],
      relatedNodes: ['tcp-udp'],
    },
    {
      q: 'HTTP/1.1 持久连接（Keep-Alive）的主要收益是什么？',
      choices: [
        {
          t: '同一 TCP 连接上依次完成多个请求-响应，摊薄握手与慢启动成本',
          ok: true,
          why: '相对每请求新建 TCP 更省延迟；勿与 HTTP/2 多路复用或少见的 HTTP/1.1 pipelining 混为一谈。',
        },
        {
          t: '自动防御结构化查询语言（SQL）注入攻击',
          ok: false,
          why: '注入是应用层输入校验问题，与 HTTP 连接是否持久无关。',
        },
        {
          t: '取消 HTTP 状态码，所有响应都变成 200',
          ok: false,
          why: 'Keep-Alive 只复用连接；状态码语义完全保留。',
        },
        {
          t: '把默认传输层从 TCP 换成 UDP',
          ok: false,
          why: 'HTTP/1.1 仍跑在 TCP 上；UDP/QUIC 是另一传输路径。',
        },
      ],
      relatedNodes: ['http-web', 'tcp-udp'],
    },
    {
      id: 'interview-net-http:sc-401-403',
      q: '联调时 401 与 403，开口怎么分？',
      choices: [
        {
          t: '401 未认证/凭证无效；403 已识别身份但无权限',
          ok: true,
          why: '处理不同：401 去登录，403 改 ACL/角色。',
        },
        {
          t: '两者完全同义可互换',
          ok: false,
          why: '客户端处理路径不同。',
        },
        {
          t: '403 表示资源不存在',
          ok: false,
          why: '不存在更常 404。',
        },
        {
          t: '401 表示网关超时',
          ok: false,
          why: '超时是 504/408 等。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'interview-net-http:sc-502-504',
      q: '反代后出现 502 与 504，怎么讲？',
      choices: [
        {
          t: '502 上游应答无效；504 网关等上游超时——先查上游进程/耗时',
          ok: true,
          why: '边缘排障分层：网关日志 + 上游健康。',
        },
        {
          t: '两者都表示浏览器缓存命中',
          ok: false,
          why: '缓存命中是 304 等。',
        },
        {
          t: '502 等于 404',
          ok: false,
          why: '404 是资源不存在。',
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
      id: 'interview-net-http:sc-429',
      q: '开放 API 返回 429 时，调用方与服务方各应注意？',
      choices: [
        {
          t: '调用方退避重试（看 Retry-After）；服务方限流与配额防刷',
          ok: true,
          why: '大厂开放平台高频考点。',
        },
        {
          t: '429 表示创建成功',
          ok: false,
          why: '201/200 才是成功创建/成功。',
        },
        {
          t: '应改成 200 并在 body 里写失败',
          ok: false,
          why: '状态码应诚实表达限流。',
        },
        {
          t: '429 只出现在浏览器，API 不会有',
          ok: false,
          why: 'API 网关限流常用 429。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
  ],
});
