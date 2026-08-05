export default `# PHP（语言）

> **分类：编程语言。** 为 Web 而生的脚本语言；请求级生命周期常见。  
> 本仓 **\`phpserver\`** 子服。框架见 **Laravel**（框架轨）。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 边界 | PHP 子服；主服仍是 JS |
| 分层 | Laravel 是框架，语言是 PHP |
| 场景 | 能说何时用 PHP 子服而非硬改主服 |
| 跟 Agent | 路径指到 subserver PHP runtime |


## 本课你要带走什么

1. **什么场景该用 PHP 子服、什么场景 Node/Python 更合适**  
2. 请求模型、类型演进、OOP 现代语法怎么讲清  
3. phpserver 在本仓与主服、其它子服如何分工

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"PHP · 身份翻卡","cards":[{"front":"PHP","back":"Web 历史深厚；本仓可有 PHP 子服"},{"front":"语言 ≠","back":"某一个框架或某一个云产品"},{"front":"接到本仓","back":"主服 JS；其它语言多在子服"}]}
\`\`\`

### 1.1 适合用 PHP 的场景

| 场景 | 为什么选 PHP |
|------|--------------|
| **传统 LAMP/LEMP Web** | 共享主机、WordPress、成熟部署 |
| **本仓 phpserver 插件** | 遗留 PHP 库、字符串/文本处理 |
| **快速 CRUD 页面** | Laravel 脚手架快 |
| **内容站、电商 CMS** | WordPress、Magento 生态 |
| **轻量 API（现代 PHP 8+）** | 类型声明、JIT、性能改善 |
| **团队已有 PHP 资产** | 迁移到别的语言成本高 |

### 1.2 不适合 / 通常别用的场景

| 场景 | 更好选择 | 原因 |
|------|----------|------|
| **本仓主服** | **JavaScript** | Node AgentRuntime |
| **长连接 WebSocket 中枢** | **Node / Go** | FPM 请求模型偏短 |
| **复杂 AI/ML** | **Python** pyserver |
| **系统编程** | **Rust / C / Go** | 非 PHP 强项 |
| **强类型大型微服务（新立项）** | Java / Go / C# | 历史包袱与类型纪律 |
| **高并发常驻内存服务** | **Go / Node** | 传统 PHP 进程模型 |

### 1.3 与 JavaScript / Python / Java 怎么选（口述）

| 需求 | 更偏向 |
|------|--------|
| 本仓主服、长驻 Agent | **JavaScript** |
| CMS/WordPress/PHP 遗留 | **PHP** phpserver |
| AI、爬虫、科学计算 | **Python** |
| 企业 Spring | **Java** |

\`\`\`mermaid
flowchart TB
  Req[HTTP 请求] --> FPM[PHP-FPM Worker]
  FPM --> Script[PHP 脚本]
  Script --> Resp[响应后释放状态]
  Main[主服 Node] -->|callSubserver| PHP[phpserver]
\`\`\`

---

## 2. 语言特性（必须讲清楚）

### 2.1 类型与变量

| 点 | 说明 |
|----|------|
| **\`$\` 变量** | 动态类型；PHP 7/8 逐步加强类型 |
| **弱类型历史** | 松散 \`==\`；生产用 \`===\` |
| **类型声明** | 参数/返回值、\`declare(strict_types=1)\` |
| **\`null\` 安全** | \`?\` 可空、\`?->\` 空安全运算符 |
| **联合类型（8+）** | \`int\\|string\` |

### 2.2 请求模型（理解 PHP 的钥匙）

| 点 | 说明 |
|----|------|
| **PHP-FPM** | 一请求一（或复用）worker；**请求结束释放大量状态** |
| **与 Node 对照** | Node 长驻进程；PHP 更「无状态脚本」 |
| **超全局** | \`$_GET\`/\`$_POST\`/\`$_SERVER\`；框架常封装 |
| **Session** | 无状态 HTTP 上的服务器端状态 |

### 2.3 数组与字符串

| 点 | 说明 |
|----|------|
| **数组 = 有序映射** | 既是 list 又是 map |
| **字符串函数丰富** | 文本处理；注意 UTF-8 |
| **引用 \`&\`** | 别名；易踩坑 |

### 2.4 OOP（现代 PHP）

| 点 | 说明 |
|----|------|
| **类 / 接口 / trait** | 横向复用 trait |
| **命名空间** | PSR-4 自动加载 |
| **属性提升、枚举、只读（8.x）** | 语法现代化 |
| **魔术方法** | \`__construct\` \`__get\` 等 |

### 2.5 错误与异常

| 点 | 说明 |
|----|------|
| **Error vs Exception** | PHP 7+ 更多可捕获 Error |
| **不要静默 \`@\`** | 掩盖问题 |

---

## 3. 工具链

| 工具 | 作用 |
|------|------|
| **Composer** | 依赖与 PSR-4 自动加载 |
| **PHP-FPM + Nginx/Apache** | 生产 Web |
| **PHPUnit** | 测试 |
| **PHPStan / Psalm** | 静态分析 |
| **Laravel Sail / Valet** | 本地开发（框架层） |

---

## 4. 与本仓

| 项 | 说明 |
|----|------|
| **Runtime** | \`subserver/phpserver\` |
| **调用** | 主服 HTTP → phpserver |
| **框架** | **Laravel**（另课） |
| **典型** | 字符串处理、轻量 Web、遗留 PHP 集成 |
| **主服** | 不用 PHP 写 AgentRuntime |

---

## 5. 大厂真题

| 题 | 答法要点 |
|----|----------|
| PHP-FPM 模型 | 与常驻 Node 差异 |
| \`==\` vs \`===\` | 类型转换陷阱 |
| PSR-4 自动加载 | Composer 与命名空间 |
| Session 与 Cookie | 无状态 HTTP 上的状态 |
| trait  vs 继承 | 横向复用 |
| OPcache / JIT 8+ | 性能改善直觉 |

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [php/php-src](https://github.com/php/php-src) | ⭐ 三万级 | 解释器、Zend、请求生命周期 | 理解 **phpserver** / FPM 与 Node 常驻差异 |
| [laravel/laravel](https://github.com/laravel/laravel) | ⭐ 八万级 | 应用骨架、目录约定、Artisan | \`subserver/phpserver\` 典型起步模板 |
| [composer/composer](https://github.com/composer/composer) | ⭐ 两万级 | 依赖与 PSR-4 自动加载 | PHP 插件依赖管理对照 |

---

## 6. 下一步

**Laravel** · **JavaScript**（主服对照）· **Python** · **语言栈** · **子服务端** · **技术选型**。  
可选：打开 Laravel 骨架的 \`routes/\`，对照 phpserver 插件怎么暴露 API。
## 导图2 · 后端 / 技术栈 × PHP

> PHP 常见于 Web；本仓走 PHP 子服。Laravel 是框架。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **后端** | 请求式 Web 传统强项 | 本仓子服，非主服 |
| **技术栈** | 常搭 Laravel | 见 fw-laravel |
| **部署上线** | 另一运行时进程 | 与 Node 主服 HTTP 协作 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
