import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/services/authUser.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UsersService } from 'src/services/users.service';
import { GroupsService } from 'src/services/groups.service';



@Component({
  selector: 'app-group-page',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupPageComponent implements OnInit {

  public userId;
  public groupId;
  public userData;
  public groupData;
  public posts = [];
  private page = 1;

  constructor(
    private auth: AuthUserService,
    private activatedRoute: ActivatedRoute,
    private users: UsersService,
    private groupsService: GroupsService) {
  }

  ngOnInit(): void {
    this.auth.getData().subscribe( data => {
      this.userId = data.id;
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.groupId = params['groupId'];
      this.groupData['type'] = 'group';
      this.getFeed();
    });
  }

  getFeed() {
    this.groupsService.getPosts(this.groupId, this.page).subscribe( data => {
      this.posts = this.posts.concat(data as Array<any>);
      this.page++;
    });
  }

  isMobile() {
    return window.innerWidth < 800;
  }

  onAdded(data) {
    console.log(data);
    data.comments_arr = [];
    data.image = this.userData.image;
    data.name = this.userData.name;
    data.created_at = new Date();
    this.posts.unshift(data);
  }

}
