export default `# Core 放码位置

> 规则：**业务代码位于 \`core/<名>/\`，基础设施位于 \`src/\`。**  
> 边界清晰，有利于热加载、配置归属与多产品并存。  
> 此处 **Core** 指业务能力包（目录约定），而非 CPU 核心。
> **学会之后**：能默写 Core 子目录职责表，并判断新文件该进哪一层。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 目录 | plugin/http/workflow/tasker/events/commonconfig/www |
| www | 必须子目录；保留名勿占 |
| 有包名 Core | 不用 # 别名，用相对路径指 src |
| 文档 | README 给人；AGENTS/skills 给产品 Agent |


## 本课你要带走什么
\`\`\`match
{"title":"Core 目录配对","pairs":[{"id":"p","left":"plugin/","right":"消息/命令插件"},{"id":"h","left":"http/","right":"HTTP API"},{"id":"w","left":"www/<应用>/","right":"静态前端（必须子目录）"},{"id":"c","left":"commonconfig/","right":"配置 schema"}]}
\`\`\`


1. \`src/\` vs \`core/\` vs \`data/\` 谁改什么  
2. 子目录职责表（plugin → www …）  
3. **最小 Core 清单**：从零到可被 Loader 看见要哪些文件夹  
4. 导入约定：\`#\` 别名 vs 相对路径

---

## 1. 目录角色
\`\`\`quiz
{"title":"Core 目录快测","questions":[{"q":"www 静态前端必须放在？","choices":[{"t":"www 根下直接丢 html","ok":false,"why":"必须 www/<应用名>/ 子目录。"},{"t":"www/<应用名>/","ok":true,"why":"挂载为 /应用名。"},{"t":"src/infrastructure/www","ok":false,"why":"业务不进 Runtime。"},{"t":"仓库根目录 shared/","ok":false,"why":"shared 是保留段，产品勿占用。"}]}]}
\`\`\`


| 路径 | 角色 | 修改主体 |
|------|------|----------|
| \`src/\` | 运行时基础设施 | 框架维护者 |
| \`core/<名>-Core/\` | 产品业务包 | 产品开发者 |
| \`data/\` | 运行时数据 | 进程读写生成 |
| \`config/default_config/\` | **仅**框架 / LLM 工厂 / system 体系模板 | 框架；**勿**塞独立产品业务 yaml |
| \`subserver/*/apis/\` | 多语言插件 | 子服开发者 |

\`system-Core\`：框架示例外设 / 通道 / 运维助手；娱乐插件不加白名单、默认不提交。

---

## 2. 子目录职责表

| 子目录 | 内容 | 典型用途 | 深挖课 |
|--------|------|----------|--------|
| \`plugin/\` | 指令与插件 | 机器人 / 指令 | 插件架构 · 实践·插件 |
| \`http/\` | HTTP API | 接口 | HTTP/www · Auth |
| \`www/<应用>/\` | 静态 / SPA 前端 | 控制台 / 学习站 | HTTP/www |
| \`workflow/\` | AI 工作流 | Agent 对话编排 | 工作流 · Factory · MCP |
| \`tasker/\` | 协议适配 | QQ / 其它通道 | Tasker 通道 |
| \`events/\` | 事件监听 | 生命周期钩子 | events |
| \`commonconfig/\` | 配置 Schema | 控制台表单 | 配置归属 |
| \`default/\` | 产品默认 yaml（独立 Core） | 引导复制到 \`data/\` | 配置归属 |
| \`skills/\`（可选） | 产品 Agent 技能 | 注入产品助手 prompt | 办事助手 · 第五章 Skills |
| \`AGENTS.md\`（可选） | 产品 Agent 说明书 | 人格与工具边界 | 根 AGENTS · 办事助手 |

www **必须**子目录；根名勿用保留段：\`api\` \`core\` \`media\` \`uploads\` \`File\` \`shared\`。

\`\`\`algo
{"kind":"xrklayers","title":"业务落在 Core 这一层","autoplay":true,"speed":850,"data":{"mode":"http"}}
\`\`\`

\`\`\`mermaid
flowchart TB
  Core["core/名-Core"] --> P[plugin]
  Core --> H[http]
  Core --> W["www/应用"]
  Core --> WF[workflow]
  Core --> T[tasker]
  Core --> E[events]
  Core --> C[commonconfig]
  Core --> D[default]
  Core --> SK[skills]
  Core --> AG[AGENTS.md]
\`\`\`

完整「别搞混」对照见 **业务层全景**。

---

## 3. 最小 Core 清单

本地实验一个空 Core（名称自定，**默认不提交**）：

1. \`core/my-lab-Core/\`  
2. 至少一项：\`plugin/xxx.js\` **或** \`http/xxx.js\` **或** \`www/app/\` …  
3. 需要配置时：\`commonconfig/\` +（独立产品）\`default/\`  
4. 重启或等 Loader 扫描 → 日志可见  
5. 有 \`package.json\` 则导入改相对路径，禁用 \`#\`

导入约定：

| Core 类型 | 导入 |
|-----------|------|
| **无** package.json | 可用根包 \`#infrastructure/*\`、\`#utils/*\` |
| **有** package.json | **禁止 \`#\`**；相对路径到仓库根 \`src/\` |

---

## 4. 实践清单

1. 打开 \`core/system-Core/\`，核对上表每个子目录是否存在、各举一个文件。  
2. 打开本学习站所在：\`core/vibe-learn-Core/www/vibe-learn/\`，确认它是 www 子应用而非 \`src/\`。  
3. 口述：要把「新 HTTP 接口」和「新页面」分别放哪。  
4. 进入 **实践·最小插件** 按清单做一通。

---

## 5. 文档链接

- \`docs/base-classes.md\` · \`docs/runtime-surface.md\`  
- \`docs/www-mount.md\` · \`docs/框架可扩展性指南.md\`  
- \`AGENTS.md\` · 规则 \`xrk-project.mdc\`

## 下一步

**插件架构** — 约定目录如何被 Loader 挂载；  
对外暴露 → **HTTP / www**；配置 → **配置归属**；  
主服与子服语言分工 → **语言栈**；  
地图索引 → **业务层全景**。
`;
