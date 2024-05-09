import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {

    private apiUrl = 'http://localhost:3000/api/requests';

    constructor(private http: HttpClient) { }

    getRequestsList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
