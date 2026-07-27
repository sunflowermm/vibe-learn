/** Java — 场景 + 特性加厚 */
export default `# Java（语言）

> **分类：编程语言。** 静态类型、面向对象、字节码 + **JVM**。  
> 本仓 **\`jserver\`（:8003）** 子服。框架见 **Spring**（不是语言）。

## 本课你要带走什么

1. **什么场景该用 Java 子服、什么场景 Node/Go 更合适**  
2. JVM、泛型擦除、并发、GC 等特性怎么讲清  
3. 在本仓里 jserver 与主服 JS 如何分工

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"Java · 身份翻卡","cards":[{"front":"Java","back":"JVM 生态；企业后端常见"},{"front":"语言 ≠","back":"某一个框架或某一个云产品"},{"front":"接到本仓","back":"主服 JS；其它语言多在子服"}]}
\`\`\`

### 1.1 适合用 Java 的场景

| 场景 | 为什么选 Java |
|------|---------------|
| **大型企业后端** | Spring 生态、成熟 ORM、事务、安全 |
| **本仓 jserver 插件** | 已有 Java 库、企业集成（SOAP、LDAP 等） |
| **高吞吐、长生命周期服务** | JVM JIT、线程池、成熟监控 |
| **Android（历史）** | 语言层与 JVM 系相通 |
| **强类型 + 大量第三方中间件** | Kafka、Elasticsearch 客户端一等 |
| **团队熟悉 OOP + 设计模式** | 接口、抽象类、企业规范 |

### 1.2 不适合 / 通常别用的场景

| 场景 | 更好选择 | 原因 |
|------|----------|------|
| **本仓主服** | **JavaScript** | AgentRuntime 在 Node |
| **极简脚本、一次性任务** | Python / Shell | 启动与样板重 |
| **单文件小工具、边缘设备** | Go / Rust | JVM 内存 footprint |
| **前端页面** | **JS/TS** | Java 不进浏览器 |
| **超低延迟 HFT** | C++ / Rust | GC 与 JIT 预热 |
| **快速 AI 原型** | **Python** | ML 生态 |

### 1.3 与 C# / Go / JavaScript 怎么选（口述）

| 需求 | 更偏向 |
|------|--------|
| 微软栈 / Azure / Unity | **C#** netserver |
| 开源企业后端、Spring | **Java** jserver |
| 轻量高并发子服 | **Go** |
| 本仓编排与 IM/HTTP 主入口 | **JavaScript** |

\`\`\`mermaid
flowchart TB
  Main[主服 Node] -->|HTTP| J[jserver :8003]
  J --> Spring[Spring Boot 等]
  J --> JVM[JVM + GC + JIT]
\`\`\`

---

## 2. 语言特性（必须讲清楚）

### 2.1 类型与内存模型

| 点 | 说明 |
|----|------|
| **原始类型 vs 引用类型** | \`int\` 与 \`Integer\`；装箱拆箱 |
| **值在栈/堆的直觉** | 对象在堆；引用在栈帧 |
| **\`==\` vs \`equals\`** | 引用身份 vs 语义相等 |
| **字符串常量池** | 别靠 \`==\` 比内容 |
| **\`final\`** | 不可再绑定；对象内容仍可能变 |

### 2.2 OOP

| 点 | 说明 |
|----|------|
| **封装 / 继承 / 多态** | 方法重写、动态分派 |
| **抽象类 vs 接口** | Java 8+ 接口 default 方法 |
| **访问控制** | public/protected/默认/private |
| **\`record\`（新）** | 不可变数据载体 |

### 2.3 泛型与集合

| 点 | 说明 |
|----|------|
| **类型擦除** | 运行时 \`List<String>\` 近似 \`List\` |
| **\`List\`/\`Map\`/\`Set\`** | ArrayList、HashMap、ConcurrentHashMap |
| **fail-fast** | 迭代中结构性修改抛 CME |

### 2.4 异常

| 点 | 说明 |
|----|------|
| **检查异常 vs 运行时异常** | \`Exception\` 要声明或捕获 |
| **try-with-resources** | AutoCloseable |
| **不要吞异常** | 至少打日志 |

### 2.5 并发

| 点 | 说明 |
|----|------|
| **\`synchronized\` / \`volatile\`** | 互斥与可见性 |
| **\`j.u.c\`** | Lock、线程池、并发集合 |
| **happens-before** | JMM 面试词 |
| **虚拟线程（21+）** | 轻量并发新选项 |

### 2.6 JVM 执行

\`\`\`
.java → javac → .class → 类加载 → 解释/JIT → 机器码
\`\`\`

| 点 | 说明 |
|----|------|
| **堆分代 + GC** | G1/ZGC 等；停顿与吞吐 |
| **类加载器** | 双亲委派 |
| **JIT** | 热点编译 |

---

## 3. 工具链

| 工具 | 作用 |
|------|------|
| **javac / java** | 编译与运行 |
| **Maven / Gradle** | 构建与依赖 |
| **JUnit / TestNG** | 测试 |
| **IntelliJ IDEA** | 主流 IDE |
| **jlink / jpackage** | 定制运行时与打包 |

---

## 4. 与本仓

| 项 | 说明 |
|----|------|
| **Runtime** | \`subserver/jserver\` **:8003** |
| **调用** | 主服 HTTP → jserver |
| **框架** | **Spring Boot**（框架轨另课） |
| **典型** | 企业 API、复杂事务、Java 专属中间件 |
| **主服** | 仍是 JS；Java 不替代 AgentRuntime |

---

## 5. 大厂真题

| 题 | 答法要点 |
|----|----------|
| HashMap 原理 | 数组+链表/红黑树；扩容 |
| 线程池怎么设 | IO vs CPU；队列与拒绝策略 |
| GC 根与可达性 | 标记清除直觉 |
| \`synchronized\` 与 Lock | 灵活性、条件队列 |
| 泛型擦除 | 运行时无 \`List<String>\` 类型参数 |
| equals 与 hashCode | 契约与 HashMap |

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [openjdk/jdk](https://github.com/openjdk/jdk) | ⭐ 两万级 | JVM、集合、并发原语 | **jserver** 托管运行时背景 |
| [spring-projects/spring-boot](https://github.com/spring-projects/spring-boot) | ⭐ 七万级 | 自动配置、Starter、生产就绪 | \`subserver/jserver\` 企业 API 首选框架 |
| [spring-projects/spring-framework](https://github.com/spring-projects/spring-framework) | ⭐ 五万级 | IoC、AOP、\`@Transactional\` | 对照 Nest/ASP.NET 的 DI 家族 |

---

## 6. 下一步

**Spring** · **C#**（对照托管）· **Go** · **语言栈** · **子服务端** · **技术选型**。  
可选：打开 Spring Boot 的「Getting Started」，对照 jserver 插件落点。
`;
