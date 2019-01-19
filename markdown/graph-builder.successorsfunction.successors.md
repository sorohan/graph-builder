[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [SuccessorsFunction](./graph-builder.successorsfunction.md) &gt; [successors](./graph-builder.successorsfunction.successors.md)

# SuccessorsFunction.successors method

Returns all nodes in this graph adjacent to `node` which can be reached by traversing `node`<!-- -->'s outgoing edges in the direction (if any) of the edge.

<p>This is <i>not</i> the same as "all nodes reachable from `node` by following outgoing edges". For that functionality, see Graphs.reachableNodes<!-- -->.

<p>Some algorithms that operate on a `SuccessorsFunction` may produce undesired results if the returned Iterable contains duplicate elements. Implementations of such algorithms should document their behavior in the presence of duplicates.

<p>The elements of the returned `Iterable` must each be:

<ul> <li>Non-null <li>Usable as `Map` keys (see the Guava User Guide's section on <a href="https://github.com/google/guava/wiki/GraphsExplained#graph-elements-nodes-and-edges"> graph elements</a> for details) </ul>

throws IllegalArgumentException if `node` is not an element of this graph

**Signature:**
```javascript
successors(node: N): Iterable<N>;
```
**Returns:** `Iterable<N>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

