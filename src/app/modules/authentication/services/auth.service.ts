import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { mail: email, password: password })
      .pipe(
        map((response: any) => {
          if (response && response.token) {
            const decodedToken = this.decodeToken(response.token);
            localStorage.setItem('currentUser', JSON.stringify({
              email,
              token: response.token,
              userId: decodedToken.id,
              role: decodedToken.role
            }));
          }
          return response;
        })
      );
  }

  getToken(): string {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).token : '';
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  getUserId(): string {
    if (typeof localStorage !== 'undefined') {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      return currentUser.userId;
    }
    return '';
  }

  getCurrentUser(): any {
    if (typeof localStorage !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      return currentUser ? JSON.parse(currentUser) : null;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const currentUser = this.getCurrentUser();
    return !!currentUser;
  }

  isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser && currentUser.role === 'admin';
  }
}
