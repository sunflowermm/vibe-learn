import { defineQuizSet } from '../schema.js';

/** 零基础进 XRK：这是什么、怎么跑、边界在哪 */
export default defineQuizSet({
  id: 'concept-xrk-zero',
  title: '零基础 · 认识 XRK-AGT',
  kind: 'concept',
  domain: 'xrk',
  tags: ['零基础', 'XRK', '入门', 'Runtime'],
  relatedNodes: ['xrk-overview', 'xrk-first-run', 'xrk-min-path'],
  caption: '用大白话认识本仓：运行时 + Core 业务，不是单一聊天机器人。',
  questions: [
    {
      id: 'concept-xrk-zero:q1',
      q: 'XRK-AGT 一句话定位，零基础版？',
      choices: [
        { t: '跑在 Node 上的 Agent 运行时：提供插件/HTTP/工作流等插槽，业务自己往里装', ok: true, why: '框架底座 + 扩展点；具体产品在 core/。' },
        { t: '只能玩贪吃蛇的小游戏包', ok: false, why: '可有娱乐插件，但定位是 Runtime。' },
        { t: '纯前端 CSS 框架', ok: false, why: '核心是服务端 Runtime。' },
        { t: '必须绑定某一家云才能打开编辑器', ok: false, why: '本机可跑。' },
      ],
      relatedNodes: ['xrk-overview', 'xrk-biz-map'],
      tags: ['零基础'],
    },
    {
      id: 'concept-xrk-zero:q2',
      q: '「Runtime」和「Core」怎么分？',
      choices: [
        { t: 'Runtime（src/）是底座与加载器；Core（core/）写你的业务能力', ok: true, why: '业务别改 src/；往 core 约定目录放。' },
        { t: '两者完全同义可互换改', ok: false, why: '边界清晰。' },
        { t: 'Core 只能放图片', ok: false, why: '放插件/HTTP/www 等。' },
        { t: 'Runtime 跑在浏览器里，Core 跑在打印机里', ok: false, why: '主服是 Node 进程。' },
      ],
      relatedNodes: ['xrk-runtime', 'xrk-core-layout'],
      tags: ['零基础'],
    },
    {
      id: 'concept-xrk-zero:q3',
      q: '第一次本机跑起来，通常依赖什么工具链？',
      choices: [
        { t: 'Node.js（版本要够新）+ pnpm + 按文档启动（如 node app）', ok: true, why: '包管理仅 pnpm；版本见引擎要求。' },
        { t: '只需要画图软件', ok: false, why: '否。' },
        { t: '禁止安装 Node', ok: false, why: '主服就靠 Node。' },
        { t: '必须先买物理服务器机柜', ok: false, why: '笔记本即可练。' },
      ],
      relatedNodes: ['xrk-first-run', 'xrk-deploy-env'],
      tags: ['零基础'],
    },
    {
      id: 'concept-xrk-zero:q4',
      q: '想加一个「聊天指令」类功能，代码大概放哪？',
      choices: [
        { t: 'core/<你的core>/plugin/，按约定继承基类', ok: true, why: 'Loader 扫描 plugin/；这是最小实践课方向。' },
        { t: '随便改 src/infrastructure 最快', ok: false, why: 'Core 开发者禁区。' },
        { t: '只写在微信聊天记录', ok: false, why: '要落盘。' },
        { t: '必须发布到 npm 商店审核', ok: false, why: '本地目录即可。' },
      ],
      relatedNodes: ['xrk-lab-plugin', 'xrk-plugin-arch'],
      tags: ['零基础'],
    },
    {
      id: 'concept-xrk-zero:q5',
      q: '密钥（模型 API Key）在 XRK 学习中应放哪？',
      choices: [
        { t: '环境变量或本地 .env（勿提交）；配置模板只留字段名', ok: true, why: '与工程卫生、env 模块一致。' },
        { t: '写进 README 方便同学', ok: false, why: '泄漏。' },
        { t: '提交进 Git 历史当教材', ok: false, why: '事故。' },
        { t: '写进前端打包 JS', ok: false, why: '浏览器可见。' },
      ],
      relatedNodes: ['xrk-config', 'data-env', 'craft-security'],
      tags: ['零基础'],
    },
    {
      id: 'concept-xrk-zero:q6',
      q: '本站 vibe-learn 页面属于 XRK 的哪一类交付？',
      choices: [
        { t: '某个 Core 的 www/<应用名>/ 静态前端，由主服挂载', ok: true, why: '例如 /vibe-learn；保留名勿占用。' },
        { t: '必须放在 src/factory', ok: false, why: 'www 在 Core。' },
        { t: '应用名必须叫 shared', ok: false, why: 'shared 保留。' },
        { t: '静态页不能存在于仓库', ok: false, why: '可以且常见。' },
      ],
      relatedNodes: ['xrk-http-www', 'xrk-overview'],
      tags: ['零基础'],
    },
    {
      id: 'concept-xrk-zero:q7',
      q: '「最小贡献路径」对新手意味着？',
      choices: [
        { t: '先跑通→改一小片可验证→再扩大；别一上来重构全世界', ok: true, why: '可 review、可回滚。' },
        { t: '第一次贡献就要重写全部 Runtime', ok: false, why: '越界且难审。' },
        { t: '只改表情包不算，但可以跳过本机运行', ok: false, why: '要跑通。' },
        { t: '禁止使用 Git', ok: false, why: '更要用。' },
      ],
      relatedNodes: ['xrk-min-path', 'git-advanced'],
      tags: ['零基础'],
    },
    {
      id: 'concept-xrk-zero:q8',
      q: 'Agent / 办事助手读仓库规则，常见靠什么文件？',
      choices: [
        { t: 'AGENTS.md、skills/ 等交底——描述边界与怎么干活', ok: true, why: '项目记忆；勿写密钥。' },
        { t: '把密码写进 AGENTS.md', ok: false, why: '禁止。' },
        { t: '删光说明让模型瞎猜更好', ok: false, why: '更差。' },
        { t: '只能口头告诉一次', ok: false, why: '要版本化。' },
      ],
      relatedNodes: ['adev-project-memory', 'xrk-agent-workspace'],
      tags: ['零基础'],
    },
    {
      id: 'concept-xrk-zero:q9',
      q: '学 XRK 时，为什么还要会 Git / HTTP / 环境变量？',
      choices: [
        { t: '放码、联调 API、配密钥、排障——全是日常，Runtime 不替你免除基础', ok: true, why: '本站把板块串起来正是为此。' },
        { t: '有了 XRK 这些都可以永久忘记', ok: false, why: '否。' },
        { t: '只有算法竞赛需要基础', ok: false, why: '工程更需要。' },
        { t: 'HTTP 与插件目录互相替代', ok: false, why: '不同扩展点。' },
      ],
      relatedNodes: ['xrk-biz-map', 'http-web', 'git-workspace'],
      tags: ['零基础', '进阶'],
    },
    {
      id: 'concept-xrk-zero:q10',
      q: 'Vibe Coding 时 Accept Agent 改动前？',
      choices: [
        { t: '看 diff + 本机跑一下——尤其有没有误改 src/', ok: true, why: '人机协作底线。' },
        { t: '无脑全盘接受', ok: false, why: '反模式。' },
        { t: '先把密钥提交再 Accept', ok: false, why: '否。' },
        { t: '只看回复是否幽默', ok: false, why: '看行为。' },
      ],
      relatedNodes: ['adev-vibe-coding', 'xrk-min-path'],
      tags: ['零基础'],
    },
  ],
});
