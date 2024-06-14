import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule],
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationsService.getNotifications().subscribe({
      next: (data) => {
        console.log('Notifications récupérées :', data);
        this.notifications = data;
      },
      error: (error) => console.error('Erreur lors de la récupération des notifications', error)
    });
  }

  markAsRead(notificationId: string): void {
    this.notificationsService.markAsRead(notificationId).subscribe({
      next: () => this.loadNotifications(),
      error: (error) => console.error('Erreur lors de la mise à jour de la notification', error)
    });
  }
}