import { defineQuizSet } from '../schema.js';

/** 工作台：编辑器、目录、dotfiles；Git 深流见 git-cli */
export default defineQuizSet({
  id: 'concept-workbench',
  title: '概念 · 工作台与本机目录',
  kind: 'concept',
  domain: 'craft',
  tags: ['编辑器', '工作区', 'dotfiles'],
  relatedNodes: ['workbench-editor', 'workbench-troubleshoot', 'fs-dotfiles'],
  caption: '编辑器是主战场；认清目录与点文件；排障命令见 troubleshoot-cli。',
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
          t: '替代操作系统内核，直接管理 CPU 和内存',
          ok: false,
          why: '编辑器是用户态应用，调度仍由 OS 负责。',
        },
        {
          t: '自动把代码部署到生产且完全不需确认',
          ok: false,
          why: '部署通常要 CI/CD 或人工流程。',
        },
        {
          t: '只能阅读代码，不允许修改或保存',
          ok: false,
          why: '核心就是修改与保存；只读只是特例。',
        },
      ],
      relatedNodes: ['workbench-editor'],
    },
    {
      id: 'concept-workbench:three-areas',
      q: 'Git「工作区」改动与「已提交」内容的关系（工作台直觉）？',
      choices: [
        {
          t: '工作区/暂存区可以有未提交改动；commit 后才进入版本历史',
          ok: true,
          why: '三区模型是基础；命令细节见 git-cli / git-cmd。',
        },
        {
          t: '每次保存文件都会立刻不可逆覆盖远程历史',
          ok: false,
          why: '保存只写本地磁盘；要 add/commit/push 才进远程。',
        },
        {
          t: 'Git 不保存历史，只保留当前最新一份',
          ok: false,
          why: '核心就是提交快照与历史。',
        },
        {
          t: '工作区改动会自动同步到所有同事电脑，无需 push',
          ok: false,
          why: '必须 push 后他人才能 pull。',
        },
      ],
      relatedNodes: ['git-workspace', 'workbench-editor'],
    },
    {
      id: 'concept-workbench:dirs',
      q: '学习「本机目录地图」对日常开发的帮助？',
      choices: [
        {
          t: '知道项目源码、配置与运行时数据各自放在哪个目录',
          ok: true,
          why: '快速定位要改的文件，避免误改配置或数据。',
        },
        {
          t: '要求背诵全世界所有电脑上的绝对路径',
          ok: false,
          why: '只需理解本项目约定。',
        },
        {
          t: '禁止使用相对路径',
          ok: false,
          why: '相对路径更便携，工具常依赖它。',
        },
        {
          t: '所有文件必须放在桌面根目录',
          ok: false,
          why: '层次化目录是正常组织方式。',
        },
      ],
      relatedNodes: ['workbench-editor', 'fs-layout'],
    },
    {
      id: 'concept-workbench:dotfiles',
      q: '「点文件（dotfiles）」通常包含？',
      choices: [
        {
          t: 'Shell 配置、编辑器设置等以点开头的隐藏配置文件',
          ok: true,
          why: '如 .bashrc、.gitconfig；方便迁移个人环境。',
        },
        {
          t: '必须是 PNG/JPG 图片素材',
          ok: false,
          why: '点文件通常是文本配置。',
        },
        {
          t: '操作系统内核源码的唯一位置',
          ok: false,
          why: '与用户家目录配置无关。',
        },
        {
          t: '只能由 root 创建，普通开发者无法拥有',
          ok: false,
          why: '每个用户家目录都可以有自己的点文件。',
        },
      ],
      relatedNodes: ['fs-dotfiles'],
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
          t: "无脑全盘 Accept，默认 Agent 不会越界改 Runtime 或密钥",
          ok: false,
          why: '易引入越界改动。',
        },
        {
          t: "先把密钥写进仓库，方便 Agent 下次自动读取继续改代码",
          ok: false,
          why: '密钥禁止进仓；应走环境变量或 Secrets。',
        },
        {
          t: "只看回复语气是否友好，不必阅读 diff 或本机跑通",
          ok: false,
          why: '看行为与可运行结果。',
        },
      ],
      relatedNodes: ['workbench-editor', 'adev-vibe-coding'],
    },
  ],
});
