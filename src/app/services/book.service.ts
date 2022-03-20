import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { forkJoin, catchError, Observable } from 'rxjs'
import { Book, BookMetadata } from '../models/book'
import { AbstractBaseService } from './abstract-base.service'

export interface BookChapterResponse {
  text: string
  metadata: BookMetadata
}

@Injectable({
  providedIn: 'root',
})
export class BookService extends AbstractBaseService {
  private readonly baseUri = 'assets/gutenberg/'

  constructor(private http: HttpClient) {
    super()
  }

  getChapter(book: Book): Observable<BookChapterResponse> {
    const metadataUri = this.baseUri + `${book.title}/metadata.json`
    const uri = this.baseUri + `${book.title}/chapter-${book.chapter}.txt`

    const metadata$ = this.http.get<BookMetadata>(metadataUri)
    const book$ = this.http.get(uri, { responseType: 'text' })

    return forkJoin({
      text: book$,
      metadata: metadata$,
    }).pipe(catchError(this.handleError))
  }
}
