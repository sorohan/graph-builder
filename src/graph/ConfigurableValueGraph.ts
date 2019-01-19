import { AbstractValueGraph } from "./AbstractValueGraph";
import { GraphConnections } from "./GraphConnections";
import { ElementOrder } from "./ElementOrder";
import { AbstractGraphBuilder } from "./AbstractGraphBuilder";
import { GraphConstants } from "./GraphConstants";
import { TreeMap } from "../collect/Maps";
import { EndpointPair } from "./EndpointPair";
import { ImmutableSet } from "../collect/ImmutableSet";

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
 * Configurable implementation of {@link ValueGraph} that supports the options supplied by {@link
 * AbstractGraphBuilder}.
 *
 * <p>This class maintains a map of nodes to {@link GraphConnections}.
 *
 * <p>Collection-returning accessors return unmodifiable views: the view returned will reflect
 * changes to the graph (if the graph is mutable) but may not be modified by the user.
 *
 * <p>The time complexity of all collection-returning accessors is O(1), since views are returned.
 *
 * @author James Sexton
 * @author Joshua O'Madadhain
 * @author Omar Darwish
 * @param <N> Node parameter type
 * @param <V> Value parameter type
 */
export class ConfigurableValueGraph<N, V> extends AbstractValueGraph<N, V> {
  private isDirectedValue: boolean ;
  private allowsSelfLoopsValue: boolean;
  private nodeOrderValue: ElementOrder<N>;

  protected nodeConnections: Map<N, GraphConnections<N, V>>;

  protected edgeCountValue: number; // must be updated when edges are added or removed

  /** Constructs a graph with the properties specified in {@code builder}. */
  static from<N, V>(builder: AbstractGraphBuilder<N>): ConfigurableValueGraph<N, V> {
    return new ConfigurableValueGraph(
      builder,
      builder.nodeOrderValue.createMap<N, GraphConnections<N, V>>(
          builder.expectedNodeCountValue || GraphConstants.DEFAULT_NODE_COUNT),
      0,
    );
  }

  /**
   * Constructs a graph with the properties specified in {@code builder}, initialized with the given
   * node map.
   */
  constructor(
    builder: AbstractGraphBuilder<N>,
    nodeConnections: Map<N, GraphConnections<N, V>>,
    edgeCount: number
  ) {
    super();
    this.isDirectedValue = builder.directedValue;
    this.allowsSelfLoopsValue = builder.allowsSelfLoopsValue;
    this.nodeOrderValue = builder.nodeOrderValue;
    // @todo: Prefer the heavier "MapRetrievalCache" for nodes if lookup is expensive.
    this.nodeConnections =
        // (nodeConnections instanceof TreeMap)
            // ? new MapRetrievalCache<N, GraphConnections<N, V>>(nodeConnections) :
            new Map<N, GraphConnections<N, V>>(nodeConnections);
    if (edgeCount < 0) {
      throw new Error('Negative edge count');
    }
    this.edgeCountValue = edgeCount;
  }

  public nodes(): Set<N> {
    return ImmutableSet.fromIterable(this.nodeConnections.keys());
  }

  public isDirected(): boolean {
    return this.isDirectedValue;
  }

  public allowsSelfLoops(): boolean {
    return this.allowsSelfLoopsValue;
  }

  public nodeOrder(): ElementOrder<N> {
    return this.nodeOrderValue;
  }

  public adjacentNodes(node: N): Set<N> {
    return this.checkedConnections(node).adjacentNodes();
  }

  public predecessors(node: N): Set<N> {
    return this.checkedConnections(node).predecessors();
  }

  public successors(node: N): Set<N> {
    return this.checkedConnections(node).successors();
  }

  public hasEdge(nodeU: N, nodeV: N): boolean {
    return this.hasEdge_internal(nodeU, nodeV);
  }

  public hasEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean {
    return this.isOrderingCompatible(endpoints)
        && this.hasEdge_internal(endpoints.nodeU, endpoints.nodeV);
  }

  public edgeValueOrDefault<R>(nodeU: N, nodeV: N, defaultValue: R): V | R {
    return this.edgeValueOrDefault_internal(nodeU, nodeV, defaultValue);
  }

  public edgeValueConnectingEndpointsOrDefault<R>(endpoints: EndpointPair<N>, defaultValue: R): V | R {
    this.validateEndpoints(endpoints);
    return this.edgeValueOrDefault_internal(endpoints.nodeU, endpoints.nodeV, defaultValue);
  }

  protected edgeCount(): number {
    return this.edgeCountValue;
  }

  protected checkedConnections(node: N): GraphConnections<N, V> {
    const connections: GraphConnections<N, V> | undefined = this.nodeConnections.get(node);
    if (connections === undefined) {
      throw new Error("Node " + node + " is not an element of this graph.");
    }
    return connections;
  }

  protected containsNode(node: N): boolean {
    return this.nodeConnections.has(node);
  }

  protected hasEdge_internal(nodeU: N, nodeV: N): boolean {
    const connectionsU: GraphConnections<N, V> | undefined = this.nodeConnections.get(nodeU);
    return (connectionsU !== undefined) && connectionsU.successors().has(nodeV);
  }

  protected edgeValueOrDefault_internal<R>(nodeU: N, nodeV: N, defaultValue: R): V | R {
    const connectionsU: GraphConnections<N, V> | undefined = this.nodeConnections.get(nodeU);
    const value: V | undefined = (connectionsU === undefined) ? undefined : connectionsU.value(nodeV);
    return value === undefined ? defaultValue : value;
  }
}
