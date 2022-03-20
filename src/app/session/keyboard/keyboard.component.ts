import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
  ViewChild,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { KeyboardService } from '../services/keyboard.service'
import Keyboard from 'src/assets/keyboard-keys.json'

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit, OnDestroy, AfterViewInit {
  private keyboardSub?: Subscription
  private keyboardHintElements: HTMLElement[] = []
  private readonly keyboardHintCSS = 'keyboard-hint'

  @ViewChild('keyboard', { static: true }) keyboardElementRef!: ElementRef

  constructor(private renderer: Renderer2, private keyboard: KeyboardService) {}

  ngOnInit(): void {
    this.keyboardSub = this.keyboard.highlightKey$.subscribe(
      (key: string | null) => {
        this.clearHighlightedKeyElements()
        if (key) {
          this.handleAddKeyboardHint(key)
        }
      }
    )
  }

  ngAfterViewInit(): void {
    this.resize()
  }

  ngOnDestroy(): void {
    if (this.keyboardSub) {
      this.keyboardSub.unsubscribe()
    }
  }

  /**
   * Resize the keyboard keys when the window size changes.
   */
  @HostListener('window:resize')
  resize() {
    const keyboardEL: HTMLElement | null = document.getElementById('keyboard')

    if (keyboardEL && keyboardEL.parentNode) {
      const parent: Element | null = document.querySelector('.content')
      if (parent) {
        const size = Number(parent.clientWidth / 90).toPrecision(2)

        this.renderer.setStyle(
          keyboardEL,
          'fontSize',
          `${size}px`,
          RendererStyleFlags2.Important
        )
      }
    }
  }

  isUpperCaseCharacter(character: string): boolean {
    const charCode = character.charCodeAt(0)
    return 65 <= charCode && charCode <= 90
  }

  isLowerCaseCharacter(character: string): boolean {
    const charCode = character.charCodeAt(0)
    return 97 <= charCode && charCode <= 122
  }

  isAlpha(pressedKey: string): boolean {
    return (
      this.isLowerCaseCharacter(pressedKey) ||
      this.isUpperCaseCharacter(pressedKey)
    )
  }

  isDigit(pressedKey: string): boolean {
    return Keyboard.digits.some((digit) => digit === pressedKey)
  }

  isRightHandShiftKey(key: string): boolean {
    return Keyboard.rightHandShiftKeys.some((k) => k === key)
  }

  isLeftHandShiftKey(key: string): boolean {
    return Keyboard.leftHandShiftKeys.some((k) => k === key)
  }

  /**
   * Remove css styling from the currently highlighted elements (keys).
   */
  clearHighlightedKeyElements(): void {
    this.keyboardHintElements.forEach((el) =>
      el.classList.remove(this.keyboardHintCSS)
    )

    while (this.keyboardHintElements.pop()) {}
  }

  /**
   * Add css styling to the given element;
   * highlight the given key on the virtual keyboard.
   * @param el The key element
   */
  addHighlightStyle(el: HTMLElement): void {
    if (el) {
      el.classList.add(this.keyboardHintCSS)
      this.keyboardHintElements.push(el)
    }
  }

  /**
   * Highlight the given key on the virtual keyboard.
   *
   * @param key The key from the keyboard.
   */
  handleAddKeyboardHint(key: string): void {
    this.clearHighlightedKeyElements()

    if (key === ' ') {
      this.addHighlightStyle(document.getElementById('Space')!)
      return
    }

    if (this.isDigit(key)) {
      this.addHighlightStyle(document.getElementById(key)!)
      return
    }

    if (this.isAlpha(key)) {
      this.addHighlightStyle(document.getElementById(key.toLowerCase())!)

      if (this.isRightHandShiftKey(key)) {
        this.addHighlightStyle(document.getElementById('ShiftRight')!)
      } else {
        this.addHighlightStyle(document.getElementById('ShiftLeft')!)
      }

      return
    }

    const keyboardEl: HTMLElement = this.keyboardElementRef.nativeElement
    const keyEl =
      document.getElementById(key) ||
      keyboardEl.querySelector(`[data-char='${key}']`)

    if (keyEl) {
      this.addHighlightStyle(keyEl as HTMLElement)
      if (this.isRightHandShiftKey(key)) {
        this.addHighlightStyle(document.getElementById('ShiftRight')!)
      } else if (this.isLeftHandShiftKey(key)) {
        this.addHighlightStyle(document.getElementById('ShiftLeft')!)
      }
    }
  }
}
