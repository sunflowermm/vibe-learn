export default `# 配置归属

> 配置位置错误会导致行为难排查。  
> 基本原则：**框架级模板**与**产品级模板**分离。  
> **学会之后**：能判定配置进 default_config 还是 Core default/，并说出三同步。

## 学会之后（验收）

\`\`\`decide
{"title":"配置写到哪？","start":"start","steps":[{"id":"start","q":"这份配置属于？","options":[{"label":"AGT 运行时 / LLM 工厂 / system-Core","next":"fw"},{"label":"独立产品 Core 业务","next":"prod"},{"label":"本机密钥与开关","next":"env"},{"label":"只想在本机改一下试试","next":"data"}]},{"id":"fw","result":"config/default_config/ + system-Core commonconfig + 消费代码。","detail":"三同步。"},{"id":"prod","result":"core/<名>/default/ + commonconfig/ + data/<产品>/。","detail":"禁止塞进 default_config。"},{"id":"env","result":"环境变量 / 密钥库；模板里不写真实值。","detail":".env 不进 Git。"},{"id":"data","result":"可改 data/，但缺模板则新环境无法引导——模板仍要齐。","detail":"实践·配置三同步。"}]}
\`\`\`


| 能力 | 成功信号 |
|------|----------|
| 框架模板 | config/default_config/ |
| 产品模板 | core/*/default/ + data/产品/ |
| 三同步 | 模板 · schema · 消费代码 |
| 禁止 | 产品业务 yaml 塞进 default_config |

## 归属判定

\`\`\`quiz
{"title":"配置归属自测","questions":[{"q":"独立产品 Core 的业务 yaml 默认模板应放？","choices":[{"t":"config/default_config/（与运行时/体系模板混放即可，产品也塞这里）","ok":false,"why":"那里只放运行时/体系模板。"},{"t":"core/<core>/default/ + commonconfig + data/<产品>/","ok":true,"why":"独立 Core 配置三件套。"},{"t":"随便放在 src/ 任意目录，随 Runtime 一起发布即可生效","ok":false,"why":"业务不进 src。"},{"t":"只提交到 README 即可生效，不必落盘 yaml 与 schema","ok":false,"why":"文档不驱动运行时。"}]}]}
\`\`\`

| 配置性质 | 位置 |
|----------|------|
| 运行时、通用 LLM 工厂、system-Core 体系 | \`config/default_config/\` |
| 独立产品 Core | \`core/<名>/default/\` + 运行时数据 \`data/<产品>/\` |

独立产品业务配置不得写入 \`config/default_config/\`。

\`\`\`pick
{"title":"配置碎片归到哪？","caption":"先点条目，再点目录类。","bins":[{"id":"fw","label":"default_config/"},{"id":"prod","label":"core/*/default/"},{"id":"data","label":"data/<产品>/"},{"id":"env","label":"环境变量 / 密钥库"}],"items":[{"id":"llm","text":"通用 LLM 工厂模板","bin":"fw"},{"id":"feat","text":"独立产品业务开关模板","bin":"prod"},{"id":"rt","text":"某产品运行时落地 yaml","bin":"data"},{"id":"key","text":"API Key 真值","bin":"env"}]}
\`\`\`

## 关键概念
\`\`\`match
{"title":"配置归属配对","pairs":[{"id":"rt","left":"default_config/","right":"运行时 / 工厂 / system 体系"},{"id":"prod","left":"core/*/default/","right":"独立产品 Core 模板"},{"id":"data","left":"data/<产品>/","right":"运行时数据"},{"id":"schema","left":"commonconfig/","right":"Schema 与编辑面"}]}
\`\`\`


| 术语 | 含义 |
|------|------|
| **CommonConfig** | 带 schema 的统一配置（表单、校验、加载） |
| **默认模板** | 首次运行时复制出的可编辑起点 |
| **运行时数据** | 进程实际读取的配置实例（常在 \`data/\`） |
| **schema** | 配置结构的形式化描述 |

与第一章 \`package.json\` 契约同构：清单决定后续行为边界。

## 模板对照

| 类型 | 模板默认位置 | 运行时数据 | schema 常见位置 |
|------|----------------|------------|-----------------|
| AGT 运行时 / LLM 工厂 / system | \`config/default_config/\` | 配置系统加载后的实例 | \`core/system-Core/commonconfig/\` 等 |
| 独立产品 Core | \`core/<名>/default/\` | 常在 \`data/<产品>/\` | \`core/<名>/commonconfig/\` |

变更配置项时，宜同步维护：**模板、schema、消费代码**。

## 与包管理的类比

| 依赖管理 | 配置管理 |
|----------|----------|
| \`package.json\` | \`default/*.yaml\` |
| 锁文件 | 运行时落地配置 |
| 全局随意安装 | 误改 \`config/default_config/\` |

## 检查清单

1. 属于框架能力还是产品能力？  
2. 模板目录是否正确？  
3. schema 与消费代码是否同步？

## 子服配置

| 变更项 | 编辑位置 | 说明 |
|--------|----------|------|
| runtime 的 host / port / enabled | 主服 \`ai-workflow\` → \`subserver.runtimes.*\` | 子服进程侧不作为主配置编辑入口 |
| 默认 runtime | \`subserver.default\`（常用 \`pyserver\`） | 可与其它 runtime 并存启用 |
| 子服插件业务配置 | 主服 CommonConfig；子服 \`load_plugin_config\` 只读 | 配置中枢在主服 |

登记表：\`src/utils/subserver-runtimes.js\`；选型：\`subserver/LANGUAGES.md\`。

## 与网络 / 语言章节的衔接

- **端口、反代、CORS**：先对齐第三章，再判定框架或产品归属  
- **子服地址与开关**：见上表；详解见 **子服务端**、**语言栈**  
- **LLM / MCP**：主服 \`ai-workflow\`；通向 **工作流** 与第五章；LLM 不在子服运行

## 下一步

**工作流** — 对话业务层；或先阅读 **子服务端** 完成进程与配置边界。  
动手 → **实践·配置三同步**。
`;
