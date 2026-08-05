export default `# systemd 直觉

> **systemd**：多数现代 Linux 发行版用来管服务的 init 系统——**开机拉起、挂了再拉、看日志**。  
> 你写一份 \`某某.service\`（unit），告诉它：在哪个目录、用哪个用户、跑哪条命令。  
> 面板（宝塔/1Panel）的「进程守护」常是同类能力的图形封装；Docker 则是另一套生命周期。
> **学会之后**：能读懂最小 unit 字段，并用 systemctl/journalctl 排障保活。

## 学会之后（验收）


\`\`\`check
{"title":"systemd 通关","items":[{"id":"unit","text":"知道 unit 文件管常驻服务"},{"id":"log","text":"会 journalctl / 日志落点直觉"},{"id":"boot","text":"分得清 enable 与 start"}]}
\`\`\`


| 能力 | 成功信号 |
|------|----------|
| 字段 | WorkingDirectory + ExecStart + User |
| 生命周期 | daemon-reload / enable / restart |
| 日志 | journalctl -u 服务名 |
| 跟 Agent | 草稿可以；enable/restart 你确认 |


## 先认词

| 写法 | 白话 |
|------|------|
| **service / unit** | 一份服务说明书 + 其运行实例 |
| **unit 文件** | 常放 \`/etc/systemd/system/xxx.service\` |
| **ExecStart** | 真正启动的那一行 |
| **WorkingDirectory** | 先进入的目录（仓库根） |
| **User=** | 用哪个系统用户跑（别事事 root） |
| **enable / disable** | 是否开机自启 |
| **start / stop / restart** | 当前这一次 |
| **daemon-reload** | 改完 unit 文件后让 systemd 重读 |
| **journalctl** | 看该服务日志 |
| **Restart=** | 挂了是否自动拉起（如 \`on-failure\` / \`always\`） |

\`\`\`flip
{"title":"systemd 翻卡","cards":[{"front":"enable","back":"开机自启（仍要 start 一次或 reboot）"},{"front":"daemon-reload","back":"改 unit 后必须；否则认旧配置"},{"front":"WorkingDirectory","back":"先 cd 到仓库根再 node"},{"front":"与面板","back":"按钮背后常是保活 + 环境变量"}]}
\`\`\`

## 最小 unit 形状（本仓）

\`\`\`ini
[Unit]
Description=XRK-AGT
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/home/deploy/XRK-AGT
ExecStart=/usr/bin/node app
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
# EnvironmentFile=-/home/deploy/XRK-AGT/.env

[Install]
WantedBy=multi-user.target
\`\`\`

| 注意 | 说明 |
|------|------|
| \`ExecStart\` 用**绝对路径**的 node | \`which node\`；nvm 用户更要想清楚 PATH |
| 密钥 | \`EnvironmentFile\` 指向权限收紧的文件；勿把 Secret 写进可公开的 unit 仓 |
| Redis 等依赖 | 可用 \`After=\` / \`Requires=\`；或接受应用层重试 |
| 先手动跑通 | SSH 下同用户 \`node app\` 成功再写 unit |

## 常用命令

\`\`\`term
{"title":"systemd 命令形状","prompt":"$ ","env":"Linux（演示）","steps":[{"type":"in","text":"sudo systemctl daemon-reload"},{"type":"out","text":"# 无输出常表示成功"},{"type":"in","text":"sudo systemctl enable --now xrk-agt"},{"type":"out","text":"Created symlink …"},{"type":"in","text":"systemctl status xrk-agt"},{"type":"out","text":"● xrk-agt.service - XRK-AGT\\n     Active: active (running)"},{"type":"in","text":"journalctl -u xrk-agt -n 50 --no-pager"},{"type":"out","text":"…最近日志（模拟）"}]}
\`\`\`

\`\`\`steps
{"title":"无面板保活最小路径","steps":[{"title":"本机先跑通","body":"目标用户下 node app 成功"},{"title":"写 unit","body":"WorkingDirectory + ExecStart + User"},{"title":"daemon-reload","body":"安装到 /etc/systemd/system/"},{"title":"enable --now","body":"开机自启并立刻启动"},{"title":"status / journalctl","body":"确认 active；失败读日志"}]}
\`\`\`

\`\`\`quiz
{"title":"systemd","questions":[{"q":"改完 .service 文件后直接 restart 仍用旧 ExecStart，常因？","choices":[{"t":"必须先 daemon-reload","ok":true,"why":"否则未重读 unit。"},{"t":"只能 reboot","ok":false,"why":"reload 即可。"},{"t":"journalctl 会自动改配置","ok":false,"why":"journalctl 只读日志。"}]}]}
\`\`\`

## 与面板 / Docker

| 方式 | 谁拉起进程 |
|------|------------|
| systemd | 主机原生；适合裸机/单二进制 Node |
| 面板 PM2/Node 管理 | 图形配置；本质仍保活 |
| Docker + restart 策略 | 容器引擎拉起；数据在卷 |

挑一种当主路径，避免三重保活互相打架。

## Coding Agent

\`\`\`prompt
目标：草拟 xrk-agt.service，用 systemd 保活本仓主服。
现场：仓库绝对路径=…；用户=…；node 绝对路径（which node）=…；是否有 .env=…
约束：WorkingDirectory 与 ExecStart 指向我的路径；EnvironmentFile 权限提醒；先输出 unit 全文让我确认，再给 install/enable/status/journalctl 命令。
验收：systemctl status 为 active；说明如何看挂掉原因。
\`\`\`

## 下一步

**TLS 证书** · **备份** · **面板上跑 Node**。
## 导图2 · 部署 / 后端 / 监控 × systemd

> 常驻服务单元；开机自启与日志落点。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **部署上线** | 机器上常驻 | unit 文件定义进程 |
| **后端** | 主服进程 | EnvironmentFile 管环境 |
| **监控** | 看是否活着 | journalctl / 健康检查 |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
