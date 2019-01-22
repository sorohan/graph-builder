import { ValueGraph } from "./ValueGraph";
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
 * A subinterface of {@link ValueGraph} which adds mutation methods. When mutation is not required,
 * users should prefer the {@link ValueGraph} interface.
 *
 * @public
 */
export interface MutableValueGraph<N, V> extends ValueGraph<N, V> {

  /**
   * Adds `node` if it is not already present.
   *
   * <b>Nodes must be unique</b>, just as `Map` keys must be.
   *
   * @returns `true` if the graph was modified as a result of this call
   */
  addNode(node: N): boolean;

  /**
   * Adds an edge connecting `nodeU` to `nodeV` if one is not already present, and
   * sets a value for that edge to `value` (overwriting the existing value, if any).
   *
   * If the graph is directed, the resultant edge will be directed; otherwise, it will be
   * undirected.
   *
   * Values do not have to be unique.
   *
   * If `nodeU` and `nodeV` are not already present in this graph, this method will
   * silently {@link MutableValueGraph.addNode} `nodeU` and `nodeV` to the graph.
   *
   * Throws if the introduction of the edge would violate {@link BaseGraph.allowsSelfLoops}
   *
   * @returns the value previously associated with the edge connecting `nodeU` to
   *     `nodeV`, or undefined if there was no such edge.
   */
  putEdgeValue(nodeU: N, nodeV: N, value: V): V | undefined;

  /**
   * Adds an edge connecting `endpoints` if one is not already present, and sets a value for
   * that edge to `value` (overwriting the existing value, if any).
   *
   * If the graph is directed, the resultant edge will be directed; otherwise, it will be
   * undirected.
   *
   * If this graph is directed, `endpoints` must be ordered.
   *
   * Values do not have to be unique.
   *
   * If either or both endpoints are not already present in this graph, this method will silently
   * {@link MutableValueGraph.addNode} each missing endpoint to the graph.
   *
   * Throws if the introduction of the edge would violate
   * {@link BaseGraph.allowsSelfLoops}
   *
   * Throws if the endpoints are unordered and the graph is directed
   *
   * @returns the value previously associated with the edge connecting `nodeU` to
   *     `nodeV`, or undefined if there was no such edge.
   */
  putEdgeValueConnectingEndpoints(endpoints: EndpointPair<N>, value: V): V | undefined

  /**
   * Removes `node` if it is present; all edges incident to `node` will also be removed.
   *
   * @returns `true` if the graph was modified as a result of this call
   */
  removeNode(node: N): boolean;

  /**
   * Removes the edge connecting `nodeU` to `nodeV`, if it is present.
   *
   * @returns the value previously associated with the edge connecting `nodeU` to
   *     `nodeV`, or undefined if there was no such edge.
   */
  removeEdge(nodeU: N, nodeV: N): V | undefined;

  /**
   * Removes the edge connecting `endpoints`, if it is present.
   *
   * If this graph is directed, `endpoints` must be ordered.
   *
   * @returns the value previously associated with the edge connecting `endpoints`, or undefined if
   *     there was no such edge.
   */
  removeEdgeConnectingEndpoints(endpoints: EndpointPair<N>): V | undefined
}
