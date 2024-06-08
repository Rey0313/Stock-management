import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule, FontAwesomeModule],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css'
})
export class UserListComponent {
    users: any[] = [];

  constructor(private userService: UserService, private router: Router, private library: FaIconLibrary, private titleService: Title) {
    library.addIcons(faArrowLeft);
    this.titleService.setTitle("Utilisateurs - Material Manageur");
  }

  deleteUser(userId: any) {
    this.userService.deleteUser(userId)
      .subscribe(() => {
        this.users = this.users.filter(u => u._id !== userId);
      });
  }

  updateUser(userId: any) {
    this.router.navigate([`update-user/${userId}`]);
  }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => {
        // Filter out admin users
        this.users = users.filter(u => u.role !== 'admin');
      });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
