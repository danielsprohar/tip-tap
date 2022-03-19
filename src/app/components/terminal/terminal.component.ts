import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { KeyboardService } from 'src/app/services/keyboard.service'
import { SessionService } from 'src/app/services/session.service'

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements OnInit, OnDestroy {
  private subsink = new Array<Subscription>()
  queue = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, nostrum nemo. Nam quam sed nulla quidem. Delectus nam provident quod omnis minima minus. Quasi ipsum cumque vel ducimus nihil. Qui.`
  stack = ''

  @ViewChild('terminal') terminalEl!: ElementRef

  constructor(
    private keyboard: KeyboardService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.subsink.push(this.keyboard.event$.subscribe(this.parseKey.bind(this)))
  }

  ngOnDestroy(): void {
    this.subsink.forEach((sub) => sub.unsubscribe())
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
