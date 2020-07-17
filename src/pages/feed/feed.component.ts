import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/services/authUser.service';
import { BlogsService } from 'src/services/blogs.service';
import { FeedService } from 'src/services/feed.servie';
import { ChatService } from 'src/services/chat.service';
import { NewMessageComponent } from 'src/components/new-message/new-message.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public height;
  private page = 1;
  private pageChats = 1;
  public blogs = [];
  public posts = [];
  public images = [];
  public chats = [];
  public userData;

  constructor(public authService: AuthUserService,
              public router: Router,
              private blogsService: BlogsService,
              private feedService: FeedService,
              private chat: ChatService,
              private dialog: MatDialog) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {
    this.authService.getData().subscribe( data => {
        console.log(data);
        this.userData = data;
        this.authService.setUserData(data);
        this.getFeed();
    });
  }

  getFeed() {
    this.authService.getData().subscribe( data => {
      this.feedService.getAll(data.id, this.page).subscribe(data => {
        this.posts = this.posts.concat(data);
        this.page++;
        console.log(this.posts);
      });
    });
  }

  isMobile() {
    return window.innerWidth < 800;
  }

  onAdded(data) {
    console.log(data);
    data.comments_arr = [];
    data.image = this.userData.image;
    data.name = this.userData.name;
    data.created_at = new Date();
    this.posts.unshift(data);
  }

}
