[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ValueGraph](./graph-builder.valuegraph.md) &gt; [equals](./graph-builder.valuegraph.equals.md)

# ValueGraph.equals method

Returns `true` iff `object` is a [ValueGraph](./graph-builder.valuegraph.md) that has the same elements and the same structural relationships as those in this graph.

Thus, two value graphs A and B are equal if <b>all</b> of the following are true:

<ul> <li>A and B have equal [BaseGraph.isDirected](./graph-builder.basegraph.isdirected.md)<!-- -->. <li>A and B have equal [BaseGraph.nodes](./graph-builder.basegraph.nodes.md)<!-- -->. <li>A and B have equal [BaseGraph.edges](./graph-builder.basegraph.edges.md)<!-- -->. <li>The [ValueGraph.edgeValue](./graph-builder.valuegraph.edgevalue.md) of a given edge is the same in both A and B. </ul>

Graph properties besides [BaseGraph.isDirected](./graph-builder.basegraph.isdirected.md) do <b>not</b> affect equality. For example, two graphs may be considered equal even if one allows self-loops and the other doesn't. Additionally, the order in which nodes or edges are added to the graph, and the order in which they are iterated over, are irrelevant.

**Signature:**
```javascript
equals(object: ValueGraph<N, V>): boolean;
```
**Returns:** `boolean`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `object` | `ValueGraph<N, V>` |  |

