import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mail: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.login(this.mail, this.password).subscribe({
      next: (response) => {
        swal({
          title: 'Connexion réussie',
          text: 'Vous êtes maintenant connecté',
          icon: 'success',
        }).then(() => {
          window.location.href = 'dashboard';
        });
      },
      error: (error) => {
        swal({
          title: 'Erreur',
          text: 'Identifiants incorrects',
          icon: 'error',
        });
      }
    });
  }
}
