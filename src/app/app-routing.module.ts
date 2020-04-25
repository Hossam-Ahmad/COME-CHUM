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
import { UserProfileComponent } from 'src/pages/user-profile/user-profile.component';
import { ChatContactComponent } from 'src/pages/chat-contact/chat-contact.component';
import { ChangeComponent } from 'src/pages/change/change.component';
import { ForgetComponent } from 'src/pages/forget/forget.component';
import { BlogsComponent } from 'src/pages/blogs/blogs.component';
import { PackagesComponent } from 'src/pages/packages/packages.component';
import { PackageDetailsComponent } from 'src/pages/package-details/package-details.component';


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
        path: 'forget',
        component: ForgetComponent,
        canActivate: [AuthService]
      },
      {
        path: 'change',
        component: ChangeComponent,
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
      {
        path: 'packages',
        component: PackagesComponent,
        canActivate: [AuthService]
      },
      {
        path: 'blogs',
        component: BlogsComponent,
        canActivate: [AuthService]
      },
      {
        path: 'user-details',
        component: UserProfileComponent,
        canActivate: [AuthService]
      },
      {
        path: 'chat-contact',
        component: ChatContactComponent,
        canActivate: [AuthService]
      },
      {
        path: 'package-details',
        component: PackageDetailsComponent,
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
