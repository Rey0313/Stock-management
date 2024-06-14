import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { faArrowDown, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService, private router: Router, private library: FaIconLibrary, private titleService: Title,) {
    this.titleService.setTitle("Notifications");
    this.library.addIcons(faArrowLeft);
    this.library.addIcons(faTrash);
  }

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

  deleteNotification(notificationId: string): void {
    this.notificationsService.deleteNotification(notificationId).subscribe({
      next: () => this.loadNotifications(),
      error: (error) => console.error('Erreur lors de la suppression de la notification', error)
    });
  }

  goBack() {
    this.router.navigate(['/dashboard-admin']);
  }
}