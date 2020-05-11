import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/services/authUser.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  status = '/';
  language = '';
  public userName = '';
  public userImage = '';
  public userId = '';

  clickEvent(e) {
      this.status = e;
  }

  constructor(public translate: TranslateService,
              public router: Router,
              public auth: AuthUserService
              ) {
               }

  ngOnInit() {
    this.status = this.router.url;
    this.language = localStorage.getItem('language');
    this.getUserData();
  }

  changeLanguage(language) {
    this.language = language;
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getUserData() {
    this.auth.getData().subscribe( data => {
      this.userName = data.name;
      this.userImage = data.image;
      this.userId = data.profile_id;
    });
  }

  changeLang() {
    if (this.translate.getBrowserLang() === 'en') {
      this.translate.use('ar');
    } else {
      this.translate.use('en');
    }
  }

}
