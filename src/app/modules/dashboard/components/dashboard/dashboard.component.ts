import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../authentication/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isAdmin = false;

  constructor(private titleService: Title, private authService: AuthService) {
    this.titleService.setTitle("Tableau de bord - Material Manageur");
    this.checkAdmin();
  }

  checkAdmin() {
    this.isAdmin = this.authService.isAdmin();
  }
  
}
