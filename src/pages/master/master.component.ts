import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

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
