/** Laravel — 场景 + 特性 + 本仓 phpserver 子服对照（加厚） */
export default `# Laravel（框架）

> **分类：PHP Web 应用框架。不是语言。**  
> 宿主语言：**PHP**；常见运行：**PHP-FPM + Nginx/Apache** 或 **Laravel Octane**。  
> 本仓经 **phpserver 子服**暴露 PHP 能力；**不进 www**；复杂 SPA 仍推荐 **Vue/React → www**。

## 本课你要带走什么

1. Laravel **何时选、何时别用**，和 Django / Symfony 怎么口述  
2. 路由、Eloquent、Blade、容器、队列等**特性**  
3. 在本仓 **phpserver** 与主服 \`http/\`、www 的分工

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"Laravel · 翻卡","cards":[{"front":"Laravel","back":"PHP Web 框架"},{"front":"框架边界","back":"不替代 DBMS / OS / 运行时"},{"front":"本仓 www","back":"静态前端挂 core/*/www/<应用名>"}]}
\`\`\`

### 1.1 Laravel —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **PHP 生态快速 Web/API** | 全栈积木：路由、ORM、队列、事件 |
| **后台 + Blade 或 API 双模** | 同一框架两种输出 |
| **创业团队、外包交付** | 开发速度与文档社区 |
| **Artisan 工具链** | 迁移、代码生成、调度 |
| **本仓 phpserver 跑 Laravel** | 主服 http 门面转发 |

### 1.2 Laravel —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **极致低延迟、超高并发 API** | Go/Node 有时更优（视团队） |
| **团队无 PHP 运维经验** | FPM、扩展、部署细节 |
| **强类型企业规范选 Java/.NET** | 组织标准优先 |
| **把 Blade 当本仓复杂 SPA** | 交互重的前端用 **www + Vue/React** |
| **把 Laravel 挂 sign.json 当静态 www** | API/SSR 走 phpserver，不是 dist 挂载主路径 |

### 1.3 与竞品对照（口述版）

| 维度 | Laravel | Django | Symfony |
|------|---------|--------|---------|
| 语言 | PHP | Python | PHP |
| ORM | Eloquent AR | Django ORM | Doctrine |
| 模板 | Blade | Django Template | Twig |
| 定位 | 全栈敏捷 | 全栈 + Admin | 可组件化 |
| 本仓 | **phpserver** | **pyserver** | 可 phpserver |

\`\`\`mermaid
flowchart TB
  Need[PHP Web] --> Api{主要 JSON API?}
  Api -->|全栈/Blade| Lar[Laravel]
  Api -->|也可| Lar
  Lar --> PhpSrv[phpserver 子服]
  WWW[www Vue/React] --> Main[主服 http]
  Main --> PhpSrv
\`\`\`

---

## 2. 框架特性（讲清楚）

### 2.1 路由与中间件

| 点 | 说明 |
|----|------|
| **\`routes/web.php\`** | Web 中间件组：Session、CSRF |
| **\`routes/api.php\`** | API 前缀、节流 throttle |
| **路由定义** | 闭包或 \`[Controller::class, 'method']\` |
| **中间件** | 全局 / 路由组 / 单路由 |
| **路由模型绑定** | 自动注入 Eloquent 模型 |

\`\`\`mermaid
flowchart LR
  Req --> Route[Router]
  Route --> MW[Middleware 栈]
  MW --> Ctrl[Controller / Closure]
  Ctrl --> Out[Response]
\`\`\`

### 2.2 Eloquent ORM

| 点 | 说明 |
|----|------|
| **Active Record** | 模型即表；\`User::find(1)\` |
| **关联** | hasMany、belongsTo、多对多 |
| **N+1** | \`with('posts')\` 预加载 |
| **迁移** | \`php artisan migrate\` |
| **Accessor / Mutator / Cast** | 属性变换与类型 |

### 2.3 Blade 模板

| 点 | 说明 |
|----|------|
| **继承** | \`@extends\` \`@section\` |
| **组件** | \`<x-alert>\` 类组件 |
| **转义** | \`{{ }}\` 默认 XSS 安全 |
| **与 SPA** | API + www 前后端分离更常见 |

### 2.4 服务容器与 Provider

| 点 | 说明 |
|----|------|
| **容器** | 绑定接口 → 实现 |
| **\`app()->make(Foo::class)\`** | 解析依赖 |
| **Service Provider** | 注册绑定、启动逻辑 |
| **与 Spring DI 对照** | 概念相近，PHP 动态类型 |

### 2.5 Artisan 与异步积木

| 点 | 说明 |
|----|------|
| **Artisan CLI** | \`make:controller\` \`migrate\` |
| **队列 Queue** | 异步任务；Redis/Database 驱动 |
| **事件 Event / Listener** | 解耦业务 |
| **通知 Notification** | 邮件、Slack 等通道 |
| **调度 Schedule** | Cron 式任务 |

### 2.6 PHP-FPM 请求模型

| 点 | 说明 |
|----|------|
| **无长驻业务状态** | 请求结束释放（与 Node 长进程不同） |
| **Session** | Cookie + 文件/Redis 驱动 |
| **Octane** | Swoole/RoadRunner 长驻（高级部署） |

---

## 3. 与本仓：phpserver 子服，不进 www

| 层次 | 本仓 | Laravel |
|------|------|---------|
| **主服** | Node AgentRuntime + \`core/*/http\` | 不替换主服 |
| **www** | \`core/*/www/\` + sign.json | Vue/React/Angular/Next |
| **PHP 后端** | **phpserver** | Laravel 应用 |
| **Blade 页面** | 可 Laravel 输出 HTML | 复杂 SPA 仍推荐 www |

\`\`\`mermaid
flowchart LR
  subgraph www_layer [www]
    FE[Vue vibe-learn 等]
  end
  subgraph main [主服 Node]
    Http[core/*/http]
  end
  subgraph sub [phpserver]
    Laravel[Laravel API / Blade]
  end
  FE --> Http
  Http --> Laravel
\`\`\`

**vibe-learn 实例**：\`core/vibe-learn-Core/www/vibe-learn/\` 是 **Vue3+Vite**，\`sign.json\` \`enabled:false\` 挂 \`dist\`，mount \`/vibe-learn/\`。Laravel **不**走这条 www 静态挂载线（除非纯静态资源导出，非典型）。

---

## 4. 和大厂面试怎么答

### 「Laravel 是库还是框架？」

**Web 应用框架（Framework）**——路由、**Eloquent ORM**、Blade 模板、**服务容器（IoC）**、队列/Event 一体，**框架定 MVC 骨架**。  
宿主语言：**PHP**；常见运行：**PHP-FPM**（FastCGI Process Manager）+ Nginx，或 **Laravel Octane** 长驻。  
与 **Django**（Python 全栈 + Admin）对照：都偏快速交付；Laravel 在 PHP 外包/创业圈极流行。  
**本仓**：PHP 在 **phpserver 子服**；复杂 SPA 用 **www + Vue**；主服 Node，**不是 Laravel**。

### 「Eloquent N+1 怎么答？」

循环里访问关联模型触发多次查询 → **N+1 问题**。  
用 \`with('posts')\` **预加载（Eager Load）**；对比 Django 的 \`select_related\` / \`prefetch_related\`。

### 「服务容器是什么？」

Laravel **IoC 容器**：绑定接口 → 实现，\`app()->make(Foo::class)\` 解析依赖树。  
与 **Spring ApplicationContext** 概念相近；PHP 动态类型，绑定方式更灵活。

### 「CSRF 怎么答？」

\`web\` 中间件组启用 **CSRF**（Cross-Site Request Forgery，跨站请求伪造）防护；纯 **API** 路由用 token（Sanctum/Passport）而非 Session CSRF。

### 「FPM 和 Node 差异？」

**PHP-FPM**：请求级生命周期，无默认长驻业务状态（Octane 例外）。  
**Node**：长驻事件循环，适合 WebSocket、插件热加载——本仓主服选 Node 的原因之一。

### 「在本仓 PHP 放哪？」

**phpserver** 子服；vibe-learn 前端是 **Vue3+Vite** 挂 \`/vibe-learn/\`，不走 Laravel Blade 作主 SPA。

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [laravel/framework](https://github.com/laravel/framework) | ⭐ 三万级 | 容器、Eloquent、中间件组 | **phpserver** 框架内核 |
| [laravel/laravel](https://github.com/laravel/laravel) | ⭐ 八万级 | 应用骨架与目录约定 | 子服 PHP 插件起步模板 |
| [composer/composer](https://github.com/composer/composer) | ⭐ 两万级 | 依赖与自动加载 | PHP 生态装包；主服仍是 pnpm/Node |

---

## 5. 下一步

- 语言：**PHP**  
- 对照：**Django/FastAPI** · **Spring** · **Express/Nest**  
- 前端：**HTTP 与 www** · **Vue** · **React**  
- 本仓：**子服务端** · **语言栈**  
- 可选：打开 Laravel \`routes/\`，对照 phpserver 如何暴露给主服。
`;
