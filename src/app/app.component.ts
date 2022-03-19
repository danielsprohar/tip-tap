import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  finalize,
  Observable,
  shareReplay,
  Subscription,
  takeWhile,
  tap,
  timer,
} from 'rxjs'
import { Metrica } from './models/metrica'
import { KeyboardService } from './services/keyboard.service'
import { SessionService } from './services/session.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: Document,
      useValue: document,
    },
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private subsink = new Array<Subscription>()
  private timerSub?: Subscription
  private keyboardHandler?: any
  readonly sessionDuration = 15 // seconds

  timer$: Observable<number> | null = null
  metrica$!: Observable<Metrica>
  message = ''

  constructor(
    private document: Document,
    private session: SessionService,
    private keyboard: KeyboardService
  ) {}

  ngOnInit() {
    this.keyboardHandler = this.handleKeyboard.bind(this)
    this.metrica$ = this.session.metrica$
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe()
    }
    this.subsink.forEach((sub) => sub.unsubscribe())
  }

  private handleKeyboard(event: KeyboardEvent) {
    if (event.isComposing) {
      return
    }

    event.preventDefault()
    this.keyboard.setKeyboardEvent(event)
  }

  private createTimer() {
    return timer(0, 1000).pipe(
      shareReplay(),
      takeWhile((secondsElapsed) => secondsElapsed <= this.sessionDuration),
      tap((secondsElapsed) => this.session.calcWordsPerMinute(secondsElapsed)),
      finalize(() => {
        this.message = 'Session has expired'
        this.document.removeEventListener('keyup', this.keyboardHandler, true)
      })
    )
  }

  startTimer(event: Event) {
    const btn$ = event.target as HTMLButtonElement
    btn$.blur()

    this.session.reset()
    this.document.addEventListener('keyup', this.keyboardHandler, true)
    this.timer$ = this.createTimer()
    this.timerSub = this.timer$.subscribe()
    this.message = ''
  }
}
