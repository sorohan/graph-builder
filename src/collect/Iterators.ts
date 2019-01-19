export namespace Iterators {
  /**
  * Returns a view containing the result of applying {@code function} to each element of {@code
  * fromIterator}.
  *
  * <p>The returned iterator supports {@code remove()} if {@code fromIterator} does. After a
  * successful {@code remove()} call, {@code fromIterator} no longer contains the corresponding
  * element.
  */
  export const transform = <F, T>(
    fromIterator: Iterator<F>,
    mapper: (a: F) => T,
  ): Iterator<T> => ({
    next: (): IteratorResult<T> => {
      const result = fromIterator.next();
      return {
        ...result,
        value: result.value !== undefined ? mapper(result.value) : result.value,
      };
    }
  });

  export const concat = <N>(a: Iterator<N>, b: Iterator<N>): Iterator<N> => ({
    next: () => {
      const result = a.next();
      return (result.done) ? b.next() : result;
    }
  });
}
