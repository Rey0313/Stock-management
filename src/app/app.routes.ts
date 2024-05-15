import { Routes } from '@angular/router';
import { UserListComponent } from './modules/users/components/user-list/user-list.component';
import { CreateUserComponent } from './modules/users/components/create-user/create-user.component';
import { UpdateUserComponent } from './modules/users/components/update-user/update-user.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { StockListComponent } from './modules/stock/components/stock-list/stock-list.component';
import { AddMaterialsComponent } from './modules/stock/components/add-materials/add-materials.component';
import { RequestListComponent } from './modules/requests/components/request-list/request-list.component';
import { MyRequestListComponent } from './modules/requests/components/my-request-list/my-request-list.component';

export const routes: Routes = [
    { path: 'users', component: UserListComponent },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'update-user/:id', component:  UpdateUserComponent},
    { path: 'login', component: LoginComponent },

    { path: 'stock-list', component:  StockListComponent},
    { path: 'add-material', component:  AddMaterialsComponent},

    { path: 'requests-list', component:  RequestListComponent},
    { path: 'my-requests-list', component:  MyRequestListComponent},
];

