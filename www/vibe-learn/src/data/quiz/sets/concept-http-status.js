import { defineQuizSet } from '../schema.js';

/** 大厂联调基础：HTTP 状态码一码一题（配名词 http_xxx） */
export default defineQuizSet({
  id: 'concept-http-status',
  title: '基础 · HTTP 状态码全表',
  kind: 'concept',
  domain: 'net',
  tags: ['HTTP', '状态码', '基础'],
  relatedNodes: ['http-web', 'http-hands-on'],
  caption: '2xx/3xx/4xx/5xx 各码语义；与名词轨 http_xxx 对照。',
  questions: [
  {
    "id": "concept-http-status:200",
    "q": "HTTP 200 OK 表示？",
    "choices": [
      {
        "t": "请求成功，响应通常携带资源表示",
        "ok": true,
        "why": "HTTP 200 OK：请求已成功，响应体通常携带所请求的资源表示；是最常见的成功状态码。大厂联调时先确认业务是否真成功，勿只看「有响应」。"
      },
      {
        "t": "资源一定不存在",
        "ok": false,
        "why": "与 HTTP 200 OK 语义不符；对照 200 的约定场景。"
      },
      {
        "t": "必须携带新创建资源的 Location",
        "ok": false,
        "why": "与 HTTP 200 OK 语义不符；对照 200 的约定场景。"
      },
      {
        "t": "仅表示 TLS 握手成功",
        "ok": false,
        "why": "与 HTTP 200 OK 语义不符；对照 200 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "200"
    ]
  },
  {
    "id": "concept-http-status:201",
    "q": "HTTP 201 Created 更适合？",
    "choices": [
      {
        "t": "成功创建了新资源（常带 Location）",
        "ok": true,
        "why": "HTTP 201 Created：请求已成功且服务器已创建新资源；响应常带 Location 指向新资源。POST/PUT 创建场景的大厂约定，勿与 200 混用掩盖「已创建」。"
      },
      {
        "t": "删除资源成功",
        "ok": false,
        "why": "与 HTTP 201 Created 语义不符；对照 201 的约定场景。"
      },
      {
        "t": "客户端未认证",
        "ok": false,
        "why": "与 HTTP 201 Created 语义不符；对照 201 的约定场景。"
      },
      {
        "t": "网关超时",
        "ok": false,
        "why": "与 HTTP 201 Created 语义不符；对照 201 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "201"
    ]
  },
  {
    "id": "concept-http-status:204",
    "q": "HTTP 204 No Content 表示？",
    "choices": [
      {
        "t": "成功但没有响应正文",
        "ok": true,
        "why": "HTTP 204 No Content：成功处理但响应无正文；常见于 DELETE 成功或无需回写体的更新。客户端不应期望解析 JSON body。"
      },
      {
        "t": "资源未找到",
        "ok": false,
        "why": "与 HTTP 204 No Content 语义不符；对照 204 的约定场景。"
      },
      {
        "t": "请求体格式错误",
        "ok": false,
        "why": "与 HTTP 204 No Content 语义不符；对照 204 的约定场景。"
      },
      {
        "t": "服务器内部错误",
        "ok": false,
        "why": "与 HTTP 204 No Content 语义不符；对照 204 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "204"
    ]
  },
  {
    "id": "concept-http-status:301",
    "q": "HTTP 301 表示？",
    "choices": [
      {
        "t": "资源永久换址，应更新书签/索引到新 URL",
        "ok": true,
        "why": "HTTP 301 Moved Permanently：资源永久迁移；客户端与搜索引擎应改记新 URL。缓存与 SEO 敏感，勿拿 301 做临时活动跳转。"
      },
      {
        "t": "仅本次临时跳转",
        "ok": false,
        "why": "与 HTTP 301 Moved Permanently 语义不符；对照 301 的约定场景。"
      },
      {
        "t": "客户端权限不足",
        "ok": false,
        "why": "与 HTTP 301 Moved Permanently 语义不符；对照 301 的约定场景。"
      },
      {
        "t": "上游网关坏了",
        "ok": false,
        "why": "与 HTTP 301 Moved Permanently 语义不符；对照 301 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "301"
    ]
  },
  {
    "id": "concept-http-status:302",
    "q": "HTTP 302 常见含义与坑？",
    "choices": [
      {
        "t": "临时重定向；部分客户端可能把 POST 变成 GET",
        "ok": true,
        "why": "HTTP 302 Found：临时重定向（历史语义混杂）；许多客户端会把 POST 改成 GET。需要保留方法时优先考虑 307/308。"
      },
      {
        "t": "永久迁移且 SEO 应改索引",
        "ok": false,
        "why": "与 HTTP 302 Found 语义不符；对照 302 的约定场景。"
      },
      {
        "t": "表示资源创建成功",
        "ok": false,
        "why": "与 HTTP 302 Found 语义不符；对照 302 的约定场景。"
      },
      {
        "t": "表示未授权",
        "ok": false,
        "why": "与 HTTP 302 Found 语义不符；对照 302 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "302"
    ]
  },
  {
    "id": "concept-http-status:304",
    "q": "HTTP 304 Not Modified 表示？",
    "choices": [
      {
        "t": "协商缓存命中，可继续用本地缓存，无新正文",
        "ok": true,
        "why": "HTTP 304 Not Modified：协商缓存命中，正文不传；依赖 If-None-Match / If-Modified-Since 与 ETag/Last-Modified。用于省带宽，不是错误。"
      },
      {
        "t": "资源永久删除",
        "ok": false,
        "why": "与 HTTP 304 Not Modified 语义不符；对照 304 的约定场景。"
      },
      {
        "t": "必须重新下载全文",
        "ok": false,
        "why": "与 HTTP 304 Not Modified 语义不符；对照 304 的约定场景。"
      },
      {
        "t": "网关错误",
        "ok": false,
        "why": "与 HTTP 304 Not Modified 语义不符；对照 304 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "304"
    ]
  },
  {
    "id": "concept-http-status:307",
    "q": "相对 302，HTTP 307 更强调？",
    "choices": [
      {
        "t": "临时跳转且不应擅自改方法/正文",
        "ok": true,
        "why": "HTTP 307 Temporary Redirect：临时重定向且禁止擅自改请求方法与正文；比 302 语义更清晰，适合 API 临时换入口。"
      },
      {
        "t": "永久改址",
        "ok": false,
        "why": "与 HTTP 307 Temporary Redirect 语义不符；对照 307 的约定场景。"
      },
      {
        "t": "创建成功",
        "ok": false,
        "why": "与 HTTP 307 Temporary Redirect 语义不符；对照 307 的约定场景。"
      },
      {
        "t": "缓存命中无正文",
        "ok": false,
        "why": "与 HTTP 307 Temporary Redirect 语义不符；对照 307 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "307"
    ]
  },
  {
    "id": "concept-http-status:308",
    "q": "HTTP 308 相对 301？",
    "choices": [
      {
        "t": "永久跳转且保留方法/正文语义更严",
        "ok": true,
        "why": "HTTP 308 Permanent Redirect：永久重定向且保留原方法与正文；比 301 更适合「POST 也要跟到新 URL」的 API 场景。"
      },
      {
        "t": "临时跳转",
        "ok": false,
        "why": "与 HTTP 308 Permanent Redirect 语义不符；对照 308 的约定场景。"
      },
      {
        "t": "未认证",
        "ok": false,
        "why": "与 HTTP 308 Permanent Redirect 语义不符；对照 308 的约定场景。"
      },
      {
        "t": "无内容成功",
        "ok": false,
        "why": "与 HTTP 308 Permanent Redirect 语义不符；对照 308 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "308"
    ]
  },
  {
    "id": "concept-http-status:400",
    "q": "HTTP 400 Bad Request 典型场景？",
    "choices": [
      {
        "t": "请求本身不合法（参数/格式/校验失败）",
        "ok": true,
        "why": "HTTP 400 Bad Request：请求语法或语义无法被服务器理解（缺字段、JSON 非法、参数校验失败等）。大厂应返回可机器解析的错误体，勿只用 500 糊弄客户端错误。"
      },
      {
        "t": "Token 过期应优选用 400 而非 401",
        "ok": false,
        "why": "与 HTTP 400 Bad Request 语义不符；对照 400 的约定场景。"
      },
      {
        "t": "上游超时",
        "ok": false,
        "why": "与 HTTP 400 Bad Request 语义不符；对照 400 的约定场景。"
      },
      {
        "t": "资源不存在应优选用 400 而非 404",
        "ok": false,
        "why": "与 HTTP 400 Bad Request 语义不符；对照 400 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "400"
    ]
  },
  {
    "id": "concept-http-status:401",
    "q": "HTTP 401 相对 403？",
    "choices": [
      {
        "t": "未认证或凭证无效；403 是已识别但无权限",
        "ok": true,
        "why": "HTTP 401 Unauthorized：未提供或凭证无效；应触发重新认证。名称历史误导，实质是 authentication 失败，与 403 授权失败区分。"
      },
      {
        "t": "两者完全同义",
        "ok": false,
        "why": "与 HTTP 401 Unauthorized 语义不符；对照 401 的约定场景。"
      },
      {
        "t": "表示创建成功",
        "ok": false,
        "why": "与 HTTP 401 Unauthorized 语义不符；对照 401 的约定场景。"
      },
      {
        "t": "表示缓存命中",
        "ok": false,
        "why": "与 HTTP 401 Unauthorized 语义不符；对照 401 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "401"
    ]
  },
  {
    "id": "concept-http-status:403",
    "q": "HTTP 403 Forbidden 表示？",
    "choices": [
      {
        "t": "已理解请求但拒绝授权访问",
        "ok": true,
        "why": "HTTP 403 Forbidden：服务器理解请求且通常已识别身份，但拒绝执行（权限/策略）。客户端换 Token 未必有用，需改角色或资源 ACL。"
      },
      {
        "t": "资源一定不存在",
        "ok": false,
        "why": "与 HTTP 403 Forbidden 语义不符；对照 403 的约定场景。"
      },
      {
        "t": "仅表示 JSON 写错",
        "ok": false,
        "why": "与 HTTP 403 Forbidden 语义不符；对照 403 的约定场景。"
      },
      {
        "t": "网关连不上上游",
        "ok": false,
        "why": "与 HTTP 403 Forbidden 语义不符；对照 403 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "403"
    ]
  },
  {
    "id": "concept-http-status:404",
    "q": "HTTP 404 Not Found 表示？",
    "choices": [
      {
        "t": "服务器响应了，但目标资源不存在（或不可见）",
        "ok": true,
        "why": "HTTP 404 Not Found：目标资源不存在或对调用方不可见。联调先查路径、挂载与路由；有时故意对无权限也回 404 以防枚举。"
      },
      {
        "t": "服务器硬件损坏",
        "ok": false,
        "why": "与 HTTP 404 Not Found 语义不符；对照 404 的约定场景。"
      },
      {
        "t": "TLS 握手成功的别名",
        "ok": false,
        "why": "与 HTTP 404 Not Found 语义不符；对照 404 的约定场景。"
      },
      {
        "t": "创建成功",
        "ok": false,
        "why": "与 HTTP 404 Not Found 语义不符；对照 404 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "404"
    ]
  },
  {
    "id": "concept-http-status:405",
    "q": "HTTP 405 表示？",
    "choices": [
      {
        "t": "资源在，但当前方法不被允许",
        "ok": true,
        "why": "HTTP 405 Method Not Allowed：URI 存在但不支持该 HTTP 方法；响应宜带 Allow 列出可用方法。例如对只读资源发 DELETE。"
      },
      {
        "t": "域名解析失败",
        "ok": false,
        "why": "与 HTTP 405 Method Not Allowed 语义不符；对照 405 的约定场景。"
      },
      {
        "t": "未登录",
        "ok": false,
        "why": "与 HTTP 405 Method Not Allowed 语义不符；对照 405 的约定场景。"
      },
      {
        "t": "网关超时",
        "ok": false,
        "why": "与 HTTP 405 Method Not Allowed 语义不符；对照 405 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "405"
    ]
  },
  {
    "id": "concept-http-status:408",
    "q": "HTTP 408 更接近？",
    "choices": [
      {
        "t": "服务器等请求超时（客户端侧发送/空闲问题居多）",
        "ok": true,
        "why": "HTTP 408 Request Timeout：服务器等待请求完整到达超时。与 504（网关等上游）不同，偏客户端发送过慢或连接空闲。"
      },
      {
        "t": "上游应用挂了的网关超时（504）",
        "ok": false,
        "why": "与 HTTP 408 Request Timeout 语义不符；对照 408 的约定场景。"
      },
      {
        "t": "永久重定向",
        "ok": false,
        "why": "与 HTTP 408 Request Timeout 语义不符；对照 408 的约定场景。"
      },
      {
        "t": "创建成功",
        "ok": false,
        "why": "与 HTTP 408 Request Timeout 语义不符；对照 408 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "408"
    ]
  },
  {
    "id": "concept-http-status:409",
    "q": "HTTP 409 Conflict 典型？",
    "choices": [
      {
        "t": "与资源当前状态冲突（版本/唯一约束等）",
        "ok": true,
        "why": "HTTP 409 Conflict：与当前资源状态冲突，如乐观锁版本不符、唯一键冲突。大厂 API 常用其表达「可重试的状态冲突」而非笼统 400。"
      },
      {
        "t": "文件一定物理损坏",
        "ok": false,
        "why": "与 HTTP 409 Conflict 语义不符；对照 409 的约定场景。"
      },
      {
        "t": "DNS 失败",
        "ok": false,
        "why": "与 HTTP 409 Conflict 语义不符；对照 409 的约定场景。"
      },
      {
        "t": "缓存命中",
        "ok": false,
        "why": "与 HTTP 409 Conflict 语义不符；对照 409 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "409"
    ]
  },
  {
    "id": "concept-http-status:413",
    "q": "HTTP 413 表示？",
    "choices": [
      {
        "t": "请求体过大，被服务器/网关拒绝",
        "ok": true,
        "why": "HTTP 413 Content Too Large（Payload Too Large）：请求体超过服务器或网关限制。上传接口需在反代与应用层同时设限并返回清晰错误。"
      },
      {
        "t": "URL 不存在",
        "ok": false,
        "why": "与 HTTP 413 Content Too Large 语义不符；对照 413 的约定场景。"
      },
      {
        "t": "未授权",
        "ok": false,
        "why": "与 HTTP 413 Content Too Large 语义不符；对照 413 的约定场景。"
      },
      {
        "t": "永久跳转",
        "ok": false,
        "why": "与 HTTP 413 Content Too Large 语义不符；对照 413 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "413"
    ]
  },
  {
    "id": "concept-http-status:415",
    "q": "HTTP 415 表示？",
    "choices": [
      {
        "t": "媒体类型（Content-Type）不被支持",
        "ok": true,
        "why": "HTTP 415 Unsupported Media Type：Content-Type 不被支持，如接口只要 application/json 却收到 form。检查头与序列化，而非乱改状态码为 500。"
      },
      {
        "t": "路径不存在",
        "ok": false,
        "why": "与 HTTP 415 Unsupported Media Type 语义不符；对照 415 的约定场景。"
      },
      {
        "t": "网关坏掉",
        "ok": false,
        "why": "与 HTTP 415 Unsupported Media Type 语义不符；对照 415 的约定场景。"
      },
      {
        "t": "缓存命中",
        "ok": false,
        "why": "与 HTTP 415 Unsupported Media Type 语义不符；对照 415 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "415"
    ]
  },
  {
    "id": "concept-http-status:429",
    "q": "HTTP 429 表示？",
    "choices": [
      {
        "t": "请求过于频繁，触发限流",
        "ok": true,
        "why": "HTTP 429 Too Many Requests：触发限流；响应常带 Retry-After。调用方应退避重试，服务方需防刷与配额。大厂开放 API 高频考点。"
      },
      {
        "t": "资源创建成功",
        "ok": false,
        "why": "与 HTTP 429 Too Many Requests 语义不符；对照 429 的约定场景。"
      },
      {
        "t": "永久迁移",
        "ok": false,
        "why": "与 HTTP 429 Too Many Requests 语义不符；对照 429 的约定场景。"
      },
      {
        "t": "仅表示 JSON 语法错",
        "ok": false,
        "why": "与 HTTP 429 Too Many Requests 语义不符；对照 429 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "429"
    ]
  },
  {
    "id": "concept-http-status:500",
    "q": "HTTP 500 表示？",
    "choices": [
      {
        "t": "服务器内部出错，未能正常完成请求",
        "ok": true,
        "why": "HTTP 500 Internal Server Error：服务器未捕获的故障。生产应记日志与关联 ID，勿把堆栈直接回给公网；能区分的客户端错误不要一律 500。"
      },
      {
        "t": "客户端参数错误的首选码",
        "ok": false,
        "why": "与 HTTP 500 Internal Server Error 语义不符；对照 500 的约定场景。"
      },
      {
        "t": "未登录的首选码",
        "ok": false,
        "why": "与 HTTP 500 Internal Server Error 语义不符；对照 500 的约定场景。"
      },
      {
        "t": "缓存命中",
        "ok": false,
        "why": "与 HTTP 500 Internal Server Error 语义不符；对照 500 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "500"
    ]
  },
  {
    "id": "concept-http-status:502",
    "q": "HTTP 502 Bad Gateway 常见含义？",
    "choices": [
      {
        "t": "网关/反代从上游拿到无效响应",
        "ok": true,
        "why": "HTTP 502 Bad Gateway：作为网关/反代收到上游无效响应。排障看上游进程、端口、协议是否通，而不是先改前端文案。"
      },
      {
        "t": "浏览器缓存命中",
        "ok": false,
        "why": "与 HTTP 502 Bad Gateway 语义不符；对照 502 的约定场景。"
      },
      {
        "t": "资源创建成功",
        "ok": false,
        "why": "与 HTTP 502 Bad Gateway 语义不符；对照 502 的约定场景。"
      },
      {
        "t": "客户端 JSON 写错的首选",
        "ok": false,
        "why": "与 HTTP 502 Bad Gateway 语义不符；对照 502 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "502"
    ]
  },
  {
    "id": "concept-http-status:503",
    "q": "HTTP 503 相对 502？",
    "choices": [
      {
        "t": "服务暂时不可用（过载/维护/熔断等）",
        "ok": true,
        "why": "HTTP 503 Service Unavailable：服务暂时不可用（过载、维护、熔断）。可带 Retry-After；与 502（上游应答坏）区分：503 更像「现在别来」。"
      },
      {
        "t": "永久资源不存在",
        "ok": false,
        "why": "与 HTTP 503 Service Unavailable 语义不符；对照 503 的约定场景。"
      },
      {
        "t": "未认证",
        "ok": false,
        "why": "与 HTTP 503 Service Unavailable 语义不符；对照 503 的约定场景。"
      },
      {
        "t": "协商缓存命中",
        "ok": false,
        "why": "与 HTTP 503 Service Unavailable 语义不符；对照 503 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "503"
    ]
  },
  {
    "id": "concept-http-status:504",
    "q": "HTTP 504 Gateway Timeout 表示？",
    "choices": [
      {
        "t": "网关等待上游响应超时",
        "ok": true,
        "why": "HTTP 504 Gateway Timeout：网关等上游超时。查上游耗时、超时配置与依赖慢查询；与 408（等客户端请求）不同。"
      },
      {
        "t": "客户端未发送完请求（更偏 408）",
        "ok": false,
        "why": "与 HTTP 504 Gateway Timeout 语义不符；对照 504 的约定场景。"
      },
      {
        "t": "创建成功",
        "ok": false,
        "why": "与 HTTP 504 Gateway Timeout 语义不符；对照 504 的约定场景。"
      },
      {
        "t": "永久跳转",
        "ok": false,
        "why": "与 HTTP 504 Gateway Timeout 语义不符；对照 504 的约定场景。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "状态码",
      "504"
    ]
  }
],
});
