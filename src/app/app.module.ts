import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TopnavComponent } from './components/topnav/topnav.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { WelcomeComponent } from './components/welcome/welcome.component'
import { SnackbarComponent } from './components/snackbar/snackbar.component'

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    NotFoundComponent,
    WelcomeComponent,
    SnackbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
