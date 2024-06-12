import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'  
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getUsers(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        throw 'Erreur lors de la récupération des utilisateurs: ' + error;
      })
    );
  }

  createUser(user: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, user, { headers }).pipe(
      catchError((error) => {
        throw 'Erreur lors de la création de l’utilisateur: ' + error;
      })
    );
  }

  deleteUser(userId: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${userId}`, { headers }).pipe(
      catchError((error) => {
        throw 'Erreur lors de la suppression de l’utilisateur: ' + error;
      })
    );
  }

  updateUser(userId: string, user: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${userId}`, user, { headers }).pipe(
      catchError((error) => {
        throw 'Erreur lors de la mise à jour de l’utilisateur: ' + error;
      })
    );
  }

  getUserById(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${userId}`, { headers }).pipe(
      catchError((error) => {
        return throwError(() => new Error('Erreur lors de la récupération de l’utilisateur: ' + error.message));
      })
    );
  }

  updateUserPassword(userId: string, password: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${userId}/password`, { password }, { headers }).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error?.message || 'Erreur lors de la mise à jour du mot de passe'));
      })
    );
  }

}
