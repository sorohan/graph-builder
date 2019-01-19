[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableValueGraph](./graph-builder.mutablevaluegraph.md) &gt; [putEdgeValue](./graph-builder.mutablevaluegraph.putedgevalue.md)

# MutableValueGraph.putEdgeValue method

Adds an edge connecting `nodeU` to `nodeV` if one is not already present, and sets a value for that edge to `value` (overwriting the existing value, if any).

<p>If the graph is directed, the resultant edge will be directed; otherwise, it will be undirected.

<p>Values do not have to be unique. However, values must be non-null.

<p>If `nodeU` and `nodeV` are not already present in this graph, this method will silently addNode `nodeU` and `nodeV` to the graph.

**Signature:**
```javascript
putEdgeValue(nodeU: N, nodeV: N, value: V): V | undefined;
```
**Returns:** `V | undefined`

the value previously associated with the edge connecting `nodeU` to `nodeV`<!-- -->, or null if there was no such edge. throws IllegalArgumentException if the introduction of the edge would violate allowsSelfLoops

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `nodeU` | `N` |  |
|  `nodeV` | `N` |  |
|  `value` | `V` |  |

