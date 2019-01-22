[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [incidentEdges](./graph-builder.basegraph.incidentedges.md)

# BaseGraph.incidentEdges method

Returns the edges in this graph whose endpoints include `node`<!-- -->.

Throws an error if `node` is not an element of this graph.

**Signature:**
```javascript
incidentEdges(node: N): Set<EndpointPair<N>>;
```
**Returns:** `Set<EndpointPair<N>>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

