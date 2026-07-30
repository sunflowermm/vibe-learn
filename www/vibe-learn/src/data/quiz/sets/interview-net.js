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
  relatedNodes: ['tcp-udp', 'http-web', 'dns-https'],
  caption: '开口对齐教材/RFC：可靠传输、TLS、幂等、握手。',
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
    },
    {
      q: 'HTTP/1.1 持久连接（Keep-Alive）的主要收益是什么？',
      choices: [
        {
          t: '同一 TCP 连接上串行发送多个请求，摊薄握手与慢启动成本',
          ok: true,
          why: '相对每个请求新建 TCP，Keep-Alive 减少延迟与 CPU 开销。',
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
          why: 'HTTP/1.1 仍跑在 TCP 上；UDP 是另一传输层选择（如 QUIC 场景）。',
        },
      ],
    },
  ],
});
