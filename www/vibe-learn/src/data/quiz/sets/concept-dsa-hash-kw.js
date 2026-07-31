import { defineQuizSet } from '../schema.js';

export default defineQuizSet({
  id: "concept-dsa-hash-kw",
  title: "基础 · 哈希表名词全表",
  kind: 'concept',
  domain: "dsa",
  tags: ["DSA","哈希","基础"],
  relatedNodes: ["dsa-hash"],
  caption: "哈希、冲突、负载因子、Map/Set/Object——平均 O(1) 查找底座。",
  questions: [
  {
    "id": "concept-dsa-hash-kw:table",
    "q": "哈希表最突出的平均复杂度优势？",
    "choices": [
      {
        "t": "查找/插入平均接近 O(1)",
        "ok": true,
        "why": "哈希表：键经哈希函数落到桶，平均查找/插入近 O(1)。两数之和、计数、去重的常用底座。"
      },
      {
        "t": "最坏也永远 O(1) 且与负载无关",
        "ok": false,
        "why": "与「哈希表（散列表）」不符。"
      },
      {
        "t": "固定比任何排序更慢",
        "ok": false,
        "why": "与「哈希表（散列表）」不符。"
      },
      {
        "t": "只能存字符串",
        "ok": false,
        "why": "与「哈希表（散列表）」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-hash"
    ],
    "tags": [
      "基础",
      "table"
    ]
  },
  {
    "id": "concept-dsa-hash-kw:collision",
    "q": "哈希冲突意味着？",
    "choices": [
      {
        "t": "不同键映射到同一桶，需链址或开放寻址等策略",
        "ok": true,
        "why": "冲突：不同键落到同一桶。用链址或开放寻址处理；冲突多则退化，最坏可至 O(n)。"
      },
      {
        "t": "CPU 过热专用术语",
        "ok": false,
        "why": "与「哈希冲突」不符。"
      },
      {
        "t": "一定表示密钥泄漏",
        "ok": false,
        "why": "与「哈希冲突」不符。"
      },
      {
        "t": "图没有边",
        "ok": false,
        "why": "与「哈希冲突」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-hash"
    ],
    "tags": [
      "基础",
      "collision"
    ]
  },
  {
    "id": "concept-dsa-hash-kw:load",
    "q": "负载因子过高时常见后果？",
    "choices": [
      {
        "t": "冲突增多，性能变差，通常需要扩容",
        "ok": true,
        "why": "负载因子：已用槽位与容量之比。过高冲突增、需扩容；影响常数与退化风险。"
      },
      {
        "t": "自动变成平衡二叉树且无需处理",
        "ok": false,
        "why": "与「负载因子」不符。"
      },
      {
        "t": "网络带宽必然翻倍",
        "ok": false,
        "why": "与「负载因子」不符。"
      },
      {
        "t": "Git 历史被重写",
        "ok": false,
        "why": "与「负载因子」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-hash"
    ],
    "tags": [
      "基础",
      "load"
    ]
  },
  {
    "id": "concept-dsa-hash-kw:map",
    "q": "相对普通对象，JS Map 的常见优势？",
    "choices": [
      {
        "t": "键可以是任意类型，且保持插入顺序可迭代",
        "ok": true,
        "why": "Map：键可为任意类型，插序可迭代；比普通对象更适合当通用字典。"
      },
      {
        "t": "禁止使用 get/set",
        "ok": false,
        "why": "与「Map（JS）」不符。"
      },
      {
        "t": "只能用数字当键",
        "ok": false,
        "why": "与「Map（JS）」不符。"
      },
      {
        "t": "查找一定是 O(n²)",
        "ok": false,
        "why": "与「Map（JS）」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-hash",
      "lang-javascript"
    ],
    "tags": [
      "基础",
      "map"
    ]
  },
  {
    "id": "concept-dsa-hash-kw:set",
    "q": "Set 最贴哪类用途？",
    "choices": [
      {
        "t": "去重与快速判「是否出现过」",
        "ok": true,
        "why": "Set：只要键不要值的集合，天然去重。判存在、滑窗字符集合常用。"
      },
      {
        "t": "必须存键值对且值不能为空",
        "ok": false,
        "why": "与「Set（JS）」不符。"
      },
      {
        "t": "替代排序算法",
        "ok": false,
        "why": "与「Set（JS）」不符。"
      },
      {
        "t": "只能用于 DOM",
        "ok": false,
        "why": "与「Set（JS）」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-hash",
      "lang-javascript"
    ],
    "tags": [
      "基础",
      "set"
    ]
  },
  {
    "id": "concept-dsa-hash-kw:object",
    "q": "用普通对象当字典时要注意？",
    "choices": [
      {
        "t": "键会被转成字符串；原型链可能干扰键名",
        "ok": true,
        "why": "Object：键主要是 string/symbol；注意原型链干扰（可用 Object.create(null)）。简单字符串键场景仍常见。"
      },
      {
        "t": "键可以是任意对象且无任何坑",
        "ok": false,
        "why": "与「Object 当字典」不符。"
      },
      {
        "t": "Object 不能存数字值",
        "ok": false,
        "why": "与「Object 当字典」不符。"
      },
      {
        "t": "一定比 Map 支持任意键类型更好",
        "ok": false,
        "why": "与「Object 当字典」不符。"
      }
    ],
    "relatedNodes": [
      "dsa-hash",
      "lang-javascript"
    ],
    "tags": [
      "基础",
      "object"
    ]
  }
],
});
