import { Component, OnInit } from '@angular/core'
import {
  finalize,
  Observable,
  shareReplay,
  Subscription,
  takeWhile,
  tap,
  timer,
} from 'rxjs'
import { KeyboardService } from './services/keyboard.service'

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
export class AppComponent implements OnInit {
  private timerSub?: Subscription
  private keyboardHandler?: any
  readonly sessionDuration = 15 // seconds

  timer$: Observable<number> | null = null
  message = ''

  constructor(private document: Document, private keyboard: KeyboardService) {}

  ngOnInit() {
    this.keyboardHandler = this.handleKeyboard.bind(this)
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe()
    }
  }

  private handleKeyboard(event: KeyboardEvent) {
    if (event.isComposing) {
      return
    }

    event.preventDefault()

    this.keyboard.setKey(event.key)
  }

  private createTimer() {
    return timer(0, 1000).pipe(
      shareReplay(),
      takeWhile((timeElapsed) => timeElapsed <= this.sessionDuration),
      tap((timer) => console.log('timer', timer)),
      finalize(() => {
        this.message = 'Session has expired'
        this.document.removeEventListener('keyup', this.keyboardHandler, true)
      })
    )
  }

  startTimer(event: Event) {
    const btn$ = event.target as HTMLButtonElement
    btn$.blur()

    this.document.addEventListener('keyup', this.keyboardHandler, true)
    this.timer$ = this.createTimer()
    this.timerSub = this.timer$.subscribe()
    this.message = ''
  }
}
