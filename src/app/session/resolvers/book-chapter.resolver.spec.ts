import { TestBed } from '@angular/core/testing'

import { BookChapterResolver } from './book-chapter.resolver'

describe('BookChapterResolver', () => {
  let resolver: BookChapterResolver

  beforeEach(() => {
    TestBed.configureTestingModule({})
    resolver = TestBed.inject(BookChapterResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })
})
