/** Django / FastAPI — 场景 + 特性 + 本仓子服对照（加厚） */
export default `# Django / FastAPI（框架）

> **分类：Python Web 框架（两个不同风格）。不是语言。**  
> 宿主语言：**Python**；ASGI/WSGI 运行时：**Uvicorn/Gunicorn/uWSGI** 等。  
> 本仓经 **pyserver 子服**使用 Python 能力；**不进 www**；浏览器 UI 仍走 **Vue/React → www**。

## 本课你要带走什么

1. Django 与 FastAPI **各自何时用、何时别用**  
2. MTV、ORM、Admin vs 类型驱动 API、Depends 等**特性**  
3. 在本仓 **pyserver 子服** 与主服 \`http/\`、www 的分工

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"Django / FastAPI · 翻卡","cards":[{"front":"Django / FastAPI","back":"Python Web 两路：全家桶 vs 高速 API"},{"front":"框架边界","back":"不替代 DBMS / OS / 运行时"},{"front":"本仓 www","back":"静态前端挂 core/*/www/<应用名>"}]}
\`\`\`

### 1.1 Django —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **全栈后台 + Admin + 用户权限** | Admin、Auth、Session 开箱 |
| **内容站、CMS、内部运营系统** | ORM + 模板 + 表单 |
| **快速 CRUD、迁移规范** | \`makemigrations\` / \`migrate\` |
| **团队熟悉「电池Included」** | 路由、中间件、缓存、国际化一体 |
| **本仓 pyserver 跑 Django 服务** | 主服门面调子服 API |

### 1.2 Django —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **纯高性能 JSON 微 API、极致 OpenAPI** | FastAPI 更贴类型与 async |
| **强实时 WebSocket 集群** | 要选对 ASGI 部署与架构 |
| **极简脚本几个端点** | Flask/FastAPI 更轻 |
| **把 Django 模板当本仓主 UI** | 复杂 SPA 推荐 **www + Vue/React** |
| **CPU 密集算在 sync view 里** | GIL；应 offload 或 async/队列 |

### 1.3 FastAPI —— 什么时候用

| 场景 | 为什么合适 |
|------|------------|
| **现代 REST/JSON API** | 类型注解 → 校验 + OpenAPI 文档 |
| **I/O 密集、高并发等待** | \`async def\` + ASGI |
| **微服务、BFF、与前端 SPA 配合** | 前后端分离 |
| **Pydantic 数据模型** | 请求/响应 schema 清晰 |
| **本仓 pyserver 轻量 API** | 与主服 \`http/\` 协作 |

### 1.4 FastAPI —— 什么时候别用 / 要谨慎

| 场景 | 风险 |
|------|------|
| **要强 Admin、完整 CMS** | Django Admin 更省工 |
| **团队不熟类型注解与 async** | 学习曲线 |
| **大量同步 ORM 阻塞** | 误用 async 反而更慢；要设计 session |
| **把 FastAPI 挂进 www** | 它是后端；页面走 www |
| **CPU 密集用 async 幻想提速** | async 解 **等待** 不解 **计算** |

### 1.5 二者 + 竞品对照（口述版）

| 维度 | Django | FastAPI | Flask |
|------|--------|---------|-------|
| 定位 | 全栈 + Admin | API 优先 | 微框架 |
| ORM | 内置 | 自选（SQLAlchemy 等） | 自选 |
| 文档 | 站点 + Admin | 自动 OpenAPI | 手写 |
| async | 3.x+ 支持 | 原生 ASGI | 2.x+ 可选 |
| 本仓 | pyserver | pyserver | 可 pyserver |

\`\`\`mermaid
flowchart TB
  Need[Python 后端] --> Full{要 Admin/全栈?}
  Full -->|是| Dj[Django]
  Full -->|否 API| Fa[FastAPI]
  Dj --> Py[pyserver 子服]
  Fa --> Py
  WWW[www Vue/React] --> Main[主服 http 门面]
  Main --> Py
\`\`\`

---

## 2. 框架特性（讲清楚）

### 2.1 Django：MTV 与 ORM

| 点 | 说明 |
|----|------|
| **MTV** | Model（ORM）/ Template / View（业务逻辑） |
| **ORM** | 模型即表；QuerySet 懒求值 |
| **迁移** | \`makemigrations\` → \`migrate\` 版本化 schema |
| **Admin** | 后台 CRUD；权限与用户体系 |
| **中间件** | 请求/响应管道：Session、CSRF、Security |
| **URL** | \`urls.py\` + \`include\` 分层 |
| **N+1** | \`select_related\`（FK）/ \`prefetch_related\`（M2M） |

\`\`\`mermaid
flowchart LR
  Req --> MW[Django 中间件]
  MW --> URL[URL 路由]
  URL --> View[View]
  View --> ORM[ORM Model]
  View --> Tpl[Template 可选]
\`\`\`

### 2.2 Django 安全与表单

| 点 | 说明 |
|----|------|
| **CSRF** | 表单 POST 防护 |
| **Auth** | User、Group、Permission |
| **Forms / ModelForm** | 服务端校验与渲染 |
| **静态文件** | \`collectstatic\`；生产常 CDN/反代 |

### 2.3 FastAPI：类型与 ASGI

| 点 | 说明 |
|----|------|
| **类型注解驱动** | 路径/查询/体 → 自动校验 |
| **Pydantic v2** | 模型；性能提升 |
| **\`async def\`** | I/O 等待时让出；Uvicorn/Hypercorn |
| **Depends** | 依赖注入：DB session、当前用户 |
| **OpenAPI** | \`/docs\` Swagger UI 自动生成 |
| **BackgroundTasks** | 轻量后台任务（非重型队列） |

### 2.4 FastAPI 请求生命周期（口述）

| 阶段 | 组件 |
|------|------|
| 路由匹配 | APIRouter |
| 依赖解析 | Depends 树 |
| 校验 | Pydantic |
| 业务 | 路径函数 |
| 响应 | JSON 序列化 |

### 2.5 GIL 与 async（面试常问）

| 点 | 说明 |
|----|------|
| **GIL** | 同一进程内多线程 CPU 并行受限 |
| **async 价值** | 等 DB/HTTP 时不阻塞线程 |
| **CPU 密集** | 多进程、C 扩展、任务队列 |

---

## 3. 与本仓：pyserver 子服，不进 www

| 层次 | 位置 | Django/FastAPI |
|------|------|----------------|
| **浏览器 UI** | \`core/*/www/\` + sign.json | **不用** Django 模板作主 SPA（推荐 Vue/React） |
| **主服 API** | \`core/*/http/*.js\` | Node 侧门面、聚合、鉴权 |
| **Python 能力** | **pyserver** | Django/FastAPI 进程 |
| **数据流** | www \`fetch\` → 主服 http → 可选转发 pyserver | JSON |

\`\`\`mermaid
flowchart LR
  subgraph www_layer [www]
    VL[vibe-learn Vue3]
  end
  subgraph main [主服]
    H[core/*/http]
  end
  subgraph sub [pyserver]
    Py[Django / FastAPI]
  end
  VL --> H
  H --> Py
\`\`\`

**sign.json** 只描述 **www 前端工程**（如 vibe-learn 的 Vue3+Vite）。Python 框架**不**通过 \`mountCoreWwwStatic\` 当静态站挂 dist（除非你只是 export 纯静态，那不是 MVC 主路径）。

---

## 4. 和大厂面试怎么答

### 「Django / FastAPI 是库还是框架？」

**都是 Web 框架（Framework）**——定路由、请求生命周期、ORM/依赖注入约定，**框架调你的 View/路由函数**。  
宿主语言：**Python**；运行时：**CPython** 等；部署常用 **Uvicorn/Gunicorn**（ASGI/WSGI 服务器）。  
**Django**：全栈 + Admin + **ORM**（Object-Relational Mapping，对象关系映射）；**FastAPI**：API 优先 + OpenAPI + \`async\`。  
**本仓**：Python 走 **pyserver 子服**；UI 在 **www**（Vue）；主服是 Node，**不是 Django/FastAPI**。

### 「Django vs FastAPI 怎么选？」

要 **Admin、CMS、全栈后台** → Django；要 **现代 JSON API、OpenAPI、I/O 密集 async** → FastAPI。  
与 **Flask**（微框架）对照：Flask 更轻，结构靠自觉。

### 「GIL 和 asyncio？」

**GIL**（Global Interpreter Lock，全局解释器锁）：同一进程内多线程 **CPU 并行**受限。  
**asyncio** 价值在 **I/O 等待**时不阻塞线程；**CPU 密集**仍要多进程/队列/C 扩展。  
**别幻想** \`async def\` 能加速纯计算。

### 「WSGI vs ASGI？」

**WSGI**（Web Server Gateway Interface）：同步请求模型，一请求一线程/进程常见。  
**ASGI**（Asynchronous Server Gateway Interface）：异步事件循环，WebSocket、长连接友好；FastAPI 基于 **Starlette**（ASGI 框架）。

### 「在本仓 Python 放哪？」

\`core/*/http\` 主服门面 → 可选转发 **pyserver**（Django/FastAPI）；浏览器 **www** 用 Vue/React \`fetch\` 调 API。

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [django/django](https://github.com/django/django) | ⭐ 八万级 | MTV、ORM、Admin、中间件 | **pyserver** 全栈/后台型插件 |
| [fastapi/fastapi](https://github.com/fastapi/fastapi) | ⭐ 八万级 | Depends、OpenAPI、async | **pyserver** API 型首选 |
| [encode/starlette](https://github.com/encode/starlette) | ⭐ 一万级 | ASGI 应用与中间件 | FastAPI 底座；\`callSubserver\` HTTP 契约 |

---

## 5. 下一步

- 语言：**Python**  
- 对照后端：**Express/Nest** · **Spring** · **Gin**  
- 前端：**HTTP 与 www** · **Vue**  
- 本仓：**子服务端** · **语言栈**  
- 可选：读 FastAPI 最小路由，对照主服 \`callSubserver\` → pyserver。
`;
