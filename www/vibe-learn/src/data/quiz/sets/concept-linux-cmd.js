import { defineQuizSet } from '../schema.js';

/** 大厂主机基础：Linux 命令一令一题（配名词 cli_xxx） */
export default defineQuizSet({
  id: 'concept-linux-cmd',
  title: '基础 · Linux 命令全表',
  kind: 'concept',
  domain: 'ops',
  tags: ['Linux', '命令', '基础'],
  relatedNodes: ['linux-cli', 'terminal-worlds'],
  caption: '导航/文件/进程/网络/磁盘——一令一题；与名词轨 cli_* 对照。',
  questions: [
  {
    "id": "concept-linux-cmd:pwd",
    "q": "打印当前工作目录用？",
    "choices": [
      {
        "t": "pwd",
        "ok": true,
        "why": "pwd（print working directory）：打印当前工作目录绝对路径。排障与脚本定位的第一步。"
      },
      {
        "t": "cwd（这是概念名不是命令）",
        "ok": false,
        "why": "不是 pwd 的典型用法。"
      },
      {
        "t": "where",
        "ok": false,
        "why": "不是 pwd 的典型用法。"
      },
      {
        "t": "home",
        "ok": false,
        "why": "不是 pwd 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "pwd"
    ]
  },
  {
    "id": "concept-linux-cmd:ls",
    "q": "列出目录（含隐藏）常用？",
    "choices": [
      {
        "t": "ls -la",
        "ok": true,
        "why": "ls：列出目录项；常用 ls -la 看隐藏文件与权限。大厂排障先看目录里到底有什么。"
      },
      {
        "t": "dir /s（Bash 里不是正路）",
        "ok": false,
        "why": "不是 ls 的典型用法。"
      },
      {
        "t": "list --all",
        "ok": false,
        "why": "不是 ls 的典型用法。"
      },
      {
        "t": "show hidden",
        "ok": false,
        "why": "不是 ls 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "ls"
    ]
  },
  {
    "id": "concept-linux-cmd:cd",
    "q": "Shell 回到上级目录用？",
    "choices": [
      {
        "t": "cd ..",
        "ok": true,
        "why": "cd：切换当前工作目录；cd .. 上级，cd ~ 或 cd 回家目录。"
      },
      {
        "t": "cd ~~",
        "ok": false,
        "why": "不是 cd 的典型用法。"
      },
      {
        "t": "cd // 表示上级",
        "ok": false,
        "why": "不是 cd 的典型用法。"
      },
      {
        "t": "cd --parent-only",
        "ok": false,
        "why": "不是 cd 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "cd"
    ]
  },
  {
    "id": "concept-linux-cmd:tree",
    "q": "树形查看目录结构常用？",
    "choices": [
      {
        "t": "tree（或发行版包管理安装后使用）",
        "ok": true,
        "why": "tree：以树形打印目录结构，便于快速看项目布局；未安装时可用 find 近似。"
      },
      {
        "t": "pwd -R",
        "ok": false,
        "why": "不是 tree 的典型用法。"
      },
      {
        "t": "chmod -tree",
        "ok": false,
        "why": "不是 tree 的典型用法。"
      },
      {
        "t": "git tree 必装系统命令",
        "ok": false,
        "why": "不是 tree 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "tree"
    ]
  },
  {
    "id": "concept-linux-cmd:cat",
    "q": "把小文件内容直接打到终端？",
    "choices": [
      {
        "t": "cat file",
        "ok": true,
        "why": "cat：串联并打印文件内容到标准输出；小文件快速查看。大文件用 less。"
      },
      {
        "t": "less 只能创建文件",
        "ok": false,
        "why": "不是 cat 的典型用法。"
      },
      {
        "t": "mkdir file",
        "ok": false,
        "why": "不是 cat 的典型用法。"
      },
      {
        "t": "chmod file 看内容",
        "ok": false,
        "why": "不是 cat 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "cat"
    ]
  },
  {
    "id": "concept-linux-cmd:less",
    "q": "分页查看大日志更合适？",
    "choices": [
      {
        "t": "less app.log",
        "ok": true,
        "why": "less：可分页、可搜索的文件阅读器；大日志优于 cat。按 q 退出，/ 搜索。"
      },
      {
        "t": "cat 大文件一次灌满终端也总是更好",
        "ok": false,
        "why": "不是 less 的典型用法。"
      },
      {
        "t": "rm -i 看日志",
        "ok": false,
        "why": "不是 less 的典型用法。"
      },
      {
        "t": "pwd app.log",
        "ok": false,
        "why": "不是 less 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "less"
    ]
  },
  {
    "id": "concept-linux-cmd:mkdir",
    "q": "创建多级目录（含中间路径）？",
    "choices": [
      {
        "t": "mkdir -p a/b/c",
        "ok": true,
        "why": "mkdir：创建目录；mkdir -p a/b/c 可创建中间路径。与 touch（建空文件）不同。"
      },
      {
        "t": "touch -p a/b/c",
        "ok": false,
        "why": "不是 mkdir 的典型用法。"
      },
      {
        "t": "cat -p a/b/c",
        "ok": false,
        "why": "不是 mkdir 的典型用法。"
      },
      {
        "t": "cd -p a/b/c",
        "ok": false,
        "why": "不是 mkdir 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "mkdir"
    ]
  },
  {
    "id": "concept-linux-cmd:rm",
    "q": "递归删除目录（需极度谨慎）？",
    "choices": [
      {
        "t": "rm -r dir/（递归删除；生产慎用 -f）",
        "ok": true,
        "why": "rm：删除文件；rm -r 递归删目录。生产慎用 rm -rf；误删难恢复。"
      },
      {
        "t": "mkdir -r dir/（创建目录，不删除）",
        "ok": false,
        "why": "不是 rm 的典型用法。"
      },
      {
        "t": "cp -r src dest（复制，不是删除）",
        "ok": false,
        "why": "不是 rm 的典型用法。"
      },
      {
        "t": "pwd -rf（打印工作目录，不删除）",
        "ok": false,
        "why": "不是 rm 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "rm"
    ]
  },
  {
    "id": "concept-linux-cmd:cp",
    "q": "Shell 递归复制目录用？",
    "choices": [
      {
        "t": "cp -r src/ dest/",
        "ok": true,
        "why": "cp：复制文件；cp -r 递归复制目录树。备份与发布前的常见操作。"
      },
      {
        "t": "cp src/ dest/（无 -r 默认不递归目录）",
        "ok": false,
        "why": "不是 cp 的典型用法。"
      },
      {
        "t": "mv -r 专用于复制",
        "ok": false,
        "why": "不是 cp 的典型用法。"
      },
      {
        "t": "touch -r 复制内容",
        "ok": false,
        "why": "不是 cp 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "cp"
    ]
  },
  {
    "id": "concept-linux-cmd:mv",
    "q": "重命名或移动文件？",
    "choices": [
      {
        "t": "mv old new",
        "ok": true,
        "why": "mv：移动或重命名文件/目录。同文件系统上常为改名，跨设备则复制+删除。"
      },
      {
        "t": "cp 只能改名不能复制",
        "ok": false,
        "why": "不是 mv 的典型用法。"
      },
      {
        "t": "rm 改名",
        "ok": false,
        "why": "不是 mv 的典型用法。"
      },
      {
        "t": "chmod 改名",
        "ok": false,
        "why": "不是 mv 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "mv"
    ]
  },
  {
    "id": "concept-linux-cmd:grep",
    "q": "在文件内容里搜字符串？",
    "choices": [
      {
        "t": "grep -n \"error\" app.log",
        "ok": true,
        "why": "grep：按正则/字符串检索文本；grep -n 行号，-r 递归。日志排障核心工具；也可用 ripgrep。"
      },
      {
        "t": "find -name error（偏文件名）",
        "ok": false,
        "why": "不是 grep 的典型用法。"
      },
      {
        "t": "chmod error",
        "ok": false,
        "why": "不是 grep 的典型用法。"
      },
      {
        "t": "ping error",
        "ok": false,
        "why": "不是 grep 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "grep"
    ]
  },
  {
    "id": "concept-linux-cmd:find",
    "q": "按文件名在树中找 *.log？",
    "choices": [
      {
        "t": "find . -name \"*.log\"",
        "ok": true,
        "why": "find：按名称、时间、权限等元数据遍历目录树；find . -name \"*.log\"。与 grep 搜内容互补。"
      },
      {
        "t": "grep -r 只能匹配文件名",
        "ok": false,
        "why": "不是 find 的典型用法。"
      },
      {
        "t": "ls *.log 一定递归全部子目录",
        "ok": false,
        "why": "不是 find 的典型用法。"
      },
      {
        "t": "cat -name",
        "ok": false,
        "why": "不是 find 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "find"
    ]
  },
  {
    "id": "concept-linux-cmd:ps",
    "q": "查看进程列表并过滤名称？",
    "choices": [
      {
        "t": "ps aux | grep name",
        "ok": true,
        "why": "ps：快照进程表；ps aux | grep name 常用于找进程。与 top/htop 实时视图互补。"
      },
      {
        "t": "ls name 看进程",
        "ok": false,
        "why": "不是 ps 的典型用法。"
      },
      {
        "t": "mkdir -p name 列进程",
        "ok": false,
        "why": "不是 ps 的典型用法。"
      },
      {
        "t": "pwd aux",
        "ok": false,
        "why": "不是 ps 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "ps"
    ]
  },
  {
    "id": "concept-linux-cmd:top",
    "q": "实时看谁占 CPU/内存（经典）？",
    "choices": [
      {
        "t": "top",
        "ok": true,
        "why": "top：交互式实时查看 CPU/内存占用进程。负载飙升时第一眼工具之一。"
      },
      {
        "t": "cat /proc 一次就等于 top 交互",
        "ok": false,
        "why": "不是 top 的典型用法。"
      },
      {
        "t": "chmod +t",
        "ok": false,
        "why": "不是 top 的典型用法。"
      },
      {
        "t": "git top",
        "ok": false,
        "why": "不是 top 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "top"
    ]
  },
  {
    "id": "concept-linux-cmd:htop",
    "q": "比 top 更易用的交互进程监视（常需安装）？",
    "choices": [
      {
        "t": "htop",
        "ok": true,
        "why": "htop：增强版交互式进程监视（常需安装）；比 top 更易读、可点选。"
      },
      {
        "t": "http",
        "ok": false,
        "why": "不是 htop 的典型用法。"
      },
      {
        "t": "chmod",
        "ok": false,
        "why": "不是 htop 的典型用法。"
      },
      {
        "t": "wget top",
        "ok": false,
        "why": "不是 htop 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "htop"
    ]
  },
  {
    "id": "concept-linux-cmd:kill",
    "q": "优雅结束进程常用？",
    "choices": [
      {
        "t": "kill <pid>",
        "ok": true,
        "why": "kill：向进程发信号；默认 SIGTERM，kill -9 为 SIGKILL（最后手段）。先确认 PID。"
      },
      {
        "t": "kill 不需要 pid",
        "ok": false,
        "why": "不是 kill 的典型用法。"
      },
      {
        "t": "rm <pid> 杀进程",
        "ok": false,
        "why": "不是 kill 的典型用法。"
      },
      {
        "t": "cd <pid>",
        "ok": false,
        "why": "不是 kill 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "kill"
    ]
  },
  {
    "id": "concept-linux-cmd:chmod",
    "q": "给脚本加可执行权限？",
    "choices": [
      {
        "t": "chmod +x script.sh",
        "ok": true,
        "why": "chmod：改文件权限位；chmod +x 加执行权限，或数字如 755。安全基线：密钥文件勿 777。"
      },
      {
        "t": "chown +x script.sh",
        "ok": false,
        "why": "不是 chmod 的典型用法。"
      },
      {
        "t": "chgrp +x",
        "ok": false,
        "why": "不是 chmod 的典型用法。"
      },
      {
        "t": "umask +x 专用于加执行位",
        "ok": false,
        "why": "不是 chmod 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "chmod"
    ]
  },
  {
    "id": "concept-linux-cmd:chown",
    "q": "修改文件所有者？",
    "choices": [
      {
        "t": "chown user:group file",
        "ok": true,
        "why": "chown：改文件所有者与属组；部署后修正 www 用户权限常见。勿随意 chown -R /。"
      },
      {
        "t": "chmod user:group（那是改权限位）",
        "ok": false,
        "why": "不是 chown 的典型用法。"
      },
      {
        "t": "pwd user file",
        "ok": false,
        "why": "不是 chown 的典型用法。"
      },
      {
        "t": "grep user file 改所有者",
        "ok": false,
        "why": "不是 chown 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "chown"
    ]
  },
  {
    "id": "concept-linux-cmd:sudo",
    "q": "需要以管理员身份执行一条命令时，经典前缀是？",
    "choices": [
      {
        "t": "sudo command（理解风险）",
        "ok": true,
        "why": "sudo：以另一用户（常为 root）权限执行命令；有审计。扩大权限即扩大误伤面，勿习惯性 sudo rm -rf。"
      },
      {
        "t": "任何命令加 sudo 都更安全",
        "ok": false,
        "why": "不是 sudo 的典型用法。"
      },
      {
        "t": "sudo 等于关防火墙",
        "ok": false,
        "why": "不是 sudo 的典型用法。"
      },
      {
        "t": "普通用户永不能读自家目录",
        "ok": false,
        "why": "不是 sudo 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "sudo"
    ]
  },
  {
    "id": "concept-linux-cmd:curl",
    "q": "命令行调 HTTP / 下载并跟随重定向常用？",
    "choices": [
      {
        "t": "curl -L -o fi",
        "ok": true,
        "why": "curl：命令行传数据，常用于调 HTTP API；curl -L 跟随重定向，-o 写文件。大厂联调与 CI 标配。"
      },
      {
        "t": "cd URL",
        "ok": false,
        "why": "不是 curl 的典型用法。"
      },
      {
        "t": "chmod URL",
        "ok": false,
        "why": "不是 curl 的典型用法。"
      },
      {
        "t": "pwd -L URL",
        "ok": false,
        "why": "不是 curl 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "curl"
    ]
  },
  {
    "id": "concept-linux-cmd:wget",
    "q": "非交互下载文件常用？",
    "choices": [
      {
        "t": "wget URL",
        "ok": true,
        "why": "wget：非交互下载工具，擅长递归镜像与断点续传；与 curl 互补。"
      },
      {
        "t": "cd URL",
        "ok": false,
        "why": "不是 wget 的典型用法。"
      },
      {
        "t": "mkdir URL 下载",
        "ok": false,
        "why": "不是 wget 的典型用法。"
      },
      {
        "t": "kill URL",
        "ok": false,
        "why": "不是 wget 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "wget"
    ]
  },
  {
    "id": "concept-linux-cmd:ping",
    "q": "探测主机网络可达（ICMP）？",
    "choices": [
      {
        "t": "ping host",
        "ok": true,
        "why": "ping：用 ICMP 探测主机可达性与往返时延。通 ≠ 业务端口通；还需 ss/curl 查端口与 HTTP。"
      },
      {
        "t": "ping 能代替查 TCP 端口占用",
        "ok": false,
        "why": "不是 ping 的典型用法。"
      },
      {
        "t": "chmod host",
        "ok": false,
        "why": "不是 ping 的典型用法。"
      },
      {
        "t": "curl 等于 ping 的唯一形式",
        "ok": false,
        "why": "不是 ping 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "ping"
    ]
  },
  {
    "id": "concept-linux-cmd:tail",
    "q": "跟踪日志文件追加？",
    "choices": [
      {
        "t": "tail -f app.log",
        "ok": true,
        "why": "tail：看文件末尾；tail -f 跟踪追加日志。服务排障看最新错误的首选。"
      },
      {
        "t": "head -f 跟日志",
        "ok": false,
        "why": "不是 tail 的典型用法。"
      },
      {
        "t": "wc -f",
        "ok": false,
        "why": "不是 tail 的典型用法。"
      },
      {
        "t": "sort -f 专用于跟日志",
        "ok": false,
        "why": "不是 tail 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "tail"
    ]
  },
  {
    "id": "concept-linux-cmd:head",
    "q": "看文件开头几行？",
    "choices": [
      {
        "t": "head -n 20 file",
        "ok": true,
        "why": "head：看文件开头若干行；与 tail 相对。快速瞄配置文件头部。"
      },
      {
        "t": "tail 只能看开头",
        "ok": false,
        "why": "不是 head 的典型用法。"
      },
      {
        "t": "less 不能翻页",
        "ok": false,
        "why": "不是 head 的典型用法。"
      },
      {
        "t": "rm -n 20",
        "ok": false,
        "why": "不是 head 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "head"
    ]
  },
  {
    "id": "concept-linux-cmd:ss",
    "q": "看谁监听了某端口（现代）？",
    "choices": [
      {
        "t": "ss -lntp | grep 3000",
        "ok": true,
        "why": "ss：查看套接字/端口监听；ss -lntp 看谁占用端口。现代替代部分 netstat 场景。"
      },
      {
        "t": "pwd 3000",
        "ok": false,
        "why": "不是 ss 的典型用法。"
      },
      {
        "t": "chmod 3000",
        "ok": false,
        "why": "不是 ss 的典型用法。"
      },
      {
        "t": "git status :3000",
        "ok": false,
        "why": "不是 ss 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "ss"
    ]
  },
  {
    "id": "concept-linux-cmd:df",
    "q": "看各挂载点磁盘空间？",
    "choices": [
      {
        "t": "df -h",
        "ok": true,
        "why": "df：查看文件系统磁盘空间；df -h 人类可读。磁盘满是服务异常经典原因。"
      },
      {
        "t": "du -h 只看挂载点总量且与 df 完全同义",
        "ok": false,
        "why": "不是 df 的典型用法。"
      },
      {
        "t": "git df",
        "ok": false,
        "why": "不是 df 的典型用法。"
      },
      {
        "t": "npm disk",
        "ok": false,
        "why": "不是 df 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "df"
    ]
  },
  {
    "id": "concept-linux-cmd:du",
    "q": "看某个目录占用多大？",
    "choices": [
      {
        "t": "du -sh dir",
        "ok": true,
        "why": "du：统计目录占用；du -sh dir 看某目录总大小。与 df（卷容量）互补，用于找大目录。"
      },
      {
        "t": "df -sh dir 专看单目录文件合计",
        "ok": false,
        "why": "不是 du 的典型用法。"
      },
      {
        "t": "chmod -sh",
        "ok": false,
        "why": "不是 du 的典型用法。"
      },
      {
        "t": "pwd -sh",
        "ok": false,
        "why": "不是 du 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "du"
    ]
  },
  {
    "id": "concept-linux-cmd:tar",
    "q": "打包目录为 tar.gz？",
    "choices": [
      {
        "t": "tar -czf a.tgz dir/",
        "ok": true,
        "why": "tar：打包/解包；tar -czf a.tgz dir/ 与 tar -xzf a.tgz 是发布备份经典组合。"
      },
      {
        "t": "unzip 是处理 tar.gz 的唯一工具",
        "ok": false,
        "why": "不是 tar 的典型用法。"
      },
      {
        "t": "tar 只能压单字母文件名",
        "ok": false,
        "why": "不是 tar 的典型用法。"
      },
      {
        "t": "tar -czf 会自动 git push",
        "ok": false,
        "why": "不是 tar 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "tar"
    ]
  },
  {
    "id": "concept-linux-cmd:echo",
    "q": "向终端打印一段文本？",
    "choices": [
      {
        "t": "echo \"hello\"",
        "ok": true,
        "why": "echo：向标准输出打印参数；脚本里拼路径、打调试信息常用。注意引号与通配。"
      },
      {
        "t": "cat \"hello\" 作为打印字面量的唯一方式",
        "ok": false,
        "why": "不是 echo 的典型用法。"
      },
      {
        "t": "pwd \"hello\"",
        "ok": false,
        "why": "不是 echo 的典型用法。"
      },
      {
        "t": "kill \"hello\"",
        "ok": false,
        "why": "不是 echo 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "echo"
    ]
  },
  {
    "id": "concept-linux-cmd:which",
    "q": "查某个命令实际路径？",
    "choices": [
      {
        "t": "command -v node",
        "ok": true,
        "why": "which 或 command -v：定位命令在 PATH 中的路径。排查「装了但找不到」与多版本冲突。"
      },
      {
        "t": "pwd node",
        "ok": false,
        "why": "不是 which / command -v 的典型用法。"
      },
      {
        "t": "chmod node 查路径",
        "ok": false,
        "why": "不是 which / command -v 的典型用法。"
      },
      {
        "t": "curl node 查本地路径",
        "ok": false,
        "why": "不是 which / command -v 的典型用法。"
      }
    ],
    "relatedNodes": [
      "linux-cli",
      "terminal-worlds"
    ],
    "tags": [
      "基础",
      "Linux",
      "which"
    ]
  }
],
});
