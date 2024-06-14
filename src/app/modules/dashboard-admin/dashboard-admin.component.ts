import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})

export class DashboardAdminComponent {
  constructor(private titleService: Title, private router: Router, private library: FaIconLibrary) {
    this.titleService.setTitle("Tableau de bord Admin - Material Manageur");
    this.library.addIcons(faArrowLeft);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
