[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableValueGraph](./graph-builder.mutablevaluegraph.md) &gt; [removeEdgeConnectingEndpoints](./graph-builder.mutablevaluegraph.removeedgeconnectingendpoints.md)

# MutableValueGraph.removeEdgeConnectingEndpoints method

Removes the edge connecting `endpoints`<!-- -->, if it is present.

<p>If this graph is directed, `endpoints` must be ordered.

**Signature:**
```javascript
removeEdgeConnectingEndpoints(endpoints: EndpointPair<N>): V | undefined;
```
**Returns:** `V | undefined`

the value previously associated with the edge connecting `endpoints`<!-- -->, or null if there was no such edge.

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `endpoints` | `EndpointPair<N>` |  |

