import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
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
        error: (error) => console.error('Erreur lors de la récupération de l’utilisateur:', error)
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
