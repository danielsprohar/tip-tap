import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable()
export class KeyboardService {
  private readonly keyboardEventSubject = new Subject<KeyboardEvent>()
  private readonly highlightKeySubject = new BehaviorSubject<string>('')

  constructor() {}

  /**
   * Get an instance of a new `Observable` to listen for events emitted by the keyboard.
   */
  get event$() {
    return this.keyboardEventSubject.asObservable()
  }

  get highlightKey$() {
    return this.highlightKeySubject.asObservable()
  }

  setKeyboardEvent(e: KeyboardEvent) {
    this.keyboardEventSubject.next(e)
  }

  setHighlightKey(key: string) {
    this.highlightKeySubject.next(key)
  }
}
