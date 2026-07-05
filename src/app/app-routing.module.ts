import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RoleGuard } from './Guards/role.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },

  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Employee'] }
  },

  {
    path: 'Roles',
    component: RolesComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] }
  },

  { path: 'forbidden', component: ForbiddenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
