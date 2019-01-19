// @public
interface BaseGraph<N> extends SuccessorsFunction<N>, PredecessorsFunction<N> {
  adjacentNodes(node: N): Set<N>;
  // WARNING: Unable to find referenced export "graph-builder#IllegalArgumentException"
  allowsSelfLoops(): boolean;
  degree(node: N): number;
  edges(): Set<EndpointPair<N>>;
  hasEdge(nodeU: N, nodeV: N): boolean;
  // WARNING: Unable to find referenced export "graph-builder#Collection"
  hasEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean;
  incidentEdges(node: N): Set<EndpointPair<N>>;
  // WARNING: Unable to find referenced export "graph-builder#degree"
  inDegree(node: N): number;
  isDirected(): boolean;
  // WARNING: Unable to find referenced export "graph-builder#nodes"
  nodeOrder(): ElementOrder<N>;
  // WARNING: Unable to find referenced export "graph-builder#nodeOrder"
  nodes(): Set<N>;
  // WARNING: Unable to find referenced export "graph-builder#degree"
  outDegree(node: N): number;
  // WARNING: Unable to find referenced export "graph-builder#adjacentNodes"
  predecessors(node: N): Set<N>;
  // WARNING: Unable to find referenced export "graph-builder#Graphs"
  // WARNING: Unable to find referenced export "graph-builder#adjacentNodes"
  successors(node: N): Set<N>;
}

// @public
class ElementOrder<T> {
  // WARNING: The type "Type" needs to be exported by the package (e.g. added to index.ts)
  // WARNING: The type "Comparator" needs to be exported by the package (e.g. added to index.ts)
  constructor(type: Type, comparator?: Comparator<T> | undefined);
  createMap<K extends T, V>(expectedSize: number): Map<K, V>;
  // (undocumented)
  equals(obj?: object): boolean;
  // WARNING: Unable to find referenced export "graph-builder#Comparator"
  // WARNING: The type "Comparator" needs to be exported by the package (e.g. added to index.ts)
  getComparator(): Comparator<T>;
  static insertion<S>(): ElementOrder<S>;
  // WARNING: The type "Comparable" needs to be exported by the package (e.g. added to index.ts)
  static natural<S extends Comparable<S>>(): ElementOrder<S>;
  // WARNING: The type "Comparator" needs to be exported by the package (e.g. added to index.ts)
  static sorted<S>(comparator: Comparator<S>): ElementOrder<S>;
  // WARNING: The type "Type" needs to be exported by the package (e.g. added to index.ts)
  // (undocumented)
  readonly type: Type;
  static unordered<S>(): ElementOrder<S>;
}

// WARNING: Unable to find referenced export "graph-builder#nodeV"
// WARNING: Unable to find referenced export "graph-builder#nodeU"
// WARNING: Unable to find referenced export "graph-builder#target"
// WARNING: Unable to find referenced export "graph-builder#source"
// @public
class EndpointPair<N> implements Iterable<N> {
  // WARNING: Unable to find referenced export "graph-builder#nodeV"
  // WARNING: Unable to find referenced export "graph-builder#nodeU"
  // WARNING: The name "__@iterator" contains unsupported characters; API names should use only letters, numbers, and underscores
  [Symbol.iterator](): IterableIterator<N>;
  constructor(nodeU: N, nodeV: N);
  adjacentNode(node: N): N;
  // WARNING: Unable to find referenced export "graph-builder#target"
  // WARNING: Unable to find referenced export "graph-builder#source"
  abstract equals(obj?: Object): boolean;
  abstract isOrdered(): boolean;
  // (undocumented)
  readonly nodeU: N;
  // (undocumented)
  readonly nodeV: N;
  static of<N>(graph: Graph<any>, nodeU: N, nodeV: N): EndpointPair<N>;
  static ordered<N>(source: N, target: N): EndpointPair<N>;
  // WARNING: Unable to find referenced export "graph-builder#isOrdered"
  abstract source(): N;
  // WARNING: Unable to find referenced export "graph-builder#isOrdered"
  abstract target(): N;
  static unordered<N>(nodeU: N, nodeV: N): EndpointPair<N>;
}

// WARNING: Unable to find referenced export "graph-builder#ImmutableGraph"
// WARNING: Unable to find referenced export "graph-builder#ImmutableGraph"
// WARNING: Unable to find referenced export "graph-builder#ImmutableGraph"
// WARNING: Unable to find referenced export "graph-builder#Network"
// WARNING: Unable to find referenced export "graph-builder#Network"
// @public
interface Graph<N> extends BaseGraph<N> {
  // WARNING: Unable to find referenced export "graph-builder#AbstractGraph"
  // WARNING: Unable to find referenced export "graph-builder#isDirected"
  // WARNING: Unable to find referenced export "graph-builder#edges"
  // WARNING: Unable to find referenced export "graph-builder#nodes"
  // WARNING: Unable to find referenced export "graph-builder#isDirected"
  equals(object: object): boolean;
}

// WARNING: Unable to find referenced member "graph-builder#Graph.nodes"
// @public
class GraphBuilder<N> extends AbstractGraphBuilder<N> {
  allowsSelfLoops(allowsSelfLoops: boolean): GraphBuilder<N>;
  build(): MutableGraph<N>;
  static directed<T>(): GraphBuilder<T>;
  expectedNodeCount(expectedNodeCount: number): GraphBuilder<N>;
  // WARNING: Unable to find referenced export "graph-builder#expectedNodeCount"
  // WARNING: Unable to find referenced member "graph-builder#Graph.isDirected"
  static from<T>(graph: Graph<T>): GraphBuilder<T>;
  // WARNING: Unable to find referenced member "graph-builder#Graph.nodes"
  nodeOrder(nodeOrder: ElementOrder<N>): GraphBuilder<N>;
  static undirected<T>(): GraphBuilder<T>;
}

// @public
interface GraphConnections<N, V> {
  addPredecessor(node: N, value: V): void;
  addSuccessor(node: N, value: V): V | undefined;
  // (undocumented)
  adjacentNodes(): Set<N>;
  // (undocumented)
  predecessors(): Set<N>;
  removePredecessor(node: N): void;
  removeSuccessor(node: N): V | undefined;
  // (undocumented)
  successors(): Set<N>;
  value(node: N): V | undefined;
}

// @public
interface MutableGraph<N> extends Graph<N> {
  addNode(node: N): boolean;
  // WARNING: Unable to find referenced export "graph-builder#allowsSelfLoops"
  // WARNING: Unable to find referenced export "graph-builder#addNode"
  putEdge(nodeU: N, nodeV: N): boolean;
  // WARNING: Unable to find referenced export "graph-builder#allowsSelfLoops"
  // WARNING: Unable to find referenced export "graph-builder#addNode"
  putEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean;
  removeEdge(nodeU: N, nodeV: N): boolean;
  removeEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean;
  removeNode(node: N): boolean;
}

// @public
interface MutableValueGraph<N, V> extends ValueGraph<N, V> {
  addNode(node: N): boolean;
  // WARNING: Unable to find referenced export "graph-builder#allowsSelfLoops"
  // WARNING: Unable to find referenced export "graph-builder#addNode"
  putEdgeValue(nodeU: N, nodeV: N, value: V): V | undefined;
  // WARNING: Unable to find referenced export "graph-builder#allowsSelfLoops"
  // WARNING: Unable to find referenced export "graph-builder#addNode"
  putEdgeValueConnectingEndpoints(endpoints: EndpointPair<N>, value: V): V | undefined;
  removeEdge(nodeU: N, nodeV: N): V | undefined;
  removeEdgeConnectingEndpoints(endpoints: EndpointPair<N>): V | undefined;
  removeNode(node: N): boolean;
}

// WARNING: Unable to find referenced export "graph-builder#Network"
// WARNING: Unable to find referenced export "graph-builder#Network"
// @public
interface PredecessorsFunction<N> {
  // WARNING: Unable to find referenced export "graph-builder#Iterable"
  predecessors(node: N): Iterable<N>;
}

// WARNING: Unable to find referenced export "graph-builder#Network"
// WARNING: Unable to find referenced export "graph-builder#Network"
// @public
interface SuccessorsFunction<N> {
  // WARNING: Unable to find referenced export "graph-builder#Iterable"
  // WARNING: Unable to find referenced export "graph-builder#Graphs"
  successors(node: N): Iterable<N>;
}

// WARNING: Unable to find referenced export "graph-builder#ImmutableValueGraph"
// WARNING: Unable to find referenced export "graph-builder#ImmutableValueGraph"
// WARNING: Unable to find referenced export "graph-builder#ImmutableValueGraph"
// WARNING: Unable to find referenced export "graph-builder#Network"
// WARNING: Unable to find referenced export "graph-builder#Network"
// @public
interface ValueGraph<N, V> extends BaseGraph<N> {
  asGraph(): Graph<N>;
  edgeValue(nodeU: N, nodeV: N): V | undefined;
  edgeValueConnectingEndpoints(endpoints: EndpointPair<N>): V | undefined;
  edgeValueConnectingEndpointsOrDefault<R>(endpoints: EndpointPair<N>, defaultValue: R): V | R;
  edgeValueOrDefault<R>(nodeU: N, nodeV: N, defaultValue: R): V | R;
  // WARNING: Unable to find referenced export "graph-builder#AbstractValueGraph"
  // WARNING: Unable to find referenced export "graph-builder#isDirected"
  // WARNING: Unable to find referenced export "graph-builder#edgeValue"
  // WARNING: Unable to find referenced export "graph-builder#edges"
  // WARNING: Unable to find referenced export "graph-builder#nodes"
  // WARNING: Unable to find referenced export "graph-builder#isDirected"
  equals(obj: ValueGraph<N, V>): boolean;
}

// WARNING: Unable to find referenced member "graph-builder#Graph.nodes"
// @public
class ValueGraphBuilder<N, V> extends AbstractGraphBuilder<N> {
  // WARNING: Unable to find referenced export "graph-builder#UnsupportedOperationException"
  allowsSelfLoops(allowsSelfLoops: boolean): ValueGraphBuilder<N, V>;
  build(): MutableValueGraph<N, V>;
  static directed<N, V>(): ValueGraphBuilder<N, V>;
  expectedNodeCount(expectedNodeCount: number): ValueGraphBuilder<N, V>;
  // WARNING: Unable to find referenced export "graph-builder#expectedNodeCount"
  // WARNING: Unable to find referenced member "graph-builder#ValueGraph.isDirected"
  static from<N, V>(graph: ValueGraph<N, V>): ValueGraphBuilder<N, V>;
  // WARNING: Unable to find referenced member "graph-builder#Graph.nodes"
  nodeOrder(nodeOrder: ElementOrder<N>): ValueGraphBuilder<N, V>;
  static undirected<N, V>(): ValueGraphBuilder<N, V>;
}

// (No @packagedocumentation comment for this package)
