import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FaqService } from '../../services/faq.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  public height;
  public questions = [];
  private page = 1;
  private languages = {en : 0 , ar : 1};

  constructor(
    public authService: AuthService,
    public router: Router,
    public faq: FaqService,
    private translate: TranslateService) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.faq.getAll(this.languages[this.translate.currentLang], this.page).subscribe( data => {
      this.questions = data;
      console.log(this.questions);
      this.page++;
    });
  }

  search(text) {
    console.log(text);
    this.faq.search(text).subscribe( data => {
      this.questions = data;
      console.log(data);
      this.page = 1;
    });
  }

}
