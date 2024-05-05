import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})


export class StockService {

    private apiUrl = 'http://localhost:3000/api/materials';

    constructor(private http: HttpClient) { }

    getMaterialsList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
