import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/pages/login/login.component';
import { DashboardComponent } from 'src/pages/dashboard/dashboard.component';
import { AuthService } from 'src/services/auth.service';
import { CpanelComponent } from 'src/pages/cpanel/cpanel.component';
import { UsersComponent } from 'src/pages/users/users.component';
import { GroupsComponent } from 'src/pages/groups/groups.component';
import { EventsComponent } from 'src/pages/events/events.component';
import { StaticticsComponent } from 'src/pages/statictics/statictics.component';
import { FinanceComponent } from 'src/pages/finance/finance.component';
import { ContactComponent } from 'src/pages/contact/contact.component';
import { ContestsComponent } from 'src/pages/contests/contests.component';


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
      {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AuthService]
      },
      {
        path: 'events',
        component: EventsComponent,
        canActivate: [AuthService]
      },
      {
        path: 'statictics',
        component: StaticticsComponent,
        canActivate: [AuthService]
      },
      {
        path: 'finance',
        component: FinanceComponent,
        canActivate: [AuthService]
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [AuthService]
      },
      {
        path: 'contests',
        component: ContestsComponent,
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
