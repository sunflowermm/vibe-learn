/** Node.js — 语言章上的运行时分类（非语言本体） */
export default `# Node.js（运行时 · 语言章分类）

> **分类：运行时（Runtime），不是一门编程语言，也不是 Web 框架。**  
> 语言是 **JavaScript**；框架是 Express / Nest / Vue 等；Node.js 是让 JS **在浏览器之外**执行的宿主（V8 + 系统 API）。  
> 本仓主服固定跑在 **Node.js ≥ 26**；装机见第一章；本课钉**分类与关系**。

## 本课你要带走什么

1. 为什么语言版图里要挂 Node，却不能说「Node 语言」  
2. Node / JavaScript / V8 / 浏览器 各管哪一层  
3. 和 Python、Java 等「语言 + 运行时」配对怎么对照  

---

## 1. 分类钉死

| 说法 | 对不对 | 理由 |
|------|--------|------|
| 「我学 Node 语言」 | **不对** | 没有独立的 Node 语法；写的仍是 JS（或编译成 JS 的 TS） |
| 「Node 是 JS 的服务端运行时」 | **对** | 提供文件、端口、进程等系统 API |
| 「会浏览器 JS = 会运维本仓」 | **不对** | 同语言、不同运行时；无 DOM，入口是 \`node app\` |
| 「主服语言是 Node」 | **口语可、严格不严谨** | 严格说：**语言 JS，运行时 Node** |

\`\`\`mermaid
flowchart LR
  JS[JavaScript 语言] --> V8[V8 引擎]
  V8 --> Browser[浏览器 · 含 DOM]
  V8 --> Node[Node.js · 含系统 API]
  Node --> XRK[本仓主服]
\`\`\`

---

## 2. 和其它「语言 ↔ 运行时」对照

| 语言 | 常见运行时 / VM | 本仓落点 |
|------|-----------------|----------|
| **JavaScript** | **Node.js**（另：Deno、Bun） | **主服** |
| TypeScript | 先编译/转译 → 仍进 Node（或浏览器） | 可选工具链 |
| Python | CPython 等 | pyserver |
| Java | JVM | jserver |
| C# | CLR / .NET | netserver |
| Go / Rust | 多编译为本地二进制 | goserver / rustserver |

**记法：** 语言版图收「写什么」；Node 卡片回答「主服这段 JS **在哪执行**」。

---

## 3. 与第一章、本仓的分工

| 课 | 回答什么 |
|----|----------|
| **第一章 · 运行时 Node.js** | 怎么装、\`node -v\`、自带 npm/npx、PATH |
| **本课（第二章）** | 分类：语言 vs 运行时；与 JS / V8 / 浏览器边界 |
| **接到本仓运行时** | \`engines\` ≥ 26、仅 pnpm、\`node app\` |
| **第四章 · 语言栈** | 主服 Node + 六语言子服 |

浏览器里的 Chrome / Edge 也用 **V8**，但那是**带 Blink 排版引擎的完整浏览器**；Node **只有 V8 + 系统绑定**，没有网页 DOM。部署时还要另装的 Playwright Chromium，见 **部署环境**。

## 下一步

- **JavaScript** — 语言本体与场景  
- **接到本仓运行时** — 版本与包管理契约  
- **部署环境** — Git · Node · Redis · 浏览器引擎清单  
`;
