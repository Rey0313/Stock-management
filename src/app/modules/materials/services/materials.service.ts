import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  private apiUrl = 'http://localhost:3000/api/materials';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getAssignedMaterials(): Observable<any[]> {
    const headers = this.getHeaders();
    const userId = this.authService.getUserId();
    return this.http.get<any[]>(`${this.apiUrl}/assigned/${userId}`, { headers }).pipe(
      catchError((error) => {
        throw "Erreur lors de la récupération des matériels attribués : " + error;
      })
    );
  }

  askReturn(materialId: string): Observable<any[]> {
    const headers = this.getHeaders();
    const userId = this.authService.getUserId();
    return this.http.post<any>(`${this.apiUrl}/return`, {
      user: userId,
      material: materialId,
      status: 'en_attente',
      type: "retour"
    }, { headers }).pipe(
      catchError((error) => {
        throw "Erreur lors de la demande de retour: " + error;
      })
    );
  }

}
