import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonsRoutingModule } from './lessons-routing.module';
import { LessonsComponent } from './lessons.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';


@NgModule({
  declarations: [
    LessonsComponent,
    LessonDetailComponent
  ],
  imports: [
    CommonModule,
    LessonsRoutingModule
  ]
})
export class LessonsModule { }
