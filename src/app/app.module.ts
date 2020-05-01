import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SimpleChange } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

// Pages
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LoginComponent } from '../pages/login/login.component';
import { CpanelComponent } from '../pages/cpanel/cpanel.component';
import { UsersComponent } from 'src/pages/users/users.component';
import { GroupsComponent } from 'src/pages/groups/groups.component';
import { BlogDetailsComponent } from 'src/pages/blog-details/blog-details.component';
import { TestComponent } from 'src/pages/test/test.component';
import { LoginWebsiteComponent } from 'src/pages/login-website/login-website.component';
import { EventsComponent } from 'src/pages/events/events.component';
import { StaticticsComponent } from 'src/pages/statictics/statictics.component';
import { FinanceComponent } from 'src/pages/finance/finance.component';
import { ContactComponent } from 'src/pages/contact/contact.component';
import { ContestsComponent } from 'src/pages/contests/contests.component';
import { UserProfileComponent } from 'src/pages/user-profile/user-profile.component';
import { ChatContactComponent } from 'src/pages/chat-contact/chat-contact.component';
import { BlogsComponent } from 'src/pages/blogs/blogs.component';
import { PackagesComponent } from 'src/pages/packages/packages.component';
import { ForgetComponent } from 'src/pages/forget/forget.component';
import { ChangeComponent } from 'src/pages/change/change.component';
import { PackageDetailsComponent } from 'src/pages/package-details/package-details.component';
import { ContestDetailsComponent } from 'src/pages/contest-details/contest-details.component';
import { ForgetWebsiteComponent } from 'src/pages/forget-website/forget-website.component';

// Components
import { DasboardFooterComponent } from '../components/dasboard-footer/dasboard-footer.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DashboardNavbarComponent } from '../components/dashboard-navbar/dashboard-navbar.component';
import { MembersComponent } from 'src/components/members/members.component';


// Services
import { AuthService } from '../services/auth.service';
import { ContentService } from '../services/content.service';
import { UsersService } from '../services/users.service';
import { GroupsService } from 'src/services/groups.service';
import { EventsService } from 'src/services/events.service';
import { ContactService } from 'src/services/contact.service';
import { FinanceService } from 'src/services/finance.service';
import { ContestsService } from 'src/services/contests.service';
import { MiscService } from 'src/services/misc.service';
import { StaticticsService } from 'src/services/statictics.service';
import { PackagesService } from 'src/services/packages.service';
import { BlogsService } from 'src/services/blogs.service';
import { PaymentsService } from 'src/services/payments.service';
import { SocialService } from 'src/services/social.service';


export function createHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CpanelComponent,
    DasboardFooterComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardNavbarComponent,
    UsersComponent,
    GroupsComponent,
    EventsComponent,
    StaticticsComponent,
    FinanceComponent,
    ContactComponent,
    ContestsComponent,
    UserProfileComponent,
    ChatContactComponent,
    MembersComponent,
    BlogsComponent,
    PackagesComponent,
    ForgetComponent,
    ChangeComponent,
    PackageDetailsComponent,
    BlogDetailsComponent,
    ContestDetailsComponent,
    TestComponent,
    LoginWebsiteComponent,
    ForgetWebsiteComponent
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgbModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    NotifierModule.withConfig(customNotifierOptions),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: createHttpLoader, // exported factory function needed for AoT compilation
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    ContentService,
    UsersService,
    GroupsService,
    EventsService,
    ContactService,
    FinanceService,
    ContestsService,
    StaticticsService,
    BlogsService,
    PackagesService,
    MiscService,
    PaymentsService,
    SocialService
  ],
  bootstrap: [AppComponent],
  entryComponents: [MembersComponent]
})
export class AppModule { }
