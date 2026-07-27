/** 第四章 XRK · 知识结构与读法 */
export default `# 第四章 · XRK-AGT（项目实践）

> 本框将进程、语言、网络、包管理等概念落到本仓库的工程实践。  
> 主服固定为 Node.js；子服提供 Python、Go、PHP、Java、.NET、Rust 六套 runtime。  
> 人工智能概念见 **第五章**；Stream 为桥接节点（LLM 仅在主服运行）。  
> 扩展点索引见 **业务层全景**。

## 知识结构

\`\`\`mermaid
flowchart TB
  subgraph pre["前几章"]
    OS[进程/OS]
    ENV[终端/pnpm/Git]
    LANG[语言版图]
    NET[端口/HTTP]
  end
  subgraph xrk["本框"]
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
    ST[Stream]
    LAB1[实践·插件]
    LAB2[实践·子服]
  end
  OS --> OV
  ENV --> DEP
  ENV --> OV
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
  CFG --> ST
  FAC --> ST
  MCP --> ST
  HTTP --> ST
  SUB --> ST
  PL --> LAB1
  SUB --> LAB2
  ST --> AI[第五章]
\`\`\`

## 节点速查

| 节点 | 摘要 | 主要回扣 |
|------|------|----------|
| **部署环境** | Git/Node/Redis/日常浏览器（非 Win 也要装）· 终端种类 · PATH · clone · 引擎分层 | 第一章工具链 |
| 项目鸟瞰 | Runtime · Core · 子服族；入口指向全景 | 总览 |
| **业务层全景** | 扩展点地图（plugin→subserver call） | 索引 |
| AgentRuntime | 启动链、裸名、\`callSubserver\`、热加载 | 序章·进程 |
| Core 放码 | 子目录职责 + 最小 Core 清单 | 模块边界 |
| 插件架构 | Loader 族、热更边界、与 tasker/events 分工 | 可扩展性 |
| **Tasker 通道** | TaskerBase · msgSegment · 通道 vs 业务 | 多端接入 |
| **events** | Listener · 生命周期 · 常需重启 | 钩子 |
| 语言栈 | 主服 Node；六子服语言与优势 | 第二章 |
| HTTP / www | 接口与静态挂载 | 第三章 |
| **HTTP Auth** | API Key · runtime-auth · 分层 | 安全 |
| 子服务端 | 多进程 HTTP 契约；配置只读 | 进程 + 端口 |
| **数据库** | 本仓契约（Redis/SQLite 必需；可选 Core） | 番外·数据库（概念）· 部署环境（安装） |
| **Factory** | LLM/ASR/TTS 工厂与配置 | 模型客户端 |
| **MCP 运维** | 主服工具挂载；桥接第五章 | 工具通道 |
| 配置归属 | 框架模板与产品模板；\`subserver.runtimes\` | 契约 |
| Stream | AiWorkflow · Factory · MCP | 第五章入口 |
| **实践·插件** | 最小 PluginBase 通关 | 动手 |
| **实践·子服** | callSubserver · CONTRACT · 失败清单 | 动手 |

## 建议读法

1. **部署环境**（四件套 + 浏览器引擎）→ **鸟瞰** → **业务层全景**  
2. **Runtime** → **Core 放码** → **插件架构**  
3. 按需：**Tasker** / **events** / **Auth** / **数据库** / **Factory** / **MCP**  
4. **语言栈** → **HTTP/www** → **子服务端**（含 jmcomic 等 \`apis/\` 插件仓）→ **配置归属**  
5. **Stream** → **实践·插件** / **实践·子服**  
6. 进入 **第五章**（概念时间线；MCP/Tool Calling 与本框工程课互参）

## 与已有课的关系

| 本框已有课 | 本轮加厚/新增如何接 |
|------------|---------------------|
| **部署环境** | 补全 Git/Node/Redis/浏览器；与「首次跑通」分工：清单 vs 最短命令；Redis **是什么**见番外 |
| **数据库** | 只钉本仓契约；产品/中间件概念见番外 **数据库** |
| 语言栈 / 子服务端 / 配置归属 | 仍读原课；实践·子服做动手；子服课含独立插件仓示例 |
| HTTP / www | Auth 课补安全分层；业务层全景 §4 列产品 www 路径 |
| Stream | 显式链 Factory + MCP |
| 首次跑通（第一章） | 鸟瞰假定你已能 \`node app\` |
| Shell（第二章） | 可对照 [xrk-projects-scripts](https://github.com/sunflowermm/xrk-projects-scripts) 装环境 |

文档总入口：\`docs/runtime-surface.md\` · \`docs/base-classes.md\` · \`docs/AUTH.md\` · \`docs/database.md\` · \`docs/ai-workflow.md\` · \`docs/mcp-guide.md\` · \`docs/subserver-api.md\` · \`AGENTS.md\` · [AGT-Cores-Tools-Index](https://github.com/sunflowermm/AGT-Cores-Tools-Index)。
`;
