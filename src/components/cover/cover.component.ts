import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventsService } from 'src/services/events.service';
import { AuthUserService } from 'src/services/authUser.service';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class coverComponent implements OnInit {

  @Input() EntryData;
  @Output() changeLayout = new EventEmitter<any>();
  userId;

  constructor(private eventsService: EventsService, private auth: AuthUserService) {
  }

  ngOnInit(): void {
    this.auth.getData().subscribe(data => {
      this.userId = data.id;
    });
  }

  join() {
    this.eventsService.join(this.userId, this.EntryData.id).subscribe( data => {
      location.reload();
    });
  }

  leave() {
    this.eventsService.leave(this.userId, this.EntryData.id).subscribe( data => {
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
