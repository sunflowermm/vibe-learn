import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-xrk-agent-pipe',
  title: '概念 · 工作流、对话管线与办事助手',
  kind: 'concept',
  domain: 'xrk',
  tags: ['工作流', 'MCP', 'Tasker', '办事助手'],
  relatedNodes: ['xrk-stream', 'xrk-chat-pipeline', 'xrk-agent-workspace'],
  questions: [
    {
      q: '在 XRK-AGT 里，AI 工作流（AiWorkflow）的代码与配置通常对应哪些目录或配置名？',
      choices: [
        { t: '代码在 core/*/workflow/；配置名常对应 ai-workflow，Loader 按此扫描', ok: true, why: '目录与配置名有约定，继承 AiWorkflow 基类、放对 workflow/ 目录即可被加载。' },
        { t: '工作流必须命名为 langchain 且只能安装在 node_modules 里才能运行', ok: false, why: 'XRK 有自己的 workflow 基类与目录约定，不绑定 LangChain 这一品牌框架。' },
        { t: 'AiWorkflow 只能写在浏览器前端页面里，服务端 Node 进程不能执行工作流', ok: false, why: 'AiWorkflow 是服务端扩展点，在 Agent Runtime 所在的 Node 进程内执行。' },
        { t: '工作流与 HTTP 插件必须写在同一个 .js 文件里，没有独立的 workflow/ 目录', ok: false, why: 'workflow/ 与 http/、plugin/ 是不同扩展点目录，职责分开。' },
      ],
    },
    {
      q: '「对话管线」（chat pipeline）在智能体系统里主要关心什么？它和单纯调一次大模型 API 有何不同？',
      choices: [
        { t: '上下文如何组装、工具何时介入、回复如何流式输出给 QQ/Stdin 等通道', ok: true, why: '管线串联记忆、工具环与流式响应，不是单次 prompt→answer 就结束。' },
        { t: '对话管线仅负责网页 CSS 布局与按钮配色是否好看、是否符合设计规范', ok: false, why: '对话管线是服务端逻辑层，与前端样式渲染无关。' },
        { t: '对话管线负责把用户消息原样 echo 回去，不做历史、系统提示等任何处理', ok: false, why: '管线恰恰要处理多层上下文：历史消息、系统提示、工具返回结果等。' },
        { t: '对话管线就是 LLM Factory 的别名，两者完全同义，只负责选模型客户端', ok: false, why: 'LLM Factory 负责按配置创建模型客户端；对话管线负责整条消息处理链路。' },
      ],
    },
    {
      q: '办事助手（如 Cursor Agent）的工作区记忆，常见通过哪些文件注入到模型上下文？',
      choices: [
        { t: 'AGENTS.md、skills/ 等可移植交底文件，描述项目边界与操作规范', ok: true, why: '工作区注入让 Agent 读懂仓库规则，而不是只靠聊天历史碰运气。' },
        { t: '把生产数据库密码写进 prompt 固定字符串并提交到 Git 方便 Agent 读取', ok: false, why: '密钥禁止进仓；注入的是规则与能力说明，不是机密凭证。' },
        { t: '删除仓库内全部 AGENTS.md 和 skills，迫使模型只靠预训练权重回答项目问题', ok: false, why: '项目记忆文件正是为了补足仓库上下文，删掉会让 Agent 不了解本仓约定。' },
        { t: '工作区记忆只能存在 IDE 本地缓存里，仓库里完全不落任何说明文件', ok: false, why: '可移植交底需要版本化的 AGENTS.md / skills 等，团队 clone 后也能共享。' },
      ],
    },
    {
      q: '模型上下文协议（MCP，Model Context Protocol）在 XRK-AGT 生态里更接近什么？',
      choices: [
        { t: '工具与资源的标准插接面，让多种客户端用统一方式发现与调用外部能力', ok: true, why: 'MCP 降低「每家工具各写一套私有协议」的重复成本，与 HTTP API 可并存。' },
        { t: 'MCP 必须替代所有 HTTP API，以后 Core 里不能再写 REST 路由', ok: false, why: 'MCP 是工具/资源协议层；HTTP 仍是 Core 的重要扩展点，两者分工不同。' },
        { t: 'MCP 是大语言模型（LLM）的另一种叫法，与 GPT、Claude 等模型完全同义', ok: false, why: 'LLM 是生成文本的模型；MCP 是连接模型与外部工具/资源的协议，不是模型本身。' },
        { t: 'MCP 是一种关系型数据库引擎，专门用来存储和索引全部聊天记录', ok: false, why: 'MCP 定义工具发现与调用方式，不是数据库产品，也不负责持久化聊天。' },
      ],
    },
    {
      q: 'Tasker 通道层在 XRK-AGT 里负责什么？它和 HTTP API 扩展点的分工如何理解？',
      choices: [
        { t: '对接 QQ、OneBot、Stdin 等消息通道，把外部消息送进 Agent Runtime', ok: true, why: 'Tasker 是「从哪收消息」的适配层；HTTP 是「主动对外提供接口」。' },
        { t: 'Tasker 负责编译 Rust 语言的内核模块并加载到操作系统里', ok: false, why: 'Tasker 做协议适配与消息转发，不涉及语言编译或 OS 内核。' },
        { t: 'Tasker 可以替代 plugin/ 目录，所有业务逻辑都必须写在 Tasker 文件里', ok: false, why: 'Tasker 只管通道适配；业务逻辑仍在 plugin/http/workflow 等扩展点。' },
        { t: 'Tasker 与 HTTP 完全同义，都是对外提供 REST 接口，没有消息通道职责', ok: false, why: 'HTTP 是主动请求-响应；Tasker 是被动接收 QQ/OneBot 等推送消息。' },
      ],
    },
    {
      q: 'LLM Factory（大模型工厂）在 XRK 框架里的职责直觉是什么？业务插件需要它做什么？',
      choices: [
        { t: '按 yaml 配置创建或选择模型客户端，统一代理、超时等调用策略', ok: true, why: '工厂屏蔽各厂商 API 差异，插件通过配置名取用模型，不必每家手写 fetch。' },
        { t: 'LLM Factory 每次对话时自动微调（finetune）全部模型权重再返回结果', ok: false, why: '工厂是推理期选客户端与封装调用，不是训练或微调框架。' },
        { t: 'LLM Factory 负责把用户消息路由到 Tasker 通道，替代所有 HTTP handler', ok: false, why: '消息路由是 Tasker/对话管线的事；工厂只管 LLM 客户端构造。' },
        { t: 'LLM Factory 就是 MCP 服务器本身，两者在 XRK 里是同一个组件', ok: false, why: '工厂管模型 API 客户端；MCP 管工具/资源插接协议，层次不同。' },
      ],
    },
  ],
});
