[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableValueGraph](./graph-builder.mutablevaluegraph.md) &gt; [putEdgeValueConnectingEndpoints](./graph-builder.mutablevaluegraph.putedgevalueconnectingendpoints.md)

# MutableValueGraph.putEdgeValueConnectingEndpoints method

Adds an edge connecting `endpoints` if one is not already present, and sets a value for that edge to `value` (overwriting the existing value, if any).

If the graph is directed, the resultant edge will be directed; otherwise, it will be undirected.

If this graph is directed, `endpoints` must be ordered.

Values do not have to be unique.

If either or both endpoints are not already present in this graph, this method will silently [MutableValueGraph.addNode](./graph-builder.mutablevaluegraph.addnode.md) each missing endpoint to the graph.

Throws if the introduction of the edge would violate [BaseGraph.allowsSelfLoops](./graph-builder.basegraph.allowsselfloops.md)

Throws if the endpoints are unordered and the graph is directed

**Signature:**
```javascript
putEdgeValueConnectingEndpoints(endpoints: EndpointPair<N>, value: V): V | undefined;
```
**Returns:** `V | undefined`

the value previously associated with the edge connecting `nodeU` to `nodeV`<!-- -->, or undefined if there was no such edge.

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `endpoints` | `EndpointPair<N>` |  |
|  `value` | `V` |  |

