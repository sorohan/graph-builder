[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [predecessors](./graph-builder.basegraph.predecessors.md)

# BaseGraph.predecessors method

Returns all nodes in this graph adjacent to `node` which can be reached by traversing `node`<!-- -->'s incoming edges <i>against</i> the direction (if any) of the edge.

In an undirected graph, this is equivalent to [BaseGraph.adjacentNodes](./graph-builder.basegraph.adjacentnodes.md)<!-- -->.

Throws an error if `node` is not an element of this graph.

**Signature:**
```javascript
predecessors(node: N): Set<N>;
```
**Returns:** `Set<N>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

