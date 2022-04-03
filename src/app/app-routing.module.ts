import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { WelcomeComponent } from './components/welcome/welcome.component'
import authConfig from '../../auth_config.json'

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'login',
    redirectTo: `https://${authConfig.domain}/authorize/`,
    pathMatch: 'full',
  },
  {
    path: 'lessons',
    loadChildren: () =>
      import('./lessons/lessons.module').then((m) => m.LessonsModule),
  },
  {
    path: 'session',
    loadChildren: () =>
      import('./session/session.module').then((m) => m.SessionModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
