[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ValueGraph](./graph-builder.valuegraph.md)

# ValueGraph interface

A subinterface of [BaseGraph](./graph-builder.basegraph.md) for <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data, whose edges have associated non-unique values

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`asGraph()`](./graph-builder.valuegraph.asgraph.md) | `Graph<N>` | Returns a live view of this graph as a [Graph](./graph-builder.graph.md)<!-- -->. The resulting [Graph](./graph-builder.graph.md) will have an edge connecting node A to node B if this [ValueGraph](./graph-builder.valuegraph.md) has an edge connecting A to B. |
|  [`edgeValue(nodeU, nodeV)`](./graph-builder.valuegraph.edgevalue.md) | `V | undefined` | Returns the value of the edge that connects `nodeU` to `nodeV` (in the order, if any, specified by `endpoints`<!-- -->), if one is present; otherwise, returns undefined.<p/>Throws if `nodeU` or `nodeV` is not an element of this graph. |
|  [`edgeValueConnectingEndpoints(endpoints)`](./graph-builder.valuegraph.edgevalueconnectingendpoints.md) | `V | undefined` | Returns the value of the edge that connects `endpoints` (in the order, if any, specified by `endpoints`<!-- -->), if one is present; otherwise, returns undefined.<p/>If this graph is directed, the endpoints must be ordered.<p/>Throws if either endpoint is not an element of this graph.<p/>Throws if the endpoints are unordered and the graph is directed. |
|  [`edgeValueConnectingEndpointsOrDefault(endpoints, defaultValue)`](./graph-builder.valuegraph.edgevalueconnectingendpointsordefault.md) | `V | R` | Returns the value of the edge that connects `endpoints` (in the order, if any, specified by `endpoints`<!-- -->), if one is present; otherwise, returns `defaultValue`<!-- -->.<p/>If this graph is directed, the endpoints must be ordered.<p/>Throws if either endpoint is not an element of this graph.<p/>Throws if the endpoints are unordered and the graph is directed. |
|  [`edgeValueOrDefault(nodeU, nodeV, defaultValue)`](./graph-builder.valuegraph.edgevalueordefault.md) | `V | R` | Returns the value of the edge that connects `nodeU` to `nodeV`<!-- -->, if one is present; otherwise, returns `defaultValue`<!-- -->.<p/>In an undirected graph, this is equal to `edgeValueOrDefault(nodeV, nodeU, defaultValue)`<!-- -->.<p/>Throws if `nodeU` or `nodeV` is not an element of this graph. |
|  [`equals(object)`](./graph-builder.valuegraph.equals.md) | `boolean` | Returns `true` iff `object` is a [ValueGraph](./graph-builder.valuegraph.md) that has the same elements and the same structural relationships as those in this graph.<p/>Thus, two value graphs A and B are equal if <b>all</b> of the following are true:<p/><ul> <li>A and B have equal [BaseGraph.isDirected](./graph-builder.basegraph.isdirected.md)<!-- -->. <li>A and B have equal [BaseGraph.nodes](./graph-builder.basegraph.nodes.md)<!-- -->. <li>A and B have equal [BaseGraph.edges](./graph-builder.basegraph.edges.md)<!-- -->. <li>The [ValueGraph.edgeValue](./graph-builder.valuegraph.edgevalue.md) of a given edge is the same in both A and B. </ul><p/>Graph properties besides [BaseGraph.isDirected](./graph-builder.basegraph.isdirected.md) do <b>not</b> affect equality. For example, two graphs may be considered equal even if one allows self-loops and the other doesn't. Additionally, the order in which nodes or edges are added to the graph, and the order in which they are iterated over, are irrelevant. |

## Remarks

A graph is composed of a set of nodes and a set of edges connecting pairs of nodes.

There are three primary interfaces provided to represent graphs. In order of increasing complexity they are: [Graph](./graph-builder.graph.md)<!-- -->, [ValueGraph](./graph-builder.valuegraph.md)<!-- -->, and Network<!-- -->. You should generally prefer the simplest interface that satisfies your use case. See the <a href="https://github.com/google/guava/wiki/GraphsExplained#choosing-the-right-graph-type"> "Choosing the right graph type"</a> section of the Guava User Guide for more details.

\*\*Capabilities\*\*

`ValueGraph` supports the following use cases (<a href="https://github.com/google/guava/wiki/GraphsExplained#definitions">definitions of terms</a>):

<ul> <li>directed graphs <li>undirected graphs <li>graphs that do/don't allow self-loops <li>graphs whose nodes/edges are insertion-ordered, sorted, or unordered <li>graphs whose edges have associated values </ul>

`ValueGraph`<!-- -->, as a subtype of `Graph`<!-- -->, explicitly does not support parallel edges, and forbids implementations or extensions with parallel edges. If you need parallel edges, use Network<!-- -->. (You can use a positive `Integer` edge value as a loose representation of edge multiplicity, but the `*degree()` and mutation methods will not reflect your interpretation of the edge value as its multiplicity.)

\*\*Building a `ValueGraph`<!-- -->\*\*

The implementation classes that are provided are not public, by design. To create an instance of one of the built-in implementations of `ValueGraph`<!-- -->, use the [ValueGraphBuilder](./graph-builder.valuegraphbuilder.md) class:
```javascript
const graph: MutableValueGraph<number, number> = ValueGraphBuilder.directed().build();

```
[ValueGraphBuilder.build](./graph-builder.valuegraphbuilder.build.md) returns an instance of [MutableValueGraph](./graph-builder.mutablevaluegraph.md)<!-- -->, which is a subtype of `ValueGraph` that provides methods for adding and removing nodes and edges. If you do not need to mutate a graph (e.g. if you write a method than runs a read-only algorithm on the graph), you should use the non-mutating [ValueGraph](./graph-builder.valuegraph.md) interface, or an ImmutableValueGraph<!-- -->.

You can create an immutable copy of an existing `ValueGraph` using ImmutableValueGraph.copyOf<!-- -->:
```javascript
const immutableGraph: ImmutableValueGraph<number, number>  = ImmutableValueGraph.copyOf(graph);

```
Instances of ImmutableValueGraph do not implement [MutableValueGraph](./graph-builder.mutablevaluegraph.md) (obviously!) and are contractually guaranteed to be unmodifiable.
