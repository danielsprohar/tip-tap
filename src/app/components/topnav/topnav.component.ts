import { DOCUMENT } from '@angular/common'
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @ViewChild('navbar') navbarRef!: ElementRef

  constructor(
    private renderer: Renderer2,
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document
  ) {}

  ngOnInit(): void {}

  toggleNav(e: MouseEvent) {
    e.preventDefault()
    const navEl = this.navbarRef.nativeElement as HTMLElement
    if (navEl.classList.contains('responsive')) {
      this.renderer.removeClass(navEl, 'responsive')
    } else {
      this.renderer.addClass(navEl, 'responsive')
    }
  }

  closeNav(e: MouseEvent) {
    e.preventDefault()
    const navEl = this.navbarRef.nativeElement as HTMLElement
    this.renderer.removeClass(navEl, 'responsive')
  }

  login() {
    this.auth.loginWithRedirect()
  }

  logout() {
    this.auth.logout({ returnTo: document.location.origin })
    this.closeNav(new MouseEvent('click'))
  }
}
