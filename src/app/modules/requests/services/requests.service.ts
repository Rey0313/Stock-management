import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private apiUrl = 'http://localhost:3000/api/requests';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getRequestsList(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        throw "Erreur lors de la récupération des demandes: " + error;
      })
    );
  }

  getMyRequestsList(): Observable<any[]> {
    const headers = this.getHeaders();
    const userId = this.authService.getUserId();
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`, { headers }).pipe(
      catchError((error) => {
        throw "Erreur lors de la récupération de mes demandes: " + error;
      })
    );
  }

  askAssigned(materialId: string): Observable<any[]> {
    const headers = this.getHeaders();
    const userId = this.authService.getUserId();
    return this.http.post<any>(this.apiUrl, {
      user: userId,
      material: materialId,
      status: 'en_attente',
      type: "attribution"
    }, { headers }).pipe(
      catchError((error) => {
        throw "Erreur lors de la demande d'attribution: " + error;
      })
    );
  }
}
