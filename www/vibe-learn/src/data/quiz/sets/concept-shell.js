import { defineQuizSet } from '../schema.js';

/** Shell 场景（|、shebang、2>&1、set -e 等单词见 concept-shell-op） */
export default defineQuizSet({
  id: 'concept-shell',
  title: '概念 · Shell 与 PowerShell',
  kind: 'concept',
  domain: 'lang',
  tags: ['Shell', 'PowerShell', '基础', '进阶'],
  relatedNodes: ['lang-shell', 'lang-powershell'],
  caption: '用途边界、对象管道、引号、stdout/stderr、退出码——运算符全表见 shell-op。',
  questions: [
    {
      id: 'concept-shell:q1',
      q: 'Shell 脚本在开发运维里更适合什么？',
      choices: [
        {
          t: '把文件操作、进程管理、环境注入等步骤串成可复用自动化',
          ok: true,
          why: '胶水与部署脚本的主场；复杂业务逻辑应落在应用代码。',
        },
        {
          t: '完全替代 Express/业务框架处理全部领域逻辑与事务',
          ok: false,
          why: 'Shell 弱类型、难测、难维护；业务应进应用层。',
        },
        {
          t: '只能在 Windows 运行，Linux/macOS 根本不支持任何 Shell',
          ok: false,
          why: 'Bash 等本就源自 Unix；macOS 也常用。',
        },
        {
          t: '专门替代浏览器渲染引擎，负责页面布局与 GPU 绘制',
          ok: false,
          why: '渲染靠图形栈/浏览器；Shell 不是 UI 引擎。',
        },
      ],
      relatedNodes: ['lang-shell'],
      tags: ['基础'],
    },
    {
      id: 'concept-shell:q2',
      q: '脚本里要把「检索结果」交给下一命令继续处理，心智模型是？',
      choices: [
        {
          t: '用管道把前一个命令的 stdout 接到后一个命令的 stdin',
          ok: true,
          why: '运算符细节见 shell-op；这里强调「数据在进程间流过」，不是建 TCP。',
        },
        {
          t: '管道会在两台远程机器间自动开一条新的 TCP 连接',
          ok: false,
          why: '本地进程间管道，不替代网络 socket。',
        },
        {
          t: '管道等于并行跑两个命令，彼此完全不传递任何数据',
          ok: false,
          why: '并行常用 & / parallel；管道强调传递。',
        },
        {
          t: '把整段输出塞进某个环境变量名，下一命令靠展开变量接手',
          ok: false,
          why: '大输出不适合塞进环境变量；管道才是进程间流式传递。',
        },
      ],
      relatedNodes: ['lang-shell', 'linux-cli'],
      tags: ['基础'],
    },
    {
      id: 'concept-shell:q3',
      q: 'PowerShell 相对经典 sh/Bash 的显著点？',
      choices: [
        {
          t: '管道里常传 .NET 对象而非纯文本',
          ok: true,
          why: '对象管道便于按属性筛选；与 Bash 文本管道对照着学。',
        },
        {
          t: '只能输出无结构纯字符串，完全不支持对象管道',
          ok: false,
          why: '对象管道正是卖点。',
        },
        {
          t: '现代 Windows 无法安装 PowerShell，只能用 cmd',
          ok: false,
          why: '内置/预装是常态。',
        },
        {
          t: '脚本扩展名必须是 .sh，写成 .ps1 就无法执行',
          ok: false,
          why: 'PowerShell 惯例是 .ps1。',
        },
      ],
      relatedNodes: ['lang-powershell'],
      tags: ['基础'],
    },
    {
      id: 'concept-shell:q4',
      q: '路径含空格时，Shell 脚本更稳妥的做法？',
      choices: [
        {
          t: '用引号包裹或正确转义，避免被拆成多个参数',
          ok: true,
          why: 'My Documents 未加引号会变成两个词——经典脚本当机。',
        },
        {
          t: '空格会在解析时自动消失，脚本里完全无需处理',
          ok: false,
          why: '空格是参数分隔符。',
        },
        {
          t: '禁止任何含空格路径，否则操作系统会判定路径非法',
          ok: false,
          why: '现实大量路径含空格；要正确引用。',
        },
        {
          t: '把路径里所有空格全部换成换行，就能安全传参',
          ok: false,
          why: '换行同样是分隔符，不能当通用解法。',
        },
      ],
      relatedNodes: ['lang-shell'],
      tags: ['基础'],
    },
    {
      id: 'concept-shell:q5',
      q: '为何脚本开头常写 shebang，且推荐 `#!/usr/bin/env bash` 这类形式？',
      choices: [
        {
          t: '声明用哪个解释器执行，并经 PATH 查找解释器',
          ok: true,
          why: '缺执行位或 shebang 错会导致「权限不够」或跑错解释器——细节见 shell-op。',
        },
        {
          t: 'shebang 用来加密脚本正文，防止别人阅读源码',
          ok: false,
          why: '不是加密机制。',
        },
        {
          t: '只有 Windows cmd 识别 shebang，Unix 会忽略这一行',
          ok: false,
          why: '经典是 Unix 加载行为；Win 上常靠 Git Bash 等。',
        },
        {
          t: 'shebang 字符串本身就是完整 PATH 目录列表',
          ok: false,
          why: '一行解释器声明，不是目录搜索列表。',
        },
      ],
      relatedNodes: ['lang-shell', 'installers-path'],
      tags: ['基础'],
    },
    {
      id: 'concept-shell:q6',
      q: '为何要分清 stdout 与 stderr？',
      choices: [
        {
          t: '正常结果走 stdout，诊断与报错常走 stderr，便于分别重定向',
          ok: true,
          why: '所以需要把报错一并进日志/管道时，才显式 `2>&1`（见 shell-op）。',
        },
        {
          t: '二者永远是同一描述符，操作系统不允许分开重定向',
          ok: false,
          why: '正是两个流，可分别重定向。',
        },
        {
          t: 'stderr 只能打印装饰性提示，不能承载错误与诊断',
          ok: false,
          why: '用于错误与诊断通道。',
        },
        {
          t: '只有 PowerShell 存在 stderr，Bash 只有一个输出流',
          ok: false,
          why: 'Unix 与多数运行时都有这套约定。',
        },
      ],
      relatedNodes: ['lang-shell'],
      tags: ['进阶'],
    },
    {
      id: 'concept-shell:q7',
      q: '命令退出码非 0 通常表示？',
      choices: [
        {
          t: '失败或异常结束；脚本与 CI 常据此决定是否继续',
          ok: true,
          why: '约定 0=成功；忽略退出码会在错误状态下继续跑。',
        },
        {
          t: '非 0 只表示打印了日志，与命令成败完全无关',
          ok: false,
          why: '日志走输出流；退出码是独立状态。',
        },
        {
          t: 'Bash 永远返回 0，只有 PowerShell 才会用非 0 退出码',
          ok: false,
          why: '两边都遵循同一约定。',
        },
        {
          t: '非 0 专门表示磁盘加密已成功完成，与脚本失败无关',
          ok: false,
          why: '与磁盘加密无关。',
        },
      ],
      relatedNodes: ['lang-shell', 'craft-ci'],
      tags: ['进阶'],
    },
  ],
});
