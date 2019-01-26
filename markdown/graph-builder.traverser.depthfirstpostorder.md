[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [Traverser](./graph-builder.traverser.md) &gt; [depthFirstPostOrder](./graph-builder.traverser.depthfirstpostorder.md)

# Traverser.depthFirstPostOrder method

Returns an unmodifiable `Iterable` over the nodes reachable from `startNode`<!-- -->, in the order of a depth-first post-order traversal. "Post-order" implies that nodes appear in the `Iterable` in the order in which they are visited for the last time.

**Signature:**
```javascript
depthFirstPostOrder(...startNodes: Array<N>): Iterable<N>;
```
**Returns:** `Iterable<N>`

## Remarks

<b>Example:</b> The following graph with `startNode` `a` would return nodes in the order `fcebda` (assuming successors are returned in alphabetical order).
```
b ---- a ---- d
|      |
|      |
e ---- c ---- f

```
The behavior of this method is undefined if the nodes, or the topology of the graph, change while iteration is in progress.

The returned `Iterable` can be iterated over multiple times. Every iterator will compute its next element on the fly. It is thus possible to limit the traversal to a certain number of nodes as follows:
```
Iterables.limit(
    Traversers.forGraph(graph).depthFirstPostOrder(node), maxNumberOfNodes);

```
See <a href="https://en.wikipedia.org/wiki/Depth-first_search">Wikipedia</a> for more info.

Throws IllegalArgumentException if `startNode` is not an element of the graph.

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `startNodes` | `Array<N>` |  |

