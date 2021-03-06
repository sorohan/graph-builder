[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [GraphBuilder](./graph-builder.graphbuilder.md) &gt; [from](./graph-builder.graphbuilder.from.md)

# GraphBuilder.from method

Returns a [GraphBuilder](./graph-builder.graphbuilder.md) initialized with all properties queryable from `graph`<!-- -->.

<p>The "queryable" properties are those that are exposed through the [Graph](./graph-builder.graph.md) interface, such as [BaseGraph.isDirected](./graph-builder.basegraph.isdirected.md)<!-- -->. Other properties, such as [GraphBuilder.expectedNodeCount](./graph-builder.graphbuilder.expectednodecount.md)<!-- -->, are not set in the new builder.

**Signature:**
```javascript
static from<T>(graph: Graph<T>): GraphBuilder<T>;
```
**Returns:** `GraphBuilder<T>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `graph` | `Graph<T>` |  |

