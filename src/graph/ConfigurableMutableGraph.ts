import { ForwardingGraph } from "./ForwardingGraph";
import { MutableGraph } from "./MutableGraph";
import { GraphConstants } from "./GraphConstants";
import { MutableValueGraph } from "./MutableValueGraph";
import { AbstractGraphBuilder } from "./AbstractGraphBuilder";
import { BaseGraph } from "./BaseGraph";
import { EndpointPair } from "./EndpointPair";
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
 * Modifications (C) 2019 Ben Sorohan
 */

/**
 * Configurable implementation of {@link MutableGraph} that supports both directed and undirected
 * graphs. Instances of this class should be constructed with {@link GraphBuilder}.
 *
 * <p>Time complexities for mutation methods are all O(1) except for `removeNode(N node)`,
 * which is in O(d_node) where d_node is the degree of `node`.
 */
export class ConfigurableMutableGraph<N> extends ForwardingGraph<N> implements MutableGraph<N> {
  private backingValueGraph: MutableValueGraph<N, GraphConstants.Presence>;

  /** Constructs a {@link MutableGraph} with the properties specified in `builder`. */
  constructor(builder: AbstractGraphBuilder<N>) {
    super();
    this.backingValueGraph = ConfigurableMutableValueGraph.from<N, GraphConstants.Presence>(builder);
  }

  protected delegate(): BaseGraph<N> {
    return this.backingValueGraph;
  }

  public addNode(node: N): boolean {
    return this.backingValueGraph.addNode(node);
  }

  public putEdge(nodeU: N, nodeV: N): boolean {
    return this.backingValueGraph.putEdgeValue(nodeU, nodeV, GraphConstants.Presence.EDGE_EXISTS) === undefined;
  }

  public putEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean {
    this.validateEndpoints(endpoints);
    return this.putEdge(endpoints.nodeU, endpoints.nodeV);
  }

  public removeNode(node: N): boolean {
    return this.backingValueGraph.removeNode(node);
  }

  public removeEdge(nodeU: N, nodeV: N): boolean {
    return this.backingValueGraph.removeEdge(nodeU, nodeV) !== undefined;
  }

  public removeEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean {
    this.validateEndpoints(endpoints);
    return this.removeEdge(endpoints.nodeU, endpoints.nodeV);
  }
}
