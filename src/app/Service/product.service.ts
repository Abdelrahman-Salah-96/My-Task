import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { product } from '../Interfaces/Product';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _url: string = '/assets/fakedata/productdata.json';

  constructor(private _http: HttpClient) {}
  getALLProduct(): Observable<product[]> {
    return this._http.get<product[]>(this._url).pipe(
      catchError((err) => {
        return throwError(
          err.message ||
            'THERE IS A SERVER ERROR PLEASE CONNECT WITH WEBSITE ADMINS'
        );
      })
    );
  }
}
