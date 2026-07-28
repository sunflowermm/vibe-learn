/** events 监听 */
export default `# events 监听

> \`core/*/events\` 里的监听器挂在 **Listener** 体系上：在 Tasker / Runtime 生命周期节点上挂钩子，而不是替代通道或插件。  
> 基类：\`ListenerBase\`（\`src/infrastructure/listener/base.js\`）。

## 本课你要带走什么
\`\`\`steps
{"title":"事件三角怎么分","steps":[{"title":"Tasker","body":"协议适配：把平台消息变成统一事件 e。"},{"title":"events","body":"Listener 挂钩子：连接就绪、常驻 on、系统副作用。"},{"title":"plugin","body":"规则匹配业务：指令、回复、产品逻辑。"},{"title":"改完重启","body":"events 常绑长生命周期；改 Listener 后重启主服再验。"}]}
\`\`\`

\`\`\`flip
{"title":"事件翻卡","cards":[{"front":"events/","back":"监听运行时事件的扩展点"},{"front":"与 plugin","back":"插件偏命令/消息；事件偏钩子"},{"front":"ai-workspace.js","back":"system-Core 里与工作区外围相关的示例监听"}]}
\`\`\`


1. events 目录放什么、Loader 何时 \`init\`  
2. 与 **tasker**、**plugin** 的三角关系  
3. **热重载边界**：events 常需重启才能稳妥生效  
4. 实践：对照 \`system-Core/events\` 与启动日志

---

## 1. 职责表
\`\`\`match
{"title":"事件课配对","pairs":[{"id":"listen","left":"events/","right":"监听运行时事件"},{"id":"emit","left":"em()","right":"发出事件给监听方"},{"id":"vs","left":"vs plugin","right":"事件偏横切；插件偏命令/业务入口"}]}
\`\`\`


| 项 | 说明 |
|----|------|
| **作用** | 订阅平台或总线事件、做适配侧副作用（标记已处理、桥接设备等） |
| **目录** | \`core/<名>/events/*.js\` |
| **基类** | \`ListenerBase\`；构造后 Loader 调 \`async init()\`，注入 \`this.bot\` |
| **谁来用** | 需要「通道就绪后常驻监听」的系统/产品能力 |
| **别搞混** | ≠ Tasker（造事件）；≠ Plugin（规则匹配业务）；≠ workflow |

\`\`\`mermaid
flowchart TB
  T[Tasker 产生/转发] --> Bus["AgentRuntime.em / 平台 on"]
  Bus --> L[events Listener]
  Bus --> P[plugin 规则链]
  L --> Side[副作用 · 标记 · 桥接]
  P --> Biz[业务回复]
\`\`\`

最小形状（对齐 \`docs/base-classes.md\`）：

\`\`\`javascript
export default class MyEvent extends ListenerBase {
  constructor() { super('MyAdapter'); }
  async init() { /* bot.on(...); markProcessed(e) */ }
}
\`\`\`

---

## 2. 本仓路径

| 路径 | 说明 |
|------|------|
| \`src/infrastructure/listener/base.js\` | \`ListenerBase\` |
| \`src/infrastructure/listener/loader.js\` | ListenerLoader |
| \`core/system-Core/events/\` | 框架侧示例（如 \`stdin.js\`、\`onebot.js\`、\`device.js\`、\`ai-workspace.js\`） |
| \`docs/base-classes.md\` → ListenerBase | 契约摘要 |
| \`docs/runtime-surface.md\` | \`em\`、挂载时间线 |
| \`docs/infrastructure-shared.md\` | Loader / 热重载共性（若查边界） |

---

## 3. 与 tasker / plugin 怎么配合

| 场景 | 放哪里 |
|------|--------|
| 新 IM 协议接入、WS 路径 | **tasker** |
| 「收到 #命令 做业务」 | **plugin** |
| 「某适配器连接后持续 onxxx」或系统级钩子 | **events** |
| 「对话里调 LLM / MCP」 | **workflow** |

Listener 里需要回消息时，仍走事件对象上的通道能力（\`e\` / \`this.bot\`），不要把业务大段逻辑塞进 Listener 冒充 Plugin。

---

## 4. 热重载边界（必读）

| 扩展点 | 热更直觉（以现行 Loader 为准） |
|--------|--------------------------------|
| plugin / 部分 http / workflow | 常支持开发期热加载（看日志确认） |
| **events** | **常需重启主服**；监听器在 \`init\` 绑到长生命周期对象上，热换易漏解绑或双绑 |
| tasker / 数据库连接 | 多在启动期建立，改完重启 |

实践原则：**改 events 后重启**，再在日志里确认 ListenerLoader 重新 \`init\` 成功。不要假设「存盘即生效」。

### system-Core/events 速览（示例名，以仓库为准）

| 文件直觉 | 可能职责 |
|----------|----------|
| \`stdin.js\` | 与 stdin Tasker / 控制台输入相关的监听 |
| \`onebot.js\` | OneBot 侧补充钩子 |
| \`device.js\` | 设备通道相关 |
| \`ai-workspace.js\` | 与 AI 工作区 / 工作流外围相关 |

读代码时抓住：\`init()\` 里绑定了什么、有没有在 \`destroy\`/重载路径上解绑（若基类或 Loader 提供清理钩子，以源码为准）。

---

## 5. 实践清单

1. 列出 \`core/system-Core/events/\` 文件名，各用一句话猜职责。  
2. 启动日志中搜索 Listener / events 相关加载信息。  
3. 改一个 Listener 的日志字符串 → **重启** → 确认新字符串出现。  
4. 口述：为什么「指令逻辑」不该写进 events。

---

## 6. 文档链接

- \`docs/base-classes.md\`（ListenerBase）  
- \`docs/runtime-surface.md\`  
- \`docs/tasker-loader.md\` / \`docs/tasker-base-spec.md\`（上游事件从哪来）  
- \`docs/事件系统标准化文档.md\`

## 下一步

**插件架构**（Loader 族总览）· **Tasker 通道**（事件从哪来）· **实践·最小插件**（业务落点）。  
需要 AI 对话时转到 **工作流 / Factory / MCP / 办事助手**。
`;
