import { TestBed } from '@angular/core/testing'

import { RandomWordGeneratorService } from './random-word-generator.service'

/**
 * Checks if an element from "set" exists in "arr"
 *
 * @param space The set of elements.
 * @param a The array in which to check for the existence of an element.
 * @returns TRUE if an element from "set" exists in "arr"; otherwise FALSE.
 */
function containsSubset(space: string[], a: string[]): boolean {
  // the number of elements in the smaller set
  const n = space.length > a.length ? a.length : space.length

  // the number of elements in the larger set
  const m = n === space.length ? a.length : space.length

  // the smaller set
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (a[i] === space[j]) {
        return true
      }
    }
  }

  return false
}

describe('RandomWordGeneratorService', () => {
  let service: RandomWordGeneratorService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(RandomWordGeneratorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('#createRandomWord should create a random word', () => {
    const characterSpace = ['a', 'b', 'c']
    const wordLength = 5

    const word = service.createRandomWord(characterSpace, wordLength)
    const r0 = word.includes(characterSpace[0])
    const r1 = word.includes(characterSpace[1])
    const r2 = word.includes(characterSpace[2])

    expect(word.length).toBe(wordLength)
    expect(containsSubset(characterSpace, word.split(''))).toBeTrue()
  })

  it('#createRandomWords should create random words', () => {
    // TODO: Write test: createRandomWords
  })

  it('#createSessionText should create the session text', () => {
    // TODO: Write test: createSessionText
  })
})
