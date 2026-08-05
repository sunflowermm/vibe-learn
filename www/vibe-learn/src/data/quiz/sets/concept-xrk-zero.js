import { defineQuizSet } from '../schema.js';

/** 零基础：定位、分层、放码入口、密钥（www 深挖见 scenarios） */
export default defineQuizSet({
  id: 'concept-xrk-zero',
  title: '零基础 · 认识 XRK-AGT',
  kind: 'concept',
  domain: 'xrk',
  tags: ['零基础', 'XRK'],
  relatedNodes: ['xrk-overview', 'xrk-first-run'],
  caption: '运行时 + Core；先认边界与密钥红线。',
  questions: [
    {
      id: 'concept-xrk-zero:pitch',
      q: 'XRK-AGT 一句话定位？',
      choices: [
        {
          t: 'Node 上的 Agent Runtime：扩展点给 Core 装业务',
          ok: true,
          why: '底座 + 扩展点，不是单一聊天成品。',
        },
        {
          t: '纯前端 UI 组件库，没有服务端 Node 进程与扩展点加载',
          ok: false,
          why: '核心是服务端 Runtime（Node 进程）。',
        },
        {
          t: '必须绑定某一朵公有云账号，才能在本机完成开发与调试',
          ok: false,
          why: '本机装好 Node/pnpm 即可跑。',
        },
        {
          t: '禁止扩展：只能使用内置指令，不能新增 plugin/http/workflow',
          ok: false,
          why: '可扩展（plugin/http/workflow…）是核心卖点。',
        },
      ],
      relatedNodes: ['xrk-overview', 'xrk-biz-map'],
    },
    {
      id: 'concept-xrk-zero:layers',
      q: 'Runtime 和 Core 怎么分？',
      choices: [
        {
          t: 'Runtime（src/）底座与加载；Core（core/）写业务',
          ok: true,
          why: '业务勿堆进 infrastructure；缺能力再扩框架。',
        },
        {
          t: 'Runtime 与 Core 同义，改 src/ 或 core/ 效果完全一样',
          ok: false,
          why: 'Loader 只扫约定目录；乱放不会被加载。',
        },
        {
          t: 'Core 目录只能放图片与静态资源，不能写 plugin 或 http',
          ok: false,
          why: 'plugin / http / www / workflow 等才是业务面。',
        },
        {
          t: 'Runtime 只在浏览器里跑，没有独立的 Node 主服进程',
          ok: false,
          why: '主服是 Node 进程，不是浏览器内核。',
        },
      ],
      relatedNodes: ['xrk-runtime', 'xrk-core-layout'],
    },
    {
      id: 'concept-xrk-zero:plugin',
      q: '聊天指令类功能放哪？',
      choices: [
        {
          t: 'core/<core>/plugin/，继承 PluginBase',
          ok: true,
          why: 'Loader 扫 plugin/；触发规则要可观察。',
        },
        {
          t: '改 src/infrastructure 最快上线，Core 开发者也可以直接改 Runtime',
          ok: false,
          why: 'Core 开发者禁改 Runtime。',
        },
        {
          t: '只写在 IDE 聊天记录里即可，不必落盘成可加载的插件模块',
          ok: false,
          why: '必须落盘，Loader 不读聊天。',
        },
        {
          t: '只用 yaml 配置即可完成指令逻辑，无需任何可执行插件模块',
          ok: false,
          why: '逻辑在插件模块；yaml 管配置。',
        },
      ],
      relatedNodes: ['xrk-lab-plugin', 'xrk-plugin-arch'],
    },
    {
      id: 'concept-xrk-zero:secrets',
      q: '模型 API Key 怎么处理？',
      choices: [
        {
          t: '环境变量或本地 .env（勿提交）；模板只留字段名',
          ok: true,
          why: '进仓会进 Git 历史，轮换也难。',
        },
        {
          t: '写进 README 方便同学',
          ok: false,
          why: '文档传播面大，必泄漏。',
        },
        {
          t: '写进前端打包 JS',
          ok: false,
          why: '浏览器 DevTools 可见。',
        },
        {
          t: '提交进 default_config 当教材',
          ok: false,
          why: '模板只留结构与假值，不放真实密钥。',
        },
      ],
      relatedNodes: ['xrk-config', 'data-env', 'craft-security'],
    },
    {
      id: 'concept-xrk-zero:min-path',
      q: '第一次贡献更稳妥的节奏？',
      choices: [
        {
          t: '最小可复查一步：本机跑通 → 小 diff → 行为可验证，再谈大重构',
          ok: true,
          why: '主脊小步；与「最小贡献路径」课一致。',
        },
        {
          t: '一次重写全部 Core 与课程章节再提交，比小步可复查更稳妥',
          ok: false,
          why: '难 review、难回滚。',
        },
        {
          t: '跳过本机跑通与行为验证，直接开大 PR 合入主线即可',
          ok: false,
          why: '合入前应先本地绿。',
        },
        {
          t: '只改 README 宣称能力已上线，也算完成最小可复查贡献路径',
          ok: false,
          why: '通常要有可运行的一小步。',
        },
      ],
      relatedNodes: ['xrk-min-path', 'xrk-first-run'],
    },
  ],
});
