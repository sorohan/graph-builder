[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [Traverser](./graph-builder.traverser.md)

# Traverser interface

An object that can traverse the nodes that are reachable from a specified (set of) start node(s) using a specified [SuccessorsFunction](./graph-builder.successorsfunction.md)<!-- -->.

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`breadthFirst(startNodes)`](./graph-builder.traverser.breadthfirst.md) | `Iterable<N>` | Returns an unmodifiable `Iterable` over the nodes reachable from `startNode`<!-- -->, in the order of a breadth-first traversal. That is, all the nodes of depth 0 are returned, then depth 1, then 2, and so on. |
|  [`depthFirstPostOrder(startNodes)`](./graph-builder.traverser.depthfirstpostorder.md) | `Iterable<N>` | Returns an unmodifiable `Iterable` over the nodes reachable from `startNode`<!-- -->, in the order of a depth-first post-order traversal. "Post-order" implies that nodes appear in the `Iterable` in the order in which they are visited for the last time. |
|  [`depthFirstPreOrder(startNodes)`](./graph-builder.traverser.depthfirstpreorder.md) | `Iterable<N>` | Returns an unmodifiable `Iterable` over the nodes reachable from `startNode`<!-- -->, in the order of a depth-first pre-order traversal. "Pre-order" implies that nodes appear in the `Iterable` in the order in which they are first visited. |

