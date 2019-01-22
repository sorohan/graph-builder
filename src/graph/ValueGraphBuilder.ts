import { AbstractGraphBuilder } from "./AbstractGraphBuilder";
import { ValueGraph } from "./ValueGraph";
import { ElementOrder } from "./ElementOrder";
import { MutableValueGraph } from "./MutableValueGraph";
import { ConfigurableMutableValueGraph } from "./ConfigurableMutableValueGraph";

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
 * Modifications copyright (C) 2019 Ben Sorohan
 */

/**
 * A builder for constructing instances of {@link MutableValueGraph} with user-defined properties.
 *
 * @remarks
 *
 * A graph built by this class will have the following properties by default:
 *
 *  - does not allow self-loops
 *  - orders {@link Graph.nodes} in the order in which the elements were added
 *
 * Example of use:
 *
 * ```typescript
 * const graph: MutableValueGraph<String, number> =
 *     ValueGraphBuilder.undirected().allowsSelfLoops(true).build();
 * graph.putEdgeValue("San Francisco", "San Francisco", 0.0);
 * graph.putEdgeValue("San Jose", "San Jose", 0.0);
 * graph.putEdgeValue("San Francisco", "San Jose", 48.4);
 * ```
 *
 * @public
 */
export class ValueGraphBuilder<N, V> extends AbstractGraphBuilder<N> {

  /** Creates a new instance with the specified edge directionality. */
  private constructor (directed: boolean) {
    super(directed);
  }

  /** Returns a {@link ValueGraphBuilder} for building directed graphs. */
  public static directed<N, V>(): ValueGraphBuilder<N, V> {
    return new ValueGraphBuilder<N, V>(true);
  }

  /** Returns a {@link ValueGraphBuilder} for building undirected graphs. */
  public static undirected<N, V>(): ValueGraphBuilder<N, V> {
    return new ValueGraphBuilder<N, V>(false);
  }

  /**
   * Returns a {@link ValueGraphBuilder} initialized with all properties queryable from
   * `graph`.
   *
   * <p>The "queryable" properties are those that are exposed through the {@link ValueGraph}
   * interface, such as {@link ValueGraph.isDirected}. Other properties, such as {@link
   * expectedNodeCount}, are not set in the new builder.
   */
  public static from<N, V>(graph: ValueGraph<N, V>): ValueGraphBuilder<N, V> {
    return new ValueGraphBuilder<N, V>(graph.isDirected())
        .allowsSelfLoops(graph.allowsSelfLoops())
        .nodeOrder(graph.nodeOrder());
  }

  /**
   * Specifies whether the graph will allow self-loops (edges that connect a node to itself).
   * Attempting to add a self-loop to a graph that does not allow them will throw an {@link
   * UnsupportedOperationException}.
   */
  public allowsSelfLoops(allowsSelfLoops: boolean): ValueGraphBuilder<N, V> {
    this.allowsSelfLoopsValue = allowsSelfLoops;
    return this;
  }

  /**
   * Specifies the expected number of nodes in the graph.
   *
   * throws an error if `expectedNodeCount` is negative
   */
  public expectedNodeCount(expectedNodeCount: number): ValueGraphBuilder<N, V> {
    this.expectedNodeCountValue = expectedNodeCount;
    return this;
  }

  /** Specifies the order of iteration for the elements of {@link Graph.nodes}. */
  public nodeOrder(nodeOrder: ElementOrder<N>): ValueGraphBuilder<N, V> {
    this.nodeOrderValue = nodeOrder;
    return this;
  }

  /**
   * Returns an empty {@link MutableValueGraph} with the properties of this {@link
   * ValueGraphBuilder}.
   */
  public build(): MutableValueGraph<N, V> {
    return ConfigurableMutableValueGraph.from<N, V>(this);
  }
}
