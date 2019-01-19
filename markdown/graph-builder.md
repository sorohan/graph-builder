[Home](./index) &gt; [graph-builder](./graph-builder.md)

# graph-builder package

## Classes

|  Class | Description |
|  --- | --- |
|  [`ElementOrder`](./graph-builder.elementorder.md) | Used to represent the order of elements in a data structure that supports different options for iteration order guarantees. |
|  [`EndpointPair`](./graph-builder.endpointpair.md) | An immutable pair representing the two endpoints of an edge in a graph. The [EndpointPair](./graph-builder.endpointpair.md) of a directed edge is an ordered pair of nodes (<!-- -->source and target<!-- -->). The [EndpointPair](./graph-builder.endpointpair.md) of an undirected edge is an unordered pair of nodes (<!-- -->nodeU and nodeV<!-- -->).<p/><p>The edge is a self-loop if, and only if, the two endpoints are equal. |
|  [`GraphBuilder`](./graph-builder.graphbuilder.md) | A builder for constructing instances of [MutableGraph](./graph-builder.mutablegraph.md) with user-defined properties. |
|  [`ValueGraphBuilder`](./graph-builder.valuegraphbuilder.md) | A builder for constructing instances of [MutableValueGraph](./graph-builder.mutablevaluegraph.md) with user-defined properties. |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [`BaseGraph`](./graph-builder.basegraph.md) | A non-public interface for the methods shared between [Graph](./graph-builder.graph.md) and [ValueGraph](./graph-builder.valuegraph.md)<!-- -->. |
|  [`Graph`](./graph-builder.graph.md) | An interface for <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data, whose edges are anonymous entities with no identity or information of their own. |
|  [`GraphConnections`](./graph-builder.graphconnections.md) | An interface for representing and manipulating an origin node's adjacent nodes and edge values in a [Graph](./graph-builder.graph.md)<!-- -->. |
|  [`MutableGraph`](./graph-builder.mutablegraph.md) | A subinterface of [Graph](./graph-builder.graph.md) which adds mutation methods. When mutation is not required, users should prefer the [Graph](./graph-builder.graph.md) interface. |
|  [`MutableValueGraph`](./graph-builder.mutablevaluegraph.md) | A subinterface of [ValueGraph](./graph-builder.valuegraph.md) which adds mutation methods. When mutation is not required, users should prefer the [ValueGraph](./graph-builder.valuegraph.md) interface. |
|  [`PredecessorsFunction`](./graph-builder.predecessorsfunction.md) | A functional interface for <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data. |
|  [`SuccessorsFunction`](./graph-builder.successorsfunction.md) | A functional interface for <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data. |
|  [`ValueGraph`](./graph-builder.valuegraph.md) | An interface for <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data, whose edges have associated non-unique values. |

