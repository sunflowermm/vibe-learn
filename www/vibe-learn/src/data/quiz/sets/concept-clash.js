import { defineQuizSet } from '../schema.js';

/** 代理引擎：Clash 分流、环境变量、Coding Agent 出口 */
export default defineQuizSet({
  id: 'concept-clash',
  title: '概念 · 代理引擎与 Coding Agent',
  kind: 'concept',
  domain: 'ops',
  tags: ['代理', 'Clash', '出口'],
  relatedNodes: ['clash', 'clash-port', 'clash-setup'],
  caption: '分流与出口；Agent/pnpm 要对齐代理端口与 NO_PROXY。',
  questions: [
    {
      id: 'concept-clash:what',
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
          why: '编译器处理语法与构建；代理处理网络路径。',
        },
        {
          t: '关系型数据库，用来存用户表与订单',
          ok: false,
          why: '数据库持久化业务数据；代理不承担存储。',
        },
        {
          t: '替代 Git 做版本管理与代码合并',
          ok: false,
          why: 'Git 管代码历史；代理只影响请求走哪条线路。',
        },
      ],
      relatedNodes: ['clash'],
    },
    {
      id: 'concept-clash:env',
      q: '让 Coding Agent 或 pnpm/npm 走本机代理时，最关键要对齐什么？',
      choices: [
        {
          t: '系统或终端的 HTTP_PROXY',
          ok: true,
          why: '工具读到正确代理变量，请求才会进 Clash。',
        },
        {
          t: '只改桌面壁纸，网络就会自动走代理',
          ok: false,
          why: '壁纸与网络栈无关；必须配代理地址或系统代理。',
        },
        {
          t: '关闭所有域名系统（DNS）解析，代理才生效',
          ok: false,
          why: 'DNS 仍需解析；Clash 可接管 DNS，不是「关掉」。',
        },
        {
          t: '把 NO_PROXY 设成 *，让所有地址都走代理',
          ok: false,
          why: 'NO_PROXY 是「不走代理」名单；设 * 会误伤本地服务。',
        },
      ],
      relatedNodes: ['clash-port', 'clash-setup'],
    },
    {
      id: 'concept-clash:sub',
      q: '把订阅链接或配置文件导入 Clash，主要是为了获得什么？',
      choices: [
        {
          t: '节点列表与分流规则，让「哪些流量走哪条线路」生效',
          ok: true,
          why: '没有节点和规则，引擎不知道往哪转发。',
        },
        {
          t: '自动生成后端业务插件与 HTTP 接口代码',
          ok: false,
          why: 'Clash 不写业务逻辑；只提供出口与规则。',
        },
        {
          t: '自动编译本机内核并热替换正在运行的系统',
          ok: false,
          why: '导入配置只更新代理规则与节点。',
        },
        {
          t: '替代 package.json 声明项目依赖版本',
          ok: false,
          why: '依赖由包管理器解析；与代理配置无关。',
        },
      ],
      relatedNodes: ['clash-setup', 'clash'],
    },
    {
      id: 'concept-clash:debug',
      q: '本机调试「访问 GitHub/npm 外网失败」时，应该先检查什么？',
      choices: [
        {
          t: '代理是否开启、NO_PROXY 是否误伤、端口与 DN',
          ok: true,
          why: '外网失败多半是出口或解析；先查代理再查业务代码。',
        },
        {
          t: '先连续删除 node_modules 三次再重装',
          ok: false,
          why: '网络不通时重装只会重复失败。',
        },
        {
          t: '先改前端页面文案，也许网络就会好',
          ok: false,
          why: 'UI 文案与 TCP 能否建立无关。',
        },
        {
          t: '关掉 HTTPS，只用 HTTP 就不需要代理',
          ok: false,
          why: '是否 HTTPS 不决定是否需代理；路由问题仍在。',
        },
      ],
      relatedNodes: ['clash-port', 'clash-setup', 'workbench-troubleshoot'],
    },
    {
      id: 'concept-clash:noproxy',
      q: '本机已开 Clash，但访问 127.0.0.1 上的开发服务却异常，常见原因？',
      choices: [
        {
          t: '本地回环（127.0.0.1）被误送进代理绕一圈',
          ok: true,
          why: '开发服务走环回，不应经出口节点绕一圈。',
        },
        {
          t: '本机端口被代理占用时，只能换机器开发',
          ok: false,
          why: '先查代理旁路与监听端口。',
        },
        {
          t: 'Clash 会自动禁止一切本机 TCP',
          ok: false,
          why: '默认不是「禁本机」；是规则与环境变量配置问题。',
        },
        {
          t: '把代理端口改成 80 就能修好本机访问',
          ok: false,
          why: '改端口不解决「本机是否应走代理」。',
        },
      ],
      relatedNodes: ['clash-port', 'clash-setup'],
      tags: ['场景'],
    },
    {
      id: 'concept-clash:agent',
      q: 'Cursor/Agent 拉外网模型或依赖失败，而浏览器正常时，优先怀疑？',
      choices: [
        {
          t: 'IDE/终端进程未继承系统代理，或只配了浏览器插件',
          ok: true,
          why: '浏览器走系统/插件代理，CLI/IDE 常要单独设环境变量。',
        },
        {
          t: '一定是 Git 仓库被删了',
          ok: false,
          why: '外网拉取失败先查出口，不是先假定仓库消失。',
        },
        {
          t: '必须把 API Key 写进公开 README',
          ok: false,
          why: '密钥勿进仓；且与代理路径无关。',
        },
        {
          t: '关掉 Clash 并清空所有规则一定更快',
          ok: false,
          why: '在需要代理的网络环境下关掉会更糟。',
        },
      ],
      relatedNodes: ['clash-setup', 'clash-port', 'adev-vibe-coding'],
      tags: ['场景'],
    },
  ],
});
