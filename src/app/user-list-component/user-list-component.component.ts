import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone : true,
  templateUrl: './user-list-component.component.html',
  styleUrls: ['./user-list-component.component.css'],
  imports: [CommonModule, HttpClientModule]
})
export class UserListComponent implements OnInit {

  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
}