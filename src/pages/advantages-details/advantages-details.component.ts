import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ContentService } from 'src/services/content.service';

@Component({
  selector: 'app-advantages-details',
  templateUrl: './advantages-details.component.html',
  styleUrls: ['./advantages-details.component.css']
})
export class AdvantagesDetailsComponent implements OnInit {

  advantageId;
  public advantageData;

  public ar;
  public en;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.advantageId = params['advantageId'];
        this.contentService.getAdvantage(this.advantageId).subscribe( data => {
          if (data != null) {
            this.advantageData = data[0];
            this.ar = this.advantageData.ar;
            this.en = this.advantageData.en;
          }
        });
      });
  }

  update() {
    if (this.advantageData) {
      console.log(this.advantageData);
      this.contentService.updateAdvantage(
        {
        id : this.advantageId,
        ar : this.ar,
        en : this.en,
      }).subscribe( data => {
        this.router.navigate(['/cpanel/advantages']);
      });
    }
  }

}
