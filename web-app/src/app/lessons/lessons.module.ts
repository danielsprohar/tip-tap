import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonsRoutingModule } from './lessons-routing.module';
import { LessonsComponent } from './lessons.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [
    LessonsComponent,
    LessonDetailComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    LessonsRoutingModule
  ]
})
export class LessonsModule { }
