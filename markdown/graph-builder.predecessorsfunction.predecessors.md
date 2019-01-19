[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [PredecessorsFunction](./graph-builder.predecessorsfunction.md) &gt; [predecessors](./graph-builder.predecessorsfunction.predecessors.md)

# PredecessorsFunction.predecessors method

Returns all nodes in this graph adjacent to `node` which can be reached by traversing `node`<!-- -->'s incoming edges <i>against</i> the direction (if any) of the edge.

<p>Some algorithms that operate on a `PredecessorsFunction` may produce undesired results if the returned Iterable contains duplicate elements. Implementations of such algorithms should document their behavior in the presence of duplicates.

<p>The elements of the returned `Iterable` must each be:

<ul> <li>Non-null <li>Usable as `Map` keys (see the Guava User Guide's section on <a href="https://github.com/google/guava/wiki/GraphsExplained#graph-elements-nodes-and-edges"> graph elements</a> for details) </ul>

throws IllegalArgumentException if `node` is not an element of this graph

**Signature:**
```javascript
predecessors(node: N): Iterable<N>;
```
**Returns:** `Iterable<N>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

