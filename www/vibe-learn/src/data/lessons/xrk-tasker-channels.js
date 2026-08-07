export default `# Tasker 通道层

> Tasker = **协议适配层**：把 OneBot / stdin / QQBot / 飞书等平台报文，变成 Runtime 能理解的统一事件 \`e\`。  
> **不是**店铺柜员（业务在 \`plugin/\`）；它是**收发室**。  
> 真源：\`docs/tasker-base-spec.md\` · \`docs/tasker-loader.md\` · \`docs/runtime-surface.md\`。  
> **学会之后**：能说明 Tasker 造事件 e、msgSegment 出站，与插件业务分工。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 角色 | 通道适配；不是业务核心 |
| e | 统一事件形状进插件 |
| 出站 | msgSegment 拼消息 |
| 多端 | QQ/OneBot/stdin/设备 |

\`\`\`algo
{"kind":"taskerflow","title":"一条消息怎么进仓（老师演示）","autoplay":true,"speed":900}
\`\`\`

## 设计巧思：为何单独一层？

| 若混在一起 | 单独 Tasker 之后 |
|------------|------------------|
| 换 IM 平台要改遍业务插件 | 业务只认统一 \`e\`，换通道改 Tasker |
| 协议细节泄漏进指令逻辑 | plugin 只写 \`reg\` + \`reply\` |
| 调试只能等真机器人上线 | **stdin** 通道本机就能验 |

口诀：**通道造 \`e\`，插件吃 \`e\`，Listener 挂横切。**

---

## 1. 和其它章怎么对上号

| 已学 | 本课落点 |
|------|----------|
| **序章 · 进程** | 主服一个 Node 进程里挂多个 Tasker |
| **第一章 · 终端** | **stdin** Tasker = 用终端当假 IM |
| **第三章 · HTTP/WS** | 多数通道走 WebSocket；鉴权见 Auth 课 |
| **插件架构** | \`tasker/\` 与 \`plugin/\` 目录分家 |
| **第五章 · Tool Calling** | 通道只送人话；工具环在 workflow，不在 Tasker |

\`\`\`decide
{"title":"这段改动该进哪？","start":"s","caption":"先问：协议、指令、还是横切。","steps":[{"id":"s","q":"你要改的是？","options":[{"label":"新 IM / WS 路径 / 造 e","next":"t"},{"label":"#指令回复文案 / 业务规则","next":"p"},{"label":"连接后常驻钩子、打点","next":"e"}]},{"id":"t","result":"改 core/*/tasker/。","detail":"收发室；别写产品业务。"},{"id":"p","result":"改 core/*/plugin/。","detail":"柜员；吃统一 e。"},{"id":"e","result":"改 core/*/events/。","detail":"排烟机；改完常需重启。"}]}
\`\`\`

---

## 2. 职责表（揉碎）

| | Tasker | Plugin | events |
|--|--------|--------|--------|
| 目录 | \`core/*/tasker/\` | \`core/*/plugin/\` | \`core/*/events/\` |
| 一句话 | 协议 → 统一 \`e\` | 规则 → 业务 | 生命周期钩子 |
| 改指令文案 | **不要** | **要** | 不要 |
| 接新 IM | **要** | 尽量不动 | 可补钩子 |

\`\`\`mermaid
flowchart LR
  Plat[平台] --> T[Tasker]
  T --> E["统一 e"]
  E --> EM["AgentRuntime.em"]
  EM --> P[Plugin]
  EM --> L[Listener]
  P --> R["e.reply · msgSegment"]
\`\`\`

\`\`\`quiz
{"title":"Tasker 快测","questions":[{"q":"tasker/ 目录主要解决什么问题？","choices":[{"t":"数据库 ORM","ok":false,"why":"数据层另线。"},{"t":"把各通道协议适配进统一运行时","ok":true,"why":"收发室，不是柜员。"},{"t":"只负责画前端图表","ok":false,"why":"www 的活。"},{"t":"替代 AiWorkflow 调模型","ok":false,"why":"模型在 Factory/workflow。"}]},{"q":"e.bot 与裸名 AgentRuntime？","choices":[{"t":"e.bot 回本通道消息；AgentRuntime 做编排/子服/HTTP","ok":true,"why":"runtime-surface 硬区分。"},{"t":"二者永远是同一个对象，可以互相随意替换调用","ok":false,"why":"账号实例 ≠ 全局 Runtime。"},{"t":"业务必须 import AgentRuntime，禁止使用裸名全局","ok":false,"why":"裸名；勿 new。"},{"t":"e.bot 只能用来调 MCP，不能回本通道消息","ok":false,"why":"MCP 走工作流工具面。"}]}]}
\`\`\`

---

## 3. 消息段与注册面

| 项 | 记法 |
|----|------|
| \`msgSegment\` | 裸名；\`msgSegment.image(url)\` 等（以源码导出为准） |
| 注册 | Tasker 内 \`AgentRuntime.tasker.push\` / \`AgentRuntime.wsf[path]\` |
| Loader | 扫描 \`core/*/tasker/**/*.js\`；看 \`TaskerLoader\` 日志 |
| WS 鉴权 | 经 \`runtime-ws\`；可 \`skipAuth\` 交给 Tasker 自管 |

真源：\`docs/tasker-base-spec.md\` · \`docs/tasker-loader.md\` · \`docs/runtime-surface.md\`。

---

## 4. 通道对照（选读表）

| 通道 | 典型落点 | 和第一章关系 |
|------|----------|--------------|
| **stdin** | \`system-Core/tasker/stdin.js\` | 终端调试；\`callStdin\` |
| **OneBot v11** | \`OneBotv11.js\` | 机器人协议；见 \`tasker-onebotv11.md\` |
| 飞书 / QQBot / Telegram… | 各产品 Core \`tasker/\` | clone 到 \`core/\` 启用 |

完整仓库表 → **业务层全景**。

---

## 5. 实践清单

1. 日志搜 \`TaskerLoader\`，确认至少一个成功。  
2. 启用 stdin：发一条能命中 **实践·最小插件** 规则的文本。  
3. 打开 \`stdin.js\` 与任意 \`plugin/*.js\`，用笔标「谁造 \`e\` / 谁处理」。  
4. 口述：为何改 \`#lab\` 回复不该去改 Tasker。

## 跨章下一步

**events**（横切钩子）· **实践·最小插件**（吃 \`e\`）· 第三章 **WebSocket 直觉** · 第五章进对话前先通道通。
`;
