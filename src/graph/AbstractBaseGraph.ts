import { BaseGraph } from "./BaseGraph";
import { Iterators } from "../collect/Iterators";
import { Sets } from "../collect/Sets";
import { ElementOrder } from "./ElementOrder";
import { EndpointPair } from "./EndpointPair";
import { ImmutableSet } from "../collect/ImmutableSet";
import { EndpointPairIterator } from "./EndpointPairIterator";

class UnsupportedOperationException extends Error {}

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
 * This class provides a skeletal implementation of {@link BaseGraph}.
 *
 * <p>The methods implemented in this class should not be overridden unless the subclass admits a
 * more efficient implementation.
 *
 * @author James Sexton
 * @param <N> Node parameter type
 */
export abstract class AbstractBaseGraph<N> implements BaseGraph<N> {
  abstract nodes(): Set<N>;
  abstract isDirected(): boolean;
  abstract allowsSelfLoops(): boolean;
  abstract nodeOrder(): ElementOrder<N>;
  abstract adjacentNodes(node: N): Set<N>;
  abstract predecessors(node: N): Set<N>;
  abstract successors(node: N): Set<N>;

  /**
   * Returns the number of edges in this graph; used to calculate the size of {@link edges()}. This
   * implementation requires O(|N|) time. Classes extending this one may manually keep track of the
   * number of edges as the graph is updated, and override this method for better performance.
   */
  protected edgeCount(): number {
    let degreeSum: number = 0;
    for (let node of this.nodes()) {
      degreeSum += this.degree(node);
    }
    return degreeSum >>> 1;
  }

  /**
   * An implementation of {@link BaseGraph.edges()} defined in terms of {@link nodes()} and {@link
   * successors(Object)}.
   */
  public edges(): Set<EndpointPair<N>> {
    return ImmutableSet.fromSetOperations<EndpointPair<N>>({
      [Symbol.iterator]: () => EndpointPairIterator.of(this),
      size: () => this.edgeCount(),
      has: (endpointPair: EndpointPair<N>) => {
        return this.isOrderingCompatible(endpointPair)
            && this.nodes().has(endpointPair.nodeU)
            && this.successors(endpointPair.nodeU).has(endpointPair.nodeV);
      }
    });
  }

  public incidentEdges(node: N): Set<EndpointPair<N>>  {
    if (!this.nodes().has(node)) {
      throw new Error(`Node ${node} is not an element of this graph.`);
    }
    return IncidentEdgeSet.of(this, node);
  }

  public degree(node: N): number {
    if (this.isDirected()) {
      return this.predecessors(node).size + this.successors(node).size;
    } else {
      const neighbors: Set<N> = this.adjacentNodes(node);
      const selfLoopCount: number = (this.allowsSelfLoops() && neighbors.has(node)) ? 1 : 0;
      return neighbors.size + selfLoopCount;
    }
  }

  public inDegree(node: N): number {
    return this.isDirected() ? this.predecessors(node).size : this.degree(node);
  }

  public outDegree(node: N): number {
    return this.isDirected() ? this.successors(node).size : this.degree(node);
  }

  public hasEdge(nodeU: N, nodeV: N): boolean {
    return this.nodes().has(nodeU) && this.successors(nodeU).has(nodeV);
  }

  public hasEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean {
    if (!this.isOrderingCompatible(endpoints)) {
      return false;
    }
    return this.hasEdge(endpoints.nodeU, endpoints.nodeV);
  }

  /**
   * Throws `IllegalArgumentException` if the ordering of `endpoints` is not compatible
   * with the directionality of this graph.
   */
  protected validateEndpoints(endpoints: EndpointPair<any>): void {
    if (!this.isOrderingCompatible(endpoints)) {
      throw new Error('ENDPOINTS_MISMATCH');
    }
  }

  protected isOrderingCompatible(endpoints: EndpointPair<N>): boolean {
    return endpoints.isOrdered() || !this.isDirected();
  }
}

class IncidentEdgeSet<N> extends Set<EndpointPair<N>> {
  public static of<N>(graph: BaseGraph<N>, node: N): IncidentEdgeSet<N> {
    return graph.isDirected() ? new Directed<N>(graph, node) : new Undirected<N>(graph, node);
  }

  constructor(protected graph: BaseGraph<N>, protected node: N) {
    super();
    this.graph = graph;
    this.node = node;
  }

  public delete(o: EndpointPair<N>): never {
    throw new UnsupportedOperationException();
  }
}

class Directed<N> extends IncidentEdgeSet<N> {
  [Symbol.iterator](): IterableIterator<EndpointPair<N>> {
    const iterator = Iterators.concat(
      Iterators.transform<N, EndpointPair<N>>(
        this.graph.predecessors(this.node)[Symbol.iterator](),
        (predecessor: N) => EndpointPair.ordered(predecessor, this.node),
      ),
      Iterators.transform<N, EndpointPair<N>>(
        Sets.difference(this.graph.successors(this.node), new Set([this.node]))[Symbol.iterator](),
        (successor: N) => EndpointPair.ordered(this.node, successor),
      ),
    );
    const iterableIterator: any = {
      next: () => iterator.next(),
    }
    iterableIterator[Symbol.iterator] = () => iterableIterator;
    return iterableIterator;
  }

  public get size(): number {
    return this.graph.inDegree(this.node)
        + this.graph.outDegree(this.node)
        - (this.graph.successors(this.node).has(this.node) ? 1 : 0);
  }

  public has(endpointPair: EndpointPair<N>): boolean {
    if (!endpointPair.isOrdered()) {
      return false;
    }

    const source: N = endpointPair.source();
    const target: N = endpointPair.target();
    return (this.node === source && this.graph.successors(this.node).has(target))
        || (this.node === target && this.graph.predecessors(this.node).has(source));
  }
}

class Undirected<N> extends IncidentEdgeSet<N> {
  [Symbol.iterator](): IterableIterator<EndpointPair<N>> {
    const iterator = Iterators.transform<N, EndpointPair<N>>(
      this.graph.adjacentNodes(this.node)[Symbol.iterator](),
      (adjacentNode: N) => EndpointPair.unordered(this.node, adjacentNode)
    );
    const iterableIterator: any = {
      next: () => iterator.next(),
    }
    iterableIterator[Symbol.iterator] = () => iterableIterator;
    return iterableIterator;
  }

  public get size(): number {
    return this.graph.adjacentNodes(this.node).size;
  }

  public has(endpointPair: EndpointPair<N>): boolean {
    if (endpointPair.isOrdered()) {
      return false;
    }
    const adjacent: Set<N> = this.graph.adjacentNodes(this.node);
    const nodeU: N = endpointPair.nodeU;
    const nodeV: N = endpointPair.nodeV;

    return (this.node === nodeV && adjacent.has(nodeU))
        || (this.node === nodeU && adjacent.has(nodeV));
  }
}
