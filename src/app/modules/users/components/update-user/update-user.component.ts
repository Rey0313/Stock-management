import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: any = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (userData) => {
          this.user = userData;
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
      next: (updatedUser) => {
        this.router.navigate(['/users']);  
      },
      error: (error) => console.error('Erreur lors de la mise à jour de l’utilisateur:', error)
    });
  }
}
