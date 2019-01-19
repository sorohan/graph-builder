import { Comparable } from "./Comparable";
import { Ordering } from "./Ordering";

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

export class NaturalOrdering<T> extends Ordering<Comparable<T>> {
  static INSTANCE = new NaturalOrdering<any>();

  /**
   * Returns a serializable ordering that uses the natural order of the values. The ordering throws
   * a {@link NullPointerException} when passed a null parameter.
   *
   * <p>The type specification is {@code <C extends Comparable>}, instead of the technically correct
   * {@code <C extends Comparable<? super C>>}, to support legacy types from before Java 5.
   *
   * <p><b>Java 8 users:</b> use {@link Comparator#naturalOrder} instead.
   */
  public static of<C extends Comparable<C>>(): Ordering<C> {
    return NaturalOrdering.INSTANCE;
  }

  public compare(left: Comparable<T>, right: Comparable<T>): number {
    return left.compareTo(right);
  }
}
