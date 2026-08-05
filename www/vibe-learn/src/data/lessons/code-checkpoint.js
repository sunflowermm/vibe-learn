export default `# 过关练习 · 编程基础

> **自检通关**。全部勾完再进第二章版图 / 第四章最小路径。  
> 卡住：回对应课；或用沙箱先看「成功长什么样」。Agent 只许当教练（先提示再评审）。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 过关 | 通关表 8 项能独立勾完 |
| 综合 | 模块 + 异步 + 读错串起来 |
| 下一步 | 能说明：进第二章看版图，或进第四章最小贡献 |
| 跟 Agent | 教练模式；不要直接要答案 |

\`\`\`decide
{"title":"卡关了去哪补？","start":"start","steps":[{"id":"start","q":"缺哪块？","options":[{"label":"hello 都跑不过","next":"first"},{"label":"类型 / === / 分支搞不清","next":"basics"},{"label":"函数/模块搞不清","next":"fn"},{"label":"异步 / 报错看不懂","next":"err"},{"label":"JSON/YAML 总炸","next":"data"}]},{"id":"first","result":"回「第一个程序」+ node-hello 沙箱。","detail":"先文件后框架。"},{"id":"basics","result":"值与类型 → 控制流。","detail":"钉死 ===、Array.isArray、if / for...of。"},{"id":"fn","result":"函数 → 对象与数组 → 模块。","detail":"过关清单里对应项。"},{"id":"err","result":"异步 → 读懂报错。","detail":"贴完整堆栈。"},{"id":"data","result":"JSON / YAML 课。","detail":"先合法再谈业务字段。"}]}
\`\`\`

## 通关表

| # | 任务 | 完成标准 | 卡了回哪 |
|---|------|----------|----------|
| 1 | \`hello.js\` | \`node hello.js\` 打印一行 | **第一个程序** |
| 2 | \`stats.js\` | 数组求和/最大值；有函数 + \`const\` | 值与类型 · 函数 · 数组 |
| 3 | 拆模块 | 两文件 \`export\`/\`import\`，\`node\` 入口跑通 | **模块** |
| 4 | 异步 | 一次 \`async/await\`；成功打印或 \`catch\` 错误 | **异步** |
| 5 | JSON | \`JSON.parse\` 合法文本成功；非法文本进 \`catch\` | **JSON** |
| 6 | YAML | 改示例缩进仍合法（可用本仓任一份小 yaml 练） | **YAML** |
| 7 | 报错演练 | 故意写错；堆栈定位到自己的行并修好 | **读懂报错** |
| 8 | 密钥习惯 | 将提交内容里无真实 API Key / \`.env\` | **环境变量** |

## 建议最小实现（任务 2 形状）

不必抄答案；对照「长什么样」：

\`\`\`javascript
// stats.js — 形状示例（自己敲）
function sum(xs) {
  let total = 0
  for (const n of xs) total += n
  return total
}
function max(xs) {
  let m = xs[0]
  for (const n of xs) if (n > m) m = n
  return m
}
const nums = [3, 1, 4, 1, 5]
console.log(sum(nums), max(nums))
\`\`\`

## 模拟终端（任务 1 热身）

\`\`\`shell
{"preset":"node-hello"}
\`\`\`

真机请在自己的练习目录新建文件；沙箱只演示 \`console.log\` 形状。

\`\`\`check
{"title":"过关自勾","items":[{"id":"h","text":"hello.js 本机跑通"},{"id":"s","text":"stats.js 有函数与 const"},{"id":"m","text":"两个文件 import/export 跑通"},{"id":"a","text":"至少一次 async/await"},{"id":"j","text":"JSON.parse 成功一次 + 非法进 catch"},{"id":"y","text":"改过 YAML 缩进仍合法"},{"id":"e","text":"能根据堆栈找到自己的行"},{"id":"k","text":"没有真实密钥进将提交文件"}]}
\`\`\`

## Coding Agent 协作

\`\`\`prompt
目标：辅导我完成 stats.js（数组求和/最大值）。
现场：我当前代码如下：…（可先空）
约束：先给提示与思路，不要贴完整答案；等我贴代码后再评审；指出违反 const/函数拆分的地方。
验收：我能独立 node stats.js 跑通，并口述函数在做什么。
\`\`\`

提问地图：番外 **Vibe Coding 心智**。

## 出框（勾完再选路）

| 去向 | 何时选 | 先点哪 |
|------|--------|--------|
| **第二章 · 什么是语言** | 想搞清「语言 / 运行时 / 框架」观光版图 | \`lang-what-is-language\`（边：**再看语言版图**） |
| **第四章 · 最小贡献路径** | 急着往本仓写插件 | \`xrk-min-path\` |
| **番外 · 复杂度** | 想走面试算法轨 | \`dsa-complexity\` |
| 环境仍不稳 | hello / PATH 还抖 | 回第一章 **分层排障** |

**别跳**：没勾完过关表就去背 Vue / Spring 名字——第二章是观光，01.5 才是主修动手。
`;
