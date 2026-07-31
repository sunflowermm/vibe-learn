import { defineQuizSet } from '../schema.js';

/** 面试开口：少而硬 */
export default defineQuizSet({
  id: 'interview-xrk-arch',
  title: '大厂 / 项目 · XRK 架构开口',
  kind: 'interview',
  domain: 'xrk',
  tags: ['架构', '开口'],
  relatedNodes: ['xrk-biz-map', 'xrk-plugin-arch'],
  caption: '分层、卖 API、工具面、配置——能讲清。',
  questions: [
    {
      id: 'interview-xrk-arch:pitch',
      q: '一句话介绍 XRK-AGT？',
      choices: [
        {
          t: '多端 Agent Runtime：插件/HTTP/工作流/Tasker/配置等扩展点',
          ok: true,
          why: '底座 + 扩展点。',
        },
        {
          t: '纯前端框架',
          ok: false,
          why: '核心是 Node Runtime。',
        },
        {
          t: '必须绑某云才能启动',
          ok: false,
          why: '本机可开发。',
        },
        {
          t: '禁止第三方 Core',
          ok: false,
          why: 'Loader 扫各 Core。',
        },
      ],
      relatedNodes: ['xrk-biz-map', 'xrk-overview'],
    },
    {
      id: 'interview-xrk-arch:api-product',
      q: '怎么在这套框架上卖 AI API？',
      choices: [
        {
          t: '工厂配模型 → Core http 暴露并鉴权 → 计量计费在产品 Core',
          ok: true,
          why: '基建与产品分层。',
        },
        {
          t: '计费写进 src/factory',
          ok: false,
          why: '业务进 Core。',
        },
        {
          t: '只提供 QQ 指令当 API',
          ok: false,
          why: '机器集成走 HTTP。',
        },
        {
          t: '密钥放前端按次扣费',
          ok: false,
          why: '必须服务端。',
        },
      ],
      relatedNodes: ['xrk-factory-llm', 'xrk-http-www', 'xrk-http-auth'],
    },
    {
      id: 'interview-xrk-arch:www',
      q: '产品前端在本仓怎么讲？',
      choices: [
        {
          t: 'www/<应用>/ 挂载；静态或 Vite 产物/反代均可；解包遵守 HttpResponse；兼容层产品内联',
          ok: true,
          why: '不绑死框架品牌；约束目录与契约。',
        },
        {
          t: '只允许某一个官方 SPA 框架',
          ok: false,
          why: '挂载不审框架名。',
        },
        {
          t: '前端必须改 Runtime 才能挂',
          ok: false,
          why: '放对 www 即可。',
        },
        {
          t: '页面占用 shared 根名更短更好',
          ok: false,
          why: '保留段。',
        },
      ],
      relatedNodes: ['xrk-http-www'],
    },
    {
      id: 'interview-xrk-arch:tools',
      q: '给模型用的工具怎么讲？',
      choices: [
        {
          t: 'MCP/工作流真调用；工厂只出客户端；禁止假调用',
          ok: true,
          why: '工具面与模型面正交。',
        },
        {
          t: '工具写进 LLM Factory 源码',
          ok: false,
          why: '工厂不管工具目录。',
        },
        {
          t: '有 Factory 就自动有全部外部工具',
          ok: false,
          why: '要挂 MCP 等。',
        },
        {
          t: '工具只能放浏览器扩展',
          ok: false,
          why: '主服工具环是正路。',
        },
      ],
      relatedNodes: ['xrk-mcp-ops', 'xrk-factory-llm'],
    },
    {
      id: 'interview-xrk-arch:trisync',
      q: '配置三同步解决什么？',
      choices: [
        {
          t: '模板可引导、schema 可校验、代码真消费——避免改了不生效',
          ok: true,
          why: 'Config-as-code 纪律。',
        },
        {
          t: '一天提交三次',
          ok: false,
          why: '指三处工程同步。',
        },
        {
          t: '只改 data yaml 永远够',
          ok: false,
          why: '新环境会翻车。',
        },
        {
          t: '密钥写进默认模板',
          ok: false,
          why: '禁止。',
        },
      ],
      relatedNodes: ['xrk-config', 'xrk-lab-config'],
    },
  ],
});
