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
 * A functional interface for <a
 * href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)">graph</a>-structured data.
 *
 * @remarks
 *
 * <p>This interface is meant to be used as the type of a parameter to graph algorithms (such as
 * breadth first traversal) that only need a way of accessing the successors of a node in a graph.
 *
 * **Usage**
 *
 * Given an algorithm, for example:
 *
 * ```typescript
 * public <N> someGraphAlgorithm(N startNode, SuccessorsFunction<N> successorsFunction);
 * ```
 *
 * you will invoke it depending on the graph representation you're using.
 *
 * <p>If you have an instance of one of the primary `common.graph` types ({@link Graph},
 * {@link ValueGraph}, and {@link Network}):
 *
 * ```typescript
 * someGraphAlgorithm(startNode, graph);
 * ```
 *
 * This works because those types each implement `SuccessorsFunction`. It will also work with
 * any other implementation of this interface.
 *
 * <p>If you have your own graph implementation based around a custom node type `MyNode`,
 * which has a method `getChildren()` that retrieves its successors in a graph:
 *
 * ```typescript
 * someGraphAlgorithm(startNode, MyNode::getChildren);
 * ```
 *
 * <p>If you have some other mechanism for returning the successors of a node, or one that doesn't
 * return an `Iterable<? extends N>`, then you can use a lambda to perform a more general
 * transformation:
 *
 * ```typescript
 * someGraphAlgorithm(startNode, node -> ImmutableList.of(node.leftChild(), node.rightChild()));
 * ```
 *
 * <p>Graph algorithms that need additional capabilities (accessing both predecessors and
 * successors, iterating over the edges, etc.) should declare their input to be of a type that
 * provides those capabilities, such as {@link Graph}, {@link ValueGraph}, or {@link Network}.
 *
 * **Additional documentation**
 *
 * <p>See the Guava User Guide for the `common.graph` package (<a
 * href="https://github.com/google/guava/wiki/GraphsExplained">"Graphs Explained"</a>) for
 * additional documentation, including <a
 * href="https://github.com/google/guava/wiki/GraphsExplained#notes-for-implementors">notes for
 * implementors</a>
 *
 * @public
 */
export interface SuccessorsFunction<N> {
  /**
   * Returns all nodes in this graph adjacent to `node` which can be reached by traversing
   * `node`'s outgoing edges in the direction (if any) of the edge.
   *
   * <p>This is <i>not</i> the same as "all nodes reachable from `node` by following outgoing
   * edges". For that functionality, see {@link Graphs.reachableNodes}.
   *
   * <p>Some algorithms that operate on a `SuccessorsFunction` may produce undesired results
   * if the returned {@link Iterable} contains duplicate elements. Implementations of such
   * algorithms should document their behavior in the presence of duplicates.
   *
   * <p>The elements of the returned `Iterable` must each be:
   *
   * <ul>
   *   <li>Non-null
   *   <li>Usable as `Map` keys (see the Guava User Guide's section on <a
   *       href="https://github.com/google/guava/wiki/GraphsExplained#graph-elements-nodes-and-edges">
   *       graph elements</a> for details)
   * </ul>
   *
   * throws IllegalArgumentException if `node` is not an element of this graph
   */
  successors(node: N): Iterable<N>
}
