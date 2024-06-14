import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  private apiUrl = 'http://localhost:3000/api/notifications';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getNotifications(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  markAsRead(notificationId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/${notificationId}/read`, {}, { headers });
  }

  checkRenewalDates(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/check`, {}, { headers });
  }

  deleteNotification(notificationId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${notificationId}`, { headers }); // Méthode DELETE pour supprimer une notification
  }
}
