import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-shell-op",
  title: "基础 · Shell 运算符与安全开关",
  kind: 'concept',
  domain: "lang",
  tags: ["Shell","基础"],
  relatedNodes: ["lang-shell","linux-cli"],
  caption: "管道/重定向/set -euo/$?——写脚本少翻车。",
  questions: [
  {
    "id": "concept-shell-op:pipe",
    "q": "把前一命令输出喂给下一命令？",
    "choices": [
      {
        "t": "cmd1 | cmd2",
        "ok": true,
        "why": "管道 |：把前一命令 stdout 接到下一命令 stdin。组合小工具。"
      },
      {
        "t": "cmd1 > cmd2 管道",
        "ok": false,
        "why": "与「Shell 管道 |」不符。"
      },
      {
        "t": "cmd1 || cmd2 等于管道传数据",
        "ok": false,
        "why": "与「Shell 管道 |」不符。"
      },
      {
        "t": "cmd1 & cmd2 管道",
        "ok": false,
        "why": "与「Shell 管道 |」不符。"
      }
    ],
    "relatedNodes": [
      "lang-shell",
      "linux-cli"
    ],
    "tags": [
      "基础",
      "pipe"
    ]
  },
  {
    "id": "concept-shell-op:redir_out",
    "q": "覆盖写入文件？",
    "choices": [
      {
        "t": "cmd > file",
        "ok": true,
        "why": ">：覆盖写入文件；>> 追加。"
      },
      {
        "t": "cmd < file 覆盖写",
        "ok": false,
        "why": "与「Shell 重定向 >」不符。"
      },
      {
        "t": "cmd | file",
        "ok": false,
        "why": "与「Shell 重定向 >」不符。"
      },
      {
        "t": "cmd >>> file",
        "ok": false,
        "why": "与「Shell 重定向 >」不符。"
      }
    ],
    "relatedNodes": [
      "lang-shell"
    ],
    "tags": [
      "基础",
      "redir_out"
    ]
  },
  {
    "id": "concept-shell-op:redir_append",
    "q": "追加写入文件？",
    "choices": [
      {
        "t": "cmd >> file",
        "ok": true,
        "why": ">>：追加写入文件，保留原内容。"
      },
      {
        "t": "cmd > file 追加",
        "ok": false,
        "why": "与「Shell 追加 >>」不符。"
      },
      {
        "t": "cmd << file 追加输出",
        "ok": false,
        "why": "与「Shell 追加 >>」不符。"
      },
      {
        "t": "cmd 2> file 追加 stdout",
        "ok": false,
        "why": "与「Shell 追加 >>」不符。"
      }
    ],
    "relatedNodes": [
      "lang-shell"
    ],
    "tags": [
      "基础",
      "redir_append"
    ]
  },
  {
    "id": "concept-shell-op:redir_err",
    "q": "把标准错误也并进同一输出流？",
    "choices": [
      {
        "t": "cmd >out.log 2>&1",
        "ok": true,
        "why": "2>&1：把 stderr 并入 stdout，常与 >file 一起保存全部输出。"
      },
      {
        "t": "cmd < out.log",
        "ok": false,
        "why": "与「Shell 2>&1」不符。"
      },
      {
        "t": "cmd | out.log",
        "ok": false,
        "why": "与「Shell 2>&1」不符。"
      },
      {
        "t": "cmd >>> out.log",
        "ok": false,
        "why": "与「Shell 2>&1」不符。"
      }
    ],
    "relatedNodes": [
      "lang-shell",
      "linux-cli"
    ],
    "tags": [
      "基础",
      "redir_err"
    ]
  },
  {
    "id": "concept-shell-op:set_e",
    "q": "命令失败就让脚本退出？",
    "choices": [
      {
        "t": "set -e",
        "ok": true,
        "why": "set -e：命令失败（非零退出）则脚本退出。CI 脚本常用。"
      },
      {
        "t": "set -x 专管失败退出",
        "ok": false,
        "why": "与「set -e」不符。"
      },
      {
        "t": "set +e 打开失败即退",
        "ok": false,
        "why": "与「set -e」不符。"
      },
      {
        "t": "export -e",
        "ok": false,
        "why": "与「set -e」不符。"
      }
    ],
    "relatedNodes": [
      "lang-shell",
      "craft-ci"
    ],
    "tags": [
      "基础",
      "set_e"
    ]
  },
  {
    "id": "concept-shell-op:set_u",
    "q": "引用未定义变量就失败？",
    "choices": [
      {
        "t": "set -u",
        "ok": true,
        "why": "set -u：使用未定义变量则报错退出，防空变量酿灾。"
      },
      {
        "t": "set -e 专管未定义变量",
        "ok": false,
        "why": "与「set -u」不符。"
      },
      {
        "t": "set -x 专管未定义变量",
        "ok": false,
        "why": "与「set -u」不符。"
      },
      {
        "t": "unset -u",
        "ok": false,
        "why": "与「set -u」不符。"
      }
    ],
    "relatedNodes": [
      "lang-shell"
    ],
    "tags": [
      "基础",
      "set_u"
    ]
  },
  {
    "id": "concept-shell-op:pipefail",
    "q": "管道中任一环失败就算失败？",
    "choices": [
      {
        "t": "set -o pipefail",
        "ok": true,
        "why": "set -o pipefail：管道中任一命令失败则整管失败，避免只看最后一个退出码。"
      },
      {
        "t": "set -e 已包含全部 pipefail 语义于所有 shell 默认",
        "ok": false,
        "why": "与「set -o pipefail」不符。"
      },
      {
        "t": "set +o pipefail 打开该检查",
        "ok": false,
        "why": "与「set -o pipefail」不符。"
      },
      {
        "t": "export pipefail",
        "ok": false,
        "why": "与「set -o pipefail」不符。"
      }
    ],
    "relatedNodes": [
      "lang-shell",
      "craft-ci"
    ],
    "tags": [
      "基础",
      "pipefail"
    ]
  },
  {
    "id": "concept-shell-op:status",
    "q": "读上一命令退出码？",
    "choices": [
      {
        "t": "$?",
        "ok": true,
        "why": "$?：上一命令退出码；0 通常成功。脚本分支判断。"
      },
      {
        "t": "$#",
        "ok": false,
        "why": "与「Shell $?」不符。"
      },
      {
        "t": "$@",
        "ok": false,
        "why": "与「Shell $?」不符。"
      },
      {
        "t": "$$ 表示上一退出码",
        "ok": false,
        "why": "与「Shell $?」不符。"
      }
    ],
    "relatedNodes": [
      "lang-shell"
    ],
    "tags": [
      "基础",
      "status"
    ]
  },
  {
    "id": "concept-shell-op:shebang",
    "q": "Bash 脚本首行常见？",
    "choices": [
      {
        "t": "#!/usr/bin/env bash",
        "ok": true,
        "why": "Shebang：脚本首行指定解释器；env bash 便于 PATH 解析。"
      },
      {
        "t": "#bash 第一行即可执行",
        "ok": false,
        "why": "与「Shebang #!/usr/bin/env bash」不符。"
      },
      {
        "t": "//usr/bin/env bash",
        "ok": false,
        "why": "与「Shebang #!/usr/bin/env bash」不符。"
      },
      {
        "t": "<?bash",
        "ok": false,
        "why": "与「Shebang #!/usr/bin/env bash」不符。"
      }
    ],
    "relatedNodes": [
      "lang-shell"
    ],
    "tags": [
      "基础",
      "shebang"
    ]
  }
],
});
