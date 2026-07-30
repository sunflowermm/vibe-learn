/** 对象与数组 */
export default `# 对象与数组

> **数组**：有序列表。**对象**：键值表。JSON 与 API 载荷的底座。

\`\`\`javascript
const xs = [10, 20, 30]
xs.push(40)
const doubled = xs.map((n) => n * 2)

const user = { id: 1, name: 'aya' }
const { name } = user
const copy = { ...user, name: 'bob' }
\`\`\`

\`\`\`match
{"title":"结构配对","pairs":[{"id":"a","left":"[]","right":"有序、下标访问"},{"id":"o","left":"{}","right":"键 → 值"},{"id":"m","left":"map/filter","right":"由数组派生新数组"}]}
\`\`\`

| 点 | 说明 |
|----|------|
| 引用赋值 | \`const b = a\` 可能共享同一对象 |
| 浅拷贝 | \`{...obj}\`、\`[...arr]\` |
| JSON 往返 | 简单深拷贝有限制（丢函数等） |

## 下一步

**模块** — 把函数和对象分到多个文件。
`;
