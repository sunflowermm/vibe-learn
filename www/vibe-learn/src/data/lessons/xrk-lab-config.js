export default `# 实践课 · 配置三同步

> 目标：搞清「改一个配置字段」要动哪三处，并在本地走通模板 → schema → 消费。  
> 真源：skill \`xrk-config\` · \`docs/config-base.md\` · \`docs/base-classes.md\`（ConfigBase）。
> **学会之后**：能指出改字段时模板/schema/消费三处路径并本地验证。

## 学会之后（验收）

\`\`\`check
{"title":"配置三同步通关","caption":"改完再勾；缺一不可","items":[{"id":"tpl","text":"独立 Core：模板在 core/*/default/","hint":"勿塞 default_config"},{"id":"schema","text":"commonconfig schema 与键名一致","hint":"三处同名"},{"id":"code","text":"消费代码读的是同一套键","hint":"ConfigBase / runtimeConfig"},{"id":"data","text":"运行时 data/<产品>/ 可被模板引导","hint":"新环境能复制"},{"id":"secret","text":"真实密钥不进模板与 Git","hint":"环境变量/密钥库"}]}
\`\`\`


| 能力 | 成功信号 |
|------|----------|
| 三同步 | default · commonconfig · read |
| 产品 vs 框架 | 目录不混用 |
| 子服 | 主服编辑配置 |
| 验收 | 新环境能从模板引导复制 |


## 本课你要带走什么

1. **独立产品** vs **system/工厂** 模板目录不同  
2. 三同步：模板 · schema（commonconfig）· 消费代码  
3. \`ConfigBase\`：\`filePath\`（运行时）+ \`defaultTemplatePath\`（引导复制）+ \`schema\`  
4. 子服业务配置也由**主服**编辑；子服只读

---

## 1. 三同步表

| 层 | 独立产品 Core | system / 工厂 / 运行时 |
|----|---------------|------------------------|
| 模板 | \`core/<名>/default/*.yaml\` | \`config/default_config/\` |
| Schema | \`core/<名>/commonconfig/*.js\` | \`core/system-Core/commonconfig/\` |
| 运行时数据 | 常 \`data/<产品>/\` | \`data/server_bots/...\`（见 config skill） |
| 消费代码 | \`core/<名>/\` 内 read | 同左 / 工厂代码 |

**禁止**：把独立产品业务 yaml 塞进 \`config/default_config/\`。

\`\`\`quiz
{"title":"配置归属","questions":[{"q":"给独立产品 Core 加业务配置，应？","choices":[{"t":"只改 config/default_config/，与运行时模板混放即可","ok":false,"why":"产品配置不进运行时默认仓。"},{"t":"Core 的 default/ + commonconfig/ + 消费代码三同步","ok":true,"why":"模板、schema、read 键名对齐。"},{"t":"只写在插件顶部注释，不必 schema 与模板","ok":false,"why":"娱乐插件例外；正经产品要 schema。"},{"t":"只改 data/ 运行时文件、永不写 default 模板","ok":false,"why":"新环境缺模板无法引导复制。"}]}]}
\`\`\`

---

## 2. ConfigBase 形状（直觉）

独立产品常见字段（示意，键名按你的 Core 改）：

| 构造项 | 含义 |
|--------|------|
| \`name\` / \`displayName\` | 配置页标识 |
| \`filePath\` | 运行时 yaml（如 \`data/<产品>/xxx.yaml\`） |
| \`defaultTemplatePath\` | 缺文件时从 \`core/<名>/default/\` 复制 |
| \`schema.fields\` | 控制台表单与校验 |

子服插件的 commonconfig 仍挂主服控制台；子服 \`load_plugin_config\` **只读**（见 \`docs/subserver-commonconfig.md\`）。

---

## 3. 通关

1. 判定：框架能力还是产品能力？  
2. 打开对应 **模板 yaml** 与 **commonconfig**  
3. 找到消费处（\`read()\` / \`runtimeConfig\` 等），确认键名一致  
4. 改一个非敏感布尔字段 → 重启或按热更规则 → 代码读到新值  

<details>
<summary>验收口述</summary>

- 为何产品配置不能进 \`config/default_config/\`？  
- \`data/\` 里的文件和 \`default/\` 模板谁先谁后？  
- 子服能否在子服进程里「改主配置」？

</details>

## Coding Agent 协作

\`\`\`prompt
目标：给独立产品 Core 增加布尔配置 feature.enabled（名可改）。
现场：core 名=…；独立产品还是 system/工厂=…
约束：独立产品只动 core/<名>/default/ + commonconfig/ + 消费代码；禁止往 config/default_config/ 塞产品配置；先列三处路径再改。
验收：三处键名一致；说明 defaultTemplatePath → filePath 引导复制。
\`\`\`

## 下一步

**配置归属** 课复盘 · **实践 · 最小 HTTP** · **最小贡献路径**。
`;
