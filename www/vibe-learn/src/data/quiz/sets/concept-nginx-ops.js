import { defineQuizSet } from '../schema.js';

/**
 * Nginx / 反代场景（指令单词见 concept-nginx-dir）。
 * 命题：mcq-expert。
 */
export default defineQuizSet({
  id: 'concept-nginx-ops',
  title: '概念 · Nginx 反代（基础→进阶）',
  kind: 'concept',
  domain: 'net',
  tags: ['Nginx', '反代', 'TLS', '基础', '进阶'],
  relatedNodes: ['net-nginx', 'reverse-proxy'],
  caption: '反代收益、502/504、TLS、静态/API、面板——指令单词见 Nginx 指令全表。',
  questions: [
    {
      id: 'concept-nginx-ops:q1',
      q: '反向代理相对「浏览器直接打到 Node 端口」的核心收益是？',
      choices: [
        {
          t: '统一入口：TLS、路由、静态与限流',
          ok: true,
          why: '公网常只暴露 443，反代到 127.0.0.1:内部端口。',
        },
        {
          t: '有了反代就不需要 HTTPS',
          ok: false,
          why: '反而常在反代上终结 TLS。',
        },
        {
          t: 'Nginx 会替代数据库',
          ok: false,
          why: '门面与存储职责不同。',
        },
        {
          t: '反代只能用于 UDP 游戏',
          ok: false,
          why: '经典场景是 HTTP(S) Web/API。',
        },
      ],
      relatedNodes: ['net-nginx', 'reverse-proxy'],
      tags: ['基础'],
    },
    {
      id: 'concept-nginx-ops:q3',
      q: '浏览器报 502 Bad Gateway，反代场景下优先怀疑什么？',
      choices: [
        {
          t: '上游没起来、端口错、连不上或返回非法应答',
          ok: true,
          why: '502：网关活着，但与上游交互失败。',
        },
        {
          t: '502 表示资源创建成功',
          ok: false,
          why: '创建成功更常是 201/200。',
        },
        {
          t: '一定是静态资源 304 缓存命中',
          ok: false,
          why: '304 是协商缓存，不是网关错误。',
        },
        {
          t: '一定是前端 CSS 写错',
          ok: false,
          why: '已到 Nginx 回 502 时优先查上游。',
        },
      ],
      relatedNodes: ['net-nginx', 'workbench-troubleshoot'],
      tags: ['进阶'],
    },
    {
      id: 'concept-nginx-ops:q4',
      q: '504 Gateway Timeout 在反代场景更贴近？',
      choices: [
        {
          t: '上游响应太慢，超过代理等待时限',
          ok: true,
          why: '可调 proxy_read_timeout，但更应优化上游。',
        },
        {
          t: '证书一定过期',
          ok: false,
          why: '证书问题多表现为握手失败/浏览器警告。',
        },
        {
          t: '静态文件已缓存命中',
          ok: false,
          why: '缓存命中不是网关超时。',
        },
        {
          t: '客户端未携带 Cookie',
          ok: false,
          why: '缺 Cookie 更常是 401/业务错误。',
        },
      ],
      relatedNodes: ['net-nginx', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-nginx-ops:q5',
      q: '在 Nginx 上做 TLS 终结的常见意思是？',
      choices: [
        {
          t: '客户端到 Nginx 走 HTTPS',
          ok: true,
          why: '证书挂在入口；上游可在内网明文或再加密。',
        },
        {
          t: '终结后所有 HTTP 状态码必须变成 100',
          ok: false,
          why: 'TLS 与状态码语义无关。',
        },
        {
          t: 'TLS 只能配在浏览器扩展里',
          ok: false,
          why: '服务端/边缘终结是常态。',
        },
        {
          t: '终结意味着禁止使用任何证书',
          ok: false,
          why: '正是在入口卸载证书。',
        },
      ],
      relatedNodes: ['net-nginx', 'host-tls'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-nginx-ops:q7',
      q: '静态资源与 API 同域部署时，Nginx 常如何分工？',
      choices: [
        {
          t: '静态目录用 root',
          ok: true,
          why: '同域还利于 Cookie/CORS；动态 API 走上游。',
        },
        {
          t: '禁止配置两个 location',
          ok: false,
          why: '多 location 正是常见写法。',
        },
        {
          t: '静态文件必须全部由数据库返回',
          ok: false,
          why: '静态应交 Nginx/对象存储。',
        },
        {
          t: 'Node 不能放在反代后面',
          ok: false,
          why: '反代到 Node 是经典架构。',
        },
      ],
      relatedNodes: ['net-nginx', 'http-web'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-nginx-ops:q8',
      q: '面板（宝塔/1Panel）一点「反代」背后，你仍应理解什么？',
      choices: [
        {
          t: '生成的仍是 Nginx（或同类）配置',
          ok: true,
          why: 'GUI 是捷径；502/证书问题最终回到 conf 与日志。',
        },
        {
          t: '有面板就不必再学端口与 DNS',
          ok: false,
          why: '面板填错端口/域名照样挂。',
        },
        {
          t: '面板会消灭所有 502',
          ok: false,
          why: '上游挂了，面板也救不了。',
        },
        {
          t: '面板等于自动训练大模型',
          ok: false,
          why: '运维面板与模型训练无关。',
        },
      ],
      relatedNodes: ['net-nginx', 'panel-run-node'],
      tags: ['进阶'],
    },
    {
      id: 'concept-nginx-ops:headers',
      q: '反代到上游时，常要设 X-Forwarded-For / X-Forwarded-Proto，主要因为？',
      choices: [
        {
          t: '上游需要知道原始客户端 IP 与是否 HT',
          ok: true,
          why: '否则上游只看到反代本机地址，或生成 http:// 链接。',
        },
        {
          t: '这两个头可以替代 TLS 证书',
          ok: false,
          why: '头不提供加密。',
        },
        {
          t: '设置后就不需要 proxy_pass',
          ok: false,
          why: '仍要转发上游。',
        },
        {
          t: '只用于 UDP，HTTP 用不到',
          ok: false,
          why: '正是 HTTP 反代常见头。',
        },
      ],
      relatedNodes: ['net-nginx', 'reverse-proxy', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-nginx-ops:websocket',
      q: '反代 WebSocket 时，比普通 HTTP 多要注意什么？',
      choices: [
        {
          t: 'Upgrade/Connection 头与超时',
          ok: true,
          why: '缺升级头或超时过短会导致「能 HTTP 不能 WS」。',
        },
        {
          t: 'WebSocket 禁止走 443',
          ok: false,
          why: 'wss:// 常经 443。',
        },
        {
          t: '有了反代就不需要 Upgrade',
          ok: false,
          why: '升级头仍要正确传递。',
        },
        {
          t: 'WebSocket 只能用 UDP listen',
          ok: false,
          why: '常见仍是 TCP 上的升级。',
        },
      ],
      relatedNodes: ['net-nginx', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-nginx-ops:buffer-body',
      q: '上传大文件经 Nginx 反代到 Node 时，413 更常先查什么？',
      choices: [
        {
          t: 'client_max_body_size',
          ok: true,
          why: '默认 body 限制偏小是经典坑。',
        },
        {
          t: '把 listen 改成 UDP',
          ok: false,
          why: '与 body 大小无关。',
        },
        {
          t: '删除全部 TLS 证书',
          ok: false,
          why: '不解决 413。',
        },
        {
          t: '把状态码 413 改写成 200',
          ok: false,
          why: '掩盖问题且破坏契约。',
        },
      ],
      relatedNodes: ['net-nginx', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-nginx-ops:cert-name',
      q: 'IP 直连源站 HTTPS 正常，域名经 Nginx 却证书报错。优先查？',
      choices: [
        {
          t: '证书 SAN/CN 是否覆盖该域名',
          ok: true,
          why: 'HTTPS 校验名字；IP 通不代表域名证书对。',
        },
        {
          t: '把 proxy_pass 改成 UDP',
          ok: false,
          why: '与证书名无关。',
        },
        {
          t: '一定是 upstream 进程没启动（只会 502）',
          ok: false,
          why: '证书错误发生在 TLS 阶段，未必到上游。',
        },
        {
          t: '关掉 DNS 即可修好证书',
          ok: false,
          why: '用户还要靠域名访问。',
        },
      ],
      relatedNodes: ['net-nginx', 'dns-https', 'host-tls'],
      tags: ['进阶'],
    },
  ],
});
