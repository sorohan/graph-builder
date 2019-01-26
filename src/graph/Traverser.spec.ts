import test from 'tape';
import { Traverser } from './Traverser';
import { GraphBuilder } from './GraphBuilder';

test('Traverser :: graph :: depth first preorder :: single node', (t) => {
  const g = GraphBuilder.directed<number>().allowsSelfLoops(true).build();
  g.addNode(1);
  const i: Iterable<number> = Traverser.forGraph(g).depthFirstPreOrder(1);
  t.deepEquals(Array.from(i), [1]);
  t.end();
});

test('Traverser :: graph :: depth first preorder :: two nodes', (t) => {
  const g = GraphBuilder.directed<number>().allowsSelfLoops(true).build();
  g.putEdge(1, 2);
  const i: Iterable<number> = Traverser.forGraph(g).depthFirstPreOrder(1);
  t.deepEquals(Array.from(i), [1, 2]);
  t.end();
});

test('Traverser :: graph :: depth first postorder :: single node', (t) => {
  const g = GraphBuilder.directed<number>().allowsSelfLoops(true).build();
  g.addNode(1);
  const i: Iterable<number> = Traverser.forGraph(g).depthFirstPostOrder(1);
  t.deepEquals(Array.from(i), [1]);
  t.end();
});

test('Traverser :: graph :: depth first postorder :: two nodes', (t) => {
  const g = GraphBuilder.directed<number>().allowsSelfLoops(true).build();
  g.putEdge(1, 2);
  const i: Iterable<number> = Traverser.forGraph(g).depthFirstPostOrder(1);
  t.deepEquals(Array.from(i), [2, 1]);
  t.end();
});

test.only('Traverser :: graph :: breadth first', (t) => {
  const g = GraphBuilder.directed<number>().allowsSelfLoops(true).build();
  /**
   * 1       2
   * | \     |
   * 3  4----5
   */
  g.putEdge(1, 3);
  g.putEdge(1, 4);
  g.putEdge(2, 5);
  g.putEdge(4, 5);
  const i: Iterable<number> = Traverser.forGraph(g).breadthFirstN([1, 2]);
  t.deepEquals(Array.from(i), [1, 2, 3, 4, 5]);
  t.end();
});
