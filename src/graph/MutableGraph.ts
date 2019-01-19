import { Graph } from "./Graph";
import { EndpointPair } from "./EndpointPair";

/*
 * Copyright (C) 2014 The Guava Authors
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
 * A subinterface of {@link Graph} which adds mutation methods. When mutation is not required, users
 * should prefer the {@link Graph} interface.
 */
export interface MutableGraph<N> extends Graph<N> {

  /**
   * Adds `node` if it is not already present.
   *
   * <p><b>Nodes must be unique</b>, just as `Map` keys must be. They must also be non-null.
   *
   * @returns `true` if the graph was modified as a result of this call
   */
  addNode(node: N): boolean;

  /**
   * Adds an edge connecting `nodeU` to `nodeV` if one is not already present.
   *
   * <p>If the graph is directed, the resultant edge will be directed; otherwise, it will be
   * undirected.
   *
   * <p>If `nodeU` and `nodeV` are not already present in this graph, this method will
   * silently {@link addNode} `nodeU` and `nodeV` to the graph.
   *
   * @returns `true` if the graph was modified as a result of this call
   * throws IllegalArgumentException if the introduction of the edge would violate {@link allowsSelfLoops()}
   */
  putEdge(nodeU: N, nodeV: N): boolean;

  /**
   * Adds an edge connecting `endpoints` (in the order, if any, specified by {@code
   * endpoints}) if one is not already present.
   *
   * <p>If this graph is directed, `endpoints` must be ordered and the added edge will be
   * directed; if it is undirected, the added edge will be undirected.
   *
   * <p>If this graph is directed, `endpoints` must be ordered.
   *
   * <p>If either or both endpoints are not already present in this graph, this method will silently
   * {@link addNode(Object) add} each missing endpoint to the graph.
   *
   * @returns `true` if the graph was modified as a result of this call
   * throws IllegalArgumentException if the introduction of the edge would violate {@link allowsSelfLoops()}
   * throws IllegalArgumentException if the endpoints are unordered and the graph is directed
   */
  putEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean;

  /**
   * Removes `node` if it is present; all edges incident to `node` will also be removed.
   *
   * @returns `true` if the graph was modified as a result of this call
   */
  removeNode(node: N): boolean

  /**
   * Removes the edge connecting `nodeU` to `nodeV`, if it is present.
   *
   * @returns `true` if the graph was modified as a result of this call
   */
  removeEdge(nodeU: N, nodeV: N): boolean

  /**
   * Removes the edge connecting `endpoints`, if it is present.
   *
   * <p>If this graph is directed, `endpoints` must be ordered.
   *
   * throws IllegalArgumentException if the endpoints are unordered and the graph is directed
   * @returns `true` if the graph was modified as a result of this call
   */
  removeEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean
}
