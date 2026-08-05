import { defineQuizSet } from '../schema.js';

/** Cookie / Session 属性：干扰项用邻近标志误判。 */
export default defineQuizSet({
  id: 'concept-cookie-flag',
  title: '基础 · Cookie / Session 属性全表',
  kind: 'concept',
  domain: 'net',
  tags: ['Cookie', 'Session', '安全', '基础'],
  relatedNodes: ['http-web', 'craft-security'],
  caption: 'Cookie、Session、HttpOnly、Secure、SameSite、Domain/Path——Web 会话与 CSRF/XSS 边界。',
  questions: [
    {
      id: 'concept-cookie-flag:cookie',
      q: 'Cookie 主要存在哪里、谁会自动带上？',
      choices: [
        {
          t: '存在浏览器；符合 Domain/Path 的后续请求会自动附带',
          ok: true,
          why: '经 Set-Cookie 写入；约 4KB 级，内容对客户端可见（除非 HttpOnly）。',
        },
        {
          t: '只存在服务器内存，浏览器永远不会保存任何 Cookie',
          ok: false,
          why: '那是纯服务端状态；Cookie 会落在浏览器。',
        },
        {
          t: '只能通过 WebSocket 传递，普通 HTTP 请求带不上',
          ok: false,
          why: '常规 HTTP 请求即可携带。',
        },
        {
          t: '等同数据库主键本身，写入 Cookie 就是写入表主键列',
          ok: false,
          why: 'Cookie 是客户端持有的名值对，常存 SessionID。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'cookie'],
    },
    {
      id: 'concept-cookie-flag:session',
      q: '相对 Cookie 里直接塞用户资料，Session 的典型分工是？',
      choices: [
        {
          t: '敏感状态放服务端，浏览器主要持有会话标识（如 SessionID）',
          ok: true,
          why: '强踢下线、即时失效往往比纯前端资料更顺手。',
        },
        {
          t: 'Session 只能存在 localStorage，不能经 Cookie 传 ID',
          ok: false,
          why: '经典 Session 在服务端；SessionID 经 Cookie 传递很常见。',
        },
        {
          t: 'Session 禁止使用 Cookie 传递任何标识',
          ok: false,
          why: 'SessionID 经 Cookie 传递非常常见。',
        },
        {
          t: 'Session 就是 JWT 的别名，机制完全相同',
          ok: false,
          why: '机制不同：服务端会话 vs 自包含令牌。',
        },
      ],
      relatedNodes: ['http-web', 'craft-security'],
      tags: ['基础', 'session'],
    },
    {
      id: 'concept-cookie-flag:httponly',
      q: 'Cookie 设 HttpOnly 的直接效果是？',
      choices: [
        {
          t: '前端 JS（如 document.cookie）读不到该 Cookie',
          ok: true,
          why: '降低 XSS 偷会话风险；不防 CSRF。',
        },
        {
          t: '禁止 HTTPS，只允许明文 HTTP 发送该 Cookie',
          ok: false,
          why: '那与 Secure 相反；HttpOnly 不管信道。',
        },
        {
          t: '自动防住所有跨站请求伪造（CSRF）',
          ok: false,
          why: 'HttpOnly 不解决跨站自动带 Cookie 的 CSRF。',
        },
        {
          t: '让 Cookie 永不过期，忽略 Max-Age / Expires',
          ok: false,
          why: '过期由 Max-Age/Expires 控制。',
        },
      ],
      relatedNodes: ['http-web', 'craft-security'],
      tags: ['基础', 'httponly'],
    },
    {
      id: 'concept-cookie-flag:secure',
      q: 'Cookie 的 Secure 标志表示？',
      choices: [
        {
          t: '只在 HTTPS（安全）请求中发送该 Cookie',
          ok: true,
          why: '降低明文信道被窃听风险。',
        },
        {
          t: '只允许 HTTP 明文发送，HTTPS 反而禁止发送',
          ok: false,
          why: '说反了。',
        },
        {
          t: '等同 HttpOnly：前端 JS 也读不到',
          ok: false,
          why: '一个管 JS 可读性，一个管是否仅 HTTPS。',
        },
        {
          t: '表示 Cookie 永不发送给任何服务器',
          ok: false,
          why: '仍会在 HTTPS 请求中发送。',
        },
      ],
      relatedNodes: ['http-web', 'host-tls'],
      tags: ['基础', 'secure'],
    },
    {
      id: 'concept-cookie-flag:samesite',
      q: 'SameSite 主要用来缓解哪类问题？',
      choices: [
        {
          t: '跨站请求伪造（CSRF）：限制跨站请求是否携带 Cookie',
          ok: true,
          why: 'Lax/Strict/None；不能替代 XSS 防护。',
        },
        {
          t: 'SQL 注入：替代参数化查询',
          ok: false,
          why: '注入靠输入校验/参数化，不是 SameSite。',
        },
        {
          t: '磁盘配额耗尽：限制 Cookie 总字节数到 0',
          ok: false,
          why: '无关。',
        },
        {
          t: 'DNS 污染：自动校正被污染的解析结果',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['http-web', 'craft-security'],
      tags: ['基础', 'samesite'],
    },
    {
      id: 'concept-cookie-flag:domain_path',
      q: 'Cookie 的 Domain / Path 决定什么？',
      choices: [
        {
          t: '哪些主机与路径的请求会附带该 Cookie',
          ok: true,
          why: '范围过大易扩大泄漏与 CSRF 面，应按最小必要设置。',
        },
        {
          t: 'HTTP 状态码的含义（200/404 等）',
          ok: false,
          why: '无关。',
        },
        {
          t: 'TLS 证书由哪家 CA 签发',
          ok: false,
          why: '无关。',
        },
        {
          t: '是否允许前端 JS 读取（那是 HttpOnly 的职责）',
          ok: false,
          why: '可读性由 HttpOnly 控制。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'domain_path'],
    },
    {
      id: 'concept-cookie-flag:httponly-vs-samesite',
      q: 'HttpOnly 与 SameSite 分工上最准确的说法是？',
      choices: [
        {
          t: 'HttpOnly 防 XSS 读 Cookie；SameSite 限制跨站是否携带 Cookie（偏 CSRF）',
          ok: true,
          why: '两者互补，不能互相替代。',
        },
        {
          t: '两者完全同义：只要设了其中一个，就等于同时开启了另一个的全部防护效果',
          ok: false,
          why: '威胁模型不同。',
        },
        {
          t: '有了 HttpOnly 就不必再上 HTTPS，也不需要再设 Secure；明文 HTTP 信道也安全',
          ok: false,
          why: '信道仍要 Secure/TLS。',
        },
        {
          t: 'SameSite=None 且不带 Secure，是现代浏览器推荐的默认、也是最安全的组合',
          ok: false,
          why: 'None 通常要求 Secure。',
        },
      ],
      relatedNodes: ['http-web', 'craft-security'],
      tags: ['进阶'],
    },
  ],
});
