import { defineQuizSet } from '../schema.js';

/**
 * 第三章深点精选：五元组 · TCP/UDP · 路由/NAT · 反代 · 边缘。
 * 命题：mcq-expert（一题一事；干扰项=似真误判）。
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
  ],
  caption: '按因果链：五元组 → 传输选型 → 出网 NAT/ACL → 门面反代 → 边缘回源。',
  questions: [
    {
      id: 'concept-net-path:q1',
      q: '连接跟踪、安全组、会话保持常按「五元组」匹配。五元组通常指哪五样？',
      choices: [
        {
          t: '源 IP、目的 IP、源端口、目的端口、传输层协议（TCP/UDP）',
          ok: true,
          why: 'NAT 会改其中 IP/端口；L7 的 URL/Cookie 不属于五元组。',
        },
        {
          t: 'URL、方法、状态码、Cookie、User-Agent',
          ok: false,
          why: '那是 L7/HTTP 字段，不是 L4 流标识。',
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
      q: '工程排障时，OSI 七层与 TCP/IP 四层更准确的用法是？',
      choices: [
        {
          t: 'OSI 偏对照教学',
          ok: true,
          why: '表示/会话等常被应用侧「吞掉」，不必逐层死记硬套。',
        },
        {
          t: '必须一一对应且层名完全相同才合法',
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
      q: '主机发送数据时，「封装」的直觉顺序是？',
      choices: [
        {
          t: '应用数据 → 传输头 → IP 头 → 链路帧 →',
          ok: true,
          why: '下行加信封，上行拆信封；下层眼里上层常是一串字节。',
        },
        {
          t: '先写物理层帧，最后才写 HTTP 正文',
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
      q: 'IP 头里的 TTL（生存时间）主要防止什么？',
      choices: [
        {
          t: '包在路由环路中无限转圈',
          ok: true,
          why: 'traceroute 正是利用递增 TTL 看路径。',
        },
        {
          t: '限制域名在解析器里缓存多久',
          ok: false,
          why: '那是 DNS 记录的 TTL，名字碰巧相同、语义不同。',
        },
        {
          t: '决定 HTTPS 是否加密',
          ok: false,
          why: 'TTL 在 IP 头，与 TLS 无关。',
        },
        {
          t: '标记链路带宽大小',
          ok: false,
          why: 'TTL 是跳数预算，不是带宽。',
        },
      ],
      relatedNodes: ['protocol-stack'],
    },
    {
      id: 'concept-net-path:q5',
      q: 'DNS 记录上的 TTL 控制的是什么？',
      choices: [
        {
          t: '解析结果可以被缓存多久，再向权威/上游重新查询',
          ok: true,
          why: '改 DNS 后「多久生效」常与此相关；与 IP 包跳数 TTL 不是一回事。',
        },
        {
          t: 'IP 包每经一跳减一，防路由环路',
          ok: false,
          why: '那是 IP 头 TTL。',
        },
        {
          t: 'TLS 证书剩余有效天数',
          ok: false,
          why: '证书有效期是另一套字段。',
        },
        {
          t: 'TCP 三次握手必须完成的秒数上限',
          ok: false,
          why: '握手超时由栈/应用配置，不是 DNS TTL。',
        },
      ],
      relatedNodes: ['dns-https', 'protocol-stack'],
    },
    {
      id: 'concept-net-path:q6',
      q: 'TCP 三次握手失败时，上层 HTTP 请求通常会怎样？',
      choices: [
        {
          t: '根本发不出去：客户端先卡在「连不上」，谈不上拿到状态码',
          ok: true,
          why: '常见 connection timed out / refused，而不是先看到 404。',
        },
        {
          t: '仍会稳定返回 HTTP 200，只是 body 为空',
          ok: false,
          why: '没有 TCP 连接就没有 HTTP 响应。',
        },
        {
          t: '握手失败会自动改成 UDP 再试业务 JSON',
          ok: false,
          why: 'HTTPS API 不会因握手失败改走 UDP。',
        },
        {
          t: '只影响 DNS，不影响本机到 IP 的建连',
          ok: false,
          why: '握手发生在已有目标 IP 之后；与解析失败是不同阶段。',
        },
      ],
      relatedNodes: ['tcp-udp', 'http-web', 'workbench-troubleshoot'],
    },
    {
      id: 'concept-net-path:q7',
      q: '为何常说 TCP 四次挥手而不是三次？',
      choices: [
        {
          t: '半关闭：一方 FIN 后对端发送方向可',
          ok: true,
          why: 'FIN/ACK 与对端 FIN/ACK 分开；TIME_WAIT 在主动关闭方吸收迟到包。',
        },
        {
          t: '路由器强制要求四次才能过 NAT',
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
      id: 'concept-net-path:q8',
      q: '开 Minecraft 基岩版（默认 19132）时，安全组只放行 TCP 19132 会怎样？',
      choices: [
        {
          t: '通常仍进不去：基岩走 UDP，端口对了协议也要对',
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
      id: 'concept-net-path:q9',
      q: 'TCP「粘包」更准确的理解是？',
      choices: [
        {
          t: 'TCP 是字节流、不保留消息边界，应用需自己定帧',
          ok: true,
          why: '用长度前缀/分隔符，或直接用 HTTP 等已分帧协议；不是内核「粘坏」。',
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
      id: 'concept-net-path:q10',
      q: '目的主机不在同网段时，本机通常把包先交给谁？',
      choices: [
        {
          t: '默认网关；再由路由器查表选下一跳',
          ok: true,
          why: '默认路由 0.0.0.0/0 常指向网关；删了它内网机出不了公网。',
        },
        {
          t: '直接二层广播到全世界，无需网关',
          ok: false,
          why: '跨网必须路由；不能靠二层广播出公网。',
        },
        {
          t: '只改 DNS 就能跨网段送达',
          ok: false,
          why: 'DNS 管名字；跨网靠路由。',
        },
        {
          t: '二层交换机按目的 IP 做跨网路由',
          ok: false,
          why: '典型交换机 L2 按 MAC；跨网是路由器 L3。',
        },
      ],
      relatedNodes: ['routing-nat', 'ip-addressing'],
    },
    {
      id: 'concept-net-path:q11',
      q: '出站改源、入站改目的：哪种 NAT 更贴近哪种方向？',
      choices: [
        {
          t: 'SNAT 改源地址（多为内网出网）；DNAT 改目的（多为端口转发/入站）',
          ok: true,
          why: '家用出网常见 SNAT/PAT；端口转发/LB 入站常见 DNAT。',
        },
        {
          t: '两者完全同义，只是厂商叫法不同，改源还是改目的无所谓',
          ok: false,
          why: '改的是源还是目的，方向不同。',
        },
        {
          t: 'SNAT 专门加密 HTTPS，DNAT 专门完成 DNS 解析',
          ok: false,
          why: 'NAT 做地址转换，不做加密/解析。',
        },
        {
          t: '只有 IPv6 需要 SNAT，IPv4 私网出网完全不需要地址转换',
          ok: false,
          why: 'IPv4 私网出网正是 NAT 高发区。',
        },
      ],
      relatedNodes: ['routing-nat'],
    },
    {
      id: 'concept-net-path:q12',
      q: 'PAT / NAPT 相对一对一静态 NAT，家庭场景更常见的价值是？',
      choices: [
        {
          t: '多内网主机共享一个公网 IP，靠不同源端口区分会话',
          ok: true,
          why: '并发连接数本质是在数 PAT 表项。',
        },
        {
          t: '每个内网 IP 必须固定独占一个公网 IP',
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
      id: 'concept-net-path:q13',
      q: '浏览器能上网，但外网访问不到你家/云上的自建服务，优先怀疑什么？',
      choices: [
        {
          t: '入站未做端口转发/DNAT',
          ok: true,
          why: '出站通不代表入站开；还要分清 refused 与 timed out。',
        },
        {
          t: '一定是前端 CSS 写错',
          ok: false,
          why: '外网根本进不来时层次不对。',
        },
        {
          t: '一定是数据库事务死锁',
          ok: false,
          why: '先查网络入口，再查应用与库。',
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
      id: 'concept-net-path:q14',
      q: '端口转发与反向代理最关键的层次差别是？',
      choices: [
        {
          t: '端口转发偏 L3/L4 映射 IP:端口',
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
      id: 'concept-net-path:q15',
      q: '正向代理与反向代理的位置直觉是？',
      choices: [
        {
          t: '正向靠近客户端（常需配置出网）',
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
      id: 'concept-net-path:q16',
      q: 'L4 与 L7 负载均衡最关键的能力差别是？',
      choices: [
        {
          t: 'L4 按 IP/端口/协议转发',
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
      id: 'concept-net-path:q17',
      q: '会话粘滞（sticky session）主要解决什么问题？',
      choices: [
        {
          t: '让同一客户端尽量落到同一后端',
          ok: true,
          why: '粘滞是权宜；实例挂了仍要健康检查摘除。',
        },
        {
          t: '粘滞等于负载均衡坏了，应立刻删除全部后端',
          ok: false,
          why: '粘滞是刻意策略，不是故障本身。',
        },
        {
          t: '有了粘滞就不必健康检查',
          ok: false,
          why: '挂掉的粘滞目标更糟。',
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
      id: 'concept-net-path:q18',
      q: '相对粘滞，多实例 Web 会话更稳妥的长期做法是？',
      choices: [
        {
          t: '把 Session 放 Redis 等共享存储',
          ok: true,
          why: '本地 Session + 粘滞脆弱；共享会话才是常见终局。',
        },
        {
          t: '关掉负载均衡，永远单机',
          ok: false,
          why: '牺牲可用性换简单，不是默认答案。',
        },
        {
          t: '把会话明文写进 URL 永久公开',
          ok: false,
          why: '易泄密与篡改。',
        },
        {
          t: '用 DNS TTL=0 替代会话存储',
          ok: false,
          why: 'DNS 不管应用会话。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'db-redis'],
    },
    {
      id: 'concept-net-path:q19',
      q: 'CDN 与源站反向代理的分工直觉是？',
      choices: [
        {
          t: 'CDN 把可缓存副本放到近处',
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
      id: 'concept-net-path:q20',
      q: 'Cloudflare「橙云」相对「仅 DNS（灰云）」的关键差别是？',
      choices: [
        {
          t: '橙云：访客先到 CF 边缘再回源',
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
      id: 'concept-net-path:q21',
      q: '「源站隐藏」配合回源白名单，工程上在说什么？',
      choices: [
        {
          t: '对外只暴露边缘 IP',
          ok: true,
          why: '防绕过直打；隐藏≠绝对安全，但显著减小公网攻击面。',
        },
        {
          t: '删除全部 DNS 记录即可隐藏且仍可服务用户',
          ok: false,
          why: '没有解析用户也访问不到合法入口。',
        },
        {
          t: '源站必须对全世界开放 0.0.0.0:443',
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
      id: 'concept-net-path:q22',
      q: '第三方 API 要求「报备出口 IP」时，工程上通常怎么办？',
      choices: [
        {
          t: '使用固定公网出口 / NAT 网关 EIP',
          ok: true,
          why: '出口白名单是「你打出去对方认」；与入站安全组方向相反。',
        },
        {
          t: '只改前端主题色即可通过白名单',
          ok: false,
          why: '与出站源地址无关。',
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
      id: 'concept-net-path:q23',
      q: '负载均衡健康检查通过，是否等于业务一定正确？',
      choices: [
        {
          t: '否；探针只说明端口/路径能响应，业务仍可能 200 胡说',
          ok: true,
          why: '绿勾≠功能正确；仍要看日志与业务指标。',
        },
        {
          t: '是；通过后禁止再看日志',
          ok: false,
          why: '仍要观测业务。',
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
      id: 'concept-net-path:q24',
      q: '安全组「入站放行 443」已配，但源地址只允许办公网段——外网用户仍打不开，更可能是？',
      choices: [
        {
          t: 'ACL 源地址过窄：规则匹配「谁可以来」，不只看目的端口',
          ok: true,
          why: '端口对了还要看源 CIDR、绑定的网卡与实例。',
        },
        {
          t: '只要写了 443，全世界一定能连，无需看源',
          ok: false,
          why: '云厂商安全组常按源 CIDR 限制。',
        },
        {
          t: '一定是 HTTP 方法写错成 GET',
          ok: false,
          why: '外网「连不上」优先查网络 ACL。',
        },
        {
          t: 'TLS 证书品牌决定安全组是否生效',
          ok: false,
          why: '证书与安全组是不同层。',
        },
      ],
      relatedNodes: ['routing-nat', 'net-edge-practice', 'network-basics'],
    },
  ],
});
