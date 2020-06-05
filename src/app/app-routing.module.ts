import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
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
import { BlogDetailsComponent } from 'src/pages/blog-details/blog-details.component';
import { ContestDetailsComponent } from 'src/pages/contest-details/contest-details.component';
import { TestComponent } from 'src/pages/test/test.component';
import { LoginWebsiteComponent } from 'src/pages/login-website/login-website.component';
import { ForgetWebsiteComponent } from 'src/pages/forget-website/forget-website.component';
import { FaqComponent } from 'src/pages/faq/faq.component';
import { RegisterWebsiteComponent } from 'src/pages/register-website/register-website.component';
import { ActivateWebsiteComponent } from 'src/pages/activate-website/activate-website.component';
import { TermsComponent } from 'src/pages/terms/terms.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { ChatComponent } from 'src/pages/chat/chat.component';
import { FeedComponent } from 'src/pages/feed/feed.component';
import { MasterComponent } from 'src/pages/master/master.component';
import { AuthUserService } from 'src/services/authUser.service';
import { SettingsComponent } from 'src/pages/settings/settings.component';
import { PackagesWebsiteComponent } from 'src/pages/packages-website/packages-website.component';
import { BlogsWebsiteComponent } from 'src/pages/blogs-website/blogs-website.component';
import { EventsWebsiteComponent } from 'src/pages/events-website/events-website.component';
import { GroupsWebsiteComponent } from 'src/pages/groups-website/groups-website.component';
import { ProfileComponent } from 'src/pages/profile/profile.component';
import { ContestWebsiteComponent } from 'src/pages/contest-website/contest-website.component';
import { ServicesComponent } from 'src/pages/services/services.component';
import { ServiceDetailsComponent } from 'src/pages/service-details/service-details.component';
import { AdvantagesComponent } from 'src/pages/advantages/advantages.component';
import { AdvantagesDetailsComponent } from 'src/pages/advantages-details/advantages-details.component';
import { AboutComponent } from 'src/pages/about/about.component';
import { FaqDashboardComponent } from 'src/pages/faq-dashboard/faq-dashboard.component';
import { FaqDetailsComponent } from 'src/pages/faq-details/faq-details.component';
import { InterestsComponent } from 'src/pages/interests/interests.component';
import { InterestDetailsComponent } from 'src/pages/interest-details/interest-details.component';
import { BlogPageComponent } from 'src/pages/blog/blog.component';

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
        path: 'services',
        component: ServicesComponent,
        canActivate: [AuthService]
      },
      {
        path: 'blogs',
        component: BlogsComponent,
        canActivate: [AuthService]
      },
      {
        path: 'advantages',
        component: AdvantagesComponent,
        canActivate: [AuthService]
      },
      {
        path: 'user-details',
        component: UserProfileComponent,
        canActivate: [AuthService]
      },
      {
        path: 'service-details',
        component: ServiceDetailsComponent,
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
      {
        path: 'advantages-details',
        component: AdvantagesDetailsComponent,
        canActivate: [AuthService]
      },
      {
        path: 'blog-details',
        component: BlogDetailsComponent,
        canActivate: [AuthService]
      },
      {
        path: 'contest-details',
        component: ContestDetailsComponent,
        canActivate: [AuthService]
      },
      {
        path: 'about',
        component: AboutComponent,
        canActivate: [AuthService]
      },
      {
        path: 'faq-dashboard',
        component: FaqDashboardComponent,
        canActivate: [AuthService]
      },
      {
        path: 'faq-details',
        component: FaqDetailsComponent,
        canActivate: [AuthService]
      },
      {
        path: 'interests',
        component: InterestsComponent,
        canActivate: [AuthService]
      },
      {
        path: 'interest-details',
        component: InterestDetailsComponent,
        canActivate: [AuthService]
      }
    ]
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'login',
    component: LoginWebsiteComponent,
    canActivate: [AuthUserService]
  },
  {
    path: 'forget',
    component: ForgetWebsiteComponent,
    canActivate: [AuthUserService]
  },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [AuthUserService]
  },
  {
    path: 'register',
    component: RegisterWebsiteComponent,
    canActivate: [AuthUserService]
  },
  {
    path: 'activate',
    component: ActivateWebsiteComponent,
    canActivate: [AuthUserService]
  },
  {
    path: 'terms',
    component: TermsComponent,
    canActivate: [AuthUserService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthUserService]
  },
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
        canActivate: [AuthUserService]
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthUserService]
      },
      {
        path: 'feed',
        component: FeedComponent,
        canActivate: [AuthUserService]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthUserService]
      }, {
        path: 'packages',
        component: PackagesWebsiteComponent,
        canActivate: [AuthUserService]
      }, {
        path: 'blogs',
        component: BlogsWebsiteComponent,
        canActivate: [AuthUserService]
      }, {
        path: 'events',
        component: EventsWebsiteComponent,
        canActivate: [AuthUserService]
      }, {
        path: 'groups',
        component: GroupsWebsiteComponent,
        canActivate: [AuthUserService]
      }, {
        path: 'profile',
        component: ProfileComponent,
        // canActivate: [AuthUserService]
      }, {
        path: 'contests',
        component: ContestWebsiteComponent,
        canActivate: [AuthUserService]
      }, {
        path: 'blog',
        component: BlogPageComponent,
        canActivate: [AuthUserService]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
