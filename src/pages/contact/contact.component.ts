import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MiscService } from 'src/services/misc.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { MembersComponent } from 'src/components/members/members.component';

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
    private router: Router,
    public misc: MiscService,
    private dialog: MatDialog) {
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

  send() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'colorize-background';
    this.dialog.open(MembersComponent, dialogConfig);
  }

}
