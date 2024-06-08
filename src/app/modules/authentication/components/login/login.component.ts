import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { Title } from '@angular/platform-browser';

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

  constructor(private authService: AuthService, private router: Router, private titleService: Title) {
    this.titleService.setTitle("Connexion - Material Manageur");
  }

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
          this.router.navigate(['/dashboard']); 
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
