import { HttpClient } from '@angular/common/http'
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { map, Subscription } from 'rxjs'
import { CharacterSpaceBuilder } from 'src/app/lessons/builders/CharacterSpaceBuilder'
import { Lesson } from 'src/app/lessons/models/lesson'
import { KeyboardService } from '../services/keyboard.service'
import { RandomWordGeneratorService } from '../services/random-word-generator.service'
import { SessionService } from '../services/session.service'

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements OnInit, OnDestroy {
  private subsink = new Array<Subscription>()
  private readonly wordCount = 150
  queue = ':'
  stack = ''

  @Input() lesson?: Lesson
  @ViewChild('terminal') terminalEl!: ElementRef

  constructor(
    private keyboard: KeyboardService,
    private session: SessionService,
    private rwg: RandomWordGeneratorService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.subsink.push(this.keyboard.event$.subscribe(this.parseKey.bind(this)))
    if (this.lesson) {
      this.init()
    }
  }

  ngOnDestroy(): void {
    this.subsink.forEach((sub) => sub.unsubscribe())
  }

  private fetchBook(lesson: Lesson) {
    const url = `assets/gutenberg/${lesson.book}/chapter-${lesson.chapter}.txt`
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(map((text: string) => text.replace(/[\r\n]+/gm, ' ')))
  }

  /**
   * Initialize the terminal
   * @returns
   */
  init() {
    if (!this.lesson) return

    if (!this.lesson.book) {
      const charSpace = new CharacterSpaceBuilder(this.lesson!).build()
      this.queue = this.rwg.createSessionText(charSpace, this.wordCount)
      this.keyboard.setHighlightKey(this.queue.charAt(0))
    } else {
      this.subsink.push(
        this.fetchBook(this.lesson).subscribe((text) => {
          this.queue = text
          this.keyboard.setHighlightKey(this.queue.charAt(0))
        })
      )
    }
  }

  /**
   * Flash the terminal when an incorrect key is pressed
   */
  flashTerminal() {
    const el$ = this.terminalEl.nativeElement as HTMLElement
    el$.classList.add('flash')
    setTimeout(() => {
      el$.classList.remove('flash')
    }, 100)
  }

  parseKey(e: KeyboardEvent) {
    if (this.queue.length === 0) return

    const { key } = e
    if (key === 'Shift') return
    if (key === 'F12') return

    if (key === 'Backspace') {
      this.handleBackspace()
    } else {
      this.handleKey(key)
    }

    if (this.queue.length) {
      this.keyboard.setHighlightKey(this.queue.charAt(0))
    }

    this.session.incrementCharacterCount()
  }

  handleKey(key: string) {
    if (key !== this.queue[0]) {
      this.flashTerminal()
      this.session.incrementErrorCount()
    } else {
      this.stack += this.queue[0]
      this.queue = this.queue.substring(1)
      if (this.queue.length && this.queue.charAt(0) === ' ') {
        this.session.incrementWordCount()
      }
    }
  }

  handleBackspace() {
    if (this.stack.length === 0) return

    if (this.queue.charAt(0) === ' ') {
      this.session.incrementWordCount(-1)
    }

    const popped = this.stack.charAt(this.stack.length - 1)
    this.queue = popped + this.queue
    this.stack = this.stack.substring(0, this.stack.length - 1)
  }

  handleSpacebar() {}

  /**
   * Checks if the given value is a whitespace character.
   * @param value The key value
   * @returns TRUE if the given value is a whitespace character;
   * otherwise, FALSE.
   */
  isHTMLWhitespace(value: string): boolean {
    return value.charCodeAt(0) === 32 || value.charCodeAt(0) === 160
  }
}
