[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [Graph](./graph-builder.graph.md)

# Graph interface

An interface for <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data, whose edges are anonymous entities with no identity or information of their own.

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`equals(object)`](./graph-builder.graph.equals.md) | `boolean` | Returns `true` iff `object` is a [Graph](./graph-builder.graph.md) that has the same elements and the same structural relationships as those in this graph.<p/><p>Thus, two graphs A and B are equal if <b>all</b> of the following are true:<p/><ul> <li>A and B have equal isDirected<!-- -->. <li>A and B have equal nodes<!-- -->. <li>A and B have equal edges<!-- -->. </ul><p/><p>Graph properties besides isDirected do <b>not</b> affect equality. For example, two graphs may be considered equal even if one allows self-loops and the other doesn't. Additionally, the order in which nodes or edges are added to the graph, and the order in which they are iterated over, are irrelevant.<p/><p>A reference implementation of this is provided by AbstractGraph.equals<!-- -->. |

## Remarks

<p>A graph is composed of a set of nodes and a set of edges connecting pairs of nodes.

<p>There are three primary interfaces provided to represent graphs. In order of increasing complexity they are: [Graph](./graph-builder.graph.md)<!-- -->, [ValueGraph](./graph-builder.valuegraph.md)<!-- -->, and Network<!-- -->. You should generally prefer the simplest interface that satisfies your use case. See the <a href="https://github.com/google/guava/wiki/GraphsExplained#choosing-the-right-graph-type"> "Choosing the right graph type"</a> section of the Guava User Guide for more details.

\*\*Capabilities\*\*

<p>`Graph` supports the following use cases (<a href="https://github.com/google/guava/wiki/GraphsExplained#definitions">definitions of terms</a>):

<ul> <li>directed graphs <li>undirected graphs <li>graphs that do/don't allow self-loops <li>graphs whose nodes/edges are insertion-ordered, sorted, or unordered </ul>

<p>`Graph` explicitly does not support parallel edges, and forbids implementations or extensions with parallel edges. If you need parallel edges, use Network<!-- -->.

\*\*Building a `Graph`<!-- -->\*\*

<p>The implementation classes that `common.graph` provides are not public, by design. To create an instance of one of the built-in implementations of `Graph`<!-- -->, use the [GraphBuilder](./graph-builder.graphbuilder.md) class:
```javascript
MutableGraph<Integer> graph = GraphBuilder.undirected().build();

```
<p>[GraphBuilder.build](./graph-builder.graphbuilder.build.md) returns an instance of [MutableGraph](./graph-builder.mutablegraph.md)<!-- -->, which is a subtype of `Graph` that provides methods for adding and removing nodes and edges. If you do not need to mutate a graph (e.g. if you write a method than runs a read-only algorithm on the graph), you should use the non-mutating [Graph](./graph-builder.graph.md) interface, or an ImmutableGraph<!-- -->.

<p>You can create an immutable copy of an existing `Graph` using ImmutableGraph.copyOf<!-- -->:
```javascript
ImmutableGraph<Integer> immutableGraph = ImmutableGraph.copyOf(graph);

```
<p>Instances of ImmutableGraph do not implement [MutableGraph](./graph-builder.mutablegraph.md) (obviously!) and are contractually guaranteed to be unmodifiable and thread-safe.

<p>The Guava User Guide has <a href="https://github.com/google/guava/wiki/GraphsExplained#building-graph-instances">more information on (and examples of) building graphs</a>.

\*\*Additional documentation\*\*

<p>See the Guava User Guide for the `common.graph` package (<a href="https://github.com/google/guava/wiki/GraphsExplained">"Graphs Explained"</a>) for additional documentation, including:

<ul> <li><a href="https://github.com/google/guava/wiki/GraphsExplained#equals-hashcode-and-graph-equivalence"> `equals()`<!-- -->, `hashCode()`<!-- -->, and graph equivalence</a> <li><a href="https://github.com/google/guava/wiki/GraphsExplained#synchronization"> Synchronization policy</a> <li><a href="https://github.com/google/guava/wiki/GraphsExplained#notes-for-implementors">Notes for implementors</a> </ul>
