import { BaseGraph } from "./BaseGraph";
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
 */

/**
 * A class to facilitate the set returned by {@link Graph#edges()}.
 *
 * @author James Sexton
 */
export abstract class EndpointPairIterator<N> implements Iterator<EndpointPair<N>> {
  abstract next(value?: any): IteratorResult<EndpointPair<N>>;

  private nodeIterator: Iterator<N>;

  private nextNode?: IteratorResult<N>; // null is safe as an initial value because graphs don't allow null nodes
  protected successorIterator: Iterator<N> = {
    next: () => ({ done: true, value: undefined as unknown as N }),
  };

  static of<N>(graph: BaseGraph<N>): EndpointPairIterator<N> {
    return graph.isDirected() ? new Directed<N>(graph) : new Undirected<N>(graph);
  }

  constructor(private graph: BaseGraph<N>) {
    this.nodeIterator = graph.nodes()[Symbol.iterator]();
  }

  protected get node(): N {
    if (!this.nextNode || !this.nextNode.value) {
      throw new Error('No node');
    }
    return this.nextNode.value;
  }

  /**
   * Called after {@link #successorIterator} is exhausted. Advances {@link #node} to the next node
   * and updates {@link #successorIterator} to iterate through the successors of {@link #node}.
   */
  protected advance(): boolean {
    this.nextNode = this.nodeIterator.next();
    if (this.nextNode.done) {
      return false;
    }
    this.successorIterator = this.graph.successors(this.nextNode.value)[Symbol.iterator]();
    return true;
  }
}

/**
 * If the graph is directed, each ordered [source, target] pair will be visited once if there is
 * an edge connecting them.
 */
class Directed<N> extends EndpointPairIterator<N> {
  next(): IteratorResult<EndpointPair<N>> {
    while (true) {
      const successNext = this.successorIterator.next();
      if (!successNext.done) {
        return {
          done: false,
          value: EndpointPair.ordered<N>(this.node, successNext.value),
        };
      }
      if (!this.advance()) {
        return {
          done: true,
          value: undefined as unknown as EndpointPair<N>,
        };
      }
    }
  }
}

/**
 * If the graph is undirected, each unordered [node, otherNode] pair (except self-loops) will be
 * visited twice if there is an edge connecting them. To avoid returning duplicate {@link
  * EndpointPair}s, we keep track of the nodes that we have visited. When processing endpoint
  * pairs, we skip if the "other node" is in the visited set, as shown below:
  *
  * <pre>
  * Nodes = {N1, N2, N3, N4}
  *    N2           __
  *   /  \         |  |
  * N1----N3      N4__|
  *
  * Visited Nodes = {}
  * EndpointPair [N1, N2] - return
  * EndpointPair [N1, N3] - return
  * Visited Nodes = {N1}
  * EndpointPair [N2, N1] - skip
  * EndpointPair [N2, N3] - return
  * Visited Nodes = {N1, N2}
  * EndpointPair [N3, N1] - skip
  * EndpointPair [N3, N2] - skip
  * Visited Nodes = {N1, N2, N3}
  * EndpointPair [N4, N4] - return
  * Visited Nodes = {N1, N2, N3, N4}
  * </pre>
  */
class Undirected<N> extends EndpointPairIterator<N> {
  private visitedNodes: Set<N>;

  constructor(graph: BaseGraph<N>) {
    super(graph);
    this.visitedNodes = new Set<N>();
  }

  next() {
    while (true) {
      const successNext = this.successorIterator.next();
      while (!successNext.done) {
        const otherNode: N = successNext.value;
        if (!this.visitedNodes.has(otherNode)) {
          return {
            value: EndpointPair.unordered(this.node, otherNode),
            done: false,
          };
        }
      }
      // Add to visited set *after* processing neighbors so we still include self-loops.
      this.visitedNodes.add(this.node);
      if (!this.advance()) {
        this.visitedNodes = new Set<N>();
        return {
          done: true,
          value: undefined as unknown as EndpointPair<N>,
        };
      }
    }
  }
}