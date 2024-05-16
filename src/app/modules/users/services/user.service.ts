import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  createUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<any>(this.apiUrl, user, { headers }).pipe(
      catchError((error) => {
        throw 'Erreur lors de la création de l’utilisateur: ' + error;
      })
    );
  }

  deleteUser(userId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`).pipe(
      catchError((error) => {
        throw 'Erreur lors de la suppression de l’utilisateur: ' + error;
      })
    );
  }

  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user._id}`, user).pipe(
      catchError((error) => {
        throw 'Erreur lors de la mise à jour de l’utilisateur: ' + error;
      })
    );
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      catchError((error) => {
        throw 'Erreur lors de la récupération de l’utilisateur: ' + error;
      })
    );
  }
}