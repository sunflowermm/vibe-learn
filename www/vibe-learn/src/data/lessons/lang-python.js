export default `# Python（语言）

> **分类：编程语言。** 动态类型、强类型（运算不随便隐式乱转）、缩进定块。  
> 本仓默认子服 **\`pyserver\`（:8000）**。Web 框架见 **Django / FastAPI**（框架轨，不是语言本身）。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 边界 | Python 走子服，不改主服 Node |
| 场景 | 能举 1～2 个该扔给 pyserver 的能力 |
| 对照 | 框架（Django/FastAPI）≠ 语言 |
| 跟 Agent | 子服任务写清 runtime 与 HTTP 契约 |


## 本课你要带走什么

1. **什么场景该扔给 Python 子服、什么该留主服 JS**  
2. 对象模型、GIL、装饰器、异步等特性怎么讲清  
3. 主服如何通过 HTTP 调 pyserver，和 Go/Rust 如何分工

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"Python · 身份翻卡","cards":[{"front":"Python","back":"胶水、数据、脚本；本仓常见 Python 子服"},{"front":"语言 ≠","back":"某一个框架或某一个云产品"},{"front":"接到本仓","back":"主服 JS；其它语言多在子服"}]}
\`\`\`

### 1.1 适合用 Python 的场景

| 场景 | 为什么选 Python |
|------|-----------------|
| **AI / LLM / 爬虫 / 数据处理** | numpy、pandas、requests、各类 ML 库 |
| **快速脚本与胶水** | 语法简洁、REPL 友好、原型快 |
| **本仓 pyserver 插件** | 重生态短板：文档解析、媒体管道、科学计算 |
| **异步 I/O Web（FastAPI）** | asyncio + 类型提示；适合 API 子服 |
| **运维自动化、小工具** | 跨平台；比 Shell 结构更清晰 |
| **教学与数据科学** | 可读性高、社区教材多 |

### 1.2 不适合 / 通常别用的场景

| 场景 | 更好选择 | 原因 |
|------|----------|------|
| **本仓主服插件、HTTP 入口** | **JavaScript** | 主服契约是 Node AgentRuntime |
| **CPU 多核并行（单进程）** | **Go / Rust / multiprocessing** | CPython **GIL** 限制多线程 CPU |
| **超低延迟、无 GC 抖动** | **Rust / C++ / Go** | 解释器 + GC 开销 |
| **移动端 / 浏览器前端** | **JS/TS** | Python 不是浏览器语言 |
| **大型强类型企业单体** | **Java / C#** | 动态类型在大团队需纪律 |
| **只要一个静态二进制部署** | **Go** | Python 要携带解释器/venv |

### 1.3 与 JavaScript / Go / Rust 怎么选（口述）

| 需求 | 更偏向 |
|------|--------|
| 本仓编排、QQ/HTTP 主入口 | **JavaScript** 主服 |
| AI、脚本、库最全的「副引擎」 | **Python** pyserver |
| 高并发 HTTP 子服、单二进制 | **Go** goserver |
| CPU 热点、内存安全 | **Rust** rustserver |

\`\`\`mermaid
flowchart TB
  Main[主服 Node JS] -->|callSubserver HTTP| Py[pyserver :8000]
  Py --> AI[LLM/爬虫/数据处理]
  Py --> Lib[pip 生态库]
\`\`\`

---

## 2. 语言特性（必须讲清楚）

### 2.1 定位与执行

| 特征 | 说明 |
|------|------|
| **解释型为主** | 源码 → 字节码 → 解释；可有 .pyc |
| **万物皆对象** | 函数、类、模块都是对象 |
| **GIL（CPython）** | 同进程多线程难吃满多核 CPU；I/O 仍常用线程 |
| **多进程 / 异步** | CPU 并行用 \`multiprocessing\`；网络密集用 \`asyncio\` |

### 2.2 类型与对象模型

| 点 | 说明 |
|----|------|
| **动态类型** | 名绑定到对象；类型在对象上 |
| **强类型** | \`"1" + 2\` 直接报错（不像 JS 乱拼） |
| **可变 / 不可变** | \`list\`/\`dict\`/\`set\` 可变；\`str\`/\`tuple\`/\`frozenset\` 不可变 |
| **赋值 = 绑定** | 不拷贝；可变对象互相影响 |
| **类型提示（3.5+）** | 可选静态检查（mypy）；**不进运行时** |

### 2.3 作用域与命名

| 点 | 说明 |
|----|------|
| **LEGB** | Local → Enclosing → Global → Built-in |
| **\`global\` / \`nonlocal\`** | 改外层绑定要声明 |
| **\`*\` 参数** | 仅关键字参数；解包 \`*args\` \`**kwargs\` |

### 2.4 数据模型与魔术方法

| 点 | 说明 |
|----|------|
| **\`__init__\` / \`__new__\`** | 构造 |
| **\`__repr__\` / \`__str__\`** | 调试 vs 可读 |
| **上下文管理器** | \`with\` → \`__enter__\`/\`__exit__\` |
| **描述符 / property** | 属性访问挂钩 |

### 2.5 迭代、生成器、推导式

| 点 | 说明 |
|----|------|
| **迭代协议** | \`__iter__\` / \`__next__\` |
| **生成器** | \`yield\` 惰性序列；省内存 |
| **推导式** | \`[x for x in xs if …]\` |

### 2.6 装饰器与一等函数

| 点 | 说明 |
|----|------|
| **\`@decorator\`** | \`f = decorator(f)\` 的糖 |
| **带参装饰器** | 三层嵌套；\`functools.wraps\` |
| **\`@dataclass\`** | 样板代码生成 |

### 2.7 类与 OOP

| 点 | 说明 |
|----|------|
| **多重继承 / MRO** | C3 线性化；\`super()\` |
| **鸭子类型** | 有方法就行；\`typing.Protocol\` |

### 2.8 异步

| 点 | 说明 |
|----|------|
| **\`async def\` / \`await\`** | 协程；事件循环 asyncio |
| **与 GIL** | 异步解决等待，不是 CPU 并行 |

### 2.9 易错点（必背）

| 坑 | 正确做法 |
|----|----------|
| \`def f(a=[])\` | 用 \`None\`，函数内建新列表 |
| 晚绑定闭包 | \`lambda i=i: …\` |
| 浅拷贝 | \`copy.copy\` vs \`deepcopy\` |
| \`is\` vs \`==\` | 身份 vs 相等 |

---

## 3. 工具链

| 工具 | 作用 |
|------|------|
| **pip / uv** | 包安装；本仓推荐 venv 隔离 |
| **venv / conda** | 环境隔离 |
| **pytest** | 测试 |
| **ruff / black** | lint 与格式 |
| **mypy** | 可选静态类型检查 |

---

## 4. 与本仓

| 项 | 说明 |
|----|------|
| **Runtime** | \`subserver/pyserver\` 默认 **:8000** |
| **调用** | 主服 HTTP → 子服；**不在主服进程嵌 CPython** |
| **插件** | \`subserver/pyserver/apis/<group>/\` |
| **配置** | 子服只读 yaml；**主服编辑** commonconfig |
| **框架** | Django / FastAPI 在子服内选型（另课） |
| **命令** | 子服运维在 **子服终端 \`子服>\`**，不经主服 stdin |

---

## 5. 大厂真题

| 题 | 答法要点 |
|----|----------|
| GIL 是什么、怎么绕 | I/O 线程；CPU 多进程/C 扩展/换语言 |
| 可变默认参数 | 共享同一默认对象 |
| 迭代器与生成器 | 状态机 vs 工厂 |
| \`*\` \`**\` 与解包 | 传参与拆包 |
| 深拷贝场景 | 嵌套可变结构 |
| list vs tuple | 可变性与可哈希 |

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [python/cpython](https://github.com/python/cpython) | ⭐ 六万级 | 解释器、GIL、标准库边界 | 理解 **pyserver** 为何是独立进程 |
| [fastapi/fastapi](https://github.com/fastapi/fastapi) | ⭐ 八万级 | 依赖注入、OpenAPI、async 路由 | \`subserver/pyserver\` 插件式 API 选型 |
| [pydantic/pydantic](https://github.com/pydantic/pydantic) | ⭐ 两万级 | 数据校验、模型与序列化 | 子服请求/响应契约；对照主服 yaml schema |

---

## 6. 下一步

**Django / FastAPI** · **Go / Rust**（性能对照）· **语言栈** · **子服务端** · **技术选型**。  
可选：读 FastAPI 一个最小路由示例，对照 \`callSubserver\` → pyserver 的调用链。
## 导图2 · 后端 / 技术栈 × Python

> Python 在导图2/业界常作数据与脚本；**本仓不进主服**，能力走 Python 子服。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **后端** | CPython 等运行时 | 本仓：\`subserver\` Python runtime，非改主服 |
| **技术栈** | Django/FastAPI 等 | 框架在语言之上；本仓框架课另挂 |
| **部署上线** | 另一进程 | 经 HTTP 契约调用；配置主服编辑 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
