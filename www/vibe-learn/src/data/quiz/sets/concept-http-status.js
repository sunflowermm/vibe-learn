import { defineQuizSet } from '../schema.js';

/**
 * HTTP 状态码：一码一题，干扰项=邻近码/联调误判（禁模板「与 XXX 不符」）。
 */
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
      id: 'concept-http-status:200',
      q: 'HTTP 200 OK 表示？',
      choices: [
        {
          t: '请求成功，响应通常携带资源表示',
          ok: true,
          why: '最常见成功码；联调还要核对业务字段是否真成功。',
        },
        {
          t: '成功创建了新资源（常带 Location）',
          ok: false,
          why: '那是 201 Created。',
        },
        {
          t: '成功但无响应正文',
          ok: false,
          why: '那是 204 No Content。',
        },
        {
          t: '仅表示 TLS 握手成功，尚未到 HTTP',
          ok: false,
          why: '200 是 HTTP 应用层状态码。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '200'],
    },
    {
      id: 'concept-http-status:201',
      q: 'HTTP 201 Created 更适合哪类结果？',
      choices: [
        {
          t: '成功创建了新资源',
          ok: true,
          why: 'POST/PUT 创建场景的约定；勿与 200 混用掩盖「已创建」。',
        },
        {
          t: '删除资源成功',
          ok: false,
          why: '删除成功常见 200/202/204。',
        },
        {
          t: '永久重定向到新 URI',
          ok: false,
          why: '那是 301/308。',
        },
        {
          t: '客户端未认证',
          ok: false,
          why: '那是 401。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '201'],
    },
    {
      id: 'concept-http-status:204',
      q: 'HTTP 204 No Content 表示？',
      choices: [
        {
          t: '成功处理，但响应没有正文',
          ok: true,
          why: '常见于 DELETE/更新成功且无需回传实体。',
        },
        {
          t: '资源不存在',
          ok: false,
          why: '那是 404。',
        },
        {
          t: '必须携带新建资源的完整 JSON',
          ok: false,
          why: '204 明确无正文。',
        },
        {
          t: '网关等上游超时',
          ok: false,
          why: '那是 504。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '204'],
    },
    {
      id: 'concept-http-status:301',
      q: 'HTTP 301 Moved Permanently 表示？',
      choices: [
        {
          t: '资源永久换到新 URI',
          ok: true,
          why: 'SEO/迁移常用；方法是否保留要看客户端与后续规范实践。',
        },
        {
          t: '临时跳转，下次仍应打旧地址',
          ok: false,
          why: '临时更常 302/307。',
        },
        {
          t: '内容未变，用本地缓存即可',
          ok: false,
          why: '那是 304。',
        },
        {
          t: '请求体太大被拒',
          ok: false,
          why: '那是 413。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', '状态码', '301'],
    },
    {
      id: 'concept-http-status:302',
      q: 'HTTP 302 Found 的常见含义与联调坑是？',
      choices: [
        {
          t: '临时重定向；部分客户端会把 POST 改',
          ok: true,
          why: '历史兼容坑；需要严格保留方法时用 307/308。',
        },
        {
          t: '永久迁移且永远不应再访问旧 URI',
          ok: false,
          why: '永久更常 301/308。',
        },
        {
          t: '表示未修改，应走协商缓存',
          ok: false,
          why: '那是 304。',
        },
        {
          t: '表示限流',
          ok: false,
          why: '那是 429。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '302'],
    },
    {
      id: 'concept-http-status:304',
      q: 'HTTP 304 Not Modified 表示？',
      choices: [
        {
          t: '协商缓存命中：资',
          ok: true,
          why: '配合 ETag/If-None-Match 或 Last-Modified。',
        },
        {
          t: '永久重定向',
          ok: false,
          why: '那是 301/308。',
        },
        {
          t: '创建成功',
          ok: false,
          why: '那是 201。',
        },
        {
          t: '网关坏了',
          ok: false,
          why: '那是 502/504。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', '状态码', '304'],
    },
    {
      id: 'concept-http-status:307',
      q: '相对 302，HTTP 307 Temporary Redirect 更强调什么？',
      choices: [
        {
          t: '临时重定向，且不',
          ok: true,
          why: '需要保留 POST 等方法时用 307。',
        },
        {
          t: '永久迁移',
          ok: false,
          why: '永久用 301/308。',
        },
        {
          t: '内容未修改',
          ok: false,
          why: '那是 304。',
        },
        {
          t: '未授权',
          ok: false,
          why: '那是 401。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', '状态码', '307'],
    },
    {
      id: 'concept-http-status:308',
      q: '相对 301，HTTP 308 Permanent Redirect 更强调什么？',
      choices: [
        {
          t: '永久重定向，且不应',
          ok: true,
          why: '与 301 的「方法可能被改写」历史坑相对。',
        },
        {
          t: '临时跳转',
          ok: false,
          why: '临时用 302/307。',
        },
        {
          t: '协商缓存命中',
          ok: false,
          why: '那是 304。',
        },
        {
          t: '负载过大',
          ok: false,
          why: '那是 413。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', '状态码', '308'],
    },
    {
      id: 'concept-http-status:400',
      q: 'HTTP 400 Bad Request 的典型场景是？',
      choices: [
        {
          t: '请求语法/参数不合法',
          ok: true,
          why: '缺字段、JSON 坏掉、类型不对等；先修客户端请求。',
        },
        {
          t: '身份正确但无权限',
          ok: false,
          why: '那是 403。',
        },
        {
          t: '资源不存在',
          ok: false,
          why: '那是 404。',
        },
        {
          t: '服务器内部未捕获异常',
          ok: false,
          why: '那是 500。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '400'],
    },
    {
      id: 'concept-http-status:401',
      q: 'HTTP 401 Unauthorized 相对 403，关键差别是？',
      choices: [
        {
          t: '401：未认证/凭证无效；403：已识别但无权限',
          ok: true,
          why: '401 去登录；403 改 ACL/角色。',
        },
        {
          t: '401 表示资源不存在',
          ok: false,
          why: '那是 404。',
        },
        {
          t: '401 表示网关超时',
          ok: false,
          why: '那是 504。',
        },
        {
          t: '401 与 403 完全同义可互换',
          ok: false,
          why: '客户端处理路径不同。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '401'],
    },
    {
      id: 'concept-http-status:403',
      q: 'HTTP 403 Forbidden 表示？',
      choices: [
        {
          t: '服务器理解请求，但拒绝执行',
          ok: true,
          why: '身份可能已识别；不要与「未登录」的 401 混说。',
        },
        {
          t: '未带任何凭证，必须登录',
          ok: false,
          why: '未认证更常 401。',
        },
        {
          t: '方法不被允许',
          ok: false,
          why: '那是 405。',
        },
        {
          t: '媒体类型不支持',
          ok: false,
          why: '那是 415。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '403'],
    },
    {
      id: 'concept-http-status:404',
      q: 'HTTP 404 Not Found 表示？',
      choices: [
        {
          t: '目标资源当前找不到',
          ok: true,
          why: '路径错、已删除、或故意用 404 隐藏存在性。',
        },
        {
          t: '未认证',
          ok: false,
          why: '那是 401。',
        },
        {
          t: '上游网关坏了',
          ok: false,
          why: '那是 502。',
        },
        {
          t: '请求冲突',
          ok: false,
          why: '那是 409。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '404'],
    },
    {
      id: 'concept-http-status:405',
      q: 'HTTP 405 Method Not Allowed 表示？',
      choices: [
        {
          t: '该资源存在，但不支持',
          ok: true,
          why: '响应可带 Allow；例如只许 GET 却发了 DELETE。',
        },
        {
          t: '资源不存在',
          ok: false,
          why: '那是 404。',
        },
        {
          t: '媒体类型不支持',
          ok: false,
          why: '那是 415。',
        },
        {
          t: '限流',
          ok: false,
          why: '那是 429。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '405'],
    },
    {
      id: 'concept-http-status:408',
      q: 'HTTP 408 Request Timeout 更接近？',
      choices: [
        {
          t: '服务器等客户端发送请',
          ok: true,
          why: '与网关等上游的 504 方向不同。',
        },
        {
          t: '网关等上游超时',
          ok: false,
          why: '那是 504。',
        },
        {
          t: '创建成功',
          ok: false,
          why: '那是 201。',
        },
        {
          t: '协商缓存命中',
          ok: false,
          why: '那是 304。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', '状态码', '408'],
    },
    {
      id: 'concept-http-status:409',
      q: 'HTTP 409 Conflict 的典型场景是？',
      choices: [
        {
          t: '与资源当前状态冲突',
          ok: true,
          why: '乐观锁失败、唯一键冲突等常映射到 409。',
        },
        {
          t: '未登录',
          ok: false,
          why: '那是 401。',
        },
        {
          t: '请求体太大',
          ok: false,
          why: '那是 413。',
        },
        {
          t: '上游无效应答',
          ok: false,
          why: '那是 502。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '409'],
    },
    {
      id: 'concept-http-status:413',
      q: 'HTTP 413 Content Too Large / Payload Too Large 表示？',
      choices: [
        {
          t: '请求体超过服务器允许的大小',
          ok: true,
          why: '上传限制、反代 client_max_body_size 等常见。',
        },
        {
          t: '媒体类型不支持',
          ok: false,
          why: '那是 415。',
        },
        {
          t: '方法不被允许',
          ok: false,
          why: '那是 405。',
        },
        {
          t: '永久重定向',
          ok: false,
          why: '那是 301/308。',
        },
      ],
      relatedNodes: ['http-web', 'net-nginx'],
      tags: ['基础', '状态码', '413'],
    },
    {
      id: 'concept-http-status:415',
      q: 'HTTP 415 Unsupported Media Type 表示？',
      choices: [
        {
          t: '服务器不支持请求',
          ok: true,
          why: '例如只收 JSON 却发了 form-urlencoded。',
        },
        {
          t: '请求体太大',
          ok: false,
          why: '那是 413。',
        },
        {
          t: '资源不存在',
          ok: false,
          why: '那是 404。',
        },
        {
          t: '限流',
          ok: false,
          why: '那是 429。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '415'],
    },
    {
      id: 'concept-http-status:429',
      q: 'HTTP 429 Too Many Requests 表示？',
      choices: [
        {
          t: '请求过于频繁，触',
          ok: true,
          why: '调用方应退避；可看 Retry-After。',
        },
        {
          t: '创建成功',
          ok: false,
          why: '那是 201。',
        },
        {
          t: '未授权',
          ok: false,
          why: '那是 401。',
        },
        {
          t: '上游超时',
          ok: false,
          why: '那是 504。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '429'],
    },
    {
      id: 'concept-http-status:500',
      q: 'HTTP 500 Internal Server Error 表示？',
      choices: [
        {
          t: '服务器内部出错，未能',
          ok: true,
          why: '查服务端日志与未捕获异常；勿把 502 当 500。',
        },
        {
          t: '客户端参数写错',
          ok: false,
          why: '参数问题更常 400。',
        },
        {
          t: '网关等上游超时',
          ok: false,
          why: '那是 504。',
        },
        {
          t: '资源不存在',
          ok: false,
          why: '那是 404。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', '状态码', '500'],
    },
    {
      id: 'concept-http-status:502',
      q: 'HTTP 502 Bad Gateway 常见含义是？',
      choices: [
        {
          t: '作为网关/反代时，从上游拿到无效应答',
          ok: true,
          why: '上游挂了、协议不对、连接被拒等；先查 upstream。',
        },
        {
          t: '网关等上游超时',
          ok: false,
          why: '超时更常 504。',
        },
        {
          t: '业务主动返回的「资源不存在」',
          ok: false,
          why: '那是 404。',
        },
        {
          t: '协商缓存命中',
          ok: false,
          why: '那是 304。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'http-web', 'net-nginx'],
      tags: ['基础', '状态码', '502'],
    },
    {
      id: 'concept-http-status:503',
      q: '相对 502，HTTP 503 Service Unavailable 更强调？',
      choices: [
        {
          t: '服务暂时不可用（过载、维护）；可稍后重试',
          ok: true,
          why: '可带 Retry-After；与「上游应答无效」的 502 不同。',
        },
        {
          t: '上游应答格式非法或网关收到无效响应（更偏 502）',
          ok: false,
          why: '那更接近 502。',
        },
        {
          t: '客户端未登录或凭证无效（更偏 401）',
          ok: false,
          why: '那是 401。',
        },
        {
          t: '永久重定向到新 URI（更偏 301/308）',
          ok: false,
          why: '那是 301/308。',
        },
      ],
      relatedNodes: ['http-web', 'reverse-proxy'],
      tags: ['基础', '状态码', '503'],
    },
    {
      id: 'concept-http-status:504',
      q: 'HTTP 504 Gateway Timeout 表示？',
      choices: [
        {
          t: '网关/反代等待上游响应超时',
          ok: true,
          why: '查上游耗时、超时配置与依赖阻塞。',
        },
        {
          t: '上游返回了无法理解的应答',
          ok: false,
          why: '那更接近 502。',
        },
        {
          t: '客户端请求语法错误',
          ok: false,
          why: '那是 400。',
        },
        {
          t: '限流',
          ok: false,
          why: '那是 429。',
        },
      ],
      relatedNodes: ['reverse-proxy', 'http-web', 'net-nginx'],
      tags: ['基础', '状态码', '504'],
    },
  ],
});
