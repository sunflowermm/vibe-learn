export default `# 业务层全景 · 扩展点地图

> 主服业务不是「随便塞进 \`src/\`」，而是落在一组**约定扩展点**上。  
> 本课把 plugin / http / www / workflow / tasker / events / commonconfig / factory / 数据库 / auth / MCP / renderer·crawl / 子服调用画成一张地图，方便后文按节点深挖。
> **学会之后**：能按扩展点地图指出 plugin/http/workflow/tasker/events/www 落点。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 地图 | 扩展点不是「随便写个文件」 |
| Loader | 扫描 core/*/ 对应子目录 |
| 调用 | 子服经 callSubserver / HTTP |
| 索引 | 卡住回本课，细节进分课 |


## 本课你要带走什么
\`\`\`steps
{"title":"业务层全景步骤","steps":[{"title":"先鸟瞰","body":"主服 / Core / 子服。"},{"title":"对扩展点","body":"plugin、http、workflow、events…"},{"title":"对暴露面","body":"HTTP、www、通道。"},{"title":"再实践","body":"最小插件 / 子服实验课。"}]}
\`\`\`


1. 每个扩展点的**作用、目录、谁来用、别和谁搞混**  
2. 一张分层 mermaid：通道 → Runtime → 业务扩展 → 外部能力  
3. 知道下一课该进哪条线（插件实践 / 通道 / 工作流 / 子服）

---

## 1. 分层总览
\`\`\`match
{"title":"业务层全景配对","pairs":[{"id":"ext","left":"扩展点","right":"plugin/http/workflow/…"},{"id":"map","left":"全景图","right":"先看地图再钻一课"},{"id":"bound","left":"边界","right":"Core vs Runtime 一眼能指"}]}
\`\`\`


\`\`\`mermaid
flowchart TB
  subgraph ch["通道层 Tasker"]
    OB[OneBot / QQBot]
    ST[stdin]
    FS[飞书等]
  end
  subgraph rt["Runtime 中枢"]
    AR[AgentRuntime]
    EM["em 事件总线"]
  end
  subgraph biz["Core 业务扩展"]
    PL[plugin]
    HT[http]
    WW[www]
    WF[workflow]
    EV[events]
    CC[commonconfig]
  end
  subgraph infra["基建与外部"]
    FAC[factory LLM/ASR/TTS]
    DB[Redis/SQLite + 可选 DB Core]
    AUTH[runtime-auth]
    MCP[MCP 挂载]
    REN[renderer / crawl]
    SUB["callSubserver"]
  end
  ch --> AR
  AR --> EM
  EM --> PL
  EM --> EV
  AR --> HT
  AR --> WW
  AR --> WF
  AR --> CC
  WF --> FAC
  WF --> MCP
  HT --> AUTH
  AR --> DB
  AR --> SUB
  PL --> WF
  HT --> SUB
\`\`\`

| 层 | 一句话 |
|----|--------|
| **通道** | 把平台协议变成统一事件（\`e\`） |
| **Runtime** | 加载、挂载、鉴权、调子服、发事件 |
| **Core 扩展** | 产品真正写业务的地方 |
| **基建 / 外部** | 模型工厂、存储、MCP、渲染抓取、多语言子服 |

---

## 2. 模块职责表（一行一眼）

| 模块 | 作用 | 目录约定 | 谁来用 | 别和谁搞混 |
|------|------|----------|--------|------------|
| **plugin** | 指令 / 消息业务逻辑 | \`core/*/plugin/*.js\` | 产品开发者 | ≠ tasker（通道适配） |
| **http** | 对外 HTTP API | \`core/*/http/*.js\` | 产品 / 控制台 | ≠ www（页面） |
| **www** | 静态 / SPA 前端 | \`core/*/www/<应用>/\` | 前端 / 产品 | ≠ \`src/\`；根名勿用保留段 |
| **workflow** | AI 对话编排 | \`core/*/workflow/*.js\` | AI 能力作者 | LLM 只在主服；见工作流课 |
| **办事助手** | 工作区注入 · 办公技能 | \`agents/\` → \`data/ai-workspace/{id}/\` | 运维 / 用户定制 | 见办事助手课 · \`docs/agents.md\` |
| **tasker** | 协议适配 → 事件 | \`core/*/tasker/*.js\` | 通道接入 | \`e.bot\` 为通道账号；编排用 \`AgentRuntime\` |
| **events** | 生命周期 / 总线监听 | \`core/*/events/*.js\` | 系统钩子 | 含 \`ai-workspace\` 等系统监听 |
| **commonconfig** | 配置 Schema + 控制台表单 | \`core/*/commonconfig/*.js\` | 配置作者 | 产品模板在 \`default/\` |
| **factory** | LLM / ASR / TTS 客户端 | \`src/factory/{llm,asr,tts}/\` | 框架；业务经工厂取客户端 | 工厂供客户端，工作流做编排 |
| **database** | Redis+SQLite 必需；Mongo/PG/向量可选 | \`src/infrastructure/database/\`；\`*-Core\` | Runtime / 可选 Core | 可选 Core 不参与 fail-fast |
| **auth** | API Key / WS 鉴权 | \`runtime-auth.js\` + \`docs/AUTH.md\` | 所有 \`/api/*\` | HttpApi 默认校验 |
| **MCP** | 工具对外 / 对 LLM | \`mcp-server\` + \`system-Core/http/mcp\` | 外部 AI / 工作流 | 概念见第五章；挂载见 MCP 课 |
| **renderer / crawl** | 渲染与抓取基建 | \`src/infrastructure/renderer\` · \`crawl\` | 出图 / 抓页 | 业务仍落 Core 或渲染器目录 |
| **subserver call** | 主服调多语言子进程 | \`AgentRuntime.callSubserver\` | 主服业务 | 子服配置只读；命令在子服终端 |

---

## 3. 本仓路径速查

| 想改什么 | 先打开 |
|----------|--------|
| 全局怎么用 | \`docs/runtime-surface.md\` |
| 基类最小形状 | \`docs/base-classes.md\` |
| 扩展点总览 | \`docs/框架可扩展性指南.md\` |
| 启动链 | \`docs/startup.md\` · \`app.js\` → \`start.js\` → \`src/agent-runtime.js\` |
| Loader 族 | \`src/infrastructure/*/loader.js\` |

\`\`\`
core/<名>-Core/
  plugin/  http/  www/<应用>/  workflow/
  tasker/  events/  commonconfig/  default/
src/
  infrastructure/   # Loader · 基类 · auth · database · …
  factory/          # llm | asr | tts
  utils/            # HttpResponse · mcp-server · callSubserver 辅助 …
subserver/<runtime>/apis/<group>/
\`\`\`

---

## 4. 示例与产品仓库（按业务层对照）

> 多数产品 / 通道 / 数据 Core 是**独立 Git 仓库**，clone 到 \`core/<名>/\` 即可被 Loader 扫描。  
> **system-Core** 在主仓白名单内，无独立 remote。  
> 生态索引：[AGT-Cores-Tools-Index](https://github.com/sunflowermm/AGT-Cores-Tools-Index)。

### 框架 / 示例（对照扩展点）

| 仓库 | 作用 | 对照本课模块 |
|------|------|--------------|
| [XRK-AGT](https://github.com/sunflowermm/XRK-AGT)（\`core/system-Core\`） | 框架示例外设、控制台 \`/xrk\` | plugin · http · www · tasker · workflow |
| [Example-Core](https://github.com/sunflowermm/Example-Core) | 全扩展点教学示范 | 同上全套 |

### 通道（对照 **tasker**）

| 仓库 | 作用 |
|------|------|
| [QQbot-Core](https://github.com/sunflowermm/QQbot-Core) | QQ 官机接入 |
| [Feishu-Core](https://github.com/sunflowermm/Feishu-Core) | 飞书 / Lark |
| [Telegram-Core](https://github.com/sunflowermm/Telegram-Core) | Telegram Bot |
| [Wechat-entreprise-Core](https://github.com/sunflowermm/Wechat-entreprise-Core) | 企业微信 |
| [Openclaw-Core](https://github.com/sunflowermm/Openclaw-Core) | OpenClaw 桥 |
| [xianyu-Core](https://github.com/sunflowermm/xianyu-Core) | 闲鱼 Webhook → OneBot |
| [xiaozhi-Core](https://github.com/sunflowermm/xiaozhi-Core) | xiaozhi-esp32 语音设备 |

### 数据（对照 **database**；可选 Core，不进主服 fail-fast）

| 仓库 | 作用 |
|------|------|
| [mongodb-Core](https://github.com/sunflowermm/mongodb-Core) | Mongo 文档库 |
| [postgres-Core](https://github.com/sunflowermm/postgres-Core) | PostgreSQL |
| [vector-Core](https://github.com/sunflowermm/vector-Core) | Qdrant 向量 / RAG |

### 产品 / www（对照 **http · www · workflow**）

| 仓库 | 作用 | 典型挂载 |
|------|------|----------|
| [lsy-Core](https://github.com/sunflowermm/lsy-Core) | 「墨」Web Agent | \`/lsy/\` \`/lsy-admin/\` |
| [psyche-Core](https://github.com/sunflowermm/psyche-Core) | 心理测评 | \`/psyche/\` |
| [vibe-learn-Core](https://github.com/sunflowermm/vibe-learn-Core) | 本学习图谱 | \`/vibe-learn/\` |
| [IM-SYAU-Core](https://github.com/sunflowermm/IM-SYAU-Core) | 沈农昆虫馆导览 | \`/kb/\` |
| [kaguya-Core](https://gitcode.com/kaguya3033/kaguya-Core) | A 股行情大屏 | \`/Astock/\` |

### 子服插件（对照 **subserver call**；落在 \`apis/<group>/\`）

| 仓库 | 作用 | 落点 |
|------|------|------|
| [jmcomic](https://github.com/sunflowermm/jmcomic) | 禁漫下载 / QQ 指令 / MCP 工具 | clone → \`subserver/pyserver/apis/jmcomic/\` |

> pyserver **框架**随主仓 \`subserver/pyserver/\`；**业务插件**可独立成仓（如 jmcomic）。主仓白名单示例还有 \`media-tools\` / \`doc-pipeline\` / \`web-fetch\`（见根 \`.gitignore\`）。

### 运维脚本（非 Core；装环境用）

| 仓库 | 作用 |
|------|------|
| [xrk-projects-scripts](https://github.com/sunflowermm/xrk-projects-scripts) | 一键安装 · \`xm\` 菜单（Gitee/GitCode 镜像见其 README） |

娱乐类本地 Core（如 jm-Core）**勿**加主仓白名单。

---

## 5. 实践清单

1. 打开本课 mermaid，指着一条从「stdin 消息」到「plugin →（可选）workflow → LLM」的路径口述一遍。  
2. 在仓库里各找**一个**真实文件：\`plugin\`、\`http\`、\`tasker\`、\`workflow\`（\`system-Core\` 即可）。  
3. 任选上表一个通道 / 产品仓库打开 README，对照本课「模块」列。  
4. 确认：业务文件在 \`core/\` 或 \`apis/<group>/\`，没有误改 \`src/\`。  
5. 下一课：深挖 → **Tasker 通道** / **子服务端** / **插件架构**；动手 → **实践·最小插件**。

---

## 6. 文档链接

| 文档 | 用途 |
|------|------|
| \`docs/runtime-surface.md\` | 全局裸名、挂载时间线、\`callSubserver\` |
| \`docs/base-classes.md\` | PluginBase / HttpApi / AiWorkflow / ListenerBase … |
| \`docs/AUTH.md\` | API Key 与分层 |
| \`docs/database.md\` | Redis / SQLite / 可选 DB Core |
| \`docs/ai-workflow.md\` | 工作流与 MCP 工具链 |
| \`docs/mcp-guide.md\` | 主服 MCP |
| \`docs/subserver-api.md\` | 子服契约与调用 |
| [AGT-Cores-Tools-Index](https://github.com/sunflowermm/AGT-Cores-Tools-Index) | 生态仓库索引 |

\`\`\`algo
{"kind":"xrklayers","title":"扩展点都挂在 Runtime 下","autoplay":true,"speed":850,"data":{"mode":"http"}}
\`\`\`

## 下一步

**AgentRuntime** → **Core 放码** → **插件架构** → 按需 **Tasker / events / Factory / 数据库 / Auth / MCP / 子服务端** → **实践课**。  
鸟瞰入口仍是 **项目鸟瞰**；本课是业务层「地图页」。
`;
