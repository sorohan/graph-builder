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
 * An interface for <a
 * href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data,
 * whose edges have associated non-unique values.
 *
 * <p>A graph is composed of a set of nodes and a set of edges connecting pairs of nodes.
 *
 * <p>There are three primary interfaces provided to represent graphs. In order of increasing
 * complexity they are: {@link Graph}, {@link ValueGraph}, and {@link Network}. You should generally
 * prefer the simplest interface that satisfies your use case. See the <a
 * href="https://github.com/google/guava/wiki/GraphsExplained#choosing-the-right-graph-type">
 * "Choosing the right graph type"</a> section of the Guava User Guide for more details.
 *
 * <h3>Capabilities</h3>
 *
 * <p>`ValueGraph` supports the following use cases (<a
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
 * <p>`ValueGraph`, as a subtype of `Graph`, explicitly does not support parallel edges,
 * and forbids implementations or extensions with parallel edges. If you need parallel edges, use
 * {@link Network}. (You can use a positive `Integer` edge value as a loose representation of
 * edge multiplicity, but the `*degree()` and mutation methods will not reflect your
 * interpretation of the edge value as its multiplicity.)
 *
 * <h3>Building a `ValueGraph`</h3>
 *
 * <p>The implementation classes that `common.graph` provides are not public, by design. To
 * create an instance of one of the built-in implementations of `ValueGraph`, use the {@link
 * ValueGraphBuilder} class:
 *
 * <pre>{@code
 * MutableValueGraph<Integer, Double> graph = ValueGraphBuilder.directed().build();
 * }</pre>
 *
 * <p>{@link ValueGraphBuilder.build()} returns an instance of {@link MutableValueGraph}, which is a
 * subtype of `ValueGraph` that provides methods for adding and removing nodes and edges. If
 * you do not need to mutate a graph (e.g. if you write a method than runs a read-only algorithm on
 * the graph), you should use the non-mutating {@link ValueGraph} interface, or an {@link
 * ImmutableValueGraph}.
 *
 * <p>You can create an immutable copy of an existing `ValueGraph` using {@link
 * ImmutableValueGraph#copyOf(ValueGraph)}:
 *
 * <pre>{@code
 * ImmutableValueGraph<Integer, Double> immutableGraph = ImmutableValueGraph.copyOf(graph);
 * }</pre>
 *
 * <p>Instances of {@link ImmutableValueGraph} do not implement {@link MutableValueGraph}
 * (obviously!) and are contractually guaranteed to be unmodifiable and thread-safe.
 *
 * <p>The Guava User Guide has <a
 * href="https://github.com/google/guava/wiki/GraphsExplained#building-graph-instances">more
 * information on (and examples of) building graphs</a>.
 *
 * <h3>Additional documentation</h3>
 *
 * <p>See the Guava User Guide for the `common.graph` package (<a
 * href="https://github.com/google/guava/wiki/GraphsExplained">"Graphs Explained"</a>) for
 * additional documentation, including:
 *
 * <ul>
 *   <li><a
 *       href="https://github.com/google/guava/wiki/GraphsExplained#equals-hashcode-and-graph-equivalence">
 *       `equals()`, `hashCode()`, and graph equivalence</a>
 *   <li><a href="https://github.com/google/guava/wiki/GraphsExplained#synchronization">
 *       Synchronization policy</a>
 *   <li><a href="https://github.com/google/guava/wiki/GraphsExplained#notes-for-implementors">Notes
 *       for implementors</a>
 * </ul>
 *
 * @author James Sexton
 * @author Joshua O'Madadhain
 * @param <N> Node parameter type
 * @param <V> Value parameter type
 * @since 20.0
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
   * any, specified by `endpoints`), if one is present;
   * otherwise, returns `Optional.empty()`.
   *
   * throws IllegalArgumentException if `nodeU` or `nodeV` is not an element of this
   *     graph
   * @since 23.0 (since 20.0 with return type `V`)
   */
  edgeValue(nodeU: N, nodeV: N): V | undefined;

  /**
   * Returns the value of the edge that connects `endpoints` (in the order, if any, specified
   * by `endpoints`), if one is present; otherwise, returns `Optional.empty()`.
   *
   * <p>If this graph is directed, the endpoints must be ordered.
   *
   * throws IllegalArgumentException if either endpoint is not an element of this graph
   * throws IllegalArgumentException if the endpoints are unordered and the graph is directed
   * @since NEXT
   */
  edgeValueConnectingEndpoints(endpoints: EndpointPair<N>): V | undefined;

  /**
   * Returns the value of the edge that connects `nodeU` to `nodeV`, if one is present;
   * otherwise, returns `defaultValue`.
   *
   * <p>In an undirected graph, this is equal to {@code edgeValueOrDefault(nodeV, nodeU,
   * defaultValue)}.
   *
   * throws IllegalArgumentException if `nodeU` or `nodeV` is not an element of this
   *     graph
   */
  edgeValueOrDefault<R>(nodeU: N, nodeV: N, defaultValue: R): V | R;

  /**
   * Returns the value of the edge that connects `endpoints` (in the order, if any, specified
   * by `endpoints`), if one is present; otherwise, returns `defaultValue`.
   *
   * <p>If this graph is directed, the endpoints must be ordered.
   *
   * throws IllegalArgumentException if either endpoint is not an element of this graph
   * throws IllegalArgumentException if the endpoints are unordered and the graph is directed
   * @since NEXT
   */
  edgeValueConnectingEndpointsOrDefault<R>(endpoints: EndpointPair<N>, defaultValue: R): V | R;

  //
  // ValueGraph identity
  //

  /**
   * Returns `true` iff `object` is a {@link ValueGraph} that has the same elements and
   * the same structural relationships as those in this graph.
   *
   * <p>Thus, two value graphs A and B are equal if <b>all</b> of the following are true:
   *
   * <ul>
   *   <li>A and B have equal {@link isDirected() directedness}.
   *   <li>A and B have equal {@link nodes() node sets}.
   *   <li>A and B have equal {@link edges() edge sets}.
   *   <li>The {@link edgeValue(Object, Object) value} of a given edge is the same in both A and B.
   * </ul>
   *
   * <p>Graph properties besides {@link isDirected() directedness} do <b>not</b> affect equality.
   * For example, two graphs may be considered equal even if one allows self-loops and the other
   * doesn't. Additionally, the order in which nodes or edges are added to the graph, and the order
   * in which they are iterated over, are irrelevant.
   *
   * <p>A reference implementation of this is provided by {@link AbstractValueGraph.equals(Object)}.
   */
  equals(obj: ValueGraph<N, V>): boolean;
}
