[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md) &gt; [degree](./graph-builder.basegraph.degree.md)

# BaseGraph.degree method

Returns the count of `node`<!-- -->'s incident edges, counting self-loops twice (equivalently, the number of times an edge touches `node`<!-- -->).

For directed graphs, this is equal to `inDegree(node) + outDegree(node)`<!-- -->.

For undirected graphs, this is equal to `incidentEdges(node).size()` + (number of self-loops incident to `node`<!-- -->).

Throws an error if `node` is not an element of this graph.

**Signature:**
```javascript
degree(node: N): number;
```
**Returns:** `number`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `node` | `N` |  |

