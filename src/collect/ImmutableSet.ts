import { Iterators } from "./Iterators";

export interface ImmutableSetReadOperations<N> {
  [Symbol.iterator](): Iterator<N>;
  size: () => number;
  has: (a: N) => boolean;
}

export class ImmutableSet<N> extends Set<N> { // }, Iterable<N> {
  private readOperations: ImmutableSetReadOperations<N>;
  private initialized = false;

  static fromIterable <N>(iterator: Iterable<N>): ImmutableSet<N> {
    return new ImmutableSet(Array.from(iterator));
  }

  static fromSetOperations <N>(operations: ImmutableSetReadOperations<N>) {
    return new ImmutableSet(null, operations);
  }

  static of <N>(node: N) {
    return new ImmutableSet([node]);
  }

  static empty <N>() {
    return new ImmutableSet<N>();
  }

  private constructor(values?: Array<N> | null, readOperations?: ImmutableSetReadOperations<N>) {
    super(values);
    this.readOperations = readOperations || {
      [Symbol.iterator]: () => super[Symbol.iterator](),
      size: () => super.size,
      has: (a: N) => super.has(a)
    };
    this.initialized = true;
  }

  add(value: N): this {
    if (this.initialized) { // add is called in super's constructor
      throw new Error('Not implemented');
    }
    return super.add(value);
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
    const iterableIterator: IterableIterator<[N, N]> = {
      next: () => iterator.next(),
      [Symbol.iterator]: () => iterableIterator
    }
    return iterableIterator;
  }

  values(): IterableIterator<N> {
    const iterator = this.readOperations[Symbol.iterator]();
    const iterableIterator: IterableIterator<N> = {
      next: () => iterator.next(),
      [Symbol.iterator]: () => iterableIterator
    }
    return iterableIterator;
  }
}