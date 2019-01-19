import { BaseGraph } from "./BaseGraph";

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
 *
 * Modifications (C) 2019 Ben Sorohan
 */

/**
 * An interface for <a
 * href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data,
 * whose edges are anonymous entities with no identity or information of their own.
 *
 * @remarks
 *
 * <p>A graph is composed of a set of nodes and a set of edges connecting pairs of nodes.
 *
 * <p>There are three primary interfaces provided to represent graphs. In order of increasing
 * complexity they are: {@link Graph}, {@link ValueGraph}, and {@link Network}. You should generally
 * prefer the simplest interface that satisfies your use case. See the <a
 * href="https://github.com/google/guava/wiki/GraphsExplained#choosing-the-right-graph-type">
 * "Choosing the right graph type"</a> section of the Guava User Guide for more details.
 *
 * **Capabilities**
 *
 * <p>`Graph` supports the following use cases (<a
 * href="https://github.com/google/guava/wiki/GraphsExplained#definitions">definitions of
 * terms</a>):
 *
 * <ul>
 *   <li>directed graphs
 *   <li>undirected graphs
 *   <li>graphs that do/don't allow self-loops
 *   <li>graphs whose nodes/edges are insertion-ordered, sorted, or unordered
 * </ul>
 *
 * <p>`Graph` explicitly does not support parallel edges, and forbids implementations or
 * extensions with parallel edges. If you need parallel edges, use {@link Network}.
 *
 * **Building a `Graph`**
 *
 * <p>The implementation classes that `common.graph` provides are not public, by design. To
 * create an instance of one of the built-in implementations of `Graph`, use the {@link
 * GraphBuilder} class:
 *
 * ```typescript
 * MutableGraph<Integer> graph = GraphBuilder.undirected().build();
 * ```
 *
 * <p>{@link GraphBuilder.build} returns an instance of {@link MutableGraph}, which is a subtype
 * of `Graph` that provides methods for adding and removing nodes and edges. If you do not
 * need to mutate a graph (e.g. if you write a method than runs a read-only algorithm on the graph),
 * you should use the non-mutating {@link Graph} interface, or an {@link ImmutableGraph}.
 *
 * <p>You can create an immutable copy of an existing `Graph` using {@link
 * ImmutableGraph.copyOf}:
 *
 * ```typescript
 * ImmutableGraph<Integer> immutableGraph = ImmutableGraph.copyOf(graph);
 * ```
 *
 * <p>Instances of {@link ImmutableGraph} do not implement {@link MutableGraph} (obviously!) and are
 * contractually guaranteed to be unmodifiable and thread-safe.
 *
 * <p>The Guava User Guide has <a
 * href="https://github.com/google/guava/wiki/GraphsExplained#building-graph-instances">more
 * information on (and examples of) building graphs</a>.
 *
 * **Additional documentation**
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
 * @public
 */
export interface Graph<N> extends BaseGraph<N> {
  /**
   * Returns `true` iff `object` is a {@link Graph} that has the same elements and the
   * same structural relationships as those in this graph.
   *
   * <p>Thus, two graphs A and B are equal if <b>all</b> of the following are true:
   *
   * <ul>
   *   <li>A and B have equal {@link isDirected}.
   *   <li>A and B have equal {@link nodes}.
   *   <li>A and B have equal {@link edges}.
   * </ul>
   *
   * <p>Graph properties besides {@link isDirected} do <b>not</b> affect equality.
   * For example, two graphs may be considered equal even if one allows self-loops and the other
   * doesn't. Additionally, the order in which nodes or edges are added to the graph, and the order
   * in which they are iterated over, are irrelevant.
   *
   * <p>A reference implementation of this is provided by {@link AbstractGraph.equals}.
   */
  equals(object: object): boolean
}
