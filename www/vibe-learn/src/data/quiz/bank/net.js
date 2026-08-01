/**
 * 静态题库 · net
 * 命题师课核（题少考点密）；真源 scripts/handcraft-cores.mjs
 */
/** @type {import('../schema.js').QuizQuestion[]} */
export const QUESTIONS = [
  {
    id: "s:net:edge-facade:core",
    q: "多 Node 服务要同域名分路径 + HTTPS；偶发 502；部分地区套 CF 橙云后证书/IP 异常。门面侧正确心智？",
    choices: [
      { t: "反代做 TLS 终止与路由；502 先查 upstream/超时；边缘态与源站态要分开排，证书要对域名 SAN", ok: true, why: "门面/边缘/证书三点常被混成「随便重装 Node」。" },
      { t: "每个服务裸暴露端口并各自申请证书最省事", ok: false, why: "暴露面与证书运维失控。" },
      { t: "502 等于业务 500，只改业务代码", ok: false, why: "502 常是网关到上游失败。" },
      { t: "IP 直连正常就可忽略证书域名绑定", ok: false, why: "HTTPS 校验的是名字与证书，不是裸 IP。" },
    ],
    kind: "concept",
    domain: "net",
    tags: ["场景","课核"],
    relatedNodes: ["reverse-proxy","net-nginx","net-edge-practice","dns-https"],
    source: 'static',
  },
  {
    id: "s:net:http-contract:core",
    q: "静态 JS 旧、API JSON 新；curl 见拍平 success 字段但前端读 json.data；浏览器 CORS、curl 却通。三点各抓什么？",
    choices: [
      { t: "静态与 API 缓存策略要分；HttpResponse 普通对象拍平无统一 data；CORS 是浏览器限制，可用反代同源或正确放行", ok: true, why: "联调三连：缓存 / 响应契约 / 同源——都是应用层，不是「TCP 坏了」。" },
      { t: "三者都先改 TCP 为 UDP", ok: false, why: "与传输选型无关。" },
      { t: "CORS 通了就说明缓存与拍平契约也自动对", ok: false, why: "三套问题互相独立。" },
      { t: "前端读不到字段一定是拆包丢字节", ok: false, why: "先对 JSON 契约与解包方式。" },
    ],
    kind: "concept",
    domain: "net",
    tags: ["场景","课核"],
    relatedNodes: ["http-web","http-hands-on","api-frontend"],
    source: 'static',
  },
  {
    id: "s:net:layer-locate:core",
    q: "同网段 ping 通、跨网段不通；另一故障则是 SYN/TLS 都成功但 HTTP 很慢。两案分别先定哪一层？",
    choices: [
      { t: "前者先分二层交换 vs 三层路由/地址；后者传输已通，优先查应用/下游耗时", ok: true, why: "大厂排障先定层：拓扑/地址一层，业务耗时一层，忌一上来重装或改业务。" },
      { t: "两案都先重装操作系统", ok: false, why: "层都没定就重装是成本最高的猜法。" },
      { t: "两案都只改子网掩码", ok: false, why: "掩码管地址边界，解释不了「握手成功但业务慢」。" },
      { t: "HTTP 慢说明物理网线必坏", ok: false, why: "L4/TLS 成功通常说明链路可用。" },
    ],
    kind: "concept",
    domain: "net",
    tags: ["场景","课核"],
    relatedNodes: ["network-basics","protocol-stack","ip-addressing"],
    source: 'static',
  },
  {
    id: "s:net:tcp-udp-nat:core",
    q: "支付要可靠有序；语音可丢包求低延迟。另：云主机能访问外网，外网却连不上你的 8080。传输与入站各怎么看？",
    choices: [
      { t: "支付 TCP、实时媒体常 UDP；能出不能进优先查 NAT/安全组/端口转发与监听地址", ok: true, why: "可靠 vs 尽力而为 + 出入站不对称，是网络面试与值班双高频。" },
      { t: "一律 UDP，资金靠重试补；入站会随出网自动开", ok: false, why: "资金路径不能赌丢包；入站要显式放行。" },
      { t: "端口 80 自动可靠；绑 127.0.0.1 更易被公网访问", ok: false, why: "可靠看协议；loopback 公网到不了。" },
      { t: "装了 Nginx 就等于安全组已放行", ok: false, why: "门面不替代 ACL/NAT。" },
    ],
    kind: "concept",
    domain: "net",
    tags: ["场景","课核"],
    relatedNodes: ["tcp-udp","routing-nat"],
    source: 'static',
  }
];
