import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  aboutHeight: any;
  public groups = [];
  public cover = '';
  pageId = 1;
  constructor(public contactService: ContactService) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getGontacts();
  }

  getGontacts() {
    this.contactService.getAll(this.pageId).subscribe(data => {
      this.groups = data;
      console.log(data);
      this.pageId++;
    });
  }

  open(index) {

  }

  onScroll() {
    this.getGontacts();
  }

  details(index) {

  }

}
