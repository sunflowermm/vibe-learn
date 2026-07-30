/** 番外 · 主机运维 */
export default `# 番外 · 主机运维

> 面板之外，Linux 主机仍常碰：**systemd 管进程**、**TLS 证书**、**备份**。  
> 与「容器番外」「面板番外」互补：容器是交付形态，面板是图形层，本框是主机底线技能。

## 阅读顺序

1. **systemd** — 开机自启与崩溃拉起  
2. **TLS 证书** — HTTPS 从哪来  
3. **备份** — 备份什么、测恢复  

## 学完应能

- 写一个简单 service 思路（ExecStart 指到 node）  
- 说清证书、域名、80/443 的关系  
- 备份分清：代码 / 配置 / 数据卷


## 与 Vibe Coding

systemd / TLS / 备份：让 Agent 出 unit 与续期步骤草稿；**enable、开端口、删数据** 必须你确认。见各课 Coding Agent 块与 **Vibe Coding 心智**。

`;
