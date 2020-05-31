import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FaqService } from 'src/services/faq.service';

@Component({
  selector: 'app-faq-details',
  templateUrl: './faq-details.component.html',
  styleUrls: ['./faq-details.component.css']
})
export class FaqDetailsComponent implements OnInit {

  faqId;
  public faqData;

  public question;
  public answer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private faqService: FaqService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.faqId = params['faqId'];
        this.faqService.get(this.faqId).subscribe( data => {
          if (data != null) {
            this.faqData = data[0];
            this.question = this.faqData.question;
            this.answer = this.faqData.answer;
          }
        });
      });
  }

  update() {
    if (this.faqData) {
      console.log(this.faqData);
      this.faqService.update(
        this.faqId,
        {
        question : this.question,
        answer : this.answer,
      }).subscribe( data => {
        this.router.navigate(['/cpanel/faq-dashboard']);
      });
    }
  }

}
