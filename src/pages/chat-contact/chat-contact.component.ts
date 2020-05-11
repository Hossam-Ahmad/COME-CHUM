import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
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
        this.messages.push({
          contact_id: this.contactId,
          created_at: '',
          data: this.text,
          seen: 1,
          sender: 1,
          type: 0
        });
        this.text = '';
        console.log(data);
      });
    }
  }

  onScroll() {
    this.getMessages();
  }

  select() {
    document.getElementById('upload').click();
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }

}
