import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BookChapterResolver } from './resolvers/book-chapter.resolver'
import { SessionComponent } from './session.component'

const routes: Routes = [
  {
    path: '',
    component: SessionComponent,
    resolve: {
      bookChapter: BookChapterResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionRoutingModule {}
