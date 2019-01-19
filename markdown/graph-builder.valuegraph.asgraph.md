[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ValueGraph](./graph-builder.valuegraph.md) &gt; [asGraph](./graph-builder.valuegraph.asgraph.md)

# ValueGraph.asGraph method

Returns a live view of this graph as a [Graph](./graph-builder.graph.md)<!-- -->. The resulting [Graph](./graph-builder.graph.md) will have an edge connecting node A to node B if this [ValueGraph](./graph-builder.valuegraph.md) has an edge connecting A to B.

**Signature:**
```javascript
asGraph(): Graph<N>;
```
**Returns:** `Graph<N>`

