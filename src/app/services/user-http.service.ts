import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/user";
@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getUser(phoneNumber: String): Observable<any> {
    const url = `${apiUrl}/${phoneNumber}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  saveUser(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(data, userId): Observable<any> {
    return this.http.put(apiUrl+"/update-profile/"+userId, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  storeRequestPickup(data): Observable<any> {
    return this.http.post(apiUrl+'/request-pickup', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  cancelRequestPickup(data): Observable<any> {
    return this.http.post(apiUrl+'/request-pickup/cancel', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  completeRequestPickup(data): Observable<any> {
    return this.http.post(apiUrl+'/request-pickup/complete', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPendingPickups(userId: any): Observable<any> {
    return this.http.get(apiUrl+'/pending-requests/'+userId, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getRequestPins(status: string): Observable<any> {
    return this.http.get(apiUrl+'/requests/'+status, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAppConfig(): Observable<any> {
    return this.http.get(apiUrl+'/get-app-config/obj', httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTimeSlots(hours: number): Observable<any> {
    return this.http.get(apiUrl+'/get-time-slots/'+hours, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };
}
