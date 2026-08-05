import { defineQuizSet } from '../schema.js';

/** Bloom 2 · 理解：语言概念边界 */
export default defineQuizSet({
  id: 'concept-lang-understand',
  title: '理解 · 语言与框架边界',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '理解', '边界'],
  relatedNodes: ['lang-library-framework', 'fw-vue', 'fw-express-nest', 'lang-nodejs'],
  caption: '库≠框架，UI≠HTTP，主服≠子服语言。',
  questions: [
    {
      id: 'concept-lang-understand:lib-fw',
      q: '库与框架控制反转差别？',
      choices: [
        { t: '库你调用；框架回调你', ok: true, why: '控制流归属。' },
        { t: '框架等于一门新语言', ok: false, why: '建在语言上。' },
        { t: '库一定比框架慢', ok: false, why: '无必然。' },
        { t: '二者只是营销同义词', ok: false, why: '控制流不同。' },
      ],
      relatedNodes: ['lang-library-framework'],
    },
    {
      id: 'concept-lang-understand:ui-http',
      q: 'Vue/React 与 Express/Nest？',
      choices: [
        { t: '前者偏 UI，后者偏 HTTP 服务', ok: true, why: '分层不同。' },
        { t: 'Vue 是语言，Nest 是 OS', ok: false, why: '层级错。' },
        { t: '有前端框架就免 Node', ok: false, why: '主服仍要。' },
        { t: 'Express 只能写浏览器插件', ok: false, why: '服务端框架。' },
      ],
      relatedNodes: ['fw-vue', 'fw-express-nest'],
    },
    {
      id: 'concept-lang-understand:polyglot',
      q: '主服 Node 时 Python/Go 合理位置？',
      choices: [
        { t: '子服卸重活，不换主服宿主', ok: true, why: 'HTTP/契约协作。' },
        { t: '每种语言再写一套主服', ok: false, why: '勿多内核。' },
        { t: '有 Spring 就免进程概念', ok: false, why: '仍在进程上。' },
        { t: 'Shell 替代主服业务', ok: false, why: '脚本非宿主。' },
      ],
      relatedNodes: ['lang-python', 'lang-nodejs'],
    },
    {
      id: 'concept-lang-understand:stack',
      q: '「技术栈」更准确指？',
      choices: [
        { t: '语言+运行时+框架等组合', ok: true, why: '不是单缩写。' },
        { t: '只报一个框架缩写', ok: false, why: '过窄。' },
        { t: '等于薪资榜排名', ok: false, why: '无关。' },
        { t: '等于操作系统发行版', ok: false, why: '层不同。' },
      ],
      relatedNodes: ['lang-tech-stack'],
    },
    {
      id: 'concept-lang-understand:micro-macro',
      q: 'Promise.then 相对 setTimeout(0)？',
      choices: [
        { t: '通常微任务更先于该宏任务', ok: true, why: '队列优先级。' },
        { t: 'timeout(0) 必最早执行', ok: false, why: '常晚于微任务。' },
        { t: '二者都同步打断当前栈', ok: false, why: '不能打断同步。' },
        { t: 'then 会另起 OS 进程', ok: false, why: '同线程调度。' },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-understand:race',
      q: '单线程是否意味着无数据竞态？',
      choices: [
        { t: '否，异步交错仍可覆盖写', ok: true, why: '要串行/版本。' },
        { t: '是，单线程绝无竞态', ok: false, why: '异步仍交错。' },
        { t: '只有多核才有任何 bug', ok: false, why: '逻辑错也会。' },
        { t: '死循环等待即可消竞态', ok: false, why: '卡死事件循环。' },
      ],
      relatedNodes: ['code-async', 'code-functions'],
    },
  ],
});
