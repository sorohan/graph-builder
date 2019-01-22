[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [hasEdgeConnectingEndpoints](./graph-builder.basegraph.hasedgeconnectingendpoints.md)

# BaseGraph.hasEdgeConnectingEndpoints method

Returns true if there is an edge that directly connects `endpoints` (in the order, if any, specified by `endpoints`<!-- -->). This is equivalent to `edges().contains(endpoints)`<!-- -->.

Unlike the other `EndpointPair`<!-- -->-accepting methods, this method does not throw if the endpoints are unordered; it simply returns false. This is for consistency with the behavior of Set.has (which does not generally throw if the object cannot be present in the collection), and the desire to have this method's behavior be compatible with `edges().contains(endpoints)`<!-- -->.

**Signature:**
```javascript
hasEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean;
```
**Returns:** `boolean`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `endpoints` | `EndpointPair<N>` |  |

