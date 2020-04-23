import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  aboutHeight: any;
  public contacts = [];
  public cover = '';
  pageId = 1;
  constructor(
    public contactService: ContactService,
    private router: Router) {
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
      this.contacts = data;
      console.log(data);
      this.pageId++;
    });
  }

  open(index) {
    this.router.navigate(['/cpanel/chat-contact'], { queryParams: { contactId: this.contacts[index].id } });
  }

  onScroll() {
    this.getGontacts();
  }

  details(index) {

  }

}
