export default `# JavaScript（语言）

> **分类：编程语言。** 多范式脚本语言：浏览器驱动页面，Node 驱动服务端。  
> 本仓 **主服唯一宿主语言**：AgentRuntime、Loader、插件、HTTP、工作流全在 **Node ≥ 26** 上跑；**www** 前端产物最终也是 JS（常由 Vue/Vite 打包）。**无独立 JS 子服**——它就是主服本身。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 语言身份 | 能说明 JS 语法语义，并拒绝「Vue/Node 是语言」 |
| 双宿主 | 浏览器有 DOM；Node 有 fs/进程——语言同、API 不同 |
| 本仓 | 主服语言是 JS；动手过关仍回 01.5 |
| 跟 Agent | 改码时钉宿主（浏览器或 Node），勿混 API |


## 本课你要带走什么

1. **什么场景必须用 JS、什么场景该交给子服或其它语言**  
2. 类型、作用域、原型、异步、模块等特性怎么一句话讲清  
3. 在本仓里它落在哪（主服 + www），和 TypeScript / Python 如何分工

---

## 1. 使用场景：何时用、何时不用

### 1.1 适合用 JavaScript 的场景

| 场景 | 为什么选 JS |
|------|-------------|
| **本仓主服业务** | 插件、HTTP API、AI 工作流、事件监听 — 框架契约就是 JS |
| **浏览器交互与 SPA** | DOM、事件、fetch；Vue/React 的宿主语言 |
| **I/O 密集、快速迭代** | 单线程 + 事件循环扛大量等待；生态 npm 极全 |
| **JSON/HTTP 胶水层** | 与前端同语言；序列化、网关、BFF 心智统一 |
| **全栈小团队** | 前后端一种语言，招聘与上下文切换成本低 |
| **CLI / 自动化脚本（Node 版）** | 与主服同运行时，可复用仓库工具链 |

### 1.2 不适合 / 通常别用的场景

| 场景 | 更好选择 | 原因 |
|------|----------|------|
| **CPU 密集热点（解析、加密、编解码）** | Rust / Go / Python+C 扩展 | 单线程主线程 + V8 不适合长期占满 CPU |
| **强类型大型后端、百人协作** | Java / C# / TypeScript 严格模式 | 动态类型债务在规模上来得很快 |
| **数据科学 / ML 训练** | Python | 生态碾压 |
| **系统编程、驱动、裸金属** | C / Rust | 无手动内存与 OS 级控制 |
| **把重活硬塞进主服插件** | 对应 **子服**（pyserver/goserver…） | 主服应保持编排与 I/O，算力外置 |
| **只要类型安全、不想换语言** | **TypeScript**（仍编译成 JS） | 编译期约束，运行时仍是 JS |

### 1.3 与 TypeScript / Python / Go 怎么选（口述）

| 需求 | 更偏向 |
|------|--------|
| 本仓主服、插件、HTTP | **JavaScript**（或 TS 再编译） |
| 要静态类型、仍跑 Node | **TypeScript** |
| AI/爬虫/脚本/ML 子服 | **Python**（pyserver） |
| 高并发网络服务子服 | **Go**（goserver） |
| 浏览器里跑 | **JavaScript**（框架是 Vue/React，不是另一门语言） |

\`\`\`mermaid
flowchart TB
  Task[有一块活要做] --> XRK{在本仓主服边界内?}
  XRK -->|是| JS[JavaScript / Node 主服]
  XRK -->|否，重计算或专用生态| Sub[子服 Python/Go/Rust…]
  Task --> Browser{在浏览器?}
  Browser -->|是| JSW[JavaScript + 框架]
\`\`\`

---

## 2. 语言特性（必须讲清楚）

### 2.1 类型与值

| 点 | 说明 |
|----|------|
| **原始类型** | \`undefined\` \`null\` \`boolean\` \`number\` \`bigint\` \`string\` \`symbol\` |
| **对象** | 其余皆对象（含数组、函数、Date、Map/Set） |
| **动态类型 + 弱类型倾向** | 运行期才定类型；\`==\` 会隐式转换（生产多用 \`===\`） |
| **\`typeof null === 'object'\`** | 历史包袱；判空用 \`== null\` 或显式 |
| **\`NaN\`** | \`number\` 的「非数」；用 \`Number.isNaN\` |
| **引用语义** | 对象赋值共享引用；改属性两边可见 |

### 2.2 作用域、提升、暂时性死区

| 点 | 说明 |
|----|------|
| **词法作用域** | 函数定义时决定能看见谁，不是调用时 |
| **\`var\`** | 函数作用域、提升；易泄漏到外层 — 新代码避免 |
| **\`let\` / \`const\`** | 块作用域；声明前不可访问（TDZ） |
| **\`const\`** | 绑定不可变；对象内容仍可变 |

### 2.3 函数、闭包、\`this\`

| 点 | 说明 |
|----|------|
| **一等公民** | 可赋值、作参数、作返回值 |
| **闭包** | 内层函数记住外层词法环境 → 模块私有状态、回调 |
| **\`this\` 绑定** | 默认/隐式/显式（\`call/apply/bind\`）/\`new\`；**箭头函数无自己的 this** |
| **默认参数 / 剩余参数 / 解构** | 现代函数签名日常 |

### 2.4 原型与「类」

| 点 | 说明 |
|----|------|
| **原型链** | 属性查找沿 \`[[Prototype]]\` 上行 |
| **\`class\` 语法** | 仍是原型的糖；\`extends\` \`super\` |
| **\`instanceof\`** | 查原型链；跨 iframe/realm 易翻车 — 本仓服务端少用 |

### 2.5 异步模型（面试核心）

口径对齐 [MDN · 执行模型 / 事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Execution_model)：同步跑完 → 排空微任务 → 再取宏任务。

| 点 | 说明 |
|----|------|
| **事件循环** | 调用栈清空后取作业队列 |
| **宏任务** | \`setTimeout\`、I/O、\`setImmediate\`（Node） |
| **微任务** | \`Promise.then\`、\`queueMicrotask\`；同一轮宏任务后先清空微任务 |
| **\`async/await\`** | 基于 Promise；\`await\` 让出当前 async 函数 |
| **Node 26 本仓** | 全局 \`fetch\` + \`AbortSignal.timeout\`；禁止 \`node-fetch\` 旧写法 |

经典顺序（播放动画）：\`A\` → \`D\`（同步）→ \`B\`（微任务）→ \`C\`（宏任务）。

\`\`\`algo
{"title":"事件循环：同步 → 微任务 → 宏任务","kind":"eventloop","speed":480,"caption":"setTimeout(0) 不会插队打断正在跑的同步代码","data":{"steps":[{"kind":"sync","label":"console.log('A')"},{"kind":"macro","label":"setTimeout → C"},{"kind":"micro","label":"Promise.then → B"},{"kind":"sync","label":"console.log('D')"}],"output":["A","D","B","C"]}}
\`\`\`

动手细节回 **01.5 · 异步**。

### 2.6 模块

| 点 | 说明 |
|----|------|
| **ESM** | \`import\`/\`export\`；静态分析；**本仓主路径** |
| **CJS** | \`require\`/\`module.exports\`；遗留包仍见 |
| **\`#\` 别名** | 根包无 package.json 的 Core 用 \`#infrastructure/*\` |

### 2.7 其它常用特性

| 点 | 说明 |
|----|------|
| **迭代协议** | \`for…of\`、生成器 \`function*\` |
| **Proxy / Reflect** | 元编程；Vue3 响应式底层 |
| **可选链 / 空值合并** | \`?.\` \`??\` |
| **严格模式** | ESM 默认近似严格 |

---

## 3. 工具链

| 工具 | 作用 |
|------|------|
| **Node.js ≥ 26** | 本仓主服运行时（V8 + libuv + 原生 fetch 等） |
| **pnpm** | **唯一**支持的包管理；勿混 npm/yarn |
| **ESM** | \`"type": "module"\`；入口 \`app.js\` / \`start.js\` |
| **Vite / 打包器** | www 前端开发；产物仍是 JS |
| **ESLint / Prettier** | 可选；团队规范 |

---

## 4. 与本仓

| 项 | 说明 |
|----|------|
| **主服** | \`src/agent-runtime.js\` → Loader 扫 \`core/*/plugin|http|workflow…\` |
| **全局对象** | 裸名 \`AgentRuntime\`、\`msgSegment\`；勿 \`import AgentRuntime\` |
| **HTTP** | \`core/*/http/*.js\` + \`HttpResponse\`（\`#utils/http-utils.js\`） |
| **www** | \`core/*/www/<应用名>/\` 静态挂载；浏览器跑 JS |
| **子服** | **不是 JS**；主服用 \`callSubserver\` HTTP 调 Python/Go 等 |
| **Node 26 约定** | \`Error.isError\`、\`#utils/exec-async.js\`、\`AbortSignal.timeout\` |

---

## 5. 大厂真题

| 题 | 答法要点 |
|----|----------|
| 事件循环顺序 | 同步 → 微任务 → 宏任务；手写 \`setTimeout\` + \`Promise.then\` 输出 |
| 闭包应用与泄漏 | 私有变量；定时器/监听未释放 |
| 深浅拷贝 | 引用共享；\`structuredClone\`（浏览器/www 注意兼容内联） |
| \`this\` 指向 | 四种绑定 + 箭头函数词法 this |
| 防抖节流 | 闭包 + 定时器；搜索框/滚动 |
| 与 TS 关系 | JS 是运行时真相；TS 擦除后仍是 JS |

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [nodejs/node](https://github.com/nodejs/node) | ⭐ 十万级 | 事件循环、模块、流、\`fetch\` 与底层绑定 | **主服 Node**（\`app.js\` / \`src/\`）的运行时真相 |
| [expressjs/express](https://github.com/expressjs/express) | ⭐ 六万级 | 中间件链、\`req/res\`、路由分层 | 对照本仓自研 HTTP Loader；业务进 \`core/*/http/\` |
| [axios/axios](https://github.com/axios/axios) | ⭐ 十万级 | HTTP 客户端、拦截器、错误形态 | www / 插件里调 API；对照 \`callSubserver\` 的客户端视角 |

---

## 6. 下一步

**Node.js（运行时）** — 双宿主 API 边界；  
**TypeScript** — 类型层；  
**HTML/CSS** · **Vue / React** · **接到本仓运行时**。  
动手过关仍回 **01.5**。
`;
