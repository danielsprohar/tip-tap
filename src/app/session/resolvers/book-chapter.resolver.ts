import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { EMPTY, Observable, of } from 'rxjs'
import { LessonBuilder } from 'src/app/lessons/builders/LessonBuilder'
import { BookService, BookChapterResponse } from 'src/app/services/book.service'

@Injectable({
  providedIn: 'root',
})
export class BookChapterResolver
  implements Resolve<BookChapterResponse | null>
{
  constructor(private bs: BookService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<BookChapterResponse | null> {
    const lesson = new LessonBuilder().buildFromParamMap(route.paramMap)
    if (!lesson.book) {
      return of(null)
    }

    return this.bs.getChapter(lesson.book)
  }
}
