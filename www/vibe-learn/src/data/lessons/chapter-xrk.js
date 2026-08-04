/** 第四章 XRK · 知识结构与读法 */
export default `# 第四章 · XRK-AGT（项目实践）

> 本框将进程、语言、网络、包管理等概念落到本仓库的工程实践。  
> 主服固定为 Node.js；子服提供 Python、Go、PHP、Java、.NET、Rust 六套 runtime。  
> 人工智能概念见 **第五章**；**工作流 → 对话管线 → 办事助手** 桥接工程与 Agent 能力（LLM 仅在主服运行）。  
> 扩展点索引见 **业务层全景**。  
> **部署环境 / 数据与缓存** 课末有八股表；产品概念回番外 **数据库**。

## 知识结构
\`\`\`steps
{"title":"第四章怎么走","steps":[{"title":"最小贡献路径","body":"锁定必学节点。"},{"title":"部署环境","body":"代理、Git、Node、Redis。"},{"title":"鸟瞰与扩展点","body":"Runtime / Core / plugin…"},{"title":"工作流与管线","body":"AiWorkflow · 对话管线 · 办事工作区。"},{"title":"实践","body":"最小插件与子服实验。"}]}
\`\`\`


\`\`\`mermaid
flowchart TB
  subgraph pre["前几章"]
    OS[进程/OS]
    ENV[终端/pnpm/Git]
    CODE[编程基础过关]
    LANG[语言版图]
    NET[端口/HTTP]
  end
  subgraph xrk["本框"]
    MIN[最小贡献路径]
    DEP[部署环境]
    OV[鸟瞰]
    MAP[业务层全景]
    RT[Runtime]
    CORE[Core 放码]
    PL[插件架构]
    TK[Tasker]
    EV[events]
    LS[语言栈]
    HTTP[HTTP/www]
    AUTH[Auth]
    SUB[子服务端]
    DB[数据库]
    FAC[Factory]
    MCP[MCP 运维]
    CFG[配置归属]
    WF[工作流]
    PIPE[对话管线]
    AG[办事助手]
    LAB1[实践·插件]
    LAB2[实践·子服]
  end
  OS --> OV
  ENV --> DEP
  ENV --> OV
  CODE --> MIN
  MIN --> DEP
  MIN --> OV
  MIN --> LAB1
  LANG --> LS
  NET --> HTTP
  DEP --> OV
  OV --> MAP
  MAP --> RT
  MAP --> CORE
  RT --> PL
  CORE --> PL
  PL --> TK
  PL --> EV
  PL --> HTTP
  HTTP --> AUTH
  LS --> SUB
  PL --> SUB
  MAP --> DB
  MAP --> FAC
  MAP --> MCP
  CFG --> WF
  FAC --> WF
  MCP --> WF
  HTTP --> WF
  SUB --> WF
  WF --> PIPE
  PIPE --> AG
  PL --> LAB1
  SUB --> LAB2
  AG --> AI[第五章]
\`\`\`

## 节点速查

| 节点 | 摘要 | 主要回扣 |
|------|------|----------|
| **部署环境** | Git/Node/Redis/浏览器 · PATH · clone · 引擎分层 | 第一章工具链 |
| 项目鸟瞰 | Runtime · Core · 子服族 | 总览 |
| **业务层全景** | 扩展点地图（plugin→subserver call） | 索引 |
| AgentRuntime | 启动链、裸名、\`callSubserver\`、热加载 | 序章·进程 |
| Core 放码 | 子目录职责；\`skills/\` 与产品 AGENTS | 模块边界 |
| 插件架构 | Loader 族、热更边界、与 tasker/events 分工 | 可扩展性 |
| **Tasker 通道** | TaskerBase · msgSegment · 通道与业务 | 多端接入 |
| **events** | Listener · 生命周期 | 钩子 |
| 语言栈 | 主服 Node；六子服语言 | 第二章 |
| HTTP / www | 接口与静态挂载 | 第三章 |
| **HTTP Auth** | API Key · runtime-auth | 安全 |
| 子服务端 | 多进程 HTTP 契约；配置只读 | 进程 + 端口 |
| **数据库** | Redis/SQLite 必需；可选 Core | 番外·数据库 |
| **Factory** | LLM finalize · variants · aux · contextWindow | 模型客户端 |
| **MCP 运维** | 主服工具挂载 · handleToolCall 门禁 · tools 扩展面 | 工具通道 |
| 配置归属 | 框架模板与产品模板 | 契约 |
| **工作流** | AiWorkflow · Factory · MCP | Agent 编排入口 |
| **对话管线** | 三层消息 · 出站压缩 · 斜杠配方 · 策略 | \`docs/agent-context.md\` |
| **办事助手** | \`agents/\` · recipes · microagents · 两张工牌 | 对话 Agent |
| **实践·插件** | 最小 PluginBase 通关 | 动手 |
| **实践·子服** | callSubserver · CONTRACT | 动手 |

## 建议读法

### 主脊（先跑通贡献）

1. **部署环境** → **鸟瞰** → **业务层全景**（卡住打开 **Vibe Coding 心智**）  
2. **Runtime** → **Core 放码** → **插件架构** → **实践·最小插件**  
3. 要对前端/接口时：**HTTP/www** · **Auth** · **实践·最小 HTTP**

### 细读轨（揉碎扩展点 · 建议按「通道 → 横切 → 模型 → 工具 → 办事」）

| 顺序 | 课 | 巧思一句 | 回扣其它章 |
|------|-----|----------|------------|
| 1 | **Tasker** | 收发室造 \`e\` | 终端 stdin · 网络 WS |
| 2 | **events** | 厨房排烟机 | 工程观测 · 热更边界 |
| 3 | **Factory** | 统一插座 · finalize / aux | 配置归属 · 代理 · HTTPS |
| 4 | **MCP 运维** | USB 口 · handleToolCall 门禁 | 第五章 MCP · 提示安全 |
| 5 | **工作流** → **对话管线** → **办事助手** | 菜谱 → 出站拼窗/配方 → 两张工牌 | 第五章 Rules/Skills/AGENTS |

### 多语言 / 数据

4. **语言栈** → **子服务端** → **实践·子服** · **配置归属**  
5. **数据库**（契约）↔ 番外 **数据库**（产品概念）  
6. 进入 **第五章**（概念与本框管线互参）

## 与已有课的关系

| 本框课 | 如何接 |
|--------|--------|
| **部署环境** | 清单与「首次跑通」分工；Redis 概念见番外 |
| **数据库** | 本仓契约；产品概念见番外 **数据库** |
| 语言栈 / 子服务端 / 配置归属 | 原课 + 实践·子服动手 |
| HTTP / www | Auth 课补安全；全景课列产品 www；拍平解包接第三章 HTTP 动手 |
| **Tasker / events** | 三角：通道 · 钩子 · 业务；接第一章终端与工程素养 |
| **Factory / MCP** | 插座与 USB；finalize · 门禁；接第五章 Tool Calling / 提示安全 |
| **工作流** | 链 Factory + MCP；细拆见对话管线 |
| **对话管线** | \`docs/agent-context.md\`（出站 · 策略 · 斜杠） |
| **办事助手** | \`docs/agents.md\`；recipes / microagents；与根 AGENTS 两张工牌 |
| 首次跑通（第一章） | 鸟瞰假定已能 \`node app\` |
| Shell（第二章） | 可对照 [xrk-projects-scripts](https://github.com/sunflowermm/xrk-projects-scripts) |
| 工程素养 | 改完要验收、密钥不进仓、观测打点可放 events |

文档总入口：\`docs/runtime-surface.md\` · \`docs/base-classes.md\` · \`docs/AUTH.md\` · \`docs/database.md\` · \`docs/agent-context.md\` · \`docs/ai-workflow.md\` · \`docs/agents.md\` · \`docs/mcp-guide.md\` · \`docs/subserver-api.md\` · 根 \`AGENTS.md\` · [AGT-Cores-Tools-Index](https://github.com/sunflowermm/AGT-Cores-Tools-Index)。
`;
