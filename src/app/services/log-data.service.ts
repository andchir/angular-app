import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {DataList} from '../models/data-list.interface';
import {LogItem} from '../models/log-item.interface';

@Injectable({
  providedIn: 'root'
})
export class LogDataService {

    private baseUrl = '';
    public headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    });

    constructor(
        private http: HttpClient
    ) { }

    getItemsList(): Observable<DataList<LogItem>> {
        const url = `${this.baseUrl}assets/data.json`;
        return this.http.get<DataList<LogItem>>(url, {headers: this.headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    handleError<T>(error: HttpErrorResponse) {
        if (error.status && [401, 403].indexOf(error.status) > -1) {
            window.location.href = '/login';
        }
        if (error.error instanceof ErrorEvent) {
            return throwError(error.error.message);
        }
        return throwError(error.error);
    }
}
