import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class KeyboardService {
  private keyboardEventSubject = new Subject<KeyboardEvent>()

  constructor() { }

  /**
   * Get an instance of a new `Observable` to listen for events emitted by the keyboard.
   */
  get event$() {
    return this.keyboardEventSubject.asObservable()
  }

  setKeyboardEvent(e: KeyboardEvent) {
    this.keyboardEventSubject.next(e)
  }
}
