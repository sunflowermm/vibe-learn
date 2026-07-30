import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-esp',
  title: '概念 · MCU / ESP32',
  kind: 'concept',
  domain: 'ops',
  tags: ['ESP32', '嵌入式', 'MCU'],
  relatedNodes: [
    'esp-mcu',
    'esp-esp32',
    'esp-toolchain',
    'esp-link',
    'chip-units',
  ],
  questions: [
    {
      q: '微控制器（MCU）相对桌面或服务器上的通用 PC，主要差别是什么？',
      choices: [
        {
          t: '面向嵌入控制，算力与内存更紧，常长期跑固件任务',
          ok: true,
          why: 'MCU 强调低功耗与实时控制，不是跑大型桌面操作系统。',
        },
        {
          t: 'MCU 一定比服务器 CPU 更强，所以用来替数据中心',
          ok: false,
          why: '服务器 CPU 面向高吞吐通用计算；MCU 资源量级不同。',
        },
        {
          t: 'MCU 就是云上的虚拟机实例',
          ok: false,
          why: '云 VM 是虚拟化通用主机；MCU 是物理芯片上的嵌入式系统。',
        },
        {
          t: 'MCU 不能连接任何网络，只能单机裸跑',
          ok: false,
          why: '许多 MCU（如 ESP32）带 Wi-Fi/蓝牙，可联网上报数据。',
        },
      ],
    },
    {
      q: '乐鑫 ESP32 这类开发板，常见具备哪些能力？',
      choices: [
        {
          t: 'Wi-Fi/蓝牙等无线连接，并可烧录自定义固件',
          ok: true,
          why: 'ESP32 因无线 + 可编程固件，常用于 IoT 与原型验证。',
        },
        {
          t: '只能运行完整 Windows 桌面与 Office 套件',
          ok: false,
          why: '资源不足以跑桌面 OS；通常跑 FreeRTOS/Arduino 等嵌入式栈。',
        },
        {
          t: '专门替代全球域名系统（DNS）根服务器',
          ok: false,
          why: 'DNS 是互联网基础设施；ESP32 是边缘设备，不是根 DNS。',
        },
        {
          t: '出厂后固件不可更改，只能当黑盒使用',
          ok: false,
          why: '可通过串口/USB 反复烧录更新固件，这正是开发板用途。',
        },
      ],
    },
    {
      q: '嵌入式开发里的「工具链 + 烧录」主要解决什么问题？',
      choices: [
        {
          t: '把编译好的固件写入芯片 Flash，并支持调试与日志',
          ok: true,
          why: '没有烧录，代码只停留在电脑上，芯片不会执行你的逻辑。',
        },
        {
          t: '自动编写后端 HTTP 接口与数据库迁移脚本',
          ok: false,
          why: '工具链服务嵌入式 C/C++；业务 API 要在服务器或固件里自己写。',
        },
        {
          t: '向证书颁发机构申请 HTTPS  TLS 证书',
          ok: false,
          why: '证书是 Web 运维话题；烧录是把程序灌进 MCU。',
        },
        {
          t: '替代 Git 管理源代码版本历史',
          ok: false,
          why: '版本管理仍用 Git；烧录是部署到硬件的一步。',
        },
      ],
    },
    {
      q: 'ESP32 设备与云端或 Agent 协同时，课程强调的安全边界是什么？',
      choices: [
        {
          t: '设备可上报/受控，但仍需鉴权、加密与最小权限',
          ok: true,
          why: '联网设备也是攻击面；不能因为是「小芯片」就裸奔 MQTT。',
        },
        {
          t: '芯片可以直接修改你 GitHub 上的提交历史',
          ok: false,
          why: 'Git 历史由版本库权限保护；MCU 无此能力也不应如此设计。',
        },
        {
          t: '嵌入式设备完全不需要任何网络协议知识',
          ok: false,
          why: 'Wi-Fi、TCP/IP、MQTT/HTTP 都是联网设备必备常识。',
        },
        {
          t: '为了省事，可以把 Wi-Fi 密码硬编码进固件并公开仓库',
          ok: false,
          why: '与后端密钥一样，凭证不应进 Git；应使用 provisioning 或安全存储。',
        },
      ],
    },
  ],
});
