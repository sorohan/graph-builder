import { GraphConnections } from "./GraphConnections";
import { ImmutableMap } from "../collect/ImmutableMap";
import { ImmutableSet } from "../collect/ImmutableSet";

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
 * An implementation of {@link GraphConnections} for undirected graphs.
 */
export class UndirectedGraphConnections<N, V> implements GraphConnections<N, V> {
  private constructor (private adjacentNodeValues: Map<N, V>) { }

  static of<N, V>(): UndirectedGraphConnections<N, V> {
    return new UndirectedGraphConnections<N, V>(new Map<N, V>());
  }

  static ofImmutable<N, V>(adjacentNodeValues: Map<N, V>): UndirectedGraphConnections<N, V> {
    return new UndirectedGraphConnections<N, V>(ImmutableMap.copyOf(adjacentNodeValues));
  }

  public adjacentNodes(): Set<N> {
    return ImmutableSet.fromIterable(this.adjacentNodeValues.keys());
  }

  public predecessors(): Set<N> {
    return this.adjacentNodes();
  }

  public successors(): Set<N> {
    return this.adjacentNodes();
  }

  public value(node: N): V {
    const v = this.adjacentNodeValues.get(node);
    if (v === undefined) {
      throw new Error('Node not defined');
    }
    return v;
  }

  public removePredecessor(node: N): void {
    this.removeSuccessor(node);
  }

  public removeSuccessor(node: N): V {
    const v = this.adjacentNodeValues.get(node);
    if (v === undefined) {
      throw new Error('Node not defined');
    }
    this.adjacentNodeValues.delete(node);
    return v;
  }

  public addPredecessor(node: N, value: V): void {
    this.addSuccessor(node, value);
  }

  public addSuccessor(node: N, value: V): V {
    this.adjacentNodeValues.set(node, value);
    return value;
  }
}
