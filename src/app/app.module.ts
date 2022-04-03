import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TopnavComponent } from './components/topnav/topnav.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { WelcomeComponent } from './components/welcome/welcome.component'
import { SnackbarComponent } from './components/snackbar/snackbar.component'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './shared/shared.module'
import { AuthModule } from '@auth0/auth0-angular'
import auth from 'auth_config.json'

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
      clientId: auth.clientId,
      domain: auth.domain,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
