[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [GraphConnections](./graph-builder.graphconnections.md) &gt; [addSuccessor](./graph-builder.graphconnections.addsuccessor.md)

# GraphConnections.addSuccessor method

Add `node` as a successor to the origin node. In the case of an undirected graph, it also becomes a predecessor. Associates `value` with the edge connecting the two nodes. Returns the value previously associated with the edge connecting the two nodes.

**Signature:**
```javascript
addSuccessor(node: N, value: V): V | undefined;
```
**Returns:** `V | undefined`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |
|  `value` | `V` |  |

