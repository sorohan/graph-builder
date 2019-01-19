export interface Comparable<T> {
  /**
   * Compares this object with the specified object for order. Returns a negative
   * integer, zero, or a positive integer as this object is less than, equal to,
   * or greater than the specified object.
   *
   * The implementor must ensure sgn(x.compareTo(y)) == -sgn(y.compareTo(x)) for
   * all x and y. (This implies that x.compareTo(y) must throw an exception iff
   * y.compareTo(x) throws an exception.)
   *
   * The implementor must also ensure that the relation is transitive:
   * (x.compareTo(y)>0 && y.compareTo(z)>0) implies x.compareTo(z)>0.
   *
   * Finally, the implementor must ensure that x.compareTo(y)==0 implies that
   * sgn(x.compareTo(z)) == sgn(y.compareTo(z)), for all z.
   *
   * It is strongly recommended, but not strictly required that
   * (x.compareTo(y)==0) == (x.equals(y)). Generally speaking, any class that
   * implements the Comparable interface and violates this condition should clearly
   * indicate this fact. The recommended language is "Note: this class has a
   * natural ordering that is inconsistent with equals."
   *
   * In the foregoing description, the notation sgn(expression) designates the
   * mathematical signum function, which is defined to return one of -1, 0, or 1
   * according to whether the value of expression is negative, zero or positive.
   */
  compareTo(a: Comparable<T>): number;
}
