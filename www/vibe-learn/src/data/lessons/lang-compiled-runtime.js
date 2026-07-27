/** 编译与运行 */
export default `# 编译型与运行时型

> 源码是给人读的；机器要的是可调度的指令。  
> 差异在于：**翻译发生在何时、由谁完成**。

## 本课分块

\`\`\`flip
{"title":"翻译账单何时付","cards":[{"front":"编译型（AOT）","back":"多在发布前译成机器码/可执行文件；目标平台要匹配。"},{"front":"运行时型","back":"边跑边译（或经 VM）；常要预装运行时。"},{"front":"现实光谱","back":"AOT + JIT、字节码中间层很常见，不是非黑即白。"}]}
\`\`\`

| 块 | 内容 |
|----|------|
| **两条经典路径** | 先编译 vs 靠运行时 |
| **光谱而非二分** | AOT / JIT / 字节码 |
| **对照表** | 分发、启动、改完再跑 |
| **接到 XRK** | 为何本仓盯 Node 版本 |

---

## 1. 两条经典路径

\`\`\`mermaid
flowchart TB
  subgraph aot["编译型 · ahead-of-time"]
    S1[源码] --> C[编译器]
    C --> B["机器码 / 可执行文件"]
    B --> P1["OS 加载为进程"]
  end
  subgraph rt["运行时型"]
    S2[源码] --> R["运行时 / VM"]
    R --> P2[进程内执行]
  end
\`\`\`

### 编译型（ahead-of-time）

- 代表直觉：C、C++、Go、Rust（细节各异）  
- 特点：发布物常是二进制；目标平台要匹配（或交叉编译）

### 解释 / 运行时型（with runtime）

- 代表直觉：Python、Ruby、经典 JavaScript 在引擎中的执行  
- 常配合 **虚拟机 / 字节码**（Java、C#）：先编译到中间码，再由 VM 执行

现实是光谱，不是非黑即白：许多语言 **AOT + JIT** 并存。

---

## 2. 对照表

| | 编译到本地 | 依赖运行时 |
|--|------------|------------|
| 分发 | 常较大、贴平台 | 源码/字节码 + 需预装运行时 |
| 启动 | 可很快 | 先起 VM/引擎 |
| 改完再跑 | 通常要重新编译 | 改完即可再执行（或热重载） |

\`\`\`match
{"title":"分发与启动直觉","pairs":[{"id":"dist","left":"贴平台二进制","right":"常见于编译型分发"},{"id":"rt","left":"源码 + 预装运行时","right":"常见于运行时型分发"},{"id":"jit","left":"边跑边优化","right":"JIT 一类，光谱中间态"}]}
\`\`\`

\`\`\`html5
<figure>
  <svg viewBox="0 0 520 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="翻译时机">
    <text x="20" y="28" fill="currentColor" font-size="12" opacity="0.75">编译型：翻译多发生在「发布前」</text>
    <rect x="20" y="40" width="200" height="16" rx="4" fill="currentColor" opacity="0.25"/>
    <text x="20" y="84" fill="currentColor" font-size="12" opacity="0.75">运行时型：翻译持续发生在「执行中」</text>
    <rect x="20" y="96" width="320" height="16" rx="4" fill="currentColor" opacity="0.25"/>
  </svg>
  <figcaption>同一份源码，翻译账单可能提前付清，也可能边跑边付</figcaption>
</figure>
\`\`\`

---

## 3. 和 XRK 的关系

XRK-AGT 主体是 **JavaScript，跑在 Node.js 运行时上**——属于「需要运行时」的一支。  
因此第一章才强调 Node 版本与 PATH；不是故意刁难，是语言交付模型决定的。

## 下一步

**语言版图** — 把更多语言放进层次，而不是背排行榜。
`;
