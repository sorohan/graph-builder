[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [GraphBuilder](./graph-builder.graphbuilder.md)

# GraphBuilder class

A builder for constructing instances of [MutableGraph](./graph-builder.mutablegraph.md) with user-defined properties.

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`allowsSelfLoops(allowsSelfLoops)`](./graph-builder.graphbuilder.allowsselfloops.md) |  | `GraphBuilder<N>` | Specifies whether the graph will allow self-loops (edges that connect a node to itself). Attempting to add a self-loop to a graph that does not allow them will throw an error. |
|  [`build()`](./graph-builder.graphbuilder.build.md) |  | `MutableGraph<N>` | Returns an empty [MutableGraph](./graph-builder.mutablegraph.md) with the properties of this [GraphBuilder](./graph-builder.graphbuilder.md)<!-- -->. |
|  [`directed()`](./graph-builder.graphbuilder.directed.md) |  | `GraphBuilder<T>` | Returns a [GraphBuilder](./graph-builder.graphbuilder.md) for building directed graphs. |
|  [`expectedNodeCount(expectedNodeCount)`](./graph-builder.graphbuilder.expectednodecount.md) |  | `GraphBuilder<N>` | Specifies the expected number of nodes in the graph.<p/>throws an error if `expectedNodeCount` is negative |
|  [`from(graph)`](./graph-builder.graphbuilder.from.md) |  | `GraphBuilder<T>` | Returns a [GraphBuilder](./graph-builder.graphbuilder.md) initialized with all properties queryable from `graph`<!-- -->.<p/><p>The "queryable" properties are those that are exposed through the [Graph](./graph-builder.graph.md) interface, such as [BaseGraph.isDirected](./graph-builder.basegraph.isdirected.md)<!-- -->. Other properties, such as [GraphBuilder.expectedNodeCount](./graph-builder.graphbuilder.expectednodecount.md)<!-- -->, are not set in the new builder. |
|  [`nodeOrder(nodeOrder)`](./graph-builder.graphbuilder.nodeorder.md) |  | `GraphBuilder<N>` | Specifies the order of iteration for the elements of [BaseGraph.nodes](./graph-builder.basegraph.nodes.md)<!-- -->. |
|  [`undirected()`](./graph-builder.graphbuilder.undirected.md) |  | `GraphBuilder<T>` | Returns a [GraphBuilder](./graph-builder.graphbuilder.md) for building undirected graphs. |

## Remarks

A graph built by this class will have the following properties by default:

<ul> <li>does not allow self-loops</li> <li>orders [BaseGraph.nodes](./graph-builder.basegraph.nodes.md) in the order in which the elements were added</li> </ul>

Example of use:
```javascript
const graph: MutableGraph<String> = GraphBuilder.undirected().allowsSelfLoops(true).build();
graph.putEdge("bread", "bread");
graph.putEdge("chocolate", "peanut butter");
graph.putEdge("peanut butter", "jelly");

```
