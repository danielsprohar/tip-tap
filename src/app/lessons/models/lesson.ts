import { Book } from 'src/app/models/book'

export type Level = 'beginner' | 'intermediate' | 'advanced'
export type Hand = 'left' | 'right' | 'both'
export type Finger = 'pointy' | 'middle' | 'ring' | 'pinky' | 'all'

export class Lesson {
  level!: Level
  hand!: Hand
  finger?: Finger = 'all'
  isHomeKeys?: boolean = false
  book?: Book

  constructor(props?: {
    level: Level
    hand: Hand
    finger?: Finger
    isHomeKeys?: boolean
    book?: Book
  }) {
    if (props) {
      Object.assign(this, props)
    }
  }

  get isBothHands() {
    return this.hand === 'both'
  }
}
