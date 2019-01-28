[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [Traverser](./graph-builder.traverser.md) &gt; [breadthFirst](./graph-builder.traverser.breadthfirst.md)

# Traverser.breadthFirst method

Returns an unmodifiable `Iterable` over the nodes reachable from `startNode`<!-- -->, in the order of a breadth-first traversal. That is, all the nodes of depth 0 are returned, then depth 1, then 2, and so on.

**Signature:**
```javascript
breadthFirst(...startNodes: Array<N>): Iterable<N>;
```
**Returns:** `Iterable<N>`

## Remarks

<b>Example:</b> The following graph with `startNode` `a` would return nodes in the order `abcdef` (assuming successors are returned in alphabetical order).
```
b ---- a ---- d
|      |
|      |
e ---- c ---- f

```
The behavior of this method is undefined if the nodes, or the topology of the graph, change while iteration is in progress.

The returned `Iterable` can be iterated over multiple times. Every iterator will compute its next element on the fly. It is thus possible to limit the traversal to a certain number of nodes as follows:
```
Iterables.limit(Traversers.forGraph(graph).breadthFirst(node), maxNumberOfNodes);

```
See <a href="https://en.wikipedia.org/wiki/Breadth-first_search">Wikipedia</a> for more info.

Throws IllegalArgumentException if `startNode` is not an element of the graph.

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `startNodes` | `Array<N>` |  |

