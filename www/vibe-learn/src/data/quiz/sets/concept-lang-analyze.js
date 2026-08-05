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
      q: '日志显示后请求的结果覆盖了先请求写入的同一字段。根因更可能在哪层？',
      choices: [
        {
          t: '异步交错写共享状态（丢失更新/竞态）',
          ok: true,
          why: '先定「共享可变状态 + 无串行」这一层。',
        },
        {
          t: 'DNS 把域名解析到了错误 IP，导致写到别的环境',
          ok: false,
          why: 'DNS 错通常是连错主机；本症状是同记录覆盖写。',
        },
        {
          t: 'CSS 选择器写错，浏览器重绘时改了后端数据库',
          ok: false,
          why: '样式层不会直接改服务端记录。',
        },
        {
          t: '主板内存颗粒物理损坏，随机翻写字段',
          ok: false,
          why: '过臆测；应先查应用层竞态与并发写入。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-analyze:unhandled',
      q: '进程出现 UnhandledPromiseRejection 警告。更直接的归因？',
      choices: [
        {
          t: '某个 Promise 进入 rejected，且没有 catch/try 接住',
          ok: true,
          why: '异步错误未处理；去找漏掉的 await 错误路径。',
        },
        {
          t: '缺少 package-lock / pnpm-lock，安装图不完整',
          ok: false,
          why: '锁文件问题通常表现为装包失败，不是该警告。',
        },
        {
          t: '监听端口已被其它进程占用',
          ok: false,
          why: '端口占用是 EADDRINUSE 一类，不是未处理拒绝。',
        },
        {
          t: 'TLS 证书过期导致握手失败',
          ok: false,
          why: '证书问题会有明确握手/证书错误；需另查是否未 catch。',
        },
      ],
      relatedNodes: ['code-async', 'code-read-errors'],
    },
    {
      id: 'concept-lang-analyze:order',
      q: '同步函数整段跑完后，才看到 setTimeout(fn, 0) 的回调。说明？',
      choices: [
        {
          t: '宏任务排在当前调用栈清空之后，不能打断同步代码',
          ok: true,
          why: '事件循环基本规则。',
        },
        {
          t: '定时器创建了新的操作系统进程来执行回调',
          ok: false,
          why: '同线程调度，不是新进程。',
        },
        {
          t: 'Node 运行时禁止使用 setTimeout，回调被静默丢弃后又重放',
          ok: false,
          why: 'Node 支持 setTimeout；延迟是调度顺序，不是禁止。',
        },
        {
          t: '操作系统截断了 JS 堆栈，被迫延后所有定时器',
          ok: false,
          why: '与「栈后再跑宏任务」的正常模型不符。',
        },
      ],
      relatedNodes: ['code-async'],
    },
    {
      id: 'concept-lang-analyze:typeerror',
      q: '看到 Cannot read properties of undefined。更可能？',
      choices: [
        {
          t: '对 undefined/null 取了属性——先核对数据与可选链',
          ok: true,
          why: '读类型+行号，再追数据来源。',
        },
        {
          t: '磁盘已 100% 写满，文件系统开始返回 undefined',
          ok: false,
          why: '磁盘满多是 ENOSPC；不是典型 TypeError 文案。',
        },
        {
          t: '防火墙拦了 443，浏览器把阻断翻译成 undefined 属性错误',
          ok: false,
          why: '网络阻断是另一类错误；本报错指向空引用取值。',
        },
        {
          t: 'pnpm 大版本过新，安装器会改写业务对象为 undefined',
          ok: false,
          why: '包管理器版本问题通常装包/解析失败，不直接制造该 TypeError。',
        },
      ],
      relatedNodes: ['code-read-errors'],
    },
    {
      id: 'concept-lang-analyze:global',
      q: '多个大脚本互相改写全局变量、行为难以预测。缺的是哪一层？',
      choices: [
        {
          t: '模块边界与作用域封装（用 ESM 拆分、显式导出）',
          ok: true,
          why: '减少隐式共享与踩踏。',
        },
        {
          t: '再声明更多全局变量，让「共享面」更完整',
          ok: false,
          why: '全局更多只会更糟。',
        },
        {
          t: '关掉事件循环，改为纯同步批处理消除耦合',
          ok: false,
          why: '不可行；也解决不了全局可变状态。',
        },
        {
          t: '改成用 UDP 广播源码模块，绕过 import 机制',
          ok: false,
          why: '与模块封装无关，还引入网络复杂度。',
        },
      ],
      relatedNodes: ['code-modules'],
    },
    {
      id: 'concept-lang-analyze:leak',
      q: '在前端打包产物里搜到了可用的 API Key。归因？',
      choices: [
        {
          t: '密钥被打进浏览器可下载产物——应改走服务端或密钥管理',
          ok: true,
          why: '前端包对用户可见；密钥边界在服务端。',
        },
        {
          t: 'JSON 文本格式本身不安全，任何 JSON 都会泄漏密钥',
          ok: false,
          why: '格式≠泄密；是把秘密放进了公开产物。',
        },
        {
          t: '使用 === 严格比较会触发打包器上传密钥',
          ok: false,
          why: '比较运算符与密钥泄漏无关。',
        },
        {
          t: '闭包语法会强制把环境变量序列化进所有 chunk',
          ok: false,
          why: '无此机制；泄漏来自错误地把秘密打进前端。',
        },
      ],
      relatedNodes: ['data-env', 'craft-security'],
    },
  ],
});
