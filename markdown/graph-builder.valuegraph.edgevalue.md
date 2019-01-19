[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ValueGraph](./graph-builder.valuegraph.md) &gt; [edgeValue](./graph-builder.valuegraph.edgevalue.md)

# ValueGraph.edgeValue method

Returns the value of the edge that connects `nodeU` to `nodeV` (in the order, if any, specified by `endpoints`<!-- -->), if one is present; otherwise, returns `Optional.empty()`<!-- -->.

throws IllegalArgumentException if `nodeU` or `nodeV` is not an element of this graph

**Signature:**
```javascript
edgeValue(nodeU: N, nodeV: N): V | undefined;
```
**Returns:** `V | undefined`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `nodeU` | `N` |  |
|  `nodeV` | `N` |  |

