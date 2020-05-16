import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from 'src/services/chat.service';
import { AuthUserService } from 'src/services/authUser.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-Messages',
  templateUrl: './Messages.component.html',
  styleUrls: ['./Messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public chats = [];
  private page = 1;

  constructor(
    private authService: AuthUserService,
    private chat: ChatService,
    public translate: TranslateService) {
  }

  ngOnInit(): void {
    this.getChats();
  }

  getChats() {
    this.authService.getData().subscribe( data => {
      this.chat.getAll(0, this.page, data.id).subscribe( data2 => {
        this.chats = data2;
        this.page++;
        console.log(data2);
      });
    });
  }

}
