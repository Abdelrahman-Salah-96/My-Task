import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { myorder } from '../Interfaces/myorder';

@Injectable({
  providedIn: 'root',
})
export class myorderService {
  _url: string = '/assets/fakedata/myorders.json';

  constructor(private _http: HttpClient) {}
  getALLMyorder(): Observable<myorder[]> {
    return this._http.get<myorder[]>(this._url).pipe(
      catchError((err) => {
        return throwError(
          err.message ||
            'THERE IS A SERVER ERROR PLEASE CONNECT WITH WEBSITE ADMINS'
        );
      })
    );
  }
}
