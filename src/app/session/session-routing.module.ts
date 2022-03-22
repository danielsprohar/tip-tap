import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BookResolver } from '../resolvers/book.resolver'
import { SessionComponent } from './session.component'

const routes: Routes = [
  {
    path: '',
    component: SessionComponent,
  },
  {
    path: 'book/:title/chapter/:chapterNumber',
    component: SessionComponent,
    resolve: {
      book: BookResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionRoutingModule {}
