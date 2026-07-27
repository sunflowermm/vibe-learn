/** ESP32 与云端 / Agent */
export default `# 与云端 / Agent 的关系

> ESP32 跑 **固件**；XRK-AGT 跑 **Node 主服**。  
> 二者是 **两台机器（两个进程世界）经网络协作**，不是「把 AgentRuntime 塞进 ESP32」。

## 本课分块

| 块 | 目标 |
|----|------|
| **分层** | 设备侧 / 网关 / 云侧 |
| **常见协议** | HTTP、MQTT、WebSocket |
| **和本仓边界** | 主服能力停在服务器 |

---

## 1. 分层图

\`\`\`mermaid
flowchart TB
  ESP[ESP32 固件<br/>采数 / 控脚 / 联网] -->|MQTT / HTTP| Gw[可选：家庭网关 / Broker]
  Gw --> Cloud[云主机 / 本机 XRK]
  Cloud --> Agent[Agent / 业务 Core]
  Agent -->|下行命令| ESP
\`\`\`

| 层 | 干什么 |
|----|--------|
| **设备侧** | 实时读传感器、关继电器；断网策略要本地想好 |
| **消息通道** | MQTT 主题、HTTP API、厂商云 |
| **云侧 / Agent** | 聚合、推理、鉴权、写库；资源够跑 Node/Python |

---

## 2. 别混的几句话

| 说法 | 对不对 |
|------|--------|
| 「ESP32 上跑 Docker」 | 一般 **不对**（资源与架构不符；有实验项目但不是入门默认） |
| 「用 pnpm 给板子装依赖」 | **不对**；固件用 IDF/Arduino 依赖体系 |
| 「板子 HTTP POST 到本仓 API」 | **可以**（注意鉴权、内网穿透、功耗） |
| 「主服 fail-fast 因为 ESP32 离线」 | **不应**；设备离线是业务态，不是 Runtime 必需中间件 |

---

## 3. 学习路径建议

1. 先会 **点灯 + 串口日志**  
2. 再 **连 Wi-Fi + 发一条 HTTP/MQTT**  
3. 需要云侧智能时，再接到 **本仓 HTTP / 子服**，两边契约写清楚  

画原理图 / 打板：走本机 PCB 技能，与 vibe-learn 课程分离。

## 八股 × 业务串联

> 面试/自学常考名词。**缩写一律展开**；先懂白话再记英文。

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **MCU**（Microcontroller Unit，微控制器） | 集成 CPU+外设的控制芯片 | ESP32、STM32 | 别和 **MPU**/应用处理器或整台 PC 混 |
| **SoC**（System on Chip） | 单芯片上集成更多功能块 | ESP32 含无线等 | SoC 范围比「纯 MCU」营销词更宽，看具体芯片 |
| **RTOS**（Real-Time Operating System，实时操作系统） | 面向实时任务调度的薄 OS | FreeRTOS 常见于 ESP | 不是 Linux 桌面；也不是 Docker |
| **MQTT**（Message Queuing Telemetry Transport） | 轻量发布/订阅消息协议 | 物联网遥测常用 | 别和 HTTP 完全等同；模式不同 |
| **OTA**（Over-The-Air，空中升级） | 联网更新固件 | 量产设备远程升级 | 不是「网页热更新前端」那套 |

## 下一步

回 **ESP32 / 工具链**；云侧继续第四章 **HTTP / 数据与缓存**。  
`;
