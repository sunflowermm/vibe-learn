import { defineQuizSet } from '../schema.js';

/** 测试策略：金字塔、契约、flaky、回归闭环（CI frozen → git-security） */
export default defineQuizSet({
  id: 'concept-eng-testing-strategy',
  title: '工程 · 测试策略',
  kind: 'concept',
  domain: 'craft',
  tags: ['测试', 'CI', '契约', '基础', '进阶'],
  relatedNodes: ['craft-testing', 'craft-ci'],
  caption: '测试是风险管理：用有限预算锁住最贵的回归。',
  questions: [
    {
      id: 'concept-eng-testing-strategy:q1',
      q: '测试金字塔直觉（单位 → 集成 → E2E）图什么？',
      choices: [
        {
          t: '越下层越快越稳、数量应更多',
          ok: true,
          why: '全是 E2E 又慢又脆。',
        },
        {
          t: '只写 E2E，禁止单测',
          ok: false,
          why: 'E2E 成本高、反馈慢，无法替代大量快测。',
        },
        {
          t: '金字塔要求禁止集成测试',
          ok: false,
          why: '中间层集成测很重要，不是禁止。',
        },
        {
          t: '测试数量与质量无关，越多越好无选择',
          ok: false,
          why: '要有策略：锁高价值回归，不是堆数量。',
        },
      ],
      relatedNodes: ['craft-testing', 'craft-ci'],
      tags: ['基础'],
    },
    {
      id: 'concept-eng-testing-strategy:q2',
      q: '什么最值得写成自动化回归？',
      choices: [
        {
          t: '曾线上炸过的、钱',
          ok: true,
          why: '用历史事故喂测试套件。',
        },
        {
          t: '只有 getter/setter',
          ok: false,
          why: '价值低，占用维护预算。',
        },
        {
          t: '随机 UI 像素到 1px',
          ok: false,
          why: '过脆，易因无关改动红灯。',
        },
        {
          t: '第三方网络每次真实扣费',
          ok: false,
          why: '贵且不稳；应用沙箱/契约测边界。',
        },
      ],
      relatedNodes: ['craft-testing', 'craft-security'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-testing-strategy:q3',
      q: '对外部 LLM/支付 API，单测里更合理的是？',
      choices: [
        {
          t: '用假对象/录制回放锁住你的适配层',
          ok: true,
          why: '测你的边界，别把套件绑死在公网波动。',
        },
        {
          t: '每次 CI 必须打真实付费生产',
          ok: false,
          why: '贵、慢、不稳，还可能产生真实副作用。',
        },
        {
          t: '禁止任何 mock，否则不算测试',
          ok: false,
          why: '教条；单元层 mock 适配层是常态。',
        },
        {
          t: '外部依赖永不失败所以不用测错误路径',
          ok: false,
          why: '错误路径最该测：超时、4xx/5xx、部分失败。',
        },
      ],
      relatedNodes: ['craft-testing', 'xrk-factory-llm', 'http-web'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-testing-strategy:q4',
      q: '契约测试（consumer-driven / schema 校验）解决什么？',
      choices: [
        {
          t: '提供方改破响应形状时尽',
          ok: true,
          why: '与 API 契约思维呼应。',
        },
        {
          t: '替代全部性能测试',
          ok: false,
          why: '契约管形状兼容，不管吞吐与延迟。',
        },
        {
          t: '保证业务需求正确',
          ok: false,
          why: '形状对 ≠ 产品需求对。',
        },
        {
          t: '只对移动端有意义',
          ok: false,
          why: '任何多客户端 API 都适用。',
        },
      ],
      relatedNodes: ['craft-testing', 'http-hands-on', 'api-frontend'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-testing-strategy:q5',
      q: 'flaky 测试正确处置？',
      choices: [
        {
          t: '隔离、修根因或删',
          ok: true,
          why: '红灯信任破产比少一个测试更糟。',
        },
        {
          t: '永久忽略红灯',
          ok: false,
          why: '真回归也会被淹没。',
        },
        {
          t: '把重试次数调到 100 就算质量',
          ok: false,
          why: '掩盖不稳定性，浪费 CI。',
        },
        {
          t: 'flaky 证明并发完美',
          ok: false,
          why: '常暴露竞态与时序依赖。',
        },
      ],
      relatedNodes: ['craft-testing', 'craft-ci'],
      tags: ['进阶'],
    },
    {
      id: 'concept-eng-testing-strategy:q6',
      q: '「测试通过」不能证明什么？',
      choices: [
        {
          t: '需求理解正确、无性能塌陷、无安全漏洞、无',
          ok: true,
          why: '测试是抽样；要配合评审与观测。',
        },
        {
          t: '语法基本可解析（在有类型/单测时）',
          ok: false,
          why: '这倒常能证明一部分。',
        },
        {
          t: 'CI 脚本能跑完',
          ok: false,
          why: '能证明流水线执行到结束。',
        },
        {
          t: '至少覆盖到的断言此刻成立',
          ok: false,
          why: '这正是测试能证明的。',
        },
      ],
      relatedNodes: ['craft-testing', 'craft-observability'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-eng-testing-strategy:q7',
      q: '修 bug 时配套测试的专业标准？',
      choices: [
        {
          t: '先（或同时）有失败用例证明',
          ok: true,
          why: '防回归的最小闭环。',
        },
        {
          t: '修好就删测试以免丢人',
          ok: false,
          why: '丢掉回归网，同类 bug 易再犯。',
        },
        {
          t: '口头保证即可',
          ok: false,
          why: '缺少可验证证据。',
        },
        {
          t: '只在生产观察一周无投诉',
          ok: false,
          why: '太慢且伤用户；应自动化锁住。',
        },
      ],
      relatedNodes: ['craft-testing', 'craft-debug'],
      tags: ['基础'],
    },
    {
      id: 'concept-eng-testing-strategy:q8',
      q: '对配置/特性开关，测试应注意？',
      choices: [
        {
          t: '覆盖关键开关组合',
          ok: true,
          why: '旗标组合会改行为路径；未测就全量等于盲飞。',
        },
        {
          t: '旗标无需测试',
          ok: false,
          why: '错误默认或组合会直接上线炸。',
        },
        {
          t: '所有旗标默认开启最安全',
          ok: false,
          why: '新能力默认关、渐进放开更稳。',
        },
        {
          t: '测试环境可以没有配置体系',
          ok: false,
          why: '要贴近真实配置路径，否则测了个寂寞。',
        },
      ],
      relatedNodes: ['craft-testing', 'xrk-config', 'craft-ci'],
      tags: ['进阶'],
    },
  ],
});
