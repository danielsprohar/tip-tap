import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private keySubject = new Subject<string>()

  constructor() { }

  get key$() {
    return this.keySubject.asObservable()
  }

  setKey(value: string) {
    this.keySubject.next(value)
  }
}
