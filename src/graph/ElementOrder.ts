import { Comparator } from "../collect/Comparator";
import { Comparable } from "../collect/Comparable";
import { NaturalOrdering } from "../collect/NaturalOrdering";
import { LinkedHashMap, TreeMap } from "../collect/Maps";

/*
 * Copyright (C) 2016 The Guava Authors
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
 */

/**
 * The type of ordering that this object specifies.
 *
 * <ul>
 *   <li>UNORDERED: no order is guaranteed.
 *   <li>INSERTION: insertion ordering is guaranteed.
 *   <li>SORTED: ordering according to a supplied comparator is guaranteed.
 * </ul>
 */
export enum Type {
  UNORDERED,
  INSERTION,
  SORTED
}

/**
 * Used to represent the order of elements in a data structure that supports different options for
 * iteration order guarantees.
 *
 * <p>Example usage:
 *
 * <pre>{@code
 * MutableGraph<Integer> graph =
 *     GraphBuilder.directed().nodeOrder(ElementOrder.<Integer>natural()).build();
 * }</pre>
 *
 * @author Joshua O'Madadhain
 * @since 20.0
 */
export class ElementOrder<T> {
  constructor(readonly type: Type, private readonly comparator?: Comparator<T>) {
  }

  /** Returns an instance which specifies that no ordering is guaranteed. */
  public static unordered<S>(): ElementOrder<S> {
    return new ElementOrder<S>(Type.UNORDERED, undefined);
  }

  /** Returns an instance which specifies that insertion ordering is guaranteed. */
  public static insertion<S>(): ElementOrder<S> {
    return new ElementOrder<S>(Type.INSERTION, undefined);
  }

  /**
   * Returns an instance which specifies that the natural ordering of the elements is guaranteed.
   */
  public static natural<S extends Comparable<S>>(): ElementOrder<S>{
    return new ElementOrder<S>(Type.SORTED, NaturalOrdering.of<S>());
  }

  /**
   * Returns an instance which specifies that the ordering of the elements is guaranteed to be
   * determined by {@code comparator}.
   */
  public static sorted<S>(comparator: Comparator<S>): ElementOrder<S> {
    return new ElementOrder<S>(Type.SORTED, comparator);
  }

  /**
   * Returns the {@link Comparator} used.
   *
   * @throws UnsupportedOperationException if comparator is not defined
   */
  public getComparator(): Comparator<T> {
    if (this.comparator) {
      return this.comparator;
    }
    throw new Error("This ordering does not define a comparator.");
  }

  public equals(obj?: object): boolean {
    if (obj == this) {
      return true;
    }

    if (!(obj instanceof ElementOrder)) {
      return false;
    }

    const other = obj;
    return (this.type == other.type) && this.comparator === other.getComparator();
  }

  // public int hashCode() {
  //   return Objects.hashCode(type, comparator);
  // }

  // public String toString() {
  //   ToStringHelper helper = MoreObjects.toStringHelper(this).add("type", type);
  //   if (comparator != null) {
  //     helper.add("comparator", comparator);
  //   }
  //   return helper.toString();
  // }

  /** Returns an empty mutable map whose keys will respect this {@link ElementOrder}. */
  createMap<K extends T, V>(expectedSize: number): Map<K, V> {
    switch (this.type) {
      case Type.UNORDERED:
        new Map();
      case Type.INSERTION:
        return new LinkedHashMap();
      case Type.SORTED:
        return new TreeMap<K, V>(this.getComparator());
      default:
        throw new Error();
    }
  }
}
