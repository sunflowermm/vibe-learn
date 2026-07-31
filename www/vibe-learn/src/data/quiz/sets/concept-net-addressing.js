import { defineQuizSet } from '../schema.js';

/**
 * 计算机网络寻址基础：域名 / IP / 端口 / URL / NAT —— 分清「叫什么、在哪、哪个门」。
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
      q: '域名（如 api.example.com）与 IP 地址的正确关系？',
      choices: [
        {
          t: '域名是人类可读名字；通常经 DNS 解析成 IP，通信按 IP（再加端口）送达',
          ok: true,
          why: '名字层与网络层寻址分离：换 IP 可只改 DNS，不必改用户记住的域名。',
        },
        {
          t: '域名就是 IP，只是书写格式不同',
          ok: false,
          why: '层次不同：一个是名字，一个是网络层地址。',
        },
        {
          t: '有了域名就不需要 IP',
          ok: false,
          why: '解析之后底层仍用 IP 选路；没有 IP 就无处投递。',
        },
        {
          t: '合法 IP 只能写成汉字',
          ok: false,
          why: 'IPv4/IPv6 是数字形式；汉字不是 IP 字面量。',
        },
      ],
      relatedNodes: ['dns-https', 'ip-addressing'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q2',
      q: '「IP 找主机，端口找进程」这句话在说？',
      choices: [
        {
          t: '同一台机器可跑多个服务，用端口号区分监听的应用',
          ok: true,
          why: '例如 443 给 HTTPS 入口，3000 给本机 Node；五元组里也含端口。',
        },
        {
          t: '端口是指显示器上的 HDMI 接口型号',
          ok: false,
          why: '这里说的是传输层逻辑端口，不是物理视频口。',
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
      ],
      relatedNodes: ['tcp-udp', 'ip-addressing'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q3',
      q: 'URL https://a.com:8443/v1/x?y=1 里，8443 是什么？',
      choices: [
        {
          t: '显式端口；未写时 HTTPS 默认 443、HTTP 默认 80',
          ok: true,
          why: '写了端口就覆盖默认；排障时「默认以为 443」常踩坑。',
        },
        {
          t: '整段一定是 IPv6 地址',
          ok: false,
          why: '8443 是端口；IPv6 在 URL 里通常用方括号包起来。',
        },
        {
          t: '查询串本身（? 后面那一段）',
          ok: false,
          why: '查询串是 ?y=1；端口在主机与路径之间。',
        },
        {
          t: 'TLS 证书序列号',
          ok: false,
          why: '证书字段在 TLS 握手里，不会写成 URL 里的 :8443。',
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
          why: '根服务器是另一套公网基础设施，不是 192.168/16。',
        },
      ],
      relatedNodes: ['ip-addressing', 'routing-nat'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q5',
      q: '127.0.0.1 / localhost 访问的是？',
      choices: [
        {
          t: '本机回环，不经过物理网卡出网——本地开发常用',
          ok: true,
          why: '与「局域网邻居的 192.168.x.x」不是一回事；容器/WSL 还要再分命名空间。',
        },
        {
          t: '一定是公司对外的公网入口 IP',
          ok: false,
          why: '回环只在本机有效，外网访问不到你的 127.0.0.1。',
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
      q: 'DNS 解析失败时，用户侧常见表现？',
      choices: [
        {
          t: '浏览器报找不到服务器/DNS_PROBE 等，往往还没建起到业务端口的 TCP',
          ok: true,
          why: '先分清：解析失败 vs 端口不通 vs 应用 4xx/5xx。',
        },
        {
          t: '一定是数据库事务死锁',
          ok: false,
          why: '层次不对：名字都解析不出时还到不了数据库。',
        },
        {
          t: '一定是页面 CSS 语法错误',
          ok: false,
          why: 'CSS 错误不会表现为 DNS_PROBE。',
        },
        {
          t: 'DNS 失败时仍能稳定收到业务 JSON 的 HTTP 200',
          ok: false,
          why: '到不了主机就没有可靠的应用层响应。',
        },
      ],
      relatedNodes: ['dns-https', 'workbench-troubleshoot'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-net-addressing:q7',
      q: 'CIDR 写法 10.0.0.0/24 的直觉？',
      choices: [
        {
          t: '前 24 位是网络前缀，其余为主机位——表示一个网段范围',
          ok: true,
          why: '安全组、路由表、VPN 划分常用；约 256 个地址（含网络/广播等约定）。',
        },
        {
          t: '/24 表示必须串联 24 台路由器',
          ok: false,
          why: '/24 是前缀长度，不是设备台数。',
        },
        {
          t: 'CIDR 只允许用在电子邮件协议里',
          ok: false,
          why: 'CIDR 是通用地址块记法。',
        },
        {
          t: '/24 永远表示单个主机且没有网段',
          ok: false,
          why: '单主机常用 /32；/24 是一整段。',
        },
      ],
      relatedNodes: ['ip-addressing', 'routing-nat'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-addressing:q8',
      q: '家庭多设备共用一个公网 IP 上网，主要靠？',
      choices: [
        {
          t: 'NAT（常配合路由器）：改写地址/端口，让多内网主机共享出口',
          ok: true,
          why: '出站靠 NAT/PAT；若要从外网进内网服务，还要端口转发或反代。',
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
      q: 'MAC 地址相对 IP 地址？',
      choices: [
        {
          t: '链路层地址，主要用于同一局域网内帧投递；跨网靠 IP 路由',
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
          why: '域名属应用/名字系统；MAC 属链路层。',
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
      q: 'ping 通某 IP，但 https://该IP 打不开，说明？',
      choices: [
        {
          t: 'ICMP 可达≠业务端口/TLS/HTTP 正常——还要查端口、证书与服务进程',
          ok: true,
          why: '安全组可能放行 ICMP 却禁 443；或进程没听、证书错。',
        },
        {
          t: 'ping 通则一切 Web 服务必通',
          ok: false,
          why: '经典误解：协议与端口都不同。',
        },
        {
          t: '一定是域名写错（你访问用的是 IP）',
          ok: false,
          why: '题设已是 IP；问题更可能在端口/TLS/进程。',
        },
        {
          t: '只能重装操作系统才能修好',
          ok: false,
          why: '过激；先分层查监听与防火墙。',
        },
      ],
      relatedNodes: ['network-basics', 'tcp-udp', 'workbench-troubleshoot'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-addressing:q11',
      q: '主机名 laptop、域名 www.example.com、FQDN 的层次直觉？',
      choices: [
        {
          t: '主机名偏本机/内网短名；域名/FQDN 在 DNS 树中可被（全局或组织内）解析',
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
      q: '浏览器地址栏输入域名后，到看到页面，最小链路更接近？',
      choices: [
        {
          t: 'DNS→IP；TCP（常+TLS）；HTTP 请求/响应；再渲染',
          ok: true,
          why: '每环失败现象不同：解析失败、超时、证书警告、4xx/5xx、白屏脚本错。',
        },
        {
          t: '只需要 ARP，跨公网也不要 IP',
          ok: false,
          why: '出局域网必须靠 IP 路由。',
        },
        {
          t: '只需数据库事务，无需网络',
          ok: false,
          why: '数据库在应用之后；先要网络通。',
        },
        {
          t: '浏览器直接读取对方磁盘上的源文件',
          ok: false,
          why: '经协议请求资源，不是挂载对方磁盘。',
        },
      ],
      relatedNodes: ['dns-https', 'tcp-udp', 'http-web'],
      tags: ['基础', '进阶'],
    },
  ],
});
