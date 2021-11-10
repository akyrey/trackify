import { LetContextDirective } from '../directives';

export class LetContext<T> {
  constructor(private readonly dir: LetContextDirective<T>) {}

  get ngLet(): T | undefined {
    return this.dir.ngLet;
  }
}
