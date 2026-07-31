import { defineQuizSet } from '../schema.js';

/**
 * 工程素养导览：调试态度、观测三件套、日志卫生、CI 红灯。
 * 安全/威胁 → eng-security；测试策略/flaky → eng-testing；排障命令 → troubleshoot-cli。
 */
export default defineQuizSet({
  id: 'concept-craft-quality',
  title: '概念 · 调试、测试与观测',
  kind: 'concept',
  domain: 'craft',
  tags: ['调试', '观测', 'CI', '日志'],
  relatedNodes: ['craft-debug', 'craft-observability', 'craft-ci'],
  caption: '先复现再分层；能看见才能修好；红灯是保护主线。',
  questions: [
    {
      id: 'concept-craft-quality:debug',
      q: '排查本地或服务端问题时，更稳妥的调试策略？',
      choices: [
        {
          t: '先复现问题，再缩小范围、分层提出假设并逐一验证',
          ok: true,
          why: '复现→二分/分层→验证，比随机改代码或重装系统高效。',
        },
        {
          t: '遇到报错第一步就随机重装操作系统，不必尝试复现',
          ok: false,
          why: '重装掩盖根因且成本高；应先复现并定环境层还是业务层。',
        },
        {
          t: '排查时先把生产环境 API 密钥全部轮换，再看是否与 bug 有关',
          ok: false,
          why: '换密钥是安全响应，不是调试第一步；还可能打断其他服务。',
        },
        {
          t: '同时改十处无关代码，总有一处能「碰对」',
          ok: false,
          why: '难 review、难回滚，无法积累系统理解。',
        },
      ],
      relatedNodes: ['craft-debug'],
    },
    {
      id: 'concept-craft-quality:test-net',
      q: '自动化测试对工程团队的核心价值（素养层）？',
      choices: [
        {
          t: '锁定预期行为，改动或重构时能快速发现回归',
          ok: true,
          why: '测试是安全网，与 review 互补；金字塔与 flaky 细节见测试策略课。',
        },
        {
          t: '主要价值是让 CI 跑更久，显得更专业',
          ok: false,
          why: '目的是信心与回归检测，不是拖慢流水线。',
        },
        {
          t: '有了足够测试就可以完全取消 code review',
          ok: false,
          why: '覆盖不了设计与边界；review 仍必要。',
        },
        {
          t: '只应测 happy path，异常分支测了浪费时间',
          ok: false,
          why: '错误路径往往是 bug 高发区。',
        },
      ],
      relatedNodes: ['craft-testing', 'craft-ci'],
    },
    {
      id: 'concept-craft-quality:o11y',
      q: '谈「可观测性」时，常说的三件套直觉？',
      choices: [
        {
          t: '日志（Logs）、指标（Metrics）、追踪（Traces），按场景组合使用',
          ok: true,
          why: '日志看事件、指标看趋势、追踪看跨服务链路。',
        },
        {
          t: '三件套指 IDE 主题、字体和壁纸',
          ok: false,
          why: '可观测性是运行时诊断能力，与外观无关。',
        },
        {
          t: '等于 commit message 里用 emoji',
          ok: false,
          why: 'Commit 规范有助于协作，但不是 logs/metrics/traces。',
        },
        {
          t: '服务能启动一次就不需要日志与指标',
          ok: false,
          why: '能启动 ≠ 可运维；故障靠观测数据定位。',
        },
      ],
      relatedNodes: ['craft-observability'],
    },
    {
      id: 'concept-craft-quality:log-hygiene',
      q: '写应用日志时，哪条最不符合工程卫生？',
      choices: [
        {
          t: '明文打印密码、完整证件号、无结构的超长天书一行',
          ok: true,
          why: '敏感泄漏 + 难检索；应脱敏并结构化。',
        },
        {
          t: '带时间戳、request/trace id 与清晰 level',
          ok: false,
          why: '良好实践，便于关联排障。',
        },
        {
          t: '错误日志附可行动错误码或上下文',
          ok: false,
          why: '有助于快速定位。',
        },
        {
          t: 'DEBUG 按环境开关，避免生产刷屏',
          ok: false,
          why: '按环境控级别是常见做法。',
        },
      ],
      relatedNodes: ['craft-observability', 'craft-security'],
    },
    {
      id: 'concept-craft-quality:ci-red',
      q: 'CI 门禁（lint/test/build）变红时，更正确的态度？',
      choices: [
        {
          t: '先看失败日志修到绿再合并；门禁是保护主线，不是障碍',
          ok: true,
          why: '红灯强推把债丢给全队。',
        },
        {
          t: '关掉所有检查以加速上线',
          ok: false,
          why: '短期爽、长期全队买单。',
        },
        {
          t: 'CI 失败可忽略，本地绿就行',
          ok: false,
          why: '环境差常只在 CI 暴露。',
        },
        {
          t: '把失败测试删掉并 force push',
          ok: false,
          why: '掩盖问题，毁掉门禁信任。',
        },
      ],
      relatedNodes: ['craft-ci', 'craft-testing'],
    },
    {
      id: 'concept-craft-quality:timeline',
      q: '给线上故障建「时间线」时，日志里最该有？',
      choices: [
        {
          t: '时间戳、request/trace id、关键错误码与足够上下文（脱敏）',
          ok: true,
          why: '才能把多机日志串成一条故事。',
        },
        {
          t: '只有「error」一个单词',
          ok: false,
          why: '无法定位时间与请求。',
        },
        {
          t: '完整信用卡号方便核对',
          ok: false,
          why: '合规与泄漏事故。',
        },
        {
          t: '禁止任何时间戳',
          ok: false,
          why: '时间线依赖时间戳排序。',
        },
      ],
      relatedNodes: ['craft-observability', 'craft-debug'],
    },
  ],
});
