import { defineQuizSet } from '../schema.js';

/** HTTP 常用头：一题一决策；干扰项用邻近头误判。 */
export default defineQuizSet({
  id: 'concept-http-hdr',
  title: '基础 · HTTP 常用头全表',
  kind: 'concept',
  domain: 'net',
  tags: ['HTTP', '请求头', '基础'],
  relatedNodes: ['http-web', 'http-hands-on'],
  caption: 'Host、Content-Type、Authorization、Accept、User-Agent、Cookie/Set-Cookie、Origin。',
  questions: [
    {
      id: 'concept-http-hdr:host',
      q: 'Host 请求头主要表示什么？',
      choices: [
        {
          t: '要访问的主机名（及可选端口），供虚拟主机/反代选型',
          ok: true,
          why: 'HTTP/1.1 必带；同一 IP 多站点靠 Host 区分。',
        },
        {
          t: '响应正文的 MIME 类型',
          ok: false,
          why: '那是 Content-Type。',
        },
        {
          t: '客户端希望接受的响应格式',
          ok: false,
          why: '那是 Accept。',
        },
        {
          t: '携带 Bearer Token 的凭证头',
          ok: false,
          why: '那是 Authorization。',
        },
      ],
      relatedNodes: ['http-web', 'net-nginx'],
      tags: ['基础', 'host'],
    },
    {
      id: 'concept-http-hdr:content_type',
      q: '请求里写 Content-Type: application/json 表示？',
      choices: [
        {
          t: '正文应按 JSON 解析',
          ok: true,
          why: '收发双方据此序列化/解析 Body。',
        },
        {
          t: '正文一定是 PNG 图片',
          ok: false,
          why: 'PNG 常见 image/png。',
        },
        {
          t: '客户端希望接受哪些响应类型',
          ok: false,
          why: '那是 Accept。',
        },
        {
          t: '表示 TCP 窗口大小',
          ok: false,
          why: '与传输窗口无关。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础', 'content_type'],
    },
    {
      id: 'concept-http-hdr:authorization',
      q: '调需鉴权的 HTTPS API 时，Authorization 常见正确做法是？',
      choices: [
        {
          t: "Bearer + Token/API Key，且密钥勿暴露到浏览器打包产物",
          ok: true,
          why: '密钥放服务端环境变量；前端硬编码必泄。',
        },
        {
          t: '把密钥写进 URL 查询串永久公开，方便分享与收藏',
          ok: false,
          why: '日志与分享都会泄密。',
        },
        {
          t: '有 Authorization 头就不需要 TLS，明文传凭证也安全',
          ok: false,
          why: '凭证更应走加密通道。',
        },
        {
          t: '用 Host 头代替凭证，写上主机名就算完成鉴权',
          ok: false,
          why: 'Host 不携带密钥。',
        },
      ],
      relatedNodes: ['http-web', 'craft-security', 'data-env'],
      tags: ['基础', 'authorization'],
    },
    {
      id: 'concept-http-hdr:accept',
      q: 'Accept 头表达什么？',
      choices: [
        {
          t: "客户端希望接受哪些响应媒体类型（内容协商）",
          ok: true,
          why: '服务器可据此选型；与请求体 Content-Type 不同。',
        },
        {
          t: '请求正文的 MIME 类型',
          ok: false,
          why: '那是 Content-Type。',
        },
        {
          t: '服务器磁盘剩余空间',
          ok: false,
          why: '无关。',
        },
        {
          t: '等同 Set-Cookie',
          ok: false,
          why: 'Set-Cookie 是响应侧写 Cookie。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'accept'],
    },
    {
      id: 'concept-http-hdr:user_agent',
      q: 'User-Agent 的正确定位是？',
      choices: [
        {
          t: '客户端自报身份，可伪造，不能当唯一鉴权',
          ok: true,
          why: '统计与兼容用；勿当安全边界。',
        },
        {
          t: '不可伪造的硬件根密钥，可当作唯一鉴权凭据',
          ok: false,
          why: '字符串可改。',
        },
        {
          t: '可替代 HTTPS，有了 User-Agent 就不必再加密传输',
          ok: false,
          why: '与加密无关。',
        },
        {
          t: '服务器返回的状态码字段，写在响应状态行里',
          ok: false,
          why: '状态码在状态行。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'user_agent'],
    },
    {
      id: 'concept-http-hdr:cookie_req',
      q: '请求里的 Cookie 头通常从哪来？',
      choices: [
        {
          t: '浏览器按规则自动附带此前通过 Set-Cookie 保存的值',
          ok: true,
          why: '与 Set-Cookie 响应头成对；会话 ID 常走这条。',
        },
        {
          t: '只能由 DNS 服务器写入',
          ok: false,
          why: 'DNS 不管 Cookie。',
        },
        {
          t: '等同 Authorization Bearer 的强制形态',
          ok: false,
          why: '两者都可鉴权，但机制不同。',
        },
        {
          t: '由 Origin 头自动复制生成',
          ok: false,
          why: 'Origin 标明来源，不生成 Cookie。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'cookie_req'],
    },
    {
      id: 'concept-http-hdr:set_cookie',
      q: 'Set-Cookie 出现在消息的哪一侧？',
      choices: [
        {
          t: '响应头：指示浏览器保存（或更新）Cookie',
          ok: true,
          why: '可带 HttpOnly/Secure/SameSite 等属性。',
        },
        {
          t: '仅请求行方法名',
          ok: false,
          why: '方法在请求行，不是 Set-Cookie。',
        },
        {
          t: 'TCP 三次握手字段',
          ok: false,
          why: '应用层头。',
        },
        {
          t: '客户端主动发送的 Authorization',
          ok: false,
          why: 'Authorization 是请求凭证头。',
        },
      ],
      relatedNodes: ['http-web', 'craft-security'],
      tags: ['基础', 'set_cookie'],
    },
    {
      id: 'concept-http-hdr:origin_hdr',
      q: 'Origin 头在跨源场景下的作用是？',
      choices: [
        {
          t: "标明发起页面的协议+主机+端口，供服务器做 CORS 等判定",
          ok: true,
          why: '与 Cookie 策略、CSRF 讨论常对照。',
        },
        {
          t: '存放 JWT 私钥，方便浏览器跨源直接签名',
          ok: false,
          why: '绝不能把私钥放头里给浏览器。',
        },
        {
          t: '替换 Host 且仅用于 FTP，与 Web 跨源无关',
          ok: false,
          why: 'Host 仍在；Origin 用于 Web 跨源。',
        },
        {
          t: '表示服务器磁盘上的绝对路径，供反代读写文件',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['http-web'],
      tags: ['基础', 'origin_hdr'],
    },
    {
      id: 'concept-http-hdr:content_type_vs_accept',
      q: '联调时 Content-Type 与 Accept 最容易混的一点是？',
      choices: [
        {
          t: "Content-Type 描述「我发的正文是什么」；Accept 描述「我希望收到什么」",
          ok: true,
          why: '一边管请求体，一边管响应协商。',
        },
        {
          t: '两者完全同义，请求里只填其中一个即可协商正文格式',
          ok: false,
          why: '方向不同。',
        },
        {
          t: 'Accept 只能写在响应头里，请求侧不能声明希望的媒体类型',
          ok: false,
          why: 'Accept 是请求头。',
        },
        {
          t: 'Content-Type 只能出现在 GET 且无 body 的请求里，有正文时不必标',
          ok: false,
          why: '有正文的请求更需要 Content-Type。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['进阶'],
    },
  ],
});
