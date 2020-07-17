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
  public eventData;
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
      this.userData = data;
      this.userId = data.id;
      this.activatedRoute.queryParams.subscribe(params => {
        this.eventId = params['eventId'];
        this.getEvent();
      });
    });
  }

  getEvent() {
    this.eventsService.getEvent(this.eventId, this.userId).subscribe( data => {
      this.eventData = data;
      this.eventData = this.eventData[0];
      this.eventData['type'] = 'event';
      console.log(this.eventData);
      this.getFeed();
    });
  }

  getFeed() {
    this.eventsService.getPosts(this.eventData.id, this.userId, this.page).subscribe( data => {
      this.posts = this.posts.concat(data as Array<any>);
      console.log(this.posts);
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
