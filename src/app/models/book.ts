export interface BookMetadata {
  title: string
  author: string
  chapters: string[]
}

export interface BookChapter {
  name: string
  text: string
}

export class Book {
  title?: string
  author?: string
  chapter?: string
  chapters?: BookChapter[]
  metadata?: BookMetadata

  constructor(props?: {
    title?: string
    author?: string
    chapter?: string
    chapters?: string[]
    metadata?: BookMetadata
  }) {
    if (props) {
      Object.assign(this, props)
    }
  }
}
