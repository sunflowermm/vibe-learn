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
          t: '获取资源表示；按约定不应产生修改副作用，查询参数放 URL',
          ok: true,
          why: '可缓存；大厂禁止用 GET 做删除/扣款。',
        },
        {
          t: '专门用来删除资源',
          ok: false,
          why: '删除用 DELETE。',
        },
        {
          t: '提交处理并常用于创建资源',
          ok: false,
          why: '创建/提交处理更常用 POST。',
        },
        {
          t: '按 URI 整体替换资源且幂等',
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
          t: '提交处理/常用于创建；重复提交可能产生多条结果（通常非幂等）',
          ok: true,
          why: '表单提交与「创建」常用 POST。',
        },
        {
          t: '只读获取且必须可缓存',
          ok: false,
          why: '那是 GET 的约定。',
        },
        {
          t: '永久重定向专用',
          ok: false,
          why: '重定向是状态码 3xx，不是方法。',
        },
        {
          t: '部分更新资源（补丁）',
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
          t: '按指定 URI 整体替换资源，语义上幂等',
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
          t: '部分更新资源（补丁），不必整份替换',
          ok: true,
          why: '与 PUT 全量替换区分。',
        },
        {
          t: '删除目标资源',
          ok: false,
          why: '那是 DELETE。',
        },
        {
          t: '获取响应头专用',
          ok: false,
          why: '那是 HEAD。',
        },
        {
          t: '永久跳转',
          ok: false,
          why: '跳转是 3xx 状态码。',
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
          t: '删除资源',
          ok: false,
          why: '那是 DELETE。',
        },
        {
          t: '必须带大 body',
          ok: false,
          why: 'HEAD 正是不要正文。',
        },
        {
          t: '只能用在 WebSocket',
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
          t: '查询允许的方法；浏览器 CORS 预检也常用',
          ok: true,
          why: '响应可含 Allow 与 CORS 相关头。',
        },
        {
          t: '上传文件正文',
          ok: false,
          why: '上传用 POST/PUT 等。',
        },
        {
          t: '永久重定向业务页',
          ok: false,
          why: '重定向是 3xx。',
        },
        {
          t: '表示服务器内部错误',
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
          t: '安全与幂等是完全同义词',
          ok: false,
          why: '定义不同。',
        },
        {
          t: '只有 POST 既安全又幂等',
          ok: false,
          why: 'POST 通常两者都不是。',
        },
        {
          t: 'TLS 开启后所有方法自动幂等',
          ok: false,
          why: '加密不改变方法语义。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['进阶', '幂等'],
    },
  ],
});
