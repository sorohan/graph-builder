import test from 'tape';
import { Traversers } from './Traverser';
import { GraphBuilder } from './GraphBuilder';

// Graphs

/**
 * test graph (numbered breadth first)
 * 1     2
 * | \   |
 * 3  4--5
 * |
 * 6
 */

const makeGraph = () => {
  const g = GraphBuilder.directed<number>().allowsSelfLoops(true).build();
  g.putEdge(1, 3);
  g.putEdge(1, 4);
  g.putEdge(2, 5);
  g.putEdge(4, 5);
  g.putEdge(3, 6);
  return g;
};

test('Traverser :: graph :: breadth first', (t) => {
  const g = makeGraph();
  const i: Iterable<number> = Traversers.forGraph(g).breadthFirst(1, 2);
  t.deepEquals(Array.from(i), [1, 2, 3, 4, 5, 6]);
  t.end();
});

test('Traverser :: graph :: depth first preorder', (t) => {
  const g = makeGraph();
  const i: Iterable<number> = Traversers.forGraph(g).depthFirstPreOrder(1, 2);
  t.deepEquals(Array.from(i), [1, 3, 6, 4, 5, 2]);
  t.end();
});

test('Traverser :: graph :: depth first postorder', (t) => {
  const g = makeGraph();
  const i: Iterable<number> = Traversers.forGraph(g).depthFirstPostOrder(1, 2);
  t.deepEquals(Array.from(i), [6, 3, 5, 4, 1, 2]);
  t.end();
});

// Trees

/**
 *
 * test tree (numbered in breadth first order)
 * 1
 * | \
 * 2  3
 * |
 * 4
 */
const makeTree = () => {
  const tree = GraphBuilder.directed<number>().allowsSelfLoops(true).build();
  tree.putEdge(1, 2);
  tree.putEdge(1, 3);
  tree.putEdge(2, 4);
  return tree;
};

test('Traverser :: tree :: breadth first', (t) => {
  const tree = makeTree();
  const i: Iterable<number> = Traversers.forTree(tree).breadthFirst(1);
  t.deepEquals(Array.from(i), [1, 2, 3, 4]);
  t.end();
});

test('Traverser :: tree :: depth first preorder', (t) => {
  const tree = makeTree();
  const i: Iterable<number> = Traversers.forTree(tree).depthFirstPreOrder(1);
  t.deepEquals(Array.from(i), [1, 2, 4, 3]);
  t.end();
});

test('Traverser :: tree :: depth first postorder', (t) => {
  const tree = makeTree();
  const i: Iterable<number> = Traversers.forTree(tree).depthFirstPostOrder(1);
  t.deepEquals(Array.from(i), [4, 2, 3, 1]);
  t.end();
});
