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
  public layout = 'posts';

  constructor(
    private auth: AuthUserService,
    private activatedRoute: ActivatedRoute,
    private users: UsersService,
    private groupsService: GroupsService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.groupId = params['groupId'];
      this.auth.getData().subscribe( data => {
        this.userData = data;
        this.userId = data.id;
        this.getGroup();
      });
    });
  }

  getGroup() {
    this.groupsService.getGroup(this.groupId, this.userId).subscribe( data => {
      this.groupData = data;
      console.log(data);
      this.groupData = this.groupData[0];
      this.groupData['type'] = 'group';
      console.log(this.groupData);
      this.getFeed();
    });
  }

  getFeed() {
    this.groupsService.getPosts(this.groupData.id, this.userId, this.page).subscribe( data => {
      this.posts = this.posts.concat(data as Array<any>);
      this.page++;
      console.log(this.posts);
    });
  }

  changeLayout(data) {
    this.layout = data;
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
    data.comments = 0;
    data.likes = 0;
    data.comments_arr = [];
    this.posts.unshift(data);
  }

}
