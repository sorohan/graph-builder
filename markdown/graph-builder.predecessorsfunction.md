[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [PredecessorsFunction](./graph-builder.predecessorsfunction.md)

# PredecessorsFunction interface

A functional interface for <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data.

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`__call(node)`](./graph-builder.predecessorsfunction.__call.md) | `Iterable<N>` | Returns all nodes in this graph adjacent to `node` which can be reached by traversing `node`<!-- -->'s incoming edges <i>against</i> the direction (if any) of the edge.<p/>Some algorithms that operate on a `PredecessorsFunction` may produce undesired results if the returned `Iterable` contains duplicate elements. Implementations of such algorithms should document their behavior in the presence of duplicates.<p/>The elements of the returned `Iterable` must each be unique to the graph.<p/>Throws if `node` is not an element of this graph. |

## Remarks

This interface is meant to be used as the type of a parameter to graph algorithms (such as topological sort) that only need a way of accessing the predecessors of a node in a graph.

<b>Usage</b>

Given an algorithm, for example:
```javascript
public someGraphAlgorithm<N>(startNode: N, predecessorsFunction: PredecessorsFunction<N>);

```
you will invoke it depending on the graph representation you're using.

If you have an instance of one of the primary `common.graph` types ([Graph](./graph-builder.graph.md)<!-- -->, [ValueGraph](./graph-builder.valuegraph.md)<!-- -->, and Network<!-- -->):
```javascript
someGraphAlgorithm(startNode, graph);

```
This works because those types each implement `PredecessorsFunction`<!-- -->. It will also work with any other implementation of this interface.

If you have your own graph implementation based around a custom node type `MyNode`<!-- -->, which has a method `getParents()` that retrieves its predecessors in a graph:
```javascript
someGraphAlgorithm(startNode, MyNode.getParents);

```
If you have some other mechanism for returning the predecessors of a node, or one that doesn't return a `Iterable<N>`<!-- -->, then you can use a lambda to perform a more general transformation:
```javascript
someGraphAlgorithm(startNode, node => [node.mother(), node.father()]);

```
Graph algorithms that need additional capabilities (accessing both predecessors and successors, iterating over the edges, etc.) should declare their input to be of a type that provides those capabilities, such as [Graph](./graph-builder.graph.md)<!-- -->, [ValueGraph](./graph-builder.valuegraph.md)<!-- -->, or Network<!-- -->.
