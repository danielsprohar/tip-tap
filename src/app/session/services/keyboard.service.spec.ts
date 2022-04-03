import { TestBed } from '@angular/core/testing'

import { KeyboardService } from './keyboard.service'

describe('KeyboardService', () => {
  let service: KeyboardService
  const mockEvent = new KeyboardEvent('keydown', {
    key: 'a',
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyboardService],
    })
    service = TestBed.inject(KeyboardService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('#setKeyboardEvent() shoud emit the given KeyboardEvent', (done: DoneFn) => {
    service.event$.subscribe((e: KeyboardEvent) => {
      expect(e).toEqual(mockEvent)
      done()
    })

    service.setKeyboardEvent(mockEvent)
  })

  it('#setHighlightKey() should emit the given key', (done: DoneFn) => {
    service.setHighlightKey(mockEvent.key)

    service.highlightKey$.subscribe((key: string) => {
      expect(key).toEqual(mockEvent.key)
      done()
    })
  })
})
