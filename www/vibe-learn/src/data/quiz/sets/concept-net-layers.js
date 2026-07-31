import { defineQuizSet } from '../schema.js';

/** 第三章入门精选：协议栈 / IP / NAT / DNS / 反代角色 / 排障分层（一题一挂） */
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
      q: '计算机网络中「协议栈」的直觉模型是什么？',
      choices: [
        {
          t: '分层协作：下层为上层提供服务，如 IP 之上跑 TCP，再之上是 HTTP',
          ok: true,
          why: '排障时先问「卡在哪一层」：解析、建连、TLS 还是应用。',
        },
        {
          t: '整个互联网只有 HTTP 一层，不存在其他层次',
          ok: false,
          why: 'HTTP 依赖传输与网络层；下面还有链路/物理等。',
        },
        {
          t: '协议栈只存在于浏览器扩展里，与操作系统无关',
          ok: false,
          why: '协议栈主要由 OS 与网卡驱动实现；浏览器是上层应用。',
        },
        {
          t: '协议栈等于把全部流量压成单个 zip 文件',
          ok: false,
          why: '描述的是通信规则层次，不是归档格式。',
        },
      ],
      relatedNodes: ['protocol-stack'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q2',
      q: 'IP 地址在通信中主要标识什么？',
      choices: [
        {
          t: '一台主机或一个网络接口的逻辑可达位置',
          ok: true,
          why: '路由器按目的 IP 选路；端口再区分进程。',
        },
        {
          t: '某条 TCP 连接里正在传的第几个字节',
          ok: false,
          why: '那是序号/偏移；IP 标识主机（接口），不标识连接内字节位置。',
        },
        {
          t: 'Git commit 的哈希',
          ok: false,
          why: '版本控制标识，与网络寻址无关。',
        },
        {
          t: '某个 HTML 元素的 CSS 选择器',
          ok: false,
          why: '前端样式选择器，不是网络层地址。',
        },
      ],
      relatedNodes: ['ip-addressing', 'protocol-stack'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q3',
      q: '家庭/办公网里 NAT 的常见作用？',
      choices: [
        {
          t: '让多台内网设备共享一个公网 IP 出网',
          ok: true,
          why: 'IPv4 私网 + NAT/PAT 是常态；入站另需转发或反代。',
        },
        {
          t: '加密 HTTP 请求体里的业务字段',
          ok: false,
          why: '加密靠 TLS；NAT 只做地址/端口映射。',
        },
        {
          t: '完全替代 DNS 来解析域名',
          ok: false,
          why: 'DNS 管名字→IP；NAT 管私网↔公网地址转换。',
        },
        {
          t: '把网页缓存进浏览器以加速二次打开',
          ok: false,
          why: '那是 HTTP 缓存；与 NAT 无关。',
        },
      ],
      relatedNodes: ['routing-nat', 'ip-addressing'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q4',
      q: 'DNS 在一次网页访问中回答的核心问题是？',
      choices: [
        {
          t: '把人类可读域名解析成 IP，才能建连发 HTTP',
          ok: true,
          why: '解析失败时常见「找不到服务器」；此时往往还没到业务端口。',
        },
        {
          t: '指导如何把 C 源码编译成可执行文件',
          ok: false,
          why: '那是构建工具链，不是 DNS。',
        },
        {
          t: '决定按钮该用什么颜色与布局',
          ok: false,
          why: '前端 UI，不是名字解析。',
        },
        {
          t: '校验用户密码是否与库中一致',
          ok: false,
          why: '鉴权在应用层；DNS 不读密码。',
        },
      ],
      relatedNodes: ['dns-https'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q5',
      q: 'Nginx 在本课网络架构里通常扮演？',
      choices: [
        {
          t: '反向代理/门面：收公网请求，转发到后端，常兼 TLS 与静态',
          ok: true,
          why: '统一入口；业务进程可只听本机端口。',
        },
        {
          t: '关系型数据库，存用户与订单表',
          ok: false,
          why: '那是 MySQL/PostgreSQL 等；Nginx 是 Web/代理。',
        },
        {
          t: 'JavaScript 运行时，直接执行 Node 业务代码',
          ok: false,
          why: 'Node 跑在上游；Nginx 不执行业务 JS。',
        },
        {
          t: '浏览器里的 React/Vue 组件框架',
          ok: false,
          why: '前端框架在客户端；Nginx 在服务端入口。',
        },
      ],
      relatedNodes: ['net-nginx', 'reverse-proxy'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q6',
      q: '「边缘与出口」实务里，优先关心哪些？',
      choices: [
        {
          t: 'DNS 是否可达/被污染、代理出口、防火墙/安全组、证书挂在哪',
          ok: true,
          why: '上线与调境外 API 最先卡在链路与解析，而不是业务细节。',
        },
        {
          t: '按钮 border-radius 取几像素',
          ok: false,
          why: '视觉样式，不是出口链路问题。',
        },
        {
          t: '数组下标从 0 还是 1 开始',
          ok: false,
          why: '语言规则，不是网络边缘。',
        },
        {
          t: 'Git 分支前缀用 feat 还是 feature',
          ok: false,
          why: '协作约定，与 DNS/代理无关。',
        },
      ],
      relatedNodes: ['net-edge-practice', 'dns-https'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q7',
      q: '记住「IP 找主机，端口找进程」后，访问 https://api.example.com 还缺哪几步？',
      choices: [
        {
          t: 'DNS 把域名变成 IP；再 TCP（通常经 TLS）建连；最后发 HTTP',
          ok: true,
          why: '缺解析、缺建连、缺 TLS 或缺应用，表现完全不同。',
        },
        {
          t: '只需 UDP 广播共享密钥即可',
          ok: false,
          why: 'HTTPS API 常态是 TCP + TLS。',
        },
        {
          t: '端口永远只能是 21',
          ok: false,
          why: 'HTTPS 默认 443；21 是 FTP 经典端口。',
        },
        {
          t: '三次握手只用于数据库，Web 不用',
          ok: false,
          why: '凡 TCP 服务都会握手。',
        },
      ],
      relatedNodes: ['tcp-udp', 'dns-https', 'http-web'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q8',
      q: '多数 LLM 的 HTTPS API 更常跑在 TCP 而非裸 UDP，主要因为？',
      choices: [
        {
          t: '需要可靠、有序的字节流；完整 JSON 请求/响应怕丢一半',
          ok: true,
          why: 'TCP 提供确认与重传；UDP 是尽力投递（除非上层如 QUIC 另做可靠）。',
        },
        {
          t: 'TCP 不使用端口号',
          ok: false,
          why: '传输层都用端口。',
        },
        {
          t: 'UDP 保证永不丢包且严格有序',
          ok: false,
          why: '说反了。',
        },
        {
          t: 'TCP 不能跑在公网',
          ok: false,
          why: '公网大量 TCP。',
        },
      ],
      relatedNodes: ['tcp-udp', 'http-web'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-net-layers:q9',
      q: '服务监听语境下，127.0.0.1 与 0.0.0.0 的差别？',
      choices: [
        {
          t: '127.0.0.1 仅本机回环可访；0.0.0.0 常表示监听本机所有网卡',
          ok: true,
          why: '乱开 0.0.0.0 等于扩大暴露面，要配防火墙/安全组。',
        },
        {
          t: '二者在任何场景都完全等价',
          ok: false,
          why: '局域网/公网邻居能否连上完全不同。',
        },
        {
          t: '0.0.0.0 是唯一合法公网单播地址',
          ok: false,
          why: '0.0.0.0 作监听含义是「所有接口」，不是某个公网主机地址。',
        },
        {
          t: '127.0.0.1 只能用于 UDP',
          ok: false,
          why: '与传输层协议无关。',
        },
      ],
      relatedNodes: ['ip-addressing', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-net-layers:q10',
      q: 'TLS/HTTPS 在传输上主要解决什么？',
      choices: [
        {
          t: '加密与身份校验，降低明文窃听与中间人篡改风险',
          ok: true,
          why: 'API Key、Cookie、用户数据都应走 TLS；它不替代应用鉴权。',
        },
        {
          t: '替代登录与权限校验',
          ok: false,
          why: '通道安全 ≠ 你是谁、你能做什么。',
        },
        {
          t: '加快 SQL JOIN',
          ok: false,
          why: '与数据库优化无关。',
        },
        {
          t: '保证业务逻辑永无 bug',
          ok: false,
          why: '传输层不管业务正确性。',
        },
      ],
      relatedNodes: ['dns-https', 'http-web'],
      tags: ['基础'],
    },
    {
      id: 'concept-net-layers:q11',
      q: '本机 curl 通、公网不通时，更合理的排查顺序？',
      choices: [
        {
          t: '安全组/防火墙是否放行 → DNS 是否指到这台机 → 反代与证书是否只绑了内网',
          ok: true,
          why: '本机通说明进程多半活着；公网不通优先查入口网络与解析。',
        },
        {
          t: '先改前端按钮文案',
          ok: false,
          why: '公网连不上不是文案问题。',
        },
        {
          t: '先删除全部数据库备份',
          ok: false,
          why: '危险且无关。',
        },
        {
          t: '一定是 JavaScript === 写错',
          ok: false,
          why: '连 TCP 都进不来时先别猜前端运算符。',
        },
      ],
      relatedNodes: ['network-basics', 'net-nginx', 'workbench-troubleshoot'],
      tags: ['进阶'],
    },
  ],
});
