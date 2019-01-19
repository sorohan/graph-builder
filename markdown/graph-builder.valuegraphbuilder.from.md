[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ValueGraphBuilder](./graph-builder.valuegraphbuilder.md) &gt; [from](./graph-builder.valuegraphbuilder.from.md)

# ValueGraphBuilder.from method

Returns a [ValueGraphBuilder](./graph-builder.valuegraphbuilder.md) initialized with all properties queryable from `graph`<!-- -->.

<p>The "queryable" properties are those that are exposed through the [ValueGraph](./graph-builder.valuegraph.md) interface, such as ValueGraph.isDirected<!-- -->. Other properties, such as expectedNodeCount<!-- -->, are not set in the new builder.

**Signature:**
```javascript
static from<N, V>(graph: ValueGraph<N, V>): ValueGraphBuilder<N, V>;
```
**Returns:** `ValueGraphBuilder<N, V>`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `graph` | `ValueGraph<N, V>` |  |

