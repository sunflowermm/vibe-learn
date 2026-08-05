import { defineQuizSet } from '../schema.js';

/** Bloom 5 · 评价：给定工程标准选更好做法 */
export default defineQuizSet({
  id: 'concept-lang-evaluate',
  title: '评价 · 语言工程取舍',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '评价', '实践'],
  relatedNodes: ['lang-tech-selection', 'code-async', 'craft-security', 'lang-typescript'],
  caption: '可读、可维护、安全、可协作——有标准才评价。',
  questions: [
    {
      id: 'concept-lang-evaluate:eq',
      q: '以「少踩类型坑」为标准，相等比较？',
      choices: [
        { t: '业务优先 ===', ok: true, why: '避免 == 转换。' },
        { t: '一律用 ==', ok: false, why: '易踩坑。' },
        { t: '禁止任何比较', ok: false, why: '不可行。' },
        { t: '比较结果提交进 Git 密钥', ok: false, why: '无关。' },
      ],
      relatedNodes: ['lang-javascript'],
    },
    {
      id: 'concept-lang-evaluate:async',
      q: '以「可读异步流」为标准，更优？',
      choices: [
        { t: '用 Promise/async 扁平化控制流', ok: true, why: '告别回调地狱。' },
        { t: '层层嵌套回调且不处理错误', ok: false, why: '难维护。' },
        { t: '用死循环轮询替代全部异步', ok: false, why: '卡死循环。' },
        { t: '忽略所有 Promise 拒绝结果', ok: false, why: '埋雷。' },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-evaluate:secret',
      q: '以「密钥不进仓」为标准？',
      choices: [
        { t: '环境变量/密钥管理注入', ok: true, why: '勿提交。' },
        { t: '密钥写进前端 bundle', ok: false, why: '可被拿走。' },
        { t: '密钥提交 YAML 共享', ok: false, why: '进历史。' },
        { t: '密钥用文件名伪装', ok: false, why: '仍泄密。' },
      ],
      relatedNodes: ['data-env'],
    },
    {
      id: 'concept-lang-evaluate:select',
      q: '以「可交付」为标准，选型？',
      choices: [
        { t: '匹配场景与团队约束', ok: true, why: '热门其次。' },
        { t: '只追本周最热框架', ok: false, why: '缺约束。' },
        { t: '每种语言写一套主服', ok: false, why: '成本爆炸。' },
        { t: '禁止使用任何框架', ok: false, why: '过偏。' },
      ],
      relatedNodes: ['lang-tech-selection'],
    },
    {
      id: 'concept-lang-evaluate:ts',
      q: '以「上线行为可预期」理解 TS？',
      choices: [
        { t: '类型编译期，运行仍是 JS', ok: true, why: '勿当运行时检查。' },
        { t: '类型运行时永久强制', ok: false, why: '默认擦除。' },
        { t: '有 TS 可删全部测试', ok: false, why: '类型≠测试。' },
        { t: 'TS 替代进程与 HTTP', ok: false, why: '层不同。' },
      ],
      relatedNodes: ['lang-typescript'],
    },
    {
      id: 'concept-lang-evaluate:module',
      q: '以「可协作」为标准，组织代码？',
      choices: [
        { t: 'ESM 拆分模块与依赖', ok: true, why: '边界清晰。' },
        { t: '单文件全局变量堆砌', ok: false, why: '难协作。' },
        { t: '复制粘贴十份同逻辑', ok: false, why: '难同步。' },
        { t: '禁止任何 import', ok: false, why: '过偏。' },
      ],
      relatedNodes: ['code-modules'],
    },
  ],
});
