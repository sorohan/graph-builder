[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableValueGraph](./graph-builder.mutablevaluegraph.md) &gt; [putEdgeValue](./graph-builder.mutablevaluegraph.putedgevalue.md)

# MutableValueGraph.putEdgeValue method

Adds an edge connecting `nodeU` to `nodeV` if one is not already present, and sets a value for that edge to `value` (overwriting the existing value, if any).

If the graph is directed, the resultant edge will be directed; otherwise, it will be undirected.

Values do not have to be unique.

If `nodeU` and `nodeV` are not already present in this graph, this method will silently [MutableValueGraph.addNode](./graph-builder.mutablevaluegraph.addnode.md) `nodeU` and `nodeV` to the graph.

Throws if the introduction of the edge would violate [BaseGraph.allowsSelfLoops](./graph-builder.basegraph.allowsselfloops.md)

**Signature:**
```javascript
putEdgeValue(nodeU: N, nodeV: N, value: V): V | undefined;
```
**Returns:** `V | undefined`

the value previously associated with the edge connecting `nodeU` to `nodeV`<!-- -->, or undefined if there was no such edge.

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `nodeU` | `N` |  |
|  `nodeV` | `N` |  |
|  `value` | `V` |  |

