[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableGraph](./graph-builder.mutablegraph.md)

# MutableGraph interface

A subinterface of [Graph](./graph-builder.graph.md) which adds mutation methods. When mutation is not required, users should prefer the [Graph](./graph-builder.graph.md) interface.

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`addNode(node)`](./graph-builder.mutablegraph.addnode.md) | `boolean` | Adds `node` if it is not already present.<p/><p><b>Nodes must be unique</b>, just as `Map` keys must be. They must also be non-null. |
|  [`putEdge(nodeU, nodeV)`](./graph-builder.mutablegraph.putedge.md) | `boolean` | Adds an edge connecting `nodeU` to `nodeV` if one is not already present.<p/><p>If the graph is directed, the resultant edge will be directed; otherwise, it will be undirected.<p/><p>If `nodeU` and `nodeV` are not already present in this graph, this method will silently addNode `nodeU` and `nodeV` to the graph. |
|  [`putEdgeConnectingEndpoints(endpoints)`](./graph-builder.mutablegraph.putedgeconnectingendpoints.md) | `boolean` | Adds an edge connecting `endpoints` (in the order, if any, specified by `endpoints` if one is not already present.<p/><p>If this graph is directed, `endpoints` must be ordered and the added edge will be directed; if it is undirected, the added edge will be undirected.<p/><p>If this graph is directed, `endpoints` must be ordered.<p/><p>If either or both endpoints are not already present in this graph, this method will silently addNode each missing endpoint to the graph. |
|  [`removeEdge(nodeU, nodeV)`](./graph-builder.mutablegraph.removeedge.md) | `boolean` | Removes the edge connecting `nodeU` to `nodeV`<!-- -->, if it is present. |
|  [`removeEdgeConnectingEndpoints(endpoints)`](./graph-builder.mutablegraph.removeedgeconnectingendpoints.md) | `boolean` | Removes the edge connecting `endpoints`<!-- -->, if it is present.<p/><p>If this graph is directed, `endpoints` must be ordered.<p/>throws IllegalArgumentException if the endpoints are unordered and the graph is directed |
|  [`removeNode(node)`](./graph-builder.mutablegraph.removenode.md) | `boolean` | Removes `node` if it is present; all edges incident to `node` will also be removed. |

