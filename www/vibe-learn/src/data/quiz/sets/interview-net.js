import { defineQuizSet } from '../schema.js';

/**
 * 大厂 · 网络与 HTTP 一面场景
 * mcq-expert：一题一事、应用/分析、选项等长
 */
export default defineQuizSet({
  id: 'interview-net-http',
  title: '大厂 · 网络与 HTTP',
  kind: 'interview',
  domain: 'net',
  tags: ['网络', 'HTTP', 'TCP', '排障'],
  relatedNodes: ['http-web', 'tcp-udp', 'dns-https'],
  caption: '分层排障 · 协议选型 · 状态码/CORS/TLS 联调。',
  questions: [
    {
      id: 'interview-net-http:l3',
      q: '同网段 ping 通，跨网段超时。优先查？',
      choices: [
        { t: '路由/网关/掩码', ok: true, why: '三层转发与地址规划。' },
        { t: '先改业务代码', ok: false, why: '网络未通先别改应用。' },
        { t: '只换网线即可', ok: false, why: '同网段已通。' },
        { t: '改成 UDP 就通', ok: false, why: '与路由无关。' },
      ],
      relatedNodes: ['network-basics', 'ip-addressing'],
    },
    {
      id: 'interview-net-http:tcp-udp',
      q: '支付回调要可靠有序重传，传输层默认？',
      choices: [
        { t: 'TCP 可靠字节流', ok: true, why: '不赌尽力而为丢包。' },
        { t: '裸 UDP 无限重试', ok: false, why: '双花与一致性风险。' },
        { t: '业务走 ICMP', ok: false, why: '不是载荷通道。' },
        { t: '端口 80 即可靠', ok: false, why: '端口≠可靠机制。' },
      ],
      relatedNodes: ['tcp-udp'],
    },
    {
      id: 'interview-net-http:udp',
      q: '实时音视频怕队头阻塞，可容忍丢包。常选？',
      choices: [
        { t: 'UDP 或基于 UDP', ok: true, why: '低延迟优先。' },
        { t: '必须裸 TCP 禁丢', ok: false, why: '队头阻塞伤实时。' },
        { t: '只用 ICMP 传流', ok: false, why: '不是媒体通道。' },
        { t: '端口改 443 即实时', ok: false, why: '端口不决定语义。' },
      ],
      relatedNodes: ['tcp-udp'],
    },
    {
      id: 'interview-net-http:dns',
      q: '「无法解析主机名」相对「连接超时」？',
      choices: [
        { t: '前者 DNS，后者连通', ok: true, why: '先分层再排障。' },
        { t: '两者都只是证书', ok: false, why: '证书多在握手。' },
        { t: '两者都只怪业务', ok: false, why: '先查网络层。' },
        { t: '超时等于 DNS 坏', ok: false, why: '超时常是防火墙/路由。' },
      ],
      relatedNodes: ['dns-https', 'network-basics'],
    },
    {
      id: 'interview-net-http:502',
      q: '反代 502 且业务无 5xx，先查？',
      choices: [
        { t: '网关到上游连通', ok: true, why: '够不着 upstream。' },
        { t: '只改业务异常', ok: false, why: '未见业务 5xx。' },
        { t: '证书全删重签', ok: false, why: '与 502 无必然。' },
        { t: '改成 UDP 监听', ok: false, why: '无关。' },
      ],
      relatedNodes: ['reverse-proxy', 'net-nginx'],
    },
    {
      id: 'interview-net-http:504',
      q: '反代 504 更贴切含义？',
      choices: [
        { t: '上游超时未响应', ok: true, why: '区别于连不上的 502。' },
        { t: '一定是证书过期', ok: false, why: '证书多在握手。' },
        { t: '一定是 DNS 失败', ok: false, why: '多已到转发阶段。' },
        { t: '等于浏览器 CORS', ok: false, why: 'CORS 是浏览器策略。' },
      ],
      relatedNodes: ['reverse-proxy', 'http-web'],
    },
    {
      id: 'interview-net-http:cors',
      q: 'curl 通、浏览器报 CORS，说明？',
      choices: [
        { t: '浏览器同源策略', ok: true, why: 'curl 不受 CORS。' },
        { t: '链路正在丢包', ok: false, why: 'curl 已证明可达。' },
        { t: '服务进程已崩', ok: false, why: '常是浏览器拦截。' },
        { t: '改 UDP 可绕过', ok: false, why: '与传输无关。' },
      ],
      relatedNodes: ['http-web', 'api-frontend'],
    },
    {
      id: 'interview-net-http:tls',
      q: '地址栏小锁通常表示？',
      choices: [
        { t: 'HTTPS 且证书校验过', ok: true, why: '通道加密≠无业务洞。' },
        { t: '业务代码绝无漏洞', ok: false, why: 'TLS 不管越权注入。' },
        { t: '一定是 HTTP/3', ok: false, why: '1.1/2 也可有锁。' },
        { t: '仅 DNS 已成功', ok: false, why: '锁对应 TLS 会话。' },
      ],
      relatedNodes: ['dns-https', 'http-web'],
    },
    {
      id: 'interview-net-http:401-403',
      q: '已登录仍无权限，更贴切状态码？',
      choices: [
        { t: '403 Forbidden', ok: true, why: '已知身份，授权失败。' },
        { t: '401 Unauthorized', ok: false, why: '更偏未认证/凭证无效。' },
        { t: '301 Moved', ok: false, why: '重定向不是拒绝授权。' },
        { t: '204 No Content', ok: false, why: '成功无体。' },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'interview-net-http:idem',
      q: '扣款接口可能被重试，服务端应？',
      choices: [
        { t: '幂等，同单不重复扣', ok: true, why: '网络重试常见。' },
        { t: '每次重试再扣一次', ok: false, why: '双花。' },
        { t: '改 UDP 即幂等', ok: false, why: '传输≠业务幂等。' },
        { t: '只靠前端禁按钮', ok: false, why: '挡不住重试。' },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
    },
    {
      id: 'interview-net-http:inbound',
      q: '云主机出网通，外网打不进端口。先查？',
      choices: [
        { t: '安全组/NAT/监听', ok: true, why: '入站 ACL 与绑定。' },
        { t: '出网通则入站开', ok: false, why: '入站要显式放行。' },
        { t: '绑 127.0.0.1 对外', ok: false, why: '公网到不了。' },
        { t: '装 Nginx 等于放行', ok: false, why: '不替安全组。' },
      ],
      relatedNodes: ['routing-nat', 'tcp-udp'],
    },
    {
      id: 'interview-net-http:edge',
      q: '边缘终止 TLS 再转本机应用，目的？',
      choices: [
        { t: '统一证书少暴露', ok: true, why: '网关管 HTTPS。' },
        { t: '应用必须绑 443', ok: false, why: '正是要避免。' },
        { t: '对外不再加密', ok: false, why: '对外仍是 HTTPS。' },
        { t: '只能用 UDP 443', ok: false, why: '常见仍 TCP。' },
      ],
      relatedNodes: ['reverse-proxy', 'dns-https'],
    },
    {
      id: 'interview-net-http:httponly',
      q: '会话 Cookie 加 HttpOnly，主要防？',
      choices: [
        { t: '防 JS 读走会话 Cookie', ok: true, why: '降 XSS 偷会话风险。' },
        { t: '替代 HTTPS 传输加密', ok: false, why: '不加密传输。' },
        { t: '让 CORS 策略全部放开', ok: false, why: '无关。' },
        { t: '禁止服务器一切重定向', ok: false, why: '无关。' },
      ],
      relatedNodes: ['http-web', 'api-frontend'],
    },
    {
      id: 'interview-net-http:slow',
      q: '握手成功但接口要数秒，下一步？',
      choices: [
        { t: '查应用/下游耗时', ok: true, why: '传输已建立。' },
        { t: '先怀疑网线松动', ok: false, why: '握手成功多半链路可用。' },
        { t: '先改掩码成 /8', ok: false, why: '解释不了慢。' },
        { t: '整段改成裸 UDP', ok: false, why: '不解决业务耗时。' },
      ],
      relatedNodes: ['protocol-stack', 'http-web'],
    },
  ],
});
