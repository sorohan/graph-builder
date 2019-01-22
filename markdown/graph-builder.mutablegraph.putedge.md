[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableGraph](./graph-builder.mutablegraph.md) &gt; [putEdge](./graph-builder.mutablegraph.putedge.md)

# MutableGraph.putEdge method

Adds an edge connecting `nodeU` to `nodeV` if one is not already present.

If the graph is directed, the resultant edge will be directed; otherwise, it will be undirected.

If `nodeU` and `nodeV` are not already present in this graph, this method will silently [MutableGraph.addNode](./graph-builder.mutablegraph.addnode.md) `nodeU` and `nodeV` to the graph.

Throws if the introduction of the edge would violate [BaseGraph.allowsSelfLoops](./graph-builder.basegraph.allowsselfloops.md)<!-- -->.

**Signature:**
```javascript
putEdge(nodeU: N, nodeV: N): boolean;
```
**Returns:** `boolean`

`true` if the graph was modified as a result of this call

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `nodeU` | `N` |  |
|  `nodeV` | `N` |  |

