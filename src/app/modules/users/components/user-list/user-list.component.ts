import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css'
})
export class UserListComponent {
    users: any[] = [];

  constructor(private userService: UserService, private router: Router) { }

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
        this.users = users;
      });
  }
}
