/** 项目鸟瞰 · 融合入口（含业务层全景入口） */
export default `# 项目鸟瞰 · XRK-AGT

> XRK-AGT = **通用后端运行时** + **可插拔业务 Core** + **多语言子服务进程族**。  
> \`src/\` 提供运行时基础设施；\`core/*/\` 承载产品能力；\`subserver/<runtime>/\` 按语言优势实现专用能力。  
> 第四章将序章至第三章的概念收束到本仓库的工程坐标；**业务扩展点的详细地图**见 **业务层全景**。

## 本课你要带走什么

1. 前几章概念分别落在本仓哪一层  
2. 主服 / Core / 子服三层分工（改哪里）  
3. 本框节点怎么走：先鸟瞰 → Runtime / Core → 扩展点 → 暴露面 → Stream → 第五章  
4. 知道 **业务层全景（biz-map）** 是扩展点索引页

---

## 1. 章节概念 → 本仓坐标

| 章节 | 关键概念 | 本仓落点 |
|------|----------|----------|
| **序章** | 进程、系统调用 | \`node app\` 启动主服；各子服为独立进程 |
| **第一章** | 终端、PATH、pnpm、Git | 仓库根安装与启动；子服各有启动命令 |
| **第二章** | 运行时、语言版图 | 主服 Node；子服 Python / Go / PHP / Java / .NET / Rust |
| **第三章** | 端口、HTTP、反代 | 主服对外端口；子服 8000–8005；\`callSubserver\` |
| **第五章** | LLM、MCP、Agent | 仅在主服 AiWorkflow / MCP 中运行 |

\`\`\`mermaid
flowchart TB
  C0[序章·进程] --> XRK[第四章·项目实践]
  C1[环境·工具链] --> XRK
  C2[语言·运行时] --> XRK
  C3[网络·HTTP] --> XRK
  XRK --> C5[第五章·AI 概念]
\`\`\`

---

## 2. 三层分工

\`\`\`mermaid
flowchart TB
  subgraph main["主服 Node"]
    AR[AgentRuntime]
    Core["core/<名>-Core/"]
    WF[workflow / HTTP / www / plugin …]
  end
  subgraph subs["子服族"]
    P[pyserver]
    G[goserver]
    O[其它 runtime]
  end
  Core --> AR
  WF --> AR
  AR -->|callSubserver| subs
\`\`\`

| 目标 | 修改位置 |
|------|----------|
| 产品能力、页面、业务 API | 对应 **Core** |
| 框架加载与全局能力 | **\`src/\`**（框架维护） |
| 语言生态专用能力 | **\`subserver/<runtime>/apis/\`** |
| 子服地址与开关 | 主服 \`ai-workflow\` → \`subserver.runtimes\` |

- **AgentRuntime**：主服中枢，提供 \`callSubserver\`、事件总线、加载器舞台  
- **Core**：业务包目录约定（plugin/http/www/…）  
- **子服**：多语言进程，共享 HTTP 契约；选型见 **语言栈**

---

## 3. 业务层全景入口

主服上「能挂的业务插座」不止插件一种。完整对照表（作用 / 目录 / 谁用 / 别搞混）在：

> **业务层全景（xrk-biz-map）** — plugin · http · www · workflow · tasker · events · commonconfig · factory · database · auth · MCP · renderer/crawl · subserver call

本课只要求你知道：**产品逻辑进 Core 扩展点，不进 \`src/\`**；需要查某一格时打开全景课。

---

## 4. 本框节点地图

| 节点 | 回扣 |
|------|------|
| **业务层全景** | 扩展点索引 |
| AgentRuntime | 序章·进程 · 全局裸名 · 热加载 |
| Core 放码 | 子目录职责 |
| 插件架构 | Loader 族 · 与 tasker/events 分工 |
| Tasker / events | 通道与监听 |
| Factory / 数据库 / Auth / MCP | 基建横切 |
| **语言栈** | 第二章 + 六 runtime |
| HTTP / www | 第三章 |
| **子服务端** | 多进程、端口、配置读写边界 |
| 配置归属 | 模板与 schema 契约 |
| Stream | 通往第五章（LLM 在主服） |
| 实践·插件 / 实践·子服 | 动手通关 |

## 建议阅读顺序

**部署环境** → 鸟瞰 → **业务层全景** → AgentRuntime → Core / 插件 → Tasker·events（按需）→ **语言栈** → HTTP → Auth → **子服务端** → 配置 → 数据库·Factory·MCP（按需）→ Stream → 实践课 → 第五章。

## 文档链接

\`docs/runtime-surface.md\` · \`docs/base-classes.md\` · \`docs/startup.md\` · \`AGENTS.md\`
`;
