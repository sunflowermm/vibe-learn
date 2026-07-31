import { defineQuizSet } from '../schema.js';

/** 零基础：定位与放码入口 */
export default defineQuizSet({
  id: 'concept-xrk-zero',
  title: '零基础 · 认识 XRK-AGT',
  kind: 'concept',
  domain: 'xrk',
  tags: ['零基础', 'XRK'],
  relatedNodes: ['xrk-overview', 'xrk-first-run'],
  caption: '运行时 + Core；先认边界。',
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
          t: '纯前端 UI 库，没有服务端进程',
          ok: false,
          why: '核心是服务端 Runtime。',
        },
        {
          t: '必须绑定某云才能本机开发',
          ok: false,
          why: '本机 Node 即可。',
        },
        {
          t: '禁止扩展，只能用内置指令',
          ok: false,
          why: '可扩展是核心。',
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
          why: '业务勿堆进 infrastructure。',
        },
        {
          t: '两者同义，改哪都行',
          ok: false,
          why: 'Loader 只扫约定目录。',
        },
        {
          t: 'Core 只能放图片',
          ok: false,
          why: 'plugin/http/www/workflow 等。',
        },
        {
          t: 'Runtime 只在浏览器跑',
          ok: false,
          why: '主服是 Node 进程。',
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
          why: 'Loader 扫 plugin/。',
        },
        {
          t: '改 src/infrastructure 最快',
          ok: false,
          why: 'Core 禁区。',
        },
        {
          t: '只写在 IDE 聊天记录',
          ok: false,
          why: '必须落盘。',
        },
        {
          t: '只用 yaml，无需可执行模块',
          ok: false,
          why: '逻辑在插件模块。',
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
          why: '进仓会进 Git 历史。',
        },
        {
          t: '写进 README 方便同学',
          ok: false,
          why: '泄漏。',
        },
        {
          t: '写进前端打包 JS',
          ok: false,
          why: '浏览器可见。',
        },
        {
          t: '提交进 default_config 当教材',
          ok: false,
          why: '模板不放真实密钥。',
        },
      ],
      relatedNodes: ['xrk-config', 'data-env', 'craft-security'],
    },
    {
      id: 'concept-xrk-zero:www',
      q: 'vibe-learn 页面属于哪类交付？',
      choices: [
        {
          t: '某 Core 的 www/<应用名>/ 静态前端，由主服挂载',
          ok: true,
          why: '如 /vibe-learn；勿占保留根名。',
        },
        {
          t: '必须放在 src/factory',
          ok: false,
          why: 'www 在 Core。',
        },
        {
          t: '应用名必须叫 shared',
          ok: false,
          why: 'shared 保留。',
        },
        {
          t: '静态页不能进仓库',
          ok: false,
          why: '仓内挂载常见。',
        },
      ],
      relatedNodes: ['xrk-http-www', 'xrk-overview'],
    },
  ],
});
