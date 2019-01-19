import { Graph } from "./Graph";

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
 *
 * Modifications (C) 2019 Ben Sorohan
 */

/**
 * An immutable pair representing the two endpoints of an edge in a graph. The {@link EndpointPair}
 * of a directed edge is an ordered pair of nodes ({@link source} and {@link target}). The
 * {@link EndpointPair} of an undirected edge is an unordered pair of nodes ({@link nodeU} and
 * {@link nodeV}).
 *
 * <p>The edge is a self-loop if, and only if, the two endpoints are equal.
 *
 * @public
 */
export abstract class EndpointPair<N> implements Iterable<N> {
  constructor(readonly nodeU: N, readonly nodeV: N) { }

  /** Returns an {@link EndpointPair} representing the endpoints of a directed edge. */
  public static ordered<N>(source: N, target: N): EndpointPair<N> {
    return new Ordered<N>(source, target);
  }

  /** Returns an {@link EndpointPair} representing the endpoints of an undirected edge. */
  public static unordered<N>(nodeU: N, nodeV: N): EndpointPair<N> {
    // Swap nodes on purpose to prevent callers from relying on the "ordering" of an unordered pair.
    return new Unordered<N>(nodeV, nodeU);
  }

  /** Returns an {@link EndpointPair} representing the endpoints of an edge in `graph`. */
  static of<N>(graph: Graph<any>, nodeU: N, nodeV: N): EndpointPair<N> {
    return graph.isDirected() ? EndpointPair.ordered(nodeU, nodeV) : EndpointPair.unordered(nodeU, nodeV);
  }

  /** Returns an {@link EndpointPair} representing the endpoints of an edge in `network`. */
  // @todo
  // static <N> EndpointPair<N> of(Network<?, ?> network, N nodeU, N nodeV) {
  //   return network.isDirected() ? ordered(nodeU, nodeV) : unordered(nodeU, nodeV);
  // }

  /**
   * If this {@link EndpointPair} {@link isOrdered}, returns the node which is the source.
   *
   * throws UnsupportedOperationException if this {@link EndpointPair} is not ordered
   */
  public abstract source(): N;

  /**
   * If this {@link EndpointPair} {@link isOrdered}, returns the node which is the target.
   *
   * throws UnsupportedOperationException if this {@link EndpointPair} is not ordered
   */
  public abstract target(): N;

  /**
   * Returns the node that is adjacent to `node` along the origin edge.
   *
   * throws IllegalArgumentException if this {@link EndpointPair} does not contain `node`
   */
  public adjacentNode(node: N): N {
    if (node === this.nodeU) {
      return this.nodeV;
    } else if (node === this.nodeV) {
      return this.nodeU;
    } else {
      throw new Error("EndpointPair " + this + " does not contain node " + node);
    }
  }

  /**
   * Returns `true` if this {@link EndpointPair} is an ordered pair (i.e. represents the
   * endpoints of a directed edge).
   */
  public abstract isOrdered(): boolean;

  /** Iterates in the order {@link nodeU}, {@link nodeV}. */
  [Symbol.iterator]() {
     // @todo: convert to Itera
    return [this.nodeU, this.nodeV][Symbol.iterator]();
  }

  /**
   * Two ordered {@link EndpointPair}s are equal if their {@link source} and {@link target}
   * are equal. Two unordered {@link EndpointPair}s are equal if they contain the same nodes. An
   * ordered {@link EndpointPair} is never equal to an unordered {@link EndpointPair}.
   */
  public abstract equals(obj?: Object): boolean
}

class Ordered<N> extends EndpointPair<N> {
  public source(): N {
    return this.nodeU;
  }

  public target(): N {
    return this.nodeV;
  }

  public isOrdered(): boolean {
    return true;
  }

  public equals(obj?: object): boolean {
    if (obj == this) {
      return true;
    }
    if (!(obj instanceof EndpointPair)) {
      return false;
    }

    const other = obj;
    if (this.isOrdered() != other.isOrdered()) {
      return false;
    }

    return this.source() === other.source() && this.target() === other.target();
  }

  // public hashCode(): number {
  //   return Objects.hashCode(source(), target());
  // }

  public toString(): string {
    return "<" + this.source() + " -> " + this.target() + ">";
  }
}

class Unordered<N> extends EndpointPair<N> {
  public source(): N {
    throw new Error('NOT_AVAILABLE_ON_UNDIRECTED');
  }

  public target(): N {
    throw new Error(`NOT_AVAILABLE_ON_UNDIRECTED`);
  }

  public isOrdered(): boolean {
    return false;
  }

  public equals(obj?: object) {
    if (obj == this) {
      return true;
    }

    if (!(obj instanceof EndpointPair)) {
      return false;
    }

    const other = obj;
    if (this.isOrdered() != other.isOrdered()) {
      return false;
    }

    // Equivalent to the following simple implementation:
    // boolean condition1 = nodeU().equals(other.nodeU()) && nodeV().equals(other.nodeV());
    // boolean condition2 = nodeU().equals(other.nodeV()) && nodeV().equals(other.nodeU());
    // return condition1 || condition2;
    if (this.nodeU === other.nodeU) { // check condition1
      // Here's the tricky bit. We don't have to explicitly check for condition2 in this case.
      // Why? The second half of condition2 requires that nodeV equals other.nodeU.
      // We already know that nodeU equals other.nodeU. Combined with the earlier statement,
      // and the transitive property of equality, this implies that nodeU equals nodeV.
      // If nodeU equals nodeV, condition1 == condition2, so checking condition1 is sufficient.
      return this.nodeV === other.nodeV();
    }
    return this.nodeU === other.nodeV && this.nodeV === other.nodeU; // check condition2
  }

  // public int hashCode() {
  //   return nodeU().hashCode() + nodeV().hashCode();
  // }

  public toString(): string {
    return "[" + this.nodeU + ", " + this.nodeV + "]";
  }
}
