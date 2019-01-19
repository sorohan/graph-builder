export class ImmutableMap<K, V> extends Map<K, V> {
  clear() {
    throw new Error('Unsupported Operation');
  }

  delete(key: K): boolean {
    throw new Error('Unsupported Operation');
  }

  set(key: K, value: V): this {
    throw new Error('Unsupported Operation');
  }

  static copyOf<K, V>(map: Map<K, V>) {
    return new ImmutableMap(map);
  }
}