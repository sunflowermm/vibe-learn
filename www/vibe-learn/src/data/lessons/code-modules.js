/** 模块（ESM） */
export default `# 模块（ESM）

> **模块** = 把代码拆成多个文件，互相 \`import\` / \`export\`。  
> 本仓主服是 **ESM**（ECMAScript Modules，现代官方模块制），不是老的 \`require\`。

## 先认词

| 写法 | 白话 |
|------|------|
| **export** | 这个文件对外提供什么 |
| **import** | 从别的文件拿过来用 |
| **默认导出** | \`export default\`；导入时可自定名字 |
| **命名导出** | \`export function add\`；导入时 \`{ add }\` 名字要对上 |
| **相对路径** | \`./\` 当前目录、\`../\` 上一级 |
| **\`#utils/...\`** | 本仓根别名（无 Core 级 package.json 时常见） |

\`\`\`javascript
// math.js
export function add(a, b) {
  return a + b
}
export default function main() {
  return add(1, 2)
}

// app.js
import main, { add } from './math.js'
console.log(main(), add(3, 4))
\`\`\`

| 写法 | 含义 |
|------|------|
| \`./math.js\` | 相对当前文件 |
| \`../utils/x.js\` | 上一级 |
| \`#utils/...\` | 本仓根别名 |

Node ESM 相对路径通常要写 \`.js\` 扩展名。

\`\`\`flip
{"title":"模块翻卡","cards":[{"front":"为什么拆模块？","back":"好读、好测、避免一个文件塞天下"},{"front":"忘了写 .js？","back":"Node ESM 常报错找不到模块"},{"front":"import 和 require","back":"本仓用 import；别混用两套习惯"}]}
\`\`\`

\`\`\`quiz
{"title":"模块","questions":[{"q":"从 './math.js' 引入命名导出 add，写法更接近？","choices":[{"t":"import add from './math.js'","ok":false,"why":"那是默认导出写法。"},{"t":"import { add } from './math.js'","ok":true,"why":"花括号对应命名导出。"},{"t":"require('./math.js').add","ok":false,"why":"那是 CommonJS；本仓主路径是 ESM。"}]}]}
\`\`\`

## 下一步

**异步** — 等网络/磁盘时别卡住整个故事。
`;
