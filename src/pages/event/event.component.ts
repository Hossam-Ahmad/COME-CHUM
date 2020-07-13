import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/services/authUser.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UsersService } from 'src/services/users.service';
import { EventsService } from 'src/services/events.service';


@Component({
  selector: 'app-event-page',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventPageComponent implements OnInit {

  public userId;
  public eventId;
  public userData;
  public posts = [];
  private page = 1;

  constructor(
    private auth: AuthUserService,
    private activatedRoute: ActivatedRoute,
    private users: UsersService,
    private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.auth.getData().subscribe( data => {
      this.userId = data.id;
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.eventId = params['eventId'];
      this.getFeed();
    });
  }

  getFeed() {
    this.eventsService.getPosts(this.eventId, this.page).subscribe( data => {
      this.posts = this.posts.concat(data as Array<any>);
      this.page++;
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
