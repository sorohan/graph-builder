# Graph Builder

A graph builder library for modeling, and traversing abstract graph structures.

This is a (incomplete) port of the [guava graph library](https://github.com/google/guava/wiki/GraphsExplained).

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

## Examples

### Creating a Graph

Create an *undirected* [Mutablegraph](https://github.com/sorohan/graph-builder/blob/master/markdown/graph-builder.mutablegraph.md):
 - Inherits from [Graph](https://github.com/sorohan/graph-builder/blob/master/markdown/graph-builder.graph.md)
 - And [BaseGraph](https://github.com/sorohan/graph-builder/blob/master/markdown/graph-builder.basegraph.md)

```javascript
const { GraphBuilder } = require('graph-builder');

const graph = GraphBuilder.undirected().allowsSelfLoops(true).build();
```
Add some nodes:

```javascript
graph.addNode("bread");
```

Add some edges (silently adds nodes too):

```javascript
graph.putEdge("bread", "bread");
graph.putEdge("chocolate", "peanut butter");
graph.putEdge("peanut butter", "jelly");
```

Remove an edge:

```javascript
graph.removeEdge("chocolate", "peanut butter");
```

### Reading From the Graph

Everything returned is [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

Get connected nodes:

```javascript
for (const n of graph.adjacentNodes("peanut butter")) {
  console.log(n);
}
// prints:
//   chocolate
//   jelly
```

Get all the edges:

```javascript
for (const e of graph.edges()) {
  console.log(e.nodeU, ' => ', e.nodeV);
}
// prints:
//   bread  =>  bread
//   peanut butter  =>  chocolate
//   jelly  =>  peanut butter
```

Get all edges connected to "peanut butter":

```javascript
for (const e of graph.incidentEdges("peanut butter")) {
  console.log(e.nodeU, ' => ', e.nodeV);
}
// prints:
//   chocolate  =>  peanut butter
//   jelly  =>  peanut butter
```

Get all the successors/predecessors of "peanut butter" (in an undirected graph, these are the same):

```javascript
for (const n of graph.successors("peanut butter")) {
  console.log(n);
}
// prints:
//   chocolate
//   jelly
for (const n of graph.predecessors("peanut butter")) {
  console.log(n);
}
// prints:
//   chocolate
//   jelly
```

Or for a *directed* graph:

```javascript
const graph = GraphBuilder.directed().allowsSelfLoops(true).build();
graph.putEdge("bread", "bread");
graph.putEdge("chocolate", "peanut butter");
graph.putEdge("peanut butter", "jelly");
for (const n of graph.successors("peanut butter")) {
  console.log(n);
}
// prints:
//   jelly
for (const n of graph.predecessors("peanut butter")) {
  console.log(n);
}
// prints:
//   chocolate
```

### Traversing the Graph

The traversers return iterators.

Traverse a graph that looks like this (numbered breadth first):

```
 1     2
 | \   |
 3  4--5
 |
 6
```

```javascript
const { GraphBuilder, Traversers } = require('graph-builder');
const graph = GraphBuilder.directed().allowsSelfLoops(true).build();
graph.putEdge(1, 3);
graph.putEdge(1, 4);
graph.putEdge(2, 5);
graph.putEdge(4, 5);
graph.putEdge(3, 6);
```

Iterate breadth first:

```javascript
const nodeIterator = Traversers.forGraph(graph).breadthFirst(1, 2); // starting from root nodes, 1 & 2
console.log(Array.from(nodeIterator).join(', '));
// prints: 1, 2, 3, 4, 5, 6,
```

Iterate depth first preorder:

```javascript
const nodeIterator = Traversers.forGraph(graph).depthFirstPreOrder(1, 2); // starting from root nodes, 1 & 2
console.log(Array.from(nodeIterator).join(', '));
// prints: 1, 3, 6, 4, 5, 2
```

Iterate depth first postorder:

```javascript
const nodeIterator = Traversers.forGraph(graph).depthFirstPostOrder(1, 2); // starting from root nodes, 1 & 2
console.log(Array.from(nodeIterator).join(', '));
// prints: 6, 3, 5, 4, 1, 2
```

## More

See the full [API
documentation](https://github.com/sorohan/graph-builder/blob/master/markdown/graph-builder.md) for usage.

Full `typescript` typings are also provided.