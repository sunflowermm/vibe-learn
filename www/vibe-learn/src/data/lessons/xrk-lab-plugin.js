/** 实践课 · 最小 Core 插件 */
export default `# 实践课 · 最小 Core 插件

> 目标：在**本地**新建（或临时）一个最小插件，走通「目录约定 → PluginBase → Loader 热加载 → 日志可见」。  
> 不改 \`src/\`；不把娱乐插件加进 system-Core 白名单（见项目规则）。

## 本课你要带走什么
\`\`\`steps
{"title":"最小插件步骤","steps":[{"title":"放对目录","body":"core/<core>/plugin/"},{"title":"继承基类","body":"填事件与处理逻辑"},{"title":"热加载验证","body":"按文档触发与观察日志"}]}
\`\`\`


1. 最小可加载插件的目录与导出形状  
2. 如何用启动 / 热加载日志确认挂上  
3. 用 stdin 或已有通道触发一次 \`run\`  
4. 失败时按清单排查（路径、基类、规则、事件名）

---

## 1. 通关清单（按序勾）
\`\`\`match
{"title":"插件实验配对","pairs":[{"id":"base","left":"PluginBase","right":"继承基类填契约"},{"id":"dir","left":"plugin/","right":"被 PluginLoader 扫描"},{"id":"lab","left":"实验课","right":"动手最小插件，验证加载"}]}
\`\`\`


| # | 步骤 | 完成标准 |
|---|------|----------|
| 1 | 选定 Core 目录 | 例如本地 \`core/Example-Core/\` 或自建 \`core/my-lab-Core/\`（仅本地） |
| 2 | 建 \`plugin/hello-lab.js\` | 文件落在 \`plugin/\`，扩展名 \`.js\` |
| 3 | 继承 \`PluginBase\` | \`import PluginBase from '#infrastructure/plugins/plugin-base.js'\`（无 package.json 时） |
| 4 | 构造固定元数据 | \`name\` / \`event: 'message'\` / \`rule\` / \`handler\`；**constructor 内不建缓存 Map** |
| 5 | 实现 handler | \`async run(e) { await e.reply('lab-ok') }\` 一类最小回复 |
| 6 | 观察 Loader | 日志出现插件加载成功 / 热更新成功 |
| 7 | 触发 | stdin 或 OneBot 发匹配规则的文本 |
| 8 | 清理 | 实验完删除或保留本地；**默认不提交**娱乐/一次性实验 |

\`\`\`mermaid
flowchart TB
  A[建 plugin/*.js] --> B[PluginLoader 扫描]
  B --> C[实例化 extends PluginBase]
  C --> D[注册规则]
  D --> E[消息事件]
  E --> F[run → reply]
\`\`\`

---

## 2. 最小代码骨架（对齐 base-classes）

\`\`\`javascript
import PluginBase from '#infrastructure/plugins/plugin-base.js'

export default class HelloLab extends PluginBase {
  constructor() {
    super({
      name: 'hello-lab',
      event: 'message',
      priority: 5000,
      rule: [{ reg: /^#lab$/ }],
      handler: 'run',
    })
  }
  async run(e) {
    await e.reply('lab-ok')
  }
}
\`\`\`

要点：

- 裸名 \`AgentRuntime\` / \`msgSegment\`（需要时），**不要** \`import AgentRuntime\`  
- 有 Core 级 \`package.json\` 时改用相对路径引用 \`src/infrastructure/...\`（子包无 \`#\`）  
- 详细 API：\`docs/plugin-base.md\` · \`docs/base-classes.md\`

---

## 3. 热加载与日志观察

| 观察点 | 你在找什么 |
|--------|------------|
| 启动 | PluginLoader 扫描数、成功数、失败错误栈 |
| 改文件保存 | 热更新日志（若当前环境对 plugin 开启 watch） |
| 触发后 | 业务 \`makeLog\` / 回复是否到达通道 |

若热更新未触发：确认文件路径是否在 \`core/*/plugin/\`；必要时重启主服再试。  
**events** 改动常需重启——本课只动 plugin，避免混测。

---

## 4. 常见失败

| 现象 | 排查 |
|------|------|
| 根本没加载 | 目录名是否 \`plugin\`；是否在被扫描的 Core 下 |
| \`PluginBase is not defined\` | 未走 \`bootstrap-globals\` / 错误用全局而非 import |
| \`#infrastructure\` 解析失败 | Core 有 package.json 却用了 \`#\` |
| 规则不触发 | \`reg\` 是否匹配；\`event\` 是否为实际事件名 |
| 能进 run 不能回复 | 通道 \`e.reply\` / Tasker 是否在线 |
| 热更后旧逻辑仍在 | 确认 watch 命中该文件；否则重启再试 |
| ESLint \`AgentRuntime\` | 应使用全局裸名；勿错误 import |

<details>
<summary>验收口述题</summary>

- 这个文件为什么必须放在 \`plugin/\` 而不是 \`src/\`？  
- \`e.bot\` 和 \`AgentRuntime\` 谁负责回消息、谁负责调子服？  
- 若只改 \`events\`，为什么本课要求重启？

</details>

---

## 5. 文档链接

- \`docs/base-classes.md\` · \`docs/plugin-base.md\`  
- \`docs/runtime-surface.md\` · \`docs/框架可扩展性指南.md\`  
- 本框：**Core 放码** · **插件架构** · **Tasker 通道**

## Coding Agent 协作

可复制：

\`\`\`
目标：在 core/my-lab-Core/plugin/ 写最小 PluginBase 插件，规则 /^#lab$/，回复 lab-ok。
现场：仓库已能 node app；我选的 core 名=…
约束：不改 src/；constructor 不建 Map/缓存；无 package.json 时用 #infrastructure/plugins/plugin-base.js；娱乐插件勿加主仓白名单。
验收：热更或重启后发 #lab 收到 lab-ok；列出改动文件供我审 diff。
\`\`\`

安全节奏见 **Vibe 心智里的安全底线**；提问地图见 **Vibe Coding 心智**。

## 下一步

插件通了 → **HTTP / www** 或 **Stream**；要多语言能力 → **实践·子服调用**。  
回看 **业务层全景** 确认自己改的是地图上的哪一格。
`;
