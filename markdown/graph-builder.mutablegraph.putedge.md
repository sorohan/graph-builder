[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableGraph](./graph-builder.mutablegraph.md) &gt; [putEdge](./graph-builder.mutablegraph.putedge.md)

# MutableGraph.putEdge method

Adds an edge connecting `nodeU` to `nodeV` if one is not already present.

<p>If the graph is directed, the resultant edge will be directed; otherwise, it will be undirected.

<p>If `nodeU` and `nodeV` are not already present in this graph, this method will silently addNode `nodeU` and `nodeV` to the graph.

**Signature:**
```javascript
putEdge(nodeU: N, nodeV: N): boolean;
```
**Returns:** `boolean`

`true` if the graph was modified as a result of this call throws IllegalArgumentException if the introduction of the edge would violate allowsSelfLoops

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `nodeU` | `N` |  |
|  `nodeV` | `N` |  |

