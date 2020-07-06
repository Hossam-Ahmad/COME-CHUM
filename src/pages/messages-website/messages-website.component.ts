import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { AuthUserService } from '../../services/authUser.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/services/chat.service';
import { TranslateService } from '@ngx-translate/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './messages-website.component.html',
  styleUrls: ['./messages-website.component.scss']
})
export class MessagesWebsiteComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;

  public name = '';
  public image = '';
  public messages = [];
  public type = 0; // 0 direct , 1 group , 2 all
  private pageMessages = 1;
  public userId;
  private chatId;
  public text = '';
  private flag = true;
  private notificationSubscribtion = false;
  private apiCall = true;
  private hasMore = true;

  constructor(
    private authService: AuthUserService,
    private router: Router,
    private chat: ChatService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private socket: Socket) {
      this.route
      .queryParams
      .subscribe(params => {
        this.chatId = params['chatId'];
        this.name = params['name'];
        this.image = params['image'];
      });
  }

  ngOnInit() {
    this.authService.getData().subscribe( data => {
      this.userId = data.id;
    });
    this.getMessages(this.chatId);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  getMessages(chatId) {
    this.chat.get(chatId, this.pageMessages).subscribe( data => {
      this.apiCall = true;
      if (data.length === 0) {
        this.hasMore = false;
      }
      console.log(data);
      this.messages = data.concat(this.messages);
      console.log(this.messages);
      this.pageMessages++;
      this.scrollToBottom();
    });
    if (!this.notificationSubscribtion) {
      this.getNotifiedMessages();
      this.notificationSubscribtion = true;
    }
  }

  getNotifiedMessages() {
    this.socket.fromEvent(`chat${this.chatId}`).subscribe( data => {
      console.log(data);
      this.messages.push({
        data : data['data'],
        type : data['type'],
        sender_id : data['userId']
      });
      this.flag = true;
      this.scrollToBottom();
    });
  }

  send() {
    if (this.text !== '') {
      this.chat.send(this.text, 0 , this.chatId, this.userId).subscribe( data => {
        console.log(data);
        this.text = '';
        this.scrollToBottom();
      });
    }
  }

  scrollToBottom() {
    try {
      if (this.flag) {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.log(err);
    }
  }

  onScroll(event) {
    this.flag = false;
    console.log(event.target.scrollTop);
    if (event.target.scrollTop < event.target.offsetHeight * 0.1) {
      if (this.apiCall && this.hasMore) {
        this.apiCall = false;
        this.getMessages(this.chatId);
        console.log('call api');
      }
    }
  }

  upload_image() {
    document.getElementById('upload_image').click();
  }

  upload_video() {
    document.getElementById('upload_video').click();
  }

  onImageChanged(event) {
    const file = event.target.files[0];
  }

  onVideoChanged(event) {
    const file = event.target.files[0];
  }

  isMobile() {
    if (window.screen.width > 991) {
      return false;
    }
    return true;
  }

}
