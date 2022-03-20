import { Component, OnInit } from '@angular/core'
import { Finger, Hand, Lesson, Level } from './models/lesson'

export interface LessonData {
  level: Level
  hand: Hand
  finger?: Finger
  isHomeKeys?: boolean
}

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class LessonsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  createLesson(data: LessonData) {
    return new Lesson({
      level: data.level,
      hand: data.hand,
      finger: data.finger,
      isHomeKeys: data.isHomeKeys,
    })
  }
}
