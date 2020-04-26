import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ContestsService } from 'src/services/contests.service';
import { MiscService } from 'src/services/misc.service';

@Component({
  selector: 'app-contest-details',
  templateUrl: './contest-details.component.html',
  styleUrls: ['./contest-details.component.css']
})
export class ContestDetailsComponent implements OnInit {

  contestId;
  public contestData;
  public btnTitle = 'اضافه';

  public name;
  public details;
  public created_at;
  public end_at;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contestsService: ContestsService,
    private misc: MiscService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.contestId = params['contestId'];
        this.contestsService.get(this.contestId).subscribe( data => {
          if (data != null) {
            this.contestData = data[0];
            this.name = this.contestData.name;
            this.details = this.contestData.details;
            this.created_at = this.misc.getDate(this.contestData.created_at);
            this.end_at = this.misc.getDate(this.contestData.end_at);
            this.btnTitle = 'تعديل';
            console.log(this.contestData);
          }
        });
      });
  }

  open() {
    const win = window.open(`${environment.host}profile/${this.contestData.blog_id}`, '_blank');
    win.focus();
  }

  perform() {
    if (this.contestData) { // update
      console.log(this.contestData);
      this.contestsService.update(
        this.contestId,
        {
        name : this.name,
        details : this.details,
        created_at: this.created_at,
        end_at: this.end_at
      }).subscribe( data => {
        this.router.navigate(['/cpanel/contests']);
      });
    } else {// create
      if (this.name !== '' && this.details !== '') {
        this.contestsService.create({
          name : this.name,
          details : this.details,
          created_at: this.created_at,
          end_at: this.end_at
        }).subscribe( data => {
          this.router.navigate(['/cpanel/contests']);
        });
      } else {
        alert('ادخل كل بيانات الباقة');
      }
    }
  }

}
