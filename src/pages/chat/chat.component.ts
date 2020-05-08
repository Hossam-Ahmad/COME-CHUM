import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/services/chat.service';


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
  private userId = 1;
  public activeIndex = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private chat: ChatService) {
  }

  ngOnInit() {
    this.getChats();
  }

  select(index) {
    this.activeIndex = index;
    this.getMessages(this.chats[index].chat_id, true);
  }

  changeType(type) {
    this.type = type;
    this.pageChats = 1;
    this.getChats();
  }

  getChats() {
    this.chat.getAll(this.type, this.pageChats, this.userId).subscribe( data => {
      this.chats = data;
      this.pageChats++;
      console.log(data);
      this.getMessages(0, false);
    });
  }

  getMessages(chatId, changeChat) {
    if (changeChat) {
      this.pageMessages = 1;
    }
    this.chat.get(chatId, this.pageMessages).subscribe( data => {
      this.messages = data;
      this.pageMessages++;
    });
  }

  searchChats() {
    this.pageChats = 1;
    this.chat.search('', this.pageChats).subscribe( data => {
      this.chats = data;
      this.pageChats++;
    });
  }

}
