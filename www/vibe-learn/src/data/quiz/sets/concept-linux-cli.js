import { defineQuizSet } from '../schema.js';

/** 场景向 Linux：发行版对照已在 terminal-tooling；此处留组合操作与主机服务 */
export default defineQuizSet({
  id: 'concept-linux-cli',
  title: '概念 · Linux 指令（基础→进阶）',
  kind: 'concept',
  domain: 'ops',
  tags: ['Linux', '指令', 'Shell', '基础', '进阶'],
  relatedNodes: ['linux-cli', 'host-systemd', 'lang-shell'],
  caption: '进程组合、systemd、作业控制——单词命令见 Linux 命令全表；发行版方言见终端工具链。',
  questions: [
    {
      id: 'concept-linux-cli:q7',
      q: '脚本里要「找到匹配文件再批量处理」，比手写循环更稳妥的常见模式？',
      choices: [
        {
          t: 'find … -print0 | xargs',
          ok: true,
          why: '裸 for f in $(ls) 遇空格会拆词；-print0/-0 按 NUL 分隔更安全。',
        },
        {
          t: '必须先 rm -rf / 再处理文件',
          ok: false,
          why: '灾难操作，与批量处理无关。',
        },
        {
          t: '只能用图形界面多选，命令行禁止',
          ok: false,
          why: '运维自动化正是命令行长项。',
        },
        {
          t: 'grep 会自动改文件内容，无需其它工具',
          ok: false,
          why: '经典 grep 检索；改写另有 sed/专用工具。',
        },
      ],
      relatedNodes: ['linux-cli', 'lang-shell'],
      tags: ['进阶'],
    },
    {
      id: 'concept-linux-cli:q11',
      q: '查看进程并用名字过滤 node 时，更稳妥的说法？',
      choices: [
        {
          t: 'ps … | grep node 可用',
          ok: true,
          why: '经典组合；杀进程前先确认 PID，勿盲 kill -9。',
        },
        {
          t: 'kill -9 不带 PID 即可杀掉所有相关进程',
          ok: false,
          why: '必须指定进程；盲杀危险。',
        },
        {
          t: 'ls node 会列出正在运行的 Node 进程',
          ok: false,
          why: 'ls 列目录，不列进程。',
        },
        {
          t: 'nice 专门用来结束进程',
          ok: false,
          why: 'nice 调优先级，不是杀进程。',
        },
      ],
      relatedNodes: ['linux-cli', 'runtime-nodejs'],
      tags: ['基础', '进阶'],
    },
    {
      id: 'concept-linux-cli:q13',
      q: '用 systemd 看某服务是否在跑（现代发行版）？',
      choices: [
        {
          t: 'systemctl status my.service',
          ok: true,
          why: '看 Active 状态与最近日志摘要；改完配置常要 daemon-reload 再重启单元。',
        },
        {
          t: 'git status my.service',
          ok: false,
          why: 'Git 工作区状态，不是主机服务。',
        },
        {
          t: 'npm status 等于 systemctl',
          ok: false,
          why: 'npm 管 JS 包，不管 systemd 单元。',
        },
        {
          t: 'docker status 与 systemctl 永远同一套命令',
          ok: false,
          why: '容器生命周期用 docker/podman；主机服务用 systemd。',
        },
      ],
      relatedNodes: ['host-systemd', 'linux-cli'],
      tags: ['进阶'],
    },
    {
      id: 'concept-linux-cli:q18',
      q: '看 systemd 服务近期日志？',
      choices: [
        {
          t: 'journalctl -u my.service -n',
          ok: true,
          why: '按单元过滤；排障比翻散落的 /var/log 文件更直接。',
        },
        {
          t: 'git log -u my.service',
          ok: false,
          why: '提交历史，不是服务 journal。',
        },
        {
          t: 'npm journal',
          ok: false,
          why: '无此标准命令。',
        },
        {
          t: 'journalctl 等于删除 Docker 镜像',
          ok: false,
          why: '只读日志；删镜像是 docker rmi / prune。',
        },
      ],
      relatedNodes: ['host-systemd', 'linux-cli'],
      tags: ['进阶'],
    },
    {
      id: 'concept-linux-cli:q19',
      q: '把命令放到后台跑、再拉回前台，经典作业控制？',
      choices: [
        {
          t: '命令末尾 `&` 后台',
          ok: true,
          why: '与另开终端互补；jobs 可列后台任务。',
        },
        {
          t: '末尾 `&` 只能表示逻辑与，绝不能后台',
          ok: false,
          why: '命令末尾的 `&` 是作业控制；`&&` 才是成功后继续。',
        },
        {
          t: '后台进程启动后无法再被管理',
          ok: false,
          why: 'jobs/fg/bg/kill 都可管。',
        },
        {
          t: '只有 root 才能用 Ctrl+C',
          ok: false,
          why: '普通用户可中断自己的前台进程。',
        },
      ],
      relatedNodes: ['linux-cli', 'lang-shell'],
      tags: ['进阶'],
    },
  ],
});
