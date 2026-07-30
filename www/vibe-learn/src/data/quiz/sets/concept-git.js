import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-git-security',
  title: '概念 · Git、密钥与工程卫生',
  kind: 'concept',
  domain: 'craft',
  tags: ['Git', '安全', 'CI'],
  relatedNodes: [
    'git-workspace',
    'git-advanced',
    'git-forges',
    'craft-security',
    'craft-ci',
    'adev-project-memory',
  ],
  questions: [
    {
      q: '准备把 API 密钥写进即将 push 的源码里，这种做法对吗？',
      choices: [
        {
          t: '不对：应放环境变量或 Secrets，勿提交到版本库',
          ok: true,
          why: '密钥一旦进 Git 历史，即使后来删除也可能已被他人或扫描器获取。',
        },
        {
          t: '可以：只要仓库设为私有就不会泄漏',
          ok: false,
          why: '私有仓仍可能被误分享、离职带走或 CI 日志外泄，不能替代密钥管理。',
        },
        {
          t: '可以：写进 README 方便同事复制使用',
          ok: false,
          why: 'README 会随仓库传播，比藏在代码里更容易被更多人看到。',
        },
        {
          t: '可以：用注释包住密钥，Git 就不会记录',
          ok: false,
          why: 'Git 按文件内容追踪变更，注释里的密钥同样会被提交并保留在历史中。',
        },
      ],
    },
    {
      q: '发现 API 密钥已经出现在 GitHub 公开记录里，第一步最该做什么？',
      choices: [
        {
          t: '立刻在服务商控制台轮换或吊销该密钥',
          ok: true,
          why: '密钥可能已被扫走；轮换才能切断滥用，删提交记录不能替代。',
        },
        {
          t: '只要 force-push 删掉含密钥的提交就够了',
          ok: false,
          why: 'fork、镜像或缓存里可能仍保留旧提交，且 force-push 不能收回已泄漏的值。',
        },
        {
          t: '把密钥文件名改掉，继续用同一个密钥值',
          ok: false,
          why: '密钥的值没变，攻击者仍可直接使用，换文件名没有安全意义。',
        },
        {
          t: '等有人投诉再处理，现在先不管',
          ok: false,
          why: '自动化扫描器会在几分钟内尝试滥用泄漏密钥，拖延会扩大损失。',
        },
      ],
    },
    {
      q: '持续集成（CI）流水线里用 pnpm 安装依赖，哪种做法更稳妥？',
      choices: [
        {
          t: '使用 frozen-lockfile，按锁文件精确安装，避免静默改依赖',
          ok: true,
          why: 'CI 要可复现；冻结锁文件能确保每次构建装到同一套版本。',
        },
        {
          t: '每次都不锁版本，直接升最新主版本',
          ok: false,
          why: '依赖随时变化会导致「本地能过、CI 挂」或线上行为不一致。',
        },
        {
          t: '把数据库密码明文写进 workflow 文件',
          ok: false,
          why: 'workflow 也在 Git 里，明文密钥会再次进入版本历史。',
        },
        {
          t: '跳过安装步骤，假设 runner 里已有全部包',
          ok: false,
          why: 'CI 环境通常是干净的，不安装依赖会导致构建直接失败。',
        },
      ],
    },
    {
      q: '执行 git status 显示文件已修改，但你记得「没动过」，常见原因是什么？',
      choices: [
        {
          t: '编辑器未保存、换行符差异，或 Agent/工具改了文件未审 diff',
          ok: true,
          why: 'Git 追踪磁盘内容；自动格式化、CRLF/LF 切换都会产生「莫名改动」。',
        },
        {
          t: 'Git 会随机篡改工作区文件',
          ok: false,
          why: 'Git 不会无故改内容；status 反映的是与上次提交的实际差异。',
        },
        {
          t: '必须重装操作系统才能恢复',
          ok: false,
          why: '先看 diff、检查换行与未保存窗口，通常就能定位原因。',
        },
        {
          t: '说明远程仓库被黑客入侵了',
          ok: false,
          why: 'status 只看本地工作区与暂存区，与远程是否被入侵无直接关系。',
        },
      ],
    },
    {
      q: '多人协作时 merge 出现冲突，优先应该怎么做？',
      choices: [
        {
          t: '理解两边改动意图，手动合并后跑测试再提交',
          ok: true,
          why: '冲突说明同一处都被改了；盲目选一侧容易丢功能或引入 bug。',
        },
        {
          t: '随机保留一侧改动，永不打开冲突文件',
          ok: false,
          why: '可能删掉同事的新功能或把自己的修复一并丢掉。',
        },
        {
          t: '直接删除整个 .git 目录重新 clone',
          ok: false,
          why: '会丢失未推送的本地工作；应先解决冲突再正常提交。',
        },
        {
          t: '用 git push --force 覆盖远程，冲突就消失了',
          ok: false,
          why: '强推会改写他人基于旧历史的提交，在共享分支上极易造成协作灾难。',
        },
      ],
    },
    {
      q: '把 .env 写进 .gitignore 的主要目的是什么？',
      choices: [
        {
          t: '避免本机数据库密码、API 密钥等敏感配置被提交到 Git',
          ok: true,
          why: '.env 常放本地密钥；忽略它可防止误 add 后 push 到远程。',
        },
        {
          t: '让 npm/pnpm 安装依赖更快',
          ok: false,
          why: '.gitignore 只影响 Git 追踪哪些文件，与包管理速度无关。',
        },
        {
          t: '禁止项目在运行时读取环境变量',
          ok: false,
          why: '恰恰相反，.env 正是为了在本机提供环境变量，只是不应进版本库。',
        },
        {
          t: '自动把 .env 里的值同步到 CI Secrets',
          ok: false,
          why: '同步 Secrets 要在 CI 平台手动配置，.gitignore 不会自动上传。',
        },
      ],
    },
  ],
});
