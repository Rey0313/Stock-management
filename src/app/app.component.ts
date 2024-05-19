import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { UserListComponent } from './modules/users/components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './modules/authentication/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}
  title = 'Stock-management';
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
