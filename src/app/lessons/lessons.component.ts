import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
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
  @ViewChild('beginnerTabBtn', { static: true })
  beginnerTabBtn!: ElementRef

  @ViewChild('intermediateTabBtn', { static: true })
  intermediateTabBtn!: ElementRef

  constructor() {}

  ngOnInit(): void {
    this.openTab('beginner')
  }

  createLesson(data: LessonData) {
    return new Lesson({
      level: data.level,
      hand: data.hand,
      finger: data.finger,
      isHomeKeys: data.isHomeKeys,
    })
  }

  highlightTabBtn(tabName: string) {
    const beginnerTabEl = this.beginnerTabBtn.nativeElement as HTMLElement
    const intermediateTabEl = this.intermediateTabBtn
      .nativeElement as HTMLElement

    if (tabName === 'beginner') {
      beginnerTabEl.style.color = 'var(--primary)'
      intermediateTabEl.style.color = ''
    } else if (tabName === 'intermediate') {
      intermediateTabEl.style.color = 'var(--primary)'
      beginnerTabEl.style.color = ''
    }
  }

  openTab(tabName: string) {
    this.highlightTabBtn(tabName)

    const tabContentName = tabName + 'Content'
    const tabs = document.querySelectorAll('.tab-content')

    tabs.forEach((tab) => {
      if (tab.id === tabContentName) {
        tab.classList.add('visible')
      } else {
        tab.classList.remove('visible')
      }
    })
  }
}
