import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from 'src/services/events.service';
import { AuthUserService } from 'src/services/authUser.service';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class coverComponent implements OnInit {

  @Input() EntryData;
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

}
