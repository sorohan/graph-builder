import { Iterators } from "./Iterators";

export interface ImmutableSetReadOperations<N> {
  [Symbol.iterator](): Iterator<N>;
  size: () => number;
  has: (a: N) => boolean;
}

export class ImmutableSet<N> extends Set<N> { // }, Iterable<N> {
  private readOperations: ImmutableSetReadOperations<N>;

  static fromIterable <N>(iterator: Iterable<N>): ImmutableSet<N> {
    return new ImmutableSet(Array.from(iterator));
  }

  static fromSetOperations <N>(operations: ImmutableSetReadOperations<N>) {
    return new ImmutableSet(null, operations);
  }

  private constructor(values?: Array<N> | null, readOperations?: ImmutableSetReadOperations<N>) {
    super(values);
    this.readOperations = readOperations || {
      [Symbol.iterator]: () => super[Symbol.iterator](),
      size: () => super.size,
      has: (a: N) => super.has(a)
    };
  }

  add(value: N): this {
    throw new Error('Not implemented');
  }

  clear(): void {
    throw new Error('Not implemented');
  }

  delete(value: N): boolean {
    throw new Error('Not implemented');
  }

  forEach(callbackfn: (value: N, value2: N, set: Set<N>) => void, thisArg?: any): void {
    const iterator = this[Symbol.iterator]();
    for (let value of iterator) {
      callbackfn.call(thisArg || undefined, value, value, this);
    }
  }

  has(value: N): boolean {
    return this.readOperations.has(value);
  }

  get size() {
    return this.readOperations.size();
  }

  [Symbol.iterator](): IterableIterator<N> {
    const iterator = this.readOperations[Symbol.iterator]();
    const iterableIterator: any = {
      next: () => iterator.next(),
    }
    iterableIterator[Symbol.iterator] = () => iterableIterator;
    return iterableIterator;
  }

  entries(): IterableIterator<[N, N]> {
    const iterator = Iterators.transform<N, [N, N]>(this.readOperations[Symbol.iterator](), (a: N) => [a, a]);
    const iterableIterator: any = {
      next: () => iterator.next(),
    }
    iterableIterator[Symbol.iterator] = () => iterableIterator;
    return iterableIterator;
  }
}