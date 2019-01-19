[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ValueGraph](./graph-builder.valuegraph.md)

# ValueGraph interface

An interface for <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data, whose edges have associated non-unique values.

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`asGraph()`](./graph-builder.valuegraph.asgraph.md) | `Graph<N>` | Returns a live view of this graph as a [Graph](./graph-builder.graph.md)<!-- -->. The resulting [Graph](./graph-builder.graph.md) will have an edge connecting node A to node B if this [ValueGraph](./graph-builder.valuegraph.md) has an edge connecting A to B. |
|  [`edgeValue(nodeU, nodeV)`](./graph-builder.valuegraph.edgevalue.md) | `V | undefined` | Returns the value of the edge that connects `nodeU` to `nodeV` (in the order, if any, specified by `endpoints`<!-- -->), if one is present; otherwise, returns `Optional.empty()`<!-- -->.<p/>throws IllegalArgumentException if `nodeU` or `nodeV` is not an element of this graph |
|  [`edgeValueConnectingEndpoints(endpoints)`](./graph-builder.valuegraph.edgevalueconnectingendpoints.md) | `V | undefined` | Returns the value of the edge that connects `endpoints` (in the order, if any, specified by `endpoints`<!-- -->), if one is present; otherwise, returns `Optional.empty()`<!-- -->.<p/><p>If this graph is directed, the endpoints must be ordered.<p/>throws IllegalArgumentException if either endpoint is not an element of this graph throws IllegalArgumentException if the endpoints are unordered and the graph is directed |
|  [`edgeValueConnectingEndpointsOrDefault(endpoints, defaultValue)`](./graph-builder.valuegraph.edgevalueconnectingendpointsordefault.md) | `V | R` | Returns the value of the edge that connects `endpoints` (in the order, if any, specified by `endpoints`<!-- -->), if one is present; otherwise, returns `defaultValue`<!-- -->.<p/><p>If this graph is directed, the endpoints must be ordered.<p/>throws IllegalArgumentException if either endpoint is not an element of this graph throws IllegalArgumentException if the endpoints are unordered and the graph is directed |
|  [`edgeValueOrDefault(nodeU, nodeV, defaultValue)`](./graph-builder.valuegraph.edgevalueordefault.md) | `V | R` | Returns the value of the edge that connects `nodeU` to `nodeV`<!-- -->, if one is present; otherwise, returns `defaultValue`<!-- -->.<p/><p>In an undirected graph, this is equal to `edgeValueOrDefault(nodeV, nodeU, defaultValue)`<!-- -->.<p/>throws IllegalArgumentException if `nodeU` or `nodeV` is not an element of this graph |
|  [`equals(obj)`](./graph-builder.valuegraph.equals.md) | `boolean` | Returns `true` iff `object` is a [ValueGraph](./graph-builder.valuegraph.md) that has the same elements and the same structural relationships as those in this graph.<p/><p>Thus, two value graphs A and B are equal if <b>all</b> of the following are true:<p/><ul> <li>A and B have equal isDirected<!-- -->. <li>A and B have equal nodes<!-- -->. <li>A and B have equal edges<!-- -->. <li>The edgeValue of a given edge is the same in both A and B. </ul><p/><p>Graph properties besides isDirected do <b>not</b> affect equality. For example, two graphs may be considered equal even if one allows self-loops and the other doesn't. Additionally, the order in which nodes or edges are added to the graph, and the order in which they are iterated over, are irrelevant.<p/><p>A reference implementation of this is provided by AbstractValueGraph.equals<!-- -->. |

## Remarks

<p>A graph is composed of a set of nodes and a set of edges connecting pairs of nodes.

<p>There are three primary interfaces provided to represent graphs. In order of increasing complexity they are: [Graph](./graph-builder.graph.md)<!-- -->, [ValueGraph](./graph-builder.valuegraph.md)<!-- -->, and Network<!-- -->. You should generally prefer the simplest interface that satisfies your use case. See the <a href="https://github.com/google/guava/wiki/GraphsExplained#choosing-the-right-graph-type"> "Choosing the right graph type"</a> section of the Guava User Guide for more details.

\*\*Capabilities\*\*

<p>`ValueGraph` supports the following use cases (<a href="https://github.com/google/guava/wiki/GraphsExplained#definitions">definitions of terms</a>):

<ul> <li>directed graphs <li>undirected graphs <li>graphs that do/don't allow self-loops <li>graphs whose nodes/edges are insertion-ordered, sorted, or unordered <li>graphs whose edges have associated values </ul>

<p>`ValueGraph`<!-- -->, as a subtype of `Graph`<!-- -->, explicitly does not support parallel edges, and forbids implementations or extensions with parallel edges. If you need parallel edges, use Network<!-- -->. (You can use a positive `Integer` edge value as a loose representation of edge multiplicity, but the `*degree()` and mutation methods will not reflect your interpretation of the edge value as its multiplicity.)

\*\*Building a `ValueGraph`<!-- -->\*\*

<p>The implementation classes that `common.graph` provides are not public, by design. To create an instance of one of the built-in implementations of `ValueGraph`<!-- -->, use the [ValueGraphBuilder](./graph-builder.valuegraphbuilder.md) class:
```javascript
MutableValueGraph<Integer, Double> graph = ValueGraphBuilder.directed().build();

```
<p>[ValueGraphBuilder.build](./graph-builder.valuegraphbuilder.build.md) returns an instance of [MutableValueGraph](./graph-builder.mutablevaluegraph.md)<!-- -->, which is a subtype of `ValueGraph` that provides methods for adding and removing nodes and edges. If you do not need to mutate a graph (e.g. if you write a method than runs a read-only algorithm on the graph), you should use the non-mutating [ValueGraph](./graph-builder.valuegraph.md) interface, or an ImmutableValueGraph<!-- -->.

<p>You can create an immutable copy of an existing `ValueGraph` using ImmutableValueGraph.copyOf<!-- -->:
```javascript
ImmutableValueGraph<Integer, Double> immutableGraph = ImmutableValueGraph.copyOf(graph);

```
<p>Instances of ImmutableValueGraph do not implement [MutableValueGraph](./graph-builder.mutablevaluegraph.md) (obviously!) and are contractually guaranteed to be unmodifiable and thread-safe.

<p>The Guava User Guide has <a href="https://github.com/google/guava/wiki/GraphsExplained#building-graph-instances">more information on (and examples of) building graphs</a>.

\*\*Additional documentation\*\*

<p>See the Guava User Guide for the `common.graph` package (<a href="https://github.com/google/guava/wiki/GraphsExplained">"Graphs Explained"</a>) for additional documentation, including:

<ul> <li><a href="https://github.com/google/guava/wiki/GraphsExplained#equals-hashcode-and-graph-equivalence"> `equals()`<!-- -->, `hashCode()`<!-- -->, and graph equivalence</a> <li><a href="https://github.com/google/guava/wiki/GraphsExplained#synchronization"> Synchronization policy</a> <li><a href="https://github.com/google/guava/wiki/GraphsExplained#notes-for-implementors">Notes for implementors</a> </ul>
