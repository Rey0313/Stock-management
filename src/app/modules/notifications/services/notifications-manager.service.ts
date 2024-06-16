import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';
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
