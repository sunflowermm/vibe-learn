/** HTTP 与 www — 场景 + 挂载规则加厚 */
export default `# HTTP 与 www

> 第三章的 HTTP / 反代 / 前后端，在本仓库落成两件事：  
> **接口**（\`core/*/http\`）与 **页面**（\`core/*/www/<应用>\`）。  
> **Vue / React / Angular / Next** 等前端框架，都是走 **www** 进项目——不是另起一门「框架语言」，也不是写进主服 \`src/\`。

## 本课你要带走什么

1. **什么场景用纯静态、什么场景用 Vite SPA、什么场景必须反代 SSR**  
2. \`sign.json\` 两种模式怎么选、\`base\` 为什么必须对齐  
3. HTTP API（\`HttpResponse\`）和 www 页面如何配合，前端怎么解包

---

## 1. 使用场景：何时用哪种 www 形态

### 1.1 三种常见形态

| 形态 | 目录特征 | 何时用 | 何时不用 |
|------|----------|--------|----------|
| **普通静态** | 无 \`sign.json\`，直接 HTML/CSS/JS | 说明页、简单面板、几乎无构建 | 复杂 SPA、要组件化与热更新 |
| **前端工程 · 静态挂 dist** | 有 \`sign.json\`，\`enabled: false\` | **Vue/React/Angular SPA 日常与生产**（本仓推荐） | 需要 Node SSR 每请求渲染 |
| **前端工程 · 反代进程** | \`enabled: true\` + port | **本地 HMR**；或 **Next/Nuxt SSR** 常驻 | 只想丢静态文件、不想管进程 |

### 1.2 前端框架怎么选（挂 www 之前先选型）

| 场景 | 更合适 | 原因 |
|------|--------|------|
| 中后台、国内团队、本仓 vibe-learn 同类 | **Vue 3 + Vite** | 上手快；本仓已有实例 |
| 强依赖 React 生态 / 跨端 RN 经验 | **React + Vite** | 生态与招聘面 |
| 企业强制全家桶、DI/RxJS | **Angular** | 规范统一 |
| SEO / SSR / 营销站 + React | **Next.js** | 元框架；静态 export 或反代 SSR |
| 几乎无交互的文档 | 普通静态 HTML | 别上框架 |

详细场景见各框架课：**Vue** · **React** · **Angular** · **Next.js**。

### 1.3 后端框架会不会进 www？

| 框架 | 进 www 吗 | 正确落点 |
|------|-----------|----------|
| Vue / React / Angular / Next | **是**（浏览器 UI） | \`core/*/www/<应用>/\` |
| Express / Nest / Spring / Django / Gin / ASP.NET / Laravel | **否**（服务端） | 独立服务或本仓**子服**；主服 \`http/\` 门面 |

\`\`\`mermaid
flowchart TB
  Need[要做页面或接口] --> Kind{浏览器 UI 还是服务端 API?}
  Kind -->|UI| WWW[core/*/www/应用]
  Kind -->|API| HTTP[core/*/http 或子服]
  WWW --> Mode{要构建/SSR?}
  Mode -->|否| Static[普通静态挂目录]
  Mode -->|SPA| Dist[sign enabled:false 挂 dist]
  Mode -->|HMR或SSR| Proxy[sign enabled:true 反代进程]
\`\`\`

---

## 2. 知识串（接第三章）

| 第三章词 | 本仓落点 |
|----------|----------|
| HTTP 方法 / 状态码 | Handler 用 \`HttpResponse\`；前端按约定解包 |
| API · 前端 · 后端 | www = 前端；http = 后端 |
| TCP 端口 | 主服 listen；多应用同端口按路径分流 |
| 反向代理 / Nginx | 生产外层门面；开发期 \`sign.json\` \`enabled: true\` 时主服反代 Vite/Next |
| HTML/CSS/JS · Vue/React… | **产物**挂进 \`www\`；框架课内点回本课，图谱不逐条拉边 |

图谱主桥：第三章 **HTTP** / **Nginx** → 本课；第四章内由 **Runtime / Core 布局 / 插件** 汇入。前端框架挂载细节见下文与各框架课「下一步」。

访问 \`/vibe-learn/\`：主服把 \`core/vibe-learn-Core/www/vibe-learn/\`（或其 \`dist\`）当站点挂出。

---

## 3. 前端框架如何挂到 www（操作级）

### 3.1 目录约定

\`\`\`
core/<Core名>/www/<应用名>/
  ├── package.json
  ├── vite.config.js     # base 必须 = 对外路径
  ├── sign.json          # 声明前端工程
  ├── src/               # Vue/React/… 源码
  └── dist/              # build 产物（HTML/CSS/JS）
\`\`\`

- **必须**用子目录；根名勿用保留段：\`api\` \`core\` \`media\` \`uploads\` \`File\` \`shared\`  
- URL：默认 \`/<应用名>/\`；也可在 \`sign.json\` 的 \`proxy.mount\` / \`mount\` 指定  

### 3.2 \`sign.json\` 两种模式（只有这两种）

| 模式 | 关键字段 | 主服行为 | 典型 |
|------|----------|----------|------|
| **静态** | \`enabled: false\`，\`staticRoot: "dist"\` | 缺产物则跑 \`build\`，然后 \`express.static\` 挂 dist | vibe-learn 生产/日常 |
| **反代** | \`enabled: true\`，\`port\`，\`command\`/\`args\` | 拉起 dev/SSR 进程并反代 | 本地 HMR；Next SSR |

**vibe-learn 实例：**

| 项 | 值 |
|----|-----|
| 路径 | \`core/vibe-learn-Core/www/vibe-learn/\` |
| 框架 | Vue 3 + Vite |
| mount | \`/vibe-learn/\` |
| 模式 | \`enabled: false\` → 挂 \`dist\` |

### 3.3 必对齐的三件事（不对齐就 404）

1. **Vite \`base\`**（或 Webpack publicPath）= \`/应用名/\`  
2. **Vue Router \`history\` base / React Router \`basename\`** = 同路径  
3. **\`sign.json\` 的 mount** = 同路径  

### 3.4 Next.js 特例

| 需求 | 做法 |
|------|------|
| 可静态导出 | \`output: 'export'\` + 静态挂 \`out\`/\`dist\` |
| 要 SSR / RSC | \`enabled: true\` 反代 \`next dev\` / \`next start\` |

详见 **Next.js** 课、\`docs/www-mount.md\`。

### 3.5 自己加一个 Vue/React 应用（清单）

1. \`core/<Core>/www/<应用名>/\` Scaffold  
2. 抄 vibe-learn 的 \`sign.json\`，改 port / mount  
3. 设 \`base\` 与路由 basename  
4. 重启主服 → 打开 \`http://<主服>/<应用名>/\`  
5. 要接口：同 Core 加 \`http/*.js\`，遵守 \`HttpResponse\`  

浏览器侧兼容：skill **\`xrk-www-compat\`**（勿把前端写成 Node 26 API）。

---

## 4. HTTP API 契约（和 www 配套）

| 规则 | 说明 |
|------|------|
| 用 \`HttpResponse.success / error / …\` | 统一形状，少私创字段 |
| 普通对象成功 | 字段**拍平到顶层**（没有统一 \`data\` 包一层） |
| 数组 / 标量 | 才放进 \`data\` |
| 前端解包 | 有 \`data\` 用 \`data\`；否则去掉 \`success\`/\`message\` 读剩余字段 |

写死 \`json.data.xxx\` 会在对象成功响应上取空——这是 www 联调最常见坑。

---

## 5. 大厂 / 工程追问（结合本仓）

| 问 | 答骨架 |
|----|--------|
| SPA 为何要设 base | 子路径挂载时资源与路由都相对 mount |
| 静态挂与反代怎么选 | 产物稳定用静态；要 HMR/SSR 用反代 |
| 框架和语言关系 | 框架宿主是 JS；产物仍是 HTML/CSS/JS |
| 后端 Spring 能挂 www 吗 | 不；www 是浏览器前端；Spring 走 jserver |

---

## 6. 下一步

**Vue** / **React** / **Angular** / **Next.js**（框架场景与特性）  
**JavaScript** / **HTML/CSS**（产物语言）  
**AgentRuntime** · **配置归属** · **Stream** · **子服务端**  
权威文档：\`docs/www-mount.md\`
`;
