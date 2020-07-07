import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthUserService } from 'src/services/authUser.service';
import { FeedService } from 'src/services/feed.servie';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  private pageId = 1;
  public posts = [];
  private oldText = '';

  constructor(public authService: AuthUserService,
              public router: Router,
              public route: ActivatedRoute,
              private feedService: FeedService) {
  }

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.route
      .queryParams
      .subscribe(params => {
        console.log(params['text']);
        if (params['text']) {
          if (this.oldText === '') {
            this.oldText = params['text'];
          } else if (this.oldText !== params['text']) {
            this.pageId = 1;
            this.posts = [];
          }
          this.feedService.search(params['text'], this.pageId).subscribe(data => {
            this.posts = this.posts.concat(data);
            this.pageId++;
            console.log(this.posts);
          });
        } else {

        }
      });
  }

  isMobile() {
    return window.innerWidth < 800;
  }

}
