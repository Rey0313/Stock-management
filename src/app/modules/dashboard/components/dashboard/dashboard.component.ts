import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../authentication/services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationsManagerService } from '../../../notifications/services/notifications-manager.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isAdmin = false;

  constructor(private titleService: Title, private authService: AuthService, private notificationsManager: NotificationsManagerService) {
    this.titleService.setTitle("Tableau de bord - Material Manageur");
    this.checkAdmin();
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
      console.log("Hello, je vais check les dates ");
      this.notificationsManager.checkRenewalDates().subscribe({
        next: () => console.log('Renewal dates checked successfully'),
        error: (err) => console.error('Error checking renewal dates', err),
        complete: () => console.log('Renewal dates check complete')
      });
    }
  }

  checkAdmin() {
    this.isAdmin = this.authService.isAdmin();
  }
  
}
