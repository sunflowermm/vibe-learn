import { defineQuizSet } from '../schema.js';

/** Git 场景流（单词命令见 git-cmd；密钥/CI frozen 见 git-security） */
export default defineQuizSet({
  id: 'concept-git-cli',
  title: '概念 · Git 指令（基础→进阶）',
  kind: 'concept',
  domain: 'craft',
  tags: ['Git', '指令', '基础', '进阶'],
  relatedNodes: ['git-advanced', 'git-forges'],
  caption: '提交闭环、冲突、共享分支、PR、stash、reflog——单词命令见 Git 命令全表。',
  questions: [
    {
      id: 'concept-git-cli:q2',
      q: '把修改放进暂存区，再生成提交，正确顺序是？',
      choices: [
        {
          t: 'git add … → git commit -m "说明 why"',
          ok: true,
          why: '暂存候车，再存档点；message 写 why。',
        },
        {
          t: '先 git commit -m "…" 再 git add …，指望未暂存改动也会进提交',
          ok: false,
          why: '空暂存区通常交不出新内容（amend 等特例另说）。',
        },
        {
          t: '先 git push 再 git add / commit，以为推送会替你完成本地存档',
          ok: false,
          why: 'push 只同步已有提交，不负责暂存与新建提交。',
        },
        {
          t: '只执行 git pull 同步远程，认为本地改动会自动变成提交记录',
          ok: false,
          why: 'pull 拉远程；本地存档仍要 add → commit。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础'],
    },
    {
      id: 'concept-git-cli:stash-switch',
      q: '手头有未提交改动，又要临时切到另一分支修紧急 bug，较稳妥？',
      choices: [
        {
          t: 'git stash（或 commit 到 WIP 分支）保存现场，再 switch；回来后 stash pop/apply',
          ok: true,
          why: '避免带着脏工作区强切分支；也别用 reset --hard 当「暂存」。',
        },
        {
          t: '直接 git switch 到目标分支，并假设 Git 会把未提交改动完整自动拷贝到新分支上继续改',
          ok: false,
          why: '未提交改动常挡住切换，或留在错误分支上。',
        },
        {
          t: '先执行 git reset --hard HEAD 清掉全部改动再切分支，并指望回来后这些改动会自动完整恢复',
          ok: false,
          why: 'hard 丢掉工作区；不是可恢复的暂存手段。',
        },
        {
          t: '把整个项目再复制一份文件夹，在副本里改分支修紧急 bug，正本工作区继续脏着完全不管',
          ok: false,
          why: '丢版本关联与远程跟踪；应用 stash/WIP。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', '应用'],
    },
    {
      id: 'concept-git-cli:q6',
      q: '首次把本地分支推到 origin 并建立跟踪，常用？',
      choices: [
        {
          t: 'git push -u origin HEAD',
          ok: true,
          why: '-u/--set-upstream 建立跟踪，之后可直接 push/pull。',
        },
        {
          t: 'git cherry-pick -n',
          ok: false,
          why: '拣选提交，不设上游。',
        },
        {
          t: 'git submodule update',
          ok: false,
          why: '更新子模块，与设上游无关。',
        },
        {
          t: 'git init --bare',
          ok: false,
          why: '建裸仓，不是日常推送分支。',
        },
      ],
      relatedNodes: ['git-forges', 'git-advanced'],
      tags: ['基础'],
    },
    {
      id: 'concept-git-cli:q7',
      q: '合并冲突已经手改文件后，正确收尾是？',
      choices: [
        {
          t: 'git add 冲突文件 → git commit（完成合并提交）',
          ok: true,
          why: '标记已解决并完成合并。',
        },
        {
          t: '直接 git push --force 到 main，跳过合并提交',
          ok: false,
          why: '未完成合并就强推共享主线，协作灾难。',
        },
        {
          t: 'git reset --hard origin/main（不备份）丢掉本地解决过程',
          ok: false,
          why: '丢掉本地解决过程与未提交工作。',
        },
        {
          t: '删除冲突文件后立即 push，让远程用旧版本覆盖',
          ok: false,
          why: '删文件不等于解决冲突；还可能丢功能。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', '应用'],
    },
    {
      id: 'concept-git-cli:q9',
      q: '已分享到远程的分支上，改写历史（rebase / amend）时最该警惕？',
      choices: [
        {
          t: '他人已基于旧历史开发时，强推会制造痛苦；共享分支慎 rebase',
          ok: true,
          why: '本地整理可用 rebase；共享历史优先 merge 或充分沟通。',
        },
        {
          t: 'rebase 之后就不必再 fetch/pull，远程会自动对齐本地新历史',
          ok: false,
          why: '改写本地历史后常要协商 force-with-lease；他人仍基于旧点。',
        },
        {
          t: 'commit message 越短越好，可以不写 why',
          ok: false,
          why: '应写清意图，方便审与回滚；与是否 rebase 无关。',
        },
        {
          t: '共享主线应默认 force push，以保持历史永远线性',
          ok: false,
          why: '共享主线强推易毁掉他人工作；merge 在协作中很常见。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['进阶'],
    },
    {
      id: 'concept-git-cli:q12',
      q: 'PR/MR 合并进 main 前，本地应优先保证？',
      choices: [
        {
          t: '基于最新 main 变基或合并，冲突在本地解决，说明写清 why，门禁可绿',
          ok: true,
          why: '审查可读 + 可复现；CI 细节见工程卫生课。',
        },
        {
          t: '不拉最新 main 直接开 PR，把合并冲突留给远程 CI 再处理',
          ok: false,
          why: '应本地先对齐主线，减少审查与合并惊喜。',
        },
        {
          t: '把无关改动打成一次「update」提交并 force push，图一次过审',
          ok: false,
          why: '巨型杂糅提交难审、难回滚，也难定位回归。',
        },
        {
          t: '跳过仓库流程，SSH 上生产机直接改文件重启代替合并进 main',
          ok: false,
          why: '无版本、无审计；生产热改也绕过门禁。',
        },
      ],
      relatedNodes: ['git-forges', 'git-advanced'],
      tags: ['进阶', '应用'],
    },
    {
      id: 'concept-git-cli:q13',
      q: 'merge 与 rebase 选哪个更稳妥的团队直觉？',
      choices: [
        {
          t: '共享/发布分支慎 rebase；个人功能分支可 rebase 保持线性，合并前沟通',
          ok: true,
          why: '改写已推送历史会痛。',
        },
        {
          t: '共享主线应默认 rebase + force push，禁止出现任何 merge commit',
          ok: false,
          why: 'merge commit 在开源协作很常见；强推共享主线风险大。',
        },
        {
          t: 'rebase 会自动解决产品需求争议与代码冲突，无需人工沟通',
          ok: false,
          why: '只整理提交历史，不解决需求；冲突仍要人解。',
        },
        {
          t: 'merge 只能用于个人分支，一推送到 origin 就必须改用 rebase',
          ok: false,
          why: '远程协作同样常用 merge；选型看分支是否已共享。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['进阶'],
    },
    {
      id: 'concept-git-cli:q14',
      q: '误删分支或丢提交后，常能救命的是？',
      choices: [
        {
          t: 'git reflog 找回近期 HEAD 移动痕迹，再 checkout/branch 救回',
          ok: true,
          why: '未过期的 reflog 是后悔药。',
        },
        {
          t: '立刻 git gc --prune=now 清未引用对象，指望「刷新」出丢失提交',
          ok: false,
          why: 'gc/prune 更可能清掉还能救的对象，不是救命第一步。',
        },
        {
          t: '删掉本地 .git 再 init，假设下次 fetch 会完整重建原分支历史',
          ok: false,
          why: '毁掉本地历史与未推送工作；应先查 reflog。',
        },
        {
          t: '只看远程网页提交列表就放弃本地，认为丢了就不可救',
          ok: false,
          why: '近期 HEAD 移动痕迹常在本地 reflog，仍可能救回。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['进阶'],
    },
    {
      id: 'concept-git-cli:q16',
      q: '只想把某一个已有提交「拣」到当前分支，经典命令？',
      choices: [
        {
          t: 'git cherry-pick <commit>',
          ok: true,
          why: '拣选；有冲突则解决后再继续。',
        },
        {
          t: 'git tag -d <name>',
          ok: false,
          why: '删标签，不是拣选提交。',
        },
        {
          t: 'git remote remove <name>',
          ok: false,
          why: '删除远程名配置。',
        },
        {
          t: 'git stash drop',
          ok: false,
          why: '丢弃贮藏，不是拣选提交。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['进阶'],
    },
  ],
});
