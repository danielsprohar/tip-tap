import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @ViewChild('navbar') navbarRef!: ElementRef

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  toggleNav(e: MouseEvent) {
    e.preventDefault()
    const nav$ = this.navbarRef.nativeElement as HTMLElement
    if (nav$.classList.contains('responsive')) {
      this.renderer.removeClass(nav$, 'responsive')
    } else {
      this.renderer.addClass(nav$, 'responsive')
    }
  }
}
