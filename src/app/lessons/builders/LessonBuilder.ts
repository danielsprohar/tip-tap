import { ParamMap } from '@angular/router'
import { Finger, Hand, Lesson, Level } from '../models/lesson'

/**
 * Build a new instance of a Lesson with the given ParamMap.
 */
export class LessonBuilder {
  private _level?: Level
  private _hand?: Hand
  private _finger?: Finger
  private _isHomeKeys?: boolean

  constructor() {}

  level(level: Level): LessonBuilder {
    this._level = level
    return this
  }

  hand(hand: Hand): LessonBuilder {
    this._hand = hand
    return this
  }

  finger(finger: Finger): LessonBuilder {
    this._finger = finger
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
      level: this._level!,
      hand: this._hand!,
      finger: this._finger,
      isHomeKeys: this._isHomeKeys,
    })
  }
}
