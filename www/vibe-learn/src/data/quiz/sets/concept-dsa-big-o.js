import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-dsa-big-o",
  title: "基础 · 复杂度阶全表",
  kind: 'concept',
  domain: "dsa",
  tags: ["DSA","复杂度","基础"],
  relatedNodes: ["dsa-complexity"],
  caption: "O(1)/log n/n/n log n/n²/2ⁿ、空间、平均 vs 最坏——开口先报增长趋势。",
  questions: [
  {
    "id": "concept-dsa-big-o:o1",
    "q": "O(1) 表示？",
    "choices": [
      {
        "t": "耗时（或空间）不随输入规模 n 增长，近似常量",
        "ok": true,
        "why": "O(1)：与输入规模无关的常量时间（如数组下标、哈希平均查找）。大 O 描述增长趋势，不是墙上秒数。"
      },
      {
        "t": "一定比 O(n) 在所有机器上更慢",
        "ok": false,
        "why": "与「O(1)」不符。"
      },
      {
        "t": "源码行数必须为一行",
        "ok": false,
        "why": "与「O(1)」不符。"
      },
      {
        "t": "等于最坏情况指数爆炸",
        "ok": false,
        "why": "与「O(1)」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-complexity"
    ],
    "tags": [
      "基础",
      "o1"
    ]
  },
  {
    "id": "concept-dsa-big-o:olog",
    "q": "O(log n) 最贴哪类过程？",
    "choices": [
      {
        "t": "每次排除一半规模，如有序数组上的二分",
        "ok": true,
        "why": "O(log n)：每次排除一部分（常砍一半），如二分查找。规模翻倍，步数只加一常数量级。"
      },
      {
        "t": "双重嵌套全扫",
        "ok": false,
        "why": "与「O(log n)」不符。"
      },
      {
        "t": "未剪枝的全排列",
        "ok": false,
        "why": "与「O(log n)」不符。"
      },
      {
        "t": "与 n 无关的常量下标访问",
        "ok": false,
        "why": "与「O(log n)」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-complexity",
      "dsa-sort"
    ],
    "tags": [
      "基础",
      "olog"
    ]
  },
  {
    "id": "concept-dsa-big-o:on",
    "q": "对长度 n 的数组扫一遍，时间常？",
    "choices": [
      {
        "t": "O(n)",
        "ok": true,
        "why": "O(n)：与输入规模成线性，扫一遍数组是典型。"
      },
      {
        "t": "O(1)",
        "ok": false,
        "why": "与「O(n)」不符。"
      },
      {
        "t": "O(n²)",
        "ok": false,
        "why": "与「O(n)」不符。"
      },
      {
        "t": "O(2ⁿ)",
        "ok": false,
        "why": "与「O(n)」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-complexity"
    ],
    "tags": [
      "基础",
      "on"
    ]
  },
  {
    "id": "concept-dsa-big-o:onlog",
    "q": "高效比较排序的常见平均时间阶？",
    "choices": [
      {
        "t": "O(n log n)",
        "ok": true,
        "why": "O(n log n)：分治排序级，如快排平均、堆排、归并。许多「先排序再处理」的下界直觉落在这。"
      },
      {
        "t": "只能是 O(1)",
        "ok": false,
        "why": "与「O(n log n)」不符。"
      },
      {
        "t": "一定是 O(n²)",
        "ok": false,
        "why": "与「O(n log n)」不符。"
      },
      {
        "t": "一定是 O(2ⁿ)",
        "ok": false,
        "why": "与「O(n log n)」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-complexity",
      "dsa-sort"
    ],
    "tags": [
      "基础",
      "onlog"
    ]
  },
  {
    "id": "concept-dsa-big-o:on2",
    "q": "两层 for 都跑满长度 n，时间常？",
    "choices": [
      {
        "t": "O(n²)",
        "ok": true,
        "why": "O(n²)：双重循环同长 n 全扫常见。简单两数之和暴力即此类。"
      },
      {
        "t": "O(log n)",
        "ok": false,
        "why": "与「O(n²)」不符。"
      },
      {
        "t": "O(1)",
        "ok": false,
        "why": "与「O(n²)」不符。"
      },
      {
        "t": "与 n 无关",
        "ok": false,
        "why": "与「O(n²)」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-complexity"
    ],
    "tags": [
      "基础",
      "on2"
    ]
  },
  {
    "id": "concept-dsa-big-o:oexp",
    "q": "未剪枝穷举子集/递归斐波那契常见风险？",
    "choices": [
      {
        "t": "时间呈指数级膨胀，很快不可用",
        "ok": true,
        "why": "O(2ⁿ) / O(n!)：未剪枝回溯、朴素递归斐波那契等，规模稍大即不可用；常靠记忆化/DP 压下来。"
      },
      {
        "t": "一定是 O(1)",
        "ok": false,
        "why": "与「O(2ⁿ) / 指数」不符。"
      },
      {
        "t": "永远比 O(n) 更快",
        "ok": false,
        "why": "与「O(2ⁿ) / 指数」不符。"
      },
      {
        "t": "与输入规模无关",
        "ok": false,
        "why": "与「O(2ⁿ) / 指数」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-complexity",
      "dsa-dp"
    ],
    "tags": [
      "基础",
      "oexp"
    ]
  },
  {
    "id": "concept-dsa-big-o:space",
    "q": "谈空间复杂度时主要指？",
    "choices": [
      {
        "t": "算法额外使用的内存（含递归栈）随 n 如何增长",
        "ok": true,
        "why": "空间复杂度：额外开了多大表/递归栈。O(1) 额外空间≠不能改输入（看题意）；递归深度 n 常至少 O(n) 栈。"
      },
      {
        "t": "硬盘品牌型号",
        "ok": false,
        "why": "与「空间复杂度」不符。"
      },
      {
        "t": "仅源文件字节数",
        "ok": false,
        "why": "与「空间复杂度」不符。"
      },
      {
        "t": "HTTP 状态码",
        "ok": false,
        "why": "与「空间复杂度」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-complexity"
    ],
    "tags": [
      "基础",
      "space"
    ]
  },
  {
    "id": "concept-dsa-big-o:avg_worst",
    "q": "分析快排或哈希时更稳妥的说法？",
    "choices": [
      {
        "t": "分别说明平均与最坏（或均摊），不要混成一个数",
        "ok": true,
        "why": "平均 vs 最坏：快排/哈希要分清。面试开口应说明讨论的是哪一种，勿混成一个数。"
      },
      {
        "t": "只报最好情况并当成保证",
        "ok": false,
        "why": "与「平均 vs 最坏」不符。"
      },
      {
        "t": "复杂度与输入规模无关所以不用说",
        "ok": false,
        "why": "与「平均 vs 最坏」不符。"
      },
      {
        "t": "最坏一定等于平均",
        "ok": false,
        "why": "与「平均 vs 最坏」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-complexity",
      "dsa-hash",
      "dsa-sort"
    ],
    "tags": [
      "基础",
      "avg_worst"
    ]
  }
],
});
