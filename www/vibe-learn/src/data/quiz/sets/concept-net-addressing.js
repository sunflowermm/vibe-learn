import { defineQuizSet } from '../schema.js';

/**
 * 寻址基础：域名 / IP / 端口 / URL / NAT。
 * 命题：mcq-expert（一题一事；干扰项=排障似真误判）。
 */
export default defineQuizSet({
  id: 'concept-net-addressing',
  title: '概念 · 域名、地址与端口（分清）',
  kind: 'concept',
  domain: 'net',
  tags: ['域名', 'IP', '端口', 'URL', 'DNS', '基础', '进阶'],
  relatedNodes: ['ip-addressing', 'dns-https', 'network-basics'],
  caption: '工程师排障第一刀：是名字解析挂了，还是地址/端口/TLS/应用挂了。',
  questions: [
    {
      id: 'concept-net-addressing:q1',
      q: '域名（如 api.example.com）与 IP 地址的正确关系是？',
      choices: [
        {
          t: '域名是人类可读名字，经 DNS 解析成 IP 后再选路',
          ok: true,
          why: '名字层与网络层寻址分离：换 IP 可只改 DNS。',
        },
        {
          t: '域名就是 IP，只是书写格式不同',
          ok: false,
          why: '层次不同：一个是名字，一个是网络层地址。',
        },
        {
          t: '有了域名就不需要 IP',
          ok: false,
          why: '解析之后底层仍用 IP 选路。',
        },
        {
          t: '合法通信可以完全跳过 IP，只靠域名字符串路由',
          ok: false,
          why: '路由器按 IP 选路，不是按域名字符串。',
        },
      ],
      relatedNodes: ['dns-https', 'ip-addressing'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q2',
      q: '「IP 找主机，端口找进程」这句话强调的是？',
      choices: [
        {
          t: '同一台机器可跑多个服务，用端口号区分监听的应用',
          ok: true,
          why: '例如 443 给 HTTPS 入口，3000 给本机 Node。',
        },
        {
          t: '一个公网 IP 在协议上只能开一个端口',
          ok: false,
          why: '单 IP 可同时开大量端口给不同进程。',
        },
        {
          t: '端口可以完全替代 DNS',
          ok: false,
          why: '端口不负责把名字变成地址。',
        },
        {
          t: '端口号等于网卡的物理插槽编号',
          ok: false,
          why: '这里是传输层逻辑端口，不是物理接口型号。',
        },
      ],
      relatedNodes: ['tcp-udp', 'ip-addressing'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q3',
      q: 'URL https://a.com:8443/v1/x?y=1 里，8443 是什么？',
      choices: [
        {
          t: '显式端口；未写时 HTTPS 默认',
          ok: true,
          why: '写了端口就覆盖默认；排障时「默认以为 443」常踩坑。',
        },
        {
          t: '整段一定是 IPv6 地址',
          ok: false,
          why: '8443 是端口；IPv6 在 URL 里通常用方括号。',
        },
        {
          t: '查询串本身（? 后面那一段）',
          ok: false,
          why: '查询串是 ?y=1；端口在主机与路径之间。',
        },
        {
          t: 'TLS 证书序列号',
          ok: false,
          why: '证书字段在 TLS 握手里，不会写成 URL 的 :8443。',
        },
      ],
      relatedNodes: ['http-web', 'tcp-udp'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q4',
      q: '192.168.1.3 这类地址通常属于？',
      choices: [
        {
          t: '私有（内网）地址，公网不可直达，出网常靠 NAT',
          ok: true,
          why: 'RFC 1918 私网段；家里路由器后面常见。',
        },
        {
          t: '一定是全球唯一、可被公网直接路由的地址',
          ok: false,
          why: '私网地址在公网路由表上不可达，需 NAT 或专线。',
        },
        {
          t: '协议规定只能用于打印机',
          ok: false,
          why: '任意内网主机都可能用私网地址。',
        },
        {
          t: '等于 DNS 根服务器的固定地址',
          ok: false,
          why: '根服务器是另一套公网基础设施。',
        },
      ],
      relatedNodes: ['ip-addressing', 'routing-nat'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q5',
      q: '访问 127.0.0.1 / localhost 时，流量去哪？',
      choices: [
        {
          t: '本机回环，不经过物理网卡出网——本地开发常用',
          ok: true,
          why: '外网访问不到你的 127.0.0.1；容器/WSL 还要再分命名空间。',
        },
        {
          t: '一定是公司对外的公网入口 IP',
          ok: false,
          why: '回环只在本机有效。',
        },
        {
          t: 'DNS 根区的权威地址',
          ok: false,
          why: '与 DNS 根无关。',
        },
        {
          t: '任意云厂商 Anycast 入口的统称',
          ok: false,
          why: 'Anycast 是公网路由技术；127.0.0.1 是本机回环。',
        },
      ],
      relatedNodes: ['ip-addressing', 'xrk-first-run'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q6',
      q: 'DNS 解析失败时，用户侧更常见的现象是？',
      choices: [
        {
          t: '报找不到服务器/DNS_PROBE 等',
          ok: true,
          why: '先分清：解析失败 vs 端口不通 vs 应用 4xx/5xx。',
        },
        {
          t: '一定先返回业务 JSON 的 HTTP 200',
          ok: false,
          why: '到不了主机就没有可靠的应用层响应。',
        },
        {
          t: '一定是数据库事务死锁',
          ok: false,
          why: '名字都解析不出时还到不了数据库。',
        },
        {
          t: '一定是 TLS 证书品牌不被信任',
          ok: false,
          why: '证书问题通常发生在已解析并开始 TLS 之后。',
        },
      ],
      relatedNodes: ['dns-https', 'workbench-troubleshoot'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-net-addressing:q7',
      q: 'CIDR 写法 10.0.0.0/24 的直觉是？',
      choices: [
        {
          t: '前 24 位是网络前缀，其余为主机位',
          ok: true,
          why: '安全组、路由表、VPN 划分常用；约 256 个地址（含网络/广播等约定）。',
        },
        {
          t: '/24 表示必须串联 24 台路由器',
          ok: false,
          why: '/24 是前缀长度，不是设备台数。',
        },
        {
          t: '/24 永远表示单个主机且没有网段',
          ok: false,
          why: '单主机常用 /32；/24 是一整段。',
        },
        {
          t: 'CIDR 只允许用在电子邮件协议里',
          ok: false,
          why: 'CIDR 是通用地址块记法。',
        },
      ],
      relatedNodes: ['ip-addressing', 'routing-nat'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-addressing:q8',
      q: '家庭多设备共用一个公网 IP 上网，主要靠什么？',
      choices: [
        {
          t: 'NAT（常配合路由器）',
          ok: true,
          why: '出站靠 NAT/PAT；要从外网进内网服务，还要端口转发或反代。',
        },
        {
          t: '把所有设备改成同一个 MAC 地址',
          ok: false,
          why: '会冲突且不解决公网地址不足。',
        },
        {
          t: '禁止使用任何私有 IP',
          ok: false,
          why: '家庭正是私网地址 + NAT。',
        },
        {
          t: 'DNS 会自动完成地址转换',
          ok: false,
          why: 'DNS 做名字解析，不做 NAT。',
        },
      ],
      relatedNodes: ['routing-nat', 'ip-addressing'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-net-addressing:q9',
      q: 'MAC 地址相对 IP 地址，职责差别是？',
      choices: [
        {
          t: '链路层地址，主要用于同一局域网内帧投递',
          ok: true,
          why: '同网段常用 ARP 把 IP 解析成 MAC；出网关后下一跳又换 MAC。',
        },
        {
          t: 'MAC 可以替代全球公网路由',
          ok: false,
          why: '互联网按 IP 路由；MAC 不跨广域网端到端有效。',
        },
        {
          t: 'MAC 等于域名',
          ok: false,
          why: '域名属名字系统；MAC 属链路层。',
        },
        {
          t: '只有打印机才有 MAC',
          ok: false,
          why: '有网卡的设备一般都有 MAC。',
        },
      ],
      relatedNodes: ['ip-addressing', 'protocol-stack'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-addressing:q10',
      q: 'ping 通某 IP，但 https://该IP 打不开，说明什么？',
      choices: [
        {
          t: 'ICMP 可达≠业务端口可达；还要查 443/进程/证书/防火墙',
          ok: true,
          why: '安全组可能放行 ICMP 却禁 443；或进程没听、证书错。',
        },
        {
          t: 'ping 通则一切 Web 服务必通，不必再查端口',
          ok: false,
          why: '经典误解：协议与端口都不同。',
        },
        {
          t: '一定是域名写错了，与端口和 TLS 无关',
          ok: false,
          why: '题设已用 IP 访问；问题更可能在端口/TLS/进程。',
        },
        {
          t: '先不查监听与防火墙，直接重装整套开发环境碰运气',
          ok: false,
          why: '过激；先分层查监听、安全组与证书。',
        },
      ],
      relatedNodes: ['network-basics', 'tcp-udp', 'workbench-troubleshoot'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-addressing:q11',
      q: '主机名 laptop、域名 www.example.com、FQDN 的层次直觉是？',
      choices: [
        {
          t: '主机名偏本机/内网短名',
          ok: true,
          why: '排障时别把短主机名当成公网可解析的 FQDN。',
        },
        {
          t: '三者在任何系统里字节级必须完全相同',
          ok: false,
          why: '短名与带点的 FQDN 本来就可以不同。',
        },
        {
          t: 'FQDN 按规定不能包含点号',
          ok: false,
          why: 'FQDN 正是用点分层，如 www.example.com。',
        },
        {
          t: '主机名必须写成公网 IP 才能合法',
          ok: false,
          why: '主机名是名字，不是 IP 字面量。',
        },
      ],
      relatedNodes: ['dns-https', 'ip-addressing'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-addressing:q12',
      q: '浏览器地址栏输入域名后到看到页面，最小链路更接近？',
      choices: [
        {
          t: 'DNS 解析到 IP → TCP（及常有的 TLS）握手 → 发 HTTP → 渲染',
          ok: true,
          why: '每环失败现象不同：解析失败、超时、证书警告、4xx/5xx、白屏脚本错。',
        },
        {
          t: '只需要局域网里的 ARP 解析，跨公网访问也不必依赖 IP 寻址与路由转发',
          ok: false,
          why: '出局域网必须靠 IP 路由。',
        },
        {
          t: '只需远端数据库事务提交成功，浏览器打开页面完全无需 DNS、TCP 或 HTTP',
          ok: false,
          why: '数据库在应用之后；先要网络通。',
        },
        {
          t: '浏览器直接挂载对方服务器磁盘，在本地文件系统打开源文件即可看到页面',
          ok: false,
          why: '经协议请求资源，不是挂载对方磁盘。',
        },
      ],
      relatedNodes: ['dns-https', 'tcp-udp', 'http-web'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-net-addressing:q13',
      q: '安全组放行了 ICMP，同事仍打不开你的 HTTPS 站点。更合理的解释是？',
      choices: [
        {
          t: 'ICMP 与 TCP/443 是不同规则',
          ok: true,
          why: 'ping 通只证明部分可达，不证明 443 与证书链路正常。',
        },
        {
          t: '放行 ICMP 会自动放行全部 TCP 端口',
          ok: false,
          why: '云安全组按协议与端口分别匹配。',
        },
        {
          t: '一定是 HTTP 方法必须改成 TRACE',
          ok: false,
          why: '连不上时先查端口放行，不是先改方法。',
        },
        {
          t: 'HTTPS 站点从不需要安全组',
          ok: false,
          why: '公网暴露面仍靠 ACL 控制。',
        },
      ],
      relatedNodes: ['network-basics', 'routing-nat', 'dns-https'],
      tags: ['进阶'],
    },
  ],
});
