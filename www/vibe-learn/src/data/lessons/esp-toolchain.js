export default `# 工具链与烧录

> 写 PC 程序：编译/解释 → 进程。  
> 写 ESP32：**交叉编译**（在 PC 上生成板子能执行的固件）→ 经 **串口 / USB** **烧录** 进 Flash。  
> 真源：[ESP-IDF · idf.py](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-guides/tools/idf-py.html) · [建立串口连接](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/establish-serial-connection.html)  
> **学会之后**：能指认一种工具链入口，并口述 \`flash\` / \`monitor\` 与串口排障直觉。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 入口 | Arduino / ESP-IDF / PlatformIO 知其一 |
| 烧录 | 编译 → 下载到片上 Flash |
| 串口 | 看日志与波特率；口名对得上 |
| 边界 | 嵌入式工具链 ≠ pnpm |

\`\`\`algo
{"kind":"flashpipe","title":"交叉编译 → flash → monitor","autoplay":true,"speed":780}
\`\`\`

\`\`\`check
{"title":"ESP 工具链通关","items":[{"id":"chain","text":"能说出至少一条工具链入口（Arduino/IDF/PIO）","hint":"门派"},{"id":"flash","text":"理解 idf.py -p PORT flash 在干什么","hint":"烧录"},{"id":"mon","text":"知道 monitor 看串口日志做验收","hint":"日志"},{"id":"drv","text":"烧录失败先查线/口/驱动/BOOT/权限","hint":"排障"}]}
\`\`\`

## 本课分块

| 块 | 目标 |
|----|------|
| **三条常见工具链** | Arduino / ESP-IDF / PlatformIO |
| **串口与驱动** | 为何要装 USB 转串口驱动 |
| **烧录失败常见因** | 线、口、BOOT、权限 |

---

## 1. 三条工具链（认门派）

| 工具链 | 直觉 |
|--------|------|
| **Arduino 框架 + 板卡包** | 上手快、\`setup\`/\`loop\`；适合入门与原型 |
| **ESP-IDF** | 官方深度框架；\`idf.py\` 管配置/构建/烧录/监视 |
| **PlatformIO** | VS Code / Cursor 里统一多板工具；底层仍可走上述框架 |

没有唯一正确答案：团队文档写哪条，你跟哪条。

\`\`\`mermaid
flowchart LR
  PC[PC 上写代码] --> Build[交叉编译]
  Build --> Bin[固件二进制]
  Bin -->|USB 串口| Flash[写入板载 Flash]
  Flash --> Run[上电运行]
  Run --> Mon[串口 monitor]
\`\`\`

### 官方最小命令（IDF 口径）

\`\`\`bash
idf.py set-target esp32   # 按芯片系列改
idf.py build
idf.py -p PORT flash
idf.py -p PORT monitor
# 可合并：
idf.py -p PORT flash monitor
\`\`\`

\`PORT\`：Windows 常 \`COM3\`；Linux \`/dev/ttyUSB0\`；macOS \`/dev/cu.usbserial-*\`。

---

## 2. 串口（UART over USB）

开发板把芯片的 UART 转到 USB。电脑上会出现 **COM 口**（Windows）或 \`/dev/ttyUSB*\` / \`/dev/cu.*\`（Linux/macOS）。

| 坑 | 处理直觉 |
|----|----------|
| 没驱动 | 装 CH340 / CP210x / FTDI 等对应驱动 |
| 选错口 | 拔插对照设备管理器 / \`ls /dev\` |
| 权限 | Linux 常要把用户加进 \`dialout\` 组 |
| 线只供电不传数据 | 换数据线 |
| 进不了下载模式 | 按 BOOT / 复位时序（依板子丝印） |

---

## 3. 和第一章终端的联系

烧录工具、\`idf.py\`、\`pio\` 都是 **命令行程序** → 要进 **PATH**，或在 IDE 里点按钮（背后仍是这些命令）。  
装工具可用 **brew / apt / 安装器**（见 **安装器与 PATH**）。

## 八股 × 业务串联

| 名词（全称） | 白话（是什么） | 业务里长什么样 | 别和谁搞混 |
|--------------|----------------|----------------|------------|
| **交叉编译（Cross-compile）** | 在 A 架构机器生成 B 架构可执行固件 | PC 编出 Xtensa/RISC-V 镜像 | ≠ 本机 \`node\` 直接跑 |
| **esptool** | 乐鑫生态常用烧录底层工具 | \`idf.py flash\` 背后会调到 | 一般用 idf 前端即可 |
| **idf.py** | ESP-IDF 项目前端 CLI | build / flash / monitor / menuconfig | ≠ Docker Compose |
| **波特率（Baud）** | 串口每秒符号速率 | monitor / 烧录可指定 \`-b\` | 双方不一致会乱码 |
| **分区表（Partition table）** | Flash 里 app/OTA/NVS 等布局 | 量产与 OTA 要设计 | ≠ 磁盘分区表（GPT） |

## 本仓怎么做

| 概念 | 落点 |
|------|------|
| 工具 | 跟官方/团队文档装 IDF 或 Arduino；与 \`pnpm\` 无关 |
| 验收 | 串口能看见日志 = 链路通；再谈联网 |
| 代理 | 拉 IDF 组件若超时，按本机代理规则处理境外源 |

## Coding Agent

\`\`\`prompt
目标：根据我的板子型号，给出最小烧录验收步骤（含 PORT 怎么查）。
现场：OS=…；板子丝印=…；工具链意向=Arduino或IDF=…
约束：不要建议把 XRK 主服装进板子；先点灯/串口日志再 Wi-Fi。
验收：我能说出失败时先查的五件事（线/口/驱动/BOOT/权限）。
\`\`\`

## 下一步

**与云端的关系** — 板子连上网之后谁跟谁说话。
`;
