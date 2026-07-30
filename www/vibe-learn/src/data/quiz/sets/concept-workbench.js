import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-workbench',
  title: '概念 · 工作台、Git 协作与进阶',
  kind: 'concept',
  domain: 'craft',
  tags: ['编辑器', 'Git', '工作区'],
  relatedNodes: [
    'workbench-editor',
    'workbench-troubleshoot',
    'git-workspace',
    'git-forges',
    'git-advanced',
  ],
  questions: [
    {
      q: '代码编辑器（如 VS Code、Cursor）作为「工作台」的核心价值是什么？',
      choices: [
        {
          t: '集中完成编辑文件、查看差异、运行任务等日常开发操作',
          ok: true,
          why: '编辑器是开发者停留时间最长的工具，把读写代码和调试串在同一界面。',
        },
        {
          t: '替代操作系统内核，直接管理 CPU 和内存分配',
          ok: false,
          why: '编辑器是用户态应用，硬件调度仍由操作系统负责。',
        },
        {
          t: '自动把代码部署到生产服务器，完全不需要人工确认',
          ok: false,
          why: '部署通常需要 CI/CD 或手动流程，编辑器本身不会自动上线。',
        },
        {
          t: '只能阅读代码，不允许修改或保存任何文件',
          ok: false,
          why: '编辑器的核心功能就是修改和保存代码，只读模式只是特殊场景。',
        },
      ],
    },
    {
      q: 'Git 中「工作区」里的修改，与「已提交到仓库」的内容是什么关系？',
      choices: [
        {
          t: '工作区和暂存区可以有未提交改动；git commit 后才进入版本历史',
          ok: true,
          why: '理解三区模型（工作区→暂存区→仓库）是正确使用 Git 的基础。',
        },
        {
          t: '每次保存文件都会立刻不可逆地覆盖远程仓库历史',
          ok: false,
          why: '保存只是写入本地工作区，必须 add 和 commit 才会进入 Git 历史。',
        },
        {
          t: 'Git 不保存任何历史，只保留当前最新一份文件',
          ok: false,
          why: 'Git 的核心就是记录每次提交的快照，可以随时回溯历史版本。',
        },
        {
          t: '工作区的改动会自动同步到所有同事的电脑，无需 push',
          ok: false,
          why: '本地修改只有 commit 并 push 到远程后，他人才可以通过 pull 获取。',
        },
      ],
    },
    {
      q: 'GitHub、GitLab 等代码托管平台主要提供什么能力？',
      choices: [
        {
          t: '远程仓库存储、Pull Request 代码审查和 Issue 协作跟踪',
          ok: true,
          why: '托管平台让团队共享代码、讨论改动并追踪任务，是在线协作的基础设施。',
        },
        {
          t: '本机 CPU 的驱动程序下载与安装服务',
          ok: false,
          why: '硬件驱动由操作系统或硬件厂商提供，与代码托管无关。',
        },
        {
          t: 'TLS 加密证书的唯一签发机构',
          ok: false,
          why: '证书由证书颁发机构（CA）签发，GitHub 等平台不提供此服务。',
        },
        {
          t: '替代本地 Git，所有 commit 必须在线网页上逐行输入',
          ok: false,
          why: '托管平台存储远程仓库，日常 commit 仍在本地通过 Git 命令完成。',
        },
      ],
    },
    {
      q: '使用 Git 分支（Branch）和 Pull Request（PR）协作的直觉是什么？',
      choices: [
        {
          t: '在独立分支上隔离改动，经审查后再合并进主线',
          ok: true,
          why: '分支让多人并行开发互不干扰，PR 提供代码审查与讨论入口。',
        },
        {
          t: '所有人必须同时修改同一个分支上的同一文件，禁止审查',
          ok: false,
          why: '这种做法极易产生冲突，正是分支和 PR 机制要避免的。',
        },
        {
          t: 'Git 禁止使用分支，所有改动必须直接提交到 main',
          ok: false,
          why: '分支是 Git 的核心功能，被广泛用于功能开发和 bug 修复。',
        },
        {
          t: 'PR 合并后原分支上的所有 commit 会自动从历史上消失',
          ok: false,
          why: '合并后 commit 历史通常保留，只是分支指针可能不再指向最新主线。',
        },
      ],
    },
    {
      q: '学习「本机目录地图」课程，对日常开发有什么帮助？',
      choices: [
        {
          t: '知道项目源码、配置文件和运行时数据各自放在哪个目录',
          ok: true,
          why: '清楚目录分工能快速定位要改的文件，避免误改配置或数据。',
        },
        {
          t: '要求背诵全世界所有电脑上的绝对路径',
          ok: false,
          why: '只需理解自己项目的目录约定，不必记忆无关路径。',
        },
        {
          t: '禁止使用相对路径，所有引用必须写绝对路径',
          ok: false,
          why: '相对路径在项目中更便携，很多工具和配置都依赖相对引用。',
        },
        {
          t: '所有文件必须放在桌面根目录，不能有子文件夹',
          ok: false,
          why: '项目通常有层次化的目录结构，子文件夹是正常且必要的组织方式。',
        },
      ],
    },
    {
      q: '「点文件（dotfiles）」通常包含哪些内容？',
      choices: [
        {
          t: 'Shell 配置、编辑器设置等以点开头的隐藏配置文件',
          ok: true,
          why: '如 .bashrc、.gitconfig 等点文件保存个人工具偏好，方便迁移和备份。',
        },
        {
          t: '必须是 PNG 或 JPG 格式的图片素材',
          ok: false,
          why: '点文件是文本配置文件，不是图片资源。',
        },
        {
          t: '操作系统内核源码存放的唯一位置',
          ok: false,
          why: '内核源码有专门的目录结构，与用户的 dotfiles 无关。',
        },
        {
          t: '只能由 root 用户创建，普通开发者无法拥有',
          ok: false,
          why: '每个用户的家目录下都可以有自己的点文件来配置个人环境。',
        },
      ],
    },
  ],
});
