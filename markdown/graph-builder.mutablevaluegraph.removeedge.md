[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableValueGraph](./graph-builder.mutablevaluegraph.md) &gt; [removeEdge](./graph-builder.mutablevaluegraph.removeedge.md)

# MutableValueGraph.removeEdge method

Removes the edge connecting `nodeU` to `nodeV`<!-- -->, if it is present.

**Signature:**
```javascript
removeEdge(nodeU: N, nodeV: N): V | undefined;
```
**Returns:** `V | undefined`

the value previously associated with the edge connecting `nodeU` to `nodeV`<!-- -->, or undefined if there was no such edge.

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `nodeU` | `N` |  |
|  `nodeV` | `N` |  |

