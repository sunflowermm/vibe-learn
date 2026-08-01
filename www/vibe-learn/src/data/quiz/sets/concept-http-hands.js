import { defineQuizSet } from '../schema.js';

/** HTTP 动手与本仓 API 约定。 */
export default defineQuizSet({
  id: 'concept-http-hands',
  title: '概念 · HTTP 动手与 API',
  kind: 'concept',
  domain: 'net',
  tags: ['HTTP', 'API', '本仓'],
  relatedNodes: ['http-web', 'http-hands-on', 'api-frontend'],
  caption: 'API 契约、本仓 HttpResponse、幂等与流式——状态码/方法/头见对应全表。',
  questions: [
    {
      id: 'concept-http-hands:q4',
      q: '前后端分离里说的「API」，通常指什么？',
      choices: [
        {
          t: '前后端约定好的 HTTP 接口：路径、方法、请求体与响应格式',
          ok: true,
          why: '契约清晰才能联调；改字段要同步两端与文档。',
        },
        {
          t: '仅指操作系统内核的系统调用，与 Web 无关',
          ok: false,
          why: 'Web 场景默认指 HTTP 端点。',
        },
        {
          t: '仅指数据库里的一张表结构',
          ok: false,
          why: '表是存储模型；API 是对外访问方式。',
        },
        {
          t: '前端 CSS 类名的命名规范',
          ok: false,
          why: '样式命名不是网络 API 契约。',
        },
      ],
      relatedNodes: ['api-frontend', 'http-hands-on'],
      tags: ['基础'],
    },
    {
      id: 'concept-http-hands:q5',
      q: '本仓库 HttpResponse.success 返回普通对象时，前端应如何解包？',
      choices: [
        {
          t: '业务字段常拍平到 JSON 顶层，不要默认只读 data',
          ok: true,
          why: '对象会 Object.assign 到顶层；数组/标量才进 data。',
        },
        {
          t: '响应体永远只有 { success, message, data }，字段都在 data 里',
          ok: false,
          why: '普通对象会拍平；默认 return json.data 会丢字段。',
        },
        {
          t: '响应里没有 success，需要靠猜',
          ok: false,
          why: 'success 始终为 true，并带 message。',
        },
        {
          t: '应忽略 JSON，只读响应头二进制',
          ok: false,
          why: '业务数据在 JSON body。',
        },
      ],
      relatedNodes: ['http-hands-on', 'api-frontend'],
      tags: ['进阶'],
    },
    {
      id: 'concept-http-hands:q11',
      q: '对「可安全重试」的写接口，工程上常强调什么？',
      choices: [
        {
          t: '幂等设计或幂等键：网络抖动重试不应重复下单/扣款',
          ok: true,
          why: 'Agent/网关常自动重试；接口必须扛得住重复请求。',
        },
        {
          t: '重试次数越多业务一定越正确，无需设计',
          ok: false,
          why: '重复副作用是事故。',
        },
        {
          t: '只有 GET 需要幂等，POST 永不必考虑',
          ok: false,
          why: '写路径更要考虑；支付回调尤其要幂等。',
        },
        {
          t: '幂等等于加密',
          ok: false,
          why: '一个管重复副作用，一个管机密性。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['进阶'],
    },
    {
      id: 'concept-http-hands:q12',
      q: '流式响应（SSE / chunked）对聊天式 LLM API 的意义是？',
      choices: [
        {
          t: '边生成边推送，降低首字延迟，前端可逐步渲染',
          ok: true,
          why: '仍要鉴权与超时/中断策略。',
        },
        {
          t: '流式意味着可以不鉴权',
          ok: false,
          why: '通道形态变了，鉴权要求不变。',
        },
        {
          t: '浏览器无法处理任何流式响应',
          ok: false,
          why: 'fetch/EventSource 等都能消费流。',
        },
        {
          t: '流式只能用于下载系统镜像，不能用于对话',
          ok: false,
          why: '聊天补全是流式最常见场景之一。',
        },
      ],
      relatedNodes: ['http-web', 'xrk-stream', 'ai-openai-protocol'],
      tags: ['进阶'],
    },
    {
      id: 'concept-http-hands:curl-vs-browser',
      q: '同一接口 curl 成功、浏览器前端报 CORS。正确理解是？',
      choices: [
        {
          t: 'CORS 是浏览器同源策略限制；curl 不受约束',
          ok: true,
          why: '可用同源反代或正确 CORS 头；别误判成 TCP 坏了。',
        },
        {
          t: '说明链路层丢包，应先换网线',
          ok: false,
          why: 'curl 已证明网络与接口可达。',
        },
        {
          t: 'CORS 报错等于服务端进程已崩溃',
          ok: false,
          why: '常见是浏览器拦截跨源读响应。',
        },
        {
          t: '把请求改成 UDP 即可绕过 CORS',
          ok: false,
          why: 'CORS 与传输层协议无关。',
        },
      ],
      relatedNodes: ['http-web', 'http-hands-on', 'api-frontend'],
      tags: ['进阶'],
    },
    {
      id: 'concept-http-hands:cache-api-split',
      q: '静态 JS 被强缓存成旧版，但 API JSON 已是新契约。联调时优先抓什么？',
      choices: [
        {
          t: '静态资源与 API 的缓存策略要分开：版本化静态文件或缩短其缓存',
          ok: true,
          why: 'API 与静态 CDN 策略混用会导致「前端旧、后端新」。',
        },
        {
          t: '先把 TCP 改成 UDP',
          ok: false,
          why: '与传输选型无关。',
        },
        {
          t: 'CORS 一开，缓存问题自动消失',
          ok: false,
          why: 'CORS 与缓存正交。',
        },
        {
          t: '一定是拆包丢了半个 JSON',
          ok: false,
          why: '先对版本与缓存，再怀疑传输。',
        },
      ],
      relatedNodes: ['http-web', 'api-frontend', 'net-edge-practice'],
      tags: ['进阶'],
    },
  ],
});
