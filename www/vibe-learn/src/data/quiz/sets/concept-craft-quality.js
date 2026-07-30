import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-craft-quality',
  title: '概念 · 调试、测试与观测',
  kind: 'concept',
  domain: 'craft',
  tags: ['调试', '测试', '观测', '日志'],
  relatedNodes: [
    'craft-debug',
    'craft-testing',
    'craft-observability',
    'craft-ci',
    'craft-security',
    'http-hands-on',
  ],
  questions: [
    {
      q: '排查本地或服务端问题时，更稳妥的调试策略应该是什么？',
      choices: [
        { t: '先复现问题，再缩小范围、分层提出假设并逐一验证', ok: true, why: 'debug 课：复现→二分/分层→验证，比随机改代码或重装系统高效。' },
        { t: '遇到报错第一步就随机重装操作系统，不必尝试复现', ok: false, why: '重装掩盖根因且成本高；应先复现并定位是环境层还是业务层。' },
        { t: '排查时先把生产环境 API 密钥全部轮换，再看是否与 bug 有关', ok: false, why: '换密钥是安全响应手段，不是调试第一步；且可能打断其他服务。' },
        { t: '同时改十处 unrelated 代码，总有一处能「碰对」解决问题', ok: false, why: ' shotgun 改动难 review、难回滚，无法积累对系统的理解。' },
      ],
    },
    {
      q: '自动化测试（unit/integration 等）对工程团队的核心价值是什么？',
      choices: [
        { t: '锁定预期行为，改动或重构时能快速发现回归（regression）', ok: true, why: 'testing：测试是安全网，不是目的本身；与 code review 互补而非替代。' },
        { t: '测试的主要价值是让 CI 跑更久，显得项目更专业', ok: false, why: '测试是为了信心与回归检测，不是为了拖慢流水线。' },
        { t: '有了足够测试就可以完全取消 code review 和人工验收', ok: false, why: '测试覆盖不了所有边界与设计问题；review 仍必要。' },
        { t: '测试只应测 happy path，异常分支测了反而浪费时间', ok: false, why: '边界与错误路径往往是 bug 高发区；只测主路径不够。' },
      ],
    },
    {
      q: '谈系统「可观测性（Observability）」时，常说的三件套直觉是什么？',
      choices: [
        { t: '日志（Logs）、指标（Metrics）、追踪（Traces），按场景组合使用', ok: true, why: 'observability：日志看事件、指标看趋势、追踪看跨服务链路；不必三者全开。' },
        { t: '可观测性三件套指 IDE 主题、字体和壁纸配色', ok: false, why: '可观测性是运行时诊断能力，与开发环境外观无关。' },
        { t: '可观测性等于 Git commit message 里用 emoji 标记类型', ok: false, why: 'Commit 规范有助于协作，但不是 logs/metrics/traces 意义上的可观测性。' },
        { t: '只要服务能启动一次，就不需要日志、指标或追踪', ok: false, why: '生产故障依赖可观测数据定位；「能启动」不等于「可运维」。' },
      ],
    },
    {
      q: '工作台分层排障时，遇到「命令找不到 / 端口占用」类问题，应先怀疑哪一层？',
      choices: [
        { t: '环境层：PATH、依赖版本、端口占用、文件权限等，再怀疑业务逻辑', ok: true, why: 'troubleshoot：大量「跑不起来」是环境未就绪，不是代码算法错误。' },
        { t: '第一步先改无关 UI 文案和按钮颜色，也许问题会自己消失', ok: false, why: 'UI 文案与 PATH/端口无关；应先查环境层 checklist。' },
        { t: '第一步先删除数据库备份文件，释放空间也许能修复', ok: false, why: '删备份 risky 且通常与命令找不到无关；应查 PATH 与安装。' },
        { t: '环境层问题可以忽略，直接重写全部业务 Core 代码', ok: false, why: '未解决 PATH/依赖/端口就重写代码，问题仍会复现。' },
      ],
    },
    {
      q: '工程安全常识里，下面哪组做法最贴近底线要求？',
      choices: [
        { t: '密钥不进版本库、权限最小化、不信任外部输入并做校验', ok: true, why: 'security：私有仓也会泄漏；前端隐藏不等于安全；输入必须校验。' },
        { t: '仓库设为 private 就可以在代码里硬编码 API 密钥', ok: false, why: '私有仓仍可能误分享、CI 日志泄漏；密钥应走 Secrets/环境变量。' },
        { t: '把密钥写进前端 JS 并用 CSS display:none 隐藏就算安全', ok: false, why: '前端代码对用户可见，隐藏样式不提供保密性。' },
        { t: '安全只靠防火墙，应用层不必校验用户输入或做鉴权', ok: false, why: '纵深防御需要应用层鉴权、校验与最小权限，不能单靠网络层。' },
      ],
    },
    {
      q: '写应用日志时，下面哪种做法最不符合工程卫生？',
      choices: [
        { t: '明文打印密码、完整身份证号、无结构的超长天书式一行日志', ok: true, why: '观测卫生：敏感信息泄漏 + 无结构日志难检索；应脱敏并结构化。' },
        { t: '日志带时间戳、请求 trace id 与清晰 log level', ok: false, why: '这是良好实践，便于排障与关联跨服务请求。' },
        { t: '错误日志附带可行动的错误码或上下文，方便定位', ok: false, why: '结构化错误信息有助于快速定位，符合观测最佳实践。' },
        { t: '对 DEBUG 级别日志按环境开关，避免生产刷屏', ok: false, why: '按环境控制日志级别是常见做法，有利于性能与可读性。' },
      ],
    },
    {
      q: 'CI 门禁（lint/test/build）变红时，更正确的态度？',
      choices: [
        { t: '先看失败日志修到绿再合并；门禁是保护主线，不是障碍', ok: true, why: '红灯强推会把债丢给全队。' },
        { t: '关掉所有检查以加速上线', ok: false, why: '饮鸩止渴。' },
        { t: 'CI 失败可以忽略，本地绿就行', ok: false, why: '环境差可能只在 CI 暴露。' },
        { t: '把失败测试直接删掉并 force push', ok: false, why: '掩盖问题。' },
      ],
      relatedNodes: ['craft-ci', 'craft-testing'],
      tags: ['进阶'],
    },
    {
      q: '不稳定（flaky）测试长期放着的代价？',
      choices: [
        { t: '团队学会忽略红灯，真回归也被淹没', ok: true, why: '要么修稳，要么隔离重试并跟进根因。' },
        { t: 'flaky 证明系统更健康', ok: false, why: '相反。' },
        { t: '只要重试三次就等于质量合格', ok: false, why: '重试是权宜。' },
        { t: '与可观测性无关，可永久忽略', ok: false, why: '会侵蚀门禁信任。' },
      ],
      relatedNodes: ['craft-testing', 'craft-ci'],
      tags: ['进阶'],
    },
    {
      q: '给线上故障建「时间线」时，日志里最该有？',
      choices: [
        { t: '时间戳、request/trace id、关键错误码与足够上下文（脱敏）', ok: true, why: '才能把多机日志串成一条故事。' },
        { t: '只有「error」一个单词', ok: false, why: '无法定位。' },
        { t: '完整信用卡号方便核对', ok: false, why: '合规事故。' },
        { t: '禁止任何时间戳', ok: false, why: '时间线靠时间戳。' },
      ],
      relatedNodes: ['craft-observability', 'craft-debug'],
      tags: ['进阶'],
    },
  ],
});
