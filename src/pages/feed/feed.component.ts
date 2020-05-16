import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/services/authUser.service';
import { BlogsService } from 'src/services/blogs.service';
import { FeedService } from 'src/services/feed.servie';
import { ChatService } from 'src/services/chat.service';

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

  constructor(public authService: AuthUserService,
              public router: Router,
              private blogsService: BlogsService,
              private feedService: FeedService,
              private chat: ChatService) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {
    this.authService.getData().subscribe( data => {
        console.log(data);
        this.authService.setUserData(data);
        this.getFeed();
    });
  }

  getFeed() {
    this.authService.getData().subscribe( data => {
      this.feedService.getAll(data.id, this.page).subscribe(data => {
        this.posts = data;
        this.page++;
        console.log(this.posts);
      });
    });
  }

}
