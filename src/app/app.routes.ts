import { Routes } from '@angular/router';
import { UserListComponent } from './modules/users/components/user-list/user-list.component';
import { CreateUserComponent } from './modules/users/components/create-user/create-user.component';
import { StockListComponent } from './modules/stock/components/stock-list/stock-list.component';
import { UpdateUserComponent } from './modules/users/components/update-user/update-user.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { canActivateRole } from './guards/role-guard.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'users',
        component: UserListComponent,
        canActivate: [canActivateRole],
        data: { roles: ['admin', 'membre'] }
    },
    {
        path: 'create-user',
        component: CreateUserComponent,
        canActivate: [canActivateRole],
        data: { roles: ['admin'] }
    },
    {
        path: 'stock-list',
        component: StockListComponent,
        canActivate: [canActivateRole],
        data: { roles: 'membre' }
    },
    {
        path: 'update-user/:id',
        component: UpdateUserComponent,
        canActivate: [canActivateRole],
        data: { roles: 'membre' }
    }
];
