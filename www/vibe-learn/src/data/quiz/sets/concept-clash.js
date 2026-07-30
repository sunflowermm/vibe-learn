import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-clash',
  title: '概念 · 代理引擎与 Coding Agent',
  kind: 'concept',
  domain: 'ops',
  tags: ['代理', 'Clash', '出口'],
  relatedNodes: ['clash', 'clash-port', 'clash-setup'],
  questions: [
    {
      q: 'Clash 这类代理引擎，本质上更接近下面哪种描述？',
      choices: [
        {
          t: '按规则把本机或应用的流量转发到指定出口节点',
          ok: true,
          why: '核心是分流与转发，不是编译代码或存数据库。',
        },
        {
          t: '把 TypeScript 源码编译成 JavaScript 的编译器',
          ok: false,
          why: '编译器处理语法与构建；代理处理网络流量路径。',
        },
        {
          t: '关系型数据库，用来存用户表与订单',
          ok: false,
          why: '数据库持久化业务数据；代理不承担存储职责。',
        },
        {
          t: '替代 Git 做版本管理与代码合并',
          ok: false,
          why: 'Git 管代码历史；代理只影响网络请求走哪条线路。',
        },
      ],
    },
    {
      q: '让 Coding Agent 或 pnpm/npm 走本机代理时，最关键要对齐什么？',
      choices: [
        {
          t: '系统或终端的 HTTP_PROXY/HTTPS_PROXY 与 Clash 监听端口一致',
          ok: true,
          why: '工具只有读到正确代理环境变量，请求才会进 Clash 分流。',
        },
        {
          t: '只改桌面壁纸，网络就会自动走代理',
          ok: false,
          why: '壁纸与网络栈无关；必须配置代理地址或系统代理。',
        },
        {
          t: '关闭所有域名系统（DNS）解析，代理才生效',
          ok: false,
          why: 'DNS 仍需解析域名；Clash 可接管 DNS 但不是「关掉 DNS」。',
        },
        {
          t: '把 NO_PROXY 设成 *，让所有地址都走代理',
          ok: false,
          why: 'NO_PROXY 列出「不走代理」的地址；设 * 会导致本地服务也异常。',
        },
      ],
    },
    {
      q: '把订阅链接或配置文件导入 Clash，主要是为了获得什么？',
      choices: [
        {
          t: '节点列表与分流规则，让「哪些流量走哪条线路」生效',
          ok: true,
          why: '没有节点和规则，引擎不知道往哪里转发。',
        },
        {
          t: '自动生成后端业务插件与 HTTP 接口代码',
          ok: false,
          why: 'Clash 不写业务逻辑；只提供网络出口与规则。',
        },
        {
          t: '格式化硬盘并重装操作系统',
          ok: false,
          why: '与磁盘管理无关；导入配置只更新代理规则与节点。',
        },
        {
          t: '替代 package.json 声明项目依赖版本',
          ok: false,
          why: '依赖由包管理器解析；代理配置与 npm/pnpm 锁文件无关。',
        },
      ],
    },
    {
      q: '本机调试「访问 GitHub/npm 外网失败」时，应该先检查什么？',
      choices: [
        {
          t: '代理是否开启、NO_PROXY 是否误伤、端口与 DNS 是否正常',
          ok: true,
          why: '外网失败多半是出口或解析问题；先查代理再查业务代码。',
        },
        {
          t: '先连续删除 node_modules 三次再重装',
          ok: false,
          why: '网络不通时重装依赖只会重复失败，浪费 time。',
        },
        {
          t: '先改前端页面文案，也许网络就会好',
          ok: false,
          why: 'UI 文案与 TCP 连接能否建立无关。',
        },
        {
          t: '关掉 HTTPS，只用 HTTP 就不需要代理',
          ok: false,
          why: '是否 HTTPS 不决定是否需代理；墙/路由问题仍在。',
        },
      ],
    },
  ],
});
