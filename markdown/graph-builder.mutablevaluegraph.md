[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableValueGraph](./graph-builder.mutablevaluegraph.md)

# MutableValueGraph interface

A subinterface of [ValueGraph](./graph-builder.valuegraph.md) which adds mutation methods. When mutation is not required, users should prefer the [ValueGraph](./graph-builder.valuegraph.md) interface.

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`addNode(node)`](./graph-builder.mutablevaluegraph.addnode.md) | `boolean` | Adds `node` if it is not already present.<p/><p><b>Nodes must be unique</b>, just as `Map` keys must be. They must also be non-null. |
|  [`putEdgeValue(nodeU, nodeV, value)`](./graph-builder.mutablevaluegraph.putedgevalue.md) | `V | undefined` | Adds an edge connecting `nodeU` to `nodeV` if one is not already present, and sets a value for that edge to `value` (overwriting the existing value, if any).<p/><p>If the graph is directed, the resultant edge will be directed; otherwise, it will be undirected.<p/><p>Values do not have to be unique. However, values must be non-null.<p/><p>If `nodeU` and `nodeV` are not already present in this graph, this method will silently addNode `nodeU` and `nodeV` to the graph. |
|  [`putEdgeValueConnectingEndpoints(endpoints, value)`](./graph-builder.mutablevaluegraph.putedgevalueconnectingendpoints.md) | `V | undefined` | Adds an edge connecting `endpoints` if one is not already present, and sets a value for that edge to `value` (overwriting the existing value, if any).<p/><p>If the graph is directed, the resultant edge will be directed; otherwise, it will be undirected.<p/><p>If this graph is directed, `endpoints` must be ordered.<p/><p>Values do not have to be unique. However, values must be non-null.<p/><p>If either or both endpoints are not already present in this graph, this method will silently addNode each missing endpoint to the graph. |
|  [`removeEdge(nodeU, nodeV)`](./graph-builder.mutablevaluegraph.removeedge.md) | `V | undefined` | Removes the edge connecting `nodeU` to `nodeV`<!-- -->, if it is present. |
|  [`removeEdgeConnectingEndpoints(endpoints)`](./graph-builder.mutablevaluegraph.removeedgeconnectingendpoints.md) | `V | undefined` | Removes the edge connecting `endpoints`<!-- -->, if it is present.<p/><p>If this graph is directed, `endpoints` must be ordered. |
|  [`removeNode(node)`](./graph-builder.mutablevaluegraph.removenode.md) | `boolean` | Removes `node` if it is present; all edges incident to `node` will also be removed. |

