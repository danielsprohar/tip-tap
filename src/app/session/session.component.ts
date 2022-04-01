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
import { LessonBuilder } from '../lessons/builders/lesson-builder'
import { Lesson } from '../lessons/models/lesson'
import { Book } from '../models/book'
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

  inProgress = false
  timer$: Observable<number> | null = null
  metrica$!: Observable<Metrica>
  lesson$?: Observable<Lesson>
  book$?: Observable<Book>

  constructor(
    readonly session: SessionService,
    private document: Document,
    private keyboard: KeyboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.keyboardHandler = this.handleKeyboard.bind(this)
    this.metrica$ = this.session.metrica$

    // Check if we are doing a random word sequence
    this.lesson$ = this.route.queryParamMap.pipe(
      map((paramMap: ParamMap) =>
        new LessonBuilder().buildFromParamMap(paramMap)
      )
    )

    // Check if we are doing an "advanced" lesson
    this.book$ = this.route.data.pipe(
      map((data) => {
        return data['book'] as Book
      })
    )

    this.subsink.push(
      this.session.reset$.subscribe((value: boolean) => {
        if (value) {
          this.init()
          this.start()
        }
      })
    )

    this.init()
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe()
    }
    this.subsink.forEach((sub) => sub.unsubscribe())
  }

  /**
   * Handle the keyboard event
   * @param event The keyboard event
   * @returns
   */
  private handleKeyboard(event: KeyboardEvent) {
    if (event.isComposing) return
    event.preventDefault()

    if (!this.inProgress) {
      this.inProgress = true
    }
    this.keyboard.setKeyboardEvent(event)
  }

  /**
   * Create the session's timer
   * @returns The timer as an `Observable`
   */
  private createTimer() {
    return timer(0, 1000).pipe(
      shareReplay(),
      takeWhile((secondsElapsed) => secondsElapsed <= this.session.duration),
      tap((secondsElapsed) => this.session.calcWordsPerMinute(secondsElapsed)),
      finalize(() => {
        this.document.removeEventListener('keydown', this.keyboardHandler, true)
        this.session.showResults()
      })
    )
  }

  /**
   * Initialize the session
   */
  init() {
    this.document.addEventListener('keydown', this.keyboardHandler, true)
    this.timer$ = this.createTimer()
  }

  /**
   * Start the session
   */
  start() {
    if (this.timer$) {
      this.timerSub = this.timer$.subscribe()
    }
  }
}
