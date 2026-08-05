export default `# TypeScript（语言）

> **分类：编程语言（JavaScript 的超集）。**  
> 编译/擦除后运行时仍是 **JavaScript**；不替代 Node 或浏览器引擎。  
> 本仓 **主服大量原生 JS**；Core/www **可选用 TS 再构建**（如 vibe-learn 当前以 JS 为主）。**无 TS 子服** — 跑起来仍是 Node 上的 JS。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 定位 | TS 是类型层/超集；运行时执行的仍是 JS |
| 构建 | 知道 tsc/打包与类型擦除直觉 |
| 本仓 | 主服以 JS 为准；www 可按项目选用 TS |
| 跟 Agent | 要类型时说明严格度与是否允许 any 逃生 |


## 本课你要带走什么

1. **什么场景值得上 TS、什么场景纯 JS 更划算**  
2. 类型系统、泛型、收窄、工具类型怎么讲清楚  
3. 在本仓里与主服 JS、前端框架如何配合

---

## 1. 使用场景：何时用、何时不用

\`\`\`algo
{"title":"TypeScript → 擦除 → JavaScript → 运行时","kind":"tserase","speed":520,"caption":"类型不进运行时；执行的仍是 JS","data":{"source":"function add(a: number, b: number): number","erased":"function add(a, b)","run":"node add.js → 3"}}
\`\`\`

### 1.1 适合用 TypeScript 的场景

| 场景 | 为什么选 TS |
|------|-------------|
| **中大型前端工程** | Vue/React/Angular 组件 props、状态机、API 契约 |
| **多人协作的 Node 服务** | 接口形状、重构安全、IDE 跳转 |
| **公共库 / SDK** | 消费者靠 \`.d.ts\` 获得类型提示 |
| **复杂领域模型** | 判别联合、状态机、配置变体 — 编译期拦漏分支 |
| **从 Java/C# 转来的团队** | 静态类型 + OOP/泛型心智接近 |
| **渐进迁移** | 现有 \`.js\` 可 \`allowJs\` 逐步改 \`.ts\` |

### 1.2 不适合 / 通常别用的场景

| 场景 | 更好选择 | 原因 |
|------|----------|------|
| **本仓主服小插件、一次性脚本** | **JavaScript** | 无构建步、与 Loader 直读 \`.js\` 一致 |
| **极短生命周期原型** | JS | tsc/配置成本不划算 |
| **运行时类型校验需求** | Zod/io-ts 等 + 仍可用 TS | TS 类型不进运行时 |
| **以为 TS 能替代学习 JS** | 先 JS 再 TS | 事件循环、原型、\`this\` 仍是 JS |
| **在 Core 里用 \`#\` 且子包有 package.json** | JS 或相对路径 | 子包无根 \`#\` 别名；TS 路径要另配 |
| **把 TS 当「更安全运行时」** | 无此魔法 | 擦除后与普通 JS 相同 |

### 1.3 与 JavaScript / Java / C# 怎么选（口述）

| 需求 | 更偏向 |
|------|--------|
| 本仓主服默认、零构建 | **JavaScript** |
| 同生态但要类型 | **TypeScript** |
| 企业 JVM 后端 | **Java** |
| 微软栈 / Unity | **C#** |
| 浏览器最终执行 | 全是 **JavaScript**（TS 是开发期） |

\`\`\`mermaid
flowchart LR
  TS[.ts / .tsx] --> Build[tsc / esbuild / swc / Vite]
  Build --> JS[.js]
  JS --> Node[Node 主服 / 浏览器]
\`\`\`

---

## 2. 语言特性（必须讲清楚）

### 2.1 与 JavaScript 的关系

| 点 | 说明 |
|----|------|
| **超集** | 合法 JS 几乎都是合法 TS（再逐步加注） |
| **类型擦除** | \`interface\`/\`type\` 不进运行时；枚举/命名空间有例外产出 |
| **不提供新运行时能力** | 读文件仍靠 Node API；fetch 仍靠全局 fetch |

### 2.2 类型标注与推断

| 点 | 说明 |
|----|------|
| **显式标注** | \`let x: number\`、函数参数/返回值 |
| **推断** | 能推就不写；\`strict\` 下更敢推断 |
| **\`any\`** | 关闭检查；应急用，扩散即债务 |
| **\`unknown\`** | 安全任意值；必须收窄后才能用 |
| **\`never\`** | 穷尽检查；不可能的值 |

### 2.3 结构类型（鸭子类型）

TS 比名义类型宽松：**形状对得上就能赋值**（新鲜字面量多余字段会警告）。

\`\`\`ts
type Point = { x: number; y: number };
const p = { x: 1, y: 2, z: 3 };
const q: Point = p; // OK：变量赋值时多 z 可兼容
\`\`\`

### 2.4 联合、交叉、字面量

| 点 | 说明 |
|----|------|
| **联合 \`A \\| B\`** | 状态机、可选形态；用收窄使用 |
| **交叉 \`A & B\`** | 合并对象形状 |
| **字面量类型** | \`'pending' \\| 'ok'\`；\`as const\` |
| **判别联合** | 公共 \`kind\` 字段切换分支 |

### 2.5 收窄（Narrowing）

| 手段 | 例子 |
|------|------|
| \`typeof\` / \`instanceof\` | 原始类型、类 |
| 相等检查 | \`x === null\` |
| \`in\` 操作符 | \`'id' in obj\` |
| 自定义类型守卫 | \`function isUser(x): x is User\` |
| 断言 \`as\` | 你比编译器更懂时；滥用危险 |

### 2.6 泛型

| 点 | 说明 |
|----|------|
| **类型参数** | \`function id<T>(x: T): T\` |
| **约束** | \`T extends { id: string }\` |
| **默认类型** | \`T = string\` |
| **在接口/类中** | \`Repository<T>\`、\`Promise<T>\` |

### 2.7 interface vs type

| | interface | type |
|--|-----------|------|
| 对象形状 | 擅长；可声明合并 | 可以 |
| 联合/元组 | 弱 | 强 |
| 扩展 | \`extends\` | \`&\` |

### 2.8 常用工具类型

\`Partial\` \`Required\` \`Pick\` \`Omit\` \`Record\` \`Readonly\` \`ReturnType\` \`Parameters\` \`Awaited\`

### 2.9 与框架

| 场景 | 用法 |
|------|------|
| Vue | \`defineProps<T>()\`、\`ref<T>\` |
| React | props 接口、\`tsx\` |
| Angular | 几乎默认 TS + 装饰器 |

---

## 3. 工具链

| 工具 | 作用 |
|------|------|
| **\`tsconfig.json\`** | \`strict\`、\`module\`、\`target\`、\`paths\` |
| **tsc** | 官方编译；可 \`--noEmit\` 只检查 |
| **esbuild / swc** | 快 transpile；类型仍靠 tsc |
| **Vite** | 开发 HMR + 内置转译；本仓 www 常用 |
| **vue-tsc** | Vue SFC 类型检查 |

---

## 4. 与本仓

| 项 | 说明 |
|----|------|
| **主服默认** | 原生 **JavaScript** ESM；Loader 直接加载 \`.js\` |
| **Core/www** | 可 TS 源码 + 构建产物挂 \`dist\`；或开发期 Vite |
| **无 package.json 的 Core** | 可用根 \`#\` 别名（TS 需 paths 对齐） |
| **有 package.json 的子 Core** | **禁止 \`#\`**；相对路径到 \`src/\` |
| **HttpResponse 形状** | 前端 TS 应建模 \`success\` 拍平语义，勿假设总有 \`data\` |

---

## 5. 大厂真题

| 题 | 答法要点 |
|----|----------|
| interface 与 type | 合并 vs 联合能力 |
| any vs unknown | 放弃检查 vs 强制收窄 |
| 泛型约束 | \`T extends\` 能传什么 |
| 类型擦除后果 | 运行时 \`typeof\` 看不到 interface |
| 协变逆变（进阶） | 函数参数逆变、返回值协变 — 口述即可 |
| strict 开哪些 | \`strictNullChecks\` 性价比最高 |

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [microsoft/TypeScript](https://github.com/microsoft/TypeScript) | ⭐ 十万级 | 类型擦除、编译器管道、\`tsc\` 行为 | www / 子 Core 构建；**运行时仍是 JS** |
| [nestjs/nest](https://github.com/nestjs/nest) | ⭐ 六万级 | DI、模块、装饰器、分层约定 | **对照**主服自研 Runtime；勿在主服再造第二套 Nest |
| [type-challenges/type-challenges](https://github.com/type-challenges/type-challenges) | ⭐ 四万级 | 条件类型、推断、工具类型手感 | 建模 \`HttpResponse\` 拍平形状、API 类型 |

---

## 6. 下一步

**JavaScript**（运行时真相与事件循环）· **Node.js**（双宿主）· **Vue / React** · **接到本仓运行时**。  
01.5 有 **TS 动手** 可选课；主服默认仍以 JS 为准。
`;
