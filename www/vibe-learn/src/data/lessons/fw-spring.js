/** Spring — 场景 + 特性 + 本仓子服对照（加厚） */
export default `# Spring / Spring Boot（框架）

> **分类：Java 企业级应用框架。不是语言。**  
> 宿主语言：**Java**；运行平台：**JVM**。  
> 本仓主服是 **Node AgentRuntime**；Spring 能力经 **jserver 子服**暴露，**不进 www**，**不替换**主服入口。

## 本课你要带走什么

1. Spring **何时选、何时别用**，和 Node / .NET 后端怎么口述  
2. IoC、AOP、MVC、Boot、事务等**特性**  
3. 在本仓里 **子服 vs www vs 主服 http** 的分工

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"Spring · 翻卡","cards":[{"front":"Spring","back":"Java 企业级生态"},{"front":"框架边界","back":"不替代 DBMS / OS / 运行时"},{"front":"本仓 www","back":"静态前端挂 core/*/www/<应用名>"}]}
\`\`\`

### 1.1 Spring —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **国内/Java 系企业后端** | 事实标准；招聘与中间件生态 |
| **复杂事务、多数据源、集成中间件** | \`@Transactional\`、JPA、消息、调度 |
| **强 DI、可测试、模块化** | ApplicationContext + 分层清晰 |
| **与 Angular 同组织技术栈** | 前后端分离或 BFF 常见 |
| **本仓需要 Java 能力** | 走 **jserver**，主服 HTTP 门面转发 |

### 1.2 Spring —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **极简脚本 API、个人小工具** | Boot 仍偏重；Node/Python 可能更快 |
| **团队只会 JS、无 JVM 运维** | 内存、GC、部署链路成本 |
| **强实时、超高并发 I/O（纯 API）** | Go/Node 有时更轻（视团队） |
| **把 Spring 嵌进主服进程** | 违反架构；应用逻辑应在 Core 或独立 jserver |
| **用 Spring 渲染本仓 www SPA** | 浏览器 UI 用 **Vue/React → www**；Spring 是后端 |

### 1.3 与竞品对照（选型口述版）

| 维度 | Spring Boot | NestJS | ASP.NET Core |
|------|-------------|--------|--------------|
| 语言 | Java | TypeScript | C# |
| DI / IoC | 核心 | 核心 | 内置 |
| 横切 | AOP | Guard/Interceptor | Middleware |
| 本仓 | **jserver** | 对照学习 | **netserver** |
| www | **否** | **否** | **否** |

\`\`\`mermaid
flowchart TB
  Browser[浏览器 www] --> Main[主服 Node]
  Main --> HTTP[core/*/http 门面]
  HTTP --> J[jserver Spring]
  Main --> WWW[mountCoreWwwStatic Vue/React]
\`\`\`

---

## 2. 框架特性（讲清楚）

### 2.1 IoC / DI

| 点 | 说明 |
|----|------|
| **控制反转** | 对象创建交给 \`ApplicationContext\` |
| **注入方式** | 构造器（推荐）/ Setter / 字段 |
| **Bean 作用域** | singleton（默认）、prototype、request、session… |
| **\`@Component\` / \`@Service\` / \`@Repository\`** | .stereotype 分层 |
| **循环依赖** | 单例 + setter 可三级缓存；构造器循环需重构 |

### 2.2 AOP

| 点 | 说明 |
|----|------|
| **横切关注点** | 日志、鉴权、指标、**事务** |
| **代理** | JDK 动态代理（接口）/ CGLIB（类） |
| **同类自调用** | \`this.foo()\` 不走代理 → 切面/事务可能失效 |
| **与 Nest Interceptor 对照** | 概念类似，实现不同 |

\`\`\`mermaid
flowchart LR
  Client --> Proxy[Spring 代理]
  Proxy --> Aspect[切面 Before/After]
  Aspect --> Target[业务 Bean]
\`\`\`

### 2.3 Spring MVC

| 点 | 说明 |
|----|------|
| **DispatcherServlet** | 前端控制器；统一入口 |
| **\`@RestController\`** | REST JSON API |
| **参数绑定** | \`@RequestBody\` \`@PathVariable\` \`@RequestParam\` |
| **校验** | \`@Valid\` + Bean Validation |
| **全局异常** | \`@ControllerAdvice\` + \`@ExceptionHandler\` |

### 2.4 Spring Boot

| 点 | 说明 |
|----|------|
| **约定优于配置** | starter 依赖 + 自动配置 |
| **内嵌容器** | Tomcat / Jetty / Undertow |
| **\`application.yml\`** | 外部化配置；profile |
| **条件装配** | \`@ConditionalOnClass\` 等 |
| **Actuator** | 健康检查、指标（运维） |

### 2.5 数据与事务

| 点 | 说明 |
|----|------|
| **Spring Data JPA** | Repository 抽象；方法名查询 |
| **\`@Transactional\`** | 声明式；传播、隔离、rollbackFor |
| **失效场景** | 自调用、非 public、检查异常未配置回滚、错误传播级别 |
| **连接池** | HikariCP 等 |

### 2.6 常见扩展（名称级）

| 模块 | 用途 |
|------|------|
| Spring Security | 认证授权 |
| Spring Cloud | 微服务（配置、网关、发现） |
| Spring Batch | 批处理 |
| Kafka/Rabbit 集成 | 消息驱动 |

---

## 3. 与本仓：子服，不进 www

| 层次 | 本仓怎么做 | Spring 的位置 |
|------|------------|---------------|
| **主服 HTTP** | \`core/*/http\` + \`HttpResponse\` + AgentRuntime | 门面/聚合；**不**用 Spring 替换 Runtime |
| **浏览器页面** | \`core/*/www/\` Vue/React/Angular/Next | Spring **不是**前端框架 |
| **Java 后端** | **jserver** 子服 | Spring Boot 应用跑在子服进程 |
| **调用链** | 浏览器 → www 调主服 API → 必要时转发 jserver | JSON over HTTP |

\`\`\`mermaid
flowchart LR
  subgraph www_layer [www 浏览器层]
    Vue[Vue vibe-learn 等]
  end
  subgraph main [主服 Node]
    Http[core/*/http]
  end
  subgraph sub [子服]
    J[Spring jserver]
  end
  Vue --> Http
  Http --> J
\`\`\`

**切记：** \`sign.json\` 只服务 **www 前端工程**；Spring 项目若在本仓，走子服加载约定，**不要**当静态 dist 挂到 \`/某路径/\`（除非是纯静态资源，那不是 Spring MVC 主场景）。

---

## 4. 和大厂面试怎么答

### 「Spring 是库还是框架？」

**框架（Framework）**——**IoC**（Inversion of Control，控制反转）容器管理 Bean 生命周期，**AOP**（Aspect-Oriented Programming，面向切面编程）处理横切关注点。  
宿主语言：**Java**；运行平台：**JVM**（Java Virtual Machine，Java 虚拟机）。  
与 **NestJS**（TypeScript + Node 上的类似 DI 分层）对照：都有模块与注入，生态与语言不同。  
**本仓**：主服是 **Node AgentRuntime**；Spring 在 **jserver 子服**，**不进 www**，**不替换**主服入口。

### 「IoC 和 DI 区别？」

**IoC** 是思想：控制权从业务代码交给容器。  
**DI**（Dependency Injection，依赖注入）是 IoC 的**实现方式**之一：构造器/Setter 注入依赖，而非 \`new\`。  
Spring 的 \`ApplicationContext\` 就是 IoC 容器。

### 「\`@Transactional\` 什么时候失效？」

同类 **自调用**（\`this.foo()\` 不走代理）、**非 public** 方法、**检查异常**未配置 \`rollbackFor\`、错误 **传播级别** 导致不回滚。  
AOP 基于 JDK 动态代理或 CGLIB；自调用绕过代理层。

### 「Spring Boot 自动配置原理？」

\`@EnableAutoConfiguration\` + \`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports\` + **条件装配**（\`@ConditionalOnClass\` 等）： classpath 有某类才生效。

### 「在本仓 Spring 放哪？」

浏览器 UI → **www**（Vue/React）；主服门面 → \`core/*/http\` + HttpResponse；Java 能力 → **jserver** 子服 Spring Boot 进程。

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [spring-projects/spring-boot](https://github.com/spring-projects/spring-boot) | ⭐ 七万级 | 自动配置、Starter、Actuator | **jserver** 企业 API 主框架 |
| [spring-projects/spring-framework](https://github.com/spring-projects/spring-framework) | ⭐ 五万级 | IoC、AOP、事务 | 对照 Nest / ASP.NET DI |
| [spring-projects/spring-security](https://github.com/spring-projects/spring-security) | ⭐ 九千级 | 过滤器链、认证授权 | 子服鉴权；主服 Auth 另课 |

---

## 5. 下一步

- 语言：**Java**  
- DI 对照：**NestJS** · **ASP.NET Core** · **Angular**（前端 DI）  
- Python 后端：**Django/FastAPI**  
- 本仓：**子服务端** · **HTTP 与 www** · **语言栈**  
- 可选：翻 Boot 自动配置入口，记住 **sign.json 不挂 Spring 进程**。
`;
