import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-git-cmd",
  title: "基础 · Git 命令全表",
  kind: 'concept',
  domain: "craft",
  tags: ["Git","命令","基础"],
  relatedNodes: ["git-workspace","git-advanced"],
  caption: "clone→status→add→commit→push；分支与协作命令一令一题。",
  questions: [
  {
    "id": "concept-git-cmd:clone",
    "q": "把远程仓库拷到本地？",
    "choices": [
      {
        "t": "git clone <url>",
        "ok": true,
        "why": "git clone：把远程仓库复制到本地工作目录并配置 origin。新人第一命令。"
      },
      {
        "t": "git push <url> 首次必用",
        "ok": false,
        "why": "与「git clone」不符。"
      },
      {
        "t": "git init <url> 等于克隆远程",
        "ok": false,
        "why": "与「git clone」不符。"
      },
      {
        "t": "git status <url>",
        "ok": false,
        "why": "与「git clone」不符。"
      }
    ],
    "relatedNodes": [
      "git-workspace",
      "git-forges"
    ],
    "tags": [
      "基础",
      "clone"
    ]
  },
  {
    "id": "concept-git-cmd:clone_depth",
    "q": "只要最新历史、加快克隆？",
    "choices": [
      {
        "t": "git clone --depth=1 <url>",
        "ok": true,
        "why": "git clone --depth=1：浅克隆，只取最近提交，加快 CI/大仓拉取；历史不完整。"
      },
      {
        "t": "git push --depth=1",
        "ok": false,
        "why": "与「git clone --depth=1」不符。"
      },
      {
        "t": "git status --depth=1",
        "ok": false,
        "why": "与「git clone --depth=1」不符。"
      },
      {
        "t": "git rm --depth=1",
        "ok": false,
        "why": "与「git clone --depth=1」不符。"
      }
    ],
    "relatedNodes": [
      "git-workspace",
      "craft-ci"
    ],
    "tags": [
      "基础",
      "clone_depth"
    ]
  },
  {
    "id": "concept-git-cmd:remote_v",
    "q": "查看远程仓库地址？",
    "choices": [
      {
        "t": "git remote -v",
        "ok": true,
        "why": "git remote -v：列出远程名与 fetch/push URL。确认 origin 指哪。"
      },
      {
        "t": "git status -v 看远程 URL",
        "ok": false,
        "why": "与「git remote -v」不符。"
      },
      {
        "t": "git blame -v",
        "ok": false,
        "why": "与「git remote -v」不符。"
      },
      {
        "t": "git gc -v",
        "ok": false,
        "why": "与「git remote -v」不符。"
      }
    ],
    "relatedNodes": [
      "git-workspace",
      "git-forges"
    ],
    "tags": [
      "基础",
      "remote_v"
    ]
  },
  {
    "id": "concept-git-cmd:status",
    "q": "看改了什么、暂存了什么？",
    "choices": [
      {
        "t": "git status",
        "ok": true,
        "why": "git status：查看工作区/暂存区状态与当前分支。每日最高频。"
      },
      {
        "t": "git blame 总览状态",
        "ok": false,
        "why": "与「git status」不符。"
      },
      {
        "t": "git stash drop 看状态",
        "ok": false,
        "why": "与「git status」不符。"
      },
      {
        "t": "git gc 日常状态",
        "ok": false,
        "why": "与「git status」不符。"
      }
    ],
    "relatedNodes": [
      "git-workspace"
    ],
    "tags": [
      "基础",
      "status"
    ]
  },
  {
    "id": "concept-git-cmd:diff",
    "q": "看尚未暂存的改动内容？",
    "choices": [
      {
        "t": "git diff",
        "ok": true,
        "why": "git diff：看未暂存改动；git diff --staged 看已暂存。审 diff 再 commit。"
      },
      {
        "t": "git push --diff",
        "ok": false,
        "why": "与「git diff」不符。"
      },
      {
        "t": "git remote diff",
        "ok": false,
        "why": "与「git diff」不符。"
      },
      {
        "t": "git tag diff",
        "ok": false,
        "why": "与「git diff」不符。"
      }
    ],
    "relatedNodes": [
      "git-workspace",
      "adev-vibe-coding"
    ],
    "tags": [
      "基础",
      "diff"
    ]
  },
  {
    "id": "concept-git-cmd:add",
    "q": "把改动放入暂存区？",
    "choices": [
      {
        "t": "git add <路径>",
        "ok": true,
        "why": "git add：把改动放入暂存区，准备进入下一次 commit。"
      },
      {
        "t": "git commit 先于 add 的唯一正路",
        "ok": false,
        "why": "与「git add」不符。"
      },
      {
        "t": "git push 代替暂存",
        "ok": false,
        "why": "与「git add」不符。"
      },
      {
        "t": "git pull 代替 add",
        "ok": false,
        "why": "与「git add」不符。"
      }
    ],
    "relatedNodes": [
      "git-workspace"
    ],
    "tags": [
      "基础",
      "add"
    ]
  },
  {
    "id": "concept-git-cmd:commit",
    "q": "生成一次本地提交？",
    "choices": [
      {
        "t": "git commit -m \"说明 why\"",
        "ok": true,
        "why": "git commit：把暂存区做成历史快照；-m 写说明 why。小步可复查。"
      },
      {
        "t": "git push 等于本地 commit",
        "ok": false,
        "why": "与「git commit」不符。"
      },
      {
        "t": "git add -m 提交",
        "ok": false,
        "why": "与「git commit」不符。"
      },
      {
        "t": "git clone -m",
        "ok": false,
        "why": "与「git commit」不符。"
      }
    ],
    "relatedNodes": [
      "git-advanced"
    ],
    "tags": [
      "基础",
      "commit"
    ]
  },
  {
    "id": "concept-git-cmd:switch_c",
    "q": "新建并切换功能分支？",
    "choices": [
      {
        "t": "git switch -c feat/name",
        "ok": true,
        "why": "git switch -c <branch>：创建并切换到新分支。现代推荐，替代部分 checkout -b。"
      },
      {
        "t": "git merge feat/name 建分支",
        "ok": false,
        "why": "与「git switch -c」不符。"
      },
      {
        "t": "git remote add feat/name",
        "ok": false,
        "why": "与「git switch -c」不符。"
      },
      {
        "t": "git tag feat/name 当功能分支日常",
        "ok": false,
        "why": "与「git switch -c」不符。"
      }
    ],
    "relatedNodes": [
      "git-advanced"
    ],
    "tags": [
      "基础",
      "switch_c"
    ]
  },
  {
    "id": "concept-git-cmd:branch",
    "q": "列出本地分支？",
    "choices": [
      {
        "t": "git branch",
        "ok": true,
        "why": "git branch：列出本地分支；-d 删除已合并分支。"
      },
      {
        "t": "git status 专列远程分支名表",
        "ok": false,
        "why": "与「git branch」不符。"
      },
      {
        "t": "git push --list-branches 唯一方式",
        "ok": false,
        "why": "与「git branch」不符。"
      },
      {
        "t": "git rm --branches",
        "ok": false,
        "why": "与「git branch」不符。"
      }
    ],
    "relatedNodes": [
      "git-advanced"
    ],
    "tags": [
      "基础",
      "branch"
    ]
  },
  {
    "id": "concept-git-cmd:push",
    "q": "把本地提交同步到远程？",
    "choices": [
      {
        "t": "git push（首次常 git push -u origin HEAD）",
        "ok": true,
        "why": "git push：把本地提交推到远程；首次常用 -u 设上游。"
      },
      {
        "t": "git pull 唯一上传方式",
        "ok": false,
        "why": "与「git push」不符。"
      },
      {
        "t": "git add 上传远程",
        "ok": false,
        "why": "与「git push」不符。"
      },
      {
        "t": "git status 推送",
        "ok": false,
        "why": "与「git push」不符。"
      }
    ],
    "relatedNodes": [
      "git-forges",
      "git-advanced"
    ],
    "tags": [
      "基础",
      "push"
    ]
  },
  {
    "id": "concept-git-cmd:pull",
    "q": "拉取并整合远程更新？",
    "choices": [
      {
        "t": "git pull",
        "ok": true,
        "why": "git pull：取远程更新并合并/变基进当前分支。协作前先拉。"
      },
      {
        "t": "git push 代替拉取",
        "ok": false,
        "why": "与「git pull」不符。"
      },
      {
        "t": "git clone 每天代替 pull",
        "ok": false,
        "why": "与「git pull」不符。"
      },
      {
        "t": "git rm --pull",
        "ok": false,
        "why": "与「git pull」不符。"
      }
    ],
    "relatedNodes": [
      "git-advanced",
      "git-forges"
    ],
    "tags": [
      "基础",
      "pull"
    ]
  },
  {
    "id": "concept-git-cmd:fetch",
    "q": "只下载远程更新、暂不合并？",
    "choices": [
      {
        "t": "git fetch",
        "ok": true,
        "why": "git fetch：只下载远程对象与引用，不自动合并。先看再合更安全。"
      },
      {
        "t": "git fetch 一定会改工作区文件",
        "ok": false,
        "why": "与「git fetch」不符。"
      },
      {
        "t": "git commit --fetch",
        "ok": false,
        "why": "与「git fetch」不符。"
      },
      {
        "t": "git add --fetch",
        "ok": false,
        "why": "与「git fetch」不符。"
      }
    ],
    "relatedNodes": [
      "git-advanced"
    ],
    "tags": [
      "基础",
      "fetch"
    ]
  },
  {
    "id": "concept-git-cmd:log",
    "q": "查看提交历史？",
    "choices": [
      {
        "t": "git log（常用 --oneline）",
        "ok": true,
        "why": "git log：查看提交历史；--oneline 紧凑。回溯 why 的入口。"
      },
      {
        "t": "git status 代替历史",
        "ok": false,
        "why": "与「git log」不符。"
      },
      {
        "t": "git remote log",
        "ok": false,
        "why": "与「git log」不符。"
      },
      {
        "t": "git push --log-only",
        "ok": false,
        "why": "与「git log」不符。"
      }
    ],
    "relatedNodes": [
      "git-workspace"
    ],
    "tags": [
      "基础",
      "log"
    ]
  },
  {
    "id": "concept-git-cmd:stash",
    "q": "临时搁置未提交改动？",
    "choices": [
      {
        "t": "git stash",
        "ok": true,
        "why": "git stash：临时搁置未提交改动，切分支救急；pop/apply 取回。"
      },
      {
        "t": "git reset --hard 唯一搁置",
        "ok": false,
        "why": "与「git stash」不符。"
      },
      {
        "t": "git tag stash",
        "ok": false,
        "why": "与「git stash」不符。"
      },
      {
        "t": "git remote stash",
        "ok": false,
        "why": "与「git stash」不符。"
      }
    ],
    "relatedNodes": [
      "git-advanced"
    ],
    "tags": [
      "基础",
      "stash"
    ]
  },
  {
    "id": "concept-git-cmd:restore",
    "q": "丢弃工作区某文件未提交改动？",
    "choices": [
      {
        "t": "git restore <file>",
        "ok": true,
        "why": "git restore：丢弃工作区改动或取消暂存（--staged）。替代部分 checkout/reset 用途。"
      },
      {
        "t": "git push --restore",
        "ok": false,
        "why": "与「git restore」不符。"
      },
      {
        "t": "git clone --restore",
        "ok": false,
        "why": "与「git restore」不符。"
      },
      {
        "t": "git remote restore",
        "ok": false,
        "why": "与「git restore」不符。"
      }
    ],
    "relatedNodes": [
      "git-advanced"
    ],
    "tags": [
      "基础",
      "restore"
    ]
  },
  {
    "id": "concept-git-cmd:gitignore",
    "q": "忽略 node_modules / 密钥文件靠？",
    "choices": [
      {
        "t": ".gitignore 规则（并确认未被强制 add）",
        "ok": true,
        "why": ".gitignore：声明不纳入版本控制的路径（密钥、依赖目录、构建产物）。应进仓共享。"
      },
      {
        "t": "只靠口头约定不写文件",
        "ok": false,
        "why": "与「.gitignore」不符。"
      },
      {
        "t": "把密钥 commit 后再 ignore 就安全",
        "ok": false,
        "why": "与「.gitignore」不符。"
      },
      {
        "t": "gitignore 只存在于远程 GitHub 设置",
        "ok": false,
        "why": "与「.gitignore」不符。"
      }
    ],
    "relatedNodes": [
      "git-workspace",
      "craft-security"
    ],
    "tags": [
      "基础",
      "gitignore"
    ]
  }
],
});
