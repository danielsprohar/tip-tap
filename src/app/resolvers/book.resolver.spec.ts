import { TestBed } from '@angular/core/testing'
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { of } from 'rxjs'
import { ActivatedRouteSnapshotStub } from 'src/testing/activated-route-snapshot-stub'
import { Book } from '../models/book'
import { BookChapter } from '../models/book-chapter'
import { BookService } from '../services/book.service'
import { BookResolver } from './book.resolver'

describe('BookResolver', () => {
  let resolver: BookResolver
  let bookServiceSpy: jasmine.SpyObj<BookService>
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(() => {
    bookServiceSpy = jasmine.createSpyObj('BookService', ['get'])
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])

    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: bookServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    })
    resolver = TestBed.inject(BookResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })

  it('should navigate to /lessons when "title" and "chapter" are not both defined', () => {
    const navigateByUrlSpy = routerSpy.navigateByUrl as jasmine.Spy
    resolver.resolve(
      new ActivatedRouteSnapshotStub() as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    )

    expect(navigateByUrlSpy.calls.any()).toBeTrue()
    const url = navigateByUrlSpy.calls.first().args[0]
    expect(url).toEqual('/lessons')
  })

  it('should return a Book', () => {
    const bookMock = new Book({
      author: 'Me',
      chapter: new BookChapter('Chapter 1', 'Text'),
      title: 'Welcome to My Hell',
    })

    const getBookSpy = bookServiceSpy.get.and.returnValue(of(bookMock))
    const routeStub = new ActivatedRouteSnapshotStub()
    routeStub.params = {
      title: bookMock.title,
      chapter: bookMock.title,
    }

    const book$ = resolver.resolve(
      routeStub as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    )

    expect(getBookSpy.calls.any()).toBeTrue()

    book$.subscribe((book: Book) => {
      expect(book).toBeDefined()
    })
  })
})
