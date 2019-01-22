[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ValueGraph](./graph-builder.valuegraph.md) &gt; [edgeValueConnectingEndpoints](./graph-builder.valuegraph.edgevalueconnectingendpoints.md)

# ValueGraph.edgeValueConnectingEndpoints method

Returns the value of the edge that connects `endpoints` (in the order, if any, specified by `endpoints`<!-- -->), if one is present; otherwise, returns undefined.

If this graph is directed, the endpoints must be ordered.

Throws if either endpoint is not an element of this graph.

Throws if the endpoints are unordered and the graph is directed.

**Signature:**
```javascript
edgeValueConnectingEndpoints(endpoints: EndpointPair<N>): V | undefined;
```
**Returns:** `V | undefined`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `endpoints` | `EndpointPair<N>` |  |

