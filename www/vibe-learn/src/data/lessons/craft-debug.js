export default `# 调试与日志

> 调试 = **制造可见性**：确认实际值与控制流，而不是瞎改。  
> Vibe 场景：先自己复现并贴日志，再让 Agent 修——比「帮我看看」有效十倍。  
> **学会之后**：能稳定复现问题，读堆栈到自己的文件:行号，并用「单点假设」推进。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 复现 | 步骤可写清；输入固定 |
| 堆栈 | 落到自己代码行，不在 node:internal 空转 |
| 探针 | 入口/出口关键字段可核对 |
| 跟 Agent | 先贴完整报错与复现，再要补丁 |

\`\`\`algo
{"kind":"debugloop","title":"调试环：复现 → 探针 → 单点 → 回归","autoplay":true,"speed":820}
\`\`\`

\`\`\`reveal
{"title":"日志里定位自己的帧","prompt":"完整堆栈 > 猜","tone":"info","face":"Error: lab boom\\n    at HelloLab.run (file:///.../core/my-lab-Core/plugin/hello-lab.js:14:11)\\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)","body":"第一帧自己的 plugin 文件:行号就是切口。复现命令 + 完整堆栈交给 Agent；不要只说「又报错了」。"}
\`\`\`

\`\`\`check
{"title":"调试卫生","items":[{"id":"repro","text":"有可重复的最小复现步骤"},{"id":"log","text":"日志/堆栈指向自己的文件"},{"id":"one","text":"一次只验证一个假设"}]}
\`\`\`

## 三板斧

| 手段 | 用法 |
|------|------|
| \`console.log\` / 结构化日志 | 快；记得删或降级；生产用级别 |
| 断点（IDE / \`debugger\`） | 停住看调用栈与变量 |
| 二分 | 注释一半路径，看问题在哪侧 |

\`\`\`steps
{"title":"复现再修","steps":[{"title":"稳定复现","body":"步骤写下来；固定输入"},{"title":"加探针","body":"入口/出口各打关键字段"},{"title":"单点修改","body":"一次验证一个假设"},{"title":"回归","body":"相关路径再跑一遍；能测就留下用例"}]}
\`\`\`

## 读堆栈（Node）

\`\`\`
TypeError: Cannot read properties of undefined (reading 'x')
    at foo (file:///…/core/…/plugin/bar.js:42:10)
    at …
    at node:internal/…
\`\`\`

1. 先看**错误类型 + 信息**  
2. 跳到**自己的文件:行号**（忽略 \`node_modules\` 噪声）  
3. 打印该处变量是否为 \`undefined\`  
4. 修一处再跑  

详见 **读报错** 课。

## 日志级别直觉

| 级别 | 何时 |
|------|------|
| \`error\` | 失败需人处理 |
| \`warn\` | 异常但还能继续 |
| \`info\` | 关键业务节点 |
| \`debug\` | 开发细节；生产默认关 |

密钥与隐私字段**不要**打进日志。上线后怎么看系统：见 **日志与观测**。

\`\`\`quiz
{"title":"调试","questions":[{"q":"给 Agent 排障时，最有效的输入是什么？","choices":[{"t":"「坏了，你看着办」","ok":false,"why":"无现场。"},{"t":"复现步骤 + 堆栈/日志原文 + 约束","ok":true,"why":"可对症。"},{"t":"只发一张表情包","ok":false,"why":"无效。"}]}]}
\`\`\`

## Vibe Coding

\`\`\`prompt
目标：根据我贴的日志定位 bug，只做最小修复。
现场：复现步骤=…；日志/堆栈原文=…
约束：一次只改一个假设；不要顺手大重构；密钥勿写入仓。
验收：指出该打开的文件:行号；给出复现命令；我审 diff 后再接受。
\`\`\`

心智：**Vibe Coding 心智**。

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 错误形状 | \`HttpResponse.error\` / \`normalizeError\`；勿吞异常 |
| 插件/HTTP | 统一错误处理；堆栈落到 \`core/…\` 自己的行 |
| Agent | 复现步骤 + 堆栈原文进 prompt |

## 下一步

**安全常识** · **日志与观测** · **读报错**。
`;
