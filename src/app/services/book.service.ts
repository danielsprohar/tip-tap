import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Book } from '../models/book'
import { AbstractBaseService } from './abstract-base.service'

@Injectable({
  providedIn: 'root',
})
export class BookService extends AbstractBaseService {
  private readonly url = environment.services.book.url

  constructor(private http: HttpClient) {
    super()
  }

  get(params?: HttpParams) {
    return this.http
      .get<Book>(this.url, {
        params,
      })
      .pipe(catchError(this.handleError))
  }
}
