import test from 'tape';
import { GraphBuilder } from './GraphBuilder';
import { MutableGraph } from './MutableGraph';
import { EndpointPair } from './EndpointPair';

const N1 = 1;
const N2 = 2;
const N3 = 3;

test('Graph builder :: directed :: graph creation', (t) => {
  const directedGraph: MutableGraph<number> = GraphBuilder.directed<number>().allowsSelfLoops(false).build();
  t.assert(directedGraph, 'Graph is created');
  t.end();
});

test('Graph builder :: directed :: add nodes', (t) => {
  const directedGraph: MutableGraph<number> = GraphBuilder.directed<number>().allowsSelfLoops(false).build();
  directedGraph.addNode(N1);
  directedGraph.addNode(N2);
  const nodes = Array.from(directedGraph.nodes().values());
  t.deepEquals(nodes, [N1, N2], 'Nodes are added');
  t.end();
});

test('Graph builder :: directed :: remove nodes', (t) => {
  const directedGraph: MutableGraph<number> = GraphBuilder.directed<number>().allowsSelfLoops(false).build();
  directedGraph.addNode(N1);
  directedGraph.addNode(N2);
  directedGraph.removeNode(N2);
  const nodes = Array.from(directedGraph.nodes().values());
  t.deepEquals(nodes, [N1], 'Nodes are removed');
  t.end();
});

test('Graph builder :: directed :: connect nodes', (t) => {
  const directedGraph: MutableGraph<number> = GraphBuilder.directed<number>().allowsSelfLoops(false).build();
  directedGraph.putEdge(N1, N2);
  t.assert(directedGraph.successors(N1).has(N2), 'Nodes are connected');
  t.assert(directedGraph.predecessors(N2).has(N1), 'Nodes are connected');
  t.end();
});

test('Graph builder :: directed :: connect endpoints', (t) => {
  const directedGraph: MutableGraph<number> = GraphBuilder.directed<number>().allowsSelfLoops(false).build();
  const edgeN1N2 = EndpointPair.of(directedGraph, N1, N2);
  directedGraph.putEdgeConnectingEndpoints(edgeN1N2);
  t.assert(directedGraph.successors(N1).has(N2), 'Nodes are connected');
  t.assert(directedGraph.predecessors(N2).has(N1), 'Nodes are connected');
  t.end();
});

test('Graph builder :: directed :: DISconnect nodes', (t) => {
  const directedGraph: MutableGraph<number> = GraphBuilder.directed<number>().allowsSelfLoops(false).build();
  directedGraph.putEdge(N1, N2);
  directedGraph.removeEdge(N1, N2);
  t.notOk(directedGraph.successors(N1).has(N2), 'Nodes are disconnected');
  t.notOk(directedGraph.predecessors(N2).has(N1), 'Nodes are disconnected');
  t.end();
});

test('Graph builder :: directed :: DISconnect endpoints', (t) => {
  const directedGraph: MutableGraph<number> = GraphBuilder.directed<number>().allowsSelfLoops(false).build();
  const edgeN1N2 = EndpointPair.of(directedGraph, N1, N2);
  directedGraph.putEdge(N1, N2);
  directedGraph.removeEdgeConnectingEndpoints(edgeN1N2);
  t.notOk(directedGraph.successors(N1).has(N2), 'Nodes are disconnected');
  t.notOk(directedGraph.predecessors(N2).has(N1), 'Nodes are disconnected');
  t.end();
});

test('Graph builder :: directed :: get edges', (t) => {
  const directedGraph: MutableGraph<number> = GraphBuilder.directed<number>().allowsSelfLoops(false).build();
  directedGraph.putEdge(N1, N2);
  directedGraph.putEdge(N2, N3);

  const edges = directedGraph.edges();
  t.equals(edges.size, 2, 'Has 2 edges');
  const edgeN1N2 = EndpointPair.of(directedGraph, N1, N2);
  const edgeN2N3 = EndpointPair.of(directedGraph, N1, N2);
  const edgesArray = Array.from(edges.values());

  t.assert(edgesArray.find((endpointPair => endpointPair.equals(edgeN1N2))),
    'Has edges N1 -> N2')
  t.assert(edgesArray.find((endpointPair => endpointPair.equals(edgeN2N3))),
    'Has edges N2 -> N3')
  t.end();
});

test('Graph builder :: directed :: add node twice', (t) => {
  const directedGraph: MutableGraph<number> = GraphBuilder.directed<number>().allowsSelfLoops(false).build();
  directedGraph.addNode(N1);
  directedGraph.addNode(N1);
  t.equals(directedGraph.nodes().size, 1, `Doesn't add the same node twice`);
  t.end();
});

test('Graph builder :: allow self loops :: allows loops', (t) => {
  const directedGraph: MutableGraph<number> = GraphBuilder.directed<number>().allowsSelfLoops(true).build();
  directedGraph.addNode(N1);
  directedGraph.putEdge(N1, N1);
  const edges = directedGraph.edges();
  t.equals(edges.size, 1, 'Allows loops');
  t.end();
});

test('Graph builder :: no self loops :: throws on loops', (t) => {
  const directedGraph: MutableGraph<number> = GraphBuilder.directed<number>().allowsSelfLoops(false).build();
  directedGraph.addNode(N1);
  t.throws(() => {
    directedGraph.putEdge(N1, N1);
  },
  /Cannot add self-loop/,
  'throws on loops'
  );
  t.end();
});

test('Graph builder :: undirected :: graph creation', (t) => {
  const undirectedGraph: MutableGraph<number> = GraphBuilder.undirected<number>().allowsSelfLoops(false).build();
  t.assert(undirectedGraph, 'Graph is created');
  t.end();
});