import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import {
  finalize,
  map,
  Observable,
  shareReplay,
  Subscription,
  takeWhile,
  tap,
  timer,
} from 'rxjs'
import { LessonBuilder } from '../lessons/builders/LessonBuilder'
import { Lesson } from '../lessons/models/lesson'
import { Metrica } from './models/metrica'
import { KeyboardService } from './services/keyboard.service'
import { RandomWordGeneratorService } from './services/random-word-generator.service'
import { SessionService } from './services/session.service'

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  providers: [
    SessionService,
    KeyboardService,
    RandomWordGeneratorService,
    {
      provide: Document,
      useValue: document,
    },
  ],
})
export class SessionComponent implements OnInit, OnDestroy {
  private subsink = new Array<Subscription>()
  private timerSub?: Subscription
  private keyboardHandler?: any

  timer$: Observable<number> | null = null
  metrica$!: Observable<Metrica>
  lesson$?: Observable<Lesson>

  constructor(
    readonly session: SessionService,
    private document: Document,
    private keyboard: KeyboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.keyboardHandler = this.handleKeyboard.bind(this)
    this.metrica$ = this.session.metrica$
    this.lesson$ = this.route.queryParamMap.pipe(
      map((paramMap: ParamMap) =>
        new LessonBuilder().buildFromParamMap(paramMap)
      )
    )
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
      takeWhile((secondsElapsed) => secondsElapsed <= this.session.duration),
      tap((secondsElapsed) => this.session.calcWordsPerMinute(secondsElapsed)),
      finalize(() => {
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
  }
}
