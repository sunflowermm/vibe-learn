import { defineQuizSet } from '../schema.js';

/**
 * 面试开口：讲清权衡与产品落位（定义细节见 concept-xrk-*）。
 */
export default defineQuizSet({
  id: 'interview-xrk-arch',
  title: '大厂 / 项目 · XRK 架构开口',
  kind: 'interview',
  domain: 'xrk',
  tags: ['架构', '开口'],
  relatedNodes: ['xrk-biz-map', 'xrk-plugin-arch'],
  caption: '分层边界、卖 API、工具面、配置纪律——开口能讲 why。',
  questions: [
    {
      id: 'interview-xrk-arch:pitch',
      q: '面试官问「你们这套 Runtime 解决什么」时，怎么开口？',
      choices: [
        {
          t: '多端消息进同一套扩展点（plugin/HTTP/工作流/Tasker/配置），业务按 Core 插拔，不必为每个通道重写底座',
          ok: true,
          why: '强调扩展点与通道解耦，而不是背文件名。',
        },
        {
          t: '就是一个纯前端脚手架：没有服务端 Runtime 进程，也不提供多端消息入口、通道适配与扩展点加载能力',
          ok: false,
          why: '核心是 Node Runtime。',
        },
        {
          t: '必须绑定某一朵公有云账号才能启动 Runtime 与 Loader；本机离线环境无法完成任何开发、调试与验收工作',
          ok: false,
          why: '本机可开发；云只是部署选项。',
        },
        {
          t: '禁止第三方产品 Core：Loader 只认官方内置 Core 白名单，外部业务模块一律不可插拔加载运行',
          ok: false,
          why: 'Loader 扫各 Core；产品各自落地。',
        },
      ],
      relatedNodes: ['xrk-biz-map', 'xrk-overview'],
    },
    {
      id: 'interview-xrk-arch:api-product',
      q: '「在这套框架上卖 AI API」你会怎么分层讲？',
      choices: [
        {
          t: '工厂出模型客户端 → Core http 鉴权暴露 → 计量/配额/账单在产品 Core，不改 Runtime 硬塞计费',
          ok: true,
          why: '基建与产品边界：面试要听清钱与权限落在哪一层。',
        },
        {
          t: '计费规则、配额账单与各客户 API Key 写进 src/factory，由工厂内核统一扣费、鉴权并持久化出账',
          ok: false,
          why: '工厂只管客户端；业务进 Core。',
        },
        {
          t: '只提供 QQ/OneBot 聊天指令通道给运营使用，就算已经完成对外开放给第三方集成的机器 API',
          ok: false,
          why: '机器集成走 HTTP；指令通道是另一面。',
        },
        {
          t: '把模型密钥放进前端打包 JS 产物，按次在浏览器本地脚本里扣费、记配额并生成客户账单',
          ok: false,
          why: '密钥与计费必须服务端。',
        },
      ],
      relatedNodes: ['xrk-factory-llm', 'xrk-http-auth', 'xrk-http-www'],
    },
    {
      id: 'interview-xrk-arch:boundary',
      q: '同事想「为了快，直接改 src/infrastructure」——你怎么挡？',
      choices: [
        {
          t: '业务放 core/；缺能力先扩基类/提框架改动，禁止产品 PR 顺手改 Runtime',
          ok: true,
          why: '分层纪律：快一时、审与升级时还债。',
        },
        {
          t: '同意改 src/infrastructure，反正热更新能救，产品 PR 顺手改 Runtime 无妨',
          ok: false,
          why: '热更不解决归属与升级冲突。',
        },
        {
          t: '所有独立产品业务配置都塞进 config/default_config/，不必用 core/<名>/default/',
          ok: false,
          why: '独立产品模板在 core/<名>/default/。',
        },
        {
          t: '让他改浏览器 localStorage 代替 CommonConfig，服务端配置都改前端存',
          ok: false,
          why: '服务端配置与面板不在浏览器。',
        },
      ],
      relatedNodes: ['xrk-core-layout', 'xrk-runtime', 'xrk-config'],
    },
    {
      id: 'interview-xrk-arch:tools',
      q: '开口讲「模型工具面」时要强调什么？',
      choices: [
        {
          t: 'MCP/工作流真调用；工厂只出客户端；禁止 prompt 里假装已调工具',
          ok: true,
          why: '工具面与模型面正交；假 ReAct 过不了审。',
        },
        {
          t: '工具实现全部写进 LLM Factory 源码，由工厂顺带执行业务副作用',
          ok: false,
          why: '工厂不管工具目录。',
        },
        {
          t: '只要创建了 LLM Factory，就自动拥有全部外部工具，无需 MCP 注册',
          ok: false,
          why: '还要挂载 MCP / 注册工具。',
        },
        {
          t: '工具只能放浏览器扩展里执行，主服工作流禁止注册任何 MCP 工具',
          ok: false,
          why: '主服工具环是正路。',
        },
      ],
      relatedNodes: ['xrk-mcp-ops', 'xrk-factory-llm', 'xrk-stream'],
    },
    {
      id: 'interview-xrk-arch:trisync',
      q: '为什么强调配置「三同步」，而不是只改一份 data yaml？',
      choices: [
        {
          t: '模板可引导新环境、schema 可校验、代码真消费——任一环缺就「改了不生效」',
          ok: true,
          why: 'Config-as-code 纪律；面试官听的是可运维性。',
        },
        {
          t: '三同步是指一天必须提交三次 Git，与模板/schema/代码无关',
          ok: false,
          why: '指模板 / schema / 消费代码三处。',
        },
        {
          t: '只改 data/<产品>/ 一份运行时 yaml，在任何新 clone 环境上都永远够用',
          ok: false,
          why: '新环境缺模板与 schema 会翻车。',
        },
        {
          t: '把真实生产密钥写进默认模板最省事，新环境开箱即可连生产',
          ok: false,
          why: '密钥禁止进仓。',
        },
      ],
      relatedNodes: ['xrk-config', 'xrk-lab-config'],
    },
  ],
});
