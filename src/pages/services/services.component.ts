import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ContentService } from 'src/services/content.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  aboutHeight: any;
  public services;
  public cover = '';
  pageId = 1;
  constructor(
    public contentService: ContentService,
    public router: Router) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.getSerivces();
  }

  getSerivces() {
    this.contentService.getServices(this.pageId).subscribe(data => {
      this.services = data;
      console.log(data);
      this.pageId++;
    });
  }

  details(index) {
    this.router.navigate(['/cpanel/service-details'], { queryParams: { serviceId: this.services[index].id } });
  }

}
