import { IHotel } from '../data/hotel';

import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { IHotelSearchCriteria } from '../data/hotelCriteria';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'


@Injectable()
export class HotelService {
    
    constructor(private httpClient: HttpClient){ } 

    getHotels(): Observable<Array<IHotel>> {
        const url = environment.hotelServiceBaseUrl + 'hotels'; 
        return this.httpClient.get<Array<IHotel>>(url)
        .pipe(tap((data: any) => console.log(JSON.stringify(data))), catchError(this.handleError));
    }

    getHotelsByCriteria(criteria: IHotelSearchCriteria): Observable<Array<IHotel>> {
      const url = environment.hotelServiceBaseUrl + 'search';
      return this.httpClient.post<Array<IHotel>>(url, criteria)
      .pipe(tap((data: any) => console.log(JSON.stringify(data))), catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse | any) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}