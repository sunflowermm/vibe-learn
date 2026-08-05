export default `# 代码托管：GitHub · Gitee · 同类平台

> **Git** 管历史；**托管平台**管远程住哪、和谁协作、CI 怎么跑。  
> 产品不同，**Git 协议同构**——换的是主机与登录，不是另一套命令。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分工 | 分清本地 Git vs 托管网页 |
| 选仓 | 能按文档 URL clone（GitHub / Gitee / 镜像） |
| 协作 | 知道 PR/MR 是审查入口 |
| 跟 Agent | 贴仓库 URL 与当前分支 |

---

## 1. 本地 vs 托管

| | 本地 Git | 托管平台 |
|--|----------|----------|
| 存什么 | 提交、分支、暂存 | 同一套对象 + Issue / PR / Actions |
| 没网 | 能 commit | 不能 push/pull |

网页多出来的是协作产品；\`push\` 之后才在平台上看得见。

---

## 2. 平台速览

| 平台 | 何时想到它 |
|------|------------|
| **GitHub** | 全球开源默认；Actions / Pages 生态全 |
| **Gitee** | 国内常用；界面心智接近；常作镜像 |
| **GitLab / Gitea…** | 自建或内网；命令仍是 Git |

学一个，其余是「换域名 + 换登录」。

---

## 3. 同一套 Git，不同 URL

clone 失败/代理动画见 **Git 与工作区**；本课只钉「换 URL」。

\`\`\`env
{"title":"按托管 clone","caption":"协议都是 Git。","default":"github","tabs":[{"id":"github","label":"GitHub","os":"任意","shell":"bash/pwsh","note":"国内常需 HTTP(S)_PROXY","lines":["git clone --depth=1 https://github.com/sunflowermm/XRK-AGT.git"]},{"id":"ghproxy","label":"ghproxy 备选","os":"任意","shell":"bash/pwsh","warn":"第三方会失效","lines":["git clone --depth=1 https://ghproxy.com/https://github.com/sunflowermm/XRK-AGT.git"]},{"id":"gitee","label":"Gitee","os":"任意","shell":"bash/pwsh","lines":["git clone --depth=1 https://gitee.com/<owner>/<repo>.git"]}]}
\`\`\`

| 方式 | 优点 | 注意 |
|------|------|------|
| **HTTPS** | 上手快 | 推送常需 Token |
| **SSH** | 推送省事 | 先配密钥到平台 |

浅克隆 \`--depth=1\` 适合先跑起来。

---

## 4. 协作名词

Fork → Clone → 改 → Push → **PR / MR** → 合并。

| 概念 | 干什么 |
|------|--------|
| **Issue** | 报 bug、讨论（不一定改代码） |
| **PR / MR** | 请求把分支合进目标分支 |
| **Actions / CI** | 推送后自动测（产品名各异） |

只读：会 clone + 读 README；贡献：再学分支（**Git 进阶**）。

国内现实：浏览器通 ≠ git 通；同一仓挂多个 remote 很常见——以**文档写明的 URL**为准。

\`\`\`env
{"title":"多 remote","caption":"一个本地仓可挂多个远程。","default":"one","tabs":[{"id":"one","label":"查看 / 添加","os":"任意","shell":"bash","lines":["git remote -v","git remote add gitee https://gitee.com/<owner>/<repo>.git"]}]}
\`\`\`

## 下一步

**首次跑通** · **Git 进阶**（分支 / PR / 冲突）
`;
