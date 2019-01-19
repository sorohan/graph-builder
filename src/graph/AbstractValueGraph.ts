import { AbstractBaseGraph } from "./AbstractBaseGraph";
import { ValueGraph } from "./ValueGraph";
import { Graph } from "./Graph";
import { AbstractGraph } from "./AbstractGraph";
import { EndpointPair } from "./EndpointPair";
import { ElementOrder } from "./ElementOrder";
import { Sets } from "../collect/Sets";
import { Maps } from "../collect/Maps";

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
 * This class provides a skeletal implementation of {@link ValueGraph}. It is recommended to extend
 * this class rather than implement {@link ValueGraph} directly.
 *
 * <p>The methods implemented in this class should not be overridden unless the subclass admits a
 * more efficient implementation.
 *
 * @author James Sexton
 * @param <N> Node parameter type
 * @param <V> Value parameter type
 * @since 20.0
 */
export abstract class AbstractValueGraph<N, V> extends AbstractBaseGraph<N> implements ValueGraph<N, V> {
  public asGraph(): Graph<N> {
    const that = this;
    class AsGraph extends AbstractGraph<N> {
      public nodes(): Set<N> {
        return that.nodes();
      }

      public edges(): Set<EndpointPair<N>> {
        return that.edges();
      }

      public isDirected(): boolean {
        return that.isDirected();
      }

      public allowsSelfLoops(): boolean {
        return that.allowsSelfLoops();
      }

      public nodeOrder(): ElementOrder<N> {
        return that.nodeOrder();
      }

      public adjacentNodes(node: N): Set<N> {
        return that.adjacentNodes(node);
      }

      public predecessors(node: N): Set<N> {
        return that.predecessors(node);
      }

      public successors(node: N): Set<N> {
        return that.successors(node);
      }

      public degree(node: N): number {
        return that.degree(node);
      }

      public inDegree(node: N): number {
        return that.inDegree(node);
      }

      public outDegree(node: N): number {
        return that.outDegree(node);
      }
    };
    return new AsGraph();
  }

  public edgeValue(nodeU: N, nodeV: N): V | undefined {
    return this.edgeValueOrDefault(nodeU, nodeV, undefined);
  }

  public edgeValueConnectingEndpoints(endpoints: EndpointPair<N>): V | undefined {
    return this.edgeValueConnectingEndpointsOrDefault(endpoints, undefined);
  }

  public abstract edgeValueOrDefault<R>(nodeU: N, nodeV: N, defaultValue: R): V | R;

  public abstract edgeValueConnectingEndpointsOrDefault<R>(endpoints: EndpointPair<N>, defaultValue: R): V | R;

  public equals(obj: ValueGraph<N, V>): boolean {
    return this.isDirected() == obj.isDirected()
        && Sets.equals(this.nodes(), obj.nodes())
        && Maps.equals(AbstractValueGraph.edgeValueMap(this), AbstractValueGraph.edgeValueMap(obj));
  }

  /** Returns a string representation of this graph. */
  public toString(): string {
    return "isDirected: "
        + this.isDirected()
        + ", allowsSelfLoops: "
        + this.allowsSelfLoops()
        + ", nodes: "
        + this.nodes()
        + ", edges: "
        + AbstractValueGraph.edgeValueMap(this);
  }

  private static edgeValueMap<N, V>(graph: ValueGraph<N, V>): Map<EndpointPair<N>, V> {
    const edgeToValueFn = (edge: EndpointPair<N>): V => {
      const v = graph.edgeValue(edge.nodeU, edge.nodeV);
      if (v === undefined) {
        throw new Error('No edge connecting nodes');
      }
      return v;
    };
    return Maps.asMap(graph.edges(), edgeToValueFn);
  }
}
