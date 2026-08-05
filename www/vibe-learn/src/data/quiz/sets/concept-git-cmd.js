import { defineQuizSet } from '../schema.js';

/** Git 命令识别（场景流见 git-cli；密钥卫生见 git-security） */
export default defineQuizSet({
  id: 'concept-git-cmd',
  title: '基础 · Git 命令全表',
  kind: 'concept',
  domain: 'craft',
  tags: ['Git', '命令', '基础'],
  relatedNodes: ['git-workspace', 'git-advanced'],
  caption: 'clone→status→add→commit→push；分支与协作命令一令一题。',
  questions: [
    {
      id: 'concept-git-cmd:clone',
      q: '把远程仓库拷到本地工作目录？',
      choices: [
        {
          t: 'git clone <url>',
          ok: true,
          why: '复制远程仓并配置 origin；新人第一命令。',
        },
        {
          t: 'git init <url>',
          ok: false,
          why: 'init 建空仓；带 URL 的是 clone，不是 init。',
        },
        {
          t: 'git pull <url>',
          ok: false,
          why: 'pull 在已有本地仓上拉更新；首次落盘用 clone。',
        },
        {
          t: 'git remote add <url>',
          ok: false,
          why: '只加远程名；不会下载整仓工作树。',
        },
      ],
      relatedNodes: ['git-workspace', 'git-forges'],
      tags: ['基础', 'clone'],
    },
    {
      id: 'concept-git-cmd:clone_depth',
      q: '只要最近历史、加快大仓/CI 克隆？',
      choices: [
        {
          t: 'git clone --depth=1 <url>',
          ok: true,
          why: '浅克隆只取最近提交；历史不完整。',
        },
        {
          t: 'git clone --single-branch --mirror <url>',
          ok: false,
          why: 'mirror 是裸镜像仓，用途不同；要浅历史用 --depth。',
        },
        {
          t: 'git pull --depth=1',
          ok: false,
          why: 'pull 不负责「首次浅克隆整仓」。',
        },
        {
          t: 'git fetch --unshallow',
          ok: false,
          why: '把浅仓加深；不是首次只要最新一层。',
        },
      ],
      relatedNodes: ['git-workspace', 'craft-ci'],
      tags: ['基础', 'clone_depth'],
    },
    {
      id: 'concept-git-cmd:remote_v',
      q: '查看本仓配置的远程名与 URL？',
      choices: [
        {
          t: 'git remote -v',
          ok: true,
          why: '列出远程名与 fetch/push URL。',
        },
        {
          t: 'git status -v',
          ok: false,
          why: 'status 看工作区状态，不列远程 URL。',
        },
        {
          t: 'git branch -vv',
          ok: false,
          why: '看分支跟踪关系；完整远程 URL 仍看 remote -v。',
        },
        {
          t: 'git config --list --show-origin',
          ok: false,
          why: '能翻到 url，但日常确认 origin 用 remote -v 更直接。',
        },
      ],
      relatedNodes: ['git-workspace', 'git-forges'],
      tags: ['基础', 'remote_v'],
    },
    {
      id: 'concept-git-cmd:status',
      q: '看改了什么、暂存了什么、当前在哪条分支？',
      choices: [
        {
          t: 'git status',
          ok: true,
          why: '工作区/暂存区与分支状态；每日最高频。',
        },
        {
          t: 'git log --stat',
          ok: false,
          why: '看已提交历史与变更统计，不是当前未提交状态。',
        },
        {
          t: 'git blame',
          ok: false,
          why: '按行追谁改的；不是总览工作区。',
        },
        {
          t: 'git ls-files',
          ok: false,
          why: '列已跟踪文件；不替代 status 的改动摘要。',
        },
      ],
      relatedNodes: ['git-workspace'],
      tags: ['基础', 'status'],
    },
    {
      id: 'concept-git-cmd:diff',
      q: '看尚未暂存的改动内容（逐行）？',
      choices: [
        {
          t: 'git diff',
          ok: true,
          why: '未暂存改动；已暂存用 git diff --staged。',
        },
        {
          t: 'git status',
          ok: false,
          why: '只列文件状态，不展示逐行 diff。',
        },
        {
          t: 'git show HEAD',
          ok: false,
          why: '看某次提交内容，不是工作区相对暂存区的未暂存改。',
        },
        {
          t: 'git log -p',
          ok: false,
          why: '历史提交补丁；不是当前未暂存工作区。',
        },
      ],
      relatedNodes: ['git-workspace', 'adev-vibe-coding'],
      tags: ['基础', 'diff'],
    },
    {
      id: 'concept-git-cmd:add',
      q: '把指定路径的改动放入暂存区？',
      choices: [
        {
          t: 'git add <路径>',
          ok: true,
          why: '暂存候车，准备进入下一次 commit。',
        },
        {
          t: 'git commit <路径>',
          ok: false,
          why: 'commit 做快照；路径进暂存区靠 add（或 commit -a 等特例）。',
        },
        {
          t: 'git stage <路径>',
          ok: false,
          why: '没有日常子命令叫 git stage；标准是 add。',
        },
        {
          t: 'git push <路径>',
          ok: false,
          why: 'push 同步已有提交，不负责暂存文件。',
        },
      ],
      relatedNodes: ['git-workspace'],
      tags: ['基础', 'add'],
    },
    {
      id: 'concept-git-cmd:commit',
      q: '把暂存区做成一次本地提交？',
      choices: [
        {
          t: 'git commit -m "说明 why"',
          ok: true,
          why: '本地历史快照；message 写 why。',
        },
        {
          t: 'git push -m "说明 why"',
          ok: false,
          why: 'push 上传已有提交，不新建本地 commit。',
        },
        {
          t: 'git add -m "说明 why"',
          ok: false,
          why: 'add 只暂存；写说明是 commit 的事。',
        },
        {
          t: 'git save -m "说明 why"',
          ok: false,
          why: '没有 git save；存档点是 commit。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', 'commit'],
    },
    {
      id: 'concept-git-cmd:switch_c',
      q: '新建并切换到功能分支？',
      choices: [
        {
          t: 'git switch -c feat/name',
          ok: true,
          why: '创建并切换；现代推荐，替代部分 checkout -b。',
        },
        {
          t: 'git branch -c feat/name',
          ok: false,
          why: 'branch -c 是复制分支；新建并切换常用 switch -c / checkout -b。',
        },
        {
          t: 'git checkout feat/name',
          ok: false,
          why: '已有分支可 checkout/switch；新建需 -b/-c。',
        },
        {
          t: 'git merge -c feat/name',
          ok: false,
          why: 'merge 合历史，不负责新建功能分支。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', 'switch_c'],
    },
    {
      id: 'concept-git-cmd:branch',
      q: '列出本地分支？',
      choices: [
        {
          t: 'git branch',
          ok: true,
          why: '列本地分支；-a 含远程跟踪，-d 删已合并。',
        },
        {
          t: 'git status --branches',
          ok: false,
          why: 'status 可带短分支摘要，完整列表用 branch。',
        },
        {
          t: 'git remote',
          ok: false,
          why: '列远程名，不是本地分支表。',
        },
        {
          t: 'git tag',
          ok: false,
          why: '列标签，不是功能分支列表。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', 'branch'],
    },
    {
      id: 'concept-git-cmd:push',
      q: '把本地提交同步到远程？',
      choices: [
        {
          t: 'git push',
          ok: true,
          why: '推到远程；首次常用 -u 设上游。',
        },
        {
          t: 'git pull',
          ok: false,
          why: '方向相反：拉远程进本地。',
        },
        {
          t: 'git upload',
          ok: false,
          why: '没有 git upload；上传提交是 push。',
        },
        {
          t: 'git commit --remote',
          ok: false,
          why: 'commit 只写本地；上远程另一步 push。',
        },
      ],
      relatedNodes: ['git-forges', 'git-advanced'],
      tags: ['基础', 'push'],
    },
    {
      id: 'concept-git-cmd:pull',
      q: '拉取并整合远程更新到当前分支？',
      choices: [
        {
          t: 'git pull',
          ok: true,
          why: 'fetch + merge/rebase；协作前常先拉。',
        },
        {
          t: 'git push --pull',
          ok: false,
          why: '没有这种组合；拉是 pull/fetch。',
        },
        {
          t: 'git clone',
          ok: false,
          why: '首次拷仓；日常更新已有仓用 pull/fetch。',
        },
        {
          t: 'git merge origin',
          ok: false,
          why: '缺具体分支引用；且未 fetch 时本地可能没有新对象。',
        },
      ],
      relatedNodes: ['git-advanced', 'git-forges'],
      tags: ['基础', 'pull'],
    },
    {
      id: 'concept-git-cmd:fetch',
      q: '只下载远程更新、暂不合并进当前分支？',
      choices: [
        {
          t: 'git fetch',
          ok: true,
          why: '更新远程跟踪引用，不自动改工作区；先看再合更稳。',
        },
        {
          t: 'git pull --no-commit',
          ok: false,
          why: '仍会尝试合并；只要下载用 fetch。',
        },
        {
          t: 'git checkout origin/main',
          ok: false,
          why: '切换到远程跟踪提交；不替代「只下载」。',
        },
        {
          t: 'git remote update --prune 等同于必然改工作区',
          ok: false,
          why: 'remote update 类似 fetch；默认不改工作区文件。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', 'fetch'],
    },
    {
      id: 'concept-git-cmd:log',
      q: '查看提交历史？',
      choices: [
        {
          t: 'git log（常用 --oneline）',
          ok: true,
          why: '回溯提交与 why；--oneline 紧凑。',
        },
        {
          t: 'git status --history',
          ok: false,
          why: 'status 看当前状态，不是历史列表。',
        },
        {
          t: 'git reflog --all-history',
          ok: false,
          why: 'reflog 是 HEAD 移动痕迹；常规提交史用 log。',
        },
        {
          t: 'git show-branch --current-only',
          ok: false,
          why: '偏分支拓扑；日常读史用 log。',
        },
      ],
      relatedNodes: ['git-workspace'],
      tags: ['基础', 'log'],
    },
    {
      id: 'concept-git-cmd:stash',
      q: '临时搁置未提交改动以便切分支？',
      choices: [
        {
          t: 'git stash',
          ok: true,
          why: '搁置现场；回来 stash pop/apply。',
        },
        {
          t: 'git reset --hard',
          ok: false,
          why: '丢掉工作区，不是可恢复搁置。',
        },
        {
          t: 'git clean -fd',
          ok: false,
          why: '删未跟踪文件；不保存已跟踪改动。',
        },
        {
          t: 'git commit --fixup stash',
          ok: false,
          why: 'fixup 服务自动 rebase；临时搁置用 stash。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', 'stash'],
    },
    {
      id: 'concept-git-cmd:restore',
      q: '丢弃工作区某已跟踪文件的未提交改动？',
      choices: [
        {
          t: 'git restore <file>',
          ok: true,
          why: '恢复工作区；取消暂存加 --staged。',
        },
        {
          t: 'git revert <file>',
          ok: false,
          why: 'revert 针对已有提交做反向提交，不是丢工作区改动。',
        },
        {
          t: 'git reset <file> --hard',
          ok: false,
          why: '路径写法易混；现代丢工作区改动优先 restore。',
        },
        {
          t: 'git rm --cached <file>',
          ok: false,
          why: '取消跟踪保留文件；不是丢弃内容改动。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', 'restore'],
    },
  ],
});
