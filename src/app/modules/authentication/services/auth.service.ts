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
    return this.http.post(`${this.baseUrl}/login`, {mail: email, password: password})
      .pipe(
        map((response: any) => {
          if (response && response.token) {
            localStorage.setItem('currentUser', JSON.stringify({ email, token: response.token }));
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
