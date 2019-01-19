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
   * <p><b>Nodes must be unique</b>, just as `Map` keys must be. They must also be non-null.
   *
   * @returns `true` if the graph was modified as a result of this call
   */
  addNode(node: N): boolean;

  /**
   * Adds an edge connecting `nodeU` to `nodeV` if one is not already present, and
   * sets a value for that edge to `value` (overwriting the existing value, if any).
   *
   * <p>If the graph is directed, the resultant edge will be directed; otherwise, it will be
   * undirected.
   *
   * <p>Values do not have to be unique. However, values must be non-null.
   *
   * <p>If `nodeU` and `nodeV` are not already present in this graph, this method will
   * silently {@link addNode} `nodeU` and `nodeV` to the graph.
   *
   * @returns the value previously associated with the edge connecting `nodeU` to
   *     `nodeV`, or null if there was no such edge.
   * throws IllegalArgumentException if the introduction of the edge would violate {@link
   *     allowsSelfLoops}
   */
  putEdgeValue(nodeU: N, nodeV: N, value: V): V | undefined;

  /**
   * Adds an edge connecting `endpoints` if one is not already present, and sets a value for
   * that edge to `value` (overwriting the existing value, if any).
   *
   * <p>If the graph is directed, the resultant edge will be directed; otherwise, it will be
   * undirected.
   *
   * <p>If this graph is directed, `endpoints` must be ordered.
   *
   * <p>Values do not have to be unique. However, values must be non-null.
   *
   * <p>If either or both endpoints are not already present in this graph, this method will silently
   * {@link addNode} each missing endpoint to the graph.
   *
   * @returns the value previously associated with the edge connecting `nodeU` to
   *     `nodeV`, or null if there was no such edge.
   * throws IllegalArgumentException if the introduction of the edge would violate {@link
   *     allowsSelfLoops}
   * throws IllegalArgumentException if the endpoints are unordered and the graph is directed
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
   *     `nodeV`, or null if there was no such edge.
   */
  removeEdge(nodeU: N, nodeV: N): V | undefined;

  /**
   * Removes the edge connecting `endpoints`, if it is present.
   *
   * <p>If this graph is directed, `endpoints` must be ordered.
   *
   * @returns the value previously associated with the edge connecting `endpoints`, or null if
   *     there was no such edge.
   */
  removeEdgeConnectingEndpoints(endpoints: EndpointPair<N>): V | undefined
}
