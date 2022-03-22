import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { Metrica } from '../models/metrica'
import { SessionService } from '../services/session.service'

@Component({
  selector: 'app-results-dialog',
  templateUrl: './results-dialog.component.html',
  styleUrls: ['./results-dialog.component.scss'],
})
export class ResultsDialogComponent implements OnInit, OnDestroy {
  private sub?: Subscription

  private readonly isOpenClass = 'modal-is-open'
  private readonly openingClass = 'modal-is-opening'
  private readonly closingClass = 'modal-is-closing'
  private readonly animationDuration = 400 // ms

  @ViewChild('modal') modalRef!: ElementRef
  metrica?: Metrica

  constructor(private readonly session: SessionService) {}

  ngOnInit(): void {
    this.sub = this.session.results$.subscribe((metrica: Metrica | null) => {
      if (metrica) {
        this.open(metrica)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  /**
   * Open this dialog (modal)
   * @param metrica The session metrics
   */
  open(metrica: Metrica) {
    this.metrica = metrica
    const modal$ = this.modalRef.nativeElement as HTMLElement
    const document$ = document.documentElement
    document$.classList.add(this.isOpenClass, this.openingClass)

    setTimeout(() => {
      document$.classList.remove(this.openingClass)
    }, this.animationDuration)

    modal$.setAttribute('open', 'true')
  }

  /**
   * Close this dialog (modal)
   */
  close() {
    const document$ = document.documentElement
    document$.classList.add(this.closingClass)

    setTimeout(() => {
      document$.classList.remove(this.isOpenClass, this.closingClass)
    }, this.animationDuration)

    const modal$ = this.modalRef.nativeElement as HTMLElement
    modal$.removeAttribute('open')
  }

  resetSession() {
    this.close()
    this.session.reset()
  }
}
