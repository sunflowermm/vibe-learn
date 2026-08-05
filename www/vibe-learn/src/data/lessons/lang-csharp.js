export default `# C# / .NET（语言 + 运行时平台）

> **分类：C# 是编程语言；.NET 是运行时/平台（CLR）。** 勿说「.NET 语言」。  
> 本仓 **\`netserver\`** 子服。Web 框架见 **ASP.NET Core**（框架轨）。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分层 | C# 语言 + .NET；ASP.NET 是框架 |
| 本仓 | 走对应子服，非主服 |
| 对照 | .NET 不是一门语言 |
| 跟 Agent | 写清目标框架与子服 runtime |


## 本课你要带走什么

1. **什么场景该用 C# 子服、什么场景 Java/Go 更合适**  
2. 值类型/引用类型、async、LINQ、GC 等特性怎么讲清  
3. netserver 在本仓与 jserver、主服 JS 如何分工

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"C# · 身份翻卡","cards":[{"front":"C#","back":".NET 生态；本仓可有 .NET 子服"},{"front":"语言 ≠","back":"某一个框架或某一个云产品"},{"front":"接到本仓","back":"主服 JS；其它语言多在子服"}]}
\`\`\`

### 1.1 适合用 C# 的场景

| 场景 | 为什么选 C# |
|------|-------------|
| **Windows / Azure 企业栈** | AD、Office、SQL Server 集成顺 |
| **本仓 netserver 插件** | 已有 .NET 库、Windows 服务 |
| **Unity 游戏逻辑** | C# 是脚本主语言 |
| **ASP.NET Core Web API** | 性能优秀、中间件管道清晰 |
| **桌面工具（WPF/WinUI）** | 微软原生 UI 栈 |
| **强类型 + 现代语法** | record、模式匹配、async 一等公民 |

### 1.2 不适合 / 通常别用的场景

| 场景 | 更好选择 | 原因 |
|------|----------|------|
| **本仓主服** | **JavaScript** | Node AgentRuntime |
| **Linux 极简容器、只要小二进制** | **Go** | .NET 运行时体积 |
| **浏览器前端** | **JS/TS** | C# 不进浏览器（除 Blazor 等特殊） |
| **AI/ML 首选** | **Python** | 生态 |
| **无 GC 系统编程** | **Rust / C** | CLR 托管内存 |
| **已有 Spring 全系** | **Java** jserver | 迁移无收益 |

### 1.3 与 Java / Go / JavaScript 怎么选（口述）

| 需求 | 更偏向 |
|------|--------|
| JVM + Spring 生态 | **Java** |
| 微软云 / .NET 团队 | **C#** netserver |
| 轻量子服二进制 | **Go** |
| 本仓主入口 | **JavaScript** |

\`\`\`mermaid
flowchart TB
  Main[主服 Node] -->|HTTP| Net[netserver]
  Net --> CLR[CLR + GC]
  Net --> ASP[ASP.NET Core]
\`\`\`

---

## 2. 语言特性（必须讲清楚）

### 2.1 类型系统

| 点 | 说明 |
|----|------|
| **值类型 / 引用类型** | \`struct\`/\`int\` vs \`class\`；装箱 |
| **可空值类型** | \`int?\` |
| **可空引用（NRT）** | 编译器帮追 null |
| **\`record\` / \`record struct\`** | 值语义数据 |
| **模式匹配** | \`switch\` 表达式、属性模式 |

### 2.2 OOP 与现代语法

| 点 | 说明 |
|----|------|
| **属性** | \`get; set;\` 非裸字段文化 |
| **委托 / 事件** | 多播；观察者 |
| **LINQ** | 查询语法 / 方法链；**延迟执行** |
| **\`async\`/\`await\`** | \`Task\`；注意同步上下文死锁（旧 ASP.NET） |
| **扩展方法** | 静态方法挂到类型上 |
| **接口默认实现** | 类似 Java 8+ |

### 2.3 内存与安全

| 点 | 说明 |
|----|------|
| **GC** | 分代；与 Java 对照 |
| **\`using\` / \`IDisposable\`** | 确定性释放非托管资源 |
| **\`Span<T>\` / 内存 API** | 高性能切片（进阶） |

### 2.4 CLR 执行

\`\`\`
.cs → 编译 → IL → JIT → 机器码
\`\`\`

| 点 | 说明 |
|----|------|
| **程序集 Assembly** | 部署单元 |
| **强命名 / 版本** | 企业部署 |

---

## 3. 工具链

| 工具 | 作用 |
|------|------|
| **dotnet CLI** | \`dotnet build/run/test\` |
| **NuGet** | 包管理 |
| **Visual Studio / Rider** | IDE |
| **xUnit / NUnit** | 测试 |
| **.NET SDK 版本** | LTS vs Current |

---

## 4. 与本仓

| 项 | 说明 |
|----|------|
| **Runtime** | \`subserver/netserver\` |
| **调用** | 主服 HTTP → netserver |
| **框架** | **ASP.NET Core**（另课） |
| **典型** | Windows 企业 API、Office 周边、.NET 专属库 |
| **与 jserver** | 同为托管企业后端；生态分 Microsoft vs JVM |

---

## 5. 大厂真题

| 题 | 答法要点 |
|----|----------|
| 值类型 vs 引用类型 | 复制 vs 共享；何时 struct |
| async 陷阱 | 死锁、\`ConfigureAwait(false)\`、异常聚合 |
| LINQ 延迟执行 | 多次枚举副作用 |
| 委托与事件 | 解耦通知 |
| GC 分代 | 与 Java 类比 |
| \`IDisposable\` 模式 | using 语法糖 |

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [dotnet/runtime](https://github.com/dotnet/runtime) | ⭐ 一万级+ | CLR、GC、BCL、异步原语 | **netserver** 托管运行时根基 |
| [dotnet/aspnetcore](https://github.com/dotnet/aspnetcore) | ⭐ 三万级 | 中间件管道、DI、Minimal API | \`subserver/netserver\` Web 主机 |
| [dotnet/core](https://github.com/dotnet/core) | ⭐ 两万级 | 发行说明、平台支持矩阵 | Windows / 跨平台选型备忘 |

---

## 6. 下一步

**ASP.NET Core** · **Java/Spring**（对照）· **Go** · **语言栈** · **子服务端** · **技术选型**。  
可选：翻 ASP.NET Core 中间件文档一页，对照 netserver 调用链。
## 导图2 · 后端 / 技术栈 × C#

> C# + .NET；本仓走对应子服。ASP.NET 是框架轨。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **后端** | .NET 运行时 | 语言 C#；框架另说 |
| **技术栈** | 常搭 ASP.NET | 见 fw-aspnet |
| **部署上线** | 子服边界 | 主服仍是 JS+Node |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
