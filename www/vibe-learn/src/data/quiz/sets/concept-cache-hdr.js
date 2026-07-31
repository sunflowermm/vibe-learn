import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-cache-hdr",
  title: "基础 · HTTP 缓存头全表",
  kind: 'concept',
  domain: "net",
  tags: ["缓存","HTTP","基础"],
  relatedNodes: ["http-web","net-edge-practice"],
  caption: "Cache-Control、Expires、ETag、Last-Modified、强缓存 vs 协商缓存。",
  questions: [
  {
    "id": "concept-cache-hdr:cache_control",
    "q": "现代 HTTP 强缓存更常看哪个响应头？",
    "choices": [
      {
        "t": "Cache-Control（如 max-age）",
        "ok": true,
        "why": "Cache-Control：控制缓存的主头（max-age、no-cache、no-store、private/public 等）。强缓存未过期时常直接用本地副本。"
      },
      {
        "t": "仅 Server 头",
        "ok": false,
        "why": "与「Cache-Control」不符。"
      },
      {
        "t": "仅 Set-Cookie",
        "ok": false,
        "why": "与「Cache-Control」不符。"
      },
      {
        "t": "仅 Content-Language",
        "ok": false,
        "why": "与「Cache-Control」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "cache_control"
    ]
  },
  {
    "id": "concept-cache-hdr:expires",
    "q": "相对 Cache-Control，Expires 更像？",
    "choices": [
      {
        "t": "用绝对时间表达过期的较老机制，优先级通常更低",
        "ok": true,
        "why": "Expires：绝对过期时间的老标准；优先级通常低于 Cache-Control。理解遗留系统时仍会遇到。"
      },
      {
        "t": "TLS 握手专用",
        "ok": false,
        "why": "与「Expires」不符。"
      },
      {
        "t": "CORS 预检专用",
        "ok": false,
        "why": "与「Expires」不符。"
      },
      {
        "t": "表示永久删除资源",
        "ok": false,
        "why": "与「Expires」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "expires"
    ]
  },
  {
    "id": "concept-cache-hdr:etag",
    "q": "ETag 在协商缓存里扮演？",
    "choices": [
      {
        "t": "内容指纹，配合 If-None-Match 判断是否 304",
        "ok": true,
        "why": "ETag：资源内容指纹；客户端用 If-None-Match 协商，未变常回 304。比纯时间戳更精确。"
      },
      {
        "t": "用户密码哈希存浏览器",
        "ok": false,
        "why": "与「ETag」不符。"
      },
      {
        "t": "仅表示 TCP 窗口大小",
        "ok": false,
        "why": "与「ETag」不符。"
      },
      {
        "t": "Docker 镜像 digest 的浏览器别名",
        "ok": false,
        "why": "与「ETag」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "etag"
    ]
  },
  {
    "id": "concept-cache-hdr:last_modified",
    "q": "Last-Modified / If-Modified-Since 属于？",
    "choices": [
      {
        "t": "基于修改时间的协商缓存机制",
        "ok": true,
        "why": "Last-Modified：资源上次修改时间；客户端用 If-Modified-Since 协商。精度与时钟问题下常不如 ETag。"
      },
      {
        "t": "强行关闭 TLS",
        "ok": false,
        "why": "与「Last-Modified」不符。"
      },
      {
        "t": "SQL 事务隔离级别",
        "ok": false,
        "why": "与「Last-Modified」不符。"
      },
      {
        "t": "仅用于 WebSocket 升级",
        "ok": false,
        "why": "与「Last-Modified」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "last_modified"
    ]
  },
  {
    "id": "concept-cache-hdr:strong_vs_revalidate",
    "q": "强缓存与协商缓存的核心差别？",
    "choices": [
      {
        "t": "强缓存未过期可不请求；协商要带验证头问服务器变了没",
        "ok": true,
        "why": "强缓存：未过期可不打服务器直接用；协商缓存：带验证头问服务器，304 用本地或 200 拿新内容。"
      },
      {
        "t": "二者都禁止任何缓存",
        "ok": false,
        "why": "与「强缓存 vs 协商缓存」不符。"
      },
      {
        "t": "协商缓存只能用于 UDP",
        "ok": false,
        "why": "与「强缓存 vs 协商缓存」不符。"
      },
      {
        "t": "强缓存等于必须每次下载全文",
        "ok": false,
        "why": "与「强缓存 vs 协商缓存」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "net-edge-practice"
    ],
    "tags": [
      "基础",
      "strong_vs_revalidate"
    ]
  }
],
});
