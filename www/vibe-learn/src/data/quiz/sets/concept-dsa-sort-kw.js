import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-dsa-sort-kw",
  title: "基础 · 排序与二分全表",
  kind: 'concept',
  domain: "dsa",
  tags: ["DSA","排序","二分","基础"],
  relatedNodes: ["dsa-sort"],
  caption: "快排、归并、堆排、稳定性、二分——会开口边界与前提。",
  questions: [
  {
    "id": "concept-dsa-sort-kw:quick",
    "q": "快排需要口头补的边界？",
    "choices": [
      {
        "t": "平均 O(n log n)，最坏可到 O(n²)，通常不稳定",
        "ok": true,
        "why": "快排：平均 O(n log n)，最坏 O(n²)；不稳定；常数好。随机枢轴改善最坏。"
      },
      {
        "t": "最坏也永远 O(n)",
        "ok": false,
        "why": "与「快速排序」不符。"
      },
      {
        "t": "一定稳定",
        "ok": false,
        "why": "与「快速排序」不符。"
      },
      {
        "t": "平均是 O(2ⁿ)",
        "ok": false,
        "why": "与「快速排序」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-sort"
    ],
    "tags": [
      "基础",
      "quick"
    ]
  },
  {
    "id": "concept-dsa-sort-kw:merge",
    "q": "归并排序相对快排的突出点？",
    "choices": [
      {
        "t": "最坏也 O(n log n) 且稳定，但通常要额外空间",
        "ok": true,
        "why": "归并：始终 O(n log n)，稳定，需额外 O(n) 空间；外排友好。"
      },
      {
        "t": "不稳定且最坏 O(n²)",
        "ok": false,
        "why": "与「归并排序」不符。"
      },
      {
        "t": "禁止使用额外空间且一定不稳定",
        "ok": false,
        "why": "与「归并排序」不符。"
      },
      {
        "t": "只能排链表不能排数组",
        "ok": false,
        "why": "与「归并排序」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-sort"
    ],
    "tags": [
      "基础",
      "merge"
    ]
  },
  {
    "id": "concept-dsa-sort-kw:heap_sort",
    "q": "堆排序的常见标签？",
    "choices": [
      {
        "t": "O(n log n)、可原地、通常不稳定",
        "ok": true,
        "why": "堆排：O(n log n)，原地，不稳定；常数常不如快排。优先队列思想同源。"
      },
      {
        "t": "平均 O(n²) 且稳定",
        "ok": false,
        "why": "与「堆排序」不符。"
      },
      {
        "t": "需要 O(n) 额外数组且最坏指数",
        "ok": false,
        "why": "与「堆排序」不符。"
      },
      {
        "t": "只能排两个元素",
        "ok": false,
        "why": "与「堆排序」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-sort",
      "dsa-tree"
    ],
    "tags": [
      "基础",
      "heap_sort"
    ]
  },
  {
    "id": "concept-dsa-sort-kw:stable",
    "q": "稳定排序的含义？",
    "choices": [
      {
        "t": "关键字相等的元素，排序后相对顺序与原先一致",
        "ok": true,
        "why": "稳定：相等元素相对次序不变。多关键字排序时重要；归并典型稳定，快排/堆排通常不。"
      },
      {
        "t": "算法永不崩溃",
        "ok": false,
        "why": "与「排序稳定性」不符。"
      },
      {
        "t": "时间一定是 O(1)",
        "ok": false,
        "why": "与「排序稳定性」不符。"
      },
      {
        "t": "只能用于字符串",
        "ok": false,
        "why": "与「排序稳定性」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-sort"
    ],
    "tags": [
      "基础",
      "stable"
    ]
  },
  {
    "id": "concept-dsa-sort-kw:binary",
    "q": "二分查找的前提？",
    "choices": [
      {
        "t": "序列对答案单调（常为有序），才能每次排除一半",
        "ok": true,
        "why": "二分：序列对答案单调（有序是特例），O(log n)。统一区间开闭、防中点溢出、分清找左/右边界。"
      },
      {
        "t": "任意无序数组都能直接二分",
        "ok": false,
        "why": "与「二分查找」不符。"
      },
      {
        "t": "时间一定是 O(n²)",
        "ok": false,
        "why": "与「二分查找」不符。"
      },
      {
        "t": "必须用递归且禁止循环",
        "ok": false,
        "why": "与「二分查找」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-sort"
    ],
    "tags": [
      "基础",
      "binary"
    ]
  }
],
});
