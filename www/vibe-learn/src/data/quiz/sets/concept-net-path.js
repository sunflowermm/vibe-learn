import { defineQuizSet } from '../schema.js';

/**
 * 第三章薄弱链精选：协议栈深点 · TCP/UDP 实务 · 路由/NAT · 反代 · 边缘。
 * 填补 routing-nat / reverse-proxy / net-edge-practice curated 过稀。
 */
export default defineQuizSet({
  id: 'concept-net-path',
  title: '概念 · 传输、路由与边缘门面',
  kind: 'concept',
  domain: 'net',
  tags: ['TCP', 'UDP', 'NAT', '反代', 'CDN', '安全组'],
  relatedNodes: [
    'protocol-stack',
    'tcp-udp',
    'routing-nat',
    'reverse-proxy',
    'net-edge-practice',
    'net-nginx',
    'dns-https',
    'ip-addressing',
  ],
  caption: '按因果链：五元组 → 传输选型 → 出网 NAT/ACL → 门面反代 → 边缘回源。',
  questions: [
    {
      id: 'concept-net-path:q1',
      q: '「五元组」通常指哪五样，用来标识一条流？',
      choices: [
        {
          t: '源 IP、目的 IP、源端口、目的端口、传输层协议（TCP/UDP 等）',
          ok: true,
          why: '安全组、连接跟踪、会话保持多按五元组匹配；NAT 会改其中 IP/端口。',
        },
        {
          t: 'URL、方法、状态码、Cookie、User-Agent',
          ok: false,
          why: '那是 L7/HTTP 字段；五元组是 L4 流标识。',
        },
        {
          t: 'MAC、交换机端口、VLAN、光纤波长、机柜号',
          ok: false,
          why: '链路/机房运维信息，不是标准五元组。',
        },
        {
          t: '域名、证书序列号、SNI、TLS 版本、HTTP 版本',
          ok: false,
          why: '偏应用/安全层；五元组在传输与网络层。',
        },
      ],
      relatedNodes: ['protocol-stack', 'routing-nat', 'tcp-udp'],
    },
    {
      id: 'concept-net-path:q2',
      q: 'OSI 七层与 TCP/IP 四层更准确的关系是？',
      choices: [
        {
          t: 'OSI 偏教学参考；工程上网常用 TCP/IP 四层，表示/会话常被应用侧「吞掉」',
          ok: true,
          why: '对照概念用 OSI，排障与编程心智多用 TCP/IP。',
        },
        {
          t: '必须一一对应且层名完全相同',
          ok: false,
          why: '层数与切分不同，不是逐层别名。',
        },
        {
          t: '只有物理层真实存在，其余是虚构',
          ok: false,
          why: '各层都有协议与实现，只是抽象粒度不同。',
        },
        {
          t: 'TCP/IP 已废除网络层，只剩 HTTP',
          ok: false,
          why: 'IP 路由仍是互联网核心。',
        },
      ],
      relatedNodes: ['protocol-stack'],
    },
    {
      id: 'concept-net-path:q3',
      q: '发送数据时「封装」的直觉顺序是？',
      choices: [
        {
          t: '应用数据 → 加传输头 → 加 IP 头 → 加链路帧 → 比特发出；接收则反向剥头',
          ok: true,
          why: '下行加信封，上行拆信封；下层眼里上层常是一串字节。',
        },
        {
          t: '先加物理层帧，最后才写 HTTP',
          ok: false,
          why: '发送是自上而下封装，不是自下而上先写物理。',
        },
        {
          t: '封装等于压缩，体积一定变小',
          ok: false,
          why: '封装是加协议头，通常体积变大。',
        },
        {
          t: '只有 UDP 需要封装，TCP 直接发应用字节',
          ok: false,
          why: 'TCP/UDP 都会加传输头再交给 IP。',
        },
      ],
      relatedNodes: ['protocol-stack'],
    },
    {
      id: 'concept-net-path:q4',
      q: 'IP 头里的 TTL（生存时间）主要防止什么？与 DNS TTL 是否一回事？',
      choices: [
        {
          t: '每经一跳减 1，到 0 丢弃以防环路；与 DNS 记录缓存 TTL 不是一回事',
          ok: true,
          why: 'traceroute 正是利用递增 TTL 看路径；DNS TTL 管缓存多久。',
        },
        {
          t: '两者完全相同，都表示域名缓存秒数',
          ok: false,
          why: '名字碰巧都叫 TTL，语义不同。',
        },
        {
          t: 'TTL 只用于加密 HTTPS',
          ok: false,
          why: 'TTL 在 IP 头，与 TLS 无关。',
        },
        {
          t: 'TTL 越大说明带宽越大',
          ok: false,
          why: 'TTL 是跳数预算，不是带宽。',
        },
      ],
      relatedNodes: ['protocol-stack', 'dns-https'],
    },
    {
      id: 'concept-net-path:q5',
      q: 'TCP 三次握手主要达成什么？',
      choices: [
        {
          t: '双方确认可达并同步初始序号（ISN），进入可传数据的连接状态',
          ok: true,
          why: 'SYN → SYN-ACK → ACK；握手失败时 HTTP 根本发不出去。',
        },
        {
          t: '在握手阶段完成全部业务 JSON 加密',
          ok: false,
          why: '业务加密多在 TLS；TCP 握手本身不加密应用数据。',
        },
        {
          t: '向权威 DNS 申请 A 记录',
          ok: false,
          why: 'DNS 在建连之前；不是握手职责。',
        },
        {
          t: '协商 HTTP 404/500 的含义',
          ok: false,
          why: '状态码是应用层语义。',
        },
      ],
      relatedNodes: ['tcp-udp', 'http-web'],
    },
    {
      id: 'concept-net-path:q6',
      q: '为何常说 TCP 四次挥手而不是三次？',
      choices: [
        {
          t: 'TCP 半关闭：一方 FIN 后另一方向可能还有数据要发，需各自关闭发送方向',
          ok: true,
          why: 'FIN/ACK 与对端 FIN/ACK 分开；TIME_WAIT 在主动关闭方吸收迟到包。',
        },
        {
          t: '因为路由器强制要求四次才能过 NAT',
          ok: false,
          why: '挥手是端到端 TCP 语义，不是 NAT 强制。',
        },
        {
          t: '四次挥手专门用于 UDP',
          ok: false,
          why: 'UDP 无连接，没有这套挥手。',
        },
        {
          t: '第四次是向 DNS 注销域名',
          ok: false,
          why: '与 DNS 无关。',
        },
      ],
      relatedNodes: ['tcp-udp'],
    },
    {
      id: 'concept-net-path:q7',
      q: '开 Minecraft 基岩版（默认 19132）时，安全组只放行 TCP 19132 会怎样？',
      choices: [
        {
          t: '基岩客户端通常仍进不去——必须按 UDP 放行；端口数字对了不够，协议也要对',
          ok: true,
          why: 'Bedrock 走 UDP；Java 版才是常见 TCP 25565。',
        },
        {
          t: 'TCP 与 UDP 在安全组里完全等价，开一个即可',
          ok: false,
          why: '规则匹配协议字段；开错等于没开。',
        },
        {
          t: '只要域名解析成功就一定能进服',
          ok: false,
          why: '解析成功不等于传输层放行。',
        },
        {
          t: '基岩版只走 ICMP，与端口无关',
          ok: false,
          why: '游戏流量走 UDP 端口，不是 ICMP。',
        },
      ],
      relatedNodes: ['tcp-udp', 'routing-nat'],
    },
    {
      id: 'concept-net-path:q8',
      q: 'TCP「粘包」更准确的理解是？',
      choices: [
        {
          t: 'TCP 是字节流、不保留消息边界，应用需自己定帧；不是内核随机把包「粘坏」',
          ok: true,
          why: '定长头/分隔符/长度前缀，或直接用 HTTP 等已分帧协议。',
        },
        {
          t: '只有 UDP 会粘包，TCP 保证一条消息一个段',
          ok: false,
          why: '说反了：UDP 有数据报边界；TCP 无消息边界。',
        },
        {
          t: '粘包等于网线物理短路',
          ok: false,
          why: '是协议语义，不是硬件故障。',
        },
        {
          t: '开启 HTTPS 后粘包自动消失',
          ok: false,
          why: 'TLS 不改变 TCP 字节流本质。',
        },
      ],
      relatedNodes: ['tcp-udp'],
    },
    {
      id: 'concept-net-path:q9',
      q: '目标不在同网段时，主机通常把包交给谁？',
      choices: [
        {
          t: '默认网关；路由器查路由表选下一跳，可能经多跳到达',
          ok: true,
          why: '默认路由 0.0.0.0/0 常指向网关；删了它内网机出不了公网。',
        },
        {
          t: '直接广播 MAC 到全世界，无需网关',
          ok: false,
          why: '跨网必须路由；不能靠二层广播出公网。',
        },
        {
          t: '只改 DNS 就能跨网段送达',
          ok: false,
          why: 'DNS 管名字；跨网靠路由。',
        },
        {
          t: '交换机按 IP 路由跨网',
          ok: false,
          why: '典型交换机 L2 按 MAC；跨网是路由器 L3。',
        },
      ],
      relatedNodes: ['routing-nat', 'ip-addressing'],
    },
    {
      id: 'concept-net-path:q10',
      q: 'SNAT 与 DNAT 的方向直觉？',
      choices: [
        {
          t: 'SNAT 改源地址（多为内网出网）；DNAT 改目的地址/端口（多为公网入站进内网）',
          ok: true,
          why: '家用出网常见 SNAT/PAT；端口转发/LB 入站常见 DNAT。',
        },
        {
          t: '两者完全同义，只是厂商叫法不同',
          ok: false,
          why: '改的是源还是目的，方向不同。',
        },
        {
          t: 'SNAT 专门加密 HTTPS，DNAT 专门做 DNS',
          ok: false,
          why: 'NAT 做地址转换，不做加密/解析。',
        },
        {
          t: '只有 IPv6 需要 SNAT，IPv4 不需要',
          ok: false,
          why: 'IPv4 私网出网正是 NAT 高发区。',
        },
      ],
      relatedNodes: ['routing-nat'],
    },
    {
      id: 'concept-net-path:q11',
      q: 'PAT / NAPT 相对一对一静态 NAT？',
      choices: [
        {
          t: '多内网主机共享一个公网 IP，靠不同源端口区分会话——家庭最常见',
          ok: true,
          why: '并发连接数本质是在数 PAT 表项。',
        },
        {
          t: 'PAT 要求每个内网 IP 固定独占一个公网 IP',
          ok: false,
          why: '那是静态一对一 NAT。',
        },
        {
          t: 'PAT 可以替代全部防火墙 ACL',
          ok: false,
          why: '地址转换 ≠ 放行策略。',
        },
        {
          t: 'PAT 只用于邮件协议',
          ok: false,
          why: '通用出网机制。',
        },
      ],
      relatedNodes: ['routing-nat', 'ip-addressing'],
    },
    {
      id: 'concept-net-path:q12',
      q: '浏览器能上网，但外网访问不到你家/云上的自建服务，优先怀疑？',
      choices: [
        {
          t: '入站未做端口转发/DNAT，或安全组/防火墙入站被拒',
          ok: true,
          why: '出站通不代表入站开；Connection refused vs timed out 也要分清。',
        },
        {
          t: '一定是 CSS 写错',
          ok: false,
          why: '层次不对。',
        },
        {
          t: '一定是数据库事务死锁',
          ok: false,
          why: '外网根本进不来时先查网络入口。',
        },
        {
          t: 'DNS 成功就证明入站已放行',
          ok: false,
          why: '解析成功 ≠ 端口可达。',
        },
      ],
      relatedNodes: ['routing-nat', 'network-basics'],
    },
    {
      id: 'concept-net-path:q13',
      q: '端口转发与反向代理的层次差别？',
      choices: [
        {
          t: '端口转发偏 L3/L4 映射 IP:端口；反代偏 L7，可按 Host/Path 分流',
          ok: true,
          why: '临时暴露开发机常用转发；生产 API 门面更常用 Nginx 类反代。',
        },
        {
          t: '两者完全等价，只是 GUI 不同',
          ok: false,
          why: '懂不懂 URL/Host 是关键差别。',
        },
        {
          t: '反代只能做 UDP，端口转发只能做 TCP',
          ok: false,
          why: '协议能力不如此划分。',
        },
        {
          t: '有了端口转发就不再需要防火墙',
          ok: false,
          why: '暴露面更大，更要 ACL 与认证。',
        },
      ],
      relatedNodes: ['routing-nat', 'reverse-proxy'],
    },
    {
      id: 'concept-net-path:q14',
      q: '正向代理与反向代理的位置直觉？',
      choices: [
        {
          t: '正向靠近客户端（常需配置出网）；反向靠近服务器（客户端通常无感）',
          ok: true,
          why: 'Clash 等属正向；Nginx 门面属反向。',
        },
        {
          t: '正向一定在机房，反向一定在手机里',
          ok: false,
          why: '按谁感知、靠近谁划分，不是设备品牌。',
        },
        {
          t: '反向代理会废除 DNS',
          ok: false,
          why: '用户仍要靠 DNS 找到入口 IP。',
        },
        {
          t: '正向代理专门做 TLS 证书签发',
          ok: false,
          why: '证书常在反代/边缘终止；正向是出网路径。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'net-edge-practice'],
    },
    {
      id: 'concept-net-path:q15',
      q: 'L4 与 L7 负载均衡最关键的能力差别？',
      choices: [
        {
          t: 'L4 按 IP/端口/协议转发；L7 能按 Host、URL、Header 等应用语义路由',
          ok: true,
          why: 'NLB/LVS 偏 L4；Nginx 按路径分流偏 L7。',
        },
        {
          t: 'L7 一定比 L4 慢一个数量级，禁止用于生产',
          ok: false,
          why: '差异在功能，不在绝对禁止。',
        },
        {
          t: 'L4 能看 Cookie，L7 只能看 MAC',
          ok: false,
          why: '说反了：Cookie 是 L7。',
        },
        {
          t: '只有 UDP 能做 L7',
          ok: false,
          why: 'HTTP L7 常见跑在 TCP/QUIC 上。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'protocol-stack', 'net-nginx'],
    },
    {
      id: 'concept-net-path:q16',
      q: '会话粘滞（sticky）解决什么？更好的长期方案往往是？',
      choices: [
        {
          t: '让同一客户端尽量落到同一后端；长期更宜把 Session 放 Redis 等共享存储',
          ok: true,
          why: '粘滞是权宜；本地 Session 未共享时才需要。',
        },
        {
          t: '粘滞等于负载均衡坏了，应立刻删除全部后端',
          ok: false,
          why: '粘滞是刻意策略，不是故障本身。',
        },
        {
          t: '有了粘滞就不必健康检查',
          ok: false,
          why: '实例挂了仍要摘除。',
        },
        {
          t: '粘滞只能用于 ICMP',
          ok: false,
          why: '常见于 HTTP/TCP 应用会话。',
        },
      ],
      relatedNodes: ['reverse-proxy'],
    },
    {
      id: 'concept-net-path:q17',
      q: 'CDN 与源站反向代理的分工直觉？',
      choices: [
        {
          t: 'CDN 把可缓存副本放到近处；反代管应用入口、路由与防护——可叠加',
          ok: true,
          why: '静态命中卸源站；动态 API 仍常回源或经反代。',
        },
        {
          t: 'CDN 替代 DNS，反代替代 IP',
          ok: false,
          why: '二者都不取代寻址与解析体系。',
        },
        {
          t: '有了 CDN 就必须关闭全部 HTTPS',
          ok: false,
          why: '边缘常见 TLS 终止。',
        },
        {
          t: 'CDN 命中率必须 100%，否则架构非法',
          ok: false,
          why: '动态 API 低命中也正常。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'net-edge-practice'],
    },
    {
      id: 'concept-net-path:q18',
      q: 'Cloudflare「橙云」相对「仅 DNS（灰云）」？',
      choices: [
        {
          t: '橙云：访客先到 CF 边缘再回源，源站 IP 不易直暴；灰云：解析直接给出源站 IP',
          ok: true,
          why: '橙云 ≈ 托管全球反代+CDN+可选 WAF；灰云只做权威 DNS。',
        },
        {
          t: '橙云关闭全部 DNS，灰云关闭全部 TLS',
          ok: false,
          why: '两者都仍涉及 DNS；差别在是否代理。',
        },
        {
          t: '橙云只能用于 UDP 游戏端口',
          ok: false,
          why: '经典是 HTTP(S) 站点加速与防护。',
        },
        {
          t: '灰云会自动做 Anycast 隐藏源站',
          ok: false,
          why: '仅 DNS 时源站 IP 对外可见。',
        },
      ],
      relatedNodes: ['net-edge-practice', 'dns-https', 'reverse-proxy'],
    },
    {
      id: 'concept-net-path:q19',
      q: '「源站隐藏」与回源白名单在说什么？',
      choices: [
        {
          t: '对外只暴露边缘 IP；源站防火墙只放行 CDN/边缘回源地址段，防绕过直打',
          ok: true,
          why: '隐藏≠绝对安全，但显著减小公网攻击面。',
        },
        {
          t: '删除全部 DNS 记录即可隐藏',
          ok: false,
          why: '没有解析用户也访问不到你的合法入口。',
        },
        {
          t: '源站必须监听 0.0.0.0:443 对全世界开放',
          ok: false,
          why: '隐藏源站时更应收紧入站。',
        },
        {
          t: '回源白名单等于浏览器 CORS',
          ok: false,
          why: '一个是网络层放行边缘；一个是浏览器同源策略。',
        },
      ],
      relatedNodes: ['net-edge-practice', 'routing-nat'],
    },
    {
      id: 'concept-net-path:q20',
      q: '第三方 API 要求「报备出口 IP」，工程上通常怎么办？',
      choices: [
        {
          t: '使用固定公网出口 / NAT 网关 EIP 池，把出站地址纳入对方白名单',
          ok: true,
          why: '出口白名单是「你打出去对方认」；与入站安全组方向相反。',
        },
        {
          t: '只改前端按钮颜色',
          ok: false,
          why: '无关。',
        },
        {
          t: '把私钥写进 URL 查询串代替白名单',
          ok: false,
          why: '危险且不满足对方网络层约束。',
        },
        {
          t: '关闭 DNS 即可获得固定出口',
          ok: false,
          why: 'DNS 不管出站源地址。',
        },
      ],
      relatedNodes: ['net-edge-practice', 'routing-nat'],
    },
    {
      id: 'concept-net-path:q21',
      q: '健康检查通过是否等于业务一定正确？',
      choices: [
        {
          t: '否；探针只说明端口/路径能响应，业务逻辑错误仍可能 200 胡说',
          ok: true,
          why: '502 场景要查上游与健康检查；但绿勾≠功能正确。',
        },
        {
          t: '是；健康检查通过后禁止再看日志',
          ok: false,
          why: '仍要观测业务指标。',
        },
        {
          t: '健康检查只用于 ICMP，与 HTTP 无关',
          ok: false,
          why: '常见是 HTTP /health 或 TCP 探活。',
        },
        {
          t: '有了粘滞就不需要健康检查',
          ok: false,
          why: '挂掉的粘滞目标更糟。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'net-nginx'],
    },
    {
      id: 'concept-net-path:q22',
      q: 'ping 通但 HTTPS 打不开时，分层结论更接近？',
      choices: [
        {
          t: 'ICMP 可达≠业务端口/TLS/HTTP 正常——继续查端口、证书与进程',
          ok: true,
          why: '安全组禁 ICMP 也可能 ping 不通但网站仍开；反之亦然。',
        },
        {
          t: 'ping 通则一切 Web 必通',
          ok: false,
          why: '经典误解。',
        },
        {
          t: '只能重装操作系统',
          ok: false,
          why: '过激；先分层排障。',
        },
        {
          t: '一定是域名写错（题设已用 IP）',
          ok: false,
          why: '用 IP 访问时仍可能端口/TLS 问题。',
        },
      ],
      relatedNodes: ['routing-nat', 'tcp-udp', 'dns-https', 'network-basics'],
    },
  ],
});
