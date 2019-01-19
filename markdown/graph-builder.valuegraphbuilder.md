[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ValueGraphBuilder](./graph-builder.valuegraphbuilder.md)

# ValueGraphBuilder class

A builder for constructing instances of [MutableValueGraph](./graph-builder.mutablevaluegraph.md) with user-defined properties.

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`allowsSelfLoops(allowsSelfLoops)`](./graph-builder.valuegraphbuilder.allowsselfloops.md) |  | `ValueGraphBuilder<N, V>` | Specifies whether the graph will allow self-loops (edges that connect a node to itself). Attempting to add a self-loop to a graph that does not allow them will throw an UnsupportedOperationException<!-- -->. |
|  [`build()`](./graph-builder.valuegraphbuilder.build.md) |  | `MutableValueGraph<N, V>` | Returns an empty [MutableValueGraph](./graph-builder.mutablevaluegraph.md) with the properties of this [ValueGraphBuilder](./graph-builder.valuegraphbuilder.md)<!-- -->. |
|  [`directed()`](./graph-builder.valuegraphbuilder.directed.md) |  | `ValueGraphBuilder<N, V>` | Returns a [ValueGraphBuilder](./graph-builder.valuegraphbuilder.md) for building directed graphs. |
|  [`expectedNodeCount(expectedNodeCount)`](./graph-builder.valuegraphbuilder.expectednodecount.md) |  | `ValueGraphBuilder<N, V>` | Specifies the expected number of nodes in the graph.<p/>throws an error if `expectedNodeCount` is negative |
|  [`from(graph)`](./graph-builder.valuegraphbuilder.from.md) |  | `ValueGraphBuilder<N, V>` | Returns a [ValueGraphBuilder](./graph-builder.valuegraphbuilder.md) initialized with all properties queryable from `graph`<!-- -->.<p/><p>The "queryable" properties are those that are exposed through the [ValueGraph](./graph-builder.valuegraph.md) interface, such as ValueGraph.isDirected<!-- -->. Other properties, such as expectedNodeCount<!-- -->, are not set in the new builder. |
|  [`nodeOrder(nodeOrder)`](./graph-builder.valuegraphbuilder.nodeorder.md) |  | `ValueGraphBuilder<N, V>` | Specifies the order of iteration for the elements of Graph.nodes<!-- -->. |
|  [`undirected()`](./graph-builder.valuegraphbuilder.undirected.md) |  | `ValueGraphBuilder<N, V>` | Returns a [ValueGraphBuilder](./graph-builder.valuegraphbuilder.md) for building undirected graphs. |

## Remarks

<p>A graph built by this class will have the following properties by default:

<ul> <li>does not allow self-loops <li>orders Graph.nodes in the order in which the elements were added </ul>

<p>Example of use:
```javascript
MutableValueGraph<String, number> graph =
    ValueGraphBuilder.undirected().allowsSelfLoops(true).build();
graph.putEdgeValue("San Francisco", "San Francisco", 0.0);
graph.putEdgeValue("San Jose", "San Jose", 0.0);
graph.putEdgeValue("San Francisco", "San Jose", 48.4);

```
