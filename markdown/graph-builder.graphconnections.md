[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [GraphConnections](./graph-builder.graphconnections.md)

# GraphConnections interface

An interface for representing and manipulating an origin node's adjacent nodes and edge values in a [Graph](./graph-builder.graph.md)<!-- -->.

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`addPredecessor(node, value)`](./graph-builder.graphconnections.addpredecessor.md) | `void` | Add `node` as a predecessor to the origin node. In the case of an undirected graph, it also becomes a successor. Associates `value` with the edge connecting the two nodes. |
|  [`addSuccessor(node, value)`](./graph-builder.graphconnections.addsuccessor.md) | `V | undefined` | Add `node` as a successor to the origin node. In the case of an undirected graph, it also becomes a predecessor. Associates `value` with the edge connecting the two nodes. Returns the value previously associated with the edge connecting the two nodes. |
|  [`adjacentNodes()`](./graph-builder.graphconnections.adjacentnodes.md) | `Set<N>` |  |
|  [`predecessors()`](./graph-builder.graphconnections.predecessors.md) | `Set<N>` |  |
|  [`removePredecessor(node)`](./graph-builder.graphconnections.removepredecessor.md) | `void` | Remove `node` from the set of predecessors. |
|  [`removeSuccessor(node)`](./graph-builder.graphconnections.removesuccessor.md) | `V | undefined` | Remove `node` from the set of successors. Returns the value previously associated with the edge connecting the two nodes. |
|  [`successors()`](./graph-builder.graphconnections.successors.md) | `Set<N>` |  |
|  [`value(node)`](./graph-builder.graphconnections.value.md) | `V | undefined` | Returns the value associated with the edge connecting the origin node to `node`<!-- -->, or undefined if there is no such edge. |

