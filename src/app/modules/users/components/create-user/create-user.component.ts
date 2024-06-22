import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, FontAwesomeModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  role = 'membre';

  constructor(
    private userService: UserService,
    private router: Router,
    private library: FaIconLibrary,
    private titleService: Title
  ) {
    library.addIcons(faArrowLeft);
    this.titleService.setTitle('Créer un utilisateur - Material Manager');
  }

  onRoleChange(value: string) {
    this.role = value;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = { ...form.value, password: this.encryptPassword(form.value.password) };
      this.userService.createUser(formData).subscribe({
        next: (user) => {
          swal('Création de compte', 'Votre compte a bien été créé', 'success');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          swal('Création de compte', 'Erreur lors de la création de votre compte', 'error');
          console.error(error)
        }
      });
    }
  }

  private encryptPassword(password: string): string {
    return password;
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}