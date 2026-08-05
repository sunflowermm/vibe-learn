import { defineQuizSet } from '../schema.js';

/** 大厂开口：排障、CI、密钥、回归、依赖韧性、契约、观测（缓存专题留给 DB 课） */
export default defineQuizSet({
  id: 'interview-craft-eng',
  title: '大厂 · 工程素养开口',
  kind: 'interview',
  domain: 'craft',
  tags: ['工程', 'CI', '安全', '排障'],
  relatedNodes: ['craft-debug', 'craft-security', 'craft-ci'],
  caption: '面试官爱听：可回滚、可观测、不泄密；缓存穿透等留给数据库课展开。',
  questions: [
    {
      id: 'interview-craft-eng:incident',
      q: '面试官问「线上出故障你怎么处理」，比较稳妥的开场回答是什么？',
      choices: [
        {
          t: '先止血降影响（回滚 / 限流 / 开关），再定位根因并复盘',
          ok: true,
          why: '先保用户，再查因、可复盘；比一上来改代码更专业。',
        },
        {
          t: '故障期立刻重写全部业务代码，认为旧实现都不可信',
          ok: false,
          why: '故障期大改风险极高，无法快速恢复服务。',
        },
        {
          t: '先把所有密钥与生产配置贴到群里，方便同事一起排查',
          ok: false,
          why: '扩大泄密面；排障看日志与指标，不暴露凭证。',
        },
        {
          t: '等用户不再投诉后再处理，避免打断当前开发节奏',
          ok: false,
          why: '拖延会扩大影响面与数据损失。',
        },
      ],
      relatedNodes: ['craft-debug', 'craft-observability'],
    },
    {
      id: 'interview-craft-eng:ci',
      q: '团队引入持续集成（CI）的核心价值，用一句话说清楚？',
      choices: [
        {
          t: '每次提交自动跑测试与检查，尽早发现破坏，降低集成风险',
          ok: true,
          why: '自动化验证，让问题在合并前暴露。',
        },
        {
          t: '让 CI 服务器风扇转得更响，证明项目一直在「忙」',
          ok: false,
          why: '玩笑话，解释不了质量与协作价值。',
        },
        {
          t: '用 CI 流水线完全取代产品经理做需求优先级决策',
          ok: false,
          why: 'CI 验证构建与测试，不负责业务方向。',
        },
        {
          t: '有了 CI 之后，开发者本地就完全不必再跑任何测试',
          ok: false,
          why: '本地仍应自测；CI 是自动化网，不是免测通行证。',
        },
      ],
      relatedNodes: ['craft-ci', 'craft-testing'],
    },
    {
      id: 'interview-craft-eng:secrets',
      q: '被问到「密钥能不能放进 Git 仓库」，你应该怎么答？',
      choices: [
        {
          t: '不进仓；用环境变量或密钥管理；一旦泄漏立刻轮换',
          ok: true,
          why: '工程安全底线；删提交不能替代轮换。',
        },
        {
          t: '私有仓库就可以硬编码，外人反正看不到',
          ok: false,
          why: '权限变更、日志、fork、离职带走都可能泄漏。',
        },
        {
          t: '写进 README 方便新人 onboarding 直接复制',
          ok: false,
          why: 'README 传播面更大。',
        },
        {
          t: '用 Base64 编码后再提交，就算做过「加密」了',
          ok: false,
          why: '编码不是加密，可直接解码。',
        },
      ],
      relatedNodes: ['craft-security', 'data-env'],
    },
    {
      id: 'interview-craft-eng:bugfix',
      q: '面试官问「你怎么证明这个 bug 真的修好了」，较好的回答是？',
      choices: [
        {
          t: '能稳定复现的用例，再加自动化测试或检查项护住同类回归',
          ok: true,
          why: '可复现 + 自动化防护，比口头保证更有说服力。',
        },
        {
          t: '口头保证「我仔细看过代码了，肯定没问题」就够了',
          ok: false,
          why: '缺少可验证证据；同类 bug 仍可能再出现。',
        },
        {
          t: '删掉相关错误日志，线上看起来干净就算修好',
          ok: false,
          why: '掩盖日志不等于修根因。',
        },
        {
          t: '只在本机点一次页面，没报错就直接合码上线',
          ok: false,
          why: '手工点一次覆盖有限，难防回归。',
        },
      ],
      relatedNodes: ['craft-testing', 'craft-debug'],
    },
    {
      id: 'interview-craft-eng:ci-local',
      q: '你说「我本机可以」，但 CI 流水线挂了。最常见原因是？',
      choices: [
        {
          t: '环境不一致：运行时版本、锁文件、路径大小写、缺失依赖或权限',
          ok: true,
          why: '「在我机器上能跑」常源于环境漂移；CI 暴露隐藏依赖。',
        },
        {
          t: 'CI 系统随机挑选开发者进行惩罚，与代码无关',
          ok: false,
          why: '失败有日志可查，通常是配置或代码问题。',
        },
        {
          t: '必须先把整个项目迁移到另一种编程语言才能过 CI',
          ok: false,
          why: '应先对比 CI 日志与本机环境差异。',
        },
        {
          t: '只要多 push 几次不改代码，流水线就会自动变绿',
          ok: false,
          why: '不修根因，失败条件通常不变。',
        },
      ],
      relatedNodes: ['craft-ci', 'package-managers'],
    },
    {
      id: 'interview-craft-eng:resilience',
      q: '面试官问「下游依赖挂了你怎么设计调用」，专业开口？',
      choices: [
        {
          t: '设超时、有限重试与退避，必要时熔断/降级，并把依赖当不可靠',
          ok: true,
          why: '细节见可靠性课；面试先讲边界与失败模式。',
        },
        {
          t: '无限等待直到下游成功返回，中间不做任何超时控制',
          ok: false,
          why: '拖垮线程与调用链，放大故障。',
        },
        {
          t: '默认假设依赖不可能挂，业务只写快乐路径即可',
          ok: false,
          why: '网络与第三方总会失败，设计要兜底。',
        },
        {
          t: '只加日志观察，不设超时，也不限制重试次数上限',
          ok: false,
          why: '日志不能阻止挂起；超时是底线。',
        },
      ],
      relatedNodes: ['craft-observability', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'interview-craft-eng:api-compat',
      q: '如何避免改接口把现有客户端弄挂？',
      choices: [
        {
          t: '兼容演化：加字段谨慎、破坏性变更走版本/双写/契约测试',
          ok: true,
          why: 'API 合同思维；与契约测试呼应。',
        },
        {
          t: '随时改字段类型与含义，不必通知任何客户端',
          ok: false,
          why: '客户端解析会炸，属于破坏性变更。',
        },
        {
          t: '只口头告诉某一个前端同学，其他人自然会知道',
          ok: false,
          why: '多客户端易漏；要用文档/契约/版本通道。',
        },
        {
          t: '接口无需文档与测试，靠上线后用户反馈再改',
          ok: false,
          why: '无契约就无法安全演化。',
        },
      ],
      relatedNodes: ['http-hands-on', 'api-frontend', 'craft-testing'],
      tags: ['进阶'],
    },
    {
      id: 'interview-craft-eng:o11y',
      q: '解释「观测驱动排障」时，指标 / 日志 / 追踪怎么开口？',
      choices: [
        {
          t: '指标看症状与规模，日志看细节，追踪看跨服务调用链',
          ok: true,
          why: '比瞎改代码高级；与可观测性课一致。',
        },
        {
          t: '只靠用户截图和聊天描述，不需要系统侧数据',
          ok: false,
          why: '缺系统侧证据，难定位规模与根因。',
        },
        {
          t: '关掉指标与告警以免吵，专心改代码即可',
          ok: false,
          why: '关掉观测等于关掉眼睛。',
        },
        {
          t: '观测等于到处加一行 console.log("hello")',
          ok: false,
          why: '需要结构化日志、指标与追踪，不是随意打印。',
        },
      ],
      relatedNodes: ['craft-observability', 'craft-debug'],
      tags: ['进阶'],
    },
  ],
});
