export namespace Sets {
  /**
   * Returns an unmodifiable <b>view</b> of the difference of two sets. The returned set contains
   * all elements that are contained by {@code set1} and not contained by {@code set2}. {@code set2}
   * may also contain elements not present in {@code set1}; these are simply ignored. The iteration
   * order of the returned set matches that of {@code set1}.
   *
   * <p>Results are undefined if {@code set1} and {@code set2} are sets based on different
   * equivalence relations (as {@code HashSet}, {@code TreeSet}, and the keySet of an {@code
   * IdentityHashMap} all are).
   */
  export const difference = <E>(set1: Set<E>, set2: Set<E>): Set<E> => {
    const newSet = new Set(Array.from(set1));
    set2.forEach((value: E) => {
      newSet.delete(value);
    });
    return newSet;
  }

  export const equals = <N>(a: Set<N>, b: Set<N>): boolean => {
    if (a.size !== b.size) return false;
    for (let x of a) {
      if (!b.has(x)) {
        return false;
      }
    }
    return true;
  };
}