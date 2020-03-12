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
