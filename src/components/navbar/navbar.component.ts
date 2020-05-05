import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  status = '/';
  language = '';
  interval;
  sixthPage = false;
  sixthPageAr = '';
  sixthPageEn = '';

  clickEvent(e) {
      this.status = e;
  }

  constructor(public translate: TranslateService,
              public router: Router,
              ) {
               }

  ngOnInit() {
    this.status = this.router.url;
    this.language = localStorage.getItem('language');
  }

  changeLanguage(language) {
    this.language = language;
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  login() {
    this.router.navigateByUrl('https://www.gecc-ksa.co/login.aspx');
  }

}
