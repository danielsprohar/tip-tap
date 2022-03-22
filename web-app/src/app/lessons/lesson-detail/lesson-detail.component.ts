import { Component, Input, OnInit } from '@angular/core'
import { CharacterSpaceBuilder } from '../builders/CharacterSpaceBuilder'
import { Lesson } from '../models/lesson'

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss'],
})
export class LessonDetailComponent implements OnInit {
  @Input() lesson?: Lesson
  keys?: string[]
  link?: string

  constructor() {}

  ngOnInit(): void {
    if (this.lesson) {
      this.keys = new CharacterSpaceBuilder(this.lesson).build()
      this.link =
        this.lesson.hand + (this.lesson.hand === 'both' ? ' Hands' : ' Hand')

      if (this.lesson.finger && this.lesson.finger !== 'all') {
        this.link += ` - ${this.lesson.finger} Finger`
      }
    }
  }
}
