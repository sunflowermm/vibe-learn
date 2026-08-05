export default `# 第四章 · XRK-AGT（项目实践）

> 本框将进程、语言、网络、包管理等概念落到本仓库的工程实践。  
> 主服固定为 **Node.js ≥ 26**；包管理 **仅 pnpm**；子服提供 Python、Go、PHP、Java、.NET、Rust 六套 runtime。  
> 人工智能概念见 **第五章**；**工作流 → 对话管线 → 办事助手** 桥接工程与 Agent 能力（LLM 仅在主服运行）。  
> 扩展点索引见 **业务层全景**。部署 / 数据课末有八股表；产品概念回番外 **数据库**。  
> **学会之后**：能指出改动落在 Runtime / Core / 子服哪一层，能用导图2 的 Vibe 名词对照本仓契约，并沿最小路径完成一次可验收贡献。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 三层坐标 | \`src/\` 基建 · \`core/*/\` 业务 · \`subserver/<runtime>/\` 多语言 |
| 禁区 | 业务不进 \`src/\`；独立产品配置不进 \`config/default_config/\` |
| 最小路径 | 部署 → 鸟瞰 → Core/插件 → 实践·最小插件（可选 HTTP） |
| 契约 | Node≥26、仅 pnpm、Redis+SQLite 热路径；其它库走可选 Core |
| Vibe 对照 | 能把 MVP / 部署 / 技术栈 / Agent / Skill 对上本仓落点，且不以词条替代验收 |
| 跟 Agent | 五拍 + 贴路径/报错；改 Runtime 前先读禁区 |

## 知识结构
\`\`\`steps
{"title":"第四章怎么走","steps":[{"title":"最小贡献路径","body":"锁定必学节点（导图2：MVP）。"},{"title":"部署环境","body":"代理、Git、Node、Redis（部署/环境变量/CI）。"},{"title":"鸟瞰与扩展点","body":"Runtime / Core / plugin…（技术栈）。"},{"title":"工作流与管线","body":"AiWorkflow · 对话管线 · 办事工作区（Agent/Skill/上下文）。"},{"title":"实践","body":"最小插件与子服实验（Git/组件心智）。"}]}
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

| 节点 | 摘要 | 导图2 对照（名词） | 主要回扣 |
|------|------|-------------------|----------|
| **最小贡献路径** | 两周内一次可演示改动 | **MVP** · Git · PR | 01.5 过关 |
| **部署环境** | Git/Node/Redis/浏览器 · PATH · 代理 | **部署** · **环境变量** · CI/CD · 预发/回滚 | 第一章工具链 |
| 项目鸟瞰 | Runtime · Core · 子服族 | **技术栈** · 后端 · JS | 总览 |
| **业务层全景** | 扩展点地图 | 用户流程 · PRD · 组件 | 索引 |
| AgentRuntime | 启动链、裸名、热加载 | JS · 后端 · Harness | 序章·进程 |
| Core 放码 | 子目录职责 | 组件 · 前端/www | 模块边界 |
| 插件架构 | Loader · 热更边界 | 组件 · Harness | 可扩展性 |
| Tasker / events | 通道与钩子 | 聊天 UI · 监控 | 多端 / 观测 |
| 语言栈 / 子服 | 主服 Node；六 runtime | 技术栈 · 后端 · HTTP | 第二章 |
| HTTP / www / Auth | 接口、静态、鉴权 | HTTP/HTTPS · 前端 · 路由 | 第三章 |
| 数据库 | Redis/SQLite 契约 | 后端 · 部署 | 番外数据库 |
| Factory / MCP | 模型插座 · 工具门禁 | Agent · 流式 · Skill · Agent 循环 | 第五章概念 |
| 配置归属 | 框架 vs 产品模板 | 环境变量 · CI · 部署 | 契约 |
| **工作流** | AiWorkflow 编排 | 流式 · Agent 循环 | Agent 入口 |
| **对话管线** | 三层消息 · 出站 · 策略 | 聊天 UI · 上下文工程 · 窗口 | agent-context |
| **办事助手** | agents/ · 工作区注入 | Agent · Skill · Vibe Coding | agents.md |
| **实践课** | 插件 / HTTP / 子服 / 配置 | MVP · Git · 路由 | 动手 |

## 建议读法

### 主脊（先跑通贡献）

1. **最小贡献路径** → **部署环境** → **鸟瞰** → **业务层全景**（卡住打开 **Vibe Coding 心智**）  
2. **Runtime** → **Core 放码** → **插件架构** → **实践·最小插件**  
3. 要对前端/接口：**HTTP/www** · **Auth** · **实践·最小 HTTP**

### 细读轨（通道 → 横切 → 模型 → 工具 → 办事）

| 顺序 | 课 | 巧思一句 | 导图2 加持 |
|------|-----|----------|------------|
| 1 | **Tasker** | 收发室造 \`e\` | 聊天 UI / Agent |
| 2 | **events** | 厨房排烟机 | 监控 |
| 3 | **Factory** | 统一插座 | 流式 · 上下文窗口 |
| 4 | **MCP 运维** | USB 口 · handleToolCall 门禁 | Skill · Agent 循环 · Harness |
| 5 | **工作流** → **对话管线** → **办事助手** | 菜谱 → 出站拼窗 → 两张工牌 | 上下文工程 · Skill · Vibe |

### 多语言 / 数据

**语言栈** → **子服务端** → **实践·子服** · **配置归属** · **数据库** → **第五章**。

## 与已有课的关系

| 本框课 | 如何接 |
|--------|--------|
| **部署环境** | 清单与「首次跑通」分工；Redis 概念见番外 |
| **数据库** | 本仓契约；产品概念见番外 **数据库** |
| HTTP / www | Auth 补安全；拍平解包接第三章 HTTP 动手 |
| **工作流 / 管线 / 办事** | \`docs/agent-context.md\` · \`docs/agents.md\` 真源 |
| 工程素养 | 改完要验收、密钥不进仓；CI 词条见导图2 |
| 番外 AI 编程工具 | 五拍与黄页；本框给**落码与管线** |

文档总入口：\`docs/runtime-surface.md\` · \`docs/base-classes.md\` · \`docs/AUTH.md\` · \`docs/database.md\` · \`docs/agent-context.md\` · \`docs/ai-workflow.md\` · \`docs/agents.md\` · \`docs/mcp-guide.md\` · \`docs/subserver-api.md\` · 根 \`AGENTS.md\`。

## 导图2 · Vibe Coding 名词织入（第四章专用）

> 导图2 是 **Vibe Coding 词表**：上线、产品、Agent、前端/后端口语。  
> 本框是 **本仓工程地图**：放码、契约、禁区、验收。  
> **一起用**：词表帮你说话和对齐；**本仓路径与 engines/pnpm/禁区仍以本框 + 根 AGENTS 为准**。面板会自动附上相关词条正文（\`map2-combine\`）；下面是**专业对照**，不是替代。

| 导图2 | Vibe 口语 | 本仓专业落点 |
|-------|-----------|--------------|
| **技术栈** | 从前到后的组合拳 | 主服 JS+Node≥26+pnpm；子服多语言；勿说「栈=Vue」 |
| **部署上线** | 交付到可访问环境 | 先齐 Git/Node/Redis；再谈面板/反代/证书 |
| **环境变量** | 进程可见的名=值 | PATH、\`HTTP_PROXY\`、密钥；\`.env\` 不进 Git |
| **CI / CD** | 机器自动检查 / 持续交付 | 本仓 CI 也应用 pnpm + 锁文件；CD 不缩短清单 |
| **预发 / 回滚** | Staging · 出问题退回 | 数据卷与配置要在备份课里演练过 |
| **MVP** | 最小可验证切片 | = 本框「最小贡献路径」；不是跳过 01.5 |
| **Git / PR** | 协作与审查入口 | 贡献前审 diff；娱乐插件默认不进白名单 |
| **HTTP / 路由 / 前端** | 接口与页面 | \`http/\` + \`www/<应用>/\`；HttpResponse 拍平 |
| **后端** | 服务端职责 | 主服 AgentRuntime；不是「写在 Nginx 里」 |
| **AI Agent / Agent 循环** | 多步工具施工 | 工作流 + MCP 门禁；路径 B 细节在第五章 |
| **流式响应** | 边生成边出 | Factory/工作流支持；www 另有浏览器兼容 |
| **上下文工程 / 窗口** | 塞进模型的内容怎么排 | 对话管线 + \`docs/agent-context.md\` |
| **Skill** | 可加载长流程 | Cursor skills / 办事 skills；与 Rules 分工 |
| **Harness Engineering** | 指令+工具+模型编排 | Runtime · Loader · MCP · 交底文件 |
| **Vibe Coding** | 对话驱动试想法 | 五拍在番外心智课；本框要求**可验收落码** |
| **组件** | UI/模块拼装直觉 | Core 扩展点 ≈ 可插拔「组件」；勿混前端 SFC |

### 怎么读（推荐）

1. 先读本框节点（契约与路径）  
2. 面板 **跨导图** 或文末自动附上的词条：补定义、边界、判断题  
3. 委派 Coding Agent 时：用导图2 名词对齐口语，用本框约束写进「约束」格  

\`\`\`flip
{"title":"第四章 × 导图2","cards":[{"front":"词条说 MVP","back":"本仓=最小插件/HTTP 可演示切片，不是跳过环境与 01.5"},{"front":"词条说部署","back":"先清单绿，再谈花活；代理/PATH/Redis 常是真因"},{"front":"词条说 Agent","back":"写代码走路径 A 五拍；办事助手走工作区注入，两张工牌别混"},{"front":"词条说 Skill","back":"长流程按需加载；禁区仍写进 AGENTS/Rules"}]}
\`\`\`

卡住时：先 **Vibe Coding 心智** 五拍，再跨导图查词；**改 Runtime 前仍以本框禁区为准**。
`;
