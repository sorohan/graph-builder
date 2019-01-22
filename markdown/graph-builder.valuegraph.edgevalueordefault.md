[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ValueGraph](./graph-builder.valuegraph.md) &gt; [edgeValueOrDefault](./graph-builder.valuegraph.edgevalueordefault.md)

# ValueGraph.edgeValueOrDefault method

Returns the value of the edge that connects `nodeU` to `nodeV`<!-- -->, if one is present; otherwise, returns `defaultValue`<!-- -->.

In an undirected graph, this is equal to `edgeValueOrDefault(nodeV, nodeU, defaultValue)`<!-- -->.

Throws if `nodeU` or `nodeV` is not an element of this graph.

**Signature:**
```javascript
edgeValueOrDefault<R>(nodeU: N, nodeV: N, defaultValue: R): V | R;
```
**Returns:** `V | R`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `nodeU` | `N` |  |
|  `nodeV` | `N` |  |
|  `defaultValue` | `R` |  |

