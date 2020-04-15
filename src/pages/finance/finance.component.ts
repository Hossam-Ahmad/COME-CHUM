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
  constructor(public financeService: FinanceService) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getGroups();
  }

  getGroups() {
    this.financeService.getAll(this.pageId).subscribe(data => {
      this.groups = data;
      console.log(data);
      this.pageId++;
    });
  }

  onScroll() {
    this.getGroups();
  }

}
