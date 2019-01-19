import { ConfigurableValueGraph } from "./ConfigurableValueGraph";
import { MutableValueGraph } from "./MutableValueGraph";
import { GraphConnections } from "./GraphConnections";
import { GraphConstants } from "./GraphConstants";
import { EndpointPair } from "./EndpointPair";
import { UndirectedGraphConnections } from "./UndirectedGraphConnections";
import { AbstractGraphBuilder } from "./AbstractGraphBuilder";
import { DirectedGraphConnections } from "./DirectedGraphConnections";

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
 * Configurable implementation of {@link MutableValueGraph} that supports both directed and
 * undirected graphs. Instances of this class should be constructed with {@link ValueGraphBuilder}.
 *
 * <p>Time complexities for mutation methods are all O(1) except for {@code removeNode(N node)},
 * which is in O(d_node) where d_node is the degree of {@code node}.
 *
 * @author James Sexton
 * @author Joshua O'Madadhain
 * @author Omar Darwish
 * @param <N> Node parameter type
 * @param <V> Value parameter type
 */
export class ConfigurableMutableValueGraph<N, V> extends ConfigurableValueGraph<N, V> implements MutableValueGraph<N, V> {
  /** Constructs a graph with the properties specified in {@code builder}. */
  static from<N, V>(builder: AbstractGraphBuilder<N>): ConfigurableMutableValueGraph<N, V> {
    return new ConfigurableMutableValueGraph(
      builder,
      builder.nodeOrderValue.createMap<N, GraphConnections<N, V>>(
          builder.expectedNodeCountValue || GraphConstants.DEFAULT_NODE_COUNT),
      0,
    );
  }

  public addNode(node: N): boolean {
    if (this.containsNode(node)) {
      return false;
    }

    this.addNodeInternal(node);
    return true;
  }

  /**
   * Adds {@code node} to the graph and returns the associated {@link GraphConnections}.
   *
   * @throws IllegalStateException if {@code node} is already present
   */
  private addNodeInternal(node: N): GraphConnections<N, V> {
    const connections: GraphConnections<N, V> = this.newConnections();
    this.nodeConnections.set(node, connections)
    return connections;
  }

  public putEdgeValue(nodeU: N, nodeV: N, value: V): V | undefined {
    if (!this.allowsSelfLoops() && nodeU === nodeV) {
      throw new Error(GraphConstants.SELF_LOOPS_NOT_ALLOWED);
    }

    let connectionsU: GraphConnections<N, V> | undefined = this.nodeConnections.get(nodeU);
    if (connectionsU === undefined) {
      connectionsU = this.addNodeInternal(nodeU);
    }
    const previousValue: V | undefined = connectionsU.addSuccessor(nodeV, value);
    let connectionsV: GraphConnections<N, V> | undefined = this.nodeConnections.get(nodeV);
    if (connectionsV === undefined) {
      connectionsV = this.addNodeInternal(nodeV);
    }
    connectionsV.addPredecessor(nodeU, value);
    if (previousValue === undefined) {
      ++this.edgeCountValue;
    }
    return previousValue;
  }

  public putEdgeValueConnectingEndpoints(endpoints: EndpointPair<N>, value: V): V | undefined {
    this.validateEndpoints(endpoints);
    return this.putEdgeValue(endpoints.nodeU, endpoints.nodeV, value);
  }

  public removeNode(node: N): boolean {
    const connections: GraphConnections<N, V> | undefined = this.nodeConnections.get(node);
    if (connections === undefined) {
      return false;
    }

    if (this.allowsSelfLoops()) {
      // Remove self-loop (if any) first, so we don't get CME while removing incident edges.
      if (connections.removeSuccessor(node) !== undefined) {
        connections.removePredecessor(node);
        --this.edgeCountValue;
      }
    }

    for (const successor of connections.successors()) {
      const successorConnections = this.nodeConnections.get(successor);
      if (successorConnections) {
        successorConnections.removePredecessor(node);
        --this.edgeCountValue;
      }
    }

    if (this.isDirected()) { // In undirected graphs, the successor and predecessor sets are equal.
      for (const predecessor of connections.predecessors()) {
        const predecessorConnections = this.nodeConnections.get(predecessor);
        if (predecessorConnections) {
          predecessorConnections.removeSuccessor(node);
          --this.edgeCountValue;
        }
      }
    }

    this.nodeConnections.delete(node);
    if (this.edgeCountValue < 0) {
      throw new Error('Edge count gone negative');
    }

    return true;
  }

  public removeEdge(nodeU: N, nodeV: N): V | undefined {
    const connectionsU: GraphConnections<N, V> | undefined = this.nodeConnections.get(nodeU);
    const connectionsV: GraphConnections<N, V> | undefined = this.nodeConnections.get(nodeV);
    if (connectionsU === undefined || connectionsV === undefined) {
      return undefined;
    }

    const previousValue: V | undefined = connectionsU.removeSuccessor(nodeV);
    if (previousValue !== undefined) {
      connectionsV.removePredecessor(nodeU);
      --this.edgeCountValue;
      if (this.edgeCountValue < 0) {
        throw new Error('Edge count gone negative');
      }
    }
    return previousValue;
  }

  public removeEdgeConnectingEndpoints(endpoints: EndpointPair<N>): V | undefined {
    this.validateEndpoints(endpoints);
    return this.removeEdge(endpoints.nodeU, endpoints.nodeV);
  }

  private newConnections(): GraphConnections<N, V> {
    return this.isDirected()
        ? DirectedGraphConnections.of<N, V>()
        : UndirectedGraphConnections.of<N, V>();
  }
}
