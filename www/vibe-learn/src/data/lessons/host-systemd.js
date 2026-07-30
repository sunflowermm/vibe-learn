/** systemd 直觉 */
export default `# systemd 直觉

> **systemd**：很多 Linux 服务器用来「开机拉起服务、挂了再拉」的管家。  
> 你写一份 \`某某.service\` 小文件，告诉它：**在哪个目录、跑哪条命令**。

## 先认词

| 写法 | 白话 |
|------|------|
| **服务 / service** | 在后台长期跑的程序（如 \`node app\`） |
| **unit 文件** | \`/etc/systemd/system/xxx.service\` 这种说明书 |
| **ExecStart** | 真正启动的那一行命令 |
| **enable** | 开机也自动启动 |
| **journalctl** | 看这个服务的日志 |
| **面板** | 宝塔/1Panel 常把同类能力做成按钮（本质仍是保活 + 反代） |

\`\`\`flip
{"title":"systemd 翻卡","cards":[{"front":"enable","back":"开机自启"},{"front":"restart","back":"改配置或挂了后重启"},{"front":"与面板","back":"面板进程守护常封装同类能力"},{"front":"WorkingDirectory","back":"先 cd 到仓库根再执行 node"}]}
\`\`\`

## 接到本仓

无面板时：\`node app\` 可用 systemd（或 pm2 等）保活；有面板/Docker 时理解「谁在拉起进程」即可。

## 只读演示（形状）

> 沙箱不跑真 systemd；下面回放帮你认命令长什么样。真机需 Linux + sudo。

\`\`\`term
{"title":"systemd 命令形状","prompt":"$ ","env":"Linux（演示）","steps":[{"type":"in","text":"sudo systemctl status xrk-agt"},{"type":"out","text":"● xrk-agt.service - XRK-AGT\n     Active: active (running)"},{"type":"in","text":"sudo systemctl restart xrk-agt"},{"type":"out","text":"# 无输出常表示成功"},{"type":"in","text":"journalctl -u xrk-agt -n 20 --no-pager"},{"type":"out","text":"…最近 20 行日志（模拟）"}]}
\`\`\`

\`\`\`steps
{"title":"无面板保活最小路径","steps":[{"title":"本机先跑通","body":"SSH 里 node app 成功"},{"title":"写 unit","body":"WorkingDirectory + ExecStart=node app"},{"title":"daemon-reload + enable","body":"让 systemd 认识并开机启动"},{"title":"status / journalctl","body":"确认 active，会看日志"}]}
\`\`\`

## Coding Agent 协作

可复制：

\`\`\`
目标：草拟 xrk-agt.service，用 systemd 保活本仓主服。
现场：仓库绝对路径=…；用哪个用户跑=…；node 绝对路径（which node）=…
约束：WorkingDirectory 与 ExecStart 指向我的路径；先输出 unit 全文让我确认，再说明写入 /etc/systemd/system/ 与 enable/status/journalctl 命令。
验收：systemctl status 为 active；挂掉后能自动重启（若写了 Restart=）。
\`\`\`

## 下一步

**TLS 证书**。
`;
