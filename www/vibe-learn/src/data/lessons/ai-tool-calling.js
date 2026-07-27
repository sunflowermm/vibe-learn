/** Function / Tool Calling */
export default `# Function Calling · 工具调用

> **时间线：2023-06-13**（OpenAI 正式在 Chat Completions 推出 function calling；后泛化为 \`tools\` / \`tool_calls\`）。  
> 其它厂商陆续跟进「tool use」。**从「只会说话」迈向「能提行动」的关键一跃。**

## 时间线上的位置

上一课：大家用同一套会话 API 说话。  
本课：会话里出现 **结构化行动请求**。  
下一课：行动所依赖的工具，如何变成 **跨应用可插拔标准（MCP）**。

---

## 为什么诞生

\`\`\`quiz
{"title":"Tool calling 自测","questions":[{"q":"Tool calling 的关键是？","choices":[{"t":"模型输出结构化「要调哪个工具、参数是什么」","ok":true,"why":"再由运行时真正执行工具并回填。"},{"t":"模型直接改你硬盘任意文件且无需协议","ok":false,"why":"执行权在运行时与权限边界。"},{"t":"只能调用浏览器","ok":false,"why":"工具可以是任意 API。"}]}]}
\`\`\`

| 痛点 | 说明 |
|------|------|
| **胡编外部事实** | 模型不知道此刻天气、库存、你的数据库 |
| **JSON 靠提示太脆** | 「请输出 JSON」再正则解析，失败率高 |
| **要接真实系统** | 下单、查库、改文件必须走 **你控制的代码** |

需要模型学会两件事：① 何时该调用；② 参数如何符合 schema。  
于是把「函数菜单」塞进请求，让模型输出 **调用意图**，由应用执行。

---

## 它有什么作用

| 作用 | 人话 |
|------|------|
| **可靠结构化出口** | 比自由文本解析稳得多 |
| **安全边界** | 真正执行权在你；模型只「点菜」 |
| **Agent 循环的燃料** | 调用 → 结果回灌 → 再生成，形成行动闭环 |
| **连接业务** | 自然语言 ↔ 内部 API 的桥梁 |

\`\`\`mermaid
sequenceDiagram
  participant M as 模型
  participant App as 应用
  participant F as 真实函数
  App->>M: messages + tools 定义
  M-->>App: tool_calls
  App->>F: 执行
  F-->>App: 结果
  App->>M: role=tool
  M-->>App: 自然语言总结
\`\`\`

---

## 深入浅出

餐厅比喻：

- **tools 定义** = 菜单  
- **tool_calls** = 顾客点的菜  
- **你的代码** = 后厨  
- **tool 消息** = 上菜回桌，厨师（模型）再解释给客人听  

模型 **从不直接碰你的数据库**；碰的是你允许的那一层。

本仓：AiWorkflow **不再**解析文本假函数，统一走 LLM tool calling。

## 接到下一站

模型能提行动之后，系统形态升级为 **Agent**——下一课专讲 **Agent 诞生**。
`;
