/** 面板对照选型 */
export default `# 面板对照选型

> **宝塔** vs **1Panel** vs **不用面板**（纯 SSH + Nginx/Caddy + Docker/systemd）。  
> 选型看**约束**，不看广告星标。

## 对照表（稳定心智）

| 维度 | 宝塔（BT / aaPanel） | 1Panel | 不用面板 |
|------|----------------------|--------|----------|
| 开源 | 核心偏商业产品 | 社区版开源（GPL 等，以仓库为准） | 你选的组件各开源 |
| 系统 | Linux + Windows | **仅 Linux** | 任意你能 SSH 的 |
| 心智 | LNMP/站点/插件生态 | **Docker / 应用商店** | Compose / systemd / IaC |
| 教程量（中文） | 极多 | 较少但在增 | 看各组件官方文档 |
| 账号/绑定 | 常见需账号体系 | 社区版可不强制手机绑定 | 无 |
| 可复现交付 | 弱（点按钮难进 Git） | 中（容器可导出，仍要纪律） | **强**（Git + Compose） |
| 适合 | 快速建站、PHP、要海量教程 | 容器优先、要开源面板 | 团队多环境、合规审计 |

官方入口：宝塔 [docs.bt.cn](https://docs.bt.cn/) · 1Panel [1panel.cn/docs](https://1panel.cn/docs/) · 对照宣传页 [vsbt.1panel.cn](https://vsbt.1panel.cn/)（厂商视角，交叉验证）。

\`\`\`quiz
{"title":"选型","questions":[{"q":"团队要用 Git 推送 + Compose 一键多环境，首选心智？","choices":[{"t":"只学宝塔点按钮，不上 Git","ok":false,"why":"无法复现与协作。"},{"t":"容器/Compose 为主，面板可选","ok":true,"why":"交付可重复。"},{"t":"必须上商业云控制台替代一切","ok":false,"why":"与面板问题正交。"}]},{"q":"只有 Windows Server、要图形化管站？","choices":[{"t":"1Panel","ok":false,"why":"1Panel 仅 Linux。"},{"t":"宝塔 Windows 或其它 Windows 面板 / 纯 IIS 方案","ok":true,"why":"系统约束决定候选集。"},{"t":"必须先装 Docker Desktop 才能有面板","ok":false,"why":"不是前提。"}]}]}
\`\`\`

## 决策树

\`\`\`decide
{"title":"要不要面板","start":"start","steps":[{"id":"start","q":"你的主约束？","options":[{"label":"一个人、要最快出站、大量跟教程","next":"bt"},{"label":"Linux + 想容器化、开源可审计","next":"one"},{"label":"多环境一致、CI 部署、团队协作","next":"none"},{"label":"已有宝塔站要迁走","next":"migrate"}]},{"id":"bt","result":"宝塔可行；仍要学反代/证书/备份。","detail":"去：宝塔 → 面板上跑 Node。"},{"id":"one","result":"1Panel 更贴；弄清安全入口与数据卷。","detail":"去：1Panel → 面板上跑 Node。"},{"id":"none","result":"面板可选甚至不要；主脊走 Nginx/容器/systemd。","detail":"去：容器番外 · systemd · 部署环境。"},{"id":"migrate","result":"先列：站点反代、证书、数据库、cron、上传目录；再迁。","detail":"备份课必读；一次搬一层。"}]}
\`\`\`

## 记住

面板降低的是**操作门槛**，不降低**理解端口 / 权限 / 备份 / 密钥**的必要性。  
本仓部署清单（Node、Redis、配置三同步）**不因换面板而消失**。

## 下一步

**面板上跑 Node** · 或回 **Nginx / 容器 / systemd**。
`;
