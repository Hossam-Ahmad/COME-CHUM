import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/services/authUser.service';
import { GroupsService } from 'src/services/groups.service';

@Component({
  selector: 'app-groups-website',
  templateUrl: './groups-website.component.html',
  styleUrls: ['./groups-website.component.scss']
})
export class GroupsWebsiteComponent implements OnInit {

  public height;
  private page = 1;
  public groups = [];

  constructor(public authService: AuthUserService,
              public router: Router,
              private groupsService: GroupsService) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.groupsService.getAll(this.page).subscribe(data2 => {
      this.groups = data2;
      console.log(this.groups);
    });
  }

  isMobile() {
    return window.innerWidth < 800;
  }

}
