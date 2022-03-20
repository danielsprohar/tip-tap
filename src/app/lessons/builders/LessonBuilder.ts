import { ParamMap } from '@angular/router'
import { Finger, Hand, Lesson, Level } from '../models/lesson'

/**
 * Build a new instance of a Lesson with the given ParamMap.
 */
export class LessonBuilder {
  private level?: Level
  private hand?: Hand
  private finger?: Finger
  private book?: string
  private chapter?: string
  private _isHomeKeys?: boolean

  constructor() {}

  setLevel(level: Level): LessonBuilder {
    this.level = level
    return this
  }

  setHand(hand: Hand): LessonBuilder {
    this.hand = hand
    return this
  }

  setFinger(finger: Finger): LessonBuilder {
    this.finger = finger
    return this
  }

  isHomeKeys(isHomeKeys: boolean): LessonBuilder {
    this._isHomeKeys = isHomeKeys
    return this
  }

  buildFromParamMap(paramMap: ParamMap): Lesson {
    let obj = {}

    for (let key of paramMap.keys) {
      const o = {
        [key]: paramMap.get(key),
      }

      obj = { ...obj, ...o }
    }

    return new Lesson({ ...(obj as Lesson) })
  }

  build(): Lesson {
    return new Lesson({
      level: this.book ? 'advanced' : this.level!,
      hand: this.book ? 'both' : this.hand!,
      finger: this.finger,
      isHomeKeys: this._isHomeKeys,
      book: this.book,
      chapter: this.chapter,
    })
  }
}
