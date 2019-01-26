import { SuccessorsFunction } from "./SuccessorsFunction";
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
 */

enum Order {
  PREORDER,
  POSTORDER,
}

export namespace Traverser {
  /**
   * Creates a new traverser for the given general {@code graph}.
   *
   * <p>Traversers created using this method are guaranteed to visit each node reachable from the
   * start node(s) at most once.
   *
   * <p>If you know that no node in {@code graph} is reachable by more than one path from the start
   * node(s), consider using {@link #forTree(SuccessorsFunction)} instead.
   *
   * <p><b>Performance notes</b>
   *
   * <ul>
   *   <li>Traversals require <i>O(n)</i> time (where <i>n</i> is the number of nodes reachable from
   *       the start node), assuming that the node objects have <i>O(1)</i> {@code equals()} and
   *       {@code hashCode()} implementations. (See the <a
   *       href="https://github.com/google/guava/wiki/GraphsExplained#elements-must-be-useable-as-map-keys">
   *       notes on element objects</a> for more information.)
   *   <li>While traversing, the traverser will use <i>O(n)</i> space (where <i>n</i> is the number
   *       of nodes that have thus far been visited), plus <i>O(H)</i> space (where <i>H</i> is the
   *       number of nodes that have been seen but not yet visited, that is, the "horizon").
   * </ul>
   *
   * @param graph {@link SuccessorsFunction} representing a general graph that may have cycles.
   */
  export const forGraph = <N>(graph: SuccessorsFunction<N>): Traverser<N> => {
    return new GraphTraverser<N>(graph);
  }

  /**
   * Creates a new traverser for a directed acyclic graph that has at most one path from the start
   * node(s) to any node reachable from the start node(s), and has no paths from any start node to
   * any other start node, such as a tree or forest.
   *
   * <p>{@code forTree()} is especially useful (versus {@code forGraph()}) in cases where the data
   * structure being traversed is, in addition to being a tree/forest, also defined <a
   * href="https://github.com/google/guava/wiki/GraphsExplained#non-recursiveness">recursively</a>.
   * This is because the {@code forTree()}-based implementations don't keep track of visited nodes,
   * and therefore don't need to call `equals()` or `hashCode()` on the node objects; this saves
   * both time and space versus traversing the same graph using {@code forGraph()}.
   *
   * <p>Providing a graph to be traversed for which there is more than one path from the start
   * node(s) to any node may lead to:
   *
   * <ul>
   *   <li>Traversal not terminating (if the graph has cycles)
   *   <li>Nodes being visited multiple times (if multiple paths exist from any start node to any
   *       node reachable from any start node)
   * </ul>
   *
   * <p><b>Performance notes</b>
   *
   * <ul>
   *   <li>Traversals require <i>O(n)</i> time (where <i>n</i> is the number of nodes reachable from
   *       the start node).
   *   <li>While traversing, the traverser will use <i>O(H)</i> space (where <i>H</i> is the number
   *       of nodes that have been seen but not yet visited, that is, the "horizon").
   * </ul>
   *
   * <p><b>Examples</b> (all edges are directed facing downwards)
   *
   * <p>The graph below would be valid input with start nodes of {@code a, f, c}. However, if {@code
   * b} were <i>also</i> a start node, then there would be multiple paths to reach {@code e} and
   * {@code h}.
   *
   * <pre>{@code
   *    a     b      c
   *   / \   / \     |
   *  /   \ /   \    |
   * d     e     f   g
   *       |
   *       |
   *       h
   * }</pre>
   *
   * <p>.
   *
   * <p>The graph below would be a valid input with start nodes of {@code a, f}. However, if {@code
   * b} were a start node, there would be multiple paths to {@code f}.
   *
   * <pre>{@code
   *    a     b
   *   / \   / \
   *  /   \ /   \
   * c     d     e
   *        \   /
   *         \ /
   *          f
   * }</pre>
   *
   * <p><b>Note on binary trees</b>
   *
   * <p>This method can be used to traverse over a binary tree. Given methods {@code
   * leftChild(node)} and {@code rightChild(node)}, this method can be called as
   *
   * <pre>{@code
   * Traverser.forTree(node -> ImmutableList.of(leftChild(node), rightChild(node)));
   * }</pre>
   *
   * @param tree {@link SuccessorsFunction} representing a directed acyclic graph that has at most
   *     one path between any two nodes
   */
  export const forTree = <N>(tree: SuccessorsFunction<N>): Traverser<N> => {
    if (tree instanceof AbstractBaseGraph) {
      if (!tree.isDirected()) {
        throw new Error("Undirected graphs can never be trees.");
      }
    }
    // if (tree instanceof Network) {
    //   checkArgument(((Network<?, ?>) tree).isDirected(), "Undirected networks can never be trees.");
    // }
    return new TreeTraverser<N>(tree);
  }
}

/**
 * An object that can traverse the nodes that are reachable from a specified (set of) start node(s)
 * using a specified {@link SuccessorsFunction}.
 *
 * <p>There are two entry points for creating a {@code Traverser}: {@link
 * #forTree(SuccessorsFunction)} and {@link #forGraph(SuccessorsFunction)}. You should choose one
 * based on your answers to the following questions:
 *
 * <ol>
 *   <li>Is there only one path to any node that's reachable from any start node? (If so, the
 *       graph to be traversed is a tree or forest even if it is a subgraph of a graph which is
 *       neither.)
 *   <li>Are the node objects' implementations of {@code equals()}/{@code hashCode()} <a
 *       href="https://github.com/google/guava/wiki/GraphsExplained#non-recursiveness">recursive</a>?
 * </ol>
 *
 * <p>If your answers are:
 *
 * <ul>
 *   <li>(1) "no" and (2) "no", use {@link #forGraph(SuccessorsFunction)}.
 *   <li>(1) "yes" and (2) "yes", use {@link #forTree(SuccessorsFunction)}.
 *   <li>(1) "yes" and (2) "no", you can use either, but {@code forTree()} will be more efficient.
 *   <li>(1) "no" and (2) "yes", <b><i>neither will work</i></b>, but if you transform your node
 *       objects into a non-recursive form, you can use {@code forGraph()}.
 * </ul>
 *
 * @author Jens Nyman
 * @param <N> Node parameter type
 * @since 23.1
 */
export interface Traverser<N> {
  /**
   * Returns an unmodifiable {@code Iterable} over the nodes reachable from {@code startNode}, in
   * the order of a breadth-first traversal. That is, all the nodes of depth 0 are returned, then
   * depth 1, then 2, and so on.
   *
   * <p><b>Example:</b> The following graph with {@code startNode} {@code a} would return nodes in
   * the order {@code abcdef} (assuming successors are returned in alphabetical order).
   *
   * <pre>{@code
   * b ---- a ---- d
   * |      |
   * |      |
   * e ---- c ---- f
   * }</pre>
   *
   * <p>The behavior of this method is undefined if the nodes, or the topology of the graph, change
   * while iteration is in progress.
   *
   * <p>The returned {@code Iterable} can be iterated over multiple times. Every iterator will
   * compute its next element on the fly. It is thus possible to limit the traversal to a certain
   * number of nodes as follows:
   *
   * <pre>{@code
   * Iterables.limit(Traverser.forGraph(graph).breadthFirst(node), maxNumberOfNodes);
   * }</pre>
   *
   * <p>See <a href="https://en.wikipedia.org/wiki/Breadth-first_search">Wikipedia</a> for more
   * info.
   *
   * @throws IllegalArgumentException if {@code startNode} is not an element of the graph
   */
  breadthFirst(startNode: N): Iterable<N>;

  /**
   * Returns an unmodifiable {@code Iterable} over the nodes reachable from any of the {@code
   * startNodes}, in the order of a breadth-first traversal. This is equivalent to a breadth-first
   * traversal of a graph with an additional root node whose successors are the listed {@code
   * startNodes}.
   *
   * @throws IllegalArgumentException if any of {@code startNodes} is not an element of the graph
   * @see #breadthFirst(Object)
   * @since 24.1
   */
  breadthFirstN(startNodes: Iterable<N>): Iterable<N>;

  /**
   * Returns an unmodifiable {@code Iterable} over the nodes reachable from {@code startNode}, in
   * the order of a depth-first pre-order traversal. "Pre-order" implies that nodes appear in the
   * {@code Iterable} in the order in which they are first visited.
   *
   * <p><b>Example:</b> The following graph with {@code startNode} {@code a} would return nodes in
   * the order {@code abecfd} (assuming successors are returned in alphabetical order).
   *
   * <pre>{@code
   * b ---- a ---- d
   * |      |
   * |      |
   * e ---- c ---- f
   * }</pre>
   *
   * <p>The behavior of this method is undefined if the nodes, or the topology of the graph, change
   * while iteration is in progress.
   *
   * <p>The returned {@code Iterable} can be iterated over multiple times. Every iterator will
   * compute its next element on the fly. It is thus possible to limit the traversal to a certain
   * number of nodes as follows:
   *
   * <pre>{@code
   * Iterables.limit(
   *     Traverser.forGraph(graph).depthFirstPreOrder(node), maxNumberOfNodes);
   * }</pre>
   *
   * <p>See <a href="https://en.wikipedia.org/wiki/Depth-first_search">Wikipedia</a> for more info.
   *
   * @throws IllegalArgumentException if {@code startNode} is not an element of the graph
   */
  depthFirstPreOrder(startNode: N): Iterable<N>;

  /**
   * Returns an unmodifiable {@code Iterable} over the nodes reachable from any of the {@code
   * startNodes}, in the order of a depth-first pre-order traversal. This is equivalent to a
   * depth-first pre-order traversal of a graph with an additional root node whose successors are
   * the listed {@code startNodes}.
   *
   * @throws IllegalArgumentException if any of {@code startNodes} is not an element of the graph
   * @see #depthFirstPreOrder(Object)
   * @since 24.1
   */
  depthFirstPreOrderN(startNodes: Iterable<N>): Iterable<N>;

  /**
   * Returns an unmodifiable {@code Iterable} over the nodes reachable from {@code startNode}, in
   * the order of a depth-first post-order traversal. "Post-order" implies that nodes appear in the
   * {@code Iterable} in the order in which they are visited for the last time.
   *
   * <p><b>Example:</b> The following graph with {@code startNode} {@code a} would return nodes in
   * the order {@code fcebda} (assuming successors are returned in alphabetical order).
   *
   * <pre>{@code
   * b ---- a ---- d
   * |      |
   * |      |
   * e ---- c ---- f
   * }</pre>
   *
   * <p>The behavior of this method is undefined if the nodes, or the topology of the graph, change
   * while iteration is in progress.
   *
   * <p>The returned {@code Iterable} can be iterated over multiple times. Every iterator will
   * compute its next element on the fly. It is thus possible to limit the traversal to a certain
   * number of nodes as follows:
   *
   * <pre>{@code
   * Iterables.limit(
   *     Traverser.forGraph(graph).depthFirstPostOrder(node), maxNumberOfNodes);
   * }</pre>
   *
   * <p>See <a href="https://en.wikipedia.org/wiki/Depth-first_search">Wikipedia</a> for more info.
   *
   * @throws IllegalArgumentException if {@code startNode} is not an element of the graph
   */
  depthFirstPostOrder(startNode: N): Iterable<N>;

  /**
   * Returns an unmodifiable {@code Iterable} over the nodes reachable from any of the {@code
   * startNodes}, in the order of a depth-first post-order traversal. This is equivalent to a
   * depth-first post-order traversal of a graph with an additional root node whose successors are
   * the listed {@code startNodes}.
   *
   * @throws IllegalArgumentException if any of {@code startNodes} is not an element of the graph
   * @see #depthFirstPostOrder(Object)
   * @since 24.1
   */
  depthFirstPostOrderN(startNodes: Iterable<N>): Iterable<N>;
}

namespace Iterables {
  export const isEmpty = <N>(iterable: Iterable<N>): boolean => {
    return iterable[Symbol.iterator]().next().done;
  }

  export const addAll = <N>(queue: Queue<N>, iterable: Iterable<N>): void => {

  }
}

class GraphTraverser<N> implements Traverser<N> {
  constructor(private graph: SuccessorsFunction<N>) { }

  public breadthFirst(startNode: N): Iterable<N> {
    return this.breadthFirstN(ImmutableSet.of(startNode));
  }

  public breadthFirstN(startNodes: Iterable<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty<N>();
    }
    for (const startNode of startNodes) {
      this.checkThatNodeIsInGraph(startNode);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new GraphIterator.BreadthFirstIterator(this.graph, startNodes),
    };
  }

  public depthFirstPreOrder(startNode: N): Iterable<N> {
    return this.depthFirstPreOrderN(ImmutableSet.of(startNode));
  }

  public depthFirstPreOrderN(startNodes: Iterable<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty();
    }
    for (const startNode of startNodes) {
      this.checkThatNodeIsInGraph(startNode);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new GraphIterator.DepthFirstIterator(this.graph, startNodes, Order.PREORDER),
    };
  }

  public depthFirstPostOrder(startNode: N): Iterable<N> {
    return this.depthFirstPostOrderN(ImmutableSet.of(startNode));
  }

  public depthFirstPostOrderN(startNodes: Iterable<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty();
    }
    for (const startNode of startNodes) {
      this.checkThatNodeIsInGraph(startNode);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new GraphIterator.DepthFirstIterator(this.graph, startNodes, Order.POSTORDER),
    };
  }

  private checkThatNodeIsInGraph(startNode: N): void {
    // successors() throws an IllegalArgumentException for nodes that are not an element of the
    // graph.
    this.graph.successors(startNode);
  }
}

class TreeTraverser<N> implements Traverser<N> {
  constructor(private tree: SuccessorsFunction<N>) { }

  public breadthFirst(startNode: N): Iterable<N> {
    return this.breadthFirstN(ImmutableSet.of(startNode));
  }

  public breadthFirstN(startNodes: Iterable<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty();
    }
    for (const startNode of startNodes) {
      this.checkThatNodeIsInTree(startNode);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new TreeIterator.BreadthFirstIterator(this.tree, startNodes),
    };
  }

  public depthFirstPreOrder(startNode: N): Iterable<N> {
    return this.depthFirstPreOrderN(ImmutableSet.of(startNode));
  }

  public depthFirstPreOrderN(startNodes: Iterable<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty();
    }
    for (const node of startNodes) {
      this.checkThatNodeIsInTree(node);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new TreeIterator.DepthFirstPreOrderIterator(this.tree, startNodes),
    };
  }

  public depthFirstPostOrder(startNode: N): Iterable<N> {
    return this.depthFirstPostOrderN(ImmutableSet.of(startNode));
  }

  public depthFirstPostOrderN(startNodes: Iterable<N>): Iterable<N> {
    if (Iterables.isEmpty(startNodes)) {
      return ImmutableSet.empty();
    }
    for (const startNode of startNodes) {
      this.checkThatNodeIsInTree(startNode);
    }
    return {
      [Symbol.iterator]: (): Iterator<N> => new TreeIterator.DepthFirstPostOrderIterator(this.tree, startNodes),
    };
  }

  private checkThatNodeIsInTree(startNode: N) {
    // successors() throws an IllegalArgumentException for nodes that are not an element of the
    // graph.
    this.tree.successors(startNode);
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

    constructor(private graph: SuccessorsFunction<N>, roots: Iterable<N>) {
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
      for (const neighbor of this.graph.successors(current)) {
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

  /** A simple tuple of a node and a partially iterated {@link Iterator} of its successors. */
  class NodeAndSuccessors<N> {
    public readonly successorIterator: Iterator<N>;

    constructor(public readonly node: N | undefined, successors: Iterable<N>) {
      this.successorIterator = successors[Symbol.iterator]();
    }
  }

  export class DepthFirstIterator<N> implements Iterator<N> {
    private stack: Deque<NodeAndSuccessors<N>> = new ArrayDeque<NodeAndSuccessors<N>>();
    private visited: Set<N> = new Set<N>();

    constructor(private graph: SuccessorsFunction<N>, roots: Iterable<N>, private order: Order) {
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
      return new NodeAndSuccessors(node, this.graph.successors(node));
    }
  }
}

namespace TreeIterator {
  const withChildren = <N>(tree: SuccessorsFunction<N>, node: N): NodeAndChildren<N> => {
    return new NodeAndChildren<N>(node, tree.successors(node));
  }

  /** A simple tuple of a node and a partially iterated {@link Iterator} of its children. */
  class NodeAndChildren<N> {
    public readonly childIterator: Iterator<N>;

    constructor(public readonly node: N | undefined, children: Iterable<N>) {
      this.node = node;
      this.childIterator = children[Symbol.iterator]();
    }
  }

  export class BreadthFirstIterator<N> implements Iterator<N> {
    private readonly queue: Queue<N> = new ArrayDeque<N>();

    constructor(private tree: SuccessorsFunction<N>, roots: Iterable<N>) {
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
      this.queue.addAll(this.tree.successors(current));
      return {
        done: false,
        value: current,
      };
    }
  }

  export class DepthFirstPreOrderIterator<N> implements Iterator<N> {
    private readonly stack: Deque<Iterator<N>> = new ArrayDeque<Iterator<N>>();

    constructor(private tree: SuccessorsFunction<N>, roots: Iterable<N>) {
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
      }
      const iterable: Iterable<N> = this.tree.successors(result.value);
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
        if (child.done) {
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