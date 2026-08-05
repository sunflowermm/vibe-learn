export default `# 番外 · ESP32 与嵌入式

> 把序章「CPU / 存储 / GPIO 直觉」伸到 **单片机 / 物联网开发板**。  
> 本框钉：**MCU 和 PC 差在哪、ESP32 是什么、怎么烧录、和云端 Agent 怎么接线（概念）**。  
> 真源：[ESP-IDF Programming Guide](https://docs.espressif.com/projects/esp-idf/) · 串口连接 / \`idf.py flash monitor\`。  
> **不**替代 KiCad / 打板专书；画板细节见本机硬件技能，不进本仓业务 \`core/\`。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分层 | MCU/固件轨与本仓 Node 主服不混 |
| 工具链 | 知道烧录/串口与云上后端不是同一套 |
| 接线 | 能口述设备 ↔ MQTT/HTTP ↔ Agent |
| 按需 | 未做物联网边缘时可后置本框 |

## 为何单独开番外

\`\`\`steps
{"title":"ESP 番外路径","steps":[{"title":"MCU 是什么","body":"资源与外设边界。"},{"title":"ESP32","body":"具体平台与开发板分层。"},{"title":"工具链","body":"交叉编译与烧录。"},{"title":"联网","body":"边缘与云侧 Agent 分层。"}]}
\`\`\`

学完 PC 侧 Runtime 后，很多人会碰到「板子上的 Wi-Fi 芯片」：  
**ESP32** 是当前极火的嵌入式平台之一。把它放进知识图谱，是为了 **补全「从云到物」**，不是让 XRK-AGT 主服去跑在 ESP32 上。

## 知识结构

\`\`\`mermaid
flowchart TB
  M[序章 · 处理单元] --> MCU[MCU 是什么]
  MCU --> E[ESP32 是什么]
  E --> T[工具链与烧录]
  E --> L[与云端 / Agent 的关系]
  L -.-> XRK[第四章 · 本仓仍是 Node 主服]
\`\`\`

## 章专属动画（分镜）

| 课 | kind | 钉什么 |
|----|------|--------|
| MCU | \`mcuvspc\` | MCU vs PC 交付模型 |
| ESP32 | \`espboard\` | USB → 板 → SoC → 无线/IO |
| 工具链 | \`flashpipe\` | 交叉编译 → flash → monitor |
| 云端关系 | \`edgelink\` | 固件 → 协议 → 云 → Agent |

## 节点速查

| 节点 | 钉什么 |
|------|--------|
| **MCU 是什么** | 单片机 vs PC；实时、资源紧 |
| **ESP32** | Wi-Fi/蓝牙 SoC 家族；常见开发板 |
| **工具链与烧录** | Arduino / ESP-IDF / PlatformIO；串口 |
| **与云端的关系** | 设备侧固件 ↔ 云侧 Agent；边界 |

## 建议读法

1. **MCU** → **ESP32** → **工具链**  
2. **与云端的关系**（建立分层，别混进程模型）  
3. 需要画板时再开本机 PCB 技能；与本学习站解耦  

## 与正章关系

| 章 | 关系 |
|----|------|
| **序章** | CPU/外设/中断在 MCU 上更「贴金属」 |
| **语言 · C** | 固件大量 C/C++；Rust 等也可 |
| **网络** | 板子上的 Wi-Fi/TCP 仍是协议栈，只是资源更紧 |
| **XRK** | 主服在 PC/服务器；ESP32 是边缘设备，经 MQTT/HTTP 等对话 |

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 主服 | 始终 Node ≥ 26 + pnpm；设备离线 ≠ Runtime 挂 |
| 接入 | HTTP Core + 鉴权；MQTT 需另选 Broker |
| 硬件 | 不进 \`core/\` 业务目录 |
`;
