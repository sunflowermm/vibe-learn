import { defineQuizSet } from '../schema.js';

/** CORS：同源 / Origin / 预检 / ACAO；干扰项=联调似真误判。 */
export default defineQuizSet({
  id: 'concept-cors-kw',
  title: '基础 · CORS 名词全表',
  kind: 'concept',
  domain: 'net',
  tags: ['CORS', 'HTTP', '基础'],
  relatedNodes: ['http-web', 'reverse-proxy'],
  caption: '同源、Origin、简单请求、预检 OPTIONS、Allow-Origin——浏览器跨域读响应的规则。',
  questions: [
    {
      id: 'concept-cors-kw:same_origin',
      q: '浏览器「同源」通常比哪三样？',
      choices: [
        {
          t: '协议、主机（域名）、端口三者都相同才算同源',
          ok: true,
          why: '任一不同即跨源；浏览器据此限制前端脚本读跨源响应。',
        },
        {
          t: '只比较文件扩展名是否相同（.js / .html）',
          ok: false,
          why: '扩展名不决定同源。',
        },
        {
          t: '只比较 User-Agent 字符串是否一致',
          ok: false,
          why: 'UA 可伪造，也不构成同源三元组。',
        },
        {
          t: '只比较 Cookie 名是否相同',
          ok: false,
          why: 'Cookie 名不是同源判据。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'same_origin'],
    },
    {
      id: 'concept-cors-kw:origin',
      q: '跨源请求里 Origin 头表示什么？',
      choices: [
        {
          t: '发起页面的协议 + 主机 + 端口来源',
          ok: true,
          why: '服务器用它决定是否放行 CORS。',
        },
        {
          t: '服务器磁盘上的绝对文件路径',
          ok: false,
          why: '无关。',
        },
        {
          t: 'JWT 私钥或会话密钥本身',
          ok: false,
          why: '绝不能把私钥放进 Origin。',
        },
        {
          t: '要访问的 Host，与 Host 头完全同义可互换',
          ok: false,
          why: 'Host 是目标站；Origin 是发起页来源。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'origin'],
    },
    {
      id: 'concept-cors-kw:preflight',
      q: 'CORS 预检常见用什么方法先问服务器？',
      choices: [
        {
          t: 'OPTIONS（对「非简单」跨源请求先预检）',
          ok: true,
          why: '浏览器先 OPTIONS 再发真实请求。',
        },
        {
          t: 'TRACE，并且必须带很大的请求正文',
          ok: false,
          why: '预检是 OPTIONS，不是 TRACE。',
        },
        {
          t: 'CONNECT 隧道方法代替预检',
          ok: false,
          why: 'CONNECT 用于代理隧道，不是 CORS 预检。',
        },
        {
          t: 'DELETE 既当预检又当真实删除',
          ok: false,
          why: 'DELETE 可能是真实方法，不是预检方法。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', 'preflight'],
    },
    {
      id: 'concept-cors-kw:acao',
      q: 'Access-Control-Allow-Origin 的作用是？',
      choices: [
        {
          t: '告诉浏览器哪些来源可以读取该跨源响应',
          ok: true,
          why: '生产慎用 * 搭配凭证；常与反代同源转发对照。',
        },
        {
          t: '设置 Cookie 的 HttpOnly 属性',
          ok: false,
          why: 'HttpOnly 在 Set-Cookie 属性里。',
        },
        {
          t: '指定数据库连接串给浏览器执行',
          ok: false,
          why: '无关。',
        },
        {
          t: '替换站点 TLS 证书并完成续签',
          ok: false,
          why: '证书与 CORS 头是不同层。',
        },
      ],
      relatedNodes: ['http-web', 'reverse-proxy'],
      tags: ['基础', 'acao'],
    },
    {
      id: 'concept-cors-kw:not-server-firewall',
      q: '服务器日志显示请求已 200，但前端仍报 CORS。更合理的理解是？',
      choices: [
        {
          t: '浏览器拦截了前端脚本读取跨源响应（常见缺 ACAO 等头）',
          ok: true,
          why: 'CORS 是浏览器安全策略，不是「服务端没收到」。',
        },
        {
          t: '一定是 TCP 三次握手失败，请求根本没到服务器',
          ok: false,
          why: '有 200 说明 HTTP 已完成。',
        },
        {
          t: '一定是 DNS 解析失败，域名解析不到 IP',
          ok: false,
          why: '解析失败到不了 200。',
        },
        {
          t: 'CORS 错误等于进程崩溃重启中，与响应头无关',
          ok: false,
          why: '常见是缺 ACAO 等响应头。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['进阶'],
    },
    {
      id: 'concept-cors-kw:proxy-same-origin',
      q: '开发时避免 CORS 折腾，常用且稳妥的做法是？',
      choices: [
        {
          t: '用开发服务器 / 反代把 API 同源转发到前端同源',
          ok: true,
          why: '浏览器看同源；后端仍可独立端口。',
        },
        {
          t: '关掉本机防火墙即可永久解决所有跨域问题',
          ok: false,
          why: '防火墙≠同源策略。',
        },
        {
          t: '把所有接口改成 UDP，浏览器就不会做 CORS 检查',
          ok: false,
          why: '与 CORS 无关。',
        },
        {
          t: '在前端页面里禁用 JavaScript 安全模型 / 同源策略',
          ok: false,
          why: '浏览器不允许网页关闭同源策略。',
        },
      ],
      relatedNodes: ['http-web', 'reverse-proxy', 'api-frontend'],
      tags: ['进阶'],
    },
  ],
});
