import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../../services/authUser.service';
import { TranslateService } from '@ngx-translate/core';


declare const $: any;

@Component({
  selector: 'app-sidebar-website',
  templateUrl: './sidebar-website.component.html',
  styleUrls: ['./sidebar-website.component.scss']
})
export class SidebarWebsiteComponent implements OnInit {

  public userName = '';
  public userId = '';
  public userImage = '';
  public isAuthenticated = false;
  public status = '/';
  public routes = [
    { path: '/feed', title: 'home_nav',  icon: 'home', class: ''},
    { path: '/groups', title: 'groups_nav',  icon: 'person', class: ''},
    { path: '/chat', title: 'messages',  icon: 'group', class: ''},
    { path: '/events', title: 'events_nav',  icon: 'event', class: ''},
    { path: '/blogs', title: 'blogs',  icon: 'emoji_events', class: ''},
    { path: '/contests', title: 'contests',  icon: 'assignment', class: ''},
    { path: '/packages', title: 'packages',  icon: 'payment', class: ''},
];

  constructor(public router: Router, public authService: AuthUserService, public translate: TranslateService) { }

  ngOnInit() {
    this.status = this.router.url;
    if (this.authService.isAuthenticated()) {
      this.getUserData();
      this.isAuthenticated = true;
    }
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

  getUserData() {
    this.authService.getData().subscribe( data => {
      console.log(data);
      this.userName = data.name;
      this.userImage = data.image;
      this.userId = data.profile_id;
    });
  }

}
