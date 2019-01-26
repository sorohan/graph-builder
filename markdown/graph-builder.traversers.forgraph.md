[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [Traversers](./graph-builder.traversers.md) &gt; [forGraph](./graph-builder.traversers.forgraph.md)

# Traversers.forGraph method

Creates a new [Traverser](./graph-builder.traverser.md) for the given general `graph`<!-- -->.

**Signature:**
```javascript
static forGraph<N>(graph: SuccessorsAccessor<N>): Traverser<N>;
```
**Returns:** `Traverser<N>`

## Remarks

Traversers created using this method are guaranteed to visit each node reachable from the start node(s) at most once.

If you know that no node in `graph` is reachable by more than one path from the start node(s), consider using [Traversers.forTree](./graph-builder.traversers.fortree.md) instead.

<b>Performance notes</b>

<ul> <li>Traversals require <i>O(n)</i> time (where <i>n</i> is the number of nodes reachable from the start node). <li>While traversing, the traverser will use <i>O(n)</i> space (where <i>n</i> is the number of nodes that have thus far been visited), plus <i>O(H)</i> space (where <i>H</i> is the number of nodes that have been seen but not yet visited, that is, the "horizon"). </ul>

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `graph` | `SuccessorsAccessor<N>` |  |

