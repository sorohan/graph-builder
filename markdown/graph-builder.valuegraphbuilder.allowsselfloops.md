[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ValueGraphBuilder](./graph-builder.valuegraphbuilder.md) &gt; [allowsSelfLoops](./graph-builder.valuegraphbuilder.allowsselfloops.md)

# ValueGraphBuilder.allowsSelfLoops method

Specifies whether the graph will allow self-loops (edges that connect a node to itself). Attempting to add a self-loop to a graph that does not allow them will throw an UnsupportedOperationException<!-- -->.

**Signature:**
```javascript
allowsSelfLoops(allowsSelfLoops: boolean): ValueGraphBuilder<N, V>;
```
**Returns:** `ValueGraphBuilder<N, V>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `allowsSelfLoops` | `boolean` |  |

