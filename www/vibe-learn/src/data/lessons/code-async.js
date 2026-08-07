export default `# 异步：Promise、事件循环与并发正确性

> **异步** = 这件事要等（网络、磁盘），但等的时候程序还可以干别的。  
> JS **单线程**跑你的代码，靠**事件循环**调度回调——**单线程 ≠ 没有竞态**。  
> 口径对齐 [MDN · 使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises) 与本仓 Node 约定：超时用 \`AbortSignal.timeout\`。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| async/await | 会写；知道 \`async\` 函数**总是**返回 Promise |
| 事件循环 | 能口述：同步 → 微任务 → 宏任务；\`setTimeout(0)\` 不立刻跑 |
| 聚合 | 分清 \`Promise.all\` vs \`allSettled\` |
| 竞态 | 能举「两个 await 间隙改同一对象」的风险 |
| 跟 Agent | 异步报错贴完整堆栈（含 UnhandledRejection） |

上一课：**模块**。下一课：**读懂报错**。

\`\`\`term
{"title":"未处理的 Promise 拒绝","prompt":"$ ","steps":[{"type":"in","text":"node reject-demo.js"},{"type":"out","text":"node:internal/process/promises:288\\n            triggerUncaughtException(err, true /* fromPromise */);\\n            ^\\n\\n[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().] {\\n  code: 'ERR_UNHANDLED_REJECTION'\\n}\\n\\nNode.js v26.0.0"}]}
\`\`\`

---

## 1. 先认词

| 写法 | 白话 |
|------|------|
| **同步** | 一句做完才做下一句 |
| **异步** | 先下单，好了再叫你 |
| **Promise** | 「将来完成或失败」的占位收据 |
| **async** | 函数里可用 \`await\`；**总是返回 Promise** |
| **await** | 等到 Promise 落地再往下；间隙里别的任务可能插入 |
| **事件循环** | 单线程调度：跑完同步 → 清微任务 → 取宏任务 |
| **微任务** | \`Promise.then\` / 多数 \`await\` 续体 |
| **宏任务** | \`setTimeout\`、部分 I/O 回调 |
| **竞态** | 异步交错导致读改写乱序、丢更新 |

\`\`\`javascript
async function load() {
  try {
    const res = await fetch('https://example.com', {
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
    const text = await res.text()
    return text.slice(0, 80)
  } catch (err) {
    console.error(err)
    throw err
  }
}

load()
  .then((s) => console.log(s))
  .catch((err) => console.error('outer', err))
\`\`\`

本仓 Node：**超时用 \`AbortSignal.timeout(ms)\`**；禁止 \`node-fetch\`；不要手写 \`AbortController\`+\`setTimeout\` 拼超时。浏览器 Core www 用兼容封装（见 \`xrk-www-compat\`）。

---

## 2. 事件循环（面试开口）

口述模板：

1. 当前调用栈上的**同步代码**先跑完  
2. 清空**微任务**队列（\`then\` / 多数 \`await\` 续体）  
3. 再取一个**宏任务**（如 \`setTimeout\` 回调）  
4. 因此 \`setTimeout(fn, 0)\` **不会**插队打断正在执行的同步函数  

忘了 \`await\`：变量是 **Promise 收据**，不是最终值；后台仍可能在跑——逻辑错不是语法错。

---

## 3. 并行聚合

| API | 语义 | 何时用 |
|-----|------|--------|
| \`Promise.all\` | **一个失败整体立刻 reject**；其余可能仍在跑 | 全部成功才有意义 |
| \`Promise.allSettled\` | **等全部结束**，带各自 fulfilled/rejected | 批量工具，要汇总部分失败 |
| \`Promise.race\` | **谁先结束用谁**（含先失败） | 竞速；本仓超时更推荐 \`AbortSignal.timeout\` |

\`\`\`javascript
const results = await Promise.allSettled([jobA(), jobB(), jobC()])
for (const r of results) {
  if (r.status === 'fulfilled') console.log(r.value)
  else console.error(r.reason)
}
\`\`\`

---

## 4. 并发正确性

| 坑 | 直觉 | 对策方向 |
|----|------|----------|
| **共享会话/缓存** | 两请求同时改同一对象 → 丢更新 | 隔离、队列、不可变快照 |
| **先查后写两段 await** | 中间可插入别的逻辑（TOCTOU） | 事务、条件写、版本号 |
| **客户端已断开仍跑重活** | 浪费 CPU/配额 | 传播 \`AbortSignal\` |
| **读改写无锁** | 缓存计数丢增量 | 原子操作、单飞（singleflight） |

经典顺序（播放动画）：\`A\` → \`D\`（同步）→ \`B\`（微任务）→ \`C\`（宏任务）。细节见 **JavaScript** 课的事件循环动画。

\`\`\`steps
{"title":"异步排错三问","steps":[{"title":"拿到的是值还是 Promise？","body":"忘了 await 是高频逻辑错，不是语法错"},{"title":"失败有没有 catch？","body":"reject 要用 try/catch 或 .catch，别吞"},{"title":"有没有共享可变状态？","body":"单线程也会竞态；会话/Map 先怀疑"}]}
\`\`\`

## 实用口诀

1. \`await\` 写在 \`async\` 函数里（教学默认）  
2. 失败用 \`try/catch\` 或 \`.catch\`——**别吞掉**  
3. 能并行用 \`all\` / \`allSettled\`，别无脑串行干等  
4. 外部 HTTP：**必设超时**；取消要能传到下游  
5. 改共享对象前先问：会不会两个请求交错？  

\`\`\`quiz
{"title":"异步 · 场景","questions":[{"q":"调用 async 函数却忘了 await，变量通常是？","choices":[{"t":"已经解析完毕的最终值","ok":false,"why":"还没等。"},{"t":"Promise","ok":true,"why":"收据还在。"},{"t":"必定语法错误","ok":false,"why":"能跑，只是拿错层。"}]},{"q":"「JS 是单线程」是否就等于不会有竞态？","choices":[{"t":"是，绝对无竞态","ok":false,"why":"await 间隙可插入其它任务。"},{"t":"否，异步交错仍可能踩共享状态","ok":true,"why":"单线程≠无竞态。"},{"t":"只有多核才有 bug","ok":false,"why":"与核数无关。"}]},{"q":"Promise.all 里若有一个失败会怎样？","choices":[{"t":"自动忽略失败项","ok":false,"why":"那是 allSettled 一类语义。"},{"t":"整体以该原因 reject","ok":true,"why":"短路策略。"},{"t":"变成语法错误","ok":false,"why":"运行时行为。"}]}]}
\`\`\`

## 接到本仓

\`plugin\` 的 \`async run(e)\`、HTTP \`asyncHandler\`、工作流工具调用——异步错误进统一处理；长任务考虑取消；会话状态勿无锁乱改。

## 下一步

**读懂报错** — 异步失败时堆栈怎么读。  
配套刷题：\`概念 · JavaScript 与异步\`、\`工程 · 并发与异步正确性\`。
`;
