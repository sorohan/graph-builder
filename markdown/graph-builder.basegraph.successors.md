[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [successors](./graph-builder.basegraph.successors.md)

# BaseGraph.successors method

Returns all nodes in this graph adjacent to `node` which can be reached by traversing `node`<!-- -->'s outgoing edges in the direction (if any) of the edge.

In an undirected graph, this is equivalent to [BaseGraph.adjacentNodes](./graph-builder.basegraph.adjacentnodes.md)<!-- -->.

This is <i>not</i> the same as "all nodes reachable from `node` by following outgoing edges". For that functionality, see Graphs.reachableNodes<!-- -->.

Throws an error if `node` is not an element of this graph.

**Signature:**
```javascript
successors(node: N): Set<N>;
```
**Returns:** `Set<N>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

