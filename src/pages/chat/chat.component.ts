import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { AuthUserService } from '../../services/authUser.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/services/chat.service';
import { TranslateService } from '@ngx-translate/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;

  public chats = [];
  public messages = [];
  public type = 0; // 0 direct , 1 group , 2 all
  private pageChats = 1;
  private pageMessages = 1;
  public userId;
  public activeIndex = 0;
  public text = '';
  private flag = true;
  private notificationSubscribtion = false;
  private apiCall = true;
  private hasMore = true;

  constructor(
    private authService: AuthUserService,
    private router: Router,
    private chat: ChatService,
    public translate: TranslateService,
    private socket: Socket) {
  }

  ngOnInit() {
    this.authService.getData().subscribe( data => {
      this.userId = data.id;
    });
    this.getChats();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  select(index) {
    this.socket.removeAllListeners();
    this.activeIndex = index;
    if (this.isMobile()) {
      this.router.navigate(['/messages'], { queryParams: { chatId: this.chats[index].id,
        image: this.chats[index].image,
        name: this.chats[index].name } });
    } else {
      this.getMessages(this.chats[index].id, true);
    }
  }

  changeType(type) {
    this.type = type;
    this.pageChats = 1;
    this.getChats();
  }

  getChats() {
    this.authService.getData().subscribe( data => {
      console.log(data);
      this.chat.getAll(this.type, this.pageChats, data.id).subscribe( data2 => {
        this.chats = data2;
        this.pageChats++;
        console.log(data2);
        this.getMessages(this.chats[0].id, false);
      });
    });
  }

  getMessages(chatId, changeChat) {
    if (changeChat) {
      this.pageMessages = 1;
      this.hasMore = true;
      this.messages = [];
    }
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

  searchChats() {
    this.pageChats = 1;
    this.chat.search('', this.pageChats).subscribe( data => {
      this.chats = data;
      this.pageChats++;
    });
  }

  getNotifiedMessages() {
    this.socket.fromEvent(`chat${this.chats[this.activeIndex].id}`).subscribe( data => {
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
      this.chat.send(this.text, 0 , this.chats[this.activeIndex].id, this.userId).subscribe( data => {
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
        this.getMessages(this.chats[this.activeIndex].id, false);
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
