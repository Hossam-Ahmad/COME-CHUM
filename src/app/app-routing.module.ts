import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/pages/login/login.component';
import { DashboardComponent } from 'src/pages/dashboard/dashboard.component';
import { AuthService } from 'src/services/auth.service';
import { CpanelComponent } from 'src/pages/cpanel/cpanel.component';
import { UsersComponent } from 'src/pages/users/users.component';


const routes: Routes = [
  {
    path: 'cpanel',
    component: CpanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthService]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthService]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthService]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
