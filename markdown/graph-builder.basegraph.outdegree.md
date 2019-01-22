[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [outDegree](./graph-builder.basegraph.outdegree.md)

# BaseGraph.outDegree method

Returns the count of `node`<!-- -->'s outgoing edges (equal to `successors(node).size()`<!-- -->) in a directed graph. In an undirected graph, returns the [BaseGraph.degree](./graph-builder.basegraph.degree.md)<!-- -->.

Throws an error if `node` is not an element of this graph.

**Signature:**
```javascript
outDegree(node: N): number;
```
**Returns:** `number`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

