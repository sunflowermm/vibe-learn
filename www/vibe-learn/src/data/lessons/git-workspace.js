export default `# Git 与工作区

> **Git** 管历史；**clone** 把远程变成磁盘上的工作区。  
> 托管平台细节见 **代码托管**；代理手顺见第四章 **部署环境 §0**。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 三区 | 能口述工作区 / 暂存 / 本地 / 远程 |
| clone | 失败能判「网络」还是「Git 坏了」；成功能认仓库根 |
| 卫生 | 改前 \`status\`；密钥不进仓 |
| 跟 Agent | 改前 status；改后审 diff |

---

## 1. 三区模型

\`\`\`algo
{"title":"模拟：脏文件如何变成远程提交","kind":"gitstage","speed":560,"caption":"git add 只带走选中文件；没 add 的 note.md 不会进 commit。","data":{"files":[{"name":"app.js","mark":"M"},{"name":"note.md","mark":"?"}],"commit":{"hash":"a1b2c3d","msg":"feat: wire first run"}}}
\`\`\`

| 区 | 直觉 | 命令 |
|----|------|------|
| **工作区** | 编辑器里正在改的 | \`git status\` |
| **暂存区** | 下次提交的购物车 | \`git add\` |
| **本地仓库** | \`.git\` 里的快照 | \`git commit\` |
| **远程** | GitHub / Gitee | \`push\` / \`pull\` / \`fetch\` |

入门先会 clone 与认根；add/commit 在真改代码时再练。

---

## 2. clone：失败 vs 落盘

\`\`\`algo
{"title":"模拟：国内直连失败","kind":"gitclone","speed":420,"caption":"卡在 443——不是 Git 坏了。","data":{"repo":"github.com/…/XRK-AGT.git","fail":true}}
\`\`\`

\`\`\`algo
{"title":"模拟：clone 成功落盘","kind":"gitclone","speed":380,"caption":"根上的 package.json = pnpm install 的正确位置。","data":{"repo":"XRK-AGT.git","fail":false,"entries":[".git/","package.json","pnpm-lock.yaml","src/","README.md"]}}
\`\`\`

| 对策（连不上 GitHub 时） | 说明 |
|--------------------------|------|
| 会话 \`HTTP(S)_PROXY\` | 优先；浏览器通 ≠ git 通 |
| 文档镜像 URL（Gitee 等） | 只换 URL，Git 命令不变 |
| ghproxy 前缀 | 第三方，可能失效；备选 |

\`\`\`env
{"title":"clone 本仓 · 可复制","caption":"优先已设代理的会话。","default":"proxy","tabs":[{"id":"proxy","label":"已设代理","os":"任意","shell":"bash/pwsh","lines":["git clone --depth=1 https://github.com/sunflowermm/XRK-AGT.git","cd XRK-AGT","pwd"]},{"id":"ghproxy","label":"备选 ghproxy","os":"任意","shell":"bash/pwsh","warn":"第三方会失效","lines":["git clone --depth=1 https://ghproxy.com/https://github.com/sunflowermm/XRK-AGT.git","cd XRK-AGT","pwd"]},{"id":"mirror","label":"镜像 URL","os":"任意","shell":"bash/pwsh","lines":["git clone --depth=1 https://gitee.com/<owner>/<repo>.git","cd <repo>","pwd"]}]}
\`\`\`

- **浅克隆** \`--depth=1\`：体积小，适合先跑起来  
- clone 后立刻：\`pwd\` 在根、\`git remote -v\`、\`node -v\` 对齐 engines  

---

## 3. clone ≠ 安装运行时

| | Git clone | Node 安装器 |
|--|-----------|-------------|
| 产物 | 源码树 + \`.git\` | 可执行 \`node\` |
| 更新 | \`git pull\` | 换版本 / 安装包 |
| PATH | 一般不改 | 通常写入 |

没有 Node，源码跑不动；没有工作区，\`pnpm install\` 没有对象。

## 下一步

**代码托管** · **首次跑通**
`;
