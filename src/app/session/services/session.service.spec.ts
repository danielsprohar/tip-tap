import { TestBed } from '@angular/core/testing'
import { Metrica } from '../models/metrica'
import { SessionService } from './session.service'

describe('SessionService', () => {
  let session: SessionService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService],
    })
    session = TestBed.inject(SessionService)
  })

  it('should be created', () => {
    expect(session).toBeTruthy()
  })

  it('#setMetrica() should set the metrics', (done: DoneFn) => {
    const mockMetrica = new Metrica({
      errorCount: 0,
      characterCount: 0,
      wordCount: 1,
      wpm: 0,
    })

    // BehaviorSubject can be triggered before subscribe()
    session.setMetrica(mockMetrica)

    session.metrica$.subscribe((metrica: Metrica) => {
      expect(metrica).toEqual(mockMetrica)
      done()
    })
  })

  it('#reset() should reset the current session', (done: DoneFn) => {
    session.reset$.subscribe((value: boolean) => {
      expect(value).toBeTrue()
      done()
    })

    // Subject must be triggered after subscribe()
    session.reset()
  })

  it('#incrementCharacterCount() should increment the character cound', (done: DoneFn) => {
    session.incrementCharacterCount()
    session.metrica$.subscribe((metrica: Metrica) => {
      expect(metrica.characterCount).toBe(new Metrica().characterCount + 1)
      done()
    })
  })

  it('#incrementWordCount() should increment the word count', (done: DoneFn) => {
    session.incrementWordCount()
    session.metrica$.subscribe((metrica: Metrica) => {
      expect(metrica.wordCount).toBe(new Metrica().wordCount + 1)
      done()
    })
  })

  it('#incrementErrorCount() should increment the error count', (done: DoneFn) => {
    session.incrementErrorCount()
    session.metrica$.subscribe((metrica: Metrica) => {
      expect(metrica.errorCount).toBe(new Metrica().errorCount + 1)
      done()
    })
  })

  it('#calcWordsPerMinute() should calculate WPM', (done: DoneFn) => {
    const timeDelta = 30 // seconds
    const mockMetrica = new Metrica({
      characterCount: 20,
      wordCount: 4,
      errorCount: 0,
      wpm: 0,
    })

    session.setMetrica(mockMetrica)
    session.calcWordsPerMinute(timeDelta)

    session.metrica$.subscribe((metrica: Metrica) => {
      expect(metrica.wpm).toBe(8)
      done()
    })
  })
})
