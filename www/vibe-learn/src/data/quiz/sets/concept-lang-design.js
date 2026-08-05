import { defineQuizSet } from '../schema.js';

/** Bloom 6 · 创造（MCQ 近似）：步骤/设计组合 */
export default defineQuizSet({
  id: 'concept-lang-design',
  title: '设计 · 运行时步骤组合',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '设计', '步骤组合'],
  relatedNodes: ['code-async', 'code-modules', 'data-env', 'lang-tech-stack'],
  caption: '选合法组合：异步、模块、密钥、选型。',
  questions: [
    {
      id: 'concept-lang-design:race',
      q: '修异步覆盖写，哪组更完整？',
      choices: [
        {
          t: '定位共享状态→串行/版本→补回归测试',
          ok: true,
          why: '根因+修复+防回归。',
        },
        {
          t: '认定无竞态→加死循环→删日志',
          ok: false,
          why: '更糟。',
        },
        {
          t: '改 CSS→提交密钥→升 latest',
          ok: false,
          why: '层不对。',
        },
        {
          t: '关事件循环→禁 Promise→忽略拒绝',
          ok: false,
          why: '不可行。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-design:module',
      q: '从大脚本迁模块，哪组合理？',
      choices: [
        {
          t: '划边界→export API→去全局副作用',
          ok: true,
          why: '封装与依赖图。',
        },
        {
          t: '更多全局量→禁止 import→复制十份',
          ok: false,
          why: '反模式。',
        },
        {
          t: '把密钥 bake 进模块→公开仓',
          ok: false,
          why: '泄密。',
        },
        {
          t: '用 UDP 传源码→跳过包管理',
          ok: false,
          why: '无关。',
        },
      ],
      relatedNodes: ['code-modules'],
    },
    {
      id: 'concept-lang-design:secret',
      q: '本地+CI 用密钥，哪组合规？',
      choices: [
        {
          t: '示例进仓，真密钥用环境与 CI Secrets',
          ok: true,
          why: '示例与秘密分离。',
        },
        {
          t: '真密钥提交 YAML 并打进前端包',
          ok: false,
          why: '全泄密。',
        },
        {
          t: '密钥改后缀当图片提交进公开仓',
          ok: false,
          why: '仍泄密。',
        },
        {
          t: '只用正则校验替代一切鉴权机制',
          ok: false,
          why: '不够。',
        },
      ],
      relatedNodes: ['data-env'],
    },
    {
      id: 'concept-lang-design:stack',
      q: '新服务选型，哪组步骤更稳？',
      choices: [
        {
          t: '列约束→比生态运维→小范围验证',
          ok: true,
          why: '约束驱动。',
        },
        {
          t: '只追热门→每种语言写主服→无验证',
          ok: false,
          why: '失控。',
        },
        {
          t: '忽略团队→禁框架→直接全量上线',
          ok: false,
          why: '风险高。',
        },
        {
          t: '把 MCU 当主服宿主→跳过 HTTP',
          ok: false,
          why: '职责错。',
        },
      ],
      relatedNodes: ['lang-tech-selection', 'lang-tech-stack'],
    },
    {
      id: 'concept-lang-design:async-api',
      q: '新 API 客户端异步调用，哪组更好？',
      choices: [
        {
          t: 'async 调用、统一错误处理并设超时',
          ok: true,
          why: '可读可控。',
        },
        {
          t: '嵌套回调、吞掉错误且不设超时',
          ok: false,
          why: '难维护。',
        },
        {
          t: '死循环等待响应并阻塞事件循环',
          ok: false,
          why: '卡死。',
        },
        {
          t: '密钥放查询串并做永久客户端缓存',
          ok: false,
          why: '危险。',
        },
      ],
      relatedNodes: ['code-async'],
    },
  ],
});
