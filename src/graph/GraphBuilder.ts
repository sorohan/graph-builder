import { AbstractGraphBuilder } from "./AbstractGraphBuilder";
import { Graph } from "./Graph";
import { ElementOrder } from "./ElementOrder";
import { MutableGraph } from "./MutableGraph";
import { ConfigurableMutableGraph } from "./ConfigurableMutableGraph";

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
 * A builder for constructing instances of {@link MutableGraph} with user-defined properties.
 *
 * @remarks
 *
 * A graph built by this class will have the following properties by default:
 *
 * <ul>
 *   <li>does not allow self-loops</li>
 *   <li>orders {@link Graph.nodes} in the order in which the elements were added</li>
 * </ul>
 *
 * Example of use:
 *
 * ```typescript
 * const graph: MutableGraph<String> = GraphBuilder.undirected().allowsSelfLoops(true).build();
 * graph.putEdge("bread", "bread");
 * graph.putEdge("chocolate", "peanut butter");
 * graph.putEdge("peanut butter", "jelly");
 * ```
 *
 * @public
 */
export class GraphBuilder<N> extends AbstractGraphBuilder<N> {

  /** Returns a {@link GraphBuilder} for building directed graphs. */
  public static directed<T>(): GraphBuilder<T> {
    return new GraphBuilder<T>(true);
  }

  /** Returns a {@link GraphBuilder} for building undirected graphs. */
  public static undirected<T>(): GraphBuilder<T> {
    return new GraphBuilder<T>(false);
  }

  /**
   * Returns a {@link GraphBuilder} initialized with all properties queryable from `graph`.
   *
   * <p>The "queryable" properties are those that are exposed through the {@link Graph} interface,
   * such as {@link Graph.isDirected}. Other properties, such as {@link expectedNodeCount},
   * are not set in the new builder.
   */
  public static from<T>(graph: Graph<T>): GraphBuilder<T> {
    return new GraphBuilder<T>(graph.isDirected())
        .allowsSelfLoops(graph.allowsSelfLoops())
        .nodeOrder(graph.nodeOrder());
  }

  /**
   * Specifies whether the graph will allow self-loops (edges that connect a node to itself).
   * Attempting to add a self-loop to a graph that does not allow them will throw an error.
   */
  public allowsSelfLoops(allowsSelfLoops: boolean): GraphBuilder<N> {
    this.allowsSelfLoopsValue = allowsSelfLoops;
    return this;
  }

  /**
   * Specifies the expected number of nodes in the graph.
   *
   * throws an error if `expectedNodeCount` is negative
   */
  public expectedNodeCount(expectedNodeCount: number): GraphBuilder<N> {
    this.expectedNodeCountValue = expectedNodeCount;
    return this;
  }

  /** Specifies the order of iteration for the elements of {@link Graph.nodes}. */
  public nodeOrder(nodeOrder: ElementOrder<N>): GraphBuilder<N> {
    this.nodeOrderValue = nodeOrder;
    return this;
  }

  /** Returns an empty {@link MutableGraph} with the properties of this {@link GraphBuilder}. */
  public build(): MutableGraph<N> {
    return new ConfigurableMutableGraph<N>(this);
  }
}
