import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RequestsService {

    private apiUrl = 'http://localhost:3000/api/requests';
    private userId = '663b8bbb711b14a1cfc4084d'; 

    constructor(private http: HttpClient) { }

    getRequestsList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getMyRequestsList(): Observable<any[]> {
        return this.http.get<any>(`${this.apiUrl}/${this.userId}`);
    }

    askAssigned(materialId: string): Observable<any[]>  {
        const userId = '66300bcd3db89c85b82fb934';
        return this.http.post<any>(this.apiUrl, {
            user: userId,
            material: materialId,
            status: 'en_attente',
            type: "attribution"
        });
    }
}
