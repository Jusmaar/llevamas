import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Rx';

@Injectable()
export class TopService {

  topStatic: number;
  top: Subject<number> = new Subject<number>();

  constructor() { }

  set(top: number): void {
    this.topStatic = top;
    this.top.next(top);
  }

  getStatic(): number {
    return this.topStatic;
  }

  get(): Subject<number> {
    return this.top;
  }

}
