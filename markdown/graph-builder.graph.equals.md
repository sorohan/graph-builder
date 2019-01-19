[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [Graph](./graph-builder.graph.md) &gt; [equals](./graph-builder.graph.equals.md)

# Graph.equals method

Returns `true` iff `object` is a [Graph](./graph-builder.graph.md) that has the same elements and the same structural relationships as those in this graph.

<p>Thus, two graphs A and B are equal if <b>all</b> of the following are true:

<ul> <li>A and B have equal isDirected<!-- -->. <li>A and B have equal nodes<!-- -->. <li>A and B have equal edges<!-- -->. </ul>

<p>Graph properties besides isDirected do <b>not</b> affect equality. For example, two graphs may be considered equal even if one allows self-loops and the other doesn't. Additionally, the order in which nodes or edges are added to the graph, and the order in which they are iterated over, are irrelevant.

<p>A reference implementation of this is provided by AbstractGraph.equals<!-- -->.

**Signature:**
```javascript
equals(object: object): boolean;
```
**Returns:** `boolean`

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `object` | `object` |  |

