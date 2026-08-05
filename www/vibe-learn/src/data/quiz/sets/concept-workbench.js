import { defineQuizSet } from '../schema.js';

/** 工作台：编辑器、目录、dotfiles、Accept；Git 深流见 git-cli；排障命令见 troubleshoot-cli */
export default defineQuizSet({
  id: 'concept-workbench',
  title: '概念 · 工作台与本机目录',
  kind: 'concept',
  domain: 'craft',
  tags: ['编辑器', '工作区', 'dotfiles'],
  relatedNodes: ['workbench-editor', 'workbench-troubleshoot', 'fs-dotfiles'],
  caption: '编辑器是主战场；认清目录与点文件；Accept 要审 diff。',
  questions: [
    {
      id: 'concept-workbench:editor',
      q: '代码编辑器（如 VS Code、Cursor）作为「工作台」的核心价值？',
      choices: [
        {
          t: '集中完成编辑文件、查看差异、运行任务等日常开发操作',
          ok: true,
          why: '停留时间最长的工具，把读写与调试串在同一界面。',
        },
        {
          t: '替代 CI/CD：保存文件后自动部署到生产且无需人工确认',
          ok: false,
          why: '部署通常要流水线或人工流程，不是保存即上线。',
        },
        {
          t: '只提供只读浏览，正式修改必须改用系统记事本另存',
          ok: false,
          why: '核心就是修改与保存；只读只是特例模式。',
        },
        {
          t: '专门替代包管理器，安装依赖时不必再使用 pnpm/npm',
          ok: false,
          why: '编辑器可集成终端，但不替代项目包管理约定。',
        },
      ],
      relatedNodes: ['workbench-editor'],
    },
    {
      id: 'concept-workbench:dirs',
      q: '打开陌生仓库，想快速判断「该改业务代码还是改配置/数据」时，目录地图怎么帮你？',
      choices: [
        {
          t: '知道项目源码、配置与运行时数据各自放在哪个目录，避免误改',
          ok: true,
          why: '先定位再动手；本仓还有 core/ 与 data/ 等约定。',
        },
        {
          t: '要求背诵全世界所有电脑上的绝对路径，才能开始改文件',
          ok: false,
          why: '只需理解本项目约定与相对布局。',
        },
        {
          t: '把所有源码、配置与密钥统一丢进桌面根目录，地图就最短',
          ok: false,
          why: '层次化目录才便于协作与挂载；桌面堆放易误提交。',
        },
        {
          t: '禁止使用相对路径，所有 import 与脚本必须写死盘符绝对路径',
          ok: false,
          why: '相对路径更便携，工具与仓库常依赖它。',
        },
      ],
      relatedNodes: ['workbench-editor', 'fs-layout'],
    },
    {
      id: 'concept-workbench:dotfiles',
      q: '家目录里的「点文件（dotfiles）」通常指什么、用来干什么？',
      choices: [
        {
          t: 'Shell/编辑器等以点开头的隐藏配置，方便迁移个人环境',
          ok: true,
          why: '如 .bashrc、.gitconfig；与业务密钥文件要分开看待。',
        },
        {
          t: '必须是 PNG/JPG 等媒体素材，否则系统不会隐藏显示',
          ok: false,
          why: '点文件通常是文本配置，不是图片素材库。',
        },
        {
          t: '只能由管理员在系统根目录创建，普通开发者家目录不能有',
          ok: false,
          why: '每个用户家目录都可以有自己的点文件。',
        },
        {
          t: '等于项目里的 node_modules：换机器时必须整目录提交进 Git',
          ok: false,
          why: '个人点文件常不进业务仓；业务依赖另有 lockfile 约定。',
        },
      ],
      relatedNodes: ['fs-dotfiles'],
    },
    {
      id: 'concept-workbench:dotenv-vs-dotfiles',
      q: '把项目根目录的 .env（含 API Key）当成「普通点文件」一并 commit，问题在哪？',
      choices: [
        {
          t: '.env 含密钥，进 Git 历史难收回；应 gitignore + 环境/Secrets，点文件≠可提交配置',
          ok: true,
          why: '个人 Shell 配置与项目密钥文件威胁模型不同。',
        },
        {
          t: '只要文件名以点开头，Git 就会自动忽略，即便你 commit 也绝对写不进任何历史记录',
          ok: false,
          why: '点开头不等于忽略；要靠 .gitignore 显式排除。',
        },
        {
          t: '私有仓库里提交 .env 完全安全，既不必轮换已暴露密钥，也用不着配置 CI Secrets',
          ok: false,
          why: '误分享、CI 日志、离职带走仍可能泄漏。',
        },
        {
          t: '.env 专供 Docker Compose；把密钥提交进仓，反而方便所有环境统一同一把 Key',
          ok: false,
          why: '统一应用 Secrets/环境注入，不是把密钥写进版本库。',
        },
      ],
      relatedNodes: ['fs-dotfiles', 'data-env', 'craft-security'],
    },
    {
      id: 'concept-workbench:accept',
      q: '在 Cursor 等工作台用 Agent 改代码时，Accept 前更应？',
      choices: [
        {
          t: '看 diff、确认未越界改 Runtime/密钥，并本机跑通相关路径',
          ok: true,
          why: '工作台价值是加速，不是免审；与 vibe 课一致。',
        },
        {
          t: '无脑全盘 Accept，默认 Agent 不会越界改 Runtime 或密钥',
          ok: false,
          why: '易引入越界改动与隐蔽回归。',
        },
        {
          t: '先把密钥写进仓库，方便 Agent 下次自动读取继续改代码',
          ok: false,
          why: '密钥禁止进仓；应走环境变量或 Secrets。',
        },
        {
          t: '只看回复语气是否友好，不必阅读 diff 或本机跑通',
          ok: false,
          why: '验收看行为与可运行结果，不是语气。',
        },
      ],
      relatedNodes: ['workbench-editor', 'adev-vibe-coding'],
    },
  ],
});
