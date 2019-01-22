[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableGraph](./graph-builder.mutablegraph.md) &gt; [removeEdgeConnectingEndpoints](./graph-builder.mutablegraph.removeedgeconnectingendpoints.md)

# MutableGraph.removeEdgeConnectingEndpoints method

Removes the edge connecting `endpoints`<!-- -->, if it is present.

If this graph is directed, `endpoints` must be ordered.

Throws if the endpoints are unordered and the graph is directed.

**Signature:**
```javascript
removeEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean;
```
**Returns:** `boolean`

`true` if the graph was modified as a result of this call

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `endpoints` | `EndpointPair<N>` |  |

