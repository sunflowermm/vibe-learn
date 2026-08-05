export default `# 第四章 · XRK-AGT（项目实践）

> 本框将进程、语言、网络、包管理等概念落到本仓库的工程实践。  
> 主服固定为 **Node.js ≥ 26**；包管理 **仅 pnpm**；子服提供 Python、Go、PHP、Java、.NET、Rust 六套 runtime。  
> 人工智能概念见 **第五章**；**工作流 → 对话管线 → 办事助手** 桥接工程与 Agent 能力（LLM 仅在主服运行）。  
> 扩展点索引见 **业务层全景**。部署 / 数据课末有八股表；产品概念回番外 **数据库**。  
> **章专属动画**（按读法点开）：\`xrklayers\` · \`httpresp\` · \`msgpipe\` · \`taskerflow\` · \`authgate\` · \`toolloop\` · \`dbtier\` · \`wsfive\`。  
> **学会之后**：能指出改动落在 Runtime / Core / 子服哪一层，并沿最小路径完成一次可验收贡献。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 三层坐标 | \`src/\` 基建 · \`core/*/\` 业务 · \`subserver/<runtime>/\` 多语言 |
| 禁区 | 业务不进 \`src/\`；独立产品配置不进 \`config/default_config/\` |
| 最小路径 | 部署 → 鸟瞰 → Core/插件 → 实践·最小插件（可选 HTTP） |
| 契约 | Node≥26、仅 pnpm、Redis+SQLite 热路径；其它库走可选 Core |
| 跟 Agent | 五拍 + 贴路径/报错；改 Runtime 前先读禁区 |

\`\`\`algo
{"kind":"xrklayers","title":"第四章总览 · 请求穿过三层","autoplay":true,"speed":880,"data":{"mode":"http"}}
\`\`\`

## 知识结构

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
| **最小贡献路径** | 两周内一次可演示改动 | 01.5 过关 |
| **部署环境** | Git/Node/Redis/浏览器 · PATH · 代理 | 第一章工具链 · Clash |
| 项目鸟瞰 | Runtime · Core · 子服族 | 总览 · \`xrklayers\` |
| **业务层全景** | 扩展点地图 | 索引 |
| AgentRuntime | 启动链、裸名、热加载 | 序章·进程 |
| Core 放码 | 子目录职责 | 模块边界 |
| 插件架构 | Loader · 热更边界 | 可扩展性 |
| Tasker / events | 通道与钩子 · \`taskerflow\` | 多端 / 观测 |
| 语言栈 / 子服 | 主服 Node；六 runtime | 第二章 |
| HTTP / www / Auth | \`httpresp\` · \`authgate\` | 第三章 |
| 数据库 | Redis/SQLite · \`dbtier\` | 番外数据库 |
| Factory / MCP | 模型插座 · \`toolloop\` | 第五章概念 |
| 配置归属 | 框架 vs 产品模板 | 契约 |
| **工作流** | AiWorkflow 编排 | Agent 入口 |
| **对话管线** | 三层消息 · \`msgpipe\` | agent-context |
| **办事助手** | agents/ · \`wsfive\` | agents.md |
| **实践课** | 插件 / HTTP / 子服 / 配置 | 动手复盘动画 |

## 建议读法

### 主脊（先跑通贡献）

1. **最小贡献路径** → **部署环境** → **鸟瞰** → **业务层全景**（卡住打开 **Vibe Coding 心智**）  
2. **Runtime** → **Core 放码** → **插件架构** → **实践·最小插件**  
3. 要对前端/接口：**HTTP/www** · **Auth** · **实践·最小 HTTP**

### 细读轨（通道 → 横切 → 模型 → 工具 → 办事）

| 顺序 | 课 | 巧思一句 |
|------|-----|----------|
| 1 | **Tasker** | 收发室造 \`e\` |
| 2 | **events** | 厨房排烟机 |
| 3 | **Factory** | 统一插座 |
| 4 | **MCP 运维** | USB 口 · handleToolCall 门禁 |
| 5 | **工作流** → **对话管线** → **办事助手** | 菜谱 → 出站拼窗 → 两张工牌 |

### 多语言 / 数据

**语言栈** → **子服务端** → **实践·子服** · **配置归属** · **数据库** → **第五章**。

## 与已有课的关系

| 本框课 | 如何接 |
|--------|--------|
| **部署环境** | 清单与「首次跑通」分工；Redis 概念见番外 |
| **数据库** | 本仓契约；产品概念见番外 **数据库** |
| HTTP / www | Auth 补安全；拍平解包接第三章 HTTP 动手 |
| **工作流 / 管线 / 办事** | \`docs/agent-context.md\` · \`docs/agents.md\` 真源 |
| 工程素养 | 改完要验收、密钥不进仓 |
| 番外 AI 编程工具 | 五拍与黄页；本框给**落码与管线** |

文档总入口：\`docs/runtime-surface.md\` · \`docs/base-classes.md\` · \`docs/AUTH.md\` · \`docs/database.md\` · \`docs/agent-context.md\` · \`docs/ai-workflow.md\` · \`docs/agents.md\` · \`docs/mcp-guide.md\` · \`docs/subserver-api.md\` · 根 \`AGENTS.md\`。

## 口语 ↔ 本仓（速查）

| 口语 | 本仓落点 |
|------|----------|
| **技术栈** | 主服 JS+Node≥26+pnpm；子服多语言；勿说「栈=Vue」 |
| **部署上线** | 先齐 Git/Node/Redis；再谈面板/反代/证书 |
| **MVP** | = 本框「最小贡献路径」；不是跳过 01.5 |
| **后端** | 主服 AgentRuntime；不是「写在 Nginx 里」 |
| **Agent / Skill** | 工作流+MCP / Cursor·办事 skills；两张工牌别混 |

卡住时：先 **Vibe Coding 心智** 五拍；**改 Runtime 前仍以本框禁区为准**。
`;
