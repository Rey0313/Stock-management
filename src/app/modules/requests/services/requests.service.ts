import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RequestsService {

    private apiUrl = 'http://localhost:3000/api/requests';
    private userId = '664229de20a6e06f920e9761'; 

    constructor(private http: HttpClient) { }

    getRequestsList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getMyRequestsList(): Observable<any[]> {
        const userId = '664229de20a6e06f920e9761'; // Assure-toi de bien utiliser l'ID utilisateur correct ici
        return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
      }

    askAssigned(materialId: string): Observable<any[]>  {
        const userId = '664229de20a6e06f920e9761';
        return this.http.post<any>(this.apiUrl, {
            user: userId,
            material: materialId,
            status: 'en_attente',
            type: "attribution"
        });
    }
}
