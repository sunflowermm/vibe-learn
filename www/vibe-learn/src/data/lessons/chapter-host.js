/** 番外 · 主机运维 */
export default `# 番外 · 主机运维

> 面板之外，Linux 主机仍常碰：**systemd 管进程**、**TLS 证书**、**备份**。  
> 与「容器番外」「面板番外」互补：容器是交付形态，面板是图形层，本框是主机底线技能。

## 阅读顺序

\`\`\`steps
{"title":"主机运维路径","steps":[{"title":"systemd","body":"unit、enable、journalctl"},{"title":"TLS","body":"DNS → ACME → 网关终止"},{"title":"备份","body":"代码/配置/数据 + 演练恢复"}]}
\`\`\`

1. **systemd** — 开机自启与崩溃拉起（含最小 \`.service\` 形状）  
2. **TLS 证书** — HTTPS 从哪来、续期谁管  
3. **备份与恢复** — 备份什么、异地、测恢复  

## 学完应能

- 写一份简单 service 思路（\`WorkingDirectory\` + \`ExecStart\` 指到 \`node app\`）  
- 说清证书、域名、80/443、ACME 校验的关系  
- 备份分清：代码 / 配置 / 数据卷；做过「恢复演练」心智  

## 与 Vibe Coding

systemd / TLS / 备份：让 Agent 出 unit 与续期步骤草稿；**enable、开端口、删数据** 必须你确认。见各课 Coding Agent 块与 **Vibe Coding 心智**。

## 与面板

有面板时：理解按钮背后仍是保活 + 反代 + 证书；无面板时本框就是主路径。
`;
