import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-data-formats',
  title: '概念 · JSON / YAML / Markdown / env',
  kind: 'concept',
  domain: 'lang',
  tags: ['JSON', 'YAML', 'Markdown', '.env'],
  relatedNodes: [
    'data-json',
    'data-yaml',
    'data-markdown',
    'data-env',
    'code-values-types',
    'http-hands-on',
  ],
  questions: [
    {
      q: 'JavaScript 对象表示法（JSON）最适合用来做什么？',
      choices: [
        {
          t: '在程序之间交换结构化数据，机器可直接解析',
          ok: true,
          why: 'JSON 语法简洁、与 JS 对象对应，是 API 和配置文件中最常见的数据格式。',
        },
        {
          t: '撰写长篇散文和抒情文学作品',
          ok: false,
          why: 'JSON 不支持自由段落排版，不适合写散文，应用 Markdown 或纯文本。',
        },
        {
          t: '完全取代 Git 进行版本控制和代码协作',
          ok: false,
          why: 'Git 管理代码历史，JSON 只是数据格式，两者解决不同问题。',
        },
        {
          t: '作为操作系统内核的启动引导程序',
          ok: false,
          why: '内核引导是二进制或特定格式的引导代码，不是 JSON 的用途。',
        },
      ],
    },
    {
      q: 'YAML 格式相对 JSON 的常见优势和使用场景是什么？',
      choices: [
        {
          t: '更适合人类阅读和手写的配置文件，用缩进表达层级',
          ok: true,
          why: 'YAML 省略大量括号和引号，在 Docker Compose、CI 配置中广泛使用。',
        },
        {
          t: '专门用来存储浏览器编译后的字节码',
          ok: false,
          why: '字节码是二进制格式，YAML 是文本配置格式，用途完全不同。',
        },
        {
          t: '国际标准的加密算法描述语言',
          ok: false,
          why: '加密算法有专门的规范文档，YAML 是通用数据序列化格式。',
        },
        {
          t: '只能在前端浏览器中运行，服务端无法解析',
          ok: false,
          why: 'YAML 在 Node.js、Python 等服务端环境都有成熟的解析库。',
        },
      ],
    },
    {
      q: 'Markdown 标记语言主要服务于什么场景？',
      choices: [
        {
          t: '编写人类可读的文档，并可渲染为网页或 PDF',
          ok: true,
          why: 'README、课程笔记、博客常用 Markdown，语法简单且版本控制友好。',
        },
        {
          t: '操作系统内核的进程调度算法',
          ok: false,
          why: '进程调度是操作系统内部机制，与文档标记语言无关。',
        },
        {
          t: 'TCP 协议的三次握手过程描述',
          ok: false,
          why: '三次握手是网络协议行为，不是 Markdown 的应用场景。',
        },
        {
          t: '替代 SQL 来查询关系型数据库',
          ok: false,
          why: '数据库查询用 SQL，Markdown 只负责文档内容的格式化展示。',
        },
      ],
    },
    {
      q: '.env 文件和环境变量（Environment Variable）适合存放什么？',
      choices: [
        {
          t: '密钥和因环境而异的配置，私密值不应提交到 Git',
          ok: true,
          why: '数据库密码、API 密钥等敏感信息放环境变量，避免泄露到代码仓库。',
        },
        {
          t: '项目的全部业务源代码和核心算法',
          ok: false,
          why: '源代码应放在 src 等目录并纳入版本控制，不是环境变量的用途。',
        },
        {
          t: '完全替代 MySQL 等关系型数据库存储业务数据',
          ok: false,
          why: '环境变量只适合少量配置项，不能作为数据库使用。',
        },
        {
          t: '必须提交到公开 Git 仓库，方便所有人查看密钥',
          ok: false,
          why: '私密值提交到 Git 会永久留在历史中，是严重的安全风险。',
        },
      ],
    },
    {
      q: '标准 JSON 格式是否支持在文件中写注释？',
      choices: [
        {
          t: '不支持，标准 JSON 规范不允许 // 或 /* */ 注释',
          ok: true,
          why: 'JSON 要求严格语法，需要注释时应改用 YAML 或在工具链侧处理。',
        },
        {
          t: '必须用 HTML 风格的 <!-- --> 来写注释',
          ok: false,
          why: '<!-- --> 是 HTML/XML 注释语法，出现在 JSON 中会导致解析失败。',
        },
        {
          t: '可以任意使用 // 单行注释，所有解析器都接受',
          ok: false,
          why: '标准 JSON.parse 遇到 // 会报错，JSONC 是编辑器扩展而非标准。',
        },
        {
          t: '注释只能写在 JSON 数组的第一个元素里',
          ok: false,
          why: 'JSON 的任何位置都不允许注释，这是规范层面的限制。',
        },
      ],
    },
    {
      q: 'YAML 配置文件中缩进错一位，常见的后果是什么？',
      choices: [
        {
          t: '层级结构被解析错误，可能导致服务启动失败或配置 silently 错位',
          ok: true,
          why: 'YAML 用缩进表达嵌套，空格格数不对会把子项挂到错误的父节点下。',
        },
        {
          t: '解析器会自动修正缩进，不影响任何配置含义',
          ok: false,
          why: 'YAML 解析器不会猜测意图，缩进错误会改变数据结构。',
        },
        {
          t: '只影响编辑器里的字体颜色，运行时完全无感',
          ok: false,
          why: '语法高亮是编辑器功能，解析器按实际缩进构建配置树。',
        },
        {
          t: 'YAML 不使用缩进，只依靠花括号区分层级',
          ok: false,
          why: 'YAML 的核心特征就是用缩进表示层级，花括号是 JSON 的语法。',
        },
      ],
    },
  ],
});
