export class Metrica {
  errorCount = 0
  characterCount = 0
  wpm = 0

  constructor(props?: {
    errorCount: number
    characterCount: number
    wpm: number
  }) {
    if (props) {
      Object.assign(this, props)
    }
  }

  /**
   * Calculates the accuracy of the current typing session.
   * @returns A value in the range [0,1]
   */
  get accuracy() {
    return this.errorCount === 0
      ? 1
      : this.characterCount / (this.characterCount + this.errorCount)
  }
}
