import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.scss']
})
export class CpanelComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  isLogin() {
    if ( this.router.url === '/cpanel/login' || this.router.url === '/cpanel/change' || this.router.url === '/cpanel/forget') {
      return true;
    } else {
      return false;
    }
  }

  isMobile() {
    return window.innerWidth < 800;
  }

}
