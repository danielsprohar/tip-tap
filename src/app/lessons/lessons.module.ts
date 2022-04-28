import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LessonsRoutingModule } from './lessons-routing.module'
import { LessonsComponent } from './lessons.component'
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component'
import { MatTabsModule } from '@angular/material/tabs'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'

@NgModule({
  declarations: [LessonsComponent, LessonDetailComponent],
  imports: [
    CommonModule,
    LessonsRoutingModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
  ],
})
export class LessonsModule {}
