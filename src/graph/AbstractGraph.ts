import { AbstractBaseGraph } from "./AbstractBaseGraph";
import { Graph } from "./Graph";
import { Sets } from "../collect/Sets";

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

/**
 * This class provides a skeletal implementation of {@link Graph}. It is recommended to extend this
 * class rather than implement {@link Graph} directly.
 *
 * @author James Sexton
 * @param <N> Node parameter type
 * @since 20.0
 */
export abstract class AbstractGraph<N> extends AbstractBaseGraph<N> implements Graph<N> {
  public equals(obj: Graph<N>): boolean {
    return this.isDirected() == obj.isDirected()
        && Sets.equals(this.nodes(), obj.nodes())
        && Sets.equals(this.edges(), obj.edges());
  }

  /** Returns a string representation of this graph. */
  public toString(): string {
    return "isDirected: "
        + this.isDirected()
        + ", allowsSelfLoops: "
        + this.allowsSelfLoops()
        + ", nodes: "
        + this.nodes()
        + ", edges: "
        + this.edges();
  }
}
