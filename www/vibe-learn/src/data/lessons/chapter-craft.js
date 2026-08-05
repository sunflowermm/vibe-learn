export default `# 番外 · 工程素养

> 调试、安全、测试、观测、CI——写功能之外的**职业卫生**。  
> **Vibe Coding 时代更重要**：Agent 改得越快，你越要会看见、会验证、会守密钥。  
> 真源锚点：OWASP Top 10 · [Google SWE Testing](https://abseil.io/resources/swe-book/html/ch11.html) · [SRE 金信号](https://sre.google/sre-book/monitoring-distributed-systems/) · [pnpm CI](https://pnpm.io/continuous-integration)。  
> 可与第四章并行；建议在最小插件实验前后各读一遍。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 卫生 | 密钥不进仓；小步提交；审 diff |
| CI | 知道机器检查与本地工具链应对齐 |
| 可观测 | 出问题能说「看日志 / 指标 / 追踪」哪一层 |

## 阅读顺序

\`\`\`steps
{"title":"工程素养路径","steps":[{"title":"调试与日志","body":"复现、堆栈、探针"},{"title":"安全常识","body":"密钥、注入、鉴权底线"},{"title":"测试入门","body":"断言锁行为"},{"title":"日志观测","body":"上线后怎么看见"},{"title":"CI","body":"机器替你跑检查"}]}
\`\`\`

1. **调试与日志** — 怎么看见程序在干什么（也给 Agent 贴日志）  
2. **安全常识** — 密钥、注入、信任边界（OWASP 向）  
3. **测试入门** — 最小断言 → 再谈框架  
4. **日志观测** — Metrics / Logs（Traces 进阶）+ 金信号  
5. **CI** — pnpm frozen、Secrets、红叉读日志  

## 章专属动画（分镜）

| 课 | kind | 钉什么 |
|----|------|--------|
| 调试 | \`debugloop\` | 复现 → 探针 → 单点 → 回归 |
| 安全 | \`secbase\` | 密钥 · 注入 · 鉴权 · 审 diff |
| 测试 | \`testpyra\` | 单测 / 集成 / E2E 金字塔 |
| 观测 | \`obspillar\` | Logs · Metrics · Traces + 金信号 |
| CI | \`cipipe\` | checkout → install → test → build |

## 与 Vibe 的关系

| 习惯 | 为什么 |
|------|--------|
| 稳定复现再修 | Agent 才能对症；否则瞎重构 |
| 审 diff | vibe 默认动作 |
| CI / 测试 | AI 改完仍要跑 |
| 密钥不进仓 | Agent 也常犯；你守门 |
| 结构化日志 | 给人或 Agent 的排障输入 |

心智课：**Vibe Coding 心智**。

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 错误 | \`HttpResponse.error\` / \`normalizeError\` |
| 鉴权 | 第四章 **HTTP 认证**；勿关鉴权上生产 |
| 包管理 | 仅 **pnpm**；CI frozen-lockfile；Node ≥ 26 |
| Secrets | 平台密钥库 / \`.env\`；永不进 Git |

## 学完应能

- 用日志/断点复现问题，并读堆栈到自己的行  
- 不把密钥提交进 Git；知注入与参数化  
- 说清「至少测什么」；理解 CI 绿/红含义  
`;
