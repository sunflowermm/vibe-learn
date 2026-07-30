/** 1Panel */
export default `# 1Panel

> 现代化、**开源**的 Linux 服务器运维面板（Go + 容器心智）。Web 管主机监控、文件、数据库、网站、证书，并深度集成 **Docker / 应用商店**。  
> 文档：[1panel.cn/docs](https://1panel.cn/docs/) · 仓库：[1Panel-dev/1Panel](https://github.com/1Panel-dev/1Panel)  
> 安装入口示例（以官网为准）：\`bash -c "$(curl -sSL https://resource.fit2cloud.com/1panel/package/v2/quick_start.sh)"\`

## 事实钉

| 项 | 说明 |
|----|------|
| **系统** | **仅 Linux**（Debian/RedHat 系等）；无 Windows 面板对等物 |
| **架构** | 应用多以 **容器** 部署，隔离面相对清晰 |
| **访问** | \`http://IP:端口/安全入口\`；云安全组需放行面板端口 |
| **运维命令** | 安装后常用 \`1pctl\`（如 \`1pctl user-info\` 查入口，以文档为准） |
| **非交互安装** | 可用 \`PANEL_PORT\` / \`PANEL_ENTRANCE\` / \`PANEL_USERNAME\` / \`PANEL_PASSWORD\` 等（见[在线安装](https://1panel.cn/docs/v2/installation/online_installation/)） |
| **开源** | 社区版可自建审计；另有企业版增值（WAF 增强等，以官网为准） |

\`\`\`flip
{"title":"1Panel 翻卡","cards":[{"front":"安全入口","back":"URL 路径里多一段，降低扫描命中"},{"front":"应用商店","back":"Compose/镜像一键起，仍要懂卷与端口"},{"front":"与宝塔差","back":"更偏容器；教程量通常少于宝塔"},{"front":"备份","back":"可对云存储；务必含数据卷"}]}
\`\`\`

## 和宝塔的直觉差

| 维度 | 1Panel 常见印象 |
|------|-----------------|
| 交付 | Docker / 应用商店更顺 |
| 注册 | 社区版**不强制**手机号绑定（相对宝塔常见体验） |
| 资源 | 面板本身通常更轻（仍取决于你装了多少应用） |
| 生态 | 插件/中文教程总量通常少于宝塔；成长快 |
| Windows | 不覆盖；Windows 主机看宝塔/其它 |

\`\`\`match
{"title":"1Panel 配对","pairs":[{"id":"d","left":"Docker","right":"常见运行与应用载体"},{"id":"e","left":"安全入口","right":"登录 URL 的额外路径段"},{"id":"p","left":"反代/证书","right":"仍落在网关层概念"},{"id":"s","left":"1pctl","right":"面板 CLI 维护入口"}]}
\`\`\`

## 建议你弄清的四件事

1. 面板 **端口 + 安全入口 + 账号**（\`1pctl user-info\`）  
2. 网站/应用如何指到 **容器端口或本机 Node 端口**  
3. **数据卷**在哪；备份是否含卷  
4. 云安全组与面板防火墙是否都放行了 80/443  

## Coding Agent

\`\`\`prompt
目标：用 1Panel 托管本仓；Node 已在 127.0.0.1:PORT。请给出：网站/反代、证书、只暴露 80/443、备份含哪些目录的步骤。
现场：是否已装 Docker=…；域名=…；1Panel 端口/入口是否已知=…
约束：先清单；勿建议关闭安全入口；密钥走环境变量。
验收：HTTPS 通；说明如何用 1pctl 找回入口（指向官方文档命令）。
\`\`\`

## 下一步

**对照选型** · **面板上跑 Node**。
`;
