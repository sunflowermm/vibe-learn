import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-shell',
  title: '概念 · Shell 与 PowerShell',
  kind: 'concept',
  domain: 'lang',
  tags: ['Shell', 'PowerShell'],
  relatedNodes: ['lang-shell', 'lang-powershell', 'linux-cli'],
  questions: [
    {
      q: 'Shell 脚本（如 Bash 脚本）在开发运维中的常见用途是什么？',
      choices: [
        {
          t: '自动化文件操作、进程管理和环境变量配置等重复性任务',
          ok: true,
          why: '脚本把多条命令串联成可复用流程，是部署、备份等场景的常用手段。',
        },
        {
          t: '完全替代 Express 等后端框架来处理全部业务逻辑',
          ok: false,
          why: '复杂业务逻辑应写在 Node 等应用代码中，Shell 适合胶水式自动化。',
        },
        {
          t: '作为渲染三维游戏引擎的唯一官方方案',
          ok: false,
          why: '游戏渲染需要图形引擎和 GPU 编程，不是 Shell 脚本的设计目标。',
        },
        {
          t: '只能在 Windows 上运行，Linux 和 macOS 不支持',
          ok: false,
          why: 'Bash 等 Shell 最初就是为 Unix/Linux 设计的，macOS 也内置支持。',
        },
      ],
    },
    {
      q: 'Shell 中管道符 | 的作用，最准确的直觉描述是什么？',
      choices: [
        {
          t: '把前一个命令的标准输出，作为后一个命令的标准输入',
          ok: true,
          why: '管道让命令串联成流水线，如 ls | grep txt 只显示含 txt 的文件名。',
        },
        {
          t: '在两个远程服务器之间建立新的 TCP 网络连接',
          ok: false,
          why: '管道是本地进程间的数据流连接，不涉及网络 socket。',
        },
        {
          t: '删除当前磁盘上的所有分区数据',
          ok: false,
          why: '管道只传递文本或字节流，不会执行磁盘格式化操作。',
        },
        {
          t: '把两个命令并行同时运行，互不传递任何数据',
          ok: false,
          why: '并行执行用 & 或 GNU parallel，管道强调的是前后命令的数据传递。',
        },
      ],
    },
    {
      q: 'PowerShell 相对经典 sh/Bash 的一个显著特点是什么？',
      choices: [
        {
          t: '管道传递的是 .NET 对象而非纯文本，Windows 系统管理面常见',
          ok: true,
          why: 'PowerShell 对象管道让属性筛选更方便，是 Windows 运维的默认 Shell。',
        },
        {
          t: '只能输出无结构的纯字符串，不支持任何对象操作',
          ok: false,
          why: '对象管道正是 PowerShell 的核心卖点，与 Bash 的文本管道形成对比。',
        },
        {
          t: '无法在 modern Windows 10/11 系统上安装和运行',
          ok: false,
          why: 'PowerShell 是 Windows 内置组件，现代版本默认预装。',
        },
        {
          t: 'PowerShell 脚本文件扩展名必须是 .sh 而非 .ps1',
          ok: false,
          why: 'PowerShell 脚本使用 .ps1 扩展名，.sh 是 Bash 脚本的惯例。',
        },
      ],
    },
    {
      q: 'Shell 脚本中处理含空格的文件路径，更稳妥的做法是什么？',
      choices: [
        {
          t: '用引号包裹路径或对特殊字符转义，避免被 Shell 拆成多个参数',
          ok: true,
          why: '未加引号的路径如 My Documents 会被拆成两个参数，是常见的脚本 bug。',
        },
        {
          t: '空格会在传递过程中自动消失，无需任何处理',
          ok: false,
          why: 'Shell 以空格分隔参数，空格不会消失，必须靠引号保护。',
        },
        {
          t: '禁止使用任何含空格的路径，只能使用无空格文件名',
          ok: false,
          why: '现实中很多目录和文件名含空格，正确引用是必备技能。',
        },
        {
          t: '把路径中的空格全部替换为换行符即可解决',
          ok: false,
          why: '换行符同样会被 Shell 当作参数分隔符，不能解决路径引用问题。',
        },
      ],
    },
    {
      q: 'Shell 命令执行结束后，退出码（Exit Code）非 0 通常表示什么？',
      choices: [
        {
          t: '命令执行失败或异常终止，自动化脚本应据此判断是否继续',
          ok: true,
          why: '0 表示成功，非 0 表示出错，CI 流水线和脚本依赖此约定做分支判断。',
        },
        {
          t: '命令一定执行成功，非 0 只是装饰性数字',
          ok: false,
          why: '非 0 明确表示失败，忽略它可能导致脚本在错误状态下继续运行。',
        },
        {
          t: '仅表示命令向控制台打印了日志，与成败无关',
          ok: false,
          why: '日志输出走 stdout/stderr，退出码是独立的进程状态信号。',
        },
        {
          t: '非 0 只出现在 PowerShell 中，Bash 永远返回 0',
          ok: false,
          why: 'Bash 和 PowerShell 都遵循退出码约定，非 0 表示失败是通用惯例。',
        },
      ],
    },
  ],
});
