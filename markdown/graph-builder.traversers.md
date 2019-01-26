[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [Traversers](./graph-builder.traversers.md)

# Traversers class

Create a traverser for traversing a graph or tree.

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`forGraph(graph)`](./graph-builder.traversers.forgraph.md) |  | `Traverser<N>` | Creates a new [Traverser](./graph-builder.traverser.md) for the given general `graph`<!-- -->. |
|  [`forTree(tree)`](./graph-builder.traversers.fortree.md) |  | `Traverser<N>` | Creates a new [Traverser](./graph-builder.traverser.md) for a directed acyclic graph that has at most one path from the start node(s) to any node reachable from the start node(s), and has no paths from any start node to any other start node, such as a tree or forest. |

## Remarks

There are two entry points for creating a `Traverser`<!-- -->: [Traversers.forTree](./graph-builder.traversers.fortree.md) and [Traversers.forGraph](./graph-builder.traversers.forgraph.md)<!-- -->. You should choose one based on your answers to the following question:

Is there only one path to any node that's reachable from any start node? (If so, the graph to be traversed is a tree or forest even if it is a subgraph of a graph which is neither.)

If your answer is:

- (1) "no" use [Traversers.forGraph](./graph-builder.traversers.forgraph.md)<!-- -->.

- (1) "yes" use [Traversers.forTree](./graph-builder.traversers.fortree.md)<!-- -->.
