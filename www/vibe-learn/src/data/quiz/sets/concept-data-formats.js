import { defineQuizSet } from '../schema.js';

/** 数据格式：JSON / YAML / Markdown / env（密钥操作细节见 git-security / env-cli） */
export default defineQuizSet({
  id: 'concept-data-formats',
  title: '概念 · JSON / YAML / Markdown / env',
  kind: 'concept',
  domain: 'lang',
  tags: ['JSON', 'YAML', 'Markdown', '.env'],
  relatedNodes: ['data-json', 'data-yaml', 'data-markdown'],
  caption: '选对格式：机器交换、人手配置、人读文档、密钥外置。',
  questions: [
    {
      id: 'concept-data-formats:json',
      q: 'JavaScript 对象表示法（JSON）最适合用来做什么？',
      choices: [
        {
          t: '在程序之间交换结构化数据，机器可直接解析',
          ok: true,
          why: '语法简洁、与 JS 对象对应，是 API 与配置里最常见的数据格式。',
        },
        {
          t: '撰写长篇散文和抒情文学作品',
          ok: false,
          why: 'JSON 不适合自由段落；文档用 Markdown 或纯文本。',
        },
        {
          t: '完全取代 Git 进行版本控制和代码协作',
          ok: false,
          why: 'Git 管历史，JSON 只是数据格式。',
        },
        {
          t: '作为操作系统内核的启动引导程序',
          ok: false,
          why: '引导是二进制/专用格式，不是 JSON 的用途。',
        },
      ],
      relatedNodes: ['data-json', 'http-hands-on'],
    },
    {
      id: 'concept-data-formats:yaml',
      q: 'YAML 格式相对 JSON 的常见优势和使用场景是什么？',
      choices: [
        {
          t: '更适合人类阅读和手写的配置文件，用缩进表达层级',
          ok: true,
          why: '省略大量括号引号；Compose、CI、常见配置广泛使用。',
        },
        {
          t: '专门用来存储浏览器编译后的字节码',
          ok: false,
          why: '字节码是二进制；YAML 是文本配置格式。',
        },
        {
          t: '国际标准的加密算法描述语言',
          ok: false,
          why: 'YAML 是通用序列化格式，不是加密算法规范。',
        },
        {
          t: '只能在前端浏览器中运行，服务端无法解析',
          ok: false,
          why: 'Node、Python 等服务端都有成熟 YAML 解析库。',
        },
      ],
      relatedNodes: ['data-yaml'],
    },
    {
      id: 'concept-data-formats:md',
      q: 'Markdown 标记语言主要服务于什么场景？',
      choices: [
        {
          t: '编写人类可读的文档，并可渲染为网页或 PDF',
          ok: true,
          why: 'README、笔记、博客常用；语法简单且版本控制友好。',
        },
        {
          t: '操作系统内核的进程调度算法',
          ok: false,
          why: '进程调度是 OS 内部机制，与文档标记无关。',
        },
        {
          t: 'TCP 协议的三次握手过程描述',
          ok: false,
          why: '三次握手是网络行为，不是 Markdown 的应用场景。',
        },
        {
          t: '替代 SQL 来查询关系型数据库',
          ok: false,
          why: '查询用 SQL；Markdown 只负责文档排版展示。',
        },
      ],
      relatedNodes: ['data-markdown'],
    },
    {
      id: 'concept-data-formats:env',
      q: '.env 文件和环境变量（Environment Variable）适合存放什么？',
      choices: [
        {
          t: '密钥和因环境而异的配置，私密值不应提交到 Git',
          ok: true,
          why: '密码、API Key 放环境变量；细节见工程卫生 / env-cli。',
        },
        {
          t: '项目的全部业务源代码和核心算法',
          ok: false,
          why: '源码应在版本库目录，不是环境变量的用途。',
        },
        {
          t: '完全替代 MySQL 等关系型数据库存储业务数据',
          ok: false,
          why: '环境变量只适合少量配置项，不能当数据库。',
        },
        {
          t: '必须提交到公开 Git 仓库，方便所有人查看密钥',
          ok: false,
          why: '私密值进 Git 会留在历史中，是严重安全风险。',
        },
      ],
      relatedNodes: ['data-env', 'craft-security'],
    },
    {
      id: 'concept-data-formats:json-comments',
      q: '标准 JSON 格式是否支持在文件中写注释？',
      choices: [
        {
          t: '不支持，标准 JSON 规范不允许 // 或 /* */ 注释',
          ok: true,
          why: '需要注释时用 YAML，或依赖支持 JSONC 的工具链（非标准）。',
        },
        {
          t: '必须用 HTML 风格的 <!-- --> 来写注释',
          ok: false,
          why: '<!-- --> 是 HTML/XML 注释，写进 JSON 会解析失败。',
        },
        {
          t: '可以任意使用 // 单行注释，所有解析器都接受',
          ok: false,
          why: '标准 JSON.parse 遇 // 会报错。',
        },
        {
          t: '注释只能写在 JSON 数组的第一个元素里',
          ok: false,
          why: '规范层面任何位置都不允许注释。',
        },
      ],
      relatedNodes: ['data-json', 'data-yaml'],
    },
    {
      id: 'concept-data-formats:yaml-indent',
      q: 'YAML 配置文件中缩进错一位，常见的后果是什么？',
      choices: [
        {
          t: "层级结构被解析错误，可能导致服务启动失败或配置 silently 错位",
          ok: true,
          why: 'YAML 用缩进表达嵌套，空格错了会把子项挂到错误父节点。',
        },
        {
          t: '解析器会自动修正缩进错误，不影响任何配置含义与启动结果',
          ok: false,
          why: '解析器不会猜意图；缩进错误会改变数据结构。',
        },
        {
          t: '缩进错误只影响编辑器字体颜色，运行时对层级完全无感',
          ok: false,
          why: '高亮是编辑器功能；运行时按实际缩进建树。',
        },
        {
          t: 'YAML 不使用缩进表达嵌套，只依靠花括号区分层级结构',
          ok: false,
          why: '缩进是 YAML 核心特征；花括号是 JSON 语法。',
        },
      ],
      relatedNodes: ['data-yaml'],
    },
  ],
});
