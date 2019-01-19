[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableValueGraph](./graph-builder.mutablevaluegraph.md) &gt; [addNode](./graph-builder.mutablevaluegraph.addnode.md)

# MutableValueGraph.addNode method

Adds `node` if it is not already present.

<p><b>Nodes must be unique</b>, just as `Map` keys must be. They must also be non-null.

**Signature:**
```javascript
addNode(node: N): boolean;
```
**Returns:** `boolean`

`true` if the graph was modified as a result of this call

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

