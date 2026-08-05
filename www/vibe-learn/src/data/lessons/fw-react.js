export default `# React（库 / 生态常当框架）

> **分类：UI 库（官方定位）；工程上常与路由/状态/构建工具组成「类框架栈」。不是语言。**  
> 宿主语言：**JavaScript / TypeScript**；运行环境：**浏览器**（JSX 编译为 JS）。  
> 挂到 XRK 的方式与 **Vue** 相同：**\`core/*/www/<应用>/\` + sign.json**，不是写进主服 \`src/\`。  
> **学会之后**：能说「语言 JS，UI 层 React（库/生态）」；本仓默认 www 是 Vue，React 作对照与可选挂载。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分类 | 官方库定位 + 工程类框架栈；不是语言 |
| 本仓落点 | 与 Vue 同：\`www\` + \`sign.json\`；默认学习站是 Vue |
| 边界 | Hooks/JSX 不替代 Node 主服；Next 是元框架另课 |
| 对照 | 能口述 React vs Vue 各一句选型理由 |

## 本课你要带走什么

1. React **何时选、何时别选**，和 Vue / Angular 怎么口述  
2. JSX、Hooks、调和/Fiber 等**特性**怎么讲清楚  
3. 在本仓 **www + sign.json** 怎么挂 React SPA（及与 Next 的分工）

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"React · 翻卡","cards":[{"front":"React","back":"UI 库/生态；组件与状态心智"},{"front":"框架边界","back":"不替代 DBMS / OS / 运行时"},{"front":"本仓 www","back":"静态前端挂 core/*/www/<应用名>"}]}
\`\`\`

### 1.1 React —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **团队已在 React 生态（Next、RN、设计系统）** | 组件、人才、库复用 |
| **高度自定义 UI、组件库自研** | 「只是 UI 库」→ 组合自由度大 |
| **跨端（Web + React Native）** | 一套 React 心智模型 |
| **元框架路线（Next.js、Remix）** | 官方/社区全栈方案多 |
| **本仓 www 里的 SPA** | Vite/CRA/RSBuild + \`sign.json\` 静态挂载 |

### 1.2 React —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **小团队只要快速中后台、偏中文文档** | Vue 上手与 Element 系生态可能更顺 |
| **企业强制 Angular 规范** | 组织标准优先 |
| **几乎无交互的静态站** | 纯 HTML 或 SSG 工具更轻 |
| **把 React 写进 \`src/infrastructure\`** | 违反 Core 边界 |
| **Hooks 规则不熟就上大型项目** | 闭包陷阱、依赖数组错误频发 |

### 1.3 与竞品对照（选型口述版）

| 维度 | React | Vue | Angular |
|------|-------|-----|---------|
| 官方形态 | UI 库 | UI 框架 | 全家桶框架 |
| 写法 | JSX 为主 | 模板 + SFC | 模板 + TS |
| 状态/路由 | 自选（Redux、Router…） | Pinia、Vue Router | 内置 RxJS 文化 |
| 元框架 | **Next.js** 等 | Nuxt | Universal 等 |
| 本仓 | www 同构挂载 | vibe-learn 实例 | www 同构挂载 |

\`\`\`mermaid
flowchart TB
  Need[浏览器 UI] --> Meta{要 SSR/全栈?}
  Meta -->|是| Next[Next.js 课]
  Meta -->|否 SPA| React[React + Vite]
  React --> WWW[core/*/www/ + sign.json]
  Need --> XRK{XRK 主服?}
  XRK -->|页面| WWW
  XRK -->|API| HTTP[core/*/http]
\`\`\`

---

## 2. 框架/库特性（讲清楚）

### 2.1 心智模型

\`\`\`
UI = f(state)
\`\`\`

状态变 → 函数组件重新执行 → 新元素树 → **Reconciler** diff → patch 真实 DOM。

| 点 | 说明 |
|----|------|
| **单向数据流** | props 下传；事件/upload 状态 |
| **不可变更新** | 新对象/新数组触发比较；直接改引用可能不更新 |
| **函数组件 + Hooks** | 现代默认；class 组件仍兼容但新项目少用 |

### 2.2 JSX

| 点 | 说明 |
|----|------|
| **语法糖** | \`<div />\` → \`jsx('div', props, children)\` |
| **不是 HTML** | \`className\`、\`htmlFor\`、\`onClick\` camelCase |
| **表达式** | \`{}\` 内是 JS；\`{items.map(...)}\` |
| **Fragment** | \`<>...</>\` 避免多余 DOM 包裹 |

### 2.3 Hooks（现代核心）

| Hook | 特性与陷阱 |
|------|------------|
| **\`useState\`** | 异步批更新；函数式 \`set(x => x+1)\` 避闭包旧值 |
| **\`useEffect\`** | 同步外部系统；**依赖数组**；返回清理防泄漏 |
| **\`useLayoutEffect\`** | 绘制前同步 DOM；防闪烁量布局 |
| **\`useRef\`** | \`.current\` 可变；改 ref **不**触发渲染 |
| **\`useMemo\` / \`useCallback\`** | 缓存；依赖错 = 白缓存 |
| **\`useContext\`** | 跨层；Provider 值变则消费者重渲染 |

**Rules of Hooks**：只在顶层调用；不在条件/循环里。  
**闭包陷阱**：effect 里读到旧 state → 函数式更新或 ref 存最新值。

### 2.4 调和与 Fiber

| 点 | 说明 |
|----|------|
| **虚拟 DOM** | 用对象描述 UI，便于 diff |
| **Fiber** | 可中断工作单元；时间切片、优先级 |
| **key** | 列表节点身份；错 key → 状态错位 |
| **批更新** | React 18 更多场景自动批处理 |
| **\`startTransition\`** | 标记低优先级更新（并发特性） |

\`\`\`mermaid
flowchart LR
  SetState[setState] --> Schedule[调度 Fiber]
  Schedule --> Reconcile[Reconciler diff]
  Reconcile --> Commit[Commit 写 DOM]
\`\`\`

### 2.5 受控与非受控

| 模式 | 做法 |
|------|------|
| **受控** | \`value\` + \`onChange\`，state 为唯一真相 |
| **非受控** | ref 读 DOM；文件输入常用 |

### 2.6 性能与架构

| 手段 | 说明 |
|------|------|
| 状态下沉 / 上提 | 减少无关子树重渲染 |
| \`React.memo\` | props 浅比较跳过渲染 |
| 拆 Context | 避免巨型 Provider 拖垮全树 |
| 路由级 code splitting | \`lazy\` + \`Suspense\` |

---

## 3. 与本仓：www + sign.json 挂载

React **不能**写进 \`src/\` 当页面；应放：

\`\`\`
core/<Core>/www/<应用名>/
  ├── package.json      # react + vite / rsbuild …
  ├── sign.json
  ├── vite.config.js    # base 对齐 mount
  ├── src/              # JSX/TSX
  └── dist/             # build 产物
\`\`\`

### 3.1 sign.json 两种模式

| 模式 | 配置 | 场景 |
|------|------|------|
| **静态挂载** | \`enabled: false\`，\`staticRoot: "dist"\` | SPA 日常与生产（最常见） |
| **HMR 反代** | \`enabled: true\`，\`port\` + \`command: dev\` | 本地热更新 |

主服 \`mountCoreWwwStatic\` 扫描 \`core/*-Core/www/**/sign.json\`；静态模式缺 \`dist\` 会按 \`build\` 字段执行构建。

### 3.2 Vite + React 必对齐项

1. \`base: '/<应用名>/'\` = \`proxy.mount\`  
2. React Router \`BrowserRouter\` → \`basename="/<应用名>"\`  
3. 调主服 API：相对路径或同主机；解包遵循 **HttpResponse 拍平**（有 \`json.data\` 用它，否则去 \`success\`/\`message\` 后剩余字段）  
4. 浏览器 API：\`xrk-www-compat\`（\`abortTimeout\` 等），**勿**当 Node 26 写

### 3.3 与 Next.js 的分工

| | 纯 React SPA | Next.js |
|--|--------------|---------|
| 渲染 | 浏览器 CSR | SSR/SSG/RSC 等 |
| 本仓挂载 |  mostly \`enabled:false\` 挂 dist | 常 \`enabled:true\` 反代 Node 进程 |
| 详见 | 本课 | **Next.js** 课 |

\`\`\`mermaid
flowchart LR
  ReactSrc[React 源码] --> Build[vite build]
  Build --> Dist[dist]
  Dist --> WWW["主服 /<应用名>/"]
  API[core/*/http] --> WWW
\`\`\`

与 **Vue** 课「最小步骤」完全对称：换脚手架与 Router \`basename\` 即可。

---

## 4. 和大厂面试怎么答

### 「React 是库还是框架？」

官方定位：**UI 库（Library）**——你组合组件、管理状态，框架感来自 Router/Redux/Next 等周边。  
宿主语言：**JavaScript / TypeScript**；运行环境：**浏览器**（JSX 编译为 JS）。  
与 **Vue**（渐进式 UI 框架，模板 + SFC 更开箱）对照：React 组合自由度大，选型责任在团队。  
**本仓**：www 可挂 React SPA（同 Vue 的 \`sign.json\` 流程）；vibe-learn 实例用 **Vue**，非 React。

### 「虚拟 DOM 一定更快吗？」

**不一定。** 价值在于跨平台抽象、批量更新、可预测的 diff；简单页面直接操作 DOM 可能更轻。  
Fiber 让渲染**可中断**，支持优先级与时间切片（React 18 并发特性）。

### 「useEffect 依赖数组怎么答？」

effect 同步外部系统（订阅、定时器、DOM）；**依赖数组**决定何时重跑。  
漏依赖 → 闭包读到旧 state；空数组 \`[]\` → 仅 mount 跑一次；乱填 → 无限循环。  
卸载时 return 清理函数，防泄漏。

### 「受控 vs 非受控组件？」

**受控**：\`value\` + \`onChange\`，React state 为唯一真相。  
**非受控**：ref 读 DOM（文件上传常用）。  
表单复杂场景优先受控，便于校验与提交。

### 「在本仓怎么挂 React？」

\`core/*/www/<应用>/\` + \`sign.json\` + Vite \`base\` 对齐 mount；Router \`basename\` 同步。  
API 走 \`core/*/http\`；浏览器用 \`xrk-www-compat\`，**勿当 Node 26**。

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [facebook/react](https://github.com/facebook/react) | ⭐ 二十万级 | Fiber、Hooks、并发渲染直觉 | **www** React 工程；API 仍走 \`http/\` |
| [remix-run/remix](https://github.com/remix-run/remix) | ⭐ 三万级 | loader/action、嵌套路由、表单 | 全栈路由对照；本仓挂载仍看 \`sign.json\` |
| [vitejs/vite](https://github.com/vitejs/vite) | ⭐ 七万级 | SPA 构建与 \`base\` | \`core/*/www/<应用>/\` → \`dist\` 静态挂 |

---

## 5. 下一步

- 语言：**JavaScript** · **TypeScript** · **HTML/CSS**  
- 元框架：**Next.js**  
- 对照：**Vue** · **Angular**  
- 本仓：**HTTP 与 www** · **Express/Nest**（后端对照）  
- 可选：打开 React 仓库「Docs」入口，再对照本仓 www 的 \`base\` / mount。
## 导图2 · 前端 / 组件 / JavaScript × React

> 与 Vue 同属前端 UI 库/框架层；宿主 JS/TS。本仓示例偏 Vue，概念对照即可。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **前端** | 组件化 UI | 可进 \`www/\`；同样不进 Runtime |
| **组件** | 函数组件 / hooks | 生态习惯与 Vue 不同，层同 |
| **JavaScript** | 宿主 | JSX 是语法扩展，不是新语言运行时 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
