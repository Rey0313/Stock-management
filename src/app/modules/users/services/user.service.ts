import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
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