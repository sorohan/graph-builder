[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [Graph](./graph-builder.graph.md)

# Graph interface

A subinterface of [BaseGraph](./graph-builder.basegraph.md) for <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data, whose edges are anonymous entities with no identity or information of their own.

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`equals(object)`](./graph-builder.graph.equals.md) | `boolean` | Returns `true` iff `object` is a [Graph](./graph-builder.graph.md) that has the same elements and the same structural relationships as those in this graph.<p/>Thus, two graphs A and B are equal if <b>all</b> of the following are true:<p/><ul> <li>A and B have equal [BaseGraph.isDirected](./graph-builder.basegraph.isdirected.md)<!-- -->. <li>A and B have equal [BaseGraph.nodes](./graph-builder.basegraph.nodes.md)<!-- -->. <li>A and B have equal [BaseGraph.edges](./graph-builder.basegraph.edges.md)<!-- -->. </ul><p/>Graph properties besides [BaseGraph.isDirected](./graph-builder.basegraph.isdirected.md) do <b>not</b> affect equality. For example, two graphs may be considered equal even if one allows self-loops and the other doesn't. Additionally, the order in which nodes or edges are added to the graph, and the order in which they are iterated over, are irrelevant. |

## Remarks

A graph is composed of a set of nodes and a set of edges connecting pairs of nodes.

There are three primary interfaces provided to represent graphs. In order of increasing complexity they are: [Graph](./graph-builder.graph.md)<!-- -->, [ValueGraph](./graph-builder.valuegraph.md)<!-- -->, and Network<!-- -->. You should generally prefer the simplest interface that satisfies your use case. See the <a href="https://github.com/google/guava/wiki/GraphsExplained#choosing-the-right-graph-type"> "Choosing the right graph type"</a> section of the Guava User Guide for more details.

\*\*Capabilities\*\*

`Graph` supports the following use cases (<a href="https://github.com/google/guava/wiki/GraphsExplained#definitions">definitions of terms</a>):

<ul> <li>directed graphs <li>undirected graphs <li>graphs that do/don't allow self-loops <li>graphs whose nodes/edges are insertion-ordered, sorted, or unordered </ul>

`Graph` explicitly does not support parallel edges, and forbids implementations or extensions with parallel edges. If you need parallel edges, use Network<!-- -->.

\*\*Building a `Graph`<!-- -->\*\*

The implementation classes that are provided are not public, by design. To create an instance of one of the built-in implementations of `Graph`<!-- -->, use the [GraphBuilder](./graph-builder.graphbuilder.md) class:
```javascript
const graph: MutableGraph<number> = GraphBuilder.undirected().build();

```
[GraphBuilder.build](./graph-builder.graphbuilder.build.md) returns an instance of [MutableGraph](./graph-builder.mutablegraph.md)<!-- -->, which is a subtype of `Graph` that provides methods for adding and removing nodes and edges. If you do not need to mutate a graph (e.g. if you write a method than runs a read-only algorithm on the graph), you should use the non-mutating [Graph](./graph-builder.graph.md) interface, or an ImmutableGraph<!-- -->.

You can create an immutable copy of an existing `Graph` using ImmutableGraph.copyOf<!-- -->:
```javascript
const immutableGraph: ImmutableGraph<number> = ImmutableGraph.copyOf(graph);

```
Instances of ImmutableGraph do not implement [MutableGraph](./graph-builder.mutablegraph.md) (obviously!) and are contractually guaranteed to be unmodifiable.
