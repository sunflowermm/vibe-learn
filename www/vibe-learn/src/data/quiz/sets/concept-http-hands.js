import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-http-hands",
  title: "概念 · HTTP 动手与 API",
  kind: "concept",
  domain: "net",
  tags: ["HTTP","API","状态码"],
  relatedNodes: ["http-web","http-hands-on","api-frontend","xrk-stream","ai-openai-protocol"],
  caption: "API 契约、本仓 HttpResponse、幂等与流式——状态码/方法/头见对应全表。",
  questions: [
  {
    "id": "concept-http-hands:q4",
    "q": "前后端分离架构中，「API（Application Programming Interface）」常指什么？",
    "choices": [
      {
        "t": "前后端约定好的 HTTP 接口：路径、方法、请求体和响应格式",
        "ok": true,
        "why": "API 是协作契约，前端按约定发请求，后端按约定返回 JSON 等数据。"
      },
      {
        "t": "仅指电源插座与国际电压转换器",
        "ok": false,
        "why": "电源接口与软件 API 是完全不同领域的概念。"
      },
      {
        "t": "仅指显示器上的 HDMI 或 USB 物理接口",
        "ok": false,
        "why": "物理接口是硬件概念，开发中说的 API 指软件层面的调用约定。"
      },
      {
        "t": "专指操作系统内核提供的系统调用，与 Web 无关",
        "ok": false,
        "why": "Web 开发中的 API 通常指 HTTP 端点，虽然「接口」一词也用于系统调用。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on",
      "api-frontend"
    ],
    "tags": []
  },
  {
    "id": "concept-http-hands:q5",
    "q": "本仓库 HttpResponse.success 返回普通对象时，前端应如何解包数据？",
    "choices": [
      {
        "t": "业务字段常拍平到 JSON 顶层，不要默认只读 data 字段",
        "ok": true,
        "why": "XRK 约定 success 时对象字段合并到顶层，前端需用 unwrapSuccess 或读顶层字段。"
      },
      {
        "t": "响应中没有 success 字段，需要自行猜测是否成功",
        "ok": false,
        "why": "HttpResponse.success 始终包含 success: true 和 message 字段。"
      },
      {
        "t": "前端应忽略 JSON 直接读取 HTTP 响应头的二进制内容",
        "ok": false,
        "why": "API 交互通过 JSON 响应体传递数据，不是读原始二进制头。"
      },
      {
        "t": "响应体永远只有 { success, message, data } 三层结构",
        "ok": false,
        "why": "普通对象会拍平到顶层，只有数组或标量才放在 data 字段中。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on",
      "api-frontend"
    ],
    "tags": []
  },
  {
    "id": "concept-http-hands:q11",
    "q": "对「可安全重试」的写接口，工程上常强调？",
    "choices": [
      {
        "t": "幂等设计或幂等键：网络抖动重试不应重复下单/重复扣款",
        "ok": true,
        "why": "LLM/Agent 工具调用也常重试，接口要扛得住。"
      },
      {
        "t": "幂等等于加密",
        "ok": false,
        "why": "概念不同。"
      },
      {
        "t": "只有 GET 需要幂等，POST 永不必考虑",
        "ok": false,
        "why": "写路径更要考虑。"
      },
      {
        "t": "重试越多业务越正确，无需设计",
        "ok": false,
        "why": "重复副作用是事故。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "http-hands-on"
    ],
    "tags": [
      "进阶"
    ]
  },
  {
    "id": "concept-http-hands:q12",
    "q": "流式响应（SSE / chunked）相对「一次性 JSON」对聊天式 LLM API 的意义？",
    "choices": [
      {
        "t": "边生成边推送，降低首字延迟，前端可逐步渲染",
        "ok": true,
        "why": "本仓 Agent 管道常见流式；超时与中断策略也要跟上。"
      },
      {
        "t": "浏览器无法处理流式",
        "ok": false,
        "why": "可以。"
      },
      {
        "t": "流式只能用于下载系统镜像",
        "ok": false,
        "why": "聊天补全同样常用。"
      },
      {
        "t": "流式意味着可以不鉴权",
        "ok": false,
        "why": "仍要鉴权。"
      }
    ],
    "relatedNodes": [
      "http-web",
      "xrk-stream",
      "ai-openai-protocol"
    ],
    "tags": [
      "进阶"
    ]
  }
],
});
