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

\`\`\`javascript
async function load() {
  const res = await fetch('https://example.com', {
    signal: AbortSignal.timeout(5000),
  })
  const text = await res.text()
  return text.slice(0, 80)
}

load()
  .then((s) => console.log(s))
  .catch((err) => console.error(err))
\`\`\`

\`\`\`flip
{"title":"异步翻卡","cards":[{"front":"Promise","back":"将来完成或失败的占位"},{"front":"await","back":"在 async 函数里等 Promise 落地"},{"front":"超时","back":"Node 侧用 AbortSignal.timeout(ms)"},{"front":"忘了 await","back":"拿到的是 Promise 本身，不是结果"}]}
\`\`\`

1. \`await\` 写在 \`async\` 函数里  
2. 失败用 \`try/catch\` 或 \`.catch\`  
3. 并行：\`await Promise.all([a(), b()])\`

\`\`\`quiz
{"title":"异步","questions":[{"q":"在非 async 函数顶层直接写 await？","choices":[{"t":"通常合法到处都能写","ok":false,"why":"普通脚本顶层有限制；优先放进 async 函数。"},{"t":"应放在 async 函数内（或特定顶层模块场景）","ok":true,"why":"教学默认：async 里 await。"},{"t":"await 只能用于 console.log","ok":false,"why":"无关。"}]}]}
\`\`\`

## 下一步

**读懂报错** — 异步失败时堆栈怎么读。
`;
