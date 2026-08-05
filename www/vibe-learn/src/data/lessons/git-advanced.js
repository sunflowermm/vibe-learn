export default `# Git 进阶：分支 · 提交 · PR · 冲突

> 会 clone 之后：改在分支上、提交写 why、开 PR、会处理冲突。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分支 | 能口述平行时间线与合并 |
| 冲突 | 认得 \`<<<<<<<\` 标记并会收尾 |
| 协作 | 不 force push 主线 |
| 跟 Agent | 危险操作先征得同意 |

\`\`\`check
{"title":"进阶卫生","items":[{"id":"branch","text":"功能在分支上做，不直接搅 main"},{"id":"small","text":"提交小步、可回滚"},{"id":"pr","text":"PR 说明里写验收命令"},{"id":"secret","text":"diff 里没有密钥"}]}
\`\`\`

---

## 1. 分支与合并

\`\`\`algo
{"title":"模拟：从 main 拉分支再合并","kind":"gitbranch","speed":480,"caption":"feat 是平行时间线；合并后主线多一个合流点（网页 PR 同理）。","data":{"mode":"merge","main":["c0","c1","c2"],"feat":["f1","f2"]}}
\`\`\`

最小流：\`git switch -c feat/xxx\` → 小步 commit（写 why）→ \`push\` + 开 PR → 审查合并。

\`\`\`shell
{"preset":"git-workflow"}
\`\`\`

\`\`\`bash
git status
git diff
git add path/to/file
git commit -m "说明为什么改"
git push -u origin my-branch
\`\`\`

---

## 2. 冲突

\`\`\`algo
{"title":"模拟：合并冲突","kind":"gitbranch","speed":500,"caption":"标记不是噪音：两边改了同一处。","data":{"mode":"conflict","main":["c0","c1","c2"],"feat":["f1","f2"]}}
\`\`\`

1. 合并提示 conflict  
2. 打开文件看 \`<<<<<<<\` / \`=======\` / \`>>>>>>> \`  
3. 改成最终内容并**删掉标记行**  
4. \`git add\` → \`commit\`  

入门优先 **merge**；\`rebase\` 等熟了再用。

---

## 3. 本仓提 PR 前

| 检查 | 为什么 |
|------|--------|
| 无 \`.env\` / 密钥 | 历史难擦 |
| 从较新 \`main\` 拉分支 | 少冲突 |
| commit 写 why | 人与 Agent 都省时间 |
| 娱乐插件默认不进白名单 | 产品边界 |

\`\`\`prompt
目标：整理当前改动准备开 PR（不要替我 push --force）。
现场：git status / git diff 如下：…；目标分支=main；意图=…
约束：不 amend 已推送提交；不提交密钥；冲突处列选项让我选。
验收：建议分支名、commit message、PR 草稿（Summary + Test plan）。
\`\`\`

## 下一步

**首次跑通**
`;
