export default `# 测试入门

> 测试 = 用代码**锁定行为**：改完再跑，看有没有把旧约定弄坏。  
> Vibe 时代更关键：Agent 改得快，没有自动检查就等于**盲合并**。  
> 本课先建立「可自动跑的断言」；Jest / Vitest / Playwright 是工具选型，不是第一步。
> **学会之后**：能写出或读懂「锁行为」的最小断言，并理解金字塔分层。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 动机 | Agent 改得快 → 无测试≈盲合并 |
| 断言 | 给定输入 → 期望输出可自动跑 |
| 分层 | 单测优先；E2E 少而精 |
| 本仓 | CI 里用 pnpm；锁文件冻结安装 |

\`\`\`algo
{"kind":"testpyra","title":"测试金字塔：单测为主 · E2E 少而精","autoplay":true,"speed":860}
\`\`\`

\`\`\`check
{"title":"测试通关","items":[{"id":"why","text":"能说明 Agent 改得快时无测试≈盲合并","hint":"动机"},{"id":"assert","text":"能写或读懂最小断言（给定→期望）","hint":"断言"},{"id":"pyr","text":"知道单测优先、E2E 少而精","hint":"金字塔"},{"id":"ci","text":"本地一条命令能红/绿，并可接到 CI","hint":"本仓"}]}
\`\`\`

## 金字塔（够用即可）

| 层 | 白话 | 成本 |
|----|------|------|
| **单元** | 测纯函数 / 小模块 | 快、稳 |
| **集成** | 测模块协作（如读配置再调函数） | 中 |
| **端到端 (E2E)** | 浏览器或真 HTTP 走通路径 | 慢、脆 |

先有单元与「手工验收清单」，再谈 E2E。本仓 lab 课的手工清单 = 还没自动化的集成测试。

> 比例直觉见 [Software Engineering at Google · Testing](https://abseil.io/resources/swe-book/html/ch11.html)（约 80/15/5 粗分）。

## 零依赖最小例子

\`\`\`javascript
function add(a, b) {
  return a + b
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assert failed')
}

assert(add(1, 2) === 3, 'add(1,2)')
assert(add(-1, 1) === 0, 'add negatives')
console.log('ok')
\`\`\`

\`node your-test.js\` 退出码非 0 = 红灯。这就是 CI 要跑的那类东西的雏形。

## 常见框架心智（选型，不背 API）

| 工具 | 角色 |
|------|------|
| **Node \`assert\` / 自写** | 学习与极小库 |
| **Vitest / Jest** | 前端/Node 单元主流 |
| **node:test** | Node 内置测试跑器（少依赖时） |
| **Playwright / Cypress** | 浏览器 E2E |

本仓主服以 JS 为主：给**纯工具函数**补测性价比最高；插件/HTTP 可先手工清单，关键路径再自动化。

\`\`\`steps
{"title":"给一段逻辑加测","steps":[{"title":"写清输入输出","body":"正常例 + 边界（空、0、非法）"},{"title":"先让测试失败","body":"确认测试真的在测"},{"title":"最小实现变绿","body":"不顺手大重构"},{"title":"挂到脚本","body":"package.json 的 test 或 CI 一步"}]}
\`\`\`

\`\`\`quiz
{"title":"测试","questions":[{"q":"修了一个线上 bug 后，最该补上什么？","choices":[{"t":"只口头告诉同事注意","ok":false,"why":"会再犯。"},{"t":"复现该输入的回归用例","ok":true,"why":"锁定行为。"},{"t":"删掉相关测试省事","ok":false,"why":"失去保护网。"}]}]}
\`\`\`

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 优先 | 纯工具函数 / \`#utils\` 补测性价比最高 |
| 插件/HTTP | 先手工验收清单；关键路径再自动化 |
| CI | 同一 \`pnpm test\`；锁文件冻结 |

## Coding Agent

\`\`\`prompt
目标：为函数 foo(…) 补最小可跑测试（优先 node:test 或纯 assert）。
现场：文件路径=…；已知边界=…
约束：只测可观察行为；不要为了测而导出私有实现；先给用例列表让我确认。
验收：本地一条命令跑红/绿；说明如何接到 CI。
\`\`\`

## 下一步

**日志观测**（生产看见）· **CI**（推送后机器跑）。
`;
