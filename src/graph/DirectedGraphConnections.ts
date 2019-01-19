import { GraphConnections } from "./GraphConnections";
import { GraphConstants } from "./GraphConstants";
import { ImmutableSet } from "../collect/ImmutableSet";
import { ImmutableMap } from "../collect/ImmutableMap";


// @todo: assertion lib
const checkNonNegative = (n: number): void => {
  if (n < 0) throw new Error('Negative number');
};

const checkPositive = (n: number): void => {
  if (n <= 0) throw new Error('Non positive number');
};

const checkState = (assert: boolean) => {
  if (!assert) {
    throw new Error('Invalid state');
  }
}
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

const PRED = Symbol('PRED');
type NodeValue<V> = PredAndSucc<V> | typeof PRED | V;

/**
 * An implementation of {@link GraphConnections} for directed graphs.
 *
 * @author James Sexton
 * @param <N> Node parameter type
 * @param <V> Value parameter type
 */
export class DirectedGraphConnections<N, V> implements GraphConnections<N, V> {
  // Every value in adjacentNodeValues this map must either be an instance of PredAndSucc with a successorValue of
  // type V, PRED (representing predecessor), or an instance of type V (representing successor).

  private constructor(
    private adjacentNodeValues: Map<N, NodeValue<V>>,
    private predecessorCount: number,
    private successorCount: number,
  ) {
    checkState (predecessorCount <= adjacentNodeValues.size &&
      successorCount <= adjacentNodeValues.size);
  }

  static of<N, V>(): DirectedGraphConnections<N, V> {
    return new DirectedGraphConnections<N, V>(new Map<N, NodeValue<V>>(), 0, 0);
  }

  static ofImmutable<N, V>(
    predecessors: Set<N>,
    successorValues: Map<N, V>,
  ): DirectedGraphConnections<N, V> {
    const adjacentNodeValues = new Map<N, NodeValue<V>>(successorValues);
    for (const predecessor of predecessors) {
      const value = successorValues.get(predecessor); // or should be from adjacentNodeValues?
      adjacentNodeValues.set(predecessor, PRED);
      if (value !== undefined) {
        adjacentNodeValues.set(predecessor, new PredAndSucc(value));
      }
    }
    return new DirectedGraphConnections<N, V>(
      ImmutableMap.copyOf(adjacentNodeValues),
      predecessors.size,
      successorValues.size,
    );
  }

  public adjacentNodes(): Set<N>  {
    return ImmutableSet.fromIterable<N>(this.adjacentNodeValues.keys());
  }

  public predecessors(): Set<N> {
    const that = this;
    return ImmutableSet.fromSetOperations<N>({
      [Symbol.iterator]: (): IterableIterator<N> => {
        const entries: Iterator<[N, NodeValue<V>]> = that.adjacentNodeValues.entries();
        const next = (): IteratorResult<N> => {
          let result = entries.next();
          while (!result.done) {
            const [key, value]: [N, NodeValue<V>] = result.value;
            if (DirectedGraphConnections.isPredecessor(value)) {
              return {
                value: key,
                done: false,
              };
            }
            result = entries.next();
          }
          return {
            value: undefined as any as N,
            done: true,
          };
        };
        const iterableIterator: IterableIterator<N> = {
          [Symbol.iterator]: () => iterableIterator,
          next,
        };
        return iterableIterator;
      },
      size: () => that.predecessorCount,
      has: (n: N): boolean => {
        const value = that.adjacentNodeValues.get(n);
        return value !== undefined && DirectedGraphConnections.isPredecessor(value);
      },
    });
  }

  public successors(): Set<N> {
    const that = this;
    return ImmutableSet.fromSetOperations({
      [Symbol.iterator]: (): IterableIterator<N> => {
        const entries: Iterator<[N, NodeValue<V>]> = that.adjacentNodeValues.entries();
        const next = () => {
          let result = entries.next();
          while (!result.done) {
            const [key, value]: [N, NodeValue<V>] = result.value;
            if (DirectedGraphConnections.isSuccessor(value)) {
              return {
                value: key,
                done: false,
              };
            }
            result = entries.next();
          }
          return {
            value: undefined as any as N,
            done: true,
          };
        };
        const iterableIterator: IterableIterator<N> = {
          [Symbol.iterator]: () => iterableIterator,
          next,
        };
        return iterableIterator;
      },
      size: () => that.successorCount,
      has: (n: N) => {
        const value = that.adjacentNodeValues.get(n);
        return value !== undefined && DirectedGraphConnections.isSuccessor(value);
      },
    });
  }

  public value(node: N): V | undefined {
    const value: NodeValue<V> | undefined = this.adjacentNodeValues.get(node);
    if (value == PRED) {
      return undefined;
    }
    if (value instanceof PredAndSucc) {
      return value.successorValue;
    }
    return value;
  }

  public removePredecessor(node: N): void {
    const previousValue = this.adjacentNodeValues.get(node);
    if (previousValue == PRED) {
      this.adjacentNodeValues.delete(node);
      checkNonNegative(--this.predecessorCount);
    } else if (previousValue instanceof PredAndSucc) {
      this.adjacentNodeValues.set(node, previousValue.successorValue);
      checkNonNegative(--this.predecessorCount);
    }
  }

  public removeSuccessor(node: N): V | undefined {
    const previousValue = this.adjacentNodeValues.get(node);
    if (previousValue === undefined || previousValue == PRED) {
      return undefined;
    } else if (previousValue instanceof PredAndSucc) {
      this.adjacentNodeValues.set(node, PRED);
      checkNonNegative(--this.successorCount);
      return previousValue.successorValue;
    } else { // successor
      this.adjacentNodeValues.delete(node);
      checkNonNegative(--this.successorCount);
      return previousValue;
    }
  }

  public addPredecessor(node: N, unused: V): void {
    const previousValue = this.adjacentNodeValues.get(node);
    this.adjacentNodeValues.set(node, PRED);
    if (previousValue === undefined) {
      checkPositive(++this.predecessorCount);
    } else if (previousValue instanceof PredAndSucc) {
      // Restore previous PredAndSucc.
      this.adjacentNodeValues.set(node, previousValue);
    } else if (previousValue !== PRED) { // successor
      // Do NOT use method parameter value 'unused'. In directed graphs, successors store the value.
      this.adjacentNodeValues.set(node, new PredAndSucc(previousValue));
      checkPositive(++this.predecessorCount);
    }
  }

  public addSuccessor(node: N, value: V): V | undefined {
    const previousValue = this.adjacentNodeValues.get(node);
    this.adjacentNodeValues.set(node, value);
    if (previousValue === undefined) {
      checkPositive(++this.successorCount);
      return undefined;
    } else if (previousValue instanceof PredAndSucc) {
      this.adjacentNodeValues.set(node, new PredAndSucc(value));
      return previousValue.successorValue;
    } else if (previousValue === PRED) {
      this.adjacentNodeValues.set(node, new PredAndSucc(value));
      checkPositive(++this.successorCount);
      return undefined;
    } else { // successor
      return previousValue;
    }
  }

  private static isPredecessor<V>(value: NodeValue<V>): boolean {
    return (value == PRED) || (value instanceof PredAndSucc);
  }

  private static isSuccessor<V>(value: NodeValue<V>): boolean {
    return (value != PRED) && (value !== undefined);
  }
}

/**
 * A wrapper class to indicate a node is both a predecessor and successor while still providing
 * the successor value.
 */
class PredAndSucc<V> {
  constructor(public readonly successorValue: V) { }
}