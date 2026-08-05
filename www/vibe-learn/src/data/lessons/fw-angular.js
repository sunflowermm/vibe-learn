export default `# Angular（框架）

> **分类：意见性强的前端应用框架。不是语言。**  
> 宿主语言：**TypeScript**（一等公民；模板也可配合 TS）。  
> 挂到 XRK：与 **Vue / React** 一样，放进 \`core/*/www/<应用>/\`，经 **sign.json** 静态挂载或反代 dev server。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分类 | 前端框架；宿主 TS/JS；不是语言 |
| 对照 | 与 Vue/React 同层不同风格 |
| 前置 | 先 01.5 JS，再学框架 |
| 本仓 | 可进 www；不进 Runtime src/ |


## 本课你要带走什么

1. Angular **何时选、何时别用**，和 Vue / React 怎么口述  
2. DI、变更检测、RxJS、模块化等**特性**  
3. 在本仓 **www + sign.json** 怎么挂 Angular 构建产物

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"Angular · 翻卡","cards":[{"front":"Angular","back":"完整前端框架，意见较多"},{"front":"框架边界","back":"不替代 DBMS / OS / 运行时"},{"front":"本仓 www","back":"静态前端挂 core/*/www/<应用名>"}]}
\`\`\`

### 1.1 Angular —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **大型企业前端、规范统一** | 目录、模块、DI、测试约定开箱 |
| **TypeScript 强制、长期维护** | 框架与 CLI 深度集成 TS |
| **复杂表单与异步流** | Reactive Forms + RxJS 管道成熟 |
| **与 Java/Spring 同组织的技术栈** | 企业里常见「Spring + Angular」配对 |
| **本仓 www 里的 SPA** | \`ng build\` 产物 + \`sign.json\` 挂 dist |

### 1.2 Angular —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **小团队、快速 MVP、人力少** | 概念与脚手架偏重 |
| **强依赖 React 生态（Next、RN）** | 换栈成本高 |
| **只要轻量嵌入老页面** | Vue 渐进式或纯 jQuery 可能更快 |
| **团队不愿学 RxJS** | 异步与 HTTP 处处 Observable |
| **把 Angular 写进主服 \`src/\`** | 违反 Core 边界 |

### 1.3 与竞品对照（选型口述版）

| 维度 | Angular | Vue | React |
|------|---------|-----|-------|
| 完整度 | 全家桶（路由、HTTP、表单） | 核心 + 官方推荐库 | 库 + 自选 |
| 学习曲线 | 陡 | 中等 | 中等（库多） |
| 变更检测 | Zone / OnPush / Signals | 细粒度 Proxy | 自顶向下 + Hooks |
| 异步 | RxJS 内置 | Promise/async + 可选 Rx | 多为 Promise |
| 本仓挂载 | www + sign.json | vibe-learn 实例 | www + sign.json |

\`\`\`mermaid
flowchart TB
  Need[企业级 SPA] --> Org{组织标准?}
  Org -->|TS 全家桶| Ang[Angular CLI]
  Org -->|灵活组合| VueOrReact[Vue / React]
  Ang --> WWW[core/*/www/ + sign.json]
\`\`\`

---

## 2. 框架特性（讲清楚）

### 2.1 依赖注入（一等公民）

| 点 | 说明 |
|----|------|
| **Injector 树** | 模块/组件级注入器层级 |
| **构造器注入** | \`constructor(private svc: UserService)\` |
| **\`providedIn: 'root'\`** | 应用级单例等作用域 |
| **可测性** | 测试床替换 Provider / mock |
| **与 Nest/Spring 对照** | 都是 IoC 容器文化 |

\`\`\`mermaid
flowchart LR
  Mod[@NgModule / standalone]
  Mod --> Prov[Providers]
  Prov --> Inj[Injector]
  Inj --> Cmp[Component]
  Cmp --> Svc[Service]
\`\`\`

### 2.2 模板与数据绑定

| 点 | 说明 |
|----|------|
| **插值** | \`{{ user.name }}\` |
| **属性绑定** | \`[disabled]="isBusy"\` |
| **事件** | \`(click)="save()"\` |
| **双向** | \`[(ngModel)]\`（需 FormsModule） |
| **结构指令** | \`*ngIf\` \`*ngFor\` \`*ngSwitch\` |
| **管道 pipe** | \`{{ date | date }}\` 纯/非纯管道 |

### 2.3 表单

| 类型 | 特点 |
|------|------|
| **模板驱动** | 简单表单；\`ngModel\` |
| **响应式** | \`FormGroup\` / \`FormControl\`；校验器、动态表单 |
| **校验** | sync/async validators；错误展示 \`formControl.errors\` |

### 2.4 RxJS 与 HttpClient

| 点 | 说明 |
|----|------|
| **Observable** | 多值推送；冷/热流 |
| **HttpClient** | 返回 Observable；拦截器链 |
| **\`async\` pipe** | 模板订阅 + 自动退订 |
| **常用操作符** | \`map\` \`switchMap\` \`debounceTime\` \`catchError\` \`shareReplay\` |
| **退订** | \`takeUntil(destroy$)\` 防泄漏 |

### 2.5 变更检测

| 点 | 说明 |
|----|------|
| **默认策略** | Zone.js 补丁异步 → 可能整树检查 |
| **\`ChangeDetectionStrategy.OnPush\`** | 输入引用不变则跳过；性能关键 |
| **Signals（新方向）** | 更细粒度响应式，减少 Zone 依赖 |
| **\`markForCheck\` / \`detach\`** | 手动控制检测周期 |

### 2.6 模块化演进

| 点 | 说明 |
|----|------|
| **NgModule（经典）** | declarations / imports / exports |
| **standalone（推荐）** | 组件自声明 \`imports: [...]\` |
| **路由** | \`RouterModule\` / \`provideRouter\`；懒加载 \`loadComponent\` |
| **Angular CLI** | 生成、构建、测试、lint 一体化 |

---

## 3. 与本仓：www + sign.json 挂载

Angular 是**浏览器端框架**；在本仓走 **www**，不走子服。

### 3.1 目录约定

\`\`\`
core/<Core>/www/<应用名>/
  ├── angular.json        # CLI 配置
  ├── sign.json
  ├── src/                # TS + 模板
  └── dist/ 或 dist/<app>/browser/   # ng build 产物（视版本）
\`\`\`

### 3.2 sign.json 与构建

| 模式 | 做法 |
|------|------|
| **静态（生产常见）** | \`enabled: false\`，\`staticRoot\` 指向 build 输出目录 |
| **HMR** | \`enabled: true\`，反代 \`ng serve\` 端口 |

**deploy 对齐（必做）：**

| 配置项 | 值 |
|--------|-----|
| \`angular.json\` \`baseHref\` | \`/<应用名>/\` |
| \`sign.json\` \`proxy.mount\` | \`/<应用名>\` |
| 资源 URL | 否则 JS/CSS 404 |

### 3.3 数据流

\`\`\`mermaid
flowchart TB
  NgSrc[Angular 源码] -->|ng build| Dist[静态 dist]
  Dist --> Mount[mountCoreWwwStatic]
  Mount --> URL["浏览器 /<应用名>/"]
  API[core/*/http] --> URL
\`\`\`

- **页面**：www 静态产物  
- **API**：同 Core 的 \`http/\`，HttpClient 调主服路径；响应按拍平规则解包  
- **不要**把 Angular 当作后端框架挂进子服

完整规则见 **HTTP 与 www**、**Vue** 课（步骤对照，换 CLI 命令即可）。

---

## 4. 和大厂面试怎么答

### 「Angular 是库还是框架？」

**框架（Framework）**——路由、HTTP、表单、DI（Dependency Injection，依赖注入）全家桶，**IoC 程度高**。  
宿主语言：**TypeScript**（一等公民）；运行环境：**浏览器**（\`ng build\` 产物）。  
与 **Vue**（渐进式、可选生态）/ **React**（UI 库 + 自选栈）对照：Angular 规范强、学习曲线陡，适合大型企业前端。  
**本仓**：可 \`ng build\` + \`sign.json\` 挂 www；vibe-learn 用 **Vue 3**，非 Angular。

### 「Angular DI 是什么？」

**依赖注入**：框架创建 Service 并注入 Component，而非手写 \`new UserService()\`。  
\`providedIn: 'root'\` 控制作用域；测试时替换 Provider。与 **Spring**、**Nest** 同属 IoC 容器文化。

### 「OnPush 变更检测？」

\`ChangeDetectionStrategy.OnPush\`：输入引用不变则跳过子树检测，需 immutable 数据或 \`async\` pipe 触发。  
默认策略靠 **Zone.js** 补丁异步 API，可能整树检查——性能热点要懂 OnPush。

### 「Zone.js 干什么？」

补丁 \`setTimeout\`、Promise 等，在异步完成后触发**变更检测**。Signals 新方向是减少 Zone 依赖、更细粒度更新。

### 「在本仓怎么挂 Angular？」

\`core/*/www/\` + \`angular.json\` 的 \`baseHref\` 对齐 \`sign.json\` 的 \`proxy.mount\`；API 用 HttpClient 调主服 \`http/\`。

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [angular/angular](https://github.com/angular/angular) | ⭐ 九万级 | DI、变更检测、RxJS 集成 | **www** 企业前端；\`baseHref\` + \`sign.json\` |
| [angular/angular-cli](https://github.com/angular/angular-cli) | ⭐ 两万级 | 脚手架、构建、\`baseHref\` | 产物挂 \`core/*/www/\` 或反代 |
| [ReactiveX/rxjs](https://github.com/ReactiveX/rxjs) | ⭐ 三万级 | Observable、取消与组合 | Angular 数据流；对照本仓事件/流课 |

---

## 5. 下一步

- 语言：**TypeScript** · **JavaScript** · **HTML/CSS**  
- 对照：**Vue** · **React** · **Next.js**  
- 后端 DI 对照：**Spring** · **NestJS**  
- 本仓：**HTTP 与 www**  
- 可选：扫 Angular CLI 的 \`baseHref\` 文档，对照本仓静态挂载。
## 导图2 · 前端 / 组件 / TypeScript × Angular

> 偏完整前端框架；常见 TS。层仍是框架，不是语言。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **前端** | 大型应用框架 | 约定多；宿主 TS/JS |
| **组件** | 强结构 | 与 Vue/React 同层不同风格 |
| **TypeScript** | 常见标配 | 仍编译到 JS 再跑浏览器 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
