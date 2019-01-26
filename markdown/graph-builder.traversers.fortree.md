[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [Traversers](./graph-builder.traversers.md) &gt; [forTree](./graph-builder.traversers.fortree.md)

# Traversers.forTree method

Creates a new [Traverser](./graph-builder.traverser.md) for a directed acyclic graph that has at most one path from the start node(s) to any node reachable from the start node(s), and has no paths from any start node to any other start node, such as a tree or forest.

**Signature:**
```javascript
static forTree<N>(tree: SuccessorsAccessor<N>): Traverser<N>;
```
**Returns:** `Traverser<N>`

## Remarks

`forTree()` is especially useful (versus `forGraph()`<!-- -->) in cases where the data structure being traversed is, in addition to being a tree/forest, also defined <a href="https://github.com/google/guava/wiki/GraphsExplained#non-recursiveness">recursively</a>. This is because the `forTree()`<!-- -->-based implementations don't keep track of visited nodes, and therefore don't need to compare node objects; this saves both time and space versus traversing the same graph using `forGraph()`<!-- -->.

Providing a graph to be traversed for which there is more than one path from the start node(s) to any node may lead to:

<ul> <li>Traversal not terminating (if the graph has cycles) <li>Nodes being visited multiple times (if multiple paths exist from any start node to any node reachable from any start node) </ul>

<b>Performance notes</b>

<ul> <li>Traversals require <i>O(n)</i> time (where <i>n</i> is the number of nodes reachable from the start node). <li>While traversing, the traverser will use <i>O(H)</i> space (where <i>H</i> is the number of nodes that have been seen but not yet visited, that is, the "horizon"). </ul>

<b>Examples</b> (all edges are directed facing downwards)

The graph below would be valid input with start nodes of `a, f, c`<!-- -->. However, if `b` were <i>also</i> a start node, then there would be multiple paths to reach `e` and `h`<!-- -->.
```
   a     b      c
  / \   / \     |
 /   \ /   \    |
d     e     f   g
      |
      |
      h

```
.

The graph below would be a valid input with start nodes of `a, f`<!-- -->. However, if `b` were a start node, there would be multiple paths to `f`<!-- -->.
```
   a     b
  / \   / \
 /   \ /   \
c     d     e
       \   /
        \ /
         f

```
<b>Note on binary trees</b>

This method can be used to traverse over a binary tree. Given methods `leftChild(node)` and `rightChild(node)`<!-- -->, this method can be called as
```
Traversers.forTree(node => { successors: new Set([leftChild(node), rightChild(node)] });

```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `tree` | `SuccessorsAccessor<N>` |  |

