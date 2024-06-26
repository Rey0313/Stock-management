import { Routes } from '@angular/router';
import { UserListComponent } from './modules/users/components/user-list/user-list.component';
import { CreateUserComponent } from './modules/users/components/create-user/create-user.component';
import { UpdateUserComponent } from './modules/users/components/update-user/update-user.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { canActivateRole } from './guards/role-guard.guard';
import { StockListComponent } from './modules/stock/components/stock-list/stock-list.component';
import { AddMaterialsComponent } from './modules/stock/components/add-materials/add-materials.component';
import { RequestListComponent } from './modules/requests/components/request-list/request-list.component';
import { MyRequestListComponent } from './modules/requests/components/my-request-list/my-request-list.component';
import { AssignedMaterialsComponent } from './modules/materials/components/assigned-materials/assigned-materials.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { DashboardAdminComponent } from './modules/dashboard-admin/dashboard-admin.component';
import { NotificationsComponent } from './modules/notifications/components/notifications/notifications.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [canActivateRole],
        data: { roles: ['admin', 'membre', 'organisme'] }
    },
    {
        path: 'dashboard-admin',
        component: DashboardAdminComponent,
        canActivate: [canActivateRole],
        data: { roles: ['admin'] }
    },
    {
        path: 'users',
        component: UserListComponent,
        canActivate: [canActivateRole],
        data: { roles: ['admin', 'membre', 'organisme'] }
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
        data: { roles: ['admin', 'membre', 'organisme'] }
    },
    {
        path: 'update-user/:id',
        component: UpdateUserComponent,
        canActivate: [canActivateRole],
        data: { roles: ['admin', 'membre', 'organisme'] }
    },
    {
        path: 'add-material',
        component: AddMaterialsComponent,
        canActivate: [canActivateRole],
        data: { roles: 'admin' }
    },
    {
        path: 'requests-list',
        component: RequestListComponent,
        canActivate: [canActivateRole],
        data: { roles: 'admin' }
    },
    {
        path: 'my-requests-list',
        component: MyRequestListComponent,
        canActivate: [canActivateRole],
        data: { roles: ['admin', 'membre', 'organisme'] }
    },
    {
        path: 'assigned-materials',
        component: AssignedMaterialsComponent,
        canActivate: [canActivateRole],
        data: { roles: ['admin', 'membre', 'organisme'] }
    },{
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [canActivateRole],
        data: { roles: 'admin' }
    }
];
