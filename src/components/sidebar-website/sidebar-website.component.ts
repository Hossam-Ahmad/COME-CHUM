import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


declare const $: any;

@Component({
  selector: 'app-sidebar-website',
  templateUrl: './sidebar-website.component.html',
  styleUrls: ['./sidebar-website.component.scss']
})
export class SidebarWebsiteComponent implements OnInit {

  public status = '/';
  public routes = [
    { path: '/feed', title: 'Home',  icon: 'home', class: ''},
    { path: '/groups', title: 'Groups',  icon: 'person', class: ''},
    { path: '/chat', title: 'Messages',  icon: 'group', class: ''},
    { path: '/events', title: 'Events',  icon: 'event', class: ''},
    { path: '/blogs', title: 'Blogs',  icon: 'emoji_events', class: ''},
    { path: '/contests', title: 'Contests',  icon: 'assignment', class: ''},
    { path: '/packages', title: 'Packages',  icon: 'payment', class: ''},
];

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.status = this.router.url;
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
