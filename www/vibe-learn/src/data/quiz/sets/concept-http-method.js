import { defineQuizSet } from '../schema.js';

/** HTTP 方法：语义 + 幂等；干扰项用邻近方法误判。 */
export default defineQuizSet({
  id: 'concept-http-method',
  title: '基础 · HTTP 方法全表',
  kind: 'concept',
  domain: 'net',
  tags: ['HTTP', '方法', '基础'],
  relatedNodes: ['http-web', 'http-hands-on'],
  caption: 'GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS——大厂 API 语义。',
  questions: [
    {
      id: 'concept-http-method:get',
      q: 'HTTP GET 的语义约定是？',
      choices: [
        {
          t: "获取资源表示；按约定不应产生修改副作用，查询参数放 URL",
          ok: true,
          why: '可缓存；大厂禁止用 GET 做删除/扣款。',
        },
        {
          t: '专门用来删除资源，重复调用会反复创建副作用',
          ok: false,
          why: '删除用 DELETE。',
        },
        {
          t: '提交处理并常用于创建资源，查询参数应放请求体',
          ok: false,
          why: '创建/提交处理更常用 POST。',
        },
        {
          t: '按 URI 整体替换资源且幂等（那是 PUT 语义）',
          ok: false,
          why: '那是 PUT。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', 'get'],
    },
    {
      id: 'concept-http-method:post',
      q: 'HTTP POST 更适合哪类操作？',
      choices: [
        {
          t: "提交处理/常用于创建；重复提交可能产生多条结果（通常非幂等）",
          ok: true,
          why: '表单提交与「创建」常用 POST。',
        },
        {
          t: '只读获取且必须可缓存，查询参数应放 URL（那是 GET）',
          ok: false,
          why: '那是 GET 的约定。',
        },
        {
          t: '永久重定向专用方法，与 301/308 状态码无关',
          ok: false,
          why: '重定向是状态码 3xx，不是方法。',
        },
        {
          t: '部分更新资源（补丁），不必整份替换（那是 PATCH）',
          ok: false,
          why: '那是 PATCH。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', 'post'],
    },
    {
      id: 'concept-http-method:put',
      q: 'HTTP PUT 相对 POST，关键语义差别是？',
      choices: [
        {
          t: "按指定 URI 整体替换资源，语义上幂等",
          ok: true,
          why: '同一 URL 多次 PUT 结果应一致；与 POST「由服务器分配 id」不同。',
        },
        {
          t: '只能读不能写',
          ok: false,
          why: 'PUT 是写。',
        },
        {
          t: '永远非幂等',
          ok: false,
          why: '规范上 PUT 幂等。',
        },
        {
          t: '只取响应头、不返回正文',
          ok: false,
          why: '那是 HEAD。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'put'],
    },
    {
      id: 'concept-http-method:patch',
      q: 'HTTP PATCH 表示？',
      choices: [
        {
          t: "部分更新资源（补丁），不必整份替换",
          ok: true,
          why: '与 PUT 全量替换区分。',
        },
        {
          t: "用来永久跳转到新 URI（更像 301/308 重定向语义）",
          ok: false,
          why: '跳转是 3xx 状态码，不是 PATCH。',
        },
        {
          t: "专门用来删除目标资源（更像 DELETE 方法语义）",
          ok: false,
          why: '删除用 DELETE。',
        },
        {
          t: "专门只取响应头、不要正文（更像 HEAD 方法语义）",
          ok: false,
          why: '那是 HEAD。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'patch'],
    },
    {
      id: 'concept-http-method:delete',
      q: 'HTTP DELETE 表示？',
      choices: [
        {
          t: '删除目标资源（语义上幂等）',
          ok: true,
          why: '成功常 200/202/204；再删一次仍应表现为「已不存在」。',
        },
        {
          t: '只读列表',
          ok: false,
          why: '那是 GET。',
        },
        {
          t: '上传二进制正文',
          ok: false,
          why: '上传更常 POST/PUT。',
        },
        {
          t: 'CORS 预检专用',
          ok: false,
          why: '预检常用 OPTIONS。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'delete'],
    },
    {
      id: 'concept-http-method:head',
      q: 'HTTP HEAD 相对 GET？',
      choices: [
        {
          t: '处理类似 GET，但不返回响应正文，只取头',
          ok: true,
          why: '探测资源是否存在、查 Content-Length 常用。',
        },
        {
          t: '语义等同 DELETE：用 HEAD 删除服务端资源',
          ok: false,
          why: '那是 DELETE；HEAD 只取头、不改资源。',
        },
        {
          t: '必须携带大请求体，否则服务端拒绝处理',
          ok: false,
          why: 'HEAD 正是不要响应正文；请求体通常也应为空。',
        },
        {
          t: '只能出现在 WebSocket 握手，不能用于普通 HTTP',
          ok: false,
          why: 'HEAD 是常规 HTTP 方法。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', 'head'],
    },
    {
      id: 'concept-http-method:options',
      q: 'HTTP OPTIONS 的常见用途是？',
      choices: [
        {
          t: "查询允许的方法；浏览器 CORS 预检也常用",
          ok: true,
          why: '响应可含 Allow 与 CORS 相关头。',
        },
        {
          t: "用来上传文件正文并创建资源（那更像 POST/PUT）",
          ok: false,
          why: '上传用 POST/PUT 等。',
        },
        {
          t: "表示服务器内部出错未能完成请求（应用层 500）",
          ok: false,
          why: '重定向是 3xx。',
        },
        {
          t: "用来永久重定向业务页并更新书签（更像 301/308）",
          ok: false,
          why: '错误用 5xx 状态码。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'options'],
    },
    {
      id: 'concept-http-method:safe-vs-idempotent',
      q: '「安全方法」与「幂等方法」更容易搞混的一点是？',
      choices: [
        {
          t: '安全指不应改服务器状态（如 GET）；幂等指多次副作用与一次相同（PUT/DELETE 可写仍幂等）',
          ok: true,
          why: 'DELETE 不「安全」但幂等；POST 通常既不安全也不幂等。',
        },
        {
          t: '安全与幂等完全同义：凡走 TLS 加密的方法都既安全又幂等，与是否改状态无关',
          ok: false,
          why: '定义不同。',
        },
        {
          t: '只有 POST 既安全又幂等；GET 因可能改缓存，所以既不安全也不幂等',
          ok: false,
          why: 'POST 通常两者都不是。',
        },
        {
          t: '开启 TLS 后所有 HTTP 方法自动变成幂等，与 GET/PUT/DELETE 语义无关',
          ok: false,
          why: '加密不改变方法语义。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['进阶', '幂等'],
    },
  ],
});
