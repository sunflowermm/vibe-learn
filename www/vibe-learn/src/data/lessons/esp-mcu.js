/** MCU 是什么 */
export default `# MCU 是什么

> **MCU（Microcontroller Unit，微控制器 / 单片机）**：把 CPU 核、内存、常用外设（GPIO、UART、ADC…）集成在一颗芯片上，专为 **嵌入式控制** 设计。  
> 对比你天天用的 **PC / 服务器**：MCU 通常更小、更省电、实时性要求不同，**不跑完整桌面 OS**（或只跑很薄的 RTOS）。

## 本课分块

| 块 | 目标 |
|----|------|
| **MCU vs PC** | 资源与职责 |
| **常见外设名** | GPIO / UART / I2C / SPI |
| **固件** | 烧进芯片里跑的程序 |
| **和容器/云的边界** | 别把 Docker 思维硬套板子 |

---

## 1. MCU vs PC / 服务器

| | **MCU（如 ESP32）** | **PC / 云主机** |
|--|---------------------|-----------------|
| 内存 / 存储 | KB～数 MB 级常见 | GB～TB |
| OS | 常无完整 Linux，或 FreeRTOS 等 | Windows / Linux 桌面或服务器 |
| 任务 | 读传感器、控电机、连 Wi-Fi 上报 | 跑浏览器、数据库、AgentRuntime |
| 开发 | 交叉编译 → **烧录** | 装运行时 → 直接执行 |

\`\`\`mermaid
flowchart LR
  Sens[传感器 / 按键] --> MCU[MCU]
  MCU --> Act[LED / 电机 / 继电器]
  MCU -->|Wi-Fi / 蓝牙| Cloud[手机 / 云 / 网关]
\`\`\`

---

## 2. 外设名词（先认门）

| 名词 | 白话 |
|------|------|
| **GPIO**（General-Purpose Input/Output） | 通用输入输出脚：高低电平 |
| **UART**（串口） | 两根线传字节；烧录/日志常用 |
| **I2C / SPI** | 板上芯片互连的常见总线 |
| **ADC** | 模拟电压转数字 |

细节因芯片手册而异；面试能说清「脚 / 总线 / 固件」分层即可。

---

## 3. 固件（Firmware）

烧进 Flash、上电就跑的程序叫 **固件**。  
改逻辑 → 重新编译 → **烧录（flash）** → 复位。  
这和 PC 上 \`pnpm install && node app\` 的「改完重启进程」节奏不同。

## 下一步

**ESP32** — 一颗具体、极火的 Wi-Fi MCU 家族。  
`;
