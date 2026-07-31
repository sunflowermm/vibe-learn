import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-http-hdr",
  title: "基础 · HTTP 常用头全表",
  kind: 'concept',
  domain: "net",
  tags: ["HTTP","请求头","基础"],
  relatedNodes: ["http-web","http-hands-on"],
  caption: "Host、Content-Type、Authorization、Accept、User-Agent、Cookie/Set-Cookie、Origin。",
  questions: [
  {
    "id": "concept-http-hdr:host",
    "q": "Host 请求头主要表示？",
    "choices": [
      {
        "t": "要访问的主机名（及可选端口），供虚拟主机选型",
        "ok": true,
        "why": "Host：请求目标主机（及端口）。虚拟主机/反代按 Host 选站点；HTTP/1.1 必带。"
      },
      {
        "t": "响应正文的 MIME 类型",
        "ok": false,
        "why": "与「Host」不符。"
      },
      {
        "t": "客户端操作系统版本专用",
        "ok": false,
        "why": "与「Host」不符。"
      },
      {
        "t": "TLS 私钥",
        "ok": false,
        "why": "与「Host」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "net-nginx"
    ],
    "tags": [
      "基础",
      "host"
    ]
  },
  {
    "id": "concept-http-hdr:content_type",
    "q": "Content-Type: application/json 表示？",
    "choices": [
      {
        "t": "正文应按 JSON 解析",
        "ok": true,
        "why": "Content-Type：正文的媒体类型（如 application/json）。收发双方据此序列化/解析 Body。"
      },
      {
        "t": "正文一定是 PNG",
        "ok": false,
        "why": "与「Content-Type」不符。"
      },
      {
        "t": "与正文无关可乱填",
        "ok": false,
        "why": "与「Content-Type」不符。"
      },
      {
        "t": "表示 TCP 窗口大小",
        "ok": false,
        "why": "与「Content-Type」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "content_type"
    ]
  },
  {
    "id": "concept-http-hdr:authorization",
    "q": "调需鉴权的 HTTPS API 时，Authorization 常见形态？",
    "choices": [
      {
        "t": "Bearer + Token/API Key（密钥勿暴露到浏览器）",
        "ok": true,
        "why": "Authorization：携带凭证，常见 Bearer <token>。密钥放服务端环境变量，勿写进前端打包。"
      },
      {
        "t": "把密钥写进 URL 永久公开即可",
        "ok": false,
        "why": "与「Authorization」不符。"
      },
      {
        "t": "有 Authorization 就不需要 TLS",
        "ok": false,
        "why": "与「Authorization」不符。"
      },
      {
        "t": "只能放 Cookie 名字符串",
        "ok": false,
        "why": "与「Authorization」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "craft-security",
      "data-env"
    ],
    "tags": [
      "基础",
      "authorization"
    ]
  },
  {
    "id": "concept-http-hdr:accept",
    "q": "Accept 头表达？",
    "choices": [
      {
        "t": "客户端希望接受哪些响应格式/类型",
        "ok": true,
        "why": "Accept：客户端可接受的响应媒体类型。内容协商时服务器据此选型。"
      },
      {
        "t": "服务器磁盘剩余空间",
        "ok": false,
        "why": "与「Accept」不符。"
      },
      {
        "t": "仅用于 WebSocket 升级密钥",
        "ok": false,
        "why": "与「Accept」不符。"
      },
      {
        "t": "等同 Set-Cookie",
        "ok": false,
        "why": "与「Accept」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "accept"
    ]
  },
  {
    "id": "concept-http-hdr:user_agent",
    "q": "User-Agent 的正确定位？",
    "choices": [
      {
        "t": "客户端自报身份，可伪造，不能当唯一鉴权",
        "ok": true,
        "why": "User-Agent：客户端标识字符串。统计与兼容用；勿当唯一安全依据（可伪造）。"
      },
      {
        "t": "不可伪造的硬件根密钥",
        "ok": false,
        "why": "与「User-Agent」不符。"
      },
      {
        "t": "替代 HTTPS",
        "ok": false,
        "why": "与「User-Agent」不符。"
      },
      {
        "t": "服务器返回的状态码",
        "ok": false,
        "why": "与「User-Agent」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "user_agent"
    ]
  },
  {
    "id": "concept-http-hdr:cookie_req",
    "q": "请求里的 Cookie 头通常来自？",
    "choices": [
      {
        "t": "浏览器按规则自动附带此前通过 Set-Cookie 保存的值",
        "ok": true,
        "why": "Cookie 请求头：浏览器自动带上此前存下的 Cookie。与 Set-Cookie 响应头成对；会话 ID 常走这条。"
      },
      {
        "t": "只能由 DNS 服务器写入",
        "ok": false,
        "why": "与「Cookie（请求头）」不符。"
      },
      {
        "t": "等同 Authorization Bearer 强制形态",
        "ok": false,
        "why": "与「Cookie（请求头）」不符。"
      },
      {
        "t": "禁止用于 SessionID",
        "ok": false,
        "why": "与「Cookie（请求头）」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "cookie_req"
    ]
  },
  {
    "id": "concept-http-hdr:set_cookie",
    "q": "Set-Cookie 出现在？",
    "choices": [
      {
        "t": "响应头：指示浏览器保存（或更新）Cookie",
        "ok": true,
        "why": "Set-Cookie：服务器让浏览器存储 Cookie 的响应头，可带 HttpOnly/Secure/SameSite 等属性。"
      },
      {
        "t": "仅请求行方法名",
        "ok": false,
        "why": "与「Set-Cookie」不符。"
      },
      {
        "t": "TCP 三次握手字段",
        "ok": false,
        "why": "与「Set-Cookie」不符。"
      },
      {
        "t": "Docker 标签",
        "ok": false,
        "why": "与「Set-Cookie」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "craft-security"
    ],
    "tags": [
      "基础",
      "set_cookie"
    ]
  },
  {
    "id": "concept-http-hdr:origin_hdr",
    "q": "Origin 头在跨源场景下的作用？",
    "choices": [
      {
        "t": "标明发起页面的协议+主机+端口，供服务器做 CORS 等判定",
        "ok": true,
        "why": "Origin：跨源请求中标明页面来源。CORS 与 CSRF 讨论里常与 Cookie 策略对照。"
      },
      {
        "t": "存放 JWT 私钥",
        "ok": false,
        "why": "与「Origin（头）」不符。"
      },
      {
        "t": "替换 Host 且仅用于 FTP",
        "ok": false,
        "why": "与「Origin（头）」不符。"
      },
      {
        "t": "表示磁盘路径",
        "ok": false,
        "why": "与「Origin（头）」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "origin_hdr"
    ]
  }
],
});
