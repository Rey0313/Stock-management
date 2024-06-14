import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service'; // Assurez-vous du bon chemin d'importation
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsManagerService {

  constructor(private notificationsService: NotificationsService) {}

  checkRenewalDates(): Observable<any> {
    return this.notificationsService.checkRenewalDates();
  }
}
