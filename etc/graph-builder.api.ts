// @public
interface BaseGraph<N> extends SuccessorsAccessor<N>, PredecessorsAccessor<N> {
  adjacentNodes(node: N): Set<N>;
  allowsSelfLoops(): boolean;
  degree(node: N): number;
  edges(): Set<EndpointPair<N>>;
  hasEdge(nodeU: N, nodeV: N): boolean;
  hasEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean;
  incidentEdges(node: N): Set<EndpointPair<N>>;
  inDegree(node: N): number;
  isDirected(): boolean;
  nodeOrder(): ElementOrder<N>;
  nodes(): Set<N>;
  outDegree(node: N): number;
  predecessors(node: N): Set<N>;
  // WARNING: Unable to find referenced export "graph-builder#Graphs"
  successors(node: N): Set<N>;
}

// @public (undocumented)
interface Comparator<T> {
  compare(a: T, b: T): number;
}

// @public
class ElementOrder<T> {
  // WARNING: The type "Type" needs to be exported by the package (e.g. added to index.ts)
  constructor(type: Type, comparator?: Comparator<T> | undefined);
  createMap<K extends T, V>(expectedSize: number): Map<K, V>;
  // (undocumented)
  equals(obj?: object): boolean;
  getComparator(): Comparator<T>;
  static insertion<S>(): ElementOrder<S>;
  // WARNING: The type "Comparable" needs to be exported by the package (e.g. added to index.ts)
  static natural<S extends Comparable<S>>(): ElementOrder<S>;
  static sorted<S>(comparator: Comparator<S>): ElementOrder<S>;
  // WARNING: The type "Type" needs to be exported by the package (e.g. added to index.ts)
  // (undocumented)
  readonly type: Type;
  static unordered<S>(): ElementOrder<S>;
}

// @public
class EndpointPair<N> implements Iterable<N> {
  // WARNING: The name "__@iterator" contains unsupported characters; API names should use only letters, numbers, and underscores
  [Symbol.iterator](): IterableIterator<N>;
  constructor(nodeU: N, nodeV: N);
  adjacentNode(node: N): N;
  abstract equals(obj?: Object): boolean;
  abstract isOrdered(): boolean;
  // (undocumented)
  readonly nodeU: N;
  // (undocumented)
  readonly nodeV: N;
  static of<N>(graph: Graph<any>, nodeU: N, nodeV: N): EndpointPair<N>;
  static ordered<N>(source: N, target: N): EndpointPair<N>;
  abstract source(): N;
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
  equals(object: object): boolean;
}

// @public
class GraphBuilder<N> extends AbstractGraphBuilder<N> {
  allowsSelfLoops(allowsSelfLoops: boolean): GraphBuilder<N>;
  build(): MutableGraph<N>;
  static directed<T>(): GraphBuilder<T>;
  expectedNodeCount(expectedNodeCount: number): GraphBuilder<N>;
  static from<T>(graph: Graph<T>): GraphBuilder<T>;
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
  putEdge(nodeU: N, nodeV: N): boolean;
  putEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean;
  removeEdge(nodeU: N, nodeV: N): boolean;
  removeEdgeConnectingEndpoints(endpoints: EndpointPair<N>): boolean;
  removeNode(node: N): boolean;
}

// @public
interface MutableValueGraph<N, V> extends ValueGraph<N, V> {
  addNode(node: N): boolean;
  putEdgeValue(nodeU: N, nodeV: N, value: V): V | undefined;
  putEdgeValueConnectingEndpoints(endpoints: EndpointPair<N>, value: V): V | undefined;
  removeEdge(nodeU: N, nodeV: N): V | undefined;
  removeEdgeConnectingEndpoints(endpoints: EndpointPair<N>): V | undefined;
  removeNode(node: N): boolean;
}

// @public (undocumented)
interface PredecessorsAccessor<N> {
  // (undocumented)
  predecessors: PredecessorsFunction<N>;
}

// WARNING: Unable to find referenced export "graph-builder#Network"
// WARNING: Unable to find referenced export "graph-builder#Network"
// @public
interface PredecessorsFunction<N> {
  (node: N): Iterable<N>;
}

// @public (undocumented)
interface SuccessorsAccessor<N> {
  // (undocumented)
  successors: SuccessorsFunction<N>;
}

// WARNING: Unable to find referenced export "graph-builder#Network"
// WARNING: Unable to find referenced export "graph-builder#Network"
// @public
interface SuccessorsFunction<N> {
  // WARNING: Unable to find referenced export "graph-builder#Graphs"
  (node: N): Iterable<N>;
}

// @public
interface Traverser<N> {
  breadthFirst(...startNodes: Array<N>): Iterable<N>;
  depthFirstPostOrder(...startNodes: Array<N>): Iterable<N>;
  depthFirstPreOrder(...startNodes: Array<N>): Iterable<N>;
}

// @public
class Traversers {
  static forGraph<N>(graph: SuccessorsAccessor<N>): Traverser<N>;
  static forTree<N>(tree: SuccessorsAccessor<N>): Traverser<N>;
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
  equals(object: ValueGraph<N, V>): boolean;
}

// @public
class ValueGraphBuilder<N, V> extends AbstractGraphBuilder<N> {
  allowsSelfLoops(allowsSelfLoops: boolean): ValueGraphBuilder<N, V>;
  build(): MutableValueGraph<N, V>;
  static directed<N, V>(): ValueGraphBuilder<N, V>;
  expectedNodeCount(expectedNodeCount: number): ValueGraphBuilder<N, V>;
  static from<N, V>(graph: ValueGraph<N, V>): ValueGraphBuilder<N, V>;
  nodeOrder(nodeOrder: ElementOrder<N>): ValueGraphBuilder<N, V>;
  static undirected<N, V>(): ValueGraphBuilder<N, V>;
}

// (No @packagedocumentation comment for this package)
