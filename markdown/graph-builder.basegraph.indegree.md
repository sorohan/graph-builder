[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [inDegree](./graph-builder.basegraph.indegree.md)

# BaseGraph.inDegree method

Returns the count of `node`<!-- -->'s incoming edges (equal to `predecessors(node).size()`<!-- -->) in a directed graph. In an undirected graph, returns the degree<!-- -->.

<p>If the count is greater than `Integer.MAX_VALUE`<!-- -->, returns `Integer.MAX_VALUE`<!-- -->.

throws IllegalArgumentException if `node` is not an element of this graph

**Signature:**
```javascript
inDegree(node: N): number;
```
**Returns:** `number`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

