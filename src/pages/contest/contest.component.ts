import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/services/feed.servie';
import { AuthUserService } from 'src/services/authUser.service';
import { TranslateService } from '@ngx-translate/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { NewMessageComponent } from 'src/components/new-message/new-message.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ContestsService } from 'src/services/contests.service';
import { MiscService } from 'src/services/misc.service';

@Component({
  selector: 'app-contest-page',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestPageComponent implements OnInit {

  public comment_text = '';
  private page = 1;
  public contest;
  public contestId;

  constructor(
    private feed: FeedService,
    private auth: AuthUserService,
    public translate: TranslateService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private contestService: ContestsService,
    private misc: MiscService) {
      this.route
      .queryParams
      .subscribe(params => {
        this.contestId = params['contestId'];
        this.auth.getData().subscribe(data => {
          this.contestService.getContestWebsite(this.contestId).subscribe(data => {
            this.contest = data[0];
            console.log(this.contest);
          });
        });
      });
  }

  ngOnInit(): void {
  }

  isMobile() {
    return window.innerWidth < 800;
  }

}
