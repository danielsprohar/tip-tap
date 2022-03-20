export type Level = 'beginner' | 'intermediate' | 'advanced'
export type Hand = 'left' | 'right' | 'both'
export type Finger = 'pointy' | 'middle' | 'ring' | 'pinky' | 'all'

export class Lesson {
  level!: Level
  hand!: Hand
  finger?: Finger = 'all'
  isHomeKeys?: boolean = false
  book?: string
  chapter?: string

  constructor(props?: {
    level: Level
    hand: Hand
    finger?: Finger
    isHomeKeys?: boolean
    book?: string
    chapter?: string
  }) {
    if (props) {
      Object.assign(this, props)
    }
  }

  get bookName() {
    return this.book ? this.book.replace(/-/g, ' ') : ''
  }
}
