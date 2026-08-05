import { defineQuizSet } from '../schema.js';

/**
 * 大厂 · 网络与 HTTP 一面场景
 * mcq-expert：一题一事、应用/分析、似真干扰
 */
export default defineQuizSet({
  id: 'interview-net-http',
  title: '大厂 · 网络与 HTTP',
  kind: 'interview',
  domain: 'net',
  tags: ['网络', 'HTTP', 'TCP', '排障'],
  relatedNodes: ['http-web', 'tcp-udp', 'dns-https'],
  caption: '分层排障 · 协议选型 · 状态码/CORS/TLS 联调。',
  questions: [
    {
      id: 'interview-net-http:l3',
      q: '同网段能 ping 通，跨网段全部超时。优先查哪一层？',
      choices: [
        {
          t: '三层：路由、默认网关、子网掩码与地址规划',
          ok: true,
          why: '同网段通、跨网段不通，典型是转发/网关问题。',
        },
        {
          t: '先改业务代码逻辑，假设是应用层返回了错误',
          ok: false,
          why: '网络未通时先别改应用。',
        },
        {
          t: '只换一根网线就够了，因为同网段已经证明物理层没问题',
          ok: false,
          why: '同网段通说明本机链路大致可用；跨网段更像路由。',
        },
        {
          t: '把应用改成 UDP 监听，跨网段就会自动通',
          ok: false,
          why: '传输层选型解决不了三层路由不通。',
        },
      ],
      relatedNodes: ['network-basics', 'ip-addressing'],
    },
    {
      id: 'interview-net-http:tcp-udp',
      q: '支付回调要求可靠、有序、可重传。传输层默认更倾向？',
      choices: [
        {
          t: 'TCP：面向连接的可靠字节流',
          ok: true,
          why: '不在业务里赌「尽力而为」丢包。',
        },
        {
          t: '裸 UDP，靠业务无限重试直到「看起来成功」',
          ok: false,
          why: '易双花与一致性风险；金融回调应有可靠通道 + 幂等。',
        },
        {
          t: '把业务载荷直接走 ICMP 控制报文',
          ok: false,
          why: 'ICMP 不是业务载荷通道。',
        },
        {
          t: '只要监听端口是 80，传输就自动可靠',
          ok: false,
          why: '端口号不等于可靠传输机制。',
        },
      ],
      relatedNodes: ['tcp-udp'],
    },
    {
      id: 'interview-net-http:udp',
      q: '实时音视频怕队头阻塞，可容忍少量丢包。更常选？',
      choices: [
        {
          t: 'UDP，或基于 UDP 的实时传输方案（再叠加应用层恢复）',
          ok: true,
          why: '低延迟优先；完整可靠性由上层按需补。',
        },
        {
          t: '必须裸 TCP，并禁止任何丢包与乱序',
          ok: false,
          why: '队头阻塞会伤害实时体验。',
        },
        {
          t: '只用 ICMP 回显报文传媒体流',
          ok: false,
          why: '不是媒体传输通道。',
        },
        {
          t: '把端口改成 443，协议就会自动变成实时友好',
          ok: false,
          why: '端口不决定传输语义。',
        },
      ],
      relatedNodes: ['tcp-udp'],
    },
    {
      id: 'interview-net-http:dns',
      q: '「无法解析主机名」和「连接超时」在排障上怎么分？',
      choices: [
        {
          t: '前者偏 DNS/解析；后者偏连通（路由、防火墙、对端未听）',
          ok: true,
          why: '先分层，再决定查解析还是通链路。',
        },
        {
          t: '两者都只可能是 TLS 证书问题',
          ok: false,
          why: '证书问题多出现在握手阶段，文案也不同。',
        },
        {
          t: '两者都只该怪业务代码，与网络无关',
          ok: false,
          why: '应先排除解析与连通。',
        },
        {
          t: '连接超时就等于 DNS 坏了，二者可互换理解',
          ok: false,
          why: '超时常是防火墙/路由/对端无响应，解析可能已成功。',
        },
      ],
      relatedNodes: ['dns-https', 'network-basics'],
    },
    {
      id: 'interview-net-http:502',
      q: '反代返回 502，但业务进程日志里没有对应 5xx。先查？',
      choices: [
        {
          t: '网关到 upstream 的连通：地址、端口、进程是否在听',
          ok: true,
          why: '502 常表示网关够不着或上游异常断开。',
        },
        {
          t: '只改业务里的异常处理文案，完全不看反代与上游配置',
          ok: false,
          why: '业务未见 5xx，更像入口到上游的路径问题。',
        },
        {
          t: '立刻删光证书并全站重签，当作解决 502 的唯一手段',
          ok: false,
          why: '与 502 无必然关系；证书问题多是握手失败。',
        },
        {
          t: '把上游改成 UDP 监听，认定 502 状态码就会自动消失',
          ok: false,
          why: 'HTTP 反代通常期望 TCP upstream。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'net-nginx'],
    },
    {
      id: 'interview-net-http:504',
      q: '反代返回 504 Gateway Timeout，更贴切的含义？',
      choices: [
        {
          t: '网关已连上上游，但在超时时间内没等到完整响应',
          ok: true,
          why: '区别于「连不上」的 502；查上游慢/死锁/超时配置。',
        },
        {
          t: '一定是证书过期，与上游耗时无关',
          ok: false,
          why: '证书问题多在握手，不是 504 的典型语义。',
        },
        {
          t: '一定是 DNS 失败，请求根本没发出去',
          ok: false,
          why: '能返回 504 通常已进入转发/等待上游阶段。',
        },
        {
          t: '等价于浏览器 CORS 拦截，换 curl 就会变成 200',
          ok: false,
          why: 'CORS 是浏览器策略；504 是网关超时状态码。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'http-web'],
    },
    {
      id: 'interview-net-http:cors',
      q: '同一接口 curl 能通，浏览器控制台报 CORS。说明？',
      choices: [
        {
          t: '浏览器同源策略拦截了跨域响应；需服务端正确放行 CORS',
          ok: true,
          why: 'curl 不受 CORS；通了只证明网络与业务可达。',
        },
        {
          t: '链路正在大量丢包，所以只有浏览器会失败',
          ok: false,
          why: 'curl 已证明可达；现象更像浏览器策略。',
        },
        {
          t: '服务进程已经崩溃，curl 看到的是缓存假成功',
          ok: false,
          why: '更常见是浏览器拦截，服务仍在响应。',
        },
        {
          t: '把协议改成 UDP 就可以绕过 CORS',
          ok: false,
          why: 'CORS 与传输层选型无关。',
        },
      ],
      relatedNodes: ['http-web', 'api-frontend'],
    },
    {
      id: 'interview-net-http:tls',
      q: '浏览器地址栏出现小锁，通常表示什么？',
      choices: [
        {
          t: '当前是 HTTPS，且证书校验通过；通道加密≠业务无漏洞',
          ok: true,
          why: 'TLS 不管越权、注入等应用层问题。',
        },
        {
          t: '业务代码绝无漏洞，可以不做任何安全测试',
          ok: false,
          why: 'TLS 只保护传输通道。',
        },
        {
          t: '一定已经升级到 HTTP/3，否则不会有锁',
          ok: false,
          why: 'HTTP/1.1 与 HTTP/2 同样可以有锁。',
        },
        {
          t: '只表示 DNS 解析成功，与 TLS 无关',
          ok: false,
          why: '小锁对应的是 TLS 会话建立成功。',
        },
      ],
      relatedNodes: ['dns-https', 'http-web'],
    },
    {
      id: 'interview-net-http:401-403',
      q: '用户已登录（身份已知），但仍无权限访问某资源。更贴切状态码？',
      choices: [
        {
          t: '403 Forbidden（授权失败）',
          ok: true,
          why: '已知身份，但权限不够。',
        },
        {
          t: '401 Unauthorized（更偏未认证 / 凭证无效）',
          ok: false,
          why: '未登录或令牌无效时更常见 401。',
        },
        {
          t: '301 Moved Permanently',
          ok: false,
          why: '重定向不是拒绝授权。',
        },
        {
          t: '204 No Content',
          ok: false,
          why: '表示成功且无正文，不是权限拒绝。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'interview-net-http:idem',
      q: '扣款接口可能被网关或客户端重试。服务端应怎么设计？',
      choices: [
        {
          t: '做成幂等：同一业务单号重复请求不重复扣款',
          ok: true,
          why: '网络重试常见；幂等键/状态机是面试高频点。',
        },
        {
          t: '每次重试都再扣一次，用总额对账事后补救即可',
          ok: false,
          why: '双花风险高，不应靠事后对账当设计。',
        },
        {
          t: '改成 UDP 传输就会自动具备业务幂等',
          ok: false,
          why: '传输层选型≠业务幂等语义。',
        },
        {
          t: '只靠前端禁用按钮，服务端可以不做幂等',
          ok: false,
          why: '挡不住超时重试、脚本与多端调用。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'interview-net-http:inbound',
      q: '云主机出网正常，但外网打不进业务端口。先查？',
      choices: [
        {
          t: '安全组 / 防火墙入站规则、NAT，以及进程是否绑对地址',
          ok: true,
          why: '出网通不等于入站已放行。',
        },
        {
          t: '出网既然通了，入站就一定已经全部放开',
          ok: false,
          why: '入站 ACL 通常要显式放行。',
        },
        {
          t: '把服务绑在 127.0.0.1 上对外发布即可',
          ok: false,
          why: '环回地址公网到不了。',
        },
        {
          t: '只要装了 Nginx，安全组就会自动放行端口',
          ok: false,
          why: '反代不替代云安全组配置。',
        },
      ],
      relatedNodes: ['routing-nat', 'tcp-udp'],
    },
    {
      id: 'interview-net-http:edge',
      q: '边缘（反代）终止 TLS，再转发到本机应用，主要目的？',
      choices: [
        {
          t: '统一证书与入口，减少应用进程直接暴露在公网',
          ok: true,
          why: '网关管 HTTPS；应用可听内网端口。',
        },
        {
          t: '强迫每个业务进程自己绑定特权端口 443',
          ok: false,
          why: '边缘终结正是为了避免这一点。',
        },
        {
          t: '让对外流量不再加密，全部改成明文 HTTP',
          ok: false,
          why: '对外仍是 HTTPS；明文只在受控内网段可选。',
        },
        {
          t: '边缘终结只能使用 UDP 443，不能用 TCP',
          ok: false,
          why: '常见仍是 TCP 上的 TLS；HTTP/3 另说。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'dns-https'],
    },
    {
      id: 'interview-net-http:httponly',
      q: '会话 Cookie 加上 HttpOnly，主要防什么？',
      choices: [
        {
          t: '降低 XSS 场景下前端脚本读走会话 Cookie 的风险',
          ok: true,
          why: 'JS 无法 document.cookie 读取；仍要配合 HTTPS 等。',
        },
        {
          t: '替代 HTTPS，让传输层不必再加密',
          ok: false,
          why: 'HttpOnly 不加密传输。',
        },
        {
          t: '让 CORS 策略全部放开，跨域可随意带 Cookie',
          ok: false,
          why: '与 CORS 配置无关。',
        },
        {
          t: '禁止服务器发出任何 HTTP 重定向',
          ok: false,
          why: '与重定向无关。',
        },
      ],
      relatedNodes: ['http-web', 'api-frontend'],
    },
    {
      id: 'interview-net-http:slow',
      q: 'TCP/TLS 握手已成功，但接口仍要数秒才返回。下一步更该？',
      choices: [
        {
          t: '查应用与下游耗时：DB、RPC、锁等待、慢查询',
          ok: true,
          why: '传输已建立，瓶颈多在服务端处理链。',
        },
        {
          t: '先怀疑网线松动，立刻更换整机网卡',
          ok: false,
          why: '握手成功通常说明链路可用。',
        },
        {
          t: '先把子网掩码改成 /8 碰运气加速',
          ok: false,
          why: '解释不了「握手成功但业务慢」。',
        },
        {
          t: '整段通信改成裸 UDP，业务就会自然变快',
          ok: false,
          why: '不解决应用层耗时，还引入可靠性问题。',
        },
      ],
      relatedNodes: ['protocol-stack', 'http-web'],
    },
  ],
});
