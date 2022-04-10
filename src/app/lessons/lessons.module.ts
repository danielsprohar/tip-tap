import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LessonsRoutingModule } from './lessons-routing.module'
import { LessonsComponent } from './lessons.component'
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component'
import { SidenavComponent } from './sidenav/sidenav.component'
import { MatTabsModule } from '@angular/material/tabs'
import { MatDividerModule } from '@angular/material/divider'

@NgModule({
  declarations: [LessonsComponent, LessonDetailComponent, SidenavComponent],
  imports: [
    CommonModule,
    LessonsRoutingModule,
    MatTabsModule,
    MatDividerModule,
  ],
})
export class LessonsModule {}
