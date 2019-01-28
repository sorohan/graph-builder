# Graph Builder

A graph builder library for modeling abstract graph structures.

This is a (incomplete) typescript port of the [guava graph library](https://github.com/google/guava/wiki/GraphsExplained).

See the [API
documentation](https://github.com/sorohan/graph-builder/blob/master/markdown/graph-builder.md) for usage.

The main entry point for building the graph are the
[`GraphBuilder`](https://github.com/sorohan/graph-builder/blob/master/markdown/graph-builder.graphbuilder.md)
for building a
[`MutableGraph`](https://github.com/sorohan/graph-builder/blob/master/markdown/graph-builder.mutablegraph.md) and
[`ValueGraphBuilder`](https://github.com/sorohan/graph-builder/blob/master/markdown/graph-builder.valuegraphbuilder.md)
for building a
[`MutableValueGraph`](https://github.com/sorohan/graph-builder/blob/master/markdown/graph-builder.mutablevaluegraph.md).

## Graph Traversal

There is also a [traverser](https://github.com/sorohan/graph-builder/blob/traverers/markdown/graph-builder.traversers.md)
which can perform different types of traversal of any graphs/trees (that implement
[SuccessorFunction](https://github.com/sorohan/graph-builder/blob/traverers/markdown/graph-builder.successorsfunction.md),
which all the Graphs created by the
[GraphBuilder](https://github.com/sorohan/graph-builder/blob/master/markdown/graph-builder.graphbuilder.md) do).