import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-http-hands',
  title: '概念 · HTTP 动手与 API',
  kind: 'concept',
  domain: 'net',
  tags: ['HTTP', 'API', '状态码'],
  relatedNodes: ['http-web', 'http-hands-on', 'api-frontend'],
  questions: [
    {
      q: '超文本传输协议（HTTP）中，GET 方法的语义约定通常是什么？',
      choices: [
        {
          t: '向服务器请求获取资源，按约定不应产生修改数据的副作用',
          ok: true,
          why: 'GET 用于读取，浏览器缓存和预取都依赖这一语义约定。',
        },
        {
          t: '必须用来删除数据库中的全部记录',
          ok: false,
          why: '删除资源应使用 DELETE 方法，GET 不应携带破坏性操作。',
        },
        {
          t: '只能用来上传文件，不能获取任何数据',
          ok: false,
          why: '上传通常用 POST 或 PUT，GET 是获取资源的标准方法。',
        },
        {
          t: 'GET 和 POST 在所有场景下语义完全相同，可以互换',
          ok: false,
          why: 'GET 幂等且无副作用，POST 常用于提交数据，语义和用途不同。',
        },
      ],
    },
    {
      q: 'HTTP 响应状态码 404 Not Found 通常表示什么含义？',
      choices: [
        {
          t: '服务器已响应，但请求 URL 对应的资源不存在',
          ok: true,
          why: '404 说明路由或文件路径有误，是前端和后端联调中最常见的状态码之一。',
        },
        {
          t: '服务器硬件永久损坏，再也无法启动',
          ok: false,
          why: '404 只表示找不到资源，服务器本身仍在正常运行并返回了响应。',
        },
        {
          t: 'TLS 传输层安全握手已成功完成',
          ok: false,
          why: 'TLS 握手成功不会以 HTTP 404 表示，404 是应用层的资源未找到。',
        },
        {
          t: '客户端发送的请求格式完全正确且资源已成功创建',
          ok: false,
          why: '成功创建通常返回 201 Created，404 明确表示资源不存在。',
        },
      ],
    },
    {
      q: 'HTTP 状态码 401 Unauthorized 与 403 Forbidden 的直觉差别是什么？',
      choices: [
        {
          t: '401 表示未提供或提供了无效的身份凭证；403 表示已识别身份但无权访问',
          ok: true,
          why: '401 提示「请先登录」，403 提示「你的账号没有此操作权限」。',
        },
        {
          t: '两者含义完全相同，可以互换使用而不影响客户端处理',
          ok: false,
          why: '401 应触发重新登录，403 应提示权限不足，处理方式不同。',
        },
        {
          t: '两者都表示请求已成功完成，只是警告信息不同',
          ok: false,
          why: '401 和 403 都属于 4xx 客户端错误，不是成功响应。',
        },
        {
          t: '401 只出现在 HTTPS 中，HTTP 明文请求只会返回 403',
          ok: false,
          why: '401 和 403 与是否使用 TLS 无关，都是 HTTP 标准状态码。',
        },
      ],
    },
    {
      q: '前后端分离架构中，「API（Application Programming Interface）」常指什么？',
      choices: [
        {
          t: '前后端约定好的 HTTP 接口：路径、方法、请求体和响应格式',
          ok: true,
          why: 'API 是协作契约，前端按约定发请求，后端按约定返回 JSON 等数据。',
        },
        {
          t: '仅指显示器上的 HDMI 或 USB 物理接口',
          ok: false,
          why: '物理接口是硬件概念，开发中说的 API 指软件层面的调用约定。',
        },
        {
          t: '仅指电源插座与国际电压转换器',
          ok: false,
          why: '电源接口与软件 API 是完全不同领域的概念。',
        },
        {
          t: '专指操作系统内核提供的系统调用，与 Web 无关',
          ok: false,
          why: 'Web 开发中的 API 通常指 HTTP 端点，虽然「接口」一词也用于系统调用。',
        },
      ],
    },
    {
      q: '本仓库 HttpResponse.success 返回普通对象时，前端应如何解包数据？',
      choices: [
        {
          t: '业务字段常拍平到 JSON 顶层，不要默认只读 data 字段',
          ok: true,
          why: 'XRK 约定 success 时对象字段合并到顶层，前端需用 unwrapSuccess 或读顶层字段。',
        },
        {
          t: '响应体永远只有 { success, message, data } 三层结构',
          ok: false,
          why: '普通对象会拍平到顶层，只有数组或标量才放在 data 字段中。',
        },
        {
          t: '响应中没有 success 字段，需要自行猜测是否成功',
          ok: false,
          why: 'HttpResponse.success 始终包含 success: true 和 message 字段。',
        },
        {
          t: '前端应忽略 JSON 直接读取 HTTP 响应头的二进制内容',
          ok: false,
          why: 'API 交互通过 JSON 响应体传递数据，不是读原始二进制头。',
        },
      ],
    },
    {
      q: 'HTTP 请求头 Content-Type: application/json 表示什么？',
      choices: [
        {
          t: '请求或响应的正文（Body）应按 JSON 格式来解析',
          ok: true,
          why: '客户端和服务器据此知道如何序列化和反序列化正文数据。',
        },
        {
          t: '正文一定是 PNG 或 JPEG 格式的图片二进制',
          ok: false,
          why: '图片通常用 image/png 或 image/jpeg，application/json 表示 JSON 文本。',
        },
        {
          t: '正文一定是 MP4 格式的视频流',
          ok: false,
          why: '视频流用 video/mp4 等类型，与 application/json 无关。',
        },
        {
          t: 'Content-Type 头与正文内容无关，可以任意填写',
          ok: false,
          why: 'Content-Type 告诉接收方如何解读正文，填错会导致解析失败。',
        },
      ],
    },
    {
      q: '提交 JSON 创建资源时，更符合语义的方法通常是？',
      choices: [
        { t: 'POST（或约定明确的 PUT/PATCH），正文带 JSON，配 Content-Type', ok: true, why: '创建/提交多用 POST；幂等更新再谈 PUT。' },
        { t: '只能用 GET 把整段 JSON 塞进 URL', ok: false, why: 'GET 不宜当写操作；URL 也有长度与日志泄漏风险。' },
        { t: '必须用 TRACE 上传业务数据', ok: false, why: 'TRACE 不用于日常业务写入。' },
        { t: 'HTTP 禁止带正文的请求', ok: false, why: 'POST/PUT 等可以有 Body。' },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['基础'],
    },
    {
      q: '调 LLM HTTPS API 时，Authorization 头常见形态？',
      choices: [
        { t: 'Bearer <API_Key 或 Token>，密钥来自环境变量而非写进前端', ok: true, why: '服务端持有密钥；浏览器暴露即泄漏。' },
        { t: '把密钥放进 URL 路径永久公开', ok: false, why: '日志与分享极易泄漏。' },
        { t: 'Authorization 只能放 Cookie 名', ok: false, why: 'Bearer 等方案是头字段。' },
        { t: '有了 Authorization 就不需要 TLS', ok: false, why: '密钥更要走 HTTPS。' },
      ],
      relatedNodes: ['http-web', 'data-env', 'craft-security'],
      tags: ['进阶'],
    },
    {
      q: 'HTTP 500 Internal Server Error 更准确的含义？',
      choices: [
        { t: '服务器在处理请求时出错；应查服务端日志与堆栈，而不是只骂前端', ok: true, why: '5xx 是服务端责任面；联调要两侧日志。' },
        { t: '一定是浏览器缓存坏了', ok: false, why: '也可能，但优先查服务端。' },
        { t: '表示资源不存在（等同 404）', ok: false, why: '404 是未找到。' },
        { t: '表示鉴权成功', ok: false, why: '否。' },
      ],
      relatedNodes: ['http-web', 'workbench-troubleshoot'],
      tags: ['基础'],
    },
    {
      q: '浏览器跨域（CORS）拦请求时，问题本质更接近？',
      choices: [
        { t: '浏览器同源策略：服务端需通过 CORS 头明确允许该 Origin', ok: true, why: 'curl 常能通而浏览器不行——差在浏览器强制 CORS。' },
        { t: 'TCP 三次握手被 CORS 禁用', ok: false, why: 'CORS 是浏览器应用层策略。' },
        { t: 'JSON 语法被 CORS 改写', ok: false, why: '否。' },
        { t: '只要用 HTTP/2 就自动无跨域', ok: false, why: '无关。' },
      ],
      relatedNodes: ['http-web', 'api-frontend'],
      tags: ['进阶'],
    },
    {
      q: '对「可安全重试」的写接口，工程上常强调？',
      choices: [
        { t: '幂等设计或幂等键：网络抖动重试不应重复下单/重复扣款', ok: true, why: 'LLM/Agent 工具调用也常重试，接口要扛得住。' },
        { t: '重试越多业务越正确，无需设计', ok: false, why: '重复副作用是事故。' },
        { t: '只有 GET 需要幂等，POST 永不必考虑', ok: false, why: '写路径更要考虑。' },
        { t: '幂等等于加密', ok: false, why: '概念不同。' },
      ],
      relatedNodes: ['http-web', 'http-hands-on'],
      tags: ['进阶'],
    },
    {
      q: '流式响应（SSE / chunked）相对「一次性 JSON」对聊天式 LLM API 的意义？',
      choices: [
        { t: '边生成边推送，降低首字延迟，前端可逐步渲染', ok: true, why: '本仓 Agent 管道常见流式；超时与中断策略也要跟上。' },
        { t: '流式意味着可以不鉴权', ok: false, why: '仍要鉴权。' },
        { t: '流式只能用于下载系统镜像', ok: false, why: '聊天补全同样常用。' },
        { t: '浏览器无法处理流式', ok: false, why: '可以。' },
      ],
      relatedNodes: ['http-web', 'xrk-stream', 'ai-openai-protocol'],
      tags: ['进阶'],
    },
  ],
});
