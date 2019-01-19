import { SuccessorsFunction } from "./SuccessorsFunction";
import { PredecessorsFunction } from "./PredecessorsFunction";
import { ElementOrder } from "./ElementOrder";
import { EndpointPair } from "./EndpointPair";

/*
 * Copyright (C) 2017 The Guava Authors
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
 *
 * Modifications (C) 2019 Ben Sorohan
 */

/**
 * A non-public interface for the methods shared between {@link Graph} and {@link ValueGraph}.
 *
 * @public
 */
export interface BaseGraph<N> extends SuccessorsFunction<N>, PredecessorsFunction<N> {
  //
  // Graph-level accessors
  //

  /** Returns all nodes in this graph, in the order specified by {@link nodeOrder}. */
  nodes(): Set<N>;

  /** Returns all edges in this graph. */
  edges(): Set<EndpointPair<N>>;

  //
  // Graph properties
  //

  /**
   * Returns true if the edges in this graph are directed. Directed edges connect a {@link
   * EndpointPair.source} to a {@link EndpointPair.target}, while
   * undirected edges connect a pair of nodes to each other.
   */
  isDirected(): boolean;

  /**
   * Returns true if this graph allows self-loops (edges that connect a node to itself). Attempting
   * to add a self-loop to a graph that does not allow them will throw an {@link
   * IllegalArgumentException}.
   */
  allowsSelfLoops(): boolean;

  /** Returns the order of iteration for the elements of {@link nodes}. */
  nodeOrder(): ElementOrder<N>;

  //
  // Element-level accessors
  //

  /**
   * Returns the nodes which have an incident edge in common with `node` in this graph.
   *
   * throws IllegalArgumentException if `node` is not an element of this graph
   */
  adjacentNodes(node: N): Set<N>;

  /**
   * Returns all nodes in this graph adjacent to `node` which can be reached by traversing
   * `node`'s incoming edges <i>against</i> the direction (if any) of the edge.
   *
   * <p>In an undirected graph, this is equivalent to {@link adjacentNodes}.
   *
   * throws IllegalArgumentException if `node` is not an element of this graph
   */
  predecessors(node: N): Set<N>;

  /**
   * Returns all nodes in this graph adjacent to `node` which can be reached by traversing
   * `node`'s outgoing edges in the direction (if any) of the edge.
   *
   * <p>In an undirected graph, this is equivalent to {@link adjacentNodes}.
   *
   * <p>This is <i>not</i> the same as "all nodes reachable from `node` by following outgoing
   * edges". For that functionality, see {@link Graphs.reachableNodes}.
   *
   * throws IllegalArgumentException if `node` is not an element of this graph
   */
  successors(node: N): Set<N>;

  /**
   * Returns the edges in this graph whose endpoints include `node`.
   *
   * throws IllegalArgumentException if `node` is not an element of this graph
   */
  incidentEdges(node: N): Set<EndpointPair<N>>;

  /**
   * Returns the count of `node`'s incident edges, counting self-loops twice (equivalently,
   * the number of times an edge touches `node`).
   *
   * <p>For directed graphs, this is equal to `inDegree(node) + outDegree(node)`.
   *
   * <p>For undirected graphs, this is equal to `incidentEdges(node).size()` + (number of
   * self-loops incident to `node`).
   *
   * <p>If the count is greater than `Integer.MAX_VALUE`, returns `Integer.MAX_VALUE`.
   *
   * throws IllegalArgumentException if `node` is not an element of this graph
   */
  degree(node: N): number;

  /**
   * Returns the count of `node`'s incoming edges (equal to `predecessors(node).size()`)
   * in a directed graph. In an undirected graph, returns the {@link degree}.
   *
   * <p>If the count is greater than `Integer.MAX_VALUE`, returns `Integer.MAX_VALUE`.
   *
   * throws IllegalArgumentException if `node` is not an element of this graph
   */
  inDegree(node: N): number;

  /**
   * Returns the count of `node`'s outgoing edges (equal to `successors(node).size()`)
   * in a directed graph. In an undirected graph, returns the {@link degree}.
   *
   * <p>If the count is greater than `Integer.MAX_VALUE`, returns `Integer.MAX_VALUE`.
   *
   * throws IllegalArgumentException if `node` is not an element of this graph
   */
  outDegree(node: N): number;

  /**
   * Returns true if there is an edge that directly connects `nodeU` to `nodeV`. This is
   * equivalent to `nodes().contains(nodeU) && successors(nodeU).contains(nodeV)`.
   *
   * <p>In an undirected graph, this is equal to `hasEdgeConnecting(nodeV, nodeU)`.
   */
  hasEdge(nodeU: N, nodeV: N): boolean;

  /**
   * Returns true if there is an edge that directly connects `endpoints` (in the order, if
   * any, specified by `endpoints`). This is equivalent to
   * `edges().contains(endpoints)`.
   *
   * <p>Unlike the other `EndpointPair`-accepting methods, this method does not throw if the
   * endpoints are unordered; it simply returns false. This is for consistency with the behavior of
   * {@link Collection.contains} (which does not generally throw if the object cannot be
   * present in the collection), and the desire to have this method's behavior be compatible with
   * `edges().contains(endpoints)`.
   */
  hasEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean;
}
