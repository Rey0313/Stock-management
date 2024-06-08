import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Tableau de bord - Material Manageur");
  }
  
}
