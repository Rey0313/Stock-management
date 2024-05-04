import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})

export class CreateUserComponent {
  role = 'membre';
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onRoleChange(value: string) {
    this.role = value;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = { ...form.value, password: this.encryptPassword(form.value.password) };
      this.userService.createUser(formData).subscribe({
        next: (user) => {
          console.log('Utilisateur créé:', user);
          this.router.navigate(['/users']);  
        },
        error: (error) => console.error(error)
      });
    }
  }

  private encryptPassword(password: string): string {
    return password;
  }
}
