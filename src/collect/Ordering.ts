import { Comparator } from "./Comparator";

/*
 * Copyright (C) 2007 The Guava Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Modifications (C) 2019 Ben Sorohan
 */

/**
 * A comparator, with additional methods to support common operations. This is an "enriched" version
 * of `Comparator` for pre-Java-8 users, in the same sense that {@link FluentIterable} is an
 * enriched {@link Iterable} for pre-Java-8 users.
 *
 * @remarks
 *
 * **Three types of methods**
 *
 * Like other fluent types, there are three types of methods present: methods for <i>acquiring</i>,
 * <i>chaining</i>, and <i>using</i>.
 *
 * <h4>Acquiring</h4>
 *
 * <p>The common ways to get an instance of `Ordering` are:
 *
 * <ul>
 *   <li>Subclass it and implement {@link compare} instead of implementing {@link Comparator}
 *       directly
 *   <li>Pass a <i>pre-existing</i> {@link Comparator} instance to {@link from}
 *   <li>Use the natural ordering, {@link Ordering.natural}
 * </ul>
 *
 * <h4>Chaining</h4>
 *
 * <p>Then you can use the <i>chaining</i> methods to get an altered version of that
 * `Ordering`, including:
 *
 * <ul>
 *   <li>{@link reverse}
 *   <li>{@link compound}
 *   <li>{@link onResultOf}
 *   <li>{@link nullsFirst} / {@link nullsLast}
 * </ul>
 *
 * <h4>Using</h4>
 *
 * <p>Finally, use the resulting `Ordering` anywhere a {@link Comparator} is required, or use
 * any of its special operations, such as:
 *
 * <ul>
 *   <li>{@link immutableSortedCopy}
 *   <li>{@link isOrdered} / {@link isStrictlyOrdered}
 *   <li>{@link min} / {@link max}
 * </ul>
 *
 * **Understanding complex orderings**
 *
 * <p>Complex chained orderings like the following example can be challenging to understand.
 *
 * ```typescript
 * Ordering<Foo> ordering =
 *     Ordering.natural()
 *         .nullsFirst()
 *         .onResultOf(getBarFunction)
 *         .nullsLast();
 * ```
 *
 * Note that each chaining method returns a new ordering instance which is backed by the previous
 * instance, but has the chance to act on values <i>before</i> handing off to that backing instance.
 * As a result, it usually helps to read chained ordering expressions <i>backwards</i>. For example,
 * when `compare` is called on the above ordering:
 *
 * <ol>
 *   <li>First, if only one `Foo` is null, that null value is treated as <i>greater</i>
 *   <li>Next, non-null `Foo` values are passed to `getBarFunction` (we will be
 *       comparing `Bar` values from now on)
 *   <li>Next, if only one `Bar` is null, that null value is treated as <i>lesser</i>
 *   <li>Finally, natural ordering is used (i.e. the result of `Bar.compareTo(Bar)` is
 *       returned)
 * </ol>
 *
 * <p>Alas, {@link reverse} is a little different. As you read backwards through a chain and
 * encounter a call to `reverse`, continue working backwards until a result is determined, and
 * then reverse that result.
 *
 * **Additional notes**
 *
 * <p>Except as noted, the orderings returned by the factory methods of this class are serializable
 * if and only if the provided instances that back them are. For example, if `ordering` and
 * `function` can themselves be serialized, then `ordering.onResultOf(function)` can as
 * well.
 *
 * **For Java 8 users**
 *
 * <p>If you are using Java 8, this class is now obsolete. Most of its functionality is now provided
 * by {@link java.util.stream.Stream Stream} and by {@link Comparator} itself, and the rest can now
 * be found as static methods in our new {@link Comparators} class. See each method below for
 * further instructions. Whenever possible, you should change any references of type
 * `Ordering` to be of type `Comparator` instead. However, at this time we have no plan to
 * <i>deprecate</i> this class.
 *
 * <p>Many replacements involve adopting `Stream`, and these changes can sometimes make your
 * code verbose. Whenever following this advice, you should check whether `Stream` could be
 * adopted more comprehensively in your code; the end result may be quite a bit simpler.
 *
 * **See also**
 *
 * <p>See the Guava User Guide article on <a href=
 * "https://github.com/google/guava/wiki/OrderingExplained">`Ordering`</a>.
 */
export abstract class Ordering<T> implements Comparator<T> {
  public abstract compare(left: T, right: T): number;

  /**
   * Returns the least of the specified values according to this ordering. If there are multiple
   * least values, the first of those is returned. The iterator will be left exhausted: its
   * `hasNext` method will return `false`.
   *
   * <p><b>Java 8 users:</b> Continue to use this method for now. After the next release of Guava,
   * use `Streams.stream(iterator).min(thisComparator).get()` instead (but note that it does
   * not guarantee which tied minimum element is returned).
   *
   * @param iterator the iterator whose minimum element is to be determined
   * throws NoSuchElementException if `iterator` is empty
   * throws ClassCastException if the parameters are not <i>mutually comparable</i> under this
   *     ordering.
   */
  public min<E extends T>(iterator: Iterator<E>): E {
    let result = iterator.next();
    let minSoFar: E = result.value;

    while (!result.done) {
      result = iterator.next();
      minSoFar = this.minOf(minSoFar, result.value);
    }

    return minSoFar;
  }

  /**
   * Returns the lesser of the two values according to this ordering. If the values compare as 0,
   * the first is returned.
   *
   * <p><b>Implementation note:</b> this method is invoked by the default implementations of the
   * other `min` overloads, so overriding it will affect their behavior.
   *
   * <p><b>Java 8 users:</b> Use `Collections.min(Arrays.asList(a, b), thisComparator)`
   * instead (but note that it does not guarantee which tied minimum element is returned).
   *
   * @param a value to compare, returned if less than or equal to b.
   * @param b value to compare.
   * throws ClassCastException if the parameters are not <i>mutually comparable</i> under this
   *     ordering.
   */
  public minOf<E extends T>(a: E, b: E): E {
    return (this.compare(a, b) <= 0) ? a : b;
  }

  /**
   * Returns the greatest of the specified values according to this ordering. If there are multiple
   * greatest values, the first of those is returned. The iterator will be left exhausted: its
   * `hasNext()` method will return `false`.
   *
   * <p><b>Java 8 users:</b> Continue to use this method for now. After the next release of Guava,
   * use `Streams.stream(iterator).max(thisComparator).get()` instead (but note that it does
   * not guarantee which tied maximum element is returned).
   *
   * @param iterator the iterator whose maximum element is to be determined
   * throws NoSuchElementException if `iterator` is empty
   * throws ClassCastException if the parameters are not <i>mutually comparable</i> under this
   *     ordering.
   */
  public max<E extends T>(iterator: Iterator<E>): E {
    let result = iterator.next();
    let maxSoFar: E = result.value;

    while (!result.done) {
      result = iterator.next();
      maxSoFar = this.maxOf(maxSoFar, result.value);
    }

    return maxSoFar;
  }

  /**
   * Returns the greater of the two values according to this ordering. If the values compare as 0,
   * the first is returned.
   *
   * <p><b>Implementation note:</b> this method is invoked by the default implementations of the
   * other `max` overloads, so overriding it will affect their behavior.
   *
   * <p><b>Java 8 users:</b> Use `Collections.max(Arrays.asList(a, b), thisComparator)`
   * instead (but note that it does not guarantee which tied maximum element is returned).
   *
   * @param a value to compare, returned if greater than or equal to b.
   * @param b value to compare.
   * throws ClassCastException if the parameters are not <i>mutually comparable</i> under this
   *     ordering.
   */
  public maxOf<E extends T> (a: E, b: E): E {
    return (this.compare(a, b) >= 0) ? a : b;
  }

  /**
   * Returns the `k` least elements from the given iterator according to this ordering, in
   * order from least to greatest. If there are fewer than `k` elements present, all will be
   * included.
   *
   * <p>The implementation does not necessarily use a <i>stable</i> sorting algorithm; when multiple
   * elements are equivalent, it is undefined which will come first.
   *
   * <p><b>Java 8 users:</b> Continue to use this method for now. After the next release of Guava,
   * use `Streams.stream(iterator).collect(Comparators.least(k, thisComparator))` instead.
   *
   * @returns an immutable `RandomAccess` list of the `k` least elements in ascending
   *     order
   * throws IllegalArgumentException if `k` is negative
   */
  // public leastOf<E extends T>(iterator: Iterator<E>, k: number): Array<E> {
  //   if (k == 0 || !iterator.hasNext()) {
  //     return [];
  //   } else {
  //     TopKSelector<E> selector = TopKSelector.least(k, this);
  //     selector.offerAll(iterator);
  //     return selector.topK();
  //   }
  // }

  /**
   * Returns the `k` greatest elements of the given iterable according to this ordering, in
   * order from greatest to least. If there are fewer than `k` elements present, all will be
   * included.
   *
   * <p>The implementation does not necessarily use a <i>stable</i> sorting algorithm; when multiple
   * elements are equivalent, it is undefined which will come first.
   *
   * @returns an immutable `RandomAccess` list of the `k` greatest elements in
   *     <i>descending order</i>
   * throws IllegalArgumentException if `k` is negative
   */
  // public <E extends T> List<E> greatestOf(Iterable<E> iterable, int k) {
  //   // TODO(kevinb): see if delegation is hurting performance noticeably
  //   // TODO(kevinb): if we change this implementation, add full unit tests.
  //   return reverse().leastOf(iterable, k);
  // }

  /**
   * Returns the `k` greatest elements from the given iterator according to this ordering, in
   * order from greatest to least. If there are fewer than `k` elements present, all will be
   * included.
   *
   * <p>The implementation does not necessarily use a <i>stable</i> sorting algorithm; when multiple
   * elements are equivalent, it is undefined which will come first.
   *
   * <p><b>Java 8 users:</b> Continue to use this method for now. After the next release of Guava,
   * use `Streams.stream(iterator).collect(Comparators.greatest(k, thisComparator))` instead.
   *
   * @returns an immutable `RandomAccess` list of the `k` greatest elements in
   *     <i>descending order</i>
   * throws IllegalArgumentException if `k` is negative
   */
  // public <E extends T> List<E> greatestOf(Iterator<E> iterator, int k) {
  //   return reverse().leastOf(iterator, k);
  // }

  /**
   * Returns a <b>mutable</b> list containing `elements` sorted by this ordering; use this
   * only when the resulting list may need further modification, or may contain `null`. The
   * input is not modified. The returned list is serializable and has random access.
   *
   * <p>Unlike {@link Sets.newTreeSet}, this method does not discard elements that are
   * duplicates according to the comparator. The sort performed is <i>stable</i>, meaning that such
   * elements will appear in the returned list in the same order they appeared in `elements`.
   *
   * <p><b>Performance note:</b> According to our
   * benchmarking
   * on Open JDK 7, {@link immutableSortedCopy} generally performs better (in both time and space)
   * than this method, and this method in turn generally performs better than copying the list and
   * calling {@link Collections.sort}.
   */
  // TODO(kevinb): rerun benchmarks including new options
  // @CanIgnoreReturnValue // TODO(kak): Consider removing this
  // public <E extends T> List<E> sortedCopy(Iterable<E> elements) {
  //   @SuppressWarnings("unchecked") // does not escape, and contains only E's
  //   E[] array = (E[]) Iterables.toArray(elements);
  //   Arrays.sort(array, this);
  //   return Lists.newArrayList(Arrays.asList(array));
  // }

  /**
   * Returns an <b>immutable</b> list containing `elements` sorted by this ordering. The input
   * is not modified.
   *
   * <p>Unlike {@link Sets.newTreeSet}, this method does not discard elements that are
   * duplicates according to the comparator. The sort performed is <i>stable</i>, meaning that such
   * elements will appear in the returned list in the same order they appeared in `elements`.
   *
   * <p><b>Performance note:</b> According to our
   * benchmarking
   * on Open JDK 7, this method is the most efficient way to make a sorted copy of a collection.
   *
   * throws NullPointerException if any element of `elements` is `null`
   */
  // TODO(kevinb): rerun benchmarks including new options
  // @CanIgnoreReturnValue // TODO(kak): Consider removing this before internal migration
  // public <E extends T> ImmutableList<E> immutableSortedCopy(Iterable<E> elements) {
  //   return ImmutableList.sortedCopyOf(this, elements);
  // }

  /**
   * Returns `true` if each element in `iterable` after the first is greater than or
   * equal to the element that preceded it, according to this ordering. Note that this is always
   * true when the iterable has fewer than two elements.
   *
   * <p><b>Java 8 users:</b> Use the equivalent {@link Comparators.isInOrder}
   * instead, since the rest of `Ordering` is mostly obsolete (as explained in the class
   * documentation).
   */
  public isOrdered(iterator: Iterator<T>): boolean {
    let prev: IteratorResult<T> = iterator.next();
    let next: IteratorResult<T> = iterator.next();
    if (!next.done) {
      while (!next.done) {
        if (this.compare(prev.value, next.value) > 0) {
          return false;
        }
        prev = next;
        next = iterator.next();
      }
    }
    return true;
  }

  /**
   * Returns `true` if each element in `iterable` after the first is <i>strictly</i>
   * greater than the element that preceded it, according to this ordering. Note that this is always
   * true when the iterable has fewer than two elements.
   *
   * <p><b>Java 8 users:</b> Use the equivalent {@link Comparators.isInStrictOrder(Iterable,
   * Comparator)} instead, since the rest of `Ordering` is mostly obsolete (as explained in
   * the class documentation).
   */
  public isStrictlyOrdered(iterator: Iterator<T>): boolean {
    let prev: IteratorResult<T> = iterator.next();
    let next: IteratorResult<T> = iterator.next();
    if (!next.done) {
      while (!next.done) {
        if (this.compare(prev.value, next.value) >= 0) {
          return false;
        }
        prev = next;
        next = iterator.next();
      }
    }
    return true;
  }
}

// private static class ArbitraryOrderingHolder {
//   static final Ordering<Object> ARBITRARY_ORDERING = new ArbitraryOrdering();
// }

// @VisibleForTesting
// static class ArbitraryOrdering extends Ordering<Object> {

//   private final AtomicInteger counter = new AtomicInteger(0);
//   private final ConcurrentMap<Object, Integer> uids =
//       Platform.tryWeakKeys(new MapMaker()).makeMap();

//   private Integer getUid(Object obj) {
//     Integer uid = uids.get(obj);
//     if (uid == null) {
//       // One or more integer values could be skipped in the event of a race
//       // to generate a UID for the same object from multiple threads, but
//       // that shouldn't be a problem.
//       uid = counter.getAndIncrement();
//       Integer alreadySet = uids.putIfAbsent(obj, uid);
//       if (alreadySet != null) {
//         uid = alreadySet;
//       }
//     }
//     return uid;
//   }

//   @Override
//   public int compare(Object left, Object right) {
//     if (left == right) {
//       return 0;
//     } else if (left == null) {
//       return -1;
//     } else if (right == null) {
//       return 1;
//     }
//     int leftCode = identityHashCode(left);
//     int rightCode = identityHashCode(right);
//     if (leftCode != rightCode) {
//       return leftCode < rightCode ? -1 : 1;
//     }

//     // identityHashCode collision (rare, but not as rare as you'd think)
//     int result = getUid(left).compareTo(getUid(right));
//     if (result == 0) {
//       throw new AssertionError(); // extremely, extremely unlikely.
//     }
//     return result;
//   }

//   @Override
//   public String toString() {
//     return "Ordering.arbitrary()";
//   }

//   /*
//    * We need to be able to mock identityHashCode() calls for tests, because it
//    * can take 1-10 seconds to find colliding objects. Mocking frameworks that
//    * can do magic to mock static method calls still can't do so for a system
//    * class, so we need the indirection. In production, Hotspot should still
//    * recognize that the call is 1-morphic and should still be willing to
//    * inline it if necessary.
//    */
//   int identityHashCode(Object object) {
//     return System.identityHashCode(object);
//   }
// }
