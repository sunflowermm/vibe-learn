export default `# 子服务端

> 子服务端是主服旁的**独立进程族**，各自以不同语言实现同一套 HTTP 契约。  
> 内置六套 runtime（默认端口 8000–8005）：Python、Go、PHP、Java、.NET、Rust。  
> **配置在主服编辑，子服只读。** LLM 与 AiWorkflow 仅运行于主服 Node。  
> 真源：\`docs/subserver-api.md\` · \`docs/subserver-commonconfig.md\` · \`subserver/CONTRACT.md\`。  
> **学会之后**：能说明子服多进程 HTTP 契约与配置只读原则。

## 学会之后（验收）

\`\`\`decide
{"title":"能力放主服还是子服？","start":"start","steps":[{"id":"start","q":"你卡住的能力本质是？","options":[{"label":"JS/Node 就能做的业务扩展","next":"core"},{"label":"强依赖 Python/Java/… 生态","next":"sub"},{"label":"想改加载器/全局运行时","next":"rt"},{"label":"只是要调已有子服接口","next":"call"}]},{"id":"core","result":"放 core/<名>/ 对应扩展点（plugin/http/…）。","detail":"主服仍是 JS+Node。"},{"id":"sub","result":"放 subserver/<runtime>/；主服 HTTP 调用。","detail":"配置主服编辑、子服只读。"},{"id":"rt","result":"属框架任务；先读禁区，勿当业务捷径。","detail":"多数贡献不该进 src/。"},{"id":"call","result":"走 callSubserver + CONTRACT；先实践·子服调用。","detail":"对照端口与契约。"}]}
\`\`\`

| 能力 | 成功信号 |
|------|----------|
| 进程 | 独立 runtime；端口分段 |
| 配置 | 主服编辑；子服 load 只读 |
| 调用 | 主服 callSubserver |
| 文档 | CONTRACT / LANGUAGES.md |

\`\`\`algo
{"kind":"xrklayers","title":"callSubserver 路径","autoplay":true,"speed":850,"data":{"mode":"sub"}}
\`\`\`

## 与前面章节的对应
\`\`\`match
{"title":"子服配对","pairs":[{"id":"ss","left":"子服","right":"独立进程，按语言优势干活"},{"id":"call","left":"callSubserver","right":"主服调用子服的桥"},{"id":"cfg","left":"子服配置","right":"常见只读；主服侧编辑"}]}
\`\`\`


| 已学概念 | 落点 |
|----------|------|
| **进程** | 主服与各子服为不同 OS 进程 |
| **端口 / TCP** | 每套 runtime 默认监听独立端口 |
| **HTTP / API** | \`AgentRuntime.callSubserver\` 以 HTTP JSON 调用目标 runtime |
| **反向代理** | 对外入口通常在主服；子服部署于内网侧 |
| **语言栈** | 按生态与性能优势选择 runtime |
| **插件式扩展** | \`apis/<group>/\`（及各语言等价布局）可插拔 |
| **配置归属** | \`ai-workflow.yaml\` → \`runtimeConfig.subserver\` |

\`\`\`mermaid
sequenceDiagram
  participant U as "用户"
  participant M as "主服 Node"
  participant S as "子服 runtime"
  U->>M: 消息或 HTTP
  M->>S: callSubserver(path, runtime)
  S-->>M: JSON 结果
  M-->>U: 回复
\`\`\`

---

## Runtime 目录对照
\`\`\`quiz
{"title":"子服快测","questions":[{"q":"子服插件配置通常在哪编辑？","choices":[{"t":"只在子服终端里手改 yaml 当主源","ok":false,"why":"配置以主服编辑为准。"},{"t":"主服编辑；子服 load 只读","ok":true,"why":"见 subserver-commonconfig 约定。"},{"t":"写进浏览器 cookie","ok":false,"why":"无关。"}]}]}
\`\`\`


权威登记表：\`src/utils/subserver-runtimes.js\`。

| id | 语言 | 默认端口 | 目录 | 选型要点 |
|----|------|----------|------|----------|
| \`pyserver\` | Python | 8000 | \`subserver/pyserver\` | AI / 媒体 / 文档生态；默认入口 |
| \`goserver\` | Go | 8001 | \`subserver/goserver\` | 高并发、静态部署、加解密 |
| \`phpserver\` | PHP | 8002 | \`subserver/phpserver\` | 轻量脚本与字符串处理 |
| \`jserver\` | Java / Spring | 8003 | \`subserver/jserver\` | 企业库、JDBC、Spring |
| \`netserver\` | .NET | 8004 | \`subserver/netserver\` | Windows / Office / 系统 API |
| \`rustserver\` | Rust | 8005 | \`subserver/rustserver\` | 性能热点、正则、FFI |

语言优势的完整对照见 **语言栈**。调用时传入 \`runtime\`；省略则使用 \`subserver.default\`（默认为 \`pyserver\`）。

---

## 设计目标

| 目标 | 说明 |
|------|------|
| **卸载重活** | 大文件、长任务、重 CPU 工作离开主服事件循环 |
| **生态互补** | 各语言在媒体、企业中间件、系统集成、性能路径上各有优势 |
| **故障隔离** | 单一 runtime 异常不影响主服通道与其它子服 |
| **职责清晰** | 主服专注编排与 LLM；子服专注实现层能力 |

---

## 能力与运维边界

| 能力 | 说明 |
|------|------|
| **统一契约** | \`CONTRACT.md\`：\`/health\`、\`/api/list\`、\`/api/system/*\`、\`/api/{group}/*\` |
| **配置中枢** | 主服维护 \`subserver.runtimes.*.host|port|enabled\`；子服 \`load_plugin_config\` 只读 |
| **主服扫描** | \`subserver/*/apis/<group>/core/{plugin,http,commonconfig…}\` 可由主服 Loader 加载 |
| **运维入口** | 命令在对应子服终端 \`子服>\` 输入，不经主服 stdin 转发 |

参考：\`docs/subserver-api.md\`、\`docs/subserver-commonconfig.md\`、\`subserver/README.md\`。

---

## 示例：Python 子服独立插件仓库

pyserver **框架**在主仓 \`subserver/pyserver/\`（包名 \`xrk-agt-pyserver\`）。  
**业务插件**可独立成 Git 仓库，clone 进 \`apis/<group>/\`（勿把第三方写进主仓白名单）。

| 仓库 | 作用 | 本地落点 |
|------|------|----------|
| [jmcomic](https://github.com/sunflowermm/jmcomic) | 禁漫下载 / PDF、QQ \`#车牌\`、MCP 工具 | \`subserver/pyserver/apis/jmcomic/\` |

主仓白名单示例外设：\`apis/system\`、\`media-tools\`、\`doc-pipeline\`、\`web-fetch\`（见根 \`.gitignore\`）。  
更多 Core / 通道仓库对照见 **业务层全景** §4。

## 下一步

对话与工具链 → **工作流**（可经工具调用子服）；  
配置细则 → **配置归属**；动手 → **实践·调子服**；选型总表 → **语言栈**；AI 概念 → 第五章。
`;
