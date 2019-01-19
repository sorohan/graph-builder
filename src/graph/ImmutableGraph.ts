import { ForwardingGraph } from "./ForwardingGraph";
import { BaseGraph } from "./BaseGraph";
import { Graph } from "./Graph";
import { GraphConstants } from "./GraphConstants";

/*
 * Copyright (C) 2014 The Guava Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A {@link Graph} whose elements and structural relationships will never change. Instances of this
 * class may be obtained with {@link #copyOf(Graph)}.
 *
 * <p>See the Guava User's Guide's <a
 * href="https://github.com/google/guava/wiki/GraphsExplained#immutable-implementations">discussion
 * of the {@code Immutable*} types</a> for more information on the properties and guarantees
 * provided by this class.
 *
 * @author James Sexton
 * @author Joshua O'Madadhain
 * @author Omar Darwish
 * @param <N> Node parameter type
 * @since 20.0
 */
export class ImmutableGraph<N> extends ForwardingGraph<N> {
  constructor(private backingGraph: BaseGraph<N>) {
    super();
  }

  /** Returns an immutable copy of {@code graph}. */
  // public static copyOf<T>(graph: Graph<T>): ImmutableGraph<T> {
  //   return (graph instanceof ImmutableGraph)
  //       ? graph
  //       : new ImmutableGraph<T>(
  //           new ConfigurableValueGraph<T, GraphConstants.Presence>(
  //               GraphBuilder.from(graph), ImmutableGraph.getNodeConnections(graph), graph.edges().size));
  // }

  // private static getNodeConnections<T>(graph: Graph<T> ): ImmutableMap<T, GraphConnections<T, GraphConstants.Presence>> {
  //   // ImmutableMap.Builder maintains the order of the elements as inserted, so the map will have
  //   // whatever ordering the graph's nodes do, so ImmutableSortedMap is unnecessary even if the
  //   // input nodes are sorted.
  //   const nodeConnections: ImmutableMap.Builder<T, GraphConnections<T, GraphConstants.Presence>> = ImmutableMap.builder();
  //   for (const node of graph.nodes()) {
  //     nodeConnections.put(node, ImmutableGraph.connectionsOf(graph, node));
  //   }
  //   return nodeConnections.build();
  // }

  // private static connectionsOf<N>(graph: Graph<N>, node: N): GraphConnections<N, GraphConstants.> {
  //   // Function<Object, Presence> edgeValueFn = Functions.constant(Presence.EDGE_EXISTS);
  //   const edgeValueFn = () => GraphConstants.Presence.EDGE_EXISTS;
  //   return graph.isDirected()
  //       ? DirectedGraphConnections.ofImmutable(
  //           graph.predecessors(node), Maps.asMap(graph.successors(node), edgeValueFn))
  //       : UndirectedGraphConnections.ofImmutable(
  //           Maps.asMap(graph.adjacentNodes(node), edgeValueFn));
  // }

  protected delegate(): BaseGraph<N> {
    return this.backingGraph;
  }
}
