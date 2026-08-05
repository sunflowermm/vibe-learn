export default `# 代码托管：GitHub · Gitee · 同类平台

> **Git** 管历史；**托管平台**管「远程仓库住在哪、和谁协作、CI 怎么跑」。  
> GitHub、Gitee、GitCode、GitLab… 产品不同，**Git 协议与心智模型几乎同构**。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 托管 | 分清 Git 本身 vs GitHub/Gitee 等托管 |
| 协作 | PR/MR 是审查入口 |
| 本仓 | 远程事实以你的 remotes 为准 |
| 跟 Agent | 贴仓库 URL 与当前分支 |


## 本课分块

| 块 | 内容 |
|----|------|
| **平台分工** | 本地 Git vs 远程托管 |
| **常见平台** | GitHub / Gitee / 其它 |
| **克隆与远程 URL** | HTTPS · SSH · 镜像 |
| **协作最小环** | Issue · PR/MR · 权限 |
| **国内访问习惯** | 镜像、代理、企业版 |

---

## 1. 本地与远程：谁管什么

\`\`\`mermaid
flowchart LR
  subgraph local["你的机器"]
    W[工作区文件]
    G[".git 历史"]
  end
  subgraph remote["托管平台"]
    R[远程仓库]
    UI["网页：Issue / PR / Actions"]
  end
  W --- G
  G -- "git push / pull / fetch" --> R
  R --- UI
\`\`\`

| | 本地 Git | 托管平台 |
|--|----------|----------|
| 存什么 | 提交对象、分支、暂存区 | 同一套 Git 对象 + 网页协作 |
| 没网能否用 | 能提交、能切分支 | 不能 push/pull；网页不可用 |
| 典型命令 | \`commit\` \`checkout\` | \`clone\` \`push\` \`pull\` |

---

## 2. 平台速览（入门够用）

<div class="lesson-grid-2">
  <div class="lesson-card">
    <h3>GitHub</h3>
    <p>全球默认「开源名片」。Issues、Pull Request、Actions、Pages 生态最完整；许多上游 README 默认给 GitHub URL。</p>
  </div>
  <div class="lesson-card">
    <h3>Gitee（码云）</h3>
    <p>国内常用托管。界面与 GitHub 心智接近（仓库、PR、Issue）；企业/高校场景多；部分开源项目同时挂 GitHub + Gitee 镜像。</p>
  </div>
</div>

<details>
<summary>其它你会碰到的名字</summary>

- **GitLab**：可自建；CI 概念与 GitHub Actions 类似但产品线不同  
- **GitCode / GitLink 等**：国内镜像或专项平台，**clone URL 换掉即可**，Git 命令不变  
- **自建 Gitea / Forgejo**：小团队内网常见  

学一个，其余是「换域名 + 换登录」。
</details>

---

## 3. 克隆：同一套 Git，不同 URL

> 下列模拟窗**不上网**；真实 clone 复制到本机终端。国内直连失败 / 代理 / **ghproxy** 详见第四章 **部署环境 §0**。

\`\`\`shell
{"preset":"clone-fail"}
\`\`\`

常见真实症状：\`Connection timed out\`、\`Failed to connect\`、\`SSL_ERROR\`、长时间停在 \`Cloning into...\`。

**设好会话代理后再 clone（模拟成功）**

\`\`\`shell
{"preset":"clone-proxy-ok"}
\`\`\`

**无本机代理时 · ghproxy.com 前缀（模拟）**

\`\`\`shell
{"preset":"clone-ghproxy"}
\`\`\`

\`\`\`env
{"title":"按托管平台 clone","caption":"协议都是 Git；换的是主机与账号，不是另一套命令。","default":"github","tabs":[{"id":"github","label":"GitHub","os":"任意","shell":"bash/pwsh","note":"国内常需先设 HTTP(S)_PROXY","lines":["git clone --depth=1 https://github.com/sunflowermm/XRK-AGT.git"]},{"id":"ghproxy","label":"ghproxy 前缀","os":"任意","shell":"bash/pwsh","warn":"第三方；可用性会变","lines":["git clone --depth=1 https://ghproxy.com/https://github.com/sunflowermm/XRK-AGT.git"]},{"id":"gitee","label":"Gitee 镜像","os":"任意","shell":"bash/pwsh","note":"URL 以项目文档为准","lines":["git clone --depth=1 https://gitee.com/<owner>/<repo>.git"]}]}
\`\`\`

\`\`\`mermaid
flowchart TB
  A[选平台上的仓库页] --> B{克隆方式}
  B -->|HTTPS| C["https://主机/owner/repo.git"]
  B -->|SSH| D["git@主机:owner/repo.git"]
  C --> E["git clone"]
  D --> E
  E --> F["本地工作区 + .git"]
  F --> G["pnpm install / 按 README 启动"]
\`\`\`

| 方式 | 优点 | 注意 |
|------|------|------|
| **HTTPS** | 上手快，防火墙友好 | 推送常需 Token / 凭据管理器 |
| **SSH** | 推送省事（配好密钥后） | 先生成密钥并加到平台账户 |

浅克隆 \`--depth=1\`：只要「跑起来」，不必拉全历史。

---

## 4. 协作最小环（读开源时认得这些词）

\`\`\`html5
<figure>
  <svg viewBox="0 0 560 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fork 到合并示意">
    <rect x="20" y="50" width="100" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
    <text x="70" y="78" text-anchor="middle" fill="currentColor" font-size="12">上游仓库</text>
    <path d="M120 74 H170" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="145" y="64" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.6">fork</text>
    <rect x="170" y="50" width="100" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
    <text x="220" y="78" text-anchor="middle" fill="currentColor" font-size="12">你的拷贝</text>
    <path d="M270 74 H320" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="295" y="64" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.6">clone</text>
    <rect x="320" y="50" width="100" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
    <text x="370" y="78" text-anchor="middle" fill="currentColor" font-size="12">本地修改</text>
    <path d="M420 74 H470" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <text x="445" y="64" text-anchor="middle" fill="currentColor" font-size="10" opacity="0.6">PR/MR</text>
    <rect x="470" y="50" width="70" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
    <text x="505" y="78" text-anchor="middle" fill="currentColor" font-size="12">合并</text>
  </svg>
  <figcaption>Fork → Clone → 改 → Push → Pull Request / Merge Request</figcaption>
</figure>
\`\`\`

| 概念 | 干什么 |
|------|--------|
| **Issue** | 报 bug、讨论需求（不一定改代码） |
| **Pull Request / Merge Request** | 请求把你的分支合进目标分支 |
| **README** | 人类入口：如何安装、如何跑 |
| **Release / Tag** | 给版本打标签，便于下载发行物 |
| **Actions / CI** | 推送后自动测、构建（平台产品名不同） |

只读学习时：会 \`clone\` + 读 README 即可；贡献代码时再学分支与 PR。

---

## 5. 国内使用时的现实习惯

<div class="lesson-callout">
  <strong>同一仓库，多个远程很常见</strong>
  上游在 GitHub，Gitee 挂同步镜像；或公司 GitLab 内网一份、对外开源一份。判断标准只有一个：<mark>文档写明的 clone URL</mark>。
</div>

- **网络**：GitHub 常需本机代理；终端还要设 \`HTTP(S)_PROXY\`（浏览器通 ≠ Git 通）  
- **ghproxy.com**：把 \`https://github.com/...\` 套成 \`https://ghproxy.com/https://github.com/...\` 再 clone（第三方，会失效；优先本机代理）。本节上方有**失败 / 成功**模拟窗  
- **部署清单**：第四章 **部署环境 §0** 有失败症状、代理手顺与多窗模拟；无可用代理时仅「迫不得已」备忘门户，**并非便宜首选**  
- **登录**：两套账户互不相通，Token / SSH 密钥要分别配置  
- **协议**：都是 Git；不要把「换平台」学成「换一套命令」

\`\`\`env
{"title":"多 remote（进阶）","caption":"一个本地仓可挂多个远程；判断标准仍是文档写明的 URL。","default":"one","tabs":[{"id":"one","label":"查看 / 添加","os":"任意","shell":"bash","lines":["git remote -v","git remote add gitee https://gitee.com/<owner>/<repo>.git"]}]}
\`\`\`

---

## 和「Git 与工作区」的分工

| 节点 | 焦点 |
|------|------|
| **Git 与工作区** | clone 之后目录长什么样、根目录在哪 |
| **本课（托管平台）** | 远程住在哪、GitHub/Gitee 如何选、协作名词 |

## 下一步

工作区就位后 → **首次跑通**；需要认清源码语言时 → 第二章 **计算机语言**。
## 导图2 · Git / PR / 部署 × 代码托管

> 导图2 Git 协作；本课钉 forge 与 PR 心智。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **Git** | 本地版本 | 托管是远程+协作产品 |
| **合并请求（PR）** | 审查入口 | 小步、可验收说明 |
| **部署上线** | 常从托管触发 | CI 词条见工程素养 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
