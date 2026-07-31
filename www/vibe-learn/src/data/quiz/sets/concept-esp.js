import { defineQuizSet } from '../schema.js';

/** MCU / ESP32：嵌入式边界、烧录、与云/Agent 协作安全 */
export default defineQuizSet({
  id: 'concept-esp',
  title: '概念 · MCU / ESP32',
  kind: 'concept',
  domain: 'ops',
  tags: ['ESP32', '嵌入式', 'MCU'],
  relatedNodes: ['esp-mcu', 'esp-esp32', 'esp-toolchain'],
  caption: '资源紧、常联网；固件要烧录，凭证勿进仓。',
  questions: [
    {
      id: 'concept-esp:mcu',
      q: '微控制器（MCU）相对桌面或服务器上的通用 PC，主要差别是什么？',
      choices: [
        {
          t: '面向嵌入控制，算力与内存更紧，常长期跑固件任务',
          ok: true,
          why: '强调低功耗与实时控制，不是跑大型桌面 OS。',
        },
        {
          t: 'MCU 一定比服务器 CPU 更强，所以用来替数据中心',
          ok: false,
          why: '服务器面向高吞吐通用计算；MCU 资源量级不同。',
        },
        {
          t: 'MCU 就是云上的虚拟机实例',
          ok: false,
          why: '云 VM 是虚拟化通用主机；MCU 是物理芯片上的嵌入式系统。',
        },
        {
          t: 'MCU 不能连接任何网络，只能单机裸跑',
          ok: false,
          why: '许多 MCU（如 ESP32）带 Wi-Fi/蓝牙，可联网。',
        },
      ],
      relatedNodes: ['esp-mcu', 'chip-units'],
    },
    {
      id: 'concept-esp:esp32',
      q: '乐鑫 ESP32 这类开发板，常见具备哪些能力？',
      choices: [
        {
          t: 'Wi-Fi/蓝牙等无线连接，并可烧录自定义固件',
          ok: true,
          why: '无线 + 可编程，常用于 IoT 与原型。',
        },
        {
          t: '只能运行完整 Windows 桌面与 Office 套件',
          ok: false,
          why: '资源不够跑桌面 OS；通常跑 FreeRTOS/Arduino 等。',
        },
        {
          t: '专门替代全球域名系统（DNS）根服务器',
          ok: false,
          why: '是边缘设备，不是根 DNS。',
        },
        {
          t: '出厂后固件不可更改，只能当黑盒使用',
          ok: false,
          why: '可通过串口/USB 反复烧录，这正是开发板用途。',
        },
      ],
      relatedNodes: ['esp-esp32', 'esp-mcu'],
    },
    {
      id: 'concept-esp:flash',
      q: '嵌入式开发里的「工具链 + 烧录」主要解决什么问题？',
      choices: [
        {
          t: '把编译好的固件写入芯片 Flash，并支持调试与日志',
          ok: true,
          why: '不烧录则代码只在电脑上，芯片不会执行你的逻辑。',
        },
        {
          t: '自动编写后端 HTTP 接口与数据库迁移脚本',
          ok: false,
          why: '工具链服务嵌入式构建；业务 API 要自己写。',
        },
        {
          t: '向证书颁发机构申请 HTTPS TLS 证书',
          ok: false,
          why: '证书是 Web 运维话题；烧录是灌固件。',
        },
        {
          t: '替代 Git 管理源代码版本历史',
          ok: false,
          why: '版本仍用 Git；烧录是部署到硬件的一步。',
        },
      ],
      relatedNodes: ['esp-toolchain', 'esp-esp32'],
    },
    {
      id: 'concept-esp:security',
      q: 'ESP32 设备与云端或 Agent 协同时，课程强调的安全边界是什么？',
      choices: [
        {
          t: '设备可上报/受控，但仍需鉴权、加密与最小权限',
          ok: true,
          why: '联网设备也是攻击面；不能裸奔 MQTT。',
        },
        {
          t: '芯片可以直接修改你 GitHub 上的提交历史',
          ok: false,
          why: 'Git 历史由仓库权限保护；MCU 无此能力。',
        },
        {
          t: '嵌入式设备完全不需要任何网络协议知识',
          ok: false,
          why: 'Wi-Fi、TCP/IP、MQTT/HTTP 都是联网常识。',
        },
        {
          t: '为了省事，可以把 Wi-Fi 密码硬编码进固件并公开仓库',
          ok: false,
          why: '凭证不应进 Git；用 provisioning 或安全存储。',
        },
      ],
      relatedNodes: ['esp-link', 'craft-security', 'esp-esp32'],
    },
    {
      id: 'concept-esp:serial',
      q: '板子插上 USB 后「串口没输出 / 烧录失败」，较稳妥的第一步？',
      choices: [
        {
          t: '核对驱动、正确 COM/tty 口、波特率，以及是否按住 BOOT 进下载模式',
          ok: true,
          why: '工具链连错口或未进下载模式是高频坑。',
        },
        {
          t: '立刻格式化电脑系统盘',
          ok: false,
          why: '过激且与串口无关。',
        },
        {
          t: '把固件二进制直接 commit 进公开仓当日志',
          ok: false,
          why: '既不排障，还可能含密钥与体积垃圾。',
        },
        {
          t: '关掉所有 USB 电源管理并永远禁用串口',
          ok: false,
          why: '禁用串口等于放弃调试通道。',
        },
      ],
      relatedNodes: ['esp-toolchain', 'esp-esp32', 'workbench-troubleshoot'],
      tags: ['场景'],
    },
    {
      id: 'concept-esp:cloud',
      q: '设备要把传感器数据交给本仓 Agent/HTTP 服务，更稳妥的边界？',
      choices: [
        {
          t: '设备走受鉴权的 API/MQTT；密钥与证书在设备侧安全配置，服务端校验身份与配额',
          ok: true,
          why: '与 esp-link 课一致：链路可通，权限要收。',
        },
        {
          t: '设备直连生产库 root，跳过应用层',
          ok: false,
          why: '扩大攻击面；边缘设备不应握库特权。',
        },
        {
          t: '明文 HTTP 且无鉴权，方便「先跑通」就永久上线',
          ok: false,
          why: '演示可临时，上线必须鉴权与加密。',
        },
        {
          t: '把云端私钥烧进每块板并公开原理图附件',
          ok: false,
          why: '私钥不能批量硬编码进可物理接触的设备。',
        },
      ],
      relatedNodes: ['esp-link', 'xrk-http-auth', 'craft-security'],
      tags: ['场景'],
    },
  ],
});
