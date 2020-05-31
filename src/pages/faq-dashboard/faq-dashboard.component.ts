import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../services/faq.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq-dashboard',
  templateUrl: './faq-dashboard.component.html',
  styleUrls: ['./faq-dashboard.component.scss']
})
export class FaqDashboardComponent implements OnInit {

  aboutHeight: any;
  public faqs = [];
  public cover = '';
  pageId = 1;
  constructor(
    public faqService: FaqService,
    public router: Router) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.getFAQ();
  }

  getFAQ() {
    this.faqService.getAllDashboard(this.pageId).subscribe(data => {
      this.faqs = data;
      console.log(data);
      this.pageId++;
    });
  }

  onScroll() {
    this.getFAQ();
  }

  details(index) {
    this.router.navigate(['/cpanel/faq-details'], { queryParams: { faqId: this.faqs[index].id } });
  }

  remove(index) {
    this.faqService.remove(this.faqs[index].id).subscribe( data => {
      this.faqs.splice(index, 1);
    });
  }

}
