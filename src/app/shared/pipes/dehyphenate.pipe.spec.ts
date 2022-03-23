import { DehyphenatePipe } from './dehyphenate.pipe'

describe('DehyphenationPipe', () => {
  const pipe = new DehyphenatePipe()
  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should dehyphenate a given string', () => {
    const value = 'hello-darkness, my-old-friend'
    const expected = 'hello darkness, my old friend'
    const actual = pipe.transform(value)

    expect(actual).toBe(expected)
  })
})
