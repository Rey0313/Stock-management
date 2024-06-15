import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../authentication/services/auth.service';
import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})


export class StockService {

    private apiUrl = 'http://localhost:3000/api/materials';

    constructor(private http: HttpClient, private authService: AuthService, private titleService: Title) {
      this.titleService.setTitle("Stock - Material Manageur");
    }

    private getHeaders(): HttpHeaders {
      return new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      });
    }

    getMaterialsList(): Observable<any[]> {
      const headers = this.getHeaders();
      return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
        catchError((error) => {
          throw "Erreur lors de la récupération des matériaux: " + error;
        })
      );
    }

    addMaterial(material: any): Observable<any> {
      const headers = this.getHeaders();
      return this.http.post<any>(this.apiUrl, material, { headers }).pipe(
        catchError((error) => {
          throw "Erreur lors de l'ajout du matériel: " + error;
        })
      );
    }

    deleteMaterial(materialId: any): Observable<void> {
      const headers = this.getHeaders();
      return this.http.delete<void>(`${this.apiUrl}/${materialId}`, { headers }).pipe(
        catchError((error) => {
          throw "Erreur lors de la suppression du matériel: " + error;
        })
      );
    }
}
