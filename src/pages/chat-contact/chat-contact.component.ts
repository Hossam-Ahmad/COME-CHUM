import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat-contact',
  templateUrl: './chat-contact.component.html',
  styleUrls: ['./chat-contact.component.scss']
})
export class ChatContactComponent implements OnInit {

  aboutHeight: any;
  public messages = [];
  public cover = '';
  pageId = 1;
  public contactId;
  public userData;
  public text = '';

  constructor(
    public contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private socket: Socket
    ) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.contactId = params['contactId'];
        this.contactService.get(this.contactId).subscribe( data => {
          this.userData = data[0];
          console.log(this.userData);
          this.getMessages();
          this.socket.fromEvent(`sent${this.contactId}`).subscribe( data2 => {
            console.log(data2);
            this.messages.push({
              data : data2['data'],
              type : data2['type'],
              sender : data2['sender'],
              contact_id : data2['contactId'],
              created_at: '',
            });
            this.text = '';
          });
        });
      });
  }

  getMessages() {
    this.contactService.getMessages(this.contactId, this.pageId).subscribe(data => {
      this.messages = data;
      console.log(data);
      this.pageId++;
    });
  }

  send() {
    if (this.text.trim() !== '') {
      this.contactService.send(this.text, 0, this.contactId, 1).subscribe( data => {
      });
    }
  }

  onScroll() {
    // this.getMessages();
  }

  select() {
    document.getElementById('upload').click();
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }

}
