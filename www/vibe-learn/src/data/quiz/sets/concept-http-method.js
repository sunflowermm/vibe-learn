import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-http-method",
  title: "基础 · HTTP 方法全表",
  kind: 'concept',
  domain: "net",
  tags: ["HTTP","方法","基础"],
  relatedNodes: ["http-web","http-hands-on"],
  caption: "GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS——大厂 API 语义。",
  questions: [
  {
    "id": "concept-http-method:get",
    "q": "HTTP GET 的语义约定？",
    "choices": [
      {
        "t": "获取资源，按约定不应产生修改副作用",
        "ok": true,
        "why": "HTTP GET：获取资源表示，按约定无副作用、可缓存；查询参数放 URL。大厂禁止用 GET 做删除/扣款。"
      },
      {
        "t": "专门用来删除资源",
        "ok": false,
        "why": "与「HTTP GET」不符。"
      },
      {
        "t": "只能上传文件",
        "ok": false,
        "why": "与「HTTP GET」不符。"
      },
      {
        "t": "与 POST 在所有场景可互换",
        "ok": false,
        "why": "与「HTTP GET」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "get"
    ]
  },
  {
    "id": "concept-http-method:post",
    "q": "HTTP POST 更适合？",
    "choices": [
      {
        "t": "提交处理/常用于创建，重复提交可能产生多条结果",
        "ok": true,
        "why": "HTTP POST：向目标资源提交处理（常创建子资源或触发动作），通常非幂等。表单提交与「创建」常用 POST。"
      },
      {
        "t": "只读获取且必须缓存",
        "ok": false,
        "why": "与「HTTP POST」不符。"
      },
      {
        "t": "永久重定向专用",
        "ok": false,
        "why": "与「HTTP POST」不符。"
      },
      {
        "t": "表示未授权",
        "ok": false,
        "why": "与「HTTP POST」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "post"
    ]
  },
  {
    "id": "concept-http-method:put",
    "q": "HTTP PUT 相对 POST？",
    "choices": [
      {
        "t": "按指定 URI 整体替换资源，语义上幂等",
        "ok": true,
        "why": "HTTP PUT：用请求体整体替换目标资源；幂等——同一 URL 多次 PUT 结果应一致。与 POST「由服务器分配 id」不同。"
      },
      {
        "t": "只能读不能写",
        "ok": false,
        "why": "与「HTTP PUT」不符。"
      },
      {
        "t": "永远非幂等",
        "ok": false,
        "why": "与「HTTP PUT」不符。"
      },
      {
        "t": "等同 HEAD",
        "ok": false,
        "why": "与「HTTP PUT」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "put"
    ]
  },
  {
    "id": "concept-http-method:patch",
    "q": "HTTP PATCH 表示？",
    "choices": [
      {
        "t": "部分更新资源（补丁），不必整份替换",
        "ok": true,
        "why": "HTTP PATCH：对资源做部分更新（补丁），不必传完整文档。与 PUT 全量替换区分。"
      },
      {
        "t": "只能删除",
        "ok": false,
        "why": "与「HTTP PATCH」不符。"
      },
      {
        "t": "获取响应头专用",
        "ok": false,
        "why": "与「HTTP PATCH」不符。"
      },
      {
        "t": "永久跳转",
        "ok": false,
        "why": "与「HTTP PATCH」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "patch"
    ]
  },
  {
    "id": "concept-http-method:delete",
    "q": "HTTP DELETE 表示？",
    "choices": [
      {
        "t": "删除目标资源（语义上幂等）",
        "ok": true,
        "why": "HTTP DELETE：删除目标资源；规范上幂等。成功常 200/202/204。"
      },
      {
        "t": "只读列表",
        "ok": false,
        "why": "与「HTTP DELETE」不符。"
      },
      {
        "t": "上传二进制",
        "ok": false,
        "why": "与「HTTP DELETE」不符。"
      },
      {
        "t": "TLS 握手别名",
        "ok": false,
        "why": "与「HTTP DELETE」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "delete"
    ]
  },
  {
    "id": "concept-http-method:head",
    "q": "HTTP HEAD 相对 GET？",
    "choices": [
      {
        "t": "处理类似 GET，但不返回响应正文",
        "ok": true,
        "why": "HTTP HEAD：与 GET 相同的处理，但不返回正文，只取响应头。探测资源是否存在、查 Content-Length 常用。"
      },
      {
        "t": "删除资源",
        "ok": false,
        "why": "与「HTTP HEAD」不符。"
      },
      {
        "t": "必须带大 body",
        "ok": false,
        "why": "与「HTTP HEAD」不符。"
      },
      {
        "t": "只能用在 WebSocket",
        "ok": false,
        "why": "与「HTTP HEAD」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "head"
    ]
  },
  {
    "id": "concept-http-method:options",
    "q": "HTTP OPTIONS 常见用途？",
    "choices": [
      {
        "t": "查询允许的方法/CORS 预检等",
        "ok": true,
        "why": "HTTP OPTIONS：询问目标资源支持的通信选项；浏览器 CORS 预检常用。响应可含 Allow。"
      },
      {
        "t": "上传文件正文",
        "ok": false,
        "why": "与「HTTP OPTIONS」不符。"
      },
      {
        "t": "永久重定向业务页",
        "ok": false,
        "why": "与「HTTP OPTIONS」不符。"
      },
      {
        "t": "表示 500 错误",
        "ok": false,
        "why": "与「HTTP OPTIONS」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "options"
    ]
  }
],
});
