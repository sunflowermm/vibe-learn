import { defineQuizSet } from '../schema.js';

/** Git 场景流（单词命令见 git-cmd；密钥/CI frozen 见 git-security） */
export default defineQuizSet({
  id: 'concept-git-cli',
  title: '概念 · Git 指令（基础→进阶）',
  kind: 'concept',
  domain: 'craft',
  tags: ['Git', '指令', '基础', '进阶'],
  relatedNodes: ['git-advanced', 'git-forges'],
  caption: '提交闭环、冲突、共享分支、PR、reflog——单词命令见 Git 命令全表。',
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
          t: 'git commit → git add',
          ok: false,
          why: '空暂存则无新内容可提交（除非 amend 等特例）。',
        },
        {
          t: 'git push → git add',
          ok: false,
          why: 'push 同步远程，不负责暂存。',
        },
        {
          t: '只需 git pull',
          ok: false,
          why: 'pull 是拉远程，不是本地提交。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', '进阶'],
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
      tags: ['基础', '进阶'],
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
          t: '删除 .git 目录',
          ok: false,
          why: '毁掉本地仓库历史，不是解决冲突。',
        },
        {
          t: 'git reset --hard origin/main（不备份）',
          ok: false,
          why: '丢掉本地解决过程与未提交工作。',
        },
        {
          t: '直接 git push --force 到 main',
          ok: false,
          why: '未完成合并就强推共享主线，协作灾难。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', '进阶'],
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
          t: '远程分支永远不能 fetch',
          ok: false,
          why: 'fetch 只下载引用，通常安全。',
        },
        {
          t: 'commit message 越短越好，无 why',
          ok: false,
          why: '应写清意图，方便审与回滚。',
        },
        {
          t: 'rebase 会自动解决所有产品需求',
          ok: false,
          why: '只改历史形状，不代替产品决策。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', '进阶'],
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
          t: '直接改生产服务器上的文件代替 Git',
          ok: false,
          why: '无版本、无审计。',
        },
        {
          t: '把所有文件塞进一次「update」提交强推',
          ok: false,
          why: '巨型杂糅提交难审、难回滚，也难定位回归。',
        },
        {
          t: '跳过拉最新 main，有冲突到远程再算',
          ok: false,
          why: '应本地先对齐主线，减少合并惊喜。',
        },
      ],
      relatedNodes: ['git-forges', 'git-advanced'],
      tags: ['基础', '进阶'],
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
          t: 'merge 禁止用于开源协作',
          ok: false,
          why: 'merge commit 在开源协作很常见。',
        },
        {
          t: 'rebase 会自动解决所有产品需求',
          ok: false,
          why: '只整理提交历史，不解决需求。',
        },
        {
          t: '永远 force push 到 main',
          ok: false,
          why: '共享主线强推易毁掉他人工作。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', '进阶'],
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
          t: 'git gc --prune=now 立刻救回一切',
          ok: false,
          why: 'gc 可能清理未引用对象，更危险。',
        },
        {
          t: '删除 .git 再 init',
          ok: false,
          why: '毁掉历史，无法救提交。',
        },
        {
          t: '只能重装系统',
          ok: false,
          why: '先查 reflog 救提交；重装系统解决不了 Git 历史。',
        },
      ],
      relatedNodes: ['git-advanced'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-git-cli:q16',
      q: '只要某一两个提交到当前分支，经典命令？',
      choices: [
        {
          t: 'git cherry-pick <commit>',
          ok: true,
          why: '拣选；有冲突则解决后再继续。',
        },
        {
          t: 'git tag -d 等于拣选',
          ok: false,
          why: 'tag -d 是删标签。',
        },
        {
          t: 'git remote remove',
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
      tags: ['基础', '进阶'],
    },
  ],
});
