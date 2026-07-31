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
      q: 'Shell 脚本文件开头的 `#!/usr/bin/env bash`（shebang）作用？',
      choices: [
        {
          t: '告诉系统用哪个解释器执行该脚本；`env` 形式便于在 PATH 里找 bash',
          ok: true,
          why: '无执行位或 shebang 不对时，会出现「权限不够」或跑错解释器。',
        },
        {
          t: '专门用来加密脚本内容',
          ok: false,
          why: 'shebang 不是加密。',
        },
        {
          t: '只有 Windows cmd 识别 shebang',
          ok: false,
          why: '经典是 Unix 内核/加载器行为；Win 上常靠 Git Bash 等环境。',
        },
        {
          t: 'shebang 等于 PATH 环境变量本身',
          ok: false,
          why: '一行解释器声明，不是目录搜索列表。',
        },
      ],
      relatedNodes: ['lang-shell', 'linux-cli', 'installers-path'],
    },
    {
      q: '标准输出（stdout）与标准错误（stderr）为何常要分开理解？',
      choices: [
        {
          t: '正常结果走 stdout，诊断信息常走 stderr；重定向/管道默认可只带走 stdout',
          ok: true,
          why: '故有 `2>&1`：需要把报错一并写入日志或管道时显式合并。',
        },
        {
          t: '二者永远是同一文件描述符，无法分开',
          ok: false,
          why: '正是两个流；可分别重定向。',
        },
        {
          t: 'stderr 只能用于打印天气',
          ok: false,
          why: '用于诊断与错误通道。',
        },
        {
          t: '只有 PowerShell 有 stderr',
          ok: false,
          why: 'Unix 与多数运行时都有这套约定。',
        },
      ],
      relatedNodes: ['lang-shell', 'linux-cli'],
    },
    {
      q: 'Shell 命令结束后，退出码（exit code）非 0 通常表示什么？',
      choices: [
        {
          t: '命令失败或异常结束；脚本与 CI 常据此决定是否继续',
          ok: true,
          why: '约定 0=成功、非 0=失败；忽略它会在错误状态下继续跑。',
        },
        {
          t: '非 0 只表示打印了日志，与成败无关',
          ok: false,
          why: '日志走 stdout/stderr；退出码是独立状态。',
        },
        {
          t: 'Bash 永远返回 0，只有 PowerShell 用非 0',
          ok: false,
          why: '两边都遵循同一约定。',
        },
        {
          t: '非 0 表示磁盘已加密成功',
          ok: false,
          why: '与磁盘加密无关。',
        },
      ],
      relatedNodes: ['lang-shell', 'craft-ci', 'linux-cli'],
    },
  ],
});
