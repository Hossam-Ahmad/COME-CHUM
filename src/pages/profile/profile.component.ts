import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/services/authUser.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UsersService } from 'src/services/users.service';
import { FeedService } from 'src/services/feed.servie';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public myId;
  public userId;
  public myProfileId;
  public userData;
  public posts = [];
  private page = 1;

  constructor(
    private auth: AuthUserService,
    private activatedRoute: ActivatedRoute,
    private users: UsersService,
    private feed: FeedService) {
  }

  ngOnInit(): void {
    this.auth.getData().subscribe( data => {
      this.myId = data.id;
      this.myProfileId = data.profile_id;
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.users.getByProfile(this.userId).subscribe(data => {
        this.userData = data[0];
        console.log(data[0]);
        this.getFeed();
      });
    });
  }

  getFeed() {
    this.feed.getUserFeed(this.userData.id, this.page).subscribe( data => {
      this.posts = data;
    });
  }

  isMobile() {
    return window.innerWidth < 800;
  }

}
