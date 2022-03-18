import { Component, OnInit } from '@angular/core'
import {
  Subscription,
  Observable,
  timer,
  takeWhile,
  shareReplay,
  finalize,
} from 'rxjs'

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
  private readonly sessionDuration = 5 // seconds
  private keyboardHandler?: any

  timer$: Observable<number> | null = null
  isTicking = false
  message = ''

  constructor(private document: Document) {}

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

    console.log(event.key)
  }

  private createTimer() {
    return timer(0, 1000).pipe(
      takeWhile((value) => value <= this.sessionDuration),
      shareReplay(),
      finalize(() => {
        this.message = 'Session has expired'
        this.isTicking = false
        this.document.removeEventListener('keyup', this.keyboardHandler, true)
      })
    )
  }

  startTimer() {
    this.document.addEventListener('keyup', this.keyboardHandler, true)
    this.timer$ = this.createTimer()
    this.timerSub = this.timer$.subscribe()
    this.isTicking = true
    this.message = ''
  }
}
