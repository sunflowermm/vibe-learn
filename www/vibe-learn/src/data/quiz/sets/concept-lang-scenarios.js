import { defineQuizSet } from '../schema.js';

/** Bloom 3 · 应用：语言/运行时场景决策 */
export default defineQuizSet({
  id: 'concept-lang-scenarios',
  title: '场景 · 语言运行时落地',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '场景', '应用'],
  relatedNodes: ['code-async', 'code-read-errors', 'data-env', 'lang-typescript'],
  caption: '竞态、堆栈、密钥、选型——给场景选动作。',
  questions: [
    {
      id: 'concept-lang-scenarios:race',
      q: '两异步请求先后写同记录后写覆盖。宜？',
      choices: [
        { t: '串行化写入或加版本控制', ok: true, why: '消异步竞态。' },
        { t: '认定单线程绝无竞态', ok: false, why: '仍会覆盖。' },
        { t: '死循环空转等待最稳', ok: false, why: '卡死循环。' },
        { t: '改同步 I/O 竞态永消', ok: false, why: '非自动消失。' },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-scenarios:stack',
      q: 'Node 长堆栈定位业务 bug，优先？',
      choices: [
        { t: '看错误类型与己方代码帧', ok: true, why: '先读自己项目。' },
        { t: '堆栈越长越可忽略', ok: false, why: '仍含关键帧。' },
        { t: '只看框架最底层一帧', ok: false, why: '根因常在调用处。' },
        { t: '能高亮就等于已跑通', ok: false, why: '高亮≠成功。' },
      ],
      relatedNodes: ['code-read-errors'],
    },
    {
      id: 'concept-lang-scenarios:secret',
      q: 'API 密钥落盘更合理？',
      choices: [
        { t: '环境变量或密钥管理，勿进仓', ok: true, why: '防泄密。' },
        { t: '写 YAML 提交仓方便共享', ok: false, why: '密钥勿进仓。' },
        { t: '写进前端静态 JS 调试', ok: false, why: '可被拿走。' },
        { t: '用正则替代鉴权不保管钥', ok: false, why: '校验≠授权。' },
      ],
      relatedNodes: ['data-env', 'craft-security'],
    },
    {
      id: 'concept-lang-scenarios:select',
      q: '选型时比追热门更靠谱？',
      choices: [
        { t: '先看场景与团队约束', ok: true, why: '热门≠适合。' },
        { t: '只看薪资榜第一名', ok: false, why: '非唯一约束。' },
        { t: '栈等于一个框架缩写', ok: false, why: '栈是组合。' },
        { t: '编译语言可忽略运行时', ok: false, why: '部署仍相关。' },
      ],
      relatedNodes: ['lang-tech-selection'],
    },
    {
      id: 'concept-lang-scenarios:ts',
      q: 'TS 上线 Node 后类型通常？',
      choices: [
        { t: '编译擦除，运行仍是 JS', ok: true, why: '类型在编译期。' },
        { t: '运行时仍强制查类型', ok: false, why: '默认擦除。' },
        { t: '自动变成 Java 字节码', ok: false, why: '不是。' },
        { t: '有 TS 就不需要 Node', ok: false, why: '仍要运行时。' },
      ],
      relatedNodes: ['lang-typescript'],
    },
    {
      id: 'concept-lang-scenarios:timeout',
      q: '需要「尽快但非同步」调度回调，宜？',
      choices: [
        { t: 'setTimeout(fn,0) 进宏任务', ok: true, why: '等栈与微任务后。' },
        { t: '认定它会打断当前函数', ok: false, why: '不能打断同步。' },
        { t: '另起 OS 进程跑回调', ok: false, why: '同线程调度。' },
        { t: '保证早于所有 Promise.then', ok: false, why: '通常更晚。' },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-scenarios:eq',
      q: '比较用户 id 字符串与数字，业务宜？',
      choices: [
        { t: '统一类型后用 ===', ok: true, why: '避免 == 坑。' },
        { t: '一律用 == 更省事', ok: false, why: '隐式转换。' },
        { t: '先 JSON.stringify 再比', ok: false, why: '过重。' },
        { t: '比较结果写进前端密钥', ok: false, why: '无关且危险。' },
      ],
      relatedNodes: ['lang-javascript'],
    },
    {
      id: 'concept-lang-scenarios:async-err',
      q: 'async 里抛错要避免成未处理拒绝，宜？',
      choices: [
        { t: 'try/catch 或 .catch 处理', ok: true, why: '变成 rejected 需接。' },
        { t: '假定一定会同步杀进程', ok: false, why: '未必。' },
        { t: '靠运行时自动重试三次', ok: false, why: '无默认。' },
        { t: '错误会自动变 HTTP 200', ok: false, why: '无关。' },
      ],
      relatedNodes: ['code-async', 'code-read-errors'],
    },
  ],
});
