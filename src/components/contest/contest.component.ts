import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/services/feed.servie';
import { AuthUserService } from 'src/services/authUser.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {

  @Input() contest;

  constructor(
    private feed: FeedService,
    private auth: AuthUserService,
    public translate: TranslateService) {
  }

  ngOnInit(): void {
  }

}
