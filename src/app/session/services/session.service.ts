import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Metrica } from '../models/metrica'

@Injectable()
export class SessionService {
  private metricaSubject = new BehaviorSubject<Metrica>(new Metrica())
  private readonly sessionDuration = 60

  constructor() {}

  get metrica() {
    return this.metricaSubject.value
  }

  get metrica$() {
    return this.metricaSubject.asObservable()
  }

  get duration() {
    return this.sessionDuration
  }

  setMetrica(metrica: Metrica) {
    this.metricaSubject.next(metrica)
  }

  reset() {
    this.metricaSubject.next(new Metrica())
  }

  /**
   * Calculate the number of words per minute (WPM).
   * @param secondsElapsed The amount of time (in seconds)
   */
  calcWordsPerMinute(secondsElapsed: number) {
    if (secondsElapsed === 0) return

    this.metricaSubject.next(
      new Metrica({
        ...this.metricaSubject.value,
        wpm: Math.floor(
          (this.metricaSubject.value.characterCount * 60) / secondsElapsed
        ),
      })
    )
  }

  incrementCharacterCount() {
    this.metricaSubject.next(
      new Metrica({
        ...this.metricaSubject.value,
        characterCount: this.metricaSubject.value.characterCount + 1,
      })
    )
  }

  incrementErrorCount() {
    this.metricaSubject.next(
      new Metrica({
        ...this.metricaSubject.value,
        errorCount: this.metricaSubject.value.errorCount + 1,
      })
    )
  }
}
