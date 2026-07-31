/** 异步 · 事件循环 · 并发正确性（对齐题库 js-async / eng-concurrency / interview-lang） */
export default `# 异步：Promise、事件循环与并发正确性

> **异步** = 这件事要等（网络、磁盘），但等的时候程序还可以干别的。  
> JS **单线程**跑你的代码，靠**事件循环**调度回调——**单线程 ≠ 没有竞态**。  
> 插件 \`async run(e)\`、HTTP、\`fetch\`、Agent 工具调用都会碰到。

## 本课你要带走

1. \`Promise\` / \`async\` / \`await\` 与「忘了 await」  
2. 事件循环直觉：同步 → 微任务 → 宏任务（\`setTimeout(0)\` 不立刻跑）  
3. \`Promise.all\` vs \`allSettled\`；超时用 \`AbortSignal.timeout\`  
4. 并发正确性：共享对象竞态、取消、TOCTOU  

---

## 1. 先认词

| 写法 | 白话 |
|------|------|
| **同步** | 一句做完才做下一句 |
| **异步** | 先下单，好了再叫你 |
| **Promise** | 「将来完成或失败」的占位收据 |
| **async** | 声明这个函数里可以用 \`await\`；**总是返回 Promise** |
| **await** | 等到 Promise 落地再往下；间隙里别的任务可能插入 |
| **事件循环** | 单线程调度：跑完同步，再清微任务，再取宏任务 |
| **微任务** | 如 \`Promise.then\` / \`await\` 后续；通常先于下一轮 \`setTimeout\` |
| **宏任务** | 如 \`setTimeout\`、部分 I/O 回调 |
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

本仓 Node：**超时用 \`AbortSignal.timeout(ms)\`**，禁止 \`node-fetch\`，不要手写 \`AbortController\`+\`setTimeout\` 拼超时。浏览器 Core www 用兼容封装。

---

## 2. 事件循环（面试开口）

\`\`\`flip
{"title":"事件循环翻卡","cards":[{"front":"setTimeout(fn, 0)","back":"尽快排队进宏任务，仍晚于当前同步与微任务"},{"front":"Promise.then","back":"微任务；通常先于下一轮 timeout"},{"front":"单线程","back":"主线程一次只跑一段 JS；不等于没有竞态"},{"front":"忘了 await","back":"变量是 Promise，不是最终值；后台仍可能在跑"}]}
\`\`\`

口述模板：

1. 当前调用栈上的**同步代码**先跑完  
2. 清空**微任务**队列（\`then\` / 多数 \`await\` 续体）  
3. 再取一个**宏任务**（如 \`setTimeout\` 回调）  
4. 因此 \`setTimeout(fn, 0)\` **不会**插队打断正在执行的同步函数  

---

## 3. 并行聚合：all / allSettled / race

| API | 语义 | 何时用 |
|-----|------|--------|
| \`Promise.all\` | **一个失败整体立刻 reject**；其余可能仍在跑 | 全部成功才有意义 |
| \`Promise.allSettled\` | **等全部结束**，带各自 fulfilled/rejected | 批量工具/API，要汇总部分失败 |
| \`Promise.race\` | **谁先结束用谁**（含先失败） | 超时竞速等（本仓更推荐 \`AbortSignal.timeout\`） |

\`\`\`javascript
const results = await Promise.allSettled([jobA(), jobB(), jobC()])
for (const r of results) {
  if (r.status === 'fulfilled') console.log(r.value)
  else console.error(r.reason)
}
\`\`\`

---

## 4. 并发正确性（必读）

| 坑 | 直觉 | 对策方向 |
|----|------|----------|
| **共享会话/缓存对象** | 两请求同时改同一内存对象 → 丢更新、半成品 | 隔离、队列、不可变快照 |
| **先查后写两段 await** | 中间可插入别的逻辑（TOCTOU） | 事务、条件写、版本号 |
| **客户端已断开仍跑重活** | 浪费 CPU/配额/锁 | 传播 \`AbortSignal\` / 取消令牌 |
| **读改写无锁** | 缓存计数丢增量 | 原子操作、单飞（singleflight） |

\`\`\`steps
{"title":"异步排错三问","steps":[{"title":"拿到的是值还是 Promise？","body":"忘了 await 是高频逻辑错，不是语法错"},{"title":"失败有没有 catch？","body":"reject 要用 try/catch 或 .catch，别吞"},{"title":"有没有共享可变状态？","body":"单线程也会竞态；会话/Map 先怀疑"}]}
\`\`\`

---

## 5. 实用口诀

1. \`await\` 写在 \`async\` 函数里（教学默认）  
2. 失败用 \`try/catch\` 或 \`.catch\`——**别吞掉**  
3. 能并行用 \`all\` / \`allSettled\`，别无脑串行干等  
4. 外部 HTTP：**必设超时**；取消要能传到下游  
5. 改共享对象前先问：会不会两个请求交错？  

\`\`\`quiz
{"title":"异步","questions":[{"q":"调用 async 函数却忘了 await，变量通常是？","choices":[{"t":"已经解析完毕的最终值","ok":false,"why":"还没等。"},{"t":"Promise","ok":true,"why":"收据还在。"},{"t":"必定语法错误","ok":false,"why":"能跑，只是拿错层。"}]},{"q":"JS 单线程是否等于没有竞态？","choices":[{"t":"是，绝对无竞态","ok":false,"why":"await 间隙可插入其它任务。"},{"t":"否，异步交错仍可能踩共享状态","ok":true,"why":"单线程≠无竞态。"},{"t":"只有多核才有 bug","ok":false,"why":"与核数无关。"}]},{"q":"Promise.all 里一个失败？","choices":[{"t":"自动忽略失败项","ok":false,"why":"那是 allSettled 一类语义。"},{"t":"整体以该原因 reject","ok":true,"why":"短路策略。"},{"t":"变成语法错误","ok":false,"why":"运行时行为。"}]}]}
\`\`\`

## 接到本仓

\`plugin\` 的 \`async run(e)\`、HTTP \`asyncHandler\`、工作流工具调用——异步错误进统一处理；长任务考虑取消；会话状态勿无锁乱改。

## 下一步

**读懂报错** — 异步失败时堆栈怎么读。  
配套刷题：\`概念 · JavaScript 与异步\`、\`工程 · 并发与异步正确性\`、\`大厂 · 语言与运行时\`。
`;
