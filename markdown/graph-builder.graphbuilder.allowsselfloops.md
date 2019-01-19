[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [GraphBuilder](./graph-builder.graphbuilder.md) &gt; [allowsSelfLoops](./graph-builder.graphbuilder.allowsselfloops.md)

# GraphBuilder.allowsSelfLoops method

Specifies whether the graph will allow self-loops (edges that connect a node to itself). Attempting to add a self-loop to a graph that does not allow them will throw an error.

**Signature:**
```javascript
allowsSelfLoops(allowsSelfLoops: boolean): GraphBuilder<N>;
```
**Returns:** `GraphBuilder<N>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `allowsSelfLoops` | `boolean` |  |

