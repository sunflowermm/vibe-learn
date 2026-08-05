export default `# HTML / CSS（语言）

> **分类：语言。** HTML = **标记语言**（结构/语义）；CSS = **样式语言**（表现/布局）。  
> **不是框架。** Vue/React **编译后仍产出** HTML/CSS/JS，挂到本仓 \`core/*/www/\`。  
> 本仓 **无 HTML 子服** — 浏览器直接解析；主服只**静态挂载**产物。

## 学会之后（验收）

| 能力 | 成功信号 |
|------|----------|
| 分层 | HTML 结构、CSS 表现；行为常是 JS |
| 框架关系 | Vue/React 最终仍产出 HTML/CSS/JS |
| 本仓 | www 静态页必备基础，不是后端语言 |
| 跟 Agent | 改样式时分清结构/表现/行为三层 |


## 本课你要带走什么

1. **什么场景手写 HTML/CSS、什么场景必须用框架**  
2. DOM、层叠、盒模型、Flex/Grid 等特性怎么讲清  
3. 在本仓 www 里从源码到 \`/应用名/\` 的完整路径

---

## 1. 使用场景：何时用、何时不用

\`\`\`flip
{"title":"HTML/CSS · 身份翻卡","cards":[{"front":"HTML/CSS","back":"结构与样式；不是通用后端语言"},{"front":"语言 ≠","back":"某一个框架或某一个云产品"},{"front":"接到本仓","back":"主服 JS；其它语言多在子服"}]}
\`\`\`

### 1.1 适合手写 / 直接写 HTML·CSS 的场景

| 场景 | 为什么 |
|------|--------|
| **落地页、文档站、邮件模板** | 结构简单；无需构建 |
| **本仓普通静态 www** | \`core/*/www/<应用>/\` 直接挂目录 |
| **SEO 关键页** | 服务端或静态 HTML 可被爬虫直读 |
| **组件库的「最终产物层」** | Vue SFC 编译后仍是 HTML 元素 + class |
| **无障碍与语义 baseline** | 语义标签、\`alt\`、\`label\` 与框架无关 |
| **学习浏览器工作原理** | DevTools 里看到的永远是 DOM + CSSOM |

### 1.2 不适合纯手写、应上框架/工程化的场景

| 场景 | 更好选择 | 原因 |
|------|----------|------|
| **复杂 SPA 状态与路由** | **Vue / React** | 手写 DOM 更新不可维护 |
| **大型组件复用与设计系统** | 框架 + UI 库 | 一致性 |
| **本仓 vibe-learn 级交互** | Vue + Vite 工程 | 模块化、HMR |
| **只在 JS 里拼 HTML 字符串** | 模板/JSX/ SFC | XSS 与可维护性 |
| **全站 CSS 无组织** | CSS Modules / Tailwind / scoped | 特异性战争 |
| **把业务逻辑写进 HTML** | **JavaScript** | 关注点分离 |

### 1.3 与 JavaScript / Vue / React 怎么选（口述）

| 需求 | 更偏向 |
|------|--------|
| 结构、语义、表单控件 | **HTML** |
| 布局、主题、响应式 | **CSS** |
| 交互、请求、状态 | **JavaScript** |
| 大型前端工程 | **Vue/React**（产出仍含 HTML/CSS） |

\`\`\`mermaid
flowchart TB
  Dev[开发者写 Vue/SFC 或手写] --> Build[构建可选]
  Build --> Out[HTML + CSS + JS 产物]
  Out --> Mount[主服 mountCoreWwwStatic]
  Mount --> Browser[浏览器解析渲染]
\`\`\`

---

## 2. 语言特性（必须讲清楚）

### 2.1 HTML

| 特性 | 讲清楚 |
|------|--------|
| **元素 + 属性** | \`<tag attr="…">\`；结构即数据 |
| **文档树 DOM** | 嵌套成树；JS/框架操作的对象模型 |
| **语义化** | \`header/nav/main/article/button\`；SEO/a11y |
| **块级 / 行内** | 默认排版；CSS \`display\` 可改 |
| **替换元素** | \`img/video/input\` 有内在尺寸 |
| **表单** | \`name\`、原生校验、提交；SPA 仍底层是控件 |
| **可访问性** | \`alt\`、\`label for\`、\`aria-*\`、焦点顺序、键盘 |
| **元数据** | \`meta charset/viewport\`、\`title\`、Open Graph |

HTML **不负责**复杂逻辑 — **JavaScript**；**不负责**布局算法细节 — **CSS**。

### 2.2 CSS — 层叠与优先级

| 点 | 说明 |
|----|------|
| **来源** | 浏览器默认 < 用户 < 作者；\`!important\` 另算 |
| **特异性** | 内联 > ID > 类/属性/伪类 > 元素；再比顺序 |
| **继承** | \`color\`/\`font\` 等向下；\`margin\` 等不继承 |
| **\`@layer\`（现代）** | 显式层叠顺序，减特异性战 |

### 2.3 CSS — 盒模型

| 点 | 说明 |
|----|------|
| **content + padding + border + margin** | 尺寸从哪算起 |
| **\`box-sizing: border-box\`** | 工程默认习惯 |
| **外边距合并** | 垂直 margin 折叠；BFC 可隔开 |

### 2.4 CSS — 布局

| 方案 | 何时用 |
|------|--------|
| **普通流** | 文档默认 |
| **Flex** | 一维对齐、导航、卡片行 |
| **Grid** | 二维页面骨架 |
| **定位** | \`relative/absolute/fixed/sticky\` |
| **浮动** | 遗留；现代少用主布局 |
| **容器查询** | 组件级响应式（\`@container\`） |

### 2.5 CSS — 视觉与性能

| 点 | 说明 |
|----|------|
| **BFC** | 独立格式化上下文 |
| **层叠上下文** | \`z-index\` 非全局排序 |
| **回流 / 重绘 / 合成** | 几何变 vs 外观变；\`transform/opacity\` 常走 GPU |
| **响应式** | 媒体查询、\`clamp\`、相对单位、移动优先 |
| **变量** | \`--token\` 设计系统基础 |

\`\`\`mermaid
flowchart TB
  HTML[HTML 结构] --> CSS[CSS 计算样式]
  CSS --> Box[盒模型]
  Box --> Lay[布局]
  Lay --> Paint[绘制/合成]
  JS[JS/框架] -->|改 DOM/样式| CSS
\`\`\`

---

## 3. 工具链

| 工具 | 作用 |
|------|------|
| **浏览器 DevTools** | Elements、Computed、Layout |
| **验证器** | W3C HTML/CSS 校验（可选） |
| **PostCSS / Autoprefixer** | 构建期补前缀 |
| **Tailwind / Sass** | 工程化 CSS（仍是 CSS 产物） |
| **Vite** | 本仓 www 常配合；\`pnpm build\` |

---

## 4. 与本仓

| 步骤 | 含义 |
|------|------|
| 1 | \`core/<Core>/www/<应用名>/\` 放页面或前端工程 |
| 2 | **普通静态**：直接挂；手写 HTML/CSS/JS |
| 3 | **前端工程**：\`sign.json\` + Vite；\`pnpm build\` → 挂 **\`dist\`** |
| 4 | 访问 \`/<应用名>/\`（如 \`/vibe-learn/\`） |

| 项 | 说明 |
|----|------|
| **挂载** | \`mountCoreWwwStatic\`（Runtime） |
| **vibe-learn** | Vue 组织源码 → 构建 → HTML/CSS/JS → 静态挂载 |
| **浏览器 ≠ Node 26** | www 用 \`web-compat.js\` 语义内联，勿假设 Node API |
| **主服** | 不提供「HTML 解释器」；只 serve 静态文件 |

详见 **Vue**、**HTTP 与 www**、skill **xrk-www-compat**。

---

## 5. 大厂真题

| 题 | 答法要点 |
|----|----------|
| 盒模型 / BFC | 定义、触发、用途 |
| 居中方案 | Flex/Grid/定位+transform |
| 回流重绘 | 如何减少；合成层 |
| 优先级计算 | 权重与 \`!important\` |
| 语义化好处 | SEO、a11y、可维护 |
| Flex vs Grid | 一维 vs 二维 |

---

## 高星仓库（读源码 / 对照本仓）

> stars 量为公开量级参考（会变）；重点是**学什么**与**本仓落点**，不是追星。

| 仓库 | 量级参考 | 学什么 | 对本仓落点 |
|------|----------|--------|------------|
| [mdn/content](https://github.com/mdn/content) | ⭐ 九千级 | HTML/CSS 规范释义、可检索范例 | **www** 页面语义与样式真源习惯 |
| [web-platform-tests/wpt](https://github.com/web-platform-tests/wpt) | ⭐ 五千级 | 浏览器互操作测试、标准符合性 | 理解「浏览器 ≠ Node」；对照 \`web-compat\` |
| [necolas/normalize.css](https://github.com/necolas/normalize.css) | ⭐ 五万级 | 跨浏览器基线样式 | 产品 www 重置/基线策略参考 |

---

## 6. 下一步

**JavaScript** · **Vue / React** · **HTTP 与 www** · **xrk-www-compat** · **语言栈**。  
可选：在 MDN 查一个布局属性，再对照本仓 www 构建产物怎么挂载。
## 导图2 · 前端 / 组件 / JavaScript × 标记与样式

> HTML/CSS 不是「编程语言」同一档，但是前端栈必备。框架最终仍产出它们。

| 导图2 | Vibe 口语 | 本课专业落点 |
|-------|-----------|--------------|
| **前端** | 页面结构与样式 | HTML 结构、CSS 表现 |
| **JavaScript** | 行为 | 三者常一起出现；语言身份仍是 JS |
| **组件** | 框架里的块 | SFC/JSX 编译后仍是 HTML/CSS/JS |
短表只对齐口语；定义走面板「跨导图」或自动附录。验收与禁区仍以本课为准。
`;
