import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../../services/finance.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {

  aboutHeight: any;
  public groups = [];
  public methods = [
    'Credit Card',
    'Paypal',
    'Google Pay',
    'Apple Pay'
  ];
  public cover = '';
  pageId = 1;
  public day = 0;
  public month = 0;
  public year = 0;
  public total = 0;
  constructor(public financeService: FinanceService) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getTransactions();
    this.getStatictics();
  }

  getTransactions() {
    this.financeService.getAll(this.pageId).subscribe(data => {
      this.groups = data;
      console.log(data);
      this.pageId++;
    });
  }

  getStatictics() {
    this.financeService.getStatictics().subscribe(data => {
      console.log(data);
      if (data[0].day) {
        this.day = data[0].day;
      }
      if (data[0].month) {
        this.month = data[0].month;
      }
      if (data[0].year) {
        this.year = data[0].year;
      }
      if (data[0].total) {
        this.total = data[0].total;
      }
    });
  }

  onScroll() {
    this.getTransactions();
  }

}
