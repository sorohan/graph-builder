[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [successors](./graph-builder.basegraph.successors.md)

# BaseGraph.successors method

Returns all nodes in this graph adjacent to `node` which can be reached by traversing `node`<!-- -->'s outgoing edges in the direction (if any) of the edge.

<p>In an undirected graph, this is equivalent to adjacentNodes<!-- -->.

<p>This is <i>not</i> the same as "all nodes reachable from `node` by following outgoing edges". For that functionality, see Graphs.reachableNodes<!-- -->.

throws IllegalArgumentException if `node` is not an element of this graph

**Signature:**
```javascript
successors(node: N): Set<N>;
```
**Returns:** `Set<N>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

