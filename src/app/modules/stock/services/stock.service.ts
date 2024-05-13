import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class StockService {

    private apiUrl = 'http://localhost:3000/api/materials';

    constructor(private http: HttpClient) { }

    getMaterialsList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    addMaterial(material: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, material).pipe(
            catchError((error) => {
                throw "Erreur lors de l'ajout du matériel: " + error;
            })
        );
    }

    deleteMaterial(materialId: any): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${materialId}`).pipe(
            catchError((error) => {
                return throwError(() => new Error('Erreur lors de la suppression du materiel: ' + error));
            })
        );
    }
}
