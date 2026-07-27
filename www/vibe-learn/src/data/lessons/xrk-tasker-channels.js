/** Tasker 通道层 */
export default `# Tasker 通道层

> Tasker = **协议适配层**：把 OneBot / stdin / QQBot / 飞书等平台报文，变成 Runtime 能理解的统一事件，再交给 plugin / events。  
> 它不是业务指令本身——业务在 \`plugin/\`。

## 本课你要带走什么
\`\`\`match
{"title":"通道配对","pairs":[{"id":"t","left":"Tasker","right":"协议/通道适配"},{"id":"ob","left":"OneBot 等","right":"具体通道实现"},{"id":"stdin","left":"Stdin","right":"本机调试通道"}]}
\`\`\`


1. \`TaskerBase\` / 注册面（\`AgentRuntime.tasker\` · \`wsf\`）在干什么  
2. \`msgSegment\` 怎么拼消息段；\`e.bot\` 与裸名 \`AgentRuntime\` 的区别  
3. 和 **plugin** 的分工：通道 vs 业务逻辑  
4. 实践：看 Loader 日志、用 stdin 发一条

---

## 1. 定位：通道，不是店铺
\`\`\`quiz
{"title":"Tasker 快测","questions":[{"q":"tasker/ 主要解决什么？","choices":[{"t":"数据库 ORM","ok":false,"why":"那是数据层。"},{"t":"把各通道协议适配进统一运行时","ok":true,"why":"QQ/OneBot/Stdin/设备等。"},{"t":"只负责画前端图表","ok":false,"why":"不是 www 的活。"}]}]}
\`\`\`


| | Tasker | Plugin |
|--|--------|--------|
| **目录** | \`core/*/tasker/*.js\` | \`core/*/plugin/*.js\` |
| **职责** | 连平台、收发包、造事件 \`e\` | 匹配规则、执行业务、\`reply\` |
| **基类** | 可选 \`TaskerBase\`（\`src/infrastructure/tasker/tasker-base.js\`） | \`PluginBase\` |
| **注册** | \`AgentRuntime.tasker.push\`、\`AgentRuntime.wsf[path]\` | PluginLoader 扫描 |

\`\`\`mermaid
flowchart LR
  Plat[平台 WS/HTTP/stdin] --> T[Tasker]
  T --> E["统一事件 e"]
  E --> EM["AgentRuntime.em"]
  EM --> P[PluginLoader / Listener]
  P --> R["e.reply / msgSegment"]
\`\`\`

> **\`e.bot\` ≠ \`AgentRuntime\`**：\`e.bot\` 是通道账号实例（uin、回消息）；编排加载器 / HTTP / 子服用全局裸名 \`AgentRuntime\`。见 \`docs/runtime-surface.md\`。

---

## 2. 模块与本仓路径

| 项 | 路径 |
|----|------|
| 规范 | \`docs/tasker-base-spec.md\` |
| Loader | \`docs/tasker-loader.md\` · \`src/infrastructure/tasker/loader.js\` |
| 可选基类 | \`src/infrastructure/tasker/tasker-base.js\` |
| OneBot 专题 | \`docs/tasker-onebotv11.md\` |
| system-Core 示例 | \`core/system-Core/tasker/\`（如 \`OneBotv11.js\`、\`stdin.js\`、\`QBQBot.js\`、\`GSUIDCORE.js\`） |
| 其它通道 Core | \`Feishu-Core\`、\`QQbot-Core\`、\`Telegram-Core\` …（本地可有，按产品启用） |

### 2.1 消息段 \`msgSegment\`

- 挂载：\`src/bootstrap-globals.js\` → 全局裸名  
- 用法：\`msgSegment.image(url)\`、\`msgSegment.text(...)\` 等（以源码导出为准）  
- **勿** \`import msgSegment\` / \`global.msgSegment\`（业务约定裸名）

### 2.2 Loader 行为（摘要）

1. 扫描所有 \`core/*/tasker/**/*.js\`  
2. 动态 \`import\`；Tasker 内部自行 \`push\` / 注册 \`wsf\`  
3. 日志给出扫描数、成功/失败、注册数（命名空间常为 \`TaskerLoader\`）

WebSocket 路径统一经 \`runtime-ws\` 鉴权（与 \`docs/AUTH.md\` 一致）；路径可声明 \`skipAuth: true\` 由 Tasker 自管业务鉴权。

---

## 3. 常见通道对照

| 通道 | 典型落点 | 说明 |
|------|----------|------|
| **OneBot v11** | \`system-Core/tasker/OneBotv11.js\` | 机器人协议适配；详见 \`tasker-onebotv11.md\` |
| **stdin** | \`system-Core/tasker/stdin.js\` | 终端调试；挂 \`stdinHandler\`；\`AgentRuntime.callStdin\` |
| **QQBot 等** | system / 产品 Core tasker | 按平台协议转换事件 |
| **飞书等** | \`Feishu-Core/tasker\` 等 | 独立 Core 扩展，不进 Runtime 内核 |

### 通道 Core 仓库（clone 到 \`core/\`）

| Core | 仓库 |
|------|------|
| QQbot-Core | [github.com/sunflowermm/QQbot-Core](https://github.com/sunflowermm/QQbot-Core) |
| Feishu-Core | [github.com/sunflowermm/Feishu-Core](https://github.com/sunflowermm/Feishu-Core) |
| Telegram-Core | [github.com/sunflowermm/Telegram-Core](https://github.com/sunflowermm/Telegram-Core) |
| Wechat-entreprise-Core | [github.com/sunflowermm/Wechat-entreprise-Core](https://github.com/sunflowermm/Wechat-entreprise-Core) |
| Openclaw-Core | [github.com/sunflowermm/Openclaw-Core](https://github.com/sunflowermm/Openclaw-Core) |
| xianyu-Core | [github.com/sunflowermm/xianyu-Core](https://github.com/sunflowermm/xianyu-Core) |
| xiaozhi-Core | [github.com/sunflowermm/xiaozhi-Core](https://github.com/sunflowermm/xiaozhi-Core) |

完整名录（含产品/数据/子服插件）→ **业务层全景** §4。

---

## 4. 实践清单

1. **看日志**：启动主服，在输出中搜索 \`TaskerLoader\` / tasker 加载统计，确认至少一个 Tasker 注册成功。  
2. **stdin 发一条**：按本机配置启用 stdin Tasker 后，在对接终端输入一条会被插件规则匹配的消息（或 \`AgentRuntime.callStdin\` 相关调试路径），观察 plugin 是否收到 \`e\`。  
3. **对照代码**：打开 \`core/system-Core/tasker/stdin.js\` 与任意 \`plugin/*.js\`，标出「谁造 \`e\`、谁处理 \`e\`」。  
4. **口述**：为什么改指令逻辑不该去改 Tasker 文件。

---

## 5. 文档链接

- \`docs/tasker-base-spec.md\` · \`docs/tasker-loader.md\` · \`docs/tasker-onebotv11.md\`  
- \`docs/runtime-surface.md\`（\`tasker\` / \`wsf\` / \`callStdin\` / \`e.bot\`）  
- \`docs/AUTH.md\`（WS 鉴权）  
- \`docs/事件系统标准化文档.md\`（事件命名，若需）

## 下一步

**events 监听** · **插件架构** · **业务层全景** · **实践·最小插件**。  
通道通了，才谈得上 AI **Stream**。
`;
