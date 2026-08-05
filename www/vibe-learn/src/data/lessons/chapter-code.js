export default `# 第一章半 · 编程基础（以 JS 动手）

> 环境装好了，还不会写程序——本框补这一刀。  
> 第二章语言版图是观光；**这里才是零基础主修**。  
> 语法口径跟 [MDN JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)（值与类型、控制流、函数、对象）；跑法则连回第一章 **Node**。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 跑通 | 自建 \`.js\`，\`node\` 打印预期 |
| 语法 | 能口述 \`const\`/\`let\`、\`===\`、\`Array.isArray\`、函数、引用 |
| 工程 | 会 \`import\`/\`export\`、\`async/await\` |
| 报错 | 堆栈落到自己的文件:行号 |
| 数据文字 | 手改 JSON/YAML；\`.env\` 不进 Git |

## 建议顺序（点课路径）

1. **第一程序** → **值与类型** → **控制流** → **函数** → **对象与数组**  
2. **模块** → **异步** → **读报错**  
3. **JSON / YAML / Markdown / env**（数据文字）  
4. （可选）正则 · TS 动手 → **过关练习** → 第二章语言观光  

\`\`\`mermaid
flowchart TB
  F[第一程序] --> V[值与类型]
  V --> C[控制流]
  C --> FN[函数]
  FN --> OA[对象与数组]
  OA --> M[模块]
  M --> A[异步]
  A --> E[读报错]
  E --> D[数据文字]
  D --> CK[过关]
  CK --> L2[第二章]
\`\`\`

| 本框课 | 官方锚点（深挖时） |
|--------|-------------------|
| 值与类型 | [数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures) · [相等比较](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness) |
| 控制流 | [控制流与错误处理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) · [for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) |
| 函数 | [函数指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions) |
| 对象与数组 | [使用对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_objects) |

刷题：\`编程基础脊骨\` · \`JavaScript 与异步\` · \`数据格式\` 等包与课文对齐。  
卡关时打开 **过关练习** 的分流树，回对应课补，不要跳进第二章框架名观光。
`;
