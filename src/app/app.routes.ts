import { Routes } from '@angular/router';
import { UserListComponent } from './modules/users/components/user-list/user-list.component';
import { CreateUserComponent } from './modules/users/components/create-user/create-user.component';
import { StockListComponent } from './modules/stock/components/stock-list/stock-list.component';
import { UpdateUserComponent } from './modules/users/components/update-user/update-user.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';

export const routes: Routes = [
    { path: 'users', component: UserListComponent },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'stock-list', component:  StockListComponent},
    { path: 'update-user/:id', component:  UpdateUserComponent},
    { path: 'login', component: LoginComponent }
];
