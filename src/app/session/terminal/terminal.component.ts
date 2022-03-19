import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Subscription } from 'rxjs'
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
  queue = 'Hello world'
  stack = ''

  @Input() lesson?: Lesson
  @ViewChild('terminal') terminalEl!: ElementRef

  constructor(
    private keyboard: KeyboardService,
    private session: SessionService,
    private rwg: RandomWordGeneratorService
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

  init() {
    const charSpace = new CharacterSpaceBuilder(this.lesson!).build()
    this.queue = this.rwg.createSessionText(charSpace, this.wordCount)
    // TODO: Highlight the next key
  }

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

    this.session.incrementCharacterCount()
  }

  handleKey(key: string) {
    if (key !== this.queue[0]) {
      this.flashTerminal()
      this.session.incrementErrorCount()
    } else {
      this.stack += this.queue[0]
      this.queue = this.queue.substring(1)
    }
  }

  handleBackspace() {
    if (this.stack.length === 0) return

    this.queue = this.stack.charAt(this.stack.length - 1) + this.queue
    this.stack = this.stack.substring(0, this.stack.length - 1)
  }

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
