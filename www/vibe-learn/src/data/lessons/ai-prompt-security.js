export default `# 提示安全

> **本课位置**：工具与检索上线后的**攻击面**。开源题库与生产事故高频。  
> **先修**：工具调用、检索增强生成。  
> **真源**：\`docs/agent-context.md\` §5.2 · \`docs/ai-workflow.md\`。  
> **要点**：不可信内容进窗 = 可能被当成指令；工具有副作用时更危险。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 威胁 | 能举提示注入/越权工具一类风险 |
| 本仓 | policies、toolScan、批准流（默认关）、handleToolCall |
| 边界 | 提示安全≠传输 HTTPS（那是网络章） |
| 跟 Agent | 要能力时同步要门禁与最小权限 |

\`\`\`algo
{"kind":"secgate","title":"不可信正文 → 门禁 → 工具","autoplay":true,"speed":800}
\`\`\`

\`\`\`check
{"title":"提示安全通关","items":[{"id":"inject","text":"能说明直接/间接注入：正文抢指令优先级","hint":"威胁"},{"id":"gate","text":"能指到 handleToolCall + policies/toolScan/审批","hint":"本仓"},{"id":"layers","text":"能区分提示层安全 vs HTTPS/密钥保管","hint":"分层"}]}
\`\`\`

## 风险画像

| 风险 | 白话 |
|------|------|
| 提示注入 | 文档/网页里夹带「忽略上文」类指令 |
| 越权工具 | 模型被诱去删库、外传密钥 |
| 数据外泄 | 把系统提示或他户数据回显 |
| 越狱 | 绕过安全策略套话术 |

## 防护分层

| 层 | 做法 |
|----|------|
| 隔离 | 系统指令与检索正文分区、降权 |
| 权限 | 工具 ACL、人工确认高危操作 |
| 过滤 | 出入站检测、PII 脱敏 |
| 评测 | 红队题集回归 |

## 和 HTTP / 密钥的交界

调云端模型时：

| 面 | 做法 |
|----|------|
| 传输 | 默认 **HTTPS**（明文 HTTP 易泄 API Key） |
| 密钥 | 放 \`.env\` / 密钥库，**勿进 Git** |
| 工具 | 高危操作二次确认；最小权限 |
| 检索 | 文档正文 ≠ 系统指令；ACL 在检索层 |

> 网络课里的 401/403、HTTPS，和这里的「提示注入 / 越权工具」是同一张安全网的不同层。

## 本仓怎么做

| 面 | 落点 |
|----|------|
| 运行时策略 | \`policies[]\`：\`provider.use\` / \`tool.call\` / \`mcp.connect\`；\`ask\` 工具仍注入，执行时审批或拒绝 |
| 威胁扫描 | \`security.toolScan\`（默认开）→ \`tool-security-inspect.js\` |
| 交互审批 | \`security.approval\`（**默认关**）；主人 \`#批准\` / \`#批准id\`；关则 ask=拒绝（主人可 bypass） |
| 统一执行门禁 | **\`MCPServer.handleToolCall\`**（LLM / HTTP / WS / JSON-RPC 一条路） |
| 工具面白名单 | \`mergeWorkflows\` + streams；高危如 \`tools.file.runEnabled\` 默认 false |
| HTTP 鉴权 | \`runtime-auth\` / API Key（第四章 **HTTP Auth**） |
| 指令 vs 数据 | \`assembleChatLlmMessages\`：系统/规则层与检索/用户内容分层 |
| 工作区边界 | \`AGENTS.md\` / Rules 划可改路径；密钥不进仓 |
| 契约 | \`docs/agent-context.md\` §5.2 · 第四章 **对话管线** |

\`\`\`quiz
{"title":"提示安全","questions":[{"q":"把网页正文直接拼进系统提示同一优先级，风险是？","choices":[{"t":"更快，因为少一次重排","ok":false,"why":"与快慢无关，是信任边界。"},{"t":"不可信文本可能覆盖开发者指令（注入）","ok":true,"why":"应用须区分指令与数据。"},{"t":"嵌入维度会减半","ok":false,"why":"无关。"},{"t":"会自动升级 TLS 证书","ok":false,"why":"无关。"}]},{"q":"间接注入的载荷通常从哪进来？","choices":[{"t":"日后被检索到的文档/网页","ok":true,"why":"用户未必输入过恶意字。"},{"t":"只可能来自 UDP 端口扫描","ok":false,"why":"与传输层扫描无关。"},{"t":"只可能来自 CSS 颜色","ok":false,"why":"无关。"},{"t":"只可能来自显示器刷新率","ok":false,"why":"无关。"}]},{"q":"security.approval 默认？","choices":[{"t":"开启，每条工具都要群投票","ok":false,"why":"默认关。"},{"t":"关闭；危险 ask 未开审批则拒绝","ok":true,"why":"日常不打扰；需要时再开。"},{"t":"不存在该配置","ok":false,"why":"ai-workflow.security.approval。"},{"t":"只对 web_search 生效","ok":false,"why":"针对工具执行 ask。"}]}]}
\`\`\`

## 接到下一站

行动段安全卡点清楚后，继续 **MCP** / 循环，或回 **规则·技能** 把红线写成可审文件。
`;
