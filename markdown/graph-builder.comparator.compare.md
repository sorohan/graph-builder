[Home](./index) &gt; [graph-builder](./graph-builder.md) &gt; [Comparator](./graph-builder.comparator.md) &gt; [compare](./graph-builder.comparator.compare.md)

# Comparator.compare method

Compares its two arguments for order. Returns a negative integer, zero, or a positive integer as the first argument is less than, equal to, or greater than the second.

**Signature:**
```javascript
compare(a: T, b: T): number;
```
**Returns:** `number`

## Remarks

In the foregoing description, the notation sgn(expression) designates the mathematical signum function, which is defined to return one of -1, 0, or 1 according to whether the value of expression is negative, zero or positive.

The implementor must ensure that `sgn(compare(x, y)) == -sgn(compare(y, x))` for all `x` and `y`<!-- -->. (This implies that `compare(x, y)` must throw an exception if and only if `compare(y, x)` throws an exception.)

The implementor must also ensure that the relation is transitive: `((compare(x, y)>0) && (compare(y, z)>0)) implies compare(x, z)>0`<!-- -->.

Finally, the implementor must ensure that compare(x, y)==0 implies that sgn(compare(x, z))==sgn(compare(y, z)) for all z.

It is generally the case, but not strictly required that `(compare(x, y)==0) == (x.equals(y))`<!-- -->.

Generally speaking, any comparator that violates this condition should clearly indicate this fact. The recommended language is "Note: this comparator imposes orderings that are inconsistent with equals."

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  `a` | `T` |  |
|  `b` | `T` |  |

