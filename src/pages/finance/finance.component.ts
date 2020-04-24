import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../../services/finance.service';
import { environment } from 'src/environments/environment';
import { MiscService } from 'src/services/misc.service';


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

  public dayDate;
  public monthDate;
  public yearDate;
  constructor(
    public financeService: FinanceService,
    public misc: MiscService
  ) {
    const d = new Date();
    this.dayDate = d.getDate();
    this.monthDate = d.getMonth() + 1;
    this.yearDate = d.getFullYear();
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
    if (this.dayDate) {
      this.financeService.getStatictics(this.dayDate, this.monthDate, this.yearDate).subscribe(data => {
        console.log(data);
        if (data[0].day) {
          this.day = data[0].day;
        } else {
          this.day = 0;
        }

        if (data[0].month) {
          this.month = data[0].month;
        } else {
          this.month = 0;
        }

        if (data[0].year) {
          this.year = data[0].year;
        } else {
          this.year = 0;
        }

        if (data[0].total) {
          this.total = data[0].total;
        } else {
          this.total = 0;
        }

      });
    } else {
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
  }

  onScroll() {
    this.getTransactions();
  }

}
