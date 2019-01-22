[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [EndpointPair](./graph-builder.endpointpair.md)

# EndpointPair class

An immutable pair representing the two endpoints of an edge in a graph. The [EndpointPair](./graph-builder.endpointpair.md) of a directed edge is an ordered pair of nodes ([EndpointPair.source](./graph-builder.endpointpair.source.md) and [EndpointPair.target](./graph-builder.endpointpair.target.md)<!-- -->). The [EndpointPair](./graph-builder.endpointpair.md) of an undirected edge is an unordered pair of nodes ([EndpointPair.nodeU](./graph-builder.endpointpair.nodeu.md) and [EndpointPair.nodeV](./graph-builder.endpointpair.nodev.md)<!-- -->).

The edge is a self-loop if, and only if, the two endpoints are equal.

## Properties

|  Property | Access Modifier | Type | Description |
|  --- | --- | --- | --- |
|  [`nodeU`](./graph-builder.endpointpair.nodeu.md) |  | `N` |  |
|  [`nodeV`](./graph-builder.endpointpair.nodev.md) |  | `N` |  |

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`constructor(nodeU, nodeV)`](./graph-builder.endpointpair.constructor.md) |  |  | Constructs a new instance of the [EndpointPair](./graph-builder.endpointpair.md) class |
|  [`adjacentNode(node)`](./graph-builder.endpointpair.adjacentnode.md) |  | `N` | Returns the node that is adjacent to `node` along the origin edge.<p/>Throws an error if this [EndpointPair](./graph-builder.endpointpair.md) does not contain `node`<!-- -->. |
|  [`equals(obj)`](./graph-builder.endpointpair.equals.md) |  | `boolean` | Two ordered [EndpointPair](./graph-builder.endpointpair.md)<!-- -->s are equal if their [EndpointPair.source](./graph-builder.endpointpair.source.md) and [EndpointPair.target](./graph-builder.endpointpair.target.md) are equal. Two unordered [EndpointPair](./graph-builder.endpointpair.md)<!-- -->s are equal if they contain the same nodes. An ordered [EndpointPair](./graph-builder.endpointpair.md) is never equal to an unordered [EndpointPair](./graph-builder.endpointpair.md)<!-- -->. |
|  [`isOrdered()`](./graph-builder.endpointpair.isordered.md) |  | `boolean` | Returns `true` if this [EndpointPair](./graph-builder.endpointpair.md) is an ordered pair (i.e. represents the endpoints of a directed edge). |
|  [`of(graph, nodeU, nodeV)`](./graph-builder.endpointpair.of.md) |  | `EndpointPair<N>` | Returns an [EndpointPair](./graph-builder.endpointpair.md) representing the endpoints of an edge in `graph`<!-- -->. |
|  [`ordered(source, target)`](./graph-builder.endpointpair.ordered.md) |  | `EndpointPair<N>` | Returns an [EndpointPair](./graph-builder.endpointpair.md) representing the endpoints of a directed edge. |
|  [`source()`](./graph-builder.endpointpair.source.md) |  | `N` | If this [EndpointPair](./graph-builder.endpointpair.md) [EndpointPair.isOrdered](./graph-builder.endpointpair.isordered.md)<!-- -->, returns the node which is the source.<p/>Throws an error if this [EndpointPair](./graph-builder.endpointpair.md) is not ordered. |
|  [`target()`](./graph-builder.endpointpair.target.md) |  | `N` | If this [EndpointPair](./graph-builder.endpointpair.md) [EndpointPair.isOrdered](./graph-builder.endpointpair.isordered.md)<!-- -->, returns the node which is the target.<p/>Throws an error if this [EndpointPair](./graph-builder.endpointpair.md) is not ordered. |
|  [`unordered(nodeU, nodeV)`](./graph-builder.endpointpair.unordered.md) |  | `EndpointPair<N>` | Returns an [EndpointPair](./graph-builder.endpointpair.md) representing the endpoints of an undirected edge. |

