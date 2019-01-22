[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableValueGraph](./graph-builder.mutablevaluegraph.md)

# MutableValueGraph interface

A subinterface of [ValueGraph](./graph-builder.valuegraph.md) which adds mutation methods. When mutation is not required, users should prefer the [ValueGraph](./graph-builder.valuegraph.md) interface.

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`addNode(node)`](./graph-builder.mutablevaluegraph.addnode.md) | `boolean` | Adds `node` if it is not already present.<p/><b>Nodes must be unique</b>, just as `Map` keys must be. |
|  [`putEdgeValue(nodeU, nodeV, value)`](./graph-builder.mutablevaluegraph.putedgevalue.md) | `V | undefined` | Adds an edge connecting `nodeU` to `nodeV` if one is not already present, and sets a value for that edge to `value` (overwriting the existing value, if any).<p/>If the graph is directed, the resultant edge will be directed; otherwise, it will be undirected.<p/>Values do not have to be unique.<p/>If `nodeU` and `nodeV` are not already present in this graph, this method will silently [MutableValueGraph.addNode](./graph-builder.mutablevaluegraph.addnode.md) `nodeU` and `nodeV` to the graph.<p/>Throws if the introduction of the edge would violate [BaseGraph.allowsSelfLoops](./graph-builder.basegraph.allowsselfloops.md) |
|  [`putEdgeValueConnectingEndpoints(endpoints, value)`](./graph-builder.mutablevaluegraph.putedgevalueconnectingendpoints.md) | `V | undefined` | Adds an edge connecting `endpoints` if one is not already present, and sets a value for that edge to `value` (overwriting the existing value, if any).<p/>If the graph is directed, the resultant edge will be directed; otherwise, it will be undirected.<p/>If this graph is directed, `endpoints` must be ordered.<p/>Values do not have to be unique.<p/>If either or both endpoints are not already present in this graph, this method will silently [MutableValueGraph.addNode](./graph-builder.mutablevaluegraph.addnode.md) each missing endpoint to the graph.<p/>Throws if the introduction of the edge would violate [BaseGraph.allowsSelfLoops](./graph-builder.basegraph.allowsselfloops.md)<p/>Throws if the endpoints are unordered and the graph is directed |
|  [`removeEdge(nodeU, nodeV)`](./graph-builder.mutablevaluegraph.removeedge.md) | `V | undefined` | Removes the edge connecting `nodeU` to `nodeV`<!-- -->, if it is present. |
|  [`removeEdgeConnectingEndpoints(endpoints)`](./graph-builder.mutablevaluegraph.removeedgeconnectingendpoints.md) | `V | undefined` | Removes the edge connecting `endpoints`<!-- -->, if it is present.<p/>If this graph is directed, `endpoints` must be ordered. |
|  [`removeNode(node)`](./graph-builder.mutablevaluegraph.removenode.md) | `boolean` | Removes `node` if it is present; all edges incident to `node` will also be removed. |

