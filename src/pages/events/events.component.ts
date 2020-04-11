import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  aboutHeight: any;
  public groups = [];
  public cover = '';
  pageId = 1;
  constructor(public eventsService: EventsService) {
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
      this.groups = data;
      console.log(data);
      this.pageId++;
    });
  }

  open(index) {
    const win = window.open(`${environment.host}group/${this.groups[index].group_id}`, '_blank');
    win.focus();
  }

  remove(index) {
    this.eventsService.remove(index).subscribe( data => {
      this.groups.splice(index, 1);
    });
  }

  onScroll() {
    this.getEvents();
  }

  details(index) {

  }

}
