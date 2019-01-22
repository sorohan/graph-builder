[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableGraph](./graph-builder.mutablegraph.md) &gt; [putEdgeConnectingEndpoints](./graph-builder.mutablegraph.putedgeconnectingendpoints.md)

# MutableGraph.putEdgeConnectingEndpoints method

Adds an edge connecting `endpoints` (in the order, if any, specified by `endpoints` if one is not already present.

If this graph is directed, `endpoints` must be ordered and the added edge will be directed; if it is undirected, the added edge will be undirected.

If this graph is directed, `endpoints` must be ordered.

If either or both endpoints are not already present in this graph, this method will silently [MutableGraph.addNode](./graph-builder.mutablegraph.addnode.md) each missing endpoint to the graph.

Throws if the introduction of the edge would violate [BaseGraph.allowsSelfLoops](./graph-builder.basegraph.allowsselfloops.md)<!-- -->.

Throws if the endpoints are unordered and the graph is directed.

**Signature:**
```javascript
putEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean;
```
**Returns:** `boolean`

`true` if the graph was modified as a result of this call

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `endpoints` | `EndpointPair<N>` |  |

