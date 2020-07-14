import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { environment } from 'src/environments/environment';
import { MiscService } from 'src/services/misc.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  aboutHeight: any;
  public events = [];
  public cover = '';
  pageId = 1;
  constructor(
    public eventsService: EventsService,
    public misc: MiscService) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getAll(this.pageId).subscribe(data => {
      this.events = data;
      console.log(data);
      this.pageId++;
    });
  }

  open(index) {
    const win = window.open(`${environment.host}event?eventId=${this.events[index].event_id}`, '_blank');
    win.focus();
  }

  remove(index) {
    this.eventsService.remove(this.events[index].id).subscribe( data => {
      this.events.splice(index, 1);
    });
  }

  onScroll() {
    this.getEvents();
  }

  details(index) {

  }

}
