[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [SuccessorsFunction](./graph-builder.successorsfunction.md)

# SuccessorsFunction interface

A functional interface for <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data.

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`successors(node)`](./graph-builder.successorsfunction.successors.md) | `Iterable<N>` | Returns all nodes in this graph adjacent to `node` which can be reached by traversing `node`<!-- -->'s outgoing edges in the direction (if any) of the edge.<p/><p>This is <i>not</i> the same as "all nodes reachable from `node` by following outgoing edges". For that functionality, see Graphs.reachableNodes<!-- -->.<p/><p>Some algorithms that operate on a `SuccessorsFunction` may produce undesired results if the returned Iterable contains duplicate elements. Implementations of such algorithms should document their behavior in the presence of duplicates.<p/><p>The elements of the returned `Iterable` must each be:<p/><ul> <li>Non-null <li>Usable as `Map` keys (see the Guava User Guide's section on <a href="https://github.com/google/guava/wiki/GraphsExplained#graph-elements-nodes-and-edges"> graph elements</a> for details) </ul><p/>throws IllegalArgumentException if `node` is not an element of this graph |

## Remarks

<p>This interface is meant to be used as the type of a parameter to graph algorithms (such as breadth first traversal) that only need a way of accessing the successors of a node in a graph.

\*\*Usage\*\*

Given an algorithm, for example:
```javascript
public <N> someGraphAlgorithm(N startNode, SuccessorsFunction<N> successorsFunction);

```
you will invoke it depending on the graph representation you're using.

<p>If you have an instance of one of the primary `common.graph` types ([Graph](./graph-builder.graph.md)<!-- -->, [ValueGraph](./graph-builder.valuegraph.md)<!-- -->, and Network<!-- -->):
```javascript
someGraphAlgorithm(startNode, graph);

```
This works because those types each implement `SuccessorsFunction`<!-- -->. It will also work with any other implementation of this interface.

<p>If you have your own graph implementation based around a custom node type `MyNode`<!-- -->, which has a method `getChildren()` that retrieves its successors in a graph:
```javascript
someGraphAlgorithm(startNode, MyNode::getChildren);

```
<p>If you have some other mechanism for returning the successors of a node, or one that doesn't return an `Iterable<? extends N>`<!-- -->, then you can use a lambda to perform a more general transformation:
```javascript
someGraphAlgorithm(startNode, node -> ImmutableList.of(node.leftChild(), node.rightChild()));

```
<p>Graph algorithms that need additional capabilities (accessing both predecessors and successors, iterating over the edges, etc.) should declare their input to be of a type that provides those capabilities, such as [Graph](./graph-builder.graph.md)<!-- -->, [ValueGraph](./graph-builder.valuegraph.md)<!-- -->, or Network<!-- -->.

\*\*Additional documentation\*\*

<p>See the Guava User Guide for the `common.graph` package (<a href="https://github.com/google/guava/wiki/GraphsExplained">"Graphs Explained"</a>) for additional documentation, including <a href="https://github.com/google/guava/wiki/GraphsExplained#notes-for-implementors">notes for implementors</a>
