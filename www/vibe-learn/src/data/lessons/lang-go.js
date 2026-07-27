/** Go — 场景 + 特性加厚 */
export default `# Go（语言）

> **分类：编程语言。** 编译型、静态类型、CSP 并发、少关键字。  
> 本仓子服 **\`goserver\`（:8001）**。Web 框架见 **Gin**（框架轨）。

## 本课你要带走什么

1. **什么场景该用 Go 子服、什么场景 Python/Rust 更合适**  
2. 接口、goroutine、channel、错误处理等特性怎么讲清  
3. 主服如何调 goserver，和本仓其它子服如何分工

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"Go · 身份翻卡","cards":[{"front":"Go","back":"静态编译、并发友好；常见网关/工具"},{"front":"语言 ≠","back":"某一个框架或某一个云产品"},{"front":"接到本仓","back":"主服 JS；其它语言多在子服"}]}
\`\`\`

### 1.1 适合用 Go 的场景

| 场景 | 为什么选 Go |
|------|-------------|
| **高并发 HTTP/gRPC 微服务** | goroutine 轻量；标准库 \`net/http\` 成熟 |
| **本仓 goserver 插件** | 网络 I/O 密集、要稳定二进制部署 |
| **云原生工具** | Docker/K8s 生态大量 Go；单文件部署 |
| **CLI 与运维工具** | 交叉编译 \`GOOS/GOARCH\` 简单 |
| **团队要静态类型但不想 JVM 重量** | 编译快、语法小、无继承 |
| **中等 CPU + 高并发 I/O** | GC 可接受；比 Python 线程模型简单 |

### 1.2 不适合 / 通常别用的场景

| 场景 | 更好选择 | 原因 |
|------|----------|------|
| **本仓主服业务** | **JavaScript** | 主服是 Node AgentRuntime |
| **极致 CPU、无 GC 延迟** | **Rust / C++** | GC 停顿与逃逸到堆 |
| **AI/ML/数据科学** | **Python** pyserver | 生态不在 Go |
| **复杂 GUI / 游戏客户端** | C# / C++ / Rust | Go 偏服务端与工具 |
| **泛型-heavy 抽象框架** | Java / C# | Go 刻意保持简单 |
| **已有大量 JVM/.NET 资产** | Java / C# | 迁移成本 |

### 1.3 与 Python / Rust / Java 怎么选（口述）

| 需求 | 更偏向 |
|------|--------|
| 库最全、AI、脚本 | **Python** |
| 高并发子服、单二进制 | **Go** |
| 无 GC、CPU 热点 | **Rust** |
| 企业 Spring 生态 | **Java** jserver |

\`\`\`mermaid
flowchart TB
  Need[子服能力] --> IO{高并发 I/O?}
  IO -->|是，团队要简单| Go[goserver]
  IO -->|要 ML/脚本库| Py[pyserver]
  Need --> CPU{CPU 极限?}
  CPU -->|是| Rust[rustserver]
\`\`\`

---

## 2. 语言特性（必须讲清楚）

### 2.1 定位

| 特征 | 说明 |
|------|------|
| **编译到机器码** | 部署丢二进制（注意 OS/Arch） |
| **GC** | 有垃圾回收；延迟敏感需 profiling |
| **显式错误** | \`error\` 当值返回；少异常 |
| **组合优于继承** | 无经典类继承；靠嵌入与接口 |

### 2.2 类型与声明

| 点 | 说明 |
|----|------|
| **静态类型** | 编译期检查；\`:=\` 推断 |
| **零值** | 未赋值也有可用零值 |
| **指针** | \`*T\`；无指针运算 |
| **切片 / 映射 / 通道** | 内建复合类型 |
| **数组 vs 切片** | 数组长度是类型一部分 |

### 2.3 函数与方法

| 点 | 说明 |
|----|------|
| **多返回值** | 惯用 \`(T, error)\` |
| **命名返回值** | 可读；注意影子变量 |
| **方法集** | 值接收者 vs 指针接收者 |
| **\`defer\`** | LIFO 延迟；关资源 |

### 2.4 接口（核心设计）

| 点 | 说明 |
|----|------|
| **隐式实现** | 有方法即实现；无需 \`implements\` |
| **小接口** | \`io.Reader\` 一个方法 |
| **\`any\`** | \`interface{}\` 别名 |
| **空接口陷阱** | 失去静态检查 |

### 2.5 并发（CSP）

| 点 | 说明 |
|----|------|
| **goroutine** | \`go f()\`；轻量 |
| **channel** | 通信；有缓冲/无缓冲 |
| **\`select\`** | 多路等待；超时 |
| **context** | 取消、截止；请求链路标配 |
| **GMP** | G 协程、M 线程、P 逻辑处理器 |

\`\`\`mermaid
flowchart LR
  G[Goroutine] --> P[P 处理器]
  P --> M[OS Thread]
\`\`\`

### 2.6 内存与安全

| 点 | 说明 |
|----|------|
| **逃逸分析** | 栈 vs 堆 |
| **竞态** | \`go test -race\` |
| **\`sync.Mutex\` / WaitGroup** | 原语 |
| **泛型（1.18+）** | 类型参数 |

### 2.7 包与可见性

| 点 | 说明 |
|----|------|
| **首字母大小写** | 大写导出 |
| **\`go.mod\`** | 模块路径与版本 |

### 2.8 错误处理

| 点 | 说明 |
|----|------|
| **\`if err != nil\`** | 显式；\`errors.Is/As\` |
| **panic/recover** | 库中少用 |

---

## 3. 工具链

| 工具 | 作用 |
|------|------|
| **\`go build\` / \`go run\`** | 编译与运行 |
| **\`go test\` / \`go test -race\`** | 测试与竞态检测 |
| **\`go mod\`** | 依赖管理 |
| **gofmt / go vet / staticcheck** | 格式与静态分析 |
| **delve** | 调试器 |

---

## 4. 与本仓

| 项 | 说明 |
|----|------|
| **Runtime** | \`subserver/goserver\` **:8001** |
| **调用** | 主服 HTTP → goserver；不嵌 Go runtime |
| **框架** | Gin 等（另课） |
| **典型** | 高并发 API、网关、解析服务 |
| **与 pyserver** | Python 偏生态；Go 偏并发二进制 |

---

## 5. 大厂真题

| 题 | 答法要点 |
|----|----------|
| goroutine 泄漏 | 未退出、未关 channel、无 context |
| channel 死锁 | 无人收发；select default |
| 切片扩容与共享底层 | 意外改写 |
| 接口与 nil | typed nil 陷阱 |
| GMP 调度 | 口述 M:N |
| defer 顺序 | LIFO；参数求值时机 |

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [golang/go](https://github.com/golang/go) | ⭐ 十二万级 | goroutine、channel、标准库 net/http | **goserver** 并发模型的语言根基 |
| [gin-gonic/gin](https://github.com/gin-gonic/gin) | ⭐ 八万级 | 路由、中间件、\`Context\` | \`subserver/goserver\` 典型 HTTP 框架 |
| [spf13/cobra](https://github.com/spf13/cobra) | ⭐ 四万级 | CLI 子命令、参数与帮助 | 子服运维命令 / 本地工具对照 |

---

## 6. 下一步

**Gin** · **Rust**（对照）· **Python** · **语言栈** · **子服务端** · **技术选型**。  
可选：翻 Gin 的中间件注册，对照 goserver 如何接主服 HTTP。
`;
