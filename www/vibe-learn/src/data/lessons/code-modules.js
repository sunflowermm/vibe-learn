export default `# 模块（ESM）

> **模块** = 把代码拆成多个文件，互相 \`import\` / \`export\`。  
> 口径对齐 [MDN · 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules) 与 [Node · ESM](https://nodejs.org/docs/latest/api/esm.html)：本仓主服是 **ESM**，不是老的 \`require\`（CommonJS）。相对路径导入在 Node 里**通常要写完整扩展名**（如 \`./math.js\`）。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| ESM | 两个文件互相 \`import\`/\`export\`，\`node\` 跑通 |
| 扩展名 | 漏 \`.js\` 能对上 \`ERR_MODULE_NOT_FOUND\` 形态 |
| 本仓 | 有 \`package.json\` 的 Core **不用** \`#\` 别名，改相对路径指根 \`src/\` |
| 跟 Agent | 新文件说明用途；导入风格保持 ESM |

上一课：**对象与数组**。下一课：**异步**。

---

## 先认词

| 写法 | 白话 |
|------|------|
| **export** | 这个文件对外提供什么 |
| **import** | 从别的文件拿过来用 |
| **默认导出** | \`export default\`；导入时可自定名字 |
| **命名导出** | \`export function add\`；导入时 \`{ add }\` 名字要对上 |
| **相对路径** | \`./\` 当前目录、\`../\` 上一级 |
| **\`#utils/...\`** | 本仓根 \`package.json\` 的 \`imports\` 别名 |
| **\`"type": "module"\`** | 最近的 \`package.json\` 声明后，\`.js\` 按 ESM 解析 |

---

## 1. 最小动手

同目录建两个文件，再 \`node app.js\`：

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
| \`./math.js\` | 相对当前文件；Node ESM **常要写 .js**（与 CJS \`require\` 自动补扩展名不同） |
| \`../utils/x.js\` | 上一级 |
| \`#utils/...\` | 仅根包 \`imports\` 生效时 |
| Core 引根 \`src/\` | **相对路径**；勿瞎抄 \`#\` |

> 漏写 \`.js\` 时终端常这样炸（假执行形态）：

\`\`\`term
{"title":"ERR_MODULE_NOT_FOUND 形态","prompt":"$ ","steps":[{"type":"in","text":"node app.js"},{"type":"out","text":"Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/alice/Documents/math' imported from /home/alice/Documents/app.js\\nDid you mean to import ./math.js?"}]}
\`\`\`

\`\`\`diff
{"title":"命名导出怎么引？","ask":"math.js 有 export function add —— 哪边对？","badLabel":"常见错法","goodLabel":"正确写法","bad":"import add from './math.js'","good":"import { add } from './math.js'","why":"默认导出用无花括号；命名导出必须 \`{ add }\`。"}
\`\`\`

\`\`\`fill
{"title":"补全相对导入","caption":"Node ESM 常要写扩展名。","template":"import { add } from './math___'","answers":[".js"],"hint":"文件扩展名三个字符。"}
\`\`\`

---

## 2. 常见翻车

| 现象 | 先查 |
|------|------|
| \`ERR_MODULE_NOT_FOUND\` | 路径错、漏 \`.js\`、cwd 不对 |
| 默认 / 命名导出差一截 | \`import x\` vs \`import { x }\` 用反了 |
| \`require is not defined\` | 在 ESM 里写了 CommonJS；本仓主路径用 \`import\` |
| 循环依赖 | A↔B 互相 import，可能拿到未完成的导出——拆文件或推迟引用 |

\`\`\`quiz
{"title":"模块 · 场景","questions":[{"q":"从 './math.js' 引入命名导出 add，写法？","choices":[{"t":"import add from './math.js'","ok":false,"why":"那是默认导出写法。"},{"t":"import { add } from './math.js'","ok":true,"why":"花括号对应命名导出。"},{"t":"require('./math.js').add","ok":false,"why":"CommonJS；本仓主路径是 ESM。"}]},{"q":"有自己 package.json 的 Core 引用根 src？","choices":[{"t":"继续用 #infrastructure","ok":false,"why":"子包通常无该别名。"},{"t":"用相对路径指向根目录 src","ok":true,"why":"项目约定。"},{"t":"只能复制粘贴代码","ok":false,"why":"过激。"}]}]}
\`\`\`

## 和 Agent 协作

约定：**改哪些路径、是否允许新建模块、导入保持 ESM**。验收：你本机 \`node\` 入口仍能跑。

## 下一步

**异步** — 等网络/磁盘时别卡住整个故事（\`async\`/\`await\`、事件循环）。
`;
