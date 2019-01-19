[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [hasEdge](./graph-builder.basegraph.hasedge.md)

# BaseGraph.hasEdge method

Returns true if there is an edge that directly connects `nodeU` to `nodeV`<!-- -->. This is equivalent to `nodes().contains(nodeU) && successors(nodeU).contains(nodeV)`<!-- -->.

<p>In an undirected graph, this is equal to `hasEdgeConnecting(nodeV, nodeU)`<!-- -->.

**Signature:**
```javascript
hasEdge(nodeU: N, nodeV: N): boolean;
```
**Returns:** `boolean`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `nodeU` | `N` |  |
|  `nodeV` | `N` |  |

