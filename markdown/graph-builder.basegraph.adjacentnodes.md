[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [adjacentNodes](./graph-builder.basegraph.adjacentnodes.md)

# BaseGraph.adjacentNodes method

Returns the nodes which have an incident edge in common with `node` in this graph.

throws IllegalArgumentException if `node` is not an element of this graph

**Signature:**
```javascript
adjacentNodes(node: N): Set<N>;
```
**Returns:** `Set<N>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

