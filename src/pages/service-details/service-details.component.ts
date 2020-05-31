import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ContentService } from 'src/services/content.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  serviceId;
  public serviceData;

  public title_ar;
  public subtitle_ar;
  public title_en;
  public subtitle_en;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.serviceId = params['serviceId'];
        this.contentService.getService(this.serviceId).subscribe( data => {
          if (data != null) {
            this.serviceData = data[0];
            this.title_ar = this.serviceData.title_ar;
            this.subtitle_ar = this.serviceData.subtitle_ar;
            this.title_en = this.serviceData.title_en;
            this.subtitle_en = this.serviceData.subtitle_en;
          }
        });
      });
  }

  update() {
    if (this.serviceData) {
      console.log(this.serviceData);
      this.contentService.updateService(
        {
        id : this.serviceId,
        title_ar : this.title_ar,
        subtitle_ar : this.subtitle_ar,
        title_en : this.title_en,
        subtitle_en : this.subtitle_en
      }).subscribe( data => {
        this.router.navigate(['/cpanel/services']);
      });
    }
  }

}
