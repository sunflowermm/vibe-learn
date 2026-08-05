import { defineQuizSet } from '../schema.js';

/** Bloom 4 · 分析：运行时归因 */
export default defineQuizSet({
  id: 'concept-lang-analyze',
  title: '分析 · 运行时排障归因',
  kind: 'concept',
  domain: 'lang',
  tags: ['语言', '分析', '排障'],
  relatedNodes: ['code-async', 'code-read-errors', 'code-modules'],
  caption: '竞态、未处理拒绝、模块边界——先定层。',
  questions: [
    {
      id: 'concept-lang-analyze:overwrite',
      q: '日志显示后请求结果覆盖先请求。根因层？',
      choices: [
        { t: '异步交错写共享状态', ok: true, why: '竞态。' },
        { t: '主板内存颗粒损坏', ok: false, why: '过臆测。' },
        { t: 'DNS 解析失败', ok: false, why: '层不对。' },
        { t: 'CSS 选择器写错', ok: false, why: '无关。' },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-analyze:unhandled',
      q: '进程警告 UnhandledPromiseRejection。归因？',
      choices: [
        { t: 'Promise 拒绝未 catch', ok: true, why: '异步错误未接。' },
        { t: '缺少 package-lock', ok: false, why: '无关。' },
        { t: '端口被占用', ok: false, why: '另类报错。' },
        { t: '证书过期', ok: false, why: '层不对。' },
      ],
      relatedNodes: ['code-async', 'code-read-errors'],
    },
    {
      id: 'concept-lang-analyze:order',
      q: '同步代码跑完才见 timeout(0) 回调。说明？',
      choices: [
        { t: '宏任务排在当前栈之后', ok: true, why: '事件循环。' },
        { t: '定时器创建了新进程', ok: false, why: '同线程。' },
        { t: 'Node 禁止 setTimeout', ok: false, why: '支持。' },
        { t: '堆栈被操作系统截断', ok: false, why: '无关。' },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-analyze:typeerror',
      q: 'Cannot read properties of undefined。更可能？',
      choices: [
        { t: '对空值取了属性', ok: true, why: '查数据与可选链。' },
        { t: '磁盘 100% 写满', ok: false, why: '另类错误。' },
        { t: '防火墙拦了 443', ok: false, why: '无关。' },
        { t: 'pnpm 版本过新', ok: false, why: '非直接。' },
      ],
      relatedNodes: ['code-read-errors'],
    },
    {
      id: 'concept-lang-analyze:global',
      q: '大脚本改全局变量互相踩。缺哪层？',
      choices: [
        { t: '模块边界与作用域封装', ok: true, why: 'ESM 拆分。' },
        { t: '更多全局变量即可', ok: false, why: '更糟。' },
        { t: '关掉事件循环', ok: false, why: '不可行。' },
        { t: '改成 UDP 传模块', ok: false, why: '无关。' },
      ],
      relatedNodes: ['code-modules'],
    },
    {
      id: 'concept-lang-analyze:leak',
      q: '前端包里搜到 API Key。归因？',
      choices: [
        { t: '密钥被打进浏览器产物', ok: true, why: '应服务端/密钥管理。' },
        { t: 'JSON 格式本身不安全', ok: false, why: '格式≠泄密。' },
        { t: '=== 比较导致泄露', ok: false, why: '无关。' },
        { t: '闭包语法强制上传密钥', ok: false, why: '无此说。' },
      ],
      relatedNodes: ['data-env', 'craft-security'],
    },
  ],
});
