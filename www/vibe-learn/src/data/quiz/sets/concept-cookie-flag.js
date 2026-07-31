import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-cookie-flag",
  title: "基础 · Cookie / Session 属性全表",
  kind: 'concept',
  domain: "net",
  tags: ["Cookie","Session","安全","基础"],
  relatedNodes: ["http-web","craft-security"],
  caption: "Cookie、Session、HttpOnly、Secure、SameSite、Domain/Path——Web 会话与 CSRF/XSS 边界。",
  questions: [
  {
    "id": "concept-cookie-flag:cookie",
    "q": "Cookie 主要存在哪里、谁会自动带上？",
    "choices": [
      {
        "t": "存在浏览器；符合 Domain/Path 等条件的请求会自动附带",
        "ok": true,
        "why": "Cookie：服务器经 Set-Cookie 让浏览器保存的小段名值对；后续同范围请求自动带上。约 4KB 级，内容对客户端可见（除非 HttpOnly）。"
      },
      {
        "t": "只存在服务器内存，浏览器永不保存",
        "ok": false,
        "why": "与「Cookie」不符。"
      },
      {
        "t": "只能用 WebSocket 传递",
        "ok": false,
        "why": "与「Cookie」不符。"
      },
      {
        "t": "等同数据库主键",
        "ok": false,
        "why": "与「Cookie」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "cookie"
    ]
  },
  {
    "id": "concept-cookie-flag:session",
    "q": "相对 Cookie 里直接塞用户资料，Session 的典型分工？",
    "choices": [
      {
        "t": "敏感状态放服务端，浏览器主要持有会话标识",
        "ok": true,
        "why": "Session：会话状态存在服务器；浏览器通常只持有 SessionID（常经 Cookie）。强踢下线、即时失效往往比纯 JWT 更顺手。"
      },
      {
        "t": "Session 只能存在 localStorage",
        "ok": false,
        "why": "与「Session（服务端会话）」不符。"
      },
      {
        "t": "Session 禁止使用 Cookie 传 ID",
        "ok": false,
        "why": "与「Session（服务端会话）」不符。"
      },
      {
        "t": "Session 就是 JWT 的别名",
        "ok": false,
        "why": "与「Session（服务端会话）」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "craft-security"
    ],
    "tags": [
      "基础",
      "session"
    ]
  },
  {
    "id": "concept-cookie-flag:httponly",
    "q": "Cookie 设 HttpOnly 的直接效果？",
    "choices": [
      {
        "t": "前端 JS 读不到该 Cookie，降低 XSS 窃取会话风险",
        "ok": true,
        "why": "HttpOnly：标记后文档脚本（如 document.cookie）读不到该 Cookie，降低 XSS 偷会话标识的风险；不防 CSRF。"
      },
      {
        "t": "禁止 HTTPS",
        "ok": false,
        "why": "与「HttpOnly（Cookie 标志）」不符。"
      },
      {
        "t": "自动防住所有 CSRF",
        "ok": false,
        "why": "与「HttpOnly（Cookie 标志）」不符。"
      },
      {
        "t": "让 Cookie 永不过期",
        "ok": false,
        "why": "与「HttpOnly（Cookie 标志）」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "craft-security"
    ],
    "tags": [
      "基础",
      "httponly"
    ]
  },
  {
    "id": "concept-cookie-flag:secure",
    "q": "Cookie 的 Secure 标志表示？",
    "choices": [
      {
        "t": "只在 HTTPS 请求中发送该 Cookie",
        "ok": true,
        "why": "Secure：仅在 HTTPS（安全连接）请求中发送该 Cookie，降低明文信道被窃听风险。"
      },
      {
        "t": "只允许 HTTP 明文发送",
        "ok": false,
        "why": "与「Secure（Cookie 标志）」不符。"
      },
      {
        "t": "等同 HttpOnly",
        "ok": false,
        "why": "与「Secure（Cookie 标志）」不符。"
      },
      {
        "t": "表示 Cookie 永不发送",
        "ok": false,
        "why": "与「Secure（Cookie 标志）」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "host-tls"
    ],
    "tags": [
      "基础",
      "secure"
    ]
  },
  {
    "id": "concept-cookie-flag:samesite",
    "q": "SameSite 主要用来缓解哪类问题？",
    "choices": [
      {
        "t": "跨站请求伪造（CSRF）：限制跨站请求是否附带 Cookie",
        "ok": true,
        "why": "SameSite：控制跨站请求是否带 Cookie（Lax/Strict/None）；是缓解 CSRF 的关键手段之一，不能替代 XSS 防护。"
      },
      {
        "t": "SQL 注入",
        "ok": false,
        "why": "与「SameSite（Cookie 标志）」不符。"
      },
      {
        "t": "磁盘配额耗尽",
        "ok": false,
        "why": "与「SameSite（Cookie 标志）」不符。"
      },
      {
        "t": "DNS 污染",
        "ok": false,
        "why": "与「SameSite（Cookie 标志）」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "craft-security"
    ],
    "tags": [
      "基础",
      "samesite"
    ]
  },
  {
    "id": "concept-cookie-flag:domain_path",
    "q": "Cookie 的 Domain / Path 决定什么？",
    "choices": [
      {
        "t": "哪些主机与路径的请求会附带该 Cookie",
        "ok": true,
        "why": "Domain / Path：限定 Cookie 作用的主机与路径范围；范围过大易扩大泄漏与 CSRF 面，应按最小必要设置。"
      },
      {
        "t": "HTTP 状态码含义",
        "ok": false,
        "why": "与「Cookie Domain / Path」不符。"
      },
      {
        "t": "TLS 证书品牌",
        "ok": false,
        "why": "与「Cookie Domain / Path」不符。"
      },
      {
        "t": "Docker 镜像标签",
        "ok": false,
        "why": "与「Cookie Domain / Path」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "domain_path"
    ]
  }
],
});
