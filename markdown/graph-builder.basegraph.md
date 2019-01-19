[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [BaseGraph](./graph-builder.basegraph.md)

# BaseGraph interface

A non-public interface for the methods shared between [Graph](./graph-builder.graph.md) and [ValueGraph](./graph-builder.valuegraph.md)<!-- -->.

## Methods

|  Method | Returns | Description |
|  --- | --- | --- |
|  [`adjacentNodes(node)`](./graph-builder.basegraph.adjacentnodes.md) | `Set<N>` | Returns the nodes which have an incident edge in common with `node` in this graph.<p/>throws IllegalArgumentException if `node` is not an element of this graph |
|  [`allowsSelfLoops()`](./graph-builder.basegraph.allowsselfloops.md) | `boolean` | Returns true if this graph allows self-loops (edges that connect a node to itself). Attempting to add a self-loop to a graph that does not allow them will throw an IllegalArgumentException<!-- -->. |
|  [`degree(node)`](./graph-builder.basegraph.degree.md) | `number` | Returns the count of `node`<!-- -->'s incident edges, counting self-loops twice (equivalently, the number of times an edge touches `node`<!-- -->).<p/><p>For directed graphs, this is equal to `inDegree(node) + outDegree(node)`<!-- -->.<p/><p>For undirected graphs, this is equal to `incidentEdges(node).size()` + (number of self-loops incident to `node`<!-- -->).<p/><p>If the count is greater than `Integer.MAX_VALUE`<!-- -->, returns `Integer.MAX_VALUE`<!-- -->.<p/>throws IllegalArgumentException if `node` is not an element of this graph |
|  [`edges()`](./graph-builder.basegraph.edges.md) | `Set<EndpointPair<N>>` | Returns all edges in this graph. |
|  [`hasEdge(nodeU, nodeV)`](./graph-builder.basegraph.hasedge.md) | `boolean` | Returns true if there is an edge that directly connects `nodeU` to `nodeV`<!-- -->. This is equivalent to `nodes().contains(nodeU) && successors(nodeU).contains(nodeV)`<!-- -->.<p/><p>In an undirected graph, this is equal to `hasEdgeConnecting(nodeV, nodeU)`<!-- -->. |
|  [`hasEdgeConnectingEndpoints(endpoints)`](./graph-builder.basegraph.hasedgeconnectingendpoints.md) | `boolean` | Returns true if there is an edge that directly connects `endpoints` (in the order, if any, specified by `endpoints`<!-- -->). This is equivalent to `edges().contains(endpoints)`<!-- -->.<p/><p>Unlike the other `EndpointPair`<!-- -->-accepting methods, this method does not throw if the endpoints are unordered; it simply returns false. This is for consistency with the behavior of Collection.contains (which does not generally throw if the object cannot be present in the collection), and the desire to have this method's behavior be compatible with `edges().contains(endpoints)`<!-- -->. |
|  [`incidentEdges(node)`](./graph-builder.basegraph.incidentedges.md) | `Set<EndpointPair<N>>` | Returns the edges in this graph whose endpoints include `node`<!-- -->.<p/>throws IllegalArgumentException if `node` is not an element of this graph |
|  [`inDegree(node)`](./graph-builder.basegraph.indegree.md) | `number` | Returns the count of `node`<!-- -->'s incoming edges (equal to `predecessors(node).size()`<!-- -->) in a directed graph. In an undirected graph, returns the degree<!-- -->.<p/><p>If the count is greater than `Integer.MAX_VALUE`<!-- -->, returns `Integer.MAX_VALUE`<!-- -->.<p/>throws IllegalArgumentException if `node` is not an element of this graph |
|  [`isDirected()`](./graph-builder.basegraph.isdirected.md) | `boolean` | Returns true if the edges in this graph are directed. Directed edges connect a [EndpointPair.source](./graph-builder.endpointpair.source.md) to a [EndpointPair.target](./graph-builder.endpointpair.target.md)<!-- -->, while undirected edges connect a pair of nodes to each other. |
|  [`nodeOrder()`](./graph-builder.basegraph.nodeorder.md) | `ElementOrder<N>` | Returns the order of iteration for the elements of nodes<!-- -->. |
|  [`nodes()`](./graph-builder.basegraph.nodes.md) | `Set<N>` | Returns all nodes in this graph, in the order specified by nodeOrder<!-- -->. |
|  [`outDegree(node)`](./graph-builder.basegraph.outdegree.md) | `number` | Returns the count of `node`<!-- -->'s outgoing edges (equal to `successors(node).size()`<!-- -->) in a directed graph. In an undirected graph, returns the degree<!-- -->.<p/><p>If the count is greater than `Integer.MAX_VALUE`<!-- -->, returns `Integer.MAX_VALUE`<!-- -->.<p/>throws IllegalArgumentException if `node` is not an element of this graph |
|  [`predecessors(node)`](./graph-builder.basegraph.predecessors.md) | `Set<N>` | Returns all nodes in this graph adjacent to `node` which can be reached by traversing `node`<!-- -->'s incoming edges <i>against</i> the direction (if any) of the edge.<p/><p>In an undirected graph, this is equivalent to adjacentNodes<!-- -->.<p/>throws IllegalArgumentException if `node` is not an element of this graph |
|  [`successors(node)`](./graph-builder.basegraph.successors.md) | `Set<N>` | Returns all nodes in this graph adjacent to `node` which can be reached by traversing `node`<!-- -->'s outgoing edges in the direction (if any) of the edge.<p/><p>In an undirected graph, this is equivalent to adjacentNodes<!-- -->.<p/><p>This is <i>not</i> the same as "all nodes reachable from `node` by following outgoing edges". For that functionality, see Graphs.reachableNodes<!-- -->.<p/>throws IllegalArgumentException if `node` is not an element of this graph |
