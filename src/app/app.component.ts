import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout'
import { OverlayContainer } from '@angular/cdk/overlay'
import { DOCUMENT } from '@angular/common'
import {
  Component,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'
import { Observable, map, shareReplay, Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private sub!: Subscription

  isHandset$: Observable<boolean> = this.observer
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    )

  constructor(
    private observer: BreakpointObserver,
    private overlay: OverlayContainer,
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document
  ) {}

  ngOnInit(): void {
    this.sub = this.observer
      .observe('(prefers-color-scheme: dark)')
      .pipe(
        map((result) => result.matches),
        shareReplay()
      )
      .subscribe((isDarkTheme: boolean) => {
        this.className = isDarkTheme ? 'dark-theme' : ''
        if (isDarkTheme) {
          this.overlay.getContainerElement().classList.add('dark-theme')
        } else {
          this.overlay.getContainerElement().classList.remove('dark-theme')
        }
      })
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  @HostBinding('class') className = ''

  logout() {
    this.auth.logout({ returnTo: document.location.origin })
  }
}
