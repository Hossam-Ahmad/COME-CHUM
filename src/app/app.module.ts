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
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular-6-social-login';
import {TimeAgoPipe} from 'time-ago-pipe';
import { SliderModule } from 'angular-image-slider';

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
import { FaqComponent } from 'src/pages/faq/faq.component';
import { RegisterWebsiteComponent } from 'src/pages/register-website/register-website.component';
import { ActivateWebsiteComponent } from 'src/pages/activate-website/activate-website.component';
import { TermsComponent } from 'src/pages/terms/terms.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { ChatComponent } from 'src/pages/chat/chat.component';
import { FeedComponent } from 'src/pages/feed/feed.component';
import { MasterComponent } from 'src/pages/master/master.component';
import { SettingsComponent } from 'src/pages/settings/settings.component';
import { PackagesWebsiteComponent } from 'src/pages/packages-website/packages-website.component';
import { BlogsWebsiteComponent } from 'src/pages/blogs-website/blogs-website.component';
import { EventsWebsiteComponent } from 'src/pages/events-website/events-website.component';
import { EventComponent } from 'src/components/event/event.component';
import { GroupComponent } from 'src/components/group/group.component';
import { GroupsWebsiteComponent } from 'src/pages/groups-website/groups-website.component';
import { ProfileComponent } from 'src/pages/profile/profile.component';
import { ContestWebsiteComponent } from 'src/pages/contest-website/contest-website.component';
import { ContestComponent } from 'src/components/contest/contest.component';
import { ServicesComponent } from 'src/pages/services/services.component';
import { ServiceDetailsComponent } from 'src/pages/service-details/service-details.component';
import { AdvantagesDetailsComponent } from 'src/pages/advantages-details/advantages-details.component';
import { AdvantagesComponent } from 'src/pages/advantages/advantages.component';
import { AboutComponent } from 'src/pages/about/about.component';
import { FaqDashboardComponent } from 'src/pages/faq-dashboard/faq-dashboard.component';
import { FaqDetailsComponent } from 'src/pages/faq-details/faq-details.component';
import { InterestsComponent } from 'src/pages/interests/interests.component';
import { InterestDetailsComponent } from 'src/pages/interest-details/interest-details.component';
import { BlogPageComponent } from 'src/pages/blog/blog.component';
import { MessagesWebsiteComponent } from 'src/pages/messages-website/messages-website.component';
import { NotificationComponent } from 'src/pages/notifications/notifications.component';

// Components
import { DasboardFooterComponent } from '../components/dasboard-footer/dasboard-footer.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DashboardNavbarComponent } from '../components/dashboard-navbar/dashboard-navbar.component';
import { MembersComponent } from 'src/components/members/members.component';
import { SidebarWebsiteComponent } from 'src/components/sidebar-website/sidebar-website.component';
import { SliderComponent } from 'src/components/slider/slider.component';
import { MapComponent } from 'src/components/map/map.component';
import { PostComponent } from 'src/components/post/post.component';
import { CreatePostComponent } from 'src/components/create-post/create-post.component';
import { coverComponent } from 'src/components/cover/cover.component';
import { MessagesComponent } from 'src/components/Messages/Messages.component';
import { blogsComponent } from 'src/components/blogs/blogs.component';
import { asideProfileComponent } from 'src/components/aside-profile/aside-profile.component';
import { NewMessageComponent } from 'src/components/new-message/new-message.component';
import { BlogComponent } from 'src/components/blog/blog.component';
import { CheckoutComponent } from 'src/components/checkout/checkout.component';
import { SearchComponent } from 'src/components/search/search.component';

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
import { FaqService } from 'src/services/faq.service';
import { SettingsService } from 'src/services/settings.service';
import { ChatService } from 'src/services/chat.service';
import { AuthUserService } from 'src/services/authUser.service';
import { environment } from 'src/environments/environment';
import { FeedService } from 'src/services/feed.servie';
import { InterestsService } from 'src/services/interests.service';
import { LocationsService } from 'src/services/locations.service';
import { NotificationsService } from 'src/services/notifications.service';

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

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const config: SocketIoConfig = { url: environment.host, options: {} };

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(environment.facebook_client_id)
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(environment.google_client_id)
        }
      ]
  );
  return config;
}


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
    ForgetWebsiteComponent,
    FaqComponent,
    RegisterWebsiteComponent,
    ActivateWebsiteComponent,
    TermsComponent,
    HomeComponent,
    ChatComponent,
    FeedComponent,
    MasterComponent,
    SidebarWebsiteComponent,
    SliderComponent,
    SettingsComponent,
    MapComponent,
    PostComponent,
    CreatePostComponent,
    coverComponent,
    MessagesComponent,
    blogsComponent,
    TimeAgoPipe,
    asideProfileComponent,
    PackagesWebsiteComponent,
    NewMessageComponent,
    BlogsWebsiteComponent,
    BlogComponent,
    CheckoutComponent,
    EventsWebsiteComponent,
    EventComponent,
    GroupComponent,
    GroupsWebsiteComponent,
    ProfileComponent,
    ContestWebsiteComponent,
    ContestComponent,
    ServicesComponent,
    ServiceDetailsComponent,
    AdvantagesComponent,
    AdvantagesDetailsComponent,
    AboutComponent,
    FaqDashboardComponent,
    FaqDetailsComponent,
    InterestsComponent,
    InterestDetailsComponent,
    SearchComponent,
    BlogPageComponent,
    MessagesWebsiteComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    SliderModule,
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
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    SocketIoModule.forRoot(config),
    NotifierModule.withConfig(customNotifierOptions),
    SocialLoginModule,
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
    AuthUserService,
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
    SocialService,
    FaqService,
    SettingsService,
    ChatService,
    FeedService,
    InterestsService,
    LocationsService,
    MatDatepickerModule,
    NotificationsService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [MembersComponent, NewMessageComponent, CheckoutComponent, SearchComponent]
})
export class AppModule { }
