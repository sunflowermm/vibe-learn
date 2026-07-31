import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-well-known-ports",
  title: "基础 · 常用端口全表",
  kind: 'concept',
  domain: "net",
  tags: ["网络","端口","基础"],
  relatedNodes: ["network-basics","tcp-udp"],
  caption: "80/443/22/53/3306/5432/6379——联调先认端口。",
  questions: [
  {
    "id": "concept-well-known-ports:80",
    "q": "默认 HTTP 明文端口？",
    "choices": [
      {
        "t": "80",
        "ok": true,
        "why": "TCP 80：默认 HTTP 明文服务端口。"
      },
      {
        "t": "443",
        "ok": false,
        "why": "与「端口 80」不符。"
      },
      {
        "t": "22",
        "ok": false,
        "why": "与「端口 80」不符。"
      },
      {
        "t": "53",
        "ok": false,
        "why": "与「端口 80」不符。"
      }
    ],
    "relatedNodes": [
      "network-basics",
      "http-web"
    ],
    "tags": [
      "基础",
      "80"
    ]
  },
  {
    "id": "concept-well-known-ports:443",
    "q": "默认 HTTPS 端口？",
    "choices": [
      {
        "t": "443",
        "ok": true,
        "why": "TCP 443：默认 HTTPS（HTTP over TLS）端口。"
      },
      {
        "t": "80",
        "ok": false,
        "why": "与「端口 443」不符。"
      },
      {
        "t": "8080 唯一标准 HTTPS",
        "ok": false,
        "why": "与「端口 443」不符。"
      },
      {
        "t": "22",
        "ok": false,
        "why": "与「端口 443」不符。"
      }
    ],
    "relatedNodes": [
      "network-basics",
      "dns-https"
    ],
    "tags": [
      "基础",
      "443"
    ]
  },
  {
    "id": "concept-well-known-ports:22",
    "q": "默认 SSH 端口？",
    "choices": [
      {
        "t": "22",
        "ok": true,
        "why": "TCP 22：默认 SSH 远程登录。"
      },
      {
        "t": "21 是 SSH 默认",
        "ok": false,
        "why": "与「端口 22」不符。"
      },
      {
        "t": "443",
        "ok": false,
        "why": "与「端口 22」不符。"
      },
      {
        "t": "3389 是 SSH 默认",
        "ok": false,
        "why": "与「端口 22」不符。"
      }
    ],
    "relatedNodes": [
      "network-basics"
    ],
    "tags": [
      "基础",
      "22"
    ]
  },
  {
    "id": "concept-well-known-ports:53",
    "q": "DNS 默认端口？",
    "choices": [
      {
        "t": "53",
        "ok": true,
        "why": "UDP/TCP 53：DNS 域名解析。"
      },
      {
        "t": "80",
        "ok": false,
        "why": "与「端口 53」不符。"
      },
      {
        "t": "443",
        "ok": false,
        "why": "与「端口 53」不符。"
      },
      {
        "t": "22",
        "ok": false,
        "why": "与「端口 53」不符。"
      }
    ],
    "relatedNodes": [
      "network-basics",
      "dns-https"
    ],
    "tags": [
      "基础",
      "53"
    ]
  },
  {
    "id": "concept-well-known-ports:3306",
    "q": "MySQL 默认端口？",
    "choices": [
      {
        "t": "3306",
        "ok": true,
        "why": "TCP 3306：MySQL 默认端口。"
      },
      {
        "t": "5432",
        "ok": false,
        "why": "与「端口 3306」不符。"
      },
      {
        "t": "6379",
        "ok": false,
        "why": "与「端口 3306」不符。"
      },
      {
        "t": "27017",
        "ok": false,
        "why": "与「端口 3306」不符。"
      }
    ],
    "relatedNodes": [
      "network-basics",
      "db-mysql"
    ],
    "tags": [
      "基础",
      "3306"
    ]
  },
  {
    "id": "concept-well-known-ports:5432",
    "q": "PostgreSQL 默认端口？",
    "choices": [
      {
        "t": "5432",
        "ok": true,
        "why": "TCP 5432：PostgreSQL 默认端口。"
      },
      {
        "t": "3306",
        "ok": false,
        "why": "与「端口 5432」不符。"
      },
      {
        "t": "6379",
        "ok": false,
        "why": "与「端口 5432」不符。"
      },
      {
        "t": "27017",
        "ok": false,
        "why": "与「端口 5432」不符。"
      }
    ],
    "relatedNodes": [
      "network-basics",
      "db-postgresql"
    ],
    "tags": [
      "基础",
      "5432"
    ]
  },
  {
    "id": "concept-well-known-ports:6379",
    "q": "Redis 默认端口？",
    "choices": [
      {
        "t": "6379",
        "ok": true,
        "why": "TCP 6379：Redis 默认端口。"
      },
      {
        "t": "5432",
        "ok": false,
        "why": "与「端口 6379」不符。"
      },
      {
        "t": "3306",
        "ok": false,
        "why": "与「端口 6379」不符。"
      },
      {
        "t": "11211 是 Redis 默认",
        "ok": false,
        "why": "与「端口 6379」不符。"
      }
    ],
    "relatedNodes": [
      "network-basics",
      "xrk-database"
    ],
    "tags": [
      "基础",
      "6379"
    ]
  },
  {
    "id": "concept-well-known-ports:27017",
    "q": "MongoDB 默认端口？",
    "choices": [
      {
        "t": "27017",
        "ok": true,
        "why": "TCP 27017：MongoDB 默认端口。"
      },
      {
        "t": "6379",
        "ok": false,
        "why": "与「端口 27017」不符。"
      },
      {
        "t": "5432",
        "ok": false,
        "why": "与「端口 27017」不符。"
      },
      {
        "t": "3306",
        "ok": false,
        "why": "与「端口 27017」不符。"
      }
    ],
    "relatedNodes": [
      "network-basics",
      "db-mongodb"
    ],
    "tags": [
      "基础",
      "27017"
    ]
  }
],
});
