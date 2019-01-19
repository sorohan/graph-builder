[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ValueGraph](./graph-builder.valuegraph.md) &gt; [edgeValueConnectingEndpointsOrDefault](./graph-builder.valuegraph.edgevalueconnectingendpointsordefault.md)

# ValueGraph.edgeValueConnectingEndpointsOrDefault method

Returns the value of the edge that connects `endpoints` (in the order, if any, specified by `endpoints`<!-- -->), if one is present; otherwise, returns `defaultValue`<!-- -->.

<p>If this graph is directed, the endpoints must be ordered.

throws IllegalArgumentException if either endpoint is not an element of this graph throws IllegalArgumentException if the endpoints are unordered and the graph is directed

**Signature:**
```javascript
edgeValueConnectingEndpointsOrDefault<R>(endpoints: EndpointPair<N>, defaultValue: R): V | R;
```
**Returns:** `V | R`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `endpoints` | `EndpointPair<N>` |  |
|  `defaultValue` | `R` |  |

