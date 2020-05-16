import { Component, OnInit } from '@angular/core';
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
export class ChatComponent implements OnInit {

  public chats = [];
  public messages = [];
  public type = 0; // 0 direct , 1 group , 2 all
  private pageChats = 1;
  private pageMessages = 1;
  public userId;
  public activeIndex = 0;
  public text = '';

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

  select(index) {
    this.socket.removeAllListeners();
    this.activeIndex = index;
    this.getMessages(this.chats[index].chat_id, true);
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
        this.getMessages(this.chats[0].chat_id, false);
      });
    });
  }

  getMessages(chatId, changeChat) {
    if (changeChat) {
      this.pageMessages = 1;
    }
    this.chat.get(chatId, this.pageMessages).subscribe( data => {
      this.messages = data;
      console.log(this.messages);
      this.pageMessages++;
    });
    this.getNotifiedMessages();
  }

  searchChats() {
    this.pageChats = 1;
    this.chat.search('', this.pageChats).subscribe( data => {
      this.chats = data;
      this.pageChats++;
    });
  }

  getNotifiedMessages() {
    this.socket.fromEvent(`chat${this.chats[this.activeIndex].chat_id}`).subscribe( data => {
      console.log(data);
      this.messages.push({
        data : data['data'],
        type : data['type'],
        sender_id : data['userId']
      });
    });
  }

  send() {
    if (this.text !== '') {
      this.chat.send(this.text, 0 , this.chats[this.activeIndex].id, this.userId).subscribe( data => {
        console.log(data);
        this.text = '';
      });
    }
  }

}
