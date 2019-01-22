[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [ElementOrder](./graph-builder.elementorder.md)

# ElementOrder class

Used to represent the order of elements in a data structure that supports different options for iteration order guarantees.

## Properties

|  Property | Access Modifier | Type | Description |
|  --- | --- | --- | --- |
|  [`type`](./graph-builder.elementorder.type.md) |  | `Type` |  |

## Methods

|  Method | Access Modifier | Returns | Description |
|  --- | --- | --- | --- |
|  [`constructor(type, comparator)`](./graph-builder.elementorder.constructor.md) |  |  | Constructs a new instance of the [ElementOrder](./graph-builder.elementorder.md) class |
|  [`createMap(expectedSize)`](./graph-builder.elementorder.createmap.md) |  | `Map<K, V>` | Returns an empty mutable map whose keys will respect this [ElementOrder](./graph-builder.elementorder.md)<!-- -->. |
|  [`equals(obj)`](./graph-builder.elementorder.equals.md) |  | `boolean` |  |
|  [`getComparator()`](./graph-builder.elementorder.getcomparator.md) |  | `Comparator<T>` | Returns the [Comparator](./graph-builder.comparator.md) used.<p/>Throws an error if comparator is not defined |
|  [`insertion()`](./graph-builder.elementorder.insertion.md) |  | `ElementOrder<S>` | Returns an instance which specifies that insertion ordering is guaranteed. |
|  [`natural()`](./graph-builder.elementorder.natural.md) |  | `ElementOrder<S>` | Returns an instance which specifies that the natural ordering of the elements is guaranteed. |
|  [`sorted(comparator)`](./graph-builder.elementorder.sorted.md) |  | `ElementOrder<S>` | Returns an instance which specifies that the ordering of the elements is guaranteed to be determined by `comparator`<!-- -->. |
|  [`unordered()`](./graph-builder.elementorder.unordered.md) |  | `ElementOrder<S>` | Returns an instance which specifies that no ordering is guaranteed. |

## Remarks

Example usage:
```javascript
const graph: MutableGraph<number> =
    GraphBuilder.directed().nodeOrder(ElementOrder.natural<number>()).build();
}

```
