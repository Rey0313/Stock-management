import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';
import { AuthService } from '../../../authentication/services/auth.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: any = {};
  currentUserRole: string | null = null;
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private library: FaIconLibrary,
    private titleService: Title
  ) {
    library.addIcons(faArrowLeft);
    if (this.currentUserRole === 'admin') {
    this.titleService.setTitle('Modifier un utilisateur - Material Manageur');
    }else{
    this.titleService.setTitle('Modifier mon profil - Material Manageur');
    }
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserRole = currentUser.role;

    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (userData) => {
          this.user = userData;
          if (!this.user.role) {
            this.user.role = 'membre';
          }
        },
        error: (error) => {
          const errorMessage = error.message || '';
          if (errorMessage.includes('403')) {
            this.router.navigate(['/dashboard']);
            swal('Accès refusé', 'Vous n’avez pas les droits pour accéder à cette page.', 'error');
          } else {
            console.error('Erreur lors de la récupération de l’utilisateur:', error);
          }
        }
      });
    }
  }

  onSubmit() {
    this.userService.updateUser(this.user._id, this.user).subscribe({
      next: (response) => {
        this.updateLocalStorage(response.token);
        if (this.currentUserRole === 'admin') {
          swal('Succès', 'Utilisateur mis à jour avec succès', 'success');
          this.router.navigate(['/users']);
        } else {
          swal('Succès', 'Votre profil a été mis à jour avec succès', 'success');
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
        swal('Erreur', `Erreur lors de la mise à jour de l’utilisateur: ${error.message}`, 'error');
      }
    });
  }

  onPasswordChange() {
    if (this.password !== this.confirmPassword) {
      swal('Erreur', 'Les mots de passe ne correspondent pas.', 'error');
      return;
    }
  
    if (!this.validatePassword(this.password)) {
      swal('Erreur', 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.', 'error');
      return;
    }
  
    this.userService.updateUserPassword(this.user._id, this.password).subscribe({
      next: (response) => {
        swal('Succès', 'Mot de passe mis à jour avec succès.', 'success');
        this.password = '';
        this.confirmPassword = '';
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
        swal('Erreur', `Erreur lors de la mise à jour du mot de passe: ${error.error?.message || error.message || 'Erreur inconnue'}`, 'error');
      }
    });
  }

  validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  updateLocalStorage(newToken: string) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.userId === this.user._id) {
      currentUser.email = this.user.mail;
      currentUser.role = this.user.role;
      currentUser.token = newToken;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }

  goBack() {
    if (this.currentUserRole === 'admin') {
      this.router.navigate(['/users']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
