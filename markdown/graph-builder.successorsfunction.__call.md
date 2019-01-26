[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [SuccessorsFunction](./graph-builder.successorsfunction.md) &gt; [\_\_call](./graph-builder.successorsfunction.__call.md)

# SuccessorsFunction.\_\_call method

Returns all nodes in this graph adjacent to `node` which can be reached by traversing `node`<!-- -->'s outgoing edges in the direction (if any) of the edge.

This is <i>not</i> the same as "all nodes reachable from `node` by following outgoing edges". For that functionality, see Graphs.reachableNodes<!-- -->.

Some algorithms that operate on a `SuccessorsFunction` may produce undesired results if the returned `Iterable` contains duplicate elements. Implementations of such algorithms should document their behavior in the presence of duplicates.

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

