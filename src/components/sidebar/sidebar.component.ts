import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/cpanel/dashboard', title: 'الصفحات',  icon: 'dashboard', class: ''},
    { path: '/cpanel/users', title: 'المستخدمين',  icon: 'person', class: ''},
    { path: '/cpanel/groups', title: 'الجروبات',  icon: 'group', class: ''},
    { path: '/cpanel/events', title: 'الايفينتات',  icon: 'event', class: ''},
    { path: '/cpanel/contests', title: 'المسابقات',  icon: 'emoji_events', class: ''},
    { path: '/cpanel/blogs', title: 'المدونات',  icon: 'assignment', class: ''},
    { path: '/cpanel/packages', title: 'الباقات',  icon: 'payment', class: ''},
    { path: '/cpanel/interests', title: 'الاهتمامات',  icon: 'favorite', class: ''},
    { path: '/cpanel/statictics', title: 'الاحصائيات',  icon: 'equalizer', class: ''},
    { path: '/cpanel/finance', title: 'الميزانية',  icon: 'account_balance_wallet', class: ''},
    { path: '/cpanel/contact', title: 'التواصل',  icon: 'textsms', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if (window.screen.width > 991) {
          return false;
      }
      return true;
  }

  logout() {
    this.authService.logout();
  }
}
