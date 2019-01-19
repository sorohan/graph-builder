import test from 'tape';
import { ValueGraphBuilder } from './ValueGraphBuilder';
import { MutableValueGraph } from './MutableValueGraph';
import { EndpointPair } from './EndpointPair';

const N1 = 1;
const N2 = 2;
const E1 = 'a';

test('Value Graph builder :: directed :: graph creation', (t) => {
  const directedGraph: MutableValueGraph<number, string> = ValueGraphBuilder.directed<number, string>().allowsSelfLoops(false).build();
  t.assert(directedGraph, 'Graph is created');
  t.end();
});

test('Value Graph builder :: directed :: put edge values', (t) => {
  const directedGraph: MutableValueGraph<number, string> = ValueGraphBuilder.directed<number, string>().allowsSelfLoops(false).build();
  directedGraph.putEdgeValue(N1, N2, E1);
  const edgeValue = directedGraph.edgeValue(N1, N2);
  t.equal(edgeValue, E1, 'Sets edge values');
  t.end();
});

test('Value Graph builder :: directed :: put endpoint values', (t) => {
  const directedGraph: MutableValueGraph<number, string> = ValueGraphBuilder.directed<number, string>().allowsSelfLoops(false).build();
  const endpoint = EndpointPair.of(directedGraph, N1, N2);
  directedGraph.putEdgeValueConnectingEndpoints(endpoint, E1);
  const edgeValue = directedGraph.edgeValue(N1, N2);
  t.equal(edgeValue, E1, 'Sets edge values connecting endpoints');
  t.end();
});