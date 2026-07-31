import { defineQuizSet } from '../schema.js';

/** 扩展点：通道 / 事件 / 鉴权 / 语言栈（与 scenarios 不重复的硬点） */
export default defineQuizSet({
  id: 'concept-xrk-extensions',
  title: '概念 · XRK 扩展点要点',
  kind: 'concept',
  domain: 'xrk',
  tags: ['扩展点', 'Tasker', 'Events', 'Auth'],
  relatedNodes: ['xrk-events', 'xrk-tasker-channels'],
  caption: 'Tasker≠plugin；e.bot≠AgentRuntime；对外要鉴权。',
  questions: [
    {
      id: 'concept-xrk-extensions:events',
      q: 'events/ 更适合？',
      choices: [
        {
          t: '监听内部事件做副作用，不替代对外 HTTP',
          ok: true,
          why: '解耦横切逻辑。',
        },
        {
          t: '取代全部 http 路由',
          ok: false,
          why: 'HTTP 仍对外。',
        },
        {
          t: '与 Tasker 同义',
          ok: false,
          why: '通道 vs 内部事件。',
        },
        {
          t: '把全部用户指令写进 Listener',
          ok: false,
          why: '指令在 plugin。',
        },
      ],
      relatedNodes: ['xrk-events', 'xrk-runtime'],
    },
    {
      id: 'concept-xrk-extensions:tasker',
      q: 'Tasker 解决什么？',
      choices: [
        {
          t: '把 QQ/OneBot/Stdin 等协议适配进 Runtime',
          ok: true,
          why: '从哪收消息；业务仍在 plugin/workflow。',
        },
        {
          t: '替代 plugin 堆领域逻辑',
          ok: false,
          why: '只管通道。',
        },
        {
          t: '等于 REST 网关',
          ok: false,
          why: '消息通道 ≠ HTTP 产品面。',
        },
        {
          t: '有 Tasker 就不必鉴权',
          ok: false,
          why: '通道仍有信任边界。',
        },
      ],
      relatedNodes: ['xrk-tasker-channels'],
    },
    {
      id: 'concept-xrk-extensions:bot',
      q: 'e.bot 与 AgentRuntime 戴错？',
      choices: [
        {
          t: '回消息找错对象，或在通道实例上误调编排/子服',
          ok: true,
          why: 'e.bot≈账号通道；AgentRuntime≈全局编排。',
        },
        {
          t: '二者可互换，框架自动纠正',
          ok: false,
          why: '不会自动纠正。',
        },
        {
          t: '只有浏览器有 e.bot',
          ok: false,
          why: '服务端事件对象。',
        },
        {
          t: 'e.bot 等于 HttpResponse',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['xrk-tasker-channels', 'xrk-runtime', 'xrk-lab-plugin'],
    },
    {
      id: 'concept-xrk-extensions:auth',
      q: '对外 HTTP 鉴权相对插件内部调用？',
      choices: [
        {
          t: '对外 API 要鉴权与校验；不能假设调用方都可信',
          ok: true,
          why: '/api 默认系统鉴权。',
        },
        {
          t: '内网可永久不做鉴权策略',
          ok: false,
          why: '内网也会被扫。',
        },
        {
          t: '前端隐藏按钮等于鉴权',
          ok: false,
          why: '前端不可靠。',
        },
        {
          t: 'HttpResponse 自动完成 OAuth',
          ok: false,
          why: '形状工具 ≠ 鉴权方案。',
        },
      ],
      relatedNodes: ['xrk-http-auth', 'craft-security'],
    },
    {
      id: 'concept-xrk-extensions:lang',
      q: '主服与子服语言栈？',
      choices: [
        {
          t: '主服 Node 编排；子服可跑 Python 等，经门面协作',
          ok: true,
          why: '多语言扩展。',
        },
        {
          t: '禁止 Python',
          ok: false,
          why: 'pyserver 正路。',
        },
        {
          t: '子服命令必须从主服 stdin 转发',
          ok: false,
          why: '子服终端输入。',
        },
        {
          t: '主服跑在浏览器里',
          ok: false,
          why: 'Node 进程。',
        },
      ],
      relatedNodes: ['xrk-language-stack', 'xrk-subserver'],
    },
  ],
});
