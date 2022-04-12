import { HttpClient } from '@angular/common/http'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { environment } from 'src/environments/environment'
import { Book } from '../models/book'
import { BookChapter } from '../models/book-chapter'
import { BookService } from './book.service'

describe('BookService', () => {
  let service: BookService
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController
  let mockBook: Book

  beforeEach(() => {
    mockBook = new Book({
      author: 'me',
      chapter: new BookChapter('title', 'text'),
      title: 'Unit Testing with Angular',
    })

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })

    service = TestBed.inject(BookService)
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#get()', () => {
    it('should fetch a Book from the backend', () => {
      service.get().subscribe((book: Book) => {
        expect(book).toEqual(mockBook)
      })

      // Expect that a single request has been made which matches the given URL, and return its mock.
      const req = httpTestingController.expectOne(environment.services.book.url)

      expect(req.request.method).toEqual('GET')

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      req.flush(mockBook)

      // Finally, assert that there are no outstanding requests.
      httpTestingController.verify()
    })
  })
})
