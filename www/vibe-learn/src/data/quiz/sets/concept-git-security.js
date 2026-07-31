import { defineQuizSet } from '../schema.js';

/** Git × 密钥 × CI 卫生（威胁模型见 eng-security；命令流见 git-cli） */
export default defineQuizSet({
  id: 'concept-git-security',
  title: '概念 · Git、密钥与工程卫生',
  kind: 'concept',
  domain: 'craft',
  tags: ['Git', '安全', 'CI'],
  relatedNodes: ['git-workspace', 'craft-security', 'craft-ci'],
  caption: '密钥不进仓；泄漏先轮换；CI 冻结锁文件。',
  questions: [
    {
      id: 'concept-git-security:no-key',
      q: '准备把 API 密钥写进即将 push 的源码里，这种做法对吗？',
      choices: [
        {
          t: '不对：应放环境变量或 Secrets，勿提交到版本库',
          ok: true,
          why: '进 Git 历史后即使删除也可能已被扫走。',
        },
        {
          t: '可以：只要仓库设为私有就不会泄漏',
          ok: false,
          why: '私有仓仍可能误分享、离职带走或 CI 日志外泄。',
        },
        {
          t: '可以：写进 README 方便同事复制',
          ok: false,
          why: 'README 传播面更大。',
        },
        {
          t: '可以：用注释包住密钥，Git 就不会记录',
          ok: false,
          why: 'Git 按文件内容追踪，注释同样进历史。',
        },
      ],
      relatedNodes: ['craft-security', 'data-env', 'git-workspace'],
    },
    {
      id: 'concept-git-security:rotate',
      q: '发现 API 密钥已经出现在 GitHub 公开记录里，第一步最该？',
      choices: [
        {
          t: '立刻在服务商控制台轮换或吊销该密钥',
          ok: true,
          why: '先废掉钥匙；删提交不能替代轮换。',
        },
        {
          t: '只要 force-push 删掉含密钥的提交就够了',
          ok: false,
          why: 'fork/缓存可能仍有旧值；密钥本身未作废。',
        },
        {
          t: '把密钥文件名改掉，继续用同一个值',
          ok: false,
          why: '值没变，攻击者仍可直接用。',
        },
        {
          t: '等有人投诉再处理',
          ok: false,
          why: '扫描器可能几分钟内滥用。',
        },
      ],
      relatedNodes: ['craft-security', 'git-forges'],
    },
    {
      id: 'concept-git-security:frozen',
      q: 'CI 流水线里用 pnpm 安装依赖，哪种做法更稳妥？',
      choices: [
        {
          t: '使用 frozen-lockfile，按锁文件精确安装，避免静默改依赖',
          ok: true,
          why: 'CI 要可复现；冻结锁文件保证同一套版本。',
        },
        {
          t: '每次都不锁版本，直接升最新主版本',
          ok: false,
          why: '依赖漂移导致本地/CI/线上不一致。',
        },
        {
          t: '把数据库密码明文写进 workflow 文件',
          ok: false,
          why: 'workflow 在 Git 里，又一次密钥进仓。',
        },
        {
          t: '跳过安装步骤，假设 runner 里已有全部包',
          ok: false,
          why: 'CI 通常是干净环境，不装会直接失败。',
        },
      ],
      relatedNodes: ['craft-ci', 'package-managers'],
    },
    {
      id: 'concept-git-security:status',
      q: 'git status 显示已修改，但你记得「没动过」，常见原因？',
      choices: [
        {
          t: '编辑器未保存、换行符差异，或 Agent/工具改了文件未审 diff',
          ok: true,
          why: 'Git 追踪磁盘内容；格式化与 CRLF 都会造成「莫名改动」。',
        },
        {
          t: 'Git 会随机篡改工作区文件',
          ok: false,
          why: 'status 反映与上次提交的真实差异。',
        },
        {
          t: '必须重装操作系统才能恢复',
          ok: false,
          why: '先看 diff、换行与未保存窗口。',
        },
        {
          t: '说明远程仓库被黑客入侵了',
          ok: false,
          why: 'status 只看本地工作区，与远程入侵无直接关系。',
        },
      ],
      relatedNodes: ['git-workspace', 'workbench-editor'],
    },
    {
      id: 'concept-git-security:merge',
      q: '多人协作时 merge 出现冲突，优先应该？',
      choices: [
        {
          t: '理解两边改动意图，手动合并后跑测试再提交',
          ok: true,
          why: '盲目选一侧易丢功能或引入 bug。',
        },
        {
          t: '随机保留一侧改动，永不打开冲突文件',
          ok: false,
          why: '可能删掉同事新功能或自己的修复。',
        },
        {
          t: '直接删除整个 .git 目录重新 clone',
          ok: false,
          why: '丢失未推送工作；应解决冲突。',
        },
        {
          t: '用 git push --force 覆盖远程，冲突就消失了',
          ok: false,
          why: '强推共享分支易造成协作灾难。',
        },
      ],
      relatedNodes: ['git-advanced', 'git-forges'],
    },
    {
      id: 'concept-git-security:gitignore',
      q: '把 .env 写进 .gitignore 的主要目的？',
      choices: [
        {
          t: '避免本机数据库密码、API 密钥等敏感配置被提交到 Git',
          ok: true,
          why: '防止误 add 后 push；模板用 .env.example。',
        },
        {
          t: '让 npm/pnpm 安装依赖更快',
          ok: false,
          why: '.gitignore 只影响 Git 追踪，与装包速度无关。',
        },
        {
          t: '禁止项目在运行时读取环境变量',
          ok: false,
          why: '.env 正是为了本机提供变量，只是不应进仓。',
        },
        {
          t: '自动把 .env 里的值同步到 CI Secrets',
          ok: false,
          why: 'Secrets 要在 CI 平台配置，gitignore 不会上传。',
        },
      ],
      relatedNodes: ['data-env', 'craft-security', 'git-workspace'],
    },
  ],
});
