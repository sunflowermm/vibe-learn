/** Next.js — 场景 + 特性 + 本仓 www/反代挂载（加厚） */
export default `# Next.js（元框架）

> **分类：基于 React 的全栈 / SSR 元框架。不是语言。**  
> 层次：**JavaScript/TypeScript（语言）→ React（UI 库）→ Next.js（路由、渲染、部署约定）**。  
> 本仓挂载：仍在 \`core/*/www/<应用>/\`，但 SSR 场景常走 **sign.json 反代 Node 进程**，而非纯静态 dist。

## 本课你要带走什么

1. Next **何时选、何时别用**，和纯 React SPA / Nuxt 怎么口述  
2. App Router、CSR/SSR/SSG/RSC 等**特性**  
3. 在本仓 **www + sign.json** 的两种挂法（静态 export vs 反代）

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"Next.js · 翻卡","cards":[{"front":"Next.js","back":"React 元框架；路由/SSR 等"},{"front":"框架边界","back":"不替代 DBMS / OS / 运行时"},{"front":"本仓 www","back":"静态前端挂 core/*/www/<应用名>"}]}
\`\`\`

### 1.1 Next.js —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **SEO、分享预览、首屏要快** | SSR/SSG 在服务端出 HTML |
| **React 栈且要同仓 API** | Route Handlers / Server Actions |
| **文件系统路由、约定式结构** | \`app/\` 或 \`pages/\` 即路由 |
| **边缘中间件** | 鉴权、重写、A/B、多租户 |
| **本仓 www 里要 SSR 的 React 应用** | \`sign.json\` \`enabled:true\` 反代 \`next dev/start\` |

### 1.2 Next.js —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **纯内网 SPA、无 SEO 诉求** | 纯 React + Vite 静态挂载更简单 |
| **团队只会 Vue、不想 React** | 换栈成本；看 **Vue** / Nuxt 对照 |
| **静态托管、不想跑 Node 进程** | 完整 SSR 需常驻 Node；或 \`output:'export'\` 但能力受限 |
| **把 Next 塞进主服 \`src/\` 替代 Runtime** | 违反边界；Next 是独立 www 工程 |
| **与 XRK 主服 API 混在一个 Next 里替代 Core** | 业务 HTTP 仍应 \`core/*/http\` + HttpResponse |

### 1.3 与竞品对照（选型口述版）

| 维度 | Next.js | 纯 React SPA | Nuxt（Vue 侧） |
|------|---------|--------------|----------------|
| 基础 UI | React | React | Vue |
| 路由 | 文件系统 | React Router 等 | 文件系统 |
| SSR/SSG | 内置 | 需自建或不用 | 内置 |
| 本仓静态 | \`output:'export'\` 可挂 dist | \`enabled:false\` 挂 dist | 同 Next 思路 |
| 本仓 SSR | \`enabled:true\` 反代 | 不适用 | 反代 |

\`\`\`mermaid
flowchart TB
  Need[React 全栈] --> SEO{要 SEO/首屏 HTML?}
  SEO -->|强| Next[Next.js]
  SEO -->|否| SPA[React + Vite SPA]
  Next --> Mount{本仓部署}
  Mount -->|静态 export| Static[sign.json 挂 out/dist]
  Mount -->|SSR| Proxy[sign.json 反代 3000]
\`\`\`

---

## 2. 框架特性（讲清楚）

### 2.1 路由体系

| 点 | 说明 |
|----|------|
| **Pages Router（旧）** | \`pages/*.tsx\` → 路由；\`getServerSideProps\` 等 |
| **App Router（新）** | \`app/\` 目录；layout、loading、error 嵌套 |
| **动态路由** | \`[id]\`、\`[...slug]\`、路由组 \`(marketing)\` |
| **并行/拦截路由** | 高级 UI 模式（modal 等） |

### 2.2 渲染模式

| 模式 | 谁生成 HTML | 典型场景 |
|------|-------------|----------|
| **CSR** | 浏览器 | 强交互、SEO 不敏感 |
| **SSR** | 每请求服务端 | 个性化、实时数据 |
| **SSG** | 构建时 | 文档、营销页 |
| **ISR** | SSG + 按路径再生 | 内容站、电商列表 |
| **RSC** | Server Components 在服务端 | 减客户端 JS；App Router 默认方向 |

\`\`\`mermaid
flowchart LR
  Req[请求] --> Mode{渲染策略}
  Mode --> SSR[服务端 render]
  Mode --> SSG[读预生成 HTML]
  Mode --> CSR[壳 + 客户端 hydrate]
  SSR --> HTML[HTML 响应]
  SSG --> HTML
  CSR --> HTML
\`\`\`

### 2.3 数据与后端能力

| 点 | 说明 |
|----|------|
| **Route Handlers** | \`app/api/.../route.ts\` REST 风格 |
| **Server Actions** | 服务端突变；表单直连（形态随版本演进） |
| **\`fetch\` 缓存** | Next 扩展缓存/revalidate 语义 |
| **Middleware** | \`middleware.ts\` 边缘执行；鉴权重写 |

### 2.4 与纯 React 的分工

React 只管 **UI 组件树**；Next 管 **如何出 HTML、如何分服务端/客户端组件、如何部署、如何写同仓 API**。学 Next 前应先有 **React** 课基础。

### 2.5 部署相关

| 点 | 说明 |
|----|------|
| **\`basePath\`** | 子路径部署必设；对齐 XRK mount |
| **\`output: 'export'\`** | 纯静态导出；无服务端动态能力 |
| **Image Optimization** | 静态 export 时行为受限 |
| **环境变量** | \`NEXT_PUBLIC_\` 前缀进客户端 bundle |

---

## 3. 与本仓：www + sign.json（两种挂法）

Next 仍是 **www 前端工程**；**不是**子服后端。与 Spring/pyserver 不同。

### 3.1 方式 A：静态导出 → 挂 dist/out

适用：\`output: 'export'\`、无 SSR 动态需求。

| 步骤 | 内容 |
|------|------|
| \`next.config\` | \`output: 'export'\`，\`basePath: '/<应用名>'\` |
| 构建 | \`pnpm build\` → \`out/\` 或配置的目录 |
| \`sign.json\` | \`enabled: false\`，\`staticRoot\` 指向输出目录 |
| 访问 | \`http://<主服>/<应用名>/\` |

限制：无 SSR、部分 API/图片优化不可用。

### 3.2 方式 B：SSR / 完整 Next → 反代（更常见）

\`\`\`json
{
  "enabled": true,
  "serve": "proxy",
  "command": "pnpm",
  "args": ["dev"],
  "port": 3000,
  "proxy": { "mount": "/<应用名>" },
  "build": { "command": "pnpm", "args": ["build"] }
}
\`\`\`

| 项 | 说明 |
|----|------|
| 主服行为 | 拉起 Next 进程，把 \`/<应用名>\` **反向代理**到本机端口 |
| 生产 | \`next start\` 或 \`args: ["start"]\` 同理 |
| \`basePath\` | 必须与 \`proxy.mount\` 一致 |

\`\`\`mermaid
flowchart LR
  Browser --> Main[主服 AgentRuntime]
  Main -->|proxy /应用名| Next[Next Node 进程]
  Main -->|可选| API[core/*/http HttpResponse]
  Next --> Browser
\`\`\`

### 3.3 与主服 API 协作

| 层次 | 位置 |
|------|------|
| Next 页面/SSR | \`core/*/www/<应用>/\` |
| XRK 业务 API | \`core/*/http/*.js\`（推荐） |
| 勿混淆 | Next Route Handler 是 Next 进程内 API；XRK Core API 是主服 Loader 扫描的 \`http/\` |

细节：**HTTP 与 www** · \`docs/www-mount.md\`。Vue 侧元框架对照：**Nuxt**（本图谱不单开节点）。

---

## 4. 和大厂面试怎么答

### 「Next.js 是库还是框架？」

**元框架（Meta-framework）**——基于 **React**（UI 库），额外提供路由、渲染模式、部署约定，**IoC 程度高于纯 React**。  
层次：JavaScript/TypeScript（语言）→ React（UI）→ Next.js（全栈约定）。  
与 **纯 React SPA**（客户端 CSR）对照：Next 内置 **SSR**（Server-Side Rendering，服务端渲染）/ **SSG**（Static Site Generation，静态站点生成）。  
**本仓**：www 工程；静态 export 挂 \`dist\`，完整 SSR 用 \`sign.json\` 反代 Next 进程；vibe-learn 用 **Vue**，非 Next。

### 「SSR vs SSG vs CSR？」

| 模式 | 全称 | 谁生成 HTML | 典型场景 |
|------|------|-------------|----------|
| **CSR** | Client-Side Rendering（客户端渲染） | 浏览器 JS 渲染 | 强交互、SEO 不敏感的内网 SPA |
| **SSR** | Server-Side Rendering（服务端渲染） | 每请求在服务端生成 | 个性化、实时数据、SEO |
| **SSG** | Static Site Generation（静态站点生成） | 构建时预生成 HTML | 文档、营销页 |

**SPA**（Single Page Application，单页应用）常配合 CSR；Next 可同时支持多种模式。

### 「RSC 是什么？」

**RSC**（React Server Components，React 服务端组件）：默认在服务端执行，减客户端 JS bundle；App Router 默认方向。  
与 **SSR** 区别：RSC 组件可不进客户端 bundle，专注数据与静态结构。

### 「在本仓怎么挂 Next？」

方式 A：\`output: 'export'\` + \`sign.json\` 静态挂 \`out/\`（无 SSR）。  
方式 B：\`enabled: true\` 反代 \`next dev/start\`，\`basePath\` 对齐 mount。  
XRK 业务 API 仍推荐 \`core/*/http\`，勿用 Next Route Handler 替代 Core 契约。

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [vercel/next.js](https://github.com/vercel/next.js) | ⭐ 十三万级 | App Router、RSC、\`basePath\` | **www** 静态 export 或 SSR 反代 |
| [facebook/react](https://github.com/facebook/react) | ⭐ 二十万级 | React 运行时与 Hooks | Next 的底层；本仓 UI 仍挂 \`www/\` |
| [vercel/swr](https://github.com/vercel/swr) | ⭐ 三万级 | 客户端数据获取与缓存 | 调本仓 \`http/\` API 的前端模式 |

---

## 5. 下一步

- 基础：**React** · **TypeScript** · **JavaScript**  
- Node 后端对照：**Express/Nest**  
- 前端挂载：**HTTP 与 www** · **Vue**（静态挂载对照）  
- 全栈语言栈：**语言栈**  
- 可选：读 Next 的 \`basePath\` / \`output: 'export'\`，对照 \`sign.json\` 两种挂法。
`;
