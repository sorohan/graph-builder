[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [PredecessorsFunction](./graph-builder.predecessorsfunction.md) &gt; [\_\_call](./graph-builder.predecessorsfunction.__call.md)

# PredecessorsFunction.\_\_call method

Returns all nodes in this graph adjacent to `node` which can be reached by traversing `node`<!-- -->'s incoming edges <i>against</i> the direction (if any) of the edge.

Some algorithms that operate on a `PredecessorsFunction` may produce undesired results if the returned `Iterable` contains duplicate elements. Implementations of such algorithms should document their behavior in the presence of duplicates.

The elements of the returned `Iterable` must each be unique to the graph.

Throws if `node` is not an element of this graph.

**Signature:**
```javascript
(node: N): Iterable<N>;
```
**Returns:** `Iterable<N>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

