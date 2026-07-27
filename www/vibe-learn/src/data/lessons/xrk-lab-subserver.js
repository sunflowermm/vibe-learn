/** 实践课 · 子服调用 */
export default `# 实践课 · callSubserver

> 目标：主服用 \`AgentRuntime.callSubserver\` 打通到 **pyserver**（或其它 runtime）的一次健康/系统调用，并认识配置只读与常见失败。  
> 真源：\`docs/subserver-api.md\` · \`docs/subserver-commonconfig.md\` · \`docs/runtime-surface.md\`。

## 本课你要带走什么
\`\`\`flip
{"title":"子服实验翻卡","cards":[{"front":"子服终端","back":"命令在子服> 输入，不经主服 stdin 转发"},{"front":"配置","back":"常见主服编辑、子服只读 yaml"}]}
\`\`\`


1. \`callSubserver(path, options?)\` 的调用位置与 \`runtime\` 参数直觉  
2. 如何启动 pyserver、看 \`子服>\` 终端（命令不经主服 stdin 转发）  
3. CONTRACT：HTTP JSON、端口表、配置谁写谁读  
4. 失败清单：连不上、404、超时、配错 host

---

## 1. 通关清单
\`\`\`match
{"title":"子服实验配对","pairs":[{"id":"apis","left":"apis/<group>/","right":"子服插件组"},{"id":"core","left":"组内 core/","right":"与主仓 Core 同构约定"},{"id":"cli","left":"子服>","right":"运维命令在子服终端输入"}]}
\`\`\`


| # | 步骤 | 完成标准 |
|---|------|----------|
| 1 | 读端口表 | pyserver 默认 **8000**（以 \`src/utils/subserver-runtimes.js\` 为准） |
| 2 | 启子服 | 按 \`subserver/pyserver\` 文档 / README 启动；提示符 \`子服>\` |
| 3 | 健康检查 | 浏览器或 curl：\`GET http://127.0.0.1:8000/health\` |
| 4 | 系统 ping | \`GET /api/system/ping\` → \`ok: true\` 类响应 |
| 5 | 主服配置 | \`ai-workflow\` → \`subserver.runtimes\` 中对应 runtime 地址/开关正确 |
| 6 | 主服调用 | 在插件/HTTP/工作流中 \`await AgentRuntime.callSubserver('/api/system/ping', { runtime: 'pyserver' })\`（path/options 以源码签名为准） |
| 7 | 看日志 | 主服与子服两侧均无连接错误 |

\`\`\`mermaid
sequenceDiagram
  participant Core as 主服业务
  participant AR as AgentRuntime
  participant Py as pyserver:8000
  Core->>AR: callSubserver(path, options)
  AR->>Py: HTTP JSON
  Py-->>AR: 响应体
  AR-->>Core: 返回值
\`\`\`

---

## 2. CONTRACT 摘要（勿发明）

| 约定 | 内容 |
|------|------|
| **调用方** | 仅主服；业务用裸名 \`AgentRuntime.callSubserver\` |
| **被调方** | \`subserver/<runtime>/apis/\` 插件 HTTP |
| **健康** | \`GET /health\` |
| **系统** | \`GET /api/system/ping\` · \`groups\` · \`POST /api/system/command\` 等（见 subserver-api） |
| **配置** | **主服编辑**；子服 \`load_plugin_config\` **只读** yaml（\`subserver-commonconfig.md\`） |
| **终端** | 子服命令在 **子服终端** 输入，不经主服 stdin 转发 |
| **AI** | 历史子服 AI 业务接口已下线；LLM 在主服 |

默认 runtime 端口：pyserver 8000 · goserver 8001 · phpserver 8002 · jserver 8003 · netserver 8004 · rustserver 8005。

相关：\`fetchSubserverToPath\` 拉文件到本地（\`runtime-surface.md\`）。

---

## 3. 常见失败

| 现象 | 可能原因 |
|------|----------|
| ECONNREFUSED | 子服未启；host/port 配错；Docker 网络未用 \`SUBSERVER_*_HOST\` |
| 404 | path 写错；插件组未装载；打到错误 runtime |
| 超时 | 子服卡住；防火墙；超时选项过短 |
| 业务空数据 | 子服配置未在主服写好 / 子服读到旧只读副本——回主服改配置 |
| 在主服终端敲子服命令 | 无效；应到 \`子服>\` |
| TLS / 反代后 host 错 | \`subserver.runtimes\` 填的是容器内网名还是 localhost |

<details>
<summary>CONTRACT 再确认（读文档原文）</summary>

- 健康与系统 API 路径以 \`docs/subserver-api.md\` 为准  
- 配置读写边界以 \`docs/subserver-commonconfig.md\` 为准  
- \`callSubserver\` 签名与挂载以 \`docs/runtime-surface.md\` 为准  
- 不要根据旧博客或已下线「子服 AI」接口发明路径

</details>

---

## 4. 实践加分

1. \`GET /api/system/groups\` 列出已装载组。  
2. 对照 \`subserver/LANGUAGES.md\` 口述「为何这条能力放 Python 而不是主服」。  
3. 读 \`docs/subserver-plugin-development.md\` 标题层级，知道扩展 \`apis/<group>/\` 从哪入门（不必本课写完插件）。

---

## 5. 文档链接

- \`docs/subserver-api.md\` · \`docs/subserver-commonconfig.md\`  
- \`docs/subserver-plugin-development.md\` · \`subserver/README.md\` · \`subserver/LANGUAGES.md\`  
- \`docs/runtime-surface.md\`（\`callSubserver\`）  
- 本框：**子服务端** · **语言栈** · **业务层全景**

## 下一步

子服通了 → 回到 **Stream**（工具内可选 callSubserver）或 **实践·最小插件**（在指令里调一次 ping）。  
配置归属有疑义 → **配置归属**课。
`;
