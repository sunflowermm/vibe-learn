import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: 'concept-adev',
  title: '概念 · Vibe Coding 与项目记忆',
  kind: 'concept',
  domain: 'xrk',
  tags: ['Vibe', 'AGENTS', '形态'],
  relatedNodes: ['adev-vibe-coding', 'adev-compare', 'adev-project-memory'],
  questions: [
    {
      q: 'Vibe Coding 五拍流程里，在 IDE 点 Accept 接受 Agent 代码改动之前，必做哪一步？',
      choices: [
        { t: '审 diff（看改了哪些文件）+ 本机跑通验收（确认行为符合预期）', ok: true, why: 'vibe 心智：Agent 可能越界改 src/ 或引入 bug，Accept 前必须人工把关。' },
        { t: '无脑全盘 Accept，Agent 输出一定正确，看 diff 是浪费时间', ok: false, why: '反模式；必须审查改动并在本机验证，否则错误会直接进入工作区。' },
        { t: '先把 API 密钥写进仓库方便 Agent 连库，Accept 后再从 Git 历史删除', ok: false, why: '密钥禁止进仓；Git 历史会永久保留，删文件也泄漏。' },
        { t: 'Accept 前只需确认 Agent 回复是否礼貌，不必跑代码或看 diff', ok: false, why: '工程验收看行为是否正确，语气友好不等于代码可运行。' },
      ],
    },
    {
      q: '「形态黄页」课要解决的核心问题是什么？',
      choices: [
        { t: '分清 CLI、IDE Agent、浏览器扩展等形态各自适用什么场景', ok: true, why: 'adev-compare：不同工具形态能力边界不同，选型前先认清「谁在什么环境里干活」。' },
        { t: '背诵所有 AI 编程产品的官网报价与订阅套餐明细', ok: false, why: '形态课讲能力边界与场景匹配，不是比价或背报价表。' },
        { t: '证明全世界只需要一种 AI 工具，其他形态都可以淘汰', ok: false, why: 'CLI、IDE、Web 各有适用面，形态课强调按场景选而非唯一种类。' },
        { t: '形态黄页专讲 XRK Loader 如何扫描 plugin/ 目录', ok: false, why: 'Loader 属 XRK 架构课；形态黄页是对外 AI 开发工具形态对比。' },
      ],
    },
    {
      q: '给 Agent 做「项目记忆」交底时，应优先维护哪类可移植文件？',
      choices: [
        { t: 'AGENTS.md、skills/ 等版本化文件，各工具对齐同一套事实', ok: true, why: 'project-memory：clone 仓库后 Cursor、Claude 等都能读到边界与规范。' },
        { t: '维护两套互相矛盾的 AGENTS.md，让 Agent 自己判断听哪套', ok: false, why: '矛盾说明导致行为不可预测；应对齐事实到一份交底。' },
        { t: '把生产数据库密码写进 AGENTS.md，Agent 才能自动连库调试', ok: false, why: '密钥禁止进仓；项目记忆只写规则与能力，不写机密。' },
        { t: '项目记忆只能写在 IDE 本地缓存，仓库里不需要任何 md 文件', ok: false, why: '可移植交底必须进仓库，团队共享与 CI Agent 才能读到。' },
      ],
    },
    {
      q: '路径 A（会用 Agent 写代码）的验收标准，更接近下面哪一条？',
      choices: [
        { t: '改动能本机跑通、边界清楚（不越界改 src/）、diff 可复查', ok: true, why: '主脊验收：可运行 + 守边界 + 可 review，不是聊天语气好不好。' },
        { t: 'Agent 回复语气友好、emoji 用得恰当即可，代码能不能跑无所谓', ok: false, why: '路径 A 是工程能力线，必须验证代码行为，不能只看对话体验。' },
        { t: '可以跳过测试、日志和 diff 审查，Accept 全部改动就算毕业', ok: false, why: '工程卫生要求审 diff、跑验收；跳过等于把风险留给生产。' },
        { t: '路径 A 验收只看是否用了最贵的模型，与代码质量无关', ok: false, why: '验收看改动是否可运行、可复查，与模型价格无关。' },
      ],
    },
    {
      q: '委派 Agent 改部署、端口或权限相关配置时，你仍应注意什么？',
      choices: [
        { t: '仍要懂端口/权限/回滚思路，审输出，勿盲信 Agent 一键上线', ok: true, why: '工程卫生：部署失误影响面大，人工确认备份与回滚路径不可省。' },
        { t: '部署任务可以完全不用看 Agent 输出，Accept 后直接去度假', ok: false, why: '部署改动需人工确认端口、防火墙、Secrets 等，不能全自动盲信。' },
        { t: '改生产环境前可以跳过备份，Agent 说没问题就一定安全', ok: false, why: '生产变更前应有备份与回滚方案，Agent 无法保证零失误。' },
        { t: '委派部署后不必理解改了什么，只要服务能启动一次就够', ok: false, why: '应理解改动内容与权限影响，否则故障时无法快速回滚。' },
      ],
    },
  ],
});
