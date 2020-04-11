import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

  status = '/';

  public routes = [
    { path: '/cpanel/dashboard', title: 'الصفحات',  icon: 'dashboard', class: ''},
    { path: '/cpanel/users', title: 'المستخدمين',  icon: 'person', class: ''},
    { path: '/cpanel/groups', title: 'الجروبات',  icon: 'group', class: ''},
    { path: '/cpanel/events', title: 'الايفينتات',  icon: 'event', class: ''},
    { path: '/cpanel/contests', title: 'المسابقات',  icon: 'emoji_events', class: ''},
    { path: '/cpanel/statictics', title: 'الاحصائيات',  icon: 'equalizer', class: ''},
    { path: '/cpanel/finance', title: 'الميزانية',  icon: 'account_balance_wallet', class: ''},
    { path: '/cpanel/contact', title: 'التواصل',  icon: 'textsms', class: ''},
];

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.status = this.router.url;
  }

  clickEvent(e) {
    this.status = e;
  }

  logout() {
    this.authService.logout();
  }

}
