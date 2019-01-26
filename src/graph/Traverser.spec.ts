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
