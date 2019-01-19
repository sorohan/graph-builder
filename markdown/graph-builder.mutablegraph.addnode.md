[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [MutableGraph](./graph-builder.mutablegraph.md) &gt; [addNode](./graph-builder.mutablegraph.addnode.md)

# MutableGraph.addNode method

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

