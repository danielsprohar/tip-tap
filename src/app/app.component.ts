import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout'
import { DOCUMENT } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'
import { Observable, map, shareReplay } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    )

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document
  ) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logout({ returnTo: document.location.origin })
  }
}
