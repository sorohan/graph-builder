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

/** A utility class to hold various constants used by the Guava Graph library. */
export namespace GraphConstants {

  export const EXPECTED_DEGREE = 2;

  export const DEFAULT_NODE_COUNT = 10;
  export const DEFAULT_EDGE_COUNT = DEFAULT_NODE_COUNT * EXPECTED_DEGREE;

  // Load factor and capacity for "inner" (i.e. per node/edge element) hash sets or maps
  export const INNER_LOAD_FACTOR = 1.0;
  export const INNER_CAPACITY = 2; // ceiling(EXPECTED_DEGREE / INNER_LOAD_FACTOR)

  // Error messages
  export const NODE_NOT_IN_GRAPH = "Node %s is not an element of this graph.";
  export const EDGE_NOT_IN_GRAPH = "Edge %s is not an element of this graph.";
  export const REUSING_EDGE =
      "Edge %s already exists between the following nodes: %s, "
          + "so it cannot be reused to connect the following nodes: %s.";
  export const MULTIPLE_EDGES_CONNECTING =
      "Cannot call edgeConnecting() when parallel edges exist between %s and %s. Consider calling "
          + "edgesConnecting() instead.";
  export const PARALLEL_EDGES_NOT_ALLOWED =
      "Nodes %s and %s are already connected by a different edge. To construct a graph "
          + "that allows parallel edges, call allowsParallelEdges(true) on the Builder.";
  export const SELF_LOOPS_NOT_ALLOWED =
      "Cannot add self-loop edge on node %s, as self-loops are not allowed. To construct a graph "
          + "that allows self-loops, call allowsSelfLoops(true) on the Builder.";
  export const NOT_AVAILABLE_ON_UNDIRECTED =
      "Cannot call source()/target() on a EndpointPair from an undirected graph. Consider calling "
          + "adjacentNode(node) if you already have a node, or nodeU()/nodeV() if you don't.";
  export const EDGE_ALREADY_EXISTS = "Edge %s already exists in the graph.";
  export const ENDPOINTS_MISMATCH =
      "Mismatch: unordered endpoints cannot be used with directed graphs";

  /** Singleton edge value for {@link Graph} implementations backed by {@link ValueGraph}s. */
  export enum Presence {
    EDGE_EXISTS
  }
}
