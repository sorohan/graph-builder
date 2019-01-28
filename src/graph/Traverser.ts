import { SuccessorsFunction, SuccessorsAccessor } from "./SuccessorsFunction";
import { AbstractBaseGraph } from "./AbstractBaseGraph";
import { ImmutableSet } from "../collect/ImmutableSet";

/*
 * Copyright (C) 2017 The Guava Authors
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

enum Order {
  PREORDER,
  POSTORDER,
}

const isSuccessorsAccessor = <N>(g: SuccessorsAccessor<N> | SuccessorsFunction<N>): g is SuccessorsAccessor<N> =>
  (typeof (g as SuccessorsAccessor<N>).successors === 'function');

/**
 * Create a traverser for traversing a graph or tree.
 *
 * @remarks
 *
 * There are two entry points for creating a `Traverser`: {@link
 * Traversers.forTree} and {@link Traversers.forGraph}. You should choose one
 * based on your answers to the following question:
 *
 * Is there only one path to any node that's reachable from any start node? (If so, the
 *       graph to be traversed is a tree or forest even if it is a subgraph of a graph which is
 *       neither.)
 *
 * If your answer is:
 *
 * - (1) "no" use {@link Traversers.forGraph}.
 *
 * - (1) "yes" use {@link Traversers.forTree}.
 *
 * @public
 */
export class Traversers { // I would prefer a namespace, but the doc tool doesn't like them
  /**
   * Creates a new {@link Traverser} for the given general `graph`.
   *
   * @remarks
   *
   * Traversers created using this method are guaranteed to visit each node reachable from the
   * start node(s) at most once.
   *
   * If you know that no node in `graph` is reachable by more than one path from the start
   * node(s), consider using {@link Traversers.forTree} instead.
   *
   * <b>Performance notes</b>
   *
   * <ul>
   *   <li>Traversals require <i>O(n)</i> time (where <i>n</i> is the number of nodes reachable from
   *       the start node).
   *   <li>While traversing, the traverser will use <i>O(n)</i> space (where <i>n</i> is the number
   *       of nodes that have thus far been visited), plus <i>O(H)</i> space (where <i>H</i> is the
   *       number of nodes that have been seen but not yet visited, that is, the "horizon").
   * </ul>
   */
  public static forGraph<N>(graph: SuccessorsAccessor<N>): Traverser<N>
  public static forGraph<N>(graph: SuccessorsFunction<N>): Traverser<N>
  public static forGraph<N>(graph: SuccessorsFunction<N> | SuccessorsAccessor<N>): Traverser<N> {
    const successorsFunction: SuccessorsFunction<N> = isSuccessorsAccessor(graph) ? (n: N) => (graph.successors(n)) : graph;
    return new GraphTraverser<N>(successorsFunction);
  }

  /**
   * Creates a new {@link Traverser} for a directed acyclic graph that has at most one path from the start
   * node(s) to any node reachable from the start node(s), and has no paths from any start node to
   * any other start node, such as a tree or forest.
   *
   * @remarks
   *
   * `forTree()` is especially useful (versus `forGraph()`) in cases where the data
   * structure being traversed is, in addition to being a tree/forest, also defined <a
   * href="https://github.com/google/guava/wiki/GraphsExplained#non-recursiveness">recursively</a>.
   * This is because the `forTree()`-based implementations don't keep track of visited nodes,
   * and therefore don't need to compare node objects; this saves
   * both time and space versus traversing the same graph using `forGraph()`.
   *
   * Providing a graph to be traversed for which there is more than one path from the start
   * node(s) to any node may lead to:
   *
   * <ul>
   *   <li>Traversal not terminating (if the graph has cycles)
   *   <li>Nodes being visited multiple times (if multiple paths exist from any start node to any
   *       node reachable from any start node)
   * </ul>
   *
   * <b>Performance notes</b>
   *
   * <ul>
   *   <li>Traversals require <i>O(n)</i> time (where <i>n</i> is the number of nodes reachable from
   *       the start node).
   *   <li>While traversing, the traverser will use <i>O(H)</i> space (where <i>H</i> is the number
   *       of nodes that have been seen but not yet visited, that is, the "horizon").
   * </ul>
   *
   * <b>Examples</b> (all edges are directed facing downwards)
   *
   * The graph below would be valid input with start nodes of `a, f, c`. However, if
   * `b` were <i>also</i> a start node, then there would be multiple paths to reach `e` and
   * `h`.
   *
   * ```
   *    a     b      c
   *   / \   / \     |
   *  /   \ /   \    |
   * d     e     f   g
   *       |
   *       |
   *       h
   * ```
   *
   * .
   *
   * The graph below would be a valid input with start nodes of `a, f`. However, if
   * `b` were a start node, there would be multiple paths to `f`.
   *
   * ```
   *    a     b
   *   / \   / \
   *  /   \ /   \
   * c     d     e
   *        \   /
   *         \ /
   *          f
   * ```
   *
   * <b>Note on binary trees</b>
   *
   * This method can be used to traverse over a binary tree. Given methods
   * `leftChild(node)` and `rightChild(node)`, this method can be called as
   *
   * ```
   * Traversers.forTree(node => { successors: new Set([leftChild(node), rightChild(node)] });
   * ```
   */
  public static forTree<N>(tree: SuccessorsAccessor<N>): Traverser<N>
  public static forTree<N>(tree: SuccessorsFunction<N>): Traverser<N>
  public static forTree<N>(tree: SuccessorsFunction<N> | SuccessorsAccessor<N>): Traverser<N> {

    if (tree instanceof AbstractBaseGraph) {
      if (!tree.isDirected()) {
        throw new Error("Undirected graphs can never be trees.");
      }
    }
    // if (tree instanceof Network) {
    //   checkArgument(((Network<?, ?>) tree).isDirected(), "Undirected networks can never be trees.");
    // }
    const successorsFunction: SuccessorsFunction<N> = isSuccessorsAccessor(tree) ? (n: N) => (tree.successors(n)) : tree;
    return new TreeTraverser<N>(successorsFunction);
  }
}

/**
 * An object that can traverse the nodes that are reachable from a specified (set of) start node(s)
 * using a specified {@link SuccessorsFunction}.
 *
 * @public
 */
export interface Traverser<N> {
  /**
   * Returns an unmodifiable `Iterable` over the nodes reachable from `startNode`, in
   * the order of a breadth-first traversal. That is, all the nodes of depth 0 are returned, then
   * depth 1, then 2, and so on.
   *
   * @remarks
   *
   * <b>Example:</b> The following graph with `startNode` `a` would return nodes in
   * the order `abcdef` (assuming successors are returned in alphabetical order).
   *
   * ```
   * b ---- a ---- d
   * |      |
   * |      |
   * e ---- c ---- f
   * ```
   *
   * The behavior of this method is undefined if the nodes, or the topology of the graph, change
   * while iteration is in progress.
   *
   * The returned `Iterable` can be iterated over multiple times. Every iterator will
   * compute its next element on the fly. It is thus possible to limit the traversal to a certain
   * number of nodes as follows:
   *
   * ```
   * Iterables.limit(Traversers.forGraph(graph).breadthFirst(node), maxNumberOfNodes);
   * ```
   *
   * See <a href="https://en.wikipedia.org/wiki/Breadth-first_search">Wikipedia</a> for more
   * info.
   *
   * Throws IllegalArgumentException if `startNode` is not an element of the graph.
   */
  breadthFirst(...startNodes: Array<N>): Iterable<N>;

  /**
   * Returns an unmodifiable `Iterable` over the nodes reachable from `startNode`, in
   * the order of a depth-first pre-order traversal. "Pre-order" implies that nodes appear in the
   * `Iterable` in the order in which they are first visited.
   *
   * @remarks
   *
   * <b>Example:</b> The following graph with `startNode` `a` would return nodes in
   * the order `abecfd` (assuming successors are returned in alphabetical order).
   *
   * ```
   * b ---- a ---- d
   * |      |
   * |      |
   * e ---- c ---- f
   * ```
   *
   * The behavior of this method is undefined if the nodes, or the topology of the graph, change
   * while iteration is in progress.
   *
   * The returned `Iterable` can be iterated over multiple times. Every iterator will
   * compute its next element on the fly. It is thus possible to limit the traversal to a certain
   * number of nodes as follows:
   *
   * ```
   * Iterables.limit(
   *     Traversers.forGraph(graph).depthFirstPreOrder(node), maxNumberOfNodes);
   * ```
   *
   * See <a href="https://en.wikipedia.org/wiki/Depth-first_search">Wikipedia</a> for more info.
   *
   * Throws IllegalArgumentException if `startNode` is not an element of the graph.
   */
  depthFirstPreOrder(...startNodes: Array<N>): Iterable<N>;

  /**
   * Returns an unmodifiable `Iterable` over the nodes reachable from `startNode`, in
   * the order of a depth-first post-order traversal. "Post-order" implies that nodes appear in the
   * `Iterable` in the order in which they are visited for the last time.
   *
   * @remarks
   *
   * <b>Example:</b> The following graph with `startNode` `a` would return nodes in
   * the order `fcebda` (assuming successors are returned in alphabetical order).
   *
   * ```
   * b ---- a ---- d
   * |      |
   * |      |
   * e ---- c ---- f
   * ```
   *
   * The behavior of this method is undefined if the nodes, or the topology of the graph, change
   * while iteration is in progress.
   *
   * The returned `Iterable` can be iterated over multiple times. Every iterator will
   * compute its next element on the fly. It is thus possible to limit the traversal to a certain
   * number of nodes as follows:
   *
   * ```
   * Iterables.limit(
   *     Traversers.forGraph(graph).depthFirstPostOrder(node), maxNumberOfNodes);
   * ```
   *
   * See <a href="https://en.wikipedia.org/wiki/Depth-first_search">Wikipedia</a> for more info.
   *
   * Throws IllegalArgumentException if `startNode` is not an element of the graph.
   */
  depthFirstPostOrder(...startNodes: Array<N>): Iterable<N>;
}

namespace Iterables {
  export const isEmpty = <N>(iterable: Iterable<N>): boolean => {
    return iterable[Symbol.iterator]().next().done;
  }

  export const addAll = <N>(queue: Queue<N>, iterable: Iterable<N>): void => {

  }
}

class GraphTraverser<N> implements Traverser<N> {
  constructor(private graphSuccessors: SuccessorsFunction<N>) { }

  public breadthFirst(...startNodes: Array<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty<N>();
    }
    for (const startNode of startNodes) {
      this.checkThatNodeIsInGraph(startNode);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new GraphIterator.BreadthFirstIterator(this.graphSuccessors, startNodes),
    };
  }

  public depthFirstPreOrder(...startNodes: Array<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty();
    }
    for (const startNode of startNodes) {
      this.checkThatNodeIsInGraph(startNode);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new GraphIterator.DepthFirstIterator(this.graphSuccessors, startNodes, Order.PREORDER),
    };
  }

  public depthFirstPostOrder(...startNodes: Array<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty();
    }
    for (const startNode of startNodes) {
      this.checkThatNodeIsInGraph(startNode);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new GraphIterator.DepthFirstIterator(this.graphSuccessors, startNodes, Order.POSTORDER),
    };
  }

  private checkThatNodeIsInGraph(startNode: N): void {
    // successors() throws an IllegalArgumentException for nodes that are not an element of the
    // graph.
    this.graphSuccessors(startNode);
  }
}

class TreeTraverser<N> implements Traverser<N> {
  constructor(private treeSuccessors: SuccessorsFunction<N>) { }

  public breadthFirst(...startNodes: Array<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty();
    }
    for (const startNode of startNodes) {
      this.checkThatNodeIsInTree(startNode);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new TreeIterator.BreadthFirstIterator(this.treeSuccessors, startNodes),
    };
  }

  public depthFirstPreOrder(...startNodes: Array<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty();
    }
    for (const node of startNodes) {
      this.checkThatNodeIsInTree(node);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new TreeIterator.DepthFirstPreOrderIterator(this.treeSuccessors, startNodes),
    };
  }

  public depthFirstPostOrder(...startNodes: Array<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty();
    }
    for (const startNode of startNodes) {
      this.checkThatNodeIsInTree(startNode);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new TreeIterator.DepthFirstPostOrderIterator(this.treeSuccessors, startNodes),
    };
  }

  private checkThatNodeIsInTree(startNode: N) {
    // successors() throws an IllegalArgumentException for nodes that are not an element of the
    // graph.
    this.treeSuccessors(startNode);
  }
}

// @todo: move to collection (or just use an array...)
interface Collection<N> extends Iterable<N> {
  addAll(i: Iterable<N>): boolean;
}

interface Queue<N> extends Collection<N> {
  isEmpty(): boolean;
  add(item: N): boolean;
  remove(): N;
}

interface Deque<N> extends Queue<N>{
  addLast(item: N): boolean; // to tail
  push(item: N): boolean; // to head
  pop(): N;
  getFirst(): N;
  getLast(): N;
  removeLast(): N;
}

class ArrayDeque<N> implements Deque<N> {
  private queue: Array<N> = []; // head at the beginning, tail at the end

  [Symbol.iterator]() {
    return this.queue[Symbol.iterator]();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
  // add to head
  add(item: N) { // addLast
    this.queue.push(item);
    return true;
  }
  addLast(item: N): boolean {
    return this.add(item);
  }

  // remove from head
  pop(): N { // remove, removeFirst
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.queue.shift() as any as N;
  }
  remove(): N {
    return this.pop();
  }

  // add to tail
  push(item: N): boolean {
    this.queue.unshift(item);
    return true;
  }

  // get from head (don't remove)
  getFirst(): N {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.queue[0];
  }

  // get from tail (don't remove)
  getLast(): N {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.queue[this.queue.length - 1];
  }

  // remove from tail
  removeLast(): N {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.queue.pop() as any as N;
  }

  // add all to head
  addAll(i: Iterable<N>): boolean {
    let modified = false;
    for (const item of i) {
      this.add(item);
      modified = true;
    }
    return modified;
  }
}

namespace GraphIterator {
  export class BreadthFirstIterator<N> implements Iterator<N> { // extends UnmodifiableIterator<N> {
    private queue: Queue<N> = new ArrayDeque<N>();
    private visited: Set<N> = new Set<N>();

    constructor(private graphSuccessors: SuccessorsFunction<N>, roots: Iterable<N>) {
      for (const root of roots) {
        // add all roots to the queue, skipping duplicates
        const has = this.visited.has(root);
        this.visited.add(root)
        if (!has) {
          this.queue.add(root);
        }
      }
    }

    public next(): IteratorResult<N> {
      if (this.queue.isEmpty()) {
        return {
          done: true,
          value: undefined as any as N,
        };
      }
      const current: N = this.queue.remove();
      for (const neighbor of this.graphSuccessors(current)) {
        const has = this.visited.has(neighbor);
        this.visited.add(neighbor)
        if (!has) {
          this.queue.add(neighbor);
        }
      }
      return {
        done: false,
        value: current,
      };
    }
  }

  /** A simple tuple of a node and a partially iterated Iterator of its successors. */
  class NodeAndSuccessors<N> {
    public readonly successorIterator: Iterator<N>;

    constructor(public readonly node: N | undefined, successors: Iterable<N>) {
      this.successorIterator = successors[Symbol.iterator]();
    }
  }

  export class DepthFirstIterator<N> implements Iterator<N> {
    private stack: Deque<NodeAndSuccessors<N>> = new ArrayDeque<NodeAndSuccessors<N>>();
    private visited: Set<N> = new Set<N>();

    constructor(private graphSuccessors: SuccessorsFunction<N>, roots: Iterable<N>, private order: Order) {
      this.stack.push(new NodeAndSuccessors<N>(undefined, roots));
      this.order = order;
    }

    public next(): IteratorResult<N> {
      while (true) {
        if (this.stack.isEmpty()) {
          return {
            done: true,
            value: undefined as any as N,
          };
        }
        const nodeAndSuccessors: NodeAndSuccessors<N> = this.stack.getFirst();
        const firstVisit: boolean = (nodeAndSuccessors.node === undefined || !this.visited.has(nodeAndSuccessors.node));
        if (nodeAndSuccessors.node !== undefined) {
          this.visited.add(nodeAndSuccessors.node);
        }
        const successor: IteratorResult<N> = nodeAndSuccessors.successorIterator.next();
        const lastVisit = successor.done;
        const produceNode: boolean =
            (firstVisit && this.order == Order.PREORDER) || (lastVisit && this.order == Order.POSTORDER);
        if (lastVisit) {
          this.stack.pop();
        } else {
          // we need to push a neighbor, but only if we haven't already seen it
          if (!this.visited.has(successor.value)) {
            this.stack.push(this.withSuccessors(successor.value));
          }
        }
        if (produceNode && nodeAndSuccessors.node !== undefined) {
          return {
            done: false,
            value: nodeAndSuccessors.node,
          };
        }
      }
    }

    private withSuccessors(node: N): NodeAndSuccessors<N> {
      return new NodeAndSuccessors(node, this.graphSuccessors(node));
    }
  }
}

namespace TreeIterator {
  const withChildren = <N>(treeSuccessors: SuccessorsFunction<N>, node: N): NodeAndChildren<N> => {
    return new NodeAndChildren<N>(node, treeSuccessors(node));
  }

  /** A simple tuple of a node and a partially iterated Iterator of its children. */
  class NodeAndChildren<N> {
    public readonly childIterator: Iterator<N>;

    constructor(public readonly node: N | undefined, children: Iterable<N>) {
      this.node = node;
      this.childIterator = children[Symbol.iterator]();
    }
  }

  export class BreadthFirstIterator<N> implements Iterator<N> {
    private readonly queue: Queue<N> = new ArrayDeque<N>();

    constructor(private treeSuccessors: SuccessorsFunction<N>, roots: Iterable<N>) {
      for (const root of roots) {
        this.queue.add(root);
      }
    }

    public next(): IteratorResult<N> {
      const hasNext = !this.queue.isEmpty();
      if (!hasNext) {
        return {
          done: true,
          value: undefined as any as N,
        };
      }
      const current: N = this.queue.remove();
      this.queue.addAll(this.treeSuccessors(current));
      return {
        done: false,
        value: current,
      };
    }
  }

  export class DepthFirstPreOrderIterator<N> implements Iterator<N> {
    private readonly stack: Deque<Iterator<N>> = new ArrayDeque<Iterator<N>>();

    constructor(private treeSuccessors: SuccessorsFunction<N>, roots: Iterable<N>) {
      this.stack.addLast(roots[Symbol.iterator]());
    }

    public next(): IteratorResult<N> {
      if (this.stack.isEmpty()) {
        return {
          done: true,
          value: undefined as any as N,
        }
      }

      const iterator: Iterator<N> = this.stack.getLast(); // throws NoSuchElementException if empty
      const result: IteratorResult<N> = iterator.next();
      if (result.done) {
        this.stack.removeLast();
        return this.next();
      }
      const iterable: Iterable<N> = this.treeSuccessors(result.value);
      if (!Iterables.isEmpty(iterable)) {
        this.stack.addLast(iterable[Symbol.iterator]());
      }
      return result;
    }
  }

  export class DepthFirstPostOrderIterator<N> implements Iterator<N> {
    private readonly stack: ArrayDeque<NodeAndChildren<N>> = new ArrayDeque<NodeAndChildren<N>>();

    constructor(private tree: SuccessorsFunction<N>, roots: Iterable<N> ) {
      this.stack.addLast(new NodeAndChildren(undefined, roots));
    }

    public next(): IteratorResult<N> {
      while (!this.stack.isEmpty()) {
        const top: NodeAndChildren<N> = this.stack.getLast();
        const child: IteratorResult<N> = top.childIterator.next();
        if (!child.done) {
          this.stack.addLast(withChildren(this.tree, child.value));
        } else {
          this.stack.removeLast();
          if (top.node !== undefined) {
            return {
              done: false,
              value: top.node,
            };
          }
        }
      }
      return {
        done: true,
        value: undefined as any as N,
      };
    }
  }
}