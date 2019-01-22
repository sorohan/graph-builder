[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [allowsSelfLoops](./graph-builder.basegraph.allowsselfloops.md)

# BaseGraph.allowsSelfLoops method

Returns true if this graph allows self-loops (edges that connect a node to itself). Attempting to add a self-loop to a graph that does not allow them will throw an error.

**Signature:**
```javascript
allowsSelfLoops(): boolean;
```
**Returns:** `boolean`

