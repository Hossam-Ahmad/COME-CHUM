import { Component, OnInit, ViewChild } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
// import { NavbarComponent as navmdb } from '../../../node_modules/angular-bootstrap-md/lib/free/navbars/navbar.component';
// import { ContentService } from 'src/app/services/content.service';
// import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // @ViewChild('navbarid', {static: false}) navRef: navmdb;

  status = '/';
  language = '';
  interval;
  sixthPage = false;
  sixthPageAr = '';
  sixthPageEn = '';

  clickEvent(e) {
      this.status = e;
      // if (this.navRef.shown) {
      //   this.navRef.toggle();
      // }
  }

  constructor(public translate: TranslateService,
              public router: Router,
              // public contentService: ContentService,
              // public languageService: LanguageService
              ) {
                this.hasPage();
               }

  ngOnInit() {
    this.status = this.router.url;
    this.language = localStorage.getItem('language');
    // setInterval(() => {
    //   if (this.contentService.goToContact) {
    //     this.contact();
    //   }
    // }, 1000);
  }

  changeLanguage(language) {
    this.language = language;
    this.translate.use(language);
    localStorage.setItem('language', language);
    // if (this.navRef.shown) {
    //   this.navRef.toggle();
    // }
  }

  contact() {
    // this.contentService.goToContact = true;
    // if (this.navRef.shown) {
    //   this.navRef.toggle();
    // }
    const el: HTMLElement|null = document.getElementById('contact');
    // if (el && this.contentService.goToContact) {
    //     setTimeout(() =>
    //       el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'}), 0);
    //     this.contentService.goToContact = false;
    //     clearInterval(this.interval);
    // }
  }

  hasPage() {
    // this.contentService.hasPage().subscribe( data => {
    //   this.sixthPage = data[data.length - 1].payload.doc.data()["show"];
    //   this.sixthPageAr = data[data.length - 1].payload.doc.data()["title_Ar"];
    //   this.sixthPageEn = data[data.length - 1].payload.doc.data()["title_En"];
    // });
  }

  login() {
    this.router.navigateByUrl('https://www.gecc-ksa.co/login.aspx');
  }

}
