/** 安全常识 */
export default `# 安全常识（开发者向）

> 不是安全工程师课表；是**别把脚打穿**的底线。  
> 对照行业地图：[OWASP Top 10:2021](https://owasp.org/Top10/)（注入含 XSS；访问控制、加密失败等）。  
> Vibe 场景：Agent 常把 Key 写进文件或日志——**你审 diff、守门**。

## 底线清单（每天用）

| 项 | 做 | 别做 |
|----|----|------|
| **密钥** | \`.env\` / 密钥库 / CI Secrets；\`gitignore\` | 写进源码、README、截图、聊天可提交仓 |
| **输入** | 服务端校验类型/长度/白名单 | 信任客户端、拼进 SQL/命令 |
| **SQL** | 参数化 / 预编译 / ORM 绑定 | \`WHERE id = '\${id}'\` 字符串拼接 |
| **XSS** | 按上下文转义输出；勿把未消毒 HTML 当可信 | \`innerHTML = userInput\` |
| **鉴权** | 每个敏感接口服务端再判 | 只藏按钮、关鉴权「图省事」上生产 |
| **依赖** | 锁文件、少装来路不明包 | 随手 \`pnpm add\` 未知包并给它 shell |

\`\`\`flip
{"title":"安全翻卡","cards":[{"front":"注入（OWASP A03）","back":"不可信数据进了解释器：SQL / XSS / 命令行"},{"front":"泄漏了 Key？","back":"立刻轮换；删提交≠安全，机器人已扫到"},{"front":"私有仓就能写 Key？","back":"不能；协作、日志、备份一样会漏"},{"front":"面板端口","back":"运维面；弱口令+裸奔=整机沦陷"}]}
\`\`\`

## 注入三兄弟（开发者最常踩）

| 类型 | 一句话 | 防御 |
|------|--------|------|
| **SQL 注入** | 用户输入改了查询结构 | 参数化；永远别拼接 SQL |
| **XSS** | 用户输入当脚本在别人浏览器跑 | 输出编码；CSP 进阶 |
| **命令注入** | 用户输入进了 \`exec\` / shell | 避免 shell；白名单参数；用数组形式传参 |

参考：[Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html)

## 密钥泄漏应急

1. **先轮换**（吊销旧 Key，发新 Key）——唯一真正修复  
2. 从配置/环境去掉旧值；检查日志是否打印过  
3. 需要时清 Git 历史（BFG 等）——但**不能替代轮换**  
4. 开 GitHub push protection / gitleaks 一类扫描防再犯  

\`\`\`quiz
{"title":"安全","questions":[{"q":"API Key 写进将要 push 的源码？","choices":[{"t":"可以，反正仓库私有","ok":false,"why":"私有仓也会泄漏。"},{"t":"应放环境变量或私密配置且勿提交","ok":true,"why":"最小暴露面。"},{"t":"写进 README 方便同事","ok":false,"why":"文档传播面更大。"}]},{"q":"发现 Key 已进 GitHub，第一步？","choices":[{"t":"只 force-push 删历史就够","ok":false,"why":"可能已被扫走。"},{"t":"立刻在服务商处轮换/吊销该 Key","ok":true,"why":"轮换是硬修复。"},{"t":"改个文件名继续用同一 Key","ok":false,"why":"密钥值未变。"}]}]}
\`\`\`

## 接到本仓

| 场景 | 落点 |
|------|------|
| HTTP 鉴权 | **HTTP 认证** 课；别关鉴权上生产 |
| 配置与 \`.env\` | **环境变量** · 配置三同步 |
| Agent 改文件 | **Vibe Coding 心智** 审 diff；Rules 写禁区 |
| 面板 | **面板是什么** — 入口加固 |

## Coding Agent

\`\`\`prompt
目标：审查这段改动有无密钥入仓、SQL 拼接、未鉴权接口。
现场：diff 或文件路径=…
约束：只报风险与最小修法；不要借机大重构；勿把真实密钥写回回复可提交区。
验收：列出文件:行号与风险等级；给出可勾选修复项。
\`\`\`

## 下一步

**测试入门**（用测试锁行为）· **HTTP 认证** · **CI 直觉**（Secrets 不进 YAML 明文）。
`;
