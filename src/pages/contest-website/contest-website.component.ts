import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/services/authUser.service';
import { ContestsService } from 'src/services/contests.service';

@Component({
  selector: 'app-contest-website',
  templateUrl: './contest-website.component.html',
  styleUrls: ['./contest-website.component.scss']
})
export class ContestWebsiteComponent implements OnInit {

  public height;
  private page = 1;
  public contests = [];

  constructor(public authService: AuthUserService,
              public router: Router,
              private contestsService: ContestsService) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {
    this.getContests();
  }

  getContests() {
      this.contestsService.getAll(this.page).subscribe(data => {
        this.contests = data;
        console.log(this.contests);
      });
  }

  isMobile() {
    return window.innerWidth < 800;
  }

}
