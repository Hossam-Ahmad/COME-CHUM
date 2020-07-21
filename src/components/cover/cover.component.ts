import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventsService } from 'src/services/events.service';
import { AuthUserService } from 'src/services/authUser.service';
import { GroupsService } from 'src/services/groups.service';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class coverComponent implements OnInit {

  @Input() EntryData;
  @Output() changeLayout = new EventEmitter<any>();
  userId;

  constructor(
    private eventsService: EventsService,
    private auth: AuthUserService,
    private groupsService: GroupsService) {
  }

  ngOnInit(): void {
    this.auth.getData().subscribe(data => {
      this.userId = data.id;
    });
  }

  join() {
    let request;
    if (this.EntryData.type === 'event') {
      request = this.eventsService.join(this.userId, this.EntryData.id);
    } else if (this.EntryData.type === 'group') {
      request = this.groupsService.join(this.userId, this.EntryData.id);
    }
    request.subscribe( data => {
      location.reload();
    });
  }

  leave() {
    let request;
    if (this.EntryData.type === 'event') {
      request = this.eventsService.leave(this.userId, this.EntryData.id);
    } else if (this.EntryData.type === 'group') {
      request = this.groupsService.leave(this.userId, this.EntryData.id);
    }
    request.subscribe( data => {
      location.reload();
    });
  }

  posts() {
    this.changeLayout.emit('posts');
  }

  images() {
    this.changeLayout.emit('images');
  }

  videos() {
    this.changeLayout.emit('videos');
  }

}
