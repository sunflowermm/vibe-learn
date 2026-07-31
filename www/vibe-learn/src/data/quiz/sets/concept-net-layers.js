import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-net-layers',
  title: '概念 · 协议栈、IP 与边缘',
  kind: 'concept',
  domain: 'net',
  tags: ['协议栈', 'IP', 'DNS', 'Nginx'],
  relatedNodes: [
    'network-basics',
    'protocol-stack',
    'ip-addressing',
    'tcp-udp',
    'routing-nat',
    'dns-https',
    'reverse-proxy',
    'net-edge-practice',
  ],
  questions: [
    {
      q: '计算机网络中「协议栈（Protocol Stack）」的直觉模型是什么？',
      choices: [
        {
          t: '分层协作：下层为上层提供服务，如 IP 层之上跑 TCP，再之上是 HTTP',
          ok: true,
          why: '理解分层能让排障时有方向：先确认哪一层出了问题。',
        },
        {
          t: '整个互联网只有 HTTP 这一层协议，不存在其他层次',
          ok: false,
          why: 'HTTP 依赖 TCP 和 IP，底层还有以太网等物理传输层。',
        },
        {
          t: '网络协议只存在于浏览器扩展程序内部，与操作系统无关',
          ok: false,
          why: '协议栈由操作系统和网络硬件共同实现，浏览器只是上层应用。',
        },
        {
          t: '协议栈是指把所有网络数据压缩成一个文件的打包格式',
          ok: false,
          why: '协议栈描述的是通信规则的层次结构，不是文件打包方式。',
        },
      ],
    },
    {
      q: '网际协议（IP）地址在网络通信中主要用来标识什么？',
      choices: [
        {
          t: '网络上一台主机或一个网络接口的逻辑可达位置',
          ok: true,
          why: 'IP 地址让路由器知道数据包该发往哪台设备，是寻址的基础。',
        },
        {
          t: '某一条 TCP 连接内部正在传输的第几个字节',
          ok: false,
          why: '字节偏移是连接内部的概念，IP 地址标识的是主机而非连接内位置。',
        },
        {
          t: 'Git 仓库中某次 commit 的唯一哈希值',
          ok: false,
          why: 'Commit hash 是版本控制标识，与网络寻址完全无关。',
        },
        {
          t: '网页上某个 HTML 元素的 CSS 选择器名称',
          ok: false,
          why: 'CSS 选择器用于前端样式，IP 地址用于网络层路由。',
        },
      ],
    },
    {
      q: '网络地址转换（NAT）在家庭和办公网络中的常见作用是什么？',
      choices: [
        {
          t: '让内网多台设备共享一个公网 IP 地址访问互联网',
          ok: true,
          why: 'IPv4 地址有限，NAT 让路由器用一个公网 IP 代表整个内网出网。',
        },
        {
          t: '加密 HTTP 请求体中的所有业务数据',
          ok: false,
          why: '加密由 TLS/HTTPS 负责，NAT 只做地址映射不做加密。',
        },
        {
          t: '完全替代域名系统（DNS）来解析网站名称',
          ok: false,
          why: 'DNS 负责名字到 IP 的解析，NAT 负责私网与公网地址的转换。',
        },
        {
          t: '把网页内容缓存到浏览器本地以加速二次访问',
          ok: false,
          why: '浏览器缓存是应用层优化，NAT 工作在网络地址转换层。',
        },
      ],
    },
    {
      q: '域名系统（DNS）在一次网页访问中回答的核心问题是什么？',
      choices: [
        {
          t: '把人类可读的域名（如 example.com）解析为对应的 IP 地址',
          ok: true,
          why: '浏览器先查 DNS 获得服务器 IP，才能建立 TCP 连接发送 HTTP 请求。',
        },
        {
          t: '指导开发者如何编译 C 语言程序为可执行文件',
          ok: false,
          why: '编译是构建工具链的工作，DNS 只负责域名与 IP 的映射查询。',
        },
        {
          t: '决定网页按钮和文字应使用什么颜色与布局',
          ok: false,
          why: 'UI 设计属于前端范畴，DNS 是基础设施层的名字解析服务。',
        },
        {
          t: '验证用户输入的密码是否与数据库记录匹配',
          ok: false,
          why: '身份验证由应用服务器完成，DNS 不参与用户凭证校验。',
        },
      ],
    },
    {
      q: 'Nginx 在本课网络架构中通常扮演什么角色？',
      choices: [
        {
          t: '反向代理（Reverse Proxy），统一接收请求并转发给后端应用',
          ok: true,
          why: 'Nginx 常作为入口门面，负责负载均衡、静态文件服务和 TLS 终止。',
        },
        {
          t: '关系型数据库，专门存储用户表和订单数据',
          ok: false,
          why: '数据库如 MySQL、PostgreSQL 负责存数据，Nginx 是 Web 服务器和代理。',
        },
        {
          t: 'JavaScript 运行时，直接执行 Node.js 业务代码',
          ok: false,
          why: 'Nginx 用 C 编写，不执行 JS；Node 应用通常跑在 Nginx 后面的上游。',
        },
        {
          t: '前端框架，用来构建 React 或 Vue 组件',
          ok: false,
          why: '前端框架运行在浏览器中，Nginx 是服务端的网络基础设施。',
        },
      ],
    },
    {
      q: '「边缘与出口」网络实务中，通常需要关心哪些问题？',
      choices: [
        {
          t: 'DNS 解析是否被污染、代理出口是否可达、防火墙规则与证书部署位置',
          ok: true,
          why: '访问境外服务或部署上线时，出口链路和 DNS 是最先碰到的现实障碍。',
        },
        {
          t: '网页 CSS 中 button 元素的 border-radius 圆角大小',
          ok: false,
          why: 'CSS 样式是前端视觉问题，与网络出口和边缘节点无关。',
        },
        {
          t: 'JavaScript 数组下标从 0 还是 1 开始计数',
          ok: false,
          why: '数组索引是编程语言规则，不属于网络边缘与出口的讨论范围。',
        },
        {
          t: 'Git 分支命名应使用 feat 还是 feature 前缀',
          ok: false,
          why: '分支命名是团队协作约定，与 DNS、代理等网络出口问题无关。',
        },
      ],
    },
    {
      q: '记忆钩「IP 找主机，端口找进程」之后，访问 https://api.example.com 还缺？',
      choices: [
        { t: 'DNS 解析域名→IP；TCP（常经 TLS）建连；再发 HTTP', ok: true, why: '分层协作；缺一环都表现为「连不上」。' },
        { t: '只需要 UDP 广播密钥', ok: false, why: 'HTTPS API 通常 TCP+TLS。' },
        { t: '端口永远固定为 21', ok: false, why: 'HTTPS 默认 443。' },
        { t: '三次握手只用于数据库', ok: false, why: 'TCP 通用。' },
      ],
      relatedNodes: ['tcp-udp', 'dns-https', 'http-web'],
      tags: ['基础'],
    },
    {
      q: 'TCP 相对 UDP，更适合多数 LLM HTTPS API 的原因？',
      choices: [
        { t: '面向连接、可靠有序、可重传——完整 JSON 请求/响应更怕丢一半', ok: true, why: '挂号信 vs 明信片。' },
        { t: 'TCP 不需要端口', ok: false, why: '传输层都用端口。' },
        { t: 'UDP 保证永不丢包且严格有序', ok: false, why: 'UDP 尽力而为。' },
        { t: 'TCP 不能跑在公网', ok: false, why: '公网大量 TCP。' },
      ],
      relatedNodes: ['tcp-udp', 'http-web'],
      tags: ['基础', '进阶'],
    },
    {
      q: '127.0.0.1 与 0.0.0.0 在服务监听语境下的直觉差别？',
      choices: [
        { t: '127.0.0.1 仅本机回环可访；0.0.0.0 常表示监听所有网卡接口', ok: true, why: '容器/面板暴露面与此相关；乱开 0.0.0.0 要注意防火墙。' },
        { t: '二者永远完全等价', ok: false, why: '可达性不同。' },
        { t: '0.0.0.0 是唯一合法公网 IP', ok: false, why: '否。' },
        { t: '127.0.0.1 只能用于 UDP', ok: false, why: '无关。' },
      ],
      relatedNodes: ['ip-addressing', 'ops-docker', 'http-web'],
      tags: ['进阶'],
    },
    {
      q: 'TLS/HTTPS 在传输上主要解决什么？',
      choices: [
        { t: '加密与身份校验，降低明文窃听与中间人篡改风险', ok: true, why: 'API Key 与用户数据必须走 TLS。' },
        { t: '替代全部应用层鉴权', ok: false, why: '仍要登录与权限。' },
        { t: '加快 SQL JOIN', ok: false, why: '无关。' },
        { t: '保证业务逻辑永无 bug', ok: false, why: '无关。' },
      ],
      relatedNodes: ['dns-https', 'host-tls', 'http-web'],
      tags: ['基础'],
    },
    {
      q: '本机 curl 通、公网不通时，优先排查顺序更接近？',
      choices: [
        { t: '安全组/防火墙是否放行、DNS 是否指向正确、反代与证书是否配好', ok: true, why: '连通性分层：网络→DNS→TLS→应用。' },
        { t: '先改前端按钮颜色', ok: false, why: '无关。' },
        { t: '先删除数据库全部备份', ok: false, why: '危险无关。' },
        { t: '一定是 JavaScript === 写错', ok: false, why: '公网不通优先网络层。' },
      ],
      relatedNodes: ['network-basics', 'net-nginx', 'workbench-troubleshoot'],
      tags: ['进阶'],
    },
  ],
});
