/** 实践 · 配置三同步 */
export default `# 实践课 · 配置三同步

> 目标：搞清「改一个配置字段」要动哪三处，并在本地走通一次只读/写入路径（按你 Core 类型选模板目录）。

## 三同步

| 层 | 独立产品 Core | system / 工厂 |
|----|---------------|---------------|
| 模板 | \`core/<名>/default/*.yaml\` | \`config/default_config/\` |
| Schema | \`core/<名>/commonconfig/\` | \`core/system-Core/commonconfig/\` |
| 消费代码 | 读配置的业务 | 同左 |

\`\`\`quiz
{"title":"配置归属","questions":[{"q":"给 lsy 一类独立产品加业务配置，应放？","choices":[{"t":"只改 config/default_config/","ok":false,"why":"产品配置不进运行时默认仓。"},{"t":"Core 的 default/ + commonconfig/ + 消费代码","ok":true,"why":"三同步。"},{"t":"只写在插件顶部注释","ok":false,"why":"娱乐插件例外；正经产品要 schema。"}]}]}
\`\`\`

## 通关

1. 指出你要改的字段属于框架还是产品  
2. 打开对应 yaml 模板与 schema 文件  
3. 找到 \`read()\`/消费处，确认键名一致  

真源：skill \`xrk-config\`。

## Coding Agent 协作

可复制：

\`\`\`
目标：给独立产品 Core 增加布尔配置 feature.enabled（示例名可改）。
现场：core 名=…；是独立产品还是 system/工厂=…
约束：独立产品只动 core/<名>/default/ + commonconfig/ + 消费代码；禁止往 config/default_config/ 塞产品配置。
验收：先列出三处相对路径与键名，我确认后再改；说明 read() 从哪引导默认模板。
\`\`\`

## 下一步

**配置归属** 课复盘 · **最小贡献路径**。
`;
