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
 * @public
 */
export interface PredecessorsAccessor<N> {
  predecessors: PredecessorsFunction<N>
}

/**
 * A functional interface for <a
 * href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data.
 *
 * @remarks
 *
 * This interface is meant to be used as the type of a parameter to graph algorithms (such as
 * topological sort) that only need a way of accessing the predecessors of a node in a graph.
 *
 * <b>Usage</b>
 *
 * Given an algorithm, for example:
 *
 * ```typescript
 * public someGraphAlgorithm<N>(startNode: N, predecessorsFunction: PredecessorsFunction<N>);
 * ```
 *
 * you will invoke it depending on the graph representation you're using.
 *
 * If you have an instance of one of the primary `common.graph` types ({@link Graph},
 * {@link ValueGraph}, and {@link Network}):
 *
 * ```typescript
 * someGraphAlgorithm(startNode, graph);
 * ```
 *
 * This works because those types each implement `PredecessorsFunction`. It will also work
 * with any other implementation of this interface.
 *
 * If you have your own graph implementation based around a custom node type `MyNode`,
 * which has a method `getParents()` that retrieves its predecessors in a graph:
 *
 * ```typescript
 * someGraphAlgorithm(startNode, MyNode.getParents);
 * ```
 *
 * If you have some other mechanism for returning the predecessors of a node, or one that doesn't
 * return a `Iterable<N>`, then you can use a lambda to perform a more general
 * transformation:
 *
 * ```typescript
 * someGraphAlgorithm(startNode, node => [node.mother(), node.father()]);
 * ```
 *
 * Graph algorithms that need additional capabilities (accessing both predecessors and
 * successors, iterating over the edges, etc.) should declare their input to be of a type that
 * provides those capabilities, such as {@link Graph}, {@link ValueGraph}, or {@link Network}.
 *
 * @public
 */
export interface PredecessorsFunction<N> {
  /**
   * Returns all nodes in this graph adjacent to `node` which can be reached by traversing
   * `node`'s incoming edges <i>against</i> the direction (if any) of the edge.
   *
   * Some algorithms that operate on a `PredecessorsFunction` may produce undesired results
   * if the returned `Iterable` contains duplicate elements. Implementations of such
   * algorithms should document their behavior in the presence of duplicates.
   *
   * The elements of the returned `Iterable` must each be unique to the graph.
   *
   * Throws if `node` is not an element of this graph.
   */
  (node: N): Iterable<N>
}
