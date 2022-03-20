import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Metrica } from '../models/metrica'

@Injectable()
export class SessionService {
  private readonly metricaSubject = new BehaviorSubject<Metrica>(new Metrica())
  private readonly showResultsSubject = new Subject<Metrica>()
  private readonly resetSubject = new Subject<boolean>()
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

  get results$() {
    return this.showResultsSubject.asObservable()
  }

  get reset$() {
    return this.resetSubject.asObservable()
  }

  setMetrica(metrica: Metrica) {
    console.log(metrica)
    this.metricaSubject.next(metrica)
  }

  showResults() {
    this.showResultsSubject.next(this.metricaSubject.value)
  }

  reset() {
    this.resetSubject.next(true)
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

  incrementCharacterCount(value = 1) {
    this.metricaSubject.next(
      new Metrica({
        ...this.metricaSubject.value,
        characterCount: this.metricaSubject.value.characterCount + value,
      })
    )
  }

  incrementWordCount(value = 1) {
    this.metricaSubject.next(
      new Metrica({
        ...this.metricaSubject.value,
        wordCount: this.metricaSubject.value.wordCount + value,
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
