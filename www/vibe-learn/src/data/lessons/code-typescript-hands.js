/** TypeScript 动手入门 */
export default `# TypeScript 动手入门

> **TypeScript（TS）** = JavaScript + **类型标注**；编译（\`tsc\`）或构建工具转译后，运行时仍是 JS。  
> 本仓主服契约以 **JS** 为准；读开源示例、写更稳的工具/前端时，TS 很常见。  
> 观光：**第二章 · TypeScript**；本课只练最小动手。

## 为什么要类型

| JS | TS 多了什么 |
|----|-------------|
| 很多错到**运行时**才爆 | 编辑器 / \`tsc\` **先拦**一批 |
| 参数任意 | 可标注 \`number\`、\`string\`、接口 |
| 重构靠搜字符串 | 改名/签名有编译器帮忙 |

类型在编译后通常**擦除**——浏览器/Node 跑的还是 JS。

## 最小对照

\`\`\`typescript
function add(a: number, b: number): number {
  return a + b
}

const name: string = 'xrk'

interface User {
  id: number
  name: string
  email?: string // 可选
}

function label(u: User): string {
  return \`#\${u.id} \${u.name}\`
}
\`\`\`

\`\`\`flip
{"title":"TS 翻卡","cards":[{"front":"类型标注","back":"给编译器看的约束，运行时通常擦除"},{"front":"any","back":"放弃检查；能少则少"},{"front":"unknown","back":"先收着，用前要收窄类型"},{"front":"与本仓","back":"主服插件可用纯 JS；TS 需进构建链"}]}
\`\`\`

## 你会立刻碰到的词

| 词 | 白话 |
|----|------|
| \`interface\` / \`type\` | 描述对象形状 |
| \`?\` | 可选属性 |
| 联合 \`A \\| B\` | 可以是 A 或 B |
| \`as\` | 断言「我当它是某型」（慎用） |
| \`strict\` | \`tsconfig\` 严模式；建议新项目打开 |

## 建议练习

1. 打开 [TypeScript Playground](https://www.typescriptlang.org/play) 跑通上面 \`add\` / \`User\`  
2. 故意 \`add('1', 2)\`，看报错  
3. 给函数返回值去掉标注，悬停看**推断**  
4.（可选）本地 \`pnpm dlx typescript --init\` 后 \`tsc\` 编译一个小文件  

\`\`\`quiz
{"title":"TS","questions":[{"q":"浏览器直接执行 .ts 源文件？","choices":[{"t":"永远可以，浏览器内置 TS","ok":false,"why":"需编译/转译或特殊加载。"},{"t":"一般要先变成 JS（或走支持 TS 的运行时/捆绑）","ok":true,"why":"类型擦除后是 JS。"},{"t":"只有用 any 才能跑","ok":false,"why":"与是否能跑无关。"}]}]}
\`\`\`

## Coding Agent

\`\`\`prompt
目标：给这段 JS 工具函数补最小 TS 类型（参数与返回值），保持运行行为不变。
现场：代码=…
约束：不用 any；先给 interface/类型草案让我确认；说明本仓若保持 JS 应如何对照。
验收：Playground 或 tsc 无报错；展示一处被类型拦住的误用。
\`\`\`

## 下一步

回 **语言版图 · TypeScript** · 或继续 **最小贡献路径**（写插件仍可用纯 JS）。
`;
