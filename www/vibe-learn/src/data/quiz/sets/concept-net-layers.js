import { defineQuizSet } from '../schema.js';

/**
 * 第三章入门精选：协议栈 / IP / NAT / DNS / 反代 / 排障分层。
 * 命题：mcq-expert（一题一事；干扰项=新手似真误判，禁荒谬项）。
 */
export default defineQuizSet({
  id: 'concept-net-layers',
  title: '概念 · 协议栈、IP 与边缘',
  kind: 'concept',
  domain: 'net',
  tags: ['协议栈', 'IP', 'DNS', 'Nginx', '基础'],
  relatedNodes: ['protocol-stack', 'ip-addressing', 'dns-https', 'reverse-proxy'],
  caption: '分层心智 + 寻址/解析/门面入门；深点见「传输、路由与边缘门面」。',
  questions: [
    {
      id: 'concept-net-layers:q1',
      q: '排障时先问「卡在哪一层」，依据的是哪条网络心智？',
      choices: [
        {
          t: '协议栈分层协作：下层为上层提供服务，故障要先定层再动手',
          ok: true,
          why: '解析、建连、TLS、应用表现不同；定层比一上来改业务更省时间。',
        },
        {
          t: '整网只有 HTTP，其它层可以忽略',
          ok: false,
          why: 'HTTP 依赖传输与网络层；忽略下层会误判。',
        },
        {
          t: '协议只存在于浏览器扩展，与操作系统无关',
          ok: false,
          why: '协议栈主要由 OS 与网卡驱动实现；浏览器是上层应用。',
        },
        {
          t: '层越多越好，应强制走满 OSI 七层才合法',
          ok: false,
          why: '工程上网常用 TCP/IP 心智；层是抽象，不是考勤打卡。',
        },
      ],
      relatedNodes: ['protocol-stack'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q2',
      q: '路由器按目的地址选路时，IP 地址主要标识什么？',
      choices: [
        {
          t: '一台主机或一个网络接口的逻辑可达位置',
          ok: true,
          why: 'IP 找主机（接口），端口再区分进程。',
        },
        {
          t: '某条 TCP 连接里正在传的第几个字节',
          ok: false,
          why: '那是序号/偏移；不是 IP 的职责。',
        },
        {
          t: '浏览器标签页的序号',
          ok: false,
          why: '标签是应用 UI 状态，不参与路由选路。',
        },
        {
          t: 'TLS 证书的指纹',
          ok: false,
          why: '证书校验在 TLS；路由看的是目的 IP。',
        },
      ],
      relatedNodes: ['ip-addressing', 'protocol-stack'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q3',
      q: '家庭/办公网多台设备共用一个公网 IP 上网，主要靠什么机制？',
      choices: [
        {
          t: 'NAT/PAT：私网地址出网时做地址（与端口）转换',
          ok: true,
          why: 'IPv4 私网 + NAT 是常态；入站另需转发或反代。',
        },
        {
          t: 'TLS：加密 HTTP 请求体里的业务字段',
          ok: false,
          why: 'TLS 管通道加密；不提供多设备共享公网 IP。',
        },
        {
          t: 'DNS：用域名替代全部私网地址',
          ok: false,
          why: 'DNS 管名字→IP；不负责私网↔公网地址转换。',
        },
        {
          t: 'HTTP 缓存：把页面存进浏览器',
          ok: false,
          why: '缓存加速二次打开，与出网地址共享无关。',
        },
      ],
      relatedNodes: ['routing-nat', 'ip-addressing'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q4',
      q: '浏览器要打开 https://api.example.com，DNS 在链路中回答的核心问题是？',
      choices: [
        {
          t: '把域名解析成 IP，才能对正确主机建连',
          ok: true,
          why: '解析失败常见「找不到服务器」；此时往往还没到业务端口。',
        },
        {
          t: '校验用户密码是否与库中一致',
          ok: false,
          why: '鉴权在应用层；DNS 不读密码。',
        },
        {
          t: '决定该用 TCP 还是 UDP 传 JSON',
          ok: false,
          why: '传输选型在应用/栈配置；DNS 只管名字解析。',
        },
        {
          t: '签发并安装服务器 TLS 证书',
          ok: false,
          why: '证书由 CA/自动化签发；DNS 可配合校验，但不等于签发本身。',
        },
      ],
      relatedNodes: ['dns-https'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q5',
      q: '本课架构里，Nginx 最常见的角色是？',
      choices: [
        {
          t: '反向代理/门面：收公网请求，转发到后端，常兼 TLS 与静态',
          ok: true,
          why: '统一入口；业务进程可只听本机端口。',
        },
        {
          t: '关系型数据库，直接存用户与订单表',
          ok: false,
          why: '数据持久化是 DBMS；Nginx 是 Web/代理。',
        },
        {
          t: 'JavaScript 运行时，直接执行 Node 业务代码',
          ok: false,
          why: 'Node 跑在上游；Nginx 不执行业务 JS。',
        },
        {
          t: '正向代理客户端，替浏览器访问任意网站',
          ok: false,
          why: '那是 Clash 等正向代理；门面 Nginx 靠近服务器侧。',
        },
      ],
      relatedNodes: ['net-nginx', 'reverse-proxy'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q6',
      q: '调境外模型 API 时，本机「边缘与出口」应优先核对哪一类问题？',
      choices: [
        {
          t: "DNS 是否可达、代理出口是否生效、防火墙/安全组、证书挂在哪",
          ok: true,
          why: '上线与调境外 API 最先卡在链路与解析，而不是业务字段细节。',
        },
        {
          t: '前端组件库的主题色是否统一，与出网无关也可以先查',
          ok: false,
          why: '视觉主题不影响出网与解析。',
        },
        {
          t: 'Git 分支命名是否带 feat 前缀，决定境外 API 能否连通',
          ok: false,
          why: '协作约定与出口链路无关。',
        },
        {
          t: '数据库索引是否覆盖所有列，否则模型 API 一定调不通',
          ok: false,
          why: '连不上 API 时先查网络出口，不是先调索引。',
        },
      ],
      relatedNodes: ['net-edge-practice', 'dns-https'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q7',
      q: '已知「IP 找主机、端口找进程」，访问 HTTPS API 在建连前还缺哪一步？',
      choices: [
        {
          t: 'DNS：把域名变成 IP',
          ok: true,
          why: '没有解析就没有稳定的建连目标；之后才是 TCP/TLS 与 HTTP。',
        },
        {
          t: '把业务 JSON 先写成 Markdown',
          ok: false,
          why: '载荷格式与「能否找到主机」无关。',
        },
        {
          t: '强制把端口改成 21',
          ok: false,
          why: 'HTTPS 默认 443；21 是 FTP 经典端口。',
        },
        {
          t: '先完成四次挥手再发请求',
          ok: false,
          why: '挥手是结束连接；访问前要建连，不是先挥手。',
        },
      ],
      relatedNodes: ['tcp-udp', 'dns-https', 'http-web'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q8',
      q: '多数 LLM 的 HTTPS API 跑在 TCP 上，而不是裸 UDP，主要因为？',
      choices: [
        {
          t: "需要可靠、有序的字节流，完整 JSON 请求/响应不能赌丢一半",
          ok: true,
          why: 'TCP 提供确认与重传；裸 UDP 是尽力投递（除非上层如 QUIC 另做可靠）。',
        },
        {
          t: 'TCP 不使用端口号，所以比 UDP 更适合云厂商按流量计费',
          ok: false,
          why: '传输层都用端口；与计费无关。',
        },
        {
          t: 'UDP 本身就保证永不丢包，并且严格保证到达顺序',
          ok: false,
          why: '说反了：UDP 不保证可靠有序。',
        },
        {
          t: '公网禁止直接使用 TCP，必须先用 UDP 再自行封装可靠层',
          ok: false,
          why: '公网大量 TCP；HTTPS API 常态即 TCP+TLS。',
        },
      ],
      relatedNodes: ['tcp-udp', 'http-web'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-net-layers:q9',
      q: '服务监听时选 127.0.0.1 与选 0.0.0.0，关键差别是？',
      choices: [
        {
          t: "127.0.0.1 仅本机回环可访；0.0.0.0 常表示监听本机所有网卡",
          ok: true,
          why: '乱开 0.0.0.0 等于扩大暴露面，要配防火墙/安全组。',
        },
        {
          t: '二者在任何部署场景都完全等价，监听地址可随意互换',
          ok: false,
          why: '局域网/公网邻居能否连上完全不同。',
        },
        {
          t: '0.0.0.0 是唯一合法的公网单播主机地址，应写进客户端连接目标',
          ok: false,
          why: '作监听时表示「所有接口」，不是某个公网主机地址。',
        },
        {
          t: '127.0.0.1 只能用于 UDP 探测，不能用于 TCP 服务监听',
          ok: false,
          why: '回环地址与传输层协议选型无关。',
        },
      ],
      relatedNodes: ['ip-addressing', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-layers:q10',
      q: 'TLS/HTTPS 在传输上主要解决什么问题？',
      choices: [
        {
          t: '加密与身份校验，降低明文窃听与中间人篡改风险',
          ok: true,
          why: 'API Key、Cookie、用户数据应走 TLS；它不替代应用鉴权。',
        },
        {
          t: '可以替代应用层登录与权限校验，有 TLS 就不必再鉴权',
          ok: false,
          why: '通道安全 ≠ 你是谁、你能做什么。',
        },
        {
          t: '会自动修复业务逻辑 bug，证书一配好功能错误就消失',
          ok: false,
          why: '传输层不管业务正确性。',
        },
        {
          t: '能保证数据库事务一定提交成功，与应用层提交语义无关',
          ok: false,
          why: '事务在 DBMS/应用；与 TLS 无关。',
        },
      ],
      relatedNodes: ['dns-https', 'http-web'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q11',
      q: '本机 curl 接口通，公网访问同一服务不通。更合理的第一步是？',
      choices: [
        {
          t: "查安全组/防火墙是否放行，以及 DNS 是否指到这台机",
          ok: true,
          why: '本机通说明进程多半活着；公网不通优先查入口网络与解析。',
        },
        {
          t: '先大改业务路由与 handler，假定是应用逻辑导致公网不可达',
          ok: false,
          why: '入口网络未通时改业务成本高且常未命中。',
        },
        {
          t: '先清空并重建数据库，把公网不通当成数据损坏处理',
          ok: false,
          why: '危险且与公网入口无关。',
        },
        {
          t: '先把服务从 TCP/HTTP 改成 UDP 再测公网连通',
          ok: false,
          why: '本机已能 HTTP 通，问题不在传输选型。',
        },
      ],
      relatedNodes: ['network-basics', 'net-nginx', 'workbench-troubleshoot'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-layers:q12',
      q: '反向代理对外终止 TLS 后，把请求转到本机 Node 端口，常见目的是？',
      choices: [
        {
          t: '在边缘统一证书与 HTTPS，应用只听本机端口，减少公网暴露',
          ok: true,
          why: 'Nginx/Caddy/面板常见分层；Node 不必自己 bind 公网 443。',
        },
        {
          t: '强制 Node 必须直接绑定 0.0.0.0:443 才合法',
          ok: false,
          why: '通常由反代听 443；应用 listen 127.0.0.1:端口即可。',
        },
        {
          t: '用反代替代 DNS，不再需要域名',
          ok: false,
          why: '用户仍靠 DNS 找到入口；反代不废除解析。',
        },
        {
          t: '让 TLS 只加密到反代，再明文广播到整个局域网即可',
          ok: false,
          why: '本机转发常见，但「广播到整个局域网」扩大暴露面，不是目标。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'net-nginx', 'dns-https'],
      tags: ['基础', '进阶'],
    },
  ],
});
