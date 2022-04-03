import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TopnavComponent } from './components/topnav/topnav.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { WelcomeComponent } from './components/welcome/welcome.component'
import { SnackbarComponent } from './components/snackbar/snackbar.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { SharedModule } from './shared/shared.module'
import { AuthModule } from '@auth0/auth0-angular'
import { AuthHttpInterceptor } from '@auth0/auth0-angular'
import { environment } from 'src/environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    NotFoundComponent,
    WelcomeComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        ...environment.httpInterceptor,
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
