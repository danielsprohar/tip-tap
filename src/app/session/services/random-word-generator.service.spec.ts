import { TestBed } from '@angular/core/testing'
import { environment } from 'src/environments/environment'
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
  for (let i = 0; i < n; i++)
    // the larger set
    for (let j = 0; j < m; j++) if (a[i] === space[j]) return true

  return false
}

describe('RandomWordGeneratorService', () => {
  let service: RandomWordGeneratorService
  const characterSpace = ['a', 'b', 'c']
  const wordSize = environment.rwg.defaults.wordSize
  const wordCount = environment.rwg.defaults.wordCount

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomWordGeneratorService],
    })
    service = TestBed.inject(RandomWordGeneratorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('#createRandomWord() should create a random word', () => {
    const word = service.createRandomWord(characterSpace, wordSize)

    expect(word.length).toBe(wordSize)
    expect(containsSubset(characterSpace, word.split(''))).toBeTrue()
  })

  it('#createRandomWords() should create random words', () => {
    const words = service
      .createRandomWords(characterSpace, wordCount)
      .filter((word) => word !== ' ')

    expect(words.length).toBe(wordCount)

    words.forEach((word: string) => {
      expect(word.length).toBe(wordSize)
    })
  })

  it('#createSessionText() should create the session text', () => {
    const text = service.createSessionText(characterSpace, wordCount, wordSize)
    expect(text.split(' ').length).toBe(wordCount)
  })
})
