/** 配置归属 */
export default `# 配置归属

> 配置位置错误会导致行为难排查。  
> 基本原则：**框架级模板**与**产品级模板**分离。

## 归属判定

\`\`\`quiz
{"title":"配置归属自测","questions":[{"q":"独立产品 Core 的业务 yaml 默认模板应放？","choices":[{"t":"config/default_config/","ok":false,"why":"那里只放运行时/体系模板。"},{"t":"core/<core>/default/ + commonconfig + data/<产品>/","ok":true,"why":"独立 Core 配置三件套。"},{"t":"随便放在 src/","ok":false,"why":"业务不进 src。"}]}]}
\`\`\`

| 配置性质 | 位置 |
|----------|------|
| 运行时、通用 LLM 工厂、system-Core 体系 | \`config/default_config/\` |
| 独立产品 Core | \`core/<名>/default/\` + 运行时数据 \`data/<产品>/\` |

独立产品业务配置不得写入 \`config/default_config/\`。

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
- **LLM / MCP**：主服 \`ai-workflow\`；通向 **Stream** 与第五章；LLM 不在子服运行  

## 下一步

**Stream** — 对话业务层；或先阅读 **子服务端** 完成进程与配置边界。
`;
