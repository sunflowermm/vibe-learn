/** Git 进阶 */
export default `# Git 进阶：分支 · 提交 · PR · 冲突

> 会 \`clone\`（把远程仓库拷到本机）之后，协作还要会：**改在分支上、写清楚提交、开 PR、解决冲突**。

## 先认词

| 写法 | 白话 |
|------|------|
| **仓库 / repo** | 一整份带历史的项目文件夹（含隐藏的 \`.git\`） |
| **分支 / branch** | 平行时间线；实验不直接堆在 \`main\` |
| **提交 / commit** | 一次「可回滚的存档点」+ 说明文字 |
| **暂存区 / stage** | \`git add\` 之后、\`commit\` 之前的候车区 |
| **PR / Pull Request** | 请求审查并把你的分支**合并**进主线（GitLab 常叫 **MR**） |
| **冲突 / conflict** | 两边改了同一处，要人工选留哪段 |
| **远程 / origin** | 通常指 GitHub 上的那份；\`push\` 上传、\`pull\` 拉取 |

\`\`\`flip
{"title":"Git 进阶翻卡","cards":[{"front":"分支","back":"平行时间线；实验与主线隔离"},{"front":"PR / MR","back":"请求审查并合并进目标分支"},{"front":"冲突","back":"同一行两边都改了，需手工合并"},{"front":"add vs commit","back":"add=放进暂存；commit=生成存档点"}]}
\`\`\`

## 动手：模拟终端

> 沙箱会假装有一份改动。跟一遍芯片命令，再自己敲。

\`\`\`shell
{"preset":"git-workflow"}
\`\`\`

建议手练顺序：

1. \`git status\` — 看「脏了哪些文件」  
2. \`git switch -c feat/lab\` — 新建并切到分支  
3. \`git add README.md\` — 放进暂存区  
4. \`git commit -m "docs: clarify lab note"\` — 写 **why**  
5. \`git branch\` — 确认当前分支带 \`*\`

---

## 1. 日常闭环（真机同样）

\`\`\`bash
git status
git diff
git add path/to/file
git commit -m "说明为什么改"
git push -u origin my-branch
\`\`\`

提交说明写 **why**，不要只写「update」。

## 和 AI 全栈的交界

模型改代码更快，更需要：

| 习惯 | 为什么 |
|------|--------|
| 小步分支 |  diff 可审，出事可回滚 |
| 清晰 commit | 人与后续 Agent 都读得懂 why |
| PR 门禁 | 自动检测 + 人工看关键路径 |
| 别 force push 主线 | 协作历史是公共财产 |

---

## 2. 最小分支流

\`\`\`steps
{"title":"分支流","steps":[{"title":"从最新 main 拉分支","body":"git switch -c feat/xxx"},{"title":"改代码并提交","body":"小步、可回滚"},{"title":"push + 开 PR","body":"网页上描述意图与如何验证"},{"title":"审查后合并","body":"删已合并远程分支（可选）"}]}
\`\`\`

---

## 3. 冲突怎么处理

1. \`git pull\` / 合并时提示 conflict  
2. 打开文件看 \`<<<<<<<\` / \`=======\` / \`>>>>>>> \`（三块标记）  
3. 改成最终内容，**删掉标记行**  
4. \`git add\` 后再 \`commit\`  

入门优先 **merge**；\`rebase\`（改写历史）等熟了再用。

\`\`\`quiz
{"title":"Git 进阶","questions":[{"q":"PR（Pull Request）最接近哪句？","choices":[{"t":"把电脑格式化","ok":false,"why":"无关。"},{"t":"请求把你的分支合进主线并请人看一眼","ok":true,"why":"协作审查入口。"},{"t":"删除远程仓库","ok":false,"why":"恰恰相反。"}]}]}
\`\`\`

## 接到本仓

改 Core / 提 PR 前：确认没提交密钥；娱乐插件默认不进主仓白名单。

## Coding Agent 协作

可复制：

\`\`\`prompt
目标：帮我整理当前改动准备开 PR（不要替我 push --force）。
现场：git status / git diff 输出如下：…；目标分支=main；意图=…
约束：不要 amend 已推送提交；不要提交 .env/密钥；提交说明写 why；冲突处列出选项让我选。
验收：给出建议的分支名、commit message、PR 描述草稿（Summary + Test plan）。
\`\`\`

## 下一步

**首次跑通** 或 **最小贡献路径**；写插件规则见 **正则入门**。
`;
