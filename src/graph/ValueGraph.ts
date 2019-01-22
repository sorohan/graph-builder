import { BaseGraph } from "./BaseGraph";
import { Graph } from "./Graph";
import { EndpointPair } from "./EndpointPair";

/*
 * Copyright (C) 2016 The Guava Authors
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
 * A subinterface of {@link BaseGraph} for <a
 * href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data,
 * whose edges have associated non-unique values
 *
 * @remarks
 *
 * A graph is composed of a set of nodes and a set of edges connecting pairs of nodes.
 *
 * There are three primary interfaces provided to represent graphs. In order of increasing
 * complexity they are: {@link Graph}, {@link ValueGraph}, and {@link Network}. You should generally
 * prefer the simplest interface that satisfies your use case. See the <a
 * href="https://github.com/google/guava/wiki/GraphsExplained#choosing-the-right-graph-type">
 * "Choosing the right graph type"</a> section of the Guava User Guide for more details.
 *
 * <b>Capabilities</b>
 *
 * `ValueGraph` supports the following use cases (<a
 * href="https://github.com/google/guava/wiki/GraphsExplained#definitions">definitions of
 * terms</a>):
 *
 * <ul>
 *   <li>directed graphs
 *   <li>undirected graphs
 *   <li>graphs that do/don't allow self-loops
 *   <li>graphs whose nodes/edges are insertion-ordered, sorted, or unordered
 *   <li>graphs whose edges have associated values
 * </ul>
 *
 * `ValueGraph`, as a subtype of `Graph`, explicitly does not support parallel edges,
 * and forbids implementations or extensions with parallel edges. If you need parallel edges, use
 * {@link Network}. (You can use a positive `Integer` edge value as a loose representation of
 * edge multiplicity, but the `*degree()` and mutation methods will not reflect your
 * interpretation of the edge value as its multiplicity.)
 *
 * <b>Building a `ValueGraph`</b>
 *
 * The implementation classes that are provided are not public, by design. To
 * create an instance of one of the built-in implementations of `ValueGraph`, use the {@link
 * ValueGraphBuilder} class:
 *
 * ```typescript
 * const graph: MutableValueGraph<number, number> = ValueGraphBuilder.directed().build();
 * ```
 *
 * {@link ValueGraphBuilder.build} returns an instance of {@link MutableValueGraph}, which is a
 * subtype of `ValueGraph` that provides methods for adding and removing nodes and edges. If
 * you do not need to mutate a graph (e.g. if you write a method than runs a read-only algorithm on
 * the graph), you should use the non-mutating {@link ValueGraph} interface, or an {@link
 * ImmutableValueGraph}.
 *
 * You can create an immutable copy of an existing `ValueGraph` using {@link
 * ImmutableValueGraph.copyOf}:
 *
 * ```typescript
 * const immutableGraph: ImmutableValueGraph<number, number>  = ImmutableValueGraph.copyOf(graph);
 * ```
 *
 * Instances of {@link ImmutableValueGraph} do not implement {@link MutableValueGraph}
 * (obviously!) and are contractually guaranteed to be unmodifiable.
 *
 * @public
 */
export interface ValueGraph<N, V> extends BaseGraph<N> {
  //
  // ValueGraph-level accessors
  //

  /**
   * Returns a live view of this graph as a {@link Graph}. The resulting {@link Graph} will have an
   * edge connecting node A to node B if this {@link ValueGraph} has an edge connecting A to B.
   */
  asGraph(): Graph<N>;

  //
  // Element-level accessors
  //

  /**
   * Returns the value of the edge that connects `nodeU` to `nodeV` (in the order, if
   * any, specified by `endpoints`), if one is present; otherwise, returns undefined.
   *
   * Throws if `nodeU` or `nodeV` is not an element of this graph.
   */
  edgeValue(nodeU: N, nodeV: N): V | undefined;

  /**
   * Returns the value of the edge that connects `endpoints` (in the order, if any, specified
   * by `endpoints`), if one is present; otherwise, returns undefined.
   *
   * If this graph is directed, the endpoints must be ordered.
   *
   * Throws if either endpoint is not an element of this graph.
   *
   * Throws if the endpoints are unordered and the graph is directed.
   */
  edgeValueConnectingEndpoints(endpoints: EndpointPair<N>): V | undefined;

  /**
   * Returns the value of the edge that connects `nodeU` to `nodeV`, if one is present;
   * otherwise, returns `defaultValue`.
   *
   * In an undirected graph, this is equal to `edgeValueOrDefault(nodeV, nodeU, defaultValue)`.
   *
   * Throws if `nodeU` or `nodeV` is not an element of this graph.
   */
  edgeValueOrDefault<R>(nodeU: N, nodeV: N, defaultValue: R): V | R;

  /**
   * Returns the value of the edge that connects `endpoints` (in the order, if any, specified
   * by `endpoints`), if one is present; otherwise, returns `defaultValue`.
   *
   * If this graph is directed, the endpoints must be ordered.
   *
   * Throws if either endpoint is not an element of this graph.
   *
   * Throws if the endpoints are unordered and the graph is directed.
   */
  edgeValueConnectingEndpointsOrDefault<R>(endpoints: EndpointPair<N>, defaultValue: R): V | R;

  //
  // ValueGraph identity
  //

  /**
   * Returns `true` iff `object` is a {@link ValueGraph} that has the same elements and
   * the same structural relationships as those in this graph.
   *
   * Thus, two value graphs A and B are equal if <b>all</b> of the following are true:
   *
   * <ul>
   *   <li>A and B have equal {@link BaseGraph.isDirected}.
   *   <li>A and B have equal {@link BaseGraph.nodes}.
   *   <li>A and B have equal {@link BaseGraph.edges}.
   *   <li>The {@link ValueGraph.edgeValue} of a given edge is the same in both A and B.
   * </ul>
   *
   * Graph properties besides {@link BaseGraph.isDirected} do <b>not</b> affect equality.
   * For example, two graphs may be considered equal even if one allows self-loops and the other
   * doesn't. Additionally, the order in which nodes or edges are added to the graph, and the order
   * in which they are iterated over, are irrelevant.
   */
  equals(object: ValueGraph<N, V>): boolean;
}
