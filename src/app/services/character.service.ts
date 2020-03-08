import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError, forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { UrlConfig } from '../config/urlconfig';

@Injectable()
export class CharacterAPIService {
  private headers = new Headers({
    Accept: 'application/json'
  });

  constructor(private http: HttpClient) {}

  getAll(customHeaders?): Observable<any> {
    return this.http
      .get(UrlConfig.listApiUrl, {
        headers: customHeaders || this.headers
      })
      .pipe(catchError(this.handleError));
  }

  getFilmsList(path: string, customHeaders?): Observable<any[]> {
    return this.http
      .get<any>(path, {
        headers: customHeaders || this.headers
      })
      .pipe(
        mergeMap(data =>
          data.films
            ? forkJoin(data.films.map(url => this.getFilmInfo(url)))
            : []
        ),
        catchError(this.handleError)
      )
      .pipe(map((list: any[]) => [...list]));
    /*.mergeMap( => forkJoin(...q.map(myPromise)))
       mergeMap(data => data.films ? [...data.films.map(url => this.getFilmInfo(url))] : []),

      .flatMap((book: any) => {
        return Observable.forkJoin(
           Observable.of(book),
           this.http.get('/api/authors/' + book.author_id).map((res: any) => res.json()),
           this.http.get('/api/editors/' + book.editor_id).map((res: any) => res.json())
        )
          .map((data: any[]) => {
            let book = data[0];
            let author = data[1];
            let editor = data[2];
            book.author = author;
            book.editor = editor;
            return book;
          });
      });pipe(
        catchError(this.handleError)
      );

      forkJoin[].subscribe({
        next: value => console.log(value),
        complete: () => console.log('This is how it ends!'),
       });*/
  }

  getFilmInfo(path: string, customHeaders?): Observable<any> {
    return this.http
      .get(path, {
        headers: customHeaders || this.headers
      })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
