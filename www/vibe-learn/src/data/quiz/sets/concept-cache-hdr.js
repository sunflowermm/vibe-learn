import { defineQuizSet } from '../schema.js';

/** HTTP 缓存头：强缓存 vs 协商；干扰项用邻近机制误判。 */
export default defineQuizSet({
  id: 'concept-cache-hdr',
  title: '基础 · HTTP 缓存头全表',
  kind: 'concept',
  domain: 'net',
  tags: ['缓存', 'HTTP', '基础'],
  relatedNodes: ['http-web', 'net-edge-practice'],
  caption: 'Cache-Control、Expires、ETag、Last-Modified、强缓存 vs 协商缓存。',
  questions: [
    {
      id: 'concept-cache-hdr:cache_control',
      q: '现代 HTTP 强缓存更常看哪个响应头？',
      choices: [
        {
          t: 'Cache-Control（如 max-age、no-store、private/public）',
          ok: true,
          why: '强缓存未过期时常直接用本地副本。',
        },
        {
          t: '仅 Server 头',
          ok: false,
          why: 'Server 是服务器标识，不管缓存策略。',
        },
        {
          t: '仅 Set-Cookie',
          ok: false,
          why: '写 Cookie，不是强缓存主控。',
        },
        {
          t: '仅 ETag',
          ok: false,
          why: 'ETag 偏协商缓存验证。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'cache_control'],
    },
    {
      id: 'concept-cache-hdr:expires',
      q: '相对 Cache-Control，Expires 更像什么？',
      choices: [
        {
          t: '用绝对时间表达过期的较老机制，优先级通常更低',
          ok: true,
          why: '理解遗留系统时仍会遇到。',
        },
        {
          t: 'TLS 握手专用头',
          ok: false,
          why: '与 TLS 无关。',
        },
        {
          t: 'CORS 预检专用头',
          ok: false,
          why: '预检看的是 CORS 相关头。',
        },
        {
          t: '表示永久删除资源',
          ok: false,
          why: '只表达过期时间。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'expires'],
    },
    {
      id: 'concept-cache-hdr:etag',
      q: 'ETag 在协商缓存里扮演什么角色？',
      choices: [
        {
          t: '内容指纹，配合 If-None-Match 判断是否返回 304',
          ok: true,
          why: '未变常回 304；比纯时间戳更精确。',
        },
        {
          t: '用户密码哈希存浏览器',
          ok: false,
          why: '绝不能把密码哈希当 ETag 用途。',
        },
        {
          t: '仅表示 TCP 窗口大小',
          ok: false,
          why: '无关。',
        },
        {
          t: '强制每次必须下载全文，禁止 304',
          ok: false,
          why: 'ETag 正是为了可能的 304。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'etag'],
    },
    {
      id: 'concept-cache-hdr:last_modified',
      q: 'Last-Modified / If-Modified-Since 属于哪类机制？',
      choices: [
        {
          t: '基于修改时间的协商缓存',
          ok: true,
          why: '精度与时钟问题下常不如 ETag。',
        },
        {
          t: '强行关闭 TLS',
          ok: false,
          why: '无关。',
        },
        {
          t: 'SQL 事务隔离级别',
          ok: false,
          why: '无关。',
        },
        {
          t: '强缓存 max-age 的唯一实现方式',
          ok: false,
          why: '强缓存更常看 Cache-Control。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'last_modified'],
    },
    {
      id: 'concept-cache-hdr:strong_vs_revalidate',
      q: '强缓存与协商缓存的核心差别是？',
      choices: [
        {
          t: '强缓存未过期可不请求；协商要带验证头问服务器变了没',
          ok: true,
          why: '协商命中常 304；未命中 200 拿新内容。',
        },
        {
          t: '二者都禁止任何缓存',
          ok: false,
          why: '两者都是缓存策略。',
        },
        {
          t: '协商缓存只能用于 UDP',
          ok: false,
          why: 'HTTP 缓存跑在常规 HTTP 上。',
        },
        {
          t: '强缓存等于必须每次下载全文',
          ok: false,
          why: '强缓存正是为了少下载。',
        },
      ],
      relatedNodes: ['http-web', 'net-edge-practice'],
      tags: ['基础', 'strong_vs_revalidate'],
    },
    {
      id: 'concept-cache-hdr:no-store-api',
      q: '对含用户隐私的 API JSON，更稳妥的 Cache-Control 倾向是？',
      choices: [
        {
          t: 'private / no-store（或短 max-age + 谨慎），避免被共享缓存乱存',
          ok: true,
          why: '公共 CDN 缓存私密 JSON 是事故。',
        },
        {
          t: 'public, max-age=31536000 且永不协商',
          ok: false,
          why: '过长公共缓存适合指纹化静态资源，不适合私密 API。',
        },
        {
          t: '完全不设头，让所有中间盒随意缓存',
          ok: false,
          why: '缺策略更不可控。',
        },
        {
          t: '只用 Expires 写一个过去时间并忽略 Cache-Control',
          ok: false,
          why: '现代以 Cache-Control 为主。',
        },
      ],
      relatedNodes: ['http-web', 'net-edge-practice', 'craft-security'],
      tags: ['进阶'],
    },
  ],
});
