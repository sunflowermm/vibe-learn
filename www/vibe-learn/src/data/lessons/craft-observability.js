/** 日志与观测直觉 */
export default `# 日志与观测直觉

> **调试**课管「怎么查一个 bug」；本课管**上线后怎么看见系统状态**。  
> 行业常说三大支柱：**日志 · 指标 · 追踪**（Metrics / Logs / Traces）。零基础先会前两样。

## 三件套

| 信号 | 回答什么 | 例子 |
|------|----------|------|
| **日志 Logs** | 刚才发生了什么（事件流） | 请求失败原因、堆栈 |
| **指标 Metrics** | 现在好不好（聚合数字） | QPS、P99 延迟、错误率 |
| **追踪 Traces** | 一次请求跨了哪些服务 | 分布式进阶；本仓单进程可后学 |

\`\`\`mermaid
flowchart LR
  REQ[请求] --> APP[应用]
  APP --> L[结构化日志]
  APP --> M[计数/计时指标]
  L --> S[检索 / 告警]
  M --> S
\`\`\`

\`\`\`steps
{"title":"日志卫生","steps":[{"title":"分级","body":"error / warn / info / debug；生产少打 debug"},{"title":"结构化","body":"关键字段：time、level、msg、requestId"},{"title":"关联","body":"同一请求一个 requestId，方便串起来"},{"title":"脱敏","body":"Token、密码、Cookie、身份证勿入日志"},{"title":"可检索","body":"固定字段名，别每行散文诗"}]}
\`\`\`

## 好日志 vs 坏日志

| 坏 | 好 |
|----|----|
| \`console.log(user)\` 整对象含 token | \`{ userId, action: 'login_ok' }\` |
| 只打 \`error\` 字符串无上下文 | 带 \`route\`、\`status\`、\`err.message\` |
| 每个循环一行 debug 刷屏 | 采样或聚合；热点才打开 |
| 吞掉异常只 \`log\` 不返回 | 本仓优先 \`HttpResponse.error\` / \`normalizeError\` |

\`\`\`flip
{"title":"观测翻卡","cards":[{"front":"P99","back":"99% 请求比这更快；看尾延迟"},{"front":"错误率","back":"5xx / 业务失败占比；告警常用"},{"front":"日志里打密码","back":"等于把密钥写进可被多人读的文件"},{"front":"无 requestId","back":"并发下很难把多行日志拼成一次请求"}]}
\`\`\`

## 接到本仓

| 做法 | 说明 |
|------|------|
| HTTP | 错误走 \`HttpResponse.error\`，统一形状与日志 |
| 插件 | 异常不要只 \`console.log\` 就吞掉 |
| Agent 排障 | 贴**分级后的相关日志**，比贴整屏噪声有效 |
| 生产 | 少 \`debug\`；密钥字段黑名单 |

\`\`\`quiz
{"title":"观测","questions":[{"q":"生产排障最该优先保证？","choices":[{"t":"每行代码都 console.log","ok":false,"why":"噪声淹没信号。"},{"t":"错误可检索 + 脱敏 + 关联 ID","ok":true,"why":"能定位且不泄密。"},{"t":"关掉所有日志提性能","ok":false,"why":"出事两眼一抹黑。"}]}]}
\`\`\`

## Coding Agent

\`\`\`prompt
目标：给某条 HTTP/插件路径补最小结构化错误日志建议（字段列表）。
现场：路径/文件=…；现有日志样例=…
约束：列出必须脱敏字段；不要引入重型 APM 除非我要求；贴合 HttpResponse.error。
验收：字段表 + 一条示例日志 JSON。
\`\`\`

## 下一步

**CI 直觉**（机器替你跑检查）· 回 **调试与日志**（本地复现）。
`;
