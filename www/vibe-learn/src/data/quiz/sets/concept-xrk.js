import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-xrk-vibe',
  title: '概念 · XRK 放码与 Vibe Coding',
  kind: 'concept',
  domain: 'xrk',
  tags: ['XRK', 'Vibe', '配置'],
  relatedNodes: ['xrk-min-path', 'adev-vibe-coding', 'adev-project-memory'],
  questions: [
    {
      q: '在 XRK-AGT 项目里，业务插件（例如聊天指令、定时任务）默认应该放在哪个目录？',
      choices: [
        { t: 'core/<core名>/plugin/ 下，继承 PluginBase 并按 Loader 约定命名', ok: true, why: '项目放码约定：业务进 Core 子目录，Loader 启动时自动扫描 plugin/。' },
        { t: '直接修改 src/infrastructure/plugins/ 里的框架基类源码来加业务逻辑', ok: false, why: 'Core 开发者不得改 Runtime；业务逻辑应写在 core/*/plugin/。' },
        { t: '只写在 IDE 聊天记录里，保存对话后 Agent Runtime 会自动加载', ok: false, why: '代码必须落盘到约定目录才会被 Loader 发现，聊天记录不是代码仓库。' },
        { t: '放在 config/default_config/ 里用 yaml 描述插件行为，无需写 .js 文件', ok: false, why: '插件是可执行 JS 模块，yaml 只做配置；逻辑仍在 core/*/plugin/。' },
      ],
    },
    {
      q: '独立产品 Core 改一项配置时，常说的「三同步」具体指哪三处必须字段一致？',
      choices: [
        { t: 'default/ 默认模板 + commonconfig/ schema + 实际 read 配置的代码', ok: true, why: '三处字段对齐，新环境才能引导复制、通过校验并真正读到值。' },
        { t: '只改 data/<产品>/ 运行时 yaml 一份文件，模板和 schema 可以不管', ok: false, why: '缺模板则首次部署无默认值；缺 schema 则字段无约束；缺代码则 yaml 不被消费。' },
        { t: '只改前端页面上的中文文案，后端 yaml 和 commonconfig 可以不同步', ok: false, why: '前端文案不驱动运行时；配置必须模板、schema、代码三处一致。' },
        { t: '三同步指 Git 的 pull、merge、push，与 yaml 字段名没有任何关系', ok: false, why: '这是 XRK 配置工程术语，指 default、commonconfig、消费代码三处同步。' },
      ],
    },
    {
      q: 'Vibe Coding 五拍流程里，在 IDE 里点 Accept 接受 Agent 改动之前，必做哪一步？',
      choices: [
        { t: '审 diff（看改了什么）+ 本机跑通验收（确认行为符合预期）', ok: true, why: 'Accept 前必须人工把关：Agent 可能改错文件、引入 bug 或越界改 src/。' },
        { t: '无脑全部 Accept，Agent 生成的代码一定正确，审 diff 是浪费时间', ok: false, why: '这是反模式；必须审查 diff 并在本机验证，否则容易把错误合入。' },
        { t: '先把 API 密钥写进仓库方便 Agent 读取，Accept 后再慢慢删', ok: false, why: '密钥禁止进仓；即使后续删除，Git 历史仍会泄漏。' },
        { t: 'Accept 前只需看 Agent 回复语气是否友好，不必跑代码或看 diff', ok: false, why: 'Vibe Coding 强调工程验收，语气友好不等于代码正确可运行。' },
      ],
    },
    {
      q: 'Core 的 HTTP handler 用 HttpResponse.success 传入普通对象时，前端应如何解包 JSON？',
      choices: [
        { t: '字段常拍平到顶层（含 success、message），勿默认只读 json.data', ok: true, why: 'HttpResponse 约定：普通对象会 Object.assign 拍平；数组/标量才放 data 字段。' },
        { t: 'success 响应永远只有 json.data 一个字段，业务字段一定在 data 里面', ok: false, why: '传入普通对象时字段拍平到顶层，没有统一的 data 包裹层。' },
        { t: 'HttpResponse.success 不会返回 success 字段，只有裸业务 JSON', ok: false, why: 'success 响应始终含 success: true 与 message 字段。' },
        { t: '前端可以混用 res.json() 和 HttpResponse.success，解包规则各自不同没关系', ok: false, why: 'handler 内应统一用 HttpResponse，前端按 unwrapSuccess 语义解包，避免混用。' },
      ],
    },
    {
      q: '跨 Cursor、Claude Code 等工具做项目交底时，优先维护哪类可移植文件？',
      choices: [
        { t: 'AGENTS.md（可与 Rules、CLAUDE.md 对齐同一套事实，勿互相矛盾）', ok: true, why: '项目记忆课：AGENTS.md 描述工作区边界，clone 仓库后各工具都能读到。' },
        { t: '把数据库密码和 API Key 写进 AGENTS.md，Agent 才能自动连库', ok: false, why: '密钥禁止进仓；AGENTS.md 只写规则与能力边界，不写机密。' },
        { t: '维护两套互相矛盾的说明书，让 Agent 自己猜哪套是对的', ok: false, why: '矛盾说明会让 Agent 行为不可预测；应对齐事实到一份交底。' },
        { t: '交底只存在 IDE 本地设置里，仓库里不需要任何 AGENTS.md 或 skills', ok: false, why: '可移植交底必须版本化进仓库，团队成员 clone 后才能共享规则。' },
      ],
    },
    {
      q: '在 Core 插件或 HTTP handler 里，全局对象 AgentRuntime 应如何使用？',
      choices: [
        { t: '裸名直接使用，勿 import AgentRuntime、勿 new AgentRuntime()、勿写 global.', ok: true, why: '运行时约定：AgentRuntime 挂在 globalThis，业务模块直接写裸名即可。' },
        { t: '每个插件 constructor 里必须 new AgentRuntime() 创建独立实例', ok: false, why: '禁止 new；Runtime 是进程内单例，由框架在启动时创建并挂载。' },
        { t: 'AgentRuntime 只能在浏览器 www 页面里使用，服务端插件不能访问', ok: false, why: 'AgentRuntime 是服务端全局对象；www 静态页在浏览器环境，用法不同。' },
        { t: '应写 import AgentRuntime from 某路径，与 import PluginBase 方式相同', ok: false, why: '业务代码用裸名，不要 import AgentRuntime；PluginBase 等基类才需要 import。' },
      ],
    },
    {
      q: '娱乐/玩梗类插件在本仓的默认入库与提交策略是什么？',
      choices: [
        { t: '本地可跑；不进 system-Core 白名单，默认不提交到主仓库', ok: true, why: '项目规则：娱乐插件配置写插件顶部，本地 gitignore 忽略即可跑。' },
        { t: '必须改根 .gitignore 加 ! 白名单，把娱乐插件提交进 system-Core', ok: false, why: '勿为娱乐插件加白名单；system-Core 只收框架示例外设。' },
        { t: '娱乐插件必须放进 src/infrastructure/ 才能被 Loader 扫描到', ok: false, why: '业务（含娱乐）放 core/*/plugin/；src/ 是 Runtime 禁区。' },
        { t: '娱乐插件必须发布到 npm 再 install，本地 core/ 目录不能放', ok: false, why: 'Loader 扫描本地 core/ 约定目录，不需要 npm 发布环节。' },
      ],
    },
  ],
});
