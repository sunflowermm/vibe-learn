import { defineQuizSet } from '../schema.js';

/** Nginx / 反代：基础角色 → 进阶排障（挂 net-nginx） */
export default defineQuizSet({
  id: 'concept-nginx-ops',
  title: '概念 · Nginx 反代（基础→进阶）',
  kind: 'concept',
  domain: 'net',
  tags: ['Nginx', '反代', 'TLS', '基础', '进阶'],
  relatedNodes: ['net-nginx', 'reverse-proxy', 'http-web', 'net-edge-practice', 'routing-nat'],
  caption: '入口层：反代、TLS、静态与 502/504——上线与面板部署必会。',
  questions: [
    {
      id: 'concept-nginx-ops:q1',
      q: '反向代理相对「浏览器直接打到 Node 端口」的核心收益？',
      choices: [
        { t: '统一入口：TLS、路由、静态与限流可放在边缘，上游专注业务', ok: true, why: '公网常只暴露 443，反代到 127.0.0.1:内部端口。' },
        { t: 'Nginx 会替代数据库', ok: false, why: '职责不同。' },
        { t: '有了反代就不需要 HTTPS', ok: false, why: '反而常在反代上终结 TLS。' },
        { t: '反代只能用于 UDP 游戏', ok: false, why: '经典是 HTTP(S)。' },
      ],
      relatedNodes: ['net-nginx', 'reverse-proxy'],
      tags: ['基础'],
    },
    {
      id: 'concept-nginx-ops:q2',
      q: '配置里 location /api/ { proxy_pass http://127.0.0.1:3000/; } 在做什么？',
      choices: [
        { t: '把匹配路径的请求转到本机 3000 上游', ok: true, why: '反代核心；注意斜杠与路径拼接规则。' },
        { t: '在浏览器里执行 SQL', ok: false, why: '否。' },
        { t: '编译 Nginx 源码', ok: false, why: '否。' },
        { t: '删除上游进程', ok: false, why: '否。' },
      ],
      relatedNodes: ['net-nginx', 'http-web'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-nginx-ops:q3',
      q: '浏览器报 502 Bad Gateway，反代场景下优先怀疑？',
      choices: [
        { t: '上游应用没起来、端口错、超时或连接被拒——先看上游与 error.log', ok: true, why: '502 是网关侧：Nginx 活着，上游不对。' },
        { t: '一定是 CSS 写错', ok: false, why: '无关。' },
        { t: '一定是 Git 分支名过长', ok: false, why: '无关。' },
        { t: '502 表示资源成功创建', ok: false, why: '那是 2xx/201。' },
      ],
      relatedNodes: ['net-nginx', 'workbench-troubleshoot'],
      tags: ['进阶'],
    },
    {
      id: 'concept-nginx-ops:q4',
      q: '504 Gateway Timeout 更贴近？',
      choices: [
        { t: '上游响应太慢，超过代理等待时限', ok: true, why: '调超时或优化上游；别只加长超时掩盖慢查询。' },
        { t: 'DNS 永不存在', ok: false, why: '更常是别的错误形态。' },
        { t: '证书一定过期', ok: false, why: '证书问题常表现为握手失败，不是 504 语义。' },
        { t: '表示静态文件已缓存命中', ok: false, why: '否。' },
      ],
      relatedNodes: ['net-nginx', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-nginx-ops:q5',
      q: '在 Nginx 上做 TLS 终结的常见意思？',
      choices: [
        { t: '客户端到 Nginx 走 HTTPS；Nginx 解密后再用 HTTP(S) 转上游', ok: true, why: '证书挂在入口；上游可在内网明文或再加密。' },
        { t: '禁止使用任何证书', ok: false, why: '说反了。' },
        { t: 'TLS 只能配在浏览器扩展', ok: false, why: '服务端终结是常态。' },
        { t: '终结后 HTTP 状态码全部变成 100', ok: false, why: '无关。' },
      ],
      relatedNodes: ['net-nginx', 'host-tls', 'http-web'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-nginx-ops:q6',
      q: '改完 nginx.conf，较稳妥的生效流程？',
      choices: [
        { t: 'nginx -t 测配置 → 再 reload（或 systemctl reload）', ok: true, why: '先测再载，避免写挂全站。' },
        { t: '直接 rm -rf / 再安装', ok: false, why: '灾难。' },
        { t: '只能重启整台物理机', ok: false, why: 'reload 即可热载多数改动。' },
        { t: '改 conf 会自动 git commit', ok: false, why: '否。' },
      ],
      relatedNodes: ['net-nginx', 'host-systemd'],
      tags: ['进阶'],
    },
    {
      id: 'concept-nginx-ops:q7',
      q: '静态资源与 API 同域部署时，Nginx 常如何分工？',
      choices: [
        { t: 'location 静态目录直接 root/alias；/api 反代到 Node', ok: true, why: 'www 静态 + API 上游是经典切分。' },
        { t: '静态文件必须全部由数据库返回', ok: false, why: '过重。' },
        { t: '禁止配置两个 location', ok: false, why: '正是多 location。' },
        { t: 'Node 不能放在反代后面', ok: false, why: '常见架构。' },
      ],
      relatedNodes: ['net-nginx', 'xrk-http-www', 'http-web'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-nginx-ops:q8',
      q: '面板（宝塔/1Panel）一点「反代」背后，你仍应理解？',
      choices: [
        { t: '生成的仍是 Nginx（或同类）配置：端口、证书、上游地址——排障要会读', ok: true, why: 'GUI 是捷径，故障回到 conf 与日志。' },
        { t: '面板会消灭所有 502', ok: false, why: '上游挂了仍 502。' },
        { t: '有面板就不必学端口与 DNS', ok: false, why: '仍会踩。' },
        { t: '面板等于训练大模型', ok: false, why: '无关。' },
      ],
      relatedNodes: ['net-nginx', 'panel-run-node', 'panel-compare'],
      tags: ['进阶'],
    },
  ],
});
