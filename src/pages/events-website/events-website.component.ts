import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/services/authUser.service';
import { EventsService } from 'src/services/events.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-events-website',
  templateUrl: './events-website.component.html',
  styleUrls: ['./events-website.component.scss']
})
export class EventsWebsiteComponent implements OnInit {

  public height;
  private page = 1;
  public events = [];
  public searchType = 0;

  constructor(public authService: AuthUserService,
              public router: Router,
              private translate: TranslateService,
              private eventsService: EventsService) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getAll(this.page).subscribe(data2 => {
      this.events = data2;
      console.log(this.events);
    });
  }

  isMobile() {
    return window.innerWidth < 800;
  }

  search(index) {
    this.searchType = index;
  }

}
