import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-cors-kw",
  title: "基础 · CORS 名词全表",
  kind: 'concept',
  domain: "net",
  tags: ["CORS","HTTP","基础"],
  relatedNodes: ["http-web","reverse-proxy"],
  caption: "同源、Origin、简单请求、预检 OPTIONS、Allow-Origin——浏览器跨域读响应的规则。",
  questions: [
  {
    "id": "concept-cors-kw:same_origin",
    "q": "浏览器「同源」通常比哪三样？",
    "choices": [
      {
        "t": "协议、主机（域名）、端口",
        "ok": true,
        "why": "同源：协议、主机、端口三者皆同。任一不同即跨源；浏览器据此限制前端脚本读跨源响应。"
      },
      {
        "t": "仅文件扩展名",
        "ok": false,
        "why": "与「同源（Same-Origin）」不符。"
      },
      {
        "t": "仅 User-Agent",
        "ok": false,
        "why": "与「同源（Same-Origin）」不符。"
      },
      {
        "t": "仅 Cookie 名",
        "ok": false,
        "why": "与「同源（Same-Origin）」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "same_origin"
    ]
  },
  {
    "id": "concept-cors-kw:origin",
    "q": "跨源请求里 Origin 头表示？",
    "choices": [
      {
        "t": "发起页面的协议+主机+端口来源",
        "ok": true,
        "why": "Origin：浏览器在跨源请求中标明页面来源（协议+主机+端口）。服务器用它决定是否放行 CORS。"
      },
      {
        "t": "服务器磁盘路径",
        "ok": false,
        "why": "与「Origin 请求头」不符。"
      },
      {
        "t": "JWT 私钥",
        "ok": false,
        "why": "与「Origin 请求头」不符。"
      },
      {
        "t": "Docker 网络名",
        "ok": false,
        "why": "与「Origin 请求头」不符。"
      }
    ],
    "relatedNodes": [
      "http-web"
    ],
    "tags": [
      "基础",
      "origin"
    ]
  },
  {
    "id": "concept-cors-kw:preflight",
    "q": "CORS 预检常见用什么方法先问服务器？",
    "choices": [
      {
        "t": "OPTIONS",
        "ok": true,
        "why": "预检：对「非简单」跨源请求，浏览器先发 OPTIONS 询问服务器是否允许方法/头，通过后再发真实请求。"
      },
      {
        "t": "TRACE 专用且必须带 body",
        "ok": false,
        "why": "与「CORS 预检（Preflight）」不符。"
      },
      {
        "t": "CONNECT 隧道",
        "ok": false,
        "why": "与「CORS 预检（Preflight）」不符。"
      },
      {
        "t": "PURGE 缓存专用",
        "ok": false,
        "why": "与「CORS 预检（Preflight）」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "基础",
      "preflight"
    ]
  },
  {
    "id": "concept-cors-kw:acao",
    "q": "Access-Control-Allow-Origin 的作用？",
    "choices": [
      {
        "t": "告诉浏览器哪些来源可以读取该跨源响应",
        "ok": true,
        "why": "Access-Control-Allow-Origin：响应头，声明哪些 Origin 可读该响应。生产慎用 * 搭配凭证；常与反代同源转发对照。"
      },
      {
        "t": "设置 Cookie 的 HttpOnly",
        "ok": false,
        "why": "与「Access-Control-Allow-Origin」不符。"
      },
      {
        "t": "指定数据库连接串",
        "ok": false,
        "why": "与「Access-Control-Allow-Origin」不符。"
      },
      {
        "t": "替换 TLS 证书",
        "ok": false,
        "why": "与「Access-Control-Allow-Origin」不符。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "reverse-proxy"
    ],
    "tags": [
      "基础",
      "acao"
    ]
  }
],
});
