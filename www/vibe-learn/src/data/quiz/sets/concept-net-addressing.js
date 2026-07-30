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
        { t: '域名是人类可读名字；通常经 DNS 解析成 IP，通信按 IP（再加端口）送达', ok: true, why: '名字层与网络层寻址分离。' },
        { t: '域名就是 IP，写法不同而已', ok: false, why: '层次不同。' },
        { t: '有了域名就不需要 IP', ok: false, why: '底层仍用 IP。' },
        { t: 'IP 只能写成汉字', ok: false, why: '否。' },
      ],
      relatedNodes: ['dns-https', 'ip-addressing'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q2',
      q: '「IP 找主机，端口找进程」这句话在说？',
      choices: [
        { t: '同一台机器可跑多个服务，用端口号区分监听的应用', ok: true, why: '443/80/3000 等。' },
        { t: '端口是显示器接口型号', ok: false, why: '否。' },
        { t: '一个 IP 只能有一个端口', ok: false, why: '可有许多。' },
        { t: '端口替代 DNS', ok: false, why: '否。' },
      ],
      relatedNodes: ['tcp-udp', 'ip-addressing'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q3',
      q: 'URL https://a.com:8443/v1/x?y=1 里，8443 是什么？',
      choices: [
        { t: '显式端口；未写时 HTTPS 默认 443、HTTP 默认 80', ok: true, why: 'URL 可覆盖默认端口。' },
        { t: '一定是 IPv6 地址', ok: false, why: '否。' },
        { t: '查询串本身', ok: false, why: '查询串是 ? 后。' },
        { t: 'TLS 证书序列号', ok: false, why: '否。' },
      ],
      relatedNodes: ['http-web', 'tcp-udp'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q4',
      q: '192.168.1.3 这类地址通常属于？',
      choices: [
        { t: '私有（内网）地址，公网不可直达，出网常靠 NAT', ok: true, why: 'RFC 1918。' },
        { t: '一定是全球唯一公网地址', ok: false, why: '私网段。' },
        { t: '只能用于打印机', ok: false, why: '否。' },
        { t: '等于域名根服务器', ok: false, why: '否。' },
      ],
      relatedNodes: ['ip-addressing', 'routing-nat'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q5',
      q: '127.0.0.1 / localhost 访问的是？',
      choices: [
        { t: '本机回环，不经过物理网卡出网——本地开发常用', ok: true, why: '与局域网邻居 IP 不同。' },
        { t: '一定是公司公网入口', ok: false, why: '否。' },
        { t: 'DNS 根', ok: false, why: '否。' },
        { t: '任意云厂商的 Anycast', ok: false, why: '否。' },
      ],
      relatedNodes: ['ip-addressing', 'xrk-first-run'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-addressing:q6',
      q: 'DNS 解析失败时，用户侧常见表现？',
      choices: [
        { t: '浏览器报找不到服务器/DNS_PROBE 等，往往还没真正建起到业务端口的 TCP', ok: true, why: '先分清解析 vs 连通 vs 应用错误。' },
        { t: '一定是数据库事务死锁', ok: false, why: '层次不对。' },
        { t: '一定是 CSS 语法错误', ok: false, why: '否。' },
        { t: 'DNS 失败仍能稳定收到 HTTP 200 业务 JSON', ok: false, why: '到不了主机。' },
      ],
      relatedNodes: ['dns-https', 'workbench-troubleshoot'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-net-addressing:q7',
      q: 'CIDR 写法 10.0.0.0/24 的直觉？',
      choices: [
        { t: '前 24 位是网络前缀，其余为主机位——表示一个网段范围', ok: true, why: '安全组与路由常用。' },
        { t: '/24 表示 24 台路由器必须串联', ok: false, why: '否。' },
        { t: 'CIDR 只用于电子邮件', ok: false, why: '否。' },
        { t: '/24 等于单个主机且无网段', ok: false, why: '/32 才常表单主机。' },
      ],
      relatedNodes: ['ip-addressing', 'routing-nat'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-addressing:q8',
      q: '家庭多设备共用一个公网 IP 上网，主要靠？',
      choices: [
        { t: 'NAT（常配合路由器）：改写地址/端口，让多内网主机共享出口', ok: true, why: '与端口映射发布内网服务相对。' },
        { t: '只靠把所有设备改成同一 MAC', ok: false, why: '危险且不对。' },
        { t: '禁止使用私有 IP', ok: false, why: '正是私网+NAT。' },
        { t: 'DNS 会自动做地址转换', ok: false, why: 'DNS 做名字解析。' },
      ],
      relatedNodes: ['routing-nat', 'ip-addressing'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-net-addressing:q9',
      q: 'MAC 地址相对 IP 地址？',
      choices: [
        { t: '链路层硬件地址，主要用于同一局域网内帧投递；跨网靠 IP 路由', ok: true, why: 'ARP 把 IP 解析成 MAC。' },
        { t: 'MAC 可替代全部公网路由', ok: false, why: '否。' },
        { t: 'MAC 等于域名', ok: false, why: '否。' },
        { t: '只有打印机有 MAC', ok: false, why: '网卡皆有。' },
      ],
      relatedNodes: ['ip-addressing', 'protocol-stack'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-addressing:q10',
      q: 'ping 通某 IP，但 https://该IP 打不开，说明？',
      choices: [
        { t: 'ICMP 可达≠业务端口/TLS/HTTP 正常——还要查端口、证书与服务进程', ok: true, why: '分层排障。' },
        { t: 'ping 通则一切 Web 必通', ok: false, why: '经典误解。' },
        { t: '一定是域名写错（你用的是 IP）', ok: false, why: '题设已是 IP。' },
        { t: '只能重装操作系统', ok: false, why: '过激。' },
      ],
      relatedNodes: ['network-basics', 'tcp-udp', 'workbench-troubleshoot'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-addressing:q11',
      q: '主机名 laptop、域名 www.example.com、FQDN 的层次直觉？',
      choices: [
        { t: '主机名偏本机/内网短名；域名/FQDN 在 DNS 树中可全局（或组织内）解析', ok: true, why: '勿混用。' },
        { t: '三者永远字节级相同', ok: false, why: '否。' },
        { t: 'FQDN 不能含点号', ok: false, why: '正含层次点号。' },
        { t: '主机名必须是公网 IP', ok: false, why: '否。' },
      ],
      relatedNodes: ['dns-https', 'ip-addressing'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-addressing:q12',
      q: '浏览器地址栏输入域名后，到看到页面，最小链路更接近？',
      choices: [
        { t: 'DNS→IP；TCP（常+TLS）；HTTP 请求/响应；再渲染', ok: true, why: '缺一环表现不同。' },
        { t: '只需要 ARP，无需 IP', ok: false, why: '跨网不够。' },
        { t: '只需数据库事务', ok: false, why: '应用层之后才可能。' },
        { t: '浏览器直接读对方磁盘文件', ok: false, why: '否。' },
      ],
      relatedNodes: ['dns-https', 'tcp-udp', 'http-web'],
      tags: ['基础', '进阶'],
    },
  ],
});
