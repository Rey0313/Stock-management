import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mail: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.mail, this.password).subscribe({
      next: (response) => {
        console.log('Logged in successfully', response);
        // Redirige l'utilisateur ou affiche des infos
      },
      error: (error) => {
        console.error('Login failed', error);
        // Gère les erreurs de connexion ici
      }
    });
  }
}
