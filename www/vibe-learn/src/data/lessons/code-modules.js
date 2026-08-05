export default `# 模块（ESM）

> **模块** = 把代码拆成多个文件，互相 \`import\` / \`export\`。  
> 本仓主服是 **ESM**（ECMAScript Modules），不是老的 \`require\`（CommonJS）。  
> **学会之后**：能写两个文件互相引用并用 \`node\` 跑通；知道何时写 \`.js\` 后缀、何时不能用 \`#\` 别名。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| ESM | 会 import/export |
| 边界 | 知道模块边界帮助放码判断 |
| 本仓 | 有 package.json 的 core 慎用 # 别名 |
| 跟 Agent | 新文件说明模块用途 |

## 先认词

| 写法 | 白话 |
|------|------|
| **export** | 这个文件对外提供什么 |
| **import** | 从别的文件拿过来用 |
| **默认导出** | \`export default\`；导入时可自定名字 |
| **命名导出** | \`export function add\`；导入时 \`{ add }\` 名字要对上 |
| **相对路径** | \`./\` 当前目录、\`../\` 上一级 |
| **\`#utils/...\`** | 本仓根别名（仅根 \`package.json\` 的 \`imports\` 生效时） |
| **package.json type** | \`"type": "module"\` 时 \`.js\` 按 ESM 解析 |

## 最小动手

建两个文件（同目录），再 \`node app.js\`：

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
| \`./math.js\` | 相对当前文件（Node ESM **常要写 .js**） |
| \`../utils/x.js\` | 上一级 |
| \`#utils/...\` | 根 \`imports\` 别名；**有自己 package.json 的 Core 通常没有这套别名** |
| Core 引根 \`src/\` | 用**相对路径**指过去，勿瞎抄 \`#\` |

> 漏写 \`.js\` 时终端常这样炸（假）；对照上一表。

\`\`\`term
{"title":"ERR_MODULE_NOT_FOUND 形态","prompt":"$ ","env":"练习目录（演示）","steps":[{"type":"in","text":"node app.js"},{"type":"out","text":"Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/home/alice/Documents/math' imported from /home/alice/Documents/app.js\\nDid you mean to import ./math.js?"}]}
\`\`\`

\`\`\`shell
{"preset":"node-hello"}
\`\`\`

## 常见翻车

| 现象 | 先查 |
|------|------|
| \`ERR_MODULE_NOT_FOUND\` | 路径错、漏 \`.js\`、cwd 不对 |
| 默认/命名导出差一截 | \`import x\` vs \`import { x }\` 用反了 |
| \`require is not defined\` | 在 ESM 里写了 CommonJS；本仓主路径用 \`import\` |
| 循环依赖 | A↔B 互相 import，可能拿到\`undefined\` 导出——拆文件或推迟引用 |

\`\`\`diff
{"title":"命名导出怎么引？","ask":"math.js 有 export function add —— 哪边对？","badLabel":"常见错法","goodLabel":"正确写法","bad":"import add from './math.js'","good":"import { add } from './math.js'","why":"默认导出用无花括号；命名导出必须 \`{ add }\`。"}
\`\`\`

\`\`\`fill
{"title":"补全相对导入","caption":"Node ESM 常要写扩展名。","template":"import { add } from './math___'","answers":[".js"],"hint":"文件扩展名三个字符。"}
\`\`\`

\`\`\`flip
{"title":"模块翻卡","cards":[{"front":"为什么拆模块？","back":"好读、好测、避免一个文件塞天下"},{"front":"忘了写 .js？","back":"Node ESM 常报错找不到模块"},{"front":"import 和 require","back":"本仓用 import；别混用两套习惯"},{"front":"循环依赖","back":"A import B、B import A → 可能拿到未完成的导出"}]}
\`\`\`

\`\`\`quiz
{"title":"模块","questions":[{"q":"从 './math.js' 引入命名导出 add，写法更接近？","choices":[{"t":"import add from './math.js'","ok":false,"why":"那是默认导出写法。"},{"t":"import { add } from './math.js'","ok":true,"why":"花括号对应命名导出。"},{"t":"require('./math.js').add","ok":false,"why":"那是 CommonJS；本仓主路径是 ESM。"}]},{"q":"有自己 package.json 的 Core 引用根 src？","choices":[{"t":"继续用 #infrastructure","ok":false,"why":"子包通常无该别名。"},{"t":"用相对路径指向根目录 src","ok":true,"why":"项目约定。"},{"t":"只能复制粘贴代码","ok":false,"why":"过激。"}]}]}
\`\`\`

## 和 Agent 协作时

让 Agent 改文件前，先约定：**改哪些路径、是否允许新建模块、导入风格保持 ESM**。验收：你本机 \`node\` 入口仍能跑。

## 下一步

**异步** — 等网络/磁盘时别卡住整个故事。
## 导图2 · JavaScript / 构建 × 模块

> 工程接口；本仓 ESM。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **JavaScript** | 模块化 | 避免全局污染 |
| **构建** | 打包解析模块图 | www 与 Node 解析略有别 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
