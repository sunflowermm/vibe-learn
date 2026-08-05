export default `# Vue（框架）

> **分类：渐进式前端 UI 框架。不是语言。**  
> 宿主语言：**JavaScript / TypeScript**；运行环境：**浏览器**（源码经 Vite/Webpack 等打包）。  
> 本仓 **vibe-learn** 即 **Vue 3 + Vite** 实例，路径 \`core/vibe-learn-Core/www/vibe-learn/\`，经 \`sign.json\` 构建后挂到主服 \`/vibe-learn/\`。  
> **学会之后**：能说「语言 JS，框架 Vue，跑在浏览器」；并指出本仓 www 挂载路径，不把 Vue 写进主服 \`src/\`。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分类 | 拒绝「Vue 语言」；宿主是 JS/TS |
| 本仓落点 | \`core/*/www/<应用>/\` + \`sign.json\` → 静态挂载 |
| 边界 | 不把浏览器 API 当 Node 26；不把 Vue 塞进 Runtime \`src/\` |
| 对照 | 能口述 Vue vs React 选型各一句 |

## 本课你要带走什么

1. Vue **何时选、何时别选**，和 React / Angular 怎么口述对照  
2. 响应式、SFC、Composition API 等**框架特性**怎么讲清楚  
3. 在本仓里 **www + sign.json** 怎么挂页面（不是把 Vue 写进 \`src/\`）

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"Vue · 翻卡","cards":[{"front":"Vue","back":"渐进式前端框架；本仓 www 常见"},{"front":"框架边界","back":"不替代 DBMS / OS / 运行时"},{"front":"本仓 www","back":"静态前端挂 core/*/www/<应用名>"}]}
\`\`\`

### 1.1 Vue —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **中后台、运营台、内部工具** | 表单/表格/权限页多；SFC 与生态（Element Plus、Naive UI 等）成熟 |
| **团队偏中文文档、上手要快** | 官方中文文档完整；模板语法对 HTML 背景友好 |
| **渐进式接入老页面** | 可以只在一个 \`#app\` 上跑 Vue，不必整站重写 |
| **本仓 Core 的 www 前端** | vibe-learn 已验证：Vue 3 + Vite + \`sign.json\` 静态挂载 |
| **需要细粒度响应式 + 组合式逻辑** | \`ref/reactive\` + composable 按功能拆代码 |

### 1.2 Vue —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **强依赖 React 生态（Next/RSC、Remix 等）** | 换栈成本；元框架路线在 React 侧更集中 |
| **企业强制 Angular 规范（DI/RxJS 全家桶）** | 组织标准优先于个人偏好 |
| **纯静态文档站、几乎无交互** | 直接 HTML/CSS 或 Astro 可能更轻 |
| **把 Vue 源码写进主服 \`src/\`** | 违反 Core 边界；页面应进 \`core/*/www/\` |
| **在浏览器里当 Node 26 用** | 无 \`AbortSignal.timeout\` 等；须 \`xrk-www-compat\` 语义 |

### 1.3 与竞品对照（选型口述版）

| 维度 | Vue | React | Angular |
|------|-----|-------|---------|
| 定位 | 渐进式 UI 框架 | UI 库 + 自选栈 | 意见性全家桶 |
| 模板 | 模板 + 指令 | JSX 为主 | 模板 + TS |
| 状态 | Pinia / 组合式 | Redux/Zustand/Jotai… | RxJS + Services |
| 学习曲线 | 中等偏友好 | 库多、组合自由 | 陡、规范强 |
| 本仓挂载 | **vibe-learn 实例** | 同 www 流程 | 同 www 流程 |

\`\`\`mermaid
flowchart TB
  Need[要做浏览器 UI] --> Team{团队与规范?}
  Team -->|渐进/中文生态/本仓已有| Vue[Vue 3 + Vite]
  Team -->|React 栈/Next| React[React 生态]
  Team -->|企业 TS 全家桶| Ang[Angular]
  Need --> XRK{在 XRK 里?}
  XRK -->|是| WWW["core/*/www/ + sign.json"]
  XRK -->|否| Team
\`\`\`

---

## 2. 框架特性（讲清楚）

### 2.1 声明式渲染与 SFC

| 点 | 说明 |
|----|------|
| **SFC \`*.vue\`** | \`<template>\` + \`<script>\` + \`<style>\` 单文件组件 |
| **模板编译** | \`v-if\`、\`{{ }}\` 等编译为渲染函数；**不是**浏览器原生语法 |
| **指令** | \`v-if\`/\`v-for\`/\`v-bind\`/\`v-on\`/\`v-model\` — 框架层语法糖 |
| **\`v-if\` vs \`v-show\`** | 条件销毁/创建 DOM vs 仅 \`display\` 切换 |
| **scoped / :deep** | 样式隔离与穿透子组件 |

### 2.2 响应式系统（面试核心）

| 点 | 说明 |
|----|------|
| **依赖收集 track** | 渲染/computed **读**响应式数据时登记依赖 |
| **派发更新 trigger** | **写**数据时通知依赖，调度组件更新 |
| **Vue 2** | \`Object.defineProperty\`；新增属性需 \`Vue.set\` |
| **Vue 3** | **Proxy**；\`ref\`/\`reactive\`/\`readonly\`/\`computed\` |
| **\`ref\` vs \`reactive\`** | 基本类型、整对象替换用 ref；对象代理用 reactive |
| **模板自动解包** | 模板里 \`count\` 不用 \`.value\`；\`<script>\` 里要 |

\`\`\`mermaid
flowchart LR
  Read[读 ref/reactive] --> Track[track 依赖]
  Write[写] --> Trigger[trigger]
  Trigger --> Job[异步更新队列]
  Job --> Render[组件 re-render]
  Render --> Patch[patch DOM]
\`\`\`

### 2.3 调度与虚拟 DOM

| 点 | 说明 |
|----|------|
| **异步批量更新** | 同一 tick 多次改状态，合并为一次渲染 |
| **\`nextTick\`** | DOM 更新后再读布局/焦点/scrollHeight |
| **虚拟 DOM + patch** | 同层 diff；列表必须稳定 **\`key\`** |
| **Block tree（Vue 3）** | 静态节点提升，减少 diff 范围 |

### 2.4 Composition API

| 点 | 说明 |
|----|------|
| **\`setup\` / \`<script setup>\`** | 按功能聚合逻辑；vibe-learn 默认写法 |
| **生命周期** | \`onMounted\`/\`onUnmounted\`/\`onBeforeUpdate\`… |
| **\`watch\` / \`watchEffect\`** | 副作用；返回停止函数；卸载要清理 |
| **composable** | \`useXxx()\` 复用状态逻辑，替代 mixin |
| **\`defineProps\` / \`defineEmits\`** | 编译宏；类型推导（TS 项目） |

### 2.5 组件通信与路由

| 方式 | 场景 |
|------|------|
| props / emit | 父→子、子→父 |
| \`v-model\` | \`modelValue\` + \`update:modelValue\` 语法糖 |
| provide / inject | 跨多层，避免 prop 钻取 |
| Pinia | 全局状态（Vue 3 推荐） |
| Vue Router | SPA 路由；子路径部署设 \`createWebHistory('/应用名/')\` |

### 2.6 与原生 Web 的关系

Vue **不取代** HTML/CSS/JS：它**编排**它们。SEO、无障碍、首屏、样式层叠仍要懂 **HTML/CSS** 课；异步请求仍走浏览器 **fetch**（兼容层见 \`xrk-www-compat\`）。

---

## 3. 与本仓：www + sign.json 挂载（务必读懂）

XRK **不**把 Vue 运行时嵌进主服 \`src/\`；而是 Vue 工程**构建成静态文件**（或 dev 反代），由主服当网站挂出去。

### 3.1 目录约定

\`\`\`
core/vibe-learn-Core/www/vibe-learn/
  ├── package.json      # vue + vite 依赖
  ├── vite.config.js    # base 必须等于对外 mount 路径
  ├── sign.json         # 声明：构建 / 静态挂载 / 可选 HMR 反代
  ├── src/              # Vue 源码（框架层）
  └── dist/             # 构建产物（HTML/CSS/JS 语言层）
\`\`\`

浏览器访问：**\`/vibe-learn/\`** ← 对应 \`www\` 下文件夹名（或 \`sign.json\` 的 \`proxy.mount\`）。

### 3.2 sign.json 两种模式

| 模式 | 配置要点 | 主服行为 |
|------|----------|----------|
| **日常/生产（推荐）** | \`enabled: false\`，\`serve: "static"\`，\`staticRoot: "dist"\` | 缺 \`dist\` 则 \`pnpm build\`，然后挂 **dist** |
| **开发 HMR** | \`enabled: true\`，\`serve: "proxy"\`，\`port\` + \`command\` | 拉起 Vite dev，主服**反代**到该端口 |

vibe-learn 当前 \`sign.json\`：\`enabled: false\` + 挂 \`dist\` + \`proxy.mount: "/vibe-learn"\` + 缺产物时 \`pnpm build\`。

### 3.3 Vite base 必须对齐

子路径挂载时，资源必须是 \`/vibe-learn/assets/...\`，否则 CSS/JS 404。  
\`vite.config.js\` 的 \`base\` **=** \`proxy.mount\` **=** 浏览器路径前缀。

### 3.4 数据流（页面 vs 接口）

\`\`\`mermaid
flowchart TB
  Src[Vue 源码 src/] -->|pnpm build| Dist[dist HTML/CSS/JS]
  Dist --> Mount[mountCoreWwwStatic]
  Mount --> URL["浏览器 /vibe-learn/"]
  API[core/*/http + HttpResponse] --> URL
\`\`\`

| 层次 | 位置 | 说明 |
|------|------|------|
| **页面** | \`core/*/www/\` 产物 | Vue 编译后的静态资源 |
| **接口** | \`core/*/http/*.js\` | 同 Core 的 HTTP；前端按拍平规则解包 |
| **主服 Runtime** | \`src/\` | **不写** Vue 业务；Loader 扫描 Core |

### 3.5 新建 Vue 应用（最小步骤）

1. 新建 \`core/<你的Core>/www/<应用名>/\`，Scaffold Vue 3 + Vite  
2. 写 \`sign.json\`（可抄 vibe-learn，改 \`id\`、\`port\`、\`proxy.mount\`）  
3. \`vite.config.js\` → \`base: '/<应用名>/'\`  
4. Vue Router → \`createWebHistory('/<应用名>/')\`  
5. 重启主服 → 打开 \`http://<主服>/<应用名>/\`  
6. 需要数据时在同 Core 加 \`http/*.js\`，前端 \`fetch\` 调 API

**React / Angular / Next** 同理：都是「前端工程 → build 或反代 → 挂 www 路径」；差异在脚手架与是否 SSR（见各课）。

---

## 4. 和大厂面试怎么答

### 「Vue 是库还是框架？」

**框架（Framework）。** 它定组件生命周期、路由约定、编译流程，**在适当时机回调你的代码**（控制反转 IoC）。  
宿主语言：**JavaScript / TypeScript**；运行环境：**浏览器**（经 Vite/Webpack 打包）。  
与 **React**（官方偏 UI 库，组合更自由）对照：Vue 开箱更完整（SFC、指令、官方 Router/Pinia）。  
**本仓**：vibe-learn 即 **Vue 3 + Vite**，挂 \`core/vibe-learn-Core/www/vibe-learn/\`，**不是**写进主服 \`src/\`。

### 「Vue 3 响应式原理？」

核心：**Proxy** 代理对象 + **track**（读时收集依赖）+ **trigger**（写时通知更新）。  
对比 Vue 2 的 \`Object.defineProperty\`：Proxy 可监听新增属性、数组索引，无需 \`Vue.set\`。  
\`ref\` 包基本类型；\`reactive\` 包对象；模板里自动解包 \`.value\`。

### 「diff 和 key 干什么？」

虚拟 DOM 同层比较时，**key** 标识列表节点身份；错用 \`index\` 作 key，列表重排会导致输入框状态错位。  
Vue 3 **Block tree** 跳过静态子树，减少 diff 范围。

### 「Composition API 为何出现？」

按**功能**聚合逻辑（\`useXxx\` composable），替代 mixin 命名冲突；TypeScript 类型推导更友好。  
本仓 vibe-learn 默认 \`<script setup>\`。

### 「在本仓怎么部署 Vue？」

\`core/*/www/<应用>/\` + \`sign.json\`（静态挂 \`dist\` 或 dev 反代）+ \`vite.config.js\` 的 \`base\` 对齐 mount 路径。  
业务 API 在同 Core 的 \`http/\`，前端 \`fetch\` 按 **HttpResponse 拍平**规则解包。

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [vuejs/core](https://github.com/vuejs/core) | ⭐ 四万级 | Proxy 响应式、编译器、runtime | **www** 前端框架本体（如 vibe-learn） |
| [vitejs/vite](https://github.com/vitejs/vite) | ⭐ 七万级 | 开发服、\`base\`、构建产物 | \`sign.json\` + \`dist\` 静态挂载 |
| [vuejs/router](https://github.com/vuejs/router) | ⭐ 一万级 | history/\`base\`、嵌套路由 | mount 路径与 Router \`base\` 对齐 |

---

## 5. 下一步

- 语言：**JavaScript** · **TypeScript** · **HTML/CSS**  
- 对照前端：**React** · **Angular** · **Next.js**  
- 本仓挂载：**HTTP 与 www**  
- 后端接口形态：**Express/Nest**（Node 对照，非 www）  
- 可选：翻 Vite 的 \`base\` 配置说明，对照本仓 \`sign.json\` / mount 路径。
## 导图2 · 前端 / 组件 / JavaScript × Vue

> 导图2 前端区与本课同构。本仓 vibe-learn 即 Vue3+Vite 实例。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **前端** | 浏览器 UI | \`core/*/www/<应用>/\` 挂载；不进 \`src/\` |
| **组件** | SFC / 组合式 | 框架特性；宿主仍是 JS/TS |
| **JavaScript** | 宿主语言 | 拒绝「Vue 语言」 |
| **构建** | Vite 等 | 开发服与产物；上线静态挂或反代 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
