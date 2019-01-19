import { Comparator } from "./Comparator";

// @todo: create iterator of fixed order
// @see https://docs.oracle.com/javase/8/docs/api/java/util/LinkedHashMap.html
export class LinkedHashMap<K, V> extends Map<K, V> {
  set(key: K, value: V) {
    return super.set(key, value);
  }

  delete(key: K) {
    return super.delete(key);
  }
}

// @todo: create iterator based on comparator order
// @see https://docs.oracle.com/javase/7/docs/api/java/util/TreeMap.html
export class TreeMap<K, V> extends Map<K, V> {
  constructor(private comparator: Comparator<K>) {
    super();
  }
}

export namespace Maps {
  export const equals = <K, V>(a: Map<K, V>, b: Map<K, V>) => {
    if (a.size !== b.size) {
        return false;
    }
    for (const [key, val] of a) {
      const testVal = b.get(key);
      if (testVal !== val || (testVal === undefined && !b.has(key))) {
          return false;
      }
    }
    return true;
  };

  export const asMap = <K, V>(set: Set<K>, mapper: (a: K) => V): Map<K, V> => new Map(
    Array.from(set.entries()).map(([k, v]: [K, K]): [K, V] => [k, mapper(v)])
  );
}
