/** 异步 */
export default `# 异步：Promise 与 async/await

> **异步** = 这件事要等（网络、磁盘），但等的时候程序还可以干别的。  
> JS 用**事件循环**：等待时去干别的，就绪再继续。插件里的 \`async run(e)\`、HTTP 请求都会碰到。

## 先认词

| 写法 | 白话 |
|------|------|
| **同步** | 一句做完才做下一句（像排队付款） |
| **异步** | 先下单，好了再叫你（像取餐号） |
| **Promise** | 「将来完成或失败」的占位收据 |
| **async** | 声明这个函数里可以用 \`await\` |
| **await** | 等到 Promise 落地再往下走 |
| **I/O** | Input/Output：读写网络、文件等 |
| **微任务** | Promise 回调排队方式（进阶；知道「先 then 再下一宏任务」即可） |

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

本仓 Node：**超时用 \`AbortSignal.timeout(ms)\`**，不要手写 \`AbortController\`+\`setTimeout\` 拼超时。浏览器 Core www 用兼容封装（见 www 约定）。

\`\`\`flip
{"title":"异步翻卡","cards":[{"front":"Promise","back":"将来完成或失败的占位"},{"front":"await","back":"在 async 函数里等 Promise 落地"},{"front":"超时","back":"Node 侧用 AbortSignal.timeout(ms)"},{"front":"忘了 await","back":"拿到的是 Promise 本身，不是结果"},{"front":"Promise.all","back":"并行等多个；一个失败则整体失败"}]}
\`\`\`

## 实用口诀

1. \`await\` 写在 \`async\` 函数里（教学默认）  
2. 失败用 \`try/catch\` 或 \`.catch\`——**别吞掉**  
3. 并行：\`await Promise.all([a(), b()])\`；要「谁先好要谁」用 \`Promise.race\`  
4. 连续 \`await\` = 串行；能并行就别干等  

\`\`\`quiz
{"title":"异步","questions":[{"q":"在非 async 函数顶层直接写 await？","choices":[{"t":"通常合法到处都能写","ok":false,"why":"普通脚本顶层有限制；优先放进 async 函数。"},{"t":"应放在 async 函数内（或特定顶层模块场景）","ok":true,"why":"教学默认：async 里 await。"},{"t":"await 只能用于 console.log","ok":false,"why":"无关。"}]},{"q":"const p = fetch(...); 没有 await，p 是？","choices":[{"t":"已经是响应正文","ok":false,"why":"还没等。"},{"t":"Promise","ok":true,"why":"收据还在。"},{"t":"一定报错","ok":false,"why":"合法，只是你拿错层。"}]}]}
\`\`\`

## 接到本仓

\`plugin\` 的 \`async run(e)\`、HTTP \`asyncHandler\`——异步错误要进统一错误处理，别只 \`console.log\`。

## 下一步

**读懂报错** — 异步失败时堆栈怎么读。
`;
