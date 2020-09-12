import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { InterestsService } from 'src/services/interests.service';

@Component({
  selector: 'app-interest-details',
  templateUrl: './interest-details.component.html',
  styleUrls: ['./interest-details.component.css']
})
export class InterestDetailsComponent implements OnInit {

  interestId;
  public interestData;

  public name_ar;
  public name_en;
  public btn_title = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private interestsService: InterestsService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.interestId = params['interestId'];
        this.interestsService.get(this.interestId).subscribe( data => {
          console.log(data);
          if (data != null) {
            this.btn_title = 'تعديل';
            this.interestData = data[0];
            this.name_ar = this.interestData.name_ar;
            this.name_en = this.interestData.name_en;
          } else {
            this.btn_title = 'إضافه';
          }
        });
      });
  }

  perform() {
    if( this.btn_title == 'إضافه') {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
      this.interestsService.create({
          name_ar : this.name_ar,
          name_en : this.name_en,
      }).subscribe( data => {
        this.router.navigate(['/cpanel/interests']);
      });
  }

  update() {
    if (this.interestData) {
      console.log(this.interestData);
      this.interestsService.update(
        this.interestId,
        {
          name_ar : this.name_ar,
          name_en : this.name_en,
      }).subscribe( data => {
        this.router.navigate(['/cpanel/interests']);
      });
    }
  }

}
