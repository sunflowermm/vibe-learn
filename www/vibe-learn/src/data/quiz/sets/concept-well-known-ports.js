import { defineQuizSet } from '../schema.js';

/**
 * 常用端口：场景决策 + 邻近服务误判（禁「与端口 XX 不符」模板）。
 */
export default defineQuizSet({
  id: 'concept-well-known-ports',
  title: '基础 · 常用端口全表',
  kind: 'concept',
  domain: 'net',
  tags: ['网络', '端口', '基础'],
  relatedNodes: ['network-basics', 'tcp-udp'],
  caption: '80/443/22/53/3306/5432/6379——联调先认端口。',
  questions: [
    {
      id: 'concept-well-known-ports:80',
      q: '浏览器访问 http://example.com（未写端口）时，默认连哪一端口？',
      choices: [
        {
          t: 'TCP 80（HTTP 明文默认端口）',
          ok: true,
          why: '未写端口时 HTTP 默认 80。',
        },
        {
          t: 'TCP 443',
          ok: false,
          why: '443 是 HTTPS 默认；本题是 http://。',
        },
        {
          t: 'TCP 22',
          ok: false,
          why: '22 是 SSH。',
        },
        {
          t: 'UDP 53',
          ok: false,
          why: '53 是 DNS。',
        },
      ],
      relatedNodes: ['network-basics', 'http-web'],
      tags: ['基础', '80'],
    },
    {
      id: 'concept-well-known-ports:443',
      q: '浏览器访问 https://example.com（未写端口）时，默认连哪一端口？',
      choices: [
        {
          t: 'TCP 443（HTTPS / HTTP over TLS 默认端口）',
          ok: true,
          why: '小锁站点默认走 443。',
        },
        {
          t: 'TCP 80',
          ok: false,
          why: '80 是明文 HTTP 默认。',
        },
        {
          t: 'TCP 8080（唯一标准 HTTPS 端口）',
          ok: false,
          why: '8080 常见于开发/备用，不是 HTTPS 默认标准。',
        },
        {
          t: 'TCP 22',
          ok: false,
          why: '22 是 SSH。',
        },
      ],
      relatedNodes: ['network-basics', 'dns-https'],
      tags: ['基础', '443'],
    },
    {
      id: 'concept-well-known-ports:22',
      q: '用 ssh user@host 登录 Linux 且未指定端口时，默认是？',
      choices: [
        {
          t: 'TCP 22',
          ok: true,
          why: 'SSH 默认 22；生产常改端口但仍要认默认。',
        },
        {
          t: 'TCP 21',
          ok: false,
          why: '21 是经典 FTP 控制端口。',
        },
        {
          t: 'TCP 443',
          ok: false,
          why: '443 是 HTTPS。',
        },
        {
          t: 'TCP 3389',
          ok: false,
          why: '3389 是 Windows RDP 常见端口。',
        },
      ],
      relatedNodes: ['network-basics'],
      tags: ['基础', '22'],
    },
    {
      id: 'concept-well-known-ports:53',
      q: '向解析器查询域名对应 IP 时，DNS 默认端口是？',
      choices: [
        {
          t: '53（UDP 常见，大响应/区传送也可用 TCP）',
          ok: true,
          why: '排障时别把 DNS 当成 80/443。',
        },
        {
          t: 'TCP 80',
          ok: false,
          why: '80 是 HTTP。',
        },
        {
          t: 'TCP 443',
          ok: false,
          why: '443 是 HTTPS；DoH 另说，经典 DNS 是 53。',
        },
        {
          t: 'TCP 22',
          ok: false,
          why: '22 是 SSH。',
        },
      ],
      relatedNodes: ['network-basics', 'dns-https'],
      tags: ['基础', '53'],
    },
    {
      id: 'concept-well-known-ports:3306',
      q: '客户端连本机 MySQL 且连接串未写端口时，默认通常是？',
      choices: [
        {
          t: 'TCP 3306',
          ok: true,
          why: 'MySQL 经典默认；安全组勿与 5432 搞混。',
        },
        {
          t: 'TCP 5432',
          ok: false,
          why: '5432 是 PostgreSQL 默认。',
        },
        {
          t: 'TCP 6379',
          ok: false,
          why: '6379 是 Redis 默认。',
        },
        {
          t: 'TCP 27017',
          ok: false,
          why: '27017 是 MongoDB 默认。',
        },
      ],
      relatedNodes: ['network-basics', 'db-mysql'],
      tags: ['基础', '3306'],
    },
    {
      id: 'concept-well-known-ports:5432',
      q: '客户端连 PostgreSQL 且未写端口时，默认通常是？',
      choices: [
        {
          t: 'TCP 5432',
          ok: true,
          why: '与 MySQL 3306 是最高频搞混对。',
        },
        {
          t: 'TCP 3306',
          ok: false,
          why: '3306 是 MySQL。',
        },
        {
          t: 'TCP 6379',
          ok: false,
          why: '6379 是 Redis。',
        },
        {
          t: 'TCP 27017',
          ok: false,
          why: '27017 是 MongoDB。',
        },
      ],
      relatedNodes: ['network-basics', 'db-postgresql'],
      tags: ['基础', '5432'],
    },
    {
      id: 'concept-well-known-ports:6379',
      q: '本仓会话缓存常用 Redis，其默认端口是？',
      choices: [
        {
          t: 'TCP 6379',
          ok: true,
          why: 'Redis 默认；勿与 Memcached 11211 混淆。',
        },
        {
          t: 'TCP 5432',
          ok: false,
          why: '5432 是 PostgreSQL。',
        },
        {
          t: 'TCP 3306',
          ok: false,
          why: '3306 是 MySQL。',
        },
        {
          t: 'TCP 11211',
          ok: false,
          why: '11211 是 Memcached 常见默认。',
        },
      ],
      relatedNodes: ['network-basics', 'db-redis', 'xrk-database'],
      tags: ['基础', '6379'],
    },
    {
      id: 'concept-well-known-ports:27017',
      q: 'MongoDB 默认监听端口是？',
      choices: [
        {
          t: 'TCP 27017',
          ok: true,
          why: '文档库默认；与关系库端口区分开。',
        },
        {
          t: 'TCP 6379',
          ok: false,
          why: '6379 是 Redis。',
        },
        {
          t: 'TCP 5432',
          ok: false,
          why: '5432 是 PostgreSQL。',
        },
        {
          t: 'TCP 3306',
          ok: false,
          why: '3306 是 MySQL。',
        },
      ],
      relatedNodes: ['network-basics', 'db-mongodb'],
      tags: ['基础', '27017'],
    },
    {
      id: 'concept-well-known-ports:8080-vs-443',
      q: '开发机 Node 听 8080，生产经 Nginx 对外只开 443。用户浏览器应访问？',
      choices: [
        {
          t: 'https://域名（443）；由反代转到本机 8080',
          ok: true,
          why: '公网暴露入口端口，不等于应用监听端口。',
        },
        {
          t: '必须让用户直接访问公网 8080',
          ok: false,
          why: '扩大暴露面，也不是 HTTPS 默认习惯。',
        },
        {
          t: '用户应连 UDP 8080',
          ok: false,
          why: 'HTTP(S) 通常是 TCP。',
        },
        {
          t: '8080 与 443 在协议上必须是同一个端口号',
          ok: false,
          why: '反代就是为了映射不同端口。',
        },
      ],
      relatedNodes: ['network-basics', 'net-nginx', 'reverse-proxy'],
      tags: ['进阶'],
    },
    {
      id: 'concept-well-known-ports:sg-match',
      q: '安全组放行了 TCP 443，但 Minecraft 基岩（UDP 19132）仍进不去。说明？',
      choices: [
        {
          t: '端口与协议都要匹配；放行 443 不等于放行游戏 UDP 口',
          ok: true,
          why: '规则按协议+端口；开错等于没开。',
        },
        {
          t: '只要开过任意一个端口，全部协议自动放行',
          ok: false,
          why: '云安全组逐条匹配。',
        },
        {
          t: '游戏流量一定走 443',
          ok: false,
          why: '基岩默认 UDP 19132。',
        },
        {
          t: 'DNS 成功就证明游戏端口已开',
          ok: false,
          why: '解析≠端口可达。',
        },
      ],
      relatedNodes: ['tcp-udp', 'routing-nat', 'network-basics'],
      tags: ['进阶'],
    },
  ],
});
