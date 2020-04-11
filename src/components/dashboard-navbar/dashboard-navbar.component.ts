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
