import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'travel-app';

  constructor(public translate: TranslateService) {
    translate.addLangs(['ar', 'en']);
    // translate.setDefaultLang('ar');
    // const language = localStorage.getItem('language');
    // if (language == null) {
    //   translate.use('ar');
    // } else {
    //   translate.use(language);
    // }
    translate.use('en');
  }

}
