export default `# AgentRuntime

> 进程启动后，核心逻辑由 **AgentRuntime** 实例承担：加载 Core、挂载扩展、接入消息与工作流。  
> 业务包（Core）向该运行时报到；业务代码使用**裸名** \`AgentRuntime\`（全局单例 Proxy），勿 \`import\` 另建实例。
> **学会之后**：能说明 AgentRuntime 启动链、裸名全局与热加载边界。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 入口 | node app → start → agent-runtime |
| 裸名 | AgentRuntime / msgSegment 勿乱 import 新实例 |
| 子服 | callSubserver 边界清晰 |
| 热加载 | 知边界；constructor 勿堆易变缓存 |


## 本课你要带走什么

1. 启动链：\`app.js\` → \`start.js\` → \`agent-runtime.js\` → Loaders  
2. 全局裸名约定（\`AgentRuntime\` / \`msgSegment\` / …）  
3. \`callSubserver\` 与热加载在 Runtime 上的位置  
4. 权威文档入口：\`docs/runtime-surface.md\`

---

## 1. 概念对应
\`\`\`quiz
{"title":"Runtime 边界","questions":[{"q":"Core 开发者对 src/infrastructure 的正确态度？","choices":[{"t":"业务逻辑优先改进去图省事","ok":false,"why":"业务必须待在 core/。"},{"t":"只消费暴露能力；缺能力再提框架扩","ok":true,"why":"边界清晰才能多 Core 共存。"},{"t":"可以 fork 一份 Runtime 私改","ok":false,"why":"维护成本爆炸。"},{"t":"把业务 yaml 全部塞进 src/ 更清晰","ok":false,"why":"配置与业务都不进 Runtime 源码树。"}]}]}
\`\`\`


\`\`\`match
{"title":"Runtime 裸名配对","pairs":[{"id":"ar","left":"AgentRuntime","right":"全局运行时对象（裸名）"},{"id":"hr","left":"HttpResponse","right":"统一 HTTP 成功/错误形状"},{"id":"pl","left":"PluginBase","right":"插件基类"},{"id":"no","left":"禁止","right":"业务里 new AgentRuntime() / import 运行时单例乱法"}]}
\`\`\`

| 已有概念 | 本课落点 |
|----------|----------|
| **进程**（序章） | \`node app\` 启动的 OS 进程 |
| **运行时**（第一·二章） | 进程内的 AgentRuntime 逻辑中枢 |
| **端口 / HTTP**（第三章） | Runtime 挂载的 Express / 路由 |
| **Core**（下一课） | 向 Runtime 挂载的业务包 |

\`\`\`mermaid
sequenceDiagram
  participant App as "app.js"
  participant Boot as "bootstrap-globals"
  participant Start as "start.js"
  participant AR as "AgentRuntime.run"
  participant Load as "Loaders"
  App->>Start: bootstrap
  Note over Boot: "PluginBase 与 msgSegment"
  Start->>AR: setRuntimeGlobal
  AR->>Load: CommonConfig 先 load
  AR->>Load: Stream Plugins Api Tasker
\`\`\`

对齐 \`docs/runtime-surface.md\` 挂载时间线：配置在 \`CommonConfigRegistry.load()\` **完成前不可用**。  
启动顺序直觉：\`app.js\` → bootstrap-globals（\`PluginBase\` / \`msgSegment\`）→ \`start.js\` 挂 \`AgentRuntime\` → **先** CommonConfig → 再 Plugins / Http / Workflow / Tasker…

\`\`\`algo
{"kind":"xrklayers","title":"Runtime 在中间一层","autoplay":true,"speed":850,"data":{"mode":"plugin"}}
\`\`\`

\`\`\`quiz
{"title":"挂载时机","questions":[{"q":"业务代码何时才能稳定读 runtimeConfig？","choices":[{"t":"CommonConfigRegistry.load() 完成并挂全局之后","ok":true,"why":"配置阶段完成前应用 ConfigBase/默认模板，勿假设已就绪。"},{"t":"一 import app.js 的瞬间，任意模块顶层行都能读到齐全配置","ok":false,"why":"Loader 有先后；配置在后段才挂上。"},{"t":"runtimeConfig 只能在浏览器 www 里读取，服务端禁止","ok":false,"why":"这是服务端单例。"},{"t":"业务侧永远禁止读配置，端口密钥只能硬编码进模块","ok":false,"why":"就绪后正常 import runtimeConfig。"}]}]}
\`\`\`

---

## 2. 全局裸名（必遵）

| 对象 | 业务写法 | 不要写 |
|------|----------|--------|
| AgentRuntime | 裸名 \`AgentRuntime\` | \`import AgentRuntime\`、\`new AgentRuntime()\`、\`global.AgentRuntime\` |
| msgSegment | \`msgSegment.image(url)\` | \`global.msgSegment\` |
| PluginBase | \`import\` 基类路径 | 新代码依赖 \`global.PluginBase\` |
| runtimeConfig | \`import runtimeConfig from '#infrastructure/config/config.js'\` | 配置未就绪时乱读 |
| HTTP | \`req.agentRuntime\` 或 handler 第三参 | 无必要 \`global.\` |

\`e.bot\` 是**通道账号实例**，不是全局 \`AgentRuntime\`。  
\`src/\` 挂载用 \`setRuntimeGlobal\`（\`#utils/runtime-globals.js\`）。

---

## 3. 实例面摘要

| 能力 | 说明 |
|------|------|
| \`AgentRuntime.tasker\` / \`wsf\` | Tasker 列表与 WS 路径 |
| \`AgentRuntime.em(...)\` | 事件总线入口 |
| \`AgentRuntime.callStdin(...)\` | 经 stdin Tasker |
| \`AgentRuntime.callSubserver(path, options?)\` | 调子服 HTTP JSON |
| \`AgentRuntime.fetchSubserverToPath(...)\` | 拉子服文件到本地 |
| \`AgentRuntime.checkApiAuthorization(req)\` | API Key（HttpApi 默认已包） |
| \`AgentRuntime.getServerUrl()\` / \`getPublicServerUrl\` | 基址 |
| Proxy | 自身属性 → \`bots[self_id]\` → \`RuntimeUtil\` 静态方法 |

细节表以 \`docs/runtime-surface.md\` 为准，勿背过期 API。

---

## 4. 热加载与操作面

| 操作 | 直觉 |
|------|------|
| 改 plugin / 部分 workflow | 观察对应 Loader 热更新日志 |
| 改 events / 数据库连接 / 多数启动期绑定 | **重启**更稳妥 |
| 改 yaml 配置 | 视配置是否支持热更；不确定就重启 |
| 健康检查 | \`GET /api/health\`（鉴权规则见 Auth 课） |

常见操作面：控制台确认 online；多端 Tasker 是否注册；子服 \`callSubserver\` 是否通。

---

## 5. 实践清单

1. 读 \`docs/runtime-surface.md\` 前两节（全局写法 + 挂载时间线）。  
2. 启动一次，在日志中标出：globals 就绪 → CommonConfig → 各 Loader。  
3. 在任意已加载插件里（只读）搜索 \`AgentRuntime.\` 用法，确认无 \`import AgentRuntime\`。  
4. 对照 **业务层全景**，指出 Runtime 下面挂了哪些扩展点。

---

## 6. 文档链接

- \`docs/runtime-surface.md\`（本课真源）  
- \`docs/startup.md\` · \`docs/base-classes.md\`  
- \`docs/subserver-api.md\` · \`docs/AUTH.md\`

## 下一步

**Core 放码** — 业务文件归属；  
**插件架构** — Loader 挂载机制；  
**业务层全景** — 扩展点一张表；  
**语言栈 / 子服务端** — 多语言进程族与调用方式。
`;
