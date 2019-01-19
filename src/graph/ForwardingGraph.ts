import { AbstractGraph } from "./AbstractGraph";
import { BaseGraph } from "./BaseGraph";
import { ElementOrder } from "./ElementOrder";
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
 *
 * Modifications (C) 2019 Ben Sorohan
 */

/**
 * A class to allow {@link Graph} implementations to be backed by a {@link BaseGraph}. This is not
 * currently planned to be released as a general-purpose forwarding class.
 *
 * @author James Sexton
 */
export abstract class ForwardingGraph<N> extends AbstractGraph<N> {

  protected abstract delegate(): BaseGraph<N>;

  public nodes(): Set<N> {
    return this.delegate().nodes();
  }

  /**
   * Defer to {@link AbstractGraph.edges()} (based on {@link successors(Object)}) for full edges()
   * implementation.
   */
  protected edgeCountValue(): number {
    return this.delegate().edges().size;
  }

  public isDirected(): boolean {
    return this.delegate().isDirected();
  }

  public allowsSelfLoops(): boolean {
    return this.delegate().allowsSelfLoops();
  }

  public nodeOrder(): ElementOrder<N> {
    return this.delegate().nodeOrder();
  }

  public adjacentNodes(node: N): Set<N> {
    return this.delegate().adjacentNodes(node);
  }

  public predecessors(node: N): Set<N> {
    return this.delegate().predecessors(node);
  }

  public successors(node: N): Set<N> {
    return this.delegate().successors(node);
  }

  public degree(node: N): number {
    return this.delegate().degree(node);
  }

  public inDegree(node: N): number {
    return this.delegate().inDegree(node);
  }

  public outDegree(node: N): number {
    return this.delegate().outDegree(node);
  }

  public hasEdge(nodeU: N, nodeV: N): boolean {
    return this.delegate().hasEdge(nodeU, nodeV);
  }

  public hasEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean {
    return this.delegate().hasEdgeConnectingEndpoints(endpoints);
  }
}
