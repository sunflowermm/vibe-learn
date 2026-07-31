/** events 监听 */
export default `# events 监听

> \`core/*/events\` = **横切钩子**：在通道就绪、系统副作用处挂 \`ListenerBase\`，**不**替代 Tasker，也**不**替代 plugin。  
> 基类：\`src/infrastructure/listener/base.js\`。

## 设计巧思：三角厨房

把 Runtime 想成厨房：

| 角色 | 比喻 | 目录 |
|------|------|------|
| Tasker | 进货口（快递拆箱） | \`tasker/\` |
| plugin | 炒菜（客人点了什么） | \`plugin/\` |
| events | 排烟与温度计（常开、横切） | \`events/\` |

排烟机不该决定菜单；菜单也不该自己拆快递箱。

\`\`\`steps
{"title":"事件三角","steps":[{"title":"Tasker","body":"协议 → 统一 e。"},{"title":"events","body":"init 里 on：就绪、桥接、标记已处理。"},{"title":"plugin","body":"reg 匹配 → 业务 reply。"},{"title":"改完重启","body":"Listener 常绑长生命周期；改完重启再验。"}]}
\`\`\`

---

## 1. 跨章回扣

| 章 | 对照 |
|----|------|
| **序章** | 钩子 ≈ 系统调用边界上的观察点 |
| **工程素养 · 观测** | Listener 适合打点、联动，别塞成上帝类 |
| **插件架构** | 热更：plugin 常可热更；**events 常需重启** |
| **办事助手** | \`ai-workspace.js\` 一类监听是外围，不是人设文件本身 |
| **第五章 · 子代理** | events ≠ subagent；一个是进程钩子，一个是对话委派 |

\`\`\`flip
{"title":"events 翻卡","cards":[{"front":"该放 events？","back":"连接后常驻 on、系统副作用、标记已处理"},{"front":"该放 plugin？","back":"用户指令、产品业务、要 reply"},{"front":"该放 tasker？","back":"新协议、WS 路径、造 e"},{"front":"热更？","back":"改 Listener → 重启主服更稳"}]}
\`\`\`

---

## 2. 契约揉碎

| 项 | 说明 |
|----|------|
| 放置 | \`core/<名>/events/*.js\` |
| 形状 | \`extends ListenerBase\` → Loader 调 \`async init()\`，注入 \`this.bot\` |
| 总线 | 上游常经 \`AgentRuntime.em\` / 平台 \`on\` |
| 别越权 | 大段业务逻辑 → plugin；造协议 → tasker |

\`\`\`javascript
export default class MyEvent extends ListenerBase {
  constructor() { super('MyAdapter') }
  async init() { /* this.bot.on(...); markProcessed(e) */ }
}
\`\`\`

\`\`\`mermaid
flowchart TB
  T[Tasker] --> Bus["em / 平台 on"]
  Bus --> L[Listener · 副作用]
  Bus --> P[plugin · 业务]
\`\`\`

\`\`\`quiz
{"title":"events 快测","questions":[{"q":"「用户发 #签到 领积分」应优先放？","choices":[{"t":"events Listener","ok":false,"why":"这是指令业务，放 plugin。"},{"t":"plugin 规则匹配","ok":true,"why":"reg + run + reply。"},{"t":"src/factory","ok":false,"why":"工厂不管签到。"},{"t":"www 静态 HTML 注释","ok":false,"why":"不进运行时。"}]},{"q":"改完 events 后更稳妥的验收？","choices":[{"t":"存盘即默认热更成功，不必看日志","ok":false,"why":"易双绑/漏解绑。"},{"t":"重启主服，确认 ListenerLoader 重新 init","ok":true,"why":"长生命周期绑定。"},{"t":"只刷新浏览器","ok":false,"why":"服务端钩子。"},{"t":"删除 Redis 再试","ok":false,"why":"不对症。"}]}]}
\`\`\`

---

## 3. system-Core 示例怎么读

| 文件直觉 | 读时抓什么 |
|----------|------------|
| \`stdin.js\` / \`onebot.js\` | \`init\` 绑了谁 |
| \`device.js\` | 设备通道副作用 |
| \`ai-workspace.js\` | 与工作区外围的联动（非 AGENTS 正文） |

路径：\`core/system-Core/events/\` · 契约：\`docs/base-classes.md\`。

---

## 4. 实践清单

1. 列出 \`events/\` 文件名，各猜一句职责。  
2. 启动日志确认 Listener 加载。  
3. 改一行日志字符串 → **重启** → 看到新文案。  
4. 口述三角：快递 / 炒菜 / 排烟。

## 下一步

**Tasker**（\`e\` 从哪来）· **插件架构** · **实践·最小插件**。  
AI 对话 → **工作流 / Factory / MCP**，别把工具环写进 Listener。
`;
