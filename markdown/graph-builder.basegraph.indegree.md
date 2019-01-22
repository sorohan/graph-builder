[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [inDegree](./graph-builder.basegraph.indegree.md)

# BaseGraph.inDegree method

Returns the count of `node`<!-- -->'s incoming edges (equal to `predecessors(node).size()`<!-- -->) in a directed graph. In an undirected graph, returns the [BaseGraph.degree](./graph-builder.basegraph.degree.md)<!-- -->.

Throws an error if `node` is not an element of this graph.

**Signature:**
```javascript
inDegree(node: N): number;
```
**Returns:** `number`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

